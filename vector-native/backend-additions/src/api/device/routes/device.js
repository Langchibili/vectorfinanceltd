'use strict';
module.exports = {
  routes: [
    { method: 'POST',   path: '/devices/register',        handler: 'device.register' },
    { method: 'POST',   path: '/devices/unregister',      handler: 'device.unregister' },
    { method: 'POST',   path: '/devices/updatecurrentloc', handler: 'device.updateCurrentLoc' },
    { method: 'DELETE', path: '/devices/:userId/:deviceId', handler: 'device.remove' },
  ],
};
