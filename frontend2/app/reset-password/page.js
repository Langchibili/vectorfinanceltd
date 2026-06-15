'use client'

import { useState, useEffect } from 'react'
import { api_url } from '@/Constants'
import Link from 'next/link'

export default function ResetPasswordPage({ searchParams }) {
  const { code } = searchParams

  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPwd, setShowPwd] = useState(false)
  const [showPwd2, setShowPwd2] = useState(false)
  const [strength, setStrength] = useState(0)

  useEffect(() => {
    if (!code) setError('No reset token provided. Please use the link sent to your email.')
  }, [code])

  useEffect(() => {
    // Simple strength meter
    let s = 0
    if (password.length >= 8) s++
    if (/[A-Z]/.test(password)) s++
    if (/[0-9]/.test(password)) s++
    if (/[^A-Za-z0-9]/.test(password)) s++
    setStrength(s)
  }, [password])

  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong']
  const strengthColor = ['', '#DC2626', '#D97706', '#3B82F6', '#059669']

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccessMessage('')

    if (!password || !passwordConfirmation) { setError('Please fill in both fields.'); return }
    if (password !== passwordConfirmation) { setError('Passwords do not match.'); return }
    if (!code) { setError('Missing reset token. Please use the link from your email.'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return }

    setLoading(true)
    try {
      const response = await fetch(`${api_url}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, password, passwordConfirmation }),
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data?.error?.message || 'Reset failed. Please try again.')
        setLoading(false)
        return
      }
      setSuccessMessage('Password reset successful!')
      setTimeout(() => { window.location = '/signin' }, 2500)
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#F7F5F0',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '40px 20px', fontFamily: "'DM Sans', system-ui, sans-serif",
    }}>
      <div className="page-enter" style={{ width: '100%', maxWidth: 400 }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 36, justifyContent: 'center' }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #C9A84C, #E8C87A)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(201,168,76,0.3)' }}>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: '#0A0F1E' }}>V</span>
          </div>
        </div>

        {/* Card */}
        <div className="vf-card" style={{ padding: '36px 32px' }}>
          {/* Lock icon */}
          <div style={{ width: 52, height: 52, borderRadius: 16, background: 'linear-gradient(135deg, rgba(201,168,76,0.12), rgba(201,168,76,0.04))', border: '1px solid rgba(201,168,76,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 0 20px' }}>
            <LockIcon />
          </div>

          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 24, color: '#1A1A2E', fontWeight: 400, margin: '0 0 8px' }}>
            Reset Password
          </h1>
          <p style={{ color: '#6B7280', fontSize: 14, margin: '0 0 28px', lineHeight: 1.6 }}>
            Choose a strong new password for your account.
          </p>

          {error && (
            <div className="vf-alert-error-light vf-alert" style={{ marginBottom: 20 }}>
              <AlertIcon /> <span>{error}</span>
            </div>
          )}

          {successMessage ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(5,150,105,0.1)', border: '2px solid #059669', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <svg width={24} height={24} fill="none" viewBox="0 0 24 24" stroke="#059669" strokeWidth={2.5}><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <p style={{ fontSize: 16, fontWeight: 700, color: '#059669', margin: '0 0 8px' }}>Password Updated!</p>
              <p style={{ fontSize: 13, color: '#6B7280', margin: '0 0 20px' }}>Redirecting you to sign in…</p>
              <Link href="/signin" style={{ color: '#A07830', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
                Go to Sign In →
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* New password */}
              <div style={{ position: 'relative', marginBottom: 8 }}>
                <div className="flabel-light flabel-group" style={{ marginBottom: 0 }}>
                  <input
                    type={showPwd ? 'text' : 'password'}
                    className="flabel-input"
                    placeholder="New password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    disabled={loading}
                    style={{ paddingRight: 44 }}
                  />
                  <label>New Password</label>
                  <button type="button" onClick={() => setShowPwd(p => !p)} className="pwd-toggle pwd-toggle-light" tabIndex={-1}>
                    {showPwd ? <EyeOff /> : <EyeOn />}
                  </button>
                </div>
              </div>

              {/* Strength bar */}
              {password.length > 0 && (
                <div style={{ marginBottom: 18 }}>
                  <div style={{ display: 'flex', gap: 4, marginBottom: 4 }}>
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} style={{ flex: 1, height: 3, borderRadius: 100, background: i <= strength ? strengthColor[strength] : 'rgba(26,26,46,0.1)', transition: 'background 0.3s' }} />
                    ))}
                  </div>
                  <p style={{ fontSize: 11, color: strengthColor[strength], fontWeight: 600, margin: 0 }}>{strength > 0 ? strengthLabel[strength] : ''}</p>
                </div>
              )}

              {/* Confirm password */}
              <div style={{ position: 'relative', marginBottom: 24 }}>
                <div className="flabel-light flabel-group" style={{ marginBottom: 0 }}>
                  <input
                    type={showPwd2 ? 'text' : 'password'}
                    className={`flabel-input${password && passwordConfirmation && password !== passwordConfirmation ? ' is-invalid' : ''}`}
                    placeholder="Confirm password"
                    value={passwordConfirmation}
                    onChange={e => setPasswordConfirmation(e.target.value)}
                    disabled={loading}
                    style={{ paddingRight: 44 }}
                  />
                  <label>Confirm Password</label>
                  <button type="button" onClick={() => setShowPwd2(p => !p)} className="pwd-toggle pwd-toggle-light" tabIndex={-1}>
                    {showPwd2 ? <EyeOff /> : <EyeOn />}
                  </button>
                </div>
                {password && passwordConfirmation && password !== passwordConfirmation && (
                  <p style={{ color: '#DC2626', fontSize: 12, margin: '4px 0 0' }}>Passwords don't match</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || !code}
                className="btn-gold"
                style={{ width: '100%', justifyContent: 'center', fontSize: 15, padding: '14px' }}
              >
                {loading ? <><Spinner /> Resetting…</> : 'Reset Password'}
              </button>
            </form>
          )}
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: '#6B7280' }}>
          <Link href="/signin" style={{ color: '#A07830', fontWeight: 600, textDecoration: 'none' }}>← Back to Sign In</Link>
        </p>
      </div>
    </div>
  )
}

function LockIcon() {
  return <svg width={22} height={22} fill="none" viewBox="0 0 24 24" stroke="#C9A84C" strokeWidth={1.7}><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>
}
function EyeOn() { return <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg> }
function EyeOff() { return <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg> }
function AlertIcon() { return <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg> }
function Spinner() { return <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ animation: 'spin 0.8s linear infinite', flexShrink: 0 }}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg> }