'use client'
import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Tooltip from '@mui/material/Tooltip'
import { ThemeProvider } from '@mui/material/styles'
import PhoneIcon from '@mui/icons-material/Phone'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import EmailIcon from '@mui/icons-material/Email'
import { returnNineDigitNumber } from '@/Functions'
import { adminTheme, G, FONTS } from '@/styles/admin-theme'

export default function ContactCardToggle({ phone = '', email = '', user_title = 'Client' }) {
  const [openCard, setOpenCard] = React.useState(false)
  const [snackOpen, setSnackOpen] = React.useState(false)
  const [snackMessage, setSnackMessage] = React.useState('')
  const [snackSeverity, setSnackSeverity] = React.useState('success')

  const normalizeForWhatsapp = raw => raw ? String(raw).replace(/\D/g, '') : ''

  const handleCopy = async (type = 'phone') => {
    try {
      const text = type === 'email' ? email : "+260" + returnNineDigitNumber(phone)
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
    const number = "+260" + returnNineDigitNumber(normalizeForWhatsapp(phone))
    window.open(`https://wa.me/${number}`, '_blank')
  }

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') return
    setSnackOpen(false)
  }

  const callHref = phone ? `tel:${"+260" + returnNineDigitNumber(phone)}` : undefined
  const mailHref = email ? `mailto:${email}` : undefined

  return (
    <ThemeProvider theme={adminTheme}>
      {!openCard && (
        <Button
          startIcon={<PhoneIcon />}
          variant="outlined"
          onClick={() => setOpenCard(true)}
          sx={{
            color: G.green2,
            borderColor: G.greenBorder,
            fontFamily: FONTS.body,
            fontWeight: 600,
            fontSize: '13px',
            borderRadius: '10px',
            textTransform: 'none',
            '&:hover': { background: G.greenGlow, borderColor: 'rgba(16,185,129,0.45)' },
          }}
        >
          Contact {user_title}
        </Button>
      )}

      {openCard && (
        <Box sx={{
          maxWidth: 440,
          width: '100%',
          background: 'rgba(16,185,129,0.05)',
          border: `1px solid rgba(16,185,129,0.18)`,
          borderRadius: '16px',
          p: 2.5,
          backdropFilter: 'blur(12px)',
        }}>
          <Stack spacing={1.5}>
            {/* Header */}
            <Box>
              <Box sx={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: G.muted, mb: 0.5 }}>Contact</Box>
              <Box sx={{ fontFamily: FONTS.display, fontSize: '18px', color: '#fff', fontWeight: 400, mb: 0.25 }}>{user_title}</Box>
              {phone && <Box sx={{ fontSize: '12.5px', color: G.muted, fontFamily: FONTS.mono }}>{phone}</Box>}
              {email && <Box sx={{ fontSize: '12.5px', color: G.muted, fontFamily: FONTS.body, mt: 0.25 }}>{email}</Box>}
            </Box>

            <Box sx={{ height: 1, background: G.border }} />

            {/* Action buttons */}
            <Stack direction="column" spacing={1}>
              <Tooltip title={phone ? `Call ${user_title}` : 'No phone number'}>
                <span style={{ display: 'block' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<PhoneIcon />}
                    component="a"
                    href={callHref}
                    disabled={!phone}
                    fullWidth
                    sx={{ textTransform: 'none', fontSize: '13px' }}
                  >
                    Call {user_title}
                  </Button>
                </span>
              </Tooltip>

              <Tooltip title={phone ? `Message on WhatsApp` : 'No phone number'}>
                <span style={{ display: 'block' }}>
                  <Button
                    variant="contained"
                    startIcon={<WhatsAppIcon />}
                    onClick={handleWhatsapp}
                    disabled={!phone}
                    fullWidth
                    sx={{
                      textTransform: 'none', fontSize: '13px',
                      background: 'linear-gradient(135deg, #16a34a, #22c55e)',
                      '&:hover': { background: 'linear-gradient(135deg, #15803d, #16a34a)' },
                    }}
                  >
                    Message on WhatsApp
                  </Button>
                </span>
              </Tooltip>

              <Tooltip title={phone ? `Copy number` : 'No phone number'}>
                <span style={{ display: 'block' }}>
                  <Button
                    variant="outlined"
                    startIcon={<ContentCopyIcon />}
                    onClick={() => handleCopy('phone')}
                    disabled={!phone}
                    fullWidth
                    sx={{ textTransform: 'none', fontSize: '13px' }}
                  >
                    Copy Phone Number
                  </Button>
                </span>
              </Tooltip>

              <Tooltip title={email ? `Email ${user_title}` : 'No email'}>
                <span style={{ display: 'block' }}>
                  <Button
                    variant="contained"
                    color="info"
                    startIcon={<EmailIcon />}
                    component="a"
                    href={mailHref}
                    disabled={!email}
                    fullWidth
                    sx={{ textTransform: 'none', fontSize: '13px' }}
                  >
                    Email {user_title}
                  </Button>
                </span>
              </Tooltip>

              <Tooltip title={email ? `Copy email` : 'No email'}>
                <span style={{ display: 'block' }}>
                  <Button
                    variant="outlined"
                    startIcon={<ContentCopyIcon />}
                    onClick={() => handleCopy('email')}
                    disabled={!email}
                    fullWidth
                    sx={{ textTransform: 'none', fontSize: '13px' }}
                  >
                    Copy Email
                  </Button>
                </span>
              </Tooltip>
            </Stack>

            <Button
              variant="text"
              onClick={() => setOpenCard(false)}
              fullWidth
              sx={{
                textTransform: 'none', fontSize: '12.5px',
                color: G.muted, mt: 0.5,
                '&:hover': { color: 'rgba(255,255,255,0.55)', background: 'transparent' },
              }}
            >
              Hide Contact Card
            </Button>
          </Stack>
        </Box>
      )}

      <Snackbar open={snackOpen} autoHideDuration={3000} onClose={handleCloseSnack}>
        <Alert onClose={handleCloseSnack} severity={snackSeverity} sx={{ width: '100%' }}>
          {snackMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  )
}