import io, { Socket } from 'socket.io-client';
import NetInfo from '@react-native-community/netinfo';
import { logger } from '../utils/logger';
import { SOCKET_EVENTS, CONSTANTS } from '../utils/constants';

const S = SOCKET_EVENTS;
type Handler = (data: any) => void;

export interface DeviceRegistration {
  deviceId: string; userId: string | number; userType: 'client' | 'admin';
  appKey: string; frontendName: string; notificationToken: string | null; deviceInfo: any; authToken: string;
}

class DeviceSocketService {
  private socket: Socket | null = null;
  private url = '';
  private connected = false;
  private handlers = new Map<string, Set<Handler>>();
  private registration: DeviceRegistration | null = null;
  private heartbeat: ReturnType<typeof setInterval> | null = null;

  async connect(url: string): Promise<boolean> {
    this.url = url;
    const net = await NetInfo.fetch();
    if (!net.isConnected) return false;
    this.socket?.close();

    this.socket = io(url, {
      transports: ['websocket', 'polling'], reconnection: true,
      reconnectionDelay: 1000, reconnectionDelayMax: 15000, reconnectionAttempts: Infinity, timeout: 10000,
    });
    this.bind();

    return new Promise((resolve) => {
      const t = setTimeout(() => resolve(false), 15000);
      this.socket!.once(S.CONNECT, () => { clearTimeout(t); resolve(true); });
      this.socket!.once(S.CONNECTION.CONNECT_ERROR, () => { clearTimeout(t); resolve(false); });
    });
  }

  private bind() {
    const s = this.socket!;
    s.on(S.CONNECT, () => {
      this.connected = true; this.startHeartbeat();
      this.fire(S.CONNECTED, {});
      if (this.registration) s.emit(S.DEVICE.REGISTER, this.registration); // re-register after every reconnect
    });
    s.on(S.DISCONNECT, (reason) => { this.connected = false; this.stopHeartbeat(); this.fire(S.DISCONNECTED, { reason }); });
    s.on(S.CONNECTION.ERROR, (e) => this.fire('socket_error', e));

    s.on(S.DEVICE.REGISTER_SUCCESS, (d) => this.fire('device_registered', d));
    s.on(S.DEVICE.REGISTER_ERROR, (e) => { logger.warn('Device register failed', e); this.fire('device_registration_error', e); });

    [S.NOTIFICATION.NEW, S.NOTIFICATION.BROADCAST, S.SYSTEM.ANNOUNCEMENT, S.SESSION.REPLACED].forEach((ev) =>
      s.on(ev, (d) => this.fire(ev, d)));
  }

  registerDevice(reg: DeviceRegistration) {
    this.registration = reg;
    if (this.socket && this.connected) this.socket.emit(S.DEVICE.REGISTER, reg);
  }

  unregisterDevice() {
    if (this.registration && this.socket && this.connected) this.socket.emit(S.DEVICE.UNREGISTER, { deviceId: this.registration.deviceId });
    this.registration = null;
  }

  emit(event: string, data: any) { if (this.socket && this.connected) this.socket.emit(event, data); }

  on(event: string, h: Handler): () => void {
    if (!this.handlers.has(event)) this.handlers.set(event, new Set());
    this.handlers.get(event)!.add(h);
    return () => this.handlers.get(event)?.delete(h);
  }

  private fire(event: string, data: any) {
    this.handlers.get(event)?.forEach((h) => { try { h(data); } catch (e) { logger.error(`Handler error ${event}`, e); } });
  }

  private startHeartbeat() {
    this.stopHeartbeat();
    this.heartbeat = setInterval(() => this.socket && this.connected && this.socket.emit(S.CONNECTION.PING, { t: Date.now() }), CONSTANTS.HEARTBEAT_INTERVAL);
  }
  private stopHeartbeat() { if (this.heartbeat) clearInterval(this.heartbeat); this.heartbeat = null; }

  /** Called when the app returns to the foreground: Android may have killed the socket silently. */
  async ensureConnected(): Promise<boolean> {
    if (this.isConnected()) return true;
    return this.url ? this.connect(this.url) : false;
  }

  disconnect() {
    this.stopHeartbeat(); this.handlers.clear(); this.registration = null;
    this.socket?.close(); this.socket = null; this.connected = false;
  }
  isConnected() { return this.connected && this.socket?.connected === true; }
}
export default new DeviceSocketService();
