import * as Notifications from 'expo-notifications';
import * as IntentLauncher from 'expo-intent-launcher';
import { Platform, Linking } from 'react-native';
import APP from '../config/app';
import { logger } from '../utils/logger';

class PermissionManager {
  async requestCriticalPermissions() {
    return { notification: await this.requestNotificationPermission() };
  }
  async requestNotificationPermission(): Promise<boolean> {
    try {
      const { status: existing } = await Notifications.getPermissionsAsync();
      if (existing === 'granted') return true;
      return (await Notifications.requestPermissionsAsync()).status === 'granted';
    } catch (e) { logger.error('Notification permission error', e); return false; }
  }
  async check(type: string) {
    if (type === 'notification') return (await Notifications.getPermissionsAsync()).status;
    return 'unsupported';
  }
  async request(type: string) {
    if (type === 'notification') return (await this.requestNotificationPermission()) ? 'granted' : 'denied';
    return 'unsupported';
  }
  async openAppSettings() {
    try {
      if (Platform.OS === 'ios') await Linking.openURL('app-settings:');
      else await IntentLauncher.startActivityAsync(IntentLauncher.ActivityAction.APPLICATION_DETAILS_SETTINGS, { data: `package:${APP.androidPackage}` });
    } catch (e) { logger.error('openAppSettings', e); }
  }
}
export default new PermissionManager();
