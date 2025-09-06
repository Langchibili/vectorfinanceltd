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

export default class UploadSessionLetterTemplate extends React.Component {
  state = {
    open: false,
    loading: false,
    error: '',
    sessionLetterTemplate: null // initialised from loan in open()
  }

  open = () => {
    const { loan } = this.props
    // prefill from loan
    let sessionLetterTemplate = loan?.collateral?.vehicle?.sessionLetterTemplate ?? null
    // If sessionLetterTemplate is an object with .data, use .data
    if (sessionLetterTemplate && sessionLetterTemplate.data) {
        sessionLetterTemplate = sessionLetterTemplate.data
    }
    this.setState({
        open: true,
        error: '',
        sessionLetterTemplate
    })
}


  close = () => {
    this.setState({ open: false, loading: false, error: '' })
  }

  extractUploaded = (payload) => {
    const item = Array.isArray(payload) ? payload[0] : payload
    if (!item) return null
    if (typeof item === 'number') return { id: item, raw: item }
    if (item.id) return { id: item.id, raw: item }
    if (item.data && item.data.id) return { id: item.data.id, raw: item }
    return { id: null, raw: item }
  }

  addSessionLetterTemplate = async (uploaded) => {
    const { loan, role, onUpdated } = this.props
    if (!loan || !loan.collateral?.vehicle) return

    const extracted = this.extractUploaded(uploaded)
    const uploadedId = extracted?.id ?? null
    const uploadedRaw = extracted?.raw ?? null
    const sessionLetterTemplate = loan.collateral.vehicle.sessionLetterTemplate
    // Check existence for both .data and direct object
    let existing = false;
    if (sessionLetterTemplate && sessionLetterTemplate.data) {
    // If it's an array, check the first item
    const data = Array.isArray(sessionLetterTemplate.data)
        ? sessionLetterTemplate.data[0]
        : sessionLetterTemplate.data;
    existing = !!(data && (data.id || data.url));
    } else if (sessionLetterTemplate && (sessionLetterTemplate.id || sessionLetterTemplate.url)) {
    existing = true;
    } else if (loan.collateral.vehicle.sessionLetterTemplate) {
    const t = loan.collateral.vehicle.sessionLetterTemplate;
    if (t.data) {
        const data = Array.isArray(t.data) ? t.data[0] : t.data;
        existing = !!(data && (data.id || data.url));
    } else {
        existing = !!(t.id || t.url);
    }
    }

    if (existing) {
      const ok = window.confirm('A session letter template is already uploaded for this vehicle. Do you want to replace the existing file?')
      if (!ok) return
    }

    this.setState({ loading: true, error: '' })
    try {
      // Update the vehicle with the sessionLetterTemplate info
      const body = {
        data: {
          lastAction: 'upload-session-letter-template',
          lastActionByRole: role,
          lastActionAt: new Date().toISOString(),
          actionPayload: {
            sessionLetterTemplate: uploadedId ?? uploadedRaw
          },
          sessionLetterTemplate: uploadedId ?? uploadedRaw
        }
      }

      // Use vehicle id for update
      const updated = await updateLoan(body, loan.collateral.vehicle.id)

      if (onUpdated && typeof onUpdated === 'function') {
        onUpdated(updated)
      }

      this.setState({ loading: false, sessionLetterTemplate: uploadedId ?? uploadedRaw, open: false })
    } catch (err) {
      console.error('UploadSessionLetterTemplate addSessionLetterTemplate error', err)
      this.setState({ loading: false, error: 'Failed to attach session letter template. Try again.' })
    }
  }

  render() {
    const { loan, role } = this.props
    const { open, loading, error, sessionLetterTemplate } = this.state

    if (!loan || !loan.collateral?.vehicle) return null
    if (role === "Collateral Inspector") return null

    // Check existence for both .data and direct object
    let hasSessionLetterTemplate = false;
    if (sessionLetterTemplate && sessionLetterTemplate.data) {
    // If it's an array, check the first item
    const data = Array.isArray(sessionLetterTemplate.data)
        ? sessionLetterTemplate.data[0]
        : sessionLetterTemplate.data;
    hasSessionLetterTemplate = !!(data && (data.id || data.url));
    } else if (sessionLetterTemplate && (sessionLetterTemplate.id || sessionLetterTemplate.url)) {
    hasSessionLetterTemplate = true;
    } else if (loan.collateral.vehicle.sessionLetterTemplate) {
    const t = loan.collateral.vehicle.sessionLetterTemplate;
    if (t.data) {
        const data = Array.isArray(t.data) ? t.data[0] : t.data;
        hasSessionLetterTemplate = !!(data && (data.id || data.url));
    } else {
        hasSessionLetterTemplate = !!(t.id || t.url);
    }
    }
    const buttonLabel = hasSessionLetterTemplate ? 'Replace Session Letter Template' : 'Upload Session Letter Template'

    return (
      <>
        <Button color="warning" variant="contained" size="small" onClick={this.open}>
          {buttonLabel}
        </Button>

        <Dialog open={open} onClose={this.close} fullWidth maxWidth="sm">
          <DialogTitle>{hasSessionLetterTemplate ? "Reupload Session Letter Template" : "Upload Session Letter Template"}</DialogTitle>

          <DialogContent>
            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Upload the session letter template. This will be attached to the vehicle collateral and the user will be notified accordingly.
              </Typography>
            </Alert>
            {hasSessionLetterTemplate && (
              <Alert severity="warning" sx={{ mb: 2 }}>
                {loan.collateral.vehicle.sessionLetterTemplate ? 'A session letter template is already uploaded for this vehicle.' : 'A session letter template exists in draft.'}
                {' '}Uploading a new file will replace the existing session letter template.
              </Alert>
            )}

            <Box sx={{ mb: 2 }}>
              <Uploader
                addFiles={this.addSessionLetterTemplate}
                refId={loan.collateral.vehicle.id}
                refName="media-and-documents.vehicle"
                fieldName="sessionLetterTemplate"
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
                <Typography variant="body2">Uploading session letter template…</Typography>
              </Stack>
            )}
          </DialogContent>

          <DialogActions>
            <Button onClick={this.close} disabled={loading}>Cancel</Button>
            <Button
              onClick={() => {
                if (!hasSessionLetterTemplate) {
                  alert('Please choose a file to upload using the uploader above')
                  return
                }
                const confirmReplace = hasSessionLetterTemplate && window.confirm('Keep the existing session letter template? Click OK to close, or Cancel to upload a new one.')
                if (confirmReplace) {
                  this.close()
                } else {
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