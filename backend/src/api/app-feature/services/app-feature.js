'use strict';

/**
 * app-feature service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::app-feature.app-feature');
