import APP from '../config/app';

const environment: 'local' | 'production' = (process.env.EXPO_PUBLIC_ENV as any) || 'local';
const LAN = process.env.EXPO_PUBLIC_LAN_IP || '192.168.1.10'; // your dev machine's LAN IP

export const EXPO_PUBLIC_PROJECT_ID = process.env.EXPO_PUBLIC_EAS_PROJECT_ID || 'YOUR_PROJECT_ID';

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

export const CONSTANTS = {
  APP_NAME: APP.name,
  DEVICE_SOCKET_URL: process.env.EXPO_PUBLIC_DEVICE_SOCKET_URL || (environment === 'local' ? host(3008) : 'https://devicesocket.vectorfinance.example'),
  MAIN_SOCKET_URL: process.env.EXPO_PUBLIC_SOCKET_URL || (environment === 'local' ? host(4000) : 'https://socket.vectorfinance.example'),
  BACKEND_URL: process.env.EXPO_PUBLIC_BACKEND_URL || (environment === 'local' ? host(1337) + '/api' : 'https://api.vectorfinance.example/api'),
  FRONTEND_URL: process.env.EXPO_PUBLIC_FRONTEND_URL || (environment === 'local' ? host(3000) : 'https://portal.vectorfinance.example'),
  HEARTBEAT_INTERVAL: 30000,
};
export default { SOCKET_EVENTS, WEBVIEW_EVENTS, NATIVE_EVENTS, CONSTANTS };
