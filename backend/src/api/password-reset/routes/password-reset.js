'use strict';

/**
 * password-reset router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::password-reset.password-reset');
