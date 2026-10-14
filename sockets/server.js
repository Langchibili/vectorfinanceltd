require("dotenv").config();

const { Server } = require("socket.io");
const { io: ioClient } = require("socket.io-client");
const axios = require("axios");

const DEVICE_SERVER_URL = process.env.DEVICE_SOCKET_URL || "http://localhost:3008";
const BACKEND_URL = (process.env.BACKEND_URL || "http://localhost:1350")
    .replace(/\/$/, "")
    .replace(/\/api$/, "");
const SOCKET_INTERNAL_TOKEN = process.env.SOCKET_INTERNAL_TOKEN;
const PORT = Number(process.env.MAIN_SOCKET_PORT || 4000);
const ADMIN_TYPES = ["director", "ceo", "Loan Admin", "Accountant", "Collateral Inspector"];
const REALTIME_EVENTS = new Set(["loan:created", "loan:status", "document:signed"]);

if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
    throw new Error("MAIN_SOCKET_PORT must be a valid TCP port between 1 and 65535");
}

const io = new Server({
    cors: { origin: "*" },
});

io.use((socket, next) => {
    socket.data.isInternalRelay = Boolean(
        SOCKET_INTERNAL_TOKEN &&
        socket.handshake.auth?.internalToken === SOCKET_INTERNAL_TOKEN
    );
    next();
});

function normalizedUserIds(userIds) {
    if (!Array.isArray(userIds)) return [];
    return [...new Set(userIds
        .filter((userId) => typeof userId === "string" || typeof userId === "number")
        .filter((userId) => String(userId).length > 0)
        .map(String))];
}

const deviceServer = SOCKET_INTERNAL_TOKEN
    ? ioClient(DEVICE_SERVER_URL, {
        autoConnect: true,
        reconnection: true,
        auth: { internalToken: SOCKET_INTERNAL_TOKEN },
    })
    : null;

if (deviceServer) {
    deviceServer.on("connect", () => {
        console.log("Main socket connected to device socket server");
    });
    deviceServer.on("connect_error", (error) => {
        console.error("Device socket connection failed:", error.message);
    });
} else {
    console.error("SOCKET_INTERNAL_TOKEN is unset; internal notification relays are disabled");
}

io.on("connection", (socket) => {
    socket.on("join_user_room", async (userId, ack) => {
        const reply = typeof ack === "function" ? ack : () => {};
        const token = socket.handshake.auth?.token;
        if (!userId || !token) {
            reply({ ok: false, message: "Authentication and user id are required" });
            return;
        }

        try {
            const response = await axios.get(`${BACKEND_URL}/api/users/me`, {
                headers: { Authorization: `Bearer ${token}` },
                timeout: 5000,
            });
            if (String(response.data?.id) !== String(userId)) {
                reply({ ok: false, message: "User mismatch" });
                return;
            }

            socket.join(`user_${userId}`);
            if (ADMIN_TYPES.includes(response.data?.type)) socket.join("admins");
            reply({ ok: true });
        } catch (error) {
            console.warn(`Socket ${socket.id} user-room authorization failed: ${error.message}`);
            reply({ ok: false, message: "Could not verify user" });
        }
    });

    socket.on("leave_user_room", (userId) => {
        if (userId) socket.leave(`user_${userId}`);
        socket.leave("admins");
    });

    socket.on("notify:users", (payload = {}, ack) => {
        const reply = typeof ack === "function" ? ack : () => {};
        const userIds = normalizedUserIds(payload.userIds);

        if (!socket.data.isInternalRelay) {
            reply({ error: "unauthorized", delivered: [], undelivered: userIds });
            return;
        }
        if (!userIds.length || !payload.notification || typeof payload.notification !== "object") {
            reply({ delivered: [], undelivered: userIds });
            return;
        }

        userIds.forEach((id) => {
            io.to(`user_${id}`).emit("notification:new", payload.notification);
        });

        if (!deviceServer?.connected) {
            reply({ delivered: [], undelivered: userIds, deviceServerDown: true });
            return;
        }
        deviceServer.timeout(5000).emit("notify:users", {
            userIds,
            notification: payload.notification,
        }, (error, response) => {
            reply(error || !response
                ? { delivered: [], undelivered: userIds }
                : response);
        });
    });

    socket.on("realtime:event", (payload = {}) => {
        if (!socket.data.isInternalRelay || !REALTIME_EVENTS.has(payload.event)) return;

        normalizedUserIds(payload.userIds).forEach((id) => {
            io.to(`user_${id}`).emit(payload.event, payload.data);
        });
        if (payload.toAdmins === true) io.to("admins").emit(payload.event, payload.data);
    });
});

io.listen(PORT);
console.log(`Vector Finance socket server listening on port ${PORT}`);
