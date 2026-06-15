// // // // // 'use client'

// // // // // import React from 'react'
// // // // // import Box from '@mui/material/Box'
// // // // // import Paper from '@mui/material/Paper'
// // // // // import Grid from '@mui/material/Grid'
// // // // // import Divider from '@mui/material/Divider'
// // // // // import { Alert } from '@mui/material'
// // // // // import { Slide } from '@material-ui/core'
// // // // // import { ThemeProvider } from '@mui/material/styles'
// // // // // import CollateralCarousel from './CollateralCarousel'
// // // // // import { adminTheme, G, FONTS, pillSx, statusColor } from '@/styles/admin-theme'

// // // // // /* ─── Info row sub-component ────────────────────────────────── */
// // // // // function InfoRow({ label, value, mono, highlight }) {
// // // // //   return (
// // // // //     <Box sx={{
// // // // //       display: 'flex',
// // // // //       alignItems: 'flex-start',
// // // // //       justifyContent: 'space-between',
// // // // //       py: 1,
// // // // //       borderBottom: `1px solid rgba(255,255,255,0.05)`,
// // // // //       gap: 2,
// // // // //       '&:last-child': { borderBottom: 'none' },
// // // // //     }}>
// // // // //       <Box sx={{ fontSize: '12px', color: G.muted, fontFamily: FONTS.body, flexShrink: 0, pt: 0.1 }}>{label}</Box>
// // // // //       <Box sx={{
// // // // //         fontSize: '13px',
// // // // //         fontWeight: 500,
// // // // //         color: highlight ? G.green3 : 'rgba(255,255,255,0.88)',
// // // // //         fontFamily: mono ? FONTS.mono : FONTS.body,
// // // // //         textAlign: 'right',
// // // // //         wordBreak: 'break-word',
// // // // //       }}>
// // // // //         {value ?? '—'}
// // // // //       </Box>
// // // // //     </Box>
// // // // //   )
// // // // // }

// // // // // /* ─── Section header ─────────────────────────────────────────── */
// // // // // function SectionLabel({ children }) {
// // // // //   return (
// // // // //     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, mt: 0.5 }}>
// // // // //       <Box sx={{ width: 3, height: 14, borderRadius: 1, background: `linear-gradient(180deg, ${G.green1}, ${G.green3})` }} />
// // // // //       <Box sx={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: G.muted, fontFamily: FONTS.body }}>
// // // // //         {children}
// // // // //       </Box>
// // // // //     </Box>
// // // // //   )
// // // // // }

// // // // // /**
// // // // //  * Resolve loan type from both populated shapes Strapi can return:
// // // // //  *   - flat:   loan.loanType.typeName
// // // // //  *   - nested: loan.loanType.data.attributes.typeName
// // // // //  */
// // // // // const getLoanTypeName = (loan) =>
// // // // //   loan?.loanType?.typeName ||
// // // // //   loan?.loanType?.data?.attributes?.typeName ||
// // // // //   ''

// // // // // export default class LoanDetails extends React.Component {
// // // // //   formatDate = d => {
// // // // //     if (!d) return '—'
// // // // //     try { return new Date(d).toLocaleString() } catch (e) { return d }
// // // // //   }

// // // // //   renderCollateralDetails = collateral => {
// // // // //     if (!collateral) return <InfoRow label="Collateral" value="—" />
// // // // //     const t = collateral.collateralType
// // // // //     if (t === 'vehicle') {
// // // // //       const v = collateral.vehicle || {}
// // // // //       return (
// // // // //         <>
// // // // //           <InfoRow label="Number Plate" value={v.numberPlate || '—'} mono />
// // // // //           <InfoRow label="Packed" value={v.packed ? 'Yes' : 'No'} />
// // // // //           <InfoRow label="Packing Fee Paid" value={v.packingFeePaid ? 'Yes' : 'No'} />
// // // // //         </>
// // // // //       )
// // // // //     }
// // // // //     if (t === 'land' || t === 'house') {
// // // // //       const h = collateral[t] || {}
// // // // //       return (
// // // // //         <>
// // // // //           <InfoRow label="Location" value={h.location || '—'} />
// // // // //           <InfoRow label="Plot Number" value={h.plotNumber || '—'} />
// // // // //         </>
// // // // //       )
// // // // //     }
// // // // //     return <InfoRow label="Collateral Name" value={collateral.otherCollateralName || '—'} />
// // // // //   }

// // // // //   // ── Salary loan: no collateral, show salary details instead ───────────────
// // // // //   renderSalaryLoanDetails = () => {
// // // // //     const { loan, role } = this.props
// // // // //     const sc = statusColor(loan.loanStatus)

// // // // //     return (
// // // // //       <Slide in={true} direction="right">
// // // // //         <Box sx={{ maxWidth: 680, mx: 'auto', p: { xs: 1.5, sm: 2 }, fontFamily: FONTS.body }}>

// // // // //           {/* ── Hero amount card ── */}
// // // // //           <Box sx={{
// // // // //             background: `linear-gradient(135deg, ${sc}14, ${sc}06)`,
// // // // //             border: `1px solid ${sc}28`,
// // // // //             borderRadius: '20px',
// // // // //             p: 3,
// // // // //             mb: 2,
// // // // //             position: 'relative',
// // // // //             overflow: 'hidden',
// // // // //           }}>
// // // // //             <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${sc}, transparent)`, borderRadius: '20px 20px 0 0' }} />
// // // // //             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2, flexWrap: 'wrap' }}>
// // // // //               <Box>
// // // // //                 <Box sx={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: G.muted, mb: 0.75 }}>
// // // // //                   Requested Amount
// // // // //                 </Box>
// // // // //                 <Box sx={{ fontFamily: FONTS.mono, fontSize: 'clamp(24px,6vw,36px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>
// // // // //                   K{loan.clientAskingAmount || loan.loanAmount || '—'}
// // // // //                 </Box>
// // // // //                 {loan.loanAmount && loan.clientAskingAmount && loan.loanAmount !== loan.clientAskingAmount && (
// // // // //                   <Box sx={{ mt: 0.5, fontSize: '12px', color: G.muted }}>
// // // // //                     Approved: <Box component="span" sx={{ fontFamily: FONTS.mono, color: G.green3, fontWeight: 600 }}>K{loan.loanAmount}</Box>
// // // // //                   </Box>
// // // // //                 )}
// // // // //               </Box>
// // // // //               {/* Salary badge */}
// // // // //               <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
// // // // //                 <Box component="span" sx={pillSx(loan.loanStatus === "accepted" ? "accepted" : loan.loanStatus)}>
// // // // //                   {loan.loanStatus === "accepted" ? "Approved" : loan.loanStatus}
// // // // //                 </Box>
// // // // //                 <Box sx={{
// // // // //                   px: '8px', py: '3px', borderRadius: '100px',
// // // // //                   fontSize: '9px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
// // // // //                   background: 'rgba(96,165,250,0.12)', color: '#60a5fa',
// // // // //                   border: '1px solid rgba(96,165,250,0.25)',
// // // // //                 }}>
// // // // //                   Salary Loan
// // // // //                 </Box>
// // // // //               </Box>
// // // // //             </Box>
// // // // //           </Box>

// // // // //           {/* No collateral notice */}
// // // // //           <Paper sx={{ p: 2, mb: 2, borderRadius: '16px', background: 'rgba(96,165,250,0.06)', border: '1px solid rgba(96,165,250,0.18)' }}>
// // // // //             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
// // // // //               <Box sx={{ width: 32, height: 32, borderRadius: '8px', background: 'rgba(96,165,250,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
// // // // //                 <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="#60a5fa" strokeWidth={1.8}>
// // // // //                   <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
// // // // //                 </svg>
// // // // //               </Box>
// // // // //               <Box sx={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.65)', fontFamily: FONTS.body }}>
// // // // //                 This is a salary-based loan. No collateral or vehicle inspection is required.
// // // // //               </Box>
// // // // //             </Box>
// // // // //           </Paper>

// // // // //           {/* ── Loan Details ── */}
// // // // //           {role !== "Collateral Inspector" && (
// // // // //             <Paper sx={{ p: 2.5, borderRadius: '16px' }}>
// // // // //               <SectionLabel>Loan Details</SectionLabel>
// // // // //               <InfoRow label="Loan Type" value="Salary Based" />
// // // // //               <InfoRow label="Interest Rate" value={loan.interestRate ? `${loan.interestRate}%` : '—'} />
// // // // //               <InfoRow label="Term" value={loan.loanTerm ? `${loan.loanTerm} months` : '—'} />
// // // // //               <InfoRow label="Purpose" value={loan.loanPurpose || '—'} />
// // // // //               <InfoRow label="Purpose Details" value={loan.loanPurposeDetails || '—'} />
// // // // //               <Divider sx={{ my: 1.5, borderColor: G.border }} />
// // // // //               <InfoRow label="Applied" value={this.formatDate(loan.applicationDate)} />
// // // // //               <InfoRow label="Accepted" value={this.formatDate(loan.acceptanceDate)} />
// // // // //               <InfoRow label="Approved" value={this.formatDate(loan.approvalDate)} />
// // // // //               <InfoRow label="Disbursed" value={this.formatDate(loan.disbursementDate)} />
// // // // //               <Divider sx={{ my: 1.5, borderColor: G.border }} />
// // // // //               <InfoRow label="Outstanding" value={loan.outstandingAmount ? `K${loan.outstandingAmount}` : '—'} mono highlight={!!loan.outstandingAmount} />
// // // // //               <InfoRow label="Repayment Total" value={loan.repaymentAmount ? `K${loan.repaymentAmount}` : '—'} mono />
// // // // //               <InfoRow label="Disbursed Amount" value={loan.disbursedAmount ? `K${loan.disbursedAmount}` : '—'} mono />
// // // // //               <InfoRow label="Payment Schedule" value={loan.paymentScheduleCreated ? 'Created' : 'Not Created'} />
// // // // //             </Paper>
// // // // //           )}
// // // // //         </Box>
// // // // //       </Slide>
// // // // //     )
// // // // //   }

// // // // //   // ── Asset loan: original render, fully preserved ──────────────────────────
// // // // //   renderAssetLoanDetails = () => {
// // // // //     const { loan, role } = this.props
// // // // //     const collateralMedia = loan.collateral?.CollateralMedia?.data || []
// // // // //     const collateral = loan.collateral || {}
// // // // //     const sc = statusColor(loan.loanStatus)

// // // // //     // Collateral Inspector gets a blocked view on salary loans (shouldn't happen
// // // // //     // but guard it here too for safety)
// // // // //     if (role === "Collateral Inspector") {
// // // // //       return (
// // // // //         <Box sx={{ p: 2 }}>
// // // // //           <Alert severity="info">This loan type requires collateral inspection.</Alert>
// // // // //         </Box>
// // // // //       )
// // // // //     }

// // // // //     return (
// // // // //       <Slide in={true} direction="right">
// // // // //         <Box sx={{ maxWidth: 680, mx: 'auto', p: { xs: 1.5, sm: 2 }, fontFamily: FONTS.body }}>

// // // // //           {/* ── Hero amount card ── */}
// // // // //           <Box sx={{
// // // // //             background: `linear-gradient(135deg, ${sc}14, ${sc}06)`,
// // // // //             border: `1px solid ${sc}28`,
// // // // //             borderRadius: '20px',
// // // // //             p: 3,
// // // // //             mb: 2,
// // // // //             position: 'relative',
// // // // //             overflow: 'hidden',
// // // // //           }}>
// // // // //             <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${sc}, transparent)`, borderRadius: '20px 20px 0 0' }} />
// // // // //             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2, flexWrap: 'wrap' }}>
// // // // //               <Box>
// // // // //                 <Box sx={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: G.muted, mb: 0.75 }}>
// // // // //                   Requested Amount
// // // // //                 </Box>
// // // // //                 <Box sx={{ fontFamily: FONTS.mono, fontSize: 'clamp(24px,6vw,36px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>
// // // // //                   K{loan.clientAskingAmount || loan.loanAmount || '—'}
// // // // //                 </Box>
// // // // //                 {loan.loanAmount && loan.clientAskingAmount && loan.loanAmount !== loan.clientAskingAmount && (
// // // // //                   <Box sx={{ mt: 0.5, fontSize: '12px', color: G.muted }}>
// // // // //                     Approved: <Box component="span" sx={{ fontFamily: FONTS.mono, color: G.green3, fontWeight: 600 }}>K{loan.loanAmount}</Box>
// // // // //                   </Box>
// // // // //                 )}
// // // // //               </Box>
// // // // //               <Box component="span" sx={pillSx(loan.loanStatus === "accepted" ? "accepted" : loan.loanStatus)}>
// // // // //                 {loan.loanStatus === "accepted" ? "Approved" : loan.loanStatus}
// // // // //               </Box>
// // // // //             </Box>
// // // // //           </Box>

// // // // //           {/* ── Collateral Images ── */}
// // // // //           <Paper sx={{ p: 2.5, mb: 2, borderRadius: '16px' }}>
// // // // //             <SectionLabel>Collateral Images</SectionLabel>
// // // // //             <CollateralCarousel media={collateralMedia} />
// // // // //           </Paper>

// // // // //           {/* ── Collateral Details ── */}
// // // // //           <Paper sx={{ p: 2.5, mb: 2, borderRadius: '16px' }}>
// // // // //             <SectionLabel>Collateral</SectionLabel>
// // // // //             <InfoRow label="Type" value={collateral.collateralType || '—'} />
// // // // //             {this.renderCollateralDetails(collateral)}

// // // // //             {/* Inspector's Report */}
// // // // //             {collateral.collateralStatus === "inspected" ? (
// // // // //               <Box sx={{ mt: 2 }}>
// // // // //                 <Divider sx={{ mb: 2, borderColor: G.border }} />
// // // // //                 <SectionLabel>Inspector's Report</SectionLabel>
// // // // //                 <InfoRow label="Collateral Value" value={collateral.inspectedValue ? `K${collateral.inspectedValue}` : '—'} mono highlight />
// // // // //                 <InfoRow label="Condition" value={collateral.inspectedCondition || '—'} />
// // // // //                 {loan.inspectorRecommendationOnLoan && <InfoRow label="Recommendation" value={loan.inspectorRecommendationOnLoan} />}
// // // // //                 {loan.inspectorReasonForLoanDisproval && <InfoRow label="Reason for Disproval" value={loan.inspectorReasonForLoanDisproval} />}
// // // // //                 {loan.inspectorRecommendedAmount && <InfoRow label="Recommended Amount" value={`K${loan.inspectorRecommendedAmount}`} mono />}
// // // // //                 {collateral.inspectionNotes && <InfoRow label="Inspector's Notes" value={collateral.inspectionNotes} />}
// // // // //                 {collateral.inspectionDate && role !== "Collateral Inspector" && <InfoRow label="Inspection Date" value={this.formatDate(collateral.inspectionDate)} />}
// // // // //               </Box>
// // // // //             ) : (
// // // // //               <Alert severity="info" sx={{ mt: 2, borderRadius: '10px' }}>
// // // // //                 Inspector's report will appear here when collateral has been inspected
// // // // //               </Alert>
// // // // //             )}
// // // // //           </Paper>

// // // // //           {/* ── Loan Details ── */}
// // // // //           {role !== "Collateral Inspector" && (
// // // // //             <Paper sx={{ p: 2.5, borderRadius: '16px' }}>
// // // // //               <SectionLabel>Loan Details</SectionLabel>
// // // // //               <InfoRow label="Interest Rate" value={loan.interestRate ? `${loan.interestRate}%` : '—'} />
// // // // //               <InfoRow label="Term" value={loan.loanTerm ? `${loan.loanTerm} months` : '—'} />
// // // // //               <InfoRow label="Purpose" value={loan.loanPurpose || '—'} />
// // // // //               <InfoRow label="Purpose Details" value={loan.loanPurposeDetails || '—'} />
// // // // //               <Divider sx={{ my: 1.5, borderColor: G.border }} />
// // // // //               <InfoRow label="Applied" value={this.formatDate(loan.applicationDate)} />
// // // // //               <InfoRow label="Approved" value={this.formatDate(loan.approvalDate)} />
// // // // //               <InfoRow label="Disbursed" value={this.formatDate(loan.disbursementDate)} />
// // // // //               <InfoRow label="Acceptance Date" value={this.formatDate(loan.acceptanceDate)} />
// // // // //               <Divider sx={{ my: 1.5, borderColor: G.border }} />
// // // // //               <InfoRow label="Outstanding" value={loan.outstandingAmount ? `K${loan.outstandingAmount}` : '—'} mono highlight={!!loan.outstandingAmount} />
// // // // //               <InfoRow label="Repayment Total" value={loan.repaymentAmount ? `K${loan.repaymentAmount}` : '—'} mono />
// // // // //               <InfoRow label="Disbursed Amount" value={loan.disbursedAmount ? `K${loan.disbursedAmount}` : '—'} mono />
// // // // //               <InfoRow label="Payment Schedule" value={loan.paymentScheduleCreated ? 'Created' : 'Not Created'} />
// // // // //             </Paper>
// // // // //           )}
// // // // //         </Box>
// // // // //       </Slide>
// // // // //     )
// // // // //   }

// // // // //   render() {
// // // // //     const { loan, role } = this.props

// // // // //     if (!loan) return (
// // // // //       <ThemeProvider theme={adminTheme}>
// // // // //         <Box sx={{ p: 3, textAlign: 'center', color: G.muted, fontFamily: FONTS.body }}>Loading loan…</Box>
// // // // //       </ThemeProvider>
// // // // //     )

// // // // //     const typeName = getLoanTypeName(loan)
// // // // //     const salaryLoan = typeName === 'salaryBased'

// // // // //     // Collateral Inspector should never see salary loans — but guard it gracefully
// // // // //     if (salaryLoan && role === "Collateral Inspector") {
// // // // //       return (
// // // // //         <ThemeProvider theme={adminTheme}>
// // // // //           <Box sx={{ p: 2 }}>
// // // // //             <Alert severity="info">This loan is salary-based and does not have collateral.</Alert>
// // // // //           </Box>
// // // // //         </ThemeProvider>
// // // // //       )
// // // // //     }

// // // // //     return (
// // // // //       <ThemeProvider theme={adminTheme}>
// // // // //         {salaryLoan
// // // // //           ? this.renderSalaryLoanDetails()
// // // // //           : this.renderAssetLoanDetails()
// // // // //         }
// // // // //       </ThemeProvider>
// // // // //     )
// // // // //   }
// // // // // }
// // // // 'use client'

// // // // import React from 'react'
// // // // import Box from '@mui/material/Box'
// // // // import Paper from '@mui/material/Paper'
// // // // import Grid from '@mui/material/Grid'
// // // // import Divider from '@mui/material/Divider'
// // // // import { Alert } from '@mui/material'
// // // // import { Slide } from '@material-ui/core'
// // // // import { ThemeProvider } from '@mui/material/styles'
// // // // import CollateralCarousel from './CollateralCarousel'
// // // // import { adminTheme, G, FONTS, pillSx, statusColor } from '@/styles/admin-theme'

// // // // /* ─── Info row sub-component ────────────────────────────────── */
// // // // function InfoRow({ label, value, mono, highlight }) {
// // // //   return (
// // // //     <Box sx={{
// // // //       display: 'flex',
// // // //       alignItems: 'flex-start',
// // // //       justifyContent: 'space-between',
// // // //       py: 1,
// // // //       borderBottom: `1px solid rgba(255,255,255,0.05)`,
// // // //       gap: 2,
// // // //       '&:last-child': { borderBottom: 'none' },
// // // //     }}>
// // // //       <Box sx={{ fontSize: '12px', color: G.muted, fontFamily: FONTS.body, flexShrink: 0, pt: 0.1 }}>{label}</Box>
// // // //       <Box sx={{
// // // //         fontSize: '13px',
// // // //         fontWeight: 500,
// // // //         color: highlight ? G.green3 : 'rgba(255,255,255,0.88)',
// // // //         fontFamily: mono ? FONTS.mono : FONTS.body,
// // // //         textAlign: 'right',
// // // //         wordBreak: 'break-word',
// // // //       }}>
// // // //         {value ?? '—'}
// // // //       </Box>
// // // //     </Box>
// // // //   )
// // // // }

// // // // /* ─── Section header ─────────────────────────────────────────── */
// // // // function SectionLabel({ children }) {
// // // //   return (
// // // //     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, mt: 0.5 }}>
// // // //       <Box sx={{ width: 3, height: 14, borderRadius: 1, background: `linear-gradient(180deg, ${G.green1}, ${G.green3})` }} />
// // // //       <Box sx={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: G.muted, fontFamily: FONTS.body }}>
// // // //         {children}
// // // //       </Box>
// // // //     </Box>
// // // //   )
// // // // }

// // // // /**
// // // //  * Resolve loan type from both populated shapes Strapi can return:
// // // //  *   - flat:   loan.loanType.typeName
// // // //  *   - nested: loan.loanType.data.attributes.typeName
// // // //  */
// // // // const getLoanTypeName = (loan) =>
// // // //   loan?.loanType?.typeName ||
// // // //   loan?.loanType?.data?.attributes?.typeName ||
// // // //   ''

// // // // export default class LoanDetails extends React.Component {
// // // //   formatDate = d => {
// // // //     if (!d) return '—'
// // // //     try { return new Date(d).toLocaleString() } catch (e) { return d }
// // // //   }

// // // //   renderCollateralDetails = collateral => {
// // // //     if (!collateral) return <InfoRow label="Collateral" value="—" />
// // // //     const t = collateral.collateralType
// // // //     if (t === 'vehicle') {
// // // //       const v = collateral.vehicle || {}
// // // //       return (
// // // //         <>
// // // //           <InfoRow label="Number Plate" value={v.numberPlate || '—'} mono />
// // // //           <InfoRow label="Packed" value={v.packed ? 'Yes' : 'No'} />
// // // //           <InfoRow label="Packing Fee Paid" value={v.packingFeePaid ? 'Yes' : 'No'} />
// // // //         </>
// // // //       )
// // // //     }
// // // //     if (t === 'land' || t === 'house') {
// // // //       const h = collateral[t] || {}
// // // //       return (
// // // //         <>
// // // //           <InfoRow label="Location" value={h.location || '—'} />
// // // //           <InfoRow label="Plot Number" value={h.plotNumber || '—'} />
// // // //         </>
// // // //       )
// // // //     }
// // // //     return <InfoRow label="Collateral Name" value={collateral.otherCollateralName || '—'} />
// // // //   }

// // // //   // ── Salary loan: no collateral, show salary details instead ───────────────
// // // //   renderSalaryLoanDetails = () => {
// // // //     const { loan, role } = this.props
// // // //     const sc = statusColor(loan.loanStatus)

// // // //     return (
// // // //       <Slide in={true} direction="right">
// // // //         <Box sx={{ maxWidth: 680, mx: 'auto', p: { xs: 1.5, sm: 2 }, fontFamily: FONTS.body }}>

// // // //           {/* ── Hero amount card ── */}
// // // //           <Box sx={{
// // // //             background: `linear-gradient(135deg, ${sc}14, ${sc}06)`,
// // // //             border: `1px solid ${sc}28`,
// // // //             borderRadius: '20px',
// // // //             p: 3,
// // // //             mb: 2,
// // // //             position: 'relative',
// // // //             overflow: 'hidden',
// // // //           }}>
// // // //             <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${sc}, transparent)`, borderRadius: '20px 20px 0 0' }} />
// // // //             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2, flexWrap: 'wrap' }}>
// // // //               <Box>
// // // //                 <Box sx={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: G.muted, mb: 0.75 }}>
// // // //                   Requested Amount
// // // //                 </Box>
// // // //                 <Box sx={{ fontFamily: FONTS.mono, fontSize: 'clamp(24px,6vw,36px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>
// // // //                   K{loan.clientAskingAmount || loan.loanAmount || '—'}
// // // //                 </Box>
// // // //                 {loan.loanAmount && loan.clientAskingAmount && loan.loanAmount !== loan.clientAskingAmount && (
// // // //                   <Box sx={{ mt: 0.5, fontSize: '12px', color: G.muted }}>
// // // //                     Approved: <Box component="span" sx={{ fontFamily: FONTS.mono, color: G.green3, fontWeight: 600 }}>K{loan.loanAmount}</Box>
// // // //                   </Box>
// // // //                 )}
// // // //               </Box>
// // // //               {/* Salary badge */}
// // // //               <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
// // // //                 <Box component="span" sx={pillSx(loan.loanStatus === "accepted" ? "accepted" : loan.loanStatus)}>
// // // //                   {loan.loanStatus === "accepted" ? "Approved" : loan.loanStatus}
// // // //                 </Box>
// // // //                 <Box sx={{
// // // //                   px: '8px', py: '3px', borderRadius: '100px',
// // // //                   fontSize: '9px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
// // // //                   background: 'rgba(96,165,250,0.12)', color: '#60a5fa',
// // // //                   border: '1px solid rgba(96,165,250,0.25)',
// // // //                 }}>
// // // //                   Salary Loan
// // // //                 </Box>
// // // //               </Box>
// // // //             </Box>
// // // //           </Box>

// // // //           {/* No collateral notice */}
// // // //           <Paper sx={{ p: 2, mb: 2, borderRadius: '16px', background: 'rgba(96,165,250,0.06)', border: '1px solid rgba(96,165,250,0.18)' }}>
// // // //             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
// // // //               <Box sx={{ width: 32, height: 32, borderRadius: '8px', background: 'rgba(96,165,250,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
// // // //                 <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="#60a5fa" strokeWidth={1.8}>
// // // //                   <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
// // // //                 </svg>
// // // //               </Box>
// // // //               <Box sx={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.65)', fontFamily: FONTS.body }}>
// // // //                 This is a salary-based loan. No collateral or vehicle inspection is required.
// // // //               </Box>
// // // //             </Box>
// // // //           </Paper>

// // // //           {/* ── Loan Details ── */}
// // // //           {role !== "Collateral Inspector" && (
// // // //             <Paper sx={{ p: 2.5, borderRadius: '16px' }}>
// // // //               <SectionLabel>Loan Details</SectionLabel>
// // // //               <InfoRow label="Loan Type" value="Salary Based" />
// // // //               <InfoRow label="Interest Rate" value={loan.interestRate ? `${loan.interestRate}%` : '—'} />
// // // //               <InfoRow label="Term" value={loan.loanTerm ? `${loan.loanTerm} months` : '—'} />
// // // //               <InfoRow label="Purpose" value={loan.loanPurpose || '—'} />
// // // //               <InfoRow label="Purpose Details" value={loan.loanPurposeDetails || '—'} />
// // // //               <Divider sx={{ my: 1.5, borderColor: G.border }} />
// // // //               <InfoRow label="Applied" value={this.formatDate(loan.applicationDate)} />
// // // //               <InfoRow label="Accepted" value={this.formatDate(loan.acceptanceDate)} />
// // // //               <InfoRow label="Approved" value={this.formatDate(loan.approvalDate)} />
// // // //               <InfoRow label="Disbursed" value={this.formatDate(loan.disbursementDate)} />
// // // //               <Divider sx={{ my: 1.5, borderColor: G.border }} />
// // // //               <InfoRow label="Outstanding" value={loan.outstandingAmount ? `K${loan.outstandingAmount}` : '—'} mono highlight={!!loan.outstandingAmount} />
// // // //               <InfoRow label="Repayment Total" value={loan.repaymentAmount ? `K${loan.repaymentAmount}` : '—'} mono />
// // // //               <InfoRow label="Disbursed Amount" value={loan.disbursedAmount ? `K${loan.disbursedAmount}` : '—'} mono />
// // // //               <InfoRow label="Payment Schedule" value={loan.paymentScheduleCreated ? 'Created' : 'Not Created'} />
// // // //             </Paper>
// // // //           )}
// // // //         </Box>
// // // //       </Slide>
// // // //     )
// // // //   }

// // // //   // ── Asset loan: original render, fully preserved ──────────────────────────
// // // //   renderAssetLoanDetails = () => {
// // // //     const { loan, role } = this.props
// // // //     const collateralMedia = loan.collateral?.CollateralMedia?.data || []
// // // //     const collateral = loan.collateral || {}
// // // //     const sc = statusColor(loan.loanStatus)

// // // //     // Collateral Inspector gets a blocked view on salary loans (shouldn't happen
// // // //     // but guard it here too for safety)
// // // //     if (role === "Collateral Inspector") {
// // // //       return (
// // // //         <Box sx={{ p: 2 }}>
// // // //           <Alert severity="info">This loan type requires collateral inspection.</Alert>
// // // //         </Box>
// // // //       )
// // // //     }

// // // //     return (
// // // //       <Slide in={true} direction="right">
// // // //         <Box sx={{ maxWidth: 680, mx: 'auto', p: { xs: 1.5, sm: 2 }, fontFamily: FONTS.body }}>

// // // //           {/* ── Hero amount card ── */}
// // // //           <Box sx={{
// // // //             background: `linear-gradient(135deg, ${sc}14, ${sc}06)`,
// // // //             border: `1px solid ${sc}28`,
// // // //             borderRadius: '20px',
// // // //             p: 3,
// // // //             mb: 2,
// // // //             position: 'relative',
// // // //             overflow: 'hidden',
// // // //           }}>
// // // //             <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${sc}, transparent)`, borderRadius: '20px 20px 0 0' }} />
// // // //             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2, flexWrap: 'wrap' }}>
// // // //               <Box>
// // // //                 <Box sx={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: G.muted, mb: 0.75 }}>
// // // //                   Requested Amount
// // // //                 </Box>
// // // //                 <Box sx={{ fontFamily: FONTS.mono, fontSize: 'clamp(24px,6vw,36px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>
// // // //                   K{loan.clientAskingAmount || loan.loanAmount || '—'}
// // // //                 </Box>
// // // //                 {loan.loanAmount && loan.clientAskingAmount && loan.loanAmount !== loan.clientAskingAmount && (
// // // //                   <Box sx={{ mt: 0.5, fontSize: '12px', color: G.muted }}>
// // // //                     Approved: <Box component="span" sx={{ fontFamily: FONTS.mono, color: G.green3, fontWeight: 600 }}>K{loan.loanAmount}</Box>
// // // //                   </Box>
// // // //                 )}
// // // //               </Box>
// // // //               <Box component="span" sx={pillSx(loan.loanStatus === "accepted" ? "accepted" : loan.loanStatus)}>
// // // //                 {loan.loanStatus === "accepted" ? "Approved" : loan.loanStatus}
// // // //               </Box>
// // // //             </Box>
// // // //           </Box>

// // // //           {/* ── Collateral Images ── */}
// // // //           <Paper sx={{ p: 2.5, mb: 2, borderRadius: '16px' }}>
// // // //             <SectionLabel>Collateral Images</SectionLabel>
// // // //             <CollateralCarousel media={collateralMedia} />
// // // //           </Paper>

// // // //           {/* ── Collateral Details ── */}
// // // //           <Paper sx={{ p: 2.5, mb: 2, borderRadius: '16px' }}>
// // // //             <SectionLabel>Collateral</SectionLabel>
// // // //             <InfoRow label="Type" value={collateral.collateralType || '—'} />
// // // //             {this.renderCollateralDetails(collateral)}

// // // //             {/* Inspector's Report */}
// // // //             {collateral.collateralStatus === "inspected" ? (
// // // //               <Box sx={{ mt: 2 }}>
// // // //                 <Divider sx={{ mb: 2, borderColor: G.border }} />
// // // //                 <SectionLabel>Inspector's Report</SectionLabel>
// // // //                 <InfoRow label="Collateral Value" value={collateral.inspectedValue ? `K${collateral.inspectedValue}` : '—'} mono highlight />
// // // //                 <InfoRow label="Condition" value={collateral.inspectedCondition || '—'} />
// // // //                 {loan.inspectorRecommendationOnLoan && <InfoRow label="Recommendation" value={loan.inspectorRecommendationOnLoan} />}
// // // //                 {loan.inspectorReasonForLoanDisproval && <InfoRow label="Reason for Disproval" value={loan.inspectorReasonForLoanDisproval} />}
// // // //                 {loan.inspectorRecommendedAmount && <InfoRow label="Recommended Amount" value={`K${loan.inspectorRecommendedAmount}`} mono />}
// // // //                 {collateral.inspectionNotes && <InfoRow label="Inspector's Notes" value={collateral.inspectionNotes} />}
// // // //                 {collateral.inspectionDate && role !== "Collateral Inspector" && <InfoRow label="Inspection Date" value={this.formatDate(collateral.inspectionDate)} />}
// // // //               </Box>
// // // //             ) : (
// // // //               <Alert severity="info" sx={{ mt: 2, borderRadius: '10px' }}>
// // // //                 Inspector's report will appear here when collateral has been inspected
// // // //               </Alert>
// // // //             )}
// // // //           </Paper>

// // // //           {/* ── Loan Details ── */}
// // // //           {role !== "Collateral Inspector" && (
// // // //             <Paper sx={{ p: 2.5, borderRadius: '16px' }}>
// // // //               <SectionLabel>Loan Details</SectionLabel>
// // // //               <InfoRow label="Interest Rate" value={loan.interestRate ? `${loan.interestRate}%` : '—'} />
// // // //               <InfoRow label="Term" value={loan.loanTerm ? `${loan.loanTerm} months` : '—'} />
// // // //               <InfoRow label="Purpose" value={loan.loanPurpose || '—'} />
// // // //               <InfoRow label="Purpose Details" value={loan.loanPurposeDetails || '—'} />
// // // //               <Divider sx={{ my: 1.5, borderColor: G.border }} />
// // // //               <InfoRow label="Applied" value={this.formatDate(loan.applicationDate)} />
// // // //               <InfoRow label="Approved" value={this.formatDate(loan.approvalDate)} />
// // // //               <InfoRow label="Disbursed" value={this.formatDate(loan.disbursementDate)} />
// // // //               <InfoRow label="Acceptance Date" value={this.formatDate(loan.acceptanceDate)} />
// // // //               <Divider sx={{ my: 1.5, borderColor: G.border }} />
// // // //               <InfoRow label="Outstanding" value={loan.outstandingAmount ? `K${loan.outstandingAmount}` : '—'} mono highlight={!!loan.outstandingAmount} />
// // // //               <InfoRow label="Repayment Total" value={loan.repaymentAmount ? `K${loan.repaymentAmount}` : '—'} mono />
// // // //               <InfoRow label="Disbursed Amount" value={loan.disbursedAmount ? `K${loan.disbursedAmount}` : '—'} mono />
// // // //               <InfoRow label="Payment Schedule" value={loan.paymentScheduleCreated ? 'Created' : 'Not Created'} />
// // // //             </Paper>
// // // //           )}
// // // //         </Box>
// // // //       </Slide>
// // // //     )
// // // //   }

// // // //   render() {
// // // //     const { loan, role } = this.props

// // // //     if (!loan) return (
// // // //       <ThemeProvider theme={adminTheme}>
// // // //         <Box sx={{ p: 3, textAlign: 'center', color: G.muted, fontFamily: FONTS.body }}>Loading loan…</Box>
// // // //       </ThemeProvider>
// // // //     )

// // // //     const typeName = getLoanTypeName(loan)
// // // //     const salaryLoan = typeName === 'salaryBased'

// // // //     // Collateral Inspector should never see salary loans — but guard it gracefully
// // // //     if (salaryLoan && role === "Collateral Inspector") {
// // // //       return (
// // // //         <ThemeProvider theme={adminTheme}>
// // // //           <Box sx={{ p: 2 }}>
// // // //             <Alert severity="info">This loan is salary-based and does not have collateral.</Alert>
// // // //           </Box>
// // // //         </ThemeProvider>
// // // //       )
// // // //     }

// // // //     return (
// // // //       <ThemeProvider theme={adminTheme}>
// // // //         {salaryLoan
// // // //           ? this.renderSalaryLoanDetails()
// // // //           : this.renderAssetLoanDetails()
// // // //         }
// // // //       </ThemeProvider>
// // // //     )
// // // //   }
// // // // }
// // // 'use client'

// // // /**
// // //  * LoanDetails.jsx
// // //  * Admin view of a single loan.
// // //  * New additions (all logic preserved where prior logic existed):
// // //  *  - Loan agreement documents section (all loan types, below collateral)
// // //  *  - Salary section for salary-based loans: employer info, payslip, bank statements
// // //  *  - Verification video (gated by loanType.requireVerificationVideo)
// // //  *  - DocumentViewer handles single (new tab) and multi (modal → new tab)
// // //  */

// // // import { useState, useEffect } from 'react'
// // // import { backEndUrl } from '@/Constants'
// // // import { G, card, sectionLabel, row, labelText, valueText, pill } from './detailStyles'
// // // import DocumentViewer from './DocumentViewer'
// // // import CollapsibleSection from './CollapsibleSection'

// // // /* ─── helpers ────────────────────────────────────────────────── */
// // // const fmt = (v) => (v == null || v === '' ? '—' : v)
// // // const fmtMoney = (v) => (v == null ? '—' : `K${Number(v).toLocaleString('en-ZM', { minimumFractionDigits: 2 })}`)
// // // const fmtDate = (v) => (v ? new Date(v).toLocaleDateString('en-ZM', { year: 'numeric', month: 'short', day: 'numeric' }) : '—')

// // // const STATUS_COLOURS = {
// // //   'initiated': ['rgba(148,163,184,0.15)', '#94A3B8'],
// // //   'pending-collateral-addition': ['rgba(251,191,36,0.12)', '#FBBF24'],
// // //   'pending-collateral-inspection': ['rgba(251,191,36,0.12)', '#FBBF24'],
// // //   'collateral-inspection': ['rgba(251,191,36,0.12)', '#FBBF24'],
// // //   'request-approval': ['rgba(251,191,36,0.12)', '#FBBF24'],
// // //   'accepted': ['rgba(16,185,129,0.12)', '#10B981'],
// // //   'pending-approval': ['rgba(251,191,36,0.12)', '#FBBF24'],
// // //   'approved': ['rgba(16,185,129,0.15)', '#34D399'],
// // //   'rejected': ['rgba(239,68,68,0.12)', '#F87171'],
// // //   'disbursed': ['rgba(99,102,241,0.12)', '#A5B4FC'],
// // //   'completed': ['rgba(16,185,129,0.18)', '#6EE7B7'],
// // //   'defaulted': ['rgba(239,68,68,0.18)', '#FCA5A5'],
// // // }

// // // function statusPill(status) {
// // //   const [bg, color] = STATUS_COLOURS[status] || ['rgba(255,255,255,0.08)', '#fff']
// // //   return <span style={pill(bg, color)}>{status?.replace(/-/g, ' ')}</span>
// // // }

// // // /* ─── icon set ───────────────────────────────────────────────── */
// // // function DocIco() { return <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg> }
// // // function MoneyIco() { return <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg> }
// // // function CollIco() { return <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /></svg> }
// // // function SalaryIco() { return <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" /><circle cx="12" cy="12" r="2" /></svg> }
// // // function VideoIco() { return <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg> }

// // // /* ─── InfoRow ────────────────────────────────────────────────── */
// // // function InfoRow({ label: l, value: v, last }) {
// // //   return (
// // //     <div style={{ ...row, borderBottom: last ? 'none' : '1px solid rgba(255,255,255,0.06)' }}>
// // //       <span style={labelText}>{l}</span>
// // //       <span style={valueText}>{v ?? '—'}</span>
// // //     </div>
// // //   )
// // // }

// // // /* ─── SalarySection ──────────────────────────────────────────── */
// // // function SalarySection({ salary, requireVerificationVideo }) {
// // //   if (!salary) return null

// // //   const {
// // //     employerName, companyLocation, employementVerificationNumber,
// // //     salaryAmount, socialSecurityNumber,
// // //     paySlip, bankStatement, verificationVideo,
// // //   } = salary

// // //   const hasPayslip = paySlip?.length > 0
// // //   const hasBank = bankStatement?.length > 0
// // //   const hasVideo = verificationVideo?.length > 0 && requireVerificationVideo

// // //   return (
// // //     <CollapsibleSection title="Salary & Employment" icon={<SalaryIco />} accentColor="#10B981">
// // //       <div style={{ paddingTop: 14 }}>
// // //         <InfoRow label="Employer" value={fmt(employerName)} />
// // //         <InfoRow label="Company Location" value={fmt(companyLocation)} />
// // //         <InfoRow label="Employment Verif. No." value={fmt(employementVerificationNumber)} />
// // //         <InfoRow label="Salary Amount" value={fmtMoney(salaryAmount)} />
// // //         <InfoRow label="Social Security No." value={fmt(socialSecurityNumber)} last={!hasPayslip && !hasBank && !hasVideo} />

// // //         {(hasPayslip || hasBank || hasVideo) && (
// // //           <div style={{ marginTop: 14 }}>
// // //             <p style={sectionLabel}>Documents</p>
// // //             <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
// // //               {hasPayslip && (
// // //                 <DocumentViewer label="Payslip" files={paySlip} />
// // //               )}
// // //               {hasBank && (
// // //                 <DocumentViewer label="Bank Statement" files={bankStatement} />
// // //               )}
// // //               {hasVideo && (
// // //                 <DocumentViewer label="Verification Video" files={verificationVideo} isVideo />
// // //               )}
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </CollapsibleSection>
// // //   )
// // // }

// // // /* ─── CollateralSection ──────────────────────────────────────── */
// // // function CollateralSection({ collateral }) {
// // //   if (!collateral) return null
// // //   const { collateralType, collateralValue, collateralDescription, collateralDocuments } = collateral
// // //   const hasDocs = collateralDocuments?.length > 0

// // //   return (
// // //     <div style={card}>
// // //       <p style={sectionLabel}>Collateral</p>
// // //       <InfoRow label="Type" value={fmt(collateralType)} />
// // //       <InfoRow label="Value" value={fmtMoney(collateralValue)} />
// // //       <InfoRow label="Description" value={fmt(collateralDescription)} last={!hasDocs} />
// // //       {hasDocs && (
// // //         <div style={{ marginTop: 12 }}>
// // //           <DocumentViewer label="Collateral Documents" files={collateralDocuments} />
// // //         </div>
// // //       )}
// // //     </div>
// // //   )
// // // }

// // // /* ─── LoanDocumentsSection ───────────────────────────────────── */
// // // function LoanDocumentsSection({ documents }) {
// // //   if (!documents?.length) return null
// // //   return (
// // //     <div style={card}>
// // //       <p style={sectionLabel}>Loan Agreement Documents</p>
// // //       <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
// // //         {documents.map((doc, i) => (
// // //           <DocumentViewer key={doc?.id || i} label={doc?.name || `Document ${i + 1}`} files={[doc]} />
// // //         ))}
// // //       </div>
// // //     </div>
// // //   )
// // // }

// // // /* ─── InspectorSection ───────────────────────────────────────── */
// // // function InspectorSection({ loan }) {
// // //   const {
// // //     inspectorRecommendationOnLoan,
// // //     inspectorRecommendedAmount,
// // //     inspectorReasonForLoanDisproval,
// // //     collateralInspected,
// // //   } = loan
// // //   if (!inspectorRecommendationOnLoan && !collateralInspected) return null
// // //   return (
// // //     <div style={card}>
// // //       <p style={sectionLabel}>Inspector Findings</p>
// // //       <InfoRow label="Collateral Inspected" value={collateralInspected ? 'Yes' : 'No'} />
// // //       <InfoRow label="Recommendation" value={fmt(inspectorRecommendationOnLoan)} />
// // //       <InfoRow label="Recommended Amount" value={fmtMoney(inspectorRecommendedAmount)} />
// // //       <InfoRow label="Reason for Disapproval" value={fmt(inspectorReasonForLoanDisproval)} last />
// // //     </div>
// // //   )
// // // }

// // // /* ═══════════════════════════════════════════════════════════════
// // //    MAIN COMPONENT
// // // ═══════════════════════════════════════════════════════════════ */
// // // export default function LoanDetails({ loan, client }) {
// // //   if (!loan) return (
// // //     <div style={{ minHeight: '100vh', background: G.page, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
// // //       <p style={{ color: G.muted }}>No loan data available.</p>
// // //     </div>
// // //   )

// // //   const isSalaryLoan = !!client?.salary
// // //   const requireVerificationVideo = loan?.loanType?.requireVerificationVideo ?? false

// // //   return (
// // //     <div style={{ minHeight: '100vh', background: G.page, paddingTop: 76, paddingBottom: 96, position: 'relative', overflowX: 'hidden' }}>
// // //       <style>{`
// // //         @keyframes vfSlide { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
// // //       `}</style>

// // //       {/* Ambient */}
// // //       <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse 80% 50% at 50% -5%, rgba(16,185,129,0.09) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
// // //       <div style={{ position: 'fixed', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.022) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none', zIndex: 0 }} />

// // //       <div style={{ position: 'relative', zIndex: 1, maxWidth: 720, margin: '0 auto', padding: '0 16px', animation: 'vfSlide 0.35s ease' }}>

// // //         {/* Page header */}
// // //         <div style={{ marginBottom: 22 }}>
// // //           <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: G.muted }}>Admin Panel</p>
// // //           <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
// // //             <h1 style={{ margin: 0, fontFamily: "var(--font-display,'DM Serif Display',serif)", fontSize: 'clamp(20px,4vw,28px)', color: '#fff' }}>
// // //               Loan #{loan.id}
// // //             </h1>
// // //             {statusPill(loan.loanStatus)}
// // //           </div>
// // //         </div>

// // //         {/* ── Core financials ── */}
// // //         <div style={card}>
// // //           <p style={sectionLabel}>Loan Details</p>
// // //           <InfoRow label="Requested Amount" value={fmtMoney(loan.clientAskingAmount)} />
// // //           <InfoRow label="Approved Amount" value={fmtMoney(loan.loanAmount)} />
// // //           <InfoRow label="Disbursed Amount" value={fmtMoney(loan.disbursedAmount)} />
// // //           <InfoRow label="Outstanding Amount" value={fmtMoney(loan.outstandingAmount)} />
// // //           <InfoRow label="Repayment Amount" value={fmtMoney(loan.repaymentAmount)} />
// // //           <InfoRow label="Interest Rate" value={loan.interestRate != null ? `${loan.interestRate}%` : '—'} />
// // //           <InfoRow label="Loan Term" value={loan.loanTerm ? `${loan.loanTerm} months` : '—'} />
// // //           <InfoRow label="Salary %" value={loan.salaryPercentage ? `${loan.salaryPercentage}%` : '—'} />
// // //           <InfoRow label="Loan Purpose" value={fmt(loan.loanPurpose)} />
// // //           <InfoRow label="Purpose Details" value={fmt(loan.loanPurposeDetails)} last />
// // //         </div>

// // //         {/* ── Dates ── */}
// // //         <div style={card}>
// // //           <p style={sectionLabel}>Timeline</p>
// // //           <InfoRow label="Application Date" value={fmtDate(loan.applicationDate)} />
// // //           <InfoRow label="Acceptance Date" value={fmtDate(loan.acceptanceDate)} />
// // //           <InfoRow label="Approval Date" value={fmtDate(loan.approvalDate)} />
// // //           <InfoRow label="Disbursement Date" value={fmtDate(loan.disbursementDate)} />
// // //           <InfoRow label="Due Date" value={fmtDate(loan.dueDate)} last />
// // //         </div>

// // //         {/* ── New loan amount offer ── */}
// // //         {loan.newLoanAmountOffered && (
// // //           <div style={{ ...card, border: '1px solid rgba(251,191,36,0.2)', background: 'rgba(251,191,36,0.06)' }}>
// // //             <p style={{ ...sectionLabel, color: '#FBBF24' }}>Counter Offer</p>
// // //             <InfoRow label="Offered Amount" value={fmtMoney(loan.newLoanAmountOffer)} />
// // //             <InfoRow label="Reason" value={fmt(loan.newLoanAmountOfferedReason)} />
// // //             <InfoRow label="Accepted" value={loan.newLoanAmountOfferAccepted ? 'Yes' : loan.newLoanAmountOfferDeclined ? 'No' : 'Pending'} last />
// // //             {loan.newLoanAmountOfferDeclined && (
// // //               <InfoRow label="Decline Reason" value={fmt(loan.newLoanAmountOfferDeclineReason)} last />
// // //             )}
// // //           </div>
// // //         )}

// // //         {/* ── Rejection ── */}
// // //         {loan.loanStatus === 'rejected' && (
// // //           <div style={{ ...card, border: '1px solid rgba(239,68,68,0.2)', background: 'rgba(239,68,68,0.06)' }}>
// // //             <p style={{ ...sectionLabel, color: '#F87171' }}>Rejection</p>
// // //             <InfoRow label="Reason" value={fmt(loan.loanRejectionReason)} last />
// // //           </div>
// // //         )}

// // //         {/* ── Collateral ── */}
// // //         <CollateralSection collateral={loan.collateral} />

// // //         {/* ── Loan agreement documents (all loan types) ── */}
// // //         <LoanDocumentsSection documents={loan.loanAgreementDocuments} />

// // //         {/* ── Salary info (salary-based loans) ── */}
// // //         {isSalaryLoan && (
// // //           <SalarySection
// // //             salary={client.salary}
// // //             requireVerificationVideo={requireVerificationVideo}
// // //           />
// // //         )}

// // //         {/* ── Inspector findings ── */}
// // //         <InspectorSection loan={loan} />

// // //         {/* ── Disbursement proof ── */}
// // //         {loan.disbursementPOP?.length > 0 && (
// // //           <div style={card}>
// // //             <p style={sectionLabel}>Disbursement Proof of Payment</p>
// // //             <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
// // //               <DocumentViewer label="Proof of Payment" files={loan.disbursementPOP} />
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* ── Admin flags ── */}
// // //         <div style={card}>
// // //           <p style={sectionLabel}>Admin Flags</p>
// // //           <InfoRow label="Invoice Sent" value={loan.invoiceSent ? 'Yes' : 'No'} />
// // //           <InfoRow label="QuickBooks Invoice #" value={fmt(loan.quickBooksInvoiceNumber)} />
// // //           <InfoRow label="Payment Schedule Created" value={loan.paymentScheduleCreated ? 'Yes' : 'No'} />
// // //           <InfoRow label="Loan Appendix Created" value={loan.loanAppendixCreated ? 'Yes' : 'No'} />
// // //           <InfoRow label="Session Letter Uploaded" value={loan.sessionLetterUploaded ? 'Yes' : 'No'} />
// // //           <InfoRow label="Insurance Request" value={fmt(loan.insuranceRequest)} />
// // //           <InfoRow label="Insurance Message Sent" value={loan.insuranceMessageSent ? 'Yes' : 'No'} />
// // //           <InfoRow label="Document Upload Alerted" value={loan.documentUploadAlerted ? 'Yes' : 'No'} />
// // //           <InfoRow label="Rejection Message Sent" value={loan.rejectionMessageSent ? 'Yes' : 'No'} last />
// // //         </div>

// // //       </div>
// // //     </div>
// // //   )
// // // }
// // 'use client'

// // /**
// //  * LoanDetails.jsx
// //  * Props:
// //  *   loan         — raw Strapi loan object (or flat)
// //  *   user         — raw Strapi user for the client (optional, falls back to loan.client)
// //  *   role         — viewing admin's role string
// //  *   adminActions — JSX slot for action buttons
// //  *   clientHref   — href string for the "View Client Profile" link (e.g. `/admin/clients/${clientId}`)
// //  */

// // import Link from 'next/link'
// // import { backEndUrl } from '@/Constants'
// // import { G, card, sectionLabel, row, labelText, valueText, pill } from './detailStyles'
// // import DocumentViewer from './DocumentViewer'
// // import CollapsibleSection from './CollapsibleSection'

// // /* ═══════════════════════════════════════════════════════════════
// //    STRAPI NORMALIZER
// // ═══════════════════════════════════════════════════════════════ */
// // function normalizeStrapi(obj) {
// //   if (obj === null || obj === undefined) return obj
// //   if (typeof obj !== 'object') return obj
// //   if (Array.isArray(obj)) return obj.map(normalizeStrapi)
// //   if (
// //     obj.data !== undefined &&
// //     !Array.isArray(obj.data) &&
// //     obj.data !== null &&
// //     typeof obj.data === 'object' &&
// //     obj.data.attributes !== undefined
// //   ) {
// //     return normalizeStrapi({ id: obj.data.id, ...obj.data.attributes })
// //   }
// //   if (obj.data !== undefined && Array.isArray(obj.data)) {
// //     return obj.data.map(item =>
// //       item && item.attributes
// //         ? normalizeStrapi({ id: item.id, ...item.attributes })
// //         : normalizeStrapi(item)
// //     )
// //   }
// //   const result = {}
// //   for (const key of Object.keys(obj)) {
// //     result[key] = normalizeStrapi(obj[key])
// //   }
// //   return result
// // }

// // /* ─── helpers ────────────────────────────────────────────────── */
// // const fmt = (v) => (v == null || v === '' ? '—' : String(v))
// // const fmtMoney = (v) => v == null ? '—' : `K${Number(v).toLocaleString('en-ZM', { minimumFractionDigits: 2 })}`
// // const fmtDate = (v) => v ? new Date(v).toLocaleDateString('en-ZM', { year: 'numeric', month: 'short', day: 'numeric' }) : '—'
// // const cap = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '—'
// // const getUrl = (file) => {
// //   if (!file) return '#'
// //   if (typeof file === 'string') return file.startsWith('http') ? file : backEndUrl + file
// //   if (file.url?.startsWith('http')) return file.url
// //   return backEndUrl + (file.url || '')
// // }

// // const STATUS_COLOURS = {
// //   'initiated': ['rgba(148,163,184,0.15)', '#94A3B8'],
// //   'pending-collateral-addition': ['rgba(251,191,36,0.12)', '#FBBF24'],
// //   'pending-collateral-inspection': ['rgba(251,191,36,0.12)', '#FBBF24'],
// //   'collateral-inspection': ['rgba(251,191,36,0.12)', '#FBBF24'],
// //   'request-approval': ['rgba(251,191,36,0.12)', '#FBBF24'],
// //   'accepted': ['rgba(16,185,129,0.12)', '#10B981'],
// //   'pending-approval': ['rgba(251,191,36,0.12)', '#FBBF24'],
// //   'approved': ['rgba(16,185,129,0.15)', '#34D399'],
// //   'rejected': ['rgba(239,68,68,0.12)', '#F87171'],
// //   'disbursed': ['rgba(99,102,241,0.12)', '#A5B4FC'],
// //   'completed': ['rgba(16,185,129,0.18)', '#6EE7B7'],
// //   'defaulted': ['rgba(239,68,68,0.18)', '#FCA5A5'],
// // }

// // function StatusPill({ status }) {
// //   const [bg, color] = STATUS_COLOURS[status] || ['rgba(255,255,255,0.08)', '#fff']
// //   return (
// //     <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 100, background: bg, color, fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
// //       {status?.replace(/-/g, ' ')}
// //     </span>
// //   )
// // }

// // /* ─── icons ──────────────────────────────────────────────────── */
// // function SalaryIco() { return <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" /><circle cx="12" cy="12" r="2" /></svg> }
// // function UserIco() { return <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg> }
// // function ExtIco() { return <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg> }

// // /* ─── InfoRow ────────────────────────────────────────────────── */
// // function InfoRow({ label: l, value: v, last }) {
// //   return (
// //     <div style={{ ...row, borderBottom: last ? 'none' : '1px solid rgba(255,255,255,0.06)' }}>
// //       <span style={labelText}>{l}</span>
// //       <span style={valueText}>{v ?? '—'}</span>
// //     </div>
// //   )
// // }

// // /* ─── CollateralSection ──────────────────────────────────────── */
// // function CollateralSection({ collateral }) {
// //   if (!collateral) return null
// //   const { collateralType, collateralValue, collateralDescription } = collateral
// //   const docs = Array.isArray(collateral.collateralDocuments) ? collateral.collateralDocuments : []
// //   return (
// //     <div style={card}>
// //       <p style={sectionLabel}>Collateral</p>
// //       <InfoRow label="Type" value={fmt(collateralType)} />
// //       <InfoRow label="Value" value={fmtMoney(collateralValue)} />
// //       <InfoRow label="Description" value={fmt(collateralDescription)} last={!docs.length} />
// //       {docs.length > 0 && (
// //         <div style={{ marginTop: 12 }}>
// //           <DocumentViewer label="Collateral Documents" files={docs} />
// //         </div>
// //       )}
// //     </div>
// //   )
// // }

// // /* ─── LoanDocumentsSection ───────────────────────────────────── */
// // function LoanDocumentsSection({ documents }) {
// //   const docs = Array.isArray(documents) ? documents.filter(Boolean) : []
// //   if (!docs.length) return null
// //   return (
// //     <div style={card}>
// //       <p style={sectionLabel}>Loan Agreement Documents</p>
// //       <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
// //         {docs.map((doc, i) => (
// //           <DocumentViewer key={doc?.id || i} label={doc?.name || `Document ${i + 1}`} files={[doc]} />
// //         ))}
// //       </div>
// //     </div>
// //   )
// // }

// // /* ─── SalarySection ──────────────────────────────────────────── */
// // function SalarySection({ salary, requireVerificationVideo }) {
// //   if (!salary) return null
// //   const paySlipFiles = Array.isArray(salary.paySlip) ? salary.paySlip : []
// //   const bankFiles = Array.isArray(salary.bankStatement) ? salary.bankStatement : []
// //   const videoFiles = Array.isArray(salary.verificationVideo) ? salary.verificationVideo : []
// //   const hasPayslip = paySlipFiles.length > 0
// //   const hasBank = bankFiles.length > 0
// //   const hasVideo = videoFiles.length > 0 && requireVerificationVideo

// //   return (
// //     <CollapsibleSection title="Salary & Employment" icon={<SalaryIco />} accentColor="#10B981">
// //       <div style={{ paddingTop: 14 }}>
// //         <InfoRow label="Employer" value={fmt(salary.employerName)} />
// //         <InfoRow label="Company Location" value={fmt(salary.companyLocation)} />
// //         <InfoRow label="Employment Verif. No." value={fmt(salary.employementVerificationNumber)} />
// //         <InfoRow label="Salary Amount" value={fmtMoney(salary.salaryAmount)} />
// //         <InfoRow label="Social Security No." value={fmt(salary.socialSecurityNumber)} last={!hasPayslip && !hasBank && !hasVideo} />
// //         {(hasPayslip || hasBank || hasVideo) && (
// //           <div style={{ marginTop: 14 }}>
// //             <p style={sectionLabel}>Documents</p>
// //             <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
// //               {hasPayslip && <DocumentViewer label="Payslip" files={paySlipFiles} />}
// //               {hasBank && <DocumentViewer label="Bank Statement" files={bankFiles} />}
// //               {hasVideo && <DocumentViewer label="Verification Video" files={videoFiles} isVideo />}
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </CollapsibleSection>
// //   )
// // }

// // /* ─── InspectorSection ───────────────────────────────────────── */
// // function InspectorSection({ loan }) {
// //   const { inspectorRecommendationOnLoan, inspectorRecommendedAmount, inspectorReasonForLoanDisproval, collateralInspected } = loan
// //   if (!inspectorRecommendationOnLoan && !collateralInspected) return null
// //   return (
// //     <div style={card}>
// //       <p style={sectionLabel}>Inspector Findings</p>
// //       <InfoRow label="Collateral Inspected" value={collateralInspected ? 'Yes' : 'No'} />
// //       <InfoRow label="Recommendation" value={fmt(inspectorRecommendationOnLoan)} />
// //       <InfoRow label="Recommended Amount" value={fmtMoney(inspectorRecommendedAmount)} />
// //       <InfoRow label="Reason for Disapproval" value={fmt(inspectorReasonForLoanDisproval)} last />
// //     </div>
// //   )
// // }

// // /* ─── ClientLinkCard ─────────────────────────────────────────── */
// // function ClientLinkCard({ client, clientHref }) {
// //   if (!client) return null
// //   const details = client.details || {}
// //   const picRaw = client.profilePicture
// //   const picUrl = Array.isArray(picRaw) ? getUrl(picRaw[0]) : (picRaw ? getUrl(picRaw) : null)
// //   const name = client.fullnames || `${details.firstname || ''} ${details.lastname || ''}`.trim() || client.username || 'Client'
// //   const initials = name.split(' ').map(n => n[0]).filter(Boolean).join('').toUpperCase().slice(0, 2)

// //   return (
// //     <div style={{
// //       ...card,
// //       display: 'flex',
// //       alignItems: 'center',
// //       gap: 14,
// //       background: 'rgba(167,139,250,0.06)',
// //       border: '1px solid rgba(167,139,250,0.2)',
// //     }}>
// //       {/* Avatar */}
// //       {picUrl ? (
// //         <img src={picUrl} alt={name} style={{ width: 48, height: 48, borderRadius: 12, objectFit: 'cover', border: '2px solid rgba(167,139,250,0.4)', flexShrink: 0 }} />
// //       ) : (
// //         <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(167,139,250,0.12)', border: '1.5px solid rgba(167,139,250,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
// //           <span style={{ fontSize: 17, fontWeight: 700, color: '#A78BFA' }}>{initials || '?'}</span>
// //         </div>
// //       )}

// //       {/* Info */}
// //       <div style={{ flex: 1, minWidth: 0 }}>
// //         <p style={{ margin: '0 0 2px', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: G.muted }}>Client</p>
// //         <p style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 700, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</p>
// //         <p style={{ margin: 0, fontSize: 12, color: G.muted }}>{client.email || client.username || ''}</p>
// //       </div>

// //       {/* Link */}
// //       {clientHref && (
// //         <Link
// //           href={clientHref}
// //           style={{
// //             display: 'inline-flex',
// //             alignItems: 'center',
// //             gap: 6,
// //             padding: '8px 14px',
// //             borderRadius: 9,
// //             background: 'rgba(167,139,250,0.12)',
// //             border: '1px solid rgba(167,139,250,0.3)',
// //             color: '#A78BFA',
// //             fontSize: 12,
// //             fontWeight: 700,
// //             textDecoration: 'none',
// //             whiteSpace: 'nowrap',
// //             flexShrink: 0,
// //           }}
// //         >
// //           View Profile <ExtIco />
// //         </Link>
// //       )}
// //     </div>
// //   )
// // }

// // /* ═══════════════════════════════════════════════════════════════
// //    MAIN COMPONENT
// // ═══════════════════════════════════════════════════════════════ */
// // export default function LoanDetails({ loan: rawLoan, user: rawUser, role, adminActions, clientHref }) {
// //   if (!rawLoan) return (
// //     <div style={{ minHeight: '100vh', background: G.page, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
// //       <p style={{ color: G.muted }}>No loan data available.</p>
// //     </div>
// //   )

// //   const loan = normalizeStrapi(rawLoan)
// //   const client = rawUser
// //     ? normalizeStrapi(rawUser)
// //     : (loan.client ?? null)

// //   const loanType = loan.loanType || {}
// //   const isSalaryLoan = loanType.typeName === 'salaryBased' || !!client?.salary
// //   const requireVerVideo = loanType.requireVerificationVideo ?? false
// //   const loanDocs = Array.isArray(loan.loanAgreementDocuments) ? loan.loanAgreementDocuments : []
// //   const popDocs = Array.isArray(loan.disbursementPOP) ? loan.disbursementPOP : []

// //   // Derive clientHref from prop, or from client id if not supplied
// //   const resolvedClientHref = clientHref || (client?.id ? `/admin/clients/${client.id}` : null)

// //   return (
// //     <div style={{ minHeight: '100vh', background: G.page, paddingTop: 76, paddingBottom: 96, position: 'relative', overflowX: 'hidden' }}>
// //       <style>{`@keyframes vfSlide { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }`}</style>

// //       <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse 80% 50% at 50% -5%, rgba(16,185,129,0.09) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
// //       <div style={{ position: 'fixed', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.022) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none', zIndex: 0 }} />

// //       <div style={{ position: 'relative', zIndex: 1, maxWidth: 720, margin: '0 auto', padding: '0 16px', animation: 'vfSlide 0.35s ease' }}>

// //         {/* Page header */}
// //         <div style={{ marginBottom: 22 }}>
// //           <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: G.muted }}>
// //             Admin Panel{role ? ` · ${role}` : ''}
// //           </p>
// //           <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
// //             <h1 style={{ margin: 0, fontFamily: "var(--font-display,'DM Serif Display',serif)", fontSize: 'clamp(20px,4vw,28px)', color: '#fff' }}>
// //               Loan #{loan.id}
// //             </h1>
// //             <StatusPill status={loan.loanStatus} />
// //             {loanType.typeName && (
// //               <span style={{ fontSize: 11, color: G.muted, fontWeight: 600 }}>{loanType.typeName}</span>
// //             )}
// //           </div>
// //         </div>

// //         {/* Admin actions slot */}
// //         {adminActions && <div style={{ marginBottom: 18 }}>{adminActions}</div>}

// //         {/* ── Client link — top of page ── */}
// //         <ClientLinkCard client={client} clientHref={resolvedClientHref} />

// //         {/* ── Core financials ── */}
// //         <div style={card}>
// //           <p style={sectionLabel}>Loan Details</p>
// //           <InfoRow label="Requested Amount" value={fmtMoney(loan.clientAskingAmount)} />
// //           <InfoRow label="Approved Amount" value={fmtMoney(loan.loanAmount)} />
// //           <InfoRow label="Disbursed Amount" value={fmtMoney(loan.disbursedAmount)} />
// //           <InfoRow label="Outstanding Amount" value={fmtMoney(loan.outstandingAmount)} />
// //           <InfoRow label="Repayment Amount" value={fmtMoney(loan.repaymentAmount)} />
// //           <InfoRow label="Interest Rate" value={loan.interestRate != null ? `${loan.interestRate}%` : '—'} />
// //           <InfoRow label="Loan Term" value={loan.loanTerm ? `${loan.loanTerm} months` : '—'} />
// //           <InfoRow label="Salary %" value={loan.salaryPercentage ? `${loan.salaryPercentage}%` : '—'} />
// //           <InfoRow label="Loan Purpose" value={fmt(loan.loanPurpose)} />
// //           <InfoRow label="Purpose Details" value={fmt(loan.loanPurposeDetails)} last />
// //         </div>

// //         {/* ── Timeline ── */}
// //         <div style={card}>
// //           <p style={sectionLabel}>Timeline</p>
// //           <InfoRow label="Application Date" value={fmtDate(loan.applicationDate)} />
// //           <InfoRow label="Acceptance Date" value={fmtDate(loan.acceptanceDate)} />
// //           <InfoRow label="Approval Date" value={fmtDate(loan.approvalDate)} />
// //           <InfoRow label="Disbursement Date" value={fmtDate(loan.disbursementDate)} />
// //           <InfoRow label="Due Date" value={fmtDate(loan.dueDate)} last />
// //         </div>

// //         {/* ── Counter offer ── */}
// //         {loan.newLoanAmountOffered && (
// //           <div style={{ ...card, border: '1px solid rgba(251,191,36,0.2)', background: 'rgba(251,191,36,0.06)' }}>
// //             <p style={{ ...sectionLabel, color: '#FBBF24' }}>Counter Offer</p>
// //             <InfoRow label="Offered Amount" value={fmtMoney(loan.newLoanAmountOffer)} />
// //             <InfoRow label="Reason" value={fmt(loan.newLoanAmountOfferedReason)} />
// //             <InfoRow label="Accepted" value={loan.newLoanAmountOfferAccepted ? 'Yes' : loan.newLoanAmountOfferDeclined ? 'No' : 'Pending'} last={!loan.newLoanAmountOfferDeclined} />
// //             {loan.newLoanAmountOfferDeclined && (
// //               <InfoRow label="Decline Reason" value={fmt(loan.newLoanAmountOfferDeclineReason)} last />
// //             )}
// //           </div>
// //         )}

// //         {/* ── Rejection ── */}
// //         {loan.loanStatus === 'rejected' && (
// //           <div style={{ ...card, border: '1px solid rgba(239,68,68,0.2)', background: 'rgba(239,68,68,0.06)' }}>
// //             <p style={{ ...sectionLabel, color: '#F87171' }}>Rejection</p>
// //             <InfoRow label="Reason" value={fmt(loan.loanRejectionReason)} last />
// //           </div>
// //         )}

// //         {/* ── Collateral ── */}
// //         <CollateralSection collateral={loan.collateral} />

// //         {/* ── Loan agreement documents — all loan types ── */}
// //         <LoanDocumentsSection documents={loanDocs} />

// //         {/* ── Salary info — salary-based loans ── */}
// //         {isSalaryLoan && client?.salary && (
// //           <SalarySection salary={client.salary} requireVerificationVideo={requireVerVideo} />
// //         )}

// //         {/* ── Inspector findings ── */}
// //         <InspectorSection loan={loan} />

// //         {/* ── Disbursement proof ── */}
// //         {popDocs.length > 0 && (
// //           <div style={card}>
// //             <p style={sectionLabel}>Disbursement Proof of Payment</p>
// //             <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
// //               <DocumentViewer label="Proof of Payment" files={popDocs} />
// //             </div>
// //           </div>
// //         )}

// //         {/* ── Admin flags ── */}
// //         <div style={card}>
// //           <p style={sectionLabel}>Admin Flags</p>
// //           <InfoRow label="Invoice Sent" value={loan.invoiceSent ? 'Yes' : 'No'} />
// //           <InfoRow label="QuickBooks Invoice #" value={fmt(loan.quickBooksInvoiceNumber)} />
// //           <InfoRow label="Payment Schedule Created" value={loan.paymentScheduleCreated ? 'Yes' : 'No'} />
// //           <InfoRow label="Loan Appendix Created" value={loan.loanAppendixCreated ? 'Yes' : 'No'} />
// //           <InfoRow label="Session Letter Uploaded" value={loan.sessionLetterUploaded ? 'Yes' : 'No'} />
// //           <InfoRow label="Insurance Request" value={fmt(loan.insuranceRequest)} />
// //           <InfoRow label="Insurance Message Sent" value={loan.insuranceMessageSent ? 'Yes' : 'No'} />
// //           <InfoRow label="Document Upload Alerted" value={loan.documentUploadAlerted ? 'Yes' : 'No'} />
// //           <InfoRow label="Rejection Message Sent" value={loan.rejectionMessageSent ? 'Yes' : 'No'} last />
// //         </div>

// //       </div>
// //     </div>
// //   )
// // }
// 'use client'

// /**
//  * LoanDetails.js — frontend/src/components/Includes/AdminComponents/LoanDetails.js
//  *
//  * Fixes delivered:
//  *  ✅ loanAgreementDocuments shown (with "no document found" when empty)
//  *  ✅ "View Client Profile" link → /admin/users/{client.id}
//  *  ✅ Avatar placeholder = first letters of firstname + lastname when profilePicture is null
//  *  ✅ Document section always shows a "Hide" / collapse button regardless of doc count
//  *  ✅ Selected loan shown above the account-info section
//  *  ✅ Document list scroll smooth + close button always pinned at top
//  *  ✅ witnessSignature displayed
//  *  ✅ client initials + witness initials displayed
//  *  ✅ "No document found" when a media field has no files
//  */

// import { useState } from 'react'
// import Link from 'next/link'
// import { backEndUrl } from '@/Constants'

// /* ─── Strapi normalizer ─────────────────────────────────────── */
// function normalizeStrapi(obj) {
//   if (obj === null || obj === undefined) return obj
//   if (typeof obj !== 'object') return obj
//   if (Array.isArray(obj)) return obj.map(normalizeStrapi)
//   if (
//     obj.data !== undefined &&
//     !Array.isArray(obj.data) &&
//     obj.data !== null &&
//     typeof obj.data === 'object' &&
//     obj.data.attributes !== undefined
//   ) {
//     return normalizeStrapi({ id: obj.data.id, ...obj.data.attributes })
//   }
//   if (obj.data !== undefined && Array.isArray(obj.data)) {
//     return obj.data.map(item =>
//       item && item.attributes
//         ? normalizeStrapi({ id: item.id, ...item.attributes })
//         : normalizeStrapi(item)
//     )
//   }
//   const result = {}
//   for (const key of Object.keys(obj)) result[key] = normalizeStrapi(obj[key])
//   return result
// }

// /* ─── Helpers ───────────────────────────────────────────────── */
// const fmt = v => (v == null || v === '' ? '—' : String(v))
// const fmtMoney = v => v == null ? '—' : `K${Number(v).toLocaleString('en-ZM', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
// const fmtDate = v => v ? new Date(v).toLocaleDateString('en-ZM', { year: 'numeric', month: 'short', day: 'numeric' }) : '—'

// function getUrl(file) {
//   if (!file) return null
//   if (typeof file === 'string') return file.startsWith('http') ? file : backEndUrl + file
//   if (!file.url) return null
//   return file.url.startsWith('http') ? file.url : backEndUrl + file.url
// }

// function normalizeFiles(raw) {
//   if (!raw) return []
//   if (Array.isArray(raw)) return raw.filter(Boolean)
//   return [raw]
// }

// /* ─── Status colours ────────────────────────────────────────── */
// const STATUS_COLOURS = {
//   'initiated': ['rgba(251,191,36,0.12)', '#FBBF24'],
//   'pending-collateral-addition': ['rgba(251,191,36,0.12)', '#FBBF24'],
//   'pending-collateral-inspection': ['rgba(251,191,36,0.12)', '#FBBF24'],
//   'collateral-inspection': ['rgba(167,139,250,0.12)', '#A78BFA'],
//   'request-approval': ['rgba(129,140,248,0.12)', '#818CF8'],
//   'accepted': ['rgba(52,211,153,0.13)', '#34D399'],
//   'pending-approval': ['rgba(167,139,250,0.12)', '#A78BFA'],
//   'approved': ['rgba(16,185,129,0.14)', '#10B981'],
//   'rejected': ['rgba(239,68,68,0.12)', '#F87171'],
//   'disbursed': ['rgba(96,165,250,0.12)', '#60A5FA'],
//   'completed': ['rgba(156,163,175,0.12)', '#9CA3AF'],
//   'defaulted': ['rgba(220,38,38,0.15)', '#DC2626'],
// }
// function StatusPill({ status }) {
//   const [bg, color] = STATUS_COLOURS[status] || ['rgba(255,255,255,0.08)', '#fff']
//   return (
//     <span style={{
//       display: 'inline-flex', alignItems: 'center', gap: 5,
//       padding: '3px 10px', borderRadius: 100,
//       background: bg, color, fontSize: 10, fontWeight: 700,
//       letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap',
//     }}>
//       <span style={{ width: 5, height: 5, borderRadius: '50%', background: color, flexShrink: 0 }} />
//       {status?.replace(/-/g, ' ')}
//     </span>
//   )
// }

// /* ─── Info row ──────────────────────────────────────────────── */
// function InfoRow({ label: l, value: v, last, mono, gold }) {
//   return (
//     <div style={{
//       display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
//       gap: 12, padding: '10px 0',
//       borderBottom: last ? 'none' : '1px solid rgba(255,255,255,0.055)',
//     }}>
//       <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', flexShrink: 0 }}>
//         {l}
//       </span>
//       <span style={{
//         fontSize: 13.5, fontWeight: 500, textAlign: 'right',
//         color: gold ? '#C9A84C' : 'rgba(255,255,255,0.82)',
//         fontFamily: mono ? "'JetBrains Mono', monospace" : undefined,
//         wordBreak: 'break-word',
//       }}>
//         {v ?? '—'}
//       </span>
//     </div>
//   )
// }

// /* ─── Section card ──────────────────────────────────────────── */
// function Card({ children, gold, style: s }) {
//   return (
//     <div style={{
//       position: 'relative', borderRadius: 14, overflow: 'hidden',
//       background: gold
//         ? 'linear-gradient(135deg, rgba(201,168,76,0.10), rgba(201,168,76,0.03))'
//         : 'rgba(255,255,255,0.045)',
//       border: `1px solid ${gold ? 'rgba(201,168,76,0.22)' : 'rgba(255,255,255,0.08)'}`,
//       padding: '20px 22px', marginBottom: 14,
//       backdropFilter: 'blur(10px)',
//       ...s,
//     }}>
//       {children}
//     </div>
//   )
// }

// function SectionLabel({ children, color }) {
//   return (
//     <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
//       <div style={{ width: 3, height: 14, borderRadius: 2, background: color || 'linear-gradient(180deg,#C9A84C,#E8C87A)', flexShrink: 0 }} />
//       <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)' }}>
//         {children}
//       </span>
//     </div>
//   )
// }

// /* ═══════════════════════════════════════════════════════════════
//    DOCUMENT VIEWER
//    Always shows a Hide/collapse button regardless of count.
//    Scrollable list; close button pinned at top.
//    Shows "No document found" when files array is empty.
// ═══════════════════════════════════════════════════════════════ */
// function DocumentViewer({ label, files, isVideo }) {
//   const [open, setOpen] = useState(false)
//   const normalised = normalizeFiles(files)
//   const hasFiles = normalised.length > 0

//   return (
//     <div style={{ marginBottom: 4 }}>
//       {/* Toggle button — always visible */}
//       <button
//         onClick={() => setOpen(o => !o)}
//         style={{
//           display: 'inline-flex', alignItems: 'center', gap: 7,
//           padding: '7px 14px', borderRadius: 8, border: 'none', cursor: 'pointer',
//           background: open ? 'rgba(201,168,76,0.14)' : 'rgba(255,255,255,0.06)',
//           color: open ? '#C9A84C' : 'rgba(255,255,255,0.6)',
//           fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
//           transition: 'all 0.2s',
//         }}
//       >
//         {open ? <CollapseIcon /> : <ExpandIcon />}
//         {open ? `Hide ${label}` : `Show ${label}`}
//         {hasFiles && (
//           <span style={{
//             padding: '1px 7px', borderRadius: 100, fontSize: 10, fontWeight: 700,
//             background: open ? 'rgba(201,168,76,0.25)' : 'rgba(255,255,255,0.1)',
//             color: open ? '#C9A84C' : 'rgba(255,255,255,0.5)',
//           }}>
//             {normalised.length}
//           </span>
//         )}
//       </button>

//       {/* Expandable panel */}
//       {open && (
//         <div style={{
//           marginTop: 8, borderRadius: 12, overflow: 'hidden',
//           border: '1px solid rgba(255,255,255,0.08)',
//           background: 'rgba(0,0,0,0.25)',
//           // smooth scroll container
//           maxHeight: 360,
//           overflowY: 'auto',
//           scrollBehavior: 'smooth',
//           WebkitOverflowScrolling: 'touch',
//         }}>
//           {/* ── Pinned close row ── */}
//           <div style={{
//             position: 'sticky', top: 0, zIndex: 10,
//             display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//             padding: '10px 14px',
//             background: 'rgba(10,15,30,0.92)',
//             borderBottom: '1px solid rgba(255,255,255,0.07)',
//             backdropFilter: 'blur(12px)',
//           }}>
//             <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
//               {label} {hasFiles ? `(${normalised.length})` : ''}
//             </span>
//             <button
//               onClick={() => setOpen(false)}
//               title="Collapse"
//               style={{
//                 display: 'flex', alignItems: 'center', gap: 5,
//                 padding: '5px 12px', borderRadius: 7, border: 'none', cursor: 'pointer',
//                 background: 'rgba(255,255,255,0.07)',
//                 color: 'rgba(255,255,255,0.55)', fontSize: 11, fontWeight: 600,
//                 fontFamily: "'DM Sans', sans-serif",
//                 transition: 'all 0.18s',
//               }}
//               onMouseEnter={e => { e.currentTarget.style.background = 'rgba(220,38,38,0.15)'; e.currentTarget.style.color = '#F87171' }}
//               onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.55)' }}
//             >
//               <CloseIcon /> Hide
//             </button>
//           </div>

//           {/* ── File list ── */}
//           <div style={{ padding: '10px 14px 14px' }}>
//             {!hasFiles ? (
//               <div style={{
//                 display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
//                 padding: '28px 0', gap: 10,
//               }}>
//                 <NoDocIcon />
//                 <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.28)', fontStyle: 'italic' }}>
//                   No document found
//                 </span>
//               </div>
//             ) : (
//               <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
//                 {normalised.map((file, i) => {
//                   const url = getUrl(file)
//                   const name = file?.name || `Document ${i + 1}`
//                   const mime = file?.mime || ''
//                   const isImg = mime.startsWith('image/')
//                   const isPdf = mime === 'application/pdf'

//                   return (
//                     <div key={file?.id || i} style={{
//                       display: 'flex', alignItems: 'center', gap: 12,
//                       padding: '10px 12px', borderRadius: 10,
//                       background: 'rgba(255,255,255,0.04)',
//                       border: '1px solid rgba(255,255,255,0.07)',
//                     }}>
//                       {/* Thumbnail for images */}
//                       {isImg && url ? (
//                         <img
//                           src={url} alt={name}
//                           style={{ width: 40, height: 40, borderRadius: 7, objectFit: 'cover', flexShrink: 0, border: '1px solid rgba(255,255,255,0.1)' }}
//                         />
//                       ) : (
//                         <div style={{
//                           width: 40, height: 40, borderRadius: 7, flexShrink: 0,
//                           background: isPdf ? 'rgba(239,68,68,0.12)' : isVideo ? 'rgba(99,102,241,0.12)' : 'rgba(255,255,255,0.07)',
//                           display: 'flex', alignItems: 'center', justifyContent: 'center',
//                           border: '1px solid rgba(255,255,255,0.08)',
//                         }}>
//                           {isPdf ? <PdfIcon /> : isVideo ? <VideoIcon /> : <FileIcon />}
//                         </div>
//                       )}

//                       <div style={{ flex: 1, minWidth: 0 }}>
//                         <div style={{ fontSize: 12.5, fontWeight: 600, color: 'rgba(255,255,255,0.8)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//                           {name}
//                         </div>
//                         {file?.size && (
//                           <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>
//                             {(file.size / 1024).toFixed(1)} KB
//                           </div>
//                         )}
//                       </div>

//                       {url ? (
//                         <a
//                           href={url} target="_blank" rel="noopener noreferrer"
//                           style={{
//                             display: 'flex', alignItems: 'center', gap: 5,
//                             padding: '6px 12px', borderRadius: 7, textDecoration: 'none',
//                             background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)',
//                             color: '#C9A84C', fontSize: 11, fontWeight: 700, flexShrink: 0,
//                             transition: 'all 0.18s',
//                           }}
//                           onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.18)'}
//                           onMouseLeave={e => e.currentTarget.style.background = 'rgba(201,168,76,0.1)'}
//                         >
//                           <ExternalIcon /> Open
//                         </a>
//                       ) : (
//                         <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', fontStyle: 'italic' }}>No URL</span>
//                       )}
//                     </div>
//                   )
//                 })}
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// /* ─── Signature preview ────────────────────────────────────── */
// function SignaturePreview({ label, file }) {
//   const url = getUrl(file)
//   if (!url) {
//     return (
//       <div>
//         <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 7 }}>{label}</div>
//         <div style={{
//           width: '100%', height: 72, borderRadius: 10,
//           background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.1)',
//           display: 'flex', alignItems: 'center', justifyContent: 'center',
//         }}>
//           <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.22)', fontStyle: 'italic' }}>No signature found</span>
//         </div>
//       </div>
//     )
//   }
//   return (
//     <div>
//       <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 7 }}>{label}</div>
//       <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}>
//         <img src={url} alt={label} style={{ display: 'block', width: '100%', height: 88, objectFit: 'contain' }} />
//       </div>
//       <a href={url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 6, fontSize: 11, color: '#C9A84C', textDecoration: 'none', fontWeight: 600 }}>
//         <ExternalIcon /> Full size
//       </a>
//     </div>
//   )
// }

// /* ─── Collateral section ────────────────────────────────────── */
// function CollateralSection({ collateral }) {
//   if (!collateral) return null
//   const { collateralType, collateralCondition, collateralStatus, inspectedValue, inspectionNotes, inspectedCondition, vehicle, land, house, CollateralMedia, otherCollateralName } = collateral

//   const media = normalizeFiles(CollateralMedia)

//   return (
//     <Card>
//       <SectionLabel>Collateral</SectionLabel>
//       <InfoRow label="Type" value={fmt(collateralType)} />
//       <InfoRow label="Condition" value={fmt(collateralCondition)} />
//       <InfoRow label="Status" value={fmt(collateralStatus)} />
//       <InfoRow label="Inspected Value" value={fmtMoney(inspectedValue)} mono />
//       <InfoRow label="Inspected Condition" value={fmt(inspectedCondition)} />
//       <InfoRow label="Inspection Notes" value={fmt(inspectionNotes)} />

//       {collateralType === 'vehicle' && vehicle && (
//         <>
//           <InfoRow label="Number Plate" value={fmt(vehicle.numberPlate)} />
//           <InfoRow label="Insurance" value={fmt(vehicle.insuranceType)} />
//           <InfoRow label="Packed" value={fmt(vehicle.packed)} />
//           <InfoRow label="Packing Fee Paid" value={fmtMoney(vehicle.packingFeePaid)} mono />
//         </>
//       )}
//       {collateralType === 'land' && land && (
//         <>
//           <InfoRow label="Location" value={fmt(land.location)} />
//           <InfoRow label="Plot No." value={fmt(land.plotNumber)} />
//           <InfoRow label="Hectors" value={fmt(land.hectors)} />
//         </>
//       )}
//       {collateralType === 'house' && house && (
//         <>
//           <InfoRow label="Location" value={fmt(house.location)} />
//           <InfoRow label="Plot No." value={fmt(house.plotNumber)} />
//           <InfoRow label="Dimensions" value={fmt(house.dimensions)} />
//         </>
//       )}
//       {collateralType === 'other' && <InfoRow label="Description" value={fmt(otherCollateralName)} />}

//       {/* Collateral media */}
//       <div style={{ marginTop: 14 }}>
//         <DocumentViewer label="Collateral Media" files={media} />
//       </div>

//       {/* Vehicle-specific docs */}
//       {vehicle?.whitebook && (
//         <div style={{ marginTop: 8 }}>
//           <DocumentViewer label="Whitebook" files={normalizeFiles(vehicle.whitebook)} />
//         </div>
//       )}
//       {vehicle?.sessionLetterTemplate && (
//         <div style={{ marginTop: 8 }}>
//           <DocumentViewer label="Session Letter Template" files={normalizeFiles(vehicle.sessionLetterTemplate)} />
//         </div>
//       )}
//       {vehicle?.sessionLetter && (
//         <div style={{ marginTop: 8 }}>
//           <DocumentViewer label="Session Letter" files={normalizeFiles(vehicle.sessionLetter)} />
//         </div>
//       )}
//       {/* Land title deed */}
//       {land?.titleDeed && (
//         <div style={{ marginTop: 8 }}>
//           <DocumentViewer label="Title Deed" files={normalizeFiles(land.titleDeed)} />
//         </div>
//       )}
//       {/* House title deed */}
//       {house?.titleDeed && (
//         <div style={{ marginTop: 8 }}>
//           <DocumentViewer label="Title Deed" files={normalizeFiles(house.titleDeed)} />
//         </div>
//       )}
//     </Card>
//   )
// }

// /* ─── Inspector findings ────────────────────────────────────── */
// function InspectorSection({ loan }) {
//   const { inspectorRecommendationOnLoan, inspectorRecommendedAmount, inspectorReasonForLoanDisproval, collateralInspected } = loan
//   if (!inspectorRecommendationOnLoan && !collateralInspected) return null
//   return (
//     <Card>
//       <SectionLabel>Inspector Findings</SectionLabel>
//       <InfoRow label="Collateral Inspected" value={collateralInspected ? 'Yes' : 'No'} />
//       <InfoRow label="Recommendation" value={fmt(inspectorRecommendationOnLoan)} />
//       <InfoRow label="Recommended Amount" value={fmtMoney(inspectorRecommendedAmount)} mono />
//       <InfoRow label="Reason for Disapproval" value={fmt(inspectorReasonForLoanDisproval)} last />
//     </Card>
//   )
// }

// /* ═══════════════════════════════════════════════════════════════
//    CLIENT MINI-CARD (shown at top of loan detail)
//    - Avatar placeholder = initials when no profilePicture
//    - "View Client Profile" → /admin/users/{id}
// ═══════════════════════════════════════════════════════════════ */
// function ClientMiniCard({ client }) {
//   if (!client) return null

//   const details = client.details || {}
//   const firstName = details.firstname || ''
//   const lastName = details.lastname || ''
//   const fullName = client.fullnames || `${firstName} ${lastName}`.trim() || client.username || 'Client'

//   // Build initials placeholder (up to 2 chars)
//   const initials = (firstName && lastName)
//     ? `${firstName[0]}${lastName[0]}`.toUpperCase()
//     : fullName.split(' ').map(n => n[0]).filter(Boolean).join('').toUpperCase().slice(0, 2) || '?'

//   const picFiles = normalizeFiles(client.profilePicture)
//   const picUrl = picFiles.length > 0 ? getUrl(picFiles[0]) : null

//   return (
//     <Card style={{
//       display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
//       background: 'rgba(167,139,250,0.06)', border: '1px solid rgba(167,139,250,0.18)',
//     }}>
//       {/* Avatar */}
//       {picUrl ? (
//         <img
//           src={picUrl} alt={fullName}
//           style={{
//             width: 52, height: 52, borderRadius: 14, objectFit: 'cover', flexShrink: 0,
//             border: '2px solid rgba(167,139,250,0.4)',
//           }}
//         />
//       ) : (
//         <div style={{
//           width: 52, height: 52, borderRadius: 14, flexShrink: 0,
//           background: 'linear-gradient(135deg, rgba(167,139,250,0.22), rgba(167,139,250,0.08))',
//           border: '1.5px solid rgba(167,139,250,0.3)',
//           display: 'flex', alignItems: 'center', justifyContent: 'center',
//         }}>
//           <span style={{
//             fontFamily: "'DM Serif Display', serif",
//             fontSize: 18, fontWeight: 400, color: '#A78BFA', lineHeight: 1,
//           }}>
//             {initials}
//           </span>
//         </div>
//       )}

//       {/* Info */}
//       <div style={{ flex: 1, minWidth: 0 }}>
//         <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(167,139,250,0.55)', marginBottom: 3 }}>
//           Client
//         </div>
//         <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//           {fullName}
//         </div>
//         <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', marginTop: 2 }}>
//           {client.email || ''}
//           {client.username && client.email ? ' · ' : ''}
//           {client.username || ''}
//         </div>
//       </div>

//       {/* Link */}
//       {client.id && (
//         <Link
//           href={`/admin/users/${client.id}`}
//           style={{
//             display: 'inline-flex', alignItems: 'center', gap: 6,
//             padding: '9px 16px', borderRadius: 10,
//             background: 'rgba(167,139,250,0.12)', border: '1px solid rgba(167,139,250,0.28)',
//             color: '#A78BFA', fontSize: 12, fontWeight: 700, textDecoration: 'none',
//             whiteSpace: 'nowrap', flexShrink: 0, transition: 'all 0.2s',
//           }}
//           onMouseEnter={e => { e.currentTarget.style.background = 'rgba(167,139,250,0.22)' }}
//           onMouseLeave={e => { e.currentTarget.style.background = 'rgba(167,139,250,0.12)' }}
//         >
//           View Profile <ExternalIcon />
//         </Link>
//       )}
//     </Card>
//   )
// }

// /* ═══════════════════════════════════════════════════════════════
//    MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════ */
// export default function LoanDetails({ loan: rawLoan, role, onUpdated, constants }) {
//   if (!rawLoan) return (
//     <div style={{ minHeight: '100vh', background: '#0A0F1E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//       <p style={{ color: 'rgba(255,255,255,0.4)' }}>No loan data available.</p>
//     </div>
//   )

//   const loan = normalizeStrapi(rawLoan)
//   const client = loan.client ?? null

//   const loanType = loan.loanType || {}
//   const loanDocs = normalizeFiles(loan.loanAgreementDocuments)
//   const popDocs = normalizeFiles(loan.disbursementPOP)

//   // Signatures from client
//   const sigFile = client?.signature || null
//   const witSigFile = client?.witnessSignature || null
//   const initFile = client?.initials || null
//   const witInitFile = client?.witnessInitials || null

//   const hasAnySig = sigFile || witSigFile || initFile || witInitFile

//   return (
//     <div style={{
//       minHeight: '100vh', background: '#0A0F1E',
//       paddingTop: 80, paddingBottom: 100,
//       position: 'relative', overflowX: 'hidden',
//     }}>
//       {/* Background */}
//       <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse 80% 50% at 50% -5%, rgba(201,168,76,0.08) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
//       <div style={{ position: 'fixed', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.022) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none', zIndex: 0 }} />

//       <div style={{ position: 'relative', zIndex: 1, maxWidth: 720, margin: '0 auto', padding: '0 16px', animation: 'vfSlide 0.38s ease' }}>
//         <style>{`@keyframes vfSlide { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }`}</style>

//         {/* ── Page header ── */}
//         <div style={{ marginBottom: 20 }}>
//           <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 5 }}>
//             Admin · {role || 'Loan Detail'}
//           </div>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
//             <h1 style={{ margin: 0, fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(20px,4vw,26px)', color: '#fff', fontWeight: 400 }}>
//               Loan #{loan.id}
//             </h1>
//             <StatusPill status={loan.loanStatus} />
//             {loanType.typeName && (
//               <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.3)' }}>
//                 {loanType.typeName}
//               </span>
//             )}
//           </div>
//         </div>

//         {/* ── Selected loan (active/current loan badge) ── */}
//         {loan.id && (
//           <div style={{
//             display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16,
//             padding: '6px 14px', borderRadius: 100,
//             background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)',
//           }}>
//             <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C9A84C' }} />
//             <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#C9A84C' }}>
//               Currently Viewing
//             </span>
//             <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'rgba(201,168,76,0.7)' }}>
//               #{loan.id} · {fmtMoney(loan.loanAmount)}
//             </span>
//           </div>
//         )}

//         {/* ══ CLIENT MINI-CARD — above everything ══ */}
//         <ClientMiniCard client={client} />

//         {/* ══ CORE FINANCIALS ══ */}
//         <Card>
//           <SectionLabel>Loan Financials</SectionLabel>
//           <InfoRow label="Requested Amount" value={fmtMoney(loan.clientAskingAmount)} mono />
//           <InfoRow label="Approved Amount" value={fmtMoney(loan.loanAmount)} mono gold />
//           <InfoRow label="Disbursed Amount" value={fmtMoney(loan.disbursedAmount)} mono />
//           <InfoRow label="Outstanding Amount" value={fmtMoney(loan.outstandingAmount)} mono />
//           <InfoRow label="Repayment Amount" value={fmtMoney(loan.repaymentAmount)} mono />
//           <InfoRow label="Interest Rate" value={loan.interestRate != null ? `${loan.interestRate}%` : '—'} />
//           <InfoRow label="Loan Term" value={loan.loanTerm ? `${loan.loanTerm} months` : '—'} />
//           <InfoRow label="Loan Purpose" value={fmt(loan.loanPurpose)} />
//           <InfoRow label="Purpose Details" value={fmt(loan.loanPurposeDetails)} last />
//         </Card>

//         {/* ══ TIMELINE ══ */}
//         <Card>
//           <SectionLabel>Timeline</SectionLabel>
//           <InfoRow label="Application Date" value={fmtDate(loan.applicationDate)} />
//           <InfoRow label="Acceptance Date" value={fmtDate(loan.acceptanceDate)} />
//           <InfoRow label="Approval Date" value={fmtDate(loan.approvalDate)} />
//           <InfoRow label="Disbursement Date" value={fmtDate(loan.disbursementDate)} />
//           <InfoRow label="Due Date" value={fmtDate(loan.dueDate)} last />
//         </Card>

//         {/* ══ LOAN AGREEMENT DOCUMENTS ══ */}
//         <Card>
//           <SectionLabel>Loan Agreement Documents</SectionLabel>
//           <DocumentViewer label="Loan Agreement Documents" files={loanDocs} />
//         </Card>

//         {/* ══ COLLATERAL ══ */}
//         <CollateralSection collateral={loan.collateral} />

//         {/* ══ INSPECTOR FINDINGS ══ */}
//         <InspectorSection loan={loan} />

//         {/* ══ DISBURSEMENT POP ══ */}
//         <Card>
//           <SectionLabel>Disbursement Proof of Payment</SectionLabel>
//           <DocumentViewer label="Proof of Payment" files={popDocs} />
//         </Card>

//         {/* ══ COUNTER OFFER ══ */}
//         {loan.newLoanAmountOffer > 0 && (
//           <Card gold>
//             <SectionLabel>Counter Offer</SectionLabel>
//             <InfoRow label="Offered Amount" value={fmtMoney(loan.newLoanAmountOffer)} mono gold />
//             <InfoRow label="Reason" value={fmt(loan.newLoanAmountOfferedReason)} />
//             <InfoRow
//               label="Client Decision"
//               value={loan.newLoanAmountOfferAccepted ? '✓ Accepted' : loan.newLoanAmountOfferDeclined ? '✗ Declined' : 'Pending'}
//               last={!loan.newLoanAmountOfferDeclined}
//             />
//             {loan.newLoanAmountOfferDeclined && (
//               <InfoRow label="Decline Reason" value={fmt(loan.newLoanAmountOfferDeclineReason)} last />
//             )}
//           </Card>
//         )}

//         {/* ══ REJECTION ══ */}
//         {loan.loanStatus === 'rejected' && (
//           <Card style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.2)' }}>
//             <SectionLabel color="#F87171">Rejection</SectionLabel>
//             <InfoRow label="Reason" value={fmt(loan.loanRejectionReason)} last />
//           </Card>
//         )}

//         {/* ══ SIGNATURES & INITIALS ══ */}
//         {hasAnySig && (
//           <Card>
//             <SectionLabel>Signatures & Initials</SectionLabel>
//             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 4 }}>
//               <SignaturePreview label="Client Signature" file={sigFile} />
//               <SignaturePreview label="Client Initials" file={initFile} />
//               <SignaturePreview label="Witness Signature" file={witSigFile} />
//               <SignaturePreview label="Witness Initials" file={witInitFile} />
//             </div>
//           </Card>
//         )}

//         {/* ══ ADMIN FLAGS ══ */}
//         <Card>
//           <SectionLabel>Admin Flags</SectionLabel>
//           <InfoRow label="Invoice Sent" value={loan.invoiceSent ? 'Yes' : 'No'} />
//           <InfoRow label="QuickBooks Invoice #" value={fmt(loan.quickBooksInvoiceNumber)} />
//           <InfoRow label="Payment Schedule Created" value={loan.paymentScheduleCreated ? 'Yes' : 'No'} />
//           <InfoRow label="Loan Appendix Created" value={loan.loanAppendixCreated ? 'Yes' : 'No'} />
//           <InfoRow label="Session Letter Uploaded" value={loan.sessionLetterUploaded ? 'Yes' : 'No'} />
//           <InfoRow label="Insurance Request" value={fmt(loan.insuranceRequest)} />
//           <InfoRow label="Collateral Inspected" value={loan.collateralInspected ? 'Yes' : 'No'} />
//           <InfoRow label="Rejection Msg Sent" value={loan.rejectionMessageSent ? 'Yes' : 'No'} last />
//         </Card>

//       </div>
//     </div>
//   )
// }

// /* ── Icons ──────────────────────────────────────────────────── */
// function ExpandIcon() { return <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><polyline points="6 9 12 15 18 9" /></svg> }
// function CollapseIcon() { return <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><polyline points="18 15 12 9 6 15" /></svg> }
// function CloseIcon() { return <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg> }
// function ExternalIcon() { return <svg width={11} height={11} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg> }
// function FileIcon() { return <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="#9CA3AF" strokeWidth={1.7}><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" /><polyline points="13 2 13 9 20 9" /></svg> }
// function PdfIcon() { return <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="#F87171" strokeWidth={1.7}><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" /><polyline points="13 2 13 9 20 9" /><line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="17" x2="15" y2="17" /></svg> }
// function VideoIcon() { return <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="#818CF8" strokeWidth={1.7}><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg> }
// function NoDocIcon() { return <svg width={32} height={32} fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.18)" strokeWidth={1.3}><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" /><polyline points="13 2 13 9 20 9" /><line x1="9" y1="13" x2="15" y2="13" strokeDasharray="3 2" /><line x1="9" y1="17" x2="13" y2="17" strokeDasharray="3 2" /></svg> }
'use client'

/**
 * LoanDetails.js — frontend/src/components/Includes/AdminComponents/LoanDetails.js
 */

import { useState } from 'react'
import Link from 'next/link'
import { backEndUrl } from '@/Constants'
import { useBottomNav } from '@/Contexts/BottomNavContext'

/* ─── Strapi normalizer ─────────────────────────────────────── */
function normalizeStrapi(obj) {
  if (obj === null || obj === undefined) return obj
  if (typeof obj !== 'object') return obj
  if (Array.isArray(obj)) return obj.map(normalizeStrapi)
  if (
    obj.data !== undefined &&
    !Array.isArray(obj.data) &&
    obj.data !== null &&
    typeof obj.data === 'object' &&
    obj.data.attributes !== undefined
  ) {
    return normalizeStrapi({ id: obj.data.id, ...obj.data.attributes })
  }
  if (obj.data !== undefined && Array.isArray(obj.data)) {
    return obj.data.map(item =>
      item && item.attributes
        ? normalizeStrapi({ id: item.id, ...item.attributes })
        : normalizeStrapi(item)
    )
  }
  const result = {}
  for (const key of Object.keys(obj)) result[key] = normalizeStrapi(obj[key])
  return result
}

/* ─── Helpers ───────────────────────────────────────────────── */
const fmt = v => (v == null || v === '' ? '—' : String(v))
const fmtMoney = v => v == null ? '—' : `K${Number(v).toLocaleString('en-ZM', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
const fmtDate = v => v ? new Date(v).toLocaleDateString('en-ZM', { year: 'numeric', month: 'short', day: 'numeric' }) : '—'

function getUrl(file) {
  if (!file) return null
  if (typeof file === 'string') return file.startsWith('http') ? file : backEndUrl + file
  if (!file.url) return null
  return file.url.startsWith('http') ? file.url : backEndUrl + file.url
}

function normalizeFiles(raw) {
  if (!raw) return []
  if (Array.isArray(raw)) return raw.filter(Boolean)
  return [raw]
}

/* ─── Status colours ────────────────────────────────────────── */
const STATUS_COLOURS = {
  'initiated': ['rgba(251,191,36,0.12)', '#FBBF24'],
  'pending-collateral-addition': ['rgba(251,191,36,0.12)', '#FBBF24'],
  'pending-collateral-inspection': ['rgba(251,191,36,0.12)', '#FBBF24'],
  'collateral-inspection': ['rgba(167,139,250,0.12)', '#A78BFA'],
  'request-approval': ['rgba(129,140,248,0.12)', '#818CF8'],
  'accepted': ['rgba(52,211,153,0.13)', '#34D399'],
  'pending-approval': ['rgba(167,139,250,0.12)', '#A78BFA'],
  'approved': ['rgba(16,185,129,0.14)', '#10B981'],
  'rejected': ['rgba(239,68,68,0.12)', '#F87171'],
  'disbursed': ['rgba(96,165,250,0.12)', '#60A5FA'],
  'completed': ['rgba(156,163,175,0.12)', '#9CA3AF'],
  'defaulted': ['rgba(220,38,38,0.15)', '#DC2626'],
}

function StatusPill({ status }) {
  const [bg, color] = STATUS_COLOURS[status] || ['rgba(255,255,255,0.08)', '#fff']
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '3px 10px', borderRadius: 100,
      background: bg, color, fontSize: 10, fontWeight: 700,
      letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap',
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: color, flexShrink: 0 }} />
      {status?.replace(/-/g, ' ')}
    </span>
  )
}

/* ─── Info row ──────────────────────────────────────────────── */
function InfoRow({ label: l, value: v, last, mono, gold }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
      gap: 12, padding: '10px 0',
      borderBottom: last ? 'none' : '1px solid rgba(255,255,255,0.055)',
    }}>
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', flexShrink: 0 }}>
        {l}
      </span>
      <span style={{
        fontSize: 13.5, fontWeight: 500, textAlign: 'right',
        color: gold ? '#C9A84C' : 'rgba(255,255,255,0.82)',
        fontFamily: mono ? "'JetBrains Mono', monospace" : undefined,
        wordBreak: 'break-word',
      }}>
        {v ?? '—'}
      </span>
    </div>
  )
}

/* ─── Section card ──────────────────────────────────────────── */
function Card({ children, gold, style: s }) {
  return (
    <div style={{
      position: 'relative', borderRadius: 14, overflow: 'hidden',
      background: gold
        ? 'linear-gradient(135deg, rgba(201,168,76,0.10), rgba(201,168,76,0.03))'
        : 'rgba(255,255,255,0.045)',
      border: `1px solid ${gold ? 'rgba(201,168,76,0.22)' : 'rgba(255,255,255,0.08)'}`,
      padding: '20px 22px', marginBottom: 14,
      backdropFilter: 'blur(10px)',
      ...s,
    }}>
      {children}
    </div>
  )
}

function SectionLabel({ children, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
      <div style={{ width: 3, height: 14, borderRadius: 2, background: color || 'linear-gradient(180deg,#C9A84C,#E8C87A)', flexShrink: 0 }} />
      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)' }}>
        {children}
      </span>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   DOCUMENT VIEWER
═══════════════════════════════════════════════════════════════ */
function DocumentViewer({ label, files, isVideo }) {
  const [open, setOpen] = useState(false)
  const normalised = normalizeFiles(files)
  const hasFiles = normalised.length > 0

  return (
    <div style={{ marginBottom: 4 }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          padding: '7px 14px', borderRadius: 8, border: 'none', cursor: 'pointer',
          background: open ? 'rgba(201,168,76,0.14)' : 'rgba(255,255,255,0.06)',
          color: open ? '#C9A84C' : 'rgba(255,255,255,0.6)',
          fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
          transition: 'all 0.2s',
        }}
      >
        {open ? <CollapseIcon /> : <ExpandIcon />}
        {open ? `Hide ${label}` : `Show ${label}`}
        {hasFiles && (
          <span style={{
            padding: '1px 7px', borderRadius: 100, fontSize: 10, fontWeight: 700,
            background: open ? 'rgba(201,168,76,0.25)' : 'rgba(255,255,255,0.1)',
            color: open ? '#C9A84C' : 'rgba(255,255,255,0.5)',
          }}>
            {normalised.length}
          </span>
        )}
      </button>

      {open && (
        <div style={{
          marginTop: 8, borderRadius: 12, overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(0,0,0,0.25)',
          maxHeight: 360,
          overflowY: 'auto',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
        }}>
          <div style={{
            position: 'sticky', top: 0, zIndex: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '10px 14px',
            background: 'rgba(10,15,30,0.92)',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            backdropFilter: 'blur(12px)',
          }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
              {label} {hasFiles ? `(${normalised.length})` : ''}
            </span>
            <button
              onClick={() => setOpen(false)}
              title="Collapse"
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '5px 12px', borderRadius: 7, border: 'none', cursor: 'pointer',
                background: 'rgba(255,255,255,0.07)',
                color: 'rgba(255,255,255,0.55)', fontSize: 11, fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif",
                transition: 'all 0.18s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(220,38,38,0.15)'; e.currentTarget.style.color = '#F87171' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.55)' }}
            >
              <CloseIcon /> Hide
            </button>
          </div>

          <div style={{ padding: '10px 14px 14px' }}>
            {!hasFiles ? (
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: '28px 0', gap: 10,
              }}>
                <NoDocIcon />
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.28)', fontStyle: 'italic' }}>
                  No document found
                </span>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {normalised.map((file, i) => {
                  const url = getUrl(file)
                  const name = file?.name || `Document ${i + 1}`
                  const mime = file?.mime || ''
                  const isImg = mime.startsWith('image/')
                  const isPdf = mime === 'application/pdf'

                  return (
                    <div key={file?.id || i} style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '10px 12px', borderRadius: 10,
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.07)',
                    }}>
                      {isImg && url ? (
                        <img
                          src={url} alt={name}
                          style={{ width: 40, height: 40, borderRadius: 7, objectFit: 'cover', flexShrink: 0, border: '1px solid rgba(255,255,255,0.1)' }}
                        />
                      ) : (
                        <div style={{
                          width: 40, height: 40, borderRadius: 7, flexShrink: 0,
                          background: isPdf ? 'rgba(239,68,68,0.12)' : isVideo ? 'rgba(99,102,241,0.12)' : 'rgba(255,255,255,0.07)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          border: '1px solid rgba(255,255,255,0.08)',
                        }}>
                          {isPdf ? <PdfIcon /> : isVideo ? <VideoIcon /> : <FileIcon />}
                        </div>
                      )}

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12.5, fontWeight: 600, color: 'rgba(255,255,255,0.8)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {name}
                        </div>
                        {file?.size && (
                          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>
                            {(file.size / 1024).toFixed(1)} KB
                          </div>
                        )}
                      </div>

                      {url ? (
                        <a
                          href={url} target="_blank" rel="noopener noreferrer"
                          style={{
                            display: 'flex', alignItems: 'center', gap: 5,
                            padding: '6px 12px', borderRadius: 7, textDecoration: 'none',
                            background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)',
                            color: '#C9A84C', fontSize: 11, fontWeight: 700, flexShrink: 0,
                            transition: 'all 0.18s',
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.18)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'rgba(201,168,76,0.1)'}
                        >
                          <ExternalIcon /> Open
                        </a>
                      ) : (
                        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', fontStyle: 'italic' }}>No URL</span>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── Signature preview ────────────────────────────────────── */
function SignaturePreview({ label, file }) {
  const url = getUrl(file)
  if (!url) {
    return (
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 7 }}>{label}</div>
        <div style={{
          width: '100%', height: 72, borderRadius: 10,
          background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.22)', fontStyle: 'italic' }}>No signature found</span>
        </div>
      </div>
    )
  }
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 7 }}>{label}</div>
      <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}>
        <img src={url} alt={label} style={{ display: 'block', width: '100%', height: 88, objectFit: 'contain' }} />
      </div>
      <a href={url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 6, fontSize: 11, color: '#C9A84C', textDecoration: 'none', fontWeight: 600 }}>
        <ExternalIcon /> Full size
      </a>
    </div>
  )
}

/* ─── Collateral section ────────────────────────────────────── */
function CollateralSection({ collateral }) {
  if (!collateral) return null
  const { collateralType, collateralCondition, collateralStatus, inspectedValue, inspectionNotes, inspectedCondition, vehicle, land, house, CollateralMedia, otherCollateralName } = collateral

  const media = normalizeFiles(CollateralMedia)

  return (
    <Card>
      <SectionLabel>Collateral</SectionLabel>
      <InfoRow label="Type" value={fmt(collateralType)} />
      <InfoRow label="Condition" value={fmt(collateralCondition)} />
      <InfoRow label="Status" value={fmt(collateralStatus)} />
      <InfoRow label="Inspected Value" value={fmtMoney(inspectedValue)} mono />
      <InfoRow label="Inspected Condition" value={fmt(inspectedCondition)} />
      <InfoRow label="Inspection Notes" value={fmt(inspectionNotes)} />

      {collateralType === 'vehicle' && vehicle && (
        <>
          <InfoRow label="Number Plate" value={fmt(vehicle.numberPlate)} />
          <InfoRow label="Insurance" value={fmt(vehicle.insuranceType)} />
          <InfoRow label="Packed" value={fmt(vehicle.packed)} />
          <InfoRow label="Packing Fee Paid" value={fmtMoney(vehicle.packingFeePaid)} mono />
        </>
      )}
      {collateralType === 'land' && land && (
        <>
          <InfoRow label="Location" value={fmt(land.location)} />
          <InfoRow label="Plot No." value={fmt(land.plotNumber)} />
          <InfoRow label="Hectors" value={fmt(land.hectors)} />
        </>
      )}
      {collateralType === 'house' && house && (
        <>
          <InfoRow label="Location" value={fmt(house.location)} />
          <InfoRow label="Plot No." value={fmt(house.plotNumber)} />
          <InfoRow label="Dimensions" value={fmt(house.dimensions)} />
        </>
      )}
      {collateralType === 'other' && <InfoRow label="Description" value={fmt(otherCollateralName)} />}

      <div style={{ marginTop: 14 }}>
        <DocumentViewer label="Collateral Media" files={media} />
      </div>

      {vehicle?.whitebook && (
        <div style={{ marginTop: 8 }}>
          <DocumentViewer label="Whitebook" files={normalizeFiles(vehicle.whitebook)} />
        </div>
      )}
      {vehicle?.sessionLetterTemplate && (
        <div style={{ marginTop: 8 }}>
          <DocumentViewer label="Session Letter Template" files={normalizeFiles(vehicle.sessionLetterTemplate)} />
        </div>
      )}
      {vehicle?.sessionLetter && (
        <div style={{ marginTop: 8 }}>
          <DocumentViewer label="Session Letter" files={normalizeFiles(vehicle.sessionLetter)} />
        </div>
      )}
      {land?.titleDeed && (
        <div style={{ marginTop: 8 }}>
          <DocumentViewer label="Title Deed" files={normalizeFiles(land.titleDeed)} />
        </div>
      )}
      {house?.titleDeed && (
        <div style={{ marginTop: 8 }}>
          <DocumentViewer label="Title Deed" files={normalizeFiles(house.titleDeed)} />
        </div>
      )}
    </Card>
  )
}

/* ─── Inspector findings ────────────────────────────────────── */
function InspectorSection({ loan }) {
  const { inspectorRecommendationOnLoan, inspectorRecommendedAmount, inspectorReasonForLoanDisproval, collateralInspected } = loan
  if (!inspectorRecommendationOnLoan && !collateralInspected) return null
  return (
    <Card>
      <SectionLabel>Inspector Findings</SectionLabel>
      <InfoRow label="Collateral Inspected" value={collateralInspected ? 'Yes' : 'No'} />
      <InfoRow label="Recommendation" value={fmt(inspectorRecommendationOnLoan)} />
      <InfoRow label="Recommended Amount" value={fmtMoney(inspectorRecommendedAmount)} mono />
      <InfoRow label="Reason for Disapproval" value={fmt(inspectorReasonForLoanDisproval)} last />
    </Card>
  )
}

/* ═══════════════════════════════════════════════════════════════
   CLIENT MINI-CARD
   "View Client Details" switches to the Client Details tab
   via setBottomNavLink(1) — same behaviour as the nav button.
═══════════════════════════════════════════════════════════════ */
function ClientMiniCard({ client, onViewProfile }) {
  if (!client) return null

  const details = client.details || {}
  const firstName = details.firstname || ''
  const lastName = details.lastname || ''
  const fullName = client.fullnames || `${firstName} ${lastName}`.trim() || client.username || 'Client'

  const initials = (firstName && lastName)
    ? `${firstName[0]}${lastName[0]}`.toUpperCase()
    : fullName.split(' ').map(n => n[0]).filter(Boolean).join('').toUpperCase().slice(0, 2) || '?'

  const picFiles = normalizeFiles(client.profilePicture)
  const picUrl = picFiles.length > 0 ? getUrl(picFiles[0]) : null

  return (
    <Card style={{
      display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
      background: 'rgba(167,139,250,0.06)', border: '1px solid rgba(167,139,250,0.18)',
    }}>
      {/* Avatar */}
      {picUrl ? (
        <img
          src={picUrl} alt={fullName}
          style={{
            width: 52, height: 52, borderRadius: 14, objectFit: 'cover', flexShrink: 0,
            border: '2px solid rgba(167,139,250,0.4)',
          }}
        />
      ) : (
        <div style={{
          width: 52, height: 52, borderRadius: 14, flexShrink: 0,
          background: 'linear-gradient(135deg, rgba(167,139,250,0.22), rgba(167,139,250,0.08))',
          border: '1.5px solid rgba(167,139,250,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 18, fontWeight: 400, color: '#A78BFA', lineHeight: 1,
          }}>
            {initials}
          </span>
        </div>
      )}

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(167,139,250,0.55)', marginBottom: 3 }}>
          Client
        </div>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {fullName}
        </div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', marginTop: 2 }}>
          {client.email || ''}
          {client.username && client.email ? ' · ' : ''}
          {client.username || ''}
        </div>
      </div>

      {/* View Client Details — switches to Client Details tab */}
      {client.id && (
        <button
          onClick={onViewProfile}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '9px 16px', borderRadius: 10,
            background: 'rgba(167,139,250,0.12)', border: '1px solid rgba(167,139,250,0.28)',
            color: '#A78BFA', fontSize: 12, fontWeight: 700, cursor: 'pointer',
            whiteSpace: 'nowrap', flexShrink: 0, transition: 'all 0.2s',
            fontFamily: "'DM Sans', sans-serif",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(167,139,250,0.22)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(167,139,250,0.12)' }}
        >
          View Client Details <ChevronRightIcon />
        </button>
      )}
    </Card>
  )
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function LoanDetails({ loan: rawLoan, role, onUpdated, constants }) {
  const { setBottomNavLink } = useBottomNav()

  if (!rawLoan) return (
    <div style={{ minHeight: '100vh', background: '#0A0F1E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'rgba(255,255,255,0.4)' }}>No loan data available.</p>
    </div>
  )

  const loan = normalizeStrapi(rawLoan)
  const client = loan.client ?? null

  const loanType = loan.loanType || {}
  const loanDocs = normalizeFiles(loan.loanAgreementDocuments)
  const popDocs = normalizeFiles(loan.disbursementPOP)

  const sigFile = client?.signature || null
  const witSigFile = client?.witnessSignature || null
  const initFile = client?.initials || null
  const witInitFile = client?.witnessInitials || null

  const hasAnySig = sigFile || witSigFile || initFile || witInitFile

  return (
    <div style={{
      minHeight: '100vh', background: '#0A0F1E',
      position: 'relative', overflowX: 'hidden',
    }}>
      {/* Background */}
      <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse 80% 50% at 50% -5%, rgba(201,168,76,0.08) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.022) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 720, margin: '0 auto', padding: '0 16px', animation: 'vfSlide 0.38s ease' }}>
        <style>{`@keyframes vfSlide { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }`}</style>

        {/* ── Page header ── */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 5 }}>
            Admin · {role || 'Loan Detail'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <h1 style={{ margin: 0, fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(20px,4vw,26px)', color: '#fff', fontWeight: 400 }}>
              Loan #{loan.id}
            </h1>
            <StatusPill status={loan.loanStatus} />
            {loanType.typeName && (
              <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.3)' }}>
                {loanType.typeName}
              </span>
            )}
          </div>
        </div>

        {/* ── Currently viewing badge ── */}
        {loan.id && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16,
            padding: '6px 14px', borderRadius: 100,
            background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C9A84C' }} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#C9A84C' }}>
              Currently Viewing
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'rgba(201,168,76,0.7)' }}>
              #{loan.id} · {fmtMoney(loan.loanAmount)}
            </span>
          </div>
        )}

        {/* ══ CLIENT MINI-CARD ══ */}
        <ClientMiniCard
          client={client}
          onViewProfile={() => setBottomNavLink(1)}
        />

        {/* ══ CORE FINANCIALS ══ */}
        <Card>
          <SectionLabel>Loan Financials</SectionLabel>
          <InfoRow label="Requested Amount" value={fmtMoney(loan.clientAskingAmount)} mono />
          <InfoRow label="Approved Amount" value={fmtMoney(loan.loanAmount)} mono gold />
          <InfoRow label="Disbursed Amount" value={fmtMoney(loan.disbursedAmount)} mono />
          <InfoRow label="Outstanding Amount" value={fmtMoney(loan.outstandingAmount)} mono />
          <InfoRow label="Repayment Amount" value={fmtMoney(loan.repaymentAmount)} mono />
          <InfoRow label="Interest Rate" value={loan.interestRate != null ? `${loan.interestRate}%` : '—'} />
          <InfoRow label="Loan Term" value={loan.loanTerm ? `${loan.loanTerm} months` : '—'} />
          <InfoRow label="Loan Purpose" value={fmt(loan.loanPurpose)} />
          <InfoRow label="Purpose Details" value={fmt(loan.loanPurposeDetails)} last />
        </Card>

        {/* ══ TIMELINE ══ */}
        <Card>
          <SectionLabel>Timeline</SectionLabel>
          <InfoRow label="Application Date" value={fmtDate(loan.applicationDate)} />
          <InfoRow label="Acceptance Date" value={fmtDate(loan.acceptanceDate)} />
          <InfoRow label="Approval Date" value={fmtDate(loan.approvalDate)} />
          <InfoRow label="Disbursement Date" value={fmtDate(loan.disbursementDate)} />
          <InfoRow label="Due Date" value={fmtDate(loan.dueDate)} last />
        </Card>

        {/* ══ LOAN AGREEMENT DOCUMENTS ══ */}
        <Card>
          <SectionLabel>Loan Agreement Documents</SectionLabel>
          <DocumentViewer label="Loan Agreement Documents" files={loanDocs} />
        </Card>

        {/* ══ COLLATERAL ══ */}
        <CollateralSection collateral={loan.collateral} />

        {/* ══ INSPECTOR FINDINGS ══ */}
        <InspectorSection loan={loan} />

        {/* ══ DISBURSEMENT POP ══ */}
        <Card>
          <SectionLabel>Disbursement Proof of Payment</SectionLabel>
          <DocumentViewer label="Proof of Payment" files={popDocs} />
        </Card>

        {/* ══ COUNTER OFFER ══ */}
        {loan.newLoanAmountOffer > 0 && (
          <Card gold>
            <SectionLabel>Counter Offer</SectionLabel>
            <InfoRow label="Offered Amount" value={fmtMoney(loan.newLoanAmountOffer)} mono gold />
            <InfoRow label="Reason" value={fmt(loan.newLoanAmountOfferedReason)} />
            <InfoRow
              label="Client Decision"
              value={loan.newLoanAmountOfferAccepted ? '✓ Accepted' : loan.newLoanAmountOfferDeclined ? '✗ Declined' : 'Pending'}
              last={!loan.newLoanAmountOfferDeclined}
            />
            {loan.newLoanAmountOfferDeclined && (
              <InfoRow label="Decline Reason" value={fmt(loan.newLoanAmountOfferDeclineReason)} last />
            )}
          </Card>
        )}

        {/* ══ REJECTION ══ */}
        {loan.loanStatus === 'rejected' && (
          <Card style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.2)' }}>
            <SectionLabel color="#F87171">Rejection</SectionLabel>
            <InfoRow label="Reason" value={fmt(loan.loanRejectionReason)} last />
          </Card>
        )}

        {/* ══ SIGNATURES & INITIALS ══ */}
        {hasAnySig && (
          <Card>
            <SectionLabel>Signatures & Initials</SectionLabel>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 4 }}>
              <SignaturePreview label="Client Signature" file={sigFile} />
              <SignaturePreview label="Client Initials" file={initFile} />
              <SignaturePreview label="Witness Signature" file={witSigFile} />
              <SignaturePreview label="Witness Initials" file={witInitFile} />
            </div>
          </Card>
        )}

        {/* ══ ADMIN FLAGS ══ */}
        <Card>
          <SectionLabel>Admin Flags</SectionLabel>
          <InfoRow label="Invoice Sent" value={loan.invoiceSent ? 'Yes' : 'No'} />
          <InfoRow label="QuickBooks Invoice #" value={fmt(loan.quickBooksInvoiceNumber)} />
          <InfoRow label="Payment Schedule Created" value={loan.paymentScheduleCreated ? 'Yes' : 'No'} />
          <InfoRow label="Loan Appendix Created" value={loan.loanAppendixCreated ? 'Yes' : 'No'} />
          <InfoRow label="Session Letter Uploaded" value={loan.sessionLetterUploaded ? 'Yes' : 'No'} />
          <InfoRow label="Insurance Request" value={fmt(loan.insuranceRequest)} />
          <InfoRow label="Collateral Inspected" value={loan.collateralInspected ? 'Yes' : 'No'} />
          <InfoRow label="Rejection Msg Sent" value={loan.rejectionMessageSent ? 'Yes' : 'No'} last />
        </Card>

      </div>
    </div>
  )
}

/* ── Icons ──────────────────────────────────────────────────── */
function ExpandIcon() { return <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><polyline points="6 9 12 15 18 9" /></svg> }
function CollapseIcon() { return <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><polyline points="18 15 12 9 6 15" /></svg> }
function CloseIcon() { return <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg> }
function ExternalIcon() { return <svg width={11} height={11} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg> }
function ChevronRightIcon() { return <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><polyline points="9 18 15 12 9 6" /></svg> }
function FileIcon() { return <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="#9CA3AF" strokeWidth={1.7}><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" /><polyline points="13 2 13 9 20 9" /></svg> }
function PdfIcon() { return <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="#F87171" strokeWidth={1.7}><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" /><polyline points="13 2 13 9 20 9" /><line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="17" x2="15" y2="17" /></svg> }
function VideoIcon() { return <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="#818CF8" strokeWidth={1.7}><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg> }
function NoDocIcon() { return <svg width={32} height={32} fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.18)" strokeWidth={1.3}><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" /><polyline points="13 2 13 9 20 9" /><line x1="9" y1="13" x2="15" y2="13" strokeDasharray="3 2" /><line x1="9" y1="17" x2="13" y2="17" strokeDasharray="3 2" /></svg> }