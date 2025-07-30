'use client'

import React, { useState, useEffect } from 'react'
import { Box, Card, CardContent, Typography, TextField, Stack, Button, IconButton, Tooltip, Snackbar, Alert as MuiAlert } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { useBottomNav } from '@/Contexts/BottomNavContext'
import { api_url, clientUrl, getJwt } from '@/Constants'
import { getContentCount, getReferralsById, scrolltoTopOFPage, updateReferralCode } from '@/Functions'
import UpdateDetailsForm from '@/components/Forms/UpdateDetailsForm'
import { Slide } from '@material-ui/core'

export default function ReferralHomePage({ loggedInUser }) {
  const [referral, setReferral] = useState(null)
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' })
  const { setBottomNavLink } = useBottomNav()
  const [totalReferrals, setTotalReferrals] = useState(0)
  const [totalEarnings, setTotalEarnings] = useState(0)
  const [basicDetailsUpdated, setBasicDetailsUpdated] = useState(loggedInUser?.basicDetailsUpdated || false)

  useEffect(() => {
    const fetchReferral = async () => {
      try {
        const data = await getReferralsById(loggedInUser.referral.id, '*')
        setReferral(data)
        setCode(data.referralCode)
      } catch (err) {
        setError('Failed to fetch referral data.')
      } finally {
        setLoading(false)
      }
    }
    const getReferredUsersCount = async (referralId) => {
        try{
          return await getContentCount({
            contentName: 'users',
            contentToFilterById: referralId,
            idField: 'referredBy'
          })
        }
        catch (err) {
            console.error('Error fetching referrals total', err)
            return 0
        }
    }
    if (loggedInUser.basicDetailsUpdated && loggedInUser.referral) {
      fetchReferral()
      getReferredUsersCount(loggedInUser.id).then(setTotalReferrals)
    } else {
      setLoading(false)
    }
  }, [loggedInUser])

 useEffect(() => {
    const getReferralEarningsTotal = async (referralId) => {
        try {
            // Pull only the `amount` field, and get up to 1000 records in one go.
            // Adjust pagination if you may exceed 1000 earnings items.
            const url = `${api_url}/referral-earnings` +
            `?filters[referral][id][$eq]=${referralId}` +
            `&fields=amount` +
            `&pagination[pageSize]=1000`

            const resp = await fetch(url, {
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${getJwt()}` },
            })
            const json = await resp.json()
            if (!Array.isArray(json.data)) return 0

            // Sum up the amounts
            return json.data.reduce((sum, record) => sum + (record.attributes?.amount || 0) , 0)
        } catch (err) {
            console.error('Error fetching referral earnings total', err)
            return 0
        }
    }
    
    if (referral?.id) {
      // load the fresh total
      getReferralEarningsTotal(referral.id).then(setTotalEarnings)
    }
  }, [referral])

  const handleSave = async () => {
    try {
      const updatedReferralCode = await updateReferralCode({data:{ referralCode: code }},referral.id)
      if(updatedReferralCode.hasOwnProperty("error")){
        setSnack({ open: true, message: 'This code already exist, please create a different one.', severity: 'error' })
        return
      } 
      setReferral(prev => ({ ...prev, referralCode: code }))
      setSnack({ open: true, message: 'Referral code updated', severity: 'success' })
    } catch {
      setSnack({ open: true, message: 'Update failed', severity: 'error' })
    }
  }

  const handleCopy = async () => {
    const link = `${clientUrl}?code=${code}`
    try {
      await navigator.clipboard.writeText(link)
      setSnack({ open: true, message: 'Link copied to clipboard', severity: 'info' })
    } catch {
      setSnack({ open: true, message: 'Copy failed', severity: 'error' })
    }
  }
 
 const handleNextClick = ()=>{
     scrolltoTopOFPage()
     setBasicDetailsUpdated(true)
 } 

  if (!basicDetailsUpdated) {
    return (
      <>
        <MuiAlert severity="info" sx={{ mb: 2 }}>
          First update your basic information to access your referral account.
        </MuiAlert>
        <UpdateDetailsForm {...{ loggedInUser }} handleOpenUpdateClientDetailsForm={handleNextClick} />
      </>
    )
  }

  if (loading) return <Typography>Loading...</Typography>
  if (error) return <MuiAlert severity="error">{error}</MuiAlert>

  return (
    <Slide in={true} direction="right">
      <Box>
      <Card sx={{ mb: 1 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Your Referral Code
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              label="Code"
              value={code}
              onChange={e => setCode(e.target.value)}
            />
            <Button variant="contained" onClick={handleSave}>
              Save
            </Button>
            <Tooltip title="Copy Referral Link">
              <IconButton onClick={handleCopy}>
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          </Stack>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {`Your referral link: ${clientUrl}?code=${code}`}
          </Typography>
        </CardContent>
      </Card>

      <Stack spacing={2}>
        <Card>
          <CardContent>
            <Typography variant="h6">Total Referrals</Typography>
            <Typography variant="h4">
              {totalReferrals}
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6">Total Earnings</Typography>
            <Typography variant="h4">
              {totalEarnings}
            </Typography>
          </CardContent>
        </Card>

        <Stack direction="row" spacing={2}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => setBottomNavLink(1)}
          >
            View More on Earnings
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => setBottomNavLink(2)}
          >
            Your Account Info
          </Button>
        </Stack>
      </Stack>

      <Snackbar
        open={snack.open}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
        onClose={() => setSnack(prev => ({ ...prev, open: false }))}
      >
        <MuiAlert severity={snack.severity}>
          {snack.message}
        </MuiAlert>
      </Snackbar>
    </Box>
    </Slide>
    
  )
}
