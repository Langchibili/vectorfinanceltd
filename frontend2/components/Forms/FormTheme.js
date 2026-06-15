// ═══════════════════════════════════════════════════════════════
//  VECTORFIN FORM THEME — shared design tokens & CSS
//  Import into every form component.
// ═══════════════════════════════════════════════════════════════

export const G = {
    page: "#0A0F1E",
    card: "rgba(255,255,255,0.035)",
    cardHov: "rgba(255,255,255,0.055)",
    green1: "#059669",
    green2: "#10B981",
    green3: "#34D399",
    gold: "#C9A84C",
    goldL: "#E8C87A",
    red: "#F87171",
    redD: "#DC2626",
    blue: "#60A5FA",
    amber: "#FBBF24",
    purple: "#A78BFA",
    white: "#ffffff",
    muted: "rgba(255,255,255,0.38)",
    dim: "rgba(255,255,255,0.035)",
    border: "rgba(255,255,255,0.08)",
    borderG: "rgba(16,185,129,0.22)",
    inputBg: "rgba(255,255,255,0.05)",
    inputBgHov: "rgba(255,255,255,0.07)",
}

// ── button base styles ────────────────────────────────────────
export const btnPrimary = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7,
    background: "linear-gradient(135deg,#059669 0%,#10B981 55%,#059669 100%)",
    backgroundSize: "200% auto",
    color: "#fff", fontWeight: 700, fontSize: 14,
    border: "none", borderRadius: 12, padding: "12px 26px",
    cursor: "pointer", textDecoration: "none", letterSpacing: "0.01em",
    boxShadow: "0 4px 20px rgba(16,185,129,0.30), inset 0 1px 0 rgba(255,255,255,0.12)",
    transition: "all 0.22s cubic-bezier(.22,1,.36,1)",
    fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)",
    position: "relative", overflow: "hidden",
}
export const btnOutline = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7,
    background: "transparent",
    color: "#10B981", fontWeight: 700, fontSize: 14,
    border: "1.5px solid rgba(16,185,129,0.38)", borderRadius: 12, padding: "11px 26px",
    cursor: "pointer", textDecoration: "none", letterSpacing: "0.01em",
    transition: "all 0.22s cubic-bezier(.22,1,.36,1)",
    fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)",
}
export const btnDanger = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7,
    background: "linear-gradient(135deg,#DC2626 0%,#EF4444 55%,#DC2626 100%)",
    backgroundSize: "200% auto",
    color: "#fff", fontWeight: 700, fontSize: 14,
    border: "none", borderRadius: 12, padding: "12px 26px",
    cursor: "pointer", letterSpacing: "0.01em",
    boxShadow: "0 4px 20px rgba(220,38,38,0.28), inset 0 1px 0 rgba(255,255,255,0.10)",
    transition: "all 0.22s cubic-bezier(.22,1,.36,1)",
    fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)",
}
export const btnInfo = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7,
    background: "linear-gradient(135deg,#1D4ED8 0%,#3B82F6 55%,#1D4ED8 100%)",
    backgroundSize: "200% auto",
    color: "#fff", fontWeight: 700, fontSize: 14,
    border: "none", borderRadius: 12, padding: "12px 26px",
    cursor: "pointer", letterSpacing: "0.01em",
    boxShadow: "0 4px 20px rgba(59,130,246,0.28), inset 0 1px 0 rgba(255,255,255,0.10)",
    transition: "all 0.22s cubic-bezier(.22,1,.36,1)",
    fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)",
}

// ── card wrapper ──────────────────────────────────────────────
export const cardStyle = {
    background: "linear-gradient(160deg, rgba(16,185,129,0.06) 0%, rgba(10,15,30,0.95) 40%, rgba(10,15,30,0.98) 100%)",
    border: "1px solid rgba(16,185,129,0.15)",
    borderRadius: 20,
    boxShadow: "0 8px 40px rgba(0,0,0,0.45), 0 1px 0 rgba(16,185,129,0.12) inset",
    overflow: "hidden",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
}

// ── input base ────────────────────────────────────────────────
export const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: 10,
    color: "#fff",
    fontSize: 14,
    padding: "11px 14px",
    outline: "none",
    fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)",
    transition: "border-color 0.18s, box-shadow 0.18s, background 0.18s",
    boxSizing: "border-box",
}

// ── label ─────────────────────────────────────────────────────
export const labelStyle = {
    display: "block",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.5)",
    marginBottom: 7,
    fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)",
}

// ── section divider ───────────────────────────────────────────
export const dividerStyle = {
    height: 1,
    background: "linear-gradient(90deg, transparent, rgba(16,185,129,0.25), transparent)",
    margin: "24px 0",
    border: "none",
}

// ── alert/badge configs ───────────────────────────────────────
export const alertConfig = {
    success: {
        bg: "rgba(16,185,129,0.09)",
        border: "rgba(16,185,129,0.25)",
        color: "#6EE7B7",
        glow: "rgba(16,185,129,0.05)",
        icon: "✓",
    },
    info: {
        bg: "rgba(59,130,246,0.09)",
        border: "rgba(59,130,246,0.25)",
        color: "#93C5FD",
        glow: "rgba(59,130,246,0.05)",
        icon: "ℹ",
    },
    warning: {
        bg: "rgba(245,158,11,0.09)",
        border: "rgba(245,158,11,0.25)",
        color: "#FCD34D",
        glow: "rgba(245,158,11,0.05)",
        icon: "⚠",
    },
    error: {
        bg: "rgba(220,38,38,0.09)",
        border: "rgba(220,38,38,0.25)",
        color: "#FCA5A5",
        glow: "rgba(220,38,38,0.05)",
        icon: "✕",
    },
}

// ── global CSS injected once per page ─────────────────────────
export const FORM_CSS = `
  /* ── fonts ─────────────────────────────────────────── */
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Serif+Display&family=JetBrains+Mono:wght@400;600;700&display=swap');

  /* ── reset/body ────────────────────────────────────── */
  .vf-form-root {
    font-family: 'DM Sans', system-ui, sans-serif;
    color: #fff;
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
  }

  /* ── card header accent bar ─────────────────────────── */
  .vf-card-header::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, #059669, #10B981, #34D399, transparent);
    border-radius: 20px 20px 0 0;
  }

  /* ── inputs ─────────────────────────────────────────── */
  .vf-input, .vf-select, .vf-textarea {
    width: 100%;
    background: rgba(255,255,255,0.05);
    border: 1.5px solid rgba(255,255,255,0.10);
    border-radius: 10px;
    color: #fff;
    font-size: 14px;
    padding: 12px 14px;
    outline: none;
    font-family: 'DM Sans', system-ui, sans-serif;
    transition: border-color 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
    box-sizing: border-box;
    -webkit-appearance: none;
    appearance: none;
  }
  .vf-input::placeholder, .vf-textarea::placeholder {
    color: rgba(255,255,255,0.22);
  }
  .vf-input:hover, .vf-select:hover, .vf-textarea:hover {
    border-color: rgba(16,185,129,0.30);
    background: rgba(255,255,255,0.07);
  }
  .vf-input:focus, .vf-select:focus, .vf-textarea:focus {
    border-color: rgba(16,185,129,0.60);
    background: rgba(16,185,129,0.06);
    box-shadow: 0 0 0 3px rgba(16,185,129,0.12);
  }
  .vf-input:disabled, .vf-select:disabled, .vf-textarea:disabled {
    opacity: 0.38;
    cursor: not-allowed;
  }
  .vf-select option {
    background: #0D1B2A;
    color: #fff;
  }

  /* ── range slider ───────────────────────────────────── */
  .vf-range {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #10B981, #059669);
    border-radius: 100px;
    outline: none;
    cursor: pointer;
    margin: 12px 0;
  }
  .vf-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px; height: 20px;
    border-radius: 50%;
    background: linear-gradient(135deg, #10B981, #059669);
    box-shadow: 0 2px 8px rgba(16,185,129,0.45), 0 0 0 3px rgba(16,185,129,0.15);
    cursor: pointer;
    transition: box-shadow 0.18s;
  }
  .vf-range::-webkit-slider-thumb:hover {
    box-shadow: 0 2px 12px rgba(16,185,129,0.65), 0 0 0 5px rgba(16,185,129,0.20);
  }
  .vf-range::-moz-range-thumb {
    width: 20px; height: 20px;
    border-radius: 50%;
    background: linear-gradient(135deg, #10B981, #059669);
    box-shadow: 0 2px 8px rgba(16,185,129,0.45);
    cursor: pointer; border: none;
  }

  /* ── radio / checkbox ───────────────────────────────── */
  .vf-radio-group {
    display: flex; gap: 12px; flex-wrap: wrap;
  }
  .vf-radio-label {
    display: flex; align-items: center; gap: 8px;
    padding: 10px 16px;
    border-radius: 10px;
    border: 1.5px solid rgba(255,255,255,0.10);
    background: rgba(255,255,255,0.04);
    cursor: pointer; font-size: 14px; font-weight: 500;
    color: rgba(255,255,255,0.75);
    transition: all 0.18s;
    user-select: none;
  }
  .vf-radio-label:hover {
    border-color: rgba(16,185,129,0.35);
    background: rgba(16,185,129,0.07);
    color: #fff;
  }
  .vf-radio-label.active {
    border-color: rgba(16,185,129,0.55);
    background: rgba(16,185,129,0.10);
    color: #34D399;
    box-shadow: 0 0 0 3px rgba(16,185,129,0.10);
  }
  .vf-radio-dot {
    width: 16px; height: 16px;
    border-radius: 50%;
    border: 1.5px solid rgba(16,185,129,0.45);
    display: flex; align-items: center; justify-content: center;
    transition: all 0.18s;
    flex-shrink: 0;
  }
  .vf-radio-dot.filled {
    background: #10B981;
    border-color: #10B981;
    box-shadow: 0 0 0 3px rgba(16,185,129,0.20);
  }
  .vf-radio-dot.filled::after {
    content: '';
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #fff;
  }

  /* ── buttons ─────────────────────────────────────────── */
  .vf-btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 7px;
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 14px; font-weight: 700; letter-spacing: 0.01em;
    border: none; border-radius: 12px;
    padding: 12px 24px;
    cursor: pointer; text-decoration: none;
    transition: all 0.22s cubic-bezier(.22,1,.36,1);
    position: relative; overflow: hidden;
    white-space: nowrap;
  }
  .vf-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(255,255,255,0.08) 0%, transparent 60%);
    pointer-events: none;
  }
  .vf-btn-primary {
    background: linear-gradient(135deg, #059669 0%, #10B981 55%, #059669 100%);
    background-size: 200% auto;
    color: #fff;
    box-shadow: 0 4px 20px rgba(16,185,129,0.30), inset 0 1px 0 rgba(255,255,255,0.12);
  }
  .vf-btn-primary:hover:not(:disabled) {
    background-position: right center;
    box-shadow: 0 6px 28px rgba(16,185,129,0.45), inset 0 1px 0 rgba(255,255,255,0.12);
    transform: translateY(-1px);
  }
  .vf-btn-outline {
    background: transparent;
    color: #10B981;
    border: 1.5px solid rgba(16,185,129,0.38) !important;
  }
  .vf-btn-outline:hover:not(:disabled) {
    background: rgba(16,185,129,0.10);
    border-color: rgba(16,185,129,0.60) !important;
    transform: translateY(-1px);
  }
  .vf-btn-danger {
    background: linear-gradient(135deg, #DC2626 0%, #EF4444 55%, #DC2626 100%);
    background-size: 200% auto;
    color: #fff;
    box-shadow: 0 4px 20px rgba(220,38,38,0.28), inset 0 1px 0 rgba(255,255,255,0.10);
  }
  .vf-btn-danger:hover:not(:disabled) {
    box-shadow: 0 6px 28px rgba(220,38,38,0.42);
    transform: translateY(-1px);
  }
  .vf-btn-info {
    background: linear-gradient(135deg, #1D4ED8 0%, #3B82F6 55%, #1D4ED8 100%);
    background-size: 200% auto;
    color: #fff;
    box-shadow: 0 4px 20px rgba(59,130,246,0.28), inset 0 1px 0 rgba(255,255,255,0.10);
  }
  .vf-btn-info:hover:not(:disabled) {
    box-shadow: 0 6px 28px rgba(59,130,246,0.42);
    transform: translateY(-1px);
  }
  .vf-btn:disabled {
    opacity: 0.38;
    cursor: not-allowed;
    transform: none !important;
  }
  .vf-btn:active:not(:disabled) {
    transform: translateY(0) scale(0.98);
  }

  /* ── alerts ──────────────────────────────────────────── */
  .vf-alert {
    display: flex; align-items: flex-start; gap: 10px;
    padding: 14px 16px;
    border-radius: 12px;
    font-size: 13.5px; line-height: 1.55;
    margin-bottom: 12px;
    font-family: 'DM Sans', system-ui, sans-serif;
    animation: vfFadeIn 0.3s ease;
  }
  .vf-alert-icon {
    font-size: 15px; line-height: 1.4; flex-shrink: 0;
    width: 22px; height: 22px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 11px; font-weight: 900;
  }

  /* ── card layout ─────────────────────────────────────── */
  .vf-card {
    background: linear-gradient(160deg, rgba(16,185,129,0.06) 0%, rgba(10,15,30,0.95) 40%, rgba(10,15,30,0.98) 100%);
    border: 1px solid rgba(16,185,129,0.15);
    border-radius: 20px;
    box-shadow: 0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(16,185,129,0.08);
    overflow: hidden;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    animation: vfSlideUp 0.4s cubic-bezier(.22,1,.36,1);
  }
  .vf-card-header {
    padding: 22px 24px 20px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    position: relative;
    background: linear-gradient(180deg, rgba(16,185,129,0.06) 0%, transparent 100%);
  }
  .vf-card-header::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, #059669, #10B981, #34D399, transparent);
  }
  .vf-card-title {
    font-family: 'DM Serif Display', serif;
    font-size: 20px;
    font-weight: 400;
    color: #fff;
    margin: 0;
    letter-spacing: -0.01em;
  }
  .vf-card-subtitle {
    font-size: 12px;
    color: rgba(255,255,255,0.40);
    margin: 4px 0 0;
    letter-spacing: 0.01em;
  }
  .vf-card-body {
    padding: 24px;
  }

  /* ── field group ─────────────────────────────────────── */
  .vf-field {
    margin-bottom: 20px;
    animation: vfFadeIn 0.3s ease;
  }
  .vf-label {
    display: block;
    font-size: 11px; font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.45);
    margin-bottom: 7px;
    font-family: 'DM Sans', system-ui, sans-serif;
  }
  .vf-sublabel {
    font-size: 11px;
    color: rgba(255,255,255,0.28);
    margin-bottom: 7px;
    display: block;
    font-style: italic;
  }
  .vf-input-prefix {
    display: flex; align-items: center;
    background: rgba(16,185,129,0.10);
    border: 1.5px solid rgba(16,185,129,0.22);
    border-right: none;
    border-radius: 10px 0 0 10px;
    padding: 0 14px;
    font-size: 13px; font-weight: 600;
    color: #34D399;
    font-family: 'JetBrains Mono', monospace;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .vf-input-suffix {
    display: flex; align-items: center;
    background: rgba(16,185,129,0.10);
    border: 1.5px solid rgba(16,185,129,0.22);
    border-left: none;
    border-radius: 0 10px 10px 0;
    padding: 0 14px;
    font-size: 13px; font-weight: 600;
    color: #34D399;
    font-family: 'JetBrains Mono', monospace;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .vf-input-group {
    display: flex;
    align-items: stretch;
  }
  .vf-input-group .vf-input {
    border-radius: 0;
    flex: 1;
    border-left: none;
    border-right: none;
  }
  .vf-input-group .vf-input:only-child {
    border-radius: 10px;
    border: 1.5px solid rgba(255,255,255,0.10);
  }

  /* ── section title ───────────────────────────────────── */
  .vf-section-title {
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 18px;
    margin-top: 6px;
  }
  .vf-section-title-bar {
    width: 3px; height: 18px;
    border-radius: 2px;
    background: linear-gradient(180deg, #059669, #34D399);
    flex-shrink: 0;
  }
  .vf-section-title h5, .vf-section-title h4, .vf-section-title h6 {
    font-family: 'DM Sans', system-ui, sans-serif;
    font-size: 13px; font-weight: 700;
    letter-spacing: 0.06em; text-transform: uppercase;
    color: rgba(255,255,255,0.55);
    margin: 0;
  }

  /* ── divider ─────────────────────────────────────────── */
  .vf-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(16,185,129,0.25), transparent);
    margin: 24px 0;
    border: none;
  }

  /* ── summary box ─────────────────────────────────────── */
  .vf-summary {
    background: linear-gradient(135deg, rgba(16,185,129,0.08), rgba(5,150,105,0.04));
    border: 1px solid rgba(16,185,129,0.22);
    border-radius: 14px;
    padding: 18px;
    margin-bottom: 16px;
  }
  .vf-summary-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 7px 0;
    border-bottom: 1px solid rgba(255,255,255,0.04);
  }
  .vf-summary-row:last-child { border-bottom: none; }
  .vf-summary-label {
    font-size: 12px; color: rgba(255,255,255,0.45); font-weight: 500;
  }
  .vf-summary-value {
    font-family: 'JetBrains Mono', monospace;
    font-size: 13.5px; font-weight: 700; color: #34D399;
  }

  /* ── button row ──────────────────────────────────────── */
  .vf-btn-row {
    display: flex;
    gap: 10px;
    margin-top: 24px;
    flex-wrap: wrap;
  }
  .vf-btn-row .vf-btn {
    flex: 1;
    min-width: 120px;
  }

  /* ── page wrapper ────────────────────────────────────── */
  .vf-page {
    background: #0A0F1E;
    min-height: 100vh;
    padding: 16px;
    position: relative;
  }
  .vf-page::before {
    content: '';
    position: fixed; inset: 0;
    background:
      radial-gradient(ellipse 90% 50% at 50% -5%, rgba(16,185,129,0.13) 0%, transparent 65%),
      radial-gradient(ellipse 60% 40% at 85% 85%, rgba(5,150,105,0.08) 0%, transparent 60%);
    pointer-events: none; z-index: 0;
  }
  .vf-page-inner {
    position: relative; z-index: 1;
    max-width: 640px; margin: 0 auto;
  }

  /* ── animations ──────────────────────────────────────── */
  @keyframes vfSlideUp {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes vfFadeIn {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes vfShimmer {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(200%); }
  }
  @keyframes vfPulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.55; }
  }
  @keyframes vfGlow {
    0%, 100% { box-shadow: 0 0 18px rgba(16,185,129,0.25); }
    50%       { box-shadow: 0 0 28px rgba(16,185,129,0.45); }
  }

  /* ── responsive ──────────────────────────────────────── */
  @media (max-width: 480px) {
    .vf-card-body { padding: 18px 16px; }
    .vf-card-header { padding: 18px 16px 16px; }
    .vf-btn-row { gap: 8px; }
    .vf-btn { padding: 11px 16px; font-size: 13px; }
  }

  /* ── light mode overrides ────────────────────────────── */
  @media (prefers-color-scheme: light) {
    .vf-card {
      background: linear-gradient(160deg, rgba(5,150,105,0.05) 0%, #ffffff 40%, #f8fffe 100%);
      border-color: rgba(5,150,105,0.20);
      box-shadow: 0 8px 40px rgba(0,0,0,0.08), inset 0 1px 0 rgba(16,185,129,0.10);
    }
    .vf-card-header {
      background: linear-gradient(180deg, rgba(5,150,105,0.05) 0%, transparent 100%);
    }
    .vf-card-title { color: #0A1628; }
    .vf-card-subtitle { color: rgba(10,22,40,0.50); }
    .vf-label { color: rgba(10,22,40,0.50); }
    .vf-sublabel { color: rgba(10,22,40,0.38); }
    .vf-input, .vf-select, .vf-textarea {
      background: rgba(10,22,40,0.04);
      border-color: rgba(10,22,40,0.14);
      color: #0A1628;
    }
    .vf-input::placeholder, .vf-textarea::placeholder {
      color: rgba(10,22,40,0.30);
    }
    .vf-input:hover, .vf-select:hover, .vf-textarea:hover {
      border-color: rgba(5,150,105,0.35);
      background: rgba(5,150,105,0.04);
    }
    .vf-input:focus, .vf-select:focus, .vf-textarea:focus {
      border-color: rgba(5,150,105,0.60);
      background: rgba(5,150,105,0.05);
      box-shadow: 0 0 0 3px rgba(5,150,105,0.10);
      color: #0A1628;
    }
    .vf-select option { background: #fff; color: #0A1628; }
    .vf-input-prefix, .vf-input-suffix {
      background: rgba(5,150,105,0.07);
      border-color: rgba(5,150,105,0.22);
      color: #059669;
    }
    .vf-radio-label {
      color: rgba(10,22,40,0.70);
      border-color: rgba(10,22,40,0.12);
      background: rgba(10,22,40,0.03);
    }
    .vf-radio-label:hover {
      border-color: rgba(5,150,105,0.35);
      background: rgba(5,150,105,0.05);
      color: #0A1628;
    }
    .vf-radio-label.active { color: #059669; }
    .vf-section-title h5, .vf-section-title h4, .vf-section-title h6 {
      color: rgba(10,22,40,0.50);
    }
    .vf-divider {
      background: linear-gradient(90deg, transparent, rgba(5,150,105,0.20), transparent);
    }
    .vf-summary {
      background: linear-gradient(135deg, rgba(5,150,105,0.06), rgba(5,150,105,0.02));
      border-color: rgba(5,150,105,0.18);
    }
    .vf-summary-label { color: rgba(10,22,40,0.45); }
    .vf-summary-value { color: #059669; }
    .vf-page { background: #f0fdf8; }
    .vf-page::before {
      background:
        radial-gradient(ellipse 90% 50% at 50% -5%, rgba(5,150,105,0.07) 0%, transparent 65%),
        radial-gradient(ellipse 60% 40% at 85% 85%, rgba(5,150,105,0.05) 0%, transparent 60%);
    }
    .vf-btn-outline { color: #059669; border-color: rgba(5,150,105,0.38) !important; }
    .vf-btn-outline:hover:not(:disabled) {
      background: rgba(5,150,105,0.08);
      border-color: rgba(5,150,105,0.55) !important;
    }
    .vf-summary-row { border-bottom-color: rgba(10,22,40,0.06); }
  }
`