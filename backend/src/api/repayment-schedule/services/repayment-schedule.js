'use strict';

/**
 * repayment-schedule service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::repayment-schedule.repayment-schedule');
