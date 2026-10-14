require('dotenv').config();

// ============================================================================
// DEVICE SOCKET SERVER (port 3008)
//  - Native apps (vectorfin = client, vectorfinadmin = admin) connect here.
//  - On `device:register` the Strapi JWT is verified and the account type is
//    checked against the app type (a client token can never register as an
//    admin device).
//  - Receives `notify:users` from the main server (internal token only),
//    delivers to live device sockets and acks who was reached.
// ============================================================================

const { createServer } = require('http');
const { Server } = require('socket.io');
const axios = require('axios');

const PORT = Number(process.env.DEVICESPORT || 3008);
const BACKEND_URL = (process.env.BACKEND_URL || 'http://localhost:1337').replace(/\/$/, '').replace(/\/api$/, '');
const BACKEND_API_URL = `${BACKEND_URL}/api`;
const SOCKET_INTERNAL_TOKEN = process.env.SOCKET_INTERNAL_TOKEN;
const ADMIN_TYPES = ['director', 'ceo', 'Loan Admin', 'Collateral Inspector'];

if (!SOCKET_INTERNAL_TOKEN) console.error('SOCKET_INTERNAL_TOKEN is unset; notification relay is disabled');

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: { origin: '*' }, // native apps have no browser origin
  pingTimeout: 60000,
  pingInterval: 25000,
  transports: ['websocket', 'polling'],
});

const deviceConnections = new Map(); // deviceId -> { socketId, userId, userType, authToken }
const userDevices = new Map();       // userId -> Set(deviceId)

const key = (id) => String(id);

function removeDevice(deviceId) {
  const d = deviceConnections.get(deviceId);
  if (!d) return;
  const set = userDevices.get(d.userId);
  if (set) {
    set.delete(deviceId);
    if (set.size === 0) userDevices.delete(d.userId);
  }
  deviceConnections.delete(deviceId);
}

/** Emit to every live device of a user. Returns number of sockets reached. */
function forwardToUser(userId, event, data) {
  const ids = userDevices.get(key(userId));
  if (!ids) return 0;
  let sent = 0;
  ids.forEach((deviceId) => {
    const d = deviceConnections.get(deviceId);
    const s = d && io.sockets.sockets.get(d.socketId);
    if (s) { s.emit(event, data); sent++; }
  });
  return sent;
}

io.on('connection', (socket) => {
  const isInternal = Boolean(SOCKET_INTERNAL_TOKEN && socket.handshake.auth?.internalToken === SOCKET_INTERNAL_TOKEN);

  // ── main server -> devices ────────────────────────────────────────────────
  socket.on('notify:users', (payload = {}, ack) => {
    const reply = typeof ack === 'function' ? ack : () => {};
    if (!isInternal) return reply({ error: 'unauthorized', delivered: [], undelivered: payload.userIds || [] });
    const delivered = [];
    const undelivered = [];
    (payload.userIds || []).forEach((id) => {
      (forwardToUser(id, 'notification:new', payload.notification) > 0 ? delivered : undelivered).push(String(id));
    });
    reply({ delivered, undelivered });
  });

  // ── device registration ───────────────────────────────────────────────────
  socket.on('device:register', async (data = {}) => {
    const { deviceId, userId, userType, authToken, notificationToken, deviceInfo, appKey, frontendName } = data;
    if (!deviceId || !userId || !userType || !authToken) {
      return socket.emit('device:register:error', { message: 'deviceId, userId, userType and authToken are required' });
    }

    let me;
    try {
      const res = await axios.get(`${BACKEND_API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${authToken}` },
        timeout: 5000,
      });
      me = res.data;
    } catch (e) {
      return socket.emit('device:register:error', { message: 'Device authentication failed' });
    }

    if (String(me?.id) !== String(userId)) {
      return socket.emit('device:register:error', { message: 'Device user does not match authenticated user' });
    }
    const typeOk = userType === 'admin' ? ADMIN_TYPES.includes(me.type) : userType === 'client' ? (me.type || 'client') === 'client' : false;
    if (!typeOk) {
      return socket.emit('device:register:error', { message: 'This account cannot use this app' });
    }

    // same device re-registering (reconnect or different account on the same phone)
    const prev = deviceConnections.get(deviceId);
    if (prev && prev.userId !== key(userId) && prev.socketId !== socket.id) {
      const old = io.sockets.sockets.get(prev.socketId);
      if (old) old.emit('session:replaced', { reason: 'Another account signed in on this device' });
    }
    removeDevice(deviceId);

    const uid = key(userId);
    deviceConnections.set(deviceId, { socketId: socket.id, userId: uid, userType, authToken, registeredAt: Date.now() });
    if (!userDevices.has(uid)) userDevices.set(uid, new Set());
    userDevices.get(uid).add(deviceId);

    // persist (Expo push token is stored here so Strapi can push when the app is closed)
    try {
      await axios.post(
        `${BACKEND_API_URL}/devices/register`,
        { deviceId, notificationToken, deviceInfo, appKey, frontendName },
        { headers: { Authorization: `Bearer ${authToken}` }, timeout: 5000 }
      );
    } catch (e) {
      console.error('Error saving device to backend:', e.message);
    }

    socket.emit('device:register:success', { deviceId, userId: uid });
  });

  socket.on('device:unregister', async ({ deviceId } = {}) => {
    const d = deviceConnections.get(deviceId);
    if (!d || d.socketId !== socket.id) return;
    try {
      await axios.post(`${BACKEND_API_URL}/devices/unregister`, { deviceId }, {
        headers: { Authorization: `Bearer ${d.authToken}` },
        timeout: 5000,
      });
    } catch (e) {
      console.error('Error unregistering device in backend:', e.message);
    }
    removeDevice(deviceId);
    socket.emit('device:unregister:success', { deviceId });
  });

  socket.on('ping', () => socket.emit('pong', { timestamp: Date.now() }));

  socket.on('disconnect', () => {
    for (const [deviceId, d] of deviceConnections.entries()) {
      if (d.socketId === socket.id) { removeDevice(deviceId); break; }
    }
  });
});

httpServer.on('request', (req, res) => {
  if (req.url.startsWith('/socket.io')) return; // handled by Engine.io
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ status: 'ok', devices: deviceConnections.size, users: userDevices.size }));
  }
  res.writeHead(404);
  res.end('Not Found');
});

httpServer.listen(PORT, () => console.log(`Device socket server listening on ${PORT}`));

['SIGTERM', 'SIGINT'].forEach((sig) => process.on(sig, () => httpServer.close(() => process.exit(0))));
