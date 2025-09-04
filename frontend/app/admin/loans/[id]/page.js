"use client"

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useUser } from '@/Contexts/UserContext'
import { useConstants } from '@/Contexts/ConstantsContext'
import { getLoanFromId, scrolltoTopOFPage } from '@/Functions'
import { Box, Typography, Alert, Paper, LinearProgress, Button } from '@mui/material'
import LoanActions from '@/components/Includes/AdminComponents/LoanActions'
import ClientDetails from '@/components/Includes/AdminComponents/ClientDetails'
import LoanDetails from '@/components/Includes/AdminComponents/LoanDetails'
import { usePage } from '@/Contexts/PageContext'
import { useBottomNav } from '@/Contexts/BottomNavContext'
import { Slide } from '@material-ui/core'
import CollateralValueForm from '@/components/Includes/AdminComponents/CollateralValueForm'
import OfferAmountForm from '@/components/Includes/AdminComponents/OfferAmountForm'
import ActionOverview from '@/components/Includes/AdminComponents/ActionOverview '
import AppendixForm from '@/components/Includes/AdminComponents/AppendixForm'
import PageSkeleton from '@/components/Includes/Loader/PageSkeleton'
import { Stack } from '@mui/system'
import OfferDecision from '@/components/Includes/AdminComponents/OfferDecision'
import ChangeLoanAmount from '@/components/Includes/AdminComponents/ChangeLoanAmount'

export default function LoanDetailPage() {
  const { id } = useParams()
  const loggedInUser = useUser()
  const constants = useConstants()
  const [loan, setLoan] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { setPage } = usePage()
  const {BottomNavLink} = useBottomNav()
  const user = loggedInUser?.user || null
  const loggedIn = loggedInUser?.status || false
  setPage('/admins/loans')
  
  // populate string for the loan
  const POPULATE = "loanType,loanAgreementDocuments,disbursementPOP,collateral,collateral.vehicle,collateral.land,collateral.house,collateral.CollateralMedia,client,client.details,client.bankDetails,client.currentLoan"  
  // Allowed roles
  const allowedRoles = ['director', 'ceo', 'Loan Admin', 'Collateral Inspector']

  useEffect(() => {
    scrolltoTopOFPage()
    if (!allowedRoles.includes(user?.type)) { 
      setError('Forbidden access: You do not have permission to view this page.')
      setLoading(false)
      return
    }

    async function fetchLoan() {
      try {
        const data = await getLoanFromId(id,POPULATE)
        setLoan(data)
      } catch (err) {
        setError('Failed to fetch loan details.')
      } finally {
        setLoading(false)
      }
    }

    fetchLoan()
  }, [id, user])
  // refreshLoan: accepts optional updatedLoan (from onUpdated) else fetches from API
  const refreshLoan = async (updatedLoan = null) => {
    // quick path: parent or child already has updated loan object
    if (updatedLoan) {
      setLoan(updatedLoan)
      setError(null)
      return
    }

    setLoading(true)
    setError(null)
    try {
      const data = await getLoanFromId(id, POPULATE)
      if (!data) {
        setError('Loan not found')
        setLoan(null)
      } else {
        // your getLoanFromId returns a populated attributes object (as you showed)
        setLoan(data)
      }
    } catch (err) {
      console.error('refreshLoan error', err)
      setError('Failed to load loan')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!id) return
    refreshLoan()
  }, [id])

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
      <Box sx={{ maxWidth: 500, mx: 'auto', mt: 5 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    )
  }

  if (!loan) {
    return (
      <Box sx={{ maxWidth: 500, mx: 'auto', mt: 5 }}>
        <Alert severity="warning">Loan not found.</Alert>
      </Box>
    )
  }
  if(parseInt(BottomNavLink) === 0){
          return (
            <div className="page-content">
                <Slide in={true} direction="right">
                    <LoanDetails loan={loan} role={user.type} onUpdated={refreshLoan} constants={constants}/>
                </Slide>
            </div>
           
          )
        }
    else if(parseInt(BottomNavLink) === 1){
        return (
            <div className="page-content">
                <Slide in={true} direction="left">
                        <ClientDetails loan={loan} role={user.type} constants={constants}/>
                </Slide>
            </div>
        )
    }
    else{
        return (
            <div className="page-content">
                 <Slide in={true} direction="left">
                    <div>
                        {/* <LoanActions loan={loan} role={user.type} onUpdated={refreshLoan} /> */}
                        <ActionOverview
                            loan={loan}
                            role={user.type}
                            constants={constants}
                            ActionDisplay = {()=> { 
                                return (
                                    <Stack spacing={2} sx={{ maxWidth: 400, mx: 'auto', my: 2 }}>
                                        {user.type === "Collateral Inspector"? null : <LoanActions loan={loan} role={user.type} onUpdated={refreshLoan} constants={constants}/>}
                                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                            
                                            <CollateralValueForm loan={loan} role={user.type} onUpdated={refreshLoan} constants={constants}/>
                                            <OfferAmountForm loan={loan} role={user.type} onUpdated={refreshLoan} constants={constants}/>
                                            <ChangeLoanAmount loan={loan} role={user.type} onUpdated={refreshLoan} constants={constants}/>
                                            {user.type === "Loan Admin" && loan.loanStatus === "request-approval" && (loan.newLoanAmountOffer > 0 && loan.newLoanAmountOffer !== loan.loanAmount)? (
                                                <OfferDecision
                                                    loan={loan}
                                                    offeredAmount={loan.newLoanAmountOffer}
                                                    role={user.type}
                                                    onAccepted={refreshLoan}
                                                    onDeclined={refreshLoan}
                                                    constants={constants}
                                                />
                                            ) : null}
                                        </Box>
                                    </Stack>
                                    
                                )
                            } }
                            onUpdated={refreshLoan}
                            onOpenCollateralForm={() => setShowCollateralForm(true)}
                            onOpenOfferForm={() => setShowOfferForm(true)}
                        />
                        
                    </div>
                </Slide>
            </div>
        )
    }
}