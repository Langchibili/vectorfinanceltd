// "use client"

// import React, { useEffect, useState } from 'react'
// import { useUser } from '@/Contexts/UserContext'
// import { useConstants } from '@/Contexts/ConstantsContext'
// import { getAllUsers, scrolltoTopOFPage } from '@/Functions'
// import { Slide } from '@material-ui/core'
// import { Alert, LinearProgress, Button, TextField, Stack, Pagination, InputAdornment } from '@mui/material'
// import Box from '@mui/material/Box'
// import Typography from '@mui/material/Typography'
// import { ThemeProvider } from '@mui/material/styles'
// import { usePage } from '@/Contexts/PageContext'
// import { useBottomNav } from '@/Contexts/BottomNavContext'
// import SearchIcon from '@mui/icons-material/Search'
// import PersonAddIcon from '@mui/icons-material/PersonAdd'
// import { adminTheme, G, FONTS, PAGE_SX } from '@/styles/admin-theme'

// export default function AdminUsersList() {
//   const loggedInUser = useUser()
//   const constants = useConstants()
//   const [users, setUsers] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [searchTerm, setSearchTerm] = useState('')
//   const [searchType, setSearchType] = useState('id')
//   const [page, setPage] = useState(1)
//   const [totalPages, setTotalPages] = useState(1)
//   const { setPage: setPageContext } = usePage()
//   const { BottomNavLink } = useBottomNav()
//   const loggedIn = loggedInUser?.status || false
//   const adminRoles = ['director', 'ceo', 'Loan Admin', 'Accountant', 'Collateral Inspector']
//   setPageContext('/admin/users')

//   useEffect(() => {
//     scrolltoTopOFPage()
//     fetchUsers()
//   }, [])

//   const fetchUsers = async (query = '') => {
//     setLoading(true)
//     setError(null)
//     try {
//       const { users: fetchedUsers, totalPages: fetchedTotalPages } = await getAllUsers({ search: query, page, order: 'desc' })
//       setUsers(fetchedUsers)
//       setTotalPages(fetchedTotalPages || 1)
//     } catch (err) {
//       setError('Failed to fetch users.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleSearch = async () => {
//     if (!searchTerm.trim()) { fetchUsers(); return }
//     setLoading(true)
//     setError(null)
//     try {
//       let user = null
//       if (searchType === 'id') {
//         user = await getUserById(searchTerm.trim())
//       } else if (searchType === 'phone') {
//         user = await getUserFromUsername(searchTerm.trim())
//       }
//       setUsers(user && user.id ? [user] : [])
//       setTotalPages(1)
//       if (!user || !user.id) setError('User not found.')
//     } catch (err) {
//       setUsers([])
//       setError('User not found.')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <ThemeProvider theme={adminTheme}>
//       <Box sx={{ ...PAGE_SX, pt: '88px' }}>
//         {/* Ambient */}
//         <Box sx={{ position: 'fixed', inset: 0, background: `radial-gradient(ellipse 80% 45% at 50% -5%, rgba(16,185,129,0.09) 0%, transparent 65%)`, pointerEvents: 'none', zIndex: 0 }} />
//         <Box sx={{ position: 'fixed', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.022) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none', zIndex: 0 }} />

//         <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 600, mx: 'auto', px: 2 }}>

//           {/* Header */}
//           <Box sx={{ mb: 3, animation: 'vfSlideUp 0.4s cubic-bezier(.22,1,.36,1)' }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap', mb: 0.5 }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
//                 <Box sx={{ width: 3, height: 18, borderRadius: 1, background: `linear-gradient(180deg, ${G.green1}, ${G.green3})` }} />
//                 <Typography sx={{ fontFamily: FONTS.display, fontSize: '24px', color: '#fff', fontWeight: 400 }}>
//                   Clients
//                 </Typography>
//               </Box>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 startIcon={<PersonAddIcon />}
//                 onClick={() => { window.location = '/admin/users/add' }}
//                 sx={{ fontSize: '13px' }}
//               >
//                 Add Client
//               </Button>
//             </Box>
//             <Typography variant="body2" sx={{ pl: '19px' }}>
//               View and manage registered client accounts
//             </Typography>
//           </Box>

//           {/* Loading */}
//           {loading && <LinearProgress color="primary" sx={{ mb: 2 }} />}

//           {/* Not logged in */}
//           {!loggedIn && !loading && (
//             <Box sx={{ p: 3, borderRadius: '16px', background: 'rgba(251,191,36,0.07)', border: '1px solid rgba(251,191,36,0.22)', textAlign: 'center' }}>
//               <Alert severity="warning" sx={{ mb: 2 }}>You are logged out</Alert>
//               {typeof window !== 'undefined' && (
//                 <Button variant="contained" color="primary" onClick={() => {
//                   const redirect = encodeURIComponent(window.location.href)
//                   window.location.href = `/admin?redirectUrl=${redirect}`
//                 }}>
//                   Login to Proceed
//                 </Button>
//               )}
//             </Box>
//           )}

//           {/* Error */}
//           {error && !loading && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

//           {/* Content */}
//           {!loading && loggedIn && (
//             <Slide in={true} direction="up">
//               <Stack spacing={2}>
//                 {/* Search */}
//                 <Box sx={{ display: 'flex', gap: 1 }}>
//                   <TextField
//                     label="Search by ID or phone"
//                     variant="outlined"
//                     size="small"
//                     value={searchTerm}
//                     onChange={e => setSearchTerm(e.target.value)}
//                     onKeyDown={e => e.key === 'Enter' && handleSearch()}
//                     InputProps={{
//                       startAdornment: (
//                         <InputAdornment position="start">
//                           <SearchIcon sx={{ fontSize: 18, color: G.muted }} />
//                         </InputAdornment>
//                       )
//                     }}
//                     sx={{ flex: 1 }}
//                   />
//                   <Button variant="contained" color="primary" onClick={handleSearch} sx={{ px: 3, flexShrink: 0 }}>
//                     Search
//                   </Button>
//                 </Box>

//                 {/* User cards */}
//                 {users.length === 0 ? (
//                   <Box sx={{ textAlign: 'center', py: 8 }}>
//                     <Typography sx={{ fontSize: '14px', color: G.muted, fontFamily: FONTS.body }}>No clients found</Typography>
//                   </Box>
//                 ) : (
//                   users
//                     .slice()
//                     .sort((a, b) => b.id - a.id)
//                     .map(user => {
//                       if (user.type && adminRoles.includes(user.type)) return null
//                       const initials = (user.fullnames || user.username || 'C').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
//                       return (
//                         <Box
//                           key={user.id}
//                           onClick={() => window.location = `/admin/users/${user.id}`}
//                           sx={{
//                             display: 'flex', alignItems: 'center', gap: 2,
//                             p: '16px 20px',
//                             borderRadius: '16px',
//                             background: 'rgba(255,255,255,0.04)',
//                             border: '1px solid rgba(255,255,255,0.08)',
//                             cursor: 'pointer',
//                             backdropFilter: 'blur(8px)',
//                             transition: 'all 0.18s',
//                             '&:hover': {
//                               background: 'rgba(255,255,255,0.07)',
//                               borderColor: G.greenBorder,
//                               transform: 'translateX(2px)',
//                             },
//                           }}
//                         >
//                           {/* Avatar */}
//                           <Box sx={{
//                             width: 44, height: 44, borderRadius: '12px', flexShrink: 0,
//                             background: 'linear-gradient(135deg, rgba(16,185,129,0.20), rgba(5,150,105,0.07))',
//                             border: `1.5px solid rgba(16,185,129,0.25)`,
//                             display: 'flex', alignItems: 'center', justifyContent: 'center',
//                             fontFamily: FONTS.display, fontSize: '15px', color: G.green3, fontWeight: 400,
//                           }}>
//                             {initials}
//                           </Box>

//                           {/* Info */}
//                           <Box sx={{ flex: 1, minWidth: 0 }}>
//                             <Typography sx={{ fontSize: '14.5px', fontWeight: 600, color: '#fff', mb: 0.25, fontFamily: FONTS.body }}>
//                               {user.fullnames || 'No Name'}
//                             </Typography>
//                             <Typography sx={{ fontSize: '12px', color: G.muted, fontFamily: FONTS.mono }}>
//                               {user.username}
//                             </Typography>
//                           </Box>

//                           {/* ID + chevron */}
//                           <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
//                             <Typography sx={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: G.muted, fontFamily: FONTS.body, mb: 0.25 }}>
//                               ID
//                             </Typography>
//                             <Typography sx={{ fontFamily: FONTS.mono, fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.5)' }}>
//                               {user.id}
//                             </Typography>
//                           </Box>
//                           <Box sx={{ color: G.muted, flexShrink: 0, ml: 0.5 }}>
//                             <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><polyline points="9 18 15 12 9 6" /></svg>
//                           </Box>
//                         </Box>
//                       )
//                     })
//                 )}

//                 {totalPages > 1 && (
//                   <Pagination
//                     count={totalPages}
//                     page={page}
//                     onChange={(e, val) => { setPage(val); fetchUsers(searchTerm) }}
//                     color="primary"
//                     sx={{ display: 'flex', justifyContent: 'center' }}
//                   />
//                 )}
//               </Stack>
//             </Slide>
//           )}
//         </Box>

//         <style>{`
//           @keyframes vfSlideUp {
//             from { opacity:0; transform:translateY(18px); }
//             to   { opacity:1; transform:translateY(0); }
//           }
//         `}</style>
//       </Box>
//     </ThemeProvider>
//   )
// }
"use client"

import React, { useEffect, useState } from 'react'
import { useUser } from '@/Contexts/UserContext'
import { useConstants } from '@/Contexts/ConstantsContext'
import { getAllUsers, scrolltoTopOFPage } from '@/Functions'
import { Slide } from '@material-ui/core'
import { Box, Typography, Alert, LinearProgress, Button, TextField, Stack, Pagination } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { adminTheme, G, FONTS, PAGE_SX } from '@/styles/admin-theme'
import { usePage } from '@/Contexts/PageContext'
import { useBottomNav } from '@/Contexts/BottomNavContext'
import { PersonAdd, Search as SearchIcon } from '@mui/icons-material'

export default function AdminUsersList() {
  const loggedInUser = useUser()
  const constants = useConstants()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const { setPage: setPageContext } = usePage()
  const loggedIn = loggedInUser?.status || false
  const adminRoles = ['director', 'ceo', 'Loan Admin', 'Accountant', 'Collateral Inspector']
  setPageContext('/admin/users')

  useEffect(() => {
    scrolltoTopOFPage()
    fetchUsers()
  }, [])

  const fetchUsers = async (query = '') => {
    setLoading(true); setError(null)
    try {
      const { users: fetchedUsers, totalPages: fetchedTotalPages } = await getAllUsers({ search: query, page, order: 'desc' })
      setUsers(fetchedUsers)
      setTotalPages(fetchedTotalPages || 1)
    } catch (err) {
      setError('Failed to fetch users.')
    } finally { setLoading(false) }
  }

  const handleSearch = async () => {
    if (!searchTerm.trim()) { fetchUsers(); return }
    setLoading(true); setError(null)
    try {
      const user = await getUserById(searchTerm.trim())
      setUsers(user && user.id ? [user] : [])
      setTotalPages(1)
      if (!user || !user.id) setError('User not found.')
    } catch (err) {
      setUsers([]); setError('User not found.')
    } finally { setLoading(false) }
  }

  if (loading) {
    return (
      <ThemeProvider theme={adminTheme}>
        <Box sx={{ minHeight: '100vh', background: G.page, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <LinearProgress sx={{ width: '80%', maxWidth: 400 }} />
        </Box>
      </ThemeProvider>
    )
  }

  if (!loggedIn) {
    return (
      <ThemeProvider theme={adminTheme}>
        <Box sx={{ minHeight: '100vh', background: G.page, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Stack spacing={2} alignItems="center">
            {typeof window !== 'undefined' ? (
              <>
                <Alert severity="warning">You are logged out, log in</Alert>
                <Button
                  variant="outlined"
                  onClick={() => {
                    const redirect = encodeURIComponent(window.location.href)
                    window.location.href = `/admin?redirectUrl=${redirect}`
                  }}
                  sx={{ color: G.green2, borderColor: G.greenBorder, borderRadius: '10px', textTransform: 'none', fontWeight: 600 }}
                >
                  Login to Proceed
                </Button>
              </>
            ) : null}
          </Stack>
        </Box>
      </ThemeProvider>
    )
  }

  if (error) {
    return (
      <ThemeProvider theme={adminTheme}>
        <Box sx={{ maxWidth: 500, mx: 'auto', mt: 8 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={adminTheme}>
      {/* Page ambient */}
      <Box sx={{ minHeight: '100vh', background: G.page, backgroundImage: `radial-gradient(ellipse 80% 45% at 50% -5%, rgba(16,185,129,0.11) 0%, transparent 65%)`, backgroundAttachment: 'fixed', pt: '72px', pb: '100px', position: 'relative', overflowX: 'hidden' }}>
        <Box sx={{ position: 'fixed', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.022) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none', zIndex: 0 }} />

        <Slide in={true} direction="up">
          <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 680, mx: 'auto', px: 2 }}>

            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3, animation: 'vfSlideUp 0.45s cubic-bezier(.22,1,.36,1)' }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <Box sx={{ width: 3, height: 16, borderRadius: 2, background: `linear-gradient(180deg, ${G.green1}, ${G.green3})` }} />
                  <Typography sx={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: G.muted }}>
                    Admin
                  </Typography>
                </Box>
                <Typography sx={{ fontFamily: FONTS.display, fontSize: '26px', fontWeight: 400, color: '#fff', lineHeight: 1.2 }}>
                  Clients
                </Typography>
              </Box>
              <Button
                variant="contained"
                onClick={() => { window.location = '/admin/users/add' }}
                startIcon={<PersonAdd />}
                sx={{
                  background: `linear-gradient(135deg, ${G.green1}, ${G.green2})`,
                  color: '#fff', fontWeight: 700, borderRadius: '10px', textTransform: 'none',
                  px: 2.5, py: 1, boxShadow: '0 4px 14px rgba(16,185,129,0.28)',
                }}
              >
                Add Client
              </Button>
            </Box>

            {/* Search */}
            <Box
              sx={{
                display: 'flex', gap: 1, mb: 3,
                background: 'rgba(255,255,255,0.04)', border: `1px solid ${G.border}`,
                borderRadius: '12px', p: '6px 6px 6px 14px', backdropFilter: 'blur(12px)',
              }}
            >
              <TextField
                placeholder="Search by ID or name…"
                variant="standard"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                InputProps={{
                  disableUnderline: true,
                  sx: { color: '#fff', fontFamily: FONTS.body, fontSize: '14px', flex: 1 }
                }}
                sx={{ flex: 1 }}
              />
              <Button
                variant="contained"
                onClick={handleSearch}
                size="small"
                sx={{
                  background: `linear-gradient(135deg, ${G.green1}, ${G.green2})`,
                  color: '#fff', fontWeight: 700, borderRadius: '8px', textTransform: 'none',
                  minWidth: 0, px: 2,
                }}
              >
                <SearchIcon fontSize="small" />
              </Button>
            </Box>

            {/* User list */}
            {users.length === 0 ? (
              <Alert severity="info">No users found.</Alert>
            ) : (
              <Stack spacing={1.5}>
                {users
                  .slice()
                  .sort((a, b) => b.id - a.id)
                  .map((user) => {
                    if (user.type && adminRoles.includes(user.type)) return null
                    const user_title = user.fullnames || 'No Name'
                    const initials = user_title.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
                    return (
                      <Box
                        key={user.id}
                        onClick={() => window.location = `/admin/users/${user.id}`}
                        sx={{
                          display: 'flex', alignItems: 'center', gap: 2,
                          p: '14px 16px',
                          background: 'rgba(255,255,255,0.04)',
                          border: `1px solid ${G.border}`,
                          borderRadius: '14px',
                          cursor: 'pointer',
                          backdropFilter: 'blur(12px)',
                          transition: 'all 0.2s',
                          '&:hover': {
                            background: 'rgba(16,185,129,0.07)',
                            borderColor: G.greenBorder,
                            transform: 'translateX(2px)',
                          },
                        }}
                      >
                        {/* Avatar */}
                        <Box sx={{
                          width: 42, height: 42, borderRadius: '12px', flexShrink: 0,
                          background: 'linear-gradient(135deg, rgba(16,185,129,0.20), rgba(5,150,105,0.07))',
                          border: `1.5px solid ${G.greenBorder}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          <Typography sx={{ fontFamily: FONTS.display, fontSize: '15px', color: G.green3 }}>{initials}</Typography>
                        </Box>

                        {/* Info */}
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography sx={{ color: '#fff', fontWeight: 600, fontSize: '14px', mb: 0.3 }}>{user_title}</Typography>
                          <Typography sx={{ color: G.muted, fontSize: '12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {user.username} · {user.email}
                          </Typography>
                        </Box>

                        {/* ID badge */}
                        <Box sx={{ flexShrink: 0, px: 1.5, py: 0.5, background: 'rgba(255,255,255,0.05)', border: `1px solid ${G.border}`, borderRadius: '8px' }}>
                          <Typography sx={{ fontFamily: FONTS.mono, fontSize: '11px', color: G.muted }}>#{user.id}</Typography>
                        </Box>

                        <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke={G.greenBorder} strokeWidth={2.2}>
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </Box>
                    )
                  })}
              </Stack>
            )}

            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(e, val) => { setPage(val); fetchUsers(searchTerm) }}
                  color="primary"
                />
              </Box>
            )}
          </Box>
        </Slide>
      </Box>

      <style>{`
        @keyframes vfSlideUp {
          from { opacity:0; transform:translateY(22px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>
    </ThemeProvider>
  )
}