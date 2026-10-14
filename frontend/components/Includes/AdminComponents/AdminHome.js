'use client'
import React from 'react'
import Signature from './Signature'
import Initials from './Initials'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import { ArrowLeft } from '@material-ui/icons'
import { api_url } from '@/Constants'
import { saveJwt } from '@/Secrets'
import { useRouter } from 'next/navigation'
import { ThemeProvider } from '@mui/material/styles'
import { adminTheme, G, FONTS } from '@/styles/admin-theme'

/* ─── token shortcuts ──────────────────────────────────────── */
const surface = 'rgba(255,255,255,0.05)'
const border = 'rgba(255,255,255,0.08)'
const muted = 'rgba(255,255,255,0.38)'

/* ═══════════════════════════════════════════════════════════════
   MAIN CLASS
═══════════════════════════════════════════════════════════════ */
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
    const incoming = this.props.loggedInUser
    if (incoming && Object.keys(incoming).length > 0) {
      const userObj = incoming.user || incoming
      const adminType = userObj?.type || userObj?.userType || ''
      const adminId = userObj?.id || userObj?.user?.id || ''
      if (adminType) localStorage.setItem('admin_user_type', adminType)
      if (adminId) localStorage.setItem('admin_user_id', String(adminId))
    }
    if (incoming && incoming.type !== 'client') {
      this.setState({ step: 2 })
    }
  }

  handleChange = e => { this.setState({ [e.target.name]: e.target.value }) }

  showSnackbar = (message, severity = 'info') => {
    this.setState({ snackOpen: true, snackMessage: message, snackSeverity: severity })
  }

  handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') return
    this.setState({ snackOpen: false })
  }

  handleLogin = async e => {
    e.preventDefault()
    this.setState({ loading: true })
    const { role, password } = this.state
    const requestObject = { identifier: role.toLowerCase(), password }
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
      localStorage.setItem('admin_role', role)
      localStorage.setItem('admin_user_id', data.user?.id || '')
      const userType = data.user?.type || data.user?.userType || ''
      if (userType) {
        localStorage.setItem('admin_user_type', userType)
        const redirectUrl = this.props.redirectUrl
        if (redirectUrl) { window.location = redirectUrl }
      }
      this.showSnackbar('Login successful!', 'success')
      this.setState({ loading: false, step: 2 })
    } catch (err) {
      console.error('Login error:', err)
      this.showSnackbar('Something went wrong. Please try again.', 'error')
      this.setState({ loading: false })
    }
  }

  handleChoice = choice => { this.setState({ choice, step: 3 }) }
  handleBack = () => { this.setState(({ step }) => ({ step: step - 1 })) }

  renderForbidden = () => (
    <ThemeProvider theme={adminTheme}>
      <div style={pageWrap}>
        <AmbientBg />
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
          <div style={{ ...card, maxWidth: 520, textAlign: 'center', padding: '40px 32px' }}>
            {/* Icon */}
            <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(248,113,113,0.12)', border: '1px solid rgba(248,113,113,0.28)', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width={22} height={22} fill="none" viewBox="0 0 24 24" stroke={G.red} strokeWidth={1.8}>
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <p style={{ fontFamily: FONTS.display, fontSize: 22, color: '#fff', margin: '0 0 10px', fontWeight: 400 }}>Access Forbidden</p>
            <p style={{ fontSize: 13.5, color: muted, lineHeight: 1.6, margin: '0 0 28px' }}>
              Your account does not have permission to access the admin area.
              If you believe this is an error, contact an administrator.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button style={btnGreen} onClick={() => window.location.replace('/')}>Home</button>
              <button style={btnOutline} onClick={() => window.location.replace('/logout?ref=admin')}>Admin login</button>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )

  render() {
    // ── forbidden guard ──────────────────────────────────────
    const incoming = this.props.loggedInUser
    if (incoming && Object.keys(incoming).length > 0) {
      const userObj = incoming.user || incoming
      const userTypeRaw = userObj?.type || userObj?.userType || ''
      const userType = String(userTypeRaw || '').toLowerCase()
      const allowed = ['director', 'ceo', 'loan admin', 'collateral inspector']
      if (userType === 'client' || !allowed.includes(userType)) {
        return this.renderForbidden()
      }
    }

    const { step, role, password, choice, loading, snackOpen, snackMessage, snackSeverity } = this.state

    return (
      <ThemeProvider theme={adminTheme}>
        <div style={pageWrap}>
          <AmbientBg />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: 560, margin: '0 auto', padding: '80px 16px 40px' }}>

            {/* ── Back button (step 3) ── */}
            {step === 3 && (
              <button
                onClick={this.handleBack}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  background: 'none', border: 'none',
                  color: muted, fontSize: 13, fontFamily: FONTS.body,
                  cursor: 'pointer', marginBottom: 24, padding: 0,
                  transition: 'color 0.18s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = G.green2 }}
                onMouseLeave={e => { e.currentTarget.style.color = muted }}
              >
                <ArrowLeft style={{ fontSize: 16 }} />
                Back
              </button>
            )}

            {/* ══ STEP 1 — Login form ══ */}
            {step === 1 && (
              <div style={{ animation: 'vfSlideUp 0.45s cubic-bezier(.22,1,.36,1)' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: 'linear-gradient(135deg,#059669,#10B981,#34D399)', margin: '0 auto 14px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 28px rgba(16,185,129,0.28)' }}>
                    <span style={{ fontFamily: FONTS.display, fontSize: 22, color: '#fff' }}>V</span>
                  </div>
                  <p style={{ fontFamily: FONTS.display, fontSize: 24, color: '#fff', margin: '0 0 5px', fontWeight: 400 }}>Admin Login</p>
                  <p style={{ fontSize: 12.5, color: muted, margin: 0 }}>Vector Finance Limited — Staff Access</p>
                </div>

                <div style={card}>
                  {/* Role badges */}
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 22 }}>
                    {['Director', 'CEO', 'Loan Admin', 'Inspector'].map(r => (
                      <span key={r} style={roleBadge}>{r}</span>
                    ))}
                  </div>

                  <form onSubmit={this.handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {/* Role select */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                      <label style={labelStyle}>Role</label>
                      <select
                        name="role"
                        value={role}
                        onChange={this.handleChange}
                        required
                        disabled={loading}
                        style={selectStyle}
                      >
                        <option value="" disabled>Choose your role…</option>
                        <option value="director">Director</option>
                        <option value="ceo">CEO</option>
                        <option value="Loan Admin">Loan Admin</option>
                        <option value="Collateral Inspector">Collateral Inspector</option>
                      </select>
                    </div>

                    {/* Password */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                      <label style={labelStyle}>Password</label>
                      <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                        required
                        disabled={loading}
                        placeholder="Enter your password"
                        style={inputStyle}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      style={{ ...btnGreen, width: '100%', justifyContent: 'center', padding: '13px 0', fontSize: 14.5, marginTop: 4, opacity: loading ? 0.7 : 1 }}
                    >
                      {loading ? <><SpinnerIco /> Verifying…</> : 'Proceed'}
                    </button>
                  </form>
                </div>

                {/* Security notice */}
                <div style={{ marginTop: 16, padding: '11px 15px', borderRadius: 12, background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.14)', display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                  <LockIco />
                  <p style={{ margin: 0, fontSize: 11.5, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
                    Restricted to authorised Vector Finance staff. Unauthorised access is subject to legal action.
                  </p>
                </div>
              </div>
            )}

            {/* ══ STEP 2 — Action selector ══ */}
            {step === 2 && (
              <div style={{ textAlign: 'center', animation: 'vfSlideUp 0.4s cubic-bezier(.22,1,.36,1)' }}>
                {/* Welcome line */}
                <p style={{ fontFamily: FONTS.display, fontSize: 22, color: '#fff', margin: '0 0 6px', fontWeight: 400 }}>
                  Select Action
                </p>
                <p style={{ fontSize: 12.5, color: muted, margin: '0 0 32px' }}>
                  Choose what you'd like to do
                </p>

                {/* Signature / Initials — director & CEO only */}
                {(role === 'ceo' || role === 'director') && (
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 14 }}>
                    <ActionTile
                      icon={<SignIco />}
                      label="Signature"
                      onClick={() => this.handleChoice('signature')}
                    />
                    <ActionTile
                      icon={<InitialsIco />}
                      label="Initials"
                      onClick={() => this.handleChoice('initials')}
                    />
                  </div>
                )}

                {/* Loans / Users */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
                  <LoansButton />
                  {role !== 'Collateral Inspector' && <UsersButton />}
                </div>
              </div>
            )}

            {/* ══ STEP 3 — Signature / Initials canvas ══ */}
            {step === 3 && choice === 'signature' && (
              <Signature role={role} {...this.props} />
            )}
            {step === 3 && choice === 'initials' && (
              <Initials role={role} {...this.props} />
            )}
          </div>

          {/* Snackbar */}
          <Snackbar
            open={snackOpen}
            autoHideDuration={4000}
            onClose={this.handleSnackClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert onClose={this.handleSnackClose} severity={snackSeverity} sx={{ width: '100%' }}>
              {snackMessage}
            </Alert>
          </Snackbar>
        </div>

        <style>{css}</style>
      </ThemeProvider>
    )
  }
}

/* ═══════════════════════════════════════════════════════════════
   FUNCTIONAL SUB-COMPONENTS
═══════════════════════════════════════════════════════════════ */
function ActionTile({ icon, label, onClick }) {
  const [hovered, setHovered] = React.useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        padding: '20px 28px',
        background: hovered ? 'rgba(16,185,129,0.10)' : 'rgba(255,255,255,0.05)',
        border: `1px solid ${hovered ? 'rgba(16,185,129,0.30)' : 'rgba(255,255,255,0.08)'}`,
        borderRadius: 16, cursor: 'pointer',
        fontFamily: FONTS.body,
        transition: 'all 0.2s',
        minWidth: 120,
        transform: hovered ? 'translateY(-2px)' : 'none',
      }}
    >
      <div style={{ width: 40, height: 40, borderRadius: 11, background: hovered ? 'rgba(16,185,129,0.18)' : 'rgba(255,255,255,0.06)', border: `1px solid ${hovered ? 'rgba(16,185,129,0.30)' : 'rgba(255,255,255,0.08)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: hovered ? G.green2 : muted, transition: 'all 0.2s' }}>
        {icon}
      </div>
      <span style={{ fontSize: 13, fontWeight: 600, color: hovered ? '#fff' : 'rgba(255,255,255,0.70)', transition: 'color 0.2s' }}>{label}</span>
    </button>
  )
}

function NavButton({ label, onClick, accent }) {
  const [hovered, setHovered] = React.useState(false)
  const accentColor = accent || G.green2
  const accentBorder = accent ? `${accent}55` : G.greenBorder
  const accentGlow = accent ? `${accent}18` : G.greenGlow
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '11px 28px',
        background: hovered ? accentGlow : 'rgba(255,255,255,0.05)',
        border: `1px solid ${hovered ? accentBorder : 'rgba(255,255,255,0.08)'}`,
        borderRadius: 12,
        color: hovered ? accentColor : 'rgba(255,255,255,0.65)',
        fontSize: 13.5, fontWeight: 600, fontFamily: FONTS.body,
        cursor: 'pointer', transition: 'all 0.2s',
        minWidth: 110,
      }}
    >
      {label}
    </button>
  )
}

const LoansButton = () => (
  <NavButton label="Loans" accent={G.red} onClick={() => { window.location = '/admin/loans' }} />
)

const UsersButton = () => (
  <NavButton label="Users" accent={G.blue} onClick={() => { window.location = '/admin/users/' }} />
)

/* ─── decorative background ─────────────────────────────────── */
function AmbientBg() {
  return (
    <>
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 80% 50% at 50% -5%, rgba(16,185,129,0.12) 0%, transparent 62%), radial-gradient(ellipse 55% 40% at 88% 88%, rgba(5,150,105,0.07) 0%, transparent 55%)' }} />
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', backgroundImage: 'radial-gradient(rgba(255,255,255,0.022) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
    </>
  )
}

/* ─── icons ─────────────────────────────────────────────────── */
function SignIco() {
  return <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
}
function InitialsIco() {
  return <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><path d="M4 7l4-4 4 4" /><path d="M8 3v18" /><path d="M12 17l4 4 4-4" /><path d="M16 21V3" /></svg>
}
function LockIco() {
  return <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="#C9A84C" strokeWidth={1.8} style={{ flexShrink: 0, marginTop: 2 }}><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
}
function SpinnerIco() {
  return <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ animation: 'vfSpin 0.8s linear infinite' }}><circle cx="12" cy="12" r="10" strokeOpacity="0.25" /><path d="M12 2a10 10 0 010 20" /></svg>
}

/* ─── shared style objects ──────────────────────────────────── */
const pageWrap = {
  minHeight: '100vh',
  background: G.page,
  position: 'relative',
  overflowX: 'hidden',
  fontFamily: FONTS.body,
}

const card = {
  background: surface,
  border: `1px solid ${border}`,
  borderRadius: 18,
  padding: '26px 22px',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  boxShadow: '0 20px 50px rgba(0,0,0,0.35)',
}

const labelStyle = {
  fontSize: 10.5,
  fontWeight: 700,
  letterSpacing: '0.07em',
  textTransform: 'uppercase',
  color: muted,
  fontFamily: FONTS.body,
}

const inputStyle = {
  width: '100%',
  height: 46,
  padding: '0 14px',
  background: 'rgba(255,255,255,0.06)',
  border: `1.5px solid ${border}`,
  borderRadius: 10,
  color: '#fff',
  fontSize: 14,
  outline: 'none',
  fontFamily: FONTS.body,
  transition: 'border-color 0.2s',
  boxSizing: 'border-box',
}

const selectStyle = {
  ...inputStyle,
  appearance: 'none',
  WebkitAppearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' viewBox='0 0 24 24'%3E%3Cpolyline points='6 9 12 15 18 9' stroke='rgba(255,255,255,0.38)' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 12px center',
  paddingRight: 36,
  cursor: 'pointer',
}

const btnGreen = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7,
  background: 'linear-gradient(135deg,#059669 0%,#10B981 55%,#059669 100%)',
  backgroundSize: '200% auto',
  color: '#fff', fontWeight: 700, fontSize: 13.5,
  border: 'none', borderRadius: 11,
  padding: '11px 24px',
  cursor: 'pointer', fontFamily: FONTS.body,
  boxShadow: '0 4px 16px rgba(16,185,129,0.28)',
  transition: 'all 0.22s',
}

const btnOutline = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  background: 'transparent',
  color: 'rgba(255,255,255,0.60)',
  fontWeight: 600, fontSize: 13.5,
  border: `1.5px solid ${border}`,
  borderRadius: 11, padding: '11px 24px',
  cursor: 'pointer', fontFamily: FONTS.body,
  transition: 'all 0.22s',
}

const roleBadge = {
  padding: '3px 10px', borderRadius: 100,
  background: 'rgba(16,185,129,0.08)',
  border: '1px solid rgba(16,185,129,0.18)',
  color: G.green3,
  fontSize: 10, fontWeight: 700, letterSpacing: '0.05em',
  textTransform: 'uppercase',
}

/* ─── global keyframes ──────────────────────────────────────── */
const css = `
  @keyframes vfSlideUp {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  @keyframes vfSpin {
    to { transform: rotate(360deg); }
  }
  select option { background: #081510; color: #fff; }
`