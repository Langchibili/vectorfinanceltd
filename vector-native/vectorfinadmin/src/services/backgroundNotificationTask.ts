// Runs when a data push arrives while the app is backgrounded/killed (Android; iOS needs content-available).
// Keep it tiny: the visible notification itself is delivered by the OS from the Expo push payload.
import * as TaskManager from 'expo-task-manager';
import * as Notifications from 'expo-notifications';

const TASK = 'VECTORFIN_BACKGROUND_NOTIFICATION';

TaskManager.defineTask(TASK, async ({ data, error }: any) => {
  if (error) return;
  // Hook for future work: refresh a cached badge count, prefetch loan status, etc.
  console.log('[bg-notification]', JSON.stringify(data?.notification?.data ?? data?.data ?? {}));
});

Notifications.registerTaskAsync(TASK).catch(() => {});
