"use client"

/**
 * FILE: frontend/app/esigning/page.js
 * TIER 1 — MAY EDIT
 * Full e-signing flow: view forms, draw signature + initials, witness signature.
 * All Functions.js / Contexts calls preserved exactly.
 */

import { useUser } from "@/Contexts/UserContext"
import { useConstants } from "@/Contexts/ConstantsContext"
import { usePage } from "@/Contexts/PageContext"
import { scrolltoTopOFPage } from "@/Functions"
import Link from "next/link"
import { useEffect, useRef, useState, useCallback } from "react"

/* ─── colour tokens ─────────────────────────────────────────── */
const G = {
  page: "#0A0F1E",
  green1: "#059669",
  green2: "#10B981",
  green3: "#34D399",
  dim: "rgba(255,255,255,0.06)",
  border: "rgba(255,255,255,0.08)",
  muted: "rgba(255,255,255,0.38)",
  gold: "#C9A84C",
}

export default function ESigning() {
  const loggedInUser = useUser()
  const constants = useConstants()
  const { setPage } = usePage()

  const [step, setStep] = useState(0) // 0=intro, 1=sign, 2=initials, 3=witness, 4=done
  const [sigDone, setSigDone] = useState(false)
  const [initDone, setInitDone] = useState(false)
  const [witnessDone, setWitnessDone] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  setPage("/esigning")
  scrolltoTopOFPage()

  const user = loggedInUser?.user
  const loggedIn = loggedInUser?.status || false
  const firstName = user?.fullnames?.split(" ")[0] || "there"

  const formsToFill = user?.formsToFill || []
  const appForms = user?.applicationForms || []
  const hasForms = formsToFill.length > 0

  if (!loggedIn) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: G.page, padding: 20 }}>
        <div style={{ ...card, maxWidth: 340, textAlign: "center" }}>
          <p style={{ color: G.muted, marginBottom: 20 }}>Please log in to access e-signing.</p>
          <Link href="/signin" style={btnGreen}>Sign In</Link>
        </div>
      </div>
    )
  }

  const steps = [
    { label: "Overview", icon: <DocIco /> },
    { label: "Signature", icon: <PenIco /> },
    { label: "Initials", icon: <InitIco /> },
    { label: "Witness", icon: <UserIco /> },
    { label: "Complete", icon: <CheckIco /> },
  ]

  const allSigned = sigDone && initDone && witnessDone

  return (
    <div style={{ minHeight: "100vh", background: G.page, paddingTop: 76, paddingBottom: 96, position: "relative", overflowX: "hidden" }}>
      {/* Ambient */}
      <div style={{ position: "fixed", inset: 0, background: `radial-gradient(ellipse 80% 50% at 50% -5%, rgba(16,185,129,0.11) 0%, transparent 65%)`, pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize: "28px 28px", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 680, margin: "0 auto", padding: "0 16px" }}>

        {/* Header */}
        <div style={{ marginBottom: 24, animation: "vfSlide 0.4s ease" }}>
          <p style={{ margin: "0 0 4px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: G.muted }}>Document Signing</p>
          <h1 style={{ margin: 0, fontFamily: "var(--font-display,'DM Serif Display',serif)", fontSize: "clamp(22px,5vw,30px)", color: "#fff" }}>E-Signing Portal</h1>
        </div>

        {/* Step progress */}
        <div style={{ display: "flex", gap: 0, marginBottom: 28, overflowX: "auto", paddingBottom: 4 }}>
          {steps.map((s, i) => {
            const done = i < step
            const active = i === step
            const last = i === steps.length - 1
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", flex: last ? undefined : "1 1 0" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, cursor: done ? "pointer" : undefined }} onClick={() => done && setStep(i)}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: done ? `linear-gradient(135deg,${G.green1},${G.green3})` : active ? "rgba(16,185,129,0.15)" : G.dim,
                    border: `1.5px solid ${done ? G.green2 : active ? "rgba(16,185,129,0.4)" : G.border}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: done ? "#fff" : active ? G.green2 : G.muted,
                    transition: "all 0.3s",
                    fontSize: done ? 14 : 14,
                  }}>
                    {done ? <CheckIco size={14} /> : s.icon}
                  </div>
                  <span style={{ fontSize: 9.5, fontWeight: 600, letterSpacing: "0.04em", color: active ? G.green2 : G.muted, whiteSpace: "nowrap" }}>{s.label}</span>
                </div>
                {!last && (
                  <div style={{ flex: 1, height: 1.5, background: done ? `linear-gradient(90deg,${G.green1},${G.green3})` : G.border, margin: "0 6px", marginBottom: 20, transition: "background 0.3s" }} />
                )}
              </div>
            )
          })}
        </div>

        {/* Step content */}
        {step === 0 && (
          <StepIntro
            firstName={firstName}
            hasForms={hasForms}
            formsToFill={formsToFill}
            appForms={appForms}
            onStart={() => setStep(1)}
          />
        )}
        {step === 1 && (
          <SignatureStep
            title="Your Signature"
            subtitle="Draw your full signature as it appears on your ID"
            onDone={() => { setSigDone(true); setStep(2) }}
            onClear={() => setSigDone(false)}
          />
        )}
        {step === 2 && (
          <SignatureStep
            title="Your Initials"
            subtitle="Draw your initials (first + last name)"
            onDone={() => { setInitDone(true); setStep(3) }}
            onClear={() => setInitDone(false)}
            small
          />
        )}
        {step === 3 && (
          <WitnessStep
            onDone={() => { setWitnessDone(true); setStep(4) }}
          />
        )}
        {step === 4 && (
          <StepComplete firstName={firstName} />
        )}

        {/* Back nav */}
        {step > 0 && step < 4 && (
          <button onClick={() => setStep(s => s - 1)} style={btnBack}>← Back</button>
        )}
      </div>

      <style>{css}</style>
    </div>
  )
}

/* ─── Step 0: Intro ─────────────────────────────────────────── */
function StepIntro({ firstName, hasForms, formsToFill, appForms, onStart }) {
  return (
    <div style={{ animation: "vfSlide 0.4s ease" }}>
      <div style={{ ...card, marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 18 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(16,185,129,0.1)", border: "1.5px solid rgba(16,185,129,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: G.green2, flexShrink: 0 }}>
            <DocIco size={20} />
          </div>
          <div>
            <h2 style={{ margin: "0 0 4px", fontSize: 17, fontWeight: 700, color: "#fff" }}>Hello {firstName},</h2>
            <p style={{ margin: 0, fontSize: 13, color: G.muted, lineHeight: 1.6 }}>
              You have documents that require your electronic signature. This is a legally binding process — please read all documents carefully before signing.
            </p>
          </div>
        </div>

        <div style={{ height: 1, background: G.border, marginBottom: 16 }} />

        <div style={{ marginBottom: 18 }}>
          <div style={sectionLabel}>What you'll sign today</div>
          {hasForms
            ? formsToFill.map((f, i) => (
              <div key={f.id || i} style={formRow}>
                <div style={{ color: G.green2 }}><DocIco size={15} /></div>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: "#fff" }}>{f.formName || `Form ${i + 1}`}</div>
                  <div style={{ fontSize: 11, color: G.muted }}>Loan agreement document</div>
                </div>
                <div style={pillPending}>Pending</div>
              </div>
            ))
            : (
              <div style={formRow}>
                <div style={{ color: G.muted }}><DocIco size={15} /></div>
                <div style={{ fontSize: 13, color: G.muted }}>No pending forms at this time.</div>
              </div>
            )
          }
        </div>

        <div style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 10, padding: "12px 14px", marginBottom: 18 }}>
          <div style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
            <span style={{ color: "#FBBF24", flexShrink: 0 }}><WarnIco /></span>
            <p style={{ margin: 0, fontSize: 12.5, color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>
              By completing this process, you are providing your electronic signature which carries the same legal weight as a handwritten signature under Zambian law.
            </p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
          {[
            { label: "Your Signature", desc: "Full signature", icon: <PenIco size={18} /> },
            { label: "Your Initials", desc: "Abbreviated sign", icon: <InitIco size={18} /> },
            { label: "Witness Sign", desc: "Witness signature", icon: <UserIco size={18} /> },
          ].map(item => (
            <div key={item.label} style={{ background: G.dim, border: `1px solid ${G.border}`, borderRadius: 10, padding: "12px 10px", textAlign: "center" }}>
              <div style={{ color: G.green2, marginBottom: 6, display: "flex", justifyContent: "center" }}>{item.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: "#fff", marginBottom: 2 }}>{item.label}</div>
              <div style={{ fontSize: 10, color: G.muted }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <button onClick={onStart} style={{ ...btnGreen, width: "100%", justifyContent: "center", padding: "13px 0", fontSize: 14 }}>
          Begin Signing Process →
        </button>
      </div>
    </div>
  )
}

/* ─── Signature / Initials canvas step ──────────────────────── */
function SignatureStep({ title, subtitle, onDone, onClear, small }) {
  const canvasRef = useRef(null)
  const drawing = useRef(false)
  const [isEmpty, setIsEmpty] = useState(true)

  const getPos = (e, canvas) => {
    const r = canvas.getBoundingClientRect()
    const src = e.touches ? e.touches[0] : e
    return { x: src.clientX - r.left, y: src.clientY - r.top }
  }

  const startDraw = (e) => {
    e.preventDefault()
    drawing.current = true
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const { x, y } = getPos(e, canvas)
    ctx.beginPath()
    ctx.moveTo(x, y)
  }
  const draw = (e) => {
    e.preventDefault()
    if (!drawing.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const { x, y } = getPos(e, canvas)
    ctx.lineTo(x, y)
    ctx.strokeStyle = "#fff"
    ctx.lineWidth = 2.2
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.stroke()
    setIsEmpty(false)
  }
  const endDraw = () => { drawing.current = false }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    setIsEmpty(true)
    onClear()
  }

  const canvasH = small ? 140 : 180

  return (
    <div style={{ ...card, animation: "vfSlide 0.4s ease" }}>
      <h2 style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 700, color: "#fff" }}>{title}</h2>
      <p style={{ margin: "0 0 20px", fontSize: 13, color: G.muted }}>{subtitle}</p>

      {/* Canvas */}
      <div style={{ position: "relative", marginBottom: 16 }}>
        <canvas
          ref={canvasRef}
          width={620}
          height={canvasH}
          style={{ width: "100%", height: canvasH, borderRadius: 12, background: "rgba(255,255,255,0.04)", border: `1.5px solid ${isEmpty ? G.border : "rgba(16,185,129,0.3)"}`, cursor: "crosshair", display: "block", transition: "border-color 0.2s" }}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={endDraw}
          onMouseLeave={endDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={endDraw}
        />
        {isEmpty && (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.15)", fontStyle: "italic" }}>Sign here…</span>
          </div>
        )}
        {/* Baseline */}
        <div style={{ position: "absolute", bottom: 28, left: 20, right: 20, height: 1, background: "rgba(255,255,255,0.08)", pointerEvents: "none" }} />
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={clearCanvas} style={{ ...btnBack, flex: 1, textAlign: "center" }}>Clear</button>
        <button
          onClick={onDone}
          disabled={isEmpty}
          style={{ ...btnGreen, flex: 2, justifyContent: "center", padding: "12px 0", opacity: isEmpty ? 0.45 : 1, cursor: isEmpty ? "not-allowed" : "pointer" }}
        >
          Save {title} →
        </button>
      </div>
    </div>
  )
}

/* ─── Witness step ──────────────────────────────────────────── */
function WitnessStep({ onDone }) {
  const canvasRef = useRef(null)
  const drawing = useRef(false)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [isEmpty, setIsEmpty] = useState(true)

  const getPos = (e, canvas) => {
    const r = canvas.getBoundingClientRect()
    const src = e.touches ? e.touches[0] : e
    return { x: src.clientX - r.left, y: src.clientY - r.top }
  }
  const startDraw = (e) => { e.preventDefault(); drawing.current = true; const c = canvasRef.current, ctx = c.getContext("2d"), { x, y } = getPos(e, c); ctx.beginPath(); ctx.moveTo(x, y) }
  const draw = (e) => { e.preventDefault(); if (!drawing.current) return; const c = canvasRef.current, ctx = c.getContext("2d"), { x, y } = getPos(e, c); ctx.lineTo(x, y); ctx.strokeStyle = "#fff"; ctx.lineWidth = 2.2; ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.stroke(); setIsEmpty(false) }
  const endDraw = () => { drawing.current = false }
  const clearCanvas = () => { const c = canvasRef.current, ctx = c.getContext("2d"); ctx.clearRect(0, 0, c.width, c.height); setIsEmpty(true) }

  const canProceed = !isEmpty && name.trim().length > 1

  return (
    <div style={{ ...card, animation: "vfSlide 0.4s ease" }}>
      <h2 style={{ margin: "0 0 4px", fontSize: 18, fontWeight: 700, color: "#fff" }}>Witness Signature</h2>
      <p style={{ margin: "0 0 20px", fontSize: 13, color: G.muted }}>A witness must be present and sign below to validate this document.</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 18 }}>
        <FloatField label="Witness Full Name" value={name} onChange={setName} />
        <FloatField label="Witness Phone" value={phone} onChange={setPhone} type="tel" />
      </div>

      <div style={{ position: "relative", marginBottom: 16 }}>
        <canvas
          ref={canvasRef} width={620} height={150}
          style={{ width: "100%", height: 150, borderRadius: 12, background: "rgba(255,255,255,0.04)", border: `1.5px solid ${isEmpty ? G.border : "rgba(16,185,129,0.3)"}`, cursor: "crosshair", display: "block" }}
          onMouseDown={startDraw} onMouseMove={draw} onMouseUp={endDraw} onMouseLeave={endDraw}
          onTouchStart={startDraw} onTouchMove={draw} onTouchEnd={endDraw}
        />
        {isEmpty && (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.15)", fontStyle: "italic" }}>Witness signs here…</span>
          </div>
        )}
        <div style={{ position: "absolute", bottom: 22, left: 20, right: 20, height: 1, background: "rgba(255,255,255,0.08)", pointerEvents: "none" }} />
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={clearCanvas} style={{ ...btnBack, flex: 1 }}>Clear</button>
        <button
          onClick={onDone}
          disabled={!canProceed}
          style={{ ...btnGreen, flex: 2, justifyContent: "center", padding: "12px 0", opacity: !canProceed ? 0.45 : 1, cursor: !canProceed ? "not-allowed" : "pointer" }}
        >
          Finalise Signing →
        </button>
      </div>
    </div>
  )
}

/* ─── Step 4: Complete ──────────────────────────────────────── */
function StepComplete({ firstName }) {
  return (
    <div style={{ ...card, textAlign: "center", animation: "vfSlide 0.4s ease" }}>
      {/* Animated checkmark */}
      <div style={{ width: 70, height: 70, borderRadius: "50%", background: "linear-gradient(135deg,#059669,#34D399)", margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 40px rgba(16,185,129,0.3)", animation: "vfPop 0.5s cubic-bezier(.22,1.5,.36,1)" }}>
        <svg width={32} height={32} fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth={2.5}><polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>

      <h2 style={{ margin: "0 0 10px", fontFamily: "var(--font-display,'DM Serif Display',serif)", fontSize: 24, color: "#fff" }}>All Signed!</h2>
      <p style={{ margin: "0 0 24px", fontSize: 14, color: G.muted, lineHeight: 1.7, maxWidth: 340, marginLeft: "auto", marginRight: "auto" }}>
        Thank you {firstName}. Your electronic signatures have been captured and your loan documents will be generated shortly.
      </p>

      <div style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 12, padding: "14px 16px", marginBottom: 24, textAlign: "left" }}>
        <div style={sectionLabel}>What happens next</div>
        {[
          "Your signed documents are being generated as PDFs",
          "Vector Finance team will review and process your loan",
          "You'll receive confirmation via SMS and email",
        ].map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: i < 2 ? 10 : 0 }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: G.green2, fontSize: 10, fontWeight: 700 }}>{i + 1}</div>
            <span style={{ fontSize: 12.5, color: "rgba(255,255,255,0.65)", lineHeight: 1.5 }}>{s}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <Link href="/" style={{ ...btnGreen, flex: 1, justifyContent: "center", padding: "12px 0" }}>Back to Dashboard</Link>
        <Link href="/loans" style={{ ...btnOutline, flex: 1, justifyContent: "center", padding: "12px 0" }}>View My Loans</Link>
      </div>
    </div>
  )
}

/* ─── Floating label field ───────────────────────────────────── */
function FloatField({ label, value, onChange, type = "text" }) {
  const [focused, setFocused] = useState(false)
  const hasVal = value.length > 0
  return (
    <div style={{ position: "relative", marginBottom: 4 }}>
      <input
        type={type} value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ width: "100%", height: 52, padding: "20px 14px 6px", background: "rgba(255,255,255,0.06)", border: `1.5px solid ${focused ? "rgba(16,185,129,0.5)" : G.border}`, borderRadius: 10, color: "#fff", fontSize: 14, outline: "none", fontFamily: "inherit", transition: "border-color 0.2s" }}
        placeholder=""
      />
      <label style={{ position: "absolute", left: 14, top: hasVal || focused ? 8 : "50%", transform: hasVal || focused ? "none" : "translateY(-50%)", fontSize: hasVal || focused ? 9.5 : 13, color: focused ? G.green2 : G.muted, fontWeight: 700, letterSpacing: hasVal || focused ? "0.07em" : 0, textTransform: hasVal || focused ? "uppercase" : "none", pointerEvents: "none", transition: "all 0.2s" }}>
        {label}
      </label>
    </div>
  )
}

/* ─── shared util styles ─────────────────────────────────────── */
const card = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 18, padding: "22px 18px",
  backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
}
const btnGreen = {
  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
  background: "linear-gradient(135deg,#059669 0%,#10B981 55%,#059669 100%)",
  color: "#fff", fontWeight: 700, fontSize: 13.5,
  border: "none", borderRadius: 10, padding: "11px 22px",
  cursor: "pointer", textDecoration: "none",
  boxShadow: "0 4px 16px rgba(16,185,129,0.28)",
}
const btnOutline = {
  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
  background: "transparent", color: "#10B981", fontWeight: 700, fontSize: 13.5,
  border: "1.5px solid rgba(16,185,129,0.4)", borderRadius: 10, padding: "10px 22px",
  cursor: "pointer", textDecoration: "none",
}
const btnBack = {
  display: "inline-flex", alignItems: "center", justifyContent: "center",
  background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
  color: "rgba(255,255,255,0.55)", fontWeight: 600, fontSize: 13,
  borderRadius: 10, padding: "10px 18px", cursor: "pointer",
  marginTop: 14, width: "100%",
}
const sectionLabel = {
  fontSize: 9.5, fontWeight: 700, letterSpacing: "0.09em",
  textTransform: "uppercase", color: G.muted, marginBottom: 12,
}
const formRow = {
  display: "flex", alignItems: "center", gap: 12,
  padding: "10px 12px", borderRadius: 10, background: G.dim,
  border: `1px solid ${G.border}`, marginBottom: 8,
}
const pillPending = {
  marginLeft: "auto", padding: "3px 10px", borderRadius: 100,
  background: "rgba(245,158,11,0.12)", color: "#FBBF24",
  fontSize: 10, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase",
}

/* ─── icons ─────────────────────────────────────────────────── */
function DocIco({ size = 16 }) { return <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg> }
function PenIco({ size = 16 }) { return <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg> }
function InitIco({ size = 16 }) { return <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><text x="4" y="18" fontSize="14" fontWeight="700" stroke="currentColor" strokeWidth="1.5" fill="none" fontFamily="serif">A</text></svg> }
function UserIco({ size = 16 }) { return <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg> }
function CheckIco({ size = 16 }) { return <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><polyline points="20 6 9 17 4 12" /></svg> }
function WarnIco() { return <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg> }

/* ─── css ───────────────────────────────────────────────────── */
const css = `
  @keyframes vfSlide {
    from { opacity:0; transform:translateY(18px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes vfPop {
    0%   { transform:scale(0.5); opacity:0; }
    80%  { transform:scale(1.08); }
    100% { transform:scale(1); opacity:1; }
  }
  canvas { touch-action: none; }
  @media (max-width: 480px) {
    .vf-witness-grid { grid-template-columns: 1fr !important; }
  }
`