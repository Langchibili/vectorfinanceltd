# Vector Finance — Native, Socket & Notification Integration

Apps: **vectorfin** (clients) and **vectorfinadmin** (director / ceo / Loan Admin / Collateral Inspector).
Both are thin Expo (SDK 57) shells around your existing Next.js portal.

## 1. Architecture

```
 Strapi (1350)  ──internal token──►  Main socket (4000) ──internal token──► Device socket (3008) ──► vectorfin / vectorfinadmin
   lifecycle hooks                      │ web rooms: user_<id>, admins              │ registry: deviceId ⇄ userId
   realtime.js                          ▼                                           ▼
                                  Next.js in browser                        live app → native notification + WebView event
        │
        └─ not reached by a live device socket ─► Expo Push (exp.host) ─► OS shows notification (app closed/killed)
```

Delivery rule (in `services/realtime.js`): every notification is emitted to web rooms and live devices; the main server acks which
users had **no live device**; only those get an Expo push. Result: no duplicates, and nothing is lost when the app is closed.

## 2. Who triggers what (backend → people)

All wired in `backend/src/hooks/register-notification-hooks.js` using `strapi.db.lifecycles.subscribe`
(none of your existing lifecycle files change).

| Strapi event | Admins (vectorfinadmin) | Client (vectorfin) | Notification `type` | Tap opens |
|---|---|---|---|---|
| `form-fill-value` afterUpdate (signing finished) | "Document signed" | "Your signed copy is ready" | `document_signed` / `document_signed_confirmation` | `/admin/loans/:id` / `/esigning` |
| `loan` afterCreate | "New loan application" | – | `loan_created` | `/admin/loans/:id` |
| `loan` afterUpdate, `loanStatus` changed | realtime refresh only (you already SMS/email them) | approved / disbursed / rejected / under review | `loan_status` | `/` |
| `repayment` afterCreate | – | "Payment received" | `repayment_received` | `/` |
| `investment-deposit` afterCreate | via `admin-notification` below | "Investment payment received" | `investment_deposit` | `/` |
| `admin-notification` afterCreate (your existing flow) | push of the notification title | – | `admin_notification` | loan page or `/admin` |

Add more in one line anywhere in Strapi code:
```js
const { notifyUsers, notifyAdmins } = require('../services/realtime');
await notifyAdmins({ title, body, type: 'x', data: { route: '/admin/loans/12' } });
await notifyUsers([clientId], { title, body, type: 'x', appKey: 'vectorfin', data: { route: '/' } });
```
`data.route` always wins for deep-linking; otherwise `notificationRoutes` in `src/config/app.ts` is used.

## 3. Native ⇄ frontend contract (WebView)

Native injects `window.__VF_NATIVE__ = { app, userType, platform }` before the page loads → `isNative()` in `lib/nativeBridge.js`.

**Frontend → native** (`request(type, payload)` returns a Promise; native replies with the same `requestId`)

| Type | Payload | Fired from | Native action |
|---|---|---|---|
| `INITIALIZE_SERVICES` | `{ userId, authToken, socketServerUrl? }` | `NativeBridgeMount` on login / app load while logged in | asks notification permission, gets Expo push token, connects device socket, `device:register` |
| `STOP_SERVICES` | – | `NativeBridgeMount` on logout (call before clearing JWT) | `device:unregister`, disconnect, `DELETE /api/devices/:userId/:deviceId` |
| `REQUEST_PERMISSION` / `CHECK_PERMISSION` | `{ permissionType: 'notification' }` | settings screens | system permission prompt / status |
| `SHOW_NOTIFICATION` | `{ title, body, data }` | optional | local notification |
| `SHARE_FILE` | `{ fileName, base64, mimeType }` | e.g. after fetching a signed PDF | native share sheet / save |
| `OPEN_URL` | `{ url }` (http/tel/mailto) | external links | `Linking.openURL` |
| `LOG_DATA` | any | debugging | console |

**Native → frontend** (`on(type, fn)`)

| Type | When | Default handling in `NativeBridgeMount` |
|---|---|---|
| `NOTIFICATION_NEW` | socket notification while app open | `window` event `vf:notification` (toast / badge) |
| `NOTIFICATION_RECEIVED` / `NOTIFICATION_TAPPED` | OS notification arrived / tapped | tap → deep link |
| `NAVIGATE_TO` `{ url }` | tap on notification or in-app alert "View" | `router.push(path)` |
| `APP_RESUMED` | app back to foreground | `vf:refresh` (re-fetch loans / docs) |
| `SOCKET_CONNECTED` / `SOCKET_DISCONNECTED` | device socket state | for an online indicator |
| `SESSION_REPLACED` | another account signed in on this phone | `vf:session-replaced` → log out |

Pages should listen to `vf:refresh` / `vf:notification` to reload data, e.g. in `app/admin/loans/[id]/page.js`:
```js
useEffect(() => { const f = () => refetch(); window.addEventListener('vf:refresh', f); return () => window.removeEventListener('vf:refresh', f); }, []);
```

## 4. Socket events

| Hop | Event | Direction | Auth |
|---|---|---|---|
| Browser → main | `join_user_room(userId, ack)` | web joins `user_<id>` (+ `admins` if admin type); JWT verified against `/api/users/me` | `auth.token` |
| Strapi → main | `notify:users {userIds, notification}` → ack `{delivered, undelivered}` | internal | `auth.internalToken` |
| Strapi → main | `realtime:event {userIds, toAdmins, event, data}` | web rooms only | internal |
| main → browser | `notification:new`, `loan:created`, `loan:status`, `document:signed` | | |
| main → device srv | `notify:users` (relay) | internal | internal token |
| App → device srv | `device:register {deviceId,userId,userType,authToken,notificationToken,deviceInfo,appKey}` | JWT verified; `userType` must match account type (client token can't register as admin) | JWT |
| device srv → app | `device:register:success/error`, `notification:new`, `session:replaced` | | |
| App → device srv | `device:unregister`, `ping` (30 s heartbeat) | | |

The main socket service handles only authenticated Vector Finance user/admin
rooms and the notification/realtime events listed here. Unrelated business,
order, waiter-call, and table-event handlers are not part of this service.

HTTP (Strapi): `POST /api/devices/register`, `POST /api/devices/unregister`, `POST /api/devices/updatecurrentloc`, `DELETE /api/devices/:userId/:deviceId`.

## 5. Background behaviour (important, honest limits)

* App open: socket → native notification + in-app alert (admin: signing; client: status) + WebView event.
* App backgrounded: Android/iOS suspend JS, so the socket may drop → delivery falls back to **Expo push** automatically
  (the ack reports the user as undelivered). On resume `ensureConnected()` reconnects and re-registers.
* App killed: Expo push only. Tapping it launches the app and `getLastNotificationResponseAsync` deep-links.
* There is **no draw-over overlay / floating bubble**. Alerts use max-priority channel `alerts` + the in-app modal.
* iOS needs an APNs key in EAS credentials; Android needs `google-services.json` (FCM) — both required for Expo push on real builds.

## 6. Expo SDK 57 implementation notes

* `package.json` pins `expo ~57.0.0`; keep Expo and React Native packages aligned with SDK 57.
* Removed APIs not used any more: `expo-random` and `Constants.installationId` (device id = Android ID / iOS vendor id, fallback persisted in `expo-secure-store`); `Constants.easConfig` kept with `expoConfig.extra.eas` fallback.
* `expo-file-system/legacy` import kept for base64 writes (the new File API is the default in recent SDKs).
* Notification handler uses `shouldShowBanner/shouldShowList` (the old `shouldShowAlert` is deprecated).
* Subscriptions typed `Notifications.EventSubscription`; New Architecture is assumed on (no native custom modules are used, so Expo Go dev-client is enough except for push, which needs a dev build).
* `usesCleartextTraffic` is on for LAN dev; set it to false for production builds.

## 7. Integration status and setup

The integration is now present in this repository: `vectorfin/` and `vectorfinadmin/`
are the Expo apps, `frontend/` is the shared Next.js portal, and `backend/` plus
`sockets/` contain the Strapi and Socket.IO services. Do not copy files from this
snapshot over those application directories.

1. Configure matching `SOCKET_INTERNAL_TOKEN` values in `backend/.env` and
   `sockets/.env`. The socket services use `BACKEND_URL=http://localhost:1350`,
   `MAIN_SOCKET_URL=http://localhost:4000`, and `DEVICE_SOCKET_URL=http://localhost:3008`
   locally. Keep real credentials in ignored `.env` files only.
2. In Strapi Settings → Users & Permissions → Roles → *Authenticated*, manually
   enable the device register, unregister, current-location, device-info, and
   remove routes if the app needs them. Permissions are intentionally not granted
   automatically. The device endpoints enforce the authenticated user and app role.
3. The portal bridge reads the JWT through `frontend/Secrets.js`; the WebView
   injects portal, backend, and socket URLs so Android emulators use the host
   machine rather than their own `localhost`.
   The shared portal's `/admin` entry authenticates staff through its role and
   password form; a staff email is not required by that flow.
4. Copy each native app's `.env.example` to `.env`. Use `10.0.2.2` for the
   Android emulator or this PC's LAN IP for a physical device. Production builds
   must set all service URLs and an EAS project ID; push delivery additionally
   requires valid APNs/FCM credentials.
5. Validate with the repository build/lint scripts and `npx expo export` before
   installing a native build. For end-to-end testing, sign a client form and
   update a loan status; these checks create or modify application data, so use
   an explicitly approved test account and avoid unnecessary records.

## 8. Things to verify against your real code
* The `form-fill-value` afterUpdate hook assumes it fires when signing completes (as in your lifecycle that builds the PDF). It will also fire on other edits to that record; if so add a guard (e.g. only when `signedAt`/status changes).
* Client routes fall back to `/` when a notification does not include `data.route`.
* Device registration accepts only client accounts in `vectorfin` and the configured
  admin account types in `vectorfinadmin`.
