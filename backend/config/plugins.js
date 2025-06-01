// path: ./config/plugins.js

module.exports = ({ env }) => ({
  'users-permissions': {
    config: {
      jwt: {
        expiresIn: '100y',
      },
    },
  },

  // Email plugin configuration (using Gmail SMTP)
  email: {
    config: {
      provider: 'strapi-provider-email-smtp',
      providerOptions: {
        host: env('EMAILSERVICEHOST'),
        port: 465,
        secure: true,
        username: env('EMAILSERVICEUSERNAME'),
        password: env('EMAILSERVICEPASSWORD'),
        rejectUnauthorized: false,
        requireTLS: true,
        connectionTimeout: 5000,
      },
      settings: {
        defaultFrom: env('EMAILSERVICEUSERNAME'),
        defaultReplyTo: env('EMAILSERVICEUSERNAME'),
      },
    },
  },

  upload: {
    provider: 'local',
    providerOptions: {
      destination: './public/uploads',
    },
    name: 'strapi::body',
    config: {
      formLimit: '256mb',
      jsonLimit: '256mb',
      textLimit: '256mb',
      formidable: {
        maxFileSize: 10 * 1024 * 1024, // 10MB
      },
      sizeLimit: 256 * 1024 * 1024, // 256MB
      breakpoints: {
        xlarge: 1920,
        large: 1000,
        medium: 750,
        small: 500,
        xsmall: 64,
      },
    },
  },
});
