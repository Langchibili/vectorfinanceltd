// // 'use client'
// // import React from 'react'
// // import Paper from '@mui/material/Paper'
// // import Box from '@mui/material/Box'
// // import Typography from '@mui/material/Typography'
// // import Stack from '@mui/material/Stack'
// // import Button from '@mui/material/Button'
// // import Divider from '@mui/material/Divider'
// // import { ThemeProvider } from '@mui/material/styles'
// // import { TRANSITIONS } from '@/lib/transitions'
// // import { getPermissions } from '@/lib/permissions'
// // import { updateLoan } from '@/Functions'
// // import { useBottomNav } from '@/Contexts/BottomNavContext'
// // import { adminTheme, G, FONTS, pillSx, statusColor } from '@/styles/admin-theme'

// // // ─── Friendly labels (shared across both loan types) ──────────
// // const ACTION_LABELS = {
// //   'request-collateral': 'Request collateral from client',
// //   'client-added-collateral': 'Client added collateral',
// //   'start-inspection': 'Start collateral inspection',
// //   'inspect-and-submit': 'Inspector submitted inspection',
// //   'accept': 'Accept loan (director/CEO)',
// //   'reject': 'Reject loan',
// //   'client-signs': 'Client signing loan form',
// //   'add-appendix': 'Add appendix / metadata (loan admin)',
// //   'approve': 'Approve loan',
// //   'disburse': 'Disburse funds',
// //   'complete': 'Mark as completed',
// //   'default': 'Mark as defaulted',
// //   'offer-new-amount': 'Offer new amount to client',
// //   'add-collateral-value': 'Add collateral value'
// // }

// // // ─── Status descriptions per loan type ────────────────────────
// // const ASSET_STATUS_DESCRIPTIONS = {
// //   'initiated': 'Client created loan',
// //   'pending-collateral-addition': 'Awaiting collateral from client',
// //   'pending-collateral-inspection': 'Awaiting collateral inspection',
// //   'collateral-inspection': 'Inspector inspecting collateral',
// //   'request-approval': 'Awaiting loan approval',
// //   'accepted': 'Client signing loan form',
// //   'pending-approval': 'Awaiting final editions',
// //   'approved': 'Loan approved (pending disbursement)',
// //   'rejected': 'Loan rejected',
// //   'disbursed': 'Loan disbursed',
// //   'completed': 'Loan completed',
// //   'defaulted': 'Loan defaulted'
// // }

// // // Salary loans skip all collateral / inspection statuses
// // const SALARY_STATUS_DESCRIPTIONS = {
// //   'initiated': 'Client created loan',
// //   'request-approval': 'Awaiting loan approval',
// //   'accepted': 'Client signing loan form',
// //   'pending-approval': 'Awaiting appendix & invoice',
// //   'approved': 'Loan approved (pending disbursement)',
// //   'rejected': 'Loan rejected',
// //   'disbursed': 'Loan disbursed',
// //   'completed': 'Loan completed',
// //   'defaulted': 'Loan defaulted'
// // }

// // // Collateral-related statuses that are irrelevant for salary loans
// // const COLLATERAL_STATUSES = new Set([
// //   'pending-collateral-addition',
// //   'pending-collateral-inspection',
// //   'collateral-inspection'
// // ])

// // /**
// //  * Resolve loan type from both Strapi v4 populate shapes.
// //  */
// // const getLoanTypeName = (loan) =>
// //   loan?.loanType?.typeName ||
// //   loan?.loanType?.data?.attributes?.typeName ||
// //   ''

// // export default class ActionOverview extends React.Component {
// //   state = {
// //     loadingAction: null,
// //     error: ''
// //   }

// //   get salaryLoan() {
// //     return getLoanTypeName(this.props.loan) === 'salaryBased'
// //   }

// //   getLabel = actionKey => ACTION_LABELS[actionKey] || actionKey

// //   getCurrentActivity = loan => {
// //     if (!loan) return ''
// //     const lastAction = loan.lastAction || null
// //     if (lastAction && ACTION_LABELS[lastAction]) return ACTION_LABELS[lastAction]
// //     const s = loan.loanStatus || loan.status || ''
// //     const descriptions = this.salaryLoan ? SALARY_STATUS_DESCRIPTIONS : ASSET_STATUS_DESCRIPTIONS
// //     return descriptions[s] || `Status: ${s}`
// //   }

// //   getImmediateActions = status => {
// //     if (!status) return []
// //     const list = TRANSITIONS[status] || []
// //     const filtered = list.filter(a => !(a.allowedRoles || []).includes('system'))
// //     // For salary loans, drop any transition that leads to a collateral-only status
// //     if (this.salaryLoan) {
// //       return filtered.filter(a => !COLLATERAL_STATUSES.has(a.targetStatus))
// //     }
// //     return filtered
// //   }

// //   getUpcomingActions = status => {
// //     if (!status) return []
// //     const immediate = this.getImmediateActions(status)
// //     const upcoming = []
// //     immediate.forEach(im => {
// //       const nextList = TRANSITIONS[im.targetStatus] || []
// //       nextList.forEach(n => {
// //         if ((n.allowedRoles || []).includes('system')) return
// //         // For salary loans, skip upcoming actions that lead into collateral statuses
// //         if (this.salaryLoan && COLLATERAL_STATUSES.has(n.targetStatus)) return
// //         if (!upcoming.find(x => x.action === n.action)) upcoming.push({ ...n, from: im.targetStatus })
// //       })
// //     })
// //     return upcoming
// //   }

// //   isAllowed = (actionObj, role) => {
// //     if (!actionObj || !actionObj.allowedRoles) return false
// //     const roleLower = String(role || '').toLowerCase()
// //     return actionObj.allowedRoles.some(r => String(r).toLowerCase() === roleLower || r === role)
// //   }

// //   performAction = async actionObj => {
// //     const { loan, role, onUpdated, onOpenCollateralForm, onOpenOfferForm } = this.props
// //     if (!actionObj || !loan) return
// //     if (actionObj.requiresPayload && Array.isArray(actionObj.requiresPayload) && actionObj.requiresPayload.length > 0) {
// //       if (actionObj.action === 'add-collateral-value' && typeof onOpenCollateralForm === 'function') {
// //         onOpenCollateralForm(); return
// //       }
// //       if (actionObj.action === 'offer-new-amount' && typeof onOpenOfferForm === 'function') {
// //         onOpenOfferForm(); return
// //       }
// //       alert('This action requires additional information. Use the dedicated form.')
// //       return
// //     }
// //     const proceed = window.confirm(`Proceed with: "${this.getLabel(actionObj.action)}"?`)
// //     if (!proceed) return
// //     this.setState({ loadingAction: actionObj.action, error: '' })
// //     try {
// //       const body = {
// //         data: {
// //           status: actionObj.targetStatus,
// //           lastAction: actionObj.action,
// //           lastActionByRole: role,
// //           lastActionAt: new Date().toISOString(),
// //           actionPayload: {}
// //         }
// //       }
// //       const updated = await updateLoan(body, loan.id)
// //       if (onUpdated && typeof onUpdated === 'function') onUpdated(updated)
// //       this.setState({ loadingAction: null })
// //     } catch (err) {
// //       console.error('performAction error', err)
// //       this.setState({ loadingAction: null, error: 'Action failed' })
// //     }
// //   }

// //   getStatusTitle = status => {
// //     if (status === "request-approval") return "awaiting approval"
// //     if (status === "pending-approval") return this.salaryLoan ? "awaiting appendix & invoice" : "pending final editions"
// //     return status
// //   }

// //   render() {
// //     const { loan, role, ActionDisplay } = this.props
// //     const { loadingAction, error } = this.state
// //     if (!loan) return null

// //     const currentStatus = loan.loanStatus || loan.status || ''
// //     const immediate = this.getImmediateActions(currentStatus)
// //     const upcoming = this.getUpcomingActions(currentStatus)
// //     const upcomingForRole = upcoming.filter(a => this.isAllowed(a, role))
// //     const currentActivity = this.getCurrentActivity(loan)
// //     const sc = statusColor(currentStatus)

// //     return (
// //       <ThemeProvider theme={adminTheme}>
// //         <Paper sx={{ p: 2.5, maxWidth: 440, mx: 'auto', my: 2 }}>

// //           {/* Salary loan badge */}
// //           {this.salaryLoan && (
// //             <Box sx={{
// //               display: 'inline-flex', alignItems: 'center', gap: 0.75,
// //               px: '8px', py: '3px', borderRadius: '100px', mb: 2,
// //               fontSize: '9px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
// //               background: 'rgba(96,165,250,0.10)', color: '#60a5fa',
// //               border: '1px solid rgba(96,165,250,0.22)',
// //             }}>
// //               <svg width={8} height={8} viewBox="0 0 8 8" fill="#60a5fa"><circle cx="4" cy="4" r="4" /></svg>
// //               Salary Loan
// //             </Box>
// //           )}

// //           {/* Current activity */}
// //           <Box sx={{ mb: 2.5 }}>
// //             <Typography variant="subtitle2" sx={{ mb: 1.5 }}>Current activity</Typography>
// //             <Box sx={{
// //               p: 2,
// //               borderRadius: '12px',
// //               background: `${sc}10`,
// //               border: `1px solid ${sc}28`,
// //             }}>
// //               <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1.5 }}>
// //                 <Box sx={{ flex: 1 }}>
// //                   <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#fff', lineHeight: 1.4, mb: 1 }}>
// //                     {currentActivity}
// //                   </Typography>
// //                   {loan.lastActionAt && (
// //                     <Typography variant="caption" sx={{ color: G.muted, display: 'block' }}>
// //                       Updated {new Date(loan.lastActionAt).toLocaleString()}
// //                     </Typography>
// //                   )}
// //                 </Box>
// //                 <Box component="span" sx={pillSx(currentStatus)}>
// //                   {this.getStatusTitle(currentStatus)}
// //                 </Box>
// //               </Box>
// //             </Box>
// //           </Box>

// //           <Divider sx={{ borderColor: G.border, mb: 2.5 }} />

// //           {/* Action display slot */}
// //           {ActionDisplay()}

// //           {/* Upcoming actions */}
// //           {upcomingForRole.length > 0 && (
// //             <Box sx={{ mt: 3 }}>
// //               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
// //                 <Box sx={{ width: 3, height: 12, borderRadius: 1, background: `linear-gradient(180deg, ${G.green1}, ${G.green3})` }} />
// //                 <Typography variant="subtitle2">Upcoming actions for you</Typography>
// //               </Box>

// //               <Stack spacing={1}>
// //                 {upcomingForRole.map(a => {
// //                   const label = this.getLabel(a.action)
// //                   const fromStatus = a.from || a.targetStatus
// //                   const fromColor = statusColor(fromStatus)
// //                   return (
// //                     <Box
// //                       key={'up_' + a.action}
// //                       sx={{
// //                         display: 'flex',
// //                         alignItems: 'center',
// //                         justifyContent: 'space-between',
// //                         gap: 1.5,
// //                         p: '10px 14px',
// //                         borderRadius: '10px',
// //                         background: 'rgba(255,255,255,0.03)',
// //                         border: `1px solid ${G.border}`,
// //                         opacity: 0.5,
// //                       }}
// //                     >
// //                       <Typography sx={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.6)', flex: 1 }}>
// //                         {this.getStatusTitle(label)}
// //                       </Typography>
// //                       <Box component="span" sx={{
// //                         px: '8px', py: '2px',
// //                         borderRadius: '100px',
// //                         fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.05em',
// //                         textTransform: 'uppercase',
// //                         background: `${fromColor}18`,
// //                         color: fromColor,
// //                         whiteSpace: 'nowrap',
// //                         flexShrink: 0,
// //                       }}>
// //                         {this.getStatusTitle(fromStatus)}
// //                       </Box>
// //                     </Box>
// //                   )
// //                 })}
// //               </Stack>
// //             </Box>
// //           )}

// //           {/* Nav buttons */}
// //           <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, mt: 3 }}>
// //             <ViewLoanDetails />
// //             <ViewClientDetails />
// //           </Box>
// //         </Paper>
// //       </ThemeProvider>
// //     )
// //   }
// // }

// // const ViewLoanDetails = () => {
// //   const { setBottomNavLink } = useBottomNav()
// //   return (
// //     <Button
// //       variant="outlined"
// //       size="small"
// //       onClick={() => setBottomNavLink(0)}
// //       sx={{
// //         fontSize: '12px', opacity: 0.7,
// //         borderColor: G.border, color: 'rgba(255,255,255,0.6)',
// //         '&:hover': { borderColor: G.greenBorder, color: G.green2, opacity: 1, background: G.greenGlow },
// //       }}
// //     >
// //       Loan Details
// //     </Button>
// //   )
// // }

// // const ViewClientDetails = () => {
// //   const { setBottomNavLink } = useBottomNav()
// //   return (
// //     <Button
// //       variant="outlined"
// //       size="small"
// //       onClick={() => setBottomNavLink(1)}
// //       sx={{
// //         fontSize: '12px', opacity: 0.7,
// //         borderColor: G.border, color: 'rgba(255,255,255,0.6)',
// //         '&:hover': { borderColor: G.greenBorder, color: G.green2, opacity: 1, background: G.greenGlow },
// //       }}
// //     >
// //       Client Details
// //     </Button>
// //   )
// // }
// 'use client'
// import React from 'react'
// import Paper from '@mui/material/Paper'
// import Box from '@mui/material/Box'
// import Typography from '@mui/material/Typography'
// import Stack from '@mui/material/Stack'
// import Button from '@mui/material/Button'
// import Divider from '@mui/material/Divider'
// import { ThemeProvider } from '@mui/material/styles'
// import { TRANSITIONS } from '@/lib/transitions'
// import { getPermissions } from '@/lib/permissions'
// import { updateLoan } from '@/Functions'
// import { useBottomNav } from '@/Contexts/BottomNavContext'
// import { adminTheme, G, FONTS, pillSx, statusColor } from '@/styles/admin-theme'

// // ─── Friendly labels (shared across both loan types) ──────────
// const ACTION_LABELS = {
//   'request-collateral': 'Request collateral from client',
//   'client-added-collateral': 'Client added collateral',
//   'start-inspection': 'Start collateral inspection',
//   'inspect-and-submit': 'Inspector submitted inspection',
//   'accept': 'Accept loan (director/CEO)',
//   'reject': 'Reject loan',
//   'client-signs': 'Client signing loan form',
//   'add-appendix': 'Add appendix / metadata (loan admin)',
//   'approve': 'Approve loan',
//   'disburse': 'Disburse funds',
//   'complete': 'Mark as completed',
//   'default': 'Mark as defaulted',
//   'offer-new-amount': 'Offer new amount to client',
//   'add-collateral-value': 'Add collateral value'
// }

// // ─── Status descriptions per loan type ────────────────────────
// const ASSET_STATUS_DESCRIPTIONS = {
//   'initiated': 'Client created loan',
//   'pending-collateral-addition': 'Awaiting collateral from client',
//   'pending-collateral-inspection': 'Awaiting collateral inspection',
//   'collateral-inspection': 'Inspector inspecting collateral',
//   'request-approval': 'Awaiting loan approval',
//   'accepted': 'Client signing loan form',
//   'pending-approval': 'Awaiting final editions',
//   'approved': 'Loan approved (pending disbursement)',
//   'rejected': 'Loan rejected',
//   'disbursed': 'Loan disbursed',
//   'completed': 'Loan completed',
//   'defaulted': 'Loan defaulted'
// }

// // Salary loans skip all collateral / inspection statuses
// const SALARY_STATUS_DESCRIPTIONS = {
//   'initiated': 'Client created loan',
//   'request-approval': 'Awaiting loan approval',
//   'accepted': 'Client signing loan form',
//   'pending-approval': 'Awaiting appendix & invoice',
//   'approved': 'Loan approved (pending disbursement)',
//   'rejected': 'Loan rejected',
//   'disbursed': 'Loan disbursed',
//   'completed': 'Loan completed',
//   'defaulted': 'Loan defaulted'
// }

// // Collateral-related statuses that are irrelevant for salary loans
// const COLLATERAL_STATUSES = new Set([
//   'pending-collateral-addition',
//   'pending-collateral-inspection',
//   'collateral-inspection'
// ])

// // Collateral-related action keys irrelevant for salary loans
// const COLLATERAL_ACTION_KEYS = new Set([
//   'request-collateral',
//   'client-added-collateral',
//   'start-inspection',
//   'inspect-and-submit',
//   'add-collateral-value',
// ])

// /**
//  * Resolve loan type from both Strapi v4 populate shapes.
//  */
// const getLoanTypeName = (loan) =>
//   loan?.loanType?.typeName ||
//   loan?.loanType?.data?.attributes?.typeName ||
//   ''

// export default class ActionOverview extends React.Component {
//   state = {
//     loadingAction: null,
//     error: ''
//   }

//   get salaryLoan() {
//     return getLoanTypeName(this.props.loan) === 'salaryBased'
//   }

//   getLabel = actionKey => ACTION_LABELS[actionKey] || actionKey

//   getCurrentActivity = loan => {
//     if (!loan) return ''
//     const lastAction = loan.lastAction || null
//     if (lastAction && ACTION_LABELS[lastAction]) return ACTION_LABELS[lastAction]
//     const s = loan.loanStatus || loan.status || ''
//     const descriptions = this.salaryLoan ? SALARY_STATUS_DESCRIPTIONS : ASSET_STATUS_DESCRIPTIONS
//     return descriptions[s] || `Status: ${s}`
//   }

//   getImmediateActions = status => {
//     if (!status) return []
//     const list = TRANSITIONS[status] || []
//     const filtered = list.filter(a => !(a.allowedRoles || []).includes('system'))
//     // For salary loans, drop any transition that leads to a collateral-only status
//     // OR whose action key is collateral-specific
//     if (this.salaryLoan) {
//       return filtered.filter(a =>
//         !COLLATERAL_STATUSES.has(a.targetStatus) &&
//         !COLLATERAL_ACTION_KEYS.has(a.action)
//       )
//     }
//     return filtered
//   }

//   getUpcomingActions = status => {
//     if (!status) return []
//     const immediate = this.getImmediateActions(status)
//     const upcoming = []
//     immediate.forEach(im => {
//       const nextList = TRANSITIONS[im.targetStatus] || []
//       nextList.forEach(n => {
//         if ((n.allowedRoles || []).includes('system')) return
//         // For salary loans, skip upcoming actions that lead into collateral statuses
//         // OR whose action key is collateral-specific
//         if (this.salaryLoan && (
//           COLLATERAL_STATUSES.has(n.targetStatus) ||
//           COLLATERAL_ACTION_KEYS.has(n.action)
//         )) return
//         if (!upcoming.find(x => x.action === n.action)) upcoming.push({ ...n, from: im.targetStatus })
//       })
//     })
//     return upcoming
//   }

//   isAllowed = (actionObj, role) => {
//     if (!actionObj || !actionObj.allowedRoles) return false
//     const roleLower = String(role || '').toLowerCase()
//     return actionObj.allowedRoles.some(r => String(r).toLowerCase() === roleLower || r === role)
//   }

//   performAction = async actionObj => {
//     const { loan, role, onUpdated, onOpenCollateralForm, onOpenOfferForm } = this.props
//     if (!actionObj || !loan) return
//     if (actionObj.requiresPayload && Array.isArray(actionObj.requiresPayload) && actionObj.requiresPayload.length > 0) {
//       if (actionObj.action === 'add-collateral-value' && typeof onOpenCollateralForm === 'function') {
//         onOpenCollateralForm(); return
//       }
//       if (actionObj.action === 'offer-new-amount' && typeof onOpenOfferForm === 'function') {
//         onOpenOfferForm(); return
//       }
//       alert('This action requires additional information. Use the dedicated form.')
//       return
//     }
//     const proceed = window.confirm(`Proceed with: "${this.getLabel(actionObj.action)}"?`)
//     if (!proceed) return
//     this.setState({ loadingAction: actionObj.action, error: '' })
//     try {
//       const body = {
//         data: {
//           status: actionObj.targetStatus,
//           lastAction: actionObj.action,
//           lastActionByRole: role,
//           lastActionAt: new Date().toISOString(),
//           actionPayload: {}
//         }
//       }
//       const updated = await updateLoan(body, loan.id)
//       if (onUpdated && typeof onUpdated === 'function') onUpdated(updated)
//       this.setState({ loadingAction: null })
//     } catch (err) {
//       console.error('performAction error', err)
//       this.setState({ loadingAction: null, error: 'Action failed' })
//     }
//   }

//   getStatusTitle = status => {
//     if (status === "request-approval") return "awaiting approval"
//     if (status === "pending-approval") return this.salaryLoan ? "awaiting appendix & invoice" : "pending final editions"
//     return status
//   }

//   render() {
//     const { loan, role, ActionDisplay } = this.props
//     const { loadingAction, error } = this.state
//     if (!loan) return null

//     const currentStatus = loan.loanStatus || loan.status || ''
//     const immediate = this.getImmediateActions(currentStatus)
//     const upcoming = this.getUpcomingActions(currentStatus)
//     const upcomingForRole = upcoming.filter(a => this.isAllowed(a, role))
//     const currentActivity = this.getCurrentActivity(loan)
//     const sc = statusColor(currentStatus)

//     return (
//       <ThemeProvider theme={adminTheme}>
//         <Paper sx={{ p: 2.5, maxWidth: 440, mx: 'auto', my: 2 }}>

//           {/* Salary loan badge */}
//           {this.salaryLoan && (
//             <Box sx={{
//               display: 'inline-flex', alignItems: 'center', gap: 0.75,
//               px: '8px', py: '3px', borderRadius: '100px', mb: 2,
//               fontSize: '9px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
//               background: 'rgba(96,165,250,0.10)', color: '#60a5fa',
//               border: '1px solid rgba(96,165,250,0.22)',
//             }}>
//               <svg width={8} height={8} viewBox="0 0 8 8" fill="#60a5fa"><circle cx="4" cy="4" r="4" /></svg>
//               Salary Loan
//             </Box>
//           )}

//           {/* Current activity */}
//           <Box sx={{ mb: 2.5 }}>
//             <Typography variant="subtitle2" sx={{ mb: 1.5 }}>Current activity</Typography>
//             <Box sx={{
//               p: 2,
//               borderRadius: '12px',
//               background: `${sc}10`,
//               border: `1px solid ${sc}28`,
//             }}>
//               <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1.5 }}>
//                 <Box sx={{ flex: 1 }}>
//                   <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#fff', lineHeight: 1.4, mb: 1 }}>
//                     {currentActivity}
//                   </Typography>
//                   {loan.lastActionAt && (
//                     <Typography variant="caption" sx={{ color: G.muted, display: 'block' }}>
//                       Updated {new Date(loan.lastActionAt).toLocaleString()}
//                     </Typography>
//                   )}
//                 </Box>
//                 <Box component="span" sx={pillSx(currentStatus)}>
//                   {this.getStatusTitle(currentStatus)}
//                 </Box>
//               </Box>
//             </Box>
//           </Box>

//           <Divider sx={{ borderColor: G.border, mb: 2.5 }} />

//           {/* Action display slot */}
//           {ActionDisplay()}

//           {/* Upcoming actions */}
//           {upcomingForRole.length > 0 && (
//             <Box sx={{ mt: 3 }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
//                 <Box sx={{ width: 3, height: 12, borderRadius: 1, background: `linear-gradient(180deg, ${G.green1}, ${G.green3})` }} />
//                 <Typography variant="subtitle2">Upcoming actions for you</Typography>
//               </Box>

//               <Stack spacing={1}>
//                 {upcomingForRole.map(a => {
//                   const label = this.getLabel(a.action)
//                   const fromStatus = a.from || a.targetStatus
//                   const fromColor = statusColor(fromStatus)
//                   return (
//                     <Box
//                       key={'up_' + a.action}
//                       sx={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'space-between',
//                         gap: 1.5,
//                         p: '10px 14px',
//                         borderRadius: '10px',
//                         background: 'rgba(255,255,255,0.03)',
//                         border: `1px solid ${G.border}`,
//                         opacity: 0.5,
//                       }}
//                     >
//                       <Typography sx={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.6)', flex: 1 }}>
//                         {this.getStatusTitle(label)}
//                       </Typography>
//                       <Box component="span" sx={{
//                         px: '8px', py: '2px',
//                         borderRadius: '100px',
//                         fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.05em',
//                         textTransform: 'uppercase',
//                         background: `${fromColor}18`,
//                         color: fromColor,
//                         whiteSpace: 'nowrap',
//                         flexShrink: 0,
//                       }}>
//                         {this.getStatusTitle(fromStatus)}
//                       </Box>
//                     </Box>
//                   )
//                 })}
//               </Stack>
//             </Box>
//           )}

//           {/* Nav buttons */}
//           <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, mt: 3 }}>
//             <ViewLoanDetails />
//             <ViewClientDetails />
//           </Box>
//         </Paper>
//       </ThemeProvider>
//     )
//   }
// }

// const ViewLoanDetails = () => {
//   const { setBottomNavLink } = useBottomNav()
//   return (
//     <Button
//       variant="outlined"
//       size="small"
//       onClick={() => setBottomNavLink(0)}
//       sx={{
//         fontSize: '12px', opacity: 0.7,
//         borderColor: G.border, color: 'rgba(255,255,255,0.6)',
//         '&:hover': { borderColor: G.greenBorder, color: G.green2, opacity: 1, background: G.greenGlow },
//       }}
//     >
//       Loan Details
//     </Button>
//   )
// }

// const ViewClientDetails = () => {
//   const { setBottomNavLink } = useBottomNav()
//   return (
//     <Button
//       variant="outlined"
//       size="small"
//       onClick={() => setBottomNavLink(1)}
//       sx={{
//         fontSize: '12px', opacity: 0.7,
//         borderColor: G.border, color: 'rgba(255,255,255,0.6)',
//         '&:hover': { borderColor: G.greenBorder, color: G.green2, opacity: 1, background: G.greenGlow },
//       }}
//     >
//       Client Details
//     </Button>
//   )
// }
'use client'
import React from 'react'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { ThemeProvider } from '@mui/material/styles'
import { getTransitions } from '@/lib/transitions'
import { getPermissions } from '@/lib/permissions'
import { updateLoan } from '@/Functions'
import { useBottomNav } from '@/Contexts/BottomNavContext'
import { adminTheme, G, FONTS, pillSx, statusColor } from '@/styles/admin-theme'

// ─── Friendly labels (shared across both loan types) ──────────
const ACTION_LABELS = {
  'request-collateral': 'Request collateral from client',
  'client-added-collateral': 'Client added collateral',
  'start-inspection': 'Start collateral inspection',
  'inspect-and-submit': 'Inspector submitted inspection',
  'accept': 'Accept loan (director/CEO)',
  'reject': 'Reject loan',
  'client-signs': 'Client signing loan form',
  'add-appendix': 'Add appendix / metadata (loan admin)',
  'approve': 'Approve loan',
  'disburse': 'Disburse funds',
  'complete': 'Mark as completed',
  'default': 'Mark as defaulted',
  'offer-new-amount': 'Offer new amount to client',
  'add-collateral-value': 'Add collateral value'
}

// ─── Status descriptions per loan type ────────────────────────
const ASSET_STATUS_DESCRIPTIONS = {
  'initiated': 'Client created loan',
  'pending-collateral-addition': 'Awaiting collateral from client',
  'pending-collateral-inspection': 'Awaiting collateral inspection',
  'collateral-inspection': 'Inspector inspecting collateral',
  'request-approval': 'Awaiting loan approval',
  'accepted': 'Client signing loan form',
  'pending-approval': 'Awaiting final editions',
  'approved': 'Loan approved (pending disbursement)',
  'rejected': 'Loan rejected',
  'disbursed': 'Loan disbursed',
  'completed': 'Loan completed',
  'defaulted': 'Loan defaulted'
}

// Salary loans skip all collateral / inspection statuses
const SALARY_STATUS_DESCRIPTIONS = {
  'initiated': 'Client created loan',
  'request-approval': 'Awaiting loan approval',
  'accepted': 'Client signing loan form',
  'pending-approval': 'Awaiting appendix & invoice',
  'approved': 'Loan approved (pending disbursement)',
  'rejected': 'Loan rejected',
  'disbursed': 'Loan disbursed',
  'completed': 'Loan completed',
  'defaulted': 'Loan defaulted'
}


/**
 * Resolve loan type from both Strapi v4 populate shapes.
 */
const getLoanTypeName = (loan) =>
  loan?.loanType?.typeName ||
  loan?.loanType?.data?.attributes?.typeName ||
  ''

export default class ActionOverview extends React.Component {
  state = {
    loadingAction: null,
    error: ''
  }

  get salaryLoan() {
    return getLoanTypeName(this.props.loan) === 'salaryBased'
  }

  getLabel = actionKey => ACTION_LABELS[actionKey] || actionKey

  getCurrentActivity = loan => {
    if (!loan) return ''
    const lastAction = loan.lastAction || null
    if (lastAction && ACTION_LABELS[lastAction]) return ACTION_LABELS[lastAction]
    const s = loan.loanStatus || loan.status || ''
    const descriptions = this.salaryLoan ? SALARY_STATUS_DESCRIPTIONS : ASSET_STATUS_DESCRIPTIONS
    return descriptions[s] || `Status: ${s}`
  }

  getImmediateActions = status => {
    if (!status) return []
    const transitions = getTransitions(this.props.loan)
    const list = transitions[status] || []
    return list.filter(a => !(a.allowedRoles || []).includes('system'))
  }

  getUpcomingActions = status => {
    if (!status) return []
    const transitions = getTransitions(this.props.loan)
    const immediate = this.getImmediateActions(status)
    const upcoming = []
    immediate.forEach(im => {
      const nextList = transitions[im.targetStatus] || []
      nextList.forEach(n => {
        if ((n.allowedRoles || []).includes('system')) return
        if (!upcoming.find(x => x.action === n.action)) upcoming.push({ ...n, from: im.targetStatus })
      })
    })
    return upcoming
  }

  isAllowed = (actionObj, role) => {
    if (!actionObj || !actionObj.allowedRoles) return false
    const roleLower = String(role || '').toLowerCase()
    return actionObj.allowedRoles.some(r => String(r).toLowerCase() === roleLower || r === role)
  }

  performAction = async actionObj => {
    const { loan, role, onUpdated, onOpenCollateralForm, onOpenOfferForm } = this.props
    if (!actionObj || !loan) return
    if (actionObj.requiresPayload && Array.isArray(actionObj.requiresPayload) && actionObj.requiresPayload.length > 0) {
      if (actionObj.action === 'add-collateral-value' && typeof onOpenCollateralForm === 'function') {
        onOpenCollateralForm(); return
      }
      if (actionObj.action === 'offer-new-amount' && typeof onOpenOfferForm === 'function') {
        onOpenOfferForm(); return
      }
      alert('This action requires additional information. Use the dedicated form.')
      return
    }
    const proceed = window.confirm(`Proceed with: "${this.getLabel(actionObj.action)}"?`)
    if (!proceed) return
    this.setState({ loadingAction: actionObj.action, error: '' })
    try {
      const body = {
        data: {
          status: actionObj.targetStatus,
          lastAction: actionObj.action,
          lastActionByRole: role,
          lastActionAt: new Date().toISOString(),
          actionPayload: {}
        }
      }
      const updated = await updateLoan(body, loan.id)
      if (onUpdated && typeof onUpdated === 'function') onUpdated(updated)
      this.setState({ loadingAction: null })
    } catch (err) {
      console.error('performAction error', err)
      this.setState({ loadingAction: null, error: 'Action failed' })
    }
  }

  getStatusTitle = status => {
    if (status === "request-approval") return "awaiting approval"
    if (status === "pending-approval") return this.salaryLoan ? "awaiting appendix & invoice" : "pending final editions"
    return status
  }

  render() {
    const { loan, role, ActionDisplay } = this.props
    const { loadingAction, error } = this.state
    if (!loan) return null

    const currentStatus = loan.loanStatus || loan.status || ''
    const immediate = this.getImmediateActions(currentStatus)
    const upcoming = this.getUpcomingActions(currentStatus)
    const upcomingForRole = upcoming.filter(a => this.isAllowed(a, role))
    const currentActivity = this.getCurrentActivity(loan)
    const sc = statusColor(currentStatus)

    return (
      <ThemeProvider theme={adminTheme}>
        <Paper sx={{ p: 2.5, maxWidth: 440, mx: 'auto', my: 2 }}>

          {/* Salary loan badge */}
          {this.salaryLoan && (
            <Box sx={{
              display: 'inline-flex', alignItems: 'center', gap: 0.75,
              px: '8px', py: '3px', borderRadius: '100px', mb: 2,
              fontSize: '9px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
              background: 'rgba(96,165,250,0.10)', color: '#60a5fa',
              border: '1px solid rgba(96,165,250,0.22)',
            }}>
              <svg width={8} height={8} viewBox="0 0 8 8" fill="#60a5fa"><circle cx="4" cy="4" r="4" /></svg>
              Salary Loan
            </Box>
          )}

          {/* Current activity */}
          <Box sx={{ mb: 2.5 }}>
            <Typography variant="subtitle2" sx={{ mb: 1.5 }}>Current activity</Typography>
            <Box sx={{
              p: 2,
              borderRadius: '12px',
              background: `${sc}10`,
              border: `1px solid ${sc}28`,
            }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 1.5 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontSize: '14px', fontWeight: 600, color: '#fff', lineHeight: 1.4, mb: 1 }}>
                    {currentActivity}
                  </Typography>
                  {loan.lastActionAt && (
                    <Typography variant="caption" sx={{ color: G.muted, display: 'block' }}>
                      Updated {new Date(loan.lastActionAt).toLocaleString()}
                    </Typography>
                  )}
                </Box>
                <Box component="span" sx={pillSx(currentStatus)}>
                  {this.getStatusTitle(currentStatus)}
                </Box>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ borderColor: G.border, mb: 2.5 }} />

          {/* Action display slot */}
          {ActionDisplay()}

          {/* Upcoming actions */}
          {upcomingForRole.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <Box sx={{ width: 3, height: 12, borderRadius: 1, background: `linear-gradient(180deg, ${G.green1}, ${G.green3})` }} />
                <Typography variant="subtitle2">Upcoming actions for you</Typography>
              </Box>

              <Stack spacing={1}>
                {upcomingForRole.map(a => {
                  const label = this.getLabel(a.action)
                  const fromStatus = a.from || a.targetStatus
                  const fromColor = statusColor(fromStatus)
                  return (
                    <Box
                      key={'up_' + a.action}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 1.5,
                        p: '10px 14px',
                        borderRadius: '10px',
                        background: 'rgba(255,255,255,0.03)',
                        border: `1px solid ${G.border}`,
                        opacity: 0.5,
                      }}
                    >
                      <Typography sx={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.6)', flex: 1 }}>
                        {this.getStatusTitle(label)}
                      </Typography>
                      <Box component="span" sx={{
                        px: '8px', py: '2px',
                        borderRadius: '100px',
                        fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        background: `${fromColor}18`,
                        color: fromColor,
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                      }}>
                        {this.getStatusTitle(fromStatus)}
                      </Box>
                    </Box>
                  )
                })}
              </Stack>
            </Box>
          )}

          {/* Nav buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, mt: 3 }}>
            <ViewLoanDetails />
            <ViewClientDetails />
          </Box>
        </Paper>
      </ThemeProvider>
    )
  }
}

const ViewLoanDetails = () => {
  const { setBottomNavLink } = useBottomNav()
  return (
    <Button
      variant="outlined"
      size="small"
      onClick={() => setBottomNavLink(0)}
      sx={{
        fontSize: '12px', opacity: 0.7,
        borderColor: G.border, color: 'rgba(255,255,255,0.6)',
        '&:hover': { borderColor: G.greenBorder, color: G.green2, opacity: 1, background: G.greenGlow },
      }}
    >
      Loan Details
    </Button>
  )
}

const ViewClientDetails = () => {
  const { setBottomNavLink } = useBottomNav()
  return (
    <Button
      variant="outlined"
      size="small"
      onClick={() => setBottomNavLink(1)}
      sx={{
        fontSize: '12px', opacity: 0.7,
        borderColor: G.border, color: 'rgba(255,255,255,0.6)',
        '&:hover': { borderColor: G.greenBorder, color: G.green2, opacity: 1, background: G.greenGlow },
      }}
    >
      Client Details
    </Button>
  )
}