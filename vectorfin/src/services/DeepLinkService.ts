import { CONSTANTS } from '../utils/constants';
import APP from '../config/app';

// Turns a notification payload into a frontend URL. `data.route` (set by the backend) wins.
export function resolveNotificationUrl(data: any): string | null {
  const base = CONSTANTS.FRONTEND_URL.replace(/\/$/, '');
  if (data?.route && typeof data.route === 'string' && data.route.startsWith('/')) return base + data.route;
  const map = APP.notificationRoutes;
  const route = map[data?.type];
  return route ? base + route : null;
}
