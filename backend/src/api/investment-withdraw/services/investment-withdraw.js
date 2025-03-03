'use strict';

/**
 * investment-withdraw service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::investment-withdraw.investment-withdraw');
