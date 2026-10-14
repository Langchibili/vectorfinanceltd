import * as Device from 'expo-device';
import * as Application from 'expo-application';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

// Stable per-install id. Android ID / iOS vendor id first; otherwise a generated id kept in SecureStore.
// (Constants.installationId and expo-random were removed in recent SDKs, so they are not used.)
const KEY = 'vf_device_id';
let cached: string | null = null;

async function getDeviceId(): Promise<string> {
  if (cached) return cached;
  try {
    const native = Platform.OS === 'android' ? Application.getAndroidId() : await Application.getIosIdForVendorAsync();
    if (native) return (cached = `${Platform.OS}-${native}`);
  } catch {}
  try {
    const stored = await SecureStore.getItemAsync(KEY);
    if (stored) return (cached = stored);
    const fresh = `${Platform.OS}-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
    await SecureStore.setItemAsync(KEY, fresh);
    return (cached = fresh);
  } catch {
    return (cached = `${Platform.OS}-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`);
  }
}

export async function getDeviceInfo() {
  return {
    deviceId: await getDeviceId(),
    deviceName: Device.deviceName || 'Unknown Device',
    platform: Platform.OS,
    platformVersion: Platform.Version,
    manufacturer: Device.manufacturer || 'Unknown',
    modelName: Device.modelName || 'Unknown',
    osName: Device.osName || Platform.OS,
    osVersion: Device.osVersion || String(Platform.Version),
    appVersion: Application.nativeApplicationVersion || '1.0.0',
    buildNumber: Application.nativeBuildVersion || '1',
    expoVersion: Constants.expoConfig?.sdkVersion || 'unknown',
    isDevice: Device.isDevice,
  };
}
