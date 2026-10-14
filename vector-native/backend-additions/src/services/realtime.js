'use strict';
/**
 * Realtime + push helper (Strapi -> sockets -> apps).
 *
 * strapi-side usage:
 *   const { notifyUsers, notifyAdmins } = require('../services/realtime');
 *   await notifyAdmins({ title, body, type: 'document_signed', data: { loanId } });
 *   await notifyUsers([clientId], { title, body, type: 'loan_status', data: { loanId } });
 *
 * Flow:  Strapi --(internal token)--> main socket (4000) --> device socket (3008) --> live apps
 *        users NOT reached by a live device socket get an Expo push (app closed / killed).
 */
const { io } = require('socket.io-client');

const ADMIN_TYPES = ['director', 'ceo', 'Loan Admin', 'Collateral Inspector'];
const SOCKET_URL = () => process.env.MAIN_SOCKET_URL || 'http://localhost:4000';
const TOKEN = () => process.env.SOCKET_INTERNAL_TOKEN;

let socket = null;
function getSocket() {
  if (!TOKEN()) return null;
  if (!socket) {
    socket = io(SOCKET_URL(), {
      auth: { internalToken: TOKEN() },
      transports: ['websocket'],
      reconnection: true,
    });
    socket.on('connect_error', (e) => strapi.log.warn(`[realtime] socket connect error: ${e.message}`));
  }
  return socket;
}

const emitWithAck = (event, payload, ms = 6000) =>
  new Promise((resolve) => {
    const s = getSocket();
    if (!s || !s.connected) return resolve(null);
    s.timeout(ms).emit(event, payload, (err, res) => resolve(err ? null : res));
  });

async function sendExpoPush(tokens, { title, body, data, channelId }) {
  const messages = tokens
    .filter((t) => typeof t === 'string' && t.startsWith('ExponentPushToken'))
    .map((to) => ({ to, title, body, data, sound: 'default', priority: 'high', channelId: channelId || 'default' }));
  if (!messages.length) return;
  try {
    const res = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(messages),
    });
    const json = await res.json().catch(() => ({}));
    // drop tokens Expo says are dead
    (json.data || []).forEach((r, i) => {
      if (r.status === 'error' && r.details?.error === 'DeviceNotRegistered') {
        strapi.db.query('api::device.device').updateMany({ where: { notificationToken: messages[i].to }, data: { notificationToken: null } }).catch(() => {});
      }
    });
  } catch (e) {
    strapi.log.warn(`[realtime] expo push failed: ${e.message}`);
  }
}

/** appKey: restrict to one app ('vectorfin' | 'vectorfinadmin'); omitted = all of the user's devices */
async function notifyUsers(userIds, { title, body, type = 'message', data = {}, appKey, channelId } = {}) {
  try {
    const ids = [...new Set((userIds || []).filter(Boolean).map(String))];
    if (!ids.length) return;
    const notification = { title, body, type, data: { ...data, type }, createdAt: new Date().toISOString() };

    const ack = await emitWithAck('notify:users', { userIds: ids, notification });
    const undelivered = ack ? ack.undelivered || [] : ids; // no ack => assume nobody reached

    if (!undelivered.length) return;
    const where = { user: { id: { $in: undelivered.map(Number) } }, notificationToken: { $notNull: true } };
    if (appKey) where.appKey = appKey;
    const devices = await strapi.db.query('api::device.device').findMany({ where });
    await sendExpoPush(devices.map((d) => d.notificationToken), { title, body, data: notification.data, channelId });
  } catch (e) {
    strapi.log.error(`[realtime] notifyUsers failed: ${e.message}`);
  }
}

async function getAdminUserIds(adminTypes = ADMIN_TYPES) {
  const users = await strapi.db.query('plugin::users-permissions.user').findMany({
    where: { type: { $in: adminTypes }, blocked: { $ne: true } },
    select: ['id'],
  });
  return users.map((u) => u.id);
}

async function notifyAdmins(payload, adminTypes) {
  const ids = await getAdminUserIds(adminTypes);
  // admins are only notified in the admin app; web admins still get the socket event
  return notifyUsers(ids, { ...payload, appKey: 'vectorfinadmin' });
}

/** Realtime data refresh for web rooms only (no push) */
function broadcastEvent({ userIds = [], toAdmins = false, event, data }) {
  const s = getSocket();
  if (s?.connected) s.emit('realtime:event', { userIds, toAdmins, event, data });
}

module.exports = { notifyUsers, notifyAdmins, broadcastEvent, getAdminUserIds, ADMIN_TYPES };
