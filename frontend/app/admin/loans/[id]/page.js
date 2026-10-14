"use client"

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useUser } from '@/Contexts/UserContext'
import { useConstants } from '@/Contexts/ConstantsContext'
import { getLoanFromId, scrolltoTopOFPage } from '@/Functions'
import { Alert, LinearProgress, Button } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
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
import OfferDecision from '@/components/Includes/AdminComponents/OfferDecision'
import ChangeLoanAmount from '@/components/Includes/AdminComponents/ChangeLoanAmount'
import { adminTheme, G, FONTS, PAGE_SX, pillSx } from '@/styles/admin-theme'

export default function LoanDetailPage() {
  const { id } = useParams()
  const loggedInUser = useUser()
  const constants = useConstants()
  const [loan, setLoan] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { setPage } = usePage()
  const { BottomNavLink } = useBottomNav()
  const user = loggedInUser?.user || null
  const loggedIn = loggedInUser?.status || false
  setPage('/admins/loans')

  const POPULATE = [
    // ── Loan type ───────────────────────────────────────────────
    "loanType",

    // ── Loan documents & proof ───────────────────────────────────
    "loanAgreementDocuments",
    "disbursementPOP",

    // ── Collateral ───────────────────────────────────────────────
    "collateral",
    "collateral.vehicle",
    "collateral.vehicle.sessionLetterTemplate",
    "collateral.vehicle.sessionLetter",
    "collateral.land",
    "collateral.house",
    "collateral.CollateralMedia",

    // ── Client: top-level fields ─────────────────────────────────
    "client",
    "client.details",
    "client.bankDetails",
    "client.clientDetails",           // KYC, ID type, IDfront, IDback, employment status
    "client.clientDetails.IDfront",
    "client.clientDetails.IDback",

    // ── Client: current loan (for the summary card) ──────────────
    "client.currentLoan",

    // ── Client: salary & all its media ──────────────────────────
    "client.salary",
    "client.salary.paySlip",
    "client.salary.bankStatement",
    "client.salary.verificationVideo",

    // ── Client: business & PACRA docs ───────────────────────────
    "client.business",
    "client.business.pacraPrintOut",

    // ── Client: signatures & initials ───────────────────────────
    "client.signature",
    "client.initials",
    "client.witnessSignature",
    "client.witnessInitials",

    // ── Client: signed documents ─────────────────────────────────
    "client.signedDocuments",

    // ── Client: profile picture ──────────────────────────────────
    "client.profilePicture",

  ].join(",")
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
        const data = await getLoanFromId(id, POPULATE)
        setLoan(data)
      } catch (err) {
        setError('Failed to fetch loan details.')
      } finally {
        setLoading(false)
      }
    }
    fetchLoan()
  }, [id, user])

  const refreshLoan = async (updatedLoan = null) => {
    if (updatedLoan) { setLoan(updatedLoan); setError(null); return }
    setLoading(true)
    setError(null)
    try {
      const data = await getLoanFromId(id, POPULATE)
      if (!data) { setError('Loan not found'); setLoan(null) }
      else setLoan(data)
    } catch (err) {
      setError('Failed to load loan')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!id) return
    refreshLoan()
  }, [id])

  return (
    <ThemeProvider theme={adminTheme}>
      <Box sx={{
        ...PAGE_SX,
        pt: { xs: '72px', md: '80px' },
      }}>
        {/* Ambient glow */}
        <Box sx={{ position: 'fixed', inset: 0, background: `radial-gradient(ellipse 80% 45% at 50% -5%, rgba(16,185,129,0.09) 0%, transparent 65%)`, pointerEvents: 'none', zIndex: 0 }} />
        <Box sx={{ position: 'fixed', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.022) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none', zIndex: 0 }} />

        <Box sx={{ position: 'relative', zIndex: 1 }}>

          {/* ── Loading ── */}
          {loading && (
            <Box sx={{ maxWidth: 640, mx: 'auto', px: 2, pt: 2 }}>
              <LinearProgress color="primary" sx={{ mb: 2 }} />
              <PageSkeleton title="Loading loan…" loading={true} />
            </Box>
          )}

          {/* ── Not logged in ── */}
          {!loggedIn && !loading && (
            <Box sx={{ maxWidth: 420, mx: 'auto', px: 2, pt: 4, textAlign: 'center' }}>
              <Alert severity="warning" sx={{ mb: 2 }}>You are logged out, log in to continue</Alert>
              {typeof window !== 'undefined' && (
                <Button variant="contained" color="primary" onClick={() => {
                  const redirect = encodeURIComponent(window.location.href)
                  window.location.href = `/admin?redirectUrl=${redirect}`
                }}>
                  Login to Proceed
                </Button>
              )}
            </Box>
          )}

          {/* ── Error ── */}
          {error && !loading && (
            <Box sx={{ maxWidth: 500, mx: 'auto', px: 2, pt: 4 }}>
              <Alert severity="error">{error}</Alert>
            </Box>
          )}

          {/* ── No loan ── */}
          {!loan && !loading && !error && (
            <Box sx={{ maxWidth: 500, mx: 'auto', px: 2, pt: 4 }}>
              <Alert severity="warning">Loan not found.</Alert>
            </Box>
          )}

          {/* ── Content ── */}
          {loan && !loading && (
            <>
              {/* Loan summary header strip */}
              <Box sx={{
                position: 'sticky', top: 0, zIndex: 10,
                background: 'rgba(10,15,30,0.88)',
                backdropFilter: 'blur(20px)',
                borderBottom: `1px solid rgba(255,255,255,0.07)`,
                px: 2, py: 1.25,
                display: 'flex', alignItems: 'center', gap: 2,
              }}>
                <Button
                  size="small"
                  onClick={() => window.location = '/admin/loans'}
                  sx={{
                    color: G.muted, minWidth: 0, p: 0.75,
                    '&:hover': { color: '#fff', background: 'transparent' },
                  }}
                >
                  <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><polyline points="15 18 9 12 15 6" /></svg>
                </Button>
                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}>
                  <Typography sx={{ fontFamily: FONTS.mono, fontSize: '12px', color: G.muted }}>
                    #{id}
                  </Typography>
                  <Typography sx={{ fontFamily: FONTS.mono, fontSize: '15px', fontWeight: 700, color: G.green2 }}>
                    K{loan.loanAmount}
                  </Typography>
                  <Box component="span" sx={pillSx(loan.loanStatus)}>
                    {loan.loanStatus}
                  </Box>
                </Box>
              </Box>

              {/* Tab pages */}
              {parseInt(BottomNavLink) === 0 && (
                <Slide in={true} direction="right">
                  <Box className="page-content">
                    <LoanDetails loan={loan} role={user.type} onUpdated={refreshLoan} constants={constants} />
                  </Box>
                </Slide>
              )}

              {parseInt(BottomNavLink) === 1 && (
                <Slide in={true} direction="left">
                  <Box className="page-content">
                    <ClientDetails loan={loan} role={user.type} constants={constants} />
                  </Box>
                </Slide>
              )}

              {(parseInt(BottomNavLink) !== 0 && parseInt(BottomNavLink) !== 1) && (
                <Slide in={true} direction="left">
                  <Box className="page-content">
                    <ActionOverview
                      loan={loan}
                      role={user.type}
                      constants={constants}
                      ActionDisplay={() => (
                        <Stack spacing={2} sx={{ maxWidth: 440, mx: 'auto', my: 2 }}>
                          {user.type !== "Collateral Inspector" && (
                            <LoanActions loan={loan} role={user.type} onUpdated={refreshLoan} constants={constants} />
                          )}
                          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            <CollateralValueForm loan={loan} role={user.type} onUpdated={refreshLoan} constants={constants} />
                            <OfferAmountForm loan={loan} role={user.type} onUpdated={refreshLoan} constants={constants} />
                            <ChangeLoanAmount loan={loan} role={user.type} onUpdated={refreshLoan} constants={constants} />
                            {user.type === "Loan Admin" && loan.loanStatus === "request-approval" && (loan.newLoanAmountOffer > 0 && loan.newLoanAmountOffer !== loan.loanAmount) && (
                              <OfferDecision
                                loan={loan}
                                offeredAmount={loan.newLoanAmountOffer}
                                role={user.type}
                                onAccepted={refreshLoan}
                                onDeclined={refreshLoan}
                                constants={constants}
                              />
                            )}
                          </Box>
                        </Stack>
                      )}
                      onUpdated={refreshLoan}
                      onOpenCollateralForm={() => setShowCollateralForm(true)}
                      onOpenOfferForm={() => setShowOfferForm(true)}
                    />
                  </Box>
                </Slide>
              )}
            </>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  )
}