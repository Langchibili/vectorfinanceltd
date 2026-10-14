"use client"

import { useEffect, useState } from 'react'
import { Slide } from '@material-ui/core'
import { Button, Stack, Alert, TextField, Pagination, LinearProgress, InputAdornment } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { useRouter } from 'next/navigation'
import { useUser } from '@/Contexts/UserContext'
import { getAllLoans, getLoanFromId, scrolltoTopOFPage } from '@/Functions'
import PageSkeleton from '@/components/Includes/Loader/PageSkeleton'
import { adminTheme, G, FONTS, pillSx, statusColor, PAGE_SX } from '@/styles/admin-theme'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import SearchIcon from '@mui/icons-material/Search'

export default function AdminLoansList() {
  const loggedInUser = useUser()
  const router = useRouter()
  const [loans, setLoans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const rowsPerPage = 10
  const user = loggedInUser?.user || null
  const loggedIn = loggedInUser?.status || false
  const allowedRoles = ['director', 'ceo', 'Loan Admin', 'Collateral Inspector']

  useEffect(() => {
    scrolltoTopOFPage()
    if (!allowedRoles.includes(user?.type)) {
      setError('Forbidden access: You do not have permission to view this page.')
      setLoading(false)
      return
    }
    fetchLoans(page)
  }, [user, page])

  const fetchLoans = async (currentPage) => {
    try {
      setLoading(true)
      const { data, meta } = await getAllLoans(currentPage, rowsPerPage)
      setLoans(data)
      setTotalPages(meta.pageCount)
    } catch (err) {
      setError('Failed to fetch loans.')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      fetchLoans(1); return
    }
    setLoading(true)
    try {
      const loan = await getLoanFromId(searchTerm.trim())
      if (loan) {
        setLoans([loan]); setTotalPages(1)
      } else {
        setLoans([])
      }
    } catch (err) {
      setError('Loan not found.')
    } finally {
      setLoading(false)
    }
  }

  const getStatusTitle = (status) => {
    if (status === "pending-approval") return 'pending-final-editions'
    return status
  }

  return (
    <ThemeProvider theme={adminTheme}>
      <Box sx={{
        ...PAGE_SX,
        pt: '88px',
      }}>
        {/* Ambient */}
        <Box sx={{ position: 'fixed', inset: 0, background: `radial-gradient(ellipse 80% 45% at 50% -5%, rgba(16,185,129,0.10) 0%, transparent 65%)`, pointerEvents: 'none', zIndex: 0 }} />
        <Box sx={{ position: 'fixed', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.022) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none', zIndex: 0 }} />

        <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 640, mx: 'auto', px: 2 }}>

          {/* Header */}
          <Box sx={{ mb: 3, animation: 'vfSlideUp 0.4s cubic-bezier(.22,1,.36,1)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
              <Box sx={{ width: 3, height: 18, borderRadius: 1, background: `linear-gradient(180deg, ${G.green1}, ${G.green3})` }} />
              <Typography sx={{ fontFamily: FONTS.display, fontSize: '24px', color: '#fff', fontWeight: 400 }}>
                Loan Applications
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ pl: '19px' }}>
              View and manage all active loan records
            </Typography>
          </Box>

          {/* Loading */}
          {loading && (
            <Box>
              <LinearProgress color="primary" />
              <PageSkeleton title="Loading loans…" loading={true} />
            </Box>
          )}

          {/* Not logged in */}
          {!loggedIn && !loading && (
            <Box sx={{
              p: 3, borderRadius: '16px',
              background: 'rgba(251,191,36,0.07)',
              border: '1px solid rgba(251,191,36,0.22)',
              textAlign: 'center',
            }}>
              <Alert severity="warning" sx={{ mb: 2 }}>You are logged out, log in to continue</Alert>
              {typeof window !== 'undefined' && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    const redirect = encodeURIComponent(window.location.href)
                    window.location.href = `/admin?redirectUrl=${redirect}`
                  }}
                >
                  Login to Proceed
                </Button>
              )}
            </Box>
          )}

          {/* Error */}
          {error && !loading && (
            <Alert severity="error">{error}</Alert>
          )}

          {/* Content */}
          {!loading && !error && loggedIn && (
            <Slide in={true} direction="up">
              <Stack spacing={2}>
                {/* Search bar */}
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    label="Search by Loan ID"
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSearch()}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ fontSize: 18, color: G.muted }} />
                        </InputAdornment>
                      )
                    }}
                    sx={{ flex: 1 }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSearch}
                    sx={{ px: 3, borderRadius: '10px', flexShrink: 0 }}
                  >
                    Search
                  </Button>
                </Box>

                {/* Loan list */}
                {loans.map(loanData => {
                  const loan = loanData.hasOwnProperty('attributes') ? loanData.attributes : loanData
                  const sc = statusColor(loan.loanStatus)
                  return (
                    <Box
                      key={loanData.id}
                      onClick={() => { window.location = `/admin/loans/${loanData.id}` }}
                      sx={{
                        display: 'flex', alignItems: 'center', gap: 2,
                        p: '14px 18px',
                        borderRadius: '14px',
                        background: 'rgba(255,255,255,0.04)',
                        border: `1px solid rgba(255,255,255,0.08)`,
                        cursor: 'pointer',
                        transition: 'all 0.18s',
                        backdropFilter: 'blur(8px)',
                        '&:hover': {
                          background: 'rgba(255,255,255,0.07)',
                          borderColor: `${sc}35`,
                          transform: 'translateX(2px)',
                        },
                      }}
                    >
                      {/* Status accent bar */}
                      <Box sx={{ width: 4, height: 36, borderRadius: 2, flexShrink: 0, background: sc }} />

                      {/* Loan info */}
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.25 }}>
                          <Typography sx={{ fontFamily: FONTS.mono, fontSize: '12px', color: G.muted, fontWeight: 600 }}>
                            #{loanData.id}
                          </Typography>
                        </Box>
                        <Typography sx={{ fontFamily: FONTS.mono, fontSize: '16px', fontWeight: 700, color: G.green2 }}>
                          K{loan.loanAmount}
                        </Typography>
                      </Box>

                      {/* Status pill */}
                      <Box component="span" sx={pillSx(loan.loanStatus)}>
                        {getStatusTitle(loan.loanStatus)}
                      </Box>

                      {/* Chevron */}
                      <Box sx={{ color: G.muted, flexShrink: 0 }}>
                        <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><polyline points="9 18 15 12 9 6" /></svg>
                      </Box>
                    </Box>
                  )
                })}

                {loans.length === 0 && (
                  <Box sx={{ textAlign: 'center', py: 6, color: G.muted }}>
                    <Typography sx={{ fontSize: '14px', fontFamily: FONTS.body }}>No loans found</Typography>
                  </Box>
                )}

                {totalPages > 1 && (
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(e, val) => setPage(val)}
                    color="primary"
                    sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}
                  />
                )}
              </Stack>
            </Slide>
          )}
        </Box>

        <style>{`
          @keyframes vfSlideUp {
            from { opacity:0; transform:translateY(18px); }
            to   { opacity:1; transform:translateY(0); }
          }
        `}</style>
      </Box>
    </ThemeProvider>
  )
}