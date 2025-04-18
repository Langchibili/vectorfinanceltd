'use strict';

/**
 * client-id service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::client-id.client-id');
