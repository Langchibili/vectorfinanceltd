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
import Box from '@mui/material/Box'
import { ThemeProvider } from '@mui/material/styles'
import { adminTheme, G } from '@/styles/admin-theme'
import { updateLoan } from '@/Functions'

export default class RejectionForm extends React.Component {
  state = {
    open: this.props.openModal,
    reasonKey: '',
    reasonText: '',
    loading: false,
    error: ''
  }

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
    if (this.props.handleActionClose && typeof this.props.handleActionClose === 'function') {
      this.props.handleActionClose()
    }
    this.setState({ open: false, reasonKey: '', reasonText: '', loading: false, error: '' })
  }

  handleReasonChange = e => { this.setState({ reasonKey: e.target.value, error: '' }) }
  handleTextChange = e => { this.setState({ reasonText: e.target.value, error: '' }) }

  submitWithReason = async () => {
    const { reasonKey, reasonText } = this.state
    const { loan, onUpdated } = this.props
    if (!reasonKey && (!reasonText || String(reasonText).trim() === '')) {
      this.setState({ error: 'Please select a reason or provide one in the text box' }); return
    }
    if (reasonKey === 'other' && (!reasonText || String(reasonText).trim() === '')) {
      this.setState({ error: 'Please provide the reason in the text box' }); return
    }
    let humanReason = ''
    if (reasonKey === 'other') { humanReason = String(reasonText || '').trim() }
    else if (reasonKey) { const found = this.reasons.find(r => r.value === reasonKey); humanReason = found ? found.label : String(reasonKey) }
    else { humanReason = String(reasonText || '').trim() }
    this.setState({ loading: true, error: '' })
    try {
      const updateData = { data: { loanStatus: 'rejected', loanRejectionReason: humanReason } }
      const updated = await updateLoan(updateData, loan.id)
      if (onUpdated) onUpdated(updated)
      this.setState({ loading: false, open: false, reasonKey: '', reasonText: '' })
    } catch (err) {
      this.setState({ loading: false, error: 'Failed to reject loan. Try again.' })
    }
  }

  submitWithoutReason = async () => {
    const { loan, onUpdated } = this.props
    const confirm = window.confirm('Are you sure you want to reject this loan without providing a reason?')
    if (!confirm) return
    this.setState({ loading: true, error: '' })
    try {
      const updateData = { data: { loanStatus: 'rejected' } }
      const updated = await updateLoan(updateData, loan.id)
      if (onUpdated) onUpdated(updated)
      this.setState({ loading: false, open: false, reasonKey: '', reasonText: '' })
    } catch (err) {
      this.setState({ loading: false, error: 'Failed to reject loan. Try again.' })
    }
  }

  render() {
    const { open, reasonKey, reasonText, loading, error } = this.state
    const { loan } = this.props
    if (!loan) return null

    return (
      <ThemeProvider theme={adminTheme}>
        <Button
          variant="outlined"
          size="small"
          color="error"
          onClick={this.open}
          sx={{
            color: G.red, borderColor: 'rgba(248,113,113,0.35)', borderRadius: '10px',
            fontWeight: 600, textTransform: 'none',
            '&:hover': { background: 'rgba(248,113,113,0.08)', borderColor: 'rgba(248,113,113,0.55)' },
          }}
        >
          Reject loan
        </Button>

        <Dialog open={open} onClose={() => this.close()} fullWidth maxWidth="sm">
          <DialogTitle>Reject Loan</DialogTitle>
          <DialogContent>
            <Typography variant="body2" sx={{ mb: 2, color: G.muted }}>
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
                  onClick={this.submitWithReason}
                  disabled={loading}
                  fullWidth
                  sx={{
                    background: 'linear-gradient(135deg, #b91c1c, #dc2626)', color: '#fff',
                    fontWeight: 700, borderRadius: '10px', textTransform: 'none',
                    boxShadow: '0 4px 14px rgba(220,38,38,0.28)',
                  }}
                >
                  {loading ? <CircularProgress size={18} sx={{ color: '#fff' }} /> : 'Reject'}
                </Button>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Button
                  variant="outlined"
                  onClick={this.submitWithoutReason}
                  disabled={loading}
                  fullWidth
                  sx={{
                    color: G.red, borderColor: 'rgba(248,113,113,0.35)', borderRadius: '10px',
                    textTransform: 'none',
                    '&:hover': { background: 'rgba(248,113,113,0.08)' },
                  }}
                >
                  {loading ? <CircularProgress size={18} /> : 'Reject Without Reason'}
                </Button>
              </Box>
            </Stack>
          </DialogActions>
          <Button onClick={this.close} disabled={loading} sx={{ color: G.muted, textTransform: 'none', mx: 'auto', mb: 1 }}>
            Cancel
          </Button>
        </Dialog>
      </ThemeProvider>
    )
  }
}