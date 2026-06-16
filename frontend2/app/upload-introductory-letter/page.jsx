'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Uploader from '@/components/Includes/Uploader/Uploader'

/* ─── colour tokens (matches the app's dark theme) ─── */
const G = {
    page: '#0A0F1E',
    green1: '#059669',
    green2: '#10B981',
    green3: '#34D399',
    muted: 'rgba(255,255,255,0.38)',
    dim: 'rgba(255,255,255,0.05)',
    border: 'rgba(255,255,255,0.08)',
}

/* ─── invalid / missing salaryId screen ─── */
function InvalidLink() {
    return (
        <div style={{ minHeight: '100vh', background: G.page, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: "system-ui, sans-serif" }}>
            <div style={{ maxWidth: 440, textAlign: 'center' }}>
                <div style={{ width: 60, height: 60, borderRadius: 16, background: 'rgba(248,113,113,0.12)', border: '1.5px solid rgba(248,113,113,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                    <svg width={26} height={26} fill="none" viewBox="0 0 24 24" stroke="#F87171" strokeWidth={2}><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                </div>
                <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, margin: '0 0 10px' }}>Invalid Upload Link</h2>
                <p style={{ color: G.muted, fontSize: 14, lineHeight: 1.65, margin: '0 0 6px' }}>
                    This link appears to be invalid or incomplete. Please contact the employee who shared this link and ask them to send a new one.
                </p>
            </div>
        </div>
    )
}

/* ─── success screen ─── */
function SuccessScreen({ fileCount }) {
    return (
        <div style={{ minHeight: '100vh', background: G.page, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: "system-ui, sans-serif" }}>
            <div style={{ maxWidth: 480, textAlign: 'center' }}>
                <div style={{
                    width: 72, height: 72, borderRadius: 20,
                    background: 'linear-gradient(135deg, rgba(16,185,129,0.25), rgba(5,150,105,0.1))',
                    border: '2px solid rgba(16,185,129,0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 24px',
                }}>
                    <svg width={32} height={32} fill="none" viewBox="0 0 24 24" stroke="#34D399" strokeWidth={2.2}><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <h2 style={{ color: '#fff', fontSize: 22, fontWeight: 700, margin: '0 0 10px', letterSpacing: '-0.3px' }}>Upload Successful</h2>
                <p style={{ color: G.muted, fontSize: 14, lineHeight: 1.65, margin: '0 0 18px' }}>
                    Thank you. {fileCount === 1 ? 'The document has' : `${fileCount} documents have`} been securely submitted. The loan team will review the introductory letter and be in touch with the applicant shortly.
                </p>
                <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 12, padding: '12px 16px', color: '#6EE7B7', fontSize: 13 }}>
                    You may now close this page.
                </div>
            </div>
        </div>
    )
}

/* ─── main upload form ─── */
function UploadContent() {
    const searchParams = useSearchParams()
    const salaryId = searchParams.get('salaryId')
    const [filesUploaded, setFilesUploaded] = useState([])
    const [uploadComplete, setUploadComplete] = useState(false)

    const handleFilesAdded = (files) => {
        const updated = [...filesUploaded, ...files]
        setFilesUploaded(updated)
        setUploadComplete(true)
    }

    if (!salaryId || isNaN(Number(salaryId))) {
        return <InvalidLink />
    }

    if (uploadComplete && filesUploaded.length > 0) {
        return <SuccessScreen fileCount={filesUploaded.length} />
    }

    return (
        <div style={{ minHeight: '100vh', background: G.page, fontFamily: "system-ui, -apple-system, sans-serif", padding: '40px 16px' }}>

            {/* Subtle background radial */}
            <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(16,185,129,0.10) 0%, transparent 65%)', pointerEvents: 'none' }} />

            <div style={{ position: 'relative', maxWidth: 580, margin: '0 auto' }}>

                {/* Logo / brand strip */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 36 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg,#059669,#10B981)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2.2}><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                    <span style={{ color: '#fff', fontWeight: 700, fontSize: 16, letterSpacing: '-0.2px' }}>VectorFinance</span>
                </div>

                {/* Main card */}
                <div style={{ background: 'linear-gradient(145deg, #111827, #0d1526)', border: `1px solid ${G.border}`, borderRadius: 20, overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.45)' }}>

                    {/* Card header */}
                    <div style={{ padding: '28px 28px 22px', borderBottom: `1px solid ${G.border}`, background: 'linear-gradient(135deg, rgba(16,185,129,0.07), rgba(59,130,246,0.04))' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                            <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(16,185,129,0.12)', border: '1.5px solid rgba(16,185,129,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <svg width={19} height={19} fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth={2}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="12" y1="18" x2="12" y2="12" /><line x1="9" y1="15" x2="15" y2="15" /></svg>
                            </div>
                            <div>
                                <h1 style={{ color: '#fff', fontSize: 18, fontWeight: 700, margin: 0, letterSpacing: '-0.3px' }}>Introductory Letter Upload</h1>
                                <p style={{ color: G.muted, fontSize: 12, margin: '3px 0 0' }}>Employment Verification — VectorFinance Loan Application</p>
                            </div>
                        </div>
                    </div>

                    {/* Card body */}
                    <div style={{ padding: '26px 28px 32px' }}>

                        {/* Instructions banner */}
                        <div style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.20)', borderRadius: 12, padding: '14px 16px', marginBottom: 26 }}>
                            <p style={{ color: '#93C5FD', fontSize: 13.5, lineHeight: 1.65, margin: 0 }}>
                                <strong style={{ display: 'block', marginBottom: 6, fontSize: 14 }}>Instructions for HR / Authorized Personnel</strong>
                                One of your employees has applied for a loan with VectorFinance. As part of the verification process, we require a stamped introductory letter from their employer confirming their employment status. Please upload the signed and stamped letter below.
                            </p>
                        </div>

                        {/* Requirements */}
                        <div style={{ marginBottom: 24 }}>
                            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', margin: '0 0 12px' }}>Document Requirements</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                {[
                                    'Must be printed on company letterhead',
                                    'Must bear an official company stamp / seal',
                                    'Must be signed by an authorized signatory (HR Manager or above)',
                                    'Must confirm the employee\'s full name, position, and employment status',
                                    'Accepted formats: PDF, Word document (.doc / .docx), or Excel',
                                ].map((req, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                                        <div style={{ width: 16, height: 16, borderRadius: 5, background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                                            <svg width={8} height={8} viewBox="0 0 12 12" fill="none"><polyline points="2 6 5 9 10 3" stroke="#34D399" strokeWidth={2} strokeLinecap="round" /></svg>
                                        </div>
                                        <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, lineHeight: 1.5 }}>{req}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Divider */}
                        <div style={{ height: 1, background: G.border, margin: '0 0 24px' }} />

                        {/* Uploader section */}
                        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', margin: '0 0 12px' }}>Upload Document</p>

                        <Uploader
                            addFiles={handleFilesAdded}
                            displayType="circular"
                            refId={Number(salaryId)}
                            refName="client-details.salary"
                            fieldName="introductoryLetter"
                            allowMultiple={false}
                            uploadPublicly={true}
                            allowedTypes={[
                                'application/pdf',
                                'application/msword',
                                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                                'text/plain',
                                'application/vnd.ms-excel',
                                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                            ]}
                        />

                        <p style={{ color: G.muted, fontSize: 12, marginTop: 10, lineHeight: 1.5 }}>
                            Accepted formats: PDF, Word (.doc, .docx), Excel, or plain text. Maximum 1 file.
                        </p>

                        {/* Privacy note */}
                        <div style={{ marginTop: 24, background: 'rgba(255,255,255,0.03)', border: `1px solid ${G.border}`, borderRadius: 10, padding: '12px 14px' }}>
                            <p style={{ color: G.muted, fontSize: 12, margin: 0, lineHeight: 1.6 }}>
                                🔒 <strong style={{ color: 'rgba(255,255,255,0.45)' }}>Privacy:</strong> This document is transmitted securely and used solely for loan application verification purposes. It will not be shared with any third parties.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <p style={{ color: G.muted, fontSize: 12, textAlign: 'center', marginTop: 24, lineHeight: 1.6 }}>
                    Questions? Contact us at <span style={{ color: G.green2 }}>support@vectorfinance.com</span>
                </p>
            </div>
        </div>
    )
}

/* ─── page export — Suspense required for useSearchParams ─── */
export default function UploadIntroductoryLetterPage() {
    return (
        <Suspense fallback={
            <div style={{ minHeight: '100vh', background: '#0A0F1E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 22, height: 22, border: '2.5px solid #10B981', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        }>
            <UploadContent />
        </Suspense>
    )
}