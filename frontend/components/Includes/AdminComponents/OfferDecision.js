'use client'
import React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { updateLoan } from '@/Functions'

/**
 * OfferDecision component
 *
 * Props:
 * - loan: the loan object (optional, used for id/context)
 * - offeredAmount: number | string - the amount offered to the client (displayed)
 * - onAccepted: optional callback after accept flow (receives { loan, offeredAmount })
 * - onDeclined: optional callback after decline flow (receives { loan, reason, clientRequestedAmount })
 *
 * NOTE: actual submission calls (API / updateLoan) are intentionally left as comments
 * per your request — replace the comment stubs with your real logic.
 */
export default function OfferDecision({
  loan = null,
  offeredAmount = 0,
  onAccepted = null,
  onDeclined = null
}) {
  const [declineOpen, setDeclineOpen] = React.useState(false)
  const [loadingAccept, setLoadingAccept] = React.useState(false)
  const [loadingDecline, setLoadingDecline] = React.useState(false)
  const [reason, setReason] = React.useState('')
  const [clientAmount, setClientAmount] = React.useState('')
  const [error, setError] = React.useState('')
  const [snack, setSnack] = React.useState({ open: false, message: '', severity: 'success' })

  const fmt = amt => {
    if (amt === null || amt === undefined || amt === '') return 'K0'
    const n = Number(amt) || 0
    return 'K' + n.toLocaleString()
  }

  const handleAccept = async () => {
    // quick guard/confirm
    if (!window.confirm(`Mark client as having accepted the offer of ${fmt(offeredAmount)} ?`)) return
    try {
      setLoadingAccept(true)
      setError('')

      const updateData = {
                data:{
                    loanAmount:offeredAmount,
                    newLoanAmountOfferAccepted: true
                }
      }
      const updated = await updateLoan(updateData, loan.id)
      if (onAccepted && typeof onAccepted === 'function') {
        onAccepted(updated)
      }
      setSnack({ open: true, message: 'Client acceptance recorded', severity: 'success' })
    } catch (err) {
      console.error('handleAccept error', err)
      setError('Failed to record acceptance. Try again.')
      setSnack({ open: true, message: 'Failed to record acceptance', severity: 'error' })
    } finally {
      setLoadingAccept(false)
    }
  }

  const openDecline = () => {
    setReason('')
    setClientAmount('')
    setError('')
    setDeclineOpen(true)
  }

  const closeDecline = () => {
    if (loadingDecline) return
    setDeclineOpen(false)
    setError('')
  }

  const validateDeclinePayload = () => {
    // require either reason text OR clientAmount (positive number)
    const hasReason = reason && String(reason).trim().length > 0
    const amt = clientAmount === '' ? null : Number(clientAmount)
    const hasAmount = amt !== null && !isNaN(amt) && amt > 0
    if (!hasReason && !hasAmount) {
      return 'Provide a client reason or the amount the client wants (or use "Submit without reason")'
    }
    if (hasAmount && (isNaN(amt) || amt <= 0)) {
      return 'Client amount must be a positive number'
    }
    return null
  }

  const submitDecline = async (forced = false) => {
    // forced=false => require reason or amount, forced=true => submit anyway with no reason
    if (!forced) {
      const vErr = validateDeclinePayload()
      if (vErr) {
        setError(vErr)
        return
      }
    }

    try {
      setLoadingDecline(true)
      setError('')
     const updateData = {
                data:{
                    newLoanAmountOfferDeclined: true,
                    newLoanAmountOfferDeclineReason: forced
                        ? "The client declined the offer."
                        : (() => {
                            const trimmedReason = reason && reason.trim().length > 0 ? reason.trim() : '';
                            if (clientAmount && !isNaN(Number(clientAmount)) && Number(clientAmount) > 0) {
                            const amountText = `Client is asking for K${Number(clientAmount)}`;
                            return trimmedReason
                                ? `${trimmedReason} | ${amountText}`
                                : amountText;
                            }
                            return trimmedReason || null;
                        })(),
                    clientRequestedAmount: forced ? null : (clientAmount ? Number(clientAmount) : null)
                }
      }
      const updated = await updateLoan(updateData, loan.id)
      if (onDeclined && typeof onDeclined === 'function') {
        onDeclined(updated)
      }

      setSnack({ open: true, message: forced ? 'Declined without reason submitted' : 'Decline submitted', severity: 'success' })
      setDeclineOpen(false)
    } catch (err) {
      console.error('submitDecline error', err)
      setError('Failed to submit decline. Try again.')
      setSnack({ open: true, message: 'Failed to submit decline', severity: 'error' })
    } finally {
      setLoadingDecline(false)
    }
  }

  const handleCloseSnack = (_, reasonEvent) => {
    if (reasonEvent === 'clickaway') return
    setSnack(prev => ({ ...prev, open: false }))
  }

  return (
    <>
      <Card sx={{ maxWidth: 680, width: '100%', mx: 'auto', borderRadius: 2, boxShadow: 2 }}>
        <CardContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            An offer of amount <strong>{fmt(offeredAmount)}</strong> was offered to the client on this loan
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="success"
              onClick={handleAccept}
              disabled={loadingAccept}
              startIcon={loadingAccept ? <CircularProgress size={16} /> : null}
              sx={{ textTransform: 'none' }}
            >
              Client Accepted
            </Button>

            <Button
              variant="outlined"
              color="inherit"
              onClick={openDecline}
              disabled={loadingAccept || loadingDecline}
              sx={{ textTransform: 'none' }}
            >
              Client Declined
            </Button>
          </Stack>

          {error && (
            <Box sx={{ mt: 2 }}>
              <Alert severity="error">{error}</Alert>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Decline dialog */}
      <Dialog open={declineOpen} onClose={closeDecline} fullWidth maxWidth="sm">
        <DialogTitle>Client Declined Offer</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Provide the client's reason for declining. You may optionally record an amount the client requests instead.
          </Typography>

          <TextField
            label="Client reason (optional if you provide amount)"
            value={reason}
            onChange={e => setReason(e.target.value)}
            fullWidth
            multiline
            rows={3}
            sx={{ mb: 2 }}
            placeholder="e.g. They asked for a lower amount due to ..."
          />

          <TextField
            label="Client requested amount (optional)"
            value={clientAmount}
            onChange={e => setClientAmount(e.target.value)}
            fullWidth
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            sx={{ mb: 1 }}
            placeholder="Enter numeric value (e.g. 50000)"
          />

          {error && <Alert severity="error" sx={{ mt: 1 }}>{error}</Alert>}
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Stack direction="row" spacing={1} sx={{ width: '100%' }}>
            <Button
              variant="contained"
              color="error"
              fullWidth
              onClick={() => submitDecline(false)}
              disabled={loadingDecline}
              startIcon={loadingDecline ? <CircularProgress size={16} /> : null}
              sx={{ textTransform: 'none' }}
            >
              Submit Decline
            </Button>

            <Button
              variant="outlined"
              color="error"
              fullWidth
              onClick={() => {
                if (!window.confirm('Reject without a reason? This will record no reason.')) return
                submitDecline(true)
              }}
              disabled={loadingDecline}
              sx={{ textTransform: 'none' }}
            >
              Submit Without Reason
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={handleCloseSnack}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnack} severity={snack.severity} sx={{ width: '100%' }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </>
  )
}