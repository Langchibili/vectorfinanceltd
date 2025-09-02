"use client"

import { useEffect, useState } from 'react'
import { Slide } from '@material-ui/core'
import { Button, Stack, Alert, TextField, Pagination, LinearProgress } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useUser } from '@/Contexts/UserContext'
import { getAllLoans, getLoanFromId, scrolltoTopOFPage } from '@/Functions'
import PageSkeleton from '@/components/Includes/Loader/PageSkeleton'

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
      fetchLoans(1)
      return
    }

    setLoading(true)
    try {
      const loan = await getLoanFromId(searchTerm.trim())
      if (loan) {
        setLoans([loan])
        setTotalPages(1)
      } else {
        setLoans([])
      }
    } catch (err) {
      setError('Loan not found.')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'initiated':
      case 'pending-collateral-addition':
      case 'pending-collateral-inspection':
        return 'warning'
      case 'accepted':
      case 'disbursed':
        return 'info'
      case 'approved':
        return 'success'
      case 'completed':
        return 'secondary'
      case 'defaulted':
        return 'error'
      default:
        return 'inherit'
    }
  }

  const getStatusTitle = (status) => {
    if (status === "pending-approval") {
        return 'pending-final-editions'
    }
    return status
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
        <LinearProgress color='secondary'/> 
        <PageSkeleton title="Loading loan..." loading={true}/>
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
      <div style={{ maxWidth: 500, margin: '50px auto' }}>
        <Alert severity="error">{error}</Alert>
      </div>
    )
  }

  return (
    <Slide in={true} direction="up">
      <div
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, rgb(188 200 197), rgb(252 252 252))',
          padding: '2rem',
          marginTop: '30px'
        }}
      >
        <Stack spacing={2}>
        <Stack direction="row" spacing={1} sx={{ mb: 3, width: '100%', maxWidth: 500 }}>
        <TextField
            label="Search Loan by ID"
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
                borderBottom: 'none',  // removes underline / strike
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
            }}
        >
            Search
        </Button>
        </Stack>
          {loans.map((loanData) => {
             const loan = loanData.hasOwnProperty('attributes')? loanData.attributes : loanData
             return (
                <Button
                    key={loanData.id}
                    variant="outlined"
                    color={getStatusColor(loan.loanStatus)}
                    // onClick={() => router.push(`/admin/loans/${loanData.id}`)}
                    onClick={() =>  { 
                        window.location = `/admin/loans/${loanData.id}`
                    }}
                    sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
                >
                    #{loanData.id} K{loan.loanAmount} — {getStatusTitle(loan.loanStatus)}
                </Button>
            )
          })}

          {totalPages > 1 && (
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, val) => setPage(val)}
              color="primary"
              sx={{ mt: 2 }}
            />
          )}
        </Stack>
      </div>
    </Slide>
  )
}
