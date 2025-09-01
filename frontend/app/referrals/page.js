'use client'

import { usePage } from '@/Contexts/PageContext'
import { useBottomNav } from '@/Contexts/BottomNavContext'
import { scrolltoTopOFPage } from '@/Functions'
import ReferralEarningsPage from '@/components/Includes/Referrals/ReferralEarningsPage'
import ReferralAccountPage from '@/components/Includes/Referrals/ReferralAccountPage'
import ReferralHomePage from '@/components/Includes/Referrals/ReferralHomePage'
import { useUser } from '@/Contexts/UserContext'
import { Slide } from '@material-ui/core'
import { Stack, Alert } from '@mui/material'

export default function Referrals() {
  const { setPage } = usePage()
  const { BottomNavLink } = useBottomNav()
  const loggedInUser  = useUser()
  const loggedIn = loggedInUser?.status || false

  setPage('/referrals')
  scrolltoTopOFPage()


  const renderPages = (BottomNavLink)=>{
     if(!loggedInUser.status){
        if(typeof window !== "undefined"){
          window.location = "/signin"
        }
      }
      else{
        if(parseInt(BottomNavLink) === 0){
          return (
            <div className="page-content">
            <div className="container-fluid">
                <ReferralEarningsPage loggedInUser={loggedInUser.user}/>
            </div>
            </div>
          )
        }
        else if(parseInt(BottomNavLink) === 1){
          return (
            <div className="page-content">
                <div className="container-fluid">
                 <ReferralHomePage loggedInUser={loggedInUser.user}/>
                </div>
            </div>
          )
        }
        else{
          return (
            <div className="page-content">
            <div className="container-fluid">
              <ReferralAccountPage loggedInUser={loggedInUser.user}/>
            </div>
          </div>
          )
        }
      }
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
        <div
            style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, rgb(188 200 197), rgb(252 252 252))',
            marginTop: '30px'
            }}
        >
            {renderPages(BottomNavLink)}
        </div>
        </Slide>
  )
}