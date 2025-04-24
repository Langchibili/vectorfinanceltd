'use strict';

/**
 * app-status service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::app-status.app-status');
