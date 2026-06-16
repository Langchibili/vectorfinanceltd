'use client'

/**
 * LoanDetails.js — frontend/src/components/Includes/AdminComponents/LoanDetails.js
 */

import { useState } from 'react'
import Link from 'next/link'
import { backEndUrl } from '@/Constants'
import { useBottomNav } from '@/Contexts/BottomNavContext'

/* ─── Strapi normalizer ─────────────────────────────────────── */
function normalizeStrapi(obj) {
  if (obj === null || obj === undefined) return obj
  if (typeof obj !== 'object') return obj
  if (Array.isArray(obj)) return obj.map(normalizeStrapi)
  if (
    obj.data !== undefined &&
    !Array.isArray(obj.data) &&
    obj.data !== null &&
    typeof obj.data === 'object' &&
    obj.data.attributes !== undefined
  ) {
    return normalizeStrapi({ id: obj.data.id, ...obj.data.attributes })
  }
  if (obj.data !== undefined && Array.isArray(obj.data)) {
    return obj.data.map(item =>
      item && item.attributes
        ? normalizeStrapi({ id: item.id, ...item.attributes })
        : normalizeStrapi(item)
    )
  }
  const result = {}
  for (const key of Object.keys(obj)) result[key] = normalizeStrapi(obj[key])
  return result
}

/* ─── Helpers ───────────────────────────────────────────────── */
const fmt = v => (v == null || v === '' ? '—' : String(v))
const fmtMoney = v => v == null ? '—' : `K${Number(v).toLocaleString('en-ZM', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
const fmtDate = v => v ? new Date(v).toLocaleDateString('en-ZM', { year: 'numeric', month: 'short', day: 'numeric' }) : '—'

function getUrl(file) {
  if (!file) return null
  if (typeof file === 'string') return file.startsWith('http') ? file : backEndUrl + file
  if (!file.url) return null
  return file.url.startsWith('http') ? file.url : backEndUrl + file.url
}

function normalizeFiles(raw) {
  if (!raw) return []
  if (Array.isArray(raw)) return raw.filter(Boolean)
  return [raw]
}

/* ─── Status colours ────────────────────────────────────────── */
const STATUS_COLOURS = {
  'initiated': ['rgba(251,191,36,0.12)', '#FBBF24'],
  'pending-collateral-addition': ['rgba(251,191,36,0.12)', '#FBBF24'],
  'pending-collateral-inspection': ['rgba(251,191,36,0.12)', '#FBBF24'],
  'collateral-inspection': ['rgba(167,139,250,0.12)', '#A78BFA'],
  'request-approval': ['rgba(129,140,248,0.12)', '#818CF8'],
  'accepted': ['rgba(52,211,153,0.13)', '#34D399'],
  'pending-approval': ['rgba(167,139,250,0.12)', '#A78BFA'],
  'approved': ['rgba(16,185,129,0.14)', '#10B981'],
  'rejected': ['rgba(239,68,68,0.12)', '#F87171'],
  'disbursed': ['rgba(96,165,250,0.12)', '#60A5FA'],
  'completed': ['rgba(156,163,175,0.12)', '#9CA3AF'],
  'defaulted': ['rgba(220,38,38,0.15)', '#DC2626'],
}

function StatusPill({ status }) {
  const [bg, color] = STATUS_COLOURS[status] || ['rgba(255,255,255,0.08)', '#fff']
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '3px 10px', borderRadius: 100,
      background: bg, color, fontSize: 10, fontWeight: 700,
      letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap',
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: color, flexShrink: 0 }} />
      {status?.replace(/-/g, ' ')}
    </span>
  )
}

/* ─── Info row ──────────────────────────────────────────────── */
function InfoRow({ label: l, value: v, last, mono, gold }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
      gap: 12, padding: '10px 0',
      borderBottom: last ? 'none' : '1px solid rgba(255,255,255,0.055)',
    }}>
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', flexShrink: 0 }}>
        {l}
      </span>
      <span style={{
        fontSize: 13.5, fontWeight: 500, textAlign: 'right',
        color: gold ? '#C9A84C' : 'rgba(255,255,255,0.82)',
        fontFamily: mono ? "'JetBrains Mono', monospace" : undefined,
        wordBreak: 'break-word',
      }}>
        {v ?? '—'}
      </span>
    </div>
  )
}

/* ─── Section card ──────────────────────────────────────────── */
function Card({ children, gold, style: s }) {
  return (
    <div style={{
      position: 'relative', borderRadius: 14, overflow: 'hidden',
      background: gold
        ? 'linear-gradient(135deg, rgba(201,168,76,0.10), rgba(201,168,76,0.03))'
        : 'rgba(255,255,255,0.045)',
      border: `1px solid ${gold ? 'rgba(201,168,76,0.22)' : 'rgba(255,255,255,0.08)'}`,
      padding: '20px 22px', marginBottom: 14,
      backdropFilter: 'blur(10px)',
      ...s,
    }}>
      {children}
    </div>
  )
}

function SectionLabel({ children, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
      <div style={{ width: 3, height: 14, borderRadius: 2, background: color || 'linear-gradient(180deg,#C9A84C,#E8C87A)', flexShrink: 0 }} />
      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)' }}>
        {children}
      </span>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   DOCUMENT VIEWER
═══════════════════════════════════════════════════════════════ */
function DocumentViewer({ label, files, isVideo }) {
  const [open, setOpen] = useState(false)
  const normalised = normalizeFiles(files)
  const hasFiles = normalised.length > 0

  return (
    <div style={{ marginBottom: 4 }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          padding: '7px 14px', borderRadius: 8, border: 'none', cursor: 'pointer',
          background: open ? 'rgba(201,168,76,0.14)' : 'rgba(255,255,255,0.06)',
          color: open ? '#C9A84C' : 'rgba(255,255,255,0.6)',
          fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
          transition: 'all 0.2s',
        }}
      >
        {open ? <CollapseIcon /> : <ExpandIcon />}
        {open ? `Hide ${label}` : `Show ${label}`}
        {hasFiles && (
          <span style={{
            padding: '1px 7px', borderRadius: 100, fontSize: 10, fontWeight: 700,
            background: open ? 'rgba(201,168,76,0.25)' : 'rgba(255,255,255,0.1)',
            color: open ? '#C9A84C' : 'rgba(255,255,255,0.5)',
          }}>
            {normalised.length}
          </span>
        )}
      </button>

      {open && (
        <div style={{
          marginTop: 8, borderRadius: 12, overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(0,0,0,0.25)',
          maxHeight: 360,
          overflowY: 'auto',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
        }}>
          <div style={{
            position: 'sticky', top: 0, zIndex: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '10px 14px',
            background: 'rgba(10,15,30,0.92)',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            backdropFilter: 'blur(12px)',
          }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
              {label} {hasFiles ? `(${normalised.length})` : ''}
            </span>
            <button
              onClick={() => setOpen(false)}
              title="Collapse"
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '5px 12px', borderRadius: 7, border: 'none', cursor: 'pointer',
                background: 'rgba(255,255,255,0.07)',
                color: 'rgba(255,255,255,0.55)', fontSize: 11, fontWeight: 600,
                fontFamily: "'DM Sans', sans-serif",
                transition: 'all 0.18s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(220,38,38,0.15)'; e.currentTarget.style.color = '#F87171' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.55)' }}
            >
              <CloseIcon /> Hide
            </button>
          </div>

          <div style={{ padding: '10px 14px 14px' }}>
            {!hasFiles ? (
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: '28px 0', gap: 10,
              }}>
                <NoDocIcon />
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.28)', fontStyle: 'italic' }}>
                  No document found
                </span>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {normalised.map((file, i) => {
                  const url = getUrl(file)
                  const name = file?.name || `Document ${i + 1}`
                  const mime = file?.mime || ''
                  const isImg = mime.startsWith('image/')
                  const isPdf = mime === 'application/pdf'

                  return (
                    <div key={file?.id || i} style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '10px 12px', borderRadius: 10,
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.07)',
                    }}>
                      {isImg && url ? (
                        <img
                          src={url} alt={name}
                          style={{ width: 40, height: 40, borderRadius: 7, objectFit: 'cover', flexShrink: 0, border: '1px solid rgba(255,255,255,0.1)' }}
                        />
                      ) : (
                        <div style={{
                          width: 40, height: 40, borderRadius: 7, flexShrink: 0,
                          background: isPdf ? 'rgba(239,68,68,0.12)' : isVideo ? 'rgba(99,102,241,0.12)' : 'rgba(255,255,255,0.07)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          border: '1px solid rgba(255,255,255,0.08)',
                        }}>
                          {isPdf ? <PdfIcon /> : isVideo ? <VideoIcon /> : <FileIcon />}
                        </div>
                      )}

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12.5, fontWeight: 600, color: 'rgba(255,255,255,0.8)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {name}
                        </div>
                        {file?.size && (
                          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>
                            {(file.size / 1024).toFixed(1)} KB
                          </div>
                        )}
                      </div>

                      {url ? (
                        <a
                          href={url} target="_blank" rel="noopener noreferrer"
                          style={{
                            display: 'flex', alignItems: 'center', gap: 5,
                            padding: '6px 12px', borderRadius: 7, textDecoration: 'none',
                            background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)',
                            color: '#C9A84C', fontSize: 11, fontWeight: 700, flexShrink: 0,
                            transition: 'all 0.18s',
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.18)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'rgba(201,168,76,0.1)'}
                        >
                          <ExternalIcon /> Open
                        </a>
                      ) : (
                        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', fontStyle: 'italic' }}>No URL</span>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── Signature preview ────────────────────────────────────── */
function SignaturePreview({ label, file }) {
  const url = getUrl(file)
  if (!url) {
    return (
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 7 }}>{label}</div>
        <div style={{
          width: '100%', height: 72, borderRadius: 10,
          background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.22)', fontStyle: 'italic' }}>No signature found</span>
        </div>
      </div>
    )
  }
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 7 }}>{label}</div>
      <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}>
        <img src={url} alt={label} style={{ display: 'block', width: '100%', height: 88, objectFit: 'contain' }} />
      </div>
      <a href={url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 6, fontSize: 11, color: '#C9A84C', textDecoration: 'none', fontWeight: 600 }}>
        <ExternalIcon /> Full size
      </a>
    </div>
  )
}

/* ─── Collateral section ────────────────────────────────────── */
function CollateralSection({ collateral }) {
  if (!collateral) return null
  const { collateralType, collateralCondition, collateralStatus, inspectedValue, inspectionNotes, inspectedCondition, vehicle, land, house, CollateralMedia, otherCollateralName } = collateral

  const media = normalizeFiles(CollateralMedia)

  return (
    <Card>
      <SectionLabel>Collateral</SectionLabel>
      <InfoRow label="Type" value={fmt(collateralType)} />
      <InfoRow label="Condition" value={fmt(collateralCondition)} />
      <InfoRow label="Status" value={fmt(collateralStatus)} />
      <InfoRow label="Inspected Value" value={fmtMoney(inspectedValue)} mono />
      <InfoRow label="Inspected Condition" value={fmt(inspectedCondition)} />
      <InfoRow label="Inspection Notes" value={fmt(inspectionNotes)} />

      {collateralType === 'vehicle' && vehicle && (
        <>
          <InfoRow label="Number Plate" value={fmt(vehicle.numberPlate)} />
          <InfoRow label="Insurance" value={fmt(vehicle.insuranceType)} />
          <InfoRow label="Packed" value={fmt(vehicle.packed)} />
          <InfoRow label="Packing Fee Paid" value={fmtMoney(vehicle.packingFeePaid)} mono />
        </>
      )}
      {collateralType === 'land' && land && (
        <>
          <InfoRow label="Location" value={fmt(land.location)} />
          <InfoRow label="Plot No." value={fmt(land.plotNumber)} />
          <InfoRow label="Hectors" value={fmt(land.hectors)} />
        </>
      )}
      {collateralType === 'house' && house && (
        <>
          <InfoRow label="Location" value={fmt(house.location)} />
          <InfoRow label="Plot No." value={fmt(house.plotNumber)} />
          <InfoRow label="Dimensions" value={fmt(house.dimensions)} />
        </>
      )}
      {collateralType === 'other' && <InfoRow label="Description" value={fmt(otherCollateralName)} />}

      <div style={{ marginTop: 14 }}>
        <DocumentViewer label="Collateral Media" files={media} />
      </div>

      {vehicle?.whitebook && (
        <div style={{ marginTop: 8 }}>
          <DocumentViewer label="Whitebook" files={normalizeFiles(vehicle.whitebook)} />
        </div>
      )}
      {vehicle?.sessionLetterTemplate && (
        <div style={{ marginTop: 8 }}>
          <DocumentViewer label="Session Letter Template" files={normalizeFiles(vehicle.sessionLetterTemplate)} />
        </div>
      )}
      {vehicle?.sessionLetter && (
        <div style={{ marginTop: 8 }}>
          <DocumentViewer label="Session Letter" files={normalizeFiles(vehicle.sessionLetter)} />
        </div>
      )}
      {land?.titleDeed && (
        <div style={{ marginTop: 8 }}>
          <DocumentViewer label="Title Deed" files={normalizeFiles(land.titleDeed)} />
        </div>
      )}
      {house?.titleDeed && (
        <div style={{ marginTop: 8 }}>
          <DocumentViewer label="Title Deed" files={normalizeFiles(house.titleDeed)} />
        </div>
      )}
    </Card>
  )
}

/* ─── Inspector findings ────────────────────────────────────── */
function InspectorSection({ loan }) {
  const { inspectorRecommendationOnLoan, inspectorRecommendedAmount, inspectorReasonForLoanDisproval, collateralInspected } = loan
  if (!inspectorRecommendationOnLoan && !collateralInspected) return null
  return (
    <Card>
      <SectionLabel>Inspector Findings</SectionLabel>
      <InfoRow label="Collateral Inspected" value={collateralInspected ? 'Yes' : 'No'} />
      <InfoRow label="Recommendation" value={fmt(inspectorRecommendationOnLoan)} />
      <InfoRow label="Recommended Amount" value={fmtMoney(inspectorRecommendedAmount)} mono />
      <InfoRow label="Reason for Disapproval" value={fmt(inspectorReasonForLoanDisproval)} last />
    </Card>
  )
}

/* ═══════════════════════════════════════════════════════════════
   CLIENT MINI-CARD
   "View Client Details" switches to the Client Details tab
   via setBottomNavLink(1) — same behaviour as the nav button.
═══════════════════════════════════════════════════════════════ */
function ClientMiniCard({ client, onViewProfile }) {
  if (!client) return null

  const details = client.details || {}
  const firstName = details.firstname || ''
  const lastName = details.lastname || ''
  const fullName = client.fullnames || `${firstName} ${lastName}`.trim() || client.username || 'Client'

  const initials = (firstName && lastName)
    ? `${firstName[0]}${lastName[0]}`.toUpperCase()
    : fullName.split(' ').map(n => n[0]).filter(Boolean).join('').toUpperCase().slice(0, 2) || '?'

  const picFiles = normalizeFiles(client.profilePicture)
  const picUrl = picFiles.length > 0 ? getUrl(picFiles[0]) : null

  return (
    <Card style={{
      display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
      background: 'rgba(167,139,250,0.06)', border: '1px solid rgba(167,139,250,0.18)',
    }}>
      {/* Avatar */}
      {picUrl ? (
        <img
          src={picUrl} alt={fullName}
          style={{
            width: 52, height: 52, borderRadius: 14, objectFit: 'cover', flexShrink: 0,
            border: '2px solid rgba(167,139,250,0.4)',
          }}
        />
      ) : (
        <div style={{
          width: 52, height: 52, borderRadius: 14, flexShrink: 0,
          background: 'linear-gradient(135deg, rgba(167,139,250,0.22), rgba(167,139,250,0.08))',
          border: '1.5px solid rgba(167,139,250,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: 18, fontWeight: 400, color: '#A78BFA', lineHeight: 1,
          }}>
            {initials}
          </span>
        </div>
      )}

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(167,139,250,0.55)', marginBottom: 3 }}>
          Client
        </div>
        <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {fullName}
        </div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', marginTop: 2 }}>
          {client.email || ''}
          {client.username && client.email ? ' · ' : ''}
          {client.username || ''}
        </div>
      </div>

      {/* View Client Details — switches to Client Details tab */}
      {client.id && (
        <button
          onClick={onViewProfile}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '9px 16px', borderRadius: 10,
            background: 'rgba(167,139,250,0.12)', border: '1px solid rgba(167,139,250,0.28)',
            color: '#A78BFA', fontSize: 12, fontWeight: 700, cursor: 'pointer',
            whiteSpace: 'nowrap', flexShrink: 0, transition: 'all 0.2s',
            fontFamily: "'DM Sans', sans-serif",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(167,139,250,0.22)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(167,139,250,0.12)' }}
        >
          View Client Details <ChevronRightIcon />
        </button>
      )}
    </Card>
  )
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function LoanDetails({ loan: rawLoan, role, onUpdated, constants }) {
  const { setBottomNavLink } = useBottomNav()

  if (!rawLoan) return (
    <div style={{ minHeight: '100vh', background: '#0A0F1E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'rgba(255,255,255,0.4)' }}>No loan data available.</p>
    </div>
  )

  const loan = normalizeStrapi(rawLoan)
  const client = loan.client ?? null

  const loanType = loan.loanType || {}
  const loanDocs = normalizeFiles(loan.loanAgreementDocuments)
  const popDocs = normalizeFiles(loan.disbursementPOP)

  const sigFile = client?.signature || null
  const witSigFile = client?.witnessSignature || null
  const initFile = client?.initials || null
  const witInitFile = client?.witnessInitials || null

  const hasAnySig = sigFile || witSigFile || initFile || witInitFile

  return (
    <div style={{
      minHeight: '100vh', background: '#0A0F1E',
      position: 'relative', overflowX: 'hidden',
    }}>
      {/* Background */}
      <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse 80% 50% at 50% -5%, rgba(201,168,76,0.08) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.022) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 720, margin: '0 auto', padding: '0 16px', animation: 'vfSlide 0.38s ease' }}>
        <style>{`@keyframes vfSlide { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }`}</style>

        {/* ── Page header ── */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 5 }}>
            Admin · {role || 'Loan Detail'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <h1 style={{ margin: 0, fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(20px,4vw,26px)', color: '#fff', fontWeight: 400 }}>
              Loan #{loan.id}
            </h1>
            <StatusPill status={loan.loanStatus} />
            {loanType.typeName && (
              <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.3)' }}>
                {loanType.typeName}
              </span>
            )}
          </div>
        </div>

        {/* ── Currently viewing badge ── */}
        {loan.id && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16,
            padding: '6px 14px', borderRadius: 100,
            background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C9A84C' }} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#C9A84C' }}>
              Currently Viewing
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'rgba(201,168,76,0.7)' }}>
              #{loan.id} · {fmtMoney(loan.loanAmount)}
            </span>
          </div>
        )}

        {/* ══ CLIENT MINI-CARD ══ */}
        <ClientMiniCard
          client={client}
          onViewProfile={() => setBottomNavLink(1)}
        />

        {/* ══ CORE FINANCIALS ══ */}
        <Card>
          <SectionLabel>Loan Financials</SectionLabel>
          <InfoRow label="Requested Amount" value={fmtMoney(loan.clientAskingAmount)} mono />
          <InfoRow label="Approved Amount" value={fmtMoney(loan.loanAmount)} mono gold />
          <InfoRow label="Disbursed Amount" value={fmtMoney(loan.disbursedAmount)} mono />
          <InfoRow label="Outstanding Amount" value={fmtMoney(loan.outstandingAmount)} mono />
          <InfoRow label="Repayment Amount" value={fmtMoney(loan.repaymentAmount)} mono />
          <InfoRow label="Interest Rate" value={loan.interestRate != null ? `${loan.interestRate}%` : '—'} />
          <InfoRow label="Loan Term" value={loan.loanTerm ? `${loan.loanTerm} months` : '—'} />
          <InfoRow label="Loan Purpose" value={fmt(loan.loanPurpose)} />
          <InfoRow label="Purpose Details" value={fmt(loan.loanPurposeDetails)} last />
        </Card>

        {/* ══ TIMELINE ══ */}
        <Card>
          <SectionLabel>Timeline</SectionLabel>
          <InfoRow label="Application Date" value={fmtDate(loan.applicationDate)} />
          <InfoRow label="Acceptance Date" value={fmtDate(loan.acceptanceDate)} />
          <InfoRow label="Approval Date" value={fmtDate(loan.approvalDate)} />
          <InfoRow label="Disbursement Date" value={fmtDate(loan.disbursementDate)} />
          <InfoRow label="Due Date" value={fmtDate(loan.dueDate)} last />
        </Card>

        {/* ══ LOAN AGREEMENT DOCUMENTS ══ */}
        <Card>
          <SectionLabel>Loan Agreement Documents</SectionLabel>
          <DocumentViewer label="Loan Agreement Documents" files={loanDocs} />
        </Card>

        {/* ══ COLLATERAL ══ */}
        <CollateralSection collateral={loan.collateral} />

        {/* ══ INSPECTOR FINDINGS ══ */}
        <InspectorSection loan={loan} />

        {/* ══ DISBURSEMENT POP ══ */}
        <Card>
          <SectionLabel>Disbursement Proof of Payment</SectionLabel>
          <DocumentViewer label="Proof of Payment" files={popDocs} />
        </Card>

        {/* ══ COUNTER OFFER ══ */}
        {loan.newLoanAmountOffer > 0 && (
          <Card gold>
            <SectionLabel>Counter Offer</SectionLabel>
            <InfoRow label="Offered Amount" value={fmtMoney(loan.newLoanAmountOffer)} mono gold />
            <InfoRow label="Reason" value={fmt(loan.newLoanAmountOfferedReason)} />
            <InfoRow
              label="Client Decision"
              value={loan.newLoanAmountOfferAccepted ? '✓ Accepted' : loan.newLoanAmountOfferDeclined ? '✗ Declined' : 'Pending'}
              last={!loan.newLoanAmountOfferDeclined}
            />
            {loan.newLoanAmountOfferDeclined && (
              <InfoRow label="Decline Reason" value={fmt(loan.newLoanAmountOfferDeclineReason)} last />
            )}
          </Card>
        )}

        {/* ══ REJECTION ══ */}
        {loan.loanStatus === 'rejected' && (
          <Card style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.2)' }}>
            <SectionLabel color="#F87171">Rejection</SectionLabel>
            <InfoRow label="Reason" value={fmt(loan.loanRejectionReason)} last />
          </Card>
        )}

        {/* ══ SIGNATURES & INITIALS ══ */}
        {hasAnySig && (
          <Card>
            <SectionLabel>Signatures & Initials</SectionLabel>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 4 }}>
              <SignaturePreview label="Client Signature" file={sigFile} />
              <SignaturePreview label="Client Initials" file={initFile} />
              <SignaturePreview label="Witness Signature" file={witSigFile} />
              <SignaturePreview label="Witness Initials" file={witInitFile} />
            </div>
          </Card>
        )}

        {/* ══ ADMIN FLAGS ══ */}
        <Card>
          <SectionLabel>Admin Flags</SectionLabel>
          <InfoRow label="Invoice Sent" value={loan.invoiceSent ? 'Yes' : 'No'} />
          <InfoRow label="QuickBooks Invoice #" value={fmt(loan.quickBooksInvoiceNumber)} />
          <InfoRow label="Payment Schedule Created" value={loan.paymentScheduleCreated ? 'Yes' : 'No'} />
          <InfoRow label="Loan Appendix Created" value={loan.loanAppendixCreated ? 'Yes' : 'No'} />
          <InfoRow label="Session Letter Uploaded" value={loan.sessionLetterUploaded ? 'Yes' : 'No'} />
          <InfoRow label="Insurance Request" value={fmt(loan.insuranceRequest)} />
          <InfoRow label="Collateral Inspected" value={loan.collateralInspected ? 'Yes' : 'No'} />
          <InfoRow label="Rejection Msg Sent" value={loan.rejectionMessageSent ? 'Yes' : 'No'} last />
        </Card>

      </div>
    </div>
  )
}

/* ── Icons ──────────────────────────────────────────────────── */
function ExpandIcon() { return <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><polyline points="6 9 12 15 18 9" /></svg> }
function CollapseIcon() { return <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><polyline points="18 15 12 9 6 15" /></svg> }
function CloseIcon() { return <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg> }
function ExternalIcon() { return <svg width={11} height={11} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg> }
function ChevronRightIcon() { return <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><polyline points="9 18 15 12 9 6" /></svg> }
function FileIcon() { return <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="#9CA3AF" strokeWidth={1.7}><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" /><polyline points="13 2 13 9 20 9" /></svg> }
function PdfIcon() { return <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="#F87171" strokeWidth={1.7}><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" /><polyline points="13 2 13 9 20 9" /><line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="17" x2="15" y2="17" /></svg> }
function VideoIcon() { return <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="#818CF8" strokeWidth={1.7}><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg> }
function NoDocIcon() { return <svg width={32} height={32} fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.18)" strokeWidth={1.3}><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" /><polyline points="13 2 13 9 20 9" /><line x1="9" y1="13" x2="15" y2="13" strokeDasharray="3 2" /><line x1="9" y1="17" x2="13" y2="17" strokeDasharray="3 2" /></svg> }