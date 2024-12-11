import logo from "./extensions/vectorfinancelimitedlogo.png";
//import './styles.css';

const config = { 
  // Disable video tutorials
 tutorials: false,
 // Disable notifications about new Strapi releases
 notifications: { releases: false },
  auth: { // Replace the Strapi logo in auth (login) views
    logo
  },
  menu: { // Replace the Strapi logo in the main navigation
    logo
  },
  head: {
      favicon: logo
  },
  translations: {
    en: {
      "app.components.LeftMenu.navbrand.title": "Vector Finance Limited",
      "app.components.LeftMenu.navbrand.workplace": "Admin Backend",
      "Auth.form.welcome.title": "VectorFin Loans Backend",
      "Auth.form.welcome.subtitle": "Log in to your admin account",
      "notification.version.update.message": "A new version of the backend is available",
      "Auth.form.error.invalid": "email, number or password invalid.",
      "Auth.form.register.subtitle": "This admin panel is only for vector finance limited admins",
      "app.components.HomePage.welcomeBlock.content.again": "This admin panel is designed for loans and finance management by vector finance limited admins. Go to the Content Manager tab to view, edit, create or edit loan content.",
      "Auth.form.register.news.label": "Make sure you create a memorable password.",
      "Settings.application.strapi-version": "",
      "Settings.application.strapiVersion": "",
      "Settings.application.link-upgrade": ""
    }
    
  },
  theme: {
    light: {
      colors: {
        primary100: "#f6ecfc",
        primary200: "#e0c1f4",
        primary500: "#ac73e6",
        primary600: "#9736e8",
        primary700: "#8312d1",
        danger700: "#b72b1a",
      },
    }
  }
}

const bootstrap = (app) => {
  console.log(app);
};

export default {
  config,
  bootstrap,
};
