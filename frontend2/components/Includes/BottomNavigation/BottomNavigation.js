// "use client"

// /**
//  * FILE: frontend/src/components/Includes/BottomNavigation/BottomNavigation.js
//  * TIER 1 — MAY EDIT
//  * Preserves all BottomNavLink logic exactly. UI replaced.
//  */

// import { useUser } from "@/Contexts/UserContext";
// import { useBottomNav } from "@/Contexts/BottomNavContext";
// import { usePage } from "@/Contexts/PageContext";
// import Link from "next/link";
// import { useState, useEffect } from "react";

// export default function BottomNav() {
//   const loggedInUser = useUser();
//   const { BottomNavLink, setBottomNavLink } = useBottomNav();
//   const { page } = usePage();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => { setMounted(true); }, []);

//   const user = loggedInUser?.user;
//   if (!user || !loggedInUser?.status) return null;
//   if (!mounted) return null;

//   const isAdmin = ['director', 'ceo', 'Loan Admin', 'Accountant', 'Collateral Inspector'].includes(user.type);
//   const isAdminLoanDetail = typeof window !== 'undefined' && window.location.pathname.startsWith('/admin/loans/') && window.location.pathname.split('/').length > 3;

//   // ── Admin loan detail — tab navigation (preserves BottomNavLink)
//   if (isAdminLoanDetail) {
//     const tabs = [
//       { index: 0, label: 'Loan', icon: <LoanIcon /> },
//       { index: 1, label: 'Client', icon: <UserIcon /> },
//       { index: 2, label: 'Actions', icon: <ActionIcon /> },
//     ];
//     return (
//       <nav style={navStyles.nav}>
//         <div style={navStyles.tabRow}>
//           {tabs.map(tab => {
//             const active = parseInt(BottomNavLink) === tab.index;
//             return (
//               <button
//                 key={tab.index}
//                 onClick={() => setBottomNavLink(tab.index)}
//                 style={{ ...navStyles.tabBtn, color: active ? '#C9A84C' : 'rgba(255,255,255,0.35)' }}
//               >
//                 <div style={{ ...navStyles.tabIcon, ...(active ? navStyles.tabIconActive : {}) }}>
//                   {tab.icon}
//                 </div>
//                 <span style={{ ...navStyles.tabLabel, ...(active ? navStyles.tabLabelActive : {}) }}>
//                   {tab.label}
//                 </span>
//                 {active && <div style={navStyles.tabIndicator} />}
//               </button>
//             );
//           })}
//         </div>
//         <style>{navStyles.css}</style>
//       </nav>
//     );
//   }

//   // ── Admin nav ──
//   if (isAdmin) {
//     const adminTabs = [
//       { href: '/admin', label: 'Overview', icon: <HomeIcon />, match: p => p === '/admin' },
//       { href: '/admin/loans', label: 'Loans', icon: <LoanIcon />, match: p => p?.startsWith('/admin/loans') },
//       { href: '/admin/users', label: 'Clients', icon: <UsersIcon />, match: p => p?.startsWith('/admin/users') },
//     ];
//     return (
//       <nav style={navStyles.nav}>
//         <div style={navStyles.tabRow}>
//           {adminTabs.map(tab => {
//             const active = tab.match(page);
//             return (
//               <Link key={tab.href} href={tab.href} style={{ ...navStyles.tabLink, color: active ? '#C9A84C' : 'rgba(255,255,255,0.35)' }}>
//                 <div style={{ ...navStyles.tabIcon, ...(active ? navStyles.tabIconActive : {}) }}>
//                   {tab.icon}
//                 </div>
//                 <span style={{ ...navStyles.tabLabel, ...(active ? navStyles.tabLabelActive : {}) }}>
//                   {tab.label}
//                 </span>
//                 {active && <div style={navStyles.tabIndicator} />}
//               </Link>
//             );
//           })}
//         </div>
//         <style>{navStyles.css}</style>
//       </nav>
//     );
//   }

//   // ── Client nav ──
//   const clientTabs = [
//     { href: '/', label: 'Home', icon: <HomeIcon />, match: p => p === '/' },
//     { href: '/loans', label: 'Loans', icon: <LoanIcon />, match: p => p === '/loans' },
//     { href: '/profile', label: 'Profile', icon: <UserIcon />, match: p => p === '/profile' || p === '/business-profile' },
//   ];

//   return (
//     <nav style={navStyles.nav}>
//       <div style={navStyles.tabRow}>
//         {clientTabs.map(tab => {
//           const active = tab.match(page);
//           return (
//             <Link key={tab.href} href={tab.href} style={{ ...navStyles.tabLink, color: active ? '#C9A84C' : 'rgba(255,255,255,0.35)' }}>
//               <div style={{ ...navStyles.tabIcon, ...(active ? navStyles.tabIconActive : {}) }}>
//                 {tab.icon}
//               </div>
//               <span style={{ ...navStyles.tabLabel, ...(active ? navStyles.tabLabelActive : {}) }}>
//                 {tab.label}
//               </span>
//               {active && <div style={navStyles.tabIndicator} />}
//             </Link>
//           );
//         })}
//       </div>
//       <style>{navStyles.css}</style>
//     </nav>
//   );
// }

// /* ── Icons ── */
// function HomeIcon() {
//   return <svg width={22} height={22} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>;
// }
// function LoanIcon() {
//   return <svg width={22} height={22} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>;
// }
// function UserIcon() {
//   return <svg width={22} height={22} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
// }
// function UsersIcon() {
//   return <svg width={22} height={22} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>;
// }
// function ActionIcon() {
//   return <svg width={22} height={22} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14" /></svg>;
// }

// /* ── Styles as object (avoid CSS-in-JS conflicts) ── */
// const navStyles = {
//   nav: {
//     position: 'fixed', bottom: 0, left: 0, right: 0,
//     height: 72, background: 'rgba(10,15,30,0.96)',
//     backdropFilter: 'blur(22px)', WebkitBackdropFilter: 'blur(22px)',
//     borderTop: '1px solid rgba(255,255,255,0.06)',
//     zIndex: 90, paddingBottom: 'env(safe-area-inset-bottom, 0px)',
//   },
//   tabRow: { display: 'flex', height: '100%', paddingTop: 8 },
//   tabLink: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '6px 4px', textDecoration: 'none', position: 'relative', transition: 'color 0.2s' },
//   tabBtn: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '6px 4px', background: 'none', border: 'none', cursor: 'pointer', position: 'relative', transition: 'color 0.2s', fontFamily: "'DM Sans', system-ui, sans-serif" },
//   tabIcon: { transition: 'transform 0.2s' },
//   tabIconActive: { transform: 'scale(1.08)' },
//   tabLabel: { fontSize: 10, fontWeight: 600, letterSpacing: '0.02em', fontFamily: "'DM Sans', system-ui, sans-serif", transition: 'color 0.2s' },
//   tabLabelActive: { color: '#C9A84C' },
//   tabIndicator: { position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 20, height: 2, background: 'linear-gradient(90deg, #C9A84C, #E8C87A)', borderRadius: '0 0 2px 2px' },
//   css: `@media (min-width: 1024px) { nav[data-vf-bottom-nav] { display: none; } }`,
// };
"use client"

/**
 * BottomNavigation.js
 *
 * Content/behavior: preserves the original MUI-driven logic exactly —
 *   - '/referrals'        -> Earnings / Home / Account  (BottomNavLink 0,1,2)
 *   - '/admin' (not /admin/users) -> Loan / Client / Actions (0,1,2)
 *   - '/admin/users'      -> renders nothing
 *   - '/'                 -> Home / History / Help (0,1,2)
 *   - anything else       -> renders nothing
 * setBottomNavLink(newValue) is still called on every tab change, same as before.
 *
 * Design: Tier-1 pill/glassmorphism look (icon, active indicator bar, blur),
 * now fully theme-aware via useThemeMode() instead of hardcoded dark colours.
 *
 * Active tab is always derived from `page`, not just from the last click,
 * so it stays correct even if the page changes via a different route (e.g. a link).
 */

import { useBottomNav } from "@/Contexts/BottomNavContext"
import { usePage } from "@/Contexts/PageContext"
import { useThemeMode } from "@/components/ThemeProvider"

/* ─── theme-aware token builder ─────────────────────────────── */
function useTokens() {
  const { isDark } = useThemeMode()
  return {
    isDark,
    navBg: isDark ? "rgba(10,15,30,0.96)" : "rgba(255,255,255,0.92)",
    navBorder: isDark ? "rgba(255,255,255,0.06)" : "rgba(13,31,23,0.08)",
    inactive: isDark ? "rgba(255,255,255,0.35)" : "rgba(13,31,23,0.4)",
    active: "#C9A84C",
    activeGradFrom: "#C9A84C",
    activeGradTo: "#E8C87A",
  }
}

/* ─── tab sets, keyed by the same page-gating rules as the original ── */
function useTabSets() {
  return {
    referrals: [
      { label: "Earnings", icon: <MoneyIcon /> },
      { label: "Home", icon: <HomeIcon /> },
      { label: "Account", icon: <UserIcon /> },
    ],
    admin: [
      { label: "Loan", icon: <MoneyIcon /> },
      { label: "Client", icon: <UserIcon /> },
      { label: "Actions", icon: <ActionIcon /> },
    ],
    home: [
      { label: "Home", icon: <HomeIcon /> },
      { label: "History", icon: <HistoryIcon /> },
      { label: "Help", icon: <HelpIcon /> },
    ],
  }
}

export default function BottomNav() {
  const { BottomNavLink, setBottomNavLink } = useBottomNav()
  const { page } = usePage()
  const T = useTokens()
  const tabSets = useTabSets()

  // ── page-gating — identical to the original logic ──
  let tabs = null
  if (page === "/referrals") {
    tabs = tabSets.referrals
  } else if (page && page.startsWith("/admin")) {
    if (page.startsWith("/admin/users")) {
      return null
    }
    tabs = tabSets.admin
  } else if (page === "/") {
    tabs = tabSets.home
  } else {
    return null
  }

  // ── active tab always derives from BottomNavLink (kept in sync via setBottomNavLink) ──
  const activeIndex = parseInt(BottomNavLink) || 0

  return (
    <nav
      style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        height: 72, background: T.navBg,
        backdropFilter: "blur(22px)", WebkitBackdropFilter: "blur(22px)",
        borderTop: `1px solid ${T.navBorder}`,
        zIndex: 90, paddingBottom: "env(safe-area-inset-bottom, 0px)",
        transition: "background 0.3s, border-color 0.3s",
      }}
    >
      <div style={{ display: "flex", height: "100%", paddingTop: 8 }}>
        {tabs.map((tab, i) => {
          const isActive = activeIndex === i
          return (
            <button
              key={tab.label}
              onClick={() => setBottomNavLink(i)}
              style={{
                flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                padding: "6px 4px", background: "none", border: "none", cursor: "pointer",
                position: "relative", transition: "color 0.2s",
                fontFamily: "'DM Sans', system-ui, sans-serif",
                color: isActive ? T.active : T.inactive,
              }}
            >
              <div style={{ transition: "transform 0.2s", transform: isActive ? "scale(1.08)" : "none" }}>
                {tab.icon}
              </div>
              <span style={{
                fontSize: 10, fontWeight: 600, letterSpacing: "0.02em",
                fontFamily: "'DM Sans', system-ui, sans-serif",
                transition: "color 0.2s",
                color: isActive ? T.active : T.inactive,
              }}>
                {tab.label}
              </span>
              {isActive && (
                <div style={{
                  position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                  width: 20, height: 2,
                  background: `linear-gradient(90deg, ${T.activeGradFrom}, ${T.activeGradTo})`,
                  borderRadius: "0 0 2px 2px",
                }} />
              )}
            </button>
          )
        })}
      </div>
      <style>{`@media (min-width: 1024px) { nav[data-vf-bottom-nav] { display: none; } }`}</style>
    </nav>
  )
}

/* ── Icons ── */
function HomeIcon() {
  return <svg width={22} height={22} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
}
function MoneyIcon() {
  return <svg width={22} height={22} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><rect x="2" y="6" width="20" height="12" rx="2" /><circle cx="12" cy="12" r="2.5" /><line x1="6" y1="9" x2="6" y2="9.01" /><line x1="18" y1="15" x2="18" y2="15.01" /></svg>
}
function UserIcon() {
  return <svg width={22} height={22} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
}
function ActionIcon() {
  return <svg width={22} height={22} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14" /></svg>
}
function HistoryIcon() {
  return <svg width={22} height={22} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 16 14" /></svg>
}
function HelpIcon() {
  return <svg width={22} height={22} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 115 0c0 1.5-2.5 2-2.5 3.5" /><line x1="12" y1="17" x2="12" y2="17.01" /></svg>
}