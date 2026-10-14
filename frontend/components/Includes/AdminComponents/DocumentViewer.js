// /**
//  * DocumentViewer.jsx
//  * - Single file  → clicking opens in a new tab directly
//  * - Multiple files → clicking opens a modal listing all; each item opens in a new tab
//  */
// import { useState } from 'react'
// import { backEndUrl } from '@/Constants'
// import { G, docBtn } from './detailStyles'

// function FileIco() {
//     return (
//         <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
//             <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
//             <polyline points="14 2 14 8 20 8" />
//         </svg>
//     )
// }

// function VideoIco() {
//     return (
//         <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
//             <polygon points="23 7 16 12 23 17 23 7" />
//             <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
//         </svg>
//     )
// }

// function CloseIco() {
//     return (
//         <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//             <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
//         </svg>
//     )
// }

// function ExternalIco() {
//     return (
//         <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//             <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
//             <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
//         </svg>
//     )
// }

// const getUrl = (file) => {
//     if (!file) return '#'
//     if (file.url?.startsWith('http')) return file.url
//     return backEndUrl + (file.url || '')
// }

// const friendlyName = (file, index) => {
//     return file?.name || `Document ${index + 1}`
// }

// export default function DocumentViewer({ label, files, isVideo = false }) {
//     const [modalOpen, setModalOpen] = useState(false)

//     if (!files || files.length === 0) return null

//     const Icon = isVideo ? VideoIco : FileIco
//     const single = files.length === 1

//     const handleClick = () => {
//         if (single) {
//             window.open(getUrl(files[0]), '_blank', 'noopener,noreferrer')
//         } else {
//             setModalOpen(true)
//         }
//     }

//     return (
//         <>
//             <button onClick={handleClick} style={docBtn}>
//                 <Icon />
//                 {label}
//                 {!single && (
//                     <span style={{ background: 'rgba(16,185,129,0.2)', borderRadius: 100, padding: '1px 7px', fontSize: 10 }}>
//                         {files.length}
//                     </span>
//                 )}
//             </button>

//             {/* Modal — multi-file */}
//             {modalOpen && (
//                 <div
//                     onClick={() => setModalOpen(false)}
//                     style={{
//                         position: 'fixed',
//                         inset: 0,
//                         zIndex: 1000,
//                         background: 'rgba(0,0,0,0.72)',
//                         backdropFilter: 'blur(6px)',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         padding: 20,
//                     }}
//                 >
//                     <div
//                         onClick={(e) => e.stopPropagation()}
//                         style={{
//                             background: '#0D1526',
//                             border: '1px solid rgba(255,255,255,0.1)',
//                             borderRadius: 16,
//                             padding: '20px 18px',
//                             width: '100%',
//                             maxWidth: 420,
//                             maxHeight: '80vh',
//                             overflowY: 'auto',
//                         }}
//                     >
//                         {/* Header */}
//                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
//                             <div>
//                                 <p style={{ margin: 0, fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: G.muted }}>
//                                     {isVideo ? 'Videos' : 'Documents'}
//                                 </p>
//                                 <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#fff' }}>{label}</h3>
//                             </div>
//                             <button
//                                 onClick={() => setModalOpen(false)}
//                                 style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: 6, cursor: 'pointer', color: G.muted, display: 'flex' }}
//                             >
//                                 <CloseIco />
//                             </button>
//                         </div>

//                         {/* File list */}
//                         <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
//                             {files.map((file, i) => (
//                                 <a
//                                     key={file?.id || i}
//                                     href={getUrl(file)}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     style={{
//                                         display: 'flex',
//                                         alignItems: 'center',
//                                         gap: 12,
//                                         padding: '10px 12px',
//                                         borderRadius: 10,
//                                         background: 'rgba(255,255,255,0.04)',
//                                         border: '1px solid rgba(255,255,255,0.08)',
//                                         color: '#fff',
//                                         textDecoration: 'none',
//                                         transition: 'background 0.15s',
//                                     }}
//                                     onMouseEnter={e => e.currentTarget.style.background = 'rgba(16,185,129,0.1)'}
//                                     onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
//                                 >
//                                     <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', flexShrink: 0 }}>
//                                         <Icon />
//                                     </div>
//                                     <div style={{ flex: 1, minWidth: 0 }}>
//                                         <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
//                                             {friendlyName(file, i)}
//                                         </div>
//                                         {file?.ext && (
//                                             <div style={{ fontSize: 10, color: G.muted, textTransform: 'uppercase' }}>{file.ext.replace('.', '')}</div>
//                                         )}
//                                     </div>
//                                     <ExternalIco />
//                                 </a>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     )
// }
/**
 * DocumentViewer.jsx
 * - Single file  → clicking opens in a new tab directly
 * - Multiple files → clicking opens a modal listing all; each item opens in a new tab
 *
 * UX fixes:
 *  - Close button is sticky at the top of the modal at all times (regardless of list length)
 *  - Modal body scrolls smoothly with scroll-behavior: smooth
 *  - Clicking the backdrop also closes
 */
import { useState } from 'react'
import { backEndUrl } from '@/Constants'
import { G, docBtn } from './detailStyles'

function FileIco() {
    return (
        <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <polyline points="14 2 14 8 20 8" />
        </svg>
    )
}

function VideoIco() {
    return (
        <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <polygon points="23 7 16 12 23 17 23 7" />
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
    )
}

function CloseIco() {
    return (
        <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
            <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
        </svg>
    )
}

function ExternalIco() {
    return (
        <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
    )
}

const getUrl = (file) => {
    if (!file) return '#'
    if (typeof file === 'string') return file.startsWith('http') ? file : backEndUrl + file
    if (file.url?.startsWith('http')) return file.url
    return backEndUrl + (file.url || '')
}

const friendlyName = (file, index) => file?.name || `Document ${index + 1}`

export default function DocumentViewer({ label, files, isVideo = false }) {
    const [modalOpen, setModalOpen] = useState(false)

    const arr = Array.isArray(files) ? files.filter(Boolean) : []
    if (arr.length === 0) return null

    const Icon = isVideo ? VideoIco : FileIco
    const single = arr.length === 1

    const handleClick = () => {
        if (single) {
            window.open(getUrl(arr[0]), '_blank', 'noopener,noreferrer')
        } else {
            setModalOpen(true)
        }
    }

    return (
        <>
            <button onClick={handleClick} style={docBtn}>
                <Icon />
                {label}
                {!single && (
                    <span style={{ background: 'rgba(16,185,129,0.2)', borderRadius: 100, padding: '1px 7px', fontSize: 10 }}>
                        {arr.length}
                    </span>
                )}
            </button>

            {/* ── Modal — multi-file ─────────────────────────────────── */}
            {modalOpen && (
                <div
                    onClick={() => setModalOpen(false)}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 1000,
                        background: 'rgba(0,0,0,0.75)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 20,
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: '#0D1526',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: 18,
                            width: '100%',
                            maxWidth: 440,
                            maxHeight: '82vh',
                            /* flex column so header is sticky and list scrolls */
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                        }}
                    >
                        {/* ── Sticky header with close button ── */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '16px 18px',
                            borderBottom: '1px solid rgba(255,255,255,0.08)',
                            flexShrink: 0,           /* never shrinks — always visible */
                            background: '#0D1526',   /* solid so it doesn't bleed when scrolling */
                            position: 'sticky',
                            top: 0,
                            zIndex: 10,
                        }}>
                            <div>
                                <p style={{ margin: 0, fontSize: 9.5, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: G.muted }}>
                                    {isVideo ? 'Videos' : 'Documents'} · {arr.length} file{arr.length !== 1 ? 's' : ''}
                                </p>
                                <h3 style={{ margin: '2px 0 0', fontSize: 15, fontWeight: 700, color: '#fff' }}>{label}</h3>
                            </div>
                            <button
                                onClick={() => setModalOpen(false)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 34,
                                    height: 34,
                                    background: 'rgba(255,255,255,0.07)',
                                    border: '1px solid rgba(255,255,255,0.12)',
                                    borderRadius: 9,
                                    cursor: 'pointer',
                                    color: 'rgba(255,255,255,0.7)',
                                    flexShrink: 0,
                                    transition: 'background 0.15s',
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.15)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
                            >
                                <CloseIco />
                            </button>
                        </div>

                        {/* ── Scrollable file list ── */}
                        <div style={{
                            overflowY: 'auto',
                            scrollBehavior: 'smooth',
                            padding: '12px 16px 18px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 8,
                        }}>
                            {arr.map((file, i) => (
                                <a
                                    key={file?.id || i}
                                    href={getUrl(file)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 12,
                                        padding: '11px 13px',
                                        borderRadius: 11,
                                        background: 'rgba(255,255,255,0.04)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        color: '#fff',
                                        textDecoration: 'none',
                                        transition: 'background 0.15s, border-color 0.15s',
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.background = 'rgba(16,185,129,0.1)'
                                        e.currentTarget.style.borderColor = 'rgba(16,185,129,0.3)'
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                                    }}
                                >
                                    <div style={{
                                        width: 34, height: 34, borderRadius: 9,
                                        background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: '#10B981', flexShrink: 0,
                                    }}>
                                        <Icon />
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {friendlyName(file, i)}
                                        </div>
                                        <div style={{ fontSize: 10, color: G.muted, marginTop: 1 }}>
                                            {file?.ext ? file.ext.replace('.', '').toUpperCase() : (isVideo ? 'Video' : 'Document')} · tap to open
                                        </div>
                                    </div>
                                    <ExternalIco />
                                </a>
                            ))}
                        </div>

                        {/* ── Sticky footer close button ── */}
                        <div style={{
                            padding: '12px 16px',
                            borderTop: '1px solid rgba(255,255,255,0.07)',
                            flexShrink: 0,
                            background: '#0D1526',
                        }}>
                            <button
                                onClick={() => setModalOpen(false)}
                                style={{
                                    width: '100%',
                                    padding: '10px 0',
                                    borderRadius: 10,
                                    background: 'rgba(255,255,255,0.06)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: 'rgba(255,255,255,0.55)',
                                    fontSize: 13,
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    letterSpacing: '0.02em',
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}