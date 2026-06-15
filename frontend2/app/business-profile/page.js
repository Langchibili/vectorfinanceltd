'use client'

import BusinessInformationForm from '@/components/Forms/BusinessInformationForm'
import UpdateClientDetailsForm from '@/components/Forms/UpdateClientDetailsForm'
import UpdateDetailsForm from '@/components/Forms/UpdateDetailsForm'
import { useConstants } from '@/Contexts/ConstantsContext'
import { usePage } from '@/Contexts/PageContext'
import { useUser } from '@/Contexts/UserContext'
import { scrolltoTopOFPage } from '@/Functions'
import { useState } from 'react'

export default function BusinessProfile() {
  const loggedInUser = useUser()
  const constants = useConstants()
  const { setPage } = usePage()
  const loggedIn = loggedInUser?.status || false
  const [activeSection, setActiveSection] = useState('personal')

  setPage('/business-profile')
  scrolltoTopOFPage()

  if (!loggedIn) {
    if (typeof window !== 'undefined') window.location = '/signin'
    return null
  }

  const user = loggedInUser.user
  const initials = user?.fullnames ? user.fullnames.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?'

  const sections = [
    { id: 'personal', label: 'Personal', icon: <PersonIcon /> },
    { id: 'identity', label: 'Identity', icon: <IdIcon /> },
    { id: 'business', label: 'Business', icon: <BizIcon /> },
  ]

  return (
    <div className="page-content page-enter" style={{ background: '#F7F5F0', minHeight: '100vh', paddingBottom: 100 }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(160deg, #0A0F1E 0%, #0F1930 60%, #130E06 100%)', padding: '28px 20px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -60, right: -50, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,76,0.10) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -30, left: -40, width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 640, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <p style={{ color: 'rgba(201,168,76,0.7)', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 6px' }}>Business Account</p>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(24px,5vw,32px)', color: '#fff', fontWeight: 400, margin: '0 0 16px' }}>Business Profile</h1>

          {/* Avatar + name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, background: 'linear-gradient(135deg, #C9A84C, #E8C87A)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(201,168,76,0.3)', flexShrink: 0 }}>
              <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: '#0A0F1E' }}>{initials}</span>
            </div>
            <div>
              <p style={{ fontSize: 16, fontWeight: 700, color: '#fff', margin: '0 0 3px', fontFamily: "'DM Serif Display', serif" }}>{user?.fullnames || 'Client'}</p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.42)', margin: 0 }}>Business / Company Loan Applicant</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 16px' }}>
        {/* Notice */}
        <div style={{ marginTop: -36, marginBottom: 20 }}>
          <div className="vf-card" style={{ padding: '16px 20px' }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <BizBadge />
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: '#1A1A2E', margin: '0 0 3px' }}>Business & Company Loan Applicants</p>
                <p style={{ fontSize: 12, color: '#6B7280', margin: 0, lineHeight: 1.6 }}>
                  Complete all sections to qualify for business financing. Ensure your PACRA registration and business details are accurate.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, overflowX: 'auto', paddingBottom: 4 }}>
          {sections.map(sec => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '9px 16px', borderRadius: 10, border: 'none', cursor: 'pointer',
                fontSize: 13, fontWeight: 600, flexShrink: 0,
                fontFamily: "'DM Sans', system-ui, sans-serif",
                background: activeSection === sec.id ? '#0A0F1E' : 'rgba(26,26,46,0.06)',
                color: activeSection === sec.id ? '#C9A84C' : '#6B7280',
                boxShadow: activeSection === sec.id ? '0 4px 16px rgba(0,0,0,0.15)' : 'none',
                transition: 'all 0.2s',
              }}
            >
              {sec.icon}
              {sec.label}
            </button>
          ))}
        </div>

        {/* Form sections */}
        <div className="page-enter">
          {activeSection === 'personal' && (
            <FormSection title="Personal Details" icon={<PersonIcon gold />}>
              <UpdateDetailsForm
                loggedInUser={loggedInUser.user}
                constants={constants}
                loanCategory="business"
                formDisplay="profile"
              />
            </FormSection>
          )}

          {activeSection === 'identity' && (
            <FormSection title="Identity & Client Details" icon={<IdIcon gold />}>
              <UpdateClientDetailsForm
                loggedInUser={loggedInUser.user}
                constants={constants}
                loanCategory="business"
                formDisplay="profile"
              />
            </FormSection>
          )}

          {activeSection === 'business' && (
            <FormSection title="Business Information" icon={<BizIcon gold />}>
              <BusinessInformationForm
                loggedInUser={loggedInUser.user}
                constants={constants}
                loanCategory="business"
                formDisplay="profile"
              />
            </FormSection>
          )}
        </div>
      </div>
    </div>
  )
}

function FormSection({ title, icon, children }) {
  return (
    <div className="vf-card" style={{ overflow: 'visible' }}>
      <div style={{ padding: '16px 20px 14px', borderBottom: '1px solid rgba(26,26,46,0.06)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(201,168,76,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {icon}
        </div>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1A1A2E', margin: 0 }}>{title}</h3>
      </div>
      <div style={{ padding: '20px' }}>
        {children}
      </div>
    </div>
  )
}

function PersonIcon({ gold }) {
  return <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke={gold ? '#C9A84C' : 'currentColor'} strokeWidth={1.8}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
}
function IdIcon({ gold }) {
  return <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke={gold ? '#C9A84C' : 'currentColor'} strokeWidth={1.8}><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M16 10h2M16 14h2M7 10h5M7 14h5" /></svg>
}
function BizIcon({ gold }) {
  return <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke={gold ? '#C9A84C' : 'currentColor'} strokeWidth={1.8}><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" /></svg>
}
function BizBadge() {
  return (
    <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <BizIcon gold />
    </div>
  )
}