'use client'
import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import Alert from '@mui/material/Alert'
import { updateLoan } from '@/Functions'
import { Box } from '@mui/system'

export default class RejectionForm extends React.Component {
  state = {
    open: this.props.openModal,
    reasonKey: '',
    reasonText: '',
    loading: false,
    error: ''
  }

  // Practical common reasons for loan rejection
  reasons = [
    { value: 'insufficient_collateral', label: 'Insufficient collateral' },
    { value: 'poor_credit_history', label: 'Poor credit history' },
    { value: 'incomplete_documentation', label: 'Incomplete documentation' },
    { value: 'identity_unverifiable', label: 'Identity unverifiable' },
    { value: 'high_debt_to_income', label: 'High debt-to-income ratio' },
    { value: 'suspicious_activity', label: 'Suspicious / fraudulent activity' },
    { value: 'policy_limits', label: 'Outside policy limits' },
    { value: 'other', label: 'Other (specify below)' }
  ]

  open = () => this.setState({ open: true, error: '' })
  close = () => {
    if(this.props.handleActionClose && typeof this.props.handleActionClose === 'function'){
       this.props.handleActionClose()
    }
    this.setState({ open: false, reasonKey: '', reasonText: '', loading: false, error: '' })
   }

  handleReasonChange = e => {
    this.setState({ reasonKey: e.target.value, error: '' })
  }

  handleTextChange = e => {
    this.setState({ reasonText: e.target.value, error: '' })
  }

  // main reject that enforces a reason (unless reasonText provided)
  
  // main reject that enforces a reason (unless reasonText provided)
submitWithReason = async () => {
  const { reasonKey, reasonText } = this.state
  const { loan, role, onUpdated } = this.props

  // require either a chosen reason (not empty) or some text
  if (!reasonKey && (!reasonText || String(reasonText).trim() === '')) {
    this.setState({ error: 'Please select a reason or provide a reason in the text box' })
    return
  }

  // if reasonKey is 'other' we also require reasonText
  if (reasonKey === 'other' && (!reasonText || String(reasonText).trim() === '')) {
    this.setState({ error: 'Please provide the reason in the text box' })
    return
  }

  // derive the single human reason string: if other -> reasonText, else -> selected label
  let humanReason = ''
  if (reasonKey === 'other') {
    humanReason = String(reasonText || '').trim()
  } else if (reasonKey) {
    const found = this.reasons.find(r => r.value === reasonKey)
    humanReason = found ? found.label : String(reasonKey)
  } else {
    humanReason = String(reasonText || '').trim()
  }

  this.setState({ loading: true, error: '' })
  try {
    const updateData = {
              data:{
                  loanStatus:'rejected',
                  loanRejectionReason:humanReason
              }
    }
    const updated = await updateLoan(updateData, loan.id)
    if (onUpdated && typeof onUpdated === 'function') {
      onUpdated(updated)
    }
    this.setState({ loading: false, open: false, reasonKey: '', reasonText: '' })
  } catch (err) {
    console.error('RejectionForm submit error', err)
    this.setState({ loading: false, error: 'Failed to reject loan. Try again.' })
  }
}

// Reject without reason: always allowed, will send reason: null
submitWithoutReason = async () => {
  const { loan, role, onUpdated } = this.props
  const confirm = window.confirm('Are you sure you want to reject this loan without providing a reason?')
  if (!confirm) return

  this.setState({ loading: true, error: '' })
  try {
    const updateData = {
            data:{
                loanStatus:'rejected'
            }
    }
    const updated = await updateLoan(updateData, loan.id)

    if(onUpdated && typeof onUpdated === 'function') {
      onUpdated(updated)
    }
    this.setState({ loading: false, open: false, reasonKey: '', reasonText: '' })
  } catch (err) {
    console.error('RejectionForm submitWithoutReason error', err)
    this.setState({ loading: false, error: 'Failed to reject loan. Try again.' })
  }
}


  render() {
    const { open, reasonKey, reasonText, loading, error } = this.state
    const { loan } = this.props
    if (!loan) return null

    return (
      <>
        <Button variant="outlined" size="small" color="error" onClick={this.open}>
          Reject loan
        </Button>

        <Dialog open={open} onClose={() => this.close()} fullWidth maxWidth="sm">
          <DialogTitle>Reject Loan</DialogTitle>

          <DialogContent>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Select a reason for rejecting this loan. You may also enter a custom reason below.
            </Typography>

            <FormControl fullWidth size="small" sx={{ mb: 2 }}>
              <InputLabel id="reject-reason-label">Rejection reason</InputLabel>
              <Select
                labelId="reject-reason-label"
                value={reasonKey}
                label="Rejection reason"
                onChange={this.handleReasonChange}
              >
                <MenuItem value=""><em>Choose a reason</em></MenuItem>
                {this.reasons.map(r => (
                  <MenuItem key={r.value} value={r.value}>{r.label}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Other reason (optional)"
              value={reasonText}
              onChange={this.handleTextChange}
              fullWidth
              multiline
              rows={4}
              placeholder="If the reason is not in the list, type it here"
              sx={{ mb: 1 }}
            />

            {error && <Alert severity="error" sx={{ mt: 1 }}>{error}</Alert>}
          </DialogContent>

          <DialogActions>
            <Stack direction="row" spacing={1} sx={{ width: '100%', px: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={this.submitWithReason}
                  disabled={loading}
                  fullWidth
                >
                  {loading ? <CircularProgress size={18} /> : 'Reject'}
                </Button>
              </Box>

              <Box sx={{ flex: 1 }}>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={this.submitWithoutReason}
                  disabled={loading}
                  fullWidth
                >
                  {loading ? <CircularProgress size={18} /> : 'Reject Without Reason'}
                </Button>
              </Box>
            </Stack>
          </DialogActions>
          <Button onClick={this.close} disabled={loading}>Cancel</Button>
        </Dialog>
      </>
    )
  }
}
