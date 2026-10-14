import DeviceSocketService from './DeviceSocketService';
import NotificationService from './NotificationService';
import { logger } from '../utils/logger';
import { SOCKET_EVENTS } from '../utils/constants';
import APP from '../config/app';

interface Config { deviceId: string; userId: string | number; socketServerUrl: string; authToken: string; }

class BackgroundService {
  private running = false;
  private unbind: Array<() => void> = [];

  async start(cfg: Config): Promise<boolean> {
    if (this.running) {
      // already running: just refresh the registration (e.g. user switched account)
      return this.register(cfg);
    }
    const ok = await DeviceSocketService.connect(cfg.socketServerUrl);
    if (!ok) return false;
    this.bindNotifications();
    if (!(await this.register(cfg))) {
      this.unbind.forEach((u) => u());
      this.unbind = [];
      DeviceSocketService.disconnect();
      return false;
    }
    this.running = true;
    return true;
  }

  private async register(cfg: Config): Promise<boolean> {
    const { getDeviceInfo } = require('../utils/device-info');
    const registered = await DeviceSocketService.registerDevice({
      deviceId: cfg.deviceId, userId: cfg.userId, userType: APP.userType, appKey: APP.appKey, frontendName: APP.appKey,
      notificationToken: NotificationService.getToken(), deviceInfo: await getDeviceInfo(), authToken: cfg.authToken,
    });
    if (!registered) logger.warn('Device registration was not confirmed by the socket server');
    return registered;
  }

  async stop() {
    this.unbind.forEach((u) => u()); this.unbind = [];
    DeviceSocketService.unregisterDevice();
    DeviceSocketService.disconnect();
    await NotificationService.cancelAll();
    this.running = false;
  }

  // Socket notifications are shown natively here, so they appear even when the WebView is idle.
  private bindNotifications() {
    this.unbind.forEach((u) => u());
    const show = (data: any) => {
      const title = typeof data?.title === 'string' ? data.title : APP.name;
      const body = typeof data?.body === 'string' ? data.body : data?.message || 'You have a new notification';
      NotificationService.show({ title, body, data: data?.data ?? data }).catch((e) => logger.error('show notification', e));
    };
    this.unbind = [
      DeviceSocketService.on(SOCKET_EVENTS.NOTIFICATION.NEW, show),
      DeviceSocketService.on(SOCKET_EVENTS.NOTIFICATION.BROADCAST, show),
      DeviceSocketService.on(SOCKET_EVENTS.SYSTEM.ANNOUNCEMENT, show),
    ];
  }
  isRunning() { return this.running; }
}
export default new BackgroundService();
