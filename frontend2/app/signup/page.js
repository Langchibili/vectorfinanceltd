'use client'

import EmailOtpVerificationForm from '@/components/Forms/EmailOtpVerificationForm'
import PhoneOtpVerificationForm from '@/components/Forms/PhoneOtpVerificationForm'
import { submitCreateUserRequest } from '@/Constants'
import {
  dynamicConfig, getFormByName, getReferrerFromReferralCode,
  scrolltoTopOFPage, sendOTP, textHasPhoneNumber,
  updateUserAccount, validateEmail,
} from '@/Functions'
import { saveJwt } from '@/Secrets'
import Link from 'next/link'
import { useRef, useState } from 'react'

export const dynamic = dynamicConfig()

export default function Signup() {
  const emailRef = useRef(null)
  const firstNameRef = useRef(null)
  const lastNameRef = useRef(null)
  const phoneRef = useRef(null)
  const passwordRef = useRef(null)
  const referralCodeRef = useRef(null)

  const [serverError, setServerError] = useState(null)
  const [numberOtpVerified, setNumberOtpVerified] = useState(false)
  const [emailOtpVerified, setEmailOtpVerified] = useState(false)
  const [beginOtpVerification, setBeginOtpVerification] = useState(true)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [step, setStep] = useState(1) // 1=details, 2=verify, 3=done
  const [errors, setErrors] = useState({ email: '', firstName: '', lastName: '', phone: '', password: '' })

  const validateForm = () => {
    const email = emailRef.current?.value?.trim()
    const firstName = firstNameRef.current?.value?.trim()
    const lastName = lastNameRef.current?.value?.trim()
    const phone = phoneRef.current?.value?.trim()
    const password = passwordRef.current?.value?.trim()
    let isValid = true
    const newErrors = { email: '', firstName: '', lastName: '', phone: '', password: '' }

    if (!email) { newErrors.email = 'Email required'; isValid = false }
    if (!firstName) { newErrors.firstName = 'First name required'; isValid = false }
    if (!lastName) { newErrors.lastName = 'Last name required'; isValid = false }
    if (!phone) { newErrors.phone = 'Phone required'; isValid = false }
    if (!password) { newErrors.password = 'Password required'; isValid = false }
    if (phone && !textHasPhoneNumber(phone)) { newErrors.phone = 'Invalid phone number'; isValid = false }
    if (email && !validateEmail(email)) { newErrors.email = 'Invalid email address'; isValid = false }

    setErrors(newErrors)
    return isValid
  }

  const handleBeginOtpVerification = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    const phone = phoneRef.current?.value?.trim()
    const email = emailRef.current?.value?.trim()
    setBeginOtpVerification(false)
    setStep(2)
    sendOTP(phone, 'phoneNumber')
    sendOTP(email, 'email')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerError(null)

    const referralCode = referralCodeRef.current?.value?.trim()
    const valid = await validateReferralCode(referralCode)
    if (!valid) { setServerError('Invalid referral code. Leave blank if you don\'t have one.'); return }
    if (!numberOtpVerified) { setServerError('Please verify your phone number.'); return }
    if (!emailOtpVerified) { setServerError('Please verify your email address.'); return }
    if (!validateForm()) return

    const email = emailRef.current?.value?.trim()
    const firstName = firstNameRef.current?.value?.trim()
    const lastName = lastNameRef.current?.value?.trim()
    const phone = phoneRef.current?.value?.trim()
    const password = passwordRef.current?.value?.trim()

    setLoading(true)
    const response = await submitCreateUserRequest({ username: phone, email, password })
    if (response.hasOwnProperty('error')) {
      setServerError(response.error.message.replace('Username', 'Number'))
      setLoading(false)
      return
    }
    saveJwt(response.jwt)
    const referrer = await getReferrerFromReferralCode(referralCode)
    const form = await getFormByName('GeneralLoanForm')
    await updateUserAccount({
      fullnames: `${firstName} ${lastName}`,
      referredBy: referrer?.id || null,
      formsToFill: { connect: [form.id] },
      details: { firstname: firstName, lastname: lastName, age: null, gender: null, dateOfBirth: null, address: null },
    }, response.user.id, response.jwt)
    window.location = '/'
  }

  const validateReferralCode = async (code) => {
    if (!code) return true
    const ref = await getReferrerFromReferralCode(code)
    return !!ref
  }

  const getDefaultReferralCode = () => {
    if (typeof window !== 'undefined' && localStorage.getItem('referralCode')) {
      return localStorage.getItem('referralCode')
    }
    return ''
  }

  scrolltoTopOFPage()

  return (
    <div style={{
      minHeight: '100vh', background: '#F7F5F0',
      display: 'flex', alignItems: 'stretch',
      fontFamily: "'DM Sans', system-ui, sans-serif",
    }}>
      {/* Left decorative panel */}
      <div style={{ display: 'none', flex: '0 0 40%', background: 'linear-gradient(160deg, #0A0F1E 0%, #0F1930 55%, #150F08 100%)', position: 'relative', overflow: 'hidden' }} className="auth-left-panel">
        <div style={{ position: 'absolute', top: -100, left: -80, width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.10) 0%, transparent 65%)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        <div style={{ position: 'relative', zIndex: 1, padding: '48px 40px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #C9A84C, #E8C87A)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: '#0A0F1E' }}>V</span>
            </div>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: '#fff' }}>Vector Finance</span>
          </div>
          <div>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 36, color: '#fff', fontWeight: 400, lineHeight: 1.2, margin: '0 0 16px' }}>
              Join thousands<br />of satisfied<br /><em style={{ color: '#C9A84C' }}>clients.</em>
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {['Apply in minutes', 'Funds within 24 hours', 'Flexible repayment terms', 'Low interest rates'].map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'rgba(255,255,255,0.65)', fontSize: 14 }}>
                  <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width={10} height={10} fill="none" viewBox="0 0 24 24" stroke="#C9A84C" strokeWidth={3}><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '40px 20px 120px' }}>
        <div className="page-enter" style={{ width: '100%', maxWidth: 420 }}>
          {/* Mobile logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #C9A84C, #E8C87A)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 18, color: '#0A0F1E' }}>V</span>
            </div>
            <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 16, color: '#1A1A2E' }}>Vector Finance</span>
          </div>

          {/* Step indicator */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 28 }}>
            {[1, 2].map(s => (
              <div key={s} style={{ flex: 1, height: 3, borderRadius: 100, background: step >= s ? 'linear-gradient(90deg,#C9A84C,#E8C87A)' : 'rgba(26,26,46,0.1)', transition: 'background 0.4s' }} />
            ))}
          </div>

          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, color: '#1A1A2E', fontWeight: 400, margin: '0 0 6px' }}>
            {step === 1 ? 'Create Account' : 'Verify Identity'}
          </h1>
          <p style={{ color: '#6B7280', fontSize: 14, margin: '0 0 28px', lineHeight: 1.6 }}>
            {step === 1
              ? 'Sign up and access a low-interest loan within 24hrs.'
              : 'Enter the OTP codes sent to your phone and email.'}
          </p>

          {/* ── Step 1: Details form ── */}
          {step === 1 && (
            <form onSubmit={handleBeginOtpVerification} noValidate>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 12px' }}>
                <FloatInput label="First Name" inputRef={firstNameRef} error={errors.firstName} type="text" autoComplete="given-name" />
                <FloatInput label="Last Name" inputRef={lastNameRef} error={errors.lastName} type="text" autoComplete="family-name" />
              </div>
              <FloatInput label="Phone Number (+260…)" inputRef={phoneRef} error={errors.phone} type="tel" autoComplete="tel" />
              <FloatInput label="Email Address" inputRef={emailRef} error={errors.email} type="email" autoComplete="email" />

              {/* Password */}
              <div style={{ position: 'relative', marginBottom: 18 }}>
                <div className="flabel-light flabel-group" style={{ marginBottom: 0 }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className={`flabel-input${errors.password ? ' is-invalid' : ''}`}
                    placeholder="Password"
                    ref={passwordRef}
                    style={{ paddingRight: 44 }}
                    autoComplete="new-password"
                  />
                  <label>Password</label>
                  <button type="button" onClick={() => setShowPassword(p => !p)} className="pwd-toggle pwd-toggle-light" tabIndex={-1}>
                    {showPassword ? <EyeOff /> : <EyeOn />}
                  </button>
                </div>
                {errors.password && <p style={{ color: '#DC2626', fontSize: 12, margin: '4px 0 0' }}>{errors.password}</p>}
              </div>

              {/* Referral */}
              <div className="flabel-light flabel-group">
                <input type="text" className="flabel-input" placeholder="Referral code" ref={referralCodeRef} defaultValue={getDefaultReferralCode()} />
                <label>Referral Code (optional)</label>
              </div>

              <p style={{ fontSize: 12, color: '#6B7280', margin: '0 0 24px', lineHeight: 1.6 }}>
                By registering you agree to the{' '}
                <Link href="/termsofuse" style={{ color: '#A07830', fontWeight: 600, textDecoration: 'none' }}>Terms of Use</Link>.
              </p>

              {serverError && (
                <div className="vf-alert-error-light vf-alert" style={{ marginBottom: 16 }}>
                  <AlertIcon /> <span>{serverError}</span>
                </div>
              )}

              <button type="submit" className="btn-gold" style={{ width: '100%', justifyContent: 'center', fontSize: 15, padding: '14px' }}>
                Continue
              </button>
            </form>
          )}

          {/* ── Step 2: OTP verification ── */}
          {step === 2 && (
            <div>
              {/* Phone OTP */}
              <div style={{ marginBottom: 20 }}>
                {numberOtpVerified ? (
                  <VerifiedBadge label="Phone Number Verified" />
                ) : (
                  <div className="vf-card" style={{ padding: '20px' }}>
                    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: '#6B7280', margin: '0 0 12px' }}>Verify Phone Number</p>
                    <PhoneOtpVerificationForm
                      action={() => setNumberOtpVerified(true)}
                      phoneNumber={phoneRef.current?.value?.trim()}
                    />
                  </div>
                )}
              </div>

              {/* Email OTP */}
              <div style={{ marginBottom: 24 }}>
                {emailOtpVerified ? (
                  <VerifiedBadge label="Email Address Verified" />
                ) : (
                  <div className="vf-card" style={{ padding: '20px' }}>
                    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: '#6B7280', margin: '0 0 12px' }}>Verify Email Address</p>
                    <EmailOtpVerificationForm
                      action={() => setEmailOtpVerified(true)}
                      email={emailRef.current?.value?.trim()}
                    />
                  </div>
                )}
              </div>

              {serverError && (
                <div className="vf-alert-error-light vf-alert" style={{ marginBottom: 16 }}>
                  <AlertIcon /> <span>{serverError}</span>
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="btn-gold"
                style={{ width: '100%', justifyContent: 'center', fontSize: 15, padding: '14px' }}
              >
                {loading ? <><Spinner /> Setting up account…</> : 'Complete Registration'}
              </button>

              <button
                type="button"
                onClick={() => setStep(1)}
                style={{ width: '100%', marginTop: 12, padding: '12px', background: 'none', border: 'none', color: '#6B7280', fontSize: 13, cursor: 'pointer', fontFamily: "'DM Sans', system-ui, sans-serif" }}
              >
                ← Back to details
              </button>
            </div>
          )}

          <p style={{ textAlign: 'center', marginTop: 28, fontSize: 14, color: '#6B7280' }}>
            Already have an account?{' '}
            <Link href="/signin" style={{ color: '#A07830', fontWeight: 700, textDecoration: 'none' }}>Sign in</Link>
          </p>
        </div>
      </div>

      <style>{`
        @media(min-width:768px){ .auth-left-panel{ display:flex !important; } }
      `}</style>
    </div>
  )
}

/* ── Sub-components ── */

function FloatInput({ label, inputRef, error, type = 'text', autoComplete }) {
  return (
    <div className="flabel-light flabel-group">
      <input type={type} className={`flabel-input${error ? ' is-invalid' : ''}`} placeholder={label} ref={inputRef} autoComplete={autoComplete} />
      <label>{label}</label>
      {error && <p style={{ color: '#DC2626', fontSize: 12, margin: '4px 0 0' }}>{error}</p>}
    </div>
  )
}

function VerifiedBadge({ label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 16px', background: 'rgba(5,150,105,0.07)', border: '1px solid rgba(5,150,105,0.2)', borderRadius: 12 }}>
      <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={3}><polyline points="20 6 9 17 4 12" /></svg>
      </div>
      <span style={{ fontSize: 13, fontWeight: 600, color: '#059669' }}>{label}</span>
    </div>
  )
}

function EyeOn() { return <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg> }
function EyeOff() { return <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg> }
function AlertIcon() { return <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg> }
function Spinner() { return <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ animation: 'spin 0.8s linear infinite', flexShrink: 0 }}><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg> }