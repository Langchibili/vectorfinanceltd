// App-specific configuration. Everything else under src/ is shared (_shared) and identical in both apps.
const APP = {
  appKey: 'vectorfin' as 'vectorfin' | 'vectorfinadmin',
  name: 'Vector Finance',
  userType: 'client' as 'client' | 'admin',
  androidPackage: 'com.vectorfinance.client',
  entryPath: '/',
  colors: { background: '#0A0F1E', card: '#111827', text: '#FFFFFF', muted: 'rgba(255,255,255,0.6)', accent: '#10B981' },
  // socket notification types that pop an in-app alert while the app is open
  alertTypes: ['loan_status','document_signed_confirmation','repayment_received'] as string[],
  // fallback deep links when the backend does not send data.route
  notificationRoutes: {loan_status:'/',document_signed_confirmation:'/esigning',repayment_received:'/'} as Record<string, string>,
};
export default APP;
