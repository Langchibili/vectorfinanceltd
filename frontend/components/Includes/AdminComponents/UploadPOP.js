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
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import { ThemeProvider } from '@mui/material/styles'
import { adminTheme, G } from '@/styles/admin-theme'
import { updateLoan } from '@/Functions'
import Uploader from '../Uploader/Uploader'

export default class UploadPOP extends React.Component {
  state = { open: false, loading: false, error: '', disbursementPOP: null }

  open = () => {
    const { loan } = this.props
    let disbursementPOP = loan?.disbursementPOP ?? null
    if (disbursementPOP && disbursementPOP.data) disbursementPOP = disbursementPOP.data
    this.setState({ open: true, error: '', disbursementPOP })
  }

  close = () => { this.setState({ open: false, loading: false, error: '' }) }

  extractUploaded = (payload) => {
    const item = Array.isArray(payload) ? payload[0] : payload
    if (!item) return null
    if (typeof item === 'number') return { id: item, raw: item }
    if (item.id) return { id: item.id, raw: item }
    if (item.data && item.data.id) return { id: item.data.id, raw: item }
    return { id: null, raw: item }
  }

  addPOP = async (uploaded) => {
    const { loan, role, onUpdated } = this.props
    if (!loan) return
    const extracted = this.extractUploaded(uploaded)
    const uploadedId = extracted?.id ?? null
    const uploadedRaw = extracted?.raw ?? null
    const disbursementPOP = uploaded.disbursementPOP
    let existing = false
    if (disbursementPOP && disbursementPOP.data) {
      const data = Array.isArray(disbursementPOP.data) ? disbursementPOP.data[0] : disbursementPOP.data
      existing = !!(data && (data.id || data.url))
    } else if (disbursementPOP && (disbursementPOP.id || disbursementPOP.url)) {
      existing = true
    } else if (loan.disbursementPOP) {
      const pop = loan.disbursementPOP
      if (pop.data) { const data = Array.isArray(pop.data) ? pop.data[0] : pop.data; existing = !!(data && (data.id || data.url)) }
      else { existing = !!(pop.id || pop.url) }
    }
    if (existing) {
      const ok = window.confirm('A POP is already uploaded. Do you want to replace it?')
      if (!ok) return
    }
    this.setState({ loading: true, error: '' })
    try {
      const body = {
        data: {
          lastAction: 'upload-pop',
          lastActionByRole: role,
          lastActionAt: new Date().toISOString(),
          actionPayload: { disbursementPOP: uploadedId ?? uploadedRaw },
          disbursementPOP: uploadedId ?? uploadedRaw
        }
      }
      const updated = await updateLoan(body, loan.id)
      if (onUpdated) onUpdated(updated)
      this.setState({ loading: false, disbursementPOP: uploadedId ?? uploadedRaw, open: false })
    } catch (err) {
      this.setState({ loading: false, error: 'Failed to attach POP. Try again.' })
    }
  }

  render() {
    const { loan, role } = this.props
    const { open, loading, error, disbursementPOP } = this.state
    if (!loan) return null
    if (role === 'Collateral Inspector') return null

    let hasPOP = false
    if (disbursementPOP && disbursementPOP.data) {
      const data = Array.isArray(disbursementPOP.data) ? disbursementPOP.data[0] : disbursementPOP.data
      hasPOP = !!(data && (data.id || data.url))
    } else if (disbursementPOP && (disbursementPOP.id || disbursementPOP.url)) {
      hasPOP = true
    } else if (loan.disbursementPOP) {
      const pop = loan.disbursementPOP
      if (pop.data) { const data = Array.isArray(pop.data) ? pop.data[0] : pop.data; hasPOP = !!(data && (data.id || data.url)) }
      else { hasPOP = !!(pop.id || pop.url) }
    }

    const buttonLabel = hasPOP ? 'Replace Disbursement POP' : 'Upload Disbursement POP'

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

        <Dialog open={open} onClose={this.close} fullWidth maxWidth="sm">
          <DialogTitle>{hasPOP ? 'Reupload Proof of Payment (POP)' : 'Upload Proof of Payment (POP)'}</DialogTitle>
          <DialogContent>
            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="body2">
                Upload the disbursement POP. The user will be notified that their loan has been disbursed and their loan dashboard will appear.
              </Typography>
            </Alert>

            {hasPOP && (
              <Alert severity="warning" sx={{ mb: 2 }}>
                {loan.disbursementPOP ? 'A POP is already uploaded for this loan.' : 'A POP exists in draft.'}
                {' '}Uploading a new file will replace the existing POP.
              </Alert>
            )}

            <Box
              sx={{
                mb: 2, p: '16px', background: G.dim, border: `1px solid ${G.border}`,
                borderRadius: '12px',
              }}
            >
              <Uploader
                addFiles={this.addPOP}
                refId={loan.id}
                refName="api::loan.loan"
                fieldName="disbursementPOP"
                allowMultiple={false}
                allowedTypes={[
                  'image/*', 'application/pdf', 'application/msword',
                  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                  'text/plain', 'application/vnd.ms-excel',
                  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                ]}
              />
            </Box>

            {error && <Alert severity="error" sx={{ mt: 1 }}>{error}</Alert>}

            {loading && (
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                <CircularProgress size={18} sx={{ color: G.green2 }} />
                <Typography variant="body2" sx={{ color: G.muted }}>Uploading POP…</Typography>
              </Stack>
            )}
          </DialogContent>

          <DialogActions>
            <Button onClick={this.close} disabled={loading} sx={{ color: G.muted, textTransform: 'none' }}>Cancel</Button>
            <Button
              onClick={() => {
                if (!hasPOP) { alert('Please choose a file to upload using the uploader above'); return }
                const confirmReplace = hasPOP && window.confirm('Keep the existing POP? Click OK to close, or Cancel to upload a new one.')
                if (confirmReplace) { this.close() }
                else { alert('Use the uploader component to select and upload a replacement file') }
              }}
              variant="contained"
              disabled={loading}
              sx={{
                background: `linear-gradient(135deg, ${G.green1}, ${G.green2})`,
                color: '#fff', fontWeight: 700, borderRadius: '10px', textTransform: 'none',
              }}
            >
              {loading ? <CircularProgress size={18} sx={{ color: '#fff' }} /> : 'Done'}
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    )
  }
}