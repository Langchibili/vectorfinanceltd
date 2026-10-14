// DOMException polyfill (socket.io / fetch abort paths on some RN builds)
if (typeof DOMException === 'undefined') {
  (globalThis as any).DOMException = class DOMException extends Error {
    constructor(message?: string, name?: string) { super(message); this.name = name ?? 'DOMException'; }
  };
}
import AppContent from './AppContent';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}
