'use client'

import { api_url } from '@/Constants'
import { dynamicConfig, scrolltoTopOFPage } from '@/Functions'
import { saveJwt } from '@/Secrets'
import Link from 'next/link'
import { useRef, useState } from 'react'

export const dynamic = dynamicConfig()

export default function Signin() {
  const emailRef = useRef(null)
  const phoneRef = useRef(null)
  const passwordRef = useRef(null)

  const [serverError, setServerError] = useState(null)
  const [forgotMessage, setForgotMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [identifierName, setIdentifierName] = useState('email')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({ email: '', phone: '', password: '' })

  const validateForm = () => {
    const email = emailRef.current?.value?.trim()
    const phone = phoneRef.current?.value?.trim()
    const password = passwordRef.current?.value?.trim()
    let isValid = true
    const newErrors = { email: '', phone: '', password: '' }
    if (identifierName === 'email' && !email) { newErrors.email = 'Please enter your email'; isValid = false }
    if (identifierName === 'phone' && !phone) { newErrors.phone = 'Please enter your number'; isValid = false }
    if (!password) { newErrors.password = 'Please enter your password'; isValid = false }
    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerError('')
    setForgotMessage('')
    if (!validateForm()) return

    const identifier = identifierName === 'phone'
      ? phoneRef.current?.value?.trim()
      : emailRef.current?.value?.trim()
    const password = passwordRef.current?.value?.trim()

    setLoading(true)
    try {
      const response = await fetch(api_url + '/auth/local', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      })
      const data = await response.json()
      if (data.error) {
        setServerError(data.error.message.replace('Username', 'Number'))
        setLoading(false)
        return
      }
      saveJwt(data.jwt)
      window.location = '/'
    } catch (err) {
      setServerError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  const handleForgotPassword = async () => {
    setServerError('')
    setForgotMessage('')
    if (identifierName !== 'email') {
      setServerError('Switch to Email mode to reset your password.')
      return
    }
    const email = emailRef.current?.value?.trim()
    if (!email) { setServerError('Please enter your email address first.'); return }
    setLoading(true)
    try {
      const response = await fetch(`${api_url}/password-resets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: { email } }),
      })
      const data = await response.json()
      if (data && data.data) {
        setForgotMessage('A reset link has been sent to your email address.')
      } else {
        setServerError('Failed to send reset link. Please check your email and try again.')
      }
    } catch (err) {
      setServerError('Failed to send reset link. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  scrolltoTopOFPage()

  return (
    <div style={{
      minHeight: '100vh', background: '#F7F5F0',
      display: 'flex', alignItems: 'stretch',
      fontFamily: "'DM Sans', system-ui, sans-serif",
    }}>
      {/* ── Left Panel (dark, decorative) ── */}
      <div style={{
        display: 'none', flex: '0 0 45%', position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(160deg, #0A0F1E 0%, #0F1930 55%, #150F08 100%)',
      }} className="auth-left-panel">
        {/* Orbs */}
        <div style={{ position: 'absolute', top: -100, left: -80, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.10) 0%, transparent 65%)' }} />
        <div style={{ position: 'absolute', bottom: -60, right: -60, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 65%)' }} />
        {/* Grid lines */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, padding: '48px 40px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #C9A84C, #E8C87A)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: '#0A0F1E' }}>V</span>
            </div>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: '#fff', letterSpacing: '0.01em' }}>Vector Finance</span>
          </div>

          {/* Hero text */}
          <div>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(32px,4vw,44px)', color: '#fff', fontWeight: 400, lineHeight: 1.2, margin: '0 0 20px' }}>
              Finance that moves<br /><em style={{ color: '#C9A84C', fontStyle: 'italic' }}>with you.</em>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.42)', fontSize: 14, lineHeight: 1.7, maxWidth: 320, margin: '0 0 40px' }}>
              Access low-interest loans, track your repayments, and grow your financial future — all in one place.
            </p>
            {/* Stats */}
            <div style={{ display: 'flex', gap: 32 }}>
              {[['24h', 'Disbursement'], ['18%', 'Low Rates'], ['100%', 'Secure']].map(([val, lbl]) => (
                <div key={lbl}>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 22, fontWeight: 600, color: '#C9A84C', margin: '0 0 2px' }}>{val}</p>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', margin: 0, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{lbl}</p>
                </div>
              ))}
            </div>
          </div>

          <p style={{ color: 'rgba(255,255,255,0.22)', fontSize: 11 }}>© 2025 Vector Finance Limited · Zambia</p>
        </div>
      </div>

      {/* ── Right Panel (form) ── */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', minHeight: '100vh' }}>
        <div className="page-enter" style={{ width: '100%', maxWidth: 400 }}>
          {/* Mobile logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 36 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #C9A84C, #E8C87A)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: '#0A0F1E' }}>V</span>
            </div>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 16, color: '#1A1A2E' }}>Vector Finance</span>
          </div>

          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 28, color: '#1A1A2E', fontWeight: 400, margin: '0 0 6px' }}>
            Welcome back
          </h1>
          <p style={{ color: '#6B7280', fontSize: 14, margin: '0 0 32px' }}>
            Sign in to your account to continue.
          </p>

          <form onSubmit={handleSubmit} noValidate>
            {/* Toggle */}
            <div style={{ display: 'flex', background: 'rgba(26,26,46,0.06)', borderRadius: 10, padding: 3, marginBottom: 24, gap: 3 }}>
              {['email', 'phone'].map(mode => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setIdentifierName(mode)}
                  style={{
                    flex: 1, padding: '8px', borderRadius: 8, border: 'none', cursor: 'pointer',
                    fontSize: 13, fontWeight: 600, transition: 'all 0.2s',
                    background: identifierName === mode ? '#fff' : 'transparent',
                    color: identifierName === mode ? '#1A1A2E' : '#6B7280',
                    boxShadow: identifierName === mode ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                  }}
                >
                  {mode === 'email' ? 'Email' : 'Phone Number'}
                </button>
              ))}
            </div>

            {/* Identifier field */}
            <div className="flabel-light flabel-group">
              {identifierName === 'email' ? (
                <>
                  <input
                    type="email" className={`flabel-input${errors.email ? ' is-invalid' : ''}`}
                    placeholder="Email address" ref={emailRef} autoComplete="email"
                  />
                  <label>Email Address</label>
                  {errors.email && <p style={{ color: '#DC2626', fontSize: 12, margin: '4px 0 0' }}>{errors.email}</p>}
                </>
              ) : (
                <>
                  <input
                    type="tel" className={`flabel-input${errors.phone ? ' is-invalid' : ''}`}
                    placeholder="Phone number" ref={phoneRef} autoComplete="tel"
                  />
                  <label>Phone Number (+260…)</label>
                  {errors.phone && <p style={{ color: '#DC2626', fontSize: 12, margin: '4px 0 0' }}>{errors.phone}</p>}
                </>
              )}
            </div>

            {/* Password */}
            <div className="flabel-light flabel-group" style={{ position: 'relative', marginBottom: 8 }}>
              <input
                type={showPassword ? 'text' : 'password'}
                className={`flabel-input${errors.password ? ' is-invalid' : ''}`}
                placeholder="Password" ref={passwordRef} autoComplete="current-password"
                style={{ paddingRight: 44 }}
              />
              <label>Password</label>
              <button
                type="button"
                onClick={() => setShowPassword(p => !p)}
                className="pwd-toggle pwd-toggle-light"
                tabIndex={-1}
                style={{ zIndex: 2 }}
              >
                {showPassword ? <EyeOff /> : <EyeOn />}
              </button>
              {errors.password && <p style={{ color: '#DC2626', fontSize: 12, margin: '4px 0 0' }}>{errors.password}</p>}
            </div>

            {/* Forgot */}
            <div style={{ textAlign: 'right', marginBottom: 24 }}>
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={loading}
                style={{ background: 'none', border: 'none', color: '#A07830', fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: 0, fontFamily: "'DM Sans', system-ui, sans-serif" }}
              >
                Forgot password?
              </button>
            </div>

            {/* Messages */}
            {serverError && (
              <div className="vf-alert-error-light vf-alert" style={{ marginBottom: 16 }}>
                <AlertIcon /> <span>{serverError}</span>
              </div>
            )}
            {forgotMessage && (
              <div className="vf-alert-success-light vf-alert" style={{ marginBottom: 16 }}>
                <CheckIcon /> <span>{forgotMessage}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-gold"
              style={{ width: '100%', justifyContent: 'center', fontSize: 15, padding: '14px' }}
            >
              {loading ? <><Spinner /> Signing in…</> : 'Sign In'}
            </button>
          </form>

          {/* Sign up link */}
          <p style={{ textAlign: 'center', marginTop: 28, fontSize: 14, color: '#6B7280' }}>
            Don't have an account?{' '}
            <Link href="/signup" style={{ color: '#A07830', fontWeight: 700, textDecoration: 'none' }}>
              Create one
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        @media(min-width:768px){ .auth-left-panel{ display:flex !important; } }
      `}</style>
    </div>
  )
}

/* ── Icons ── */
function EyeOn() {
  return <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
}
function EyeOff() {
  return <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
}
function AlertIcon() {
  return <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
}
function CheckIcon() {
  return <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ flexShrink: 0 }}><path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
}
function Spinner() {
  return <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ animation: 'spin 0.8s linear infinite', flexShrink: 0 }}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>
}