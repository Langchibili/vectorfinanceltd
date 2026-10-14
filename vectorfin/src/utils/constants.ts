import APP from '../config/app';

const environment = process.env.EXPO_PUBLIC_ENV === 'production' ? 'production' : 'local';
const LAN = process.env.EXPO_PUBLIC_LAN_IP || '10.0.2.2';

export const EXPO_PUBLIC_PROJECT_ID = process.env.EXPO_PUBLIC_EAS_PROJECT_ID;

// Socket events: keep identical to sockets/server.js + device-socket-server.js
export const SOCKET_EVENTS = {
  CONNECT: 'connect', DISCONNECT: 'disconnect', CONNECTED: 'connected', DISCONNECTED: 'disconnected',
  NOTIFICATION: { NEW: 'notification:new', BROADCAST: 'notification:broadcast' },
  SYSTEM: { ANNOUNCEMENT: 'system:announcement' },
  SESSION: { REPLACED: 'session:replaced' },
  DEVICE: {
    REGISTER: 'device:register', REGISTER_SUCCESS: 'device:register:success', REGISTER_ERROR: 'device:register:error',
    UNREGISTER: 'device:unregister', UNREGISTER_SUCCESS: 'device:unregister:success',
  },
  CONNECTION: { PING: 'ping', PONG: 'pong', ERROR: 'error', CONNECT_ERROR: 'connect_error' },
};

// native -> WebView (window 'message' events handled by lib/nativeBridge.js)
export const WEBVIEW_EVENTS = {
  NOTIFICATION_NEW: 'NOTIFICATION_NEW',
  NOTIFICATION_RECEIVED: 'NOTIFICATION_RECEIVED',
  NOTIFICATION_TAPPED: 'NOTIFICATION_TAPPED',
  SOCKET_CONNECTED: 'SOCKET_CONNECTED',
  SOCKET_DISCONNECTED: 'SOCKET_DISCONNECTED',
  SESSION_REPLACED: 'SESSION_REPLACED',
  APP_RESUMED: 'APP_RESUMED',
  NAVIGATE_TO: 'NAVIGATE_TO',
};

// WebView -> native requests (request/response through requestId)
export const NATIVE_EVENTS = {
  INITIALIZE_SERVICES: 'INITIALIZE_SERVICES',
  STOP_SERVICES: 'STOP_SERVICES',
  REQUEST_PERMISSION: 'REQUEST_PERMISSION',
  CHECK_PERMISSION: 'CHECK_PERMISSION',
  SHOW_NOTIFICATION: 'SHOW_NOTIFICATION',
  OPEN_URL: 'OPEN_URL',
  SHARE_FILE: 'SHARE_FILE',
  LOG_DATA: 'LOG_DATA',
};

const host = (port: number) => `http://${LAN}:${port}`;
const serviceUrl = (name: string, configuredUrl: string | undefined, port: number) => {
  if (configuredUrl) return configuredUrl.replace(/\/+$/, '');
  if (environment === 'production') {
    throw new Error(`${name} must be configured for production builds`);
  }
  return host(port);
};
const backendUrl = serviceUrl('EXPO_PUBLIC_BACKEND_URL', process.env.EXPO_PUBLIC_BACKEND_URL, 1350);
const backendApiUrl = backendUrl.endsWith('/api') ? backendUrl : `${backendUrl}/api`;

export const CONSTANTS = {
  APP_NAME: APP.name,
  DEVICE_SOCKET_URL: serviceUrl('EXPO_PUBLIC_DEVICE_SOCKET_URL', process.env.EXPO_PUBLIC_DEVICE_SOCKET_URL, 3008),
  MAIN_SOCKET_URL: serviceUrl('EXPO_PUBLIC_SOCKET_URL', process.env.EXPO_PUBLIC_SOCKET_URL, 4000),
  BACKEND_URL: backendApiUrl,
  FRONTEND_URL: serviceUrl('EXPO_PUBLIC_FRONTEND_URL', process.env.EXPO_PUBLIC_FRONTEND_URL, 3005),
  HEARTBEAT_INTERVAL: 30000,
};
export default { SOCKET_EVENTS, WEBVIEW_EVENTS, NATIVE_EVENTS, CONSTANTS };
