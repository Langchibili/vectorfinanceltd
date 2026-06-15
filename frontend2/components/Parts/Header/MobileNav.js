"use client"

import React, { useState } from "react";
import Link from "next/link";
import { usePage } from "@/Contexts/PageContext";

export default function MobileNav({ loggedInUser, userIsLoggedIn }) {
  const { page } = usePage();
  const [menuOpen, setMenuOpen] = useState(false);

  const isAdmin = loggedInUser?.type && ['director', 'ceo', 'Loan Admin', 'Accountant', 'Collateral Inspector'].includes(loggedInUser.type);
  const initials = loggedInUser?.fullnames
    ? loggedInUser.fullnames.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '?';
  const displayName = loggedInUser?.fullnames?.split(' ')[0] || 'Account';

  const clientLinks = [
    { href: '/', label: 'Dashboard', icon: HomeIcon },
    { href: '/loans', label: 'My Loans', icon: LoanIcon },
    { href: '/profile', label: 'Profile', icon: UserIcon },
  ];

  const adminLinks = [
    { href: '/admin', label: 'Dashboard', icon: HomeIcon },
    { href: '/admin/loans', label: 'Loans', icon: LoanIcon },
    { href: '/admin/users', label: 'Clients', icon: UsersIcon },
  ];

  const links = isAdmin ? adminLinks : clientLinks;

  return (
    <>
      {/* Sticky Topnav */}
      <nav className="vf-topnav" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
        {/* Logo */}
        <Link href={isAdmin ? '/admin' : '/'} style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: 'linear-gradient(135deg, #C9A84C, #E8C87A)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(201,168,76,0.3)',
          }}>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 16, color: '#0A0F1E', fontWeight: 400, lineHeight: 1 }}>V</span>
          </div>
          <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 15, color: '#fff', letterSpacing: '0.01em', display: 'none' }} className="hidden sm:block">
            Vector Finance
          </span>
        </Link>

        {/* Desktop links (lg+) */}
        <div className="hidden lg:flex" style={{ gap: 4, marginLeft: 24 }}>
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '7px 14px', borderRadius: 8,
                fontSize: 13, fontWeight: 500, textDecoration: 'none',
                color: page === link.href ? '#C9A84C' : 'rgba(255,255,255,0.5)',
                background: page === link.href ? 'rgba(201,168,76,0.08)' : 'transparent',
                transition: 'all 0.2s',
              }}
            >
              <link.icon size={15} />
              {link.label}
            </Link>
          ))}
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Admin badge */}
        {isAdmin && (
          <span style={{
            padding: '3px 10px', borderRadius: 100,
            background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)',
            color: '#C9A84C', fontSize: 10, fontWeight: 700, letterSpacing: '0.07em',
            textTransform: 'uppercase',
          }}>
            {loggedInUser.type}
          </span>
        )}

        {/* User avatar */}
        {userIsLoggedIn && (
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.08))',
                border: '1.5px solid rgba(201,168,76,0.3)',
                color: '#C9A84C', fontSize: 13, fontWeight: 700,
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,168,76,0.15)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.08))'; }}
            >
              {initials}
            </button>

            {/* Dropdown */}
            {menuOpen && (
              <div
                style={{
                  position: 'absolute', top: '100%', right: 0, marginTop: 8,
                  width: 200, borderRadius: 12, overflow: 'hidden',
                  background: '#0D1426', border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
                  zIndex: 200,
                }}
                onClick={() => setMenuOpen(false)}
              >
                <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{displayName}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', marginTop: 2 }}>
                    {loggedInUser?.email || loggedInUser?.username || ''}
                  </div>
                </div>
                {links.map(link => (
                  <Link key={link.href} href={link.href} style={{
                    display: 'flex', alignItems: 'center', gap: 9,
                    padding: '10px 16px', color: 'rgba(255,255,255,0.65)',
                    fontSize: 13, textDecoration: 'none', transition: 'background 0.15s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    <link.icon size={15} />{link.label}
                  </Link>
                ))}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <a href="/logout" style={{
                    display: 'flex', alignItems: 'center', gap: 9,
                    padding: '10px 16px', color: '#F87171',
                    fontSize: 13, textDecoration: 'none',
                  }}>
                    <LogoutIcon size={15} /> Sign Out
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Backdrop */}
      {menuOpen && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 199 }}
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}

/* ── Minimal SVG Icons ───────────────────────────────────────── */
function HomeIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
function LoanIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  );
}
function UserIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
function UsersIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  );
}
function LogoutIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}