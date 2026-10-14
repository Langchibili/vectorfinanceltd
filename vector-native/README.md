# vector-native
- `sockets/` main (4000) + device (3008) Socket.IO servers
- `backend-additions/` Strapi: device API, realtime service, notification lifecycle hooks
- `_shared/` source shared by both apps; `sync-shared.sh` copies it into each app
- `vectorfin/` client app, `vectorfinadmin/` admin app (Expo 57)
- `frontend-additions/` Next.js nativeBridge + mount component
- `INTEGRATION.md` every trigger/listen point and setup steps
