'use strict';

const { io } = require('socket.io-client');

const ADMIN_TYPES = ['director', 'ceo', 'Loan Admin', 'Collateral Inspector'];
const DEVICE_UID = 'api::device.device';
const SOCKET_URL = () => process.env.MAIN_SOCKET_URL || 'http://localhost:4000';
const TOKEN = () => process.env.SOCKET_INTERNAL_TOKEN;

let strapiInstance = null;
let socket = null;

function initialize(strapi) {
  strapiInstance = strapi;
  if (!TOKEN()) {
    strapi.log.warn('[realtime] SOCKET_INTERNAL_TOKEN is unset; notifications will use Expo push only');
  }
}

function getSocket() {
  if (!TOKEN()) return null;
  if (!socket) {
    socket = io(SOCKET_URL(), {
      auth: { internalToken: TOKEN() },
      transports: ['websocket'],
      reconnection: true,
    });
    socket.on('connect_error', (error) => {
      strapiInstance?.log.warn(`[realtime] socket connection failed: ${error.message}`);
    });
  }
  return socket;
}

function emitWithAck(event, payload, timeoutMs = 6000) {
  return new Promise((resolve) => {
    const client = getSocket();
    if (!client?.connected) {
      resolve(null);
      return;
    }
    client.timeout(timeoutMs).emit(event, payload, (error, response) => {
      resolve(error ? null : response);
    });
  });
}

async function sendExpoPush(tokens, { title, body, data, channelId }) {
  const messages = tokens
    .filter((token) => typeof token === 'string' && token.startsWith('ExponentPushToken'))
    .map((to) => ({
      to,
      title,
      body,
      data,
      sound: 'default',
      priority: 'high',
      channelId: channelId || 'default',
    }));

  for (let offset = 0; offset < messages.length; offset += 100) {
    const batch = messages.slice(offset, offset + 100);
    try {
      const response = await fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(batch),
      });
      if (!response.ok) {
        strapiInstance?.log.warn(`[realtime] Expo push returned HTTP ${response.status}`);
        continue;
      }

      const result = await response.json();
      for (const [index, ticket] of (result.data || []).entries()) {
        if (ticket.status !== 'error' || ticket.details?.error !== 'DeviceNotRegistered') continue;
        try {
          await strapiInstance.db.query(DEVICE_UID).updateMany({
            where: { notificationToken: batch[index].to },
            data: { notificationToken: null },
          });
        } catch (error) {
          strapiInstance.log.warn(`[realtime] failed to remove invalid Expo token: ${error.message}`);
        }
      }
    } catch (error) {
      strapiInstance?.log.warn(`[realtime] Expo push failed: ${error.message}`);
    }
  }
}

async function notifyUsers(userIds, { title, body, type = 'message', data = {}, appKey, channelId } = {}) {
  try {
    const ids = [...new Set((userIds || []).filter(Boolean).map(String))];
    if (!ids.length) return;

    const notification = {
      title,
      body,
      type,
      data: { ...data, type },
      createdAt: new Date().toISOString(),
      ...(appKey ? { appKey } : {}),
    };
    const acknowledgment = await emitWithAck('notify:users', { userIds: ids, notification });
    const undelivered = acknowledgment?.undelivered || ids;
    if (!undelivered.length) return;

    const where = {
      user: { id: { $in: undelivered.map(Number) } },
      notificationToken: { $notNull: true },
    };
    if (appKey) where.appKey = appKey;
    const devices = await strapiInstance.db.query(DEVICE_UID).findMany({ where });
    await sendExpoPush(devices.map((device) => device.notificationToken), {
      title,
      body,
      data: notification.data,
      channelId,
    });
  } catch (error) {
    strapiInstance?.log.error(`[realtime] notifyUsers failed: ${error.message}`);
  }
}

async function getAdminUserIds(adminTypes = ADMIN_TYPES) {
  const users = await strapiInstance.db.query('plugin::users-permissions.user').findMany({
    where: { type: { $in: adminTypes }, blocked: { $ne: true } },
    select: ['id'],
  });
  return users.map((user) => user.id);
}

async function notifyAdmins(payload, adminTypes) {
  const userIds = await getAdminUserIds(adminTypes);
  return notifyUsers(userIds, { ...payload, appKey: 'vectorfinadmin' });
}

function broadcastEvent({ userIds = [], toAdmins = false, event, data }) {
  const client = getSocket();
  if (client?.connected) client.emit('realtime:event', { userIds, toAdmins, event, data });
}

module.exports = {
  initialize,
  notifyUsers,
  notifyAdmins,
  broadcastEvent,
  getAdminUserIds,
  ADMIN_TYPES,
};
