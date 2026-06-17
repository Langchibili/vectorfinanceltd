// // // "use client"

// // // import React, { useState } from "react";
// // // import Link from "next/link";
// // // import { usePage } from "@/Contexts/PageContext";

// // // export default function MobileNav({ loggedInUser, userIsLoggedIn }) {
// // //   const { page } = usePage();
// // //   const [menuOpen, setMenuOpen] = useState(false);

// // //   const isAdmin = loggedInUser?.type && ['director', 'ceo', 'Loan Admin', 'Accountant', 'Collateral Inspector'].includes(loggedInUser.type);
// // //   const initials = loggedInUser?.fullnames
// // //     ? loggedInUser.fullnames.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
// // //     : '?';
// // //   const displayName = loggedInUser?.fullnames?.split(' ')[0] || 'Account';

// // //   const clientLinks = [
// // //     { href: '/', label: 'Dashboard', icon: HomeIcon },
// // //     { href: '/loans', label: 'My Loans', icon: LoanIcon },
// // //     { href: '/profile', label: 'Profile', icon: UserIcon },
// // //   ];

// // //   const adminLinks = [
// // //     { href: '/admin', label: 'Dashboard', icon: HomeIcon },
// // //     { href: '/admin/loans', label: 'Loans', icon: LoanIcon },
// // //     { href: '/admin/users', label: 'Clients', icon: UsersIcon },
// // //   ];

// // //   const links = isAdmin ? adminLinks : clientLinks;

// // //   return (
// // //     <>
// // //       {/* Sticky Topnav */}
// // //       <nav className="vf-topnav" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
// // //         {/* Logo */}
// // //         <Link href={isAdmin ? '/admin' : '/'} style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
// // //           <div style={{
// // //             width: 34, height: 34, borderRadius: 10,
// // //             background: 'linear-gradient(135deg, #C9A84C, #E8C87A)',
// // //             display: 'flex', alignItems: 'center', justifyContent: 'center',
// // //             boxShadow: '0 4px 12px rgba(201,168,76,0.3)',
// // //           }}>
// // //             <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 16, color: '#0A0F1E', fontWeight: 400, lineHeight: 1 }}>V</span>
// // //           </div>
// // //           <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 15, color: '#fff', letterSpacing: '0.01em', display: 'none' }} className="hidden sm:block">
// // //             Vector Finance
// // //           </span>
// // //         </Link>

// // //         {/* Desktop links (lg+) */}
// // //         <div className="hidden lg:flex" style={{ gap: 4, marginLeft: 24 }}>
// // //           {links.map(link => (
// // //             <Link
// // //               key={link.href}
// // //               href={link.href}
// // //               style={{
// // //                 display: 'flex', alignItems: 'center', gap: 6,
// // //                 padding: '7px 14px', borderRadius: 8,
// // //                 fontSize: 13, fontWeight: 500, textDecoration: 'none',
// // //                 color: page === link.href ? '#C9A84C' : 'rgba(255,255,255,0.5)',
// // //                 background: page === link.href ? 'rgba(201,168,76,0.08)' : 'transparent',
// // //                 transition: 'all 0.2s',
// // //               }}
// // //             >
// // //               <link.icon size={15} />
// // //               {link.label}
// // //             </Link>
// // //           ))}
// // //         </div>

// // //         {/* Spacer */}
// // //         <div style={{ flex: 1 }} />

// // //         {/* Admin badge */}
// // //         {isAdmin && (
// // //           <span style={{
// // //             padding: '3px 10px', borderRadius: 100,
// // //             background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)',
// // //             color: '#C9A84C', fontSize: 10, fontWeight: 700, letterSpacing: '0.07em',
// // //             textTransform: 'uppercase',
// // //           }}>
// // //             {loggedInUser.type}
// // //           </span>
// // //         )}

// // //         {/* User avatar */}
// // //         {userIsLoggedIn && (
// // //           <div style={{ position: 'relative' }}>
// // //             <button
// // //               onClick={() => setMenuOpen(!menuOpen)}
// // //               style={{
// // //                 width: 36, height: 36, borderRadius: 10,
// // //                 background: 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.08))',
// // //                 border: '1.5px solid rgba(201,168,76,0.3)',
// // //                 color: '#C9A84C', fontSize: 13, fontWeight: 700,
// // //                 cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
// // //                 transition: 'all 0.2s',
// // //               }}
// // //               onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.15)'; }}
// // //               onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.08))'; }}
// // //             >
// // //               {initials}
// // //             </button>

// // //             {/* Dropdown */}
// // //             {menuOpen && (
// // //               <div
// // //                 style={{
// // //                   position: 'absolute', top: '100%', right: 0, marginTop: 8,
// // //                   width: 200, borderRadius: 12, overflow: 'hidden',
// // //                   background: '#0D1426', border: '1px solid rgba(255,255,255,0.08)',
// // //                   boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
// // //                   zIndex: 200,
// // //                 }}
// // //                 onClick={() => setMenuOpen(false)}
// // //               >
// // //                 <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
// // //                   <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{displayName}</div>
// // //                   <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', marginTop: 2 }}>
// // //                     {loggedInUser?.email || loggedInUser?.username || ''}
// // //                   </div>
// // //                 </div>
// // //                 {links.map(link => (
// // //                   <Link key={link.href} href={link.href} style={{
// // //                     display: 'flex', alignItems: 'center', gap: 9,
// // //                     padding: '10px 16px', color: 'rgba(255,255,255,0.65)',
// // //                     fontSize: 13, textDecoration: 'none', transition: 'background 0.15s',
// // //                   }}
// // //                     onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
// // //                     onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
// // //                   >
// // //                     <link.icon size={15} />{link.label}
// // //                   </Link>
// // //                 ))}
// // //                 <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
// // //                   <a href="/logout" style={{
// // //                     display: 'flex', alignItems: 'center', gap: 9,
// // //                     padding: '10px 16px', color: '#F87171',
// // //                     fontSize: 13, textDecoration: 'none',
// // //                   }}>
// // //                     <LogoutIcon size={15} /> Sign Out
// // //                   </a>
// // //                 </div>
// // //               </div>
// // //             )}
// // //           </div>
// // //         )}
// // //       </nav>

// // //       {/* Backdrop */}
// // //       {menuOpen && (
// // //         <div
// // //           style={{ position: 'fixed', inset: 0, zIndex: 199 }}
// // //           onClick={() => setMenuOpen(false)}
// // //         />
// // //       )}
// // //     </>
// // //   );
// // // }

// // // /* ── Minimal SVG Icons ───────────────────────────────────────── */
// // // function HomeIcon({ size = 16 }) {
// // //   return (
// // //     <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
// // //       <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
// // //       <polyline points="9 22 9 12 15 12 15 22" />
// // //     </svg>
// // //   );
// // // }
// // // function LoanIcon({ size = 16 }) {
// // //   return (
// // //     <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
// // //       <rect x="2" y="5" width="20" height="14" rx="2" />
// // //       <line x1="2" y1="10" x2="22" y2="10" />
// // //     </svg>
// // //   );
// // // }
// // // function UserIcon({ size = 16 }) {
// // //   return (
// // //     <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
// // //       <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
// // //       <circle cx="12" cy="7" r="4" />
// // //     </svg>
// // //   );
// // // }
// // // function UsersIcon({ size = 16 }) {
// // //   return (
// // //     <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
// // //       <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
// // //       <circle cx="9" cy="7" r="4" />
// // //       <path d="M23 21v-2a4 4 0 00-3-3.87" />
// // //       <path d="M16 3.13a4 4 0 010 7.75" />
// // //     </svg>
// // //   );
// // // }
// // // function LogoutIcon({ size = 16 }) {
// // //   return (
// // //     <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
// // //       <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
// // //       <polyline points="16 17 21 12 16 7" />
// // //       <line x1="21" y1="12" x2="9" y2="12" />
// // //     </svg>
// // //   );
// // // }
// // 'use client'

// // import React, { useState, useEffect, useRef } from 'react'
// // import Link from 'next/link'
// // import { usePage } from '@/Contexts/PageContext'
// // import { useThemeMode } from '@/components/ThemeProvider'

// // /* ═══════════════════════════════════════════════════════════════
// //    tiny media‑query hook (no classes needed)
// // ═══════════════════════════════════════════════════════════════ */
// // function useMediaQuery(query) {
// //   const [matches, setMatches] = useState(false)
// //   useEffect(() => {
// //     const mql = window.matchMedia(query)
// //     setMatches(mql.matches)
// //     const handler = (e) => setMatches(e.matches)
// //     mql.addEventListener('change', handler)
// //     return () => mql.removeEventListener('change', handler)
// //   }, [query])
// //   return matches
// // }

// // const GOLD = '#C9A84C'
// // const GOLDL = '#E8C87A'
// // const GREEN = '#10B981'

// // export default function MobileNav({ loggedInUser, userIsLoggedIn, logo, themeToggle }) {
// //   const { page } = usePage()
// //   const { isDark } = useThemeMode()
// //   const [menuOpen, setMenuOpen] = useState(false)
// //   const dropdownRef = useRef(null)

// //   // Responsive breakpoints (no classes required)
// //   const isSm = useMediaQuery('(min-width: 480px)')
// //   const isLg = useMediaQuery('(min-width: 1024px)')

// //   /* ── derived ── */
// //   const isAdmin = loggedInUser?.type &&
// //     ['director', 'ceo', 'Loan Admin', 'Accountant', 'Collateral Inspector'].includes(loggedInUser.type)

// //   const initials = loggedInUser?.fullnames
// //     ? loggedInUser.fullnames.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
// //     : loggedInUser?.details?.firstname
// //       ? (loggedInUser.details.firstname[0] + (loggedInUser.details.lastname?.[0] || '')).toUpperCase()
// //       : '?'

// //   const displayName = loggedInUser?.fullnames?.split(' ')[0] || loggedInUser?.details?.firstname || 'Account'
// //   const displayEmail = loggedInUser?.email || loggedInUser?.username || ''

// //   /* ── nav links ── */
// //   const clientLinks = [
// //     { href: '/', label: 'Dashboard', icon: HomeIcon },
// //     { href: '/loans', label: 'My Loans', icon: LoanIcon },
// //     { href: '/mydocuments', label: 'My Documents', icon: DocIcon },
// //     { href: '/profile', label: 'Profile', icon: UserIcon },
// //     { href: '/business-profile', label: 'Business Profile', icon: BriefIcon },
// //   ]

// //   const adminLinks = [
// //     { href: '/admin', label: 'Dashboard', icon: HomeIcon },
// //     { href: '/admin/loans', label: 'Loans', icon: LoanIcon },
// //     { href: '/admin/users', label: 'Clients', icon: UsersIcon },
// //   ]

// //   const links = isAdmin ? adminLinks : clientLinks

// //   /* ── close dropdown on outside click ── */
// //   useEffect(() => {
// //     const handleClickOutside = (e) => {
// //       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
// //         setMenuOpen(false)
// //       }
// //     }
// //     if (menuOpen) {
// //       document.addEventListener('mousedown', handleClickOutside)
// //       return () => document.removeEventListener('mousedown', handleClickOutside)
// //     }
// //   }, [menuOpen])

// //   /* ── colours that react to theme ── */
// //   const navBg = isDark ? 'rgba(10,15,30,0.88)' : 'rgba(255,255,255,0.92)'
// //   const navBorder = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.09)'
// //   const dropBg = isDark ? '#0D1426' : '#FFFFFF'
// //   const dropBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.10)'
// //   const linkColor = isDark ? 'rgba(255,255,255,0.62)' : 'rgba(13,31,23,0.65)'
// //   const linkHover = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'
// //   const textPrimary = isDark ? '#fff' : '#0D1F17'
// //   const textSecondary = isDark ? 'rgba(255,255,255,0.38)' : 'rgba(13,31,23,0.45)'

// //   const isActive = (href) => page === href

// //   return (
// //     <>
// //       {/* ── Sticky top nav ─────────────────────────────────────── */}
// //       <nav style={{
// //         position: 'fixed',
// //         top: 0,
// //         left: 0,
// //         right: 0,
// //         zIndex: 1000,
// //         height: 56,
// //         display: 'flex',
// //         alignItems: 'center',
// //         padding: '0 16px',
// //         gap: 12,
// //         background: navBg,
// //         borderBottom: `1px solid ${navBorder}`,
// //         backdropFilter: 'blur(18px)',
// //         WebkitBackdropFilter: 'blur(18px)',
// //         fontFamily: "'DM Sans', system-ui, sans-serif",
// //         transition: 'background 0.3s, border-color 0.3s',
// //       }}>

// //         {/* Logo */}
// //         <Link
// //           href={isAdmin ? '/admin' : '/'}
// //           style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}
// //         >
// //           {logo || (
// //             <div style={{
// //               width: 34, height: 34, borderRadius: 10,
// //               background: 'linear-gradient(135deg, #C9A84C, #E8C87A)',
// //               display: 'flex', alignItems: 'center', justifyContent: 'center',
// //               boxShadow: '0 4px 12px rgba(201,168,76,0.30)',
// //               flexShrink: 0,
// //             }}>
// //               <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 16, color: '#0A0F1E', fontWeight: 400, lineHeight: 1 }}>V</span>
// //             </div>
// //           )}
// //           {/* Brand text – shown only on sm+ */}
// //           {isSm && (
// //             <span style={{
// //               fontFamily: "'DM Serif Display', serif",
// //               fontSize: 15,
// //               color: isDark ? '#fff' : '#0D1F17',
// //               letterSpacing: '0.01em',
// //               whiteSpace: 'nowrap',
// //             }}>
// //               Vector Finance
// //             </span>
// //           )}
// //         </Link>

// //         {/* Desktop nav links (lg+) */}
// //         {isLg && (
// //           <div style={{ display: 'flex', gap: 4, marginLeft: 20 }}>
// //             {links.map(link => (
// //               <Link
// //                 key={link.href}
// //                 href={link.href}
// //                 style={{
// //                   display: 'flex', alignItems: 'center', gap: 6,
// //                   padding: '7px 14px', borderRadius: 8,
// //                   fontSize: 13, fontWeight: isActive(link.href) ? 600 : 500,
// //                   textDecoration: 'none',
// //                   color: isActive(link.href) ? GOLD : linkColor,
// //                   background: isActive(link.href) ? 'rgba(201,168,76,0.08)' : 'transparent',
// //                   transition: 'all 0.2s',
// //                 }}
// //                 onMouseEnter={e => { if (!isActive(link.href)) { e.currentTarget.style.background = linkHover; e.currentTarget.style.color = textPrimary } }}
// //                 onMouseLeave={e => { if (!isActive(link.href)) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = linkColor } }}
// //               >
// //                 <link.icon size={15} />
// //                 {link.label}
// //               </Link>
// //             ))}
// //           </div>
// //         )}

// //         {/* Flex spacer */}
// //         <div style={{ flex: 1 }} />

// //         {/* Admin role badge */}
// //         {isAdmin && (
// //           <span style={{
// //             padding: '3px 10px', borderRadius: 100,
// //             background: 'rgba(201,168,76,0.10)', border: '1px solid rgba(201,168,76,0.25)',
// //             color: GOLD, fontSize: 10, fontWeight: 700, letterSpacing: '0.07em',
// //             textTransform: 'uppercase', flexShrink: 0,
// //           }}>
// //             {loggedInUser.type}
// //           </span>
// //         )}

// //         {/* ── User avatar & dropdown ──────────────────────────── */}
// //         {userIsLoggedIn && (
// //           <div ref={dropdownRef} style={{ position: 'relative', flexShrink: 0 }}>

// //             {/* Trigger — wide pill so the whole area is clickable */}
// //             <button
// //               onClick={() => setMenuOpen(o => !o)}
// //               aria-label="Open account menu"
// //               style={{
// //                 height: 40,
// //                 padding: '0 12px 0 8px',
// //                 borderRadius: 12,
// //                 background: 'linear-gradient(135deg, rgba(201,168,76,0.20), rgba(201,168,76,0.08))',
// //                 border: `1.5px solid rgba(201,168,76,${menuOpen ? '0.55' : '0.30'})`,
// //                 cursor: 'pointer',
// //                 display: 'flex', alignItems: 'center', gap: 8,
// //                 transition: 'all 0.2s',
// //               }}
// //             >
// //               {/* Avatar circle */}
// //               <div style={{
// //                 width: 28, height: 28, borderRadius: 8, flexShrink: 0,
// //                 background: 'rgba(201,168,76,0.15)',
// //                 display: 'flex', alignItems: 'center', justifyContent: 'center',
// //                 fontSize: 12, fontWeight: 700, color: GOLD,
// //               }}>
// //                 {initials}
// //               </div>

// //               {/* Name — shown on sm+ */}
// //               {isSm && (
// //                 <span style={{
// //                   fontSize: 13, fontWeight: 600,
// //                   color: isDark ? 'rgba(255,255,255,0.85)' : '#0D1F17',
// //                   whiteSpace: 'nowrap', maxWidth: 90,
// //                   overflow: 'hidden', textOverflow: 'ellipsis',
// //                 }}>
// //                   {displayName}
// //                 </span>
// //               )}

// //               {/* Chevron */}
// //               <svg
// //                 width={12} height={12} viewBox="0 0 24 24"
// //                 fill="none" stroke={GOLD} strokeWidth={2.5}
// //                 style={{
// //                   flexShrink: 0, opacity: 0.7,
// //                   transform: menuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
// //                   transition: 'transform 0.2s',
// //                 }}
// //               >
// //                 <polyline points="6 9 12 15 18 9" />
// //               </svg>
// //             </button>

// //             {/* Dropdown */}
// //             {menuOpen && (
// //               <div style={{
// //                 position: 'absolute', top: 'calc(100% + 10px)', right: 0,
// //                 width: 230, borderRadius: 14, overflow: 'hidden',
// //                 background: dropBg, border: `1px solid ${dropBorder}`,
// //                 boxShadow: isDark ? '0 20px 50px rgba(0,0,0,0.55)' : '0 12px 40px rgba(0,0,0,0.14)',
// //                 zIndex: 300,
// //                 animation: 'vfNavDrop 0.18s ease',
// //               }}>
// //                 {/* ① User info */}
// //                 <div style={{ padding: '14px 16px', borderBottom: `1px solid ${dropBorder}` }}>
// //                   <div style={{ fontSize: 13, fontWeight: 600, color: textPrimary }}>{displayName}</div>
// //                   <div style={{ fontSize: 11, color: textSecondary, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
// //                     {displayEmail}
// //                   </div>
// //                 </div>

// //                 {/* ② Nav links */}
// //                 {links.map(link => (
// //                   <Link
// //                     key={link.href}
// //                     href={link.href}
// //                     onClick={() => setMenuOpen(false)}
// //                     style={{
// //                       display: 'flex', alignItems: 'center', gap: 10,
// //                       padding: '10px 16px',
// //                       color: isActive(link.href) ? GOLD : linkColor,
// //                       background: isActive(link.href) ? 'rgba(201,168,76,0.07)' : 'transparent',
// //                       fontSize: 13, fontWeight: isActive(link.href) ? 600 : 400,
// //                       textDecoration: 'none', transition: 'background 0.15s',
// //                     }}
// //                     onMouseEnter={e => { if (!isActive(link.href)) e.currentTarget.style.background = linkHover }}
// //                     onMouseLeave={e => { if (!isActive(link.href)) e.currentTarget.style.background = 'transparent' }}
// //                   >
// //                     <link.icon size={15} />
// //                     {link.label}
// //                   </Link>
// //                 ))}

// //                 {/* ③ Theme toggle */}
// //                 {themeToggle && (
// //                   <div style={{
// //                     display: 'flex', alignItems: 'center', justifyContent: 'space-between',
// //                     padding: '10px 16px',
// //                     borderTop: `1px solid ${dropBorder}`,
// //                   }}>
// //                     <span style={{ fontSize: 13, color: linkColor }}>
// //                       {isDark ? 'Dark mode' : 'Light mode'}
// //                     </span>
// //                     {themeToggle}
// //                   </div>
// //                 )}

// //                 {/* ④ Sign out */}
// //                 <div style={{ borderTop: `1px solid ${dropBorder}` }}>
// //                   <a
// //                     href="/logout"
// //                     style={{
// //                       display: 'flex', alignItems: 'center', gap: 10,
// //                       padding: '10px 16px',
// //                       color: '#F87171', fontSize: 13, textDecoration: 'none',
// //                       transition: 'background 0.15s',
// //                     }}
// //                     onMouseEnter={e => { e.currentTarget.style.background = 'rgba(248,113,113,0.07)' }}
// //                     onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
// //                   >
// //                     <LogoutIcon size={15} /> Sign Out
// //                   </a>
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         )}
// //       </nav>

// //       {/* keyframe animation */}
// //       <style>{`
// //         @keyframes vfNavDrop {
// //           from { opacity: 0; transform: translateY(-6px); }
// //           to   { opacity: 1; transform: translateY(0); }
// //         }
// //       `}</style>
// //     </>
// //   )
// // }

// // /* ── Icons ───────────────────────────────────────────────────── */
// // function HomeIcon({ size = 16 }) {
// //   return (
// //     <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
// //       <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
// //       <polyline points="9 22 9 12 15 12 15 22" />
// //     </svg>
// //   )
// // }
// // function LoanIcon({ size = 16 }) {
// //   return (
// //     <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
// //       <rect x="2" y="5" width="20" height="14" rx="2" />
// //       <line x1="2" y1="10" x2="22" y2="10" />
// //     </svg>
// //   )
// // }
// // function DocIcon({ size = 16 }) {
// //   return (
// //     <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
// //       <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
// //       <polyline points="14 2 14 8 20 8" />
// //       <line x1="16" y1="13" x2="8" y2="13" />
// //       <line x1="16" y1="17" x2="8" y2="17" />
// //       <polyline points="10 9 9 9 8 9" />
// //     </svg>
// //   )
// // }
// // function UserIcon({ size = 16 }) {
// //   return (
// //     <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
// //       <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
// //       <circle cx="12" cy="7" r="4" />
// //     </svg>
// //   )
// // }
// // function BriefIcon({ size = 16 }) {
// //   return (
// //     <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
// //       <rect x="2" y="7" width="20" height="14" rx="2" />
// //       <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
// //     </svg>
// //   )
// // }
// // function UsersIcon({ size = 16 }) {
// //   return (
// //     <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
// //       <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
// //       <circle cx="9" cy="7" r="4" />
// //       <path d="M23 21v-2a4 4 0 00-3-3.87" />
// //       <path d="M16 3.13a4 4 0 010 7.75" />
// //     </svg>
// //   )
// // }
// // function LogoutIcon({ size = 16 }) {
// //   return (
// //     <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
// //       <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
// //       <polyline points="16 17 21 12 16 7" />
// //       <line x1="21" y1="12" x2="9" y2="12" />
// //     </svg>
// //   )
// // }
// 'use client'

// import React, { useState, useEffect, useRef } from 'react'
// import Link from 'next/link'
// import { usePage } from '@/Contexts/PageContext'
// import { useThemeMode } from '@/components/ThemeProvider'

// /* ═══════════════════════════════════════════════════════════════
//    tiny media‑query hook (no classes needed)
// ═══════════════════════════════════════════════════════════════ */
// function useMediaQuery(query) {
//   const [matches, setMatches] = useState(false)
//   useEffect(() => {
//     const mql = window.matchMedia(query)
//     setMatches(mql.matches)
//     const handler = (e) => setMatches(e.matches)
//     mql.addEventListener('change', handler)
//     return () => mql.removeEventListener('change', handler)
//   }, [query])
//   return matches
// }

// const GOLD = '#C9A84C'
// const GOLDL = '#E8C87A'
// const GREEN = '#10B981'

// export default function MobileNav({ loggedInUser, userIsLoggedIn, logo, themeToggle }) {
//   const { page } = usePage()
//   const { isDark } = useThemeMode()
//   const [menuOpen, setMenuOpen] = useState(false)
//   const dropdownRef = useRef(null)

//   // Responsive breakpoints (no classes required)
//   const isSm = useMediaQuery('(min-width: 480px)')
//   const isLg = useMediaQuery('(min-width: 1024px)')

//   /* ── derived ── */
//   const isAdmin = loggedInUser?.type &&
//     ['director', 'ceo', 'Loan Admin', 'Accountant', 'Collateral Inspector'].includes(loggedInUser.type)

//   const initials = loggedInUser?.fullnames
//     ? loggedInUser.fullnames.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
//     : loggedInUser?.details?.firstname
//       ? (loggedInUser.details.firstname[0] + (loggedInUser.details.lastname?.[0] || '')).toUpperCase()
//       : '?'

//   const displayName = loggedInUser?.fullnames?.split(' ')[0] || loggedInUser?.details?.firstname || 'Account'
//   const displayEmail = loggedInUser?.email || loggedInUser?.username || ''

//   /* ── nav links ── */
//   const clientLinks = [
//     { href: '/', label: 'Dashboard', icon: HomeIcon },
//     { href: '/loans', label: 'My Loans', icon: LoanIcon },
//     { href: '/mydocuments', label: 'My Documents', icon: DocIcon },
//     { href: '/profile', label: 'Profile', icon: UserIcon },
//     { href: '/business-profile', label: 'Business Profile', icon: BriefIcon },
//   ]

//   const adminLinks = [
//     { href: '/admin', label: 'Dashboard', icon: HomeIcon },
//     { href: '/admin/loans', label: 'Loans', icon: LoanIcon },
//     { href: '/admin/users', label: 'Clients', icon: UsersIcon },
//   ]

//   const links = isAdmin ? adminLinks : clientLinks

//   /* ── close dropdown on outside click ── */
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setMenuOpen(false)
//       }
//     }
//     if (menuOpen) {
//       document.addEventListener('mousedown', handleClickOutside)
//       return () => document.removeEventListener('mousedown', handleClickOutside)
//     }
//   }, [menuOpen])

//   /* ── colours that react to theme ── */
//   const navBg = isDark ? 'rgba(10,15,30,0.88)' : 'rgba(255,255,255,0.92)'
//   const navBorder = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.09)'
//   const dropBg = isDark ? '#0D1426' : '#FFFFFF'
//   const dropBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.10)'
//   const linkColor = isDark ? 'rgba(255,255,255,0.62)' : 'rgba(13,31,23,0.65)'
//   const linkHover = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'
//   const textPrimary = isDark ? '#fff' : '#0D1F17'
//   const textSecondary = isDark ? 'rgba(255,255,255,0.38)' : 'rgba(13,31,23,0.45)'

//   const isActive = (href) => page === href

//   return (
//     <>
//       {/* ── Sticky top nav ─────────────────────────────────────── */}
//       <nav style={{
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         right: 0,
//         zIndex: 1000,
//         height: 56,
//         display: 'flex',
//         alignItems: 'center',
//         padding: '0 16px',
//         gap: 12,
//         background: navBg,
//         borderBottom: `1px solid ${navBorder}`,
//         backdropFilter: 'blur(18px)',
//         WebkitBackdropFilter: 'blur(18px)',
//         fontFamily: "'DM Sans', system-ui, sans-serif",
//         transition: 'background 0.3s, border-color 0.3s',
//       }}>

//         {/* Logo */}
//         <Link
//           href={isAdmin ? '/admin' : '/'}
//           style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}
//         >
//           {logo || (
//             <div style={{
//               width: 34, height: 34, borderRadius: 10,
//               background: 'linear-gradient(135deg, #C9A84C, #E8C87A)',
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//               boxShadow: '0 4px 12px rgba(201,168,76,0.30)',
//               flexShrink: 0,
//             }}>
//               <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 16, color: '#0A0F1E', fontWeight: 400, lineHeight: 1 }}>V</span>
//             </div>
//           )}
//           {/* Brand text – shown only on sm+ */}
//           {isSm && (
//             <span style={{
//               fontFamily: "'DM Serif Display', serif",
//               fontSize: 15,
//               color: isDark ? '#fff' : '#0D1F17',
//               letterSpacing: '0.01em',
//               whiteSpace: 'nowrap',
//             }}>
//               Vector Finance
//             </span>
//           )}
//         </Link>

//         {/* Desktop nav links (lg+) */}
//         {isLg && (
//           <div style={{ display: 'flex', gap: 4, marginLeft: 20 }}>
//             {links.map(link => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 style={{
//                   display: 'flex', alignItems: 'center', gap: 6,
//                   padding: '7px 14px', borderRadius: 8,
//                   fontSize: 13, fontWeight: isActive(link.href) ? 600 : 500,
//                   textDecoration: 'none',
//                   color: isActive(link.href) ? GOLD : linkColor,
//                   background: isActive(link.href) ? 'rgba(201,168,76,0.08)' : 'transparent',
//                   transition: 'all 0.2s',
//                 }}
//                 onMouseEnter={e => { if (!isActive(link.href)) { e.currentTarget.style.background = linkHover; e.currentTarget.style.color = textPrimary } }}
//                 onMouseLeave={e => { if (!isActive(link.href)) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = linkColor } }}
//               >
//                 <link.icon size={15} />
//                 {link.label}
//               </Link>
//             ))}
//           </div>
//         )}

//         {/* Flex spacer */}
//         <div style={{ flex: 1 }} />

//         {/* Admin role badge */}
//         {isAdmin && (
//           <span style={{
//             padding: '3px 10px', borderRadius: 100,
//             background: 'rgba(201,168,76,0.10)', border: '1px solid rgba(201,168,76,0.25)',
//             color: GOLD, fontSize: 10, fontWeight: 700, letterSpacing: '0.07em',
//             textTransform: 'uppercase', flexShrink: 0,
//           }}>
//             {loggedInUser.type}
//           </span>
//         )}

//         {/* ── User avatar & dropdown ──────────────────────────── */}
//         {userIsLoggedIn && (
//           <div ref={dropdownRef} style={{ position: 'relative', flexShrink: 0 }}>

//             {/* Trigger — wide pill so the whole area is clickable */}
//             <button
//               onClick={() => setMenuOpen(o => !o)}
//               aria-label="Open account menu"
//               style={{
//                 height: 40,
//                 padding: '0 12px 0 8px',
//                 borderRadius: 12,
//                 background: 'linear-gradient(135deg, rgba(201,168,76,0.20), rgba(201,168,76,0.08))',
//                 border: `1.5px solid rgba(201,168,76,${menuOpen ? '0.55' : '0.30'})`,
//                 cursor: 'pointer',
//                 display: 'flex', alignItems: 'center', gap: 8,
//                 transition: 'all 0.2s',
//               }}
//             >
//               {/* Avatar circle */}
//               <div style={{
//                 width: 28, height: 28, borderRadius: 8, flexShrink: 0,
//                 background: 'rgba(201,168,76,0.15)',
//                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 fontSize: 12, fontWeight: 700, color: GOLD,
//               }}>
//                 {initials}
//               </div>

//               {/* Name — shown on sm+ */}
//               {isSm && (
//                 <span style={{
//                   fontSize: 13, fontWeight: 600,
//                   color: isDark ? 'rgba(255,255,255,0.85)' : '#0D1F17',
//                   whiteSpace: 'nowrap', maxWidth: 90,
//                   overflow: 'hidden', textOverflow: 'ellipsis',
//                 }}>
//                   {displayName}
//                 </span>
//               )}

//               {/* Chevron */}
//               <svg
//                 width={12} height={12} viewBox="0 0 24 24"
//                 fill="none" stroke={GOLD} strokeWidth={2.5}
//                 style={{
//                   flexShrink: 0, opacity: 0.7,
//                   transform: menuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
//                   transition: 'transform 0.2s',
//                 }}
//               >
//                 <polyline points="6 9 12 15 18 9" />
//               </svg>
//             </button>

//             {/* Dropdown */}
//             {menuOpen && (
//               <div style={{
//                 position: 'absolute', top: 'calc(100% + 10px)', right: 0,
//                 width: 230, borderRadius: 14, overflow: 'hidden',
//                 background: dropBg, border: `1px solid ${dropBorder}`,
//                 boxShadow: isDark ? '0 20px 50px rgba(0,0,0,0.55)' : '0 12px 40px rgba(0,0,0,0.14)',
//                 zIndex: 300,
//                 animation: 'vfNavDrop 0.18s ease',
//               }}>
//                 {/* ① User info */}
//                 <div style={{ padding: '14px 16px', borderBottom: `1px solid ${dropBorder}` }}>
//                   <div style={{ fontSize: 13, fontWeight: 600, color: textPrimary }}>{displayName}</div>
//                   <div style={{ fontSize: 11, color: textSecondary, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//                     {displayEmail}
//                   </div>
//                 </div>

//                 {/* ② Nav links */}
//                 {links.map(link => (
//                   <Link
//                     key={link.href}
//                     href={link.href}
//                     onClick={() => setMenuOpen(false)}
//                     style={{
//                       display: 'flex', alignItems: 'center', gap: 10,
//                       padding: '10px 16px',
//                       color: isActive(link.href) ? GOLD : linkColor,
//                       background: isActive(link.href) ? 'rgba(201,168,76,0.07)' : 'transparent',
//                       fontSize: 13, fontWeight: isActive(link.href) ? 600 : 400,
//                       textDecoration: 'none', transition: 'background 0.15s',
//                     }}
//                     onMouseEnter={e => { if (!isActive(link.href)) e.currentTarget.style.background = linkHover }}
//                     onMouseLeave={e => { if (!isActive(link.href)) e.currentTarget.style.background = 'transparent' }}
//                   >
//                     <link.icon size={15} />
//                     {link.label}
//                   </Link>
//                 ))}

//                 {/* ③ Theme toggle */}
//                 {themeToggle && (
//                   <div style={{
//                     display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//                     padding: '10px 16px',
//                     borderTop: `1px solid ${dropBorder}`,
//                   }}>
//                     <span style={{ fontSize: 13, color: linkColor }}>
//                       {isDark ? 'Dark mode' : 'Light mode'}
//                     </span>
//                     {themeToggle}
//                   </div>
//                 )}

//                 {/* ④ Sign out */}
//                 <div style={{ borderTop: `1px solid ${dropBorder}` }}>
//                   <a
//                     href="/logout"
//                     style={{
//                       display: 'flex', alignItems: 'center', gap: 10,
//                       padding: '10px 16px',
//                       color: '#F87171', fontSize: 13, textDecoration: 'none',
//                       transition: 'background 0.15s',
//                     }}
//                     onMouseEnter={e => { e.currentTarget.style.background = 'rgba(248,113,113,0.07)' }}
//                     onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
//                   >
//                     <LogoutIcon size={15} /> Sign Out
//                   </a>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}
//       </nav>

//       {/* keyframe animation */}
//       <style>{`
//         @keyframes vfNavDrop {
//           from { opacity: 0; transform: translateY(-6px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//       `}</style>
//     </>
//   )
// }

// /* ── Icons ───────────────────────────────────────────────────── */
// function HomeIcon({ size = 16 }) {
//   return (
//     <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
//       <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
//       <polyline points="9 22 9 12 15 12 15 22" />
//     </svg>
//   )
// }
// function LoanIcon({ size = 16 }) {
//   return (
//     <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
//       <rect x="2" y="5" width="20" height="14" rx="2" />
//       <line x1="2" y1="10" x2="22" y2="10" />
//     </svg>
//   )
// }
// function DocIcon({ size = 16 }) {
//   return (
//     <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
//       <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
//       <polyline points="14 2 14 8 20 8" />
//       <line x1="16" y1="13" x2="8" y2="13" />
//       <line x1="16" y1="17" x2="8" y2="17" />
//       <polyline points="10 9 9 9 8 9" />
//     </svg>
//   )
// }
// function UserIcon({ size = 16 }) {
//   return (
//     <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
//       <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
//       <circle cx="12" cy="7" r="4" />
//     </svg>
//   )
// }
// function BriefIcon({ size = 16 }) {
//   return (
//     <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
//       <rect x="2" y="7" width="20" height="14" rx="2" />
//       <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
//     </svg>
//   )
// }
// function UsersIcon({ size = 16 }) {
//   return (
//     <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
//       <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
//       <circle cx="9" cy="7" r="4" />
//       <path d="M23 21v-2a4 4 0 00-3-3.87" />
//       <path d="M16 3.13a4 4 0 010 7.75" />
//     </svg>
//   )
// }
// function LogoutIcon({ size = 16 }) {
//   return (
//     <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
//       <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
//       <polyline points="16 17 21 12 16 7" />
//       <line x1="21" y1="12" x2="9" y2="12" />
//     </svg>
//   )
// }
'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePage } from '@/Contexts/PageContext'
import { useThemeMode } from '@/components/ThemeProvider'

/* ═══════════════════════════════════════════════════════════════
   tiny media‑query hook (no classes needed)
═══════════════════════════════════════════════════════════════ */
function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia(query)
    setMatches(mql.matches)
    const handler = (e) => setMatches(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [query])
  return matches
}

const GOLD = '#C9A84C'
const GOLDL = '#E8C87A'
const GREEN = '#10B981'

export default function MobileNav({ loggedInUser, userIsLoggedIn, logo, themeToggle }) {
  const { page } = usePage()
  const { isDark } = useThemeMode()
  const [menuOpen, setMenuOpen] = useState(false)
  const dropdownRef = useRef(null)

  const isSm = useMediaQuery('(min-width: 480px)')
  const isLg = useMediaQuery('(min-width: 1024px)')

  /* ── derived ── */
  const isAdmin = loggedInUser?.type &&
    ['director', 'ceo', 'Loan Admin', 'Accountant', 'Collateral Inspector'].includes(loggedInUser.type)

  const initials = loggedInUser?.fullnames
    ? loggedInUser.fullnames.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : loggedInUser?.details?.firstname
      ? (loggedInUser.details.firstname[0] + (loggedInUser.details.lastname?.[0] || '')).toUpperCase()
      : '?'

  const displayName = loggedInUser?.fullnames?.split(' ')[0] || loggedInUser?.details?.firstname || 'Account'
  const displayEmail = loggedInUser?.email || loggedInUser?.username || ''

  /* ── nav links ── */
  const clientLinks = [
    { href: '/', label: 'Dashboard', icon: HomeIcon },
    { href: '/loans', label: 'My Loans', icon: LoanIcon },
    { href: '/mydocuments', label: 'My Documents', icon: DocIcon },
    { href: '/profile', label: 'Profile', icon: UserIcon },
    { href: '/business-profile', label: 'Business Profile', icon: BriefIcon },
  ]

  const adminLinks = [
    { href: '/admin', label: 'Dashboard', icon: HomeIcon },
    { href: '/admin/loans', label: 'Loans', icon: LoanIcon },
    { href: '/admin/users', label: 'Clients', icon: UsersIcon },
  ]

  const links = isAdmin ? adminLinks : clientLinks

  /* ── close dropdown on outside click ── */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuOpen])

  /* ── colours ── */
  const navBg = isDark ? 'rgba(10,15,30,0.88)' : 'rgba(255,255,255,0.92)'
  const navBorder = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.09)'
  const dropBg = isDark ? '#0D1426' : '#FFFFFF'
  const dropBorder = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.10)'
  const linkColor = isDark ? 'rgba(255,255,255,0.62)' : 'rgba(13,31,23,0.65)'
  const linkHover = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)'
  const textPrimary = isDark ? '#fff' : '#0D1F17'
  const textSecondary = isDark ? 'rgba(255,255,255,0.38)' : 'rgba(13,31,23,0.45)'

  const isActive = (href) => page === href

  /* ── all children pass clicks to the trigger div ── */
  const noPointer = { pointerEvents: 'none' }

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        height: 56,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: 12,
        background: navBg,
        borderBottom: `1px solid ${navBorder}`,
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        fontFamily: "'DM Sans', system-ui, sans-serif",
        transition: 'background 0.3s, border-color 0.3s',
      }}>

        {/* Logo */}
        <Link
          href={isAdmin ? '/admin' : '/'}
          style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}
        >
          {logo || (
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: 'linear-gradient(135deg, #C9A84C, #E8C87A)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(201,168,76,0.30)',
              flexShrink: 0,
            }}>
              <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 16, color: '#0A0F1E', fontWeight: 400, lineHeight: 1 }}>V</span>
            </div>
          )}
          {isSm && (
            <span style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 15,
              color: isDark ? '#fff' : '#0D1F17',
              letterSpacing: '0.01em',
              whiteSpace: 'nowrap',
            }}>
              Vector Finance
            </span>
          )}
        </Link>

        {/* Desktop nav links */}
        {isLg && (
          <div style={{ display: 'flex', gap: 4, marginLeft: 20 }}>
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '7px 14px', borderRadius: 8,
                  fontSize: 13, fontWeight: isActive(link.href) ? 600 : 500,
                  textDecoration: 'none',
                  color: isActive(link.href) ? GOLD : linkColor,
                  background: isActive(link.href) ? 'rgba(201,168,76,0.08)' : 'transparent',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { if (!isActive(link.href)) { e.currentTarget.style.background = linkHover; e.currentTarget.style.color = textPrimary } }}
                onMouseLeave={e => { if (!isActive(link.href)) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = linkColor } }}
              >
                <link.icon size={15} />
                {link.label}
              </Link>
            ))}
          </div>
        )}

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Admin badge */}
        {isAdmin && (
          <span style={{
            padding: '3px 10px', borderRadius: 100,
            background: 'rgba(201,168,76,0.10)', border: '1px solid rgba(201,168,76,0.25)',
            color: GOLD, fontSize: 10, fontWeight: 700, letterSpacing: '0.07em',
            textTransform: 'uppercase', flexShrink: 0,
          }}>
            {loggedInUser.type}
          </span>
        )}

        {/* ── Avatar trigger + dropdown ── */}
        {userIsLoggedIn && (
          <div ref={dropdownRef} style={{ position: 'relative', flexShrink: 0, zIndex: '999' }}>

            {/*
              onClick lives on this div. Every child has pointerEvents:'none'
              so clicks always bubble up here regardless of where the user taps.
            */}
            <div
              onClick={() => setMenuOpen(o => !o)}
              role="button"
              aria-label="Open account menu"
              style={{
                height: 40,
                padding: '0 12px 0 8px',
                borderRadius: 12,
                background: 'linear-gradient(135deg, rgba(201,168,76,0.20), rgba(201,168,76,0.08))',
                border: `1.5px solid rgba(201,168,76,${menuOpen ? '0.55' : '0.30'})`,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                userSelect: 'none',
                transition: 'all 0.2s',
              }}
            >
              {/* Avatar circle */}
              <div style={{
                ...noPointer,
                width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                background: 'rgba(201,168,76,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, color: GOLD,
              }}>
                {initials}
              </div>

              {/* Name */}
              {isSm && (
                <span style={{
                  ...noPointer,
                  fontSize: 13, fontWeight: 600,
                  color: isDark ? 'rgba(255,255,255,0.85)' : '#0D1F17',
                  whiteSpace: 'nowrap', maxWidth: 90,
                  overflow: 'hidden', textOverflow: 'ellipsis',
                }}>
                  {displayName}
                </span>
              )}

              {/* Chevron */}
              <svg
                width={12} height={12} viewBox="0 0 24 24"
                fill="none" stroke={GOLD} strokeWidth={2.5}
                style={{
                  ...noPointer,
                  flexShrink: 0, opacity: 0.7,
                  transform: menuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>

            {/* Dropdown panel */}
            {menuOpen && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 10px)', right: 0,
                width: 230, borderRadius: 14, overflow: 'hidden',
                background: dropBg, border: `1px solid ${dropBorder}`,
                boxShadow: isDark ? '0 20px 50px rgba(0,0,0,0.55)' : '0 12px 40px rgba(0,0,0,0.14)',
                zIndex: 300,
                animation: 'vfNavDrop 0.18s ease',
              }}>
                {/* User info */}
                <div style={{ padding: '14px 16px', borderBottom: `1px solid ${dropBorder}` }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: textPrimary }}>{displayName}</div>
                  <div style={{ fontSize: 11, color: textSecondary, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {displayEmail}
                  </div>
                </div>

                {/* Nav links */}
                {links.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '10px 16px',
                      color: isActive(link.href) ? GOLD : linkColor,
                      background: isActive(link.href) ? 'rgba(201,168,76,0.07)' : 'transparent',
                      fontSize: 13, fontWeight: isActive(link.href) ? 600 : 400,
                      textDecoration: 'none', transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => { if (!isActive(link.href)) e.currentTarget.style.background = linkHover }}
                    onMouseLeave={e => { if (!isActive(link.href)) e.currentTarget.style.background = 'transparent' }}
                  >
                    <link.icon size={15} />
                    {link.label}
                  </Link>
                ))}

                {/* Theme toggle */}
                {themeToggle && (
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '10px 16px',
                    borderTop: `1px solid ${dropBorder}`,
                  }}>
                    <span style={{ fontSize: 13, color: linkColor }}>
                      {isDark ? 'Dark mode' : 'Light mode'}
                    </span>
                    {themeToggle}
                  </div>
                )}

                {/* Sign out */}
                <div style={{ borderTop: `1px solid ${dropBorder}` }}>
                  <a
                    href="/logout"
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '10px 16px',
                      color: '#F87171', fontSize: 13, textDecoration: 'none',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(248,113,113,0.07)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                  >
                    <LogoutIcon size={15} /> Sign Out
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </nav>

      <style>{`
        @keyframes vfNavDrop {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  )
}

/* ── Icons ── */
function HomeIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}
function LoanIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  )
}
function DocIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  )
}
function UserIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
function BriefIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
    </svg>
  )
}
function UsersIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  )
}
function LogoutIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  )
}