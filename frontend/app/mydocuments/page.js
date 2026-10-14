// // "use client"

// // import FileDownload from "@/components/Includes/FileDownload/FileDownload";
// // import { backEndUrl } from "@/Constants";
// // import { usePage } from "@/Contexts/PageContext";
// // import { useUser } from "@/Contexts/UserContext";
// // import { getLoanFromId, scrolltoTopOFPage } from "@/Functions";
// // import { Alert } from "@mui/material";
// // import { useEffect, useState } from "react";

// // export default function Home() {
// // const [currentLoanWithLoanDocument, setCurrentLoanWithLoanDocument] = useState(null)
// //   const loggedInUser = useUser()
// //   const { setPage } = usePage()



// //   setPage('/mydocuments')
// //   scrolltoTopOFPage() // should always show the top of the page as the view point

// //   useEffect(()=>{
// //      const runSetCurrentLoanWithLoanDocument = async ()=>{
// //        setCurrentLoanWithLoanDocument(await getLoanFromId(loggedInUser.user.currentLoan.id,"loanAgreementDocuments"))
// //     }
// //     if(loggedInUser.user.currentLoan){
// //       runSetCurrentLoanWithLoanDocument()
// //     }
// //   },[loggedInUser?.user?.currentLoan])

// //   if(!currentLoanWithLoanDocument || !currentLoanWithLoanDocument.loanAgreementDocuments){
// //     <div className="page-content">
// //           <div className="container-fluid">
// //             <Alert severity="infor">This loan doesn't have any documents</Alert>
// //           </div>
// //          </div>
// //   }
// //   if(currentLoanWithLoanDocument && currentLoanWithLoanDocument.loanAgreementDocuments && currentLoanWithLoanDocument.loanAgreementDocuments.data && currentLoanWithLoanDocument.loanAgreementDocuments.data === null){
// //     <div className="page-content">
// //           <div className="container-fluid">
// //             <Alert severity="infor">This loan doesn't have any documents</Alert>
// //           </div>
// //          </div>
// //   }

// //   return (
// //     <div className="page-content">
// //           <div className="container-fluid text-center">
// //             <h4>All the documents associated with your account shall appear below here</h4>
// //             <br/>
// //             <FileDownload
// //                 files={currentLoanWithLoanDocument?.loanAgreementDocuments || null}
// //                 backEndUrl={backEndUrl}
// //                 fileDisplayName="Your Signed Loan Agreement Form"
// //             />
// //           </div>
// //          </div>
// //   )
// // }

// "use client"

// import FileDownload from "@/components/Includes/FileDownload/FileDownload"
// import { backEndUrl } from "@/Constants"
// import { usePage } from "@/Contexts/PageContext"
// import { useUser } from "@/Contexts/UserContext"
// import { getLoanFromId, scrolltoTopOFPage } from "@/Functions"
// import { useEffect, useState } from "react"
// import { useThemeMode } from "@/components/ThemeProvider"

// /* ─── colour tokens (synced with ThemeProvider) ─────────────── */
// function useTokens() {
//   const { isDark } = useThemeMode()
//   return {
//     page: isDark ? "#0A0F1E" : "#F0F4F1",
//     card: isDark ? "rgba(255,255,255,0.04)" : "#FFFFFF",
//     border: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
//     text: isDark ? "#FFFFFF" : "#0D1F17",
//     muted: isDark ? "rgba(255,255,255,0.45)" : "rgba(13,31,23,0.55)",
//     green1: "#059669",
//     green2: "#10B981",
//     green3: "#34D399",
//     amber: "#FBBF24",
//     red: "#F87171",
//     blue: "#60A5FA",
//   }
// }

// /* ─── banner ─────────────────────────────────────────────────── */
// function Banner({ type, children, G }) {
//   const configs = {
//     info: { bg: "rgba(96,165,250,0.10)", border: "rgba(96,165,250,0.25)", color: G.blue, icon: "ℹ" },
//     success: { bg: "rgba(16,185,129,0.10)", border: "rgba(16,185,129,0.25)", color: G.green3, icon: "✓" },
//     warning: { bg: "rgba(245,158,11,0.10)", border: "rgba(245,158,11,0.25)", color: G.amber, icon: "⚠" },
//     error: { bg: "rgba(220,38,38,0.10)", border: "rgba(220,38,38,0.25)", color: G.red, icon: "✕" },
//   }
//   const c = configs[type] || configs.info
//   return (
//     <div style={{
//       display: "flex", alignItems: "flex-start", gap: 10,
//       padding: "14px 16px", borderRadius: 12,
//       background: c.bg, border: `1px solid ${c.border}`,
//       color: c.color, fontSize: 13.5, lineHeight: 1.55,
//       fontFamily: "'DM Sans', system-ui, sans-serif",
//     }}>
//       <span style={{ fontSize: 16, flexShrink: 0, lineHeight: 1.4 }}>{c.icon}</span>
//       <span>{children}</span>
//     </div>
//   )
// }

// /* ─── skeleton shimmer ───────────────────────────────────────── */
// function Skel({ height = 160, G }) {
//   return (
//     <div style={{ height, borderRadius: 14, background: G.card, border: `1px solid ${G.border}`, position: "relative", overflow: "hidden" }}>
//       <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,transparent,rgba(16,185,129,0.06),transparent)", animation: "vfShimmer 1.6s linear infinite" }} />
//     </div>
//   )
// }

// /* ═══════════════════════════════════════════════════════════════
//    PAGE
// ═══════════════════════════════════════════════════════════════ */
// export default function MyDocumentsPage() {
//   const [loanWithDocs, setLoanWithDocs] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(false)

//   const loggedInUser = useUser()
//   const { setPage } = usePage()
//   const G = useTokens()
//   const { isDark } = useThemeMode()

//   setPage("/mydocuments")
//   scrolltoTopOFPage()

//   useEffect(() => {
//     const run = async () => {
//       if (!loggedInUser?.user?.currentLoan) {
//         setLoading(false)
//         return
//       }
//       try {
//         const result = await getLoanFromId(
//           loggedInUser.user.currentLoan.id,
//           "loanAgreementDocuments"
//         )
//         setLoanWithDocs(result)
//       } catch (_) {
//         setError(true)
//       }
//       setLoading(false)
//     }
//     run()
//   }, [loggedInUser?.user?.currentLoan])

//   /* ── derived ── */
//   const hasDocs =
//     loanWithDocs?.loanAgreementDocuments?.data &&
//     loanWithDocs.loanAgreementDocuments.data !== null

//   /* ── background glow (dark mode only) ── */
//   const bgGlow = isDark
//     ? `radial-gradient(ellipse 80% 40% at 50% -10%, rgba(16,185,129,0.11) 0%, transparent 65%)`
//     : "none"

//   return (
//     <div
//       className="page-content"
//       style={{
//         minHeight: "100vh",
//         background: G.page,
//         fontFamily: "'DM Sans', system-ui, sans-serif",
//         position: "relative",
//       }}
//     >
//       {/* subtle bg glow */}
//       {isDark && (
//         <div style={{
//           position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
//           background: bgGlow,
//         }} />
//       )}

//       <div className="container-fluid" style={{ position: "relative", zIndex: 1, maxWidth: 720, margin: "0 auto", padding: "0 16px" }}>

//         {/* ── page header ── */}
//         <div style={{ marginBottom: 28, animation: "vfSlideUp 0.4s cubic-bezier(.22,1,.36,1)" }}>
//           <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
//             <div style={{
//               width: 40, height: 40, borderRadius: 12, flexShrink: 0,
//               background: "linear-gradient(135deg,rgba(16,185,129,0.18),rgba(5,150,105,0.07))",
//               border: "1.5px solid rgba(16,185,129,0.28)",
//               display: "flex", alignItems: "center", justifyContent: "center",
//             }}>
//               <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth={2}>
//                 <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
//                 <polyline points="14 2 14 8 20 8" />
//                 <line x1="16" y1="13" x2="8" y2="13" />
//                 <line x1="16" y1="17" x2="8" y2="17" />
//                 <polyline points="10 9 9 9 8 9" />
//               </svg>
//             </div>
//             <div>
//               <h1 style={{
//                 margin: 0,
//                 fontFamily: "'DM Serif Display', Georgia, serif",
//                 fontSize: "clamp(22px,5vw,30px)",
//                 color: G.text,
//                 lineHeight: 1.15,
//                 fontWeight: 400,
//               }}>
//                 My Documents
//               </h1>
//               <p style={{ margin: 0, fontSize: 13, color: G.muted, marginTop: 2 }}>
//                 Loan agreements and signed documents associated with your account
//               </p>
//             </div>
//           </div>

//           {/* decorative rule */}
//           <div style={{ height: 1, background: `linear-gradient(90deg, rgba(16,185,129,0.35), transparent)`, borderRadius: 1, marginTop: 16 }} />
//         </div>

//         {/* ── content ── */}
//         {loading ? (
//           <Skel height={200} G={G} />
//         ) : error ? (
//           <Banner type="error" G={G}>
//             Something went wrong while loading your documents. Please try refreshing the page.
//           </Banner>
//         ) : !loggedInUser?.user?.currentLoan ? (
//           <div style={{
//             background: G.card,
//             border: `1px solid ${G.border}`,
//             borderRadius: 16,
//             padding: "40px 24px",
//             textAlign: "center",
//             animation: "vfSlideUp 0.45s cubic-bezier(.22,1,.36,1)",
//           }}>
//             <div style={{
//               width: 56, height: 56, borderRadius: 16, margin: "0 auto 16px",
//               background: "linear-gradient(135deg,rgba(16,185,129,0.14),rgba(5,150,105,0.05))",
//               border: "1.5px solid rgba(16,185,129,0.22)",
//               display: "flex", alignItems: "center", justifyContent: "center",
//             }}>
//               <svg width={24} height={24} fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth={1.7}>
//                 <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
//                 <polyline points="14 2 14 8 20 8" />
//               </svg>
//             </div>
//             <p style={{ color: G.text, fontWeight: 600, fontSize: 16, margin: "0 0 8px" }}>No Active Loan</p>
//             <p style={{ color: G.muted, fontSize: 13.5, lineHeight: 1.6, margin: 0, maxWidth: 340, marginInline: "auto" }}>
//               Documents from your loan agreements will appear here once you have an active loan.
//             </p>
//           </div>
//         ) : !hasDocs ? (
//           <div style={{ animation: "vfSlideUp 0.45s cubic-bezier(.22,1,.36,1)" }}>
//             <Banner type="info" G={G}>
//               No documents have been attached to your current loan yet. Check back once your loan officer has uploaded them.
//             </Banner>
//           </div>
//         ) : (
//           <div style={{
//             background: G.card,
//             border: `1px solid ${G.border}`,
//             borderRadius: 16,
//             padding: "24px 20px",
//             animation: "vfSlideUp 0.45s cubic-bezier(.22,1,.36,1)",
//           }}>
//             {/* section label */}
//             <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
//               <div style={{ width: 3, height: 14, borderRadius: 2, background: "linear-gradient(180deg,#059669,#34D399)", flexShrink: 0 }} />
//               <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: G.muted }}>
//                 Loan Agreement
//               </span>
//             </div>

//             <FileDownload
//               files={loanWithDocs.loanAgreementDocuments}
//               backEndUrl={backEndUrl}
//               fileDisplayName="Your Signed Loan Agreement Form"
//             />
//           </div>
//         )}

//         {/* spacer for bottom nav */}
//         <div style={{ height: 88 }} />
//       </div>

//       <style>{`
//         @keyframes vfSlideUp {
//           from { opacity: 0; transform: translateY(18px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes vfShimmer {
//           0%   { transform: translateX(-100%); }
//           100% { transform: translateX(200%); }
//         }
//       `}</style>
//     </div>
//   )
// }
"use client"

import FileDownload from "@/components/Includes/FileDownload/FileDownload"
import { backEndUrl } from "@/Constants"
import { usePage } from "@/Contexts/PageContext"
import { useUser } from "@/Contexts/UserContext"
import { getLoanFromId, getLoansFromClientId, scrolltoTopOFPage, updateUserAccount } from "@/Functions"
import { useEffect, useState } from "react"
import { useThemeMode } from "@/components/ThemeProvider"

/* ─── colour tokens (synced with ThemeProvider) ─────────────── */
function useTokens() {
  const { isDark } = useThemeMode()
  return {
    isDark,
    page: isDark ? "#0A0F1E" : "#F0F4F1",
    card: isDark ? "rgba(255,255,255,0.04)" : "#FFFFFF",
    cardAccent: isDark ? "rgba(16,185,129,0.07)" : "rgba(14,159,113,0.05)",
    border: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
    borderAccent: isDark ? "rgba(16,185,129,0.22)" : "rgba(14,159,113,0.2)",
    text: isDark ? "#FFFFFF" : "#0D1F17",
    muted: isDark ? "rgba(255,255,255,0.45)" : "rgba(13,31,23,0.55)",
    faint: isDark ? "rgba(255,255,255,0.3)" : "rgba(13,31,23,0.4)",
    green1: "#059669",
    green2: isDark ? "#10B981" : "#0E9F71",
    green3: "#34D399",
    amber: "#D97706",
    red: isDark ? "#F87171" : "#DC2626",
    blue: isDark ? "#60A5FA" : "#2563EB",
  }
}

/* ─── banner ─────────────────────────────────────────────────── */
function Banner({ type, children, G }) {
  const configs = {
    info: { bg: G.isDark ? "rgba(96,165,250,0.10)" : "rgba(37,99,235,0.07)", border: G.isDark ? "rgba(96,165,250,0.25)" : "rgba(37,99,235,0.2)", color: G.blue, icon: "ℹ" },
    success: { bg: G.isDark ? "rgba(16,185,129,0.10)" : "rgba(14,159,113,0.07)", border: G.isDark ? "rgba(16,185,129,0.25)" : "rgba(14,159,113,0.2)", color: G.green3, icon: "✓" },
    warning: { bg: "rgba(217,119,6,0.08)", border: "rgba(217,119,6,0.22)", color: G.amber, icon: "⚠" },
    error: { bg: G.isDark ? "rgba(220,38,38,0.10)" : "rgba(220,38,38,0.07)", border: G.isDark ? "rgba(220,38,38,0.25)" : "rgba(220,38,38,0.22)", color: G.red, icon: "✕" },
  }
  const c = configs[type] || configs.info
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: 10,
      padding: "14px 16px", borderRadius: 12,
      background: c.bg, border: `1px solid ${c.border}`,
      color: c.color, fontSize: 13.5, lineHeight: 1.55,
      fontFamily: "'DM Sans', system-ui, sans-serif",
    }}>
      <span style={{ fontSize: 16, flexShrink: 0, lineHeight: 1.4 }}>{c.icon}</span>
      <span>{children}</span>
    </div>
  )
}

/* ─── skeleton shimmer ───────────────────────────────────────── */
function Skel({ height = 160, G }) {
  return (
    <div style={{ height, borderRadius: 14, background: G.card, border: `1px solid ${G.border}`, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,transparent,rgba(16,185,129,0.06),transparent)", animation: "vfShimmer 1.6s linear infinite" }} />
    </div>
  )
}

/* ─── section label ──────────────────────────────────────────── */
function SectionLabel({ children, G }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
      <div style={{ width: 3, height: 14, borderRadius: 2, background: `linear-gradient(180deg,${G.green1},${G.green3})`, flexShrink: 0 }} />
      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: G.muted }}>
        {children}
      </span>
    </div>
  )
}

/* ─── status pill (reused, lightweight) ─────────────────────── */
function StatusPill({ status, G }) {
  const colors = {
    "initiated": "#D97706", "pending-collateral-addition": "#D97706", "pending-collateral-inspection": "#D97706",
    "collateral-inspection": "#7C3AED", "request-approval": "#4F46E5", "accepted": G.green3,
    "pending-approval": "#7C3AED", "approved": G.green2, "disbursed": G.blue,
    "completed": G.faint, "rejected": G.red, "defaulted": "#DC2626",
  }
  const c = colors[status] || G.faint
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 100, background: `${c}1c`, color: c, fontSize: 9.5, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: c, flexShrink: 0 }} />
      {status}
    </span>
  )
}

/* ═══════════════════════════════════════════════════════════════
   CURRENT LOAN DOCUMENTS CARD — the loan set on loggedInUser.currentLoan
═══════════════════════════════════════════════════════════════ */
function CurrentLoanDocsCard({ loan, G }) {
  const hasDocs = loan?.loanAgreementDocuments?.data && loan.loanAgreementDocuments.data !== null

  return (
    <div style={{
      background: G.cardAccent,
      border: `1px solid ${G.borderAccent}`,
      borderRadius: 16,
      padding: "20px 20px 22px",
      animation: "vfSlideUp 0.45s cubic-bezier(.22,1,.36,1)",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, gap: 10, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 3, height: 14, borderRadius: 2, background: `linear-gradient(180deg,${G.green1},${G.green3})`, flexShrink: 0 }} />
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: G.muted }}>
            Current Loan — Agreement
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{
            fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 700, color: G.green2,
            background: G.isDark ? "rgba(16,185,129,0.12)" : "rgba(14,159,113,0.1)",
            border: `1px solid ${G.borderAccent}`, borderRadius: 8, padding: "3px 9px",
          }}>
            Loan #{loan.id}
          </span>
          {loan.loanStatus && <StatusPill status={loan.loanStatus} G={G} />}
        </div>
      </div>

      {hasDocs ? (
        <FileDownload
          files={loan.loanAgreementDocuments}
          backEndUrl={backEndUrl}
          fileDisplayName="Your Signed Loan Agreement Form"
        />
      ) : (
        <Banner type="info" G={G}>
          No documents have been attached to your current loan yet. Check back once your loan officer has uploaded them.
        </Banner>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   OTHER LOAN DOCUMENTS ROW — any loan that isn't the current one
═══════════════════════════════════════════════════════════════ */
function OtherLoanDocsRow({ loan, onViewLoan, isSwitching, G }) {
  const hasDocs = loan?.loanAgreementDocuments?.data && loan.loanAgreementDocuments.data !== null

  return (
    <div style={{
      background: G.card,
      border: `1px solid ${G.border}`,
      borderRadius: 14,
      padding: "16px 16px 18px",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, gap: 10, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{
            fontFamily: "'JetBrains Mono',monospace", fontSize: 12, fontWeight: 700, color: G.text,
            background: G.isDark ? "rgba(255,255,255,0.06)" : "rgba(13,31,23,0.05)",
            border: `1px solid ${G.border}`, borderRadius: 8, padding: "3px 9px",
          }}>
            Loan #{loan.id}
          </span>
          {loan.loanStatus && <StatusPill status={loan.loanStatus} G={G} />}
        </div>
        <button
          onClick={onViewLoan}
          disabled={isSwitching}
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "7px 14px", borderRadius: 9,
            background: "transparent",
            border: `1.5px solid ${G.borderAccent}`,
            color: G.green2, fontSize: 12, fontWeight: 700,
            cursor: isSwitching ? "default" : "pointer",
            fontFamily: "'DM Sans',system-ui,sans-serif",
            opacity: isSwitching ? 0.6 : 1,
            transition: "all 0.18s",
            whiteSpace: "nowrap",
          }}
        >
          {isSwitching ? "Switching…" : <>View Loan <ChevronRight /></>}
        </button>
      </div>

      {hasDocs ? (
        <FileDownload
          files={loan.loanAgreementDocuments}
          backEndUrl={backEndUrl}
          fileDisplayName="Signed Loan Agreement Form"
        />
      ) : (
        <p style={{ fontSize: 12.5, color: G.muted, margin: 0, lineHeight: 1.5 }}>
          No documents attached to this loan.
        </p>
      )}
    </div>
  )
}

function ChevronRight() {
  return <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><polyline points="9 18 15 12 9 6" /></svg>
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export default function MyDocumentsPage() {
  const [currentLoanWithDocs, setCurrentLoanWithDocs] = useState(null)
  const [allLoans, setAllLoans] = useState([])
  const [loadingCurrent, setLoadingCurrent] = useState(true)
  const [loadingAll, setLoadingAll] = useState(true)
  const [error, setError] = useState(false)
  const [switchingId, setSwitchingId] = useState(null)

  const loggedInUser = useUser()
  const { setPage } = usePage()
  const G = useTokens()

  setPage("/mydocuments")
  scrolltoTopOFPage()

  /* ── fetch current loan + its documents ── */
  useEffect(() => {
    const run = async () => {
      if (!loggedInUser?.user?.currentLoan) {
        setLoadingCurrent(false)
        return
      }
      try {
        const result = await getLoanFromId(
          loggedInUser.user.currentLoan.id,
          "loanAgreementDocuments"
        )
        setCurrentLoanWithDocs(result)
      } catch (_) {
        setError(true)
      }
      setLoadingCurrent(false)
    }
    run()
  }, [loggedInUser?.user?.currentLoan])

  /* ── fetch every loan belonging to this client (already includes docs) ── */
  useEffect(() => {
    const run = async () => {
      if (!loggedInUser?.user?.id) {
        setLoadingAll(false)
        return
      }
      try {
        const data = await getLoansFromClientId(loggedInUser.user.id, "loanAgreementDocuments")
        setAllLoans(Array.isArray(data) ? data : [])
      } catch (_) {
        setError(true)
      }
      setLoadingAll(false)
    }
    run()
  }, [loggedInUser?.user?.id])

  /* ── set a different loan as the active/current one ── */
  const handleViewLoan = async (loanId) => {
    if (!loggedInUser?.user) return
    setSwitchingId(loanId)
    try {
      const updateObj = { currentLoan: { connect: [loanId] } }
      const updatedUserAccount = await updateUserAccount(updateObj, loggedInUser.user.id)
      if (!updatedUserAccount.hasOwnProperty("error")) {
        window.location = "/"
      }
    } catch (_) { }
    setSwitchingId(null)
  }

  const currentLoanId = loggedInUser?.user?.currentLoan?.id || null
  const otherLoans = allLoans.filter(l => l.id !== currentLoanId)

  const isLoading = loadingCurrent || loadingAll

  return (
    <div
      className="page-content"
      style={{
        minHeight: "100vh",
        background: G.page,
        fontFamily: "'DM Sans', system-ui, sans-serif",
        position: "relative",
      }}
    >
      {G.isDark && (
        <div style={{
          position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
          background: `radial-gradient(ellipse 80% 40% at 50% -10%, rgba(16,185,129,0.11) 0%, transparent 65%)`,
        }} />
      )}

      <div className="container-fluid" style={{ position: "relative", zIndex: 1, maxWidth: 720, margin: "0 auto", padding: "0 16px" }}>

        {/* ── page header ── */}
        <div style={{ marginBottom: 28, animation: "vfSlideUp 0.4s cubic-bezier(.22,1,.36,1)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12, flexShrink: 0,
              background: "linear-gradient(135deg,rgba(16,185,129,0.18),rgba(5,150,105,0.07))",
              border: "1.5px solid rgba(16,185,129,0.28)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth={2}>
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <div>
              <h1 style={{
                margin: 0,
                fontFamily: "'DM Serif Display', Georgia, serif",
                fontSize: "clamp(22px,5vw,30px)",
                color: G.text,
                lineHeight: 1.15,
                fontWeight: 400,
              }}>
                My Documents
              </h1>
              <p style={{ margin: 0, fontSize: 13, color: G.muted, marginTop: 2 }}>
                Loan agreements and signed documents associated with your account
              </p>
            </div>
          </div>

          <div style={{ height: 1, background: `linear-gradient(90deg, rgba(16,185,129,0.35), transparent)`, borderRadius: 1, marginTop: 16 }} />
        </div>

        {/* ── loading ── */}
        {isLoading ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Skel height={180} G={G} />
            <Skel height={100} G={G} />
          </div>
        ) : error ? (
          <Banner type="error" G={G}>
            Something went wrong while loading your documents. Please try refreshing the page.
          </Banner>
        ) : (
          <>
            {/* ── CURRENT LOAN ── */}
            <div style={{ marginBottom: 28 }}>
              {!loggedInUser?.user?.currentLoan ? (
                <div style={{
                  background: G.card,
                  border: `1px solid ${G.border}`,
                  borderRadius: 16,
                  padding: "40px 24px",
                  textAlign: "center",
                  animation: "vfSlideUp 0.45s cubic-bezier(.22,1,.36,1)",
                }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: 16, margin: "0 auto 16px",
                    background: "linear-gradient(135deg,rgba(16,185,129,0.14),rgba(5,150,105,0.05))",
                    border: "1.5px solid rgba(16,185,129,0.22)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <svg width={24} height={24} fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth={1.7}>
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <p style={{ color: G.text, fontWeight: 600, fontSize: 16, margin: "0 0 8px" }}>No Active Loan</p>
                  <p style={{ color: G.muted, fontSize: 13.5, lineHeight: 1.6, margin: 0, maxWidth: 340, marginInline: "auto" }}>
                    Documents from your loan agreements will appear here once you have an active loan.
                  </p>
                </div>
              ) : (
                <CurrentLoanDocsCard loan={currentLoanWithDocs} G={G} />
              )}
            </div>

            {/* ── OTHER LOANS ── */}
            {otherLoans.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <SectionLabel G={G}>Other Loans</SectionLabel>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {otherLoans.map((loan, i) => (
                    <div key={loan.id} style={{ animation: `vfSlideUp 0.4s ${i * 0.05}s both cubic-bezier(.22,1,.36,1)` }}>
                      <OtherLoanDocsRow
                        loan={loan}
                        onViewLoan={() => handleViewLoan(loan.id)}
                        isSwitching={switchingId === loan.id}
                        G={G}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* spacer for bottom nav */}
        <div style={{ height: 88 }} />
      </div>

      <style>{`
        @keyframes vfSlideUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes vfShimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  )
}