'use strict';

/**
 * admin-initial service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::admin-initial.admin-initial');
