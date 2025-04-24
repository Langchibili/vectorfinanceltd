'use strict';

/**
 * app-status controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::app-status.app-status');
