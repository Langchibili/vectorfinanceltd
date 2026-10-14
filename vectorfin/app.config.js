const appConfig = require('./app.json').expo;
const isLocal = process.env.EXPO_PUBLIC_ENV !== 'production';

module.exports = {
  ...appConfig,
  ios: {
    ...appConfig.ios,
    infoPlist: {
      ...appConfig.ios?.infoPlist,
      ...(isLocal && {
        NSAppTransportSecurity: {
          NSAllowsArbitraryLoads: true,
        },
      }),
    },
  },
  android: {
    ...appConfig.android,
    usesCleartextTraffic: isLocal,
  },
};
