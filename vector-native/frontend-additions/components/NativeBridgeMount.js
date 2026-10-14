"use client";
/**
 * Mount once in app/layout.js inside <UserProvider> (or wherever useUser() works):
 *   <NativeBridgeMount />
 *
 * - logged in  -> starts native services (device socket + push token registration)
 *                 and joins the WEB socket room for browser sessions
 * - logged out -> stops native services
 * - native NAVIGATE_TO (notification tap / alert "View") -> router.push
 * - native NOTIFICATION_NEW / backend realtime events -> window event "vf:notification" and "vf:refresh"
 */
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { io } from "socket.io-client";
import { useUser } from "@/Contexts/UserContext";
import { isNative, on, initializeServices, stopServices } from "@/lib/nativeBridge";

const ADMIN_TYPES = ["director", "ceo", "Loan Admin", "Collateral Inspector"];

export default function NativeBridgeMount() {
  const ctx = useUser();
  const router = useRouter();
  const user = ctx?.user;
  const loggedIn = ctx?.status || false;
  const jwt = ctx?.jwt || (typeof window !== "undefined" ? localStorage.getItem("jwt") : null); // adjust to where your app keeps the JWT
  const started = useRef(false);
  const webSocket = useRef(null);

  // native services
  useEffect(() => {
    if (!isNative()) return;
    if (loggedIn && user?.id && jwt) {
      initializeServices({ userId: user.id, authToken: jwt })
        .then(() => { started.current = true; })
        .catch((e) => console.warn("native init failed", e.message));
    } else if (started.current) {
      stopServices().finally(() => { started.current = false; });
    }
  }, [loggedIn, user?.id, jwt]);

  // native -> web events
  useEffect(() => {
    if (!isNative()) return;
    const offs = [
      on("NAVIGATE_TO", ({ url }) => { try { const u = new URL(url); router.push(u.pathname + u.search); } catch {} }),
      on("NOTIFICATION_NEW", (n) => window.dispatchEvent(new CustomEvent("vf:notification", { detail: n }))),
      on("APP_RESUMED", () => window.dispatchEvent(new CustomEvent("vf:refresh"))),
      on("SESSION_REPLACED", () => window.dispatchEvent(new CustomEvent("vf:session-replaced"))),
    ];
    return () => offs.forEach((o) => o());
  }, [router]);

  // web (browser) socket: keeps the portal live for people NOT using the native app
  useEffect(() => {
    if (!loggedIn || !user?.id || !jwt || !process.env.NEXT_PUBLIC_SOCKET_URL) return;
    const s = io(process.env.NEXT_PUBLIC_SOCKET_URL, { auth: { token: jwt }, transports: ["websocket"] });
    webSocket.current = s;
    s.on("connect", () => s.emit("join_user_room", user.id, () => {}));
    s.on("notification:new", (n) => window.dispatchEvent(new CustomEvent("vf:notification", { detail: n })));
    ["loan:created", "loan:status", "document:signed"].forEach((ev) =>
      s.on(ev, (d) => window.dispatchEvent(new CustomEvent("vf:refresh", { detail: { event: ev, ...d } }))));
    return () => { s.emit("leave_user_room", user.id); s.close(); };
  }, [loggedIn, user?.id, jwt]);

  return null;
}
