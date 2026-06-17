// //VectorFinanceLTD\frontend2\app\layout.js
// "use client"

// import "./globals.css";
// import { UserProvider, useUser } from "@/Contexts/UserContext";
// import { ConstantsProvider } from "@/Contexts/ConstantsContext";
// import { BottomNavProvider } from "@/Contexts/BottomNavContext";
// import { PageProvider } from "@/Contexts/PageContext";
// import React, { useEffect, useRef, useState } from "react";
// import Script from "next/script";
// import MobileNav from "@/components/Parts/Header/MobileNav";
// import BottomNav from "@/components/Includes/BottomNavigation/BottomNavigation";
// import { updateUserAccount } from "@/Functions";
// import VFThemeProvider, { useThemeMode } from "@/components/ThemeProvider";
// import { motion, AnimatePresence } from "framer-motion";

// /* ═══════════════════════════════════════════════════════════════
//    COLOUR TOKENS (keep in sync with ThemeProvider.jsx)
// ═══════════════════════════════════════════════════════════════ */
// const G_GREEN = '#10B981'
// const G_GREEN1 = '#059669'
// const G_GOLD = '#C9A84C'

// /* ═══════════════════════════════════════════════════════════════
//    THEME TOGGLE
//    Pill-style dark / light switcher with animated thumb.
//    Extracted verbatim from HomePage, recoloured for VF green.
// ═══════════════════════════════════════════════════════════════ */
// const PILL_W = 74
// const PILL_H = 30
// const THUMB_D = 22
// const THUMB_PAD = 3
// const THUMB_TRAVEL = PILL_W - THUMB_D - THUMB_PAD * 3

// // Moon SVG (dark mode indicator)
// function MoonIcon({ size = 13 }) {
//   return (
//     <svg width={size} height={size} viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
//       <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
//     </svg>
//   )
// }

// // Sun SVG (light mode indicator)
// function SunIcon({ size = 13 }) {
//   return (
//     <svg width={size} height={size} viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
//       <circle cx="12" cy="12" r="5" />
//       <line x1="12" y1="1" x2="12" y2="3" stroke="white" strokeWidth="2" strokeLinecap="round" />
//       <line x1="12" y1="21" x2="12" y2="23" stroke="white" strokeWidth="2" strokeLinecap="round" />
//       <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="white" strokeWidth="2" strokeLinecap="round" />
//       <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="white" strokeWidth="2" strokeLinecap="round" />
//       <line x1="1" y1="12" x2="3" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" />
//       <line x1="21" y1="12" x2="23" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" />
//       <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="white" strokeWidth="2" strokeLinecap="round" />
//       <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="white" strokeWidth="2" strokeLinecap="round" />
//     </svg>
//   )
// }

// function ThemeToggle() {
//   const { isDark, toggleTheme } = useThemeMode()

//   const pillStyle = {
//     position: 'relative',
//     width: PILL_W,
//     height: PILL_H,
//     borderRadius: PILL_H / 2,
//     cursor: 'pointer',
//     overflow: 'hidden',
//     flexShrink: 0,
//     border: isDark
//       ? `1.5px solid rgba(16,185,129,0.35)`
//       : `1.5px solid rgba(203,213,225,0.9)`,
//     background: isDark
//       ? 'linear-gradient(135deg,#0F172A 0%,#1E293B 100%)'
//       : 'linear-gradient(135deg,#ffffff 0%,#F1F5F9 100%)',
//     boxShadow: isDark
//       ? `0 0 12px rgba(16,185,129,0.22), inset 0 1px 0 rgba(255,255,255,0.04)`
//       : `0 1px 6px rgba(148,163,184,0.3), inset 0 1px 0 rgba(255,255,255,0.9)`,
//     transition: 'background 0.35s, border-color 0.35s, box-shadow 0.35s',
//     display: 'inline-block',
//   }

//   const labelStyle = {
//     position: 'absolute',
//     top: 0, bottom: 0,
//     ...(isDark
//       ? { left: THUMB_PAD + 3, right: THUMB_D + THUMB_PAD * 2 }
//       : { left: THUMB_D + THUMB_PAD * 2, right: THUMB_PAD + 3 }
//     ),
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: isDark ? 'flex-start' : 'flex-end',
//     pointerEvents: 'none',
//     overflow: 'hidden',
//   }

//   const thumbStyle = {
//     position: 'absolute',
//     top: THUMB_PAD,
//     left: THUMB_PAD,
//     width: THUMB_D,
//     height: THUMB_D,
//     borderRadius: '50%',
//     zIndex: 1,
//     background: isDark
//       ? `linear-gradient(135deg, ${G_GREEN} 0%, ${G_GREEN1} 100%)`
//       : `linear-gradient(135deg, #F59E0B 0%, #D97706 100%)`,
//     boxShadow: isDark
//       ? `0 2px 8px rgba(16,185,129,0.55)`
//       : `0 2px 8px rgba(245,158,11,0.55)`,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   }

//   return (
//     <div
//       onClick={toggleTheme}
//       style={pillStyle}
//       role="button"
//       aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
//       title={isDark ? 'Light mode' : 'Dark mode'}
//     >
//       {/* label text */}
//       <div style={labelStyle}>
//         <span style={{
//           fontSize: 9, fontWeight: 800, letterSpacing: 0.9,
//           textTransform: 'uppercase', lineHeight: 1,
//           color: isDark ? 'rgba(16,185,129,0.85)' : 'rgba(100,116,139,0.9)',
//           transition: 'color 0.3s',
//           fontFamily: "'DM Sans', system-ui, sans-serif",
//         }}>
//           {isDark ? 'DARK' : 'LIGHT'}
//         </span>
//       </div>

//       {/* animated thumb */}
//       <motion.div
//         animate={{ x: isDark ? THUMB_TRAVEL : 0 }}
//         transition={{ type: 'spring', stiffness: 480, damping: 34 }}
//         style={thumbStyle}
//       >
//         <motion.div
//           animate={{ rotate: isDark ? 0 : 20 }}
//           transition={{ duration: 0.4, ease: 'easeOut' }}
//           style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
//         >
//           {isDark ? <MoonIcon /> : <SunIcon />}
//         </motion.div>
//       </motion.div>
//     </div>
//   )
// }

// /* ═══════════════════════════════════════════════════════════════
//    THEME-AWARE LOGO
//    Swaps between green logo (dark) and black logo (light).
// ═══════════════════════════════════════════════════════════════ */
// function VFLogo() {
//   const { isDark } = useThemeMode()
//   const [mounted, setMounted] = useState(false)

//   // Avoid hydration mismatch — only render after mount
//   useEffect(() => { setMounted(true) }, [])

//   const src = !mounted || isDark
//     ? '/vectorfinancelimitedplaingreenlogo.png'
//     : '/vectorfinancelimitedplainblacklogo.png'

//   return (
//     <AnimatePresence mode="wait" initial={false}>
//       <motion.img
//         key={src}                                   // re-mounts on src change → fade
//         src={src}
//         alt="Vector Finance Limited"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         transition={{ duration: 0.25 }}
//         style={{
//           height: 32,
//           width: 'auto',
//           objectFit: 'contain',
//           display: 'block',
//         }}
//       />
//     </AnimatePresence>
//   )
// }

// /* ═══════════════════════════════════════════════════════════════
//    FLOATING THEME TOGGLE
//    Fixed in the top-right corner, sits above all content.
//    Shown on every page regardless of login state.
// ═══════════════════════════════════════════════════════════════ */
// // function FloatingThemeToggle() {
// //   return (
// //     <div style={{
// //       position: 'fixed',
// //       top: 12,
// //       right: 0,
// //       left: 0,
// //       zIndex: 9999,
// //       display: 'flex',
// //       alignItems: 'center',
// //       justifyContent: 'center', // ← add this
// //     }}>
// //       <ThemeToggle />
// //     </div>
// //   )
// // }
// function FloatingThemeToggle() {
//   return (
//     <>
//       <style>{`
//         .floating-toggle {
//           position: fixed;
//           top: 12px;
//           left: 0;
//           right: 0;
//           z-index: 9999;
//           display: flex;
//           align-items: center;
//         }
//         @media (max-width: 896px) {
//           .floating-toggle {
//             justify-content: center;
//           }
//         }
//         @media (min-width: 897px) {
//           .floating-toggle {
//             justify-content: flex-end;
//             padding-right: 150px;
//           }
//         }
//       `}</style>
//       <div className="floating-toggle">
//         <ThemeToggle />
//       </div>
//     </>
//   );
// }

// /* ═══════════════════════════════════════════════════════════════
//    HEADER (only when logged in)
//    Renders MobileNav + injects the VFLogo + ThemeToggle into it
//    via the `logo` and `actions` props (add those props to
//    MobileNav if it doesn't have them yet — see note below).
// ═══════════════════════════════════════════════════════════════ */
// function HeaderPart() {
//   const loggedInUser = useUser()
//   if (typeof window !== "undefined") {
//     if ((window.location.pathname.startsWith('/upload-introductory-letter') || window.location.pathname.startsWith('/sessionletter'))) {
//       return null
//     }
//   }
//   if (loggedInUser?.user) {
//     // Auto-assign client type if missing
//     if (!loggedInUser.user.type) {
//       updateUserAccount({ type: 'client' }, loggedInUser.user.id)
//     }

//     // Redirect admin users away from client portal
//     const adminRoles = ['director', 'ceo', 'Loan Admin', 'Accountant', 'Collateral Inspector']
//     if (adminRoles.includes(loggedInUser.user.type)) {
//       if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/admin')) {
//         window.location = '/logout?ref=admin'
//       }
//     }
//   }

//   // if ((loggedInUser || false) && loggedInUser?.status !== true) return null

//   return (
//     <MobileNav
//       loggedInUser={loggedInUser.user}
//       userIsLoggedIn={loggedInUser.status}
//       /*
//        * Pass the themed logo and toggle to MobileNav.
//        *
//        * In MobileNav, consume them like:
//        *   function MobileNav({ loggedInUser, userIsLoggedIn, logo, themeToggle }) {
//        *     ...
//        *     return (
//        *       <header>
//        *         {logo}          ← renders <VFLogo />
//        *         ...
//        *         {themeToggle}   ← renders <ThemeToggle />
//        *       </header>
//        *     )
//        *   }
//        *
//        * If MobileNav doesn't accept these props yet, the FloatingThemeToggle
//        * (rendered outside this component) acts as the fallback — it's always
//        * visible in the top-right corner independent of the nav.
//        */
//       logo={<VFLogo />}
//       themeToggle={<ThemeToggle />}
//     />
//   )
// }


// // Returns true if the current path should cause a redirect
// const shouldRedirect = (pathname) => {
//   const excludedUris = ['upload-introductory-letter', 'sessionletter', 'signin', 'signup']
//   const normalized = pathname.replace(/\/$/, '') // remove trailing slash for consistency

//   for (const uri of excludedUris) {
//     // Sub‑path: starts with /uri/  → redirect
//     if (normalized.startsWith('/' + uri + '/')) {
//       return true
//     }
//     // Exact base: /uri  → safe, no redirect
//     if (normalized === '/' + uri) {
//       return false
//     }
//   }
//   // Any other path not explicitly listed → redirect
//   return true
// }


// /* ═══════════════════════════════════════════════════════════════
//    ROOT LAYOUT
// ═══════════════════════════════════════════════════════════════ */
// const Content = ({ children }) => {
//   const loggedInUser = useUser()
//   const { user, status, loading } = useUser()
//   console.log('user, status, loading', user, status, loading)
//   // Case 1: not logged in at all
//   if (loggedInUser === null || loggedInUser === undefined) {
//     if (typeof window !== "undefined" && shouldRedirect(window.location.pathname)) {
//       window.location = "signin"
//     }
//   }

//   // Case 2: logged in but account not activated (status === false)
//   if (loggedInUser && loggedInUser.status === false) {
//     if (typeof window !== "undefined" && shouldRedirect(window.location.pathname)) {
//       window.location = "signin"
//     }
//   }
//   return (
//     <html lang="en">
//       <head>
//         <meta charSet="utf-8" />
//         <title>Portal | Vector Finance Limited</title>
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <meta name="description" content="Premium financial services — Vector Finance Limited" />
//         <meta name="author" content="Vector Finance Limited" />

//         {/*
//           Favicon: we can't use useThemeMode here (this is static HTML),
//           so we use <link media> to let the browser pick the right one.
//         */}
//         <link rel="icon" href="/vectorfinancelimitedplaingreenlogo.png"
//           media="(prefers-color-scheme: dark)" />
//         <link rel="icon" href="/vectorfinancelimitedplainblacklogo.png"
//           media="(prefers-color-scheme: light)" />

//         {/* Google Fonts */}
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
//         <link
//           href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=JetBrains+Mono:wght@400;500;600&display=swap"
//           rel="stylesheet"
//         />

//         {/* Bootstrap CSS */}
//         <link href="/theme/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
//         <link href="/theme/css/icons.min.css" rel="stylesheet" type="text/css" />
//       </head>


//       <body style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>

//         {/*
//           VFThemeProvider must be the outermost client wrapper so that
//           useThemeMode() is available to everything below, including
//           HeaderPart and FloatingThemeToggle.
//         */}
//         <VFThemeProvider>
//           <div id="layout-wrapper">
//             <ConstantsProvider>
//               <PageProvider>
//                 <BottomNavProvider>

//                   {/*
//                       FloatingThemeToggle is always present in the top-right
//                       corner. It's the guaranteed fallback entry point for
//                       theme switching even if MobileNav doesn't render yet
//                       (e.g. on sign-in / sign-up pages).
//                     */}
//                   <FloatingThemeToggle />

//                   <HeaderPart />
//                   <div className="vertical-overlay" />
//                   <div className="main-content">
//                     {children}
//                   </div>
//                   {/* the bottom navigation */}
//                   {typeof window !== "undefined" && (window.location.pathname.startsWith('/upload-introductory-letter') || window.location.pathname.startsWith('/sessionletter')) ? null : <BottomNav />}
//                 </BottomNavProvider>
//               </PageProvider>
//             </ConstantsProvider>
//           </div>
//         </VFThemeProvider>

//         <Script src="/theme/libs/bootstrap/js/bootstrap.bundle.min.js" />
//       </body>
//     </html>
//   )
// }
// export default function RootLayout({ children }) {
//   return (<UserProvider>
//     <Content children={children} />
//   </UserProvider>)
// }
"use client"

import "./globals.css";
import { UserProvider, useUser } from "@/Contexts/UserContext";
import { ConstantsProvider } from "@/Contexts/ConstantsContext";
import { BottomNavProvider } from "@/Contexts/BottomNavContext";
import { PageProvider } from "@/Contexts/PageContext";
import React, { useEffect, useRef, useState } from "react";
import Script from "next/script";
import MobileNav from "@/components/Parts/Header/MobileNav";
import BottomNav from "@/components/Includes/BottomNavigation/BottomNavigation";
import { updateUserAccount } from "@/Functions";
import VFThemeProvider, { useThemeMode } from "@/components/ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";
import ImagePageLoader from "@/components/Includes/Loader/ImagePageLoader";
import { LinearProgress } from "@mui/material";
import PageSkeleton from "@/components/Includes/Loader/PageSkeleton";

/* ═══════════════════════════════════════════════════════════════
   COLOUR TOKENS (keep in sync with ThemeProvider.jsx)
═══════════════════════════════════════════════════════════════ */
const G_GREEN = '#10B981'
const G_GREEN1 = '#059669'
const G_GOLD = '#C9A84C'

/* ═══════════════════════════════════════════════════════════════
   THEME TOGGLE
═══════════════════════════════════════════════════════════════ */
const PILL_W = 74
const PILL_H = 30
const THUMB_D = 22
const THUMB_PAD = 3
const THUMB_TRAVEL = PILL_W - THUMB_D - THUMB_PAD * 3

function MoonIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
    </svg>
  )
}

function SunIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="21" x2="12" y2="23" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="1" y1="12" x2="3" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="21" y1="12" x2="23" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function ThemeToggle() {
  const { isDark, toggleTheme } = useThemeMode()

  const pillStyle = {
    position: 'relative',
    width: PILL_W,
    height: PILL_H,
    borderRadius: PILL_H / 2,
    cursor: 'pointer',
    overflow: 'hidden',
    flexShrink: 0,
    border: isDark
      ? `1.5px solid rgba(16,185,129,0.35)`
      : `1.5px solid rgba(203,213,225,0.9)`,
    background: isDark
      ? 'linear-gradient(135deg,#0F172A 0%,#1E293B 100%)'
      : 'linear-gradient(135deg,#ffffff 0%,#F1F5F9 100%)',
    boxShadow: isDark
      ? `0 0 12px rgba(16,185,129,0.22), inset 0 1px 0 rgba(255,255,255,0.04)`
      : `0 1px 6px rgba(148,163,184,0.3), inset 0 1px 0 rgba(255,255,255,0.9)`,
    transition: 'background 0.35s, border-color 0.35s, box-shadow 0.35s',
    display: 'inline-block',
  }

  const labelStyle = {
    position: 'absolute',
    top: 0, bottom: 0,
    ...(isDark
      ? { left: THUMB_PAD + 3, right: THUMB_D + THUMB_PAD * 2 }
      : { left: THUMB_D + THUMB_PAD * 2, right: THUMB_PAD + 3 }
    ),
    display: 'flex',
    alignItems: 'center',
    justifyContent: isDark ? 'flex-start' : 'flex-end',
    pointerEvents: 'none',
    overflow: 'hidden',
  }

  const thumbStyle = {
    position: 'absolute',
    top: THUMB_PAD,
    left: THUMB_PAD,
    width: THUMB_D,
    height: THUMB_D,
    borderRadius: '50%',
    zIndex: 1,
    background: isDark
      ? `linear-gradient(135deg, ${G_GREEN} 0%, ${G_GREEN1} 100%)`
      : `linear-gradient(135deg, #F59E0B 0%, #D97706 100%)`,
    boxShadow: isDark
      ? `0 2px 8px rgba(16,185,129,0.55)`
      : `0 2px 8px rgba(245,158,11,0.55)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }

  return (
    <div
      onClick={toggleTheme}
      style={pillStyle}
      role="button"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      <div style={labelStyle}>
        <span style={{
          fontSize: 9, fontWeight: 800, letterSpacing: 0.9,
          textTransform: 'uppercase', lineHeight: 1,
          color: isDark ? 'rgba(16,185,129,0.85)' : 'rgba(100,116,139,0.9)',
          transition: 'color 0.3s',
          fontFamily: "'DM Sans', system-ui, sans-serif",
        }}>
          {isDark ? 'DARK' : 'LIGHT'}
        </span>
      </div>

      <motion.div
        animate={{ x: isDark ? THUMB_TRAVEL : 0 }}
        transition={{ type: 'spring', stiffness: 480, damping: 34 }}
        style={thumbStyle}
      >
        <motion.div
          animate={{ rotate: isDark ? 0 : 20 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {isDark ? <MoonIcon /> : <SunIcon />}
        </motion.div>
      </motion.div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   THEME-AWARE LOGO
═══════════════════════════════════════════════════════════════ */
function VFLogo() {
  const { isDark } = useThemeMode()
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const src = !mounted || isDark
    ? '/vectorfinancelimitedplaingreenlogo.png'
    : '/vectorfinancelimitedplainblacklogo.png'

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.img
        key={src}
        src={src}
        alt="Vector Finance Limited"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        style={{ height: 32, width: 'auto', objectFit: 'contain', display: 'block' }}
      />
    </AnimatePresence>
  )
}

/* ═══════════════════════════════════════════════════════════════
   FLOATING THEME TOGGLE
═══════════════════════════════════════════════════════════════ */
function FloatingThemeToggle() {
  if (typeof window !== "undefined") {
    if (window.location.pathname.startsWith('/admin')) {
      return (
        <>
          <style>{`
              .floating-toggle {
                position: fixed;
                top: 12px;
                z-index: 9999;
                width: 50px;
              }
              @media (max-width: 896px) {
                .floating-toggle {
                  left: 40%;
                  transform: translateX(-50%);
                }
              }
              @media (min-width: 897px) {
                .floating-toggle {
                  right: 270px;
                }
              }
            `}</style>
          <div className="floating-toggle">
            <ThemeToggle />
          </div>
        </>
      )
    }
  }
  return (
    <>
      <style>{`
        .floating-toggle {
          position: fixed;
          top: 12px;
          z-index: 9999;
          width: 50px;
        }
        @media (max-width: 896px) {
          .floating-toggle {
            left: 60%;
            transform: translateX(-50%);
          }
        }
        @media (min-width: 897px) {
          .floating-toggle {
            right: 180px;
          }
        }
      `}</style>
      <div className="floating-toggle">
        <ThemeToggle />
      </div>
    </>
  )
}

/* ═══════════════════════════════════════════════════════════════
   HEADER
═══════════════════════════════════════════════════════════════ */
function HeaderPart() {
  const loggedInUser = useUser()
  if (typeof window !== "undefined") {
    if (window.location.pathname.startsWith('/upload-introductory-letter') ||
      window.location.pathname.startsWith('/sessionletter')) {
      return null
    }
  }

  if (loggedInUser?.user) {
    if (!loggedInUser.user.type) {
      updateUserAccount({ type: 'client' }, loggedInUser.user.id)
    }
    const adminRoles = ['director', 'ceo', 'Loan Admin', 'Accountant', 'Collateral Inspector']
    if (adminRoles.includes(loggedInUser.user.type)) {
      if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/admin')) {
        window.location = '/logout?ref=admin'
      }
    }
  }

  return (
    <MobileNav
      loggedInUser={loggedInUser?.user}
      userIsLoggedIn={loggedInUser?.status}
      logo={<VFLogo />}
      themeToggle={<ThemeToggle />}
    />
  )
}

/* ═══════════════════════════════════════════════════════════════
   REDIRECT HELPER
═══════════════════════════════════════════════════════════════ */
const shouldRedirect = (pathname) => {
  const excludedUris = ['upload-introductory-letter', 'sessionletter', 'signin', 'signup']
  const normalized = pathname.replace(/\/$/, '')
  for (const uri of excludedUris) {
    if (normalized.startsWith('/' + uri + '/')) return true
    if (normalized === '/' + uri) return false
  }
  return true
}

/* ═══════════════════════════════════════════════════════════════
   SHARED HEAD CONTENT
═══════════════════════════════════════════════════════════════ */
function HeadContent() {
  return (
    <>
      <meta charSet="utf-8" />
      <title>Portal | Vector Finance Limited</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Premium financial services — Vector Finance Limited" />
      <meta name="author" content="Vector Finance Limited" />
      <link rel="icon" href="/vectorfinancelimitedplaingreenlogo.png" media="(prefers-color-scheme: dark)" />
      <link rel="icon" href="/vectorfinancelimitedplainblacklogo.png" media="(prefers-color-scheme: light)" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=JetBrains+Mono:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <link href="/theme/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
      <link href="/theme/css/icons.min.css" rel="stylesheet" type="text/css" />
    </>
  )
}

/* ═══════════════════════════════════════════════════════════════
   ROOT CONTENT
═══════════════════════════════════════════════════════════════ */
const Content = ({ children }) => {
  const loggedInUser = useUser()
  const { loading, user, status } = loggedInUser || {}
  // ── 1. Auth still resolving ──────────────────────────────────
  if (loading) {
    const isAdmin = typeof window !== 'undefined'
      && window.location.pathname.startsWith('/admin')

    return (
      <html lang="en">
        <head><HeadContent /></head>
        <body style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
          {isAdmin
            ? (<><LinearProgress color="secondary" /><PageSkeleton title="Loading..." loading={true} /></>)
            : <ImagePageLoader />}
        </body>
      </html>
    )
  }

  // ── 2. Not logged in / not activated ────────────────────────
  if (!user || status === false) {
    if (typeof window !== 'undefined' && shouldRedirect(window.location.pathname)) {
      window.location.href = '/signin'
    }
    return null
  }

  // ── 3. Logged in — normal render ────────────────────────────
  const hideChromePages =
    typeof window !== 'undefined' && (
      window.location.pathname.startsWith('/upload-introductory-letter') ||
      window.location.pathname.startsWith('/sessionletter')
    )

  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
        <VFThemeProvider>
          <div id="layout-wrapper">
            <ConstantsProvider>
              <PageProvider>
                <BottomNavProvider>
                  <FloatingThemeToggle />
                  {!hideChromePages && <HeaderPart />}
                  <div className="vertical-overlay" />
                  <div className="main-content">{children}</div>
                  {!hideChromePages && <BottomNav />}
                </BottomNavProvider>
              </PageProvider>
            </ConstantsProvider>
          </div>
        </VFThemeProvider>
        <Script src="/theme/libs/bootstrap/js/bootstrap.bundle.min.js" />
      </body>
    </html>
  )
}

/* ═══════════════════════════════════════════════════════════════
   ROOT LAYOUT
═══════════════════════════════════════════════════════════════ */
export default function RootLayout({ children }) {
  return (
    <UserProvider>
      <Content>{children}</Content>
    </UserProvider>
  )
}