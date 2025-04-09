'use client'

import { usePage } from '@/Contexts/PageContext'
import { useUser } from '@/Contexts/UserContext'
import { scrolltoTopOFPage, updateUserAccount } from '@/Functions'
import { Slide, Button, Stack, Alert } from '@mui/material'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Loans() {
  const loggedInUser = useUser()
  const { setPage } = usePage()
  const router = useRouter()  // the router stuff
  const loans = loggedInUser.user?.loans || []
  const currentLoan = loggedInUser.user?.currentLoan || []
  const [currentLoanId, setCurrentLoanId] = useState(null)

  setPage('/loans')
  scrolltoTopOFPage()

  useEffect(() => {
    console.log('currentLoanId',currentLoanId)
    const runUpdateCurrentLoan = async ()=>{
        if(loggedInUser && loggedInUser.user){
            if(!loggedInUser.user.loans){
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
              #{loan.id} K{loan.loanAmount} - {loan.loanStatus}
            </Button>
          ))}
        </Stack>
      </div>
    </Slide>
  )
}
