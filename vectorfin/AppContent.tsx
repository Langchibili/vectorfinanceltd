import React, { useRef, useEffect, useState, useCallback } from 'react';
import { StatusBar, Platform, AppState, StyleSheet, BackHandler, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import NetInfo from '@react-native-community/netinfo';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';

import APP from './src/config/app';
import BackgroundService from './src/services/BackgroundService';
import DeviceSocketService from './src/services/DeviceSocketService';
import NotificationService from './src/services/NotificationService';
import PermissionManager from './src/services/PermissionManager';
import { resolveNotificationUrl } from './src/services/DeepLinkService';
import { getDeviceInfo } from './src/utils/device-info';
import { logger } from './src/utils/logger';
import { SOCKET_EVENTS, WEBVIEW_EVENTS, NATIVE_EVENTS, CONSTANTS } from './src/utils/constants';
import { AlertModal, AlertData } from './src/components/AlertModal';
import { ConnectionLostBanner } from './src/components/ConnectionLostBanner';
import OfflineScreen from './src/components/OfflineScreen';

const FRONTEND_ORIGIN = new URL(CONSTANTS.FRONTEND_URL).origin;
const START_URL = CONSTANTS.FRONTEND_URL.replace(/\/$/, '') + APP.entryPath;

// Tells the Next.js frontend it is running inside the native shell (read by lib/nativeBridge.js)
const INJECTED_BEFORE_LOAD = `window.__VF_NATIVE__ = ${JSON.stringify({
  app: APP.appKey,
  userType: APP.userType,
  platform: Platform.OS,
  portalUrl: CONSTANTS.FRONTEND_URL,
  backendUrl: CONSTANTS.BACKEND_URL,
  socketUrl: CONSTANTS.MAIN_SOCKET_URL,
  deviceSocketUrl: CONSTANTS.DEVICE_SOCKET_URL,
})}; true;`;

export default function AppContent() {
  const webViewRef = useRef<WebView>(null);
  const [isConnected, setIsConnected] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);
  const [alert, setAlert] = useState<AlertData | null>(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [targetUrl, setTargetUrl] = useState(START_URL);

  const sessionRef = useRef<{ deviceId: string; userId: string | number; authToken: string } | null>(null);
  const webReadyRef = useRef(false);
  const socketSubscriptions = useRef<Array<() => void>>([]);

  const sendToWebView = useCallback((data: { type: string; payload?: any }) => {
    webViewRef.current?.postMessage(JSON.stringify({ type: data.type, payload: data.payload ?? {} }));
  }, []);

  const navigateTo = useCallback((url: string) => {
    const safe = (() => { try { return new URL(url).origin === FRONTEND_ORIGIN; } catch { return false; } })();
    if (!safe) return;
    // If the page is already loaded let the SPA route; otherwise load the URL directly
    if (webReadyRef.current) sendToWebView({ type: WEBVIEW_EVENTS.NAVIGATE_TO, payload: { url } });
    else setTargetUrl(url);
  }, [sendToWebView]);

  const openFromNotification = useCallback((data: any) => {
    const url = resolveNotificationUrl(data);
    if (url) navigateTo(url);
  }, [navigateTo]);

  // hardware back
  useEffect(() => {
    const h = BackHandler.addEventListener('hardwareBackPress', () => {
      if (alertOpen) { setAlertOpen(false); return true; }
      if (canGoBack && webViewRef.current) { webViewRef.current.goBack(); return true; }
      return false;
    });
    return () => h.remove();
  }, [alertOpen, canGoBack]);

  // push registration + notification tap routing (runs once per launch, before login)
  useEffect(() => {
    NotificationService.initialize(sendToWebView, openFromNotification).catch((e) => logger.warn('notification init', e));
    return () => NotificationService.cleanup();
  }, [sendToWebView, openFromNotification]);

  useEffect(() => {
    const unsub = NetInfo.addEventListener((s) => setIsConnected(s.isConnected ?? false));
    return () => unsub();
  }, []);

  // foreground resume: the OS may have killed the socket while we were in the background
  useEffect(() => {
    const sub = AppState.addEventListener('change', async (next) => {
      if (next !== 'active') return;
      sendToWebView({ type: WEBVIEW_EVENTS.APP_RESUMED });
      if (sessionRef.current) await DeviceSocketService.ensureConnected();
    });
    return () => sub.remove();
  }, [sendToWebView]);

  // socket -> native + WebView + in-app alert
  const bindSocket = useCallback(() => {
    socketSubscriptions.current.forEach((unsubscribe) => unsubscribe());
    socketSubscriptions.current = [
      DeviceSocketService.on(SOCKET_EVENTS.NOTIFICATION.NEW, (data: any) => {
        sendToWebView({ type: WEBVIEW_EVENTS.NOTIFICATION_NEW, payload: data });
        if (AppState.currentState === 'active' && APP.alertTypes.includes(data?.type)) {
          setAlert({ title: data.title, body: data.body, data: data.data ?? data });
          setAlertOpen(true);
        }
      }),
      DeviceSocketService.on(SOCKET_EVENTS.CONNECTED, () => sendToWebView({ type: WEBVIEW_EVENTS.SOCKET_CONNECTED })),
      DeviceSocketService.on(SOCKET_EVENTS.DISCONNECTED, (data: any) => sendToWebView({ type: WEBVIEW_EVENTS.SOCKET_DISCONNECTED, payload: data })),
      DeviceSocketService.on(SOCKET_EVENTS.SESSION.REPLACED, (data: any) => sendToWebView({ type: WEBVIEW_EVENTS.SESSION_REPLACED, payload: data })),
    ];
  }, [sendToWebView]);

  useEffect(() => () => {
    socketSubscriptions.current.forEach((unsubscribe) => unsubscribe());
    socketSubscriptions.current = [];
  }, []);

  const handleInitializeServices = async (payload: any) => {
    try {
      const { userId, authToken, socketServerUrl } = payload || {};
      if (!userId || !authToken) return { error: 'userId and authToken are required' };
      const { deviceId } = await getDeviceInfo();
      sessionRef.current = { deviceId, userId, authToken };

      const permissions = await PermissionManager.requestCriticalPermissions();
      // push token may only exist now (permission just granted) -> retry
      if (!NotificationService.getToken()) {
        try {
          await NotificationService.registerForPush();
        } catch (error) {
          logger.warn('Push token registration unavailable', error);
        }
      }

      const started = await BackgroundService.start({ deviceId, userId, authToken, socketServerUrl: socketServerUrl || CONSTANTS.DEVICE_SOCKET_URL });
      if (!started) return { error: 'Failed to start services' };
      bindSocket();
      return { success: true, deviceId, permissions, socketConnected: DeviceSocketService.isConnected(), pushToken: !!NotificationService.getToken() };
    } catch (e: any) { return { error: e.message }; }
  };

  const handleStopServices = async () => {
    const s = sessionRef.current;
    await BackgroundService.stop();
    if (s) { // remove the push token from this user so a logged-out phone stops receiving pushes
      await fetch(`${CONSTANTS.BACKEND_URL}/devices/${s.userId}/${s.deviceId}?appKey=${APP.appKey}`, { method: 'DELETE', headers: { Authorization: `Bearer ${s.authToken}` } }).then((response) => { if (!response.ok) throw new Error(`HTTP ${response.status}`); }).catch((error) => logger.warn('Could not remove native device registration during logout', error));
    }
    sessionRef.current = null;
    return { success: true };
  };

  const onMessage = async (event: any) => {
    try {
      const { type, requestId, payload } = JSON.parse(event.nativeEvent.data);
      let response: any = null;
      switch (type) {
        case NATIVE_EVENTS.INITIALIZE_SERVICES: response = await handleInitializeServices(payload); break;
        case NATIVE_EVENTS.STOP_SERVICES: response = await handleStopServices(); break;
        case NATIVE_EVENTS.REQUEST_PERMISSION: response = { status: await PermissionManager.request(payload?.permissionType) }; break;
        case NATIVE_EVENTS.CHECK_PERMISSION: response = { status: await PermissionManager.check(payload?.permissionType) }; break;
        case NATIVE_EVENTS.SHOW_NOTIFICATION: await NotificationService.show(payload); response = { success: true }; break;
        case NATIVE_EVENTS.OPEN_URL: {
          const url = String(payload?.url || '');
          if (!/^(https?:|tel:|mailto:)/.test(url)) { response = { error: 'Unsupported URL' }; break; }
          await Linking.openURL(url); response = { success: true }; break;
        }
        case NATIVE_EVENTS.SHARE_FILE: { // signed PDFs etc: { fileName, base64, mimeType }
          const fileName = String(payload?.fileName || '');
          if (!/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(fileName) || !payload?.base64) { response = { error: 'Invalid file' }; break; }
          if (!FileSystem.cacheDirectory) { response = { error: 'Storage unavailable' }; break; }
          const uri = FileSystem.cacheDirectory + fileName;
          await FileSystem.writeAsStringAsync(uri, payload.base64, { encoding: FileSystem.EncodingType.Base64 });
          if (!(await Sharing.isAvailableAsync())) { response = { error: 'Sharing unavailable' }; break; }
          await Sharing.shareAsync(uri, { mimeType: payload.mimeType || 'application/pdf' });
          response = { success: true }; break;
        }
        case NATIVE_EVENTS.LOG_DATA: logger.debug('webview', payload); response = { success: true }; break;
        default: response = { error: 'Unknown message type' };
      }
      if (requestId) {
        webViewRef.current?.postMessage(JSON.stringify({ type, requestId, payload: response?.error ? null : response, error: response?.error }));
      }
    } catch (e) { logger.error('onMessage error', e); }
  };

  const reload = () => { setHasError(false); webViewRef.current?.reload(); };

  if (!isConnected) return <OfflineScreen onRetry={reload} />;

  return (
    <SafeAreaView style={[s.container, { backgroundColor: APP.colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={APP.colors.background} />
      <ConnectionLostBanner visible={hasError} onRetry={reload} message="Connection lost" />
      <WebView
        ref={webViewRef}
        source={{ uri: targetUrl }}
        injectedJavaScriptBeforeContentLoaded={INJECTED_BEFORE_LOAD}
        onShouldStartLoadWithRequest={(req) => {
          if (req.url.startsWith('tel:') || req.url.startsWith('mailto:')) { Linking.openURL(req.url).catch(() => {}); return false; }
          if (req.url === 'about:blank') return true;
          try { return new URL(req.url).origin === FRONTEND_ORIGIN; } catch { return false; }
        }}
        onMessage={onMessage}
        javaScriptEnabled domStorageEnabled startInLoadingState
        allowsBackForwardNavigationGestures
        style={s.web}
        onNavigationStateChange={(n) => setCanGoBack(n.canGoBack)}
        onLoadEnd={() => { webReadyRef.current = true; }}
        onError={() => setHasError(true)}
      />
      <AlertModal
        open={alertOpen} alert={alert}
        onOpen={(a) => { setAlertOpen(false); openFromNotification(a.data); }}
        onDismiss={() => setAlertOpen(false)}
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({ container: { flex: 1 }, web: { flex: 1, backgroundColor: 'transparent' } });
