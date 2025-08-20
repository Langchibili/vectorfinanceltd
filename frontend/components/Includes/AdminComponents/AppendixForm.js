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
/**
 * AppendixForm
 * A clean, well-structured MUI form that maps 1:1 to the appendix fields.
 * - Prefills from `initialValues` (if provided)
 * - Calls `onSubmit(values)` with normalized numbers when submitted
 */
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

  // Basic normalization: convert numeric-ish fields to numbers (or null)
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
    const loanFormApendixSection = loan.loanFormApendixSection
    const updateData = {
        data:{
            ...values,
            loanAppendixCreated: true
        }
    }

  }

  // SMALL_WIDTH used for percentage/month inputs (3-digit max)
  const SMALL_WIDTH = 80
  if(loan.loanAppendixCreated){
    return <Alert>Loan Appendix already added, change it from the backend. </Alert>
  }
  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Typography variant="h6" component="h3" fontWeight={700}>APENDIX</Typography>
      </Box>

      <form onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2} alignItems="center">
          {/* Interest */}
          <Grid item xs={12} md={6}>
            <Typography variant="body1" component="div">
              <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
                <TextField
                  aria-label="interest percentage"
                  name="interestPercentage"
                  value={values.interestPercentage}
                  onChange={handleChange('interestPercentage')}
                  size="small"
                  type="number"
                  InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
                  sx={{ width: SMALL_WIDTH, mr: 1 }}
                />
                <Box component="span">Interest =</Box>
                <TextField
                  aria-label="interest amount"
                  name="interestAmount"
                  value={values.interestAmount}
                  onChange={handleChange('interestAmount')}
                  size="small"
                  type="number"
                  InputProps={{ startAdornment: <InputAdornment position="start">K</InputAdornment> }}
                  sx={{ width: 160, ml: 1 }}
                />
              </Box>
            </Typography>
          </Grid>
        
          {/* Arrangement Fees */}
          <Grid item xs={12} md={6}>
            <Typography variant="body1">
              <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
                <TextField
                  aria-label="arrangement fees percentage"
                  name="arrangementFeesPercentage"
                  value={values.arrangementFeesPercentage}
                  onChange={handleChange('arrangementFeesPercentage')}
                  size="small"
                  type="number"
                  InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
                  sx={{ width: SMALL_WIDTH, mr: 1 }}
                />
                <Box component="span">Arrangement Fees =</Box>
                <TextField
                  aria-label="arrangement fees amount"
                  name="arrangementFees"
                  value={values.arrangementFees}
                  onChange={handleChange('arrangementFees')}
                  size="small"
                  type="number"
                  InputProps={{ startAdornment: <InputAdornment position="start">K</InputAdornment> }}
                  sx={{ width: 160, ml: 1 }}
                />
              </Box>
            </Typography>
          </Grid>

          {/* Loan Management Fees */}
          <Grid item xs={12} md={6}>
            <Typography variant="body1">
              <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
                <TextField
                  aria-label="loan management fees percentage"
                  name="loanManagementFeesPercentage"
                  value={values.loanManagementFeesPercentage}
                  onChange={handleChange('loanManagementFeesPercentage')}
                  size="small"
                  type="number"
                  InputProps={{ endAdornment: <InputAdornment position="end">%</InputAdornment> }}
                  sx={{ width: SMALL_WIDTH, mr: 1 }}
                />
                <Box component="span">Loan Management Fees =</Box>
                <TextField
                  aria-label="loan management fees amount"
                  name="loanManagementFees"
                  value={values.loanManagementFees}
                  onChange={handleChange('loanManagementFees')}
                  size="small"
                  type="number"
                  InputProps={{ startAdornment: <InputAdornment position="start">K</InputAdornment> }}
                  sx={{ width: 160, ml: 1 }}
                />
              </Box>
            </Typography>
          </Grid>

          {/* Insurance */}
          <Grid item xs={12} md={6} >
            <Typography variant="body1">
              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <TextField
                  aria-label="insurance term"
                  name="insuranceTerm"
                  value={values.insuranceTerm}
                  onChange={handleChange('insuranceTerm')}
                  size="small"
                  type="number"
                  sx={{ width: SMALL_WIDTH, mr: 1 }}
                />
                <Box component="span">months</Box>

                <FormControl size="small" sx={{ ml: 2, minWidth: 180, mt: 1  }}>
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

                <Box component="span" sx={{ ml: 1  }}> = </Box>
                <TextField
                  aria-label="insurance amount"
                  name="insuranceAmount"
                  value={values.insuranceAmount}
                  onChange={handleChange('insuranceAmount')}
                  size="small"
                  type="number"
                  InputProps={{ startAdornment: <InputAdornment position="start">K</InputAdornment> }}
                  sx={{ width: 160, ml: 1, mt: 1  }}
                />
              </Box>
            </Typography>
          </Grid>

          {/* Tracker & Tracking */}
          <Grid item xs={12} md={6}>
            <Typography variant="body1">
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box component="span">Tracker =</Box>
                  <TextField
                    aria-label="tracker amount"
                    name="trackerAmount"
                    value={values.trackerAmount}
                    onChange={handleChange('trackerAmount')}
                    size="small"
                    type="number"
                    InputProps={{ startAdornment: <InputAdornment position="start">K</InputAdornment> }}
                    sx={{ width: 160, ml: 1 }}
                  />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box component="span">Tracking by</Box>
                  <TextField
                    aria-label="tracking term"
                    name="trackingTerm"
                    value={values.trackingTerm}
                    onChange={handleChange('trackingTerm')}
                    size="small"
                    type="number"
                    sx={{ width: SMALL_WIDTH, mx: 1 }}
                  />
                  <Box component="span">months =</Box>
                  <TextField
                    aria-label="tracking fee"
                    name="trackingFee"
                    value={values.trackingFee}
                    onChange={handleChange('trackingFee')}
                    size="small"
                    type="number"
                    InputProps={{ startAdornment: <InputAdornment position="start">K</InputAdornment> }}
                    sx={{ width: 160, ml: 1 }}
                  />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Box component="span">Tracker Installation =</Box>
                  <TextField
                    aria-label="tracker installation fee"
                    name="trackerInstallationFee"
                    value={values.trackerInstallationFee}
                    onChange={handleChange('trackerInstallationFee')}
                    size="small"
                    type="number"
                    InputProps={{ startAdornment: <InputAdornment position="start">K</InputAdornment> }}
                    sx={{ width: 160, ml: 1 }}
                  />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box component="span">Tracker Removal =</Box>
                  <TextField
                    aria-label="tracker removal fee"
                    name="trackerRemovalFee"
                    value={values.trackerRemovalFee}
                    onChange={handleChange('trackerRemovalFee')}
                    size="small"
                    type="number"
                    InputProps={{ startAdornment: <InputAdornment position="start">K</InputAdornment> }}
                    sx={{ width: 160, ml: 1 }}
                  />
                </Box>
              </Box>
            </Typography>
          </Grid>

          {/* Submit */}
          <Grid item xs={12} sx={{ textAlign: 'center', mt: 2 }}>
            <Button variant="contained" type="submit">Save Appendix</Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

AppendixForm.propTypes = {
  initialValues: PropTypes.object,
  onSubmit: PropTypes.func,
}
