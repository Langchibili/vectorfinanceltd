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
import { ThemeProvider } from '@mui/material/styles'
import { adminTheme, G } from '@/styles/admin-theme'
import { updateLoan } from '@/Functions'

export default class SendQuickBookInvoiceNumber extends React.Component {
  state = { open: false, invoiceNumber: '', loading: false, error: '' }
  open = () => this.setState({ open: true, error: '' })
  close = () => this.setState({ open: false, invoiceNumber: '', loading: false, error: '' })
  handleChange = e => { this.setState({ invoiceNumber: e.target.value, error: '' }) }

  confirmSend = async () => {
    const { loan, role, onUpdated } = this.props
    if (!loan) return
    if (role !== 'Loan Admin') { this.setState({ error: 'You are not authorized' }); return }
    const status = String(loan.loanStatus || loan.status || '').toLowerCase()
    if (status !== 'pending-approval') { this.setState({ error: 'Invoice can only be sent when loan status is "Pending Approval"' }); return }
    const { invoiceNumber } = this.state
    if (!invoiceNumber || String(invoiceNumber).trim() === '') { this.setState({ error: 'Please enter an invoice number' }); return }
    const proceed = window.confirm('Send QuickBooks invoice and notify CEO & Director to disburse?')
    if (!proceed) return
    this.setState({ loading: true, error: '' })
    try {
      const updateData = { data: { loanStatus: 'pending-approval', quickBooksInvoiceNumber: String(invoiceNumber).trim() } }
      const updated = await updateLoan(updateData, loan.id)
      if (onUpdated) onUpdated(updated)
      this.setState({ loading: false, open: false, invoiceNumber: '' })
    } catch (err) {
      this.setState({ loading: false, error: 'Failed to send invoice. Try again.' })
    }
  }

  render() {
    const { loan, role } = this.props
    const { open, invoiceNumber, loading, error } = this.state
    if (!loan) return null
    const status = String(loan.loanStatus || loan.status || '').toLowerCase()
    if (role !== 'Loan Admin') return null
    if (status !== 'pending-approval') return null
    const existingInvoice = loan.actionPayload?.quickbookInvoiceNumber || loan.quickbookInvoiceNumber || null
    const buttonLabel = existingInvoice ? 'Send QuickBooks Invoice Again' : 'Send QuickBooks Invoice'

    return (
      <ThemeProvider theme={adminTheme}>
        <Button
          variant="contained"
          size="small"
          onClick={this.open}
          sx={{
            background: `linear-gradient(135deg, ${G.green1}, ${G.green2})`,
            color: '#fff', fontWeight: 700, borderRadius: '10px', textTransform: 'none',
            boxShadow: '0 4px 14px rgba(16,185,129,0.25)',
          }}
        >
          {buttonLabel}
        </Button>

        <Dialog open={open} onClose={this.close} fullWidth maxWidth="xs">
          <DialogTitle>Send QuickBooks Invoice</DialogTitle>
          <DialogContent>
            <Typography variant="body2" sx={{ mb: 2, color: G.muted }}>
              This will send the QuickBooks invoice number to the system and notify the CEO and Director to proceed with disbursement.
            </Typography>
            <Stack spacing={1.5}>
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
            <Button onClick={this.close} disabled={loading} sx={{ color: G.muted, textTransform: 'none' }}>Cancel</Button>
            <Button
              onClick={this.confirmSend}
              variant="contained"
              disabled={loading || !invoiceNumber || String(invoiceNumber).trim() === ''}
              sx={{
                background: `linear-gradient(135deg, ${G.green1}, ${G.green2})`,
                color: '#fff', fontWeight: 700, borderRadius: '10px', textTransform: 'none',
                boxShadow: '0 4px 14px rgba(16,185,129,0.25)',
                '&:disabled': { opacity: 0.45 },
              }}
            >
              {loading ? <CircularProgress size={18} sx={{ color: '#fff' }} /> : 'Send'}
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    )
  }
}