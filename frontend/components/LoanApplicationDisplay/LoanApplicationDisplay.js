import React from 'react'
import { Box, Typography, Grid, Paper, IconButton } from '@mui/material'
import {
  Home as HomeIcon,
  Business as BusinessIcon,
  Apartment as CompanyIcon,
  Edit as EditIcon
} from '@mui/icons-material'
import { borderColor, color } from '@mui/system'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    p: 4
  },
  title: {
    mb: 4,
    fontWeight: 700,
    color:'whitesmoke'
  },
  optionCard: {
    background: 'none',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    p: 3,
    borderColor:'green',
    minHeight: 200,
    cursor: 'pointer',
    '&:hover': {
      boxShadow: 6
    }
  },
  iconBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.8,
    color:'white',
    fontSize: '6rem'
  },
  content: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 1
  },
  label: {
    fontSize: '1.2rem'
  }
}

export default function LoanApplicationDisplay() {
  const topOptions = [
    { Icon: HomeIcon,    label: 'Personal Loan' },
    { Icon: BusinessIcon, label: 'Business Loan' }
  ]

  return (
    <Box sx={styles.container}>
      <Typography variant='h4' sx={styles.title}>
        Apply For{" "} <EditIcon sx={{ fontWeight:'bolder', height:'50px'}}/>
      </Typography>

      <Grid container spacing={4} justifyContent='center'>
        {topOptions.map((opt, idx) => (
          <Grid item xs={12} sm={5} key={idx}>
            <Paper sx={styles.optionCard} elevation={3}>
              {/* Background icon filling the card */}
              <opt.Icon sx={styles.iconBg} />
              {/* Foreground content: text then pencil */}
              
            </Paper>
            <Box sx={styles.content}>
                <Typography sx={styles.label}>{opt.label}</Typography>
              </Box>
          </Grid>
        ))}
      </Grid>

      {/* Company Loan centered below */}
      <Box mt={6} width='100%' maxWidth={600}>
        <Paper sx={styles.optionCard} elevation={3}>
          <CompanyIcon sx={styles.iconBg} />
        </Paper>
        <Box sx={styles.content}>
            <Typography sx={styles.label}>Company Loan</Typography>
            <IconButton>
              
            </IconButton>
          </Box>
      </Box>
    </Box>
  )
}
