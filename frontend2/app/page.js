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
// //    LOAN TYPE MODAL — opens on "Apply" click
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
// //     { id: "salary", label: "Salary Loan", desc: "Repaid via payroll deduction", icon: <SalaryIco /> },
// //     { id: "asset", label: "Asset-Based Loan", desc: "Secured against vehicle, property, land", icon: <AssetIco /> },
// //     { id: "personal", label: "Personal Loan", desc: "Flexible financing for personal needs", icon: <UserIco size={20} /> },
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
// //         <p style={{ color: G.muted, fontSize: 13, margin: "0 0 22px", paddingLeft: 44 }}>
// //           Select the loan type to get started
// //         </p>

// //         <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
// //           {displayTypes.map((type, i) => (
// //             <button
// //               key={type.id}
// //               onClick={() => { onSelectType(type); handleClose() }}
// //               style={{
// //                 display: "flex", alignItems: "center", gap: 14,
// //                 padding: "16px 18px",
// //                 background: "rgba(16,185,129,0.05)",
// //                 border: "1px solid rgba(16,185,129,0.13)",
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
// //    DASHBOARD SHELL — the visual design
// //    Rendered when no special form/flow is active (same as
// //    the old showApplyButtons + stats section)
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
// //   const loanAmount = currentLoan?.loanAmount || 0
// //   const repayAmt = currentLoan?.repaymentAmount || 0
// //   const paidSoFar = repayAmt > 0 ? Math.max(0, repayAmt - outstanding) : 0
// //   const progress = repayAmt > 0 ? Math.min(100, (paidSoFar / repayAmt) * 100) : 0

// //   return (
// //     <div style={{ minHeight: "100vh", background: G.page, paddingTop: 72, paddingBottom: 88, position: "relative", overflowX: "hidden" }}>
// //       {/* Ambient background */}
// //       <div style={{ position: "fixed", inset: 0, background: `radial-gradient(ellipse 90% 50% at 50% -5%, rgba(16,185,129,0.13) 0%, transparent 65%), radial-gradient(ellipse 60% 40% at 85% 85%, rgba(5,150,105,0.08) 0%, transparent 60%)`, pointerEvents: "none", zIndex: 0 }} />
// //       <div style={{ position: "fixed", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none", zIndex: 0 }} />

// //       <div style={{ position: "relative", zIndex: 1, maxWidth: 1080, margin: "0 auto", padding: "0 16px" }}>

// //         {/* ══ HERO ══ */}
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

// //         {/* ══ STAT STRIP ══ */}
// //         {loansLoading ? <StatSkeleton /> : (
// //           <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12, marginBottom: 24 }} className="vf-stats-grid">
// //             <StatCard label="Active Loans" value={loans.filter(l => !["completed", "defaulted", "rejected"].includes(l.loanStatus)).length} icon={<LoanIco />} accent={G.green2} />
// //             <StatCard label="Outstanding" value={outstanding > 0 ? `K${fmt(outstanding)}` : "K0.00"} icon={<DebtIco />} accent={outstanding > 0 ? G.red : G.green3} mono />
// //             <StatCard label="Total Borrowed" value={loans.length ? `K${fmt(loans.reduce((s, l) => s + (l.loanAmount || 0), 0))}` : "K0.00"} icon={<WalletIco />} accent={G.blue} mono />
// //             <StatCard label="Completed" value={loans.filter(l => l.loanStatus === "completed").length} icon={<CheckIco />} accent={G.green3} />
// //           </div>
// //         )}

// //         {/* ══ MAIN GRID ══ */}
// //         <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }} className="vf-main-grid">

// //           {/* Current loan card */}
// //           <div>
// //             <SectionLabel>Current Loan</SectionLabel>
// //             {loansLoading
// //               ? <Skel height={240} />
// //               : currentLoan
// //                 ? <ActiveLoanCard loan={currentLoan} progress={progress} paidSoFar={paidSoFar} onApplyClick={onApplyClick} />
// //                 : <EmptyLoan onApplyClick={onApplyClick} />
// //             }
// //           </div>

// //           {/* Loan list */}
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

// //           {/* Quick actions */}
// //           <div>
// //             <SectionLabel>Quick Actions</SectionLabel>
// //             <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10 }} className="vf-actions-grid">
// //               <QuickAction onClick={onApplyClick} icon={<LoanIco size={18} />} label="Apply for Loan" desc="Funds in 24hrs" />
// //               <QuickAction href="/profile" icon={<UserIco size={18} />} label="My Profile" desc="Personal details" />
// //               <QuickAction href="/business-profile" icon={<BriefIco size={18} />} label="Business Profile" desc="Company loans" />
// //               <QuickAction href="/esigning" icon={<SignIco size={18} />} label="Sign Documents" desc="Pending forms" />
// //             </div>
// //           </div>

// //           {/* Profile completeness */}
// //           <div>
// //             <SectionLabel>Profile Status</SectionLabel>
// //             <ProfileStatus user={user} />
// //           </div>

// //           {/* Loan status explainer */}
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

// //   const { BottomNavLink } = useBottomNav()
// //   const loggedInUser = useUser()
// //   const constants = useConstants()
// //   const { setPage } = usePage()

// //   setPage("/")
// //   scrolltoTopOFPage()

// //   /* ── fetch all loans for the dashboard stats ── */
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
// //       const { vehicle } = collateral
// //       if (collateral && collateral.collateralType === "vehicle") {
// //         if (vehicle && vehicle.insuranceType && (vehicle.insuranceType === "third-party" || vehicle.insuranceType === "comprehensive")) {
// //           if (currentLoan.insuranceRequest && currentLoan.insuranceRequest === "African Gray") {
// //             return
// //           } else {
// //             setCurrentLoanWithSessionLetterStuff(currentLoan)
// //           }
// //         }
// //       }
// //       return
// //     }
// //     if (loggedInUser?.user?.currentLoan) {
// //       runSetCurrentLoanWithSessionLetterStuff()
// //     }
// //   }, [loggedInUser?.user?.currentLoan])

// //   /* ── apply button → open loan type modal ── */
// //   const handleApplyClick = () => setShowLoanTypeModal(true)

// //   /* ── modal type selected → set category + show form ── */
// //   const handleLoanTypeSelected = (type) => {
// //     setSelectedloanCategory(type.id || type)
// //     setShowLoanTypeModal(false)
// //     setShowLoanApplicationForms(true)
// //   }

// //   /* ─────────────────────────────────────────────────────────────
// //      showApplyButtons — REPLACED with DashboardShell + modal.
// //      All the original <ListStyleLoanApplicationDisplay> /
// //      <InvestButton> logic is preserved inside the modal and shell.
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
// //      showSessionLetter — identical logic, styled to match dark theme
// //   ───────────────────────────────────────────────────────────── */
// //   const showSessionLetter = () => {
// //     const currentLoan = currentLoanWithSessionLetterStuff
// //     const { collateral } = currentLoan
// //     const { vehicle } = collateral

// //     if (vehicle.sessionLetter && vehicle.sessionLetter.data) {
// //       return null
// //     }
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
// //      renderMainContent — EXACT same conditional logic as original.
// //      Only difference: status banners use styled divs instead of
// //      MUI <Alert>, and showApplyButtons() renders the DashboardShell.
// //   ───────────────────────────────────────────────────────────── */
// //   const renderMainContent = () => {
// //     // investment stuff
// //     const currentInvestment = loggedInUser.user.currentInvestment
// //     if (currentInvestment) {
// //       return <>{/* investment dashboard */}<LoanInitiatedDisplay /></>
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

// //       // loans stuff
// //       const currentLoan = loggedInUser.user.currentLoan

// //       if (currentLoan) {

// //         if (currentLoan.loanStatus === "initiated" || currentLoan.loanStatus === "request-approval") {
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
// //           return (
// //             <>
// //               {loggedInUser.user.signingMethod && loggedInUser.user.signingMethod === "e-signing"
// //                 ? <div className="page-content"><div className="container-fluid"><ESigningForms loggedInUser={loggedInUser.user} constants={constants} /></div></div>
// //                 : <FilledForms loggedInUser={loggedInUser.user} constants={constants} />
// //               }
// //             </>
// //           )
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
// //         // no current loan — can apply
// //         return (
// //           showLoanApplicationForms
// //             ? <LoanApplicationForm setShowLoanApplicationForms={setShowLoanApplicationForms} loanCategory={selectedloanCategory} loggedInUser={loggedInUser.user} constants={constants} />
// //             : <>{showApplyButtons()}</>
// //         )
// //       }
// //     }
// //   }

// //   /* ─────────────────────────────────────────────────────────────
// //      renderPages — EXACT same BottomNavLink routing as original
// //   ───────────────────────────────────────────────────────────── */
// //   const renderPages = (bnl) => {
// //     if (!loggedInUser.status) {
// //       if (typeof window !== "undefined") {
// //         window.location = "/signin"
// //       }
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
// //    INFO BANNER — replaces MUI <Alert> with styled dark-theme divs
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
// //    DASHBOARD SUB-COMPONENTS (from the visual design)
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

// // function ActiveLoanCard({ loan, progress, paidSoFar, onApplyClick }) {
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
// //           <defs>
// //             <linearGradient id="gGrad" x1="0%" y1="0%" x2="100%" y2="0%">
// //               <stop offset="0%" stopColor={G.green1} />
// //               <stop offset="100%" stopColor={G.green3} />
// //             </linearGradient>
// //           </defs>
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
// //       <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(16,185,129,0.1)", border: "1.5px solid rgba(16,185,129,0.2)", margin: "0 auto 14px", display: "flex", alignItems: "center", justifyContent: "center", color: G.green2 }}>
// //         <LoanIco size={22} />
// //       </div>
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
// //   const shared = {
// //     display: "flex", flexDirection: "column", gap: 10, padding: "14px 12px",
// //     borderRadius: 14, background: G.dim, border: `1px solid ${G.border}`,
// //     textDecoration: "none", transition: "all 0.2s", cursor: "pointer",
// //   }
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
// //   if (onClick) {
// //     return <button onClick={onClick} style={{ ...shared, border: `1px solid ${G.border}` }} {...handlers}>{inner}</button>
// //   }
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
// import ListStyleLoanApplicationDisplay from "@/components/LoanApplicationDisplay/ListStyleLoanApplicationDisplay"
// import InvestButton from "@/components/Includes/InvestButton/InvestButton"
// import { backEndUrl } from "@/Constants"
// import { useBottomNav } from "@/Contexts/BottomNavContext"
// import { useConstants } from "@/Contexts/ConstantsContext"
// import { usePage } from "@/Contexts/PageContext"
// import { useUser } from "@/Contexts/UserContext"
// import { getLoanFromId, getLoansFromClientId, scrolltoTopOFPage } from "@/Functions"
// import { useEffect, useState } from "react"
// import Link from "next/link"

// /* ─── colour tokens ─────────────────────────────────────────── */
// const G = {
//   page: "#0A0F1E",
//   green1: "#059669",
//   green2: "#10B981",
//   green3: "#34D399",
//   gold: "#C9A84C",
//   goldL: "#E8C87A",
//   red: "#F87171",
//   blue: "#60A5FA",
//   purple: "#A78BFA",
//   muted: "rgba(255,255,255,0.38)",
//   dim: "rgba(255,255,255,0.06)",
//   border: "rgba(255,255,255,0.08)",
// }

// /* ─── shared button styles ──────────────────────────────────── */
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
// const btnOutline = {
//   display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
//   background: "transparent",
//   color: "#10B981", fontWeight: 700, fontSize: 13.5,
//   border: "1.5px solid rgba(16,185,129,0.4)", borderRadius: 10, padding: "10px 22px",
//   cursor: "pointer", textDecoration: "none",
//   transition: "all 0.25s",
// }

// /* ═══════════════════════════════════════════════════════════════
//    LOAN TYPE MODAL — opens on "Apply" click
// ═══════════════════════════════════════════════════════════════ */
// function LoanTypeModal({ isOpen, onClose, constants, onSelectType }) {
//   const [closing, setClosing] = useState(false)

//   const handleClose = () => {
//     setClosing(true)
//     setTimeout(() => { setClosing(false); onClose() }, 260)
//   }

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
//     <div
//       onClick={handleClose}
//       style={{
//         position: "fixed", inset: 0, zIndex: 999,
//         background: "rgba(3,10,6,0.78)",
//         backdropFilter: "blur(7px)", WebkitBackdropFilter: "blur(7px)",
//         display: "flex", alignItems: "flex-end", justifyContent: "center",
//         animation: closing ? "ltm-fadeOut 0.26s ease forwards" : "ltm-fadeIn 0.22s ease",
//       }}
//     >
//       <div
//         onClick={e => e.stopPropagation()}
//         style={{
//           width: "100%", maxWidth: 520,
//           background: "linear-gradient(180deg,#071A10 0%,#040D07 100%)",
//           borderTop: "1px solid rgba(16,185,129,0.22)",
//           borderRadius: "20px 20px 0 0",
//           padding: "28px 20px 40px",
//           boxShadow: "0 -16px 60px rgba(0,0,0,0.58), 0 -2px 16px rgba(5,150,105,0.08)",
//           animation: closing ? "ltm-slideDown 0.26s ease forwards" : "ltm-slideUp 0.32s cubic-bezier(0.22,1,0.36,1)",
//         }}
//       >
//         <div style={{ width: 36, height: 4, borderRadius: 100, background: "rgba(255,255,255,0.1)", margin: "0 auto 24px" }} />

//         <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
//           <div style={{ width: 34, height: 34, borderRadius: 10, flexShrink: 0, background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.22)", display: "flex", alignItems: "center", justifyContent: "center" }}>
//             <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
//           </div>
//           <h2 style={{ fontFamily: "var(--font-display,'DM Serif Display',serif)", fontSize: 22, color: "#fff", fontWeight: 400, margin: 0 }}>
//             New Loan Application
//           </h2>
//         </div>
//         <p style={{ color: G.muted, fontSize: 13, margin: "0 0 22px", paddingLeft: 44 }}>
//           Select the loan type to get started
//         </p>

//         <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//           {displayTypes.map((type, i) => (
//             <button
//               key={type.id}
//               onClick={() => { onSelectType(type); handleClose() }}
//               style={{
//                 display: "flex", alignItems: "center", gap: 14,
//                 padding: "16px 18px",
//                 background: "rgba(16,185,129,0.05)",
//                 border: "1px solid rgba(16,185,129,0.13)",
//                 borderRadius: 14, cursor: "pointer", width: "100%", textAlign: "left",
//                 fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)",
//                 transition: "all 0.18s",
//                 animation: `ltm-slideUp 0.32s cubic-bezier(0.22,1,0.36,1) ${i * 0.06}s both`,
//               }}
//               onMouseEnter={e => { e.currentTarget.style.background = "rgba(16,185,129,0.10)"; e.currentTarget.style.borderColor = "rgba(16,185,129,0.28)"; e.currentTarget.style.transform = "translateX(2px)" }}
//               onMouseLeave={e => { e.currentTarget.style.background = "rgba(16,185,129,0.05)"; e.currentTarget.style.borderColor = "rgba(16,185,129,0.13)"; e.currentTarget.style.transform = "none" }}
//             >
//               <div style={{ width: 42, height: 42, borderRadius: 12, flexShrink: 0, background: "linear-gradient(135deg,rgba(5,150,105,0.22),rgba(16,185,129,0.07))", border: "1px solid rgba(16,185,129,0.18)", display: "flex", alignItems: "center", justifyContent: "center", color: G.green2 }}>
//                 {type.icon}
//               </div>
//               <div style={{ flex: 1 }}>
//                 <p style={{ color: "#fff", fontSize: 15, fontWeight: 600, margin: "0 0 3px" }}>{type.label}</p>
//                 {type.desc && <p style={{ color: G.muted, fontSize: 12, margin: 0, lineHeight: 1.4 }}>{type.desc}</p>}
//               </div>
//               <svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="rgba(16,185,129,0.45)" strokeWidth={2.2}><polyline points="9 18 15 12 9 6" /></svg>
//             </button>
//           ))}
//         </div>

//         <button
//           onClick={handleClose}
//           style={{ width: "100%", marginTop: 16, padding: "13px", background: "transparent", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, color: G.muted, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)", transition: "all 0.18s" }}
//           onMouseEnter={e => { e.currentTarget.style.color = "rgba(255,255,255,0.55)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)" }}
//           onMouseLeave={e => { e.currentTarget.style.color = G.muted; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)" }}
//         >
//           Cancel
//         </button>
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
//    DASHBOARD SHELL — the visual design
//    Rendered when no special form/flow is active (same as
//    the old showApplyButtons + stats section)
// ═══════════════════════════════════════════════════════════════ */
// function DashboardShell({ loggedInUser, constants, loans, loansLoading, onApplyClick }) {
//   const user = loggedInUser.user
//   const firstName = user?.fullnames?.split(" ")[0] || user?.details?.firstname || "there"
//   const initials = user?.fullnames
//     ? user.fullnames.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
//     : "VF"

//   const currentLoan = user?.currentLoan || loans[0] || null
//   const loanStatus = currentLoan?.loanStatus || null
//   const outstanding = currentLoan?.outstandingAmount || 0
//   const loanAmount = currentLoan?.loanAmount || 0
//   const repayAmt = currentLoan?.repaymentAmount || 0
//   const paidSoFar = repayAmt > 0 ? Math.max(0, repayAmt - outstanding) : 0
//   const progress = repayAmt > 0 ? Math.min(100, (paidSoFar / repayAmt) * 100) : 0

//   return (
//     <div style={{ minHeight: "100vh", background: G.page, paddingTop: 72, paddingBottom: 88, position: "relative", overflowX: "hidden" }}>
//       {/* Ambient background */}
//       <div style={{ position: "fixed", inset: 0, background: `radial-gradient(ellipse 90% 50% at 50% -5%, rgba(16,185,129,0.13) 0%, transparent 65%), radial-gradient(ellipse 60% 40% at 85% 85%, rgba(5,150,105,0.08) 0%, transparent 60%)`, pointerEvents: "none", zIndex: 0 }} />
//       <div style={{ position: "fixed", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none", zIndex: 0 }} />

//       <div style={{ position: "relative", zIndex: 1, maxWidth: 1080, margin: "0 auto", padding: "0 16px" }}>

//         {/* ══ HERO ══ */}
//         <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24, animation: "vfSlideUp 0.45s cubic-bezier(.22,1,.36,1)" }}>
//           <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg,rgba(16,185,129,0.25),rgba(5,150,105,0.1))", border: "1.5px solid rgba(16,185,129,0.35)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
//             <span style={{ fontFamily: "var(--font-display,'DM Serif Display',serif)", fontSize: 17, color: G.green3, fontWeight: 400 }}>{initials}</span>
//           </div>
//           <div style={{ flex: 1, minWidth: 0 }}>
//             <p style={{ margin: 0, fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: G.muted }}>Welcome back</p>
//             <h1 style={{ margin: 0, fontFamily: "var(--font-display,'DM Serif Display',serif)", fontSize: "clamp(20px,5vw,28px)", color: "#fff", lineHeight: 1.15 }}>{firstName}</h1>
//           </div>
//           <button onClick={onApplyClick} style={{ ...btnGreen, fontSize: 13, padding: "10px 18px" }}>+ Apply</button>
//         </div>

//         {/* ══ STAT STRIP ══ */}
//         {loansLoading ? <StatSkeleton /> : (
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12, marginBottom: 24 }} className="vf-stats-grid">
//             <StatCard label="Active Loans" value={loans.filter(l => !["completed", "defaulted", "rejected"].includes(l.loanStatus)).length} icon={<LoanIco />} accent={G.green2} />
//             <StatCard label="Outstanding" value={outstanding > 0 ? `K${fmt(outstanding)}` : "K0.00"} icon={<DebtIco />} accent={outstanding > 0 ? G.red : G.green3} mono />
//             <StatCard label="Total Borrowed" value={loans.length ? `K${fmt(loans.reduce((s, l) => s + (l.loanAmount || 0), 0))}` : "K0.00"} icon={<WalletIco />} accent={G.blue} mono />
//             <StatCard label="Completed" value={loans.filter(l => l.loanStatus === "completed").length} icon={<CheckIco />} accent={G.green3} />
//           </div>
//         )}

//         {/* ══ MAIN GRID ══ */}
//         <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }} className="vf-main-grid">

//           {/* Current loan card */}
//           <div>
//             <SectionLabel>Current Loan</SectionLabel>
//             {loansLoading
//               ? <Skel height={240} />
//               : currentLoan
//                 ? <ActiveLoanCard loan={currentLoan} progress={progress} paidSoFar={paidSoFar} onApplyClick={onApplyClick} />
//                 : <EmptyLoan onApplyClick={onApplyClick} />
//             }
//           </div>

//           {/* Loan list */}
//           {loans.length > 0 && (
//             <div>
//               <SectionLabel>All Loans</SectionLabel>
//               <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//                 {loans.slice(0, 5).map((loan, i) => <LoanRow key={loan.id} loan={loan} i={i} />)}
//                 {loans.length > 5 && (
//                   <Link href="/loans" style={{ textAlign: "center", color: G.green2, fontSize: 13, fontWeight: 600, textDecoration: "none", padding: "10px 0" }}>
//                     View all {loans.length} loans →
//                   </Link>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Quick actions */}
//           <div>
//             <SectionLabel>Quick Actions</SectionLabel>
//             <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 10 }} className="vf-actions-grid">
//               <QuickAction onClick={onApplyClick} icon={<LoanIco size={18} />} label="Apply for Loan" desc="Funds in 24hrs" />
//               <QuickAction href="/profile" icon={<UserIco size={18} />} label="My Profile" desc="Personal details" />
//               <QuickAction href="/business-profile" icon={<BriefIco size={18} />} label="Business Profile" desc="Company loans" />
//               <QuickAction href="/esigning" icon={<SignIco size={18} />} label="Sign Documents" desc="Pending forms" />
//             </div>
//           </div>

//           {/* Profile completeness */}
//           <div>
//             <SectionLabel>Profile Status</SectionLabel>
//             <ProfileStatus user={user} />
//           </div>

//           {/* Loan status explainer */}
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

//   const { BottomNavLink } = useBottomNav()
//   const loggedInUser = useUser()
//   const constants = useConstants()
//   const { setPage } = usePage()

//   setPage("/")
//   scrolltoTopOFPage()

//   /* ── fetch all loans for the dashboard stats ── */
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

//   /* ── session letter check ── */
//   useEffect(() => {
//     const runSetCurrentLoanWithSessionLetterStuff = async () => {
//       const currentLoan = await getLoanFromId(
//         loggedInUser.user.currentLoan.id,
//         "collateral,collateral.vehicle,collateral.vehicle.sessionLetterTemplate,collateral.vehicle.sessionLetter"
//       )
//       const { collateral } = currentLoan
//       const { vehicle } = collateral || {}
//       if (collateral && collateral.collateralType === "vehicle") {
//         if (vehicle && vehicle.insuranceType && (vehicle.insuranceType === "third-party" || vehicle.insuranceType === "comprehensive")) {
//           if (currentLoan.insuranceRequest && currentLoan.insuranceRequest === "African Gray") {
//             return
//           } else {
//             setCurrentLoanWithSessionLetterStuff(currentLoan)
//           }
//         }
//       }
//       return
//     }
//     if (loggedInUser?.user?.currentLoan) {
//       runSetCurrentLoanWithSessionLetterStuff()
//     }
//   }, [loggedInUser?.user?.currentLoan])

//   /* ── apply button → open loan type modal ── */
//   const handleApplyClick = () => setShowLoanTypeModal(true)

//   /* ── modal type selected → set category + show form ── */
//   const handleLoanTypeSelected = (type) => {
//     setSelectedloanCategory(type.id || type)
//     setShowLoanTypeModal(false)
//     setShowLoanApplicationForms(true)
//   }

//   /* ─────────────────────────────────────────────────────────────
//      showApplyButtons — REPLACED with DashboardShell + modal.
//      All the original <ListStyleLoanApplicationDisplay> /
//      <InvestButton> logic is preserved inside the modal and shell.
//   ───────────────────────────────────────────────────────────── */
//   const showApplyButtons = () => (
//     <>
//       <DashboardShell
//         loggedInUser={loggedInUser}
//         constants={constants}
//         loans={loans}
//         loansLoading={loansLoading}
//         onApplyClick={handleApplyClick}
//       />
//       <LoanTypeModal
//         isOpen={showLoanTypeModal}
//         onClose={() => setShowLoanTypeModal(false)}
//         constants={constants}
//         onSelectType={handleLoanTypeSelected}
//       />
//     </>
//   )

//   /* ─────────────────────────────────────────────────────────────
//      showSessionLetter — identical logic, styled to match dark theme
//   ───────────────────────────────────────────────────────────── */
//   const showSessionLetter = () => {
//     const currentLoan = currentLoanWithSessionLetterStuff
//     const { collateral } = currentLoan
//     const { vehicle } = collateral

//     if (vehicle.sessionLetter && vehicle.sessionLetter.data) {
//       return null
//     }
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
//         <p style={{ color: G.muted, fontSize: 12, margin: "0 0 12px", lineHeight: 1.5 }}>
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

//   /* ─────────────────────────────────────────────────────────────
//      renderMainContent — EXACT same conditional logic as original.
//      Only difference: status banners use styled divs instead of
//      MUI <Alert>, and showApplyButtons() renders the DashboardShell.
//   ───────────────────────────────────────────────────────────── */
//   const renderMainContent = () => {
//     // investment stuff
//     const currentInvestment = loggedInUser.user.currentInvestment
//     if (currentInvestment) {
//       return <>{/* investment dashboard */}<LoanInitiatedDisplay /></>
//     } else {
//       if (showInvestMentForms) {
//         return (
//           <div className="page-content">
//             <div className="container-fluid">
//               <InvestmentForm
//                 setshowInvestMentForms={setshowInvestMentForms}
//                 loanCategory="personal"
//                 loggedInUser={loggedInUser.user}
//                 constants={constants}
//               />
//             </div>
//           </div>
//         )
//       }

//       // loans stuff
//       const currentLoan = loggedInUser.user.currentLoan

//       if (currentLoan) {

//         if (currentLoan.loanStatus === "initiated" || currentLoan.loanStatus === "request-approval") {
//           return <LoanInitiatedDisplay />
//         }

//         else if (currentLoan.loanStatus === "pending-collateral-addition") {
//           return <CollateralForm loggedInUser={loggedInUser.user} constants={constants} />
//         }

//         else if (currentLoan.loanStatus === "pending-collateral-inspection" || currentLoan.loanStatus === "collateral-inspection") {
//           return (
//             <div className="page-content">
//               <div className="container-fluid">
//                 <InfoBanner type="info">Thank you for applying for a loan with us, we are currently processing the loan, an agent will call you to proceed with inspection of your collateral.</InfoBanner>
//                 {currentLoanWithSessionLetterStuff ? showSessionLetter() : null}
//               </div>
//             </div>
//           )
//         }

//         else if (currentLoan.loanStatus === "accepted") {
//           return (
//             <>
//               {loggedInUser.user.signingMethod && loggedInUser.user.signingMethod === "e-signing"
//                 ? <div className="page-content"><div className="container-fluid"><ESigningForms loggedInUser={loggedInUser.user} constants={constants} /></div></div>
//                 : <FilledForms loggedInUser={loggedInUser.user} constants={constants} />
//               }
//             </>
//           )
//         }

//         else if (currentLoan.loanStatus === "pending-approval") {
//           return (
//             <div className="page-content">
//               <div className="container-fluid">
//                 <InfoBanner type="info">Thank you for completing the requested steps, we are currently processing the loan, an agent will call you.</InfoBanner>
//               </div>
//             </div>
//           )
//         }

//         else if (currentLoan.loanStatus === "approved") {
//           return (
//             <div className="page-content">
//               <div className="container-fluid">
//                 <InfoBanner type="success">Congratulations!! Your loan has been approved, awaiting disbursement of funds.</InfoBanner>
//               </div>
//             </div>
//           )
//         }

//         else if (currentLoan.loanStatus === "rejected") {
//           return (
//             showLoanApplicationForms
//               ? <LoanApplicationForm setShowLoanApplicationForms={setShowLoanApplicationForms} loanCategory={selectedloanCategory} loggedInUser={loggedInUser.user} constants={constants} />
//               : <>
//                 <div className="page-content">
//                   <div className="container-fluid">
//                     <InfoBanner type="warning">Sorry but we cannot grant you a loan at the moment, apply again if you feel that your eligibility has to be reassessed.</InfoBanner>
//                   </div>
//                 </div>
//                 {showApplyButtons()}
//               </>
//           )
//         }

//         else if (currentLoan.loanStatus === "disbursed") {
//           return <LoanInformationDisplay loggedInUser={loggedInUser.user} constants={constants} />
//         }

//         else if (currentLoan.loanStatus === "defaulted") {
//           return (
//             <>
//               <div className="page-content">
//                 <div className="container-fluid">
//                   <InfoBanner type="error">It appears your loan has been defaulted, pay the balance in full, lest appropriate legal action be taken.</InfoBanner>
//                 </div>
//               </div>
//               <LoanInformationDisplay loggedInUser={loggedInUser.user} constants={constants} />
//             </>
//           )
//         }

//         else if (currentLoan.loanStatus === "completed") {
//           return (
//             showLoanApplicationForms
//               ? <LoanApplicationForm setShowLoanApplicationForms={setShowLoanApplicationForms} loanCategory={selectedloanCategory} loggedInUser={loggedInUser.user} constants={constants} />
//               : <>
//                 <div className="page-content">
//                   <div className="container-fluid">
//                     <InfoBanner type="success">Thank you for completing payment of your loan, you can now apply for another one.</InfoBanner>
//                   </div>
//                 </div>
//                 {showApplyButtons()}
//               </>
//           )
//         }

//         else {
//           return (
//             showLoanApplicationForms
//               ? <LoanApplicationForm setShowLoanApplicationForms={setShowLoanApplicationForms} loanCategory={selectedloanCategory} loggedInUser={loggedInUser.user} constants={constants} />
//               : <>{showApplyButtons()}</>
//           )
//         }

//       } else {
//         // no current loan — can apply
//         return (
//           showLoanApplicationForms
//             ? <LoanApplicationForm setShowLoanApplicationForms={setShowLoanApplicationForms} loanCategory={selectedloanCategory} loggedInUser={loggedInUser.user} constants={constants} />
//             : <>{showApplyButtons()}</>
//         )
//       }
//     }
//   }

//   /* ─────────────────────────────────────────────────────────────
//      renderPages — EXACT same BottomNavLink routing as original
//   ───────────────────────────────────────────────────────────── */
//   const renderPages = (bnl) => {
//     if (!loggedInUser.status) {
//       if (typeof window !== "undefined") {
//         window.location = "/signin"
//       }
//     } else {
//       if (!bnl || parseInt(bnl) === 0) {
//         return renderMainContent()
//       } else if (parseInt(bnl) === 1) {
//         return (
//           <div className="page-content">
//             <div className="container-fluid">
//               <LoanTransactionHistory loggedInUser={loggedInUser.user} />
//             </div>
//           </div>
//         )
//       } else {
//         return (
//           <div className="page-content">
//             <div className="container-fluid">
//               <HelpPageDisplay loggedInUser={loggedInUser.user} constants={constants} />
//             </div>
//           </div>
//         )
//       }
//     }
//   }

//   return <>{renderPages(BottomNavLink)}</>
// }

// /* ═══════════════════════════════════════════════════════════════
//    INFO BANNER — replaces MUI <Alert> with styled dark-theme divs
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
//     <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "14px 16px", borderRadius: 12, background: c.bg, border: `1px solid ${c.border}`, color: c.color, fontSize: 13.5, lineHeight: 1.5, marginBottom: 16, fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)" }}>
//       <span style={{ fontSize: 16, flexShrink: 0, lineHeight: 1.4 }}>{c.icon}</span>
//       <span>{children}</span>
//     </div>
//   )
// }

// /* ═══════════════════════════════════════════════════════════════
//    DASHBOARD SUB-COMPONENTS (from the visual design)
// ═══════════════════════════════════════════════════════════════ */

// function StatCard({ label, value, icon, accent, mono }) {
//   return (
//     <div style={{ background: G.dim, border: `1px solid ${G.border}`, borderRadius: 14, padding: "16px 14px", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", position: "relative", overflow: "hidden" }}>
//       <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${accent}, transparent)`, borderRadius: "14px 14px 0 0" }} />
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
//         <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: G.muted }}>{label}</span>
//         <div style={{ color: accent, opacity: 0.85 }}>{icon}</div>
//       </div>
//       <div style={{ fontFamily: mono ? "var(--font-mono,'JetBrains Mono',monospace)" : undefined, fontSize: 20, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>{value}</div>
//     </div>
//   )
// }

// function StatSkeleton() {
//   return (
//     <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12, marginBottom: 24 }}>
//       {[0, 1, 2, 3].map(i => (
//         <div key={i} style={{ height: 88, borderRadius: 14, background: G.dim, position: "relative", overflow: "hidden" }}>
//           <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)", animation: "vfShimmer 1.6s linear infinite" }} />
//         </div>
//       ))}
//     </div>
//   )
// }

// function ActiveLoanCard({ loan, progress, paidSoFar, onApplyClick }) {
//   const circ = 2 * Math.PI * 38
//   const dash = circ - (circ * progress / 100)
//   return (
//     <div style={{ background: "linear-gradient(135deg,rgba(16,185,129,0.12),rgba(5,150,105,0.05))", border: "1px solid rgba(16,185,129,0.22)", borderRadius: 16, padding: "20px 18px", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}>
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
//         <div>
//           <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(52,211,153,0.7)", marginBottom: 4 }}>Loan #{loan.id}</div>
//           <div style={{ fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", fontSize: "clamp(22px,6vw,32px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.03em" }}>K{fmt(loan.loanAmount || 0)}</div>
//         </div>
//         <svg width={84} height={84} style={{ flexShrink: 0 }}>
//           <circle cx={42} cy={42} r={38} fill="none" stroke={G.dim} strokeWidth={6} />
//           <circle cx={42} cy={42} r={38} fill="none" stroke="url(#gGrad)" strokeWidth={6} strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={dash} transform="rotate(-90 42 42)" style={{ transition: "stroke-dashoffset 1s ease" }} />
//           <defs>
//             <linearGradient id="gGrad" x1="0%" y1="0%" x2="100%" y2="0%">
//               <stop offset="0%" stopColor={G.green1} />
//               <stop offset="100%" stopColor={G.green3} />
//             </linearGradient>
//           </defs>
//           <text x={42} y={38} textAnchor="middle" fill={G.green3} fontSize={13} fontFamily="var(--font-mono,'JetBrains Mono',monospace)" fontWeight={700}>{Math.round(progress)}%</text>
//           <text x={42} y={52} textAnchor="middle" fill={G.muted} fontSize={8} fontFamily="sans-serif">repaid</text>
//         </svg>
//       </div>

//       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 16px", marginBottom: 16 }}>
//         <IP label="Outstanding" value={`K${fmt(loan.outstandingAmount || 0)}`} mono />
//         <IP label="Term" value={`${loan.loanTerm || "—"} months`} />
//         <IP label="Paid So Far" value={`K${fmt(paidSoFar)}`} mono green />
//         <IP label="Status" value={<SPill status={loan.loanStatus} />} />
//       </div>

//       <div style={{ height: 1, background: "rgba(16,185,129,0.15)", margin: "14px 0" }} />

//       <div style={{ display: "flex", gap: 10 }}>
//         <Link href="/loans" style={{ ...btnGreen, flex: 1, justifyContent: "center", padding: "10px 0", fontSize: 13 }}>Manage</Link>
//         <Link href="/esigning" style={{ ...btnOutline, flex: 1, justifyContent: "center", padding: "10px 0", fontSize: 13 }}>Documents</Link>
//       </div>
//     </div>
//   )
// }

// function EmptyLoan({ onApplyClick }) {
//   return (
//     <div style={{ background: G.dim, border: `1px solid ${G.border}`, borderRadius: 16, padding: "32px 24px", textAlign: "center" }}>
//       <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(16,185,129,0.1)", border: "1.5px solid rgba(16,185,129,0.2)", margin: "0 auto 14px", display: "flex", alignItems: "center", justifyContent: "center", color: G.green2 }}>
//         <LoanIco size={22} />
//       </div>
//       <div style={{ fontSize: 15, fontWeight: 600, color: "#fff", marginBottom: 6 }}>No Active Loan</div>
//       <p style={{ fontSize: 13, color: G.muted, marginBottom: 18, lineHeight: 1.6 }}>Get funds in as little as 24 hours.</p>
//       <button onClick={onApplyClick} style={{ ...btnGreen, fontSize: 13, padding: "10px 22px" }}>Apply Now</button>
//     </div>
//   )
// }

// function LoanRow({ loan, i }) {
//   return (
//     <Link href="/loans" style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 14px", borderRadius: 12, background: G.dim, border: `1px solid ${G.border}`, textDecoration: "none", transition: "background 0.2s", animation: `vfSlideUp 0.4s ${i * 0.05}s both cubic-bezier(.22,1,.36,1)` }}>
//       <div style={{ width: 4, height: 32, borderRadius: 2, flexShrink: 0, background: statusColor(loan.loanStatus) }} />
//       <div style={{ flex: 1, minWidth: 0 }}>
//         <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 1 }}>Loan #{loan.id}</div>
//         <div style={{ fontSize: 11, color: G.muted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{loan.loanPurpose || "General Purpose"}</div>
//       </div>
//       <div style={{ textAlign: "right", flexShrink: 0 }}>
//         <div style={{ fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", fontSize: 13, fontWeight: 700, color: G.green2, marginBottom: 3 }}>K{fmt(loan.loanAmount || 0)}</div>
//         <SPill status={loan.loanStatus} />
//       </div>
//     </Link>
//   )
// }

// function QuickAction({ href, onClick, icon, label, desc }) {
//   const shared = {
//     display: "flex", flexDirection: "column", gap: 10, padding: "14px 12px",
//     borderRadius: 14, background: G.dim, border: `1px solid ${G.border}`,
//     textDecoration: "none", transition: "all 0.2s", cursor: "pointer",
//   }
//   const handlers = {
//     onMouseEnter: e => { e.currentTarget.style.background = "rgba(16,185,129,0.07)"; e.currentTarget.style.borderColor = "rgba(16,185,129,0.22)" },
//     onMouseLeave: e => { e.currentTarget.style.background = G.dim; e.currentTarget.style.borderColor = G.border },
//   }
//   const inner = (
//     <>
//       <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: G.green2 }}>{icon}</div>
//       <div>
//         <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 2 }}>{label}</div>
//         <div style={{ fontSize: 11, color: G.muted }}>{desc}</div>
//       </div>
//     </>
//   )
//   if (onClick) {
//     return <button onClick={onClick} style={{ ...shared, border: `1px solid ${G.border}` }} {...handlers}>{inner}</button>
//   }
//   return <Link href={href} style={shared} {...handlers}>{inner}</Link>
// }

// function ProfileStatus({ user }) {
//   const checks = [
//     { label: "Basic Info", done: !!(user?.details?.firstname && user?.details?.lastname) },
//     { label: "Date of Birth", done: !!user?.details?.dateOfBirth },
//     { label: "NRC / Passport", done: !!(user?.clientDetails?.idNumber || user?.clientDetails?.IDfront?.length) },
//     { label: "Bank Details", done: !!(user?.bankDetails?.accountNumber) },
//   ]
//   const complete = checks.filter(c => c.done).length
//   const pct = Math.round((complete / checks.length) * 100)
//   return (
//     <div style={{ background: G.dim, border: `1px solid ${G.border}`, borderRadius: 16, padding: "18px 16px" }}>
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
//         <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>{complete}/{checks.length} complete</span>
//         <span style={{ fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", fontSize: 18, fontWeight: 700, color: pct === 100 ? G.green3 : G.green2 }}>{pct}%</span>
//       </div>
//       <div style={{ height: 5, background: "rgba(255,255,255,0.07)", borderRadius: 100, marginBottom: 14 }}>
//         <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg,${G.green1},${G.green3})`, borderRadius: 100, transition: "width 0.8s ease" }} />
//       </div>
//       {checks.map(c => (
//         <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
//           <div style={{ width: 17, height: 17, borderRadius: 5, flexShrink: 0, background: c.done ? "rgba(52,211,153,0.13)" : "rgba(255,255,255,0.05)", border: `1.5px solid ${c.done ? "rgba(52,211,153,0.4)" : "rgba(255,255,255,0.1)"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
//             {c.done && <svg width={9} height={9} viewBox="0 0 12 12" fill="none"><polyline points="2 6 5 9 10 3" stroke={G.green3} strokeWidth={2} strokeLinecap="round" /></svg>}
//           </div>
//           <span style={{ fontSize: 12, color: c.done ? "rgba(255,255,255,0.75)" : G.muted }}>{c.label}</span>
//         </div>
//       ))}
//       {pct < 100 && (
//         <Link href="/profile" style={{ ...btnOutline, width: "100%", marginTop: 12, padding: "9px 0", fontSize: 12.5, justifyContent: "center" }}>Complete Profile</Link>
//       )}
//     </div>
//   )
// }

// function StatusExplainer({ status }) {
//   const map = {
//     "initiated": { color: "#FBBF24", msg: "Your application has been initiated. Complete your profile and add collateral." },
//     "pending-collateral-addition": { color: "#FBBF24", msg: "Please add your collateral information to continue." },
//     "pending-collateral-inspection": { color: "#FBBF24", msg: "Your collateral is pending inspection by our team." },
//     "collateral-inspection": { color: "#A78BFA", msg: "An inspector is reviewing your collateral." },
//     "request-approval": { color: "#818CF8", msg: "Your officer has submitted your application for management approval." },
//     "accepted": { color: G.green3, msg: "Congratulations! Loan accepted. Please review and sign your loan documents." },
//     "pending-approval": { color: "#A78BFA", msg: "Your documents are being processed. Funds will be disbursed soon." },
//     "approved": { color: G.green2, msg: "Fully approved. Disbursement is being processed." },
//     "disbursed": { color: "#60A5FA", msg: "Funds sent! Check your repayment schedule." },
//     "completed": { color: "#9CA3AF", msg: "This loan has been fully repaid. Thank you!" },
//     "rejected": { color: "#F87171", msg: "Loan declined. You may re-apply or contact us for more details." },
//     "defaulted": { color: "#DC2626", msg: "This loan is in default. Please contact us immediately." },
//   }
//   const { color, msg } = map[status] || { color: "#9CA3AF", msg: "Current loan status." }
//   return (
//     <div style={{ padding: "14px 16px", borderRadius: 12, background: `${color}12`, border: `1px solid ${color}33` }}>
//       <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 7 }}>
//         <div style={{ width: 7, height: 7, borderRadius: "50%", background: color, flexShrink: 0 }} />
//         <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color }}>{status}</span>
//       </div>
//       <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, margin: 0 }}>{msg}</p>
//     </div>
//   )
// }

// function IP({ label, value, mono, green }) {
//   return (
//     <div>
//       <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: G.muted, marginBottom: 3 }}>{label}</div>
//       <div style={{ fontFamily: mono ? "var(--font-mono,'JetBrains Mono',monospace)" : undefined, fontSize: 13.5, fontWeight: 500, color: green ? G.green3 : "rgba(255,255,255,0.88)" }}>{value}</div>
//     </div>
//   )
// }

// function SectionLabel({ children }) {
//   return (
//     <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
//       <div style={{ width: 3, height: 14, borderRadius: 2, background: `linear-gradient(180deg,${G.green1},${G.green3})` }} />
//       <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: G.muted }}>{children}</span>
//     </div>
//   )
// }

// function SPill({ status }) {
//   const colors = {
//     "initiated": "#FBBF24", "pending-collateral-addition": "#FBBF24", "pending-collateral-inspection": "#FBBF24",
//     "collateral-inspection": "#A78BFA", "request-approval": "#818CF8", "accepted": G.green3,
//     "pending-approval": "#A78BFA", "approved": G.green2, "disbursed": "#60A5FA",
//     "completed": "#9CA3AF", "rejected": "#F87171", "defaulted": "#DC2626",
//   }
//   const c = colors[status] || "#9CA3AF"
//   return (
//     <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 100, background: `${c}18`, color: c, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
//       <span style={{ width: 5, height: 5, borderRadius: "50%", background: c, flexShrink: 0 }} />
//       {status}
//     </span>
//   )
// }

// function Skel({ height }) {
//   return (
//     <div style={{ height, borderRadius: 14, background: G.dim, position: "relative", overflow: "hidden" }}>
//       <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.055),transparent)", animation: "vfShimmer 1.6s linear infinite" }} />
//     </div>
//   )
// }

// /* ─── icons ─────────────────────────────────────────────────── */
// function LoanIco({ size = 17 }) { return <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg> }
// function DebtIco({ size = 17 }) { return <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg> }
// function WalletIco({ size = 17 }) { return <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><path d="M20 12V8a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2v-4" /><circle cx="17" cy="12" r="1.5" /></svg> }
// function CheckIco({ size = 17 }) { return <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><polyline points="20 6 9 17 4 12" /></svg> }
// function UserIco({ size = 17 }) { return <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg> }
// function BriefIco({ size = 17 }) { return <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /></svg> }
// function SignIco({ size = 17 }) { return <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg> }
// function SalaryIco() { return <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /><line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" /></svg> }
// function AssetIco() { return <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg> }

// /* ─── helpers ───────────────────────────────────────────────── */
// function fmt(n) { return parseFloat(n).toLocaleString("en-ZM", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }
// function statusColor(s) {
//   const m = { initiated: "#FBBF24", "pending-collateral-addition": "#FBBF24", "pending-collateral-inspection": "#FBBF24", "collateral-inspection": "#A78BFA", "request-approval": "#818CF8", accepted: "#34D399", "pending-approval": "#A78BFA", approved: "#10B981", disbursed: "#60A5FA", completed: "#9CA3AF", rejected: "#F87171", defaulted: "#DC2626" }
//   return m[s] || "#9CA3AF"
// }

// /* ─── global css ────────────────────────────────────────────── */
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

/* ─── colour tokens ─────────────────────────────────────────── */
const G = {
  page: "#0A0F1E",
  green1: "#059669",
  green2: "#10B981",
  green3: "#34D399",
  gold: "#C9A84C",
  goldL: "#E8C87A",
  red: "#F87171",
  blue: "#60A5FA",
  purple: "#A78BFA",
  muted: "rgba(255,255,255,0.38)",
  dim: "rgba(255,255,255,0.06)",
  border: "rgba(255,255,255,0.08)",
}

/* ─── shared button styles ──────────────────────────────────── */
const btnGreen = {
  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
  background: "linear-gradient(135deg,#059669 0%,#10B981 55%,#059669 100%)",
  backgroundSize: "200% auto",
  color: "#fff", fontWeight: 700, fontSize: 13.5,
  border: "none", borderRadius: 10, padding: "11px 22px",
  cursor: "pointer", textDecoration: "none",
  boxShadow: "0 4px 16px rgba(16,185,129,0.28)",
  transition: "all 0.25s",
  letterSpacing: "0.01em",
}
const btnOutline = {
  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
  background: "transparent",
  color: "#10B981", fontWeight: 700, fontSize: 13.5,
  border: "1.5px solid rgba(16,185,129,0.4)", borderRadius: 10, padding: "10px 22px",
  cursor: "pointer", textDecoration: "none",
  transition: "all 0.25s",
}

/* ═══════════════════════════════════════════════════════════════
   ON-SITE VERIFICATION GATE
   Shown when the loan requires the client to come in-person
   before documents can be signed.
═══════════════════════════════════════════════════════════════ */
function OnSiteVerificationGate({ address, requirements, allowSigning, onSign, signingMethod, loggedInUser, constants }) {
  return (
    <div className="page-content">
      <div className="container-fluid">
        {/* Greyed-out documents backdrop */}
        <div style={{ position: "relative", marginBottom: 20 }}>
          {/* Blurred / greyed document placeholder */}
          <div style={{
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(255,255,255,0.03)",
            padding: "32px 24px",
            filter: "blur(3px)",
            pointerEvents: "none",
            userSelect: "none",
            opacity: 0.35,
            minHeight: 180,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}>
            {/* Fake document lines */}
            {[100, 80, 90, 65, 75].map((w, i) => (
              <div key={i} style={{
                height: 12, borderRadius: 6,
                background: "rgba(255,255,255,0.15)",
                width: `${w}%`
              }} />
            ))}
            <div style={{ marginTop: 16, display: "flex", gap: 12 }}>
              <div style={{ height: 40, width: 120, borderRadius: 10, background: "rgba(16,185,129,0.3)" }} />
              <div style={{ height: 40, width: 120, borderRadius: 10, background: "rgba(255,255,255,0.1)" }} />
            </div>
          </div>

          {/* Overlay message */}
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            padding: "0 24px",
            textAlign: "center",
          }}>
            {/* Lock icon */}
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
            <h3 style={{
              color: "#fff", fontSize: 17, fontWeight: 700,
              margin: "0 0 10px", letterSpacing: "-0.2px",
            }}>
              In-Person Verification Required
            </h3>
            <p style={{
              color: "rgba(255,255,255,0.6)", fontSize: 13.5, lineHeight: 1.65,
              margin: "0 0 8px", maxWidth: 480,
            }}>
              To finalise your application, you must come to our office at:
            </p>
            <div style={{
              background: "rgba(245,158,11,0.1)",
              border: "1px solid rgba(245,158,11,0.25)",
              borderRadius: 10, padding: "10px 18px",
              color: "#FCD34D", fontSize: 14, fontWeight: 600,
              marginBottom: requirements ? 12 : 20, maxWidth: 520,
            }}>
              📍 {address || "Our main branch — please contact us for the address."}
            </div>
            {requirements && (
              <div style={{
                background: "rgba(59,130,246,0.08)",
                border: "1px solid rgba(59,130,246,0.22)",
                borderRadius: 10, padding: "10px 18px",
                color: "#93C5FD", fontSize: 13, lineHeight: 1.6,
                marginBottom: 20, maxWidth: 520,
              }}>
                <strong style={{ display: "block", marginBottom: 4 }}>Please bring with you:</strong>
                {requirements}
              </div>
            )}

            {/* Only show the signing button once the officer has allowed it */}
            {allowSigning ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div style={{
                  background: "rgba(16,185,129,0.1)",
                  border: "1px solid rgba(16,185,129,0.25)",
                  borderRadius: 10, padding: "10px 16px",
                  color: "#6EE7B7", fontSize: 12.5, textAlign: "center",
                  marginBottom: 6, maxWidth: 420,
                }}>
                  ✓ Your officer has verified your visit. You may now proceed to sign your documents.
                </div>
                <button
                  onClick={onSign}
                  style={{ ...btnGreen, fontSize: 14, padding: "12px 28px" }}
                >
                  Proceed to Sign Documents →
                </button>
              </div>
            ) : (
              <div style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: 10, padding: "10px 16px",
                color: G.muted, fontSize: 12.5, maxWidth: 420,
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
   LOAN TYPE MODAL — opens on "Apply" click
═══════════════════════════════════════════════════════════════ */
function LoanTypeModal({ isOpen, onClose, constants, onSelectType }) {
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
          background: "linear-gradient(180deg,#071A10 0%,#040D07 100%)",
          borderTop: "1px solid rgba(16,185,129,0.22)",
          borderRadius: "20px 20px 0 0",
          padding: "28px 20px 40px",
          boxShadow: "0 -16px 60px rgba(0,0,0,0.58), 0 -2px 16px rgba(5,150,105,0.08)",
          animation: closing ? "ltm-slideDown 0.26s ease forwards" : "ltm-slideUp 0.32s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        <div style={{ width: 36, height: 4, borderRadius: 100, background: "rgba(255,255,255,0.1)", margin: "0 auto 24px" }} />

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, flexShrink: 0, background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.22)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          </div>
          <h2 style={{ fontFamily: "var(--font-display,'DM Serif Display',serif)", fontSize: 22, color: "#fff", fontWeight: 400, margin: 0 }}>
            New Loan Application
          </h2>
        </div>
        <p style={{ color: G.muted, fontSize: 13, margin: "0 0 22px", paddingLeft: 44 }}>
          Select the loan type to get started
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {displayTypes.map((type, i) => (
            <button
              key={type.id}
              onClick={() => { onSelectType(type); handleClose() }}
              style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "16px 18px",
                background: "rgba(16,185,129,0.05)",
                border: "1px solid rgba(16,185,129,0.13)",
                borderRadius: 14, cursor: "pointer", width: "100%", textAlign: "left",
                fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)",
                transition: "all 0.18s",
                animation: `ltm-slideUp 0.32s cubic-bezier(0.22,1,0.36,1) ${i * 0.06}s both`,
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(16,185,129,0.10)"; e.currentTarget.style.borderColor = "rgba(16,185,129,0.28)"; e.currentTarget.style.transform = "translateX(2px)" }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(16,185,129,0.05)"; e.currentTarget.style.borderColor = "rgba(16,185,129,0.13)"; e.currentTarget.style.transform = "none" }}
            >
              <div style={{ width: 42, height: 42, borderRadius: 12, flexShrink: 0, background: "linear-gradient(135deg,rgba(5,150,105,0.22),rgba(16,185,129,0.07))", border: "1px solid rgba(16,185,129,0.18)", display: "flex", alignItems: "center", justifyContent: "center", color: G.green2 }}>
                {type.icon}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ color: "#fff", fontSize: 15, fontWeight: 600, margin: "0 0 3px" }}>{type.label}</p>
                {type.desc && <p style={{ color: G.muted, fontSize: 12, margin: 0, lineHeight: 1.4 }}>{type.desc}</p>}
              </div>
              <svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="rgba(16,185,129,0.45)" strokeWidth={2.2}><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          ))}
        </div>

        <button
          onClick={handleClose}
          style={{ width: "100%", marginTop: 16, padding: "13px", background: "transparent", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, color: G.muted, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "var(--font-body,'DM Sans',system-ui,sans-serif)", transition: "all 0.18s" }}
          onMouseEnter={e => { e.currentTarget.style.color = "rgba(255,255,255,0.55)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)" }}
          onMouseLeave={e => { e.currentTarget.style.color = G.muted; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)" }}
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
  const user = loggedInUser.user
  const firstName = user?.fullnames?.split(" ")[0] || user?.details?.firstname || "there"
  const initials = user?.fullnames
    ? user.fullnames.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : "VF"

  const currentLoan = user?.currentLoan || loans[0] || null
  const loanStatus = currentLoan?.loanStatus || null
  const outstanding = currentLoan?.outstandingAmount || 0
  const loanAmount = currentLoan?.loanAmount || 0
  const repayAmt = currentLoan?.repaymentAmount || 0
  const paidSoFar = repayAmt > 0 ? Math.max(0, repayAmt - outstanding) : 0
  const progress = repayAmt > 0 ? Math.min(100, (paidSoFar / repayAmt) * 100) : 0

  return (
    <div style={{ minHeight: "100vh", background: G.page, paddingTop: 72, paddingBottom: 88, position: "relative", overflowX: "hidden" }}>
      <div style={{ position: "fixed", inset: 0, background: `radial-gradient(ellipse 90% 50% at 50% -5%, rgba(16,185,129,0.13) 0%, transparent 65%), radial-gradient(ellipse 60% 40% at 85% 85%, rgba(5,150,105,0.08) 0%, transparent 60%)`, pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1080, margin: "0 auto", padding: "0 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24, animation: "vfSlideUp 0.45s cubic-bezier(.22,1,.36,1)" }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg,rgba(16,185,129,0.25),rgba(5,150,105,0.1))", border: "1.5px solid rgba(16,185,129,0.35)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontFamily: "var(--font-display,'DM Serif Display',serif)", fontSize: 17, color: G.green3, fontWeight: 400 }}>{initials}</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ margin: 0, fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: G.muted }}>Welcome back</p>
            <h1 style={{ margin: 0, fontFamily: "var(--font-display,'DM Serif Display',serif)", fontSize: "clamp(20px,5vw,28px)", color: "#fff", lineHeight: 1.15 }}>{firstName}</h1>
          </div>
          <button onClick={onApplyClick} style={{ ...btnGreen, fontSize: 13, padding: "10px 18px" }}>+ Apply</button>
        </div>

        {loansLoading ? <StatSkeleton /> : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12, marginBottom: 24 }} className="vf-stats-grid">
            <StatCard label="Active Loans" value={loans.filter(l => !["completed", "defaulted", "rejected"].includes(l.loanStatus)).length} icon={<LoanIco />} accent={G.green2} />
            <StatCard label="Outstanding" value={outstanding > 0 ? `K${fmt(outstanding)}` : "K0.00"} icon={<DebtIco />} accent={outstanding > 0 ? G.red : G.green3} mono />
            <StatCard label="Total Borrowed" value={loans.length ? `K${fmt(loans.reduce((s, l) => s + (l.loanAmount || 0), 0))}` : "K0.00"} icon={<WalletIco />} accent={G.blue} mono />
            <StatCard label="Completed" value={loans.filter(l => l.loanStatus === "completed").length} icon={<CheckIco />} accent={G.green3} />
          </div>
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

          {loans.length > 0 && (
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
              <QuickAction href="/esigning" icon={<SignIco size={18} />} label="Sign Documents" desc="Pending forms" />
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

      <style>{css}</style>
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
  const [currentLoanType, setCurrentLoanType] = useState(null)        // "salaryBased" | "assetBased"
  const [loanTypeLoading, setLoanTypeLoading] = useState(false)
  const [allowUserToSignLoanDocuments, setAllowUserToSignLoanDocuments] = useState(false)
  // Controls whether the user proceeds past the on-site gate to the actual signing forms
  const [proceedToSigningForms, setProceedToSigningForms] = useState(false)

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

  /* ── fetch loan type + allowUserToSignLoanDocuments when loan status is "accepted" ── */
  useEffect(() => {
    const currentLoan = loggedInUser?.user?.currentLoan
    if (!currentLoan || currentLoan.loanStatus !== "accepted") return

    const fetchLoanTypeAndSignPermission = async () => {
      setLoanTypeLoading(true)
      try {
        // Populate loanType on the current loan
        const loanWithType = await getLoanFromId(currentLoan.id, "loanType")
        const typeName = loanWithType?.loanType?.data?.attributes?.typeName || "assetBased"
        setCurrentLoanType(typeName)

        // allowUserToSignLoanDocuments lives on the loan itself
        const signingAllowed = loanWithType?.allowUserToSignLoanDocuments === true
        setAllowUserToSignLoanDocuments(signingAllowed)
      } catch (_) {
        setCurrentLoanType("assetBased")
        setAllowUserToSignLoanDocuments(false)
      }
      setLoanTypeLoading(false)
    }

    fetchLoanTypeAndSignPermission()
    // Reset proceed-to-sign when the loan changes
    setProceedToSigningForms(false)
  }, [loggedInUser?.user?.currentLoan?.id, loggedInUser?.user?.currentLoan?.loanStatus])

  /* ── derived: does this loan require on-site verification? ── */
  const loansInformation = constants?.loansInformation || {}
  const requireOnSiteForSalary = loansInformation.requireUserToComeOnSiteVerification === true
  const requireOnSiteForAsset = loansInformation.requireUserToComeOnSiteVerification === true
  // If the setting names differ per loan type, swap the lines above for:
  // const requireOnSiteForSalary = loansInformation.requireUserToComeOnSiteForSalaryLoanVerification === true
  // const requireOnSiteForAsset  = loansInformation.requireUserToComeOnSiteForAssetLoanVerification === true

  const isSalaryLoan = currentLoanType === "salaryBased"
  const requireOnSite = isSalaryLoan ? requireOnSiteForSalary : requireOnSiteForAsset

  /* ── apply button → open loan type modal ── */
  const handleApplyClick = () => setShowLoanTypeModal(true)

  /* ── modal type selected ── */
  const handleLoanTypeSelected = (type) => {
    setSelectedloanCategory(type.id || type)
    setShowLoanTypeModal(false)
    setShowLoanApplicationForms(true)
  }

  /* ─────────────────────────────────────────────────────────────
     showApplyButtons
  ───────────────────────────────────────────────────────────── */
  const showApplyButtons = () => (
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

  /* ─────────────────────────────────────────────────────────────
     showSessionLetter — identical to original
  ───────────────────────────────────────────────────────────── */
  const showSessionLetter = () => {
    const currentLoan = currentLoanWithSessionLetterStuff
    const { collateral } = currentLoan
    const { vehicle } = collateral

    if (vehicle.sessionLetter && vehicle.sessionLetter.data) {
      return null
    }
    if (!(vehicle.sessionLetterTemplate && vehicle.sessionLetterTemplate.data)) {
      return (
        <div style={{ padding: "14px 16px", borderRadius: 12, background: "rgba(245,158,11,0.10)", border: "1px solid rgba(245,158,11,0.25)", color: "#FCD34D", fontSize: 13.5, lineHeight: 1.5, marginTop: 10, display: "flex", gap: 10 }}>
          <span style={{ fontSize: 16, flexShrink: 0 }}>⚠</span>
          <span>We shall send you a message when the session letter template has been uploaded, along with instructions on what to do next. Thank you.</span>
        </div>
      )
    }
    return (
      <div style={{ width: "100%", textAlign: "center", marginTop: 10 }}>
        <FileDownload files={vehicle.sessionLetterTemplate} backEndUrl={backEndUrl} fileDisplayName="Session Letter Template" />
        <div style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "16px 0" }} />
        <h3 style={{ color: "#fff", fontSize: 16, fontWeight: 600, margin: "0 0 4px" }}>Upload Session Letter</h3>
        <p style={{ color: G.muted, fontSize: 12, margin: "0 0 12px", lineHeight: 1.5 }}>
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
     Handles the "accepted" loan status with the on-site gate logic.
  ───────────────────────────────────────────────────────────── */
  const renderAcceptedState = () => {
    const user = loggedInUser.user

    // While fetching loan type, show a brief loader
    if (loanTypeLoading) {
      return (
        <div className="page-content">
          <div className="container-fluid">
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "24px 0", color: G.muted, fontSize: 14 }}>
              <div style={{ width: 18, height: 18, border: `2px solid ${G.green2}`, borderTopColor: "transparent", borderRadius: "50%", animation: "vfSpin 0.7s linear infinite" }} />
              Checking loan requirements…
            </div>
          </div>
          <style>{`@keyframes vfSpin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )
    }

    // If on-site is required AND the user hasn't been allowed to sign yet, show the gate
    if (requireOnSite && !proceedToSigningForms) {
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

    // On-site not required OR user has been cleared — go straight to signing
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

        if (currentLoan.loanStatus === "initiated" || currentLoan.loanStatus === "request-approval") {
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
          // ← delegated to the dedicated handler above
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
      if (typeof window !== "undefined") {
        window.location = "/signin"
      }
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
  const configs = {
    info: { bg: "rgba(59,130,246,0.10)", border: "rgba(59,130,246,0.25)", color: "#93C5FD", icon: "ℹ" },
    success: { bg: "rgba(16,185,129,0.10)", border: "rgba(16,185,129,0.25)", color: "#6EE7B7", icon: "✓" },
    warning: { bg: "rgba(245,158,11,0.10)", border: "rgba(245,158,11,0.25)", color: "#FCD34D", icon: "⚠" },
    error: { bg: "rgba(220,38,38,0.10)", border: "rgba(220,38,38,0.25)", color: "#FCA5A5", icon: "✕" },
  }
  const c = configs[type] || configs.info
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
  return (
    <div style={{ background: G.dim, border: `1px solid ${G.border}`, borderRadius: 14, padding: "16px 14px", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${accent}, transparent)`, borderRadius: "14px 14px 0 0" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: G.muted }}>{label}</span>
        <div style={{ color: accent, opacity: 0.85 }}>{icon}</div>
      </div>
      <div style={{ fontFamily: mono ? "var(--font-mono,'JetBrains Mono',monospace)" : undefined, fontSize: 20, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>{value}</div>
    </div>
  )
}

function StatSkeleton() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12, marginBottom: 24 }}>
      {[0, 1, 2, 3].map(i => (
        <div key={i} style={{ height: 88, borderRadius: 14, background: G.dim, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.06),transparent)", animation: "vfShimmer 1.6s linear infinite" }} />
        </div>
      ))}
    </div>
  )
}

function ActiveLoanCard({ loan, progress, paidSoFar, onApplyClick }) {
  const circ = 2 * Math.PI * 38
  const dash = circ - (circ * progress / 100)
  return (
    <div style={{ background: "linear-gradient(135deg,rgba(16,185,129,0.12),rgba(5,150,105,0.05))", border: "1px solid rgba(16,185,129,0.22)", borderRadius: 16, padding: "20px 18px", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(52,211,153,0.7)", marginBottom: 4 }}>Loan #{loan.id}</div>
          <div style={{ fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", fontSize: "clamp(22px,6vw,32px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.03em" }}>K{fmt(loan.loanAmount || 0)}</div>
        </div>
        <svg width={84} height={84} style={{ flexShrink: 0 }}>
          <circle cx={42} cy={42} r={38} fill="none" stroke={G.dim} strokeWidth={6} />
          <circle cx={42} cy={42} r={38} fill="none" stroke="url(#gGrad)" strokeWidth={6} strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={dash} transform="rotate(-90 42 42)" style={{ transition: "stroke-dashoffset 1s ease" }} />
          <defs>
            <linearGradient id="gGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={G.green1} />
              <stop offset="100%" stopColor={G.green3} />
            </linearGradient>
          </defs>
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

      <div style={{ height: 1, background: "rgba(16,185,129,0.15)", margin: "14px 0" }} />

      <div style={{ display: "flex", gap: 10 }}>
        <Link href="/loans" style={{ ...btnGreen, flex: 1, justifyContent: "center", padding: "10px 0", fontSize: 13 }}>Manage</Link>
        <Link href="/esigning" style={{ ...btnOutline, flex: 1, justifyContent: "center", padding: "10px 0", fontSize: 13 }}>Documents</Link>
      </div>
    </div>
  )
}

function EmptyLoan({ onApplyClick }) {
  return (
    <div style={{ background: G.dim, border: `1px solid ${G.border}`, borderRadius: 16, padding: "32px 24px", textAlign: "center" }}>
      <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(16,185,129,0.1)", border: "1.5px solid rgba(16,185,129,0.2)", margin: "0 auto 14px", display: "flex", alignItems: "center", justifyContent: "center", color: G.green2 }}>
        <LoanIco size={22} />
      </div>
      <div style={{ fontSize: 15, fontWeight: 600, color: "#fff", marginBottom: 6 }}>No Active Loan</div>
      <p style={{ fontSize: 13, color: G.muted, marginBottom: 18, lineHeight: 1.6 }}>Get funds in as little as 24 hours.</p>
      <button onClick={onApplyClick} style={{ ...btnGreen, fontSize: 13, padding: "10px 22px" }}>Apply Now</button>
    </div>
  )
}

function LoanRow({ loan, i }) {
  return (
    <Link href="/loans" style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 14px", borderRadius: 12, background: G.dim, border: `1px solid ${G.border}`, textDecoration: "none", transition: "background 0.2s", animation: `vfSlideUp 0.4s ${i * 0.05}s both cubic-bezier(.22,1,.36,1)` }}>
      <div style={{ width: 4, height: 32, borderRadius: 2, flexShrink: 0, background: statusColor(loan.loanStatus) }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 1 }}>Loan #{loan.id}</div>
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
  const shared = {
    display: "flex", flexDirection: "column", gap: 10, padding: "14px 12px",
    borderRadius: 14, background: G.dim, border: `1px solid ${G.border}`,
    textDecoration: "none", transition: "all 0.2s", cursor: "pointer",
  }
  const handlers = {
    onMouseEnter: e => { e.currentTarget.style.background = "rgba(16,185,129,0.07)"; e.currentTarget.style.borderColor = "rgba(16,185,129,0.22)" },
    onMouseLeave: e => { e.currentTarget.style.background = G.dim; e.currentTarget.style.borderColor = G.border },
  }
  const inner = (
    <>
      <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: G.green2 }}>{icon}</div>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: 11, color: G.muted }}>{desc}</div>
      </div>
    </>
  )
  if (onClick) {
    return <button onClick={onClick} style={{ ...shared, border: `1px solid ${G.border}` }} {...handlers}>{inner}</button>
  }
  return <Link href={href} style={shared} {...handlers}>{inner}</Link>
}

function ProfileStatus({ user }) {
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
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>{complete}/{checks.length} complete</span>
        <span style={{ fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", fontSize: 18, fontWeight: 700, color: pct === 100 ? G.green3 : G.green2 }}>{pct}%</span>
      </div>
      <div style={{ height: 5, background: "rgba(255,255,255,0.07)", borderRadius: 100, marginBottom: 14 }}>
        <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg,${G.green1},${G.green3})`, borderRadius: 100, transition: "width 0.8s ease" }} />
      </div>
      {checks.map(c => (
        <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
          <div style={{ width: 17, height: 17, borderRadius: 5, flexShrink: 0, background: c.done ? "rgba(52,211,153,0.13)" : "rgba(255,255,255,0.05)", border: `1.5px solid ${c.done ? "rgba(52,211,153,0.4)" : "rgba(255,255,255,0.1)"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {c.done && <svg width={9} height={9} viewBox="0 0 12 12" fill="none"><polyline points="2 6 5 9 10 3" stroke={G.green3} strokeWidth={2} strokeLinecap="round" /></svg>}
          </div>
          <span style={{ fontSize: 12, color: c.done ? "rgba(255,255,255,0.75)" : G.muted }}>{c.label}</span>
        </div>
      ))}
      {pct < 100 && (
        <Link href="/profile" style={{ ...btnOutline, width: "100%", marginTop: 12, padding: "9px 0", fontSize: 12.5, justifyContent: "center" }}>Complete Profile</Link>
      )}
    </div>
  )
}

function StatusExplainer({ status }) {
  const map = {
    "initiated": { color: "#FBBF24", msg: "Your application has been initiated. Complete your profile and add collateral." },
    "pending-collateral-addition": { color: "#FBBF24", msg: "Please add your collateral information to continue." },
    "pending-collateral-inspection": { color: "#FBBF24", msg: "Your collateral is pending inspection by our team." },
    "collateral-inspection": { color: "#A78BFA", msg: "An inspector is reviewing your collateral." },
    "request-approval": { color: "#818CF8", msg: "Your officer has submitted your application for management approval." },
    "accepted": { color: G.green3, msg: "Congratulations! Loan accepted. Please review and sign your loan documents." },
    "pending-approval": { color: "#A78BFA", msg: "Your documents are being processed. Funds will be disbursed soon." },
    "approved": { color: G.green2, msg: "Fully approved. Disbursement is being processed." },
    "disbursed": { color: "#60A5FA", msg: "Funds sent! Check your repayment schedule." },
    "completed": { color: "#9CA3AF", msg: "This loan has been fully repaid. Thank you!" },
    "rejected": { color: "#F87171", msg: "Loan declined. You may re-apply or contact us for more details." },
    "defaulted": { color: "#DC2626", msg: "This loan is in default. Please contact us immediately." },
  }
  const { color, msg } = map[status] || { color: "#9CA3AF", msg: "Current loan status." }
  return (
    <div style={{ padding: "14px 16px", borderRadius: 12, background: `${color}12`, border: `1px solid ${color}33` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 7 }}>
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: color, flexShrink: 0 }} />
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color }}>{status}</span>
      </div>
      <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, margin: 0 }}>{msg}</p>
    </div>
  )
}

function IP({ label, value, mono, green }) {
  return (
    <div>
      <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: G.muted, marginBottom: 3 }}>{label}</div>
      <div style={{ fontFamily: mono ? "var(--font-mono,'JetBrains Mono',monospace)" : undefined, fontSize: 13.5, fontWeight: 500, color: green ? G.green3 : "rgba(255,255,255,0.88)" }}>{value}</div>
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
      <div style={{ width: 3, height: 14, borderRadius: 2, background: `linear-gradient(180deg,${G.green1},${G.green3})` }} />
      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: G.muted }}>{children}</span>
    </div>
  )
}

function SPill({ status }) {
  const colors = {
    "initiated": "#FBBF24", "pending-collateral-addition": "#FBBF24", "pending-collateral-inspection": "#FBBF24",
    "collateral-inspection": "#A78BFA", "request-approval": "#818CF8", "accepted": G.green3,
    "pending-approval": "#A78BFA", "approved": G.green2, "disbursed": "#60A5FA",
    "completed": "#9CA3AF", "rejected": "#F87171", "defaulted": "#DC2626",
  }
  const c = colors[status] || "#9CA3AF"
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 100, background: `${c}18`, color: c, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: c, flexShrink: 0 }} />
      {status}
    </span>
  )
}

function Skel({ height }) {
  return (
    <div style={{ height, borderRadius: 14, background: G.dim, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.055),transparent)", animation: "vfShimmer 1.6s linear infinite" }} />
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
function SignIco({ size = 17 }) { return <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg> }
function SalaryIco() { return <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /><line x1="12" y1="12" x2="12" y2="16" /><line x1="10" y1="14" x2="14" y2="14" /></svg> }
function AssetIco() { return <svg width={20} height={20} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg> }

/* ─── helpers ───────────────────────────────────────────────── */
function fmt(n) { return parseFloat(n).toLocaleString("en-ZM", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }
function statusColor(s) {
  const m = { initiated: "#FBBF24", "pending-collateral-addition": "#FBBF24", "pending-collateral-inspection": "#FBBF24", "collateral-inspection": "#A78BFA", "request-approval": "#818CF8", accepted: "#34D399", "pending-approval": "#A78BFA", approved: "#10B981", disbursed: "#60A5FA", completed: "#9CA3AF", rejected: "#F87171", defaulted: "#DC2626" }
  return m[s] || "#9CA3AF"
}

/* ─── global css ────────────────────────────────────────────── */
const css = `
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