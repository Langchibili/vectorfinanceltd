"use client"

import React, { useEffect, useState } from 'react'
import { useUser } from '@/Contexts/UserContext'
import { useConstants } from '@/Contexts/ConstantsContext'
import { getAllUsers, scrolltoTopOFPage } from '@/Functions'
import { Slide } from '@material-ui/core'
import { Box, Typography, Alert, LinearProgress, Button, TextField, Stack, Card, CardContent, Tooltip } from '@mui/material'
import { usePage } from '@/Contexts/PageContext'
import { useBottomNav } from '@/Contexts/BottomNavContext'
import Pagination from '@mui/material/Pagination'
import SearchIcon from '@mui/icons-material/Search'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { PersonAdd } from '@mui/icons-material'

export default function AdminUsersList() {
  const loggedInUser = useUser()
  const constants = useConstants()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchType, setSearchType] = useState('id') // 'id' or 'phone'
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const { setPage: setPageContext } = usePage()
  const { BottomNavLink } = useBottomNav()
  const loggedIn = loggedInUser?.status || false
  const adminRoles = ['director', 'ceo', 'Loan Admin', 'Accountant']
  setPageContext('/admin/users')

  useEffect(() => {
    scrolltoTopOFPage()
    fetchUsers()
    // eslint-disable-next-line
  }, [])

  const fetchUsers = async (query = '') => {
    setLoading(true)
    setError(null)
    try {
      const { users: fetchedUsers, totalPages: fetchedTotalPages } = await getAllUsers({ search: query, page, order: 'desc' })
      setUsers(fetchedUsers)
      setTotalPages(fetchedTotalPages || 1)
    } catch (err) {
      setError('Failed to fetch users.')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      fetchUsers()
      return
    }
    setLoading(true)
    setError(null)
    try {
      let user = null
      if (searchType === 'id') {
        user = await getUserById(searchTerm.trim())
        console.log('user by id',id)
      } else if (searchType === 'phone') {
        user = await getUserFromUsername(searchTerm.trim())
      }
      setUsers(user && user.id ? [user] : [])
      setTotalPages(1)
      if (!user || !user.id) setError('User not found.')
    } catch (err) {
      setUsers([])
      setError('User not found.')
    } finally {
      setLoading(false)
    }
  }

  const handleAddClient = () => {
    window.location = '/admin/users/add'
  }
  

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
        <LinearProgress color='secondary' />
      </div>
    )
  }

   if (!loggedIn) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '70px' }}>
          <Stack spacing={2} alignItems="center">
            {typeof window !== 'undefined' ? (
            <>
            <Alert severity="warning">You are logged out, log in</Alert>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                const redirect = encodeURIComponent(window.location.href)
                window.location.href = `/admin?redirectUrl=${redirect}`
              }}
            >
              Login to Proceed
            </Button>
            </>
          ) : null}
          </Stack>
        </div>
      )
  }
  

  if (error) {
    return (
      <Box sx={{ maxWidth: 500, mx: 'auto', mt: 5 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    )
  }
  
  return ( <Slide in={true} direction="up">
      <div
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, rgb(188 200 197), rgb(252 252 252))',
          padding: '2rem',
          marginTop: '30px'
        }}
      >
        <Stack spacing={3} alignItems="center">
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleAddClient}
            startIcon={<PersonAdd />}
            sx={{
              borderRadius: '8px',
              px: 4,
              py: 1.5,
              textTransform: 'none',
              fontWeight: 600,
              width: '100%',
              maxWidth: 600,
              mb: 1
            }}
          >
            Add Client
          </Button>
         {/* <Stack direction="row" spacing={1} sx={{ width: '100%', maxWidth: 600 }}>
          <TextField
            label={searchType === 'id' ? "Search User by ID" : "Search User by Phone Number"}
            variant="filled"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            sx={{
              flex: 1,
              backgroundColor: '#fff',
              borderRadius: '8px',
              '& .MuiFilledInput-root': {
                backgroundColor: '#fff',
                borderRadius: '8px',
                '&:before, &:after': {
                  borderBottom: 'none',
                },
              },
              '& .MuiInputBase-input': {
                padding: '10px 12px',
              },
            }}
          />
          <Button
            variant="contained"
            color="secondary"
            size="medium"
            onClick={handleSearch}
            sx={{
              borderRadius: '8px',
              px: 3,
              py: 1.5,
              textTransform: 'none',
              fontWeight: 500,
              boxShadow: '0 3px 8px rgba(0,0,0,0.15)',
              '&:hover': {
                boxShadow: '0 5px 12px rgba(0,0,0,0.2)',
              },
              minWidth: 0
            }}
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </Stack>
        <FormControl component="fieldset" sx={{ width: '100%', maxWidth: 600 }}>
          <RadioGroup
            row
            aria-label="search-type"
            name="search-type"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            sx={{ justifyContent: 'center' }}
          >
            <FormControlLabel value="id" control={<Radio />} label="Search by ID" />
            <FormControlLabel value="phone" control={<Radio />} label="Search by Phone Number" />
          </RadioGroup>
        </FormControl> */}
          {users.length === 0 ? (
            <Alert severity="info" sx={{ width: '100%', maxWidth: 600 }}>No users found.</Alert>
          ) : (
            <Stack spacing={2} sx={{ width: '100%', maxWidth: 600, mx:'auto', alignItems:'center' }}>
            {users
                .slice()
                .sort((a, b) => b.id - a.id)
                .map((user) => {
                if(user.type && adminRoles.includes(user.type)){
                    return null // can't display admin users
                }  
                const user_title = user.fullnames || 'No Name'
                const phone = user.username
                const email = user.email
                const clientId = user.id
                return (
                    <Card
                    key={clientId}
                    sx={{
                        maxWidth: 420,
                        width: '100%',
                        borderRadius: 2,
                        boxShadow: 3,
                        mx: 'auto',
                        cursor: 'pointer',
                        transition: 'box-shadow 0.2s',
                        '&:hover': { boxShadow: 6 }
                    }}
                    onClick={() => window.location = `/admin/users/${clientId}`}
                    >
                    <CardContent>
                        <Stack spacing={1}>
                        <Typography variant="h6" fontWeight={600}>
                            {user_title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Phone: {phone}
                        </Typography>
                        <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            userSelect: 'text',
                            pointerEvents: 'none', // disables click/tap
                            textDecoration: 'none',
                            cursor: 'default'
                        }}
                        >
                        Email: {email}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Client ID: {clientId}
                        </Typography>
                        </Stack>
                    </CardContent>
                    </Card>
                )
                })}
            </Stack>
          )}
          {totalPages > 1 && (
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, val) => {
                setPage(val)
                fetchUsers(searchTerm)
              }}
              color="primary"
              sx={{ mt: 2 }}
            />
          )}
        </Stack>
      </div>
    </Slide>
   
  )
  
}