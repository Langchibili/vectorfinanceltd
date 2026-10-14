require('dotenv').config();

// ============================================================================
// MAIN SOCKET SERVER (port 4000)
//  - Web frontends (Next.js) connect here and join their private room.
//  - Strapi connects here with SOCKET_INTERNAL_TOKEN and emits `notify:users`.
//  - Every notification is (1) emitted to web rooms and (2) relayed to the
//    device socket server, which pushes it to native apps (vectorfin / admin).
//  - The ack returned to Strapi lists which users were NOT reached by a live
//    device socket, so Strapi can fall back to an Expo push notification.
// ============================================================================

const { Server } = require('socket.io');
const { io: ioClient } = require('socket.io-client');
const axios = require('axios');

const PORT = Number(process.env.MAINSOCKETPORT || 4000);
const DEVICE_SERVER_URL = process.env.DEVICE_SOCKET_URL || 'http://localhost:3008';
const BACKEND_URL = (process.env.BACKEND_URL || 'http://localhost:1337').replace(/\/$/, '').replace(/\/api$/, '');
const SOCKET_INTERNAL_TOKEN = process.env.SOCKET_INTERNAL_TOKEN;
const ADMIN_TYPES = ['director', 'ceo', 'Loan Admin', 'Collateral Inspector'];

if (!SOCKET_INTERNAL_TOKEN) console.error('SOCKET_INTERNAL_TOKEN is unset; backend -> socket events are disabled');

const io = new Server({ cors: { origin: '*' } });

io.use((socket, next) => {
  socket.data.isInternal = Boolean(SOCKET_INTERNAL_TOKEN && socket.handshake.auth?.internalToken === SOCKET_INTERNAL_TOKEN);
  next();
});

// Outbound connection to the device server
const deviceServer = ioClient(DEVICE_SERVER_URL, {
  autoConnect: true,
  reconnection: true,
  auth: SOCKET_INTERNAL_TOKEN ? { internalToken: SOCKET_INTERNAL_TOKEN } : {},
});
deviceServer.on('connect', () => console.log('Main server connected to device server'));
deviceServer.on('connect_error', (e) => console.error('Device server connect error:', e.message));

io.on('connection', (socket) => {
  // ── Web client joins its private room (and the admins room if admin) ──────
  socket.on('join_user_room', async (userId, cb) => {
    const token = socket.handshake.auth?.token;
    const reply = typeof cb === 'function' ? cb : () => {};
    if (!userId || !token) return reply({ ok: false, message: 'Authentication and user id required' });
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 5000,
      });
      if (String(data?.id) !== String(userId)) return reply({ ok: false, message: 'User mismatch' });
      socket.join(`user_${userId}`);
      if (ADMIN_TYPES.includes(data.type)) socket.join('admins');
      reply({ ok: true });
    } catch (e) {
      reply({ ok: false, message: 'Could not verify user' });
    }
  });

  socket.on('leave_user_room', (userId) => {
    if (userId) socket.leave(`user_${userId}`);
    socket.leave('admins');
  });

  // ── Strapi -> notify users (ack = delivery report) ────────────────────────
  socket.on('notify:users', (payload = {}, ack) => {
    const reply = typeof ack === 'function' ? ack : () => {};
    if (!socket.data.isInternal) return reply({ error: 'unauthorized', delivered: [], undelivered: payload.userIds || [] });

    const userIds = (payload.userIds || []).map(String);
    const { notification } = payload;
    if (!userIds.length || !notification) return reply({ delivered: [], undelivered: [] });

    userIds.forEach((id) => io.to(`user_${id}`).emit('notification:new', notification));

    if (!deviceServer.connected) return reply({ delivered: [], undelivered: userIds, deviceServerDown: true });

    deviceServer.timeout(5000).emit('notify:users', { userIds, notification }, (err, res) => {
      if (err || !res) return reply({ delivered: [], undelivered: userIds });
      reply(res);
    });
  });

  // ── Strapi -> arbitrary realtime data event for web rooms only ────────────
  socket.on('realtime:event', (payload = {}) => {
    if (!socket.data.isInternal) return;
    const { userIds = [], event, data, toAdmins } = payload;
    if (!event) return;
    userIds.forEach((id) => io.to(`user_${id}`).emit(event, data));
    if (toAdmins) io.to('admins').emit(event, data);
  });
});

io.listen(PORT);
console.log(`Main socket server running on port ${PORT}`);
