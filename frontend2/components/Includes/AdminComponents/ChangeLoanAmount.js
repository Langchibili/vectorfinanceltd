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
import { ThemeProvider } from '@mui/material/styles'
import { adminTheme, G, FONTS } from '@/styles/admin-theme'
import { updateLoan } from '@/Functions'
import { frontendUpdateKey } from '@/Secrets'

export default class ChangeLoanAmount extends React.Component {
  state = {
    open: false,
    amount: '',
    explanation: '',
    loading: false,
    error: ''
  }

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false, amount: '', explanation: '', error: '' })

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submit = async () => {
    const { amount, explanation } = this.state
    const { loan, onUpdated, role } = this.props

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      this.setState({ error: 'Please enter a valid amount' })
      return
    }
    if (amount === loan.loanAmount) {
      this.setState({ loading: false, error: 'This is the current loan amount' })
    }

    this.setState({ loading: true, error: '' })

    try {
      const updateData = {
        data: {
          loanStatus: 'request-approval',
          loanAmount: Number(amount),
          loanAmountChangedReason: explanation || null,
          frontendUpdateKey: frontendUpdateKey
        }
      }
      const updated = await updateLoan(updateData, loan.id)
      if (onUpdated && typeof onUpdated === 'function') {
        onUpdated(updated)
      }
      this.setState({ loading: false, open: false, amount: '', explanation: '' })
    } catch (err) {
      console.error('ChangeLoanAmount submit error', err)
      this.setState({ loading: false, error: 'Failed to change loan amount' })
    }
  }

  render() {
    const { loan, role } = this.props
    const { open, amount, explanation, loading, error } = this.state

    if (!loan) return null
    if (role !== 'director' && role !== 'ceo' && role !== 'Loan Admin') return null
    if (
      String(loan.loanStatus).toLowerCase() !== 'request-approval' &&
      String(loan.loanStatus).toLowerCase() !== 'pending-collateral-inspection'
    ) return null

    return (
      <ThemeProvider theme={adminTheme}>
        <Button
          variant="outlined"
          size="small"
          onClick={this.open}
          sx={{
            color: G.blue,
            borderColor: 'rgba(96,165,250,0.35)',
            borderRadius: '10px',
            fontWeight: 600,
            textTransform: 'none',
            '&:hover': { background: 'rgba(96,165,250,0.08)', borderColor: 'rgba(96,165,250,0.55)' },
          }}
        >
          Change Loan Amount
        </Button>

        <Dialog open={open} onClose={this.close} fullWidth maxWidth="sm">
          <DialogTitle>Change Loan Amount</DialogTitle>
          <DialogContent>
            <Typography variant="body2" sx={{ mb: 2, color: G.muted }}>
              Enter the new loan amount. Optionally provide an explanation.
            </Typography>

            <TextField
              label="Loan amount"
              name="amount"
              value={amount}
              onChange={this.handleChange}
              fullWidth
              sx={{ mt: 1 }}
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            />

            <TextField
              label="Explanation (optional)"
              name="explanation"
              value={explanation}
              onChange={this.handleChange}
              fullWidth
              multiline
              rows={3}
              sx={{ mt: 2 }}
            />

            {error && (
              <Typography
                sx={{
                  mt: 2, p: '10px 14px', borderRadius: '10px',
                  background: 'rgba(248,113,113,0.10)', border: '1px solid rgba(248,113,113,0.28)',
                  color: G.red, fontSize: '13px'
                }}
              >
                {error}
              </Typography>
            )}
          </DialogContent>

          <DialogActions>
            <Button onClick={this.close} disabled={loading} variant="outlined" sx={{ color: G.muted, borderColor: G.border, borderRadius: '10px', textTransform: 'none', '&:hover': { background: 'rgba(255,255,255,0.05)' } }}>
              Cancel
            </Button>
            <Button
              onClick={this.submit}
              disabled={loading}
              variant="contained"
              sx={{
                background: `linear-gradient(135deg, ${G.green1}, ${G.green2})`,
                color: '#fff', fontWeight: 700, borderRadius: '10px', textTransform: 'none',
                boxShadow: '0 4px 14px rgba(16,185,129,0.25)',
              }}
            >
              {loading ? <CircularProgress size={18} sx={{ color: '#fff' }} /> : 'Change'}
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    )
  }
}