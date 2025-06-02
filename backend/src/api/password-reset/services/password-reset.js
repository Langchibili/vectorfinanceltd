'use strict';

/**
 * password-reset service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::password-reset.password-reset');
