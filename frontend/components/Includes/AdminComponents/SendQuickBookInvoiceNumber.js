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
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import { updateLoan } from '@/Functions'

export default class SendQuickBookInvoiceNumber extends React.Component {
  state = {
    open: false,
    invoiceNumber: '',
    loading: false,
    error: ''
  }

  open = () => this.setState({ open: true, error: '' })
  close = () => this.setState({ open: false, invoiceNumber: '', loading: false, error: '' })

  handleChange = e => {
    this.setState({ invoiceNumber: e.target.value, error: '' })
  }

  confirmSend = async () => {
    const { loan, role, onUpdated } = this.props
    if (!loan) return

    // guard: only Loan Admin allowed to send the quickbook invoice (adjust if you want other roles)
 
    if (role !== 'Loan Admin') {
      this.setState({ error: 'You are not authorized to send QuickBooks invoices' })
      return
    }

    // guard: only allow when loan is in approved state (logical place to request disbursement)
    const status = String(loan.loanStatus || loan.status || '').toLowerCase()
    if (status !== 'pending-approval') {
      this.setState({ error: 'Invoice can only be sent when loan status is "Pending Approval"' })
      return
    }

    const { invoiceNumber } = this.state
    if (!invoiceNumber || String(invoiceNumber).trim() === '') {
      this.setState({ error: 'Please enter an invoice number before sending' })
      return
    }

    const proceed = window.confirm('Send QuickBooks invoice and notify CEO & Director to disburse?')
    if (!proceed) return

    this.setState({ loading: true, error: '' })
    try {
      // update body: keep status as-is, record invoice number in actionPayload and set lastAction metadata
      const updateData = {
              data:{
                  loanStatus:'pending-approval',
                  quickBooksInvoiceNumber: String(invoiceNumber).trim()
              }
            }
      const updated = await updateLoan(updateData, loan.id)

      if (onUpdated && typeof onUpdated === 'function') {
        onUpdated(updated)
      }
      this.setState({ loading: false, open: false, invoiceNumber: '' })
    } catch (err) {
      console.error('SendQuickBookInvoiceNumber error', err)
      this.setState({ loading: false, error: 'Failed to send invoice. Try again.' })
    }
  }

  render() {
    const { loan, role } = this.props
    const { open, invoiceNumber, loading, error } = this.state

    if (!loan) return null

    // show only for Loan Admin and when loan is in approved status
    const status = String(loan.loanStatus || loan.status || '').toLowerCase()
    console.log('status',status)
    if (role !== 'Loan Admin') return null
    console.log('here 2')
    if (status !== 'pending-approval') return null
    
    const existingInvoice = loan.actionPayload?.quickbookInvoiceNumber || loan.quickbookInvoiceNumber || null
    const buttonLabel = existingInvoice ? 'Send QuickBooks Invoice Again' : 'Send QuickBooks Invoice'
console.log('here 4')
    return (
      <>
        <Button variant="contained" size="small" onClick={this.open}>
          {buttonLabel}
        </Button>

        <Dialog open={open} onClose={this.close} fullWidth maxWidth="xs">
          <DialogTitle>Send QuickBooks Invoice</DialogTitle>

          <DialogContent>
            <Typography variant="body2" sx={{ mb: 2 }}>
              This will send the QuickBooks invoice number to the system and notify the CEO and Director to proceed with disbursement.
            </Typography>

            <Stack spacing={1}>
              <TextField
                label="Invoice number"
                value={invoiceNumber}
                onChange={this.handleChange}
                fullWidth
                size="small"
                placeholder={existingInvoice ? `Existing: ${existingInvoice}` : 'Enter invoice number'}
              />

              {error && <Alert severity="error">{error}</Alert>}
            </Stack>
          </DialogContent>

          <DialogActions>
            <Button onClick={this.close} disabled={loading}>Cancel</Button>
            <Button
              onClick={this.confirmSend}
              variant="contained"
              color="primary"
              disabled={loading || !invoiceNumber || String(invoiceNumber).trim() === ''}
            >
              {loading ? <CircularProgress size={18} /> : 'Send'}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}