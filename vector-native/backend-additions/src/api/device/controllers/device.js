'use strict';
const { createCoreController } = require('@strapi/strapi').factories;
const UID = 'api::device.device';

module.exports = createCoreController(UID, ({ strapi }) => ({
  // POST /api/devices/register  (JWT required; called by the device socket server and by the app)
  async register(ctx) {
    const user = ctx.state.user;
    if (!user) return ctx.unauthorized();
    const { deviceId, notificationToken, deviceInfo, appKey } = ctx.request.body || {};
    if (!deviceId) return ctx.badRequest('deviceId is required');

    // A phone belongs to one account at a time: detach it from any other user
    const existing = await strapi.db.query(UID).findOne({ where: { deviceId, appKey: appKey || null } });
    const data = {
      deviceId, appKey: appKey || null,
      user: user.id,
      notificationToken: notificationToken || existing?.notificationToken || null,
      platform: deviceInfo?.platform || null,
      deviceInfo: deviceInfo || null,
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
    const { deviceId } = ctx.request.body || {};
    await strapi.db.query(UID).deleteMany({ where: { deviceId, user: user.id } });
    ctx.body = { ok: true };
  },

  async updateCurrentLoc(ctx) {
    const user = ctx.state.user;
    if (!user) return ctx.unauthorized();
    const { deviceId, location } = ctx.request.body || {};
    await strapi.db.query(UID).updateMany({
      where: { deviceId, user: user.id },
      data: { currentLocation: location || null, lastSeenAt: new Date() },
    });
    ctx.body = { ok: true };
  },

  async remove(ctx) {
    const user = ctx.state.user;
    if (!user) return ctx.unauthorized();
    const { userId, deviceId } = ctx.params;
    if (String(user.id) !== String(userId)) return ctx.forbidden();
    await strapi.db.query(UID).deleteMany({ where: { deviceId, user: user.id } });
    ctx.body = { ok: true };
  },
}));
