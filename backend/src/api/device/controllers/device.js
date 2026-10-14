'use strict';

const { createCoreController } = require('@strapi/strapi').factories;
const UID = 'api::device.device';
const APP_KEYS = new Set(['vectorfin', 'vectorfinadmin']);
const ADMIN_TYPES = new Set(['director', 'ceo', 'Loan Admin', 'Collateral Inspector']);

module.exports = createCoreController(UID, ({ strapi }) => ({
  async register(ctx) {
    const user = ctx.state.user;
    if (!user) return ctx.unauthorized();

    const { deviceId, notificationToken, deviceInfo, appKey } = ctx.request.body || {};
    if (typeof deviceId !== 'string' || !deviceId.trim()) {
      return ctx.badRequest('deviceId is required');
    }
    if (appKey != null && !APP_KEYS.has(appKey)) {
      return ctx.badRequest('appKey is invalid');
    }
    if (appKey != null) {
      const expectsAdmin = appKey === 'vectorfinadmin';
      if (ADMIN_TYPES.has(user.type) !== expectsAdmin) return ctx.forbidden();
    }
    if (deviceInfo != null && (typeof deviceInfo !== 'object' || Array.isArray(deviceInfo))) {
      return ctx.badRequest('deviceInfo must be an object');
    }

    const normalizedDeviceId = deviceId.trim();
    const existing = await strapi.db.query(UID).findOne({
      where: { deviceId: normalizedDeviceId, appKey: appKey || null },
    });
    const data = {
      deviceId: normalizedDeviceId,
      appKey: appKey || null,
      user: user.id,
      notificationToken: notificationToken || existing?.notificationToken || null,
      platform: deviceInfo?.platform || existing?.platform || null,
      deviceInfo: deviceInfo || existing?.deviceInfo || null,
      lastSeenAt: new Date(),
    };
    const saved = existing
      ? await strapi.db.query(UID).update({ where: { id: existing.id }, data })
      : await strapi.db.query(UID).create({ data });

    ctx.body = { ok: true, id: saved.id };
  },

  async unregister(ctx) {
    const user = ctx.state.user;
    if (!user) return ctx.unauthorized();

    const { deviceId, appKey } = ctx.request.body || {};
    if (typeof deviceId !== 'string' || !deviceId.trim()) {
      return ctx.badRequest('deviceId is required');
    }
    if (appKey != null && !APP_KEYS.has(appKey)) {
      return ctx.badRequest('appKey is invalid');
    }
    const where = { deviceId: deviceId.trim(), user: user.id };
    if (appKey != null) where.appKey = appKey;
    await strapi.db.query(UID).deleteMany({
      where,
    });
    ctx.body = { ok: true };
  },

  async updateCurrentLoc(ctx) {
    const user = ctx.state.user;
    if (!user) return ctx.unauthorized();

    const { deviceId, location } = ctx.request.body || {};
    if (typeof deviceId !== 'string' || !deviceId.trim()) {
      return ctx.badRequest('deviceId is required');
    }
    if (location != null && (typeof location !== 'object' || Array.isArray(location))) {
      return ctx.badRequest('location must be an object');
    }
    await strapi.db.query(UID).updateMany({
      where: { deviceId: deviceId.trim(), user: user.id },
      data: { currentLocation: location || null, lastSeenAt: new Date() },
    });
    ctx.body = { ok: true };
  },

  async updateInfo(ctx) {
    const user = ctx.state.user;
    if (!user) return ctx.unauthorized();

    const { userId, deviceId } = ctx.params;
    if (String(user.id) !== String(userId)) return ctx.forbidden();
    const { deviceInfo } = ctx.request.body || {};
    if (!deviceId || !deviceInfo || typeof deviceInfo !== 'object' || Array.isArray(deviceInfo)) {
      return ctx.badRequest('deviceId and deviceInfo are required');
    }

    const device = await strapi.db.query(UID).findOne({
      where: { deviceId, user: user.id },
    });
    if (!device) return ctx.notFound();

    await strapi.db.query(UID).update({
      where: { id: device.id },
      data: {
        deviceInfo: { ...(device.deviceInfo || {}), ...deviceInfo },
        lastSeenAt: new Date(),
      },
    });
    ctx.body = { ok: true };
  },

  async remove(ctx) {
    const user = ctx.state.user;
    if (!user) return ctx.unauthorized();

    const { userId, deviceId } = ctx.params;
    if (String(user.id) !== String(userId)) return ctx.forbidden();
    if (!deviceId) return ctx.badRequest('deviceId is required');

    const where = { deviceId, user: user.id };
    const { appKey } = ctx.query;
    if (appKey != null) {
      if (!APP_KEYS.has(appKey)) return ctx.badRequest('appKey is invalid');
      where.appKey = appKey;
    }
    await strapi.db.query(UID).deleteMany({ where });
    ctx.body = { ok: true };
  },
}));
