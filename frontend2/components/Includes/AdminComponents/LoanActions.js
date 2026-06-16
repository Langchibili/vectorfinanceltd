// 'use client'
// import React from 'react'
// import Box from '@mui/material/Box'
// import Button from '@mui/material/Button'
// import Dialog from '@mui/material/Dialog'
// import DialogTitle from '@mui/material/DialogTitle'
// import DialogContent from '@mui/material/DialogContent'
// import DialogActions from '@mui/material/DialogActions'
// import TextField from '@mui/material/TextField'
// import Typography from '@mui/material/Typography'
// import CircularProgress from '@mui/material/CircularProgress'
// import Stack from '@mui/material/Stack'
// import { ThemeProvider } from '@mui/material/styles'
// import { getTransitions } from '@/lib/transitions'
// import { updateLoan } from '@/Functions'
// import { Slide } from '@material-ui/core'
// import AppendixForm from './AppendixForm'
// import SalaryAppendixForm from './SalaryAppendixForm'
// import RejectionForm from './RejectionForm'
// import RequestCollateralInspection from './RequestCollateralInspection'
// import { Alert } from '@mui/material'
// import SendQuickBookInvoiceNumber from './SendQuickBookInvoiceNumber'
// import UploadPOP from './UploadPOP'
// import ContactCard from './ContactCard'
// import ChangeLoanAmount from './ChangeLoanAmount'
// import RequestApproval from './RequestApproval'
// import UploadSessionLetterTemplate from './UploadSessionLetterTemplate'
// import { adminTheme, G, FONTS, statusColor, pillSx } from '@/styles/admin-theme'

// /**
//  * Returns true when the loan is salary-based.
//  * Handles both the Strapi v4 relation shape (loanType.data.attributes.typeName)
//  * and flat shapes returned after populate (loanType.typeName).
//  */
// const isSalaryLoan = (loan) => {
//   if (!loan) return false
//   const typeName =
//     loan?.loanType?.typeName ||
//     loan?.loanType?.data?.attributes?.typeName ||
//     ''
//   return typeName === 'salaryBased'
// }

// export default class LoanActions extends React.Component {
//   state = {
//     open: false,
//     actionObj: null,
//     payload: {},
//     loading: false,
//     error: ''
//   }

//   // ── Convenience getter — pulls the loansInformation config from constants ──
//   get loansInfo() {
//     return this.props.constants?.loansInformation || {}
//   }

//   // Whether POP upload is required for the current loan type
//   get requirePOP() {
//     return isSalaryLoan(this.props.loan)
//       ? this.loansInfo.requirePOPuploadForSalaryLoans && this.loansInfo.requirePOPuploadForSalaryLoans !== false
//       : this.loansInfo.requirePOPuploadForAssetLoans && this.loansInfo.requirePOPuploadForAssetLoans !== false
//   }

//   // Whether the appendix section is required for the current loan type
//   get requireAppendix() {
//     return isSalaryLoan(this.props.loan)
//       ? this.loansInfo.requireLoanFormApendixSectionForSalaryLoans && this.loansInfo.requireLoanFormApendixSectionForSalaryLoans !== false
//       : this.loansInfo.requireLoanFormApendixSectionForAssetLoans && this.loansInfo.requireLoanFormApendixSectionForAssetLoans !== false
//   }

//   allowedActions = () => {
//     const { loan, role } = this.props
//     if (!loan || !loan.loanStatus) return []
//     const transitions = getTransitions(loan)
//     const actions = transitions[loan.loanStatus] || []
//     return actions.filter(a => {
//       if (!a.allowedRoles || a.allowedRoles.includes('system')) return false
//       const roleLower = String(role || '').toLowerCase()
//       if (!a.allowedRoles.some(r => String(r).toLowerCase() === roleLower || r === role)) return false
//       // Hide appendix action when config says it's not required
//       if (a.action === 'add-appendix' && !this.requireAppendix) return false
//       return true
//     })
//   }

//   open = actionObj => {
//     const inputs = {}
//     if (actionObj.requiresPayload) {
//       actionObj.requiresPayload.forEach(k => (inputs[k] = ''))
//     }
//     this.setState({ open: true, actionObj, payload: inputs, error: '' })
//   }

//   close = () => this.setState({ open: false, actionObj: null, payload: {}, error: '' })

//   handleChange = e => {
//     const { name, value } = e.target
//     this.setState(prev => ({ payload: { ...prev.payload, [name]: value } }))
//   }

//   handleActionClose = () => this.setState({ open: false, actionObj: null })

//   perform = async () => {
//     const { actionObj, payload } = this.state
//     const { loan, onUpdated } = this.props
//     if (!actionObj) return
//     if (actionObj.requiresPayload) {
//       const missing = actionObj.requiresPayload.filter(k => !payload[k] || String(payload[k]).trim() === '')
//       if (missing.length) {
//         this.setState({ error: 'Please fill: ' + missing.join(', ') })
//         return
//       }
//     }
//     this.setState({ loading: true, error: '' })
//     try {
//       const updateData = { data: { loanStatus: actionObj.targetStatus } }
//       const updated = await updateLoan(updateData, loan.id)
//       if (onUpdated && typeof onUpdated === 'function') onUpdated(updated)
//       this.setState({ loading: false, open: false, actionObj: null, payload: {} })
//     } catch (err) {
//       console.error('updateLoan error', err)
//       this.setState({ loading: false, error: 'Failed to perform action' })
//     }
//   }

//   getActionColor = a => {
//     if (!a) return 'inherit'
//     const actionKey = (a.action || '').toString().toLowerCase()
//     if (actionKey.includes('reject') || actionKey === 'reject') return 'error'
//     const s = a.targetStatus || ''
//     if (['accepted', 'approved', 'complete'].includes(s)) return 'success'
//     if (['rejected', 'defaulted'].includes(s)) return 'error'
//     if (['disbursed'].includes(s)) return 'info'
//     return 'primary'
//   }

//   prettyActionLabel = actionKey => {
//     if (!actionKey) return ''
//     let s = String(actionKey).replace(/([a-z0-9])([A-Z])/g, '$1 $2')
//     s = s.replace(/[_\-\.\s]+/g, ' ').trim().replace(/\s+/g, ' ')
//     return s.toUpperCase()
//   }

//   // ── Only relevant for asset loans (vehicle with insurance) ─────────────────
//   renderSessionLetterTemplateUpload = () => {
//     const { loan, onUpdated, role } = this.props
//     if (!loan || !loan.collateral || !loan.collateral.vehicle) return null
//     const { collateral } = loan
//     const { vehicle } = collateral
//     if (collateral && collateral.collateralType === 'vehicle') {
//       if (vehicle && vehicle.insuranceType && (vehicle.insuranceType === "third-party" || vehicle.insuranceType === "comprehensive")) {
//         if (loan.insuranceRequest && loan.insuranceRequest === "African Gray") return null
//         return <UploadSessionLetterTemplate loan={loan} onUpdated={onUpdated} role={role} handleActionClose={this.handleActionClose} />
//       }
//     }
//     return null
//   }

//   renderDialogFields = () => {
//     const { actionObj, payload } = this.state
//     const { loan, onUpdated, role } = this.props
//     if (actionObj && actionObj.allowedRoles.includes('Loan Admin')) {
//       if (actionObj.action === "add-appendix") {
//         // Salary loans use a trimmed appendix form (no insurance / tracker fields)
//         return isSalaryLoan(loan)
//           ? <SalaryAppendixForm loan={loan} handleActionClose={this.handleActionClose} />
//           : <AppendixForm loan={loan} handleActionClose={this.handleActionClose} />
//       }
//       if (loan.loanStatus === "collateral-inspection" && loan.collateral && loan.collateral.collateralStatus === "requesting-inspection") {
//         return <Alert severity='info'>You have already sent an inspection request, to re-request, please use the backend or call the inspector.</Alert>
//       }
//     }
//     if (!actionObj || !actionObj.requiresPayload) return null
//     return actionObj.requiresPayload.map(k => (
//       <TextField key={k} name={k} label={k === 'reason' ? 'Reason' : k} value={payload[k] || ''} onChange={this.handleChange} fullWidth multiline rows={3} sx={{ mt: 2 }} />
//     ))
//   }

//   // ══════════════════════════════════════════════════════════════════════════
//   //  SALARY LOAN RENDER PATH
//   //  Status flow: request-approval → accepted → pending-approval → approved → disbursed
//   //  No collateral, no inspection, no session letters.
//   // ══════════════════════════════════════════════════════════════════════════
//   renderSalaryLoanActions = () => {
//     const { loan, onUpdated, constants, role } = this.props
//     const { open, actionObj, loading, error } = this.state
//     const actions = this.allowedActions()

//     if (loan.loanStatus === "rejected") {
//       return (
//         <Box sx={{ mt: 2 }}>
//           <Alert severity='warning'>
//             {role === "ceo" || role === "director" || role === 'Loan Admin'
//               ? "You rejected this loan. To revert it, the client must re-apply or you can edit directly in the backend."
//               : "This loan was rejected."}
//           </Alert>
//         </Box>
//       )
//     }

//     if (actionObj && actionObj.action === "reject") {
//       return <RejectionForm loan={loan} onUpdated={onUpdated} role={role} handleActionClose={this.handleActionClose} openModal={true} />
//     }

//     // Director/CEO accepted the loan — waiting on client to sign
//     if ((role === "ceo" || role === "director") && loan.loanStatus === "accepted") {
//       return (
//         <Box sx={{ mt: 2 }}>
//           <Alert severity='info'>
//             You have successfully accepted this loan. The client will be notified to fill their forms and you will be informed once they are done.
//           </Alert>
//         </Box>
//       )
//     }

//     // Pending-approval state — salary loans skip straight from client signing to appendix / invoice
//     if (loan.loanStatus === "pending-approval") {
//       if (role === 'ceo' || role === 'director') {
//         // If appendix is not required, skip straight to waiting for invoice
//         if (this.requireAppendix && !loan.loanAppendixCreated) {
//           return (
//             <Box sx={{ mt: 2 }}>
//               <Alert severity='info'>
//                 The client has signed the loan form. Waiting for the loan officer to attach appendix details.
//               </Alert>
//             </Box>
//           )
//         }
//         if (!loan.invoiceSent) {
//           return (
//             <Box sx={{ mt: 2 }}>
//               <Alert severity='info'>
//                 {this.requireAppendix
//                   ? 'Appendix details have been added. Waiting for the loan officer to enter the QuickBooks invoice number.'
//                   : 'The client has signed the loan form. Waiting for the loan officer to enter the QuickBooks invoice number.'}
//               </Alert>
//             </Box>
//           )
//         }
//       }
//       if (role === 'Loan Admin') {
//         // Show appendix form only when required and not yet done
//         if (this.requireAppendix && !loan.loanAppendixCreated) {
//           return <SalaryAppendixForm loan={loan} onUpdated={onUpdated} />
//         }
//         if (!loan.invoiceSent) {
//           return <SendQuickBookInvoiceNumber loan={loan} onUpdated={onUpdated} role={role} handleActionClose={this.handleActionClose} />
//         }
//         if (loan.invoiceSent) {
//           return (
//             <Box sx={{ mt: 2 }}>
//               <Alert severity='info'>You have already sent the invoice number. To resend, use the backend.</Alert>
//             </Box>
//           )
//         }
//       }
//     }

//     // Approved / Disbursed — POP upload only when required
//     if (loan.loanStatus === "approved" || loan.loanStatus === "disbursed") {
//       if (role === 'Collateral Inspector') return null
//       if (!this.requirePOP) {
//         return (
//           <Box sx={{ mt: 2 }}>
//             <Alert severity='info'>
//               {loan.loanStatus === "approved"
//                 ? 'This loan has been approved. No proof of payment upload is required for salary loans — the loan will be marked as disbursed once funds are sent.'
//                 : 'This loan has been disbursed.'}
//             </Alert>
//           </Box>
//         )
//       }
//       return <UploadPOP loan={loan} onUpdated={onUpdated} role={role} handleActionClose={this.handleActionClose} />
//     }

//     // Default: render transition action buttons (e.g. "accept", "reject" on request-approval)
//     if (!actions.length) {
//       return (
//         <Box sx={{ mt: 2, p: 2, borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: `1px solid ${G.border}` }}>
//           <Typography variant="body2" sx={{ color: G.muted }}>No actions available for you right now.</Typography>
//         </Box>
//       )
//     }

//     return (
//       <Slide in={true} direction="left">
//         <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
//           {actions.map(a => {
//             const color = this.getActionColor(a)
//             const label = a.action === "accept" ? "APPROVE" : a.action
//             return (
//               <Button
//                 key={a.action}
//                 variant="contained"
//                 size="small"
//                 color={color}
//                 onClick={() => this.open(a)}
//                 sx={{ minWidth: 140, justifyContent: 'flex-start', fontSize: '12px', letterSpacing: '0.04em' }}
//               >
//                 {label}
//               </Button>
//             )
//           })}

//           <Dialog open={open} onClose={this.close} fullWidth maxWidth="sm">
//             <DialogTitle>
//               {actionObj ? `Confirm: ${actionObj.action === "accept" ? "Approve" : actionObj.action}` : 'Confirm Action'}
//             </DialogTitle>
//             <DialogContent>
//               <Typography variant="body2" sx={{ mb: 1 }}>
//                 {actionObj && actionObj.targetStatus === "accepted"
//                   ? `This will notify the client that their salary loan has been accepted. They will be asked to fill forms before disbursement. Loan amount: K${loan.loanAmount}.`
//                   : actionObj ? `This will move the loan to "${actionObj.targetStatus}"` : ''}
//               </Typography>
//               {this.renderDialogFields()}
//               {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={this.close} disabled={loading} variant="outlined">Cancel</Button>
//               <Button
//                 onClick={this.perform}
//                 disabled={loading}
//                 color={actionObj && actionObj.targetStatus === "accepted" ? "success" : "primary"}
//                 variant="contained"
//               >
//                 {loading ? <CircularProgress size={18} /> : 'Confirm'}
//               </Button>
//             </DialogActions>
//           </Dialog>
//         </Box>
//       </Slide>
//     )
//   }

//   // ══════════════════════════════════════════════════════════════════════════
//   //  ASSET LOAN RENDER PATH  — original logic, fully preserved
//   // ══════════════════════════════════════════════════════════════════════════
//   renderAssetLoanActions = () => {
//     const actions = this.allowedActions()
//     const { open, actionObj, loading, error } = this.state
//     const { loan, onUpdated, constants, role } = this.props

//     if (!actions.length && !loan.loanStatus === "disbursed") {
//       return (
//         <Box sx={{ mt: 2, p: 2, borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: `1px solid ${G.border}` }}>
//           <Typography variant="body2" sx={{ color: G.muted }}>No actions available for you right now</Typography>
//         </Box>
//       )
//     }

//     if (loan.loanStatus === "rejected") {
//       return (
//         <Box sx={{ mt: 2 }}>
//           <Alert severity='warning'>
//             {role === "ceo" || role === "director" || role === 'Loan Admin'
//               ? "You rejected this loan, to revert and accept it you must ask the client to re-apply for a new one or you can use the backend."
//               : "This loan was rejected."}
//           </Alert>
//         </Box>
//       )
//     }

//     if (actionObj && actionObj.action === "reject") {
//       return <RejectionForm loan={loan} onUpdated={onUpdated} role={role} handleActionClose={this.handleActionClose} openModal={true} />
//     }

//     if ((role === "ceo" || role === "director") && loan.loanStatus === "accepted") {
//       return (
//         <Box sx={{ mt: 2 }}>
//           <Alert severity='info'>You have successfully accepted this loan, you shall be notified when the client has signed the loan form.</Alert>
//         </Box>
//       )
//     }

//     if (role === 'Loan Admin' && loan.loanStatus === "pending-collateral-inspection") {
//       if (loan.collateral && loan.collateral.collateralStatus === "inspected") {
//         return (
//           <Stack spacing={1.5}>
//             <Alert severity='info'>Collateral Inspected by Inspector</Alert>
//             {this.renderSessionLetterTemplateUpload()}
//             <RejectionForm loan={loan} onUpdated={onUpdated} role={role} handleActionClose={this.handleActionClose} openModal={false} />
//           </Stack>
//         )
//       }
//       return (
//         <Stack spacing={1.5}>
//           {loan.collateral && loan.collateral.collateralStatus === "requesting-inspection" && (
//             <Alert severity='info'>You have already sent an inspection request.</Alert>
//           )}
//           <RequestCollateralInspection loan={loan} onUpdated={onUpdated} role={role} handleActionClose={this.handleActionClose} />
//           {this.renderSessionLetterTemplateUpload()}
//           <RejectionForm loan={loan} onUpdated={onUpdated} role={role} handleActionClose={this.handleActionClose} openModal={false} />
//         </Stack>
//       )
//     }

//     if (role !== "Collateral Inspector" && loan.loanStatus === "collateral-inspection") {
//       if (role === 'Loan Admin' && loan.collateral && loan.collateral.collateralStatus === "inspected") {
//         return (
//           <Stack spacing={1.5}>
//             <RequestApproval loan={loan} onUpdated={onUpdated} role={role} handleActionClose={this.handleActionClose} />
//             <ContactCard phone={constants.loansInformation.collateralInspectorNumber} email={constants.loansInformation.collateralInspectorEmail} user_title="Inspector" />
//             {this.renderSessionLetterTemplateUpload()}
//           </Stack>
//         )
//       }
//       return (
//         <ContactCard phone={constants.loansInformation.collateralInspectorNumber} email={constants.loansInformation.collateralInspectorEmail} user_title="Inspector" />
//       )
//     }

//     if (loan.loanStatus === "pending-approval") {
//       if (role === 'ceo' || role === 'director') {
//         if (this.requireAppendix && !loan.loanAppendixCreated) {
//           return <Box sx={{ mt: 2 }}><Alert severity='info'>Client has signed the loan form, awaiting the loan officer to attach appendix details to the loan form.</Alert></Box>
//         }
//         if (!loan.invoiceSent) {
//           return (
//             <Box sx={{ mt: 2 }}>
//               <Alert severity='info'>
//                 {this.requireAppendix
//                   ? "Loan officer has entered loan form appendix details, now awaiting the loan officer to enter the invoice number from the loan's quick books record."
//                   : "The client has signed the loan form. Waiting for the loan officer to enter the QuickBooks invoice number."}
//               </Alert>
//             </Box>
//           )
//         }
//       }
//       if (role === 'Loan Admin') {
//         // Show appendix form only when required and not yet done
//         if (this.requireAppendix && !loan.loanAppendixCreated) {
//           return <AppendixForm loan={loan} onUpdated={onUpdated} />
//         }
//         if (!loan.invoiceSent) {
//           return <SendQuickBookInvoiceNumber loan={loan} onUpdated={onUpdated} role={role} handleActionClose={this.handleActionClose} />
//         }
//         if (loan.invoiceSent) {
//           return <Box sx={{ mt: 2 }}><Alert severity='info'>You have already sent an Invoice number, to resend, you must use the backend.</Alert></Box>
//         }
//       }
//     }

//     if (role !== "Collateral Inspector" && (loan.loanStatus === "approved" || loan.loanStatus === "disbursed")) {
//       if (!this.requirePOP) {
//         return (
//           <Box sx={{ mt: 2 }}>
//             <Alert severity='info'>
//               {loan.loanStatus === "approved"
//                 ? 'This loan has been approved. No proof of payment upload is required — the loan will be marked as disbursed once funds are sent.'
//                 : 'This loan has been disbursed.'}
//             </Alert>
//           </Box>
//         )
//       }
//       return <UploadPOP loan={loan} onUpdated={onUpdated} role={role} handleActionClose={this.handleActionClose} />
//     }

//     return (
//       <Slide in={true} direction="left">
//         <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
//           {actions.map(a => {
//             const color = this.getActionColor(a)
//             const label = a.action === "accept" ? "APPROVE" : a.action
//             return (
//               <Button
//                 key={a.action}
//                 variant="contained"
//                 size="small"
//                 color={color}
//                 onClick={() => this.open(a)}
//                 sx={{ minWidth: 140, justifyContent: 'flex-start', fontSize: '12px', letterSpacing: '0.04em' }}
//               >
//                 {label}
//               </Button>
//             )
//           })}

//           <Dialog open={open} onClose={this.close} fullWidth maxWidth="sm">
//             <DialogTitle>
//               {actionObj ? `Confirm: ${actionObj.action === "accept" ? "Approve" : actionObj.action}` : 'Confirm Action'}
//             </DialogTitle>
//             <DialogContent>
//               <Typography variant="body2" sx={{ mb: 1 }}>
//                 {actionObj && actionObj.targetStatus === "accepted"
//                   ? `This will send a message to the user, informing them that their loan has been accepted. Are you sure you want to accept this loan with amount K${loan.loanAmount}?`
//                   : actionObj ? `This will move the loan to "${actionObj.targetStatus}"` : ''}
//               </Typography>
//               {this.renderDialogFields()}
//               {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={this.close} disabled={loading} variant="outlined">Cancel</Button>
//               <Button
//                 onClick={this.perform}
//                 disabled={loading}
//                 color={actionObj && actionObj.targetStatus === "accepted" ? "success" : "primary"}
//                 variant="contained"
//               >
//                 {loading ? <CircularProgress size={18} /> : 'Confirm'}
//               </Button>
//             </DialogActions>
//           </Dialog>
//         </Box>
//       </Slide>
//     )
//   }

//   render() {
//     const { loan } = this.props
//     if (!loan) return null

//     return (
//       <ThemeProvider theme={adminTheme}>
//         {isSalaryLoan(loan)
//           ? this.renderSalaryLoanActions()
//           : this.renderAssetLoanActions()
//         }
//       </ThemeProvider>
//     )
//   }
// }
'use client'
import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import { ThemeProvider } from '@mui/material/styles'
import { getTransitions } from '@/lib/transitions'
import { updateLoan } from '@/Functions'
import { Slide } from '@material-ui/core'
import AppendixForm from './AppendixForm'
import SalaryAppendixForm from './SalaryAppendixForm'
import RejectionForm from './RejectionForm'
import RequestCollateralInspection from './RequestCollateralInspection'
import { Alert } from '@mui/material'
import SendQuickBookInvoiceNumber from './SendQuickBookInvoiceNumber'
import UploadPOP from './UploadPOP'
import ContactCard from './ContactCard'
import ChangeLoanAmount from './ChangeLoanAmount'
import RequestApproval from './RequestApproval'
import UploadSessionLetterTemplate from './UploadSessionLetterTemplate'
import { adminTheme, G, FONTS, statusColor, pillSx } from '@/styles/admin-theme'

/**
 * Returns true when the loan is salary-based.
 * Handles both the Strapi v4 relation shape (loanType.data.attributes.typeName)
 * and flat shapes returned after populate (loanType.typeName).
 */
const isSalaryLoan = (loan) => {
  if (!loan) return false
  const typeName =
    loan?.loanType?.typeName ||
    loan?.loanType?.data?.attributes?.typeName ||
    ''
  return typeName === 'salaryBased'
}

export default class LoanActions extends React.Component {
  state = {
    open: false,
    actionObj: null,
    payload: {},
    loading: false,
    error: '',
    // ── allow-signing gate ──────────────────────────────────────────────
    allowSigningLoading: false,
    allowSigningError: '',
    allowSigningDone: false,   // optimistic flag: true once we have set it successfully
  }

  // ── Convenience getters ─────────────────────────────────────────────
  get loansInfo() {
    return this.props.constants?.loansInformation || {}
  }

  get requirePOP() {
    return isSalaryLoan(this.props.loan)
      ? this.loansInfo.requirePOPuploadForSalaryLoans && this.loansInfo.requirePOPuploadForSalaryLoans !== false
      : this.loansInfo.requirePOPuploadForAssetLoans && this.loansInfo.requirePOPuploadForAssetLoans !== false
  }

  get requireAppendix() {
    return isSalaryLoan(this.props.loan)
      ? this.loansInfo.requireLoanFormApendixSectionForSalaryLoans && this.loansInfo.requireLoanFormApendixSectionForSalaryLoans !== false
      : this.loansInfo.requireLoanFormApendixSectionForAssetLoans && this.loansInfo.requireLoanFormApendixSectionForAssetLoans !== false
  }

  /**
   * Mirrors the check on the client home page exactly:
   *   salary: requireUserToComeOnSiteForSalaryLoanVerification
   *   asset:  requireUserToComeOnSiteForAssetLoanVerification
   */
  get requireOnSite() {
    const info = this.loansInfo
    if (isSalaryLoan(this.props.loan)) {
      return (
        (info.requireUserToComeOnSiteForSalaryLoanVerification || false) &&
        info.requireUserToComeOnSiteForSalaryLoanVerification === true
      )
    }
    return (
      (info.requireUserToComeOnSiteForAssetLoanVerification || false) &&
      info.requireUserToComeOnSiteForAssetLoanVerification === true
    )
  }

  // ── Allow-signing action ────────────────────────────────────────────
  allowClientToSign = async () => {
    const { loan, onUpdated } = this.props
    if (!loan) return
    this.setState({ allowSigningLoading: true, allowSigningError: '' })
    try {
      const updated = await updateLoan(
        { data: { allowUserToSignLoanDocuments: true } },
        loan.id
      )
      if (onUpdated && typeof onUpdated === 'function') onUpdated(updated)
      this.setState({ allowSigningLoading: false, allowSigningDone: true })
    } catch (err) {
      console.error('allowClientToSign error', err)
      this.setState({
        allowSigningLoading: false,
        allowSigningError: 'Failed to update. Try again.',
      })
    }
  }

  /**
   * Renders the "accepted" state for ALL roles.
   *
   * ┌─────────────────────────────────────────────────────────────────┐
   * │  requireOnSite = false                                          │
   * │    → plain info message; no button needed (client signs freely) │
   * │  requireOnSite = true                                           │
   * │    → if already cleared: show confirmation badge                │
   * │    → if not yet cleared: show "Allow client to sign" button     │
   * │      (available to director, ceo, loan admin — not inspector)   │
   * └─────────────────────────────────────────────────────────────────┘
   */
  renderAcceptedState = () => {
    const { loan, role } = this.props
    const { allowSigningLoading, allowSigningError, allowSigningDone } = this.state
    const isInspector = String(role || '').toLowerCase() === 'collateral inspector'

    // ── No gate required ────────────────────────────────────────────
    if (!this.requireOnSite) {
      return (
        <Box sx={{ mt: 2 }}>
          <Alert severity="info">
            {isSalaryLoan(loan)
              ? 'You have successfully accepted this loan. The client will be notified to fill their forms and you will be informed once they are done.'
              : 'You have successfully accepted this loan, you shall be notified when the client has signed the loan form.'}
          </Alert>
        </Box>
      )
    }

    // ── On-site gate active ─────────────────────────────────────────
    const alreadyAllowed =
      allowSigningDone || loan?.allowUserToSignLoanDocuments === true

    return (
      <Box sx={{ mt: 2 }}>
        <Stack spacing={1.5}>
          {/* Context message */}
          <Alert severity="info">
            You have accepted this loan.{' '}
            {alreadyAllowed
              ? 'The client has been cleared and may now sign their loan documents.'
              : 'This loan requires in-person verification before the client can sign their documents. Once you have confirmed their visit, click the button below.'}
          </Alert>

          {/* Button — all roles except collateral inspector */}
          {!isInspector && (
            alreadyAllowed ? (
              /* Already cleared — confirmation badge */
              <Box sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 2, py: 1.25,
                borderRadius: '10px',
                background: 'rgba(16,185,129,0.10)',
                border: `1px solid rgba(16,185,129,0.28)`,
                width: 'fit-content',
              }}>
                <svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke={G.green3} strokeWidth={2.5}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <Typography sx={{ fontSize: '13px', fontWeight: 700, color: G.green3, fontFamily: FONTS.body }}>
                  Client cleared to sign loan documents
                </Typography>
              </Box>
            ) : (
              /* Allow-signing button */
              <Box>
                <Button
                  variant="contained"
                  color="success"
                  disabled={allowSigningLoading}
                  onClick={this.allowClientToSign}
                  startIcon={
                    allowSigningLoading
                      ? <CircularProgress size={16} sx={{ color: '#fff' }} />
                      : (
                        <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                          <path d="M9 12l2 2 4-4" />
                          <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )
                  }
                  sx={{
                    textTransform: 'none',
                    fontSize: '13.5px',
                    fontWeight: 700,
                    borderRadius: '10px',
                  }}
                >
                  {allowSigningLoading ? 'Updating…' : 'Allow Client to Sign Loan Form'}
                </Button>

                {allowSigningError && (
                  <Alert severity="error" sx={{ mt: 1.5, borderRadius: '10px' }}>
                    {allowSigningError}
                  </Alert>
                )}
              </Box>
            )
          )}
        </Stack>
      </Box>
    )
  }

  // ── Standard action machinery ───────────────────────────────────────
  allowedActions = () => {
    const { loan, role } = this.props
    if (!loan || !loan.loanStatus) return []
    const transitions = getTransitions(loan)
    const actions = transitions[loan.loanStatus] || []
    return actions.filter(a => {
      if (!a.allowedRoles || a.allowedRoles.includes('system')) return false
      const roleLower = String(role || '').toLowerCase()
      if (!a.allowedRoles.some(r => String(r).toLowerCase() === roleLower || r === role)) return false
      if (a.action === 'add-appendix' && !this.requireAppendix) return false
      return true
    })
  }

  open = actionObj => {
    const inputs = {}
    if (actionObj.requiresPayload) {
      actionObj.requiresPayload.forEach(k => (inputs[k] = ''))
    }
    this.setState({ open: true, actionObj, payload: inputs, error: '' })
  }

  close = () => this.setState({ open: false, actionObj: null, payload: {}, error: '' })

  handleChange = e => {
    const { name, value } = e.target
    this.setState(prev => ({ payload: { ...prev.payload, [name]: value } }))
  }

  handleActionClose = () => this.setState({ open: false, actionObj: null })

  perform = async () => {
    const { actionObj, payload } = this.state
    const { loan, onUpdated } = this.props
    if (!actionObj) return
    if (actionObj.requiresPayload) {
      const missing = actionObj.requiresPayload.filter(k => !payload[k] || String(payload[k]).trim() === '')
      if (missing.length) {
        this.setState({ error: 'Please fill: ' + missing.join(', ') })
        return
      }
    }
    this.setState({ loading: true, error: '' })
    try {
      const updateData = { data: { loanStatus: actionObj.targetStatus } }
      const updated = await updateLoan(updateData, loan.id)
      if (onUpdated && typeof onUpdated === 'function') onUpdated(updated)
      this.setState({ loading: false, open: false, actionObj: null, payload: {} })
    } catch (err) {
      console.error('updateLoan error', err)
      this.setState({ loading: false, error: 'Failed to perform action' })
    }
  }

  getActionColor = a => {
    if (!a) return 'inherit'
    const actionKey = (a.action || '').toString().toLowerCase()
    if (actionKey.includes('reject') || actionKey === 'reject') return 'error'
    const s = a.targetStatus || ''
    if (['accepted', 'approved', 'complete'].includes(s)) return 'success'
    if (['rejected', 'defaulted'].includes(s)) return 'error'
    if (['disbursed'].includes(s)) return 'info'
    return 'primary'
  }

  prettyActionLabel = actionKey => {
    if (!actionKey) return ''
    let s = String(actionKey).replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    s = s.replace(/[_\-\.\s]+/g, ' ').trim().replace(/\s+/g, ' ')
    return s.toUpperCase()
  }

  renderSessionLetterTemplateUpload = () => {
    const { loan, onUpdated, role } = this.props
    if (!loan || !loan.collateral || !loan.collateral.vehicle) return null
    const { collateral } = loan
    const { vehicle } = collateral
    if (collateral && collateral.collateralType === 'vehicle') {
      if (vehicle && vehicle.insuranceType && (vehicle.insuranceType === "third-party" || vehicle.insuranceType === "comprehensive")) {
        if (loan.insuranceRequest && loan.insuranceRequest === "African Gray") return null
        return <UploadSessionLetterTemplate loan={loan} onUpdated={onUpdated} role={role} handleActionClose={this.handleActionClose} />
      }
    }
    return null
  }

  renderDialogFields = () => {
    const { actionObj, payload } = this.state
    const { loan } = this.props
    if (actionObj && actionObj.allowedRoles.includes('Loan Admin')) {
      if (actionObj.action === "add-appendix") {
        return isSalaryLoan(loan)
          ? <SalaryAppendixForm loan={loan} handleActionClose={this.handleActionClose} />
          : <AppendixForm loan={loan} handleActionClose={this.handleActionClose} />
      }
      if (loan.loanStatus === "collateral-inspection" && loan.collateral && loan.collateral.collateralStatus === "requesting-inspection") {
        return <Alert severity='info'>You have already sent an inspection request, to re-request, please use the backend or call the inspector.</Alert>
      }
    }
    if (!actionObj || !actionObj.requiresPayload) return null
    return actionObj.requiresPayload.map(k => (
      <TextField key={k} name={k} label={k === 'reason' ? 'Reason' : k} value={payload[k] || ''} onChange={this.handleChange} fullWidth multiline rows={3} sx={{ mt: 2 }} />
    ))
  }

  // Shared confirm dialog used by both render paths
  renderConfirmDialog = (loan, actionObj) => {
    const { open, loading, error } = this.state
    return (
      <Dialog open={open} onClose={this.close} fullWidth maxWidth="sm">
        <DialogTitle>
          {actionObj ? `Confirm: ${actionObj.action === "accept" ? "Approve" : actionObj.action}` : 'Confirm Action'}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {actionObj && actionObj.targetStatus === "accepted"
              ? `This will notify the client that their loan has been accepted. Loan amount: K${loan.loanAmount}.`
              : actionObj ? `This will move the loan to "${actionObj.targetStatus}"` : ''}
          </Typography>
          {this.renderDialogFields()}
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        </DialogContent>
        <DialogActions>
          <Button onClick={this.close} disabled={loading} variant="outlined">Cancel</Button>
          <Button
            onClick={this.perform}
            disabled={loading}
            color={actionObj && actionObj.targetStatus === "accepted" ? "success" : "primary"}
            variant="contained"
          >
            {loading ? <CircularProgress size={18} /> : 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  // ══════════════════════════════════════════════════════════════════════
  //  SALARY LOAN RENDER PATH
  // ══════════════════════════════════════════════════════════════════════
  renderSalaryLoanActions = () => {
    const { loan, onUpdated, role } = this.props
    const { actionObj } = this.state
    const actions = this.allowedActions()

    if (loan.loanStatus === "rejected") {
      return (
        <Box sx={{ mt: 2 }}>
          <Alert severity='warning'>
            {role === "ceo" || role === "director" || role === 'Loan Admin'
              ? "You rejected this loan. To revert it, the client must re-apply or you can edit directly in the backend."
              : "This loan was rejected."}
          </Alert>
        </Box>
      )
    }

    if (actionObj && actionObj.action === "reject") {
      return <RejectionForm loan={loan} onUpdated={onUpdated} role={role} handleActionClose={this.handleActionClose} openModal={true} />
    }

    // ── ACCEPTED ── delegate to shared gate handler
    if (loan.loanStatus === "accepted") {
      return this.renderAcceptedState()
    }

    if (loan.loanStatus === "pending-approval") {
      if (role === 'ceo' || role === 'director') {
        if (this.requireAppendix && !loan.loanAppendixCreated) {
          return <Box sx={{ mt: 2 }}><Alert severity='info'>The client has signed the loan form. Waiting for the loan officer to attach appendix details.</Alert></Box>
        }
        if (!loan.invoiceSent) {
          return (
            <Box sx={{ mt: 2 }}>
              <Alert severity='info'>
                {this.requireAppendix
                  ? 'Appendix details have been added. Waiting for the loan officer to enter the QuickBooks invoice number.'
                  : 'The client has signed the loan form. Waiting for the loan officer to enter the QuickBooks invoice number.'}
              </Alert>
            </Box>
          )
        }
      }
      if (role === 'Loan Admin') {
        if (this.requireAppendix && !loan.loanAppendixCreated) {
          return <SalaryAppendixForm loan={loan} onUpdated={onUpdated} />
        }
        if (!loan.invoiceSent) {
          return <SendQuickBookInvoiceNumber loan={loan} onUpdated={onUpdated} role={role} handleActionClose={this.handleActionClose} />
        }
        if (loan.invoiceSent) {
          return <Box sx={{ mt: 2 }}><Alert severity='info'>You have already sent the invoice number. To resend, use the backend.</Alert></Box>
        }
      }
    }

    if (loan.loanStatus === "approved" || loan.loanStatus === "disbursed") {
      if (role === 'Collateral Inspector') return null
      if (!this.requirePOP) {
        return (
          <Box sx={{ mt: 2 }}>
            <Alert severity='info'>
              {loan.loanStatus === "approved"
                ? 'This loan has been approved. No proof of payment upload is required for salary loans — the loan will be marked as disbursed once funds are sent.'
                : 'This loan has been disbursed.'}
            </Alert>
          </Box>
        )
      }
      return <UploadPOP loan={loan} onUpdated={onUpdated} role={role} handleActionClose={this.handleActionClose} />
    }

    if (!actions.length) {
      return (
        <Box sx={{ mt: 2, p: 2, borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: `1px solid ${G.border}` }}>
          <Typography variant="body2" sx={{ color: G.muted }}>No actions available for you right now.</Typography>
        </Box>
      )
    }

    return (
      <Slide in={true} direction="left">
        <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {actions.map(a => (
            <Button key={a.action} variant="contained" size="small" color={this.getActionColor(a)} onClick={() => this.open(a)} sx={{ minWidth: 140, justifyContent: 'flex-start', fontSize: '12px', letterSpacing: '0.04em' }}>
              {a.action === "accept" ? "APPROVE" : a.action}
            </Button>
          ))}
          {this.renderConfirmDialog(loan, actionObj)}
        </Box>
      </Slide>
    )
  }

  // ══════════════════════════════════════════════════════════════════════
  //  ASSET LOAN RENDER PATH
  // ══════════════════════════════════════════════════════════════════════
  renderAssetLoanActions = () => {
    const actions = this.allowedActions()
    const { actionObj } = this.state
    const { loan, onUpdated, constants, role } = this.props

    if (!actions.length && loan.loanStatus !== "disbursed") {
      return (
        <Box sx={{ mt: 2, p: 2, borderRadius: '12px', background: 'rgba(255,255,255,0.03)', border: `1px solid ${G.border}` }}>
          <Typography variant="body2" sx={{ color: G.muted }}>No actions available for you right now</Typography>
        </Box>
      )
    }

    if (loan.loanStatus === "rejected") {
      return (
        <Box sx={{ mt: 2 }}>
          <Alert severity='warning'>
            {role === "ceo" || role === "director" || role === 'Loan Admin'
              ? "You rejected this loan, to revert and accept it you must ask the client to re-apply for a new one or you can use the backend."
              : "This loan was rejected."}
          </Alert>
        </Box>
      )
    }

    if (actionObj && actionObj.action === "reject") {
      return <RejectionForm loan={loan} onUpdated={onUpdated} role={role} handleActionClose={this.handleActionClose} openModal={true} />
    }

    // ── ACCEPTED ── delegate to shared gate handler
    if (loan.loanStatus === "accepted") {
      return this.renderAcceptedState()
    }

    if (role === 'Loan Admin' && loan.loanStatus === "pending-collateral-inspection") {
      if (loan.collateral && loan.collateral.collateralStatus === "inspected") {
        return (
          <Stack spacing={1.5}>
            <Alert severity='info'>Collateral Inspected by Inspector</Alert>
            {this.renderSessionLetterTemplateUpload()}
            <RejectionForm loan={loan} onUpdated={onUpdated} role={role} handleActionClose={this.handleActionClose} openModal={false} />
          </Stack>
        )
      }
      return (
        <Stack spacing={1.5}>
          {loan.collateral && loan.collateral.collateralStatus === "requesting-inspection" && (
            <Alert severity='info'>You have already sent an inspection request.</Alert>
          )}
          <RequestCollateralInspection loan={loan} onUpdated={onUpdated} role={role} handleActionClose={this.handleActionClose} />
          {this.renderSessionLetterTemplateUpload()}
          <RejectionForm loan={loan} onUpdated={onUpdated} role={role} handleActionClose={this.handleActionClose} openModal={false} />
        </Stack>
      )
    }

    if (role !== "Collateral Inspector" && loan.loanStatus === "collateral-inspection") {
      if (role === 'Loan Admin' && loan.collateral && loan.collateral.collateralStatus === "inspected") {
        return (
          <Stack spacing={1.5}>
            <RequestApproval loan={loan} onUpdated={onUpdated} role={role} handleActionClose={this.handleActionClose} />
            <ContactCard phone={constants.loansInformation.collateralInspectorNumber} email={constants.loansInformation.collateralInspectorEmail} user_title="Inspector" />
            {this.renderSessionLetterTemplateUpload()}
          </Stack>
        )
      }
      return (
        <ContactCard phone={constants.loansInformation.collateralInspectorNumber} email={constants.loansInformation.collateralInspectorEmail} user_title="Inspector" />
      )
    }

    if (loan.loanStatus === "pending-approval") {
      if (role === 'ceo' || role === 'director') {
        if (this.requireAppendix && !loan.loanAppendixCreated) {
          return <Box sx={{ mt: 2 }}><Alert severity='info'>Client has signed the loan form, awaiting the loan officer to attach appendix details to the loan form.</Alert></Box>
        }
        if (!loan.invoiceSent) {
          return (
            <Box sx={{ mt: 2 }}>
              <Alert severity='info'>
                {this.requireAppendix
                  ? "Loan officer has entered loan form appendix details, now awaiting the loan officer to enter the invoice number from the loan's quick books record."
                  : "The client has signed the loan form. Waiting for the loan officer to enter the QuickBooks invoice number."}
              </Alert>
            </Box>
          )
        }
      }
      if (role === 'Loan Admin') {
        if (this.requireAppendix && !loan.loanAppendixCreated) {
          return <AppendixForm loan={loan} onUpdated={onUpdated} />
        }
        if (!loan.invoiceSent) {
          return <SendQuickBookInvoiceNumber loan={loan} onUpdated={onUpdated} role={role} handleActionClose={this.handleActionClose} />
        }
        if (loan.invoiceSent) {
          return <Box sx={{ mt: 2 }}><Alert severity='info'>You have already sent an Invoice number, to resend, you must use the backend.</Alert></Box>
        }
      }
    }

    if (role !== "Collateral Inspector" && (loan.loanStatus === "approved" || loan.loanStatus === "disbursed")) {
      if (!this.requirePOP) {
        return (
          <Box sx={{ mt: 2 }}>
            <Alert severity='info'>
              {loan.loanStatus === "approved"
                ? 'This loan has been approved. No proof of payment upload is required — the loan will be marked as disbursed once funds are sent.'
                : 'This loan has been disbursed.'}
            </Alert>
          </Box>
        )
      }
      return <UploadPOP loan={loan} onUpdated={onUpdated} role={role} handleActionClose={this.handleActionClose} />
    }

    return (
      <Slide in={true} direction="left">
        <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {actions.map(a => (
            <Button key={a.action} variant="contained" size="small" color={this.getActionColor(a)} onClick={() => this.open(a)} sx={{ minWidth: 140, justifyContent: 'flex-start', fontSize: '12px', letterSpacing: '0.04em' }}>
              {a.action === "accept" ? "APPROVE" : a.action}
            </Button>
          ))}
          {this.renderConfirmDialog(loan, actionObj)}
        </Box>
      </Slide>
    )
  }

  render() {
    const { loan } = this.props
    if (!loan) return null
    return (
      <ThemeProvider theme={adminTheme}>
        {isSalaryLoan(loan)
          ? this.renderSalaryLoanActions()
          : this.renderAssetLoanActions()
        }
      </ThemeProvider>
    )
  }
}