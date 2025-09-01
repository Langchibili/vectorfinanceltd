'use client'
import React, { useState } from 'react'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import { getImage } from '@/Functions'
import { backEndUrl } from '@/Constants'
import { Slide } from '@material-ui/core'
import ContactCard from './ContactCard'
import { Card, CardContent, Typography, IconButton, Stack, Snackbar, Alert } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'


export default class ClientDetails extends React.Component {
  render() {
    const { loan, user, role, adminActions } = this.props
    // loan.client is the populated object: loan.client.data.attributes
    const clientWrapped = loan?.client
    const client = user? user : clientWrapped?.data?.attributes || {} // if the user account is set directly, use it

    const details = client.details || {}
    const bankDetails = client.bankDetails || null
    const avatarUrl = client.profilePicture?.data?.attributes?.formats?.thumbnail?.url
      ? backEndUrl + client.profilePicture.data.attributes.formats.thumbnail.url
      : null

    return (
        <Slide in={true} direction="left">
            <Box sx={{ maxWidth: 700, mx: 'auto', p: { xs: 1.5, sm: 2 } }}>
                <Paper sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Avatar src={avatarUrl || '/default-profile.png'} sx={{ width: 64, height: 64 }} />
                    <Box>
                    <h6>{client.fullnames || client.username || 'Client'}</h6>
                    <p variant="body2">{client.email || ''}</p>
                    </Box>
                </Box>

                <Divider sx={{ my: 2 }} />
                {adminActions? <>{adminActions()} <Divider sx={{ my: 2 }} /></> : null}
                
                <h4 style={{marginBottom:'10px'}}>Personal details</h4>
                <p>First name: {details.firstname || '-'}</p>
                <p>Last name: {details.lastname || '-'}</p>
                {role === "Collateral Inspector"? null : <p>Age: {details.age || '-'}</p>}
                <p>Gender: {details.gender || '-'}</p>
                {role === "Collateral Inspector"? null : <p>Date of birth: {details.dateOfBirth || '-'}</p>}
                <p>Address: {details.address || '-'}</p>

                <Divider sx={{ my: 2 }} />
                {role === "Collateral Inspector"? null : <>
                <h4 style={{marginBottom:'10px'}}>Bank Details</h4>
                <BankDetails bankDetails={bankDetails}/>
                <Divider sx={{ my: 2 }} /> 
                </>}
                <h4 style={{marginBottom:'10px'}}>Account info</h4>
                <p>{role === "Collateral Inspector"? "Phone Number" : "Username"}: <strong>{client.username || '-'}</strong></p>
                <p>Email: <strong>{client.email || '-'}</strong></p>
                {role === "Collateral Inspector"? null : <p>Registered: {client.createdAt ? new Date(client.createdAt).toLocaleString() : '-'}</p>}
                <ContactCard phone={client.username} email={client.email} user_title="Client"/>
                </Paper>
            </Box>
        </Slide>
    )
  }
}

const BankDetails = ({ bankDetails }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const handleCopy = (value) => {
    navigator.clipboard.writeText(value)
    setSnackbarOpen(true)
  }

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') return
    setSnackbarOpen(false)
  }
  
 
  return (
    <>
      <Card sx={{ maxWidth: 500, margin: '20px auto', borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          {bankDetails? <Stack spacing={2}>
            {Object.entries(bankDetails).map(([key, value]) => (
                key === "id"? null : 
                <Box
                    key={key}
                    sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 1,
                    border: '1px solid #e0e0e0',
                    borderRadius: 2,
                    }}
                >
                    <Box>
                    <Typography variant="body2" color="textSecondary">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </Typography>
                    <Typography variant="body1">{value}</Typography>
                    </Box>
                    <IconButton onClick={() => handleCopy(value)} size="small">
                    <ContentCopyIcon fontSize="small" />
                    </IconButton>
                </Box>
                )
            )}
          </Stack> : <Alert severity="info">Bank details will show up when the client signs the loan form</Alert>}
        </CardContent>
      </Card>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Copied to clipboard"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  )
}











