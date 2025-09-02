import React from 'react'
import Signature from './Signature'
import Initials  from './Initials'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { ArrowLeft } from '@material-ui/icons'
import { api_url } from '@/Constants'
import { saveJwt } from '@/Secrets'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/navigation'
import { useNavigation } from 'react-router-dom'

export default class AdminHome extends React.Component {
  state = {
    step: 1,
    role: '',
    password: '',
    choice: '',
    loading: false,
    snackOpen: false,
    snackMessage: '',
    snackSeverity: 'error'
  }

  componentDidMount() {
    // if the parent passed a loggedInUser, persist its type/id for other admin pages
    const incoming = this.props.loggedInUser
    if (incoming && Object.keys(incoming).length > 0) {
      const userObj = incoming.user || incoming
      const adminType = userObj?.type || userObj?.userType || ''
      const adminId = userObj?.id || userObj?.user?.id || ''
      if (adminType) {
        localStorage.setItem('admin_user_type', adminType)
      }
      if (adminId) {
        localStorage.setItem('admin_user_id', String(adminId))
      }
    }
    if(incoming && incoming.type !== "client"){
      this.setState({
        step: 2
      })
    }
  }

  // ... your existing handlers unchanged (handleChange, showSnackbar, handleSnackClose, handleLogin, handleChoice, handleBack)

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  showSnackbar = (message, severity = 'info') => {
    this.setState({
      snackOpen: true,
      snackMessage: message,
      snackSeverity: severity
    })
  }

  handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') return
    this.setState({ snackOpen: false })
  }

  handleLogin = async e => {
    e.preventDefault()
    this.setState({ loading: true })

    const { role, password } = this.state
    const requestObject = {
      identifier: role.toLowerCase(),
      password
    }

    try {
      const res = await fetch(api_url + '/auth/local', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestObject)
      })
      const data = await res.json()

      if (data.error) {
        this.showSnackbar(data.error.message, 'error')
        this.setState({ loading: false })
        return
      }

      saveJwt(data.jwt)
      // persist role and user info for admin pages
      localStorage.setItem('admin_role', role)
      localStorage.setItem('admin_user_id', data.user?.id || '')
      const userType = data.user?.type || data.user?.userType || ''
      if (userType) { 
        localStorage.setItem('admin_user_type', userType) 
        const redirectUrl = this.props.redirectUrl
        if(redirectUrl){
          window.location = redirectUrl
        }
      }

      this.showSnackbar('Login successful!', 'success')
      this.setState({ loading: false, step: 2 })
    } catch (err) {
      console.error('Login error:', err)
      this.showSnackbar('Something went wrong. Please try again.', 'error')
      this.setState({ loading: false })
    }
  }

  handleChoice = choice => {
    this.setState({ choice, step: 3 })
  }

  handleBack = () => {
    this.setState(({ step }) => ({ step: step - 1 }))
  }

  renderForbidden = () => {
    return (
      <div className="container py-5" style={{ marginTop: '10px' }}>
        <div className="card mx-auto" style={{ maxWidth: 600 }}>
          <div className="card-body text-center">
            <Typography variant="h5" sx={{ mb: 1 }}>Access forbidden</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Your account does not have permission to access the admin area.
              If you believe this is an error contact an administrator.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button variant="contained" onClick={() => window.location.replace('/')}>Home</Button>
              <Button variant="outlined" onClick={() => window.location.replace('/logout?ref=admin')}>Admin login</Button>
            </Box>
          </div>
        </div>
      </div>
    )
  }

  render() {
    // check incoming loggedInUser prop and enforce forbidden access for clients or unknown types
    const incoming = this.props.loggedInUser
    if (incoming && Object.keys(incoming).length > 0) {
      const userObj = incoming.user || incoming
      const userTypeRaw = userObj?.type || userObj?.userType || ''
      const userType = String(userTypeRaw || '').toLowerCase()

      const allowed = ['director', 'ceo', 'loan admin', 'collateral inspector']
      const allowedLower = allowed.map(a => a.toLowerCase())

      // if user is a client or not in allowed roles -> show forbidden
      if (userType === 'client' || !allowedLower.includes(userType)) {
        return this.renderForbidden()
      }
    }

    // --- rest of your original render code unchanged ---
    const {
      step,
      role,
      password,
      choice,
      loading,
      snackOpen,
      snackMessage,
      snackSeverity
    } = this.state
    return (
      <div className="container py-5" style={{ marginTop: '10px' }}>
        <div className="main-content">

          {/* Back button on steps 2 & 3 */}
          {(step === 3) && (
            <button
              className="btn btn-link mb-3 d-flex align-items-center"
              onClick={this.handleBack}
            >
              <ArrowLeft size={20} className="me-2" />
              Back
            </button>
          )}

          {step === 1 && (
            <div className="card mx-auto" style={{ maxWidth: 400 }}>
              <div className="card-body">
                <h5 className="card-title text-center mb-4">Admin Login</h5>
                <form onSubmit={this.handleLogin}>
                  <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select
                      name="role"
                      className="form-select"
                      value={role}
                      onChange={this.handleChange}
                      required
                      disabled={loading}
                    >
                      <option value="" disabled>Choose...</option>
                      <option value="director">Director</option>
                      <option value="ceo">CEO</option>
                      <option value="Loan Admin">Loan Admin</option>
                      <option value="Collateral Inspector">Collateral Inspector</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      value={password}
                      onChange={this.handleChange}
                      required
                      disabled={loading}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success w-100"
                    disabled={loading}
                  >
                    {loading ? 'Verifying…' : 'Proceed'}
                  </button>
                </form>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="text-center">
              <h4>Select Action</h4>
              <div className="d-flex justify-content-center gap-3 mt-4" style={{paddingLeft:'10px',paddingRight:'10px'}}>
                {role === "ceo" || role === "director"? <button
                  className="btn btn-outline-success px-4"
                  onClick={() => this.handleChoice('signature')}
                >
                  Signature
                </button> : null}
                {role === "ceo" || role === "director"? <button
                  className="btn btn-outline-secondary px-4"
                  onClick={() => this.handleChoice('initials')}
                >
                  Initials
                </button> : null}
              </div>
              <div className="d-flex justify-content-center gap-3 mt-4">
                <LoansButton />
                {role === "Collateral Inspector"? null : <UsersButton/>}
              </div>
            </div>
          )}

          {step === 3 && choice === 'signature' && (
            <Signature role={role} {...this.props}/>
          )}
          {step === 3 && choice === 'initials' && (
            <Initials role={role} {...this.props}/>
          )}

        </div>

        {/* MUI Snackbar for alerts */}
        <Snackbar
          open={snackOpen}
          autoHideDuration={4000}
          onClose={this.handleSnackClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            onClose={this.handleSnackClose}
            severity={snackSeverity}
            sx={{ width: '100%' }}
          >
            {snackMessage}
          </Alert>
        </Snackbar>
      </div>
    )
  }
}


const LoansButton = ()=>{
  const router = useRouter()
  return (
    <button
      className="btn btn-outline-danger px-4"
      // onClick={() => router.push('/admin/loans/')}
      onClick={()=>{window.location = "/admin/loans"}}
    >
      Loans
    </button>
  )
}

const UsersButton = ()=>{
  const router = useRouter()
  return (
    <button
      className="btn btn-outline-info px-4"
      // onClick={() => router.push('/admin/loans/')}
      onClick={()=>{window.location = "/admin/users/"}}
    >
      Users
    </button>
  )
}