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
import { updateLoan } from '@/Functions'

export default class OfferAmountForm extends React.Component {
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
      this.setState({ error: 'Please enter a valid offered amount' })
      return
    }

    this.setState({ loading: true, error: '' })

    try {
      // We leave status as pending-approval but record offered amount in actionPayload
      const body = {
        data: {
          // keep status unchanged, directors/ceo can optionally leave as pending-approval
          lastAction: 'offer-new-amount',
          lastActionByRole: role,
          lastActionAt: new Date().toISOString(),
          actionPayload: {
            offeredAmount: Number(amount),
            offeredExplanation: explanation || ''
          }
        }
      }

      const updated = await updateLoan(body, loan.id)

      if (onUpdated && typeof onUpdated === 'function') {
        onUpdated(updated)
      }

      this.setState({ loading: false, open: false, amount: '', explanation: '' })
    } catch (err) {
      console.error('OfferAmountForm submit error', err)
      this.setState({ loading: false, error: 'Failed to submit offer' })
    }
  }

  render() {
    const { loan, role } = this.props
    const { open, amount, explanation, loading, error } = this.state

    if (!loan) return null
    const roleLower = String(role || '').toLowerCase()
    if (roleLower !== 'director' && roleLower !== 'ceo') return null
    if (String(loan.loanStatus).toLowerCase() !== 'pending-approval') return null

    return (
      <>
        <Button variant="outlined" size="small" onClick={this.open}>
          Offer New Amount To Client
        </Button>

        <Dialog open={open} onClose={this.close} fullWidth maxWidth="sm">
          <DialogTitle>Offer New Amount</DialogTitle>
          <DialogContent>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Enter the new loan amount you'd like to offer to the client. Optionally provide an explanation.
            </Typography>

            <TextField
              label="Offered amount"
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

            {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
          </DialogContent>

          <DialogActions>
            <Button onClick={this.close} disabled={loading}>Cancel</Button>
            <Button onClick={this.submit} disabled={loading} variant="contained">
              {loading ? <CircularProgress size={18} /> : 'Send Offer'}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}