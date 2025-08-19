'use client'
import React from 'react'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'
import { getImage } from '@/Functions'
import { backEndUrl } from '@/Constants'
import { Slide } from '@material-ui/core'

export default class ClientDetails extends React.Component {
  render() {
    const { loan, role } = this.props
    // loan.client is the populated object: loan.client.data.attributes
    const clientWrapped = loan?.client
    const client = clientWrapped?.data?.attributes || {}

    const details = client.details || {}
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

                <h4 style={{marginBottom:'10px'}}>Personal details</h4>
                <p>First name: {details.firstname || '-'}</p>
                <p>Last name: {details.lastname || '-'}</p>
                {role === "Collateral Inspector"? null : <p>Age: {details.age || '-'}</p>}
                <p>Gender: {details.gender || '-'}</p>
                {role === "Collateral Inspector"? null : <p>Date of birth: {details.dateOfBirth || '-'}</p>}
                <p>Address: {details.address || '-'}</p>

                <Divider sx={{ my: 2 }} />

                <h4 style={{marginBottom:'10px'}}>Account info</h4>
                <p>{role === "Collateral Inspector"? "Phone Number" : "Username"}: <strong>{client.username || '-'}</strong></p>
                <p>Email: <strong>{client.email || '-'}</strong></p>
                {role === "Collateral Inspector"? null : <p>Registered: {client.createdAt ? new Date(client.createdAt).toLocaleString() : '-'}</p>}
                </Paper>
            </Box>
        </Slide>
    )
  }
}