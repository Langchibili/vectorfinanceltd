module.exports = () => ({
    'users-permissions': {
      config: {
        jwt: {
          expiresIn: '100y',
        }
      }
    },
    // 'strapi-plugin-fcm': {
    //   enabled: true,
    //   //resolve: './src/plugins/strapi-plugin-fcm' // path to plugin folder
    // },
    upload: {
        provider: "local",
        providerOptions: {
          destination: "./public/uploads",
        },
        name: "strapi::body",
        config: {
          formLimit: "256mb", // modify form body
          jsonLimit: "256mb", // modify JSON body
          textLimit: "256mb", // modify text body
          formidable: {
            maxFileSize: 10 * 1024 * 1024, // Set to 10MB for video uploads
          },
          sizeLimit: 256 * 1024 * 1024, // Keep overall request limit at 256MB
          breakpoints: {
            xlarge: 1920,
            large: 1000,
            medium: 750,
            small: 500,
            xsmall: 64
          }
        }
    } 
})
