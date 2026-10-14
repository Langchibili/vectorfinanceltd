require('dotenv').config();

// device-socket-server/src/index.js
// ==================== DEVICE SOCKET SERVER (Smart Menu AI) ====================
// Allows ALL origins for native staff device connections and routes
// order / waiter-call / table events between the main socket server and devices.

const { createServer } = require("http");
const { Server } = require("socket.io");
const fs = require('fs');
const path = require('path');
const axios = require("axios");
const winston = require("winston");
const { io: ioClient } = require("socket.io-client");

// ==================== ENVIRONMENT CONFIGURATION ====================
const environment = process.env.NODE_ENV || 'local';
const MAIN_SOCKET_URL = process.env.MAIN_SOCKET_URL || 'http://localhost:4000';
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:1350';
const BACKEND_API_URL = `${BACKEND_URL.replace(/\/$/, '').replace(/\/api$/, '')}/api`;
const PORT = Number(process.env.DEVICESPORT || 3008);
if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
    throw new Error('DEVICESPORT must be a valid TCP port between 1 and 65535');
}
const SOCKET_INTERNAL_TOKEN = process.env.SOCKET_INTERNAL_TOKEN;
const ADMIN_TYPES = ['director', 'ceo', 'Loan Admin', 'Collateral Inspector'];
const LOG_FILE_MAX_SIZE = 100 * 1024 * 1024; // 100MB

// ==================== LOGGER SETUP ====================
const checkAndRotateLog = (filename) => {
    const filepath = path.join(__dirname, '..', 'logs', filename);
    try {
        const stats = fs.statSync(filepath);
        if (stats.size > LOG_FILE_MAX_SIZE) {
            fs.unlinkSync(filepath);
            console.error(`Rotated log file: ${filename}`);
        }
    } catch (error) {
        // File doesn't exist yet
    }
};

const logger = winston.createLogger({
    level: 'error',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
            level: 'error'
        }),
        new winston.transports.File({
            filename: 'logs/device-error.log',
            level: 'error',
            maxsize: LOG_FILE_MAX_SIZE,
            maxFiles: 1
        })
    ]
});

checkAndRotateLog('device-error.log');
checkAndRotateLog('device-combined.log');

// ==================== HTTP & SOCKET.IO SERVER SETUP ====================
const httpServer = createServer();

// ALLOW ALL ORIGINS - Critical for native devices
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    },
    pingTimeout: 60000,
    pingInterval: 25000,
    transports: ['websocket', 'polling']
});

// ==================== DEVICE CONNECTION TRACKING ====================
const deviceConnections = new Map(); // app/device key -> device connection
const userDevices = new Map();       // userId (string) -> Set of app/device keys

// ==================== HELPER: Normalize userId to string ====================
function normalizeUserId(userId) {
    return String(userId);
}

function registrationKey(deviceId, appKey, frontendName) {
    return `${appKey || frontendName || 'legacy'}:${deviceId}`;
}

function removeDeviceConnection(key, device) {
    if (!device) return;
    const devices = userDevices.get(normalizeUserId(device.userId));
    if (devices) {
        devices.delete(key);
        if (devices.size === 0) userDevices.delete(normalizeUserId(device.userId));
    }
    deviceConnections.delete(key);
}

function getDeviceForSocket(socket, deviceId) {
    for (const device of deviceConnections.values()) {
        if (device.deviceId === deviceId && device.socketId === socket.id) return device;
    }
    return null;
}

// ==================== SOCKET.IO CLIENT TO MAIN SERVER ====================
let mainSocket = null;

function connectToMainServer() {
    mainSocket = ioClient(MAIN_SOCKET_URL, {
        autoConnect: true,
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: Infinity,
        transports: ['websocket', 'polling'],
        auth: SOCKET_INTERNAL_TOKEN ? { internalToken: SOCKET_INTERNAL_TOKEN } : {}
    });

    mainSocket.on('connect', () => {
        console.log('✅ Device server connected to main socket server');
    });

    mainSocket.on('disconnect', (reason) => {
        logger.warn('❌ Device server disconnected from main socket server:', reason);
    });

    mainSocket.on('connect_error', (error) => {
        logger.error('❌ Connection error to main server:', error.message);
    });

    setupMainServerEventForwarding();
}

// ==================== HELPER FUNCTION ====================
function forwardToUserDevices(userId, eventName, data, appKey) {
    if (!userId) return 0;
    const key = normalizeUserId(userId);
    const deviceKeys = userDevices.get(key);
    if (!deviceKeys || deviceKeys.size === 0) return 0;

    let sentCount = 0;
    deviceKeys.forEach(deviceKey => {
        const device = deviceConnections.get(deviceKey);
        if (device && (!appKey || !device.appKey || device.appKey === appKey)) {
            const socket = io.sockets.sockets.get(device.socketId);
            if (socket) {
                socket.emit(eventName, data);
                sentCount++;
            }
        }
    });

    return sentCount;
}

function setupMainServerEventForwarding() {
    // ==================== ORDER EVENTS ====================

    // payload: { ownerId, waiterId, payload }
    mainSocket.on('order:new', (data) => {
        const { ownerId, waiterId, payload } = data;
        if (ownerId) forwardToUserDevices(ownerId, 'order:new', payload);
        if (waiterId) forwardToUserDevices(waiterId, 'order:new', payload);
    });

    mainSocket.on('order:status:updated', (data) => {
        const { ownerId, waiterId, payload } = data;
        if (ownerId) forwardToUserDevices(ownerId, 'order:status:updated', payload);
        if (waiterId) forwardToUserDevices(waiterId, 'order:status:updated', payload);
    });

    // ==================== WAITER CALL EVENTS ====================

    // payload: { ownerId, waiterId, payload, eventType }
    mainSocket.on('waiter_call:new', (data) => {
        const { ownerId, waiterId, waiterIds = [], payload, eventType } = data;
        const eventName = eventType === 'create'
            ? 'waiter_call:new'
            : eventType === 'acknowledged'
                ? 'waiter_call:acknowledged'
                : `waiter_call:${eventType || 'updated'}`;
        if (ownerId) forwardToUserDevices(ownerId, eventName, payload);
        if (waiterId) forwardToUserDevices(waiterId, eventName, payload);
        waiterIds.forEach((id) => forwardToUserDevices(id, eventName, payload));
    });

    mainSocket.on('waiter_call:resolved', (data) => {
        const { ownerId, waiterId, waiterIds = [], payload } = data;
        if (ownerId) forwardToUserDevices(ownerId, 'waiter_call:resolved', payload);
        if (waiterId) forwardToUserDevices(waiterId, 'waiter_call:resolved', payload);
        waiterIds.forEach((id) => forwardToUserDevices(id, 'waiter_call:resolved', payload));
    });

    // ==================== TABLE EVENTS ====================

    mainSocket.on('table:status:updated', (data) => {
        const { ownerId, payload } = data;
        if (ownerId) forwardToUserDevices(ownerId, 'table:status:updated', payload);
    });

    // ==================== NOTIFICATION EVENTS ====================

    mainSocket.on('notification:new', (data) => {
        const { userId } = data;
        if (userId) forwardToUserDevices(userId, 'notification:new', data, data.appKey);
    });

    mainSocket.on('device:notification:send', (data) => {
        const { userId, notification } = data;
        if (userId) forwardToUserDevices(userId, 'showNotification', notification, notification?.appKey);
    });

    mainSocket.on('notification:broadcast', (data) => {
        deviceConnections.forEach((device) => {
            const socket = io.sockets.sockets.get(device.socketId);
            if (socket) {
                socket.emit('notification:broadcast', data);
            }
        });
        console.log(`📢 Broadcast notification to ${deviceConnections.size} devices`);
    });

    // ==================== SYSTEM EVENTS ====================

    mainSocket.on('system:announcement', (data) => {
        deviceConnections.forEach((device) => {
            const socket = io.sockets.sockets.get(device.socketId);
            if (socket) {
                socket.emit('system:announcement', data);
            }
        });
        console.log(`📢 System announcement sent to ${deviceConnections.size} devices`);
    });

    // ==================== SESSION REPLACED EVENTS ====================

    mainSocket.on('owner:session-replaced', (data) => {
        const { ownerId } = data;
        if (ownerId) forwardToUserDevices(ownerId, 'owner:session-replaced', data);
    });

    mainSocket.on('employee:session-replaced', (data) => {
        const { employeeId } = data;
        if (employeeId) forwardToUserDevices(employeeId, 'employee:session-replaced', data);
    });

    // ==================== ERROR EVENTS ====================

    mainSocket.on('error', (data) => {
        const { userId } = data;
        if (userId) forwardToUserDevices(userId, 'error', data);
    });

    // ==================== PONG EVENTS ====================

    mainSocket.on('pong', (data) => {
        console.log('Received pong from main server');
    });
}

// ==================== DEVICE SOCKET HANDLERS ====================
io.on("connection", (socket) => {
    console.log(`📱 New device connection: ${socket.id}`);
    const isInternalRelay = Boolean(
        SOCKET_INTERNAL_TOKEN &&
        socket.handshake.auth?.internalToken === SOCKET_INTERNAL_TOKEN
    );
    const onInternalRelayEvent = (eventName, handler) => (data = {}) => {
        if (!isInternalRelay) {
            logger.warn(`Rejected untrusted relay event '${eventName}' from socket ${socket.id}`);
            socket.emit('device:relay:error', { message: 'Internal relay authentication failed' });
            return;
        }
        handler(data);
    };

    socket.on('order:new', onInternalRelayEvent('order:new', ({ ownerId, waiterId, payload }) => {
        if (ownerId) forwardToUserDevices(ownerId, 'order:new', payload);
        if (waiterId) forwardToUserDevices(waiterId, 'order:new', payload);
    }));

    socket.on('order:status:updated', onInternalRelayEvent('order:status:updated', ({ ownerId, waiterId, payload }) => {
        if (ownerId) forwardToUserDevices(ownerId, 'order:status:updated', payload);
        if (waiterId) forwardToUserDevices(waiterId, 'order:status:updated', payload);
    }));

    socket.on('waiter_call:new', onInternalRelayEvent('waiter_call:new', ({ ownerId, waiterId, waiterIds = [], payload, eventType }) => {
        const eventName = eventType === 'create'
            ? 'waiter_call:new'
            : eventType === 'acknowledged'
                ? 'waiter_call:acknowledged'
                : eventType === 'resolved'
                    ? 'waiter_call:resolved'
                    : `waiter_call:${eventType || 'updated'}`;
        if (ownerId) forwardToUserDevices(ownerId, eventName, payload);
        if (waiterId) forwardToUserDevices(waiterId, eventName, payload);
        waiterIds.forEach((id) => forwardToUserDevices(id, eventName, payload));
    }));

    socket.on('table:status:updated', onInternalRelayEvent('table:status:updated', ({ ownerId, payload }) => {
        if (ownerId) forwardToUserDevices(ownerId, 'table:status:updated', payload);
    }));

    socket.on('notification:new', onInternalRelayEvent('notification:new', (data) => {
        const userId = data.userId || data.user_id;
        if (userId) forwardToUserDevices(userId, 'notification:new', data, data.appKey);
    }));

    socket.on('notify:users', (payload = {}, ack) => {
        const reply = typeof ack === 'function' ? ack : () => {};
        if (!isInternalRelay) {
            logger.warn(`Rejected untrusted relay event 'notify:users' from socket ${socket.id}`);
            reply({ error: 'unauthorized', delivered: [], undelivered: payload.userIds || [] });
            return;
        }

        const userIds = Array.isArray(payload.userIds)
            ? [...new Set(payload.userIds.filter(Boolean).map(String))]
            : [];
        const { notification } = payload;
        if (!userIds.length || !notification) {
            reply({ delivered: [], undelivered: [] });
            return;
        }

        const delivered = userIds.filter((userId) =>
            forwardToUserDevices(userId, 'notification:new', notification, notification.appKey) > 0
        );
        const deliveredSet = new Set(delivered);
        reply({
            delivered,
            undelivered: userIds.filter((userId) => !deliveredSet.has(userId)),
        });
    });

    // ── Device registration ────────────────────────────────────────────────
    socket.on('device:register', async (data) => {
        if (!data?.deviceId || !data?.userId || !data?.userType || !data?.authToken) {
            socket.emit('device:register:error', { message: 'Authentication and device details are required' });
            return;
        }

        let account;
        try {
            const response = await axios.get(`${BACKEND_API_URL}/users/me`, {
                headers: { Authorization: `Bearer ${data.authToken}` },
                timeout: 5000,
            });
            if (String(response.data?.id) !== String(data.userId)) {
                socket.emit('device:register:error', { message: 'Device user does not match the authenticated user' });
                return;
            }
            account = response.data;
        } catch (error) {
            socket.emit('device:register:error', { message: 'Device authentication failed' });
            logger.error('Device authentication failed:', error.message);
            return;
        }

        const {
            deviceId,
            userType,        // 'owner' | 'employee'
            frontendName,
            appKey,
            notificationToken,
            deviceInfo,
            authToken,
        } = data;

        const userId = normalizeUserId(data.userId);

        if (!deviceId || !userId || !userType) {
            socket.emit('device:register:error', { message: 'Missing required fields' });
            return;
        }
        if (appKey && !['vectorfin', 'vectorfinadmin'].includes(appKey)) {
            socket.emit('device:register:error', { message: 'Unknown application' });
            return;
        }
        if (appKey) {
            const expectedUserType = appKey === 'vectorfinadmin' ? 'admin' : 'client';
            const accountIsAdmin = ADMIN_TYPES.includes(account?.type);
            if (userType !== expectedUserType || accountIsAdmin !== (expectedUserType === 'admin')) {
                socket.emit('device:register:error', { message: 'This account cannot register for that application' });
                return;
            }
        }

        const connectionKey = registrationKey(deviceId, appKey, frontendName);
        const existingDevice = deviceConnections.get(connectionKey);
        if (existingDevice && existingDevice.socketId !== socket.id) {
            const oldSocket = io.sockets.sockets.get(existingDevice.socketId);
            oldSocket?.emit('session:replaced', { deviceId, appKey });
            removeDeviceConnection(connectionKey, existingDevice);
            oldSocket?.disconnect(true);
        } else if (existingDevice) {
            removeDeviceConnection(connectionKey, existingDevice);
        }

        deviceConnections.set(connectionKey, {
            connectionKey,
            deviceId,
            socketId: socket.id,
            userId,
            userType,
            frontendName,
            appKey,
            notificationToken,
            deviceInfo,
            authToken,
            registeredAt: Date.now()
        });

        if (!userDevices.has(userId)) {
            userDevices.set(userId, new Set());
        }
        userDevices.get(userId).add(connectionKey);

        console.log(`✅ Device ${deviceId} registered for user ${userId} (${userType}) on socket ${socket.id}`);

        // Notify main socket server about device registration
        if (mainSocket && mainSocket.connected) {
            mainSocket.emit('device:registered', {
                deviceId,
                userId,
                userType,
                frontendName,
                appKey,
                notificationToken,
                deviceInfo
            });
        }

        try {
            await axios.post(`${BACKEND_API_URL}/devices/register`, {
                deviceId,
                notificationToken,
                deviceInfo,
                ...(appKey ? { appKey } : {}),
            }, {
                headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
                timeout: 5000,
            });
        } catch (error) {
            logger.error('Error saving device to backend:', error.message);
            removeDeviceConnection(connectionKey, deviceConnections.get(connectionKey));
            socket.emit('device:register:error', { message: 'Device registration could not be saved to the account' });
            return;
        }

        socket.emit('device:register:success', { deviceId, userId });

        // Join the relevant room on the main socket server
        if (mainSocket && mainSocket.connected) {
            if (userType === 'owner') {
                mainSocket.emit('join_business_room_request', { ownerId: userId, metadata: deviceInfo });
            } else if (userType === 'employee') {
                mainSocket.emit('join_employee_room_request', { employeeId: userId, metadata: deviceInfo });
            }
        }
    });

    socket.on('device:unregister', async ({ deviceId, appKey } = {}) => {
        const device = getDeviceForSocket(socket, deviceId);
        if (!device || (appKey && device.appKey !== appKey)) {
            socket.emit('device:unregister:error', { message: 'Device registration was not found' });
            return;
        }

        removeDeviceConnection(device.connectionKey, device);
        try {
            await axios.post(`${BACKEND_API_URL}/devices/unregister`, {
                deviceId,
                ...(device.appKey ? { appKey: device.appKey } : {}),
            }, {
                headers: device.authToken ? { Authorization: `Bearer ${device.authToken}` } : {},
                timeout: 5000,
            });
            socket.emit('device:unregister:success', { deviceId });
        } catch (error) {
            logger.error('Error unregistering device from backend:', error.message);
            socket.emit('device:unregister:error', { message: 'Device could not be removed from the account' });
        }
    });

    // ── One-shot current location update (no persistent tracking) ──────────
    socket.on('device:location:update', async (data) => {
        const { deviceId, location } = data;
        const device = getDeviceForSocket(socket, deviceId);
        if (!device || device.socketId !== socket.id) {
            logger.warn(`Location update from unregistered device: ${deviceId}`);
            return;
        }

        try {
            await axios.post(`${BACKEND_API_URL}/devices/updatecurrentloc`, {
                deviceId,
                location: {
                    latitude: location.lat,
                    longitude: location.lng,
                    accuracy: location.accuracy,
                    heading: location.heading,
                    timestamp: data.timestamp,
                }
            }, {
                headers: device.authToken ? { Authorization: `Bearer ${device.authToken}` } : {},
            });
        } catch (error) {
            logger.error('Error saving current location to backend:', error.message);
        }

        logger.debug(`Location update from device ${deviceId}`);
    });

    // ── Notification acknowledgment ────────────────────────────────────────
    socket.on('device:notification:acknowledged', (data) => {
        const { deviceId, notificationId } = data;
        const device = getDeviceForSocket(socket, deviceId);
        if (device && mainSocket && mainSocket.connected) {
            mainSocket.emit('device:notification:acknowledged', {
                userId: device.userId,
                notificationId
            });
        }
    });

    // ── Order accepted / waiter call acknowledged from device ──────────────
    socket.on('device:order:accepted', (data) => {
        const { deviceId, orderId, businessId } = data;
        const device = getDeviceForSocket(socket, deviceId);
        if (device && mainSocket && mainSocket.connected) {
            mainSocket.emit('order_accepted_by_device', {
                userId: device.userId,
                orderId,
                businessId
            });
        }
    });

    socket.on('device:waiter_call:acknowledged', (data) => {
        const { deviceId, callId, businessId } = data;
        const device = getDeviceForSocket(socket, deviceId);
        if (device && mainSocket && mainSocket.connected) {
            mainSocket.emit('waiter_call_acknowledged_by_device', {
                userId: device.userId,
                callId,
                businessId
            });
        }
    });

    // ── Permission status update ───────────────────────────────────────────
    socket.on('device:permissions:update', async (data) => {
        const { deviceId, permissions } = data;
        const device = getDeviceForSocket(socket, deviceId);
        if (!device) return;

        try {
            await axios.put(
                `${BACKEND_API_URL}/devices/${device.userId}/${deviceId}`,
                { deviceInfo: { permissions } },
                { headers: device.authToken ? { Authorization: `Bearer ${device.authToken}` } : {} }
            );
        } catch (error) {
            logger.error('Error updating device permissions:', error.message);
        }
    });

    // ── Generic forwarding to main server ─────────────────────────────────
    socket.on('forward:to:main', (data) => {
        const { event, payload } = data;
        if (mainSocket && mainSocket.connected) {
            mainSocket.emit(event, payload);
        }
    });

    // ── Keepalive ──────────────────────────────────────────────────────────
    socket.on('ping', () => {
        socket.emit('pong', { timestamp: Date.now() });
    });

    // ── Disconnect handler ─────────────────────────────────────────────────
    socket.on('disconnect', (reason) => {
        console.log(`📱 Device disconnected: ${socket.id}, reason: ${reason}`);

        for (const [connectionKey, device] of deviceConnections.entries()) {
            if (device.socketId === socket.id) {
                const userId = normalizeUserId(device.userId);
                removeDeviceConnection(connectionKey, device);
                console.log(`🧹 Cleaned up device ${device.deviceId} for user ${userId}`);
            }
        }
    });
});

// ==================== HTTP HEALTH CHECK (FIXED) ====================
httpServer.on('request', (req, res) => {
    // 🛑 Let Socket.io handle its own polling/upgrade requests.
    // Without this early return, the else branch below sends a 404
    // before Engine.io can respond, causing ERR_HTTP_HEADERS_SENT.
    if (req.url.startsWith('/socket.io')) {
        return; // hands off to Socket.io/Engine.io
    }

    if (req.url === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            status: 'ok',
            environment,
            connections: {
                devices: deviceConnections.size,
                users: userDevices.size,
                mainServerConnected: mainSocket?.connected || false
            },
            timestamp: new Date().toISOString()
        }));
    } else if (req.url === '/stats') {
        res.writeHead(200, { 'Content-Type': 'application/json' });

        const devicesByType = {};
        deviceConnections.forEach(device => {
            devicesByType[device.userType] = (devicesByType[device.userType] || 0) + 1;
        });

        res.end(JSON.stringify({
            connections: {
                totalDevices: deviceConnections.size,
                uniqueUsers: userDevices.size,
                devicesByType
            },
            mainServer: {
                connected: mainSocket?.connected || false,
                url: MAIN_SOCKET_URL
            },
            timestamp: new Date().toISOString()
        }));
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

// ==================== SERVER START ====================
connectToMainServer();

if (!SOCKET_INTERNAL_TOKEN) {
    console.error('SOCKET_INTERNAL_TOKEN is unset; device event forwarding is disabled');
}

httpServer.listen(PORT, () => {
    console.log(`🚀 Device Socket Server started`);
    console.log(`📡 Listening on port ${PORT}`);
    console.log(`🌍 Environment: ${environment}`);
    console.log(`🔓 CORS: Allow ALL origins (for native devices)`);
    console.log(`🔗 Main Socket Server: ${MAIN_SOCKET_URL}`);
});

// ==================== GRACEFUL SHUTDOWN ====================
process.on('SIGTERM', () => {
    console.log('SIGTERM received, closing server gracefully...');
    if (mainSocket) mainSocket.disconnect();
    httpServer.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT received, closing server gracefully...');
    if (mainSocket) mainSocket.disconnect();
    httpServer.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});