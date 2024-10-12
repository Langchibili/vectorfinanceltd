'use strict';

/**
 * repayment service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::repayment.repayment');
