import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { logger } from '../utils/logger';
import { EXPO_PUBLIC_PROJECT_ID, WEBVIEW_EVENTS } from '../utils/constants';

// Foreground behaviour: still show banner + sound while the app is open
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true, shouldShowList: true, shouldPlaySound: true, shouldSetBadge: false,
  }),
});

type Sender = (d: { type: string; payload?: any }) => void;
export type TapHandler = (data: any) => void;

class NotificationService {
  private token: string | null = null;
  private send: Sender | null = null;
  private onTap: TapHandler | null = null;
  private subs: Notifications.EventSubscription[] = [];

  async initialize(send: Sender, onTap?: TapHandler) {
    this.send = send; this.onTap = onTap || null;
    const { status } = await this.requestPermissions();
    if (status !== 'granted') { logger.warn('Notification permission not granted'); return; }
    try { await this.registerForPush(); } catch (e) { logger.warn('Push token unavailable; local notifications still work', e); }
    await this.setupChannels();
    this.listen();
    // app opened by tapping a notification while killed
    const last = await Notifications.getLastNotificationResponseAsync();
    if (last) this.handleTap(last.notification.request.content.data);
  }

  async requestPermissions() {
    if (!Device.isDevice) return { status: 'denied' };
    const { status: existing } = await Notifications.getPermissionsAsync();
    if (existing === 'granted') return { status: existing };
    return { status: (await Notifications.requestPermissionsAsync()).status };
  }

  async registerForPush(): Promise<string | null> {
    if (!Device.isDevice) return null;
    const projectId = Constants.expoConfig?.extra?.eas?.projectId || EXPO_PUBLIC_PROJECT_ID;
    if (!projectId) throw new Error('Set EXPO_PUBLIC_EAS_PROJECT_ID to enable Expo push notifications');
    this.token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
    return this.token;
  }

  private async setupChannels() {
    if (Platform.OS !== 'android') return;
    await Notifications.setNotificationChannelAsync('default', { name: 'General', importance: Notifications.AndroidImportance.DEFAULT });
    await Notifications.setNotificationChannelAsync('alerts', {
      name: 'Important alerts', importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250], lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
    });
  }

  private listen() {
    this.cleanup();
    this.subs.push(Notifications.addNotificationReceivedListener((n) => {
      this.send?.({ type: WEBVIEW_EVENTS.NOTIFICATION_RECEIVED, payload: { title: n.request.content.title, body: n.request.content.body, data: n.request.content.data } });
    }));
    this.subs.push(Notifications.addNotificationResponseReceivedListener((r) => this.handleTap(r.notification.request.content.data)));
  }

  private handleTap(data: any) {
    this.send?.({ type: WEBVIEW_EVENTS.NOTIFICATION_TAPPED, payload: data });
    this.onTap?.(data);
  }

  async show(n: { title: string; body: string; data?: any; channelId?: string }) {
    await Notifications.scheduleNotificationAsync({
      content: { title: n.title, body: n.body, data: n.data || {}, sound: 'default', ...(Platform.OS === 'android' && { channelId: n.channelId || 'alerts' }) },
      trigger: null,
    });
  }

  async cancelAll() {
    await Notifications.cancelAllScheduledNotificationsAsync();
    await Notifications.dismissAllNotificationsAsync();
  }
  getToken() { return this.token; }
  cleanup() { this.subs.forEach((s) => s.remove()); this.subs = []; }
}
export default new NotificationService();
