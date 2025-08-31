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
    if(amount === loan.loanAmount){
        this.setState({ loading: false, error: 'This is the current loan amount' })
    }

    this.setState({ loading: true, error: '' })

    try {
      // We leave status as request-approval but record offered amount
    
      const updateData = {
              data:{
                loanStatus:'request-approval',
                loanAmount: Number(amount),
                loanAmountChangedReason: explanation || null,
                frontendUpdateKey:frontendUpdateKey 
              }
            }
      const updated = await updateLoan(updateData, loan.id)
      if (onUpdated && typeof onUpdated === 'function') {
          onUpdated(updated)
      }

      this.setState({ loading: false, open: false, amount: '', explanation: '' })
    } catch (err) {
      console.error('OfferAmountForm submit error', err)
      this.setState({ loading: false, error: 'Failed to change loan amount' })
    }
  }

  render() {
    const { loan, role } = this.props
    const { open, amount, explanation, loading, error } = this.state

    if (!loan) return null
    if (role !== 'director' && role !== 'ceo' && role !== "Loan Admin") return null
    if (String(loan.loanStatus).toLowerCase() !== 'request-approval' && String(loan.loanStatus).toLowerCase() !== 'pending-collateral-inspection') return null

    return (
      <>
        <Button color='primary' variant="outlined" size="small" onClick={this.open}>
          Change Loan Amount
        </Button>

        <Dialog open={open} onClose={this.close} fullWidth maxWidth="sm">
          <DialogTitle>New Amount</DialogTitle>
          <DialogContent>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Enter the new loan amount you'd like to change the loan amount to. Optionally provide an explanation.
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

            {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
          </DialogContent>

          <DialogActions>
            <Button onClick={this.close} disabled={loading}>Cancel</Button>
            <Button onClick={this.submit} disabled={loading} variant="contained">
              {loading ? <CircularProgress size={18} /> : 'Change'}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}