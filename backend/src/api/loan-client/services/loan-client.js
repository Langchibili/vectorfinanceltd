'use strict';

/**
 * loan-client service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::loan-client.loan-client');
