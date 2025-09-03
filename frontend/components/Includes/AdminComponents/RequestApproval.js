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
import { updateLoan } from '@/Functions'

export default class RequestApproval extends React.Component {
  state = {
    open: false,
    loading: false,
    error: ''
  }

  open = () => this.setState({ open: true, error: '' })
  close = () => this.setState({ open: false, error: '' })

  confirm = async () => {
    const { loan, role, onUpdated } = this.props
    if (!loan) return
    // guard again: only Loan Admin should do this and only from the right status
    const roleLower = String(role || '').toLowerCase()
    if (roleLower !== 'loan admin') {
      this.setState({ error: 'You are not authorized to request inspection' })
      return
    }
    if (String(loan.loanStatus || '').toLowerCase() !== 'collateral-inspection') {
      this.setState({ error: 'Loan is not in a state that allows requesting approval' })
      return
    }

    this.setState({ loading: true, error: '' })
    try {
      const updateData = {
              data:{
                  loanStatus:'request-approval'
              }
            }
      const updated = await updateLoan(updateData, loan.id)
      if (onUpdated && typeof onUpdated === 'function') {
        onUpdated(updated)
      }
      this.setState({ loading: false, open: false })
    } catch (err) {
      console.error('RequestCollateralInspection confirm error', err)
      this.setState({ loading: false, error: 'Failed to request inspection. Try again.' })
    }
  }

  render() {
    const { loan, role } = this.props
    const { open, loading, error } = this.state

    if (!loan) return null

    // show only for Loan Admin and when loan is in pending-collateral-inspection
    const roleLower = String(role || '').toLowerCase()
    if (roleLower !== 'loan admin') return null
    if (String(loan.loanStatus || '').toLowerCase() !== 'collateral-inspection') return null

    return (
      <>
        <Button variant="contained" color='warning' size="small" onClick={this.open}>
           {loan.loanStatus === "request-approval"? "Request Approval Again" : "Request Approval"}
        </Button>

        <Dialog open={open} onClose={this.close} fullWidth maxWidth="xs">
          <DialogTitle>Request Approval</DialogTitle>

          <DialogContent>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Are you sure you want to request approval for this loan?
              This will notify the director and ceo
            </Typography>

            {error && <Alert severity="error" sx={{ mt: 1 }}>{error}</Alert>}
          </DialogContent>

          <DialogActions>
            <Button onClick={this.close} disabled={loading}>Cancel</Button>
            <Button
              onClick={this.confirm}
              variant="contained"
              color="warning"
              disabled={loading}
            >
              {loading ? <CircularProgress size={18} /> : 'Confirm'}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}