import React from 'react'
import Signature from './Signature'
import Initials  from './Initials'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { ArrowLeft } from '@material-ui/icons'
import { api_url } from '@/Constants'
import { saveJwt } from '@/Secrets'

export default class AdminHome extends React.Component {
  state = {
    step: 1,            // 1=login, 2=choose, 3=show component
    role: '',
    password: '',
    choice: '',         // 'signature' or 'initials'
    loading: false,
    // snackbar state
    snackOpen: false,
    snackMessage: '',
    snackSeverity: 'error'  // 'error' | 'warning' | 'info' | 'success'
  }

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

  render() {
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
          {(step === 2 || step === 3) && (
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
              <div className="d-flex justify-content-center gap-3 mt-4">
                <button
                  className="btn btn-outline-success px-4"
                  onClick={() => this.handleChoice('signature')}
                >
                  Signature
                </button>
                <button
                  className="btn btn-outline-info px-4"
                  onClick={() => this.handleChoice('initials')}
                >
                  Initials
                </button>
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
