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
import { ThemeProvider } from '@mui/material/styles'
import { adminTheme, G, FONTS } from '@/styles/admin-theme'
import { updateLoan } from '@/Functions'

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
    return 'K' + (Number(amt) || 0).toLocaleString()
  }

  const handleAccept = async () => {
    if (!window.confirm(`Mark client as having accepted the offer of ${fmt(offeredAmount)}?`)) return
    try {
      setLoadingAccept(true); setError('')
      const updateData = { data: { loanAmount: offeredAmount, newLoanAmountOfferAccepted: true } }
      const updated = await updateLoan(updateData, loan.id)
      if (onAccepted) onAccepted(updated)
      setSnack({ open: true, message: 'Client acceptance recorded', severity: 'success' })
    } catch (err) {
      setError('Failed to record acceptance. Try again.')
      setSnack({ open: true, message: 'Failed to record acceptance', severity: 'error' })
    } finally { setLoadingAccept(false) }
  }

  const openDecline = () => { setReason(''); setClientAmount(''); setError(''); setDeclineOpen(true) }
  const closeDecline = () => { if (loadingDecline) return; setDeclineOpen(false); setError('') }

  const validateDeclinePayload = () => {
    const hasReason = reason && String(reason).trim().length > 0
    const amt = clientAmount === '' ? null : Number(clientAmount)
    const hasAmount = amt !== null && !isNaN(amt) && amt > 0
    if (!hasReason && !hasAmount) return 'Provide a client reason or the amount the client wants'
    if (hasAmount && (isNaN(amt) || amt <= 0)) return 'Client amount must be a positive number'
    return null
  }

  const submitDecline = async (forced = false) => {
    if (!forced) {
      const vErr = validateDeclinePayload()
      if (vErr) { setError(vErr); return }
    }
    try {
      setLoadingDecline(true); setError('')
      const updateData = {
        data: {
          newLoanAmountOfferDeclined: true,
          newLoanAmountOfferDeclineReason: forced
            ? 'The client declined the offer.'
            : (() => {
              const trimmedReason = reason && reason.trim().length > 0 ? reason.trim() : ''
              if (clientAmount && !isNaN(Number(clientAmount)) && Number(clientAmount) > 0) {
                const amountText = `Client is asking for K${Number(clientAmount)}`
                return trimmedReason ? `${trimmedReason} | ${amountText}` : amountText
              }
              return trimmedReason || null
            })(),
          clientRequestedAmount: forced ? null : (clientAmount ? Number(clientAmount) : null)
        }
      }
      const updated = await updateLoan(updateData, loan.id)
      if (onDeclined) onDeclined(updated)
      setSnack({ open: true, message: forced ? 'Declined without reason submitted' : 'Decline submitted', severity: 'success' })
      setDeclineOpen(false)
    } catch (err) {
      setError('Failed to submit decline. Try again.')
      setSnack({ open: true, message: 'Failed to submit decline', severity: 'error' })
    } finally { setLoadingDecline(false) }
  }

  const handleCloseSnack = (_, reasonEvent) => {
    if (reasonEvent === 'clickaway') return
    setSnack(prev => ({ ...prev, open: false }))
  }

  return (
    <ThemeProvider theme={adminTheme}>
      {/* Offer card */}
      <Box
        sx={{
          p: '18px 20px',
          background: 'linear-gradient(135deg, rgba(201,168,76,0.10), rgba(201,168,76,0.03))',
          border: '1px solid rgba(201,168,76,0.28)',
          borderRadius: '16px',
          backdropFilter: 'blur(16px)',
        }}
      >
        {/* Label */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: G.gold }} />
          <Typography sx={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: G.gold }}>
            Amount Offered
          </Typography>
        </Box>

        <Typography sx={{ fontFamily: FONTS.mono, fontSize: '26px', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', mb: 0.5 }}>
          {fmt(offeredAmount)}
        </Typography>
        <Typography variant="body2" sx={{ color: G.muted, mb: 2 }}>
          An offer was made to the client on this loan
        </Typography>

        <Stack direction="row" spacing={1.5}>
          <Button
            variant="contained"
            onClick={handleAccept}
            disabled={loadingAccept}
            sx={{
              background: `linear-gradient(135deg, ${G.green1}, ${G.green2})`,
              color: '#fff', fontWeight: 700, borderRadius: '10px', textTransform: 'none', flex: 1,
              boxShadow: '0 4px 14px rgba(16,185,129,0.25)',
            }}
            startIcon={loadingAccept ? <CircularProgress size={16} sx={{ color: '#fff' }} /> : null}
          >
            Client Accepted
          </Button>

          <Button
            variant="outlined"
            onClick={openDecline}
            disabled={loadingAccept || loadingDecline}
            sx={{
              color: G.red, borderColor: 'rgba(248,113,113,0.35)', borderRadius: '10px',
              textTransform: 'none', flex: 1,
              '&:hover': { background: 'rgba(248,113,113,0.08)', borderColor: 'rgba(248,113,113,0.55)' },
            }}
          >
            Client Declined
          </Button>
        </Stack>

        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </Box>

      {/* Decline dialog */}
      <Dialog open={declineOpen} onClose={closeDecline} fullWidth maxWidth="sm">
        <DialogTitle>Client Declined Offer</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2, color: G.muted }}>
            Provide the client's reason for declining. You may optionally record an amount the client requests instead.
          </Typography>

          <TextField
            label="Client reason (optional if you provide amount)"
            value={reason}
            onChange={e => setReason(e.target.value)}
            fullWidth multiline rows={3} sx={{ mb: 2 }}
            placeholder="e.g. They asked for a lower amount..."
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
              fullWidth
              onClick={() => submitDecline(false)}
              disabled={loadingDecline}
              startIcon={loadingDecline ? <CircularProgress size={16} sx={{ color: '#fff' }} /> : null}
              sx={{
                background: 'linear-gradient(135deg, #b91c1c, #dc2626)', color: '#fff',
                fontWeight: 700, borderRadius: '10px', textTransform: 'none',
                boxShadow: '0 4px 14px rgba(220,38,38,0.28)',
              }}
            >
              Submit Decline
            </Button>

            <Button
              variant="outlined"
              fullWidth
              onClick={() => {
                if (!window.confirm('Reject without a reason?')) return
                submitDecline(true)
              }}
              disabled={loadingDecline}
              sx={{
                color: G.red, borderColor: 'rgba(248,113,113,0.35)', borderRadius: '10px',
                textTransform: 'none',
                '&:hover': { background: 'rgba(248,113,113,0.08)' },
              }}
            >
              Submit Without Reason
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>

      <Snackbar open={snack.open} autoHideDuration={3000} onClose={handleCloseSnack} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleCloseSnack} severity={snack.severity} sx={{ width: '100%' }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  )
}