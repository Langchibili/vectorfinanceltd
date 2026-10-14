/**
 * CollapsibleSection.jsx
 * A togglable "View more / View less" section used in admin detail pages.
 */
import { useState } from 'react'
import { G, card } from './detailStyles'

function ChevronIco({ open }) {
    return (
        <svg
            width={14} height={14} fill="none" viewBox="0 0 24 24"
            stroke="currentColor" strokeWidth={2.2}
            style={{ transition: 'transform 0.25s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
            <polyline points="6 9 12 15 18 9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export default function CollapsibleSection({ title, icon, defaultOpen = false, children, accentColor }) {
    const [open, setOpen] = useState(defaultOpen)
    const accent = accentColor || '#10B981'

    return (
        <div style={{ ...card, padding: 0, overflow: 'hidden' }}>
            {/* Header — always visible */}
            <button
                onClick={() => setOpen(o => !o)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '14px 16px',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {icon && (
                        <div style={{
                            width: 30, height: 30, borderRadius: 8,
                            background: `${accent}1A`,
                            border: `1px solid ${accent}33`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: accent, flexShrink: 0,
                        }}>
                            {icon}
                        </div>
                    )}
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{title}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 11, color: accent, fontWeight: 600 }}>{open ? 'View less' : 'View more'}</span>
                    <span style={{ color: accent }}><ChevronIco open={open} /></span>
                </div>
            </button>

            {/* Body — toggled */}
            {open && (
                <div style={{
                    padding: '0 16px 16px',
                    borderTop: '1px solid rgba(255,255,255,0.07)',
                    animation: 'vfSlide 0.25s ease',
                }}>
                    {children}
                </div>
            )}
        </div>
    )
}