'use strict';

/**
 * vehicle-tracking-fee service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::vehicle-tracking-fee.vehicle-tracking-fee');
