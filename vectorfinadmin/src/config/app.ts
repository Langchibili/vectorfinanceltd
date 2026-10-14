// App-specific configuration. Everything else under src/ is shared (_shared) and identical in both apps.
const APP = {
  appKey: 'vectorfinadmin' as 'vectorfin' | 'vectorfinadmin',
  name: 'VectorFin Admin',
  userType: 'admin' as 'client' | 'admin',
  androidPackage: 'com.vectorfinance.admin',
  entryPath: '/admin',
  colors: { background: '#0A0F1E', card: '#111827', text: '#FFFFFF', muted: 'rgba(255,255,255,0.6)', accent: '#C9A84C' },
  // socket notification types that pop an in-app alert while the app is open
  alertTypes: ['document_signed','loan_created','admin_notification'] as string[],
  // fallback deep links when the backend does not send data.route
  notificationRoutes: {document_signed:'/admin/loans',loan_created:'/admin/loans',admin_notification:'/admin'} as Record<string, string>,
};
export default APP;
