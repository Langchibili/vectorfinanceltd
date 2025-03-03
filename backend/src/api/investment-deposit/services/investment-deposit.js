'use strict';

/**
 * investment-deposit service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::investment-deposit.investment-deposit');
