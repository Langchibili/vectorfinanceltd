'use client'

import { usePage } from '@/Contexts/PageContext'
import { useUser } from '@/Contexts/UserContext'
import { getLoansFromClientId, scrolltoTopOFPage, updateUserAccount } from '@/Functions'
import { Slide } from '@material-ui/core'
import { Button, Stack, Alert } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Loans() {
  const loggedInUser = useUser()
  const { setPage } = usePage()
  const router = useRouter()  // the router stuff
  const currentLoan = loggedInUser.user?.currentLoan || []
  const [loans,setLoans] = useState([])
  const [currentLoanId, setCurrentLoanId] = useState(null)
  const loggedIn = loggedInUser?.status || false

  setPage('/loans')
  scrolltoTopOFPage()
/* comprehenive insurance(third party compesants only the victim | letter of sale), mou with african grey */
  
  useEffect(()=>{
    const runGetLoans = async () =>{
          const loans = await getLoansFromClientId(loggedInUser.user.id)
          console.log('loans',loggedInUser.user.id)
          setLoans(loans)
    }
   runGetLoans()
  },[loggedInUser.user])

  useEffect(() => {
    const runUpdateCurrentLoan = async ()=>{
        if(loggedInUser && loggedInUser.user){
         if(!loggedInUser.user){
                window.location = '/'
                //router.push('/?reflesh')
            }
            const userUpdateObject = currentLoanId === "new"? { currentLoan: {disconnect: [currentLoan.id]} } : { currentLoan: {connect: [currentLoanId]} }
            const updatedUserAccount = await updateUserAccount(userUpdateObject,loggedInUser.user.id)
            if(!updatedUserAccount.hasOwnProperty('error')){
                window.location = '/'
                //router.push('/?reflesh')
            }
        }
        else{
           return <Alert severity='error'>Something went wrong. Please check your internent connection and retry.</Alert>
        }
    }
    runUpdateCurrentLoan()
  }, [currentLoanId])

  const getStatusColor = (status) => {
    switch (status) {
      case 'initiated':
        return 'warning'
      case 'pending-collateral-addition':
        return 'warning'
      case 'pending-collateral-inspection':
        return 'warning'
      case 'accepted':
        return 'info'
      case 'approved':
      case 'pending-approval':
        return 'success'
      case 'disbursed':
        return 'info'
      case 'completed':
        return 'secondary'
      case 'defaulted':
        return 'error'
      default:
        return 'inherit'
    }
  }

  const getStatusTitle = (status) => {
    if (status === "approved" || status === "pending-approval") {
        return 'processing'
    }
    return status
  }

   if (!loggedIn) {
        return (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <Stack spacing={2} alignItems="center">
              <Alert severity="warning">You are logged out, log in</Alert>
      
              {typeof window !== 'undefined' ? (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    window.location.href = `/signup`
                  }}
                >
                  Login to Proceed
                </Button>
              ) : null}
            </Stack>
          </div>
        )
    }

  return (
    <Slide in={true} direction="up">
      <div style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, rgb(188 200 197), rgb(252 252 252))',
          padding: '2rem',
          marginTop:'30px'
        }}>
        <Stack spacing={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setCurrentLoanId('new')}
          >
            Apply for a new Loan
          </Button>

          {loans.map((loan) => (
            <Button
              key={loan.id}
              variant={currentLoanId === loan.id ? 'contained' : 'outlined'}
              color={getStatusColor(loan.loanStatus)}
              onClick={() => setCurrentLoanId(loan.id)}
              sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
            >
              #{loan.id} K{loan.loanAmount} - {getStatusTitle(loan.loanStatus)}
            </Button>
          ))}
        </Stack>
      </div>
    </Slide>
  )
}
