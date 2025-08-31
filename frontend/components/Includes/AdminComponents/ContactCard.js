'use client'
import React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Tooltip from '@mui/material/Tooltip'
import PhoneIcon from '@mui/icons-material/Phone'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import EmailIcon from '@mui/icons-material/Email'
import { returnNineDigitNumber } from '@/Functions'

export default function ContactCardToggle({ phone = '', email = '', user_title = 'Client' }) {
  const [openCard, setOpenCard] = React.useState(false)
  const [snackOpen, setSnackOpen] = React.useState(false)
  const [snackMessage, setSnackMessage] = React.useState('')
  const [snackSeverity, setSnackSeverity] = React.useState('success')

  const normalizeForWhatsapp = raw => {
    if (!raw) return ''
    return String(raw).replace(/\D/g, '')
  }

  const handleCopy = async (type = 'phone') => {
    try {
      const text = type === 'email' ? email : "+260"+returnNineDigitNumber(phone)
      if (!text) throw new Error('No value provided')
      await navigator.clipboard.writeText(text)
      setSnackMessage(type === 'email' ? 'Email copied' : 'Number copied')
      setSnackSeverity('success')
      setSnackOpen(true)
    } catch (err) {
      setSnackMessage('Failed to copy')
      setSnackSeverity('error')
      setSnackOpen(true)
    }
  }

  const handleWhatsapp = () => {
    if (!phone) {
      setSnackMessage('No phone number to message')
      setSnackSeverity('error')
      setSnackOpen(true)
      return
    }
   
    const number = "+260"+returnNineDigitNumber(normalizeForWhatsapp(phone))
    const url = `https://wa.me/${number}`
    window.open(url, '_blank')
  }

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') return
    setSnackOpen(false)
  }

  const callHref = phone ? `tel:${"+260"+returnNineDigitNumber(phone)}` : undefined
  const mailHref = email ? `mailto:${email}` : undefined

  return (
    <>
      {/* Toggle button when card is hidden */}
      {!openCard && (
        <Button
          startIcon={<PhoneIcon />}
          variant="contained"
          onClick={() => setOpenCard(true)}
          sx={{ textTransform: 'none' }}
          color='secondary'
        >
          Contact {user_title}
        </Button>
      )}

      {/* Card shown when openCard is true */}
      {openCard && (
        <Card sx={{ maxWidth: 420, width: '100%', borderRadius: 2, boxShadow: 3 }}>
          <CardContent>
            <Stack spacing={1}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Contact
                </Typography>
                <Typography variant="h6">{user_title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {phone ? `Phone: ${phone}` : 'Phone not provided'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {email ? `Email: ${email}` : 'Email not provided'}
                </Typography>
              </Box>

              {/* Buttons stacked vertically */}
              <Stack direction="column" spacing={1} sx={{ mt: 1 }}>
                <Tooltip title={phone ? `Call ${user_title}` : 'No phone number'}>
                  <span>
                    <Button
                      variant="contained"
                      startIcon={<PhoneIcon />}
                      component="a"
                      href={callHref}
                      disabled={!phone}
                      fullWidth
                      sx={{ textTransform: 'none' }}
                    >
                      Call {user_title}
                    </Button>
                  </span>
                </Tooltip>

                <Tooltip title={phone ? `Message ${user_title} on WhatsApp` : 'No phone number'}>
                  <span>
                    <Button
                      variant="contained"
                      startIcon={<WhatsAppIcon />}
                      onClick={handleWhatsapp}
                      disabled={!phone}
                      color="success"
                      fullWidth
                      sx={{ textTransform: 'none' }}
                    >
                      Message {user_title} on WhatsApp
                    </Button>
                  </span>
                </Tooltip>

                <Tooltip title={phone ? `Copy ${user_title} number` : 'No phone number'}>
                  <span>
                    <Button
                      variant="outlined"
                      startIcon={<ContentCopyIcon />}
                      onClick={() => handleCopy('phone')}
                      disabled={!phone}
                      fullWidth
                      sx={{ textTransform: 'none' }}
                    >
                      Copy {user_title}'s Number
                    </Button>
                  </span>
                </Tooltip>

                <Tooltip title={email ? `Email ${user_title}` : 'No email'}>
                  <span>
                    <Button
                      variant="contained"
                      startIcon={<EmailIcon />}
                      component="a"
                      href={mailHref}
                      disabled={!email}
                      fullWidth
                      sx={{ textTransform: 'none' }}
                      color='info'
                    >
                      Email {user_title}
                    </Button>
                  </span>
                </Tooltip>

                <Tooltip title={email ? `Copy ${user_title} email` : 'No email'}>
                  <span>
                    <Button
                      variant="outlined"
                      startIcon={<ContentCopyIcon />}
                      onClick={() => handleCopy('email')}
                      disabled={!email}
                      fullWidth
                      sx={{ textTransform: 'none' }}
                    >
                      Copy {user_title}'s Email
                    </Button>
                  </span>
                </Tooltip>
              </Stack>

              {/* Hide button at bottom */}
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="text"
                  onClick={() => setOpenCard(false)}
                  fullWidth
                  sx={{ textTransform: 'none' }}
                  color="warning"
                >
                  Hide Contact Card
                </Button>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      )}

      <Snackbar open={snackOpen} autoHideDuration={3000} onClose={handleCloseSnack}>
        <Alert onClose={handleCloseSnack} severity={snackSeverity} sx={{ width: '100%' }}>
          {snackMessage}
        </Alert>
      </Snackbar>
    </>
  )
}
