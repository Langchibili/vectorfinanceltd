// Entry point. The background task MUST be imported here so it is defined before React mounts.
import './src/services/backgroundNotificationTask';
import { registerRootComponent } from 'expo';
import App from './App';

registerRootComponent(App);
