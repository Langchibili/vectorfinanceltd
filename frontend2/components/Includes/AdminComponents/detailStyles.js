/* detailStyles.js — shared tokens + helpers for LoanDetails & ClientDetails */

export const G = {
    page: '#0A0F1E',
    green1: '#059669',
    green2: '#10B981',
    green3: '#34D399',
    dim: 'rgba(255,255,255,0.06)',
    border: 'rgba(255,255,255,0.08)',
    muted: 'rgba(255,255,255,0.38)',
    gold: '#C9A84C',
}

export const card = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 16,
    padding: '18px 16px',
    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
    marginBottom: 14,
}

export const sectionLabel = {
    fontSize: 9.5,
    fontWeight: 700,
    letterSpacing: '0.09em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.38)',
    marginBottom: 10,
}

export const row = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '8px 0',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
}

export const labelText = {
    fontSize: 12,
    color: 'rgba(255,255,255,0.42)',
    fontWeight: 500,
}

export const valueText = {
    fontSize: 13,
    color: '#fff',
    fontWeight: 600,
    textAlign: 'right',
    maxWidth: '58%',
    wordBreak: 'break-word',
}

export const pill = (bg, color) => ({
    display: 'inline-block',
    padding: '3px 10px',
    borderRadius: 100,
    background: bg,
    color,
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
})

export const docBtn = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '7px 14px',
    borderRadius: 8,
    background: 'rgba(16,185,129,0.1)',
    border: '1px solid rgba(16,185,129,0.25)',
    color: '#10B981',
    fontSize: 12,
    fontWeight: 600,
    cursor: 'pointer',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
}

export const toggleBtn = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 5,
    background: 'transparent',
    border: 'none',
    color: '#10B981',
    fontSize: 12,
    fontWeight: 700,
    cursor: 'pointer',
    padding: '6px 0',
    letterSpacing: '0.03em',
}