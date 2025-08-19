// import React from 'react'
// import Button from '@mui/material/Button'
// import Stack from '@mui/material/Stack'
// import { getPermissions } from '@/lib/permissions'
// import { updateLoanStatus } from '@/Functions' // assuming you have this in Functions.js

// export default function LoanActions({ role, loan, onStatusChange }) {
//   const perms = getPermissions(role)
//   const { status } = loan

//   // define allowed transitions per status
//   const TRANSITIONS = {
//     initiated: ['pending-collateral-addition', 'request-approval', 'rejected'],
//     'pending-collateral-addition': ['pending-collateral-inspection', 'request-approval', 'rejected'],
//     'pending-collateral-inspection': ['collateral-inspection', 'rejected'],
//     'collateral-inspection': ['request-approval', 'rejected'],
//     'request-approval': ['accepted', 'rejected'],
//     accepted: ['pending-approval', 'rejected'],
//     'pending-approval': ['approved', 'rejected'],
//     approved: ['disbursed', 'rejected'],
//     disbursed: ['completed', 'defaulted'],
//     completed: [],
//     defaulted: []
//   }

//   // filter transitions by permissions
//   function getAllowedTransitions() {
//     return TRANSITIONS[status] || []
//   }

//   async function handleChangeState(newStatus) {
//     const updated = await updateLoanStatus(loan.id, newStatus)
//     if (updated && onStatusChange) onStatusChange(updated)
//   }

//   const actions = getAllowedTransitions().filter(s => {
//     if (s === 'disbursed' && !perms.canDisburse) return false
//     if (s === 'approved' && !perms.canApprove) return false
//     if (s === 'rejected' && !perms.canReject) return false
//     if (s === 'completed' && !perms.canMarkComplete) return false
//     if (s === 'defaulted' && !perms.canMarkDefault) return false
//     if (s === 'request-approval' && !perms.canRequestApproval) return false
//     return true
//   })

//   if (!actions.length) return null

//   return (
//     <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
//       {actions.map(a => (
//         <Button
//           key={a}
//           variant="contained"
//           color="primary"
//           onClick={() => handleChangeState(a)}
//         >
//           {a}
//         </Button>
//       ))}
//     </Stack>
//   )
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
import { TRANSITIONS } from '@/lib/transitions'
import { getPermissions } from '@/lib/permissions'
import { updateLoan } from '@/Functions'
import { Slide } from '@material-ui/core'

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
    console.log("actions",actions)
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
      const body = {
        data: {
          status: actionObj.targetStatus,
          lastAction: actionObj.action,
          lastActionByRole: role,
          lastActionAt: new Date().toISOString(),
          actionPayload: payload
        }
      }

      const updated = await updateLoan(body, loan.id)
      if (onUpdated) onUpdated(updated)
      this.setState({ loading: false, open: false, actionObj: null, payload: {} })
    } catch (err) {
      console.error('updateLoan error', err)
      this.setState({ loading: false, error: 'Failed to perform action' })
    }
  }

  renderDialogFields = () => {
    const { actionObj, payload } = this.state
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

  render() {
    const actions = this.allowedActions()
    const { open, actionObj, loading, error } = this.state

    if (!actions.length) {
      return (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2">No actions available for your role</Typography>
        </Box>
      )
    }

    return (
         <Slide in={true} direction="left">
            <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {actions.map(a => (
                <Button key={a.action} variant="contained" size="small" onClick={() => this.open(a)}>
                    {a.action}
                </Button>
                ))}

                <Dialog open={open} onClose={this.close} fullWidth maxWidth="sm">
                <DialogTitle>{actionObj ? `Confirm: ${actionObj.action}` : 'Confirm action'}</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                    {actionObj ? `This will move loan to "${actionObj.targetStatus}"` : ''}
                    </Typography>

                    {this.renderDialogFields()}

                    {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.close} disabled={loading}>Cancel</Button>
                    <Button onClick={this.perform} disabled={loading} variant="contained">
                    {loading ? <CircularProgress size={18} /> : 'Confirm'}
                    </Button>
                </DialogActions>
                </Dialog>
            </Box>
        </Slide>
    )
  }
}