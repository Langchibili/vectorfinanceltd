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
import { TRANSITIONS } from '@/lib/transitions'
import { getPermissions } from '@/lib/permissions'
import { updateLoan } from '@/Functions'
import { Slide } from '@material-ui/core'
import AppendixForm from './AppendixForm'
import RejectionForm from './RejectionForm'
import RequestCollateralInspection from './RequestCollateralInspection'
import { Alert } from '@mui/material'
import SendQuickBookInvoiceNumber from './SendQuickBookInvoiceNumber'
import UploadPOP from './UploadPOP'
import ContactCard from './ContactCard'
import ChangeLoanAmount from './ChangeLoanAmount'
import RequestApproval from './RequestApproval'
import UploadSessionLetterTemplate from './UploadSessionLetterTemplate'

export default class LoanActions extends React.Component {
  state = {
    open: false,
    actionObj: null,
    payload: {},
    loading: false,
    error: ''
  }

  allowedActions = () => {
    const { loan, role } = this.props
    if (!loan || !loan.loanStatus) return []
    const actions = TRANSITIONS[loan.loanStatus] || []
    return actions.filter(a => {
      if (!a.allowedRoles || a.allowedRoles.includes('system')) return false
      const roleLower = String(role || '').toLowerCase()
      return a.allowedRoles.some(r => String(r).toLowerCase() === roleLower || r === role)
    })
  }

  open = actionObj => {
    const inputs = {}
    if (actionObj.requiresPayload) {
      actionObj.requiresPayload.forEach(k => (inputs[k] = ''))
    }
    this.setState({ open: true, actionObj, payload: inputs, error: '' })
  }

  close = () => {
    this.setState({ open: false, actionObj: null, payload: {}, error: '' })
  }

  handleChange = e => {
    const { name, value } = e.target
    this.setState(prev => ({ payload: { ...prev.payload, [name]: value } }))
  }

  handleActionClose = ()=>{
    this.setState({
        open: false,
        actionObj: null
    })
  }

  perform = async () => {
    const { actionObj, payload } = this.state
    const { loan, onUpdated, role } = this.props
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
      const updateData = {
        data: {
          loanStatus: actionObj.targetStatus
        }
      }
      const updated = await updateLoan(updateData, loan.id)
      if (onUpdated && typeof onUpdated === 'function') {
        onUpdated(updated)
      }
      this.setState({ loading: false, open: false, actionObj: null, payload: {} })
    } catch (err) {
      console.error('updateLoan error', err)
      this.setState({ loading: false, error: 'Failed to perform action' })
    }
  }

  getStatusColor = status => {
    switch ((status || '').toString().toLowerCase()) {
        case 'initiated':
        case 'pending-collateral-addition':
        case 'pending-collateral-inspection':
        case 'pending-approval':
        return 'warning'
        case 'disbursed':
        return 'info'
        case 'accepted':
        case 'approved':
        return 'success'
        case 'completed':
        return 'secondary'
        case 'defaulted':
        return 'error'
        default:
        return 'inherit'
    }
  }

  getActionColor = a => {
    if (!a) return 'inherit'
    const actionKey = (a.action || '').toString().toLowerCase()
    if (actionKey.includes('reject') || actionKey === 'reject') return 'error'
    // fall back to color derived from targetStatus
    return this.getStatusColor(a.targetStatus)
  } 

    // helper (put inside the class or module scope)
  prettyActionLabel = actionKey => {
    if (!actionKey) return ''
    // prefer human mapping if you have one
    const raw = (typeof ACTION_LABELS !== 'undefined' && ACTION_LABELS[actionKey]) ? ACTION_LABELS[actionKey] : actionKey

    // 1) split camelCase (e.g. inspectAndSubmit -> inspect And Submit)
    let s = String(raw).replace(/([a-z0-9])([A-Z])/g, '$1 $2')

    // 2) replace non-alphanumeric sequences (dash, underscore, dot, multiple spaces) with single space
    s = s.replace(/[_\-\.\s]+/g, ' ')

    // 3) trim and collapse spaces
    s = s.trim().replace(/\s+/g, ' ')

    // 4) return UPPERCASE for the button text
    return s.toUpperCase()
  }


  renderDialogFields = () => {
    const { actionObj, payload } = this.state
    const { loan, onUpdated, role } = this.props
    if(actionObj && actionObj.allowedRoles.includes('Loan Admin')){
        if(actionObj.action === "add-appendix"){
           return <AppendixForm loan={loan} handleActionClose={this.handleActionClose}/> 
        }
        if(loan.loanStatus === "collateral-inspection" && loan.collateral && loan.collateral.collateralStatus === "requesting-inspection"){
           return <Alert severity='info'>You have already sent an inspection request, to re-request, please use the backend or call the inspector.</Alert> 
        }
    }
    
    
    if (!actionObj || !actionObj.requiresPayload) return null
    return actionObj.requiresPayload.map(k => (
      <TextField
        key={k}
        name={k}
        label={k === 'reason' ? 'Reason' : k}
        value={payload[k] || ''}
        onChange={this.handleChange}
        fullWidth
        multiline
        rows={3}
        sx={{ mt: 2 }}
      />
    ))
  }

   renderSessionLetterTemplateUpload = ()=>{
          const { loan, onUpdated, constants, role } = this.props
          if(!loan || !loan.collateral || !loan.collateral.vehicle){
            return null
          }
          const { collateral } = loan
          const { vehicle } = collateral
          if(collateral && collateral.collateralType === 'vehicle'){
              if(vehicle && vehicle.insuranceType && (vehicle.insuranceType === "third-party" || vehicle.insuranceType === "comprehensive")){
                if(loan.insuranceRequest && loan.insuranceRequest === "African Gray"){
                   return null
                }
                else{
                  return <UploadSessionLetterTemplate loan={loan} onUpdated={onUpdated} role={role} handleActionClose={this.handleActionClose}/> // this means the current loan meets the session letter requirements
                }
              }
          }
          return null
      }

  render() {
    const actions = this.allowedActions()
    const { open, actionObj, loading, error } = this.state
    const { loan, onUpdated, constants, role } = this.props

    if (!actions.length && !loan.loanStatus === "disbursed") { // if disbursed, there is a pop which can be reuploaded at whichever time
        
        return (
            <Box sx={{ mt: 2 }}>
            <Typography variant="body2">No actions available for you right now</Typography>
            </Box>
        )
    }

    if(loan.loanStatus === "rejected"){
            return (
                <Box sx={{ mt: 2 }}>
                    <Alert severity='warning'>{role === "ceo" || role === "director" || role === 'Loan Admin'? "You rejected this loan, to revert and accept it you must ask the client to re-apply for a new one or you can use the backend." : "This loan was rejected."}</Alert>
                </Box>
            )
    }

    if(actionObj && actionObj.action === "reject"){
        return <RejectionForm loan={loan} onUpdated={onUpdated} role={role} handleActionClose={this.handleActionClose} openModal={true}/> 
    }

    if((role === "ceo" || role === "director") && loan.loanStatus === "accepted"){
           return (
                <Box sx={{ mt: 2 }}>
                    <Alert severity='info'>You have successfully accepted this loan, you shall be notified when the client has signed the loan form.</Alert>
                </Box>
            )
    }

    if(role === 'Loan Admin' && loan.loanStatus === "pending-collateral-inspection"){
        if(loan.collateral && loan.collateral.collateralStatus === "inspected"){
           return (<><Alert severity='info'>Collateral Inspected by Inspector</Alert> 
                    {this.renderSessionLetterTemplateUpload()}
                   <RejectionForm loan={loan} onUpdated={onUpdated} role={role} handleActionClose={this.handleActionClose} openModal={false}/>
                   </>)
        }
        return (<>
                 {loan.collateral && loan.collateral.collateralStatus === "requesting-inspection"? 
                 <Alert severity='info'>You have already sent an inspection request.</Alert> : null}
                 <RequestCollateralInspection loan={loan} onUpdated={onUpdated} role={role} handleActionClose={this.handleActionClose}/> 
                 {this.renderSessionLetterTemplateUpload()}
                 <RejectionForm loan={loan} onUpdated={onUpdated} role={role} handleActionClose={this.handleActionClose} openModal={false}/>
                 </>)
    }
    
    if(role !== "Collateral Inspector" &&  loan.loanStatus === "collateral-inspection"){
        if(role === 'Loan Admin' && loan.collateral && loan.collateral.collateralStatus === "inspected"){
            return <>
                    <RequestApproval loan={loan} onUpdated={onUpdated} role={role} handleActionClose={this.handleActionClose}/> 
                    <ContactCard phone={constants.loansInformation.collateralInspectorNumber} email={constants.loansInformation.collateralInspectorEmail} user_title="Inspector" />
                    {this.renderSessionLetterTemplateUpload()}
            </>
        }
        return <ContactCard phone={constants.loansInformation.collateralInspectorNumber} email={constants.loansInformation.collateralInspectorEmail} user_title="Inspector" />
    }

    if(loan.loanStatus === "pending-approval"){
        if(role === 'ceo' || role === 'director'){
            if(!loan.loanAppendixCreated){
               return <Alert severity='info'>Client has signed the loan form, awaiting the loan officer to attach appendix details to the loan form.</Alert>
            }
            if(!loan.invoiceSent){
                return <Alert severity='info'>Loan officer has entered loan form appendix details, now awaiting the loan officer to enter the invoice number from the loan's quick books record.</Alert>
            }
        }
        if(role === 'Loan Admin' && loan.loanAppendixCreated){
            if(loan.invoiceSent){
                return <Alert severity='info'>You have already sent an Invoice number, to resend, you must use the backend.</Alert>
            }
            else{
                return <SendQuickBookInvoiceNumber loan={loan} onUpdated={onUpdated} role={role} handleActionClose={this.handleActionClose}/>
            }
        }
        
    }
    
    if(role !== "Collateral Inspector" &&  (loan.loanStatus === "approved" || loan.loanStatus === "disbursed")){
        return <UploadPOP loan={loan} onUpdated={onUpdated} role={role} handleActionClose={this.handleActionClose}/>
    }

    return (
         <Slide in={true} direction="left">
            <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {actions.map(a => {
                const allowed = this.isAllowed ? this.isAllowed(a, role) : true // adapt to your permission check
                const color = this.getActionColor(a)
                const label = this.prettyActionLabel(a.action) // or prettyActionLabel(ACTION_LABELS[a.action] || a.action)
                return (
                    <Button
                    key={a.action}
                    variant={allowed ? 'contained' : 'outlined'}
                    size="small"
                    color={color}
                    disabled={!allowed}
                    onClick={() => this.open(a)}
                    sx={{
                        textTransform: 'uppercase',
                        opacity: !allowed ? 0.45 : 1,
                        minWidth: 180,
                        justifyContent: 'flex-start'
                    }}
                    >
                    {a.action === "accept"? "APPROVE" : a.action}
                    </Button>
                )
                })}

                <Dialog open={open} onClose={this.close} fullWidth maxWidth="sm">
                <DialogTitle>{actionObj ? `Confirm: ${actionObj.action === "accept"? "approve" : actionObj.action}` : 'Confirm action'}</DialogTitle>
                <DialogContent>
                    {<Typography variant="body2" sx={{ mb: 1 }}>
                     {actionObj && actionObj.targetStatus === "accepted"? "This will send a message to the user, informing them that their loan has been accepted. Are you sure you want to accept this loan with amount K"+loan.loanAmount+"?" : actionObj ? `This will move loan to "${actionObj.targetStatus}"` : ''}
                    </Typography>}

                    {this.renderDialogFields()}

                    {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.close} disabled={loading}>Cancel</Button>
                    <Button onClick={this.perform} disabled={loading} color={actionObj && actionObj.targetStatus === "accepted"? "success" : "primary"} variant="contained">
                    {loading ? <CircularProgress size={18} /> : 'Confirm'}
                    </Button>
                </DialogActions>
                </Dialog>
            </Box>
        </Slide>
    )
  }
}