// // //VectorFinanceLTD\frontend2\app\page.js
// // "use client"

// // import ESigningForms from "@/components/ESigningForms/ESigningForms"
// // import CollateralForm from "@/components/Forms/CollateralForm"
// // import FilledForms from "@/components/Forms/FilledForms"
// // import InvestmentForm from "@/components/Forms/InvestmentForm"
// // import LoanApplicationForm from "@/components/Forms/LoanApplicationForm"
// // import FileDownload from "@/components/Includes/FileDownload/FileDownload"
// // import HelpPageDisplay from "@/components/Includes/HelpPageDisplay/HelpPageDisplay"
// // import LoanInformationDisplay from "@/components/Includes/LoanInformationDisplay/LoanInformationDisplay"
// // import LoanInitiatedDisplay from "@/components/Includes/LoanInitiatedDisplay/LoanInitiatedDisplay"
// // import LoanTransactionHistory from "@/components/Includes/LoanTransactionHistory/LoanTransactionHistory"
// // import Uploader from "@/components/Includes/Uploader/Uploader"
// // import ListStyleLoanApplicationDisplay from "@/components/LoanApplicationDisplay/ListStyleLoanApplicationDisplay"
// // import InvestButton from "@/components/Includes/InvestButton/InvestButton"
// // import { backEndUrl } from "@/Constants"
// // import { useBottomNav } from "@/Contexts/BottomNavContext"
// // import { useConstants } from "@/Contexts/ConstantsContext"
// // import { usePage } from "@/Contexts/PageContext"
// // import { useUser } from "@/Contexts/UserContext"
// // import { getLoanFromId, getLoansFromClientId, scrolltoTopOFPage } from "@/Functions"
// // import { useEffect, useState } from "react"
// // import Link from "next/link"

// // /* ─── colour tokens ─────────────────────────────────────────── */
// // const G = {
// //   page: "#0A0F1E",
// //   green1: "#059669",
// //   green2: "#10B981",
// //   green3: "#34D399",
// //   gold: "#C9A84C",
// //   goldL: "#E8C87A",
// //   red: "#F87171",
// //   blue: "#60A5FA",
// //   purple: "#A78BFA",
// //   muted: "rgba(255,255,255,0.38)",
// //   dim: "rgba(255,255,255,0.06)",
// //   border: "rgba(255,255,255,0.08)",
// // }

// // /* ─── shared button styles ──────────────────────────────────── */
// // const btnGreen = {
// //   display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
// //   background: "linear-gradient(135deg,#059669 0%,#10B981 55%,#059669 100%)",
// //   backgroundSize: "200% auto",
// //   color: "#fff", fontWeight: 700, fontSize: 13.5,
// //   border: "none", borderRadius: 10, padding: "11px 22px",
// //   cursor: "pointer", textDecoration: "none",
// //   boxShadow: "0 4px 16px rgba(16,185,129,0.28)",
// //   transition: "all 0.25s",
// //   letterSpacing: "0.01em",
// // }
// // const btnOutline = {
// //   display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
// //   background: "transparent",
// //   color: "#10B981", fontWeight: 700, fontSize: 13.5,
// //   border: "1.5px solid rgba(16,185,129,0.4)", borderRadius: 10, padding: "10px 22px",
// //   cursor: "pointer", textDecoration: "none",
// //   transition: "all 0.25s",
// // }

// // /* ═══════════════════════════════════════════════════════════════
// //    INTRODUCTORY LETTER PROMPT
// //    Shown when the loan is "initiated", is a salary loan, and
// //    requireIntroductoryLetterSalaryLoan is true in loansInformation.
// // ═══════════════════════════════════════════════════════════════ */
// // function IntroductoryLetterPrompt({ shareableLink }) {
// //   const [copied, setCopied] = useState(false)

// //   const handleCopy = () => {
// //     if (typeof navigator !== "undefined") {
// //       navigator.clipboard.writeText(shareableLink).catch(() => { })
// //     }
// //     setCopied(true)
// //     setTimeout(() => setCopied(false), 2500)
// //   }

// //   return (
// //     <div style={{
// //       background: "linear-gradient(135deg, rgba(16,185,129,0.08), rgba(59,130,246,0.05))",
// //       border: "1px solid rgba(16,185,129,0.2)",
// //       borderRadius: 16,
// //       padding: "22px 20px",
// //       marginBottom: 20,
// //       fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)",
// //     }}>
// //       <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
// //         <div style={{
// //           width: 40, height: 40, borderRadius: 11, flexShrink: 0,
// //           background: "rgba(16,185,129,0.12)", border: "1.5px solid rgba(16,185,129,0.28)",
// //           display: "flex", alignItems: "center", justifyContent: "center",
// //         }}>
// //           <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth={2}>
// //             <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
// //             <polyline points="14 2 14 8 20 8" />
// //           </svg>
// //         </div>
// //         <div>
// //           <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700, margin: "0 0 4px", letterSpacing: "-0.2px" }}>
// //             Action Required — Introductory Letter
// //           </h3>
// //           <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, margin: 0, lineHeight: 1.55 }}>
// //             Thank you for applying for a loan with us. To proceed to the next step of your loan application, please share the link below with your{" "}
// //             <strong style={{ color: "rgba(255,255,255,0.75)" }}>HR department</strong> or any authorised person at your place of employment. The person must upload a stamped introductory letter recognising your employment.
// //           </p>
// //         </div>
// //       </div>

// //       <div style={{
// //         background: "rgba(0,0,0,0.35)",
// //         border: "1px solid rgba(255,255,255,0.1)",
// //         borderRadius: 10,
// //         display: "flex",
// //         alignItems: "center",
// //         overflow: "hidden",
// //         marginTop: 6,
// //       }}>
// //         <code style={{
// //           flex: 1,
// //           padding: "11px 14px",
// //           fontSize: 12.5,
// //           color: "#94a3b8",
// //           fontFamily: "var(--font-mono,'JetBrains Mono',monospace)",
// //           whiteSpace: "nowrap",
// //           overflow: "hidden",
// //           textOverflow: "ellipsis",
// //           display: "block",
// //         }}>
// //           {shareableLink}
// //         </code>
// //         <button
// //           onClick={handleCopy}
// //           style={{
// //             flexShrink: 0,
// //             padding: "11px 16px",
// //             background: copied ? "rgba(52,211,153,0.15)" : "rgba(16,185,129,0.12)",
// //             border: "none",
// //             borderLeft: "1px solid rgba(255,255,255,0.1)",
// //             cursor: "pointer",
// //             color: copied ? "#34D399" : "#10B981",
// //             fontSize: 12.5,
// //             fontWeight: 700,
// //             fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)",
// //             transition: "all 0.2s",
// //             whiteSpace: "nowrap",
// //           }}
// //         >
// //           {copied ? "✓ Copied!" : "Copy Link"}
// //         </button>
// //       </div>

// //       <p style={{ color: G.muted, fontSize: 12, lineHeight: 1.55, margin: "10px 0 0" }}>
// //         Once your HR has uploaded the letter, our team will review it and proceed with your application.
// //       </p>
// //     </div>
// //   )
// // }

// // /* ═══════════════════════════════════════════════════════════════
// //    ON-SITE VERIFICATION GATE
// // ═══════════════════════════════════════════════════════════════ */
// // function OnSiteVerificationGate({ address, requirements, allowSigning, onSign }) {
// //   return (
// //     <div className="page-content">
// //       <div className="container-fluid">
// //         <div style={{ position: "relative", marginBottom: 20 }}>
// //           <div style={{
// //             borderRadius: 16, border: "1px solid rgba(255,255,255,0.07)",
// //             background: "rgba(255,255,255,0.03)", padding: "32px 24px",
// //             filter: "blur(3px)", pointerEvents: "none", userSelect: "none",
// //             opacity: 0.35, minHeight: 180, display: "flex", flexDirection: "column", gap: 12,
// //           }}>
// //             {[100, 80, 90, 65, 75].map((w, i) => (
// //               <div key={i} style={{ height: 12, borderRadius: 6, background: "rgba(255,255,255,0.15)", width: `${w}%` }} />
// //             ))}
// //             <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
// //               <div style={{ height: 40, width: 120, borderRadius: 10, background: "rgba(16,185,129,0.3)" }} />
// //               <div style={{ height: 40, width: 120, borderRadius: 10, background: "rgba(255,255,255,0.1)" }} />
// //             </div>
// //           </div>

// //           <div style={{
// //             position: "absolute", inset: 0,
// //             display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
// //             padding: "0 24px", textAlign: "center",
// //           }}>
// //             <div style={{
// //               width: 56, height: 56, borderRadius: 16, marginBottom: 16,
// //               background: "linear-gradient(135deg,rgba(245,158,11,0.2),rgba(245,158,11,0.08))",
// //               border: "1.5px solid rgba(245,158,11,0.35)",
// //               display: "flex", alignItems: "center", justifyContent: "center",
// //             }}>
// //               <svg width={26} height={26} fill="none" viewBox="0 0 24 24" stroke="#FBBF24" strokeWidth={2}>
// //                 <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
// //                 <path d="M7 11V7a5 5 0 0110 0v4" />
// //               </svg>
// //             </div>
// //             <h3 style={{ color: "#fff", fontSize: 17, fontWeight: 700, margin: "0 0 10px", letterSpacing: "-0.2px" }}>
// //               In-Person Verification Required
// //             </h3>
// //             <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 13.5, lineHeight: 1.65, margin: "0 0 8px", maxWidth: 480 }}>
// //               To finalise your application, you must come to our office at:
// //             </p>
// //             <div style={{
// //               background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)",
// //               borderRadius: 10, padding: "10px 18px",
// //               color: "#FCD34D", fontSize: 14, fontWeight: 600,
// //               marginBottom: requirements ? 12 : 20, maxWidth: 520,
// //             }}>
// //               📍 {address || "Our main branch — please contact us for the address."}
// //             </div>
// //             {requirements && (
// //               <div style={{
// //                 background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.22)",
// //                 borderRadius: 10, padding: "10px 18px",
// //                 color: "#93C5FD", fontSize: 13, lineHeight: 1.6, marginBottom: 20, maxWidth: 520,
// //               }}>
// //                 <strong style={{ display: "block", marginBottom: 4 }}>Please bring with you:</strong>
// //                 {requirements}
// //               </div>
// //             )}
// //             {allowSigning ? (
// //               <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
// //                 <div style={{
// //                   background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)",
// //                   borderRadius: 10, padding: "10px 16px",
// //                   color: "#6EE7B7", fontSize: 12.5, textAlign: "center", marginBottom: 6, maxWidth: 420,
// //                 }}>
// //                   ✓ Your officer has verified your visit. You may now proceed to sign your documents.
// //                 </div>
// //                 <button onClick={onSign} style={{ ...btnGreen, fontSize: 14, padding: "12px 28px" }}>
// //                   Proceed to Sign Documents →
// //                 </button>
// //               </div>
// //             ) : (
// //               <div style={{
// //                 background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)",
// //                 borderRadius: 10, padding: "10px 16px", color: G.muted, fontSize: 12.5, maxWidth: 420,
// //               }}>
// //                 Once you have visited us, your loan officer will unlock document signing.
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // /* ═══════════════════════════════════════════════════════════════
// //    LOAN TYPE MODAL
// // ═══════════════════════════════════════════════════════════════ */
// // function LoanTypeModal({ isOpen, onClose, constants, onSelectType }) {
// //   const [closing, setClosing] = useState(false)

// //   const handleClose = () => {
// //     setClosing(true)
// //     setTimeout(() => { setClosing(false); onClose() }, 260)
// //   }

// //   if (!isOpen) return null

// //   const loanTypes = constants?.loanCategoriesIds || []
// //   const defaultTypes = [
// //     { id: "personal", label: "Salary Loan", desc: "Repaid via payroll deduction", icon: <SalaryIco /> },
// //     { id: "asset", label: "Asset-Based Loan", desc: "Secured against vehicle, property, land", icon: <AssetIco /> },
// //   ]
// //   const displayTypes = loanTypes.length > 0
// //     ? loanTypes.map(lt => ({ id: lt.id || lt, label: lt.name || lt, desc: lt.description || "", icon: <LoanIco size={20} /> }))
// //     : defaultTypes

// //   return (
// //     <div
// //       onClick={handleClose}
// //       style={{
// //         position: "fixed", inset: 0, zIndex: 999,
// //         background: "rgba(3,10,6,0.78)",
// //         backdropFilter: "blur(7px)", WebkitBackdropFilter: "blur(7px)",
// //         display: "flex", alignItems: "flex-end", justifyContent: "center",
// //         animation: closing ? "ltm-fadeOut 0.26s ease forwards" : "ltm-fadeIn 0.22s ease",
// //       }}
// //     >
// //       <div
// //         onClick={e => e.stopPropagation()}
// //         style={{
// //           width: "100%", maxWidth: 520,
// //           background: "linear-gradient(180deg,#071A10 0%,#040D07 100%)",
// //           borderTop: "1px solid rgba(16,185,129,0.22)",
// //           borderRadius: "20px 20px 0 0",
// //           padding: "28px 20px 40px",
// //           boxShadow: "0 -16px 60px rgba(0,0,0,0.58), 0 -2px 16px rgba(5,150,105,0.08)",
// //           animation: closing ? "ltm-slideDown 0.26s ease forwards" : "ltm-slideUp 0.32s cubic-bezier(0.22,1,0.36,1)",
// //         }}
// //       >
// //         <div style={{ width: 36, height: 4, borderRadius: 100, background: "rgba(255,255,255,0.1)", margin: "0 auto 24px" }} />
// //         <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
// //           <div style={{ width: 34, height: 34, borderRadius: 10, flexShrink: 0, background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.22)", display: "flex", alignItems: "center", justifyContent: "center" }}>
// //             <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
// //           </div>
// //           <h2 style={{ fontFamily: "var(--font-display,'DM Serif Display',serif)", fontSize: 22, color: "#fff", fontWeight: 400, margin: 0 }}>
// //             New Loan Application
// //           </h2>
// //         </div>
// //         <p style={{ color: G.muted, fontSize: 13, margin: "0 0 22px", paddingLeft: 44 }}>Select the loan type to get started</p>

// //         <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
// //           {displayTypes.map((type, i) => (
// //             <button
// //               key={type.id}
// //               onClick={() => { onSelectType(type); handleClose() }}
// //               style={{
// //                 display: "flex", alignItems: "center", gap: 14,
// //                 padding: "16px 18px",
// //                 background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.13)",
// //                 borderRadius: 14, cursor: "pointer", width: "100%", textAlign: "left",
// //                 fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)",
// //                 transition: "all 0.18s",
// //                 animation: `ltm-slideUp 0.32s cubic-bezier(0.22,1,0.36,1) ${i * 0.06}s both`,
// //               }}
// //               onMouseEnter={e => { e.currentTarget.style.background = "rgba(16,185,129,0.10)"; e.currentTarget.style.borderColor = "rgba(16,185,129,0.28)"; e.currentTarget.style.transform = "translateX(2px)" }}
// //               onMouseLeave={e => { e.currentTarget.style.background = "rgba(16,185,129,0.05)"; e.currentTarget.style.borderColor = "rgba(16,185,129,0.13)"; e.currentTarget.style.transform = "none" }}
// //             >
// //               <div style={{ width: 42, height: 42, borderRadius: 12, flexShrink: 0, background: "linear-gradient(135deg,rgba(5,150,105,0.22),rgba(16,185,129,0.07))", border: "1px solid rgba(16,185,129,0.18)", display: "flex", alignItems: "center", justifyContent: "center", color: G.green2 }}>
// //                 {type.icon}
// //               </div>
// //               <div style={{ flex: 1 }}>
// //                 <p style={{ color: "#fff", fontSize: 15, fontWeight: 600, margin: "0 0 3px" }}>{type.label}</p>
// //                 {type.desc && <p style={{ color: G.muted, fontSize: 12, margin: 0, lineHeight: 1.4 }}>{type.desc}</p>}
// //               </div>
// //               <svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="rgba(16,185,129,0.45)" strokeWidth={2.2}><polyline points="9 18 15 12 9 6" /></svg>
// //             </button>
// //           ))}
// //         </div>

// //         <button
// //           onClick={handleClose}
// //           style={{ width: "100%", marginTop: 16, padding: "13px", background: "transparent", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, color: G.muted, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)", transition: "all 0.18s" }}
// //           onMouseEnter={e => { e.currentTarget.style.color = "rgba(255,255,255,0.55)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)" }}
// //           onMouseLeave={e => { e.currentTarget.style.color = G.muted; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)" }}
// //         >
// //           Cancel
// //         </button>
// //       </div>
// //       <style>{`
// //         @keyframes ltm-fadeIn  { from{opacity:0} to{opacity:1} }
// //         @keyframes ltm-fadeOut { from{opacity:1} to{opacity:0} }
// //         @keyframes ltm-slideUp   { from{transform:translateY(100%)} to{transform:translateY(0)} }
// //         @keyframes ltm-slideDown { from{transform:translateY(0)} to{transform:translateY(100%)} }
// //       `}</style>
// //     </div>
// //   )
// // }

// // /* ═══════════════════════════════════════════════════════════════
// //    DASHBOARD SHELL
// // ═══════════════════════════════════════════════════════════════ */
// // function DashboardShell({ loggedInUser, constants, loans, loansLoading, onApplyClick }) {
// //   const user = loggedInUser.user
// //   const firstName = user?.fullnames?.split(" ")[0] || user?.details?.firstname || "there"
// //   const initials = user?.fullnames
// //     ? user.fullnames.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
// //     : "VF"

// //   const currentLoan = user?.currentLoan || loans[0] || null
// //   const loanStatus = currentLoan?.loanStatus || null
// //   const outstanding = currentLoan?.outstandingAmount || 0
// //   const repayAmt = currentLoan?.repaymentAmount || 0
// //   const paidSoFar = repayAmt > 0 ? Math.max(0, repayAmt - outstanding) : 0
// //   const progress = repayAmt > 0 ? Math.min(100, (paidSoFar / repayAmt) * 100) : 0

// //   return (
// //     <div style={{ minHeight: "100vh", background: G.page, paddingTop: 72, paddingBottom: 88, position: "relative", overflowX: "hidden" }}>
// //       <div style={{ position: "fixed", inset: 0, background: `radial-gradient(ellipse 90% 50% at 50% -5%, rgba(16,185,129,0.13) 0%, transparent 65%), radial-gradient(ellipse 60% 40% at 85% 85%, rgba(5,150,105,0.08) 0%, transparent 60%)`, pointerEvents: "none", zIndex: 0 }} />
// //       <div style={{ position: "fixed", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none", zIndex: 0 }} />

// //       <div style={{ position: "relative", zIndex: 1, maxWidth: 1080, margin: "0 auto", padding: "0 16px" }}>
// //         <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24, animation: "vfSlideUp 0.45s cubic-bezier(.22,1,.36,1)" }}>
// //           <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg,rgba(16,185,129,0.25),rgba(5,150,105,0.1))", border: "1.5px solid rgba(16,185,129,0.35)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
// //             <span style={{ fontFamily: "var(--font-display,'DM Serif Display',serif)", fontSize: 17, color: G.green3, fontWeight: 400 }}>{initials}</span>
// //           </div>
// //           <div style={{ flex: 1, minWidth: 0 }}>
// //             <p style={{ margin: 0, fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: G.muted }}>Welcome back</p>
// //             <h1 style={{ margin: 0, fontFamily: "var(--font-display,'DM Serif Display',serif)", fontSize: "clamp(20px,5vw,28px)", color: "#fff", lineHeight: 1.15 }}>{firstName}</h1>
// //           </div>
// //           <button onClick={onApplyClick} style={{ ...btnGreen, fontSize: 13, padding: "10px 18px" }}>+ Apply</button>
// //         </div>

// //         {loansLoading ? <StatSkeleton /> : (
// //           <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12, marginBottom: 24 }} className="vf-stats-grid">
// //             <StatCard label="Active Loans" value={loans.filter(l => !["completed", "defaulted", "rejected"].includes(l.loanStatus)).length} icon={<LoanIco />} accent={G.green2} />
// //             <StatCard label="Outstanding" value={outstanding > 0 ? `K${fmt(outstanding)}` : "K0.00"} icon={<DebtIco />} accent={outstanding > 0 ? G.red : G.green3} mono />
// //             <StatCard label="Total Borrowed" value={loans.length ? `K${fmt(loans.reduce((s, l) => s + (l.loanAmount || 0), 0))}` : "K0.00"} icon={<WalletIco />} accent={G.blue} mono />
// //             <StatCard label="Completed" value={loans.filter(l => l.loanStatus === "completed").length} icon={<CheckIco />} accent={G.green3} />
// //           </div>
// //         )}

// //         <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }} className="vf-main-grid">
// //           <div>
// //             <SectionLabel>Current Loan</SectionLabel>
// //             {loansLoading
// //               ? <Skel height={240} />
// //               : currentLoan
// //                 ? <ActiveLoanCard loan={currentLoan} progress={progress} paidSoFar={paidSoFar} onApplyClick={onApplyClick} />
// //                 : <EmptyLoan onApplyClick={onApplyClick} />
// //             }
// //           </div>

// //           {loans.length > 0 && (
// //             <div>
// //               <SectionLabel>All Loans</SectionLabel>
// //               <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
// //                 {loans.slice(0, 5).map((loan, i) => <LoanRow key={loan.id} loan={loan} i={i} />)}
// //                 {loans.length > 5 && (
// //                   <Link href="/loans" style={{ textAlign: "center", color: G.green2, fontSize: 13, fontWeight: 600, textDecoration: "none", padding: "10px 0" }}>
// //                     View all {loans.length} loans →
// //                   </Link>
// //                 )}
// //               </div>
// //             </div>
// //           )}

// //           <div>
// //             <SectionLabel>Quick Actions</SectionLabel>
// //             <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10 }} className="vf-actions-grid">
// //               <QuickAction onClick={onApplyClick} icon={<LoanIco size={18} />} label="Apply for Loan" desc="Funds in 24hrs" />
// //               <QuickAction href="/profile" icon={<UserIco size={18} />} label="My Profile" desc="Personal details" />
// //               <QuickAction href="/business-profile" icon={<BriefIco size={18} />} label="Business Profile" desc="Company loans" />
// //               <QuickAction href="/esigning" icon={<SignIco size={18} />} label="Sign Documents" desc="Pending forms" />
// //             </div>
// //           </div>

// //           <div>
// //             <SectionLabel>Profile Status</SectionLabel>
// //             <ProfileStatus user={user} />
// //           </div>

// //           {loanStatus && (
// //             <div>
// //               <SectionLabel>Loan Status</SectionLabel>
// //               <StatusExplainer status={loanStatus} />
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //       <style>{css}</style>
// //     </div>
// //   )
// // }

// // /* ═══════════════════════════════════════════════════════════════
// //    MAIN HOME COMPONENT
// // ═══════════════════════════════════════════════════════════════ */
// // export default function Home() {
// //   const [showLoanApplicationForms, setShowLoanApplicationForms] = useState(false)
// //   const [showInvestMentForms, setshowInvestMentForms] = useState(false)
// //   const [selectedloanCategory, setSelectedloanCategory] = useState(null)
// //   const [currentLoanWithSessionLetterStuff, setCurrentLoanWithSessionLetterStuff] = useState(null)
// //   const [showLoanTypeModal, setShowLoanTypeModal] = useState(false)
// //   const [loans, setLoans] = useState([])
// //   const [loansLoading, setLoansLoading] = useState(true)

// //   // On-site verification state
// //   const [currentLoanType, setCurrentLoanType] = useState(null)
// //   const [loanTypeLoading, setLoanTypeLoading] = useState(false)
// //   const [allowUserToSignLoanDocuments, setAllowUserToSignLoanDocuments] = useState(false)
// //   const [proceedToSigningForms, setProceedToSigningForms] = useState(false)

// //   // Salary component ID — used to build the HR introductory-letter upload link
// //   const [salaryId, setSalaryId] = useState(null)

// //   const { BottomNavLink } = useBottomNav()
// //   const loggedInUser = useUser()
// //   const constants = useConstants()
// //   const { setPage } = usePage()

// //   setPage("/")
// //   scrolltoTopOFPage()

// //   /* ── fetch all loans for dashboard stats ── */
// //   useEffect(() => {
// //     if (!loggedInUser?.user?.id) return
// //     const run = async () => {
// //       setLoansLoading(true)
// //       try {
// //         const all = await getLoansFromClientId(loggedInUser.user.id)
// //         setLoans(Array.isArray(all) ? all : [])
// //       } catch (_) { }
// //       setLoansLoading(false)
// //     }
// //     run()
// //   }, [loggedInUser?.user?.id])

// //   /* ── session letter check ── */
// //   useEffect(() => {
// //     const runSetCurrentLoanWithSessionLetterStuff = async () => {
// //       const currentLoan = await getLoanFromId(
// //         loggedInUser.user.currentLoan.id,
// //         "collateral,collateral.vehicle,collateral.vehicle.sessionLetterTemplate,collateral.vehicle.sessionLetter"
// //       )
// //       const { collateral } = currentLoan
// //       const { vehicle } = collateral || {}
// //       if (collateral && collateral.collateralType === "vehicle") {
// //         if (vehicle && vehicle.insuranceType && (vehicle.insuranceType === "third-party" || vehicle.insuranceType === "comprehensive")) {
// //           if (currentLoan.insuranceRequest && currentLoan.insuranceRequest === "African Gray") {
// //             return
// //           } else {
// //             setCurrentLoanWithSessionLetterStuff(currentLoan)
// //           }
// //         }
// //       }
// //     }
// //     if (loggedInUser?.user?.currentLoan) {
// //       runSetCurrentLoanWithSessionLetterStuff()
// //     }
// //   }, [loggedInUser?.user?.currentLoan])

// //   /* ── fetch loan type + signing permission ──────────────────────────────────
// //      Runs for "accepted", "initiated", and "request-approval" so we always know
// //      whether this is a salary loan early enough to show the introductory-letter
// //      prompt during the initiated stage.
// //   ─────────────────────────────────────────────────────────────────────────── */
// //   useEffect(() => {
// //     const currentLoan = loggedInUser?.user?.currentLoan
// //     const relevantStatuses = ["accepted", "initiated", "request-approval"]
// //     if (!currentLoan || !relevantStatuses.includes(currentLoan.loanStatus)) return

// //     const fetchLoanTypeAndSignPermission = async () => {
// //       setLoanTypeLoading(true)
// //       try {
// //         const loanWithType = await getLoanFromId(currentLoan.id, "loanType")
// //         const typeName = loanWithType?.loanType?.data?.attributes?.typeName || "assetBased"
// //         setCurrentLoanType(typeName)

// //         // Signing permission is only needed once the loan is accepted
// //         if (currentLoan.loanStatus === "accepted") {
// //           const signingAllowed =
// //             (loanWithType?.allowUserToSignLoanDocuments || false) &&
// //             loanWithType?.allowUserToSignLoanDocuments === true
// //           setAllowUserToSignLoanDocuments(signingAllowed)
// //         }

// //         // Capture salary component ID so we can build the HR upload link
// //         if (typeName === "salaryBased") {
// //           const sid = loggedInUser?.user?.salary?.id || null
// //           setSalaryId(sid)
// //         }
// //       } catch (_) {
// //         setCurrentLoanType("assetBased")
// //         setAllowUserToSignLoanDocuments(false)
// //       }
// //       setLoanTypeLoading(false)
// //     }

// //     fetchLoanTypeAndSignPermission()
// //     setProceedToSigningForms(false)
// //   }, [loggedInUser?.user?.currentLoan?.id, loggedInUser?.user?.currentLoan?.loanStatus])

// //   /* ── derived: does this loan require on-site verification? ── */
// //   const loansInformation = constants?.loansInformation || {}
// //   const requireOnSiteForSalary = loansInformation.requireUserToComeOnSiteForSalaryLoanVerification === true
// //   const requireOnSiteForAsset = loansInformation.requireUserToComeOnSiteForAssetLoanVerification === true
// //   const isSalaryLoan = currentLoanType === "salaryBased"
// //   const requireOnSite = isSalaryLoan ? requireOnSiteForSalary : requireOnSiteForAsset

// //   /* ── apply button → open loan type modal ── */
// //   const handleApplyClick = () => setShowLoanTypeModal(true)

// //   const handleLoanTypeSelected = (type) => {
// //     setSelectedloanCategory(type.id || type)
// //     setShowLoanTypeModal(false)
// //     setShowLoanApplicationForms(true)
// //   }

// //   /* ─────────────────────────────────────────────────────────────
// //      showApplyButtons
// //   ───────────────────────────────────────────────────────────── */
// //   const showApplyButtons = () => (
// //     <>
// //       <DashboardShell
// //         loggedInUser={loggedInUser}
// //         constants={constants}
// //         loans={loans}
// //         loansLoading={loansLoading}
// //         onApplyClick={handleApplyClick}
// //       />
// //       <LoanTypeModal
// //         isOpen={showLoanTypeModal}
// //         onClose={() => setShowLoanTypeModal(false)}
// //         constants={constants}
// //         onSelectType={handleLoanTypeSelected}
// //       />
// //     </>
// //   )

// //   /* ─────────────────────────────────────────────────────────────
// //      showSessionLetter
// //   ───────────────────────────────────────────────────────────── */
// //   const showSessionLetter = () => {
// //     const currentLoan = currentLoanWithSessionLetterStuff
// //     const { collateral } = currentLoan
// //     const { vehicle } = collateral

// //     if (vehicle.sessionLetter && vehicle.sessionLetter.data) return null

// //     if (!(vehicle.sessionLetterTemplate && vehicle.sessionLetterTemplate.data)) {
// //       return (
// //         <div style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(245,158,11,0.10)", border: "1px solid rgba(245,158,11,0.25)", color: "#FCD34D", fontSize: 13.5, lineHeight: 1.5, marginTop: 10, display: "flex", gap: 10 }}>
// //           <span style={{ fontSize: 16, flexShrink: 0 }}>⚠</span>
// //           <span>We shall send you a message when the session letter template has been uploaded, along with instructions on what to do next. Thank you.</span>
// //         </div>
// //       )
// //     }
// //     return (
// //       <div style={{ width: "100%", textAlign: "center", marginTop: 10 }}>
// //         <FileDownload files={vehicle.sessionLetterTemplate} backEndUrl={backEndUrl} fileDisplayName="Session Letter Template" />
// //         <div style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "16px 0" }} />
// //         <h3 style={{ color: "#fff", fontSize: 16, fontWeight: 600, margin: "0 0 4px" }}>Upload Session Letter</h3>
// //         <p style={{ color: G.muted, fontSize: 12, margin: "0 0 12px", lineHeight: 1.5 }}>
// //           Stamped and signed by your insurance company — download the template and present it to your insurer first.
// //         </p>
// //         <Uploader
// //           refId={currentLoan.collateral.vehicle.id}
// //           refName="media-and-documents.vehicle"
// //           fieldName="sessionLetter"
// //           allowMultiple={false}
// //           allowedTypes={["image/*", "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]}
// //         />
// //       </div>
// //     )
// //   }

// //   /* ─────────────────────────────────────────────────────────────
// //      renderAcceptedState
// //   ───────────────────────────────────────────────────────────── */
// //   const renderAcceptedState = () => {
// //     const user = loggedInUser.user

// //     if (loanTypeLoading) {
// //       return (
// //         <div className="page-content">
// //           <div className="container-fluid">
// //             <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "24px 0", color: G.muted, fontSize: 14 }}>
// //               <div style={{ width: 18, height: 18, border: `2px solid ${G.green2}`, borderTopColor: "transparent", borderRadius: "50%", animation: "vfSpin 0.7s linear infinite" }} />
// //               Checking loan requirements…
// //             </div>
// //           </div>
// //           <style>{`@keyframes vfSpin { to { transform: rotate(360deg); } }`}</style>
// //         </div>
// //       )
// //     }

// //     if (requireOnSite && !proceedToSigningForms && !allowUserToSignLoanDocuments) {
// //       return (
// //         <OnSiteVerificationGate
// //           address={loansInformation.address}
// //           requirements={loansInformation.userRequirementsToBrinOnSite}
// //           allowSigning={allowUserToSignLoanDocuments}
// //           onSign={() => setProceedToSigningForms(true)}
// //           signingMethod={user.signingMethod}
// //           loggedInUser={user}
// //           constants={constants}
// //         />
// //       )
// //     }

// //     return (
// //       <>
// //         {user.signingMethod && user.signingMethod === "e-signing"
// //           ? <div className="page-content"><div className="container-fluid"><ESigningForms loggedInUser={user} constants={constants} /></div></div>
// //           : <FilledForms loggedInUser={user} constants={constants} />
// //         }
// //       </>
// //     )
// //   }

// //   /* ─────────────────────────────────────────────────────────────
// //      renderMainContent
// //   ───────────────────────────────────────────────────────────── */
// //   const renderMainContent = () => {
// //     const currentInvestment = loggedInUser.user.currentInvestment
// //     if (currentInvestment) {
// //       return <><LoanInitiatedDisplay /></>
// //     } else {
// //       if (showInvestMentForms) {
// //         return (
// //           <div className="page-content">
// //             <div className="container-fluid">
// //               <InvestmentForm
// //                 setshowInvestMentForms={setshowInvestMentForms}
// //                 loanCategory="personal"
// //                 loggedInUser={loggedInUser.user}
// //                 constants={constants}
// //               />
// //             </div>
// //           </div>
// //         )
// //       }

// //       const currentLoan = loggedInUser.user.currentLoan

// //       if (currentLoan) {
// //         /* ── INITIATED / REQUEST-APPROVAL ─────────────────────────────────── */
// //         if (currentLoan.loanStatus === "initiated" || currentLoan.loanStatus === "request-approval") {
// //           // When the setting is on, this is a salary loan, and we have the
// //           // salary ID, show the HR upload prompt above LoanInitiatedDisplay.
// //           const requireIntroLetter = (loansInformation.requireIntroductoryLetterSalaryLoan || false) && loansInformation.requireIntroductoryLetterSalaryLoan === true

// //           if (requireIntroLetter && currentLoanType === "salaryBased" && salaryId) {
// //             const origin = typeof window !== "undefined" ? window.location.origin : ""
// //             const shareableLink = `${origin}/upload-introductory-letter?salaryId=${salaryId}`
// //             return (
// //               <div className="page-content">
// //                 <div className="container-fluid">
// //                   <IntroductoryLetterPrompt shareableLink={shareableLink} />
// //                   <LoanInitiatedDisplay />
// //                 </div>
// //               </div>
// //             )
// //           }

// //           return <LoanInitiatedDisplay />
// //         }

// //         else if (currentLoan.loanStatus === "pending-collateral-addition") {
// //           return <CollateralForm loggedInUser={loggedInUser.user} constants={constants} />
// //         }

// //         else if (currentLoan.loanStatus === "pending-collateral-inspection" || currentLoan.loanStatus === "collateral-inspection") {
// //           return (
// //             <div className="page-content">
// //               <div className="container-fluid">
// //                 <InfoBanner type="info">Thank you for applying for a loan with us, we are currently processing the loan, an agent will call you to proceed with inspection of your collateral.</InfoBanner>
// //                 {currentLoanWithSessionLetterStuff ? showSessionLetter() : null}
// //               </div>
// //             </div>
// //           )
// //         }

// //         else if (currentLoan.loanStatus === "accepted") {
// //           return renderAcceptedState()
// //         }

// //         else if (currentLoan.loanStatus === "pending-approval") {
// //           return (
// //             <div className="page-content">
// //               <div className="container-fluid">
// //                 <InfoBanner type="info">Thank you for completing the requested steps, we are currently processing the loan, an agent will call you.</InfoBanner>
// //               </div>
// //             </div>
// //           )
// //         }

// //         else if (currentLoan.loanStatus === "approved") {
// //           return (
// //             <div className="page-content">
// //               <div className="container-fluid">
// //                 <InfoBanner type="success">Congratulations!! Your loan has been approved, awaiting disbursement of funds.</InfoBanner>
// //               </div>
// //             </div>
// //           )
// //         }

// //         else if (currentLoan.loanStatus === "rejected") {
// //           return (
// //             showLoanApplicationForms
// //               ? <LoanApplicationForm setShowLoanApplicationForms={setShowLoanApplicationForms} loanCategory={selectedloanCategory} loggedInUser={loggedInUser.user} constants={constants} />
// //               : <>
// //                 <div className="page-content">
// //                   <div className="container-fluid">
// //                     <InfoBanner type="warning">Sorry but we cannot grant you a loan at the moment, apply again if you feel that your eligibility has to be reassessed.</InfoBanner>
// //                   </div>
// //                 </div>
// //                 {showApplyButtons()}
// //               </>
// //           )
// //         }

// //         else if (currentLoan.loanStatus === "disbursed") {
// //           return <LoanInformationDisplay loggedInUser={loggedInUser.user} constants={constants} />
// //         }

// //         else if (currentLoan.loanStatus === "defaulted") {
// //           return (
// //             <>
// //               <div className="page-content">
// //                 <div className="container-fluid">
// //                   <InfoBanner type="error">It appears your loan has been defaulted, pay the balance in full, lest appropriate legal action be taken.</InfoBanner>
// //                 </div>
// //               </div>
// //               <LoanInformationDisplay loggedInUser={loggedInUser.user} constants={constants} />
// //             </>
// //           )
// //         }

// //         else if (currentLoan.loanStatus === "completed") {
// //           return (
// //             showLoanApplicationForms
// //               ? <LoanApplicationForm setShowLoanApplicationForms={setShowLoanApplicationForms} loanCategory={selectedloanCategory} loggedInUser={loggedInUser.user} constants={constants} />
// //               : <>
// //                 <div className="page-content">
// //                   <div className="container-fluid">
// //                     <InfoBanner type="success">Thank you for completing payment of your loan, you can now apply for another one.</InfoBanner>
// //                   </div>
// //                 </div>
// //                 {showApplyButtons()}
// //               </>
// //           )
// //         }

// //         else {
// //           return (
// //             showLoanApplicationForms
// //               ? <LoanApplicationForm setShowLoanApplicationForms={setShowLoanApplicationForms} loanCategory={selectedloanCategory} loggedInUser={loggedInUser.user} constants={constants} />
// //               : <>{showApplyButtons()}</>
// //           )
// //         }

// //       } else {
// //         return (
// //           showLoanApplicationForms
// //             ? <LoanApplicationForm setShowLoanApplicationForms={setShowLoanApplicationForms} loanCategory={selectedloanCategory} loggedInUser={loggedInUser.user} constants={constants} />
// //             : <>{showApplyButtons()}</>
// //         )
// //       }
// //     }
// //   }

// //   /* ─────────────────────────────────────────────────────────────
// //      renderPages
// //   ───────────────────────────────────────────────────────────── */
// //   const renderPages = (bnl) => {
// //     if (!loggedInUser.status) {
// //       if (typeof window !== "undefined") window.location = "/signin"
// //     } else {
// //       if (!bnl || parseInt(bnl) === 0) {
// //         return renderMainContent()
// //       } else if (parseInt(bnl) === 1) {
// //         return (
// //           <div className="page-content">
// //             <div className="container-fluid">
// //               <LoanTransactionHistory loggedInUser={loggedInUser.user} />
// //             </div>
// //           </div>
// //         )
// //       } else {
// //         return (
// //           <div className="page-content">
// //             <div className="container-fluid">
// //               <HelpPageDisplay loggedInUser={loggedInUser.user} constants={constants} />
// //             </div>
// //           </div>
// //         )
// //       }
// //     }
// //   }

// //   return <>{renderPages(BottomNavLink)}</>
// // }

// // /* ═══════════════════════════════════════════════════════════════
// //    INFO BANNER
// // ═══════════════════════════════════════════════════════════════ */
// // function InfoBanner({ type, children }) {
// //   const configs = {
// //     info: { bg: "rgba(59,130,246,0.10)", border: "rgba(59,130,246,0.25)", color: "#93C5FD", icon: "ℹ" },
// //     success: { bg: "rgba(16,185,129,0.10)", border: "rgba(16,185,129,0.25)", color: "#6EE7B7", icon: "✓" },
// //     warning: { bg: "rgba(245,158,11,0.10)", border: "rgba(245,158,11,0.25)", color: "#FCD34D", icon: "⚠" },
// //     error: { bg: "rgba(220,38,38,0.10)", border: "rgba(220,38,38,0.25)", color: "#FCA5A5", icon: "✕" },
// //   }
// //   const c = configs[type] || configs.info
// //   return (
// //     <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "14px 16px", borderRadius: 12, background: c.bg, border: `1px solid ${c.border}`, color: c.color, fontSize: 13.5, lineHeight: 1.5, marginBottom: 16, fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)" }}>
// //       <span style={{ fontSize: 16, flexShrink: 0, lineHeight: 1.4 }}>{c.icon}</span>
// //       <span>{children}</span>
// //     </div>
// //   )
// // }

// // /* ═══════════════════════════════════════════════════════════════
// //    DASHBOARD SUB-COMPONENTS
// // ═══════════════════════════════════════════════════════════════ */
// // function StatCard({ label, value, icon, accent, mono }) {
// //   return (
// //     <div style={{ background: G.dim, border: `1px solid ${G.border}`, borderRadius: 14, padding: "16px 14px", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", position: "relative", overflow: "hidden" }}>
// //       <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${accent}, transparent)`, borderRadius: "14px 14px 0 0" }} />
// //       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
// //         <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: G.muted }}>{label}</span>
// //         <div style={{ color: accent, opacity: 0.85 }}>{icon}</div>
// //       </div>
// //       <div style={{ fontFamily: mono ? "var(--font-mono,'JetBrains Mono',monospace)" : undefined, fontSize: 20, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>{value}</div>
// //     </div>
// //   )
// // }

// // function StatSkeleton() {
// //   return (
// //     <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12, marginBottom: 24 }}>
// //       {[0, 1, 2, 3].map(i => (
// //         <div key={i} style={{ height: 88, borderRadius: 14, background: G.dim, position: "relative", overflow: "hidden" }}>
// //           <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)", animation: "vfShimmer 1.6s linear infinite" }} />
// //         </div>
// //       ))}
// //     </div>
// //   )
// // }

// // function ActiveLoanCard({ loan, progress, paidSoFar }) {
// //   const circ = 2 * Math.PI * 38
// //   const dash = circ - (circ * progress / 100)
// //   return (
// //     <div style={{ background: "linear-gradient(135deg,rgba(16,185,129,0.12),rgba(5,150,105,0.05))", border: "1px solid rgba(16,185,129,0.22)", borderRadius: 16, padding: "20px 18px", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}>
// //       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
// //         <div>
// //           <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(52,211,153,0.7)", marginBottom: 4 }}>Loan #{loan.id}</div>
// //           <div style={{ fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", fontSize: "clamp(22px,6vw,32px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.03em" }}>K{fmt(loan.loanAmount || 0)}</div>
// //         </div>
// //         <svg width={84} height={84} style={{ flexShrink: 0 }}>
// //           <circle cx={42} cy={42} r={38} fill="none" stroke={G.dim} strokeWidth={6} />
// //           <circle cx={42} cy={42} r={38} fill="none" stroke="url(#gGrad)" strokeWidth={6} strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={dash} transform="rotate(-90 42 42)" style={{ transition: "stroke-dashoffset 1s ease" }} />
// //           <defs><linearGradient id="gGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor={G.green1} /><stop offset="100%" stopColor={G.green3} /></linearGradient></defs>
// //           <text x={42} y={38} textAnchor="middle" fill={G.green3} fontSize={13} fontFamily="var(--font-mono,'JetBrains Mono',monospace)" fontWeight={700}>{Math.round(progress)}%</text>
// //           <text x={42} y={52} textAnchor="middle" fill={G.muted} fontSize={8} fontFamily="sans-serif">repaid</text>
// //         </svg>
// //       </div>
// //       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 16px", marginBottom: 16 }}>
// //         <IP label="Outstanding" value={`K${fmt(loan.outstandingAmount || 0)}`} mono />
// //         <IP label="Term" value={`${loan.loanTerm || "—"} months`} />
// //         <IP label="Paid So Far" value={`K${fmt(paidSoFar)}`} mono green />
// //         <IP label="Status" value={<SPill status={loan.loanStatus} />} />
// //       </div>
// //       <div style={{ height: 1, background: "rgba(16,185,129,0.15)", margin: "14px 0" }} />
// //       <div style={{ display: "flex", gap: 10 }}>
// //         <Link href="/loans" style={{ ...btnGreen, flex: 1, justifyContent: "center", padding: "10px 0", fontSize: 13 }}>Manage</Link>
// //         <Link href="/esigning" style={{ ...btnOutline, flex: 1, justifyContent: "center", padding: "10px 0", fontSize: 13 }}>Documents</Link>
// //       </div>
// //     </div>
// //   )
// // }

// // function EmptyLoan({ onApplyClick }) {
// //   return (
// //     <div style={{ background: G.dim, border: `1px solid ${G.border}`, borderRadius: 16, padding: "32px 24px", textAlign: "center" }}>
// //       <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(16,185,129,0.1)", border: "1.5px solid rgba(16,185,129,0.2)", margin: "0 auto 14px", display: "flex", alignItems: "center", justifyContent: "center", color: G.green2 }}><LoanIco size={22} /></div>
// //       <div style={{ fontSize: 15, fontWeight: 600, color: "#fff", marginBottom: 6 }}>No Active Loan</div>
// //       <p style={{ fontSize: 13, color: G.muted, marginBottom: 18, lineHeight: 1.6 }}>Get funds in as little as 24 hours.</p>
// //       <button onClick={onApplyClick} style={{ ...btnGreen, fontSize: 13, padding: "10px 22px" }}>Apply Now</button>
// //     </div>
// //   )
// // }

// // function LoanRow({ loan, i }) {
// //   return (
// //     <Link href="/loans" style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 14px", borderRadius: 12, background: G.dim, border: `1px solid ${G.border}`, textDecoration: "none", transition: "background 0.2s", animation: `vfSlideUp 0.4s ${i * 0.05}s both cubic-bezier(.22,1,.36,1)` }}>
// //       <div style={{ width: 4, height: 32, borderRadius: 2, flexShrink: 0, background: statusColor(loan.loanStatus) }} />
// //       <div style={{ flex: 1, minWidth: 0 }}>
// //         <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 1 }}>Loan #{loan.id}</div>
// //         <div style={{ fontSize: 11, color: G.muted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{loan.loanPurpose || "General Purpose"}</div>
// //       </div>
// //       <div style={{ textAlign: "right", flexShrink: 0 }}>
// //         <div style={{ fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", fontSize: 13, fontWeight: 700, color: G.green2, marginBottom: 3 }}>K{fmt(loan.loanAmount || 0)}</div>
// //         <SPill status={loan.loanStatus} />
// //       </div>
// //     </Link>
// //   )
// // }

// // function QuickAction({ href, onClick, icon, label, desc }) {
// //   const shared = { display: "flex", flexDirection: "column", gap: 10, padding: "14px 12px", borderRadius: 14, background: G.dim, border: `1px solid ${G.border}`, textDecoration: "none", transition: "all 0.2s", cursor: "pointer" }
// //   const handlers = {
// //     onMouseEnter: e => { e.currentTarget.style.background = "rgba(16,185,129,0.07)"; e.currentTarget.style.borderColor = "rgba(16,185,129,0.22)" },
// //     onMouseLeave: e => { e.currentTarget.style.background = G.dim; e.currentTarget.style.borderColor = G.border },
// //   }
// //   const inner = (
// //     <>
// //       <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: G.green2 }}>{icon}</div>
// //       <div>
// //         <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 2 }}>{label}</div>
// //         <div style={{ fontSize: 11, color: G.muted }}>{desc}</div>
// //       </div>
// //     </>
// //   )
// //   if (onClick) return <button onClick={onClick} style={{ ...shared, border: `1px solid ${G.border}` }} {...handlers}>{inner}</button>
// //   return <Link href={href} style={shared} {...handlers}>{inner}</Link>
// // }

// // function ProfileStatus({ user }) {
// //   const checks = [
// //     { label: "Basic Info", done: !!(user?.details?.firstname && user?.details?.lastname) },
// //     { label: "Date of Birth", done: !!user?.details?.dateOfBirth },
// //     { label: "NRC / Passport", done: !!(user?.clientDetails?.idNumber || user?.clientDetails?.IDfront?.length) },
// //     { label: "Bank Details", done: !!(user?.bankDetails?.accountNumber) },
// //   ]
// //   const complete = checks.filter(c => c.done).length
// //   const pct = Math.round((complete / checks.length) * 100)
// //   return (
// //     <div style={{ background: G.dim, border: `1px solid ${G.border}`, borderRadius: 16, padding: "18px 16px" }}>
// //       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
// //         <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>{complete}/{checks.length} complete</span>
// //         <span style={{ fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", fontSize: 18, fontWeight: 700, color: pct === 100 ? G.green3 : G.green2 }}>{pct}%</span>
// //       </div>
// //       <div style={{ height: 5, background: "rgba(255,255,255,0.07)", borderRadius: 100, marginBottom: 14 }}>
// //         <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg,${G.green1},${G.green3})`, borderRadius: 100, transition: "width 0.8s ease" }} />
// //       </div>
// //       {checks.map(c => (
// //         <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
// //           <div style={{ width: 17, height: 17, borderRadius: 5, flexShrink: 0, background: c.done ? "rgba(52,211,153,0.13)" : "rgba(255,255,255,0.05)", border: `1.5px solid ${c.done ? "rgba(52,211,153,0.4)" : "rgba(255,255,255,0.1)"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
// //             {c.done && <svg width={9} height={9} viewBox="0 0 12 12" fill="none"><polyline points="2 6 5 9 10 3" stroke={G.green3} strokeWidth={2} strokeLinecap="round" /></svg>}
// //           </div>
// //           <span style={{ fontSize: 12, color: c.done ? "rgba(255,255,255,0.75)" : G.muted }}>{c.label}</span>
// //         </div>
// //       ))}
// //       {pct < 100 && (
// //         <Link href="/profile" style={{ ...btnOutline, width: "100%", marginTop: 12, padding: "9px 0", fontSize: 12.5, justifyContent: "center" }}>Complete Profile</Link>
// //       )}
// //     </div>
// //   )
// // }

// // function StatusExplainer({ status }) {
// //   const map = {
// //     "initiated": { color: "#FBBF24", msg: "Your application has been initiated. Complete your profile and add collateral." },
// //     "pending-collateral-addition": { color: "#FBBF24", msg: "Please add your collateral information to continue." },
// //     "pending-collateral-inspection": { color: "#FBBF24", msg: "Your collateral is pending inspection by our team." },
// //     "collateral-inspection": { color: "#A78BFA", msg: "An inspector is reviewing your collateral." },
// //     "request-approval": { color: "#818CF8", msg: "Your officer has submitted your application for management approval." },
// //     "accepted": { color: G.green3, msg: "Congratulations! Loan accepted. Please review and sign your loan documents." },
// //     "pending-approval": { color: "#A78BFA", msg: "Your documents are being processed. Funds will be disbursed soon." },
// //     "approved": { color: G.green2, msg: "Fully approved. Disbursement is being processed." },
// //     "disbursed": { color: "#60A5FA", msg: "Funds sent! Check your repayment schedule." },
// //     "completed": { color: "#9CA3AF", msg: "This loan has been fully repaid. Thank you!" },
// //     "rejected": { color: "#F87171", msg: "Loan declined. You may re-apply or contact us for more details." },
// //     "defaulted": { color: "#DC2626", msg: "This loan is in default. Please contact us immediately." },
// //   }
// //   const { color, msg } = map[status] || { color: "#9CA3AF", msg: "Current loan status." }
// //   return (
// //     <div style={{ padding: "14px 16px", borderRadius: 12, background: `${color}12`, border: `1px solid ${color}33` }}>
// //       <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 7 }}>
// //         <div style={{ width: 7, height: 7, borderRadius: "50%", background: color, flexShrink: 0 }} />
// //         <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color }}>{status}</span>
// //       </div>
// //       <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, margin: 0 }}>{msg}</p>
// //     </div>
// //   )
// // }

// // function IP({ label, value, mono, green }) {
// //   return (
// //     <div>
// //       <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: G.muted, marginBottom: 3 }}>{label}</div>
// //       <div style={{ fontFamily: mono ? "var(--font-mono,'JetBrains Mono',monospace)" : undefined, fontSize: 13.5, fontWeight: 500, color: green ? G.green3 : "rgba(255,255,255,0.88)" }}>{value}</div>
// //     </div>
// //   )
// // }

// // function SectionLabel({ children }) {
// //   return (
// //     <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
// //       <div style={{ width: 3, height: 14, borderRadius: 2, background: `linear-gradient(180deg,${G.green1},${G.green3})` }} />
// //       <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: G.muted }}>{children}</span>
// //     </div>
// //   )
// // }

// // function SPill({ status }) {
// //   const colors = {
// //     "initiated": "#FBBF24", "pending-collateral-addition": "#FBBF24", "pending-collateral-inspection": "#FBBF24",
// //     "collateral-inspection": "#A78BFA", "request-approval": "#818CF8", "accepted": G.green3,
// //     "pending-approval": "#A78BFA", "approved": G.green2, "disbursed": "#60A5FA",
// //     "completed": "#9CA3AF", "rejected": "#F87171", "defaulted": "#DC2626",
// //   }
// //   const c = colors[status] || "#9CA3AF"
// //   return (
// //     <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 100, background: `${c}18`, color: c, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
// //       <span style={{ width: 5, height: 5, borderRadius: "50%", background: c, flexShrink: 0 }} />
// //       {status}
// //     </span>
// //   )
// // }

// // function Skel({ height }) {
// //   return (
// //     <div style={{ height, borderRadius: 14, background: G.dim, position: "relative", overflow: "hidden" }}>
// //       <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.055),transparent)", animation: "vfShimmer 1.6s linear infinite" }} />
// //     </div>
// //   )
// // }

// // /* ─── icons ─────────────────────────────────────────────────── */
// // function LoanIco({ size = 17 }) { return <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg> }
// // function DebtIco({ size = 17 }) { return <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg> }
// // function WalletIco({ size = 17 }) { return <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><path d="M20 12V8a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2v-4" /><circle cx="17" cy="12" r="1.5" /></svg> }
// // function CheckIco({ size = 17 }) { return <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><polyline points="20 6 9 17 4 12" /></svg> }
// // function UserIco({ size = 17 }) { return <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg> }
// // function BriefIco({ size = 17 }) { return <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /></svg> }
// // function SignIco({ size = 17 }) { return <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg> }
// // function SalaryIco() { return <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /><line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" /></svg> }
// // function AssetIco() { return <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg> }

// // /* ─── helpers ───────────────────────────────────────────────── */
// // function fmt(n) { return parseFloat(n).toLocaleString("en-ZM", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }
// // function statusColor(s) {
// //   const m = { initiated: "#FBBF24", "pending-collateral-addition": "#FBBF24", "pending-collateral-inspection": "#FBBF24", "collateral-inspection": "#A78BFA", "request-approval": "#818CF8", accepted: "#34D399", "pending-approval": "#A78BFA", approved: "#10B981", disbursed: "#60A5FA", completed: "#9CA3AF", rejected: "#F87171", defaulted: "#DC2626" }
// //   return m[s] || "#9CA3AF"
// // }

// // /* ─── global css ────────────────────────────────────────────── */
// // const css = `
// //   @keyframes vfSlideUp {
// //     from { opacity:0; transform:translateY(22px); }
// //     to   { opacity:1; transform:translateY(0); }
// //   }
// //   @keyframes vfShimmer {
// //     0%   { transform:translateX(-100%); }
// //     100% { transform:translateX(200%); }
// //   }
// //   @media (min-width: 768px) {
// //     .vf-stats-grid   { grid-template-columns: repeat(4,1fr) !important; }
// //     .vf-main-grid    { grid-template-columns: 1fr 360px !important; }
// //     .vf-actions-grid { grid-template-columns: repeat(2,1fr) !important; }
// //   }
// //   @media (min-width: 480px) and (max-width: 767px) {
// //     .vf-actions-grid { grid-template-columns: repeat(2,1fr) !important; }
// //   }
// // `
// "use client"

// import ESigningForms from "@/components/ESigningForms/ESigningForms"
// import CollateralForm from "@/components/Forms/CollateralForm"
// import FilledForms from "@/components/Forms/FilledForms"
// import InvestmentForm from "@/components/Forms/InvestmentForm"
// import LoanApplicationForm from "@/components/Forms/LoanApplicationForm"
// import FileDownload from "@/components/Includes/FileDownload/FileDownload"
// import HelpPageDisplay from "@/components/Includes/HelpPageDisplay/HelpPageDisplay"
// import LoanInformationDisplay from "@/components/Includes/LoanInformationDisplay/LoanInformationDisplay"
// import LoanInitiatedDisplay from "@/components/Includes/LoanInitiatedDisplay/LoanInitiatedDisplay"
// import LoanTransactionHistory from "@/components/Includes/LoanTransactionHistory/LoanTransactionHistory"
// import Uploader from "@/components/Includes/Uploader/Uploader"
// import { backEndUrl } from "@/Constants"
// import { useBottomNav } from "@/Contexts/BottomNavContext"
// import { useConstants } from "@/Contexts/ConstantsContext"
// import { usePage } from "@/Contexts/PageContext"
// import { useUser } from "@/Contexts/UserContext"
// import { getLoanFromId, getLoansFromClientId, scrolltoTopOFPage } from "@/Functions"
// import { useThemeMode } from "@/components/ThemeProvider"
// import { useEffect, useState } from "react"
// import Link from "next/link"

// /* ═══════════════════════════════════════════════════════════════
//    COLOUR TOKENS — both modes
// ═══════════════════════════════════════════════════════════════ */
// function useTokens() {
//   const { isDark } = useThemeMode()
//   return {
//     /* backgrounds */
//     page: isDark ? "#0A0F1E" : "#F0F4F2",
//     card: isDark ? "rgba(255,255,255,0.05)" : "#FFFFFF",
//     dim: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
//     /* borders */
//     border: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.09)",
//     /* text */
//     text: isDark ? "#FFFFFF" : "#0D1F17",
//     sub: isDark ? "rgba(255,255,255,0.55)" : "rgba(13,31,23,0.55)",
//     muted: isDark ? "rgba(255,255,255,0.35)" : "rgba(13,31,23,0.38)",
//     /* brand */
//     green1: "#059669",
//     green2: "#10B981",
//     green3: "#34D399",
//     gold: "#C9A84C",
//     red: "#F87171",
//     blue: "#60A5FA",
//     amber: "#FBBF24",
//     purple: "#A78BFA",
//     isDark,
//   }
// }

// /* ═══════════════════════════════════════════════════════════════
//    SHARED BUTTON STYLES (theme-aware)
// ═══════════════════════════════════════════════════════════════ */
// const btnGreen = {
//   display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
//   background: "linear-gradient(135deg,#059669 0%,#10B981 55%,#059669 100%)",
//   backgroundSize: "200% auto",
//   color: "#fff", fontWeight: 700, fontSize: 13.5,
//   border: "none", borderRadius: 10, padding: "11px 22px",
//   cursor: "pointer", textDecoration: "none",
//   boxShadow: "0 4px 16px rgba(16,185,129,0.28)",
//   transition: "all 0.25s",
//   letterSpacing: "0.01em",
// }

// function btnOutline(T) {
//   return {
//     display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
//     background: "transparent",
//     color: T.green2, fontWeight: 700, fontSize: 13.5,
//     border: `1.5px solid rgba(16,185,129,${T.isDark ? "0.4" : "0.6"})`,
//     borderRadius: 10, padding: "10px 22px",
//     cursor: "pointer", textDecoration: "none",
//     transition: "all 0.25s",
//   }
// }

// /* ═══════════════════════════════════════════════════════════════
//    HELPERS
// ═══════════════════════════════════════════════════════════════ */
// function fmt(n) {
//   return parseFloat(n).toLocaleString("en-ZM", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
// }
// function statusColor(s) {
//   const m = {
//     initiated: "#FBBF24", "pending-collateral-addition": "#FBBF24",
//     "pending-collateral-inspection": "#FBBF24", "collateral-inspection": "#A78BFA",
//     "request-approval": "#818CF8", accepted: "#34D399",
//     "pending-approval": "#A78BFA", approved: "#10B981",
//     disbursed: "#60A5FA", completed: "#9CA3AF",
//     rejected: "#F87171", defaulted: "#DC2626",
//   }
//   return m[s] || "#9CA3AF"
// }

// /* ═══════════════════════════════════════════════════════════════
//    INTRODUCTORY LETTER PROMPT
// ═══════════════════════════════════════════════════════════════ */
// function IntroductoryLetterPrompt({ shareableLink }) {
//   const T = useTokens()
//   const [copied, setCopied] = useState(false)

//   const handleCopy = () => {
//     if (typeof navigator !== "undefined") {
//       navigator.clipboard.writeText(shareableLink).catch(() => { })
//     }
//     setCopied(true)
//     setTimeout(() => setCopied(false), 2500)
//   }

//   return (
//     <div style={{
//       background: T.isDark
//         ? "linear-gradient(135deg,rgba(16,185,129,0.08),rgba(59,130,246,0.05))"
//         : "linear-gradient(135deg,rgba(16,185,129,0.06),rgba(59,130,246,0.04))",
//       border: `1px solid rgba(16,185,129,${T.isDark ? "0.2" : "0.25"})`,
//       borderRadius: 16, padding: "22px 20px", marginBottom: 20,
//       fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)",
//     }}>
//       <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
//         <div style={{
//           width: 40, height: 40, borderRadius: 11, flexShrink: 0,
//           background: "rgba(16,185,129,0.12)", border: "1.5px solid rgba(16,185,129,0.28)",
//           display: "flex", alignItems: "center", justifyContent: "center",
//         }}>
//           <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth={2}>
//             <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
//             <polyline points="14 2 14 8 20 8" />
//           </svg>
//         </div>
//         <div>
//           <h3 style={{ color: T.text, fontSize: 15, fontWeight: 700, margin: "0 0 4px", letterSpacing: "-0.2px" }}>
//             Action Required — Introductory Letter
//           </h3>
//           <p style={{ color: T.sub, fontSize: 13, margin: 0, lineHeight: 1.55 }}>
//             Thank you for applying for a loan with us. To proceed, please share the link below with your{" "}
//             <strong style={{ color: T.text }}>HR department</strong> or any authorised person at your place of employment.
//             They must upload a stamped introductory letter recognising your employment.
//           </p>
//         </div>
//       </div>
//       <div style={{
//         background: T.isDark ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.04)",
//         border: `1px solid ${T.border}`, borderRadius: 10,
//         display: "flex", alignItems: "center", overflow: "hidden", marginTop: 6,
//       }}>
//         <code style={{
//           flex: 1, padding: "11px 14px", fontSize: 12.5,
//           color: T.sub, fontFamily: "var(--font-mono,'JetBrains Mono',monospace)",
//           whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "block",
//         }}>
//           {shareableLink}
//         </code>
//         <button onClick={handleCopy} style={{
//           flexShrink: 0, padding: "11px 16px",
//           background: copied ? "rgba(52,211,153,0.15)" : "rgba(16,185,129,0.12)",
//           border: "none", borderLeft: `1px solid ${T.border}`,
//           cursor: "pointer", color: copied ? "#34D399" : "#10B981",
//           fontSize: 12.5, fontWeight: 700,
//           fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)",
//           transition: "all 0.2s", whiteSpace: "nowrap",
//         }}>
//           {copied ? "✓ Copied!" : "Copy Link"}
//         </button>
//       </div>
//       <p style={{ color: T.muted, fontSize: 12, lineHeight: 1.55, margin: "10px 0 0" }}>
//         Once your HR uploads the letter, our team will review it and proceed with your application.
//       </p>
//     </div>
//   )
// }

// /* ═══════════════════════════════════════════════════════════════
//    ON-SITE VERIFICATION GATE
// ═══════════════════════════════════════════════════════════════ */
// function OnSiteVerificationGate({ address, requirements, allowSigning, onSign }) {
//   const T = useTokens()
//   return (
//     <div className="page-content">
//       <div className="container-fluid">
//         <div style={{ position: "relative", marginBottom: 20 }}>
//           <div style={{
//             borderRadius: 16, border: `1px solid ${T.border}`,
//             background: T.card, padding: "32px 24px",
//             filter: "blur(3px)", pointerEvents: "none", userSelect: "none",
//             opacity: 0.35, minHeight: 180, display: "flex", flexDirection: "column", gap: 12,
//           }}>
//             {[100, 80, 90, 65, 75].map((w, i) => (
//               <div key={i} style={{ height: 12, borderRadius: 6, background: T.dim, width: `${w}%` }} />
//             ))}
//           </div>
//           <div style={{
//             position: "absolute", inset: 0,
//             display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
//             padding: "0 24px", textAlign: "center",
//           }}>
//             <div style={{
//               width: 56, height: 56, borderRadius: 16, marginBottom: 16,
//               background: "rgba(245,158,11,0.12)", border: "1.5px solid rgba(245,158,11,0.35)",
//               display: "flex", alignItems: "center", justifyContent: "center",
//             }}>
//               <svg width={26} height={26} fill="none" viewBox="0 0 24 24" stroke="#FBBF24" strokeWidth={2}>
//                 <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
//                 <path d="M7 11V7a5 5 0 0110 0v4" />
//               </svg>
//             </div>
//             <h3 style={{ color: T.text, fontSize: 17, fontWeight: 700, margin: "0 0 10px", letterSpacing: "-0.2px" }}>
//               In-Person Verification Required
//             </h3>
//             <p style={{ color: T.sub, fontSize: 13.5, lineHeight: 1.65, margin: "0 0 8px", maxWidth: 480 }}>
//               To finalise your application, you must come to our office at:
//             </p>
//             <div style={{
//               background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)",
//               borderRadius: 10, padding: "10px 18px",
//               color: "#FCD34D", fontSize: 14, fontWeight: 600,
//               marginBottom: requirements ? 12 : 20, maxWidth: 520,
//             }}>
//               📍 {address || "Our main branch — please contact us for the address."}
//             </div>
//             {requirements && (
//               <div style={{
//                 background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.22)",
//                 borderRadius: 10, padding: "10px 18px",
//                 color: "#93C5FD", fontSize: 13, lineHeight: 1.6, marginBottom: 20, maxWidth: 520,
//               }}>
//                 <strong style={{ display: "block", marginBottom: 4 }}>Please bring with you:</strong>
//                 {requirements}
//               </div>
//             )}
//             {allowSigning ? (
//               <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
//                 <div style={{
//                   background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)",
//                   borderRadius: 10, padding: "10px 16px",
//                   color: "#6EE7B7", fontSize: 12.5, textAlign: "center", marginBottom: 6, maxWidth: 420,
//                 }}>
//                   ✓ Your officer has verified your visit. You may now proceed to sign your documents.
//                 </div>
//                 <button onClick={onSign} style={{ ...btnGreen, fontSize: 14, padding: "12px 28px" }}>
//                   Proceed to Sign Documents →
//                 </button>
//               </div>
//             ) : (
//               <div style={{
//                 background: T.dim, border: `1px solid ${T.border}`,
//                 borderRadius: 10, padding: "10px 16px", color: T.muted, fontSize: 12.5, maxWidth: 420,
//               }}>
//                 Once you have visited us, your loan officer will unlock document signing.
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// /* ═══════════════════════════════════════════════════════════════
//    INFO BANNER
// ═══════════════════════════════════════════════════════════════ */
// function InfoBanner({ type, children }) {
//   const configs = {
//     info: { bg: "rgba(59,130,246,0.10)", border: "rgba(59,130,246,0.25)", color: "#93C5FD", icon: "ℹ" },
//     success: { bg: "rgba(16,185,129,0.10)", border: "rgba(16,185,129,0.25)", color: "#6EE7B7", icon: "✓" },
//     warning: { bg: "rgba(245,158,11,0.10)", border: "rgba(245,158,11,0.25)", color: "#FCD34D", icon: "⚠" },
//     error: { bg: "rgba(220,38,38,0.10)", border: "rgba(220,38,38,0.25)", color: "#FCA5A5", icon: "✕" },
//   }
//   const c = configs[type] || configs.info
//   return (
//     <div style={{
//       display: "flex", alignItems: "flex-start", gap: 10,
//       padding: "14px 16px", borderRadius: 12,
//       background: c.bg, border: `1px solid ${c.border}`,
//       color: c.color, fontSize: 13.5, lineHeight: 1.5, marginBottom: 16,
//       fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)",
//     }}>
//       <span style={{ fontSize: 16, flexShrink: 0, lineHeight: 1.4 }}>{c.icon}</span>
//       <span>{children}</span>
//     </div>
//   )
// }

// /* ═══════════════════════════════════════════════════════════════
//    STATUS PILL
// ═══════════════════════════════════════════════════════════════ */
// function SPill({ status }) {
//   const c = statusColor(status)
//   return (
//     <span style={{
//       display: "inline-flex", alignItems: "center", gap: 4,
//       padding: "2px 8px", borderRadius: 100,
//       background: `${c}1A`, color: c,
//       fontSize: 9.5, fontWeight: 700, letterSpacing: "0.05em",
//       textTransform: "uppercase", whiteSpace: "nowrap",
//     }}>
//       <span style={{ width: 5, height: 5, borderRadius: "50%", background: c, flexShrink: 0 }} />
//       {status}
//     </span>
//   )
// }

// /* ═══════════════════════════════════════════════════════════════
//    SECTION LABEL
// ═══════════════════════════════════════════════════════════════ */
// function SectionLabel({ children }) {
//   const T = useTokens()
//   return (
//     <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
//       <div style={{ width: 3, height: 14, borderRadius: 2, background: `linear-gradient(180deg,${T.green1},${T.green3})` }} />
//       <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.muted }}>
//         {children}
//       </span>
//     </div>
//   )
// }

// /* ═══════════════════════════════════════════════════════════════
//    STAT CARD
// ═══════════════════════════════════════════════════════════════ */
// function StatCard({ label, value, icon, accent, mono }) {
//   const T = useTokens()
//   return (
//     <div style={{
//       background: T.card, border: `1px solid ${T.border}`,
//       borderRadius: 14, padding: "16px 14px",
//       backdropFilter: T.isDark ? "blur(12px)" : "none",
//       WebkitBackdropFilter: T.isDark ? "blur(12px)" : "none",
//       position: "relative", overflow: "hidden",
//       boxShadow: T.isDark ? "none" : "0 1px 4px rgba(0,0,0,0.06)",
//     }}>
//       <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${accent},transparent)`, borderRadius: "14px 14px 0 0" }} />
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
//         <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: T.muted }}>{label}</span>
//         <div style={{ color: accent, opacity: 0.85 }}>{icon}</div>
//       </div>
//       <div style={{
//         fontFamily: mono ? "var(--font-mono,'JetBrains Mono',monospace)" : undefined,
//         fontSize: 20, fontWeight: 700, color: T.text, letterSpacing: "-0.02em",
//       }}>{value}</div>
//     </div>
//   )
// }

// function StatSkeleton() {
//   const T = useTokens()
//   return (
//     <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12, marginBottom: 24 }}>
//       {[0, 1, 2, 3].map(i => (
//         <div key={i} style={{ height: 88, borderRadius: 14, background: T.dim, position: "relative", overflow: "hidden" }}>
//           <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,transparent,rgba(16,185,129,0.06),transparent)", animation: "vfShimmer 1.6s linear infinite" }} />
//         </div>
//       ))}
//     </div>
//   )
// }

// function Skel({ height }) {
//   const T = useTokens()
//   return (
//     <div style={{ height, borderRadius: 14, background: T.dim, position: "relative", overflow: "hidden" }}>
//       <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,transparent,rgba(16,185,129,0.06),transparent)", animation: "vfShimmer 1.6s linear infinite" }} />
//     </div>
//   )
// }

// /* ═══════════════════════════════════════════════════════════════
//    ACTIVE LOAN CARD
// ═══════════════════════════════════════════════════════════════ */
// function ActiveLoanCard({ loan, progress, paidSoFar }) {
//   const T = useTokens()
//   const circ = 2 * Math.PI * 38
//   const dash = circ - (circ * progress / 100)

//   return (
//     <div style={{
//       background: T.isDark
//         ? "linear-gradient(135deg,rgba(16,185,129,0.12),rgba(5,150,105,0.05))"
//         : "linear-gradient(135deg,rgba(16,185,129,0.08),rgba(5,150,105,0.03))",
//       border: `1px solid rgba(16,185,129,${T.isDark ? "0.22" : "0.3"})`,
//       borderRadius: 16, padding: "20px 18px",
//       backdropFilter: T.isDark ? "blur(16px)" : "none",
//       boxShadow: T.isDark ? "none" : "0 2px 12px rgba(16,185,129,0.08)",
//     }}>
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
//         <div>
//           <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(52,211,153,0.7)", marginBottom: 4 }}>
//             Loan #{loan.id}
//           </div>
//           <div style={{
//             fontFamily: "var(--font-mono,'JetBrains Mono',monospace)",
//             fontSize: "clamp(22px,6vw,32px)", fontWeight: 700, color: T.text, letterSpacing: "-0.03em",
//           }}>K{fmt(loan.loanAmount || 0)}</div>
//         </div>
//         <svg width={84} height={84} style={{ flexShrink: 0 }}>
//           <circle cx={42} cy={42} r={38} fill="none" stroke={T.isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"} strokeWidth={6} />
//           <circle cx={42} cy={42} r={38} fill="none" stroke="url(#gGrad)" strokeWidth={6} strokeLinecap="round"
//             strokeDasharray={circ} strokeDashoffset={dash} transform="rotate(-90 42 42)"
//             style={{ transition: "stroke-dashoffset 1s ease" }} />
//           <defs>
//             <linearGradient id="gGrad" x1="0%" y1="0%" x2="100%" y2="0%">
//               <stop offset="0%" stopColor="#059669" />
//               <stop offset="100%" stopColor="#34D399" />
//             </linearGradient>
//           </defs>
//           <text x={42} y={38} textAnchor="middle" fill="#34D399" fontSize={13} fontFamily="var(--font-mono,'JetBrains Mono',monospace)" fontWeight={700}>{Math.round(progress)}%</text>
//           <text x={42} y={52} textAnchor="middle" fill={T.muted} fontSize={8} fontFamily="sans-serif">repaid</text>
//         </svg>
//       </div>
//       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 16px", marginBottom: 16 }}>
//         <IP label="Outstanding" value={`K${fmt(loan.outstandingAmount || 0)}`} mono T={T} />
//         <IP label="Term" value={`${loan.loanTerm || "—"} months`} T={T} />
//         <IP label="Paid So Far" value={`K${fmt(paidSoFar)}`} mono green T={T} />
//         <IP label="Status" value={<SPill status={loan.loanStatus} />} T={T} />
//       </div>
//       <div style={{ height: 1, background: `rgba(16,185,129,${T.isDark ? "0.15" : "0.2"})`, margin: "14px 0" }} />
//       <div style={{ display: "flex", gap: 10 }}>
//         <Link href="/loans" style={{ ...btnGreen, flex: 1, justifyContent: "center", padding: "10px 0", fontSize: 13 }}>Manage</Link>
//         <Link href="/mydocuments" style={{ ...btnOutline(T), flex: 1, justifyContent: "center", padding: "10px 0", fontSize: 13 }}>Documents</Link>
//       </div>
//     </div>
//   )
// }

// function IP({ label, value, mono, green, T }) {
//   return (
//     <div>
//       <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: T.muted, marginBottom: 3 }}>{label}</div>
//       <div style={{ fontFamily: mono ? "var(--font-mono,'JetBrains Mono',monospace)" : undefined, fontSize: 13.5, fontWeight: 500, color: green ? "#34D399" : T.text }}>{value}</div>
//     </div>
//   )
// }

// /* ═══════════════════════════════════════════════════════════════
//    EMPTY LOAN STATE
// ═══════════════════════════════════════════════════════════════ */
// function EmptyLoan({ onApplyClick }) {
//   const T = useTokens()
//   return (
//     <div style={{
//       background: T.card, border: `1px solid ${T.border}`,
//       borderRadius: 16, padding: "32px 24px", textAlign: "center",
//       boxShadow: T.isDark ? "none" : "0 1px 4px rgba(0,0,0,0.06)",
//     }}>
//       <div style={{
//         width: 52, height: 52, borderRadius: 14,
//         background: "rgba(16,185,129,0.1)", border: "1.5px solid rgba(16,185,129,0.2)",
//         margin: "0 auto 14px", display: "flex", alignItems: "center", justifyContent: "center", color: T.green2,
//       }}><LoanIco size={22} /></div>
//       <div style={{ fontSize: 15, fontWeight: 600, color: T.text, marginBottom: 6 }}>No Active Loan</div>
//       <p style={{ fontSize: 13, color: T.muted, marginBottom: 18, lineHeight: 1.6 }}>Get funds in as little as 24 hours.</p>
//       <button onClick={onApplyClick} style={{ ...btnGreen, fontSize: 13, padding: "10px 22px" }}>Apply Now</button>
//     </div>
//   )
// }

// /* ═══════════════════════════════════════════════════════════════
//    LOAN ROW
// ═══════════════════════════════════════════════════════════════ */
// function LoanRow({ loan, i }) {
//   const T = useTokens()
//   return (
//     <Link href="/loans" style={{
//       display: "flex", alignItems: "center", gap: 12, padding: "13px 14px",
//       borderRadius: 12, background: T.card, border: `1px solid ${T.border}`,
//       textDecoration: "none", transition: "background 0.2s",
//       boxShadow: T.isDark ? "none" : "0 1px 3px rgba(0,0,0,0.05)",
//       animation: `vfSlideUp 0.4s ${i * 0.05}s both cubic-bezier(.22,1,.36,1)`,
//     }}>
//       <div style={{ width: 4, height: 32, borderRadius: 2, flexShrink: 0, background: statusColor(loan.loanStatus) }} />
//       <div style={{ flex: 1, minWidth: 0 }}>
//         <div style={{ fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 1 }}>Loan #{loan.id}</div>
//         <div style={{ fontSize: 11, color: T.muted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
//           {loan.loanPurpose || "General Purpose"}
//         </div>
//       </div>
//       <div style={{ textAlign: "right", flexShrink: 0 }}>
//         <div style={{ fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", fontSize: 13, fontWeight: 700, color: T.green2, marginBottom: 3 }}>K{fmt(loan.loanAmount || 0)}</div>
//         <SPill status={loan.loanStatus} />
//       </div>
//     </Link>
//   )
// }

// /* ═══════════════════════════════════════════════════════════════
//    QUICK ACTIONS
// ═══════════════════════════════════════════════════════════════ */
// function QuickAction({ href, onClick, icon, label, desc }) {
//   const T = useTokens()
//   const shared = {
//     display: "flex", flexDirection: "column", gap: 10, padding: "14px 12px",
//     borderRadius: 14, background: T.card, border: `1px solid ${T.border}`,
//     textDecoration: "none", transition: "all 0.2s", cursor: "pointer",
//     boxShadow: T.isDark ? "none" : "0 1px 4px rgba(0,0,0,0.05)",
//   }
//   const handlers = {
//     onMouseEnter: e => { e.currentTarget.style.background = T.isDark ? "rgba(16,185,129,0.07)" : "rgba(16,185,129,0.06)"; e.currentTarget.style.borderColor = "rgba(16,185,129,0.25)" },
//     onMouseLeave: e => { e.currentTarget.style.background = T.card; e.currentTarget.style.borderColor = T.border },
//   }
//   const inner = (
//     <>
//       <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: T.green2 }}>{icon}</div>
//       <div>
//         <div style={{ fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 2 }}>{label}</div>
//         <div style={{ fontSize: 11, color: T.muted }}>{desc}</div>
//       </div>
//     </>
//   )
//   if (onClick) return <button onClick={onClick} style={{ ...shared, border: `1px solid ${T.border}` }} {...handlers}>{inner}</button>
//   return <Link href={href} style={shared} {...handlers}>{inner}</Link>
// }

// /* ═══════════════════════════════════════════════════════════════
//    PROFILE STATUS
// ═══════════════════════════════════════════════════════════════ */
// function ProfileStatus({ user }) {
//   const T = useTokens()
//   const checks = [
//     { label: "Basic Info", done: !!(user?.details?.firstname && user?.details?.lastname) },
//     { label: "Date of Birth", done: !!user?.details?.dateOfBirth },
//     { label: "NRC / Passport", done: !!(user?.clientDetails?.idNumber || user?.clientDetails?.IDfront?.length) },
//     { label: "Bank Details", done: !!(user?.bankDetails?.accountNumber) },
//   ]
//   const complete = checks.filter(c => c.done).length
//   const pct = Math.round((complete / checks.length) * 100)
//   return (
//     <div style={{
//       background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: "18px 16px",
//       boxShadow: T.isDark ? "none" : "0 1px 4px rgba(0,0,0,0.06)",
//     }}>
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
//         <span style={{ fontSize: 12, color: T.sub }}>{complete}/{checks.length} complete</span>
//         <span style={{ fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", fontSize: 18, fontWeight: 700, color: pct === 100 ? T.green3 : T.green2 }}>{pct}%</span>
//       </div>
//       <div style={{ height: 5, background: T.dim, borderRadius: 100, marginBottom: 14 }}>
//         <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg,${T.green1},${T.green3})`, borderRadius: 100, transition: "width 0.8s ease" }} />
//       </div>
//       {checks.map(c => (
//         <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
//           <div style={{
//             width: 17, height: 17, borderRadius: 5, flexShrink: 0,
//             background: c.done ? "rgba(52,211,153,0.13)" : T.dim,
//             border: `1.5px solid ${c.done ? "rgba(52,211,153,0.4)" : T.border}`,
//             display: "flex", alignItems: "center", justifyContent: "center",
//           }}>
//             {c.done && <svg width={9} height={9} viewBox="0 0 12 12" fill="none"><polyline points="2 6 5 9 10 3" stroke="#34D399" strokeWidth={2} strokeLinecap="round" /></svg>}
//           </div>
//           <span style={{ fontSize: 12, color: c.done ? T.sub : T.muted }}>{c.label}</span>
//         </div>
//       ))}
//       {pct < 100 && (
//         <Link href="/profile" style={{ ...btnOutline(T), width: "100%", marginTop: 12, padding: "9px 0", fontSize: 12.5, justifyContent: "center" }}>
//           Complete Profile
//         </Link>
//       )}
//     </div>
//   )
// }

// /* ═══════════════════════════════════════════════════════════════
//    STATUS EXPLAINER
// ═══════════════════════════════════════════════════════════════ */
// function StatusExplainer({ status }) {
//   const T = useTokens()
//   const map = {
//     "initiated": { color: "#FBBF24", msg: "Your application has been initiated. Complete your profile and add collateral." },
//     "pending-collateral-addition": { color: "#FBBF24", msg: "Please add your collateral information to continue." },
//     "pending-collateral-inspection": { color: "#FBBF24", msg: "Your collateral is pending inspection by our team." },
//     "collateral-inspection": { color: "#A78BFA", msg: "An inspector is reviewing your collateral." },
//     "request-approval": { color: "#818CF8", msg: "Your officer has submitted your application for management approval." },
//     "accepted": { color: T.green3, msg: "Congratulations! Loan accepted. Please review and sign your loan documents." },
//     "pending-approval": { color: "#A78BFA", msg: "Your documents are being processed. Funds will be disbursed soon." },
//     "approved": { color: T.green2, msg: "Fully approved. Disbursement is being processed." },
//     "disbursed": { color: "#60A5FA", msg: "Funds sent! Check your repayment schedule." },
//     "completed": { color: "#9CA3AF", msg: "This loan has been fully repaid. Thank you!" },
//     "rejected": { color: "#F87171", msg: "Loan declined. You may re-apply or contact us for more details." },
//     "defaulted": { color: "#DC2626", msg: "This loan is in default. Please contact us immediately." },
//   }
//   const { color, msg } = map[status] || { color: "#9CA3AF", msg: "Current loan status." }
//   return (
//     <div style={{ padding: "14px 16px", borderRadius: 12, background: `${color}14`, border: `1px solid ${color}33` }}>
//       <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 7 }}>
//         <div style={{ width: 7, height: 7, borderRadius: "50%", background: color, flexShrink: 0 }} />
//         <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color }}>{status}</span>
//       </div>
//       <p style={{ fontSize: 12.5, color: T.sub, lineHeight: 1.6, margin: 0 }}>{msg}</p>
//     </div>
//   )
// }

// /* ═══════════════════════════════════════════════════════════════
//    GROW WITH US — shown when user has zero loans ever
// ═══════════════════════════════════════════════════════════════ */
// function GrowWithUs({ constants, onSelectType }) {
//   const T = useTokens()

//   const loanTypes = constants?.loanCategoriesIds || []
//   const defaultTypes = [
//     {
//       id: "personal",
//       label: "Salary Loan",
//       desc: "Repaid via payroll deduction",
//       icon: <SalaryIco />,
//       detail: "Fast approvals for salaried employees. Funds deposited directly to your account.",
//     },
//     {
//       id: "asset",
//       label: "Asset-Based Loan",
//       desc: "Secured against vehicle, property or land",
//       icon: <AssetIco />,
//       detail: "Unlock the value in what you own. Competitive rates secured by your assets.",
//     },
//   ]
//   const displayTypes = loanTypes.length > 0
//     ? loanTypes.map(lt => ({ id: lt.id || lt, label: lt.name || lt, desc: lt.description || "", icon: <LoanIco size={20} />, detail: "" }))
//     : defaultTypes

//   return (
//     <div style={{ minHeight: "100vh", background: T.page, paddingTop: 72, paddingBottom: 88, position: "relative", overflowX: "hidden" }}>
//       {/* Ambient background */}
//       <div style={{
//         position: "fixed", inset: 0,
//         background: T.isDark
//           ? "radial-gradient(ellipse 90% 50% at 50% -5%,rgba(16,185,129,0.13) 0%,transparent 65%),radial-gradient(ellipse 60% 40% at 85% 85%,rgba(5,150,105,0.08) 0%,transparent 60%)"
//           : "radial-gradient(ellipse 90% 50% at 50% -5%,rgba(16,185,129,0.07) 0%,transparent 65%)",
//         pointerEvents: "none", zIndex: 0,
//       }} />
//       <div style={{
//         position: "fixed", inset: 0,
//         backgroundImage: `radial-gradient(${T.isDark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.025)"} 1px,transparent 1px)`,
//         backgroundSize: "28px 28px", pointerEvents: "none", zIndex: 0,
//       }} />

//       <div style={{ position: "relative", zIndex: 1, maxWidth: 600, margin: "0 auto", padding: "0 16px" }}>
//         {/* Hero */}
//         <div style={{ textAlign: "center", padding: "48px 0 40px", animation: "vfSlideUp 0.5s cubic-bezier(.22,1,.36,1)" }}>
//           <div style={{
//             width: 72, height: 72, borderRadius: 22, margin: "0 auto 20px",
//             background: "linear-gradient(135deg,rgba(16,185,129,0.18),rgba(5,150,105,0.06))",
//             border: `1.5px solid rgba(16,185,129,${T.isDark ? "0.3" : "0.35"})`,
//             display: "flex", alignItems: "center", justifyContent: "center",
//             boxShadow: "0 8px 32px rgba(16,185,129,0.15)",
//           }}>
//             <svg width={34} height={34} fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth={1.6}>
//               <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
//             </svg>
//           </div>
//           <h1 style={{
//             fontFamily: "var(--font-display,'DM Serif Display',serif)",
//             fontSize: "clamp(28px,7vw,42px)", color: T.text,
//             fontWeight: 400, margin: "0 0 12px", letterSpacing: "-0.02em", lineHeight: 1.15,
//           }}>
//             Grow <span style={{ color: T.green2 }}>with us</span>
//           </h1>
//           <p style={{ fontSize: 15, color: T.sub, lineHeight: 1.65, margin: "0 0 8px", maxWidth: 440, marginLeft: "auto", marginRight: "auto" }}>
//             Access the financial support you need, quickly and simply. Choose a loan type below to get started — funds in as little as 24 hours.
//           </p>
//         </div>

//         {/* Loan type cards */}
//         <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 40 }}>
//           {displayTypes.map((type, i) => (
//             <button
//               key={type.id}
//               onClick={() => onSelectType(type)}
//               style={{
//                 display: "flex", alignItems: "flex-start", gap: 16,
//                 padding: "20px 20px",
//                 background: T.card,
//                 border: `1px solid ${T.border}`,
//                 borderRadius: 16, cursor: "pointer", width: "100%", textAlign: "left",
//                 fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)",
//                 transition: "all 0.2s",
//                 boxShadow: T.isDark ? "none" : "0 2px 8px rgba(0,0,0,0.06)",
//                 animation: `vfSlideUp 0.4s ${i * 0.08 + 0.1}s both cubic-bezier(.22,1,.36,1)`,
//               }}
//               onMouseEnter={e => {
//                 e.currentTarget.style.background = T.isDark ? "rgba(16,185,129,0.08)" : "rgba(16,185,129,0.05)"
//                 e.currentTarget.style.borderColor = "rgba(16,185,129,0.35)"
//                 e.currentTarget.style.transform = "translateY(-2px)"
//                 e.currentTarget.style.boxShadow = "0 8px 28px rgba(16,185,129,0.14)"
//               }}
//               onMouseLeave={e => {
//                 e.currentTarget.style.background = T.card
//                 e.currentTarget.style.borderColor = T.border
//                 e.currentTarget.style.transform = "none"
//                 e.currentTarget.style.boxShadow = T.isDark ? "none" : "0 2px 8px rgba(0,0,0,0.06)"
//               }}
//             >
//               <div style={{
//                 width: 52, height: 52, borderRadius: 14, flexShrink: 0,
//                 background: "linear-gradient(135deg,rgba(5,150,105,0.2),rgba(16,185,129,0.07))",
//                 border: "1px solid rgba(16,185,129,0.22)",
//                 display: "flex", alignItems: "center", justifyContent: "center", color: T.green2,
//               }}>
//                 {type.icon}
//               </div>
//               <div style={{ flex: 1 }}>
//                 <p style={{ color: T.text, fontSize: 16, fontWeight: 700, margin: "0 0 4px", letterSpacing: "-0.01em" }}>{type.label}</p>
//                 <p style={{ color: T.sub, fontSize: 13, margin: "0 0 6px" }}>{type.desc}</p>
//                 {type.detail && <p style={{ color: T.muted, fontSize: 12, margin: 0, lineHeight: 1.5 }}>{type.detail}</p>}
//               </div>
//               <div style={{ color: "rgba(16,185,129,0.5)", flexShrink: 0, paddingTop: 4 }}>
//                 <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><polyline points="9 18 15 12 9 6" /></svg>
//               </div>
//             </button>
//           ))}
//         </div>

//         {/* Trust badges */}
//         <div style={{
//           display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap",
//           padding: "20px 0", borderTop: `1px solid ${T.border}`,
//           animation: "vfSlideUp 0.5s 0.3s both cubic-bezier(.22,1,.36,1)",
//         }}>
//           {[
//             { icon: "⚡", label: "24-hr disbursement" },
//             { icon: "🔒", label: "Secure & private" },
//             { icon: "✓", label: "Simple process" },
//           ].map(b => (
//             <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 6, color: T.muted, fontSize: 12, fontWeight: 500 }}>
//               <span>{b.icon}</span>
//               <span>{b.label}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//       <style>{css}</style>
//     </div>
//   )
// }

// /* ═══════════════════════════════════════════════════════════════
//    DASHBOARD SHELL — for users who have loans
// ═══════════════════════════════════════════════════════════════ */
// function DashboardShell({ loggedInUser, constants, loans, loansLoading, onApplyClick }) {
//   const T = useTokens()
//   const user = loggedInUser.user
//   const firstName = user?.fullnames?.split(" ")[0] || user?.details?.firstname || "there"
//   const initials = user?.fullnames
//     ? user.fullnames.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
//     : "VF"

//   const currentLoan = user?.currentLoan || loans[0] || null
//   const loanStatus = currentLoan?.loanStatus || null
//   const outstanding = currentLoan?.outstandingAmount || 0
//   const repayAmt = currentLoan?.repaymentAmount || 0
//   const paidSoFar = repayAmt > 0 ? Math.max(0, repayAmt - outstanding) : 0
//   const progress = repayAmt > 0 ? Math.min(100, (paidSoFar / repayAmt) * 100) : 0

//   const moreThanOne = loans.length > 1

//   return (
//     <div style={{ minHeight: "100vh", background: T.page, paddingTop: 72, paddingBottom: 88, position: "relative", overflowX: "hidden" }}>
//       {/* Ambient backgrounds */}
//       <div style={{
//         position: "fixed", inset: 0,
//         background: T.isDark
//           ? "radial-gradient(ellipse 90% 50% at 50% -5%,rgba(16,185,129,0.13) 0%,transparent 65%),radial-gradient(ellipse 60% 40% at 85% 85%,rgba(5,150,105,0.08) 0%,transparent 60%)"
//           : "radial-gradient(ellipse 90% 50% at 50% -5%,rgba(16,185,129,0.07) 0%,transparent 65%)",
//         pointerEvents: "none", zIndex: 0,
//       }} />
//       <div style={{
//         position: "fixed", inset: 0,
//         backgroundImage: `radial-gradient(${T.isDark ? "rgba(255,255,255,0.025)" : "rgba(0,0,0,0.025)"} 1px,transparent 1px)`,
//         backgroundSize: "28px 28px", pointerEvents: "none", zIndex: 0,
//       }} />

//       <div style={{ position: "relative", zIndex: 1, maxWidth: 1080, margin: "0 auto", padding: "0 16px" }}>

//         {/* Header greeting */}
//         <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24, animation: "vfSlideUp 0.45s cubic-bezier(.22,1,.36,1)" }}>
//           <div style={{
//             width: 48, height: 48, borderRadius: 14,
//             background: T.isDark ? "linear-gradient(135deg,rgba(16,185,129,0.25),rgba(5,150,105,0.1))" : "linear-gradient(135deg,rgba(16,185,129,0.15),rgba(5,150,105,0.06))",
//             border: `1.5px solid rgba(16,185,129,${T.isDark ? "0.35" : "0.4"})`,
//             display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
//           }}>
//             <span style={{ fontFamily: "var(--font-display,'DM Serif Display',serif)", fontSize: 17, color: T.green3, fontWeight: 400 }}>{initials}</span>
//           </div>
//           <div style={{ flex: 1, minWidth: 0 }}>
//             <p style={{ margin: 0, fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: T.muted }}>Welcome back</p>
//             <h1 style={{ margin: 0, fontFamily: "var(--font-display,'DM Serif Display',serif)", fontSize: "clamp(20px,5vw,28px)", color: T.text, lineHeight: 1.15 }}>{firstName}</h1>
//           </div>
//           <button onClick={onApplyClick} style={{ ...btnGreen, fontSize: 13, padding: "10px 18px" }}>+ Apply</button>
//         </div>

//         {/* Stats — only if more than 1 loan */}
//         {moreThanOne && (
//           loansLoading ? <StatSkeleton /> : (
//             <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12, marginBottom: 24 }} className="vf-stats-grid">
//               <StatCard label="Active Loans" value={loans.filter(l => !["completed", "defaulted", "rejected"].includes(l.loanStatus)).length} icon={<LoanIco />} accent={T.green2} />
//               <StatCard label="Outstanding" value={outstanding > 0 ? `K${fmt(outstanding)}` : "K0.00"} icon={<DebtIco />} accent={outstanding > 0 ? T.red : T.green3} mono />
//               <StatCard label="Total Borrowed" value={loans.length ? `K${fmt(loans.reduce((s, l) => s + (l.loanAmount || 0), 0))}` : "K0.00"} icon={<WalletIco />} accent={T.blue} mono />
//               <StatCard label="Completed" value={loans.filter(l => l.loanStatus === "completed").length} icon={<CheckIco />} accent={T.green3} />
//             </div>
//           )
//         )}

//         <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }} className="vf-main-grid">
//           {/* Current loan */}
//           <div>
//             <SectionLabel>Current Loan</SectionLabel>
//             {loansLoading
//               ? <Skel height={240} />
//               : currentLoan
//                 ? <ActiveLoanCard loan={currentLoan} progress={progress} paidSoFar={paidSoFar} onApplyClick={onApplyClick} />
//                 : <EmptyLoan onApplyClick={onApplyClick} />
//             }
//           </div>

//           {/* All loans list — only if more than 1 */}
//           {moreThanOne && !loansLoading && loans.length > 0 && (
//             <div>
//               <SectionLabel>All Loans</SectionLabel>
//               <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//                 {loans.slice(0, 5).map((loan, i) => <LoanRow key={loan.id} loan={loan} i={i} />)}
//                 {loans.length > 5 && (
//                   <Link href="/loans" style={{ textAlign: "center", color: T.green2, fontSize: 13, fontWeight: 600, textDecoration: "none", padding: "10px 0" }}>
//                     View all {loans.length} loans →
//                   </Link>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Quick Actions — always shown */}
//           <div>
//             <SectionLabel>Quick Actions</SectionLabel>
//             <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10 }} className="vf-actions-grid">
//               <QuickAction onClick={onApplyClick} icon={<LoanIco size={18} />} label="Apply for Loan" desc="Funds in 24hrs" />
//               <QuickAction href="/profile" icon={<UserIco size={18} />} label="My Profile" desc="Personal details" />
//               <QuickAction href="/business-profile" icon={<BriefIco size={18} />} label="Business Profile" desc="Company loans" />
//               <QuickAction href="/mydocuments" icon={<DocsIco size={18} />} label="My Documents" desc="Loan agreements" />
//             </div>
//           </div>

//           {/* Profile Status — always shown */}
//           <div>
//             <SectionLabel>Profile Status</SectionLabel>
//             <ProfileStatus user={user} />
//           </div>

//           {/* Loan Status — always shown when there's a status */}
//           {loanStatus && (
//             <div>
//               <SectionLabel>Loan Status</SectionLabel>
//               <StatusExplainer status={loanStatus} />
//             </div>
//           )}
//         </div>
//       </div>
//       <style>{css}</style>
//     </div>
//   )
// }

// /* ═══════════════════════════════════════════════════════════════
//    APPLY BUTTONS (inside dashboard for rejected / completed states)
// ═══════════════════════════════════════════════════════════════ */
// function ApplyModal({ isOpen, onClose, constants, onSelectType }) {
//   const T = useTokens()
//   const [closing, setClosing] = useState(false)

//   const handleClose = () => { setClosing(true); setTimeout(() => { setClosing(false); onClose() }, 260) }
//   if (!isOpen) return null

//   const loanTypes = constants?.loanCategoriesIds || []
//   const defaultTypes = [
//     { id: "personal", label: "Salary Loan", desc: "Repaid via payroll deduction", icon: <SalaryIco /> },
//     { id: "asset", label: "Asset-Based Loan", desc: "Secured against vehicle, property, land", icon: <AssetIco /> },
//   ]
//   const displayTypes = loanTypes.length > 0
//     ? loanTypes.map(lt => ({ id: lt.id || lt, label: lt.name || lt, desc: lt.description || "", icon: <LoanIco size={20} /> }))
//     : defaultTypes

//   return (
//     <div onClick={handleClose} style={{
//       position: "fixed", inset: 0, zIndex: 999,
//       background: "rgba(3,10,6,0.78)",
//       backdropFilter: "blur(7px)", WebkitBackdropFilter: "blur(7px)",
//       display: "flex", alignItems: "flex-end", justifyContent: "center",
//       animation: closing ? "ltm-fadeOut 0.26s ease forwards" : "ltm-fadeIn 0.22s ease",
//     }}>
//       <div onClick={e => e.stopPropagation()} style={{
//         width: "100%", maxWidth: 520,
//         background: T.isDark ? "linear-gradient(180deg,#071A10 0%,#040D07 100%)" : "#FFFFFF",
//         borderTop: `1px solid rgba(16,185,129,${T.isDark ? "0.22" : "0.3"})`,
//         borderRadius: "20px 20px 0 0", padding: "28px 20px 40px",
//         boxShadow: "0 -16px 60px rgba(0,0,0,0.58)",
//         animation: closing ? "ltm-slideDown 0.26s ease forwards" : "ltm-slideUp 0.32s cubic-bezier(0.22,1,0.36,1)",
//       }}>
//         <div style={{ width: 36, height: 4, borderRadius: 100, background: T.dim, margin: "0 auto 24px" }} />
//         <h2 style={{ fontFamily: "var(--font-display,'DM Serif Display',serif)", fontSize: 22, color: T.text, fontWeight: 400, margin: "0 0 4px 0" }}>
//           New Loan Application
//         </h2>
//         <p style={{ color: T.muted, fontSize: 13, margin: "0 0 22px" }}>Select the loan type to get started</p>
//         <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//           {displayTypes.map((type, i) => (
//             <button key={type.id} onClick={() => { onSelectType(type); handleClose() }} style={{
//               display: "flex", alignItems: "center", gap: 14, padding: "16px 18px",
//               background: T.isDark ? "rgba(16,185,129,0.05)" : "rgba(16,185,129,0.04)",
//               border: `1px solid rgba(16,185,129,${T.isDark ? "0.13" : "0.18"})`,
//               borderRadius: 14, cursor: "pointer", width: "100%", textAlign: "left",
//               fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)",
//               transition: "all 0.18s",
//               animation: `ltm-slideUp 0.32s cubic-bezier(0.22,1,0.36,1) ${i * 0.06}s both`,
//             }}
//               onMouseEnter={e => { e.currentTarget.style.background = "rgba(16,185,129,0.10)"; e.currentTarget.style.borderColor = "rgba(16,185,129,0.28)" }}
//               onMouseLeave={e => { e.currentTarget.style.background = T.isDark ? "rgba(16,185,129,0.05)" : "rgba(16,185,129,0.04)"; e.currentTarget.style.borderColor = `rgba(16,185,129,${T.isDark ? "0.13" : "0.18"})` }}
//             >
//               <div style={{ width: 42, height: 42, borderRadius: 12, flexShrink: 0, background: "linear-gradient(135deg,rgba(5,150,105,0.22),rgba(16,185,129,0.07))", border: "1px solid rgba(16,185,129,0.18)", display: "flex", alignItems: "center", justifyContent: "center", color: "#10B981" }}>{type.icon}</div>
//               <div style={{ flex: 1 }}>
//                 <p style={{ color: T.text, fontSize: 15, fontWeight: 600, margin: "0 0 3px" }}>{type.label}</p>
//                 {type.desc && <p style={{ color: T.muted, fontSize: 12, margin: 0 }}>{type.desc}</p>}
//               </div>
//               <svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="rgba(16,185,129,0.45)" strokeWidth={2.2}><polyline points="9 18 15 12 9 6" /></svg>
//             </button>
//           ))}
//         </div>
//         <button onClick={handleClose} style={{
//           width: "100%", marginTop: 16, padding: "13px",
//           background: "transparent", border: `1px solid ${T.border}`,
//           borderRadius: 12, color: T.muted, fontSize: 14, fontWeight: 600,
//           cursor: "pointer", fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)",
//           transition: "all 0.18s",
//         }}>Cancel</button>
//       </div>
//       <style>{`
//         @keyframes ltm-fadeIn  { from{opacity:0} to{opacity:1} }
//         @keyframes ltm-fadeOut { from{opacity:1} to{opacity:0} }
//         @keyframes ltm-slideUp   { from{transform:translateY(100%)} to{transform:translateY(0)} }
//         @keyframes ltm-slideDown { from{transform:translateY(0)} to{transform:translateY(100%)} }
//       `}</style>
//     </div>
//   )
// }

// /* ═══════════════════════════════════════════════════════════════
//    MAIN HOME COMPONENT
// ═══════════════════════════════════════════════════════════════ */
// export default function Home() {
//   const [showLoanApplicationForms, setShowLoanApplicationForms] = useState(false)
//   const [showInvestMentForms, setshowInvestMentForms] = useState(false)
//   const [selectedloanCategory, setSelectedloanCategory] = useState(null)
//   const [currentLoanWithSessionLetterStuff, setCurrentLoanWithSessionLetterStuff] = useState(null)
//   const [showLoanTypeModal, setShowLoanTypeModal] = useState(false)
//   const [loans, setLoans] = useState([])
//   const [loansLoading, setLoansLoading] = useState(true)

//   const [currentLoanType, setCurrentLoanType] = useState(null)
//   const [loanTypeLoading, setLoanTypeLoading] = useState(false)
//   const [allowUserToSignLoanDocuments, setAllowUserToSignLoanDocuments] = useState(false)
//   const [proceedToSigningForms, setProceedToSigningForms] = useState(false)
//   const [salaryId, setSalaryId] = useState(null)

//   const { BottomNavLink } = useBottomNav()
//   const loggedInUser = useUser()
//   const constants = useConstants()
//   const { setPage } = usePage()

//   setPage("/")
//   scrolltoTopOFPage()

//   /* ── fetch all loans ── */
//   useEffect(() => {
//     if (!loggedInUser?.user?.id) return
//     const run = async () => {
//       setLoansLoading(true)
//       try {
//         const all = await getLoansFromClientId(loggedInUser.user.id)
//         setLoans(Array.isArray(all) ? all : [])
//       } catch (_) { }
//       setLoansLoading(false)
//     }
//     run()
//   }, [loggedInUser?.user?.id])

//   /* ── session letter ── */
//   useEffect(() => {
//     const run = async () => {
//       const currentLoan = await getLoanFromId(
//         loggedInUser.user.currentLoan.id,
//         "collateral,collateral.vehicle,collateral.vehicle.sessionLetterTemplate,collateral.vehicle.sessionLetter"
//       )
//       const { collateral } = currentLoan
//       const { vehicle } = collateral || {}
//       if (collateral && collateral.collateralType === "vehicle") {
//         if (vehicle?.insuranceType && (vehicle.insuranceType === "third-party" || vehicle.insuranceType === "comprehensive")) {
//           if (currentLoan.insuranceRequest && currentLoan.insuranceRequest === "African Gray") return
//           setCurrentLoanWithSessionLetterStuff(currentLoan)
//         }
//       }
//     }
//     if (loggedInUser?.user?.currentLoan) run()
//   }, [loggedInUser?.user?.currentLoan])

//   /* ── loan type + signing permission ── */
//   useEffect(() => {
//     const currentLoan = loggedInUser?.user?.currentLoan
//     const relevantStatuses = ["accepted", "initiated", "request-approval"]
//     if (!currentLoan || !relevantStatuses.includes(currentLoan.loanStatus)) return

//     const fetchLoanTypeAndSignPermission = async () => {
//       setLoanTypeLoading(true)
//       try {
//         const loanWithType = await getLoanFromId(currentLoan.id, "loanType")
//         const typeName = loanWithType?.loanType?.data?.attributes?.typeName || "assetBased"
//         setCurrentLoanType(typeName)
//         if (currentLoan.loanStatus === "accepted") {
//           setAllowUserToSignLoanDocuments(!!(loanWithType?.allowUserToSignLoanDocuments))
//         }
//         if (typeName === "salaryBased") {
//           setSalaryId(loggedInUser?.user?.salary?.id || null)
//         }
//       } catch (_) {
//         setCurrentLoanType("assetBased")
//         setAllowUserToSignLoanDocuments(false)
//       }
//       setLoanTypeLoading(false)
//     }

//     fetchLoanTypeAndSignPermission()
//     setProceedToSigningForms(false)
//   }, [loggedInUser?.user?.currentLoan?.id, loggedInUser?.user?.currentLoan?.loanStatus])

//   /* ── derived ── */
//   const loansInformation = constants?.loansInformation || {}
//   const requireOnSiteForSalary = loansInformation.requireUserToComeOnSiteForSalaryLoanVerification === true
//   const requireOnSiteForAsset = loansInformation.requireUserToComeOnSiteForAssetLoanVerification === true
//   const isSalaryLoan = currentLoanType === "salaryBased"
//   const requireOnSite = isSalaryLoan ? requireOnSiteForSalary : requireOnSiteForAsset

//   const handleApplyClick = () => setShowLoanTypeModal(true)
//   const handleLoanTypeSelected = (type) => {
//     setSelectedloanCategory(type.id || type)
//     setShowLoanTypeModal(false)
//     setShowLoanApplicationForms(true)
//   }

//   /* ── showApplyButtons ── */
//   const showApplyButtons = () => (
//     <>
//       <DashboardShell
//         loggedInUser={loggedInUser}
//         constants={constants}
//         loans={loans}
//         loansLoading={loansLoading}
//         onApplyClick={handleApplyClick}
//       />
//       <ApplyModal
//         isOpen={showLoanTypeModal}
//         onClose={() => setShowLoanTypeModal(false)}
//         constants={constants}
//         onSelectType={handleLoanTypeSelected}
//       />
//     </>
//   )

//   /* ── showSessionLetter ── */
//   const showSessionLetter = () => {
//     const T_inline = { muted: "rgba(255,255,255,0.38)" } // safe fallback for this isolated render
//     const currentLoan = currentLoanWithSessionLetterStuff
//     const { collateral } = currentLoan
//     const { vehicle } = collateral

//     if (vehicle.sessionLetter && vehicle.sessionLetter.data) return null

//     if (!(vehicle.sessionLetterTemplate && vehicle.sessionLetterTemplate.data)) {
//       return (
//         <div style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(245,158,11,0.10)", border: "1px solid rgba(245,158,11,0.25)", color: "#FCD34D", fontSize: 13.5, lineHeight: 1.5, marginTop: 10, display: "flex", gap: 10 }}>
//           <span style={{ fontSize: 16, flexShrink: 0 }}>⚠</span>
//           <span>We shall send you a message when the session letter template has been uploaded, along with instructions on what to do next. Thank you.</span>
//         </div>
//       )
//     }
//     return (
//       <div style={{ width: "100%", textAlign: "center", marginTop: 10 }}>
//         <FileDownload files={vehicle.sessionLetterTemplate} backEndUrl={backEndUrl} fileDisplayName="Session Letter Template" />
//         <div style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "16px 0" }} />
//         <h3 style={{ color: "#fff", fontSize: 16, fontWeight: 600, margin: "0 0 4px" }}>Upload Session Letter</h3>
//         <p style={{ color: T_inline.muted, fontSize: 12, margin: "0 0 12px", lineHeight: 1.5 }}>
//           Stamped and signed by your insurance company — download the template and present it to your insurer first.
//         </p>
//         <Uploader
//           refId={currentLoan.collateral.vehicle.id}
//           refName="media-and-documents.vehicle"
//           fieldName="sessionLetter"
//           allowMultiple={false}
//           allowedTypes={["image/*", "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]}
//         />
//       </div>
//     )
//   }

//   /* ── renderAcceptedState ── */
//   const renderAcceptedState = () => {
//     const user = loggedInUser.user

//     if (loanTypeLoading) {
//       return (
//         <div className="page-content">
//           <div className="container-fluid">
//             <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "24px 0", color: "rgba(255,255,255,0.5)", fontSize: 14 }}>
//               <div style={{ width: 18, height: 18, border: "2px solid #10B981", borderTopColor: "transparent", borderRadius: "50%", animation: "vfSpin 0.7s linear infinite" }} />
//               Checking loan requirements…
//             </div>
//           </div>
//           <style>{`@keyframes vfSpin { to { transform: rotate(360deg); } }`}</style>
//         </div>
//       )
//     }

//     if (requireOnSite && !proceedToSigningForms && !allowUserToSignLoanDocuments) {
//       return (
//         <OnSiteVerificationGate
//           address={loansInformation.address}
//           requirements={loansInformation.userRequirementsToBrinOnSite}
//           allowSigning={allowUserToSignLoanDocuments}
//           onSign={() => setProceedToSigningForms(true)}
//         />
//       )
//     }

//     return (
//       <>
//         {user.signingMethod && user.signingMethod === "e-signing"
//           ? <div className="page-content"><div className="container-fluid"><ESigningForms loggedInUser={user} constants={constants} /></div></div>
//           : <FilledForms loggedInUser={user} constants={constants} />
//         }
//       </>
//     )
//   }

//   /* ── renderMainContent ── */
//   const renderMainContent = () => {
//     const currentInvestment = loggedInUser.user.currentInvestment
//     if (currentInvestment) {
//       return <LoanInitiatedDisplay />
//     }

//     if (showInvestMentForms) {
//       return (
//         <div className="page-content">
//           <div className="container-fluid">
//             <InvestmentForm
//               setshowInvestMentForms={setshowInvestMentForms}
//               loanCategory="personal"
//               loggedInUser={loggedInUser.user}
//               constants={constants}
//             />
//           </div>
//         </div>
//       )
//     }

//     /* ── ZERO LOANS EVER: show Grow With Us ── */
//     if (!loansLoading && loans.length === 0 && !loggedInUser.user.currentLoan) {
//       if (showLoanApplicationForms) {
//         return <LoanApplicationForm setShowLoanApplicationForms={setShowLoanApplicationForms} loanCategory={selectedloanCategory} loggedInUser={loggedInUser.user} constants={constants} />
//       }
//       return <GrowWithUs constants={constants} onSelectType={handleLoanTypeSelected} />
//     }

//     const currentLoan = loggedInUser.user.currentLoan

//     if (currentLoan) {
//       if (currentLoan.loanStatus === "initiated" || currentLoan.loanStatus === "request-approval") {
//         const requireIntroLetter = loansInformation.requireIntroductoryLetterSalaryLoan === true
//         if (requireIntroLetter && currentLoanType === "salaryBased" && salaryId) {
//           const origin = typeof window !== "undefined" ? window.location.origin : ""
//           const shareableLink = `${origin}/upload-introductory-letter?salaryId=${salaryId}`
//           return (
//             <div className="page-content">
//               <div className="container-fluid">
//                 <IntroductoryLetterPrompt shareableLink={shareableLink} />
//                 <LoanInitiatedDisplay />
//               </div>
//             </div>
//           )
//         }
//         return <LoanInitiatedDisplay />
//       }

//       if (currentLoan.loanStatus === "pending-collateral-addition") {
//         return <CollateralForm loggedInUser={loggedInUser.user} constants={constants} />
//       }

//       if (currentLoan.loanStatus === "pending-collateral-inspection" || currentLoan.loanStatus === "collateral-inspection") {
//         return (
//           <div className="page-content">
//             <div className="container-fluid">
//               <InfoBanner type="info">Thank you for applying for a loan with us, we are currently processing the loan, an agent will call you to proceed with inspection of your collateral.</InfoBanner>
//               {currentLoanWithSessionLetterStuff ? showSessionLetter() : null}
//             </div>
//           </div>
//         )
//       }

//       if (currentLoan.loanStatus === "accepted") return renderAcceptedState()

//       if (currentLoan.loanStatus === "pending-approval") {
//         return (
//           <div className="page-content">
//             <div className="container-fluid">
//               <InfoBanner type="info">Thank you for completing the requested steps, we are currently processing the loan, an agent will call you.</InfoBanner>
//             </div>
//           </div>
//         )
//       }

//       if (currentLoan.loanStatus === "approved") {
//         return (
//           <div className="page-content">
//             <div className="container-fluid">
//               <InfoBanner type="success">Congratulations!! Your loan has been approved, awaiting disbursement of funds.</InfoBanner>
//             </div>
//           </div>
//         )
//       }

//       if (currentLoan.loanStatus === "rejected") {
//         return showLoanApplicationForms
//           ? <LoanApplicationForm setShowLoanApplicationForms={setShowLoanApplicationForms} loanCategory={selectedloanCategory} loggedInUser={loggedInUser.user} constants={constants} />
//           : <>
//             <div className="page-content">
//               <div className="container-fluid">
//                 <InfoBanner type="warning">Sorry but we cannot grant you a loan at the moment, apply again if you feel that your eligibility has to be reassessed.</InfoBanner>
//               </div>
//             </div>
//             {showApplyButtons()}
//           </>
//       }

//       if (currentLoan.loanStatus === "disbursed") {
//         return <LoanInformationDisplay loggedInUser={loggedInUser.user} constants={constants} />
//       }

//       if (currentLoan.loanStatus === "defaulted") {
//         return (
//           <>
//             <div className="page-content">
//               <div className="container-fluid">
//                 <InfoBanner type="error">It appears your loan has been defaulted, pay the balance in full, lest appropriate legal action be taken.</InfoBanner>
//               </div>
//             </div>
//             <LoanInformationDisplay loggedInUser={loggedInUser.user} constants={constants} />
//           </>
//         )
//       }

//       if (currentLoan.loanStatus === "completed") {
//         return showLoanApplicationForms
//           ? <LoanApplicationForm setShowLoanApplicationForms={setShowLoanApplicationForms} loanCategory={selectedloanCategory} loggedInUser={loggedInUser.user} constants={constants} />
//           : <>
//             <div className="page-content">
//               <div className="container-fluid">
//                 <InfoBanner type="success">Thank you for completing payment of your loan, you can now apply for another one.</InfoBanner>
//               </div>
//             </div>
//             {showApplyButtons()}
//           </>
//       }

//       return showLoanApplicationForms
//         ? <LoanApplicationForm setShowLoanApplicationForms={setShowLoanApplicationForms} loanCategory={selectedloanCategory} loggedInUser={loggedInUser.user} constants={constants} />
//         : <>{showApplyButtons()}</>
//     }

//     /* has past loans but no current one */
//     return showLoanApplicationForms
//       ? <LoanApplicationForm setShowLoanApplicationForms={setShowLoanApplicationForms} loanCategory={selectedloanCategory} loggedInUser={loggedInUser.user} constants={constants} />
//       : <>{showApplyButtons()}</>
//   }

//   /* ── renderPages ── */
//   const renderPages = (bnl) => {
//     if (!loggedInUser.status) {
//       if (typeof window !== "undefined") window.location = "/signin"
//       return null
//     }
//     if (!bnl || parseInt(bnl) === 0) return renderMainContent()
//     if (parseInt(bnl) === 1) {
//       return (
//         <div className="page-content">
//           <div className="container-fluid">
//             <LoanTransactionHistory loggedInUser={loggedInUser.user} />
//           </div>
//         </div>
//       )
//     }
//     return (
//       <div className="page-content">
//         <div className="container-fluid">
//           <HelpPageDisplay loggedInUser={loggedInUser.user} constants={constants} />
//         </div>
//       </div>
//     )
//   }

//   return <>{renderPages(BottomNavLink)}</>
// }

// /* ═══════════════════════════════════════════════════════════════
//    ICONS
// ═══════════════════════════════════════════════════════════════ */
// function LoanIco({ size = 17 }) { return <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg> }
// function DebtIco({ size = 17 }) { return <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg> }
// function WalletIco({ size = 17 }) { return <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><path d="M20 12V8a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2v-4" /><circle cx="17" cy="12" r="1.5" /></svg> }
// function CheckIco({ size = 17 }) { return <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><polyline points="20 6 9 17 4 12" /></svg> }
// function UserIco({ size = 17 }) { return <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg> }
// function BriefIco({ size = 17 }) { return <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /></svg> }
// function DocsIco({ size = 17 }) { return <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg> }
// function SalaryIco() { return <svg width={22} height={22} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /><line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" /></svg> }
// function AssetIco() { return <svg width={22} height={22} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg> }

// /* ═══════════════════════════════════════════════════════════════
//    GLOBAL CSS
// ═══════════════════════════════════════════════════════════════ */
// const css = `
//   @keyframes vfSlideUp {
//     from { opacity:0; transform:translateY(22px); }
//     to   { opacity:1; transform:translateY(0); }
//   }
//   @keyframes vfShimmer {
//     0%   { transform:translateX(-100%); }
//     100% { transform:translateX(200%); }
//   }
//   @media (min-width: 768px) {
//     .vf-stats-grid   { grid-template-columns: repeat(4,1fr) !important; }
//     .vf-main-grid    { grid-template-columns: 1fr 360px !important; }
//     .vf-actions-grid { grid-template-columns: repeat(2,1fr) !important; }
//   }
//   @media (min-width: 480px) and (max-width: 767px) {
//     .vf-actions-grid { grid-template-columns: repeat(2,1fr) !important; }
//   }
// `
"use client"

import ESigningForms from "@/components/ESigningForms/ESigningForms"
import CollateralForm from "@/components/Forms/CollateralForm"
import FilledForms from "@/components/Forms/FilledForms"
import InvestmentForm from "@/components/Forms/InvestmentForm"
import LoanApplicationForm from "@/components/Forms/LoanApplicationForm"
import FileDownload from "@/components/Includes/FileDownload/FileDownload"
import HelpPageDisplay from "@/components/Includes/HelpPageDisplay/HelpPageDisplay"
import LoanInformationDisplay from "@/components/Includes/LoanInformationDisplay/LoanInformationDisplay"
import LoanInitiatedDisplay from "@/components/Includes/LoanInitiatedDisplay/LoanInitiatedDisplay"
import LoanTransactionHistory from "@/components/Includes/LoanTransactionHistory/LoanTransactionHistory"
import Uploader from "@/components/Includes/Uploader/Uploader"
import ListStyleLoanApplicationDisplay from "@/components/LoanApplicationDisplay/ListStyleLoanApplicationDisplay"
import InvestButton from "@/components/Includes/InvestButton/InvestButton"
import { backEndUrl } from "@/Constants"
import { useBottomNav } from "@/Contexts/BottomNavContext"
import { useConstants } from "@/Contexts/ConstantsContext"
import { usePage } from "@/Contexts/PageContext"
import { useUser } from "@/Contexts/UserContext"
import { getLoanFromId, getLoansFromClientId, scrolltoTopOFPage } from "@/Functions"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useThemeMode } from "@/components/ThemeProvider"

/* ─── colour tokens (theme-aware) ───────────────────────────── */
function useG() {
  const { isDark } = useThemeMode()
  return isDark
    ? {
      page: "#0A0F1E",
      green1: "#059669",
      green2: "#10B981",
      green3: "#34D399",
      gold: "#C9A84C",
      goldL: "#E8C87A",
      red: "#F87171",
      blue: "#60A5FA",
      purple: "#A78BFA",
      text: "#FFFFFF",
      textSub: "rgba(255,255,255,0.55)",
      muted: "rgba(255,255,255,0.38)",
      dim: "rgba(255,255,255,0.06)",
      dimHover: "rgba(255,255,255,0.09)",
      border: "rgba(255,255,255,0.08)",
      cardBg: "rgba(255,255,255,0.05)",
      isDark: true,
    }
    : {
      page: "#F0F4F1",
      green1: "#059669",
      green2: "#0E9F71",
      green3: "#0B8A60",
      gold: "#B8922A",
      goldL: "#C9A84C",
      red: "#DC2626",
      blue: "#2563EB",
      purple: "#7C3AED",
      text: "#0D1F17",
      textSub: "rgba(13,31,23,0.62)",
      muted: "rgba(13,31,23,0.42)",
      dim: "rgba(13,31,23,0.04)",
      dimHover: "rgba(13,31,23,0.07)",
      border: "rgba(13,31,23,0.09)",
      cardBg: "#FFFFFF",
      isDark: false,
    }
}

/* ─── shared button style builders ──────────────────────────── */
function useButtonStyles() {
  const G = useG()
  const btnGreen = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
    background: `linear-gradient(135deg,${G.green1} 0%,${G.green2} 55%,${G.green1} 100%)`,
    backgroundSize: "200% auto",
    color: "#fff", fontWeight: 700, fontSize: 13.5,
    border: "none", borderRadius: 10, padding: "11px 22px",
    cursor: "pointer", textDecoration: "none",
    boxShadow: G.isDark ? "0 4px 16px rgba(16,185,129,0.28)" : "0 4px 14px rgba(14,159,113,0.22)",
    transition: "all 0.25s",
    letterSpacing: "0.01em",
  }
  const btnOutline = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
    background: "transparent",
    color: G.green2, fontWeight: 700, fontSize: 13.5,
    border: `1.5px solid ${G.isDark ? "rgba(16,185,129,0.4)" : "rgba(14,159,113,0.35)"}`, borderRadius: 10, padding: "10px 22px",
    cursor: "pointer", textDecoration: "none",
    transition: "all 0.25s",
  }
  return { btnGreen, btnOutline }
}

/* ═══════════════════════════════════════════════════════════════
   GROW WITH US — shown when the user has never had a loan
═══════════════════════════════════════════════════════════════ */
function GrowWithUs({ constants, onSelectType }) {
  const G = useG()
  const loanTypes = constants?.loanCategoriesIds || []
  const defaultTypes = [
    { id: "personal", label: "Salary Loan", desc: "Repaid via payroll deduction", icon: <SalaryIco /> },
    { id: "asset", label: "Asset-Based Loan", desc: "Secured against vehicle, property, land", icon: <AssetIco /> },
  ]
  const displayTypes = loanTypes.length > 0
    ? loanTypes.map(lt => ({ id: lt.id || lt, label: lt.name || lt, desc: lt.description || "", icon: <LoanIco size={20} /> }))
    : defaultTypes

  return (
    <div style={{ minHeight: "100vh", background: G.page, paddingTop: 72, paddingBottom: 88, position: "relative", overflowX: "hidden" }}>
      <div style={{
        position: "fixed", inset: 0,
        background: G.isDark
          ? `radial-gradient(ellipse 90% 50% at 50% -5%, rgba(16,185,129,0.13) 0%, transparent 65%), radial-gradient(ellipse 60% 40% at 85% 85%, rgba(5,150,105,0.08) 0%, transparent 60%)`
          : `radial-gradient(ellipse 90% 50% at 50% -5%, rgba(14,159,113,0.10) 0%, transparent 65%), radial-gradient(ellipse 60% 40% at 85% 85%, rgba(184,146,42,0.05) 0%, transparent 60%)`,
        pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{ position: "fixed", inset: 0, backgroundImage: `radial-gradient(${G.isDark ? "rgba(255,255,255,0.025)" : "rgba(13,31,23,0.035)"} 1px, transparent 1px)`, backgroundSize: "28px 28px", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 720, margin: "0 auto", padding: "40px 20px 0" }}>
        <div style={{ textAlign: "center", marginBottom: 36, animation: "vfSlideUp 0.45s cubic-bezier(.22,1,.36,1)" }}>
          <div style={{
            width: 64, height: 64, borderRadius: 18, margin: "0 auto 18px",
            background: `linear-gradient(135deg,rgba(16,185,129,0.22),rgba(5,150,105,0.08))`,
            border: `1.5px solid ${G.isDark ? "rgba(16,185,129,0.32)" : "rgba(14,159,113,0.28)"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width={28} height={28} fill="none" viewBox="0 0 24 24" stroke={G.green2} strokeWidth={1.8}>
              <line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" />
            </svg>
          </div>
          <h1 style={{ margin: "0 0 10px", fontFamily: "var(--font-display,'DM Serif Display',serif)", fontSize: "clamp(26px,6vw,36px)", color: G.text, lineHeight: 1.15 }}>
            Grow with us
          </h1>
          <p style={{ margin: 0, fontSize: 14, color: G.textSub, lineHeight: 1.6, maxWidth: 440, marginLeft: "auto", marginRight: "auto" }}>
            Get the funds you need, fast. Choose a loan type below to get started — approval and disbursement in as little as 24 hours.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {displayTypes.map((type, i) => (
            <button
              key={type.id}
              onClick={() => onSelectType(type)}
              style={{
                display: "flex", alignItems: "center", gap: 16,
                padding: "20px 20px",
                background: G.cardBg,
                border: `1px solid ${G.isDark ? "rgba(16,185,129,0.16)" : "rgba(14,159,113,0.18)"}`,
                borderRadius: 16, cursor: "pointer", width: "100%", textAlign: "left",
                fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)",
                transition: "all 0.18s",
                boxShadow: G.isDark ? "none" : "0 2px 10px rgba(13,31,23,0.04)",
                animation: `vfSlideUp 0.4s ${0.1 + i * 0.08}s both cubic-bezier(.22,1,.36,1)`,
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = G.isDark ? "rgba(16,185,129,0.32)" : "rgba(14,159,113,0.32)"; e.currentTarget.style.transform = "translateY(-2px)" }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = G.isDark ? "rgba(16,185,129,0.16)" : "rgba(14,159,113,0.18)"; e.currentTarget.style.transform = "none" }}
            >
              <div style={{
                width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                background: `linear-gradient(135deg,rgba(5,150,105,0.20),rgba(16,185,129,0.06))`,
                border: `1px solid ${G.isDark ? "rgba(16,185,129,0.2)" : "rgba(14,159,113,0.2)"}`,
                display: "flex", alignItems: "center", justifyContent: "center", color: G.green2,
              }}>
                {type.icon}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ color: G.text, fontSize: 16, fontWeight: 700, margin: "0 0 3px" }}>{type.label}</p>
                {type.desc && <p style={{ color: G.textSub, fontSize: 13, margin: 0, lineHeight: 1.45 }}>{type.desc}</p>}
              </div>
              <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke={G.isDark ? "rgba(16,185,129,0.5)" : "rgba(14,159,113,0.55)"} strokeWidth={2.2}><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          ))}
        </div>
      </div>
      <style>{css(G)}</style>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   INTRODUCTORY LETTER PROMPT
═══════════════════════════════════════════════════════════════ */
function IntroductoryLetterPrompt({ shareableLink }) {
  const G = useG()
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(shareableLink).catch(() => { })
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div style={{
      background: G.isDark
        ? "linear-gradient(135deg, rgba(16,185,129,0.08), rgba(59,130,246,0.05))"
        : "linear-gradient(135deg, rgba(14,159,113,0.06), rgba(37,99,235,0.04))",
      border: `1px solid ${G.isDark ? "rgba(16,185,129,0.2)" : "rgba(14,159,113,0.18)"}`,
      borderRadius: 16,
      padding: "22px 20px",
      marginBottom: 20,
      fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)",
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 11, flexShrink: 0,
          background: G.isDark ? "rgba(16,185,129,0.12)" : "rgba(14,159,113,0.10)",
          border: `1.5px solid ${G.isDark ? "rgba(16,185,129,0.28)" : "rgba(14,159,113,0.24)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke={G.green2} strokeWidth={2}>
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
        </div>
        <div>
          <h3 style={{ color: G.text, fontSize: 15, fontWeight: 700, margin: "0 0 4px", letterSpacing: "-0.2px" }}>
            Action Required — Introductory Letter
          </h3>
          <p style={{ color: G.textSub, fontSize: 13, margin: 0, lineHeight: 1.55 }}>
            Thank you for applying for a loan with us. To proceed to the next step of your loan application, please share the link below with your{" "}
            <strong style={{ color: G.text }}>HR department</strong> or any authorised person at your place of employment. The person must upload a stamped introductory letter recognising your employment.
          </p>
        </div>
      </div>

      <div style={{
        background: G.isDark ? "rgba(0,0,0,0.35)" : "rgba(13,31,23,0.04)",
        border: `1px solid ${G.border}`,
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        marginTop: 6,
      }}>
        <code style={{
          flex: 1,
          padding: "11px 14px",
          fontSize: 12.5,
          color: G.isDark ? "#94a3b8" : "#475569",
          fontFamily: "var(--font-mono,'JetBrains Mono',monospace)",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "block",
        }}>
          {shareableLink}
        </code>
        <button
          onClick={handleCopy}
          style={{
            flexShrink: 0,
            padding: "11px 16px",
            background: copied ? "rgba(52,211,153,0.15)" : (G.isDark ? "rgba(16,185,129,0.12)" : "rgba(14,159,113,0.10)"),
            border: "none",
            borderLeft: `1px solid ${G.border}`,
            cursor: "pointer",
            color: copied ? "#34D399" : G.green2,
            fontSize: 12.5,
            fontWeight: 700,
            fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)",
            transition: "all 0.2s",
            whiteSpace: "nowrap",
          }}
        >
          {copied ? "✓ Copied!" : "Copy Link"}
        </button>
      </div>

      <p style={{ color: G.muted, fontSize: 12, lineHeight: 1.55, margin: "10px 0 0" }}>
        Once your HR has uploaded the letter, our team will review it and proceed with your application.
      </p>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   ON-SITE VERIFICATION GATE
═══════════════════════════════════════════════════════════════ */
function OnSiteVerificationGate({ address, requirements, allowSigning, onSign }) {
  const G = useG()
  const { btnGreen } = useButtonStyles()
  return (
    <div className="page-content">
      <div className="container-fluid">
        <div style={{ position: "relative", marginBottom: 20 }}>
          <div style={{
            borderRadius: 16, border: `1px solid ${G.border}`,
            background: G.dim, padding: "32px 24px",
            filter: "blur(3px)", pointerEvents: "none", userSelect: "none",
            opacity: 0.35, minHeight: 180, display: "flex", flexDirection: "column", gap: 12,
          }}>
            {[100, 80, 90, 65, 75].map((w, i) => (
              <div key={i} style={{ height: 12, borderRadius: 6, background: G.isDark ? "rgba(255,255,255,0.15)" : "rgba(13,31,23,0.12)", width: `${w}%` }} />
            ))}
            <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
              <div style={{ height: 40, width: 120, borderRadius: 10, background: "rgba(16,185,129,0.3)" }} />
              <div style={{ height: 40, width: 120, borderRadius: 10, background: G.isDark ? "rgba(255,255,255,0.1)" : "rgba(13,31,23,0.08)" }} />
            </div>
          </div>

          <div style={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            padding: "0 24px", textAlign: "center",
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: 16, marginBottom: 16,
              background: "linear-gradient(135deg,rgba(245,158,11,0.2),rgba(245,158,11,0.08))",
              border: "1.5px solid rgba(245,158,11,0.35)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width={26} height={26} fill="none" viewBox="0 0 24 24" stroke="#FBBF24" strokeWidth={2}>
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
            </div>
            <h3 style={{ color: G.text, fontSize: 17, fontWeight: 700, margin: "0 0 10px", letterSpacing: "-0.2px" }}>
              In-Person Verification Required
            </h3>
            <p style={{ color: G.textSub, fontSize: 13.5, lineHeight: 1.65, margin: "0 0 8px", maxWidth: 480 }}>
              To finalise your application, you must come to our office at:
            </p>
            <div style={{
              background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)",
              borderRadius: 10, padding: "10px 18px",
              color: "#B45309", fontSize: 14, fontWeight: 600,
              marginBottom: requirements ? 12 : 20, maxWidth: 520,
            }}>
              📍 {address || "Our main branch — please contact us for the address."}
            </div>
            {requirements && (
              <div style={{
                background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.22)",
                borderRadius: 10, padding: "10px 18px",
                color: G.isDark ? "#93C5FD" : "#1D4ED8", fontSize: 13, lineHeight: 1.6, marginBottom: 20, maxWidth: 520,
              }}>
                <strong style={{ display: "block", marginBottom: 4 }}>Please bring with you:</strong>
                {requirements}
              </div>
            )}
            {allowSigning ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div style={{
                  background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)",
                  borderRadius: 10, padding: "10px 16px",
                  color: G.isDark ? "#6EE7B7" : "#047857", fontSize: 12.5, textAlign: "center", marginBottom: 6, maxWidth: 420,
                }}>
                  ✓ Your officer has verified your visit. You may now proceed to sign your documents.
                </div>
                <button onClick={onSign} style={{ ...btnGreen, fontSize: 14, padding: "12px 28px" }}>
                  Proceed to Sign Documents →
                </button>
              </div>
            ) : (
              <div style={{
                background: G.dim, border: `1px solid ${G.border}`,
                borderRadius: 10, padding: "10px 16px", color: G.muted, fontSize: 12.5, maxWidth: 420,
              }}>
                Once you have visited us, your loan officer will unlock document signing.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   LOAN TYPE MODAL (used only once the user already has 1+ loans
   and wants to apply for another)
═══════════════════════════════════════════════════════════════ */
function LoanTypeModal({ isOpen, onClose, constants, onSelectType }) {
  const G = useG()
  const [closing, setClosing] = useState(false)

  const handleClose = () => {
    setClosing(true)
    setTimeout(() => { setClosing(false); onClose() }, 260)
  }

  if (!isOpen) return null

  const loanTypes = constants?.loanCategoriesIds || []
  const defaultTypes = [
    { id: "personal", label: "Salary Loan", desc: "Repaid via payroll deduction", icon: <SalaryIco /> },
    { id: "asset", label: "Asset-Based Loan", desc: "Secured against vehicle, property, land", icon: <AssetIco /> },
  ]
  const displayTypes = loanTypes.length > 0
    ? loanTypes.map(lt => ({ id: lt.id || lt, label: lt.name || lt, desc: lt.description || "", icon: <LoanIco size={20} /> }))
    : defaultTypes

  return (
    <div
      onClick={handleClose}
      style={{
        position: "fixed", inset: 0, zIndex: 999,
        background: "rgba(3,10,6,0.78)",
        backdropFilter: "blur(7px)", WebkitBackdropFilter: "blur(7px)",
        display: "flex", alignItems: "flex-end", justifyContent: "center",
        animation: closing ? "ltm-fadeOut 0.26s ease forwards" : "ltm-fadeIn 0.22s ease",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: 520,
          background: G.isDark ? "linear-gradient(180deg,#071A10 0%,#040D07 100%)" : "linear-gradient(180deg,#FFFFFF 0%,#F3F8F4 100%)",
          borderTop: `1px solid ${G.isDark ? "rgba(16,185,129,0.22)" : "rgba(14,159,113,0.2)"}`,
          borderRadius: "20px 20px 0 0",
          padding: "28px 20px 40px",
          boxShadow: G.isDark ? "0 -16px 60px rgba(0,0,0,0.58), 0 -2px 16px rgba(5,150,105,0.08)" : "0 -16px 50px rgba(13,31,23,0.18)",
          animation: closing ? "ltm-slideDown 0.26s ease forwards" : "ltm-slideUp 0.32s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div style={{ width: 36, height: 4, borderRadius: 100, background: G.isDark ? "rgba(255,255,255,0.1)" : "rgba(13,31,23,0.12)", margin: "0 auto 24px" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, flexShrink: 0, background: G.isDark ? "rgba(16,185,129,0.12)" : "rgba(14,159,113,0.10)", border: `1px solid ${G.isDark ? "rgba(16,185,129,0.22)" : "rgba(14,159,113,0.2)"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke={G.green2} strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          </div>
          <h2 style={{ fontFamily: "var(--font-display,'DM Serif Display',serif)", fontSize: 22, color: G.text, fontWeight: 400, margin: 0 }}>
            New Loan Application
          </h2>
        </div>
        <p style={{ color: G.muted, fontSize: 13, margin: "0 0 22px", paddingLeft: 44 }}>Select the loan type to get started</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {displayTypes.map((type, i) => (
            <button
              key={type.id}
              onClick={() => { onSelectType(type); handleClose() }}
              style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "16px 18px",
                background: G.isDark ? "rgba(16,185,129,0.05)" : "rgba(14,159,113,0.05)",
                border: `1px solid ${G.isDark ? "rgba(16,185,129,0.13)" : "rgba(14,159,113,0.15)"}`,
                borderRadius: 14, cursor: "pointer", width: "100%", textAlign: "left",
                fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)",
                transition: "all 0.18s",
                animation: `ltm-slideUp 0.32s cubic-bezier(0.22,1,0.36,1) ${i * 0.06}s both`,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = G.isDark ? "rgba(16,185,129,0.10)" : "rgba(14,159,113,0.09)"; e.currentTarget.style.borderColor = G.isDark ? "rgba(16,185,129,0.28)" : "rgba(14,159,113,0.3)"; e.currentTarget.style.transform = "translateX(2px)" }}
              onMouseLeave={e => { e.currentTarget.style.background = G.isDark ? "rgba(16,185,129,0.05)" : "rgba(14,159,113,0.05)"; e.currentTarget.style.borderColor = G.isDark ? "rgba(16,185,129,0.13)" : "rgba(14,159,113,0.15)"; e.currentTarget.style.transform = "none" }}
            >
              <div style={{ width: 42, height: 42, borderRadius: 12, flexShrink: 0, background: "linear-gradient(135deg,rgba(5,150,105,0.22),rgba(16,185,129,0.07))", border: `1px solid ${G.isDark ? "rgba(16,185,129,0.18)" : "rgba(14,159,113,0.2)"}`, display: "flex", alignItems: "center", justifyContent: "center", color: G.green2 }}>
                {type.icon}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ color: G.text, fontSize: 15, fontWeight: 600, margin: "0 0 3px" }}>{type.label}</p>
                {type.desc && <p style={{ color: G.muted, fontSize: 12, margin: 0, lineHeight: 1.4 }}>{type.desc}</p>}
              </div>
              <svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke={G.isDark ? "rgba(16,185,129,0.45)" : "rgba(14,159,113,0.5)"} strokeWidth={2.2}><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          ))}
        </div>

        <button
          onClick={handleClose}
          style={{ width: "100%", marginTop: 16, padding: "13px", background: "transparent", border: `1px solid ${G.border}`, borderRadius: 12, color: G.muted, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)", transition: "all 0.18s" }}
          onMouseEnter={e => { e.currentTarget.style.color = G.textSub; e.currentTarget.style.borderColor = G.isDark ? "rgba(255,255,255,0.14)" : "rgba(13,31,23,0.18)" }}
          onMouseLeave={e => { e.currentTarget.style.color = G.muted; e.currentTarget.style.borderColor = G.border }}
        >
          Cancel
        </button>
      </div>
      <style>{`
        @keyframes ltm-fadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes ltm-fadeOut { from{opacity:1} to{opacity:0} }
        @keyframes ltm-slideUp   { from{transform:translateY(100%)} to{transform:translateY(0)} }
        @keyframes ltm-slideDown { from{transform:translateY(0)} to{transform:translateY(100%)} }
      `}</style>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   DASHBOARD SHELL
═══════════════════════════════════════════════════════════════ */
function DashboardShell({ loggedInUser, constants, loans, loansLoading, onApplyClick }) {
  const G = useG()
  const { btnGreen, btnOutline } = useButtonStyles()
  const user = loggedInUser.user
  const firstName = user?.fullnames?.split(" ")[0] || user?.details?.firstname || "there"
  const initials = user?.fullnames
    ? user.fullnames.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : "VF"

  const currentLoan = user?.currentLoan || loans[0] || null
  const loanStatus = currentLoan?.loanStatus || null
  const outstanding = currentLoan?.outstandingAmount || 0
  const repayAmt = currentLoan?.repaymentAmount || 0
  const paidSoFar = repayAmt > 0 ? Math.max(0, repayAmt - outstanding) : 0
  const progress = repayAmt > 0 ? Math.min(100, (paidSoFar / repayAmt) * 100) : 0

  const hasMultipleLoans = loans.length > 1

  return (
    <div style={{ minHeight: "100vh", background: G.page, paddingTop: 72, paddingBottom: 88, position: "relative", overflowX: "hidden" }}>
      <div style={{
        position: "fixed", inset: 0,
        background: G.isDark
          ? `radial-gradient(ellipse 90% 50% at 50% -5%, rgba(16,185,129,0.13) 0%, transparent 65%), radial-gradient(ellipse 60% 40% at 85% 85%, rgba(5,150,105,0.08) 0%, transparent 60%)`
          : `radial-gradient(ellipse 90% 50% at 50% -5%, rgba(14,159,113,0.10) 0%, transparent 65%), radial-gradient(ellipse 60% 40% at 85% 85%, rgba(184,146,42,0.05) 0%, transparent 60%)`,
        pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{ position: "fixed", inset: 0, backgroundImage: `radial-gradient(${G.isDark ? "rgba(255,255,255,0.025)" : "rgba(13,31,23,0.035)"} 1px, transparent 1px)`, backgroundSize: "28px 28px", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1080, margin: "0 auto", padding: "0 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24, animation: "vfSlideUp 0.45s cubic-bezier(.22,1,.36,1)" }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg,rgba(16,185,129,0.25),rgba(5,150,105,0.1))", border: `1.5px solid ${G.isDark ? "rgba(16,185,129,0.35)" : "rgba(14,159,113,0.3)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontFamily: "var(--font-display,'DM Serif Display',serif)", fontSize: 17, color: G.green3, fontWeight: 400 }}>{initials}</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ margin: 0, fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: G.muted }}>Welcome back</p>
            <h1 style={{ margin: 0, fontFamily: "var(--font-display,'DM Serif Display',serif)", fontSize: "clamp(20px,5vw,28px)", color: G.text, lineHeight: 1.15 }}>{firstName}</h1>
          </div>
          <button onClick={onApplyClick} style={{ ...btnGreen, fontSize: 13, padding: "10px 18px" }}>+ Apply</button>
        </div>

        {hasMultipleLoans && (
          loansLoading ? <StatSkeleton /> : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12, marginBottom: 24 }} className="vf-stats-grid">
              <StatCard label="Active Loans" value={loans.filter(l => !["completed", "defaulted", "rejected"].includes(l.loanStatus)).length} icon={<LoanIco />} accent={G.green2} />
              <StatCard label="Outstanding" value={outstanding > 0 ? `K${fmt(outstanding)}` : "K0.00"} icon={<DebtIco />} accent={outstanding > 0 ? G.red : G.green3} mono />
              <StatCard label="Total Borrowed" value={loans.length ? `K${fmt(loans.reduce((s, l) => s + (l.loanAmount || 0), 0))}` : "K0.00"} icon={<WalletIco />} accent={G.blue} mono />
              <StatCard label="Completed" value={loans.filter(l => l.loanStatus === "completed").length} icon={<CheckIco />} accent={G.green3} />
            </div>
          )
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }} className="vf-main-grid">
          <div>
            <SectionLabel>Current Loan</SectionLabel>
            {loansLoading
              ? <Skel height={240} />
              : currentLoan
                ? <ActiveLoanCard loan={currentLoan} progress={progress} paidSoFar={paidSoFar} onApplyClick={onApplyClick} />
                : <EmptyLoan onApplyClick={onApplyClick} />
            }
          </div>

          {hasMultipleLoans && (
            <div>
              <SectionLabel>All Loans</SectionLabel>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {loans.slice(0, 5).map((loan, i) => <LoanRow key={loan.id} loan={loan} i={i} />)}
                {loans.length > 5 && (
                  <Link href="/loans" style={{ textAlign: "center", color: G.green2, fontSize: 13, fontWeight: 600, textDecoration: "none", padding: "10px 0" }}>
                    View all {loans.length} loans →
                  </Link>
                )}
              </div>
            </div>
          )}

          <div>
            <SectionLabel>Quick Actions</SectionLabel>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10 }} className="vf-actions-grid">
              <QuickAction onClick={onApplyClick} icon={<LoanIco size={18} />} label="Apply for Loan" desc="Funds in 24hrs" />
              <QuickAction href="/profile" icon={<UserIco size={18} />} label="My Profile" desc="Personal details" />
              <QuickAction href="/business-profile" icon={<BriefIco size={18} />} label="Business Profile" desc="Company loans" />
              <QuickAction href="/mydocuments" icon={<DocIco size={18} />} label="My Documents" desc="View & download" />
            </div>
          </div>

          <div>
            <SectionLabel>Profile Status</SectionLabel>
            <ProfileStatus user={user} />
          </div>

          {loanStatus && (
            <div>
              <SectionLabel>Loan Status</SectionLabel>
              <StatusExplainer status={loanStatus} />
            </div>
          )}
        </div>
      </div>
      <style>{css(G)}</style>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   MAIN HOME COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function Home() {
  const [showLoanApplicationForms, setShowLoanApplicationForms] = useState(false)
  const [showInvestMentForms, setshowInvestMentForms] = useState(false)
  const [selectedloanCategory, setSelectedloanCategory] = useState(null)
  const [currentLoanWithSessionLetterStuff, setCurrentLoanWithSessionLetterStuff] = useState(null)
  const [showLoanTypeModal, setShowLoanTypeModal] = useState(false)
  const [loans, setLoans] = useState([])
  const [loansLoading, setLoansLoading] = useState(true)

  // On-site verification state
  const [currentLoanType, setCurrentLoanType] = useState(null)
  const [loanTypeLoading, setLoanTypeLoading] = useState(false)
  const [allowUserToSignLoanDocuments, setAllowUserToSignLoanDocuments] = useState(false)
  const [proceedToSigningForms, setProceedToSigningForms] = useState(false)

  // Salary component ID — used to build the HR introductory-letter upload link
  const [salaryId, setSalaryId] = useState(null)

  const { BottomNavLink } = useBottomNav()
  const loggedInUser = useUser()
  const constants = useConstants()
  const { setPage } = usePage()

  setPage("/")
  scrolltoTopOFPage()

  /* ── fetch all loans for dashboard stats ── */
  useEffect(() => {
    if (!loggedInUser?.user?.id) return
    const run = async () => {
      setLoansLoading(true)
      try {
        const all = await getLoansFromClientId(loggedInUser.user.id)
        setLoans(Array.isArray(all) ? all : [])
      } catch (_) { }
      setLoansLoading(false)
    }
    run()
  }, [loggedInUser?.user?.id])

  /* ── session letter check ── */
  useEffect(() => {
    const runSetCurrentLoanWithSessionLetterStuff = async () => {
      const currentLoan = await getLoanFromId(
        loggedInUser.user.currentLoan.id,
        "collateral,collateral.vehicle,collateral.vehicle.sessionLetterTemplate,collateral.vehicle.sessionLetter"
      )
      const { collateral } = currentLoan
      const { vehicle } = collateral || {}
      if (collateral && collateral.collateralType === "vehicle") {
        if (vehicle && vehicle.insuranceType && (vehicle.insuranceType === "third-party" || vehicle.insuranceType === "comprehensive")) {
          if (currentLoan.insuranceRequest && currentLoan.insuranceRequest === "African Gray") {
            return
          } else {
            setCurrentLoanWithSessionLetterStuff(currentLoan)
          }
        }
      }
    }
    if (loggedInUser?.user?.currentLoan) {
      runSetCurrentLoanWithSessionLetterStuff()
    }
  }, [loggedInUser?.user?.currentLoan])

  /* ── fetch loan type + signing permission ──────────────────────────────────
     Runs for "accepted", "initiated", and "request-approval" so we always know
     whether this is a salary loan early enough to show the introductory-letter
     prompt during the initiated stage.
  ─────────────────────────────────────────────────────────────────────────── */
  useEffect(() => {
    const currentLoan = loggedInUser?.user?.currentLoan
    const relevantStatuses = ["accepted", "initiated", "request-approval"]
    if (!currentLoan || !relevantStatuses.includes(currentLoan.loanStatus)) return

    const fetchLoanTypeAndSignPermission = async () => {
      setLoanTypeLoading(true)
      try {
        const loanWithType = await getLoanFromId(currentLoan.id, "loanType")
        const typeName = loanWithType?.loanType?.data?.attributes?.typeName || "assetBased"
        setCurrentLoanType(typeName)

        // Signing permission is only needed once the loan is accepted
        if (currentLoan.loanStatus === "accepted") {
          const signingAllowed =
            (loanWithType?.allowUserToSignLoanDocuments || false) &&
            loanWithType?.allowUserToSignLoanDocuments === true
          setAllowUserToSignLoanDocuments(signingAllowed)
        }

        // Capture salary component ID so we can build the HR upload link
        if (typeName === "salaryBased") {
          const sid = loggedInUser?.user?.salary?.id || null
          setSalaryId(sid)
        }
      } catch (_) {
        setCurrentLoanType("assetBased")
        setAllowUserToSignLoanDocuments(false)
      }
      setLoanTypeLoading(false)
    }

    fetchLoanTypeAndSignPermission()
    setProceedToSigningForms(false)
  }, [loggedInUser?.user?.currentLoan?.id, loggedInUser?.user?.currentLoan?.loanStatus])

  /* ── derived: does this loan require on-site verification? ── */
  const loansInformation = constants?.loansInformation || {}
  const requireOnSiteForSalary = loansInformation.requireUserToComeOnSiteForSalaryLoanVerification === true
  const requireOnSiteForAsset = loansInformation.requireUserToComeOnSiteForAssetLoanVerification === true
  const isSalaryLoan = currentLoanType === "salaryBased"
  const requireOnSite = isSalaryLoan ? requireOnSiteForSalary : requireOnSiteForAsset

  /* ── apply button → open loan type modal (only used once user has 1+ loans) ── */
  const handleApplyClick = () => setShowLoanTypeModal(true)

  const handleLoanTypeSelected = (type) => {
    setSelectedloanCategory(type.id || type)
    setShowLoanTypeModal(false)
    setShowLoanApplicationForms(true)
  }

  /* ── "Grow with us" direct select — skips the modal entirely ── */
  const handleGrowWithUsTypeSelected = (type) => {
    setSelectedloanCategory(type.id || type)
    setShowLoanApplicationForms(true)
  }

  /* ─────────────────────────────────────────────────────────────
     showApplyButtons
     - If the user has never had a loan: show "Grow with us" with
       the type buttons directly (no Apply button, no modal).
     - If the user already has at least one loan: show the full
       dashboard shell (with its own +Apply → modal flow).
  ───────────────────────────────────────────────────────────── */
  const showApplyButtons = () => {
    const hasEverHadLoan = loans.length > 0

    if (!hasEverHadLoan && !loansLoading) {
      return (
        <GrowWithUs
          constants={constants}
          onSelectType={handleGrowWithUsTypeSelected}
        />
      )
    }

    return (
      <>
        <DashboardShell
          loggedInUser={loggedInUser}
          constants={constants}
          loans={loans}
          loansLoading={loansLoading}
          onApplyClick={handleApplyClick}
        />
        <LoanTypeModal
          isOpen={showLoanTypeModal}
          onClose={() => setShowLoanTypeModal(false)}
          constants={constants}
          onSelectType={handleLoanTypeSelected}
        />
      </>
    )
  }

  /* ─────────────────────────────────────────────────────────────
     showSessionLetter
  ───────────────────────────────────────────────────────────── */
  const showSessionLetter = () => {
    const currentLoan = currentLoanWithSessionLetterStuff
    const { collateral } = currentLoan
    const { vehicle } = collateral

    if (vehicle.sessionLetter && vehicle.sessionLetter.data) return null

    if (!(vehicle.sessionLetterTemplate && vehicle.sessionLetterTemplate.data)) {
      return (
        <div style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(245,158,11,0.10)", border: "1px solid rgba(245,158,11,0.25)", color: "#B45309", fontSize: 13.5, lineHeight: 1.5, marginTop: 10, display: "flex", gap: 10 }}>
          <span style={{ fontSize: 16, flexShrink: 0 }}>⚠</span>
          <span>We shall send you a message when the session letter template has been uploaded, along with instructions on what to do next. Thank you.</span>
        </div>
      )
    }
    return (
      <div style={{ width: "100%", textAlign: "center", marginTop: 10 }}>
        <FileDownload files={vehicle.sessionLetterTemplate} backEndUrl={backEndUrl} fileDisplayName="Session Letter Template" />
        <div style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "16px 0" }} />
        <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 4px" }}>Upload Session Letter</h3>
        <p style={{ fontSize: 12, margin: "0 0 12px", lineHeight: 1.5 }}>
          Stamped and signed by your insurance company — download the template and present it to your insurer first.
        </p>
        <Uploader
          refId={currentLoan.collateral.vehicle.id}
          refName="media-and-documents.vehicle"
          fieldName="sessionLetter"
          allowMultiple={false}
          allowedTypes={["image/*", "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]}
        />
      </div>
    )
  }

  /* ─────────────────────────────────────────────────────────────
     renderAcceptedState
  ───────────────────────────────────────────────────────────── */
  const renderAcceptedState = () => {
    const user = loggedInUser.user

    if (loanTypeLoading) {
      return (
        <div className="page-content">
          <div className="container-fluid">
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "24px 0", fontSize: 14 }}>
              <div style={{ width: 18, height: 18, border: "2px solid #10B981", borderTopColor: "transparent", borderRadius: "50%", animation: "vfSpin 0.7s linear infinite" }} />
              Checking loan requirements…
            </div>
          </div>
          <style>{`@keyframes vfSpin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )
    }

    if (requireOnSite && !proceedToSigningForms && !allowUserToSignLoanDocuments) {
      return (
        <OnSiteVerificationGate
          address={loansInformation.address}
          requirements={loansInformation.userRequirementsToBrinOnSite}
          allowSigning={allowUserToSignLoanDocuments}
          onSign={() => setProceedToSigningForms(true)}
          signingMethod={user.signingMethod}
          loggedInUser={user}
          constants={constants}
        />
      )
    }

    return (
      <>
        {user.signingMethod && user.signingMethod === "e-signing"
          ? <div className="page-content"><div className="container-fluid"><ESigningForms loggedInUser={user} constants={constants} /></div></div>
          : <FilledForms loggedInUser={user} constants={constants} />
        }
      </>
    )
  }

  /* ─────────────────────────────────────────────────────────────
     renderMainContent
  ───────────────────────────────────────────────────────────── */
  const renderMainContent = () => {
    const currentInvestment = loggedInUser.user.currentInvestment
    if (currentInvestment) {
      return <><LoanInitiatedDisplay /></>
    } else {
      if (showInvestMentForms) {
        return (
          <div className="page-content">
            <div className="container-fluid">
              <InvestmentForm
                setshowInvestMentForms={setshowInvestMentForms}
                loanCategory="personal"
                loggedInUser={loggedInUser.user}
                constants={constants}
              />
            </div>
          </div>
        )
      }

      const currentLoan = loggedInUser.user.currentLoan

      if (currentLoan) {
        /* ── INITIATED / REQUEST-APPROVAL ─────────────────────────────────── */
        if (currentLoan.loanStatus === "initiated" || currentLoan.loanStatus === "request-approval") {
          // When the setting is on, this is a salary loan, and we have the
          // salary ID, show the HR upload prompt above LoanInitiatedDisplay.
          const requireIntroLetter = (loansInformation.requireIntroductoryLetterSalaryLoan || false) && loansInformation.requireIntroductoryLetterSalaryLoan === true

          if (requireIntroLetter && currentLoanType === "salaryBased" && salaryId) {
            const origin = typeof window !== "undefined" ? window.location.origin : ""
            const shareableLink = `${origin}/upload-introductory-letter?salaryId=${salaryId}`
            return (
              <div className="page-content">
                <div className="container-fluid">
                  <IntroductoryLetterPrompt shareableLink={shareableLink} />
                  <LoanInitiatedDisplay />
                </div>
              </div>
            )
          }

          return <LoanInitiatedDisplay />
        }

        else if (currentLoan.loanStatus === "pending-collateral-addition") {
          return <CollateralForm loggedInUser={loggedInUser.user} constants={constants} />
        }

        else if (currentLoan.loanStatus === "pending-collateral-inspection" || currentLoan.loanStatus === "collateral-inspection") {
          return (
            <div className="page-content">
              <div className="container-fluid">
                <InfoBanner type="info">Thank you for applying for a loan with us, we are currently processing the loan, an agent will call you to proceed with inspection of your collateral.</InfoBanner>
                {currentLoanWithSessionLetterStuff ? showSessionLetter() : null}
              </div>
            </div>
          )
        }

        else if (currentLoan.loanStatus === "accepted") {
          return renderAcceptedState()
        }

        else if (currentLoan.loanStatus === "pending-approval") {
          return (
            <div className="page-content">
              <div className="container-fluid">
                <InfoBanner type="info">Thank you for completing the requested steps, we are currently processing the loan, an agent will call you.</InfoBanner>
              </div>
            </div>
          )
        }

        else if (currentLoan.loanStatus === "approved") {
          return (
            <div className="page-content">
              <div className="container-fluid">
                <InfoBanner type="success">Congratulations!! Your loan has been approved, awaiting disbursement of funds.</InfoBanner>
              </div>
            </div>
          )
        }

        else if (currentLoan.loanStatus === "rejected") {
          return (
            showLoanApplicationForms
              ? <LoanApplicationForm setShowLoanApplicationForms={setShowLoanApplicationForms} loanCategory={selectedloanCategory} loggedInUser={loggedInUser.user} constants={constants} />
              : <>
                <div className="page-content">
                  <div className="container-fluid">
                    <InfoBanner type="warning">Sorry but we cannot grant you a loan at the moment, apply again if you feel that your eligibility has to be reassessed.</InfoBanner>
                  </div>
                </div>
                {showApplyButtons()}
              </>
          )
        }

        else if (currentLoan.loanStatus === "disbursed") {
          return <LoanInformationDisplay loggedInUser={loggedInUser.user} constants={constants} />
        }

        else if (currentLoan.loanStatus === "defaulted") {
          return (
            <>
              <div className="page-content">
                <div className="container-fluid">
                  <InfoBanner type="error">It appears your loan has been defaulted, pay the balance in full, lest appropriate legal action be taken.</InfoBanner>
                </div>
              </div>
              <LoanInformationDisplay loggedInUser={loggedInUser.user} constants={constants} />
            </>
          )
        }

        else if (currentLoan.loanStatus === "completed") {
          return (
            showLoanApplicationForms
              ? <LoanApplicationForm setShowLoanApplicationForms={setShowLoanApplicationForms} loanCategory={selectedloanCategory} loggedInUser={loggedInUser.user} constants={constants} />
              : <>
                <div className="page-content">
                  <div className="container-fluid">
                    <InfoBanner type="success">Thank you for completing payment of your loan, you can now apply for another one.</InfoBanner>
                  </div>
                </div>
                {showApplyButtons()}
              </>
          )
        }

        else {
          return (
            showLoanApplicationForms
              ? <LoanApplicationForm setShowLoanApplicationForms={setShowLoanApplicationForms} loanCategory={selectedloanCategory} loggedInUser={loggedInUser.user} constants={constants} />
              : <>{showApplyButtons()}</>
          )
        }

      } else {
        return (
          showLoanApplicationForms
            ? <LoanApplicationForm setShowLoanApplicationForms={setShowLoanApplicationForms} loanCategory={selectedloanCategory} loggedInUser={loggedInUser.user} constants={constants} />
            : <>{showApplyButtons()}</>
        )
      }
    }
  }

  /* ─────────────────────────────────────────────────────────────
     renderPages
  ───────────────────────────────────────────────────────────── */
  const renderPages = (bnl) => {
    if (!loggedInUser.status) {
      if (typeof window !== "undefined") window.location = "/signin"
    } else {
      if (!bnl || parseInt(bnl) === 0) {
        return renderMainContent()
      } else if (parseInt(bnl) === 1) {
        return (
          <div className="page-content">
            <div className="container-fluid">
              <LoanTransactionHistory loggedInUser={loggedInUser.user} />
            </div>
          </div>
        )
      } else {
        return (
          <div className="page-content">
            <div className="container-fluid">
              <HelpPageDisplay loggedInUser={loggedInUser.user} constants={constants} />
            </div>
          </div>
        )
      }
    }
  }

  return <>{renderPages(BottomNavLink)}</>
}

/* ═══════════════════════════════════════════════════════════════
   INFO BANNER
═══════════════════════════════════════════════════════════════ */
function InfoBanner({ type, children }) {
  const G = useG()
  const configsDark = {
    info: { bg: "rgba(59,130,246,0.10)", border: "rgba(59,130,246,0.25)", color: "#93C5FD", icon: "ℹ" },
    success: { bg: "rgba(16,185,129,0.10)", border: "rgba(16,185,129,0.25)", color: "#6EE7B7", icon: "✓" },
    warning: { bg: "rgba(245,158,11,0.10)", border: "rgba(245,158,11,0.25)", color: "#FCD34D", icon: "⚠" },
    error: { bg: "rgba(220,38,38,0.10)", border: "rgba(220,38,38,0.25)", color: "#FCA5A5", icon: "✕" },
  }
  const configsLight = {
    info: { bg: "rgba(37,99,235,0.07)", border: "rgba(37,99,235,0.2)", color: "#1D4ED8", icon: "ℹ" },
    success: { bg: "rgba(14,159,113,0.07)", border: "rgba(14,159,113,0.2)", color: "#047857", icon: "✓" },
    warning: { bg: "rgba(217,119,6,0.08)", border: "rgba(217,119,6,0.22)", color: "#B45309", icon: "⚠" },
    error: { bg: "rgba(220,38,38,0.07)", border: "rgba(220,38,38,0.22)", color: "#B91C1C", icon: "✕" },
  }
  const c = (G.isDark ? configsDark : configsLight)[type] || (G.isDark ? configsDark.info : configsLight.info)
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "14px 16px", borderRadius: 12, background: c.bg, border: `1px solid ${c.border}`, color: c.color, fontSize: 13.5, lineHeight: 1.5, marginBottom: 16, fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)" }}>
      <span style={{ fontSize: 16, flexShrink: 0, lineHeight: 1.4 }}>{c.icon}</span>
      <span>{children}</span>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   DASHBOARD SUB-COMPONENTS
═══════════════════════════════════════════════════════════════ */
function StatCard({ label, value, icon, accent, mono }) {
  const G = useG()
  return (
    <div style={{ background: G.dim, border: `1px solid ${G.border}`, borderRadius: 14, padding: "16px 14px", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${accent}, transparent)`, borderRadius: "14px 14px 0 0" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: G.muted }}>{label}</span>
        <div style={{ color: accent, opacity: 0.85 }}>{icon}</div>
      </div>
      <div style={{ fontFamily: mono ? "var(--font-mono,'JetBrains Mono',monospace)" : undefined, fontSize: 20, fontWeight: 700, color: G.text, letterSpacing: "-0.02em" }}>{value}</div>
    </div>
  )
}

function StatSkeleton() {
  const G = useG()
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12, marginBottom: 24 }}>
      {[0, 1, 2, 3].map(i => (
        <div key={i} style={{ height: 88, borderRadius: 14, background: G.dim, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg,transparent,${G.isDark ? "rgba(255,255,255,0.06)" : "rgba(13,31,23,0.05)"},transparent)`, animation: "vfShimmer 1.6s linear infinite" }} />
        </div>
      ))}
    </div>
  )
}

function ActiveLoanCard({ loan, progress, paidSoFar }) {
  const G = useG()
  const { btnGreen, btnOutline } = useButtonStyles()
  const circ = 2 * Math.PI * 38
  const dash = circ - (circ * progress / 100)
  return (
    <div style={{
      background: G.isDark ? "linear-gradient(135deg,rgba(16,185,129,0.12),rgba(5,150,105,0.05))" : "linear-gradient(135deg,rgba(14,159,113,0.09),rgba(5,150,105,0.03))",
      border: `1px solid ${G.isDark ? "rgba(16,185,129,0.22)" : "rgba(14,159,113,0.2)"}`,
      borderRadius: 16, padding: "20px 18px", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: G.isDark ? "rgba(52,211,153,0.7)" : "rgba(5,150,105,0.75)", marginBottom: 4 }}>Loan #{loan.id}</div>
          <div style={{ fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", fontSize: "clamp(22px,6vw,32px)", fontWeight: 700, color: G.text, letterSpacing: "-0.03em" }}>K{fmt(loan.loanAmount || 0)}</div>
        </div>
        <svg width={84} height={84} style={{ flexShrink: 0 }}>
          <circle cx={42} cy={42} r={38} fill="none" stroke={G.dim} strokeWidth={6} />
          <circle cx={42} cy={42} r={38} fill="none" stroke="url(#gGrad)" strokeWidth={6} strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={dash} transform="rotate(-90 42 42)" style={{ transition: "stroke-dashoffset 1s ease" }} />
          <defs><linearGradient id="gGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor={G.green1} /><stop offset="100%" stopColor={G.green3} /></linearGradient></defs>
          <text x={42} y={38} textAnchor="middle" fill={G.green3} fontSize={13} fontFamily="var(--font-mono,'JetBrains Mono',monospace)" fontWeight={700}>{Math.round(progress)}%</text>
          <text x={42} y={52} textAnchor="middle" fill={G.muted} fontSize={8} fontFamily="sans-serif">repaid</text>
        </svg>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 16px", marginBottom: 16 }}>
        <IP label="Outstanding" value={`K${fmt(loan.outstandingAmount || 0)}`} mono />
        <IP label="Term" value={`${loan.loanTerm || "—"} months`} />
        <IP label="Paid So Far" value={`K${fmt(paidSoFar)}`} mono green />
        <IP label="Status" value={<SPill status={loan.loanStatus} />} />
      </div>
      <div style={{ height: 1, background: G.isDark ? "rgba(16,185,129,0.15)" : "rgba(14,159,113,0.18)", margin: "14px 0" }} />
      <div style={{ display: "flex", gap: 10 }}>
        <Link href="/loans" style={{ ...btnGreen, flex: 1, justifyContent: "center", padding: "10px 0", fontSize: 13 }}>Manage</Link>
        <Link href="/mydocuments" style={{ ...btnOutline, flex: 1, justifyContent: "center", padding: "10px 0", fontSize: 13 }}>Documents</Link>
      </div>
    </div>
  )
}

function EmptyLoan({ onApplyClick }) {
  const G = useG()
  const { btnGreen } = useButtonStyles()
  return (
    <div style={{ background: G.dim, border: `1px solid ${G.border}`, borderRadius: 16, padding: "32px 24px", textAlign: "center" }}>
      <div style={{ width: 52, height: 52, borderRadius: 14, background: G.isDark ? "rgba(16,185,129,0.1)" : "rgba(14,159,113,0.08)", border: `1.5px solid ${G.isDark ? "rgba(16,185,129,0.2)" : "rgba(14,159,113,0.18)"}`, margin: "0 auto 14px", display: "flex", alignItems: "center", justifyContent: "center", color: G.green2 }}><LoanIco size={22} /></div>
      <div style={{ fontSize: 15, fontWeight: 600, color: G.text, marginBottom: 6 }}>No Active Loan</div>
      <p style={{ fontSize: 13, color: G.muted, marginBottom: 18, lineHeight: 1.6 }}>Get funds in as little as 24 hours.</p>
      <button onClick={onApplyClick} style={{ ...btnGreen, fontSize: 13, padding: "10px 22px" }}>Apply Now</button>
    </div>
  )
}

function LoanRow({ loan, i }) {
  const G = useG()
  return (
    <Link href="/loans" style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 14px", borderRadius: 12, background: G.dim, border: `1px solid ${G.border}`, textDecoration: "none", transition: "background 0.2s", animation: `vfSlideUp 0.4s ${i * 0.05}s both cubic-bezier(.22,1,.36,1)` }}>
      <div style={{ width: 4, height: 32, borderRadius: 2, flexShrink: 0, background: statusColor(loan.loanStatus) }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: G.text, marginBottom: 1 }}>Loan #{loan.id}</div>
        <div style={{ fontSize: 11, color: G.muted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{loan.loanPurpose || "General Purpose"}</div>
      </div>
      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <div style={{ fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", fontSize: 13, fontWeight: 700, color: G.green2, marginBottom: 3 }}>K{fmt(loan.loanAmount || 0)}</div>
        <SPill status={loan.loanStatus} />
      </div>
    </Link>
  )
}

function QuickAction({ href, onClick, icon, label, desc }) {
  const G = useG()
  const shared = { display: "flex", flexDirection: "column", gap: 10, padding: "14px 12px", borderRadius: 14, background: G.dim, border: `1px solid ${G.border}`, textDecoration: "none", transition: "all 0.2s", cursor: "pointer" }
  const handlers = {
    onMouseEnter: e => { e.currentTarget.style.background = G.isDark ? "rgba(16,185,129,0.07)" : "rgba(14,159,113,0.06)"; e.currentTarget.style.borderColor = G.isDark ? "rgba(16,185,129,0.22)" : "rgba(14,159,113,0.2)" },
    onMouseLeave: e => { e.currentTarget.style.background = G.dim; e.currentTarget.style.borderColor = G.border },
  }
  const inner = (
    <>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: G.isDark ? "rgba(16,185,129,0.1)" : "rgba(14,159,113,0.08)", border: `1px solid ${G.isDark ? "rgba(16,185,129,0.2)" : "rgba(14,159,113,0.18)"}`, display: "flex", alignItems: "center", justifyContent: "center", color: G.green2 }}>{icon}</div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: G.text, marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: 11, color: G.muted }}>{desc}</div>
      </div>
    </>
  )
  if (onClick) return <button onClick={onClick} style={{ ...shared, border: `1px solid ${G.border}` }} {...handlers}>{inner}</button>
  return <Link href={href} style={shared} {...handlers}>{inner}</Link>
}

function ProfileStatus({ user }) {
  const G = useG()
  const checks = [
    { label: "Basic Info", done: !!(user?.details?.firstname && user?.details?.lastname) },
    { label: "Date of Birth", done: !!user?.details?.dateOfBirth },
    { label: "NRC / Passport", done: !!(user?.clientDetails?.idNumber || user?.clientDetails?.IDfront?.length) },
    { label: "Bank Details", done: !!(user?.bankDetails?.accountNumber) },
  ]
  const complete = checks.filter(c => c.done).length
  const pct = Math.round((complete / checks.length) * 100)
  return (
    <div style={{ background: G.dim, border: `1px solid ${G.border}`, borderRadius: 16, padding: "18px 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <span style={{ fontSize: 12, color: G.textSub }}>{complete}/{checks.length} complete</span>
        <span style={{ fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", fontSize: 18, fontWeight: 700, color: pct === 100 ? G.green3 : G.green2 }}>{pct}%</span>
      </div>
      <div style={{ height: 5, background: G.isDark ? "rgba(255,255,255,0.07)" : "rgba(13,31,23,0.07)", borderRadius: 100, marginBottom: 14 }}>
        <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg,${G.green1},${G.green3})`, borderRadius: 100, transition: "width 0.8s ease" }} />
      </div>
      {checks.map(c => (
        <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
          <div style={{ width: 17, height: 17, borderRadius: 5, flexShrink: 0, background: c.done ? "rgba(52,211,153,0.13)" : (G.isDark ? "rgba(255,255,255,0.05)" : "rgba(13,31,23,0.05)"), border: `1.5px solid ${c.done ? "rgba(52,211,153,0.4)" : (G.isDark ? "rgba(255,255,255,0.1)" : "rgba(13,31,23,0.12)")}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {c.done && <svg width={9} height={9} viewBox="0 0 12 12" fill="none"><polyline points="2 6 5 9 10 3" stroke={G.green3} strokeWidth={2} strokeLinecap="round" /></svg>}
          </div>
          <span style={{ fontSize: 12, color: c.done ? G.text : G.muted }}>{c.label}</span>
        </div>
      ))}
      {pct < 100 && (
        <Link href="/profile" style={{ ...useButtonStyles().btnOutline, width: "100%", marginTop: 12, padding: "9px 0", fontSize: 12.5, justifyContent: "center" }}>Complete Profile</Link>
      )}
    </div>
  )
}

function StatusExplainer({ status }) {
  const G = useG()
  const map = {
    "initiated": { color: "#D97706", msg: "Your application has been initiated. Complete your profile and add collateral." },
    "pending-collateral-addition": { color: "#D97706", msg: "Please add your collateral information to continue." },
    "pending-collateral-inspection": { color: "#D97706", msg: "Your collateral is pending inspection by our team." },
    "collateral-inspection": { color: "#7C3AED", msg: "An inspector is reviewing your collateral." },
    "request-approval": { color: "#4F46E5", msg: "Your officer has submitted your application for management approval." },
    "accepted": { color: G.green3, msg: "Congratulations! Loan accepted. Please review and sign your loan documents." },
    "pending-approval": { color: "#7C3AED", msg: "Your documents are being processed. Funds will be disbursed soon." },
    "approved": { color: G.green2, msg: "Fully approved. Disbursement is being processed." },
    "disbursed": { color: G.blue, msg: "Funds sent! Check your repayment schedule." },
    "completed": { color: G.muted, msg: "This loan has been fully repaid. Thank you!" },
    "rejected": { color: G.red, msg: "Loan declined. You may re-apply or contact us for more details." },
    "defaulted": { color: "#DC2626", msg: "This loan is in default. Please contact us immediately." },
  }
  const { color, msg } = map[status] || { color: G.muted, msg: "Current loan status." }
  return (
    <div style={{ padding: "14px 16px", borderRadius: 12, background: `${color}14`, border: `1px solid ${color}33` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 7 }}>
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: color, flexShrink: 0 }} />
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color }}>{status}</span>
      </div>
      <p style={{ fontSize: 12.5, color: G.textSub, lineHeight: 1.6, margin: 0 }}>{msg}</p>
    </div>
  )
}

function IP({ label, value, mono, green }) {
  const G = useG()
  return (
    <div>
      <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: G.muted, marginBottom: 3 }}>{label}</div>
      <div style={{ fontFamily: mono ? "var(--font-mono,'JetBrains Mono',monospace)" : undefined, fontSize: 13.5, fontWeight: 500, color: green ? G.green3 : G.text }}>{value}</div>
    </div>
  )
}

function SectionLabel({ children }) {
  const G = useG()
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
      <div style={{ width: 3, height: 14, borderRadius: 2, background: `linear-gradient(180deg,${G.green1},${G.green3})` }} />
      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: G.muted }}>{children}</span>
    </div>
  )
}

function SPill({ status }) {
  const G = useG()
  const colors = {
    "initiated": "#D97706", "pending-collateral-addition": "#D97706", "pending-collateral-inspection": "#D97706",
    "collateral-inspection": "#7C3AED", "request-approval": "#4F46E5", "accepted": G.green3,
    "pending-approval": "#7C3AED", "approved": G.green2, "disbursed": G.blue,
    "completed": G.muted, "rejected": G.red, "defaulted": "#DC2626",
  }
  const c = colors[status] || G.muted
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 100, background: `${c}1c`, color: c, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: c, flexShrink: 0 }} />
      {status}
    </span>
  )
}

function Skel({ height }) {
  const G = useG()
  return (
    <div style={{ height, borderRadius: 14, background: G.dim, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(90deg,transparent,${G.isDark ? "rgba(255,255,255,0.055)" : "rgba(13,31,23,0.045)"},transparent)`, animation: "vfShimmer 1.6s linear infinite" }} />
    </div>
  )
}

/* ─── icons ─────────────────────────────────────────────────── */
function LoanIco({ size = 17 }) { return <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg> }
function DebtIco({ size = 17 }) { return <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg> }
function WalletIco({ size = 17 }) { return <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><path d="M20 12V8a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2v-4" /><circle cx="17" cy="12" r="1.5" /></svg> }
function CheckIco({ size = 17 }) { return <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><polyline points="20 6 9 17 4 12" /></svg> }
function UserIco({ size = 17 }) { return <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg> }
function BriefIco({ size = 17 }) { return <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /></svg> }
function DocIco({ size = 17 }) { return <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="16" y2="17" /></svg> }
function SalaryIco() { return <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /><line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" /></svg> }
function AssetIco() { return <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg> }

/* ─── helpers ───────────────────────────────────────────────── */
function fmt(n) { return parseFloat(n).toLocaleString("en-ZM", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }
function statusColor(s) {
  const m = { initiated: "#D97706", "pending-collateral-addition": "#D97706", "pending-collateral-inspection": "#D97706", "collateral-inspection": "#7C3AED", "request-approval": "#4F46E5", accepted: "#34D399", "pending-approval": "#7C3AED", approved: "#10B981", disbursed: "#60A5FA", completed: "#9CA3AF", rejected: "#F87171", defaulted: "#DC2626" }
  return m[s] || "#9CA3AF"
}

/* ─── global css (theme-aware) ──────────────────────────────── */
function css(G) {
  return `
  @keyframes vfSlideUp {
    from { opacity:0; transform:translateY(22px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes vfShimmer {
    0%   { transform:translateX(-100%); }
    100% { transform:translateX(200%); }
  }
  @media (min-width: 768px) {
    .vf-stats-grid   { grid-template-columns: repeat(4,1fr) !important; }
    .vf-main-grid    { grid-template-columns: 1fr 360px !important; }
    .vf-actions-grid { grid-template-columns: repeat(2,1fr) !important; }
  }
  @media (min-width: 480px) and (max-width: 767px) {
    .vf-actions-grid { grid-template-columns: repeat(2,1fr) !important; }
  }
`
}