// ─── RequestApproval.js ────────────────────────────────────────
'use client'
import React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import { ThemeProvider } from '@mui/material/styles'
import { adminTheme, G } from '@/styles/admin-theme'
import { updateLoan } from '@/Functions'

export class RequestApproval extends React.Component {
  state = { open: false, loading: false, error: '' }
  open = () => this.setState({ open: true, error: '' })
  close = () => this.setState({ open: false, error: '' })

  confirm = async () => {
    const { loan, role, onUpdated } = this.props
    if (!loan) return
    const roleLower = String(role || '').toLowerCase()
    if (roleLower !== 'loan admin') { this.setState({ error: 'You are not authorized' }); return }
    if (String(loan.loanStatus || '').toLowerCase() !== 'collateral-inspection') { this.setState({ error: 'Loan is not in a state that allows requesting approval' }); return }
    this.setState({ loading: true, error: '' })
    try {
      const updateData = { data: { loanStatus: 'request-approval' } }
      const updated = await updateLoan(updateData, loan.id)
      if (onUpdated) onUpdated(updated)
      this.setState({ loading: false, open: false })
    } catch (err) {
      this.setState({ loading: false, error: 'Failed to request approval. Try again.' })
    }
  }

  render() {
    const { loan, role } = this.props
    const { open, loading, error } = this.state
    if (!loan) return null
    if (String(role || '').toLowerCase() !== 'loan admin') return null
    if (String(loan.loanStatus || '').toLowerCase() !== 'collateral-inspection') return null

    return (
      <ThemeProvider theme={adminTheme}>
        <Button
          variant="contained"
          color="warning"
          size="small"
          onClick={this.open}
          sx={{ fontWeight: 700, borderRadius: '10px', textTransform: 'none' }}
        >
          {loan.loanStatus === 'request-approval' ? 'Request Approval Again' : 'Request Approval'}
        </Button>

        <Dialog open={open} onClose={this.close} fullWidth maxWidth="xs">
          <DialogTitle>Request Approval</DialogTitle>
          <DialogContent>
            <Typography variant="body2" sx={{ mb: 2, color: G.muted }}>
              Are you sure you want to request approval for this loan? This will notify the director and CEO.
            </Typography>
            {error && <Alert severity="error" sx={{ mt: 1 }}>{error}</Alert>}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.close} disabled={loading} sx={{ color: G.muted, textTransform: 'none' }}>Cancel</Button>
            <Button
              onClick={this.confirm}
              variant="contained"
              color="warning"
              disabled={loading}
              sx={{ fontWeight: 700, borderRadius: '10px', textTransform: 'none' }}
            >
              {loading ? <CircularProgress size={18} sx={{ color: '#fff' }} /> : 'Confirm'}
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    )
  }
}

export default RequestApproval