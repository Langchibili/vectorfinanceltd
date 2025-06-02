'use strict';

/**
 * password-reset controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::password-reset.password-reset');
