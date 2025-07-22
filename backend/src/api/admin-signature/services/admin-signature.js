'use strict';

/**
 * admin-signature service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::admin-signature.admin-signature');
