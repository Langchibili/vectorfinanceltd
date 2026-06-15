// 'use client'

// import { usePage } from '@/Contexts/PageContext'
// import { useUser } from '@/Contexts/UserContext'
// import { getLoansFromClientId, scrolltoTopOFPage, updateUserAccount } from '@/Functions'
// import { useEffect, useState, useRef } from 'react'
// import Link from 'next/link'

// // ── Loan status config — NEVER change these string values ─────────
// const STATUS_CONFIG = {
//   'initiated': { label: 'Initiated', color: '#FBBF24', bg: 'rgba(251,191,36,0.13)' },
//   'pending-collateral-addition': { label: 'Add Collateral', color: '#FBBF24', bg: 'rgba(251,191,36,0.13)' },
//   'pending-collateral-inspection': { label: 'Pending Inspection', color: '#FBBF24', bg: 'rgba(251,191,36,0.13)' },
//   'collateral-inspection': { label: 'Under Inspection', color: '#A78BFA', bg: 'rgba(167,139,250,0.13)' },
//   'request-approval': { label: 'Awaiting Approval', color: '#818CF8', bg: 'rgba(129,140,248,0.13)' },
//   'accepted': { label: 'Accepted', color: '#34D399', bg: 'rgba(52,211,153,0.13)' },
//   'pending-approval': { label: 'Processing', color: '#A78BFA', bg: 'rgba(167,139,250,0.13)' },
//   'approved': { label: 'Approved', color: '#10B981', bg: 'rgba(16,185,129,0.13)' },
//   'rejected': { label: 'Rejected', color: '#F87171', bg: 'rgba(248,113,113,0.13)' },
//   'disbursed': { label: 'Disbursed', color: '#10B981', bg: 'rgba(16,185,129,0.13)' },
//   'completed': { label: 'Completed', color: '#9CA3AF', bg: 'rgba(156,163,175,0.13)' },
//   'defaulted': { label: 'Defaulted', color: '#DC2626', bg: 'rgba(220,38,38,0.18)' },
// }

// // ── Loan type selection modal ──────────────────────────────────────
// function LoanTypeModal({ onClose, onSelect, loading }) {
//   const overlayRef = useRef(null)
//   const handleOverlay = (e) => { if (e.target === overlayRef.current) onClose() }

//   const types = [
//     {
//       key: 'collateral',
//       title: 'Asset-Based Loan',
//       subtitle: 'Secure with vehicle, land, or property',
//       icon: <BuildingIcon />,
//       features: ['Vehicle, land, or house collateral', 'Higher loan amounts', 'Competitive rates', 'Up to 36-month terms'],
//     },
//     {
//       key: 'salary',
//       title: 'Salary Loan',
//       subtitle: 'Based on your monthly income',
//       icon: <WalletIcon />,
//       features: ['No collateral required', '24-hour approval', 'Up to 40% of salary', 'Flexible repayment'],
//     },
//   ]

//   return (
//     <div
//       ref={overlayRef}
//       onClick={handleOverlay}
//       style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(10,15,30,0.72)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'flex-end' }}
//     >
//       <div style={{ width: '100%', maxWidth: 560, margin: '0 auto', background: '#fff', borderRadius: '20px 20px 0 0', padding: '28px 20px 40px', animation: 'slideUpModal 0.35s cubic-bezier(0.22,1,0.36,1)' }}>
//         <div style={{ width: 36, height: 4, borderRadius: 100, background: 'rgba(26,26,46,0.12)', margin: '0 auto 24px' }} />

//         <div style={{ textAlign: 'center', marginBottom: 24 }}>
//           <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, color: '#1A1A2E', fontWeight: 400, margin: '0 0 6px' }}>Choose Loan Type</h2>
//           <p style={{ fontSize: 14, color: '#6B7280', margin: 0 }}>Select the loan that fits your situation</p>
//         </div>

//         <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
//           {types.map(t => (
//             <button
//               key={t.key}
//               onClick={() => onSelect(t.key)}
//               disabled={loading}
//               style={{
//                 display: 'flex', alignItems: 'flex-start', gap: 16, padding: '18px',
//                 background: 'linear-gradient(135deg,rgba(5,150,105,0.06),rgba(16,185,129,0.03))',
//                 border: '1.5px solid rgba(16,185,129,0.2)',
//                 borderRadius: 14, cursor: 'pointer', textAlign: 'left', width: '100%',
//                 transition: 'all 0.2s', opacity: loading ? 0.6 : 1,
//                 fontFamily: "'DM Sans',system-ui,sans-serif",
//               }}
//               onMouseEnter={e => { e.currentTarget.style.borderColor = '#10B981'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(16,185,129,0.2)' }}
//               onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(16,185,129,0.2)'; e.currentTarget.style.boxShadow = 'none' }}
//             >
//               <div style={{ width: 46, height: 46, borderRadius: 12, flexShrink: 0, background: 'linear-gradient(135deg,#059669,#10B981)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(16,185,129,0.35)' }}>
//                 {t.icon}
//               </div>
//               <div style={{ flex: 1 }}>
//                 <p style={{ fontSize: 16, fontWeight: 700, color: '#1A1A2E', margin: '0 0 2px' }}>{t.title}</p>
//                 <p style={{ fontSize: 12, color: '#6B7280', margin: '0 0 10px' }}>{t.subtitle}</p>
//                 <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 12px' }}>
//                   {t.features.map(f => <span key={f} style={{ fontSize: 11, color: '#059669', fontWeight: 600 }}>✓ {f}</span>)}
//                 </div>
//               </div>
//               <ChevronRight />
//             </button>
//           ))}
//         </div>

//         <button onClick={onClose} style={{ width: '100%', padding: '14px', borderRadius: 12, background: 'rgba(26,26,46,0.04)', border: '1px solid rgba(26,26,46,0.08)', color: '#6B7280', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans',system-ui,sans-serif" }}>
//           Cancel
//         </button>
//       </div>
//       <style>{`
//         @keyframes slideUpModal { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
//       `}</style>
//     </div>
//   )
// }

// // ── Main page ─────────────────────────────────────────────────────
// export default function Loans() {
//   const loggedInUser = useUser()
//   const { setPage } = usePage()
//   const currentLoan = loggedInUser.user?.currentLoan || null
//   const [loans, setLoans] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [switchingId, setSwitchingId] = useState(null)
//   const [showModal, setShowModal] = useState(false)
//   const [applying, setApplying] = useState(false)
//   const loggedIn = loggedInUser?.status || false

//   setPage('/loans')
//   scrolltoTopOFPage()

//   useEffect(() => {
//     if (!loggedInUser.user) return
//     const run = async () => {
//       setLoading(true)
//       try {
//         const data = await getLoansFromClientId(loggedInUser.user.id)
//         setLoans(Array.isArray(data) ? data : [])
//       } catch (e) { console.error(e) }
//       finally { setLoading(false) }
//     }
//     run()
//   }, [loggedInUser.user])

//   // Clicking a loan card — set as current loan and go to dashboard
//   const handleSelectLoan = async (loanId) => {
//     if (!loggedInUser.user) return
//     setSwitchingId(loanId)
//     const updateObj = { currentLoan: { connect: [loanId] } }
//     await updateUserAccount(updateObj, loggedInUser.user.id)
//     window.location = '/'
//   }

//   // New loan — disconnect current, redirect (triggers new loan flow on dashboard)
//   const handleNewLoanSelect = async (/* type unused here — loan creation handled server-side */) => {
//     setApplying(true)
//     try {
//       const updateObj = { currentLoan: { disconnect: currentLoan?.id ? [currentLoan.id] : [] } }
//       await updateUserAccount(updateObj, loggedInUser.user.id)
//       window.location = '/'
//     } catch (e) { console.error(e) }
//     finally { setApplying(false); setShowModal(false) }
//   }

//   if (!loggedIn) {
//     if (typeof window !== 'undefined') window.location = '/signin'
//     return null
//   }

//   const activeLoans = loans.filter(l => !['completed', 'rejected', 'defaulted'].includes(l.loanStatus))
//   const completedLoans = loans.filter(l => ['completed', 'rejected', 'defaulted'].includes(l.loanStatus))

//   return (
//     <>
//       <div className="page-content page-enter" style={{ padding: 0, background: '#F7F5F0', minHeight: '100vh' }}>

//         {/* ── Header ──────────────────────────────────────────── */}
//         <div style={{
//           background: 'linear-gradient(160deg, #0A0F1E 0%, #0F1930 55%, #071A10 100%)',
//           padding: '28px 20px 80px', position: 'relative', overflow: 'hidden',
//         }}>
//           <div style={{ position: 'absolute', top: -80, right: -60, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
//           <div style={{ maxWidth: 640, margin: '0 auto', position: 'relative', zIndex: 1 }}>
//             <p style={{ color: 'rgba(16,185,129,0.75)', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 6px' }}>Loan Management</p>
//             <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(24px,5vw,32px)', color: '#fff', fontWeight: 400, margin: '0 0 6px' }}>My Loans</h1>
//             <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: 13, margin: 0 }}>{loans.length} loan{loans.length !== 1 ? 's' : ''} total</p>
//           </div>
//         </div>

//         <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 16px' }}>

//           {/* ── Apply CTA (pulled up over header) ─────────────── */}
//           <div style={{ marginTop: -44, marginBottom: 24 }}>
//             <button
//               onClick={() => setShowModal(true)}
//               disabled={applying}
//               style={{
//                 width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
//                 padding: '17px', borderRadius: 16, border: 'none',
//                 background: 'linear-gradient(135deg,#059669 0%,#10B981 55%,#059669 100%)',
//                 backgroundSize: '200% auto',
//                 color: '#fff', fontSize: 15, fontWeight: 700,
//                 cursor: applying ? 'not-allowed' : 'pointer',
//                 boxShadow: '0 6px 24px rgba(5,150,105,0.40)',
//                 transition: 'background-position 0.4s, box-shadow 0.2s, transform 0.15s',
//                 fontFamily: "'DM Sans',system-ui,sans-serif",
//                 opacity: applying ? 0.75 : 1,
//               }}
//               onMouseEnter={e => { if (!applying) { e.currentTarget.style.backgroundPosition = 'right center'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(5,150,105,0.50)' } }}
//               onMouseLeave={e => { e.currentTarget.style.backgroundPosition = '0'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(5,150,105,0.40)' }}
//             >
//               {applying ? <><Spinner /> Setting up…</> : <><PlusIcon /> Apply for New Loan</>}
//             </button>
//           </div>

//           {/* ── Skeleton loaders ──────────────────────────────── */}
//           {loading && (
//             <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
//               {[1, 2, 3].map(i => (
//                 <div key={i} className="vf-card" style={{ padding: 20, display: 'flex', gap: 14, alignItems: 'center' }}>
//                   <div className="skel-light skel" style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0 }} />
//                   <div style={{ flex: 1 }}>
//                     <div className="skel-light skel" style={{ height: 12, width: '40%', borderRadius: 4, marginBottom: 8 }} />
//                     <div className="skel-light skel" style={{ height: 22, width: '60%', borderRadius: 4, marginBottom: 8 }} />
//                     <div className="skel-light skel" style={{ height: 10, width: '30%', borderRadius: 4 }} />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* ── Active loans ──────────────────────────────────── */}
//           {!loading && activeLoans.length > 0 && (
//             <div style={{ marginBottom: 28 }}>
//               <SectionLabel>Active Loans</SectionLabel>
//               <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
//                 {activeLoans.map((loan, i) => (
//                   <LoanCard
//                     key={loan.id}
//                     loan={loan}
//                     isCurrent={currentLoan?.id === loan.id}
//                     isSwitching={switchingId === loan.id}
//                     onSelect={() => handleSelectLoan(loan.id)}
//                     delay={i * 0.06}
//                   />
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* ── Closed loans ─────────────────────────────────── */}
//           {!loading && completedLoans.length > 0 && (
//             <div style={{ marginBottom: 28 }}>
//               <SectionLabel>Closed Loans</SectionLabel>
//               <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
//                 {completedLoans.map((loan, i) => (
//                   <LoanCard
//                     key={loan.id}
//                     loan={loan}
//                     isCurrent={false}
//                     isSwitching={false}
//                     onSelect={() => { }}
//                     delay={i * 0.05}
//                     muted
//                   />
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* ── Empty state ───────────────────────────────────── */}
//           {!loading && loans.length === 0 && (
//             <div className="vf-card page-enter" style={{ padding: '48px 24px', textAlign: 'center', marginTop: 8 }}>
//               <div style={{ width: 60, height: 60, borderRadius: 18, background: 'rgba(16,185,129,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
//                 <EmptyIcon />
//               </div>
//               <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: '#1A1A2E', fontWeight: 400, margin: '0 0 8px' }}>No Loans Yet</h3>
//               <p style={{ color: '#6B7280', fontSize: 14, lineHeight: 1.6, margin: '0 0 24px' }}>Apply for your first low-interest loan and receive funds within 24 hours.</p>
//               <button
//                 onClick={() => setShowModal(true)}
//                 style={{
//                   display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px',
//                   borderRadius: 12, border: 'none',
//                   background: 'linear-gradient(135deg,#059669 0%,#10B981 55%,#059669 100%)',
//                   color: '#fff', fontSize: 14, fontWeight: 700,
//                   cursor: 'pointer', fontFamily: "'DM Sans',system-ui,sans-serif",
//                   boxShadow: '0 4px 16px rgba(5,150,105,0.35)',
//                 }}
//               >
//                 <PlusIcon /> Apply Now
//               </button>
//             </div>
//           )}

//         </div>
//       </div>

//       {/* ── Loan type modal ───────────────────────────────────── */}
//       {showModal && (
//         <LoanTypeModal
//           onClose={() => setShowModal(false)}
//           onSelect={handleNewLoanSelect}
//           loading={applying}
//         />
//       )}
//     </>
//   )
// }

// // ── Loan card ─────────────────────────────────────────────────────
// function LoanCard({ loan, isCurrent, isSwitching, onSelect, delay, muted }) {
//   const s = loan.loanStatus
//   const cfg = STATUS_CONFIG[s] || { label: s, color: '#9CA3AF', bg: 'rgba(156,163,175,0.13)' }
//   const amt = Number(loan.loanAmount || 0).toLocaleString()

//   const outstanding = Number(loan.outstandingAmount) || 0
//   const repaid = (Number(loan.loanAmount) || 0) - outstanding
//   const pct = loan.loanAmount > 0 ? Math.min(100, Math.round((repaid / loan.loanAmount) * 100)) : 0

//   return (
//     <div
//       className="page-enter"
//       onClick={muted ? undefined : onSelect}
//       style={{
//         background: '#fff',
//         border: isCurrent ? '1.5px solid rgba(16,185,129,0.35)' : '1px solid rgba(26,26,46,0.07)',
//         borderLeft: `3px solid ${cfg.color}`,
//         borderRadius: 14,
//         padding: '18px 18px 16px',
//         cursor: muted ? 'default' : 'pointer',
//         transition: 'transform 0.15s, box-shadow 0.15s',
//         boxShadow: isCurrent ? '0 4px 20px rgba(5,150,105,0.12)' : '0 2px 10px rgba(0,0,0,0.04)',
//         opacity: muted ? 0.7 : 1,
//         animationDelay: `${delay}s`,
//         position: 'relative',
//       }}
//       onMouseEnter={e => { if (!muted && !isCurrent) { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.09)' } }}
//       onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = isCurrent ? '0 4px 20px rgba(5,150,105,0.12)' : '0 2px 10px rgba(0,0,0,0.04)' }}
//     >
//       {/* Current badge */}
//       {isCurrent && (
//         <div style={{ position: 'absolute', top: 14, right: 14, padding: '2px 9px', borderRadius: 100, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', color: '#059669', fontSize: 9, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
//           Active
//         </div>
//       )}

//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
//         <div>
//           <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6B7280', margin: '0 0 4px' }}>Loan #{loan.id}</p>
//           <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 22, fontWeight: 700, color: '#1A1A2E', margin: 0, letterSpacing: '-0.02em' }}>
//             K{amt}
//           </p>
//         </div>
//         <span style={{ padding: '4px 10px', borderRadius: 100, background: cfg.bg, color: cfg.color, fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', whiteSpace: 'nowrap', marginTop: 4 }}>
//           {cfg.label}
//         </span>
//       </div>

//       {/* Detail row */}
//       <div style={{ display: 'flex', gap: 20, marginBottom: 12 }}>
//         {loan.loanTerm > 0 && (
//           <div>
//             <p style={{ fontSize: 9, color: '#9CA3AF', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 2px' }}>Term</p>
//             <p style={{ fontSize: 13, color: '#1A1A2E', fontWeight: 600, margin: 0 }}>{loan.loanTerm} months</p>
//           </div>
//         )}
//         {outstanding > 0 && (
//           <div>
//             <p style={{ fontSize: 9, color: '#9CA3AF', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 2px' }}>Outstanding</p>
//             <p style={{ fontSize: 13, color: '#F87171', fontWeight: 700, margin: 0, fontFamily: "'JetBrains Mono',monospace" }}>K{Number(outstanding).toLocaleString()}</p>
//           </div>
//         )}
//         {loan.disbursementDate && (
//           <div>
//             <p style={{ fontSize: 9, color: '#9CA3AF', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 2px' }}>Disbursed</p>
//             <p style={{ fontSize: 13, color: '#1A1A2E', fontWeight: 600, margin: 0 }}>{new Date(loan.disbursementDate).toLocaleDateString('en-ZM', { day: 'numeric', month: 'short', year: '2-digit' })}</p>
//           </div>
//         )}
//       </div>

//       {/* Progress bar — only when loan has been disbursed/active */}
//       {['disbursed', 'approved', 'accepted'].includes(s) && loan.loanAmount > 0 && (
//         <div style={{ marginBottom: 12 }}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
//             <span style={{ fontSize: 10, color: '#9CA3AF' }}>Repaid</span>
//             <span style={{ fontSize: 10, color: '#059669', fontWeight: 700 }}>{pct}%</span>
//           </div>
//           <div style={{ height: 5, background: 'rgba(26,26,46,0.06)', borderRadius: 100, overflow: 'hidden' }}>
//             <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg,#059669,#10B981)', borderRadius: 100 }} />
//           </div>
//         </div>
//       )}

//       {/* Footer — set as active prompt */}
//       {!muted && !isCurrent && (
//         <div style={{ paddingTop: 12, borderTop: '1px solid rgba(26,26,46,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <span style={{ fontSize: 12, color: '#6B7280' }}>Tap to set as active loan</span>
//           <span style={{ fontSize: 12, color: '#059669', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
//             {isSwitching ? 'Switching…' : <><span>Switch</span><ChevronRight /></>}
//           </span>
//         </div>
//       )}
//     </div>
//   )
// }

// function SectionLabel({ children }) {
//   return <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6B7280', margin: '0 0 12px' }}>{children}</p>
// }

// // ── Icons ─────────────────────────────────────────────────────────
// function PlusIcon() { return <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg> }
// function EmptyIcon() { return <svg width={28} height={28} fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth={1.5}><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg> }
// function Spinner() { return <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ animation: 'spin 0.8s linear infinite', flexShrink: 0 }}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg> }
// function ChevronRight() { return <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><polyline points="9 18 15 12 9 6" /></svg> }
// function BuildingIcon() { return <svg width={22} height={22} fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={1.7}><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" /></svg> }
// function WalletIcon() { return <svg width={22} height={22} fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={1.7}><path d="M20 12V8a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2v-4" /><circle cx="18" cy="12" r="2" /></svg> }
'use client'

import { usePage } from '@/Contexts/PageContext'
import { useUser } from '@/Contexts/UserContext'
import { getLoansFromClientId, scrolltoTopOFPage, updateUserAccount } from '@/Functions'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'

// ── Loan status config — NEVER change these string values ─────────
const STATUS_CONFIG = {
  'initiated': { label: 'Initiated', color: '#FBBF24', bg: 'rgba(251,191,36,0.13)' },
  'pending-collateral-addition': { label: 'Add Collateral', color: '#FBBF24', bg: 'rgba(251,191,36,0.13)' },
  'pending-collateral-inspection': { label: 'Pending Inspection', color: '#FBBF24', bg: 'rgba(251,191,36,0.13)' },
  'collateral-inspection': { label: 'Under Inspection', color: '#A78BFA', bg: 'rgba(167,139,250,0.13)' },
  'request-approval': { label: 'Awaiting Approval', color: '#818CF8', bg: 'rgba(129,140,248,0.13)' },
  'accepted': { label: 'Accepted', color: '#34D399', bg: 'rgba(52,211,153,0.13)' },
  'pending-approval': { label: 'Processing', color: '#A78BFA', bg: 'rgba(167,139,250,0.13)' },
  'approved': { label: 'Approved', color: '#10B981', bg: 'rgba(16,185,129,0.13)' },
  'rejected': { label: 'Rejected', color: '#F87171', bg: 'rgba(248,113,113,0.13)' },
  'disbursed': { label: 'Disbursed', color: '#10B981', bg: 'rgba(16,185,129,0.13)' },
  'completed': { label: 'Completed', color: '#9CA3AF', bg: 'rgba(156,163,175,0.13)' },
  'defaulted': { label: 'Defaulted', color: '#DC2626', bg: 'rgba(220,38,38,0.18)' },
}

// ── Loan type selection modal ──────────────────────────────────────
function LoanTypeModal({ onClose, onSelect, loading }) {
  const overlayRef = useRef(null)
  const handleOverlay = (e) => { if (e.target === overlayRef.current) onClose() }

  const types = [
    {
      key: 'collateral',
      title: 'Asset-Based Loan',
      subtitle: 'Secure with vehicle, land, or property',
      icon: <BuildingIcon />,
      features: ['Vehicle, land, or house collateral', 'Higher loan amounts', 'Competitive rates', 'Up to 36-month terms'],
    },
    {
      key: 'salary',
      title: 'Salary Loan',
      subtitle: 'Based on your monthly income',
      icon: <WalletIcon />,
      features: ['No collateral required', '24-hour approval', 'Up to 40% of salary', 'Flexible repayment'],
    },
  ]

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlay}
      style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(10,15,30,0.72)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'flex-end' }}
    >
      <div style={{ width: '100%', maxWidth: 560, margin: '0 auto', background: '#fff', borderRadius: '20px 20px 0 0', padding: '28px 20px 40px', animation: 'slideUpModal 0.35s cubic-bezier(0.22,1,0.36,1)' }}>
        <div style={{ width: 36, height: 4, borderRadius: 100, background: 'rgba(26,26,46,0.12)', margin: '0 auto 24px' }} />

        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, color: '#1A1A2E', fontWeight: 400, margin: '0 0 6px' }}>Choose Loan Type</h2>
          <p style={{ fontSize: 14, color: '#6B7280', margin: 0 }}>Select the loan that fits your situation</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
          {types.map(t => (
            <button
              key={t.key}
              onClick={() => onSelect(t.key)}
              disabled={loading}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 16, padding: '18px',
                background: 'linear-gradient(135deg,rgba(5,150,105,0.06),rgba(16,185,129,0.03))',
                border: '1.5px solid rgba(16,185,129,0.2)',
                borderRadius: 14, cursor: 'pointer', textAlign: 'left', width: '100%',
                transition: 'all 0.2s', opacity: loading ? 0.6 : 1,
                fontFamily: "'DM Sans',system-ui,sans-serif",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#10B981'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(16,185,129,0.2)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(16,185,129,0.2)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div style={{ width: 46, height: 46, borderRadius: 12, flexShrink: 0, background: 'linear-gradient(135deg,#059669,#10B981)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(16,185,129,0.35)' }}>
                {t.icon}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 16, fontWeight: 700, color: '#1A1A2E', margin: '0 0 2px' }}>{t.title}</p>
                <p style={{ fontSize: 12, color: '#6B7280', margin: '0 0 10px' }}>{t.subtitle}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 12px' }}>
                  {t.features.map(f => <span key={f} style={{ fontSize: 11, color: '#059669', fontWeight: 600 }}>✓ {f}</span>)}
                </div>
              </div>
              <ChevronRight />
            </button>
          ))}
        </div>

        <button onClick={onClose} style={{ width: '100%', padding: '14px', borderRadius: 12, background: 'rgba(26,26,46,0.04)', border: '1px solid rgba(26,26,46,0.08)', color: '#6B7280', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans',system-ui,sans-serif" }}>
          Cancel
        </button>
      </div>
      <style>{`
        @keyframes slideUpModal { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────
export default function Loans() {
  const loggedInUser = useUser()
  const { setPage } = usePage()
  const router = useRouter()
  const currentLoan = loggedInUser.user?.currentLoan || null
  const [loans, setLoans] = useState([])
  const [loading, setLoading] = useState(true)
  const [switchingId, setSwitchingId] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [applying, setApplying] = useState(false)
  const loggedIn = loggedInUser?.status || false

  setPage('/loans')
  scrolltoTopOFPage()

  // ── Fetch all loans for this client ───────────────────────────
  useEffect(() => {
    if (!loggedInUser.user) return
    const run = async () => {
      setLoading(true)
      try {
        const data = await getLoansFromClientId(loggedInUser.user.id)
        console.log('loans', loggedInUser.user.id)
        setLoans(Array.isArray(data) ? data : [])
      } catch (e) { console.error(e) }
      finally { setLoading(false) }
    }
    run()
  }, [loggedInUser.user])

  // ── Select a loan — connect it as currentLoan, go to dashboard ─
  const handleSelectLoan = async (loanId) => {
    if (!loggedInUser.user) return
    setSwitchingId(loanId)
    const updateObj = { currentLoan: { connect: [loanId] } }
    const updatedUserAccount = await updateUserAccount(updateObj, loggedInUser.user.id)
    if (!updatedUserAccount.hasOwnProperty('error')) {
      window.location = '/'
    }
    setSwitchingId(null)
  }

  // ── New loan — disconnect current, redirect to dashboard ───────
  const handleNewLoanSelect = async (/* type unused here — loan creation handled server-side */) => {
    if (!loggedInUser.user) return
    setApplying(true)
    try {
      const updateObj = { currentLoan: { disconnect: currentLoan?.id ? [currentLoan.id] : [] } }
      const updatedUserAccount = await updateUserAccount(updateObj, loggedInUser.user.id)
      if (!updatedUserAccount.hasOwnProperty('error')) {
        window.location = '/'
      }
    } catch (e) { console.error(e) }
    finally { setApplying(false); setShowModal(false) }
  }

  // ── Auth guard ─────────────────────────────────────────────────
  if (!loggedIn) {
    if (typeof window !== 'undefined') window.location = '/signin'
    return null
  }

  const activeLoans = loans.filter(l => !['completed', 'rejected', 'defaulted'].includes(l.loanStatus))
  const completedLoans = loans.filter(l => ['completed', 'rejected', 'defaulted'].includes(l.loanStatus))

  return (
    <>
      <div className="page-content page-enter" style={{ padding: 0, background: '#F7F5F0', minHeight: '100vh' }}>

        {/* ── Header ──────────────────────────────────────────── */}
        <div style={{
          background: 'linear-gradient(160deg, #0A0F1E 0%, #0F1930 55%, #071A10 100%)',
          padding: '28px 20px 80px', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: -80, right: -60, width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ maxWidth: 640, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <p style={{ color: 'rgba(16,185,129,0.75)', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 6px' }}>Loan Management</p>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(24px,5vw,32px)', color: '#fff', fontWeight: 400, margin: '0 0 6px' }}>My Loans</h1>
            <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: 13, margin: 0 }}>{loans.length} loan{loans.length !== 1 ? 's' : ''} total</p>
          </div>
        </div>

        <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 16px' }}>

          {/* ── Apply CTA (pulled up over header) ─────────────── */}
          <div style={{ marginTop: -44, marginBottom: 24 }}>
            <button
              onClick={() => setShowModal(true)}
              disabled={applying}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                padding: '17px', borderRadius: 16, border: 'none',
                background: 'linear-gradient(135deg,#059669 0%,#10B981 55%,#059669 100%)',
                backgroundSize: '200% auto',
                color: '#fff', fontSize: 15, fontWeight: 700,
                cursor: applying ? 'not-allowed' : 'pointer',
                boxShadow: '0 6px 24px rgba(5,150,105,0.40)',
                transition: 'background-position 0.4s, box-shadow 0.2s, transform 0.15s',
                fontFamily: "'DM Sans',system-ui,sans-serif",
                opacity: applying ? 0.75 : 1,
              }}
              onMouseEnter={e => { if (!applying) { e.currentTarget.style.backgroundPosition = 'right center'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(5,150,105,0.50)' } }}
              onMouseLeave={e => { e.currentTarget.style.backgroundPosition = '0'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(5,150,105,0.40)' }}
            >
              {applying ? <><Spinner /> Setting up…</> : <><PlusIcon /> Apply for New Loan</>}
            </button>
          </div>

          {/* ── Skeleton loaders ──────────────────────────────── */}
          {loading && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[1, 2, 3].map(i => (
                <div key={i} className="vf-card" style={{ padding: 20, display: 'flex', gap: 14, alignItems: 'center' }}>
                  <div className="skel-light skel" style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div className="skel-light skel" style={{ height: 12, width: '40%', borderRadius: 4, marginBottom: 8 }} />
                    <div className="skel-light skel" style={{ height: 22, width: '60%', borderRadius: 4, marginBottom: 8 }} />
                    <div className="skel-light skel" style={{ height: 10, width: '30%', borderRadius: 4 }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Active loans ──────────────────────────────────── */}
          {!loading && activeLoans.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <SectionLabel>Active Loans</SectionLabel>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {activeLoans.map((loan, i) => (
                  <LoanCard
                    key={loan.id}
                    loan={loan}
                    isCurrent={currentLoan?.id === loan.id}
                    isSwitching={switchingId === loan.id}
                    onSelect={() => handleSelectLoan(loan.id)}
                    delay={i * 0.06}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ── Closed loans ─────────────────────────────────── */}
          {!loading && completedLoans.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <SectionLabel>Closed Loans</SectionLabel>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {completedLoans.map((loan, i) => (
                  <LoanCard
                    key={loan.id}
                    loan={loan}
                    isCurrent={false}
                    isSwitching={false}
                    onSelect={() => { }}
                    delay={i * 0.05}
                    muted
                  />
                ))}
              </div>
            </div>
          )}

          {/* ── Empty state ───────────────────────────────────── */}
          {!loading && loans.length === 0 && (
            <div className="vf-card page-enter" style={{ padding: '48px 24px', textAlign: 'center', marginTop: 8 }}>
              <div style={{ width: 60, height: 60, borderRadius: 18, background: 'rgba(16,185,129,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <EmptyIcon />
              </div>
              <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: '#1A1A2E', fontWeight: 400, margin: '0 0 8px' }}>No Loans Yet</h3>
              <p style={{ color: '#6B7280', fontSize: 14, lineHeight: 1.6, margin: '0 0 24px' }}>Apply for your first low-interest loan and receive funds within 24 hours.</p>
              <button
                onClick={() => setShowModal(true)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px',
                  borderRadius: 12, border: 'none',
                  background: 'linear-gradient(135deg,#059669 0%,#10B981 55%,#059669 100%)',
                  color: '#fff', fontSize: 14, fontWeight: 700,
                  cursor: 'pointer', fontFamily: "'DM Sans',system-ui,sans-serif",
                  boxShadow: '0 4px 16px rgba(5,150,105,0.35)',
                }}
              >
                <PlusIcon /> Apply Now
              </button>
            </div>
          )}

        </div>
      </div>

      {/* ── Loan type modal ───────────────────────────────────── */}
      {showModal && (
        <LoanTypeModal
          onClose={() => setShowModal(false)}
          onSelect={handleNewLoanSelect}
          loading={applying}
        />
      )}
    </>
  )
}

// ── Loan card ─────────────────────────────────────────────────────
function LoanCard({ loan, isCurrent, isSwitching, onSelect, delay, muted }) {
  const s = loan.loanStatus
  const cfg = STATUS_CONFIG[s] || { label: s, color: '#9CA3AF', bg: 'rgba(156,163,175,0.13)' }
  const amt = Number(loan.loanAmount || 0).toLocaleString()

  const outstanding = Number(loan.outstandingAmount) || 0
  const repaid = (Number(loan.loanAmount) || 0) - outstanding
  const pct = loan.loanAmount > 0 ? Math.min(100, Math.round((repaid / loan.loanAmount) * 100)) : 0

  return (
    <div
      className="page-enter"
      onClick={muted ? undefined : onSelect}
      style={{
        background: '#fff',
        border: isCurrent ? '1.5px solid rgba(16,185,129,0.35)' : '1px solid rgba(26,26,46,0.07)',
        borderLeft: `3px solid ${cfg.color}`,
        borderRadius: 14,
        padding: '18px 18px 16px',
        cursor: muted ? 'default' : 'pointer',
        transition: 'transform 0.15s, box-shadow 0.15s',
        boxShadow: isCurrent ? '0 4px 20px rgba(5,150,105,0.12)' : '0 2px 10px rgba(0,0,0,0.04)',
        opacity: muted ? 0.7 : 1,
        animationDelay: `${delay}s`,
        position: 'relative',
      }}
      onMouseEnter={e => { if (!muted && !isCurrent) { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.09)' } }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = isCurrent ? '0 4px 20px rgba(5,150,105,0.12)' : '0 2px 10px rgba(0,0,0,0.04)' }}
    >
      {/* Current badge */}
      {isCurrent && (
        <div style={{ position: 'absolute', top: 14, right: 14, padding: '2px 9px', borderRadius: 100, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', color: '#059669', fontSize: 9, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Active
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6B7280', margin: '0 0 4px' }}>Loan #{loan.id}</p>
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 22, fontWeight: 700, color: '#1A1A2E', margin: 0, letterSpacing: '-0.02em' }}>
            K{amt}
          </p>
        </div>
        <span style={{ padding: '4px 10px', borderRadius: 100, background: cfg.bg, color: cfg.color, fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', whiteSpace: 'nowrap', marginTop: 4 }}>
          {cfg.label}
        </span>
      </div>

      {/* Detail row */}
      <div style={{ display: 'flex', gap: 20, marginBottom: 12 }}>
        {loan.loanTerm > 0 && (
          <div>
            <p style={{ fontSize: 9, color: '#9CA3AF', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 2px' }}>Term</p>
            <p style={{ fontSize: 13, color: '#1A1A2E', fontWeight: 600, margin: 0 }}>{loan.loanTerm} months</p>
          </div>
        )}
        {outstanding > 0 && (
          <div>
            <p style={{ fontSize: 9, color: '#9CA3AF', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 2px' }}>Outstanding</p>
            <p style={{ fontSize: 13, color: '#F87171', fontWeight: 700, margin: 0, fontFamily: "'JetBrains Mono',monospace" }}>K{Number(outstanding).toLocaleString()}</p>
          </div>
        )}
        {loan.disbursementDate && (
          <div>
            <p style={{ fontSize: 9, color: '#9CA3AF', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 2px' }}>Disbursed</p>
            <p style={{ fontSize: 13, color: '#1A1A2E', fontWeight: 600, margin: 0 }}>{new Date(loan.disbursementDate).toLocaleDateString('en-ZM', { day: 'numeric', month: 'short', year: '2-digit' })}</p>
          </div>
        )}
      </div>

      {/* Progress bar — only when loan has been disbursed/active */}
      {['disbursed', 'approved', 'accepted'].includes(s) && loan.loanAmount > 0 && (
        <div style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
            <span style={{ fontSize: 10, color: '#9CA3AF' }}>Repaid</span>
            <span style={{ fontSize: 10, color: '#059669', fontWeight: 700 }}>{pct}%</span>
          </div>
          <div style={{ height: 5, background: 'rgba(26,26,46,0.06)', borderRadius: 100, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg,#059669,#10B981)', borderRadius: 100 }} />
          </div>
        </div>
      )}

      {/* Footer — set as active prompt */}
      {!muted && !isCurrent && (
        <div style={{ paddingTop: 12, borderTop: '1px solid rgba(26,26,46,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: '#6B7280' }}>Tap to set as active loan</span>
          <span style={{ fontSize: 12, color: '#059669', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
            {isSwitching ? 'Switching…' : <><span>Switch</span><ChevronRight /></>}
          </span>
        </div>
      )}
    </div>
  )
}

function SectionLabel({ children }) {
  return <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6B7280', margin: '0 0 12px' }}>{children}</p>
}

// ── Icons ─────────────────────────────────────────────────────────
function PlusIcon() { return <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg> }
function EmptyIcon() { return <svg width={28} height={28} fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth={1.5}><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg> }
function Spinner() { return <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ animation: 'spin 0.8s linear infinite', flexShrink: 0 }}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg> }
function ChevronRight() { return <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><polyline points="9 18 15 12 9 6" /></svg> }
function BuildingIcon() { return <svg width={22} height={22} fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={1.7}><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" /></svg> }
function WalletIcon() { return <svg width={22} height={22} fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={1.7}><path d="M20 12V8a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2v-4" /><circle cx="18" cy="12" r="2" /></svg> }