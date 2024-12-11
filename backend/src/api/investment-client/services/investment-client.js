'use strict';

/**
 * investment-client service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::investment-client.investment-client');
