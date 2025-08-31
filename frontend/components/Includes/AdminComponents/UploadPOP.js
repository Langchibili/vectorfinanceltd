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
import { updateLoan } from '@/Functions'
import Uploader from '../Uploader/Uploader'

// NOTE: Uploader is an existing component in your app. We only render it here and expect
// it to call addFiles (this.addPOP) with the uploaded file info (object or array).
// Adjust how addPOP extracts the uploaded id if your Uploader returns a different shape.

export default class UploadPOP extends React.Component {
  state = {
    open: false,
    loading: false,
    error: '',
    disbursementPOP: null // initialised from loan in open()
  }

  open = () => {
    const { loan } = this.props
    // prefill from loan
    this.setState({
      open: true,
      error: '',
      disbursementPOP: loan?.disbursementPOP ?? null
    })
  }

  close = () => {
    this.setState({ open: false, loading: false, error: '' })
  }

  // helper to extract an id/object from uploader payload
  extractUploaded = (payload) => {
    // payload might be an array of files or a single file object
    const item = Array.isArray(payload) ? payload[0] : payload
    if (!item) return null
    // common shapes: { id, attributes }, { data: { id } }, a raw id number, or the full upload response
    if (typeof item === 'number') return { id: item, raw: item }
    if (item.id) return { id: item.id, raw: item }
    if (item.data && item.data.id) return { id: item.data.id, raw: item }
    // fallback: return entire object
    return { id: null, raw: item }
  }

  // this will be passed to the Uploader component's addFiles prop
  addPOP = async (uploaded) => {
    // uploaded may be an array or an object depending on your Uploader
    const { loan, role, onUpdated } = this.props
    if (!loan) return

    const extracted = this.extractUploaded(uploaded)
    // if uploader couldn't provide an id, keep the raw and still attempt to update
    const uploadedId = extracted?.id ?? null
    const uploadedRaw = extracted?.raw ?? null

    // if there is already a POP uploaded, ask for confirmation to replace
    const existing = loan.disbursementPOP
    if (existing) {
      const ok = window.confirm('A POP is already uploaded for this loan. Do you want to replace the existing POP?')
      if (!ok) return
    }

    // perform update
    this.setState({ loading: true, error: '' })
    try {
      // update the loan with the pop info. adjust body if your backend expects a different shape.
      // we include both a direct field (disbursementPOP) and actionPayload for audit
      const body = {
        data: {
          // do not change loanStatus here; this action only attaches the POP
          lastAction: 'upload-pop',
          lastActionByRole: role,
          lastActionAt: new Date().toISOString(),
          actionPayload: {
            disbursementPOP: uploadedId ?? uploadedRaw
          },
          // write the disbursementPOP field too (backend mapping may expect an id or object)
          disbursementPOP: uploadedId ?? uploadedRaw
        }
      }

      const updated = await updateLoan(body, loan.id)

      // call parent refresh / updater
      if (onUpdated && typeof onUpdated === 'function') {
        onUpdated(updated)
      }

      // reflect updated value in our state and close
      this.setState({ loading: false, disbursementPOP: uploadedId ?? uploadedRaw, open: false })
    } catch (err) {
      console.error('UploadPOP addPOP error', err)
      this.setState({ loading: false, error: 'Failed to attach POP. Try again.' })
    }
  }

  render() {
    const { loan, role } = this.props
    const { open, loading, error, disbursementPOP } = this.state

    if (!loan) return null

    if (role === "Collateral Inspector") return null

    const hasPOP = !!(disbursementPOP || loan.disbursementPOP)

    // label adapts if pop exists
    const buttonLabel = hasPOP ? 'Replace Disbursement POP' : 'Upload Disbursement POP'

    return (
      <>
        <Button variant="contained" size="small" onClick={this.open}>
          {buttonLabel}
        </Button>

        <Dialog open={open} onClose={this.close} fullWidth maxWidth="sm">
          <DialogTitle>{hasPOP? "Reupload Proof of Payment (POP)": "Upload Proof of Payment (POP)"}</DialogTitle>

          <DialogContent>
            <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Upload the disbursement POP. This will be attached to the loan and the user will be notified that their loan has been disbursed, and their loan dashboard shall appear.
            </Typography>
           </Alert>
            {hasPOP && (
              <Alert severity="warning" sx={{ mb: 2 }}>
                {loan.disbursementPOP ? 'A POP is already uploaded for this loan.' : 'A POP exists in draft.'}
                {' '}Uploading a new file will replace the existing POP.
              </Alert>
            )}

            <Box sx={{ mb: 2 }}>
              {/* render the Uploader exactly as you specified */}
              <Uploader
                addFiles={this.addPOP}
                refId={loan.id}
                refName="api::loan.loan"
                fieldName="disbursementPOP"
                allowMultiple={false}
                allowedTypes={[
                  'image/*',
                  'application/pdf',
                  'application/msword',
                  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                  'text/plain',
                  'application/vnd.ms-excel',
                  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                ]}
              />
            </Box>

            {error && <Alert severity="error" sx={{ mt: 1 }}>{error}</Alert>}

            {loading && (
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                <CircularProgress size={18} />
                <Typography variant="body2">Uploading POP…</Typography>
              </Stack>
            )}
          </DialogContent>

          <DialogActions>
            <Button onClick={this.close} disabled={loading}>Cancel</Button>
            <Button
              onClick={() => {
                // if user wants to replace but hasn't used uploader, prompt them to upload via the Uploader
                if (!hasPOP) {
                  alert('Please choose a file to upload using the uploader above')
                  return
                }
                // if there is a POP already but user hasn't uploaded new one, simply close (nothing to do)
                const confirmReplace = hasPOP && window.confirm('Keep the existing POP? Click OK to close, or Cancel to upload a new one.')
                if (confirmReplace) {
                  this.close()
                } else {
                  // user wants to replace: instruct to use uploader input
                  alert('Use the uploader component to select and upload a replacement file')
                }
              }}
              variant="contained"
              disabled={loading}
            >
              {loading ? <CircularProgress size={18} /> : 'Done'}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}