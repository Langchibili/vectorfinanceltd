'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
   register(/*{ strapi }*/) {},
  // register({ strapi }) {
  //   strapi.admin.addComponents({
  //     'pages.auth.components.login': require('/admin/AuthPage/components/CustomLogin.js'),
  //   });
  // },
  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};
