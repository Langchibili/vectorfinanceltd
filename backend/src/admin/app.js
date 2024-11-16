import AuthLogo from "./extensions/vectorfinancelimitedlogo.jpg";
import MenuLogo from "./extensions/vectorfinancelimitedlogo.jpg";
import favicon from "./extensions/vectorfinancelimitedlogo.jpg";

const config = {
  locales: [
    // 'ar',
    // 'fr',
    // 'cs',
    // 'de',
    // 'dk',
    // 'es',
    // 'he',
    // 'id',
    // 'it',
    // 'ja',
    // 'ko',
    // 'ms',
    // 'nl',
    // 'no',
    // 'pl',
    // 'pt-BR',
    // 'pt',
    // 'ru',
    // 'sk',
    // 'sv',
    // 'th',
    // 'tr',
    // 'uk',
    // 'vi',
    // 'zh-Hans',
    // 'zh',
  ],
  translations: {
    en: {
      "app.components.LeftMenu.navbrand.title": "Vector Finance Limited",
      "app.components.LeftMenu.navbrand.workplace": "Admin Backend",
      "Auth.form.welcome.title": "VectorFin Loans Backend",
      "Auth.form.welcome.subtitle": "Log in to your admin account",
      "notification.version.update.message": "A new version of the backend is available",
      "Auth.form.error.invalid": "email, number or password invalid."
    }
  },
  auth: { // Replace the Strapi logo in auth (login) views
    logo: AuthLogo,
    favicon: favicon
  },
  menu: { // Replace the Strapi logo in the main navigation
    logo: MenuLogo,
    favicon: favicon
    
  },
  head: {
      favicon: favicon,
  }
};

const bootstrap = (app) => {
  console.log(app);
};

export default {
  config,
  bootstrap,
};
