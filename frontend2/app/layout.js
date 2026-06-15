"use client"

import "./globals.css";
import { UserProvider, useUser } from "@/Contexts/UserContext";
import { ConstantsProvider } from "@/Contexts/ConstantsContext";
import { BottomNavProvider } from "@/Contexts/BottomNavContext";
import { PageProvider } from "@/Contexts/PageContext";
import React from "react";
import Script from "next/script";
import MobileNav from "@/components/Parts/Header/MobileNav";
import BottomNav from "@/components/Includes/BottomNavigation/BottomNavigation";
import { updateUserAccount } from "@/Functions";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Portal | Vector Finance Limited</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Premium financial services — Vector Finance Limited" />
        <meta name="author" content="Vector Finance Limited" />
        <link rel="shortcut icon" href="/vectorfinancelimitedplaingreenlogo.png" />

        {/* Google Fonts — must load before everything else */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />

        {/* Bootstrap CSS — required for existing form/admin components */}
        <link href="/theme/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <link href="/theme/css/icons.min.css" rel="stylesheet" type="text/css" />
      </head>

      <body style={{ fontFamily: "'DM Sans', system-ui, sans-serif", background: '#F7F5F0' }}>
        <div id="layout-wrapper">
          <UserProvider>
            <ConstantsProvider>
              <PageProvider>
                <BottomNavProvider>
                  <HeaderPart />
                  <div className="vertical-overlay" />
                  <div className="main-content">
                    {children}
                  </div>
                  <BottomNav />
                </BottomNavProvider>
              </PageProvider>
            </ConstantsProvider>
          </UserProvider>
        </div>

        <Script src="/theme/libs/bootstrap/js/bootstrap.bundle.min.js" />
      </body>
    </html>
  );
}

/* ── Header (only shown when logged in) ──────────────────────── */
function HeaderPart() {
  const loggedInUser = useUser();

  if (loggedInUser && loggedInUser.user) {
    // Auto-assign client type if missing
    if (!loggedInUser.user.type) {
      updateUserAccount({ type: "client" }, loggedInUser.user.id);
    }

    // Redirect admin users away from client area
    const adminRoles = ['director', 'ceo', 'Loan Admin', 'Accountant', 'Collateral Inspector'];
    if (adminRoles.includes(loggedInUser.user.type)) {
      if (typeof window !== "undefined") {
        if (!window.location.pathname.startsWith('/admin')) {
          window.location = "/logout?ref=admin";
        }
      }
    }
  }

  if (!loggedInUser || !loggedInUser.status) return null;

  return (
    <MobileNav
      loggedInUser={loggedInUser.user}
      userIsLoggedIn={loggedInUser.status}
    />
  );
}