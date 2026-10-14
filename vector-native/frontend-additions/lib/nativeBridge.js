/**
 * Next.js <-> native shell bridge (vectorfin / vectorfinadmin).
 * Works only inside the Expo WebView; in a normal browser every call is a harmless no-op.
 *
 * Native injects window.__VF_NATIVE__ = { app, userType, platform } before the page loads.
 * Web -> native: window.ReactNativeWebView.postMessage(JSON { type, requestId, payload })
 * Native -> web: 'message' event (document on Android, window on iOS) with JSON { type, payload } (+ requestId for replies)
 */
const pending = new Map();
const listeners = new Map();
let started = false;
let seq = 0;

export const isNative = () => typeof window !== "undefined" && !!window.ReactNativeWebView && !!window.__VF_NATIVE__;
export const nativeInfo = () => (typeof window !== "undefined" ? window.__VF_NATIVE__ || null : null);

function handle(event) {
  let msg;
  try { msg = typeof event.data === "string" ? JSON.parse(event.data) : event.data; } catch { return; }
  if (!msg || !msg.type) return;
  if (msg.requestId && pending.has(msg.requestId)) {
    const { resolve, reject, timer } = pending.get(msg.requestId);
    clearTimeout(timer); pending.delete(msg.requestId);
    return msg.error ? reject(new Error(msg.error)) : resolve(msg.payload);
  }
  (listeners.get(msg.type) || []).forEach((fn) => { try { fn(msg.payload); } catch (e) { console.error(e); } });
}

function start() {
  if (started || typeof window === "undefined") return;
  started = true;
  window.addEventListener("message", handle);   // iOS
  document.addEventListener("message", handle); // Android
}

export function request(type, payload = {}, timeoutMs = 20000) {
  if (!isNative()) return Promise.resolve(null);
  start();
  return new Promise((resolve, reject) => {
    const requestId = `${Date.now()}_${++seq}`;
    const timer = setTimeout(() => { pending.delete(requestId); reject(new Error(`${type} timed out`)); }, timeoutMs);
    pending.set(requestId, { resolve, reject, timer });
    window.ReactNativeWebView.postMessage(JSON.stringify({ type, requestId, payload }));
  });
}

/** Subscribe to a native event; returns an unsubscribe function. */
export function on(type, fn) {
  start();
  if (!listeners.has(type)) listeners.set(type, new Set());
  listeners.get(type).add(fn);
  return () => listeners.get(type)?.delete(fn);
}

/** Call right after login / on every app load while logged in. */
export const initializeServices = ({ userId, authToken }) =>
  request("INITIALIZE_SERVICES", { userId, authToken, socketServerUrl: process.env.NEXT_PUBLIC_DEVICE_SOCKET_URL || undefined });

/** Call BEFORE clearing the JWT on logout. */
export const stopServices = () => request("STOP_SERVICES");
export const shareFile = (fileName, base64, mimeType = "application/pdf") => request("SHARE_FILE", { fileName, base64, mimeType });
export const openExternal = (url) => request("OPEN_URL", { url });
export const showLocalNotification = (title, body, data) => request("SHOW_NOTIFICATION", { title, body, data });
