import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  Button,
  Alert
} from '@mui/material'
import Divider from '@mui/material/Divider'
import { updateLoan } from '@/Functions'
import { frontendUpdateKey } from '@/Secrets'
import { ThemeProvider } from '@mui/material/styles'
import { adminTheme, G, FONTS } from '@/styles/admin-theme'

export default function AppendixForm({ initialValues = {}, loan }) {
  const [values, setValues] = useState({
    interestPercentage: initialValues.interestPercentage ?? '',
    interestAmount: initialValues.interestAmount ?? '',
    arrangementFeesPercentage: initialValues.arrangementFeesPercentage ?? '',
    arrangementFees: initialValues.arrangementFees ?? '',
    loanManagementFeesPercentage: initialValues.loanManagementFeesPercentage ?? '',
    loanManagementFees: initialValues.loanManagementFees ?? '',
    insuranceTerm: initialValues.insuranceTerm ?? '',
    insuranceType: initialValues.insuranceType ?? '',
    insuranceAmount: initialValues.insuranceAmount ?? '',
    trackerAmount: initialValues.trackerAmount ?? '',
    trackingTerm: initialValues.trackingTerm ?? '',
    trackingFee: initialValues.trackingFee ?? '',
    trackerInstallationFee: initialValues.trackerInstallationFee ?? '',
    trackerRemovalFee: initialValues.trackerRemovalFee ?? '',
  })

  const handleChange = (name) => (e) => {
    setValues(prev => ({ ...prev, [name]: e.target.value }))
  }

  const normalize = (vals) => {
    const toNum = (v) => {
      if (v === '' || v === null || typeof v === 'undefined') return null
      const n = Number(String(v).replace(/,/g, ''))
      return Number.isFinite(n) ? n : null
    }
    return {
      interestPercentage: toNum(vals.interestPercentage),
      interestAmount: toNum(vals.interestAmount),
      arrangementFeesPercentage: toNum(vals.arrangementFeesPercentage),
      arrangementFees: toNum(vals.arrangementFees),
      loanManagementFeesPercentage: toNum(vals.loanManagementFeesPercentage),
      loanManagementFees: toNum(vals.loanManagementFees),
      insuranceTerm: toNum(vals.insuranceTerm),
      insuranceType: vals.insuranceType || null,
      insuranceAmount: toNum(vals.insuranceAmount),
      trackerAmount: toNum(vals.trackerAmount),
      trackingTerm: toNum(vals.trackingTerm),
      trackingFee: toNum(vals.trackingFee),
      trackerInstallationFee: toNum(vals.trackerInstallationFee),
      trackerRemovalFee: toNum(vals.trackerRemovalFee),
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const updateData = {
      data: {
        loanStatus: 'pending-approval',
        loanAgreementDocuments: loan.loanAgreementDocuments?.data || null,
        loanFormApendixSection: { ...normalize(values) },
        frontendUpdateKey: frontendUpdateKey
      }
    }
    updateLoan(updateData, loan.id)
  }

  const SMALL_WIDTH = 80

  if (loan.loanAppendixCreated) {
    return (
      <ThemeProvider theme={adminTheme}>
        <Alert severity="info">Loan Appendix already added, change it from the backend.</Alert>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={adminTheme}>
      <Box
        sx={{
          maxWidth: 900,
          mx: 'auto',
          p: { xs: 2, sm: 3 },
          background: 'linear-gradient(135deg, rgba(16,185,129,0.07), rgba(5,150,105,0.03))',
          border: `1px solid ${G.greenBorder}`,
          borderRadius: '16px',
          backdropFilter: 'blur(16px)',
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mb: 1 }}>
            <Box sx={{ width: 3, height: 20, borderRadius: 2, background: `linear-gradient(180deg, ${G.green1}, ${G.green3})` }} />
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontFamily: FONTS.display,
                fontWeight: 400,
                color: '#fff',
                fontSize: '22px',
                letterSpacing: '0.04em',
              }}
            >
              APPENDIX
            </Typography>
            <Box sx={{ width: 3, height: 20, borderRadius: 2, background: `linear-gradient(180deg, ${G.green3}, ${G.green1})` }} />
          </Box>
          <Typography variant="body2" sx={{ color: G.muted, fontSize: '12px' }}>
            Fill in the loan appendix details
          </Typography>
        </Box>

        <form onSubmit={handleSubmit} noValidate>
          <Box container spacing={2} alignItems="center">

            {/* Section label helper */}
            {[
              {
                label: 'Interest',
                fields: (
                  <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                    <TextField
                      aria-label="interest percentage"
                      name="interestPercentage"
                      value={values.interestPercentage}
                      onChange={handleChange('interestPercentage')}
                      size="small"
                      type="number"
                      InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
                      sx={{ width: SMALL_WIDTH }}
                    />
                    <Typography variant="body2" sx={{ color: G.muted }}>Interest =</Typography>
                    <TextField
                      aria-label="interest amount"
                      name="interestAmount"
                      value={values.interestAmount}
                      onChange={handleChange('interestAmount')}
                      size="small"
                      type="number"
                      InputProps={{ startAdornment: <InputAdornment position="start">K</InputAdornment> }}
                      sx={{ width: 160 }}
                    />
                  </Box>
                )
              },
              {
                label: 'Arrangement Fees',
                fields: (
                  <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                    <TextField
                      aria-label="arrangement fees percentage"
                      name="arrangementFeesPercentage"
                      value={values.arrangementFeesPercentage}
                      onChange={handleChange('arrangementFeesPercentage')}
                      size="small"
                      type="number"
                      InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
                      sx={{ width: SMALL_WIDTH }}
                    />
                    <Typography variant="body2" sx={{ color: G.muted }}>Arrangement Fees =</Typography>
                    <TextField
                      aria-label="arrangement fees amount"
                      name="arrangementFees"
                      value={values.arrangementFees}
                      onChange={handleChange('arrangementFees')}
                      size="small"
                      type="number"
                      InputProps={{ startAdornment: <InputAdornment position="start">K</InputAdornment> }}
                      sx={{ width: 160 }}
                    />
                  </Box>
                )
              },
              {
                label: 'Loan Management Fees',
                fields: (
                  <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                    <TextField
                      aria-label="loan management fees percentage"
                      name="loanManagementFeesPercentage"
                      value={values.loanManagementFeesPercentage}
                      onChange={handleChange('loanManagementFeesPercentage')}
                      size="small"
                      type="number"
                      InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
                      sx={{ width: SMALL_WIDTH }}
                    />
                    <Typography variant="body2" sx={{ color: G.muted }}>Loan Management Fees =</Typography>
                    <TextField
                      aria-label="loan management fees amount"
                      name="loanManagementFees"
                      value={values.loanManagementFees}
                      onChange={handleChange('loanManagementFees')}
                      size="small"
                      type="number"
                      InputProps={{ startAdornment: <InputAdornment position="start">K</InputAdornment> }}
                      sx={{ width: 160 }}
                    />
                  </Box>
                )
              },
            ].map((section, idx) => (
              <Grid item xs={12} md={6} mb={2} key={idx}>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 1.5, color: G.green3, fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase' }}
                >
                  {section.label}
                </Typography>
                {section.fields}
                <Divider sx={{ mt: 2, borderColor: G.border }} />
              </Grid>
            ))}

            {/* Insurance */}
            <Grid item xs={12} md={6} mb={2}>
              <Typography variant="subtitle2" sx={{ mb: 1.5, color: G.green3, fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Insurance
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1 }}>
                <TextField
                  aria-label="insurance term"
                  name="insuranceTerm"
                  value={values.insuranceTerm}
                  onChange={handleChange('insuranceTerm')}
                  size="small"
                  type="number"
                  sx={{ width: SMALL_WIDTH }}
                />
                <Typography variant="body2" sx={{ color: G.muted }}>months</Typography>
                <FormControl size="small" sx={{ minWidth: 180, mt: 1 }}>
                  <Select
                    displayEmpty
                    inputProps={{ 'aria-label': 'insurance type' }}
                    name="insuranceType"
                    value={values.insuranceType}
                    onChange={handleChange('insuranceType')}
                  >
                    <MenuItem value="">Insurance type</MenuItem>
                    <MenuItem value="comprehensive">Comprehensive</MenuItem>
                    <MenuItem value="third-party">Third-party</MenuItem>
                  </Select>
                </FormControl>
                <Typography variant="body2" sx={{ color: G.muted, ml: 1 }}>=</Typography>
                <TextField
                  aria-label="insurance amount"
                  name="insuranceAmount"
                  value={values.insuranceAmount}
                  onChange={handleChange('insuranceAmount')}
                  size="small"
                  type="number"
                  InputProps={{ startAdornment: <InputAdornment position="start">K</InputAdornment> }}
                  sx={{ width: 160, mt: 1 }}
                />
              </Box>
              <Divider sx={{ mt: 2, borderColor: G.border }} />
            </Grid>

            {/* Tracker */}
            <Grid item xs={12} md={6} mb={2}>
              <Typography variant="subtitle2" sx={{ mb: 1.5, color: G.green3, fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Tracker & Tracking
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {[
                  { label: 'Tracker =', name: 'trackerAmount', width: 160, prefix: 'K' },
                ].map(f => (
                  <Box key={f.name} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" sx={{ color: G.muted, minWidth: 80 }}>{f.label}</Typography>
                    <TextField
                      aria-label={f.name}
                      name={f.name}
                      value={values[f.name]}
                      onChange={handleChange(f.name)}
                      size="small"
                      type="number"
                      InputProps={f.prefix ? { startAdornment: <InputAdornment position="start">{f.prefix}</InputAdornment> } : undefined}
                      sx={{ width: f.width }}
                    />
                  </Box>
                ))}

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                  <Typography variant="body2" sx={{ color: G.muted }}>Tracking by</Typography>
                  <TextField
                    aria-label="tracking term"
                    name="trackingTerm"
                    value={values.trackingTerm}
                    onChange={handleChange('trackingTerm')}
                    size="small"
                    type="number"
                    sx={{ width: SMALL_WIDTH }}
                  />
                  <Typography variant="body2" sx={{ color: G.muted }}>months =</Typography>
                  <TextField
                    aria-label="tracking fee"
                    name="trackingFee"
                    value={values.trackingFee}
                    onChange={handleChange('trackingFee')}
                    size="small"
                    type="number"
                    InputProps={{ startAdornment: <InputAdornment position="start">K</InputAdornment> }}
                    sx={{ width: 160 }}
                  />
                </Box>

                {[
                  { label: 'Tracker Installation =', name: 'trackerInstallationFee' },
                  { label: 'Tracker Removal =', name: 'trackerRemovalFee' },
                ].map(f => (
                  <Box key={f.name} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" sx={{ color: G.muted, minWidth: 140 }}>{f.label}</Typography>
                    <TextField
                      aria-label={f.name}
                      name={f.name}
                      value={values[f.name]}
                      onChange={handleChange(f.name)}
                      size="small"
                      type="number"
                      InputProps={{ startAdornment: <InputAdornment position="start">K</InputAdornment> }}
                      sx={{ width: 160 }}
                    />
                  </Box>
                ))}
              </Box>
            </Grid>

            {/* Submit */}
            <Grid item xs={12} sx={{ textAlign: 'center', mt: 3 }}>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  background: `linear-gradient(135deg, ${G.green1} 0%, ${G.green2} 55%, ${G.green1} 100%)`,
                  backgroundSize: '200% auto',
                  color: '#fff',
                  fontWeight: 700,
                  borderRadius: '10px',
                  textTransform: 'none',
                  px: 4,
                  py: 1.2,
                  boxShadow: '0 4px 16px rgba(16,185,129,0.28)',
                  '&:hover': { backgroundPosition: 'right center', boxShadow: '0 6px 22px rgba(16,185,129,0.38)' },
                }}
              >
                Save Appendix
              </Button>
            </Grid>

          </Box>
        </form>
      </Box>
    </ThemeProvider>
  )
}

AppendixForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
}