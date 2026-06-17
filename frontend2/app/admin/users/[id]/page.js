'use client'

import { useEffect, useState } from "react"
import { useUser } from '@/Contexts/UserContext'
import { getUserById, scrolltoTopOFPage } from "@/Functions"
import { useConstants } from "@/Contexts/ConstantsContext"
import ClientDetails from "@/components/Includes/AdminComponents/ClientDetails"
import { useParams } from "next/navigation"
import { api_url } from "@/Constants"
import Snackbar from "@mui/material/Snackbar"
import MuiAlert from "@mui/material/Alert"
import { Button, Box, LinearProgress, Alert, Stack } from "@mui/material"

export default function AdminUserDetailsPage() {
  const loggedInUser = useUser()
  const constants = useConstants()
  const [client, setClient] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const loggedIn = loggedInUser?.status || false
  const adminRoles = ['director', 'ceo', 'Loan Admin', 'Accountant']
  const user = loggedInUser?.user || null
  const { id } = useParams()
  const [forgotMessage, setForgotMessage] = useState("")
  const [serverError, setServerError] = useState("")
  const [snackOpen, setSnackOpen] = useState(false)
  const [snackSeverity, setSnackSeverity] = useState("success")
  const [sending, setSending] = useState(false)

  useEffect(() => {
    scrolltoTopOFPage()
  }, [])

  useEffect(() => {
    async function fetchUser() {
      setLoading(true)
      setError(null)
      try {
        const populate = [
          // ── Personal details & bank ──────────────────────────────────
          'details',
          'bankDetails',

          // ── KYC / identity (with media) ─────────────────────────────
          'clientDetails',
          'clientDetails.IDfront',
          'clientDetails.IDback',

          // ── Salary & employment evidence ─────────────────────────────
          'salary',
          'salary.paySlip',
          'salary.bankStatement',
          'salary.verificationVideo',

          // ── Business & PACRA printout ────────────────────────────────
          'business',
          'business.pacraPrintOut',

          // ── Signatures / initials (media, single file each) ──────────
          'signature',
          'initials',
          'witnessSignature',
          'witnessInitials',

          // ── Signed documents & profile picture ──────────────────────
          'signedDocuments',
          'profilePicture',

          // ── Loan relations (for badge & history) ────────────────────
          'currentLoan',
          'loans',
        ].join(',')
        const fetchedUser = await getUserById(id, populate)
        if (!fetchedUser) {
          setError("User not found.")
        } else {
          setClient(fetchedUser)
        }
      } catch (err) {
        setError("Failed to fetch user details.")
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchUser()
  }, [id])

  const handleForgotPassword = async () => {
    setSending(true)
    setSnackOpen(false)
    try {
      const email = client?.email
      const response = await fetch(`${api_url}/password-resets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: { email } }),
      })
      const data = await response.json()
      if (data && data.data) {
        setForgotMessage("A forget password link has been sent to the client email")
        setSnackSeverity("success")
        setSnackOpen(true)
      } else {
        setServerError("Failed to send reset link. Please try again in a few minutes.")
        setSnackSeverity("error")
        setSnackOpen(true)
      }
    } catch (err) {
      console.error(err)
      setServerError("Failed to send reset link. Please try again and ensure to input the correct email.")
      setSnackSeverity("error")
      setSnackOpen(true)
    } finally {
      setSending(false)
    }
  }

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") return
    setSnackOpen(false)
  }

  // Admin authentication UI
  if (!loggedIn || !adminRoles.includes(user?.type)) {
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

  if (loading) {
    return (
      <Box sx={{ maxWidth: 500, mx: 'auto', mt: 5 }}>
        <LinearProgress color="secondary" />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: 500, mx: 'auto', mt: 5 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    )
  }

  return (
    <>
      <ClientDetails
        user={client}
        role={user.type}
        constants={constants}
        adminActions={() => (
          <Button
            color="warning"
            variant="contained"
            onClick={handleForgotPassword}
            disabled={sending}
            size="small"
          >
            {sending ? "Sending..." : "Send Password Reset"}
          </Button>
        )}
      />
      <Snackbar open={snackOpen} autoHideDuration={4000} onClose={handleCloseSnack}>
        <MuiAlert onClose={handleCloseSnack} severity={snackSeverity} sx={{ width: '100%' }}>
          {snackSeverity === "success" ? forgotMessage : serverError}
        </MuiAlert>
      </Snackbar>
    </>
  )
}