'use strict';

/**
 * admin-notification service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::admin-notification.admin-notification');
