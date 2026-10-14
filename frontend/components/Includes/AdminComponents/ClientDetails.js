// // // // // // 'use client'
// // // // // // import React, { useState } from 'react'
// // // // // // import Box from '@mui/material/Box'
// // // // // // import Divider from '@mui/material/Divider'
// // // // // // import Avatar from '@mui/material/Avatar'
// // // // // // import { ThemeProvider } from '@mui/material/styles'
// // // // // // import { Slide } from '@material-ui/core'
// // // // // // import ContactCard from './ContactCard'
// // // // // // import { Card, CardContent, Typography, IconButton, Stack, Snackbar, Alert } from '@mui/material'
// // // // // // import ContentCopyIcon from '@mui/icons-material/ContentCopy'
// // // // // // import { getImage } from '@/Functions'
// // // // // // import { backEndUrl } from '@/Constants'
// // // // // // import { adminTheme, G, FONTS } from '@/styles/admin-theme'

// // // // // // /* ─── InfoRow ───────────────────────────────────────────────── */
// // // // // // function InfoRow({ label, value }) {
// // // // // //   return (
// // // // // //     <Box sx={{
// // // // // //       display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
// // // // // //       py: '9px', gap: 2,
// // // // // //       borderBottom: `1px solid rgba(255,255,255,0.05)`,
// // // // // //       '&:last-child': { borderBottom: 'none' },
// // // // // //     }}>
// // // // // //       <Box sx={{ fontSize: '12px', color: G.muted, fontFamily: FONTS.body, flexShrink: 0 }}>{label}</Box>
// // // // // //       <Box sx={{ fontSize: '13.5px', fontWeight: 500, color: 'rgba(255,255,255,0.88)', fontFamily: FONTS.body, textAlign: 'right', wordBreak: 'break-word' }}>
// // // // // //         {value || '—'}
// // // // // //       </Box>
// // // // // //     </Box>
// // // // // //   )
// // // // // // }

// // // // // // /* ─── Section header ─────────────────────────────────────────── */
// // // // // // function SectionLabel({ children }) {
// // // // // //   return (
// // // // // //     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
// // // // // //       <Box sx={{ width: 3, height: 14, borderRadius: 1, background: `linear-gradient(180deg, ${G.green1}, ${G.green3})` }} />
// // // // // //       <Box sx={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: G.muted, fontFamily: FONTS.body }}>
// // // // // //         {children}
// // // // // //       </Box>
// // // // // //     </Box>
// // // // // //   )
// // // // // // }

// // // // // // export default class ClientDetails extends React.Component {
// // // // // //   render() {
// // // // // //     const { loan, user, role, adminActions } = this.props
// // // // // //     console.log(' loan, user, role, adminActions', loan, user, role, adminActions)
// // // // // //     const clientWrapped = loan?.client
// // // // // //     const client = user ? user : clientWrapped?.data?.attributes || {}
// // // // // //     const quickbookInvoiceNumber = client.currentLoan?.data?.attributes?.quickBooksInvoiceNumber || null
// // // // // //     const details = client.details || {}
// // // // // //     const bankDetails = client.bankDetails || null
// // // // // //     const avatarUrl = client.profilePicture?.data?.attributes?.formats?.thumbnail?.url
// // // // // //       ? backEndUrl + client.profilePicture.data.attributes.formats.thumbnail.url
// // // // // //       : null

// // // // // //     if (quickbookInvoiceNumber) {
// // // // // //       client.bankDetails.quickbookInvoiceNumber = quickbookInvoiceNumber
// // // // // //     }

// // // // // //     const initials = (client.fullnames || client.username || 'C')
// // // // // //       .split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

// // // // // //     return (
// // // // // //       <ThemeProvider theme={adminTheme}>
// // // // // //         <Slide in={true} direction="left">
// // // // // //           <Box sx={{ maxWidth: 600, mx: 'auto', p: { xs: 1.5, sm: 2 } }}>

// // // // // //             {/* ── Profile Hero ── */}
// // // // // //             <Box sx={{
// // // // // //               background: 'linear-gradient(135deg, rgba(16,185,129,0.10), rgba(5,150,105,0.04))',
// // // // // //               border: `1px solid rgba(16,185,129,0.20)`,
// // // // // //               borderRadius: '20px',
// // // // // //               p: 3,
// // // // // //               mb: 2,
// // // // // //               display: 'flex',
// // // // // //               alignItems: 'center',
// // // // // //               gap: 2.5,
// // // // // //             }}>
// // // // // //               <Avatar
// // // // // //                 src={avatarUrl || undefined}
// // // // // //                 sx={{
// // // // // //                   width: 64, height: 64,
// // // // // //                   background: 'linear-gradient(135deg, rgba(16,185,129,0.25), rgba(5,150,105,0.1))',
// // // // // //                   border: `2px solid rgba(16,185,129,0.30)`,
// // // // // //                   borderRadius: '16px',
// // // // // //                   fontFamily: FONTS.display,
// // // // // //                   fontSize: '20px',
// // // // // //                   color: G.green3,
// // // // // //                   flexShrink: 0,
// // // // // //                 }}
// // // // // //               >
// // // // // //                 {!avatarUrl && initials}
// // // // // //               </Avatar>
// // // // // //               <Box sx={{ flex: 1, minWidth: 0 }}>
// // // // // //                 <Box sx={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: G.muted, mb: 0.5 }}>
// // // // // //                   Client
// // // // // //                 </Box>
// // // // // //                 <Box sx={{ fontFamily: FONTS.display, fontSize: '20px', color: '#fff', fontWeight: 400, lineHeight: 1.2, mb: 0.25 }}>
// // // // // //                   {client.fullnames || client.username || 'Client'}
// // // // // //                 </Box>
// // // // // //                 <Box sx={{ fontSize: '12.5px', color: G.muted, fontFamily: FONTS.body }}>
// // // // // //                   {client.email || ''}
// // // // // //                 </Box>
// // // // // //               </Box>
// // // // // //             </Box>

// // // // // //             {/* Admin actions slot */}
// // // // // //             {adminActions && (
// // // // // //               <Box sx={{ mb: 2 }}>
// // // // // //                 {adminActions()}
// // // // // //               </Box>
// // // // // //             )}

// // // // // //             {/* ── Personal Details ── */}
// // // // // //             <Box sx={{
// // // // // //               background: 'rgba(255,255,255,0.04)',
// // // // // //               border: `1px solid rgba(255,255,255,0.08)`,
// // // // // //               borderRadius: '16px',
// // // // // //               p: 2.5,
// // // // // //               mb: 2,
// // // // // //               backdropFilter: 'blur(12px)',
// // // // // //             }}>
// // // // // //               <SectionLabel>Personal Details</SectionLabel>
// // // // // //               <InfoRow label="First Name" value={details.firstname} />
// // // // // //               <InfoRow label="Last Name" value={details.lastname} />
// // // // // //               {role !== "Collateral Inspector" && <InfoRow label="Age" value={details.age} />}
// // // // // //               <InfoRow label="Gender" value={details.gender} />
// // // // // //               {role !== "Collateral Inspector" && <InfoRow label="Date of Birth" value={details.dateOfBirth} />}
// // // // // //               <InfoRow label="Address" value={details.address} />
// // // // // //             </Box>

// // // // // //             {/* ── Bank Details ── */}
// // // // // //             {role !== "Collateral Inspector" && (
// // // // // //               <Box sx={{ mb: 2 }}>
// // // // // //                 <Box sx={{
// // // // // //                   background: 'rgba(255,255,255,0.04)',
// // // // // //                   border: `1px solid rgba(255,255,255,0.08)`,
// // // // // //                   borderRadius: '16px',
// // // // // //                   p: 2.5,
// // // // // //                   backdropFilter: 'blur(12px)',
// // // // // //                 }}>
// // // // // //                   <SectionLabel>Bank Details</SectionLabel>
// // // // // //                   <BankDetails bankDetails={bankDetails} />
// // // // // //                 </Box>
// // // // // //               </Box>
// // // // // //             )}

// // // // // //             {/* ── Account Info ── */}
// // // // // //             <Box sx={{
// // // // // //               background: 'rgba(255,255,255,0.04)',
// // // // // //               border: `1px solid rgba(255,255,255,0.08)`,
// // // // // //               borderRadius: '16px',
// // // // // //               p: 2.5,
// // // // // //               mb: 2,
// // // // // //               backdropFilter: 'blur(12px)',
// // // // // //             }}>
// // // // // //               <SectionLabel>Account Info</SectionLabel>
// // // // // //               <InfoRow
// // // // // //                 label={role === "Collateral Inspector" ? "Phone Number" : "Username"}
// // // // // //                 value={client.username}
// // // // // //               />
// // // // // //               <InfoRow label="Email" value={client.email} />
// // // // // //               {role !== "Collateral Inspector" && (
// // // // // //                 <InfoRow
// // // // // //                   label="Registered"
// // // // // //                   value={client.createdAt ? new Date(client.createdAt).toLocaleString() : '—'}
// // // // // //                 />
// // // // // //               )}
// // // // // //             </Box>

// // // // // //             {/* Contact Card */}
// // // // // //             <ContactCard phone={client.username} email={client.email} user_title="Client" />
// // // // // //           </Box>
// // // // // //         </Slide>
// // // // // //       </ThemeProvider>
// // // // // //     )
// // // // // //   }
// // // // // // }

// // // // // // /* ─── Bank Details sub-component ───────────────────────────── */
// // // // // // const BankDetails = ({ bankDetails }) => {
// // // // // //   const [snackbarOpen, setSnackbarOpen] = useState(false)

// // // // // //   const handleCopy = (value) => {
// // // // // //     navigator.clipboard.writeText(String(value))
// // // // // //     setSnackbarOpen(true)
// // // // // //   }

// // // // // //   const handleClose = (_, reason) => {
// // // // // //     if (reason === 'clickaway') return
// // // // // //     setSnackbarOpen(false)
// // // // // //   }

// // // // // //   if (!bankDetails) {
// // // // // //     return (
// // // // // //       <Alert severity="info">
// // // // // //         Bank details will show up when the client signs the loan form
// // // // // //       </Alert>
// // // // // //     )
// // // // // //   }

// // // // // //   return (
// // // // // //     <>
// // // // // //       <Stack spacing={1}>
// // // // // //         {Object.entries(bankDetails).map(([key, value]) =>
// // // // // //           key === "id" ? null : (
// // // // // //             <Box
// // // // // //               key={key}
// // // // // //               sx={{
// // // // // //                 display: 'flex',
// // // // // //                 justifyContent: 'space-between',
// // // // // //                 alignItems: 'center',
// // // // // //                 p: '10px 14px',
// // // // // //                 borderRadius: '10px',
// // // // // //                 background: 'rgba(255,255,255,0.03)',
// // // // // //                 border: `1px solid rgba(255,255,255,0.07)`,
// // // // // //                 transition: 'all 0.15s',
// // // // // //                 '&:hover': { background: 'rgba(255,255,255,0.06)', borderColor: G.greenBorder },
// // // // // //               }}
// // // // // //             >
// // // // // //               <Box>
// // // // // //                 <Box sx={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: G.muted, fontFamily: FONTS.body, mb: 0.25 }}>
// // // // // //                   {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
// // // // // //                 </Box>
// // // // // //                 <Box sx={{ fontSize: '14px', color: '#fff', fontFamily: FONTS.mono, fontWeight: 500 }}>
// // // // // //                   {value}
// // // // // //                 </Box>
// // // // // //               </Box>
// // // // // //               <IconButton
// // // // // //                 onClick={() => handleCopy(value)}
// // // // // //                 size="small"
// // // // // //                 sx={{ color: G.muted, '&:hover': { color: G.green2, background: G.greenGlow } }}
// // // // // //               >
// // // // // //                 <ContentCopyIcon fontSize="small" />
// // // // // //               </IconButton>
// // // // // //             </Box>
// // // // // //           )
// // // // // //         )}
// // // // // //       </Stack>

// // // // // //       <Snackbar
// // // // // //         open={snackbarOpen}
// // // // // //         autoHideDuration={2000}
// // // // // //         onClose={handleClose}
// // // // // //         message="Copied to clipboard"
// // // // // //         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
// // // // // //       />
// // // // // //     </>
// // // // // //   )
// // // // // // }
// // // // // 'use client'

// // // // // /**
// // // // //  * ClientDetails.jsx
// // // // //  *
// // // // //  * Props:
// // // // //  *   loan         — raw Strapi loan object (client relation extracted from here if `user` not passed)
// // // // //  *   user         — raw Strapi user object OR flat user (takes priority over loan.client)
// // // // //  *   role         — viewing admin's role string (optional)
// // // // //  *   adminActions — JSX slot / render-prop for action buttons (optional)
// // // // //  *
// // // // //  * normalizeStrapi() unwraps ALL Strapi v4 data/attributes nesting before rendering,
// // // // //  * so both { data: { id, attributes: { ... } } } and flat objects work transparently.
// // // // //  */

// // // // // import { backEndUrl } from '@/Constants'

// // // // // /* ═══════════════════════════════════════════════════════════════
// // // // //    COLOUR TOKENS  (matches admin-theme.js)
// // // // // ═══════════════════════════════════════════════════════════════ */
// // // // // const G = {
// // // // //   page: '#0A0F1E',
// // // // //   green1: '#059669',
// // // // //   green2: '#10B981',
// // // // //   green3: '#34D399',
// // // // //   gold: '#C9A84C',
// // // // //   goldL: '#E8C87A',
// // // // //   red: '#F87171',
// // // // //   blue: '#60A5FA',
// // // // //   amber: '#FBBF24',
// // // // //   purple: '#A78BFA',
// // // // //   muted: 'rgba(255,255,255,0.38)',
// // // // //   border: 'rgba(255,255,255,0.08)',
// // // // //   surface: 'rgba(255,255,255,0.05)',
// // // // //   greenBorder: 'rgba(16,185,129,0.22)',
// // // // //   greenGlow: 'rgba(16,185,129,0.12)',
// // // // // }

// // // // // const FONTS = {
// // // // //   display: "'DM Serif Display', Georgia, serif",
// // // // //   body: "'DM Sans', system-ui, -apple-system, sans-serif",
// // // // //   mono: "'JetBrains Mono', 'Courier New', monospace",
// // // // // }

// // // // // /* ═══════════════════════════════════════════════════════════════
// // // // //    STRAPI NORMALIZER
// // // // //    Recursively unwraps { data: { id, attributes } } and
// // // // //    { data: [ { id, attributes } ] } shapes.
// // // // // ═══════════════════════════════════════════════════════════════ */
// // // // // function normalizeStrapi(obj) {
// // // // //   if (obj === null || obj === undefined) return obj
// // // // //   if (typeof obj !== 'object') return obj
// // // // //   if (Array.isArray(obj)) return obj.map(normalizeStrapi)

// // // // //   // Single relation: { data: { id, attributes: {...} } }
// // // // //   if (
// // // // //     obj.data !== undefined &&
// // // // //     !Array.isArray(obj.data) &&
// // // // //     obj.data !== null &&
// // // // //     typeof obj.data === 'object' &&
// // // // //     obj.data.attributes !== undefined
// // // // //   ) {
// // // // //     return normalizeStrapi({ id: obj.data.id, ...obj.data.attributes })
// // // // //   }

// // // // //   // Collection relation: { data: [ { id, attributes } ] }
// // // // //   if (obj.data !== undefined && Array.isArray(obj.data)) {
// // // // //     return obj.data.map(item =>
// // // // //       item && item.attributes
// // // // //         ? normalizeStrapi({ id: item.id, ...item.attributes })
// // // // //         : normalizeStrapi(item)
// // // // //     )
// // // // //   }

// // // // //   // Plain object — recurse into every key
// // // // //   const result = {}
// // // // //   for (const key of Object.keys(obj)) {
// // // // //     result[key] = normalizeStrapi(obj[key])
// // // // //   }
// // // // //   return result
// // // // // }

// // // // // /* ═══════════════════════════════════════════════════════════════
// // // // //    HELPERS
// // // // // ═══════════════════════════════════════════════════════════════ */
// // // // // const fmt = (v) => (v == null || v === '' ? '—' : String(v))
// // // // // const fmtMoney = (v) => v == null ? '—' : `K${Number(v).toLocaleString('en-ZM', { minimumFractionDigits: 2 })}`
// // // // // const fmtDate = (v) => v ? new Date(v).toLocaleDateString('en-ZM', { year: 'numeric', month: 'short', day: 'numeric' }) : '—'
// // // // // const cap = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '—'
// // // // // const getUrl = (file) => {
// // // // //   if (!file) return '#'
// // // // //   if (typeof file === 'string') return file.startsWith('http') ? file : backEndUrl + file
// // // // //   if (file.url?.startsWith('http')) return file.url
// // // // //   return backEndUrl + (file.url || '')
// // // // // }

// // // // // /* ═══════════════════════════════════════════════════════════════
// // // // //    SHARED STYLE OBJECTS
// // // // // ═══════════════════════════════════════════════════════════════ */
// // // // // const card = {
// // // // //   background: G.surface,
// // // // //   border: `1px solid ${G.border}`,
// // // // //   borderRadius: 16,
// // // // //   padding: '18px 20px',
// // // // //   marginBottom: 14,
// // // // //   backdropFilter: 'blur(16px)',
// // // // //   WebkitBackdropFilter: 'blur(16px)',
// // // // //   fontFamily: FONTS.body,
// // // // // }

// // // // // const sectionLabelStyle = {
// // // // //   fontSize: 10,
// // // // //   fontWeight: 700,
// // // // //   letterSpacing: '0.09em',
// // // // //   textTransform: 'uppercase',
// // // // //   color: G.muted,
// // // // //   marginBottom: 12,
// // // // //   fontFamily: FONTS.body,
// // // // //   display: 'flex',
// // // // //   alignItems: 'center',
// // // // //   gap: 8,
// // // // // }

// // // // // const row = {
// // // // //   display: 'flex',
// // // // //   justifyContent: 'space-between',
// // // // //   alignItems: 'flex-start',
// // // // //   gap: 12,
// // // // //   padding: '9px 0',
// // // // // }

// // // // // const labelText = {
// // // // //   fontSize: 12,
// // // // //   fontWeight: 600,
// // // // //   color: G.muted,
// // // // //   minWidth: 130,
// // // // //   flexShrink: 0,
// // // // //   fontFamily: FONTS.body,
// // // // // }

// // // // // const valueText = {
// // // // //   fontSize: 13.5,
// // // // //   fontWeight: 500,
// // // // //   color: '#fff',
// // // // //   textAlign: 'right',
// // // // //   wordBreak: 'break-word',
// // // // //   fontFamily: FONTS.body,
// // // // // }

// // // // // /* ═══════════════════════════════════════════════════════════════
// // // // //    SMALL COMPONENTS
// // // // // ═══════════════════════════════════════════════════════════════ */

// // // // // function InfoRow({ label: l, value: v, last, mono }) {
// // // // //   return (
// // // // //     <div style={{ ...row, borderBottom: last ? 'none' : `1px solid ${G.border}` }}>
// // // // //       <span style={labelText}>{l}</span>
// // // // //       <span style={{ ...valueText, ...(mono ? { fontFamily: FONTS.mono } : {}) }}>{v ?? '—'}</span>
// // // // //     </div>
// // // // //   )
// // // // // }

// // // // // function SectionLabel({ icon, children, accentColor = G.green2 }) {
// // // // //   return (
// // // // //     <div style={{ ...sectionLabelStyle }}>
// // // // //       <span style={{ width: 3, height: 14, borderRadius: 2, background: `linear-gradient(180deg,${accentColor},${accentColor}88)`, display: 'inline-block', flexShrink: 0 }} />
// // // // //       {icon && <span style={{ color: accentColor, display: 'flex' }}>{icon}</span>}
// // // // //       <span style={{ color: G.muted }}>{children}</span>
// // // // //     </div>
// // // // //   )
// // // // // }

// // // // // function Pill({ children, color = G.green2, bg }) {
// // // // //   return (
// // // // //     <span style={{
// // // // //       display: 'inline-flex', alignItems: 'center', gap: 4,
// // // // //       padding: '3px 10px', borderRadius: 100,
// // // // //       background: bg || `${color}18`, color,
// // // // //       fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em',
// // // // //       fontFamily: FONTS.body,
// // // // //     }}>
// // // // //       {children}
// // // // //     </span>
// // // // //   )
// // // // // }

// // // // // function CopyButton({ value }) {
// // // // //   const [copied, setCopied] = React.useState(false)
// // // // //   const copy = () => {
// // // // //     if (!value) return
// // // // //     navigator.clipboard.writeText(String(value)).then(() => {
// // // // //       setCopied(true)
// // // // //       setTimeout(() => setCopied(false), 1800)
// // // // //     })
// // // // //   }
// // // // //   return (
// // // // //     <button
// // // // //       onClick={copy}
// // // // //       title="Copy"
// // // // //       style={{
// // // // //         background: 'none', border: 'none', cursor: 'pointer', padding: '2px 6px',
// // // // //         color: copied ? G.green3 : G.muted, fontSize: 11, fontFamily: FONTS.body,
// // // // //         fontWeight: 600, borderRadius: 6, transition: 'color 0.2s',
// // // // //         flexShrink: 0,
// // // // //       }}
// // // // //     >
// // // // //       {copied ? '✓ Copied' : 'Copy'}
// // // // //     </button>
// // // // //   )
// // // // // }

// // // // // function BankRow({ label: l, value: v, last, copyable }) {
// // // // //   return (
// // // // //     <div style={{
// // // // //       ...row,
// // // // //       borderBottom: last ? 'none' : `1px solid ${G.border}`,
// // // // //       padding: '10px 12px',
// // // // //       borderRadius: last ? '0 0 10px 10px' : 0,
// // // // //       background: 'rgba(255,255,255,0.02)',
// // // // //     }}>
// // // // //       <span style={labelText}>{l}</span>
// // // // //       <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
// // // // //         <span style={{ ...valueText, fontFamily: FONTS.mono }}>{v ?? '—'}</span>
// // // // //         {copyable && v && v !== '—' && <CopyButton value={v} />}
// // // // //       </div>
// // // // //     </div>
// // // // //   )
// // // // // }

// // // // // function FileLink({ file, label }) {
// // // // //   if (!file) return <span style={{ fontSize: 12, color: G.muted }}>Not uploaded</span>
// // // // //   const url = getUrl(file)
// // // // //   const name = file.name || label || 'View file'
// // // // //   return (
// // // // //     <a href={url} target="_blank" rel="noopener noreferrer" style={{
// // // // //       display: 'inline-flex', alignItems: 'center', gap: 6,
// // // // //       padding: '6px 12px', borderRadius: 8,
// // // // //       background: G.greenGlow, border: `1px solid ${G.greenBorder}`,
// // // // //       color: G.green3, fontSize: 12, fontWeight: 600, textDecoration: 'none',
// // // // //       fontFamily: FONTS.body, transition: 'background 0.2s',
// // // // //     }}>
// // // // //       📄 {name}
// // // // //     </a>
// // // // //   )
// // // // // }

// // // // // /* ═══════════════════════════════════════════════════════════════
// // // // //    SECTION BLOCKS
// // // // // ═══════════════════════════════════════════════════════════════ */

// // // // // function PersonalSection({ user }) {
// // // // //   const d = user.details || {}
// // // // //   return (
// // // // //     <div style={card}>
// // // // //       <SectionLabel icon="👤" accentColor={G.green2}>Personal Details</SectionLabel>
// // // // //       <InfoRow label="Full Names" value={fmt(user.fullnames)} />
// // // // //       <InfoRow label="First Name" value={fmt(d.firstname)} />
// // // // //       <InfoRow label="Last Name" value={fmt(d.lastname)} />
// // // // //       <InfoRow label="Gender" value={cap(d.gender)} />
// // // // //       <InfoRow label="Date of Birth" value={fmtDate(d.dateOfBirth)} />
// // // // //       <InfoRow label="Age" value={d.age ?? '—'} />
// // // // //       <InfoRow label="Address" value={fmt(d.address)} />
// // // // //       <InfoRow label="Email" value={fmt(user.email)} />
// // // // //       <InfoRow label="Phone / Username" value={fmt(user.username)} />
// // // // //       <InfoRow label="Signing Method" value={cap(user.signingMethod)} />
// // // // //       <InfoRow label="Profile Complete" value={user.basicDetailsUpdated ? 'Yes' : 'No'} />
// // // // //       <InfoRow label="Identity Updated" value={user.identityDetailsUpdated ? 'Yes' : 'No'} last />
// // // // //     </div>
// // // // //   )
// // // // // }

// // // // // function BankSection({ bankDetails, quickbookInvoiceNumber }) {
// // // // //   if (!bankDetails) return (
// // // // //     <div style={{ ...card, background: G.greenGlow, border: `1px solid ${G.greenBorder}` }}>
// // // // //       <SectionLabel icon="🏦" accentColor={G.blue}>Bank Details</SectionLabel>
// // // // //       <p style={{ fontSize: 13, color: G.muted, margin: 0 }}>Bank details will appear when the client signs the loan form.</p>
// // // // //     </div>
// // // // //   )

// // // // //   const { bankName, bankAccountName, accountNumber, branchName, branchCode, bankPhone } = bankDetails

// // // // //   return (
// // // // //     <div style={{ ...card, padding: 0, overflow: 'hidden' }}>
// // // // //       <div style={{ padding: '16px 20px 12px' }}>
// // // // //         <SectionLabel icon="🏦" accentColor={G.blue}>Bank Details</SectionLabel>
// // // // //       </div>
// // // // //       <BankRow label="Bank Name" value={fmt(bankName)} />
// // // // //       <BankRow label="Account Name" value={fmt(bankAccountName)} />
// // // // //       <BankRow label="Account Number" value={fmt(accountNumber)} copyable />
// // // // //       <BankRow label="Branch" value={fmt(branchName)} />
// // // // //       <BankRow label="Branch Code" value={fmt(branchCode)} copyable />
// // // // //       <BankRow label="Bank Phone" value={fmt(bankPhone)} copyable />
// // // // //       {quickbookInvoiceNumber && (
// // // // //         <BankRow label="QB Invoice No." value={fmt(quickbookInvoiceNumber)} copyable last />
// // // // //       )}
// // // // //     </div>
// // // // //   )
// // // // // }

// // // // // function AccountSection({ user }) {
// // // // //   return (
// // // // //     <div style={card}>
// // // // //       <SectionLabel icon="⚙️" accentColor={G.purple}>Account Info</SectionLabel>
// // // // //       <InfoRow label="Username / Phone" value={fmt(user.username)} mono />
// // // // //       <InfoRow label="Email" value={fmt(user.email)} />
// // // // //       <InfoRow label="Registered" value={fmtDate(user.createdAt)} last />
// // // // //     </div>
// // // // //   )
// // // // // }

// // // // // function CurrentLoanSection({ loan }) {
// // // // //   if (!loan) return null
// // // // //   return (
// // // // //     <div style={{ ...card, background: 'rgba(16,185,129,0.06)', border: `1px solid ${G.greenBorder}` }}>
// // // // //       <SectionLabel icon="💳" accentColor={G.green2}>Current Loan</SectionLabel>
// // // // //       <InfoRow label="Loan ID" value={`#${loan.id || '—'}`} />
// // // // //       <InfoRow label="Status" value={fmt(loan.loanStatus?.replace(/-/g, ' '))} />
// // // // //       <InfoRow label="Amount" value={fmtMoney(loan.loanAmount)} last />
// // // // //     </div>
// // // // //   )
// // // // // }

// // // // // /* ═══════════════════════════════════════════════════════════════
// // // // //    CONTACT ACTIONS
// // // // // ═══════════════════════════════════════════════════════════════ */
// // // // // function ContactActions({ user }) {
// // // // //   const [open, setOpen] = React.useState(false)
// // // // //   const [copied, setCopied] = React.useState(null)

// // // // //   const phone = user.username || ''
// // // // //   const email = user.email || ''

// // // // //   const returnNine = (p) => {
// // // // //     const digits = String(p).replace(/\D/g, '')
// // // // //     return digits.length >= 9 ? digits.slice(-9) : digits
// // // // //   }
// // // // //   const fullNumber = phone ? `+260${returnNine(phone)}` : ''
// // // // //   const waUrl = `https://wa.me/${fullNumber.replace('+', '')}`

// // // // //   const copy = (val, key) => {
// // // // //     if (!val) return
// // // // //     navigator.clipboard.writeText(val).then(() => {
// // // // //       setCopied(key)
// // // // //       setTimeout(() => setCopied(null), 2000)
// // // // //     })
// // // // //   }

// // // // //   if (!open) return (
// // // // //     <button
// // // // //       onClick={() => setOpen(true)}
// // // // //       style={{
// // // // //         display: 'inline-flex', alignItems: 'center', gap: 8,
// // // // //         padding: '10px 20px', borderRadius: 10,
// // // // //         background: `linear-gradient(135deg, ${G.green1}, ${G.green2})`,
// // // // //         color: '#fff', border: 'none', cursor: 'pointer',
// // // // //         fontSize: 13.5, fontWeight: 700, fontFamily: FONTS.body,
// // // // //         boxShadow: '0 4px 14px rgba(16,185,129,0.28)',
// // // // //         transition: 'all 0.2s', marginBottom: 14,
// // // // //       }}
// // // // //     >
// // // // //       📞 Contact Client
// // // // //     </button>
// // // // //   )

// // // // //   const btnBase = {
// // // // //     display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
// // // // //     width: '100%', padding: '10px 16px', borderRadius: 10,
// // // // //     fontSize: 13.5, fontWeight: 700, fontFamily: FONTS.body,
// // // // //     cursor: 'pointer', border: 'none', transition: 'all 0.18s',
// // // // //   }

// // // // //   return (
// // // // //     <div style={{ ...card, background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(5,150,105,0.03))', border: `1px solid ${G.greenBorder}`, marginBottom: 14 }}>
// // // // //       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
// // // // //         <div>
// // // // //           <div style={{ fontSize: 15, fontWeight: 600, color: '#fff', fontFamily: FONTS.body }}>Client</div>
// // // // //           <div style={{ fontSize: 12, color: G.muted, fontFamily: FONTS.body }}>
// // // // //             {phone && `Phone: ${phone}`}{email && phone ? ' · ' : ''}{email && `${email}`}
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //       <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
// // // // //         {phone && (
// // // // //           <a href={`tel:${fullNumber}`} style={{ ...btnBase, background: `linear-gradient(135deg, ${G.green1}, ${G.green2})`, color: '#fff', textDecoration: 'none', boxShadow: '0 4px 14px rgba(16,185,129,0.28)' }}>
// // // // //             📞 Call Client
// // // // //           </a>
// // // // //         )}
// // // // //         {phone && (
// // // // //           <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{ ...btnBase, background: 'linear-gradient(135deg, #14532d, #15803d)', color: '#fff', textDecoration: 'none', boxShadow: '0 4px 12px rgba(21,128,61,0.25)' }}>
// // // // //             💬 WhatsApp Client
// // // // //           </a>
// // // // //         )}
// // // // //         {phone && (
// // // // //           <button onClick={() => copy(fullNumber, 'phone')} style={{ ...btnBase, background: G.surface, color: copied === 'phone' ? G.green3 : '#fff', border: `1px solid ${G.border}` }}>
// // // // //             📋 {copied === 'phone' ? '✓ Copied!' : "Copy Client's Number"}
// // // // //           </button>
// // // // //         )}
// // // // //         {email && (
// // // // //           <a href={`mailto:${email}`} style={{ ...btnBase, background: 'rgba(96,165,250,0.12)', border: `1px solid rgba(96,165,250,0.25)`, color: G.blue, textDecoration: 'none' }}>
// // // // //             ✉️ Email Client
// // // // //           </a>
// // // // //         )}
// // // // //         {email && (
// // // // //           <button onClick={() => copy(email, 'email')} style={{ ...btnBase, background: G.surface, color: copied === 'email' ? G.green3 : '#fff', border: `1px solid ${G.border}` }}>
// // // // //             📋 {copied === 'email' ? '✓ Copied!' : "Copy Client's Email"}
// // // // //           </button>
// // // // //         )}
// // // // //         <button onClick={() => setOpen(false)} style={{ ...btnBase, background: 'transparent', color: G.amber, border: `1px solid rgba(251,191,36,0.25)` }}>
// // // // //           Hide Contact Card
// // // // //         </button>
// // // // //       </div>
// // // // //     </div>
// // // // //   )
// // // // // }

// // // // // /* ═══════════════════════════════════════════════════════════════
// // // // //    MAIN COMPONENT
// // // // // ═══════════════════════════════════════════════════════════════ */
// // // // // export default function ClientDetails({ loan: rawLoan, user: rawUser, role, adminActions }) {
// // // // //   /*
// // // // //    * Resolution order for the user object:
// // // // //    *   1. `user` prop (direct user page: /admin/users/[id])
// // // // //    *   2. `loan.client` (loan detail page: /admin/loans/[id])
// // // // //    *
// // // // //    * Both may be raw Strapi v4 objects — normalizeStrapi handles both.
// // // // //    */
// // // // //   let resolvedUser = null

// // // // //   if (rawUser) {
// // // // //     // Direct user prop — could be flat (from getUserById) or Strapi-wrapped
// // // // //     resolvedUser = normalizeStrapi(rawUser)
// // // // //   } else if (rawLoan) {
// // // // //     // Extract from loan.client relation
// // // // //     const normLoan = normalizeStrapi(rawLoan)
// // // // //     resolvedUser = normLoan?.client || null
// // // // //   }

// // // // //   if (!resolvedUser) {
// // // // //     return (
// // // // //       <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: G.page }}>
// // // // //         <p style={{ color: G.muted, fontFamily: FONTS.body }}>No client data available.</p>
// // // // //       </div>
// // // // //     )
// // // // //   }

// // // // //   // After normalizeStrapi, currentLoan may be nested inside client or at top level
// // // // //   const currentLoan = resolvedUser.currentLoan || null

// // // // //   // QuickBooks invoice from loan (if viewing inside a loan context)
// // // // //   const normLoan = rawLoan ? normalizeStrapi(rawLoan) : null
// // // // //   const quickbookInvoiceNumber = normLoan?.quickBooksInvoiceNumber
// // // // //     || resolvedUser?.currentLoan?.quickBooksInvoiceNumber
// // // // //     || null

// // // // //   // Profile picture
// // // // //   const picRaw = resolvedUser.profilePicture
// // // // //   const picUrl = picRaw
// // // // //     ? (Array.isArray(picRaw)
// // // // //       ? (picRaw[0]?.formats?.thumbnail?.url ? backEndUrl + picRaw[0].formats.thumbnail.url : getUrl(picRaw[0]))
// // // // //       : (picRaw.formats?.thumbnail?.url ? backEndUrl + picRaw.formats.thumbnail.url : getUrl(picRaw)))
// // // // //     : null

// // // // //   // Initials for avatar fallback
// // // // //   const initials = (resolvedUser.fullnames || resolvedUser.username || '?')
// // // // //     .split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

// // // // //   // Collateral inspector sees limited view
// // // // //   const isInspector = String(role || '').toLowerCase() === 'collateral inspector'

// // // // //   return (
// // // // //     <div style={{ minHeight: '100vh', background: G.page, paddingTop: 76, paddingBottom: 96, position: 'relative', overflowX: 'hidden' }}>

// // // // //       {/* Ambient background */}
// // // // //       <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse 80% 50% at 50% -5%, rgba(16,185,129,0.09) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
// // // // //       <div style={{ position: 'fixed', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.022) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none', zIndex: 0 }} />

// // // // //       <style>{`
// // // // //         @keyframes cdSlideUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
// // // // //         @keyframes cdSlideLeft { from { opacity:0; transform:translateX(16px); } to { opacity:1; transform:translateX(0); } }
// // // // //         .cd-wrap { animation: cdSlideLeft 0.38s cubic-bezier(0.22,1,0.36,1) both; }
// // // // //       `}</style>

// // // // //       <div className="cd-wrap" style={{ position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto', padding: '0 16px' }}>

// // // // //         {/* ── Header card ── */}
// // // // //         <div style={{
// // // // //           ...card,
// // // // //           background: 'linear-gradient(135deg, rgba(16,185,129,0.10), rgba(5,150,105,0.04))',
// // // // //           border: `1px solid ${G.greenBorder}`,
// // // // //           display: 'flex', alignItems: 'center', gap: 16,
// // // // //           position: 'relative', overflow: 'hidden',
// // // // //         }}>
// // // // //           {/* green accent bar */}
// // // // //           <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${G.green1}, transparent)`, borderRadius: '16px 16px 0 0' }} />

// // // // //           {/* Avatar */}
// // // // //           {picUrl ? (
// // // // //             <img src={picUrl} alt={resolvedUser.fullnames}
// // // // //               style={{ width: 56, height: 56, borderRadius: 14, objectFit: 'cover', border: `2px solid ${G.green2}`, flexShrink: 0 }} />
// // // // //           ) : (
// // // // //             <div style={{ width: 56, height: 56, borderRadius: 14, background: 'linear-gradient(135deg, rgba(16,185,129,0.22), rgba(5,150,105,0.08))', border: `1.5px solid ${G.greenBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
// // // // //               <span style={{ fontFamily: FONTS.display, fontSize: 20, color: G.green3 }}>{initials}</span>
// // // // //             </div>
// // // // //           )}

// // // // //           {/* Name + pills */}
// // // // //           <div style={{ flex: 1, minWidth: 0 }}>
// // // // //             <p style={{ margin: '0 0 2px', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: G.muted, fontFamily: FONTS.body }}>
// // // // //               Client{role ? ` · ${role}` : ''}
// // // // //             </p>
// // // // //             <h1 style={{ margin: '0 0 8px', fontFamily: FONTS.display, fontSize: 'clamp(18px,4vw,24px)', fontWeight: 400, color: '#fff', lineHeight: 1.2 }}>
// // // // //               {resolvedUser.fullnames || resolvedUser.username || 'Client'}
// // // // //             </h1>
// // // // //             <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
// // // // //               <Pill color={G.green2}>client</Pill>
// // // // //               {resolvedUser.basicDetailsUpdated && <Pill color={G.purple} bg="rgba(167,139,250,0.12)">Profile Complete</Pill>}
// // // // //               {resolvedUser.identityDetailsUpdated && <Pill color={G.blue} bg="rgba(96,165,250,0.12)">Identity ✓</Pill>}
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* ── Admin action slot ── */}
// // // // //         {adminActions && (
// // // // //           <div style={{ marginBottom: 14 }}>
// // // // //             {typeof adminActions === 'function' ? adminActions() : adminActions}
// // // // //           </div>
// // // // //         )}

// // // // //         {/* ── Contact Card ── */}
// // // // //         <ContactActions user={resolvedUser} />

// // // // //         {/* ── Personal details ── */}
// // // // //         <PersonalSection user={resolvedUser} />

// // // // //         {/* ── Bank details (hidden for Collateral Inspector) ── */}
// // // // //         {!isInspector && (
// // // // //           <BankSection
// // // // //             bankDetails={resolvedUser.bankDetails || null}
// // // // //             quickbookInvoiceNumber={quickbookInvoiceNumber}
// // // // //           />
// // // // //         )}

// // // // //         {/* ── Account info ── */}
// // // // //         <AccountSection user={resolvedUser} />

// // // // //         {/* ── Current loan summary ── */}
// // // // //         {currentLoan && <CurrentLoanSection loan={currentLoan} />}

// // // // //       </div>
// // // // //     </div>
// // // // //   )
// // // // // }

// // // // // /* ─── React import (needed for useState in sub-components) ───── */
// // // // // import React from 'react'
// // // // 'use client'

// // // // /**
// // // //  * ClientDetails.jsx
// // // //  *
// // // //  * Props:
// // // //  *   loan         — raw Strapi loan object (the specific loan the admin selected)
// // // //  *   user         — raw Strapi user object OR flat user (takes priority over loan.client)
// // // //  *   role         — viewing admin's role string (optional)
// // // //  *   adminActions — JSX slot / render-prop for action buttons (optional)
// // // //  *
// // // //  * Source priority:
// // // //  *   - Client/user data  → `user` prop first, then `loan.client`
// // // //  *   - Loan-specific data (bank details, QB invoice, loan summary)
// // // //  *                       → the `loan` prop directly, NOT user.currentLoan
// // // //  *
// // // //  * normalizeStrapi() unwraps ALL Strapi v4 data/attributes nesting before rendering,
// // // //  * so both { data: { id, attributes: { ... } } } and flat objects work transparently.
// // // //  */

// // // // import { backEndUrl } from '@/Constants'
// // // // import React from 'react'

// // // // /* ═══════════════════════════════════════════════════════════════
// // // //    COLOUR TOKENS  (matches admin-theme.js)
// // // // ═══════════════════════════════════════════════════════════════ */
// // // // const G = {
// // // //   page: '#0A0F1E',
// // // //   green1: '#059669',
// // // //   green2: '#10B981',
// // // //   green3: '#34D399',
// // // //   gold: '#C9A84C',
// // // //   goldL: '#E8C87A',
// // // //   red: '#F87171',
// // // //   blue: '#60A5FA',
// // // //   amber: '#FBBF24',
// // // //   purple: '#A78BFA',
// // // //   muted: 'rgba(255,255,255,0.38)',
// // // //   border: 'rgba(255,255,255,0.08)',
// // // //   surface: 'rgba(255,255,255,0.05)',
// // // //   greenBorder: 'rgba(16,185,129,0.22)',
// // // //   greenGlow: 'rgba(16,185,129,0.12)',
// // // // }

// // // // const FONTS = {
// // // //   display: "'DM Serif Display', Georgia, serif",
// // // //   body: "'DM Sans', system-ui, -apple-system, sans-serif",
// // // //   mono: "'JetBrains Mono', 'Courier New', monospace",
// // // // }

// // // // /* ═══════════════════════════════════════════════════════════════
// // // //    STRAPI NORMALIZER
// // // //    Recursively unwraps { data: { id, attributes } } and
// // // //    { data: [ { id, attributes } ] } shapes.
// // // // ═══════════════════════════════════════════════════════════════ */
// // // // function normalizeStrapi(obj) {
// // // //   if (obj === null || obj === undefined) return obj
// // // //   if (typeof obj !== 'object') return obj
// // // //   if (Array.isArray(obj)) return obj.map(normalizeStrapi)

// // // //   // Single relation: { data: { id, attributes: {...} } }
// // // //   if (
// // // //     obj.data !== undefined &&
// // // //     !Array.isArray(obj.data) &&
// // // //     obj.data !== null &&
// // // //     typeof obj.data === 'object' &&
// // // //     obj.data.attributes !== undefined
// // // //   ) {
// // // //     return normalizeStrapi({ id: obj.data.id, ...obj.data.attributes })
// // // //   }

// // // //   // Collection relation: { data: [ { id, attributes } ] }
// // // //   if (obj.data !== undefined && Array.isArray(obj.data)) {
// // // //     return obj.data.map(item =>
// // // //       item && item.attributes
// // // //         ? normalizeStrapi({ id: item.id, ...item.attributes })
// // // //         : normalizeStrapi(item)
// // // //     )
// // // //   }

// // // //   // Plain object — recurse into every key
// // // //   const result = {}
// // // //   for (const key of Object.keys(obj)) {
// // // //     result[key] = normalizeStrapi(obj[key])
// // // //   }
// // // //   return result
// // // // }

// // // // /* ═══════════════════════════════════════════════════════════════
// // // //    HELPERS
// // // // ═══════════════════════════════════════════════════════════════ */
// // // // const fmt = (v) => (v == null || v === '' ? '—' : String(v))
// // // // const fmtMoney = (v) => v == null ? '—' : `K${Number(v).toLocaleString('en-ZM', { minimumFractionDigits: 2 })}`
// // // // const fmtDate = (v) => v ? new Date(v).toLocaleDateString('en-ZM', { year: 'numeric', month: 'short', day: 'numeric' }) : '—'
// // // // const cap = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '—'
// // // // const getUrl = (file) => {
// // // //   if (!file) return '#'
// // // //   if (typeof file === 'string') return file.startsWith('http') ? file : backEndUrl + file
// // // //   if (file.url?.startsWith('http')) return file.url
// // // //   return backEndUrl + (file.url || '')
// // // // }

// // // // /* ═══════════════════════════════════════════════════════════════
// // // //    SHARED STYLE OBJECTS
// // // // ═══════════════════════════════════════════════════════════════ */
// // // // const card = {
// // // //   background: G.surface,
// // // //   border: `1px solid ${G.border}`,
// // // //   borderRadius: 16,
// // // //   padding: '18px 20px',
// // // //   marginBottom: 14,
// // // //   backdropFilter: 'blur(16px)',
// // // //   WebkitBackdropFilter: 'blur(16px)',
// // // //   fontFamily: FONTS.body,
// // // // }

// // // // const sectionLabelStyle = {
// // // //   fontSize: 10,
// // // //   fontWeight: 700,
// // // //   letterSpacing: '0.09em',
// // // //   textTransform: 'uppercase',
// // // //   color: G.muted,
// // // //   marginBottom: 12,
// // // //   fontFamily: FONTS.body,
// // // //   display: 'flex',
// // // //   alignItems: 'center',
// // // //   gap: 8,
// // // // }

// // // // const row = {
// // // //   display: 'flex',
// // // //   justifyContent: 'space-between',
// // // //   alignItems: 'flex-start',
// // // //   gap: 12,
// // // //   padding: '9px 0',
// // // // }

// // // // const labelText = {
// // // //   fontSize: 12,
// // // //   fontWeight: 600,
// // // //   color: G.muted,
// // // //   minWidth: 130,
// // // //   flexShrink: 0,
// // // //   fontFamily: FONTS.body,
// // // // }

// // // // const valueText = {
// // // //   fontSize: 13.5,
// // // //   fontWeight: 500,
// // // //   color: '#fff',
// // // //   textAlign: 'right',
// // // //   wordBreak: 'break-word',
// // // //   fontFamily: FONTS.body,
// // // // }

// // // // /* ═══════════════════════════════════════════════════════════════
// // // //    SMALL COMPONENTS
// // // // ═══════════════════════════════════════════════════════════════ */

// // // // function InfoRow({ label: l, value: v, last, mono }) {
// // // //   return (
// // // //     <div style={{ ...row, borderBottom: last ? 'none' : `1px solid ${G.border}` }}>
// // // //       <span style={labelText}>{l}</span>
// // // //       <span style={{ ...valueText, ...(mono ? { fontFamily: FONTS.mono } : {}) }}>{v ?? '—'}</span>
// // // //     </div>
// // // //   )
// // // // }

// // // // function SectionLabel({ icon, children, accentColor = G.green2 }) {
// // // //   return (
// // // //     <div style={{ ...sectionLabelStyle }}>
// // // //       <span style={{ width: 3, height: 14, borderRadius: 2, background: `linear-gradient(180deg,${accentColor},${accentColor}88)`, display: 'inline-block', flexShrink: 0 }} />
// // // //       {icon && <span style={{ color: accentColor, display: 'flex' }}>{icon}</span>}
// // // //       <span style={{ color: G.muted }}>{children}</span>
// // // //     </div>
// // // //   )
// // // // }

// // // // function Pill({ children, color = G.green2, bg }) {
// // // //   return (
// // // //     <span style={{
// // // //       display: 'inline-flex', alignItems: 'center', gap: 4,
// // // //       padding: '3px 10px', borderRadius: 100,
// // // //       background: bg || `${color}18`, color,
// // // //       fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em',
// // // //       fontFamily: FONTS.body,
// // // //     }}>
// // // //       {children}
// // // //     </span>
// // // //   )
// // // // }

// // // // function CopyButton({ value }) {
// // // //   const [copied, setCopied] = React.useState(false)
// // // //   const copy = () => {
// // // //     if (!value) return
// // // //     navigator.clipboard.writeText(String(value)).then(() => {
// // // //       setCopied(true)
// // // //       setTimeout(() => setCopied(false), 1800)
// // // //     })
// // // //   }
// // // //   return (
// // // //     <button
// // // //       onClick={copy}
// // // //       title="Copy"
// // // //       style={{
// // // //         background: 'none', border: 'none', cursor: 'pointer', padding: '2px 6px',
// // // //         color: copied ? G.green3 : G.muted, fontSize: 11, fontFamily: FONTS.body,
// // // //         fontWeight: 600, borderRadius: 6, transition: 'color 0.2s',
// // // //         flexShrink: 0,
// // // //       }}
// // // //     >
// // // //       {copied ? '✓ Copied' : 'Copy'}
// // // //     </button>
// // // //   )
// // // // }

// // // // function BankRow({ label: l, value: v, last, copyable }) {
// // // //   return (
// // // //     <div style={{
// // // //       ...row,
// // // //       borderBottom: last ? 'none' : `1px solid ${G.border}`,
// // // //       padding: '10px 12px',
// // // //       borderRadius: last ? '0 0 10px 10px' : 0,
// // // //       background: 'rgba(255,255,255,0.02)',
// // // //     }}>
// // // //       <span style={labelText}>{l}</span>
// // // //       <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
// // // //         <span style={{ ...valueText, fontFamily: FONTS.mono }}>{v ?? '—'}</span>
// // // //         {copyable && v && v !== '—' && <CopyButton value={v} />}
// // // //       </div>
// // // //     </div>
// // // //   )
// // // // }

// // // // function FileLink({ file, label }) {
// // // //   if (!file) return <span style={{ fontSize: 12, color: G.muted }}>Not uploaded</span>
// // // //   const url = getUrl(file)
// // // //   const name = file.name || label || 'View file'
// // // //   return (
// // // //     <a href={url} target="_blank" rel="noopener noreferrer" style={{
// // // //       display: 'inline-flex', alignItems: 'center', gap: 6,
// // // //       padding: '6px 12px', borderRadius: 8,
// // // //       background: G.greenGlow, border: `1px solid ${G.greenBorder}`,
// // // //       color: G.green3, fontSize: 12, fontWeight: 600, textDecoration: 'none',
// // // //       fontFamily: FONTS.body, transition: 'background 0.2s',
// // // //     }}>
// // // //       📄 {name}
// // // //     </a>
// // // //   )
// // // // }

// // // // /* ═══════════════════════════════════════════════════════════════
// // // //    SECTION BLOCKS
// // // // ═══════════════════════════════════════════════════════════════ */

// // // // function PersonalSection({ user }) {
// // // //   const d = user.details || {}
// // // //   return (
// // // //     <div style={card}>
// // // //       <SectionLabel icon="👤" accentColor={G.green2}>Personal Details</SectionLabel>
// // // //       <InfoRow label="Full Names" value={fmt(user.fullnames)} />
// // // //       <InfoRow label="First Name" value={fmt(d.firstname)} />
// // // //       <InfoRow label="Last Name" value={fmt(d.lastname)} />
// // // //       <InfoRow label="Gender" value={cap(d.gender)} />
// // // //       <InfoRow label="Date of Birth" value={fmtDate(d.dateOfBirth)} />
// // // //       <InfoRow label="Age" value={d.age ?? '—'} />
// // // //       <InfoRow label="Address" value={fmt(d.address)} />
// // // //       <InfoRow label="Email" value={fmt(user.email)} />
// // // //       <InfoRow label="Phone / Username" value={fmt(user.username)} />
// // // //       <InfoRow label="Signing Method" value={cap(user.signingMethod)} />
// // // //       <InfoRow label="Profile Complete" value={user.basicDetailsUpdated ? 'Yes' : 'No'} />
// // // //       <InfoRow label="Identity Updated" value={user.identityDetailsUpdated ? 'Yes' : 'No'} last />
// // // //     </div>
// // // //   )
// // // // }

// // // // function BankSection({ bankDetails, quickbookInvoiceNumber }) {
// // // //   if (!bankDetails) return (
// // // //     <div style={{ ...card, background: G.greenGlow, border: `1px solid ${G.greenBorder}` }}>
// // // //       <SectionLabel icon="🏦" accentColor={G.blue}>Bank Details</SectionLabel>
// // // //       <p style={{ fontSize: 13, color: G.muted, margin: 0 }}>Bank details will appear when the client signs the loan form.</p>
// // // //     </div>
// // // //   )

// // // //   const { bankName, bankAccountName, accountNumber, branchName, branchCode, bankPhone } = bankDetails

// // // //   return (
// // // //     <div style={{ ...card, padding: 0, overflow: 'hidden' }}>
// // // //       <div style={{ padding: '16px 20px 12px' }}>
// // // //         <SectionLabel icon="🏦" accentColor={G.blue}>Bank Details</SectionLabel>
// // // //       </div>
// // // //       <BankRow label="Bank Name" value={fmt(bankName)} />
// // // //       <BankRow label="Account Name" value={fmt(bankAccountName)} />
// // // //       <BankRow label="Account Number" value={fmt(accountNumber)} copyable />
// // // //       <BankRow label="Branch" value={fmt(branchName)} />
// // // //       <BankRow label="Branch Code" value={fmt(branchCode)} copyable />
// // // //       <BankRow label="Bank Phone" value={fmt(bankPhone)} copyable />
// // // //       {quickbookInvoiceNumber && (
// // // //         <BankRow label="QB Invoice No." value={fmt(quickbookInvoiceNumber)} copyable last />
// // // //       )}
// // // //     </div>
// // // //   )
// // // // }

// // // // function AccountSection({ user }) {
// // // //   return (
// // // //     <div style={card}>
// // // //       <SectionLabel icon="⚙️" accentColor={G.purple}>Account Info</SectionLabel>
// // // //       <InfoRow label="Username / Phone" value={fmt(user.username)} mono />
// // // //       <InfoRow label="Email" value={fmt(user.email)} />
// // // //       <InfoRow label="Registered" value={fmtDate(user.createdAt)} last />
// // // //     </div>
// // // //   )
// // // // }

// // // // /**
// // // //  * Shows a summary of the specific loan the admin opened —
// // // //  * sourced from the normalised `loan` prop, not user.currentLoan.
// // // //  */
// // // // function SelectedLoanSection({ loan }) {
// // // //   if (!loan) return null
// // // //   return (
// // // //     <div style={{ ...card, background: 'rgba(16,185,129,0.06)', border: `1px solid ${G.greenBorder}` }}>
// // // //       <SectionLabel icon="💳" accentColor={G.green2}>Selected Loan</SectionLabel>
// // // //       <InfoRow label="Loan ID" value={`#${loan.id || '—'}`} />
// // // //       <InfoRow label="Status" value={fmt(loan.loanStatus?.replace(/-/g, ' '))} />
// // // //       <InfoRow label="Loan Amount" value={fmtMoney(loan.loanAmount)} />
// // // //       <InfoRow label="Outstanding" value={fmtMoney(loan.outstandingAmount)} />
// // // //       <InfoRow label="Term" value={loan.loanTerm ? `${loan.loanTerm} months` : '—'} />
// // // //       <InfoRow label="Purpose" value={fmt(loan.loanPurpose)} />
// // // //       <InfoRow label="Created" value={fmtDate(loan.createdAt)} last />
// // // //     </div>
// // // //   )
// // // // }

// // // // /* ═══════════════════════════════════════════════════════════════
// // // //    CONTACT ACTIONS
// // // // ═══════════════════════════════════════════════════════════════ */
// // // // function ContactActions({ user }) {
// // // //   const [open, setOpen] = React.useState(false)
// // // //   const [copied, setCopied] = React.useState(null)

// // // //   const phone = user.username || ''
// // // //   const email = user.email || ''

// // // //   const returnNine = (p) => {
// // // //     const digits = String(p).replace(/\D/g, '')
// // // //     return digits.length >= 9 ? digits.slice(-9) : digits
// // // //   }
// // // //   const fullNumber = phone ? `+260${returnNine(phone)}` : ''
// // // //   const waUrl = `https://wa.me/${fullNumber.replace('+', '')}`

// // // //   const copy = (val, key) => {
// // // //     if (!val) return
// // // //     navigator.clipboard.writeText(val).then(() => {
// // // //       setCopied(key)
// // // //       setTimeout(() => setCopied(null), 2000)
// // // //     })
// // // //   }

// // // //   if (!open) return (
// // // //     <button
// // // //       onClick={() => setOpen(true)}
// // // //       style={{
// // // //         display: 'inline-flex', alignItems: 'center', gap: 8,
// // // //         padding: '10px 20px', borderRadius: 10,
// // // //         background: `linear-gradient(135deg, ${G.green1}, ${G.green2})`,
// // // //         color: '#fff', border: 'none', cursor: 'pointer',
// // // //         fontSize: 13.5, fontWeight: 700, fontFamily: FONTS.body,
// // // //         boxShadow: '0 4px 14px rgba(16,185,129,0.28)',
// // // //         transition: 'all 0.2s', marginBottom: 14,
// // // //       }}
// // // //     >
// // // //       📞 Contact Client
// // // //     </button>
// // // //   )

// // // //   const btnBase = {
// // // //     display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
// // // //     width: '100%', padding: '10px 16px', borderRadius: 10,
// // // //     fontSize: 13.5, fontWeight: 700, fontFamily: FONTS.body,
// // // //     cursor: 'pointer', border: 'none', transition: 'all 0.18s',
// // // //   }

// // // //   return (
// // // //     <div style={{ ...card, background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(5,150,105,0.03))', border: `1px solid ${G.greenBorder}`, marginBottom: 14 }}>
// // // //       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
// // // //         <div>
// // // //           <div style={{ fontSize: 15, fontWeight: 600, color: '#fff', fontFamily: FONTS.body }}>Client</div>
// // // //           <div style={{ fontSize: 12, color: G.muted, fontFamily: FONTS.body }}>
// // // //             {phone && `Phone: ${phone}`}{email && phone ? ' · ' : ''}{email && `${email}`}
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //       <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
// // // //         {phone && (
// // // //           <a href={`tel:${fullNumber}`} style={{ ...btnBase, background: `linear-gradient(135deg, ${G.green1}, ${G.green2})`, color: '#fff', textDecoration: 'none', boxShadow: '0 4px 14px rgba(16,185,129,0.28)' }}>
// // // //             📞 Call Client
// // // //           </a>
// // // //         )}
// // // //         {phone && (
// // // //           <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{ ...btnBase, background: 'linear-gradient(135deg, #14532d, #15803d)', color: '#fff', textDecoration: 'none', boxShadow: '0 4px 12px rgba(21,128,61,0.25)' }}>
// // // //             💬 WhatsApp Client
// // // //           </a>
// // // //         )}
// // // //         {phone && (
// // // //           <button onClick={() => copy(fullNumber, 'phone')} style={{ ...btnBase, background: G.surface, color: copied === 'phone' ? G.green3 : '#fff', border: `1px solid ${G.border}` }}>
// // // //             📋 {copied === 'phone' ? '✓ Copied!' : "Copy Client's Number"}
// // // //           </button>
// // // //         )}
// // // //         {email && (
// // // //           <a href={`mailto:${email}`} style={{ ...btnBase, background: 'rgba(96,165,250,0.12)', border: `1px solid rgba(96,165,250,0.25)`, color: G.blue, textDecoration: 'none' }}>
// // // //             ✉️ Email Client
// // // //           </a>
// // // //         )}
// // // //         {email && (
// // // //           <button onClick={() => copy(email, 'email')} style={{ ...btnBase, background: G.surface, color: copied === 'email' ? G.green3 : '#fff', border: `1px solid ${G.border}` }}>
// // // //             📋 {copied === 'email' ? '✓ Copied!' : "Copy Client's Email"}
// // // //           </button>
// // // //         )}
// // // //         <button onClick={() => setOpen(false)} style={{ ...btnBase, background: 'transparent', color: G.amber, border: `1px solid rgba(251,191,36,0.25)` }}>
// // // //           Hide Contact Card
// // // //         </button>
// // // //       </div>
// // // //     </div>
// // // //   )
// // // // }

// // // // /* ═══════════════════════════════════════════════════════════════
// // // //    MAIN COMPONENT
// // // // ═══════════════════════════════════════════════════════════════ */
// // // // export default function ClientDetails({ loan: rawLoan, user: rawUser, role, adminActions }) {
// // // //   /*
// // // //    * USER resolution order:
// // // //    *   1. `user` prop  (e.g. /admin/users/[id] — direct user page)
// // // //    *   2. `loan.client` (e.g. /admin/loans/[id] — admin opened a specific loan)
// // // //    *
// // // //    * LOAN resolution:
// // // //    *   Always the `loan` prop directly — never user.currentLoan.
// // // //    *   The admin chose this specific loan from a list; that's the one we show.
// // // //    *
// // // //    * Both may be raw Strapi v4 objects — normalizeStrapi handles unwrapping.
// // // //    */

// // // //   // Normalise the loan first so we can pull client + bank details from it
// // // //   const normLoan = rawLoan ? normalizeStrapi(rawLoan) : null

// // // //   // Resolve the user: explicit prop beats loan.client
// // // //   let resolvedUser = null
// // // //   if (rawUser) {
// // // //     resolvedUser = normalizeStrapi(rawUser)
// // // //   } else if (normLoan?.client) {
// // // //     resolvedUser = normLoan.client
// // // //   }

// // // //   if (!resolvedUser) {
// // // //     return (
// // // //       <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: G.page }}>
// // // //         <p style={{ color: G.muted, fontFamily: FONTS.body }}>No client data available.</p>
// // // //       </div>
// // // //     )
// // // //   }

// // // //   /*
// // // //    * Bank details — pulled from the selected loan, not from the user's currentLoan.
// // // //    *
// // // //    * Strapi typically populates bankDetails either:
// // // //    *   a) directly on the loan  (loan.bankDetails)
// // // //    *   b) on the loan's client  (loan.client.bankDetails)
// // // //    *
// // // //    * We check (a) first, then fall back to (b).
// // // //    */
// // // //   const bankDetails = normLoan?.bankDetails || resolvedUser?.bankDetails || null

// // // //   /*
// // // //    * QuickBooks invoice — on the specific loan only, not user.currentLoan.
// // // //    */
// // // //   const quickbookInvoiceNumber = normLoan?.quickBooksInvoiceNumber || null

// // // //   // Profile picture
// // // //   const picRaw = resolvedUser.profilePicture
// // // //   const picUrl = picRaw
// // // //     ? (Array.isArray(picRaw)
// // // //       ? (picRaw[0]?.formats?.thumbnail?.url ? backEndUrl + picRaw[0].formats.thumbnail.url : getUrl(picRaw[0]))
// // // //       : (picRaw.formats?.thumbnail?.url ? backEndUrl + picRaw.formats.thumbnail.url : getUrl(picRaw)))
// // // //     : null

// // // //   // Initials for avatar fallback
// // // //   const initials = (resolvedUser.fullnames || resolvedUser.username || '?')
// // // //     .split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

// // // //   // Collateral inspector sees limited view (no bank details)
// // // //   const isInspector = String(role || '').toLowerCase() === 'collateral inspector'

// // // //   return (
// // // //     <div style={{ minHeight: '100vh', background: G.page, paddingTop: 76, paddingBottom: 96, position: 'relative', overflowX: 'hidden' }}>

// // // //       {/* Ambient background */}
// // // //       <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse 80% 50% at 50% -5%, rgba(16,185,129,0.09) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
// // // //       <div style={{ position: 'fixed', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.022) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none', zIndex: 0 }} />

// // // //       <style>{`
// // // //         @keyframes cdSlideUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
// // // //         @keyframes cdSlideLeft { from { opacity:0; transform:translateX(16px); } to { opacity:1; transform:translateX(0); } }
// // // //         .cd-wrap { animation: cdSlideLeft 0.38s cubic-bezier(0.22,1,0.36,1) both; }
// // // //       `}</style>

// // // //       <div className="cd-wrap" style={{ position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto', padding: '0 16px' }}>

// // // //         {/* ── Header card ── */}
// // // //         <div style={{
// // // //           ...card,
// // // //           background: 'linear-gradient(135deg, rgba(16,185,129,0.10), rgba(5,150,105,0.04))',
// // // //           border: `1px solid ${G.greenBorder}`,
// // // //           display: 'flex', alignItems: 'center', gap: 16,
// // // //           position: 'relative', overflow: 'hidden',
// // // //         }}>
// // // //           {/* green accent bar */}
// // // //           <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${G.green1}, transparent)`, borderRadius: '16px 16px 0 0' }} />

// // // //           {/* Avatar */}
// // // //           {picUrl ? (
// // // //             <img src={picUrl} alt={resolvedUser.fullnames}
// // // //               style={{ width: 56, height: 56, borderRadius: 14, objectFit: 'cover', border: `2px solid ${G.green2}`, flexShrink: 0 }} />
// // // //           ) : (
// // // //             <div style={{ width: 56, height: 56, borderRadius: 14, background: 'linear-gradient(135deg, rgba(16,185,129,0.22), rgba(5,150,105,0.08))', border: `1.5px solid ${G.greenBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
// // // //               <span style={{ fontFamily: FONTS.display, fontSize: 20, color: G.green3 }}>{initials}</span>
// // // //             </div>
// // // //           )}

// // // //           {/* Name + pills */}
// // // //           <div style={{ flex: 1, minWidth: 0 }}>
// // // //             <p style={{ margin: '0 0 2px', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: G.muted, fontFamily: FONTS.body }}>
// // // //               Client{role ? ` · ${role}` : ''}
// // // //             </p>
// // // //             <h1 style={{ margin: '0 0 8px', fontFamily: FONTS.display, fontSize: 'clamp(18px,4vw,24px)', fontWeight: 400, color: '#fff', lineHeight: 1.2 }}>
// // // //               {resolvedUser.fullnames || resolvedUser.username || 'Client'}
// // // //             </h1>
// // // //             <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
// // // //               <Pill color={G.green2}>client</Pill>
// // // //               {normLoan?.id && <Pill color={G.amber} bg="rgba(251,191,36,0.12)">Loan #{normLoan.id}</Pill>}
// // // //               {resolvedUser.basicDetailsUpdated && <Pill color={G.purple} bg="rgba(167,139,250,0.12)">Profile Complete</Pill>}
// // // //               {resolvedUser.identityDetailsUpdated && <Pill color={G.blue} bg="rgba(96,165,250,0.12)">Identity ✓</Pill>}
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         {/* ── Admin action slot ── */}
// // // //         {adminActions && (
// // // //           <div style={{ marginBottom: 14 }}>
// // // //             {typeof adminActions === 'function' ? adminActions() : adminActions}
// // // //           </div>
// // // //         )}

// // // //         {/* ── Contact Card ── */}
// // // //         <ContactActions user={resolvedUser} />

// // // //         {/* ── Selected loan summary (the loan the admin opened, not user.currentLoan) ── */}
// // // //         {normLoan && <SelectedLoanSection loan={normLoan} />}

// // // //         {/* ── Personal details ── */}
// // // //         <PersonalSection user={resolvedUser} />

// // // //         {/* ── Bank details from the selected loan (hidden for Collateral Inspector) ── */}
// // // //         {!isInspector && (
// // // //           <BankSection
// // // //             bankDetails={bankDetails}
// // // //             quickbookInvoiceNumber={quickbookInvoiceNumber}
// // // //           />
// // // //         )}

// // // //         {/* ── Account info ── */}
// // // //         <AccountSection user={resolvedUser} />

// // // //       </div>
// // // //     </div>
// // // //   )
// // // // }
// // // 'use client'

// // // /**
// // //  * ClientDetails.jsx — Admin panel client details view
// // //  *
// // //  * Props:
// // //  *   loan         — raw Strapi loan object (the specific loan the admin selected)
// // //  *   user         — raw Strapi user object OR flat user (takes priority over loan.client)
// // //  *   role         — viewing admin's role string (optional)
// // //  *   adminActions — JSX slot / render-prop for action buttons (optional)
// // //  *   constants    — loansInformation constants (for requireVerificationVideo etc.)
// // //  */

// // // import { backEndUrl } from '@/Constants'
// // // import React, { useState } from 'react'
// // // import { Snackbar } from '@mui/material'
// // // import ContentCopyIcon from '@mui/icons-material/ContentCopy'
// // // import IconButton from '@mui/material/IconButton'

// // // /* ═══════════════════════════════════════════════════════════════
// // //    COLOUR TOKENS
// // // ═══════════════════════════════════════════════════════════════ */
// // // const G = {
// // //   page: '#0A0F1E',
// // //   green1: '#059669',
// // //   green2: '#10B981',
// // //   green3: '#34D399',
// // //   red: '#F87171',
// // //   blue: '#60A5FA',
// // //   amber: '#FBBF24',
// // //   purple: '#A78BFA',
// // //   muted: 'rgba(255,255,255,0.38)',
// // //   border: 'rgba(255,255,255,0.08)',
// // //   surface: 'rgba(255,255,255,0.05)',
// // //   greenBorder: 'rgba(16,185,129,0.22)',
// // //   greenGlow: 'rgba(16,185,129,0.12)',
// // // }

// // // const FONTS = {
// // //   display: "'DM Serif Display', Georgia, serif",
// // //   body: "'DM Sans', system-ui, -apple-system, sans-serif",
// // //   mono: "'JetBrains Mono', 'Courier New', monospace",
// // // }

// // // /* ═══════════════════════════════════════════════════════════════
// // //    STRAPI NORMALIZER
// // // ═══════════════════════════════════════════════════════════════ */
// // // function normalizeStrapi(obj) {
// // //   if (obj === null || obj === undefined) return obj
// // //   if (typeof obj !== 'object') return obj
// // //   if (Array.isArray(obj)) return obj.map(normalizeStrapi)
// // //   if (
// // //     obj.data !== undefined &&
// // //     !Array.isArray(obj.data) &&
// // //     obj.data !== null &&
// // //     typeof obj.data === 'object' &&
// // //     obj.data.attributes !== undefined
// // //   ) {
// // //     return normalizeStrapi({ id: obj.data.id, ...obj.data.attributes })
// // //   }
// // //   if (obj.data !== undefined && Array.isArray(obj.data)) {
// // //     return obj.data.map(item =>
// // //       item && item.attributes
// // //         ? normalizeStrapi({ id: item.id, ...item.attributes })
// // //         : normalizeStrapi(item)
// // //     )
// // //   }
// // //   const result = {}
// // //   for (const key of Object.keys(obj)) {
// // //     result[key] = normalizeStrapi(obj[key])
// // //   }
// // //   return result
// // // }

// // // /* ═══════════════════════════════════════════════════════════════
// // //    HELPERS
// // // ═══════════════════════════════════════════════════════════════ */
// // // const fmt = (v) => (v == null || v === '' ? '—' : String(v))
// // // const fmtMoney = (v) => v == null ? '—' : `K${Number(v).toLocaleString('en-ZM', { minimumFractionDigits: 2 })}`
// // // const fmtDate = (v) => v ? new Date(v).toLocaleDateString('en-ZM', { year: 'numeric', month: 'short', day: 'numeric' }) : '—'
// // // const cap = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '—'
// // // const getUrl = (file) => {
// // //   if (!file) return '#'
// // //   if (typeof file === 'string') return file.startsWith('http') ? file : backEndUrl + file
// // //   if (file.url?.startsWith('http')) return file.url
// // //   return backEndUrl + (file.url || '')
// // // }
// // // const camelToLabel = (key) =>
// // //   key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())

// // // /* ═══════════════════════════════════════════════════════════════
// // //    SHARED STYLES
// // // ═══════════════════════════════════════════════════════════════ */
// // // const card = {
// // //   background: G.surface,
// // //   border: `1px solid ${G.border}`,
// // //   borderRadius: 16,
// // //   padding: '18px 20px',
// // //   marginBottom: 14,
// // //   backdropFilter: 'blur(16px)',
// // //   WebkitBackdropFilter: 'blur(16px)',
// // //   fontFamily: FONTS.body,
// // // }

// // // const row = {
// // //   display: 'flex',
// // //   justifyContent: 'space-between',
// // //   alignItems: 'flex-start',
// // //   gap: 12,
// // //   padding: '9px 0',
// // // }

// // // const labelText = {
// // //   fontSize: 12,
// // //   fontWeight: 600,
// // //   color: G.muted,
// // //   minWidth: 140,
// // //   flexShrink: 0,
// // //   fontFamily: FONTS.body,
// // // }

// // // const valueText = {
// // //   fontSize: 13.5,
// // //   fontWeight: 500,
// // //   color: '#fff',
// // //   textAlign: 'right',
// // //   wordBreak: 'break-word',
// // //   fontFamily: FONTS.body,
// // // }

// // // /* ═══════════════════════════════════════════════════════════════
// // //    SMALL COMPONENTS
// // // ═══════════════════════════════════════════════════════════════ */

// // // function InfoRow({ label: l, value: v, last, mono }) {
// // //   return (
// // //     <div style={{ ...row, borderBottom: last ? 'none' : `1px solid ${G.border}` }}>
// // //       <span style={labelText}>{l}</span>
// // //       <span style={{ ...valueText, ...(mono ? { fontFamily: FONTS.mono } : {}) }}>{v ?? '—'}</span>
// // //     </div>
// // //   )
// // // }

// // // function SectionLabel({ icon, children, accentColor = G.green2 }) {
// // //   return (
// // //     <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: G.muted, marginBottom: 12, fontFamily: FONTS.body, display: 'flex', alignItems: 'center', gap: 8 }}>
// // //       <span style={{ width: 3, height: 14, borderRadius: 2, background: `linear-gradient(180deg,${accentColor},${accentColor}88)`, display: 'inline-block', flexShrink: 0 }} />
// // //       {icon && <span style={{ color: accentColor, display: 'flex' }}>{icon}</span>}
// // //       <span style={{ color: G.muted }}>{children}</span>
// // //     </div>
// // //   )
// // // }

// // // function Pill({ children, color = G.green2, bg }) {
// // //   return (
// // //     <span style={{
// // //       display: 'inline-flex', alignItems: 'center', gap: 4,
// // //       padding: '3px 10px', borderRadius: 100,
// // //       background: bg || `${color}18`, color,
// // //       fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em',
// // //       fontFamily: FONTS.body,
// // //     }}>
// // //       {children}
// // //     </span>
// // //   )
// // // }

// // // function ToggleSection({ label, icon, accentColor = G.green2, defaultOpen = false, children }) {
// // //   const [open, setOpen] = useState(defaultOpen)
// // //   return (
// // //     <div style={{ ...card, padding: 0, overflow: 'hidden' }}>
// // //       <button
// // //         onClick={() => setOpen(o => !o)}
// // //         style={{
// // //           display: 'flex', alignItems: 'center', justifyContent: 'space-between',
// // //           width: '100%', padding: '14px 20px',
// // //           background: 'none', border: 'none', cursor: 'pointer',
// // //           borderBottom: open ? `1px solid ${G.border}` : 'none',
// // //         }}
// // //       >
// // //         <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
// // //           <span style={{ width: 3, height: 14, borderRadius: 2, background: `linear-gradient(180deg,${accentColor},${accentColor}88)`, display: 'inline-block', flexShrink: 0 }} />
// // //           {icon && <span style={{ color: accentColor, fontSize: 14 }}>{icon}</span>}
// // //           <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: G.muted, fontFamily: FONTS.body }}>{label}</span>
// // //         </div>
// // //         <span style={{ color: G.muted, fontSize: 12, fontFamily: FONTS.body, fontWeight: 600 }}>
// // //           {open ? '▲ Hide' : '▼ Show'}
// // //         </span>
// // //       </button>
// // //       {open && <div style={{ padding: '14px 20px 18px' }}>{children}</div>}
// // //     </div>
// // //   )
// // // }

// // // /* ── Document modal ─────────────────────────────────────────── */
// // // function DocModal({ files, title, onClose }) {
// // //   if (!files || files.length === 0) return null
// // //   return (
// // //     <div
// // //       onClick={onClose}
// // //       style={{
// // //         position: 'fixed', inset: 0, zIndex: 9999,
// // //         background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
// // //         display: 'flex', alignItems: 'center', justifyContent: 'center',
// // //         padding: 20,
// // //       }}
// // //     >
// // //       <div
// // //         onClick={e => e.stopPropagation()}
// // //         style={{
// // //           background: '#111827', border: `1px solid ${G.greenBorder}`,
// // //           borderRadius: 20, padding: 28, maxWidth: 500, width: '100%',
// // //           maxHeight: '80vh', overflowY: 'auto',
// // //         }}
// // //       >
// // //         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
// // //           <h3 style={{ margin: 0, color: '#fff', fontFamily: FONTS.display, fontWeight: 400, fontSize: 18 }}>{title}</h3>
// // //           <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: G.muted, borderRadius: 8, padding: '4px 12px', cursor: 'pointer', fontSize: 14 }}>✕ Close</button>
// // //         </div>
// // //         <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
// // //           {files.map((file, i) => {
// // //             const url = getUrl(file)
// // //             const name = file.name || file.url?.split('/').pop() || `Document ${i + 1}`
// // //             const isVideo = file.mime?.startsWith('video/')
// // //             return (
// // //               <a
// // //                 key={i}
// // //                 href={url}
// // //                 target="_blank"
// // //                 rel="noopener noreferrer"
// // //                 style={{
// // //                   display: 'flex', alignItems: 'center', gap: 12,
// // //                   padding: '12px 14px', borderRadius: 12,
// // //                   background: 'rgba(255,255,255,0.04)', border: `1px solid ${G.border}`,
// // //                   textDecoration: 'none', color: '#fff', fontFamily: FONTS.body,
// // //                   transition: 'background 0.15s',
// // //                 }}
// // //               >
// // //                 <span style={{ fontSize: 22, flexShrink: 0 }}>{isVideo ? '🎥' : '📄'}</span>
// // //                 <div style={{ flex: 1, minWidth: 0 }}>
// // //                   <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</div>
// // //                   <div style={{ fontSize: 11, color: G.muted }}>{file.mime || 'Document'} · Click to open in new tab</div>
// // //                 </div>
// // //                 <span style={{ color: G.green3, fontSize: 12, flexShrink: 0 }}>↗</span>
// // //               </a>
// // //             )
// // //           })}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   )
// // // }

// // // /* ── Doc view button — single file opens directly, multiple open modal ── */
// // // function DocViewButton({ files, label, accentColor = G.green2 }) {
// // //   const [modalOpen, setModalOpen] = useState(false)
// // //   const arr = Array.isArray(files) ? files.filter(Boolean) : (files ? [files] : [])
// // //   if (arr.length === 0) return <span style={{ fontSize: 12, color: G.muted, fontStyle: 'italic' }}>Not uploaded</span>

// // //   if (arr.length === 1) {
// // //     return (
// // //       <a
// // //         href={getUrl(arr[0])}
// // //         target="_blank"
// // //         rel="noopener noreferrer"
// // //         style={{
// // //           display: 'inline-flex', alignItems: 'center', gap: 6,
// // //           padding: '6px 14px', borderRadius: 8,
// // //           background: `${accentColor}15`, border: `1px solid ${accentColor}40`,
// // //           color: accentColor, fontSize: 12, fontWeight: 600,
// // //           textDecoration: 'none', fontFamily: FONTS.body,
// // //         }}
// // //       >
// // //         📄 {label}
// // //       </a>
// // //     )
// // //   }

// // //   return (
// // //     <>
// // //       <button
// // //         onClick={() => setModalOpen(true)}
// // //         style={{
// // //           display: 'inline-flex', alignItems: 'center', gap: 6,
// // //           padding: '6px 14px', borderRadius: 8,
// // //           background: `${accentColor}15`, border: `1px solid ${accentColor}40`,
// // //           color: accentColor, fontSize: 12, fontWeight: 600,
// // //           cursor: 'pointer', fontFamily: FONTS.body,
// // //         }}
// // //       >
// // //         📂 {label} ({arr.length})
// // //       </button>
// // //       {modalOpen && <DocModal files={arr} title={label} onClose={() => setModalOpen(false)} />}
// // //     </>
// // //   )
// // // }

// // // /* ── Bank Details — uses the Object.entries copy approach from the original ── */
// // // function BankDetails({ bankDetails, quickbookInvoiceNumber }) {
// // //   const [snackbarOpen, setSnackbarOpen] = useState(false)

// // //   const handleCopy = (value) => {
// // //     navigator.clipboard.writeText(String(value))
// // //     setSnackbarOpen(true)
// // //   }

// // //   if (!bankDetails) return (
// // //     <div style={{ padding: '12px 14px', borderRadius: 10, background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.22)', color: G.blue, fontSize: 13 }}>
// // //       Bank details will appear when the client signs the loan form.
// // //     </div>
// // //   )

// // //   const entries = Object.entries({
// // //     ...bankDetails,
// // //     ...(quickbookInvoiceNumber ? { quickBooksInvoiceNumber: quickbookInvoiceNumber } : {}),
// // //   }).filter(([k]) => k !== 'id')

// // //   return (
// // //     <>
// // //       <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
// // //         {entries.map(([key, value]) => (
// // //           <div
// // //             key={key}
// // //             style={{
// // //               display: 'flex', justifyContent: 'space-between', alignItems: 'center',
// // //               padding: '10px 14px', borderRadius: 10,
// // //               background: 'rgba(255,255,255,0.03)', border: `1px solid ${G.border}`,
// // //             }}
// // //           >
// // //             <div>
// // //               <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: G.muted, fontFamily: FONTS.body, marginBottom: 2 }}>
// // //                 {camelToLabel(key)}
// // //               </div>
// // //               <div style={{ fontSize: 14, color: '#fff', fontFamily: FONTS.mono, fontWeight: 500 }}>{value}</div>
// // //             </div>
// // //             <IconButton
// // //               onClick={() => handleCopy(value)}
// // //               size="small"
// // //               sx={{ color: G.muted, '&:hover': { color: G.green2, background: G.greenGlow } }}
// // //             >
// // //               <ContentCopyIcon fontSize="small" />
// // //             </IconButton>
// // //           </div>
// // //         ))}
// // //       </div>
// // //       <Snackbar
// // //         open={snackbarOpen}
// // //         autoHideDuration={2000}
// // //         onClose={(_, r) => r !== 'clickaway' && setSnackbarOpen(false)}
// // //         message="Copied to clipboard"
// // //         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
// // //       />
// // //     </>
// // //   )
// // // }

// // // /* ═══════════════════════════════════════════════════════════════
// // //    SECTION BLOCKS
// // // ═══════════════════════════════════════════════════════════════ */

// // // function PersonalSection({ user, role }) {
// // //   const d = user.details || {}
// // //   const isInspector = String(role || '').toLowerCase() === 'collateral inspector'
// // //   return (
// // //     <div style={card}>
// // //       <SectionLabel icon="👤" accentColor={G.green2}>Personal Details</SectionLabel>
// // //       <InfoRow label="Full Names" value={fmt(user.fullnames)} />
// // //       <InfoRow label="First Name" value={fmt(d.firstname)} />
// // //       <InfoRow label="Last Name" value={fmt(d.lastname)} />
// // //       <InfoRow label="Gender" value={cap(d.gender)} />
// // //       {!isInspector && <InfoRow label="Date of Birth" value={fmtDate(d.dateOfBirth)} />}
// // //       {!isInspector && <InfoRow label="Age" value={d.age ?? '—'} />}
// // //       <InfoRow label="Address" value={fmt(d.address)} />
// // //       <InfoRow label="Email" value={fmt(user.email)} />
// // //       <InfoRow label="Phone / Username" value={fmt(user.username)} />
// // //       {!isInspector && <InfoRow label="Signing Method" value={cap(user.signingMethod)} />}
// // //       {!isInspector && <InfoRow label="Profile Complete" value={user.basicDetailsUpdated ? 'Yes' : 'No'} />}
// // //       {!isInspector && <InfoRow label="Identity Updated" value={user.identityDetailsUpdated ? 'Yes' : 'No'} last />}
// // //     </div>
// // //   )
// // // }

// // // /* ── Identity details (NRC, passport, photos) ── */
// // // function IdentitySection({ user }) {
// // //   const cd = user.clientDetails || {}
// // //   const hasAny = cd.IDfront || cd.IDback || cd.selfie || cd.idNumber || cd.passportNumber
// // //   if (!hasAny) return null

// // //   return (
// // //     <ToggleSection label="Identity Details" icon="🪪" accentColor={G.blue}>
// // //       {cd.idNumber && <InfoRow label="NRC / ID Number" value={fmt(cd.idNumber)} mono />}
// // //       {cd.passportNumber && <InfoRow label="Passport Number" value={fmt(cd.passportNumber)} mono />}
// // //       {cd.idType && <InfoRow label="ID Type" value={fmt(cd.idType)} />}
// // //       <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
// // //         {cd.IDfront && <DocViewButton files={cd.IDfront} label="ID Front" accentColor={G.blue} />}
// // //         {cd.IDback && <DocViewButton files={cd.IDback} label="ID Back" accentColor={G.blue} />}
// // //         {cd.selfie && <DocViewButton files={cd.selfie} label="Selfie / Photo" accentColor={G.purple} />}
// // //       </div>
// // //     </ToggleSection>
// // //   )
// // // }

// // // /* ── Salary / employment section ── */
// // // function SalarySection({ user, showVerificationVideo }) {
// // //   const salary = user.salary || null
// // //   if (!salary) return null

// // //   return (
// // //     <ToggleSection label="Salary & Employment" icon="💼" accentColor={G.amber}>
// // //       {salary.employerName && <InfoRow label="Employer / Company" value={fmt(salary.employerName)} />}
// // //       {salary.salaryAmount && <InfoRow label="Salary Amount" value={fmtMoney(salary.salaryAmount)} />}
// // //       {salary.employementVerificationNumber && <InfoRow label="Verification Phone" value={fmt(salary.employementVerificationNumber)} mono />}
// // //       {salary.companyLocation && <InfoRow label="Company Address" value={fmt(salary.companyLocation)} />}
// // //       {salary.socialSecurityNumber && <InfoRow label="Social Security No." value={fmt(salary.socialSecurityNumber)} mono />}

// // //       {/* Document buttons */}
// // //       <div style={{ marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
// // //         {salary.paySlip && (
// // //           <DocViewButton files={Array.isArray(salary.paySlip) ? salary.paySlip : [salary.paySlip]} label="Pay Slip" accentColor={G.amber} />
// // //         )}
// // //         {salary.bankStatement && (
// // //           <DocViewButton files={Array.isArray(salary.bankStatement) ? salary.bankStatement : [salary.bankStatement]} label="Bank Statement" accentColor={G.amber} />
// // //         )}
// // //         {showVerificationVideo && salary.verificationVideo && (
// // //           <DocViewButton files={Array.isArray(salary.verificationVideo) ? salary.verificationVideo : [salary.verificationVideo]} label="Verification Video" accentColor={G.purple} />
// // //         )}
// // //       </div>
// // //     </ToggleSection>
// // //   )
// // // }

// // // /* ── Business / collateral section ── */
// // // function BusinessSection({ user }) {
// // //   const biz = user.businessDetails || user.business || null
// // //   if (!biz) return null

// // //   const docFields = ['registrationCertificate', 'taxClearance', 'financialStatements', 'businessPlan', 'proofOfAddress', 'directorId', 'documents']

// // //   return (
// // //     <ToggleSection label="Business Details" icon="🏢" accentColor={G.purple}>
// // //       {Object.entries(biz).filter(([k]) => !docFields.includes(k) && k !== 'id').map(([k, v]) =>
// // //         v && typeof v !== 'object' ? <InfoRow key={k} label={camelToLabel(k)} value={fmt(v)} /> : null
// // //       )}
// // //       <div style={{ marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
// // //         {docFields.map(field => biz[field] ? (
// // //           <DocViewButton key={field} files={Array.isArray(biz[field]) ? biz[field] : [biz[field]]} label={camelToLabel(field)} accentColor={G.purple} />
// // //         ) : null)}
// // //       </div>
// // //     </ToggleSection>
// // //   )
// // // }

// // // /* ── Signatures ── */
// // // function SignaturesSection({ user, loan }) {
// // //   const sigs = [
// // //     { label: 'Client Signature', file: user.signature || loan?.clientSignature },
// // //     { label: 'Witness Signature', file: loan?.witnessSignature },
// // //     { label: 'Officer Signature', file: loan?.officerSignature },
// // //   ].filter(s => s.file)

// // //   if (sigs.length === 0) return null

// // //   return (
// // //     <ToggleSection label="Signatures" icon="✍️" accentColor={G.green3}>
// // //       <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
// // //         {sigs.map((s, i) => (
// // //           <DocViewButton key={i} files={[s.file]} label={s.label} accentColor={G.green3} />
// // //         ))}
// // //       </div>
// // //     </ToggleSection>
// // //   )
// // // }

// // // /* ── Loan documents section (loan form, appendix, etc.) ── */
// // // function LoanDocumentsSection({ loan }) {
// // //   if (!loan) return null
// // //   const docFields = [
// // //     { key: 'loanForm', label: 'Loan Form' },
// // //     { key: 'loanFormAppendix', label: 'Loan Form Appendix' },
// // //     { key: 'loanAgreement', label: 'Loan Agreement' },
// // //     { key: 'proofOfPayment', label: 'Proof of Payment' },
// // //     { key: 'disbursementLetter', label: 'Disbursement Letter' },
// // //     { key: 'sessionLetter', label: 'Session Letter' },
// // //   ]
// // //   const available = docFields.filter(({ key }) => loan[key])
// // //   if (available.length === 0) return null

// // //   return (
// // //     <ToggleSection label="Loan Documents" icon="📋" accentColor={G.blue}>
// // //       <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
// // //         {available.map(({ key, label }) => (
// // //           <DocViewButton
// // //             key={key}
// // //             files={Array.isArray(loan[key]) ? loan[key] : [loan[key]]}
// // //             label={label}
// // //             accentColor={G.blue}
// // //           />
// // //         ))}
// // //       </div>
// // //     </ToggleSection>
// // //   )
// // // }

// // // /* ── Collateral section ── */
// // // function CollateralSection({ loan }) {
// // //   if (!loan?.collateral) return null
// // //   const col = loan.collateral
// // //   const mediaFields = ['vehicleImages', 'titleDeedImages', 'houseImages', 'otherImages', 'collateralImages', 'sessionLetter', 'sessionLetterTemplate']

// // //   return (
// // //     <ToggleSection label="Collateral" icon="🏠" accentColor={G.amber} defaultOpen>
// // //       {col.collateralType && <InfoRow label="Collateral Type" value={cap(col.collateralType)} />}
// // //       {col.estimatedValue && <InfoRow label="Estimated Value" value={fmtMoney(col.estimatedValue)} />}
// // //       {col.collateralStatus && <InfoRow label="Status" value={cap(col.collateralStatus)} />}
// // //       {col.inspectionDate && <InfoRow label="Inspection Date" value={fmtDate(col.inspectionDate)} />}
// // //       {col.inspectionNotes && <InfoRow label="Inspection Notes" value={fmt(col.inspectionNotes)} last />}

// // //       {/* Vehicle sub-details */}
// // //       {col.vehicle && (
// // //         <>
// // //           <div style={{ marginTop: 14, marginBottom: 6, fontSize: 11, fontWeight: 700, color: G.muted, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Vehicle</div>
// // //           {Object.entries(col.vehicle).filter(([k]) => !mediaFields.includes(k) && k !== 'id' && typeof col.vehicle[k] !== 'object').map(([k, v]) =>
// // //             v ? <InfoRow key={k} label={camelToLabel(k)} value={fmt(v)} /> : null
// // //           )}
// // //         </>
// // //       )}

// // //       {/* Media */}
// // //       <div style={{ marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
// // //         {mediaFields.map(field => {
// // //           const src = col[field] || col.vehicle?.[field]
// // //           return src ? (
// // //             <DocViewButton key={field} files={Array.isArray(src) ? src : [src]} label={camelToLabel(field)} accentColor={G.amber} />
// // //           ) : null
// // //         })}
// // //       </div>
// // //     </ToggleSection>
// // //   )
// // // }

// // // /* ── Selected loan summary (always visible) ── */
// // // function SelectedLoanSection({ loan }) {
// // //   if (!loan) return null
// // //   const loanType = loan.loanType?.typeName || loan.loanCategory || '—'
// // //   return (
// // //     <div style={{ ...card, background: 'rgba(16,185,129,0.06)', border: `1px solid ${G.greenBorder}` }}>
// // //       <SectionLabel icon="💳" accentColor={G.green2}>Selected Loan</SectionLabel>
// // //       <InfoRow label="Loan ID" value={`#${loan.id || '—'}`} />
// // //       <InfoRow label="Loan Type" value={fmt(loanType)} />
// // //       <InfoRow label="Status" value={fmt(loan.loanStatus?.replace(/-/g, ' '))} />
// // //       <InfoRow label="Loan Amount" value={fmtMoney(loan.loanAmount)} />
// // //       <InfoRow label="Outstanding" value={fmtMoney(loan.outstandingAmount)} />
// // //       <InfoRow label="Repayment Amount" value={fmtMoney(loan.repaymentAmount)} />
// // //       <InfoRow label="Interest Rate" value={loan.interestRate ? `${loan.interestRate}%` : '—'} />
// // //       <InfoRow label="Term" value={loan.loanTerm ? `${loan.loanTerm} months` : '—'} />
// // //       <InfoRow label="Purpose" value={fmt(loan.loanPurpose)} />
// // //       <InfoRow label="Disbursed Date" value={fmtDate(loan.disbursedAt || loan.disbursementDate)} />
// // //       <InfoRow label="Created" value={fmtDate(loan.createdAt)} last />
// // //     </div>
// // //   )
// // // }

// // // /* ── Bank section (uses the copy-all-fields approach) ── */
// // // function BankSection({ bankDetails, quickbookInvoiceNumber }) {
// // //   return (
// // //     <div style={{ ...card, padding: 0, overflow: 'hidden' }}>
// // //       <div style={{ padding: '14px 20px 10px' }}>
// // //         <SectionLabel icon="🏦" accentColor={G.blue}>Bank Details</SectionLabel>
// // //       </div>
// // //       <div style={{ padding: '0 12px 14px' }}>
// // //         <BankDetails bankDetails={bankDetails} quickbookInvoiceNumber={quickbookInvoiceNumber} />
// // //       </div>
// // //     </div>
// // //   )
// // // }

// // // function AccountSection({ user }) {
// // //   return (
// // //     <div style={card}>
// // //       <SectionLabel icon="⚙️" accentColor={G.purple}>Account Info</SectionLabel>
// // //       <InfoRow label="Username / Phone" value={fmt(user.username)} mono />
// // //       <InfoRow label="Email" value={fmt(user.email)} />
// // //       <InfoRow label="Registered" value={fmtDate(user.createdAt)} last />
// // //     </div>
// // //   )
// // // }

// // // /* ═══════════════════════════════════════════════════════════════
// // //    CONTACT ACTIONS (at the bottom)
// // // ═══════════════════════════════════════════════════════════════ */
// // // function ContactActions({ user }) {
// // //   const [open, setOpen] = useState(false)
// // //   const [copied, setCopied] = useState(null)

// // //   const phone = user.username || ''
// // //   const email = user.email || ''

// // //   const returnNine = (p) => {
// // //     const digits = String(p).replace(/\D/g, '')
// // //     return digits.length >= 9 ? digits.slice(-9) : digits
// // //   }
// // //   const fullNumber = phone ? `+260${returnNine(phone)}` : ''
// // //   const waUrl = `https://wa.me/${fullNumber.replace('+', '')}`

// // //   const copy = (val, key) => {
// // //     if (!val) return
// // //     navigator.clipboard.writeText(val).then(() => {
// // //       setCopied(key)
// // //       setTimeout(() => setCopied(null), 2000)
// // //     })
// // //   }

// // //   const btnBase = {
// // //     display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
// // //     width: '100%', padding: '10px 16px', borderRadius: 10,
// // //     fontSize: 13.5, fontWeight: 700, fontFamily: FONTS.body,
// // //     cursor: 'pointer', border: 'none', transition: 'all 0.18s',
// // //   }

// // //   if (!open) return (
// // //     <button
// // //       onClick={() => setOpen(true)}
// // //       style={{
// // //         display: 'inline-flex', alignItems: 'center', gap: 8,
// // //         padding: '10px 20px', borderRadius: 10,
// // //         background: `linear-gradient(135deg, ${G.green1}, ${G.green2})`,
// // //         color: '#fff', border: 'none', cursor: 'pointer',
// // //         fontSize: 13.5, fontWeight: 700, fontFamily: FONTS.body,
// // //         boxShadow: '0 4px 14px rgba(16,185,129,0.28)',
// // //         transition: 'all 0.2s', marginBottom: 14, width: '100%', justifyContent: 'center',
// // //       }}
// // //     >
// // //       📞 Contact Client
// // //     </button>
// // //   )

// // //   return (
// // //     <div style={{ ...card, background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(5,150,105,0.03))', border: `1px solid ${G.greenBorder}` }}>
// // //       <div style={{ fontSize: 13, color: G.muted, fontFamily: FONTS.body, marginBottom: 14 }}>
// // //         {phone && `📱 ${phone}`}{email && phone ? '  ·  ' : ''}{email && `✉️ ${email}`}
// // //       </div>
// // //       <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
// // //         {phone && (
// // //           <a href={`tel:${fullNumber}`} style={{ ...btnBase, background: `linear-gradient(135deg, ${G.green1}, ${G.green2})`, color: '#fff', textDecoration: 'none', boxShadow: '0 4px 14px rgba(16,185,129,0.28)' }}>
// // //             📞 Call Client
// // //           </a>
// // //         )}
// // //         {phone && (
// // //           <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{ ...btnBase, background: 'linear-gradient(135deg, #14532d, #15803d)', color: '#fff', textDecoration: 'none' }}>
// // //             💬 WhatsApp Client
// // //           </a>
// // //         )}
// // //         {phone && (
// // //           <button onClick={() => copy(fullNumber, 'phone')} style={{ ...btnBase, background: G.surface, color: copied === 'phone' ? G.green3 : '#fff', border: `1px solid ${G.border}` }}>
// // //             📋 {copied === 'phone' ? '✓ Copied!' : "Copy Client's Number"}
// // //           </button>
// // //         )}
// // //         {email && (
// // //           <a href={`mailto:${email}`} style={{ ...btnBase, background: 'rgba(96,165,250,0.12)', border: `1px solid rgba(96,165,250,0.25)`, color: G.blue, textDecoration: 'none' }}>
// // //             ✉️ Email Client
// // //           </a>
// // //         )}
// // //         {email && (
// // //           <button onClick={() => copy(email, 'email')} style={{ ...btnBase, background: G.surface, color: copied === 'email' ? G.green3 : '#fff', border: `1px solid ${G.border}` }}>
// // //             📋 {copied === 'email' ? '✓ Copied!' : "Copy Client's Email"}
// // //           </button>
// // //         )}
// // //         <button onClick={() => setOpen(false)} style={{ ...btnBase, background: 'transparent', color: G.amber, border: `1px solid rgba(251,191,36,0.25)` }}>
// // //           Hide Contact Card
// // //         </button>
// // //       </div>
// // //     </div>
// // //   )
// // // }

// // // /* ═══════════════════════════════════════════════════════════════
// // //    MAIN COMPONENT
// // // ═══════════════════════════════════════════════════════════════ */
// // // export default function ClientDetails({ loan: rawLoan, user: rawUser, role, adminActions, constants }) {
// // //   // Normalise loan first — all loan-specific data comes from here
// // //   const normLoan = rawLoan ? normalizeStrapi(rawLoan) : null

// // //   // Resolve user: explicit prop > loan.client
// // //   let resolvedUser = null
// // //   if (rawUser) {
// // //     resolvedUser = normalizeStrapi(rawUser)
// // //   } else if (normLoan?.client) {
// // //     resolvedUser = normLoan.client
// // //   }

// // //   if (!resolvedUser) {
// // //     return (
// // //       <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: G.page }}>
// // //         <p style={{ color: G.muted, fontFamily: FONTS.body }}>No client data available.</p>
// // //       </div>
// // //     )
// // //   }

// // //   // Bank details: from the selected loan first, then client fallback
// // //   const bankDetails = normLoan?.bankDetails || resolvedUser?.bankDetails || null
// // //   const quickbookInvoiceNumber = normLoan?.quickBooksInvoiceNumber || null

// // //   // Settings
// // //   const showVerificationVideo = constants?.loansInformation?.requireVerificationVideo !== false

// // //   // Avatar
// // //   const picRaw = resolvedUser.profilePicture
// // //   const picUrl = picRaw
// // //     ? (Array.isArray(picRaw)
// // //       ? (picRaw[0]?.formats?.thumbnail?.url ? backEndUrl + picRaw[0].formats.thumbnail.url : getUrl(picRaw[0]))
// // //       : (picRaw.formats?.thumbnail?.url ? backEndUrl + picRaw.formats.thumbnail.url : getUrl(picRaw)))
// // //     : null

// // //   const initials = (resolvedUser.fullnames || resolvedUser.username || '?')
// // //     .split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

// // //   const isInspector = String(role || '').toLowerCase() === 'collateral inspector'

// // //   // Detect loan type (salary vs asset)
// // //   const loanTypeName = normLoan?.loanType?.typeName || normLoan?.loanCategory || ''
// // //   const isSalaryLoan = String(loanTypeName).toLowerCase().includes('salary') ||
// // //     String(loanTypeName).toLowerCase().includes('salarybased') ||
// // //     normLoan?.loanCategory === 'salaryLoans'

// // //   return (
// // //     <div style={{ minHeight: '100vh', background: G.page, paddingTop: 76, paddingBottom: 96, position: 'relative', overflowX: 'hidden' }}>
// // //       <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse 80% 50% at 50% -5%, rgba(16,185,129,0.09) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
// // //       <div style={{ position: 'fixed', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.022) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none', zIndex: 0 }} />

// // //       <style>{`
// // //         @keyframes cdSlideLeft { from { opacity:0; transform:translateX(16px); } to { opacity:1; transform:translateX(0); } }
// // //         .cd-wrap { animation: cdSlideLeft 0.38s cubic-bezier(0.22,1,0.36,1) both; }
// // //       `}</style>

// // //       <div className="cd-wrap" style={{ position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto', padding: '0 16px' }}>

// // //         {/* ── Header ── */}
// // //         <div style={{
// // //           ...card,
// // //           background: 'linear-gradient(135deg, rgba(16,185,129,0.10), rgba(5,150,105,0.04))',
// // //           border: `1px solid ${G.greenBorder}`,
// // //           display: 'flex', alignItems: 'center', gap: 16,
// // //           position: 'relative', overflow: 'hidden',
// // //         }}>
// // //           <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${G.green1}, transparent)`, borderRadius: '16px 16px 0 0' }} />
// // //           {picUrl ? (
// // //             <img src={picUrl} alt={resolvedUser.fullnames} style={{ width: 56, height: 56, borderRadius: 14, objectFit: 'cover', border: `2px solid ${G.green2}`, flexShrink: 0 }} />
// // //           ) : (
// // //             <div style={{ width: 56, height: 56, borderRadius: 14, background: 'linear-gradient(135deg, rgba(16,185,129,0.22), rgba(5,150,105,0.08))', border: `1.5px solid ${G.greenBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
// // //               <span style={{ fontFamily: FONTS.display, fontSize: 20, color: G.green3 }}>{initials}</span>
// // //             </div>
// // //           )}
// // //           <div style={{ flex: 1, minWidth: 0 }}>
// // //             <p style={{ margin: '0 0 2px', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: G.muted, fontFamily: FONTS.body }}>
// // //               Client{role ? ` · ${role}` : ''}
// // //             </p>
// // //             <h1 style={{ margin: '0 0 8px', fontFamily: FONTS.display, fontSize: 'clamp(18px,4vw,24px)', fontWeight: 400, color: '#fff', lineHeight: 1.2 }}>
// // //               {resolvedUser.fullnames || resolvedUser.username || 'Client'}
// // //             </h1>
// // //             <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
// // //               <Pill color={G.green2}>client</Pill>
// // //               {normLoan?.id && <Pill color={G.amber} bg="rgba(251,191,36,0.12)">Loan #{normLoan.id}</Pill>}
// // //               {normLoan?.loanStatus && <Pill color={G.blue} bg="rgba(96,165,250,0.10)">{normLoan.loanStatus.replace(/-/g, ' ')}</Pill>}
// // //               {resolvedUser.basicDetailsUpdated && <Pill color={G.purple} bg="rgba(167,139,250,0.12)">Profile ✓</Pill>}
// // //               {resolvedUser.identityDetailsUpdated && <Pill color={G.blue} bg="rgba(96,165,250,0.12)">Identity ✓</Pill>}
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Admin actions */}
// // //         {adminActions && (
// // //           <div style={{ marginBottom: 14 }}>
// // //             {typeof adminActions === 'function' ? adminActions() : adminActions}
// // //           </div>
// // //         )}

// // //         {/* ① Bank Details — at the top for quick disbursement access */}
// // //         {!isInspector && (
// // //           <BankSection bankDetails={bankDetails} quickbookInvoiceNumber={quickbookInvoiceNumber} />
// // //         )}

// // //         {/* ② Selected loan summary */}
// // //         {normLoan && <SelectedLoanSection loan={normLoan} />}

// // //         {/* ③ Collateral */}
// // //         {normLoan && <CollateralSection loan={normLoan} />}

// // //         {/* ④ Loan documents (below collateral as requested) */}
// // //         {normLoan && <LoanDocumentsSection loan={normLoan} />}

// // //         {/* ⑤ Salary info — for salary-based loans or if user has salary data */}
// // //         {(isSalaryLoan || resolvedUser.salary) && (
// // //           <SalarySection user={resolvedUser} showVerificationVideo={showVerificationVideo} />
// // //         )}

// // //         {/* ⑥ Personal details */}
// // //         <PersonalSection user={resolvedUser} role={role} />

// // //         {/* ⑦ Identity (toggle) */}
// // //         {!isInspector && <IdentitySection user={resolvedUser} />}

// // //         {/* ⑧ Business details (toggle) */}
// // //         {!isInspector && <BusinessSection user={resolvedUser} />}

// // //         {/* ⑨ Signatures (toggle) */}
// // //         {!isInspector && <SignaturesSection user={resolvedUser} loan={normLoan} />}

// // //         {/* ⑩ Account info */}
// // //         {!isInspector && <AccountSection user={resolvedUser} />}

// // //         {/* ⑪ Contact card — at the bottom */}
// // //         <ContactActions user={resolvedUser} />

// // //       </div>
// // //     </div>
// // //   )
// // // }
// // 'use client'

// // /**
// //  * ClientDetails.jsx — Admin panel client details view
// //  *
// //  * Props:
// //  *   loan         — raw Strapi loan object (the specific loan the admin selected)
// //  *   user         — raw Strapi user object OR flat user (takes priority over loan.client)
// //  *   role         — viewing admin's role string (optional)
// //  *   adminActions — JSX slot / render-prop for action buttons (optional)
// //  *   constants    — app constants object (for loansInformation.requireVerificationVideo etc.)
// //  */

// // import { backEndUrl } from '@/Constants'
// // import React, { useState } from 'react'
// // import { Snackbar } from '@mui/material'
// // import ContentCopyIcon from '@mui/icons-material/ContentCopy'
// // import IconButton from '@mui/material/IconButton'

// // /* ═══════════════════════════════════════════════════════════════
// //    COLOUR TOKENS
// // ═══════════════════════════════════════════════════════════════ */
// // const G = {
// //   page: '#0A0F1E',
// //   green1: '#059669',
// //   green2: '#10B981',
// //   green3: '#34D399',
// //   red: '#F87171',
// //   blue: '#60A5FA',
// //   amber: '#FBBF24',
// //   purple: '#A78BFA',
// //   pink: '#F472B6',
// //   muted: 'rgba(255,255,255,0.38)',
// //   border: 'rgba(255,255,255,0.08)',
// //   surface: 'rgba(255,255,255,0.05)',
// //   greenBorder: 'rgba(16,185,129,0.22)',
// //   greenGlow: 'rgba(16,185,129,0.12)',
// // }

// // const FONTS = {
// //   display: "'DM Serif Display', Georgia, serif",
// //   body: "'DM Sans', system-ui, -apple-system, sans-serif",
// //   mono: "'JetBrains Mono', 'Courier New', monospace",
// // }

// // /* ═══════════════════════════════════════════════════════════════
// //    STRAPI NORMALIZER
// //    Unwraps { data: { id, attributes } } and array variants.
// //    Works on any nesting depth.
// // ═══════════════════════════════════════════════════════════════ */
// // function normalizeStrapi(obj) {
// //   if (obj === null || obj === undefined) return obj
// //   if (typeof obj !== 'object') return obj
// //   if (Array.isArray(obj)) return obj.map(normalizeStrapi)

// //   // Single relation: { data: { id, attributes } }
// //   if (
// //     obj.data !== undefined &&
// //     !Array.isArray(obj.data) &&
// //     obj.data !== null &&
// //     typeof obj.data === 'object' &&
// //     obj.data.attributes !== undefined
// //   ) {
// //     return normalizeStrapi({ id: obj.data.id, ...obj.data.attributes })
// //   }

// //   // Collection relation: { data: [ { id, attributes } ] }
// //   if (obj.data !== undefined && Array.isArray(obj.data)) {
// //     return obj.data.map(item =>
// //       item && item.attributes
// //         ? normalizeStrapi({ id: item.id, ...item.attributes })
// //         : normalizeStrapi(item)
// //     )
// //   }

// //   const result = {}
// //   for (const key of Object.keys(obj)) {
// //     result[key] = normalizeStrapi(obj[key])
// //   }
// //   return result
// // }

// // /* ═══════════════════════════════════════════════════════════════
// //    HELPERS
// // ═══════════════════════════════════════════════════════════════ */
// // const fmt = (v) => (v == null || v === '' ? '—' : String(v))
// // const fmtMoney = (v) => v == null ? '—' : `K${Number(v).toLocaleString('en-ZM', { minimumFractionDigits: 2 })}`
// // const fmtDate = (v) => v ? new Date(v).toLocaleDateString('en-ZM', { year: 'numeric', month: 'short', day: 'numeric' }) : '—'
// // const cap = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1) : '—'
// // const camelToLabel = (key) => key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())

// // const getUrl = (file) => {
// //   if (!file) return '#'
// //   if (typeof file === 'string') return file.startsWith('http') ? file : backEndUrl + file
// //   if (file.url?.startsWith('http')) return file.url
// //   return backEndUrl + (file.url || '')
// // }

// // /* ─── Normalise media fields into a plain array ─────────────── */
// // const toArr = (v) => {
// //   if (!v) return []
// //   if (Array.isArray(v)) return v.filter(Boolean)
// //   // Strapi v4 { data: [...] } already unwrapped by normalizeStrapi, but guard anyway
// //   if (v.data) return toArr(v.data)
// //   return [v]
// // }

// // /* ═══════════════════════════════════════════════════════════════
// //    SHARED STYLES
// // ═══════════════════════════════════════════════════════════════ */
// // const card = {
// //   background: G.surface,
// //   border: `1px solid ${G.border}`,
// //   borderRadius: 16,
// //   padding: '18px 20px',
// //   marginBottom: 14,
// //   backdropFilter: 'blur(16px)',
// //   WebkitBackdropFilter: 'blur(16px)',
// //   fontFamily: FONTS.body,
// // }

// // const row = {
// //   display: 'flex',
// //   justifyContent: 'space-between',
// //   alignItems: 'flex-start',
// //   gap: 12,
// //   padding: '9px 0',
// // }

// // const labelText = {
// //   fontSize: 12,
// //   fontWeight: 600,
// //   color: G.muted,
// //   minWidth: 140,
// //   flexShrink: 0,
// //   fontFamily: FONTS.body,
// // }

// // const valueText = {
// //   fontSize: 13.5,
// //   fontWeight: 500,
// //   color: '#fff',
// //   textAlign: 'right',
// //   wordBreak: 'break-word',
// //   fontFamily: FONTS.body,
// // }

// // const sectionLabelStyle = {
// //   fontSize: 10,
// //   fontWeight: 700,
// //   letterSpacing: '0.09em',
// //   textTransform: 'uppercase',
// //   color: G.muted,
// //   marginBottom: 10,
// //   fontFamily: FONTS.body,
// // }

// // /* ═══════════════════════════════════════════════════════════════
// //    SMALL COMPONENTS
// // ═══════════════════════════════════════════════════════════════ */

// // function InfoRow({ label: l, value: v, last, mono }) {
// //   return (
// //     <div style={{ ...row, borderBottom: last ? 'none' : `1px solid ${G.border}` }}>
// //       <span style={labelText}>{l}</span>
// //       <span style={{ ...valueText, ...(mono ? { fontFamily: FONTS.mono } : {}) }}>{v ?? '—'}</span>
// //     </div>
// //   )
// // }

// // function SectionLabel({ icon, children, accentColor = G.green2 }) {
// //   return (
// //     <div style={{ ...sectionLabelStyle, display: 'flex', alignItems: 'center', gap: 8 }}>
// //       <span style={{ width: 3, height: 14, borderRadius: 2, background: `linear-gradient(180deg,${accentColor},${accentColor}88)`, display: 'inline-block', flexShrink: 0 }} />
// //       {icon && <span style={{ color: accentColor, display: 'flex', fontSize: 14 }}>{icon}</span>}
// //       <span>{children}</span>
// //     </div>
// //   )
// // }

// // function Pill({ children, color = G.green2, bg }) {
// //   return (
// //     <span style={{
// //       display: 'inline-flex', alignItems: 'center', gap: 4,
// //       padding: '3px 10px', borderRadius: 100,
// //       background: bg || `${color}18`, color,
// //       fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em',
// //       fontFamily: FONTS.body,
// //     }}>
// //       {children}
// //     </span>
// //   )
// // }

// // /* ── Collapsible section ─────────────────────────────────────── */
// // function ToggleSection({ label, icon, accentColor = G.green2, defaultOpen = false, children }) {
// //   const [open, setOpen] = useState(defaultOpen)
// //   return (
// //     <div style={{ ...card, padding: 0, overflow: 'hidden' }}>
// //       <button
// //         onClick={() => setOpen(o => !o)}
// //         style={{
// //           display: 'flex', alignItems: 'center', justifyContent: 'space-between',
// //           width: '100%', padding: '14px 20px',
// //           background: 'none', border: 'none', cursor: 'pointer',
// //           borderBottom: open ? `1px solid ${G.border}` : 'none',
// //         }}
// //       >
// //         <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
// //           <span style={{ width: 3, height: 14, borderRadius: 2, background: `linear-gradient(180deg,${accentColor},${accentColor}88)`, display: 'inline-block', flexShrink: 0 }} />
// //           {icon && <span style={{ color: accentColor, fontSize: 14 }}>{icon}</span>}
// //           <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: G.muted, fontFamily: FONTS.body }}>{label}</span>
// //         </div>
// //         <span style={{ color: G.muted, fontSize: 12, fontFamily: FONTS.body, fontWeight: 600 }}>
// //           {open ? '▲ Hide' : '▼ Show'}
// //         </span>
// //       </button>
// //       {open && <div style={{ padding: '14px 20px 18px' }}>{children}</div>}
// //     </div>
// //   )
// // }

// // /* ── Document modal ──────────────────────────────────────────── */
// // function DocModal({ files, title, onClose }) {
// //   if (!files || files.length === 0) return null
// //   return (
// //     <div
// //       onClick={onClose}
// //       style={{
// //         position: 'fixed', inset: 0, zIndex: 9999,
// //         background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
// //         display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
// //       }}
// //     >
// //       <div
// //         onClick={e => e.stopPropagation()}
// //         style={{
// //           background: '#111827', border: `1px solid ${G.greenBorder}`,
// //           borderRadius: 20, padding: 28, maxWidth: 500, width: '100%',
// //           maxHeight: '80vh', overflowY: 'auto',
// //         }}
// //       >
// //         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
// //           <h3 style={{ margin: 0, color: '#fff', fontFamily: FONTS.display, fontWeight: 400, fontSize: 18 }}>{title}</h3>
// //           <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: G.muted, borderRadius: 8, padding: '4px 12px', cursor: 'pointer', fontSize: 14 }}>
// //             ✕ Close
// //           </button>
// //         </div>
// //         <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
// //           {files.map((file, i) => {
// //             const url = getUrl(file)
// //             const name = file.name || file.url?.split('/').pop() || `Document ${i + 1}`
// //             const isVideo = file.mime?.startsWith('video/')
// //             return (
// //               <a
// //                 key={i}
// //                 href={url}
// //                 target="_blank"
// //                 rel="noopener noreferrer"
// //                 style={{
// //                   display: 'flex', alignItems: 'center', gap: 12,
// //                   padding: '12px 14px', borderRadius: 12,
// //                   background: 'rgba(255,255,255,0.04)', border: `1px solid ${G.border}`,
// //                   textDecoration: 'none', color: '#fff', fontFamily: FONTS.body,
// //                 }}
// //               >
// //                 <span style={{ fontSize: 22, flexShrink: 0 }}>{isVideo ? '🎥' : '📄'}</span>
// //                 <div style={{ flex: 1, minWidth: 0 }}>
// //                   <div style={{ fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</div>
// //                   <div style={{ fontSize: 11, color: G.muted }}>{file.mime || 'Document'} · Click to open in new tab</div>
// //                 </div>
// //                 <span style={{ color: G.green3, fontSize: 12, flexShrink: 0 }}>↗</span>
// //               </a>
// //             )
// //           })}
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // /* ── DocViewButton — single opens directly, multiple open modal ─ */
// // function DocViewButton({ files, label, accentColor = G.green2 }) {
// //   const [modalOpen, setModalOpen] = useState(false)
// //   const arr = toArr(files)
// //   if (!arr.length) return <span style={{ fontSize: 12, color: G.muted, fontStyle: 'italic' }}>Not uploaded</span>

// //   const btnStyle = {
// //     display: 'inline-flex', alignItems: 'center', gap: 6,
// //     padding: '6px 14px', borderRadius: 8,
// //     background: `${accentColor}15`, border: `1px solid ${accentColor}40`,
// //     color: accentColor, fontSize: 12, fontWeight: 600,
// //     textDecoration: 'none', fontFamily: FONTS.body, cursor: 'pointer',
// //   }

// //   if (arr.length === 1) {
// //     return (
// //       <a href={getUrl(arr[0])} target="_blank" rel="noopener noreferrer" style={btnStyle}>
// //         📄 {label}
// //       </a>
// //     )
// //   }
// //   return (
// //     <>
// //       <button onClick={() => setModalOpen(true)} style={{ ...btnStyle, border: `1px solid ${accentColor}40` }}>
// //         📂 {label} ({arr.length})
// //       </button>
// //       {modalOpen && <DocModal files={arr} title={label} onClose={() => setModalOpen(false)} />}
// //     </>
// //   )
// // }

// // /* ── SignatureImage ───────────────────────────────────────────── */
// // function SignatureImage({ src, alt, accent = G.green2 }) {
// //   if (!src) {
// //     return (
// //       <div style={{ height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6, background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.10)' }}>
// //         <span style={{ fontSize: 11, color: G.muted, fontStyle: 'italic' }}>Not provided</span>
// //       </div>
// //     )
// //   }
// //   const url = getUrl(src)
// //   return (
// //     <a href={url} target="_blank" rel="noopener noreferrer" style={{ display: 'block' }}>
// //       <img src={url} alt={alt} style={{ maxHeight: 62, maxWidth: '100%', borderRadius: 7, border: `1px solid ${accent}40`, background: 'rgba(255,255,255,0.03)', cursor: 'pointer', display: 'block' }} />
// //     </a>
// //   )
// // }

// // /* ── KYC badge ───────────────────────────────────────────────── */
// // function KYCBadge({ verified }) {
// //   return verified
// //     ? <Pill color={G.green3}>Verified ✓</Pill>
// //     : <Pill color={G.red} bg="rgba(248,113,113,0.12)">Unverified</Pill>
// // }

// // /* ── Bank Details ────────────────────────────────────────────── */
// // function BankDetailsRows({ bankDetails, quickbookInvoiceNumber }) {
// //   const [snackOpen, setSnackOpen] = useState(false)

// //   if (!bankDetails) return (
// //     <div style={{ padding: '12px 14px', borderRadius: 10, background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.22)', color: G.blue, fontSize: 13 }}>
// //       Bank details will appear when the client signs the loan form.
// //     </div>
// //   )

// //   const entries = Object.entries({
// //     ...bankDetails,
// //     ...(quickbookInvoiceNumber ? { quickBooksInvoiceNumber: quickbookInvoiceNumber } : {}),
// //   }).filter(([k]) => k !== 'id' && k !== '__typename')

// //   const copy = (val) => {
// //     navigator.clipboard.writeText(String(val))
// //     setSnackOpen(true)
// //   }

// //   return (
// //     <>
// //       <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
// //         {entries.map(([key, value]) => (
// //           <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.03)', border: `1px solid ${G.border}` }}>
// //             <div>
// //               <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: G.muted, fontFamily: FONTS.body, marginBottom: 2 }}>
// //                 {camelToLabel(key)}
// //               </div>
// //               <div style={{ fontSize: 14, color: '#fff', fontFamily: FONTS.mono, fontWeight: 500 }}>{String(value)}</div>
// //             </div>
// //             <IconButton onClick={() => copy(value)} size="small" sx={{ color: G.muted, '&:hover': { color: G.green2, background: G.greenGlow } }}>
// //               <ContentCopyIcon fontSize="small" />
// //             </IconButton>
// //           </div>
// //         ))}
// //       </div>
// //       <Snackbar open={snackOpen} autoHideDuration={2000} onClose={(_, r) => r !== 'clickaway' && setSnackOpen(false)} message="Copied to clipboard" anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} />
// //     </>
// //   )
// // }

// // /* ═══════════════════════════════════════════════════════════════
// //    SECTION BLOCKS
// // ═══════════════════════════════════════════════════════════════ */

// // function PersonalSection({ user, role }) {
// //   const d = user.details || {}
// //   const isInspector = String(role || '').toLowerCase() === 'collateral inspector'
// //   return (
// //     <div style={card}>
// //       <SectionLabel icon="👤" accentColor={G.green2}>Personal Details</SectionLabel>
// //       <InfoRow label="Full Names" value={fmt(user.fullnames)} />
// //       <InfoRow label="First Name" value={fmt(d.firstname)} />
// //       <InfoRow label="Last Name" value={fmt(d.lastname)} />
// //       <InfoRow label="Gender" value={cap(d.gender)} />
// //       {!isInspector && <InfoRow label="Date of Birth" value={fmtDate(d.dateOfBirth)} />}
// //       {!isInspector && <InfoRow label="Age" value={d.age ?? '—'} />}
// //       <InfoRow label="Address" value={fmt(d.address)} />
// //       <InfoRow label="Email" value={fmt(user.email)} />
// //       <InfoRow label="Phone / Username" value={fmt(user.username)} />
// //       {!isInspector && <InfoRow label="Signing Method" value={cap(user.signingMethod)} />}
// //       {!isInspector && <InfoRow label="Profile Complete" value={user.basicDetailsUpdated ? 'Yes' : 'No'} />}
// //       {!isInspector && <InfoRow label="Identity Updated" value={user.identityDetailsUpdated ? 'Yes' : 'No'} last />}
// //     </div>
// //   )
// // }

// // function IdentitySection({ user }) {
// //   const cd = user.clientDetails || {}
// //   const idFront = toArr(cd.IDfront)
// //   const idBack = toArr(cd.IDback)
// //   const hasAny = idFront.length || idBack.length || cd.idType || cd.idNumber || cd.employementStatus || cd.KYCverificationStatus != null

// //   if (!hasAny) return null

// //   return (
// //     <ToggleSection label="Identity & KYC" icon="🪪" accentColor={G.blue}>
// //       <InfoRow label="ID Type" value={cd.idType ? cd.idType.toUpperCase() : '—'} />
// //       <InfoRow label="ID Number" value={fmt(cd.idNumber || user.idNumber)} mono />
// //       <InfoRow label="Employment Status" value={cap(cd.employementStatus)} />
// //       <InfoRow label="Outstanding Balance" value={fmtMoney(cd.outstandingLoansBalance)} />
// //       <div style={{ ...row, borderBottom: `1px solid ${G.border}` }}>
// //         <span style={labelText}>KYC Status</span>
// //         <KYCBadge verified={cd.KYCverificationStatus} />
// //       </div>
// //       {(idFront.length > 0 || idBack.length > 0) && (
// //         <div style={{ marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
// //           {idFront.length > 0 && <DocViewButton files={idFront} label="ID Front" accentColor={G.blue} />}
// //           {idBack.length > 0 && <DocViewButton files={idBack} label="ID Back" accentColor={G.blue} />}
// //         </div>
// //       )}
// //     </ToggleSection>
// //   )
// // }

// // function SalarySection({ user, requireVerificationVideo }) {
// //   const salary = user.salary || null
// //   if (!salary) return null

// //   const paySlipFiles = toArr(salary.paySlip)
// //   const bankFiles = toArr(salary.bankStatement)
// //   const videoFiles = toArr(salary.verificationVideo)

// //   const hasPayslip = paySlipFiles.length > 0
// //   const hasBank = bankFiles.length > 0
// //   const hasVideo = videoFiles.length > 0 && requireVerificationVideo

// //   return (
// //     <ToggleSection label="Salary & Employment" icon="💼" accentColor={G.amber}>
// //       <InfoRow label="Employer" value={fmt(salary.employerName)} />
// //       <InfoRow label="Company Location" value={fmt(salary.companyLocation)} />
// //       <InfoRow label="Employment Verif. No." value={fmt(salary.employementVerificationNumber)} mono />
// //       <InfoRow label="Salary Amount" value={fmtMoney(salary.salaryAmount)} />
// //       <InfoRow label="Social Security No." value={fmt(salary.socialSecurityNumber)} mono last={!hasPayslip && !hasBank && !hasVideo} />
// //       {(hasPayslip || hasBank || hasVideo) && (
// //         <div style={{ marginTop: 14 }}>
// //           <p style={sectionLabelStyle}>Documents</p>
// //           <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
// //             {hasPayslip && <DocViewButton files={paySlipFiles} label="Payslip" accentColor={G.amber} />}
// //             {hasBank && <DocViewButton files={bankFiles} label="Bank Statement" accentColor={G.amber} />}
// //             {hasVideo && <DocViewButton files={videoFiles} label="Verification Video" accentColor={G.purple} />}
// //           </div>
// //         </div>
// //       )}
// //     </ToggleSection>
// //   )
// // }

// // function BusinessSection({ user }) {
// //   const biz = user.business || null
// //   if (!biz) return null

// //   const pacraDocs = toArr(biz.pacraPrintOut)

// //   return (
// //     <ToggleSection label="Business Details" icon="🏢" accentColor={G.purple}>
// //       <InfoRow label="Business Name" value={fmt(biz.businessName)} />
// //       <InfoRow label="Business Type" value={cap(biz.businessType?.replace(/-/g, ' '))} />
// //       <InfoRow label="Ownership Type" value={cap(biz.ownershipType?.replace(/-/g, ' '))} />
// //       <InfoRow label="Registered" value={cap(biz.isBusinessRegistered)} />
// //       <InfoRow label="Years in Business" value={biz.yearsInBusiness ?? '—'} />
// //       <InfoRow label="Annual Revenue" value={fmtMoney(biz.annualRevenue)} />
// //       <InfoRow label="Net Profit" value={fmtMoney(biz.netProfit)} />
// //       <InfoRow label="% of Ownership" value={biz.percentageOfOwnership != null ? `${biz.percentageOfOwnership}%` : '—'} />
// //       <InfoRow label="Shareholder" value={cap(biz.isClientAShareHolder)} />
// //       <InfoRow label="Business Has Debt" value={cap(biz.businessHasDebt)} />
// //       <InfoRow label="Company Reg. Number" value={fmt(biz.companyRegistrationNumber)} />
// //       <InfoRow label="Existing Loan Details" value={fmt(biz.existingLoanDetails)} last={!pacraDocs.length} />
// //       {pacraDocs.length > 0 && (
// //         <div style={{ marginTop: 14 }}>
// //           <p style={sectionLabelStyle}>PACRA Printout</p>
// //           <DocViewButton files={pacraDocs} label="PACRA Printout" accentColor={G.purple} />
// //         </div>
// //       )}
// //     </ToggleSection>
// //   )
// // }

// // function SignaturesSection({ user }) {
// //   const items = [
// //     { label: 'Client Signature', src: user.signature, accent: G.green2 },
// //     { label: 'Client Initials', src: user.initials, accent: G.green2 },
// //     { label: 'Witness Signature', src: user.witnessSignature, accent: G.purple },
// //     { label: 'Witness Initials', src: user.witnessInitials, accent: G.purple },
// //   ].filter(i => i.src)

// //   if (!items.length) return null

// //   return (
// //     <ToggleSection label="Signatures & Initials" icon="✍️" accentColor={G.pink}>
// //       <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, paddingTop: 4 }}>
// //         {items.map(({ label, src, accent }) => (
// //           <div key={label} style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${G.border}`, borderRadius: 10, padding: '10px 12px' }}>
// //             <p style={{ margin: '0 0 8px', fontSize: 9.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: G.muted }}>{label}</p>
// //             <SignatureImage src={src} alt={label} accent={accent} />
// //           </div>
// //         ))}
// //       </div>
// //     </ToggleSection>
// //   )
// // }

// // function SignedDocumentsSection({ user }) {
// //   const docs = toArr(user.signedDocuments)
// //   if (!docs.length) return null
// //   return (
// //     <ToggleSection label="Signed Documents" icon="📋" accentColor={G.blue}>
// //       <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, paddingTop: 4 }}>
// //         {docs.map((doc, i) => (
// //           <DocViewButton key={doc?.id || i} files={[doc]} label={doc?.name || `Document ${i + 1}`} accentColor={G.blue} />
// //         ))}
// //       </div>
// //     </ToggleSection>
// //   )
// // }

// // function BankSection({ bankDetails, quickbookInvoiceNumber }) {
// //   return (
// //     <div style={{ ...card, padding: 0, overflow: 'hidden' }}>
// //       <div style={{ padding: '14px 20px 10px' }}>
// //         <SectionLabel icon="🏦" accentColor={G.blue}>Bank Details</SectionLabel>
// //       </div>
// //       <div style={{ padding: '0 12px 14px' }}>
// //         <BankDetailsRows bankDetails={bankDetails} quickbookInvoiceNumber={quickbookInvoiceNumber} />
// //       </div>
// //     </div>
// //   )
// // }

// // function SelectedLoanSection({ loan }) {
// //   if (!loan) return null
// //   const loanTypeName = loan.loanType?.typeName || loan.loanType?.data?.attributes?.typeName || '—'
// //   return (
// //     <div style={{ ...card, background: 'rgba(16,185,129,0.06)', border: `1px solid ${G.greenBorder}` }}>
// //       <SectionLabel icon="💳" accentColor={G.green2}>Selected Loan</SectionLabel>
// //       <InfoRow label="Loan ID" value={`#${loan.id || '—'}`} />
// //       <InfoRow label="Loan Type" value={fmt(loanTypeName)} />
// //       <InfoRow label="Status" value={fmt(loan.loanStatus?.replace(/-/g, ' '))} />
// //       <InfoRow label="Loan Amount" value={fmtMoney(loan.loanAmount)} />
// //       <InfoRow label="Outstanding" value={fmtMoney(loan.outstandingAmount)} />
// //       <InfoRow label="Repayment Amount" value={fmtMoney(loan.repaymentAmount)} />
// //       <InfoRow label="Interest Rate" value={loan.interestRate ? `${loan.interestRate}%` : '—'} />
// //       <InfoRow label="Term" value={loan.loanTerm ? `${loan.loanTerm} months` : '—'} />
// //       <InfoRow label="Purpose" value={fmt(loan.loanPurpose)} />
// //       <InfoRow label="Disbursed Date" value={fmtDate(loan.disbursedAt || loan.disbursementDate)} />
// //       <InfoRow label="Created" value={fmtDate(loan.createdAt)} last />
// //     </div>
// //   )
// // }

// // /* ── Contact card ────────────────────────────────────────────── */
// // function ContactActions({ user }) {
// //   const [open, setOpen] = useState(false)
// //   const [copied, setCopied] = useState(null)

// //   const phone = user.username || ''
// //   const email = user.email || ''

// //   const returnNine = (p) => {
// //     const digits = String(p).replace(/\D/g, '')
// //     return digits.length >= 9 ? digits.slice(-9) : digits
// //   }
// //   const fullNumber = phone ? `+260${returnNine(phone)}` : ''
// //   const waUrl = `https://wa.me/${fullNumber.replace('+', '')}`

// //   const copy = (val, key) => {
// //     if (!val) return
// //     navigator.clipboard.writeText(val).then(() => {
// //       setCopied(key)
// //       setTimeout(() => setCopied(null), 2000)
// //     })
// //   }

// //   const btnBase = {
// //     display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
// //     width: '100%', padding: '10px 16px', borderRadius: 10,
// //     fontSize: 13.5, fontWeight: 700, fontFamily: FONTS.body,
// //     cursor: 'pointer', border: 'none', transition: 'all 0.18s',
// //   }

// //   if (!open) return (
// //     <button
// //       onClick={() => setOpen(true)}
// //       style={{
// //         ...btnBase,
// //         background: `linear-gradient(135deg, ${G.green1}, ${G.green2})`,
// //         color: '#fff', boxShadow: '0 4px 14px rgba(16,185,129,0.28)', marginBottom: 14,
// //       }}
// //     >
// //       📞 Contact Client
// //     </button>
// //   )

// //   return (
// //     <div style={{ ...card, background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(5,150,105,0.03))', border: `1px solid ${G.greenBorder}` }}>
// //       <div style={{ fontSize: 13, color: G.muted, fontFamily: FONTS.body, marginBottom: 14 }}>
// //         {phone && `📱 ${phone}`}{email && phone ? '  ·  ' : ''}{email && `✉️ ${email}`}
// //       </div>
// //       <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
// //         {phone && (
// //           <a href={`tel:${fullNumber}`} style={{ ...btnBase, background: `linear-gradient(135deg, ${G.green1}, ${G.green2})`, color: '#fff', textDecoration: 'none', boxShadow: '0 4px 14px rgba(16,185,129,0.28)' }}>
// //             📞 Call Client
// //           </a>
// //         )}
// //         {phone && (
// //           <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{ ...btnBase, background: 'linear-gradient(135deg, #14532d, #15803d)', color: '#fff', textDecoration: 'none' }}>
// //             💬 WhatsApp Client
// //           </a>
// //         )}
// //         {phone && (
// //           <button onClick={() => copy(fullNumber, 'phone')} style={{ ...btnBase, background: G.surface, color: copied === 'phone' ? G.green3 : '#fff', border: `1px solid ${G.border}` }}>
// //             📋 {copied === 'phone' ? '✓ Copied!' : "Copy Client's Number"}
// //           </button>
// //         )}
// //         {email && (
// //           <a href={`mailto:${email}`} style={{ ...btnBase, background: 'rgba(96,165,250,0.12)', border: `1px solid rgba(96,165,250,0.25)`, color: G.blue, textDecoration: 'none' }}>
// //             ✉️ Email Client
// //           </a>
// //         )}
// //         {email && (
// //           <button onClick={() => copy(email, 'email')} style={{ ...btnBase, background: G.surface, color: copied === 'email' ? G.green3 : '#fff', border: `1px solid ${G.border}` }}>
// //             📋 {copied === 'email' ? '✓ Copied!' : "Copy Client's Email"}
// //           </button>
// //         )}
// //         <button onClick={() => setOpen(false)} style={{ ...btnBase, background: 'transparent', color: G.amber, border: `1px solid rgba(251,191,36,0.25)` }}>
// //           Hide Contact Card
// //         </button>
// //       </div>
// //     </div>
// //   )
// // }

// // /* ═══════════════════════════════════════════════════════════════
// //    MAIN COMPONENT
// // ═══════════════════════════════════════════════════════════════ */
// // export default function ClientDetails({ loan: rawLoan, user: rawUser, role, adminActions, constants }) {
// //   // ── Normalise ──────────────────────────────────────────────────
// //   const normLoan = rawLoan ? normalizeStrapi(rawLoan) : null

// //   // Resolve user: explicit prop → loan.client fallback
// //   let resolvedUser = null
// //   if (rawUser) {
// //     resolvedUser = normalizeStrapi(rawUser)
// //   } else if (normLoan?.client) {
// //     // loan.client may already be flat or may still be nested
// //     resolvedUser = normalizeStrapi(normLoan.client)
// //   }

// //   if (!resolvedUser) {
// //     return (
// //       <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: G.page }}>
// //         <p style={{ color: G.muted, fontFamily: FONTS.body }}>No client data available.</p>
// //       </div>
// //     )
// //   }

// //   // ── Derived values ─────────────────────────────────────────────
// //   const bankDetails = normLoan?.bankDetails || resolvedUser?.bankDetails || null
// //   const quickbookInvoiceNumber = normLoan?.quickBooksInvoiceNumber || null

// //   const requireVerVideo = constants?.loansInformation?.requireVerificationVideo === true

// //   const loanTypeName = normLoan?.loanType?.typeName || normLoan?.loanType?.data?.attributes?.typeName || ''
// //   const isSalaryLoan = loanTypeName.toLowerCase().includes('salary')

// //   // ── Avatar ─────────────────────────────────────────────────────
// //   const picRaw = resolvedUser.profilePicture
// //   const picArr = toArr(picRaw)
// //   const picUrl = picArr.length
// //     ? (picArr[0]?.formats?.thumbnail?.url
// //       ? backEndUrl + picArr[0].formats.thumbnail.url
// //       : getUrl(picArr[0]))
// //     : null

// //   const d = resolvedUser.details || {}
// //   const avatarInitials = (() => {
// //     const first = (d.firstname || '').trim()
// //     const last = (d.lastname || '').trim()
// //     if (first && last) return (first[0] + last[0]).toUpperCase()
// //     if (first) return first.slice(0, 2).toUpperCase()
// //     return (resolvedUser.fullnames || resolvedUser.username || '?')
// //       .split(' ').map(n => n[0]).filter(Boolean).join('').toUpperCase().slice(0, 2)
// //   })()

// //   const isInspector = String(role || '').toLowerCase() === 'collateral inspector'

// //   /* ── Render ─────────────────────────────────────────────────── */
// //   return (
// //     <div style={{ minHeight: '100vh', background: G.page, paddingTop: 76, paddingBottom: 96, position: 'relative', overflowX: 'hidden' }}>
// //       {/* Ambient background */}
// //       <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse 80% 50% at 50% -5%, rgba(16,185,129,0.09) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
// //       <div style={{ position: 'fixed', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.022) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none', zIndex: 0 }} />

// //       <style>{`
// //         @keyframes cdSlideLeft { from { opacity:0; transform:translateX(16px); } to { opacity:1; transform:translateX(0); } }
// //         .cd-wrap { animation: cdSlideLeft 0.38s cubic-bezier(0.22,1,0.36,1) both; }
// //       `}</style>

// //       <div className="cd-wrap" style={{ position: 'relative', zIndex: 1, maxWidth: 720, margin: '0 auto', padding: '0 16px' }}>

// //         {/* ── Profile hero ── */}
// //         <div style={{
// //           ...card,
// //           background: 'linear-gradient(135deg, rgba(16,185,129,0.10), rgba(5,150,105,0.04))',
// //           border: `1px solid ${G.greenBorder}`,
// //           display: 'flex', alignItems: 'center', gap: 16,
// //           position: 'relative', overflow: 'hidden',
// //         }}>
// //           <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${G.green1}, transparent)`, borderRadius: '16px 16px 0 0' }} />
// //           {picUrl ? (
// //             <img src={picUrl} alt={resolvedUser.fullnames} style={{ width: 56, height: 56, borderRadius: 14, objectFit: 'cover', border: `2px solid ${G.green2}`, flexShrink: 0 }} />
// //           ) : (
// //             <div style={{ width: 56, height: 56, borderRadius: 14, background: 'linear-gradient(135deg, rgba(16,185,129,0.22), rgba(5,150,105,0.08))', border: `1.5px solid ${G.greenBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
// //               <span style={{ fontFamily: FONTS.display, fontSize: 20, color: G.green3 }}>{avatarInitials}</span>
// //             </div>
// //           )}
// //           <div style={{ flex: 1, minWidth: 0 }}>
// //             <p style={{ margin: '0 0 2px', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: G.muted, fontFamily: FONTS.body }}>
// //               Client{role ? ` · ${role}` : ''}
// //             </p>
// //             <h1 style={{ margin: '0 0 8px', fontFamily: FONTS.display, fontSize: 'clamp(18px,4vw,24px)', fontWeight: 400, color: '#fff', lineHeight: 1.2 }}>
// //               {resolvedUser.fullnames || resolvedUser.username || 'Client'}
// //             </h1>
// //             <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
// //               <Pill color={G.green2}>Client</Pill>
// //               {normLoan?.id && <Pill color={G.amber} bg="rgba(251,191,36,0.12)">Loan #{normLoan.id}</Pill>}
// //               {normLoan?.loanStatus && <Pill color={G.blue} bg="rgba(96,165,250,0.10)">{normLoan.loanStatus.replace(/-/g, ' ')}</Pill>}
// //               {isSalaryLoan && <Pill color="#60a5fa" bg="rgba(96,165,250,0.10)">Salary Loan</Pill>}
// //               {resolvedUser.clientDetails?.KYCverificationStatus && <Pill color={G.green3}>KYC ✓</Pill>}
// //               {resolvedUser.basicDetailsUpdated && <Pill color={G.purple} bg="rgba(167,139,250,0.12)">Profile ✓</Pill>}
// //               {resolvedUser.identityDetailsUpdated && <Pill color={G.blue} bg="rgba(96,165,250,0.12)">Identity ✓</Pill>}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Admin actions slot */}
// //         {adminActions && (
// //           <div style={{ marginBottom: 14 }}>
// //             {typeof adminActions === 'function' ? adminActions() : adminActions}
// //           </div>
// //         )}

// //         {/* ① Bank details — top for quick disbursement access */}
// //         {!isInspector && (
// //           <BankSection bankDetails={bankDetails} quickbookInvoiceNumber={quickbookInvoiceNumber} />
// //         )}

// //         {/* ② Selected loan summary */}
// //         {normLoan && <SelectedLoanSection loan={normLoan} />}

// //         {/* ③ Personal details */}
// //         <PersonalSection user={resolvedUser} role={role} />

// //         {/* ④ Identity (toggle) */}
// //         {!isInspector && <IdentitySection user={resolvedUser} />}

// //         {/* ⑤ Salary info — always show when user has salary data or it's a salary loan */}
// //         {!isInspector && (isSalaryLoan || resolvedUser.salary) && (
// //           <SalarySection user={resolvedUser} requireVerificationVideo={requireVerVideo} />
// //         )}

// //         {/* ⑥ Business details (toggle) */}
// //         {!isInspector && <BusinessSection user={resolvedUser} />}

// //         {/* ⑦ Signatures (toggle) */}
// //         {!isInspector && <SignaturesSection user={resolvedUser} />}

// //         {/* ⑧ Signed documents (toggle) */}
// //         {!isInspector && <SignedDocumentsSection user={resolvedUser} />}

// //         {/* ⑨ Contact card */}
// //         <ContactActions user={resolvedUser} />

// //       </div>
// //     </div>
// //   )
// // }
// 'use client'

// /**
//  * ClientDetails.js — frontend/src/components/Includes/AdminComponents/ClientDetails.js
//  *
//  * Fixes delivered:
//  *  ✅ Avatar placeholder = initials (firstname + lastname) when profilePicture is null
//  *  ✅ "View Profile" (or "View Client" in loan context) → /admin/users/{id}
//  *  ✅ Document section always has a pinned "Hide" / collapse button regardless of doc count
//  *  ✅ Smooth scroll inside document list overlay
//  *  ✅ witnessSignature shown
//  *  ✅ client initials + witness initials shown
//  *  ✅ Selected loan shown above the account info section
//  *  ✅ "No document found" when media field is empty
//  */

// import { useState } from 'react'
// import Link from 'next/link'
// import { backEndUrl } from '@/Constants'

// /* ─── Strapi normalizer ─────────────────────────────────────── */
// function normalizeStrapi(obj) {
//   if (obj === null || obj === undefined) return obj
//   if (typeof obj !== 'object') return obj
//   if (Array.isArray(obj)) return obj.map(normalizeStrapi)
//   if (
//     obj.data !== undefined &&
//     !Array.isArray(obj.data) &&
//     obj.data !== null &&
//     typeof obj.data === 'object' &&
//     obj.data.attributes !== undefined
//   ) {
//     return normalizeStrapi({ id: obj.data.id, ...obj.data.attributes })
//   }
//   if (obj.data !== undefined && Array.isArray(obj.data)) {
//     return obj.data.map(item =>
//       item && item.attributes
//         ? normalizeStrapi({ id: item.id, ...item.attributes })
//         : normalizeStrapi(item)
//     )
//   }
//   const result = {}
//   for (const key of Object.keys(obj)) result[key] = normalizeStrapi(obj[key])
//   return result
// }

// /* ─── Helpers ───────────────────────────────────────────────── */
// const fmt = v => (v == null || v === '' ? '—' : String(v))
// const fmtMoney = v => v == null ? '—' : `K${Number(v).toLocaleString('en-ZM', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
// const fmtDate = v => v ? new Date(v).toLocaleDateString('en-ZM', { year: 'numeric', month: 'short', day: 'numeric' }) : '—'
// const fmtBool = v => v === true ? 'Yes' : v === false ? 'No' : '—'

// function getUrl(file) {
//   if (!file) return null
//   if (typeof file === 'string') return file.startsWith('http') ? file : backEndUrl + file
//   if (!file.url) return null
//   return file.url.startsWith('http') ? file.url : backEndUrl + file.url
// }

// function normalizeFiles(raw) {
//   if (!raw) return []
//   if (Array.isArray(raw)) return raw.filter(Boolean)
//   return [raw]
// }

// /* ─── Status colours ────────────────────────────────────────── */
// const STATUS_COLOURS = {
//   'initiated': ['rgba(251,191,36,0.12)', '#FBBF24'],
//   'pending-collateral-addition': ['rgba(251,191,36,0.12)', '#FBBF24'],
//   'pending-collateral-inspection': ['rgba(251,191,36,0.12)', '#FBBF24'],
//   'collateral-inspection': ['rgba(167,139,250,0.12)', '#A78BFA'],
//   'request-approval': ['rgba(129,140,248,0.12)', '#818CF8'],
//   'accepted': ['rgba(52,211,153,0.13)', '#34D399'],
//   'pending-approval': ['rgba(167,139,250,0.12)', '#A78BFA'],
//   'approved': ['rgba(16,185,129,0.14)', '#10B981'],
//   'rejected': ['rgba(239,68,68,0.12)', '#F87171'],
//   'disbursed': ['rgba(96,165,250,0.12)', '#60A5FA'],
//   'completed': ['rgba(156,163,175,0.12)', '#9CA3AF'],
//   'defaulted': ['rgba(220,38,38,0.15)', '#DC2626'],
// }
// function StatusPill({ status }) {
//   const [bg, color] = STATUS_COLOURS[status] || ['rgba(255,255,255,0.08)', '#fff']
//   return (
//     <span style={{
//       display: 'inline-flex', alignItems: 'center', gap: 5,
//       padding: '3px 10px', borderRadius: 100,
//       background: bg, color, fontSize: 10, fontWeight: 700,
//       letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap',
//     }}>
//       <span style={{ width: 5, height: 5, borderRadius: '50%', background: color, flexShrink: 0 }} />
//       {status?.replace(/-/g, ' ')}
//     </span>
//   )
// }

// /* ─── Info row ──────────────────────────────────────────────── */
// function InfoRow({ label: l, value: v, last, mono, gold }) {
//   return (
//     <div style={{
//       display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
//       gap: 12, padding: '10px 0',
//       borderBottom: last ? 'none' : '1px solid rgba(255,255,255,0.055)',
//     }}>
//       <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', flexShrink: 0 }}>
//         {l}
//       </span>
//       <span style={{
//         fontSize: 13.5, fontWeight: 500, textAlign: 'right',
//         color: gold ? '#C9A84C' : 'rgba(255,255,255,0.82)',
//         fontFamily: mono ? "'JetBrains Mono', monospace" : undefined,
//         wordBreak: 'break-word',
//       }}>
//         {v ?? '—'}
//       </span>
//     </div>
//   )
// }

// /* ─── Section card ──────────────────────────────────────────── */
// function Card({ children, accent, style: s }) {
//   return (
//     <div style={{
//       position: 'relative', borderRadius: 14, overflow: 'hidden',
//       background: accent
//         ? `rgba(${accent},0.06)`
//         : 'rgba(255,255,255,0.045)',
//       border: `1px solid ${accent ? `rgba(${accent},0.18)` : 'rgba(255,255,255,0.08)'}`,
//       padding: '20px 22px', marginBottom: 14,
//       backdropFilter: 'blur(10px)',
//       ...s,
//     }}>
//       {children}
//     </div>
//   )
// }

// function SectionLabel({ children, color }) {
//   return (
//     <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
//       <div style={{ width: 3, height: 14, borderRadius: 2, background: color || 'linear-gradient(180deg,#C9A84C,#E8C87A)', flexShrink: 0 }} />
//       <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)' }}>
//         {children}
//       </span>
//     </div>
//   )
// }

// /* ═══════════════════════════════════════════════════════════════
//    DOCUMENT VIEWER
//    - Always shows Hide button regardless of file count
//    - Pinned close/hide button at top of scrollable list
//    - Smooth scroll
//    - "No document found" for empty
// ═══════════════════════════════════════════════════════════════ */
// function DocumentViewer({ label, files, isVideo }) {
//   const [open, setOpen] = useState(false)
//   const normalised = normalizeFiles(files)
//   const hasFiles = normalised.length > 0

//   return (
//     <div style={{ marginBottom: 4 }}>
//       {/* Toggle — always present */}
//       <button
//         onClick={() => setOpen(o => !o)}
//         style={{
//           display: 'inline-flex', alignItems: 'center', gap: 7,
//           padding: '7px 14px', borderRadius: 8, border: 'none', cursor: 'pointer',
//           background: open ? 'rgba(201,168,76,0.14)' : 'rgba(255,255,255,0.06)',
//           color: open ? '#C9A84C' : 'rgba(255,255,255,0.6)',
//           fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', sans-serif",
//           transition: 'all 0.2s',
//         }}
//       >
//         {open ? <CollapseIcon /> : <ExpandIcon />}
//         {open ? `Hide ${label}` : `Show ${label}`}
//         {hasFiles && (
//           <span style={{
//             padding: '1px 7px', borderRadius: 100, fontSize: 10, fontWeight: 700,
//             background: open ? 'rgba(201,168,76,0.25)' : 'rgba(255,255,255,0.1)',
//             color: open ? '#C9A84C' : 'rgba(255,255,255,0.5)',
//           }}>
//             {normalised.length}
//           </span>
//         )}
//       </button>

//       {/* Expandable panel */}
//       {open && (
//         <div style={{
//           marginTop: 8, borderRadius: 12, overflow: 'hidden',
//           border: '1px solid rgba(255,255,255,0.08)',
//           background: 'rgba(0,0,0,0.25)',
//           maxHeight: 360,
//           overflowY: 'auto',
//           scrollBehavior: 'smooth',
//           WebkitOverflowScrolling: 'touch',
//         }}>
//           {/* Pinned close row */}
//           <div style={{
//             position: 'sticky', top: 0, zIndex: 10,
//             display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//             padding: '10px 14px',
//             background: 'rgba(10,15,30,0.94)',
//             borderBottom: '1px solid rgba(255,255,255,0.07)',
//             backdropFilter: 'blur(14px)',
//           }}>
//             <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
//               {label} {hasFiles ? `(${normalised.length})` : ''}
//             </span>
//             <button
//               onClick={() => setOpen(false)}
//               title="Collapse"
//               style={{
//                 display: 'flex', alignItems: 'center', gap: 5,
//                 padding: '5px 12px', borderRadius: 7, border: 'none', cursor: 'pointer',
//                 background: 'rgba(255,255,255,0.07)',
//                 color: 'rgba(255,255,255,0.55)', fontSize: 11, fontWeight: 600,
//                 fontFamily: "'DM Sans', sans-serif", transition: 'all 0.18s',
//               }}
//               onMouseEnter={e => { e.currentTarget.style.background = 'rgba(220,38,38,0.15)'; e.currentTarget.style.color = '#F87171' }}
//               onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.55)' }}
//             >
//               <CloseIcon /> Hide
//             </button>
//           </div>

//           <div style={{ padding: '10px 14px 14px' }}>
//             {!hasFiles ? (
//               <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '28px 0', gap: 10 }}>
//                 <NoDocIcon />
//                 <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.28)', fontStyle: 'italic' }}>No document found</span>
//               </div>
//             ) : (
//               <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
//                 {normalised.map((file, i) => {
//                   const url = getUrl(file)
//                   const name = file?.name || `Document ${i + 1}`
//                   const mime = file?.mime || ''
//                   const isImg = mime.startsWith('image/')
//                   const isPdf = mime === 'application/pdf'

//                   return (
//                     <div key={file?.id || i} style={{
//                       display: 'flex', alignItems: 'center', gap: 12,
//                       padding: '10px 12px', borderRadius: 10,
//                       background: 'rgba(255,255,255,0.04)',
//                       border: '1px solid rgba(255,255,255,0.07)',
//                     }}>
//                       {isImg && url ? (
//                         <img src={url} alt={name} style={{ width: 40, height: 40, borderRadius: 7, objectFit: 'cover', flexShrink: 0, border: '1px solid rgba(255,255,255,0.1)' }} />
//                       ) : (
//                         <div style={{
//                           width: 40, height: 40, borderRadius: 7, flexShrink: 0,
//                           background: isPdf ? 'rgba(239,68,68,0.12)' : isVideo ? 'rgba(99,102,241,0.12)' : 'rgba(255,255,255,0.07)',
//                           display: 'flex', alignItems: 'center', justifyContent: 'center',
//                           border: '1px solid rgba(255,255,255,0.08)',
//                         }}>
//                           {isPdf ? <PdfIcon /> : isVideo ? <VideoIcon /> : <FileIcon />}
//                         </div>
//                       )}
//                       <div style={{ flex: 1, minWidth: 0 }}>
//                         <div style={{ fontSize: 12.5, fontWeight: 600, color: 'rgba(255,255,255,0.8)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</div>
//                         {file?.size && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{(file.size / 1024).toFixed(1)} KB</div>}
//                       </div>
//                       {url ? (
//                         <a
//                           href={url} target="_blank" rel="noopener noreferrer"
//                           style={{
//                             display: 'flex', alignItems: 'center', gap: 5,
//                             padding: '6px 12px', borderRadius: 7, textDecoration: 'none',
//                             background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)',
//                             color: '#C9A84C', fontSize: 11, fontWeight: 700, flexShrink: 0, transition: 'all 0.18s',
//                           }}
//                           onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.18)'}
//                           onMouseLeave={e => e.currentTarget.style.background = 'rgba(201,168,76,0.1)'}
//                         >
//                           <ExternalIcon /> Open
//                         </a>
//                       ) : (
//                         <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', fontStyle: 'italic' }}>No URL</span>
//                       )}
//                     </div>
//                   )
//                 })}
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// /* ─── Signature preview ─────────────────────────────────────── */
// function SignaturePreview({ label, file }) {
//   const url = getUrl(file)
//   return (
//     <div>
//       <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 7 }}>
//         {label}
//       </div>
//       {!url ? (
//         <div style={{
//           width: '100%', height: 72, borderRadius: 10,
//           background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.1)',
//           display: 'flex', alignItems: 'center', justifyContent: 'center',
//         }}>
//           <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.22)', fontStyle: 'italic' }}>No signature found</span>
//         </div>
//       ) : (
//         <>
//           <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}>
//             <img src={url} alt={label} style={{ display: 'block', width: '100%', height: 88, objectFit: 'contain' }} />
//           </div>
//           <a href={url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 6, fontSize: 11, color: '#C9A84C', textDecoration: 'none', fontWeight: 600 }}>
//             <ExternalIcon /> Full size
//           </a>
//         </>
//       )}
//     </div>
//   )
// }

// /* ═══════════════════════════════════════════════════════════════
//    AVATAR — with initials placeholder
// ═══════════════════════════════════════════════════════════════ */
// function Avatar({ user, size = 72 }) {
//   const details = user?.details || {}
//   const firstName = details.firstname || ''
//   const lastName = details.lastname || ''
//   const fullName = user?.fullnames || `${firstName} ${lastName}`.trim() || user?.username || ''

//   // Priority: firstname initial + lastname initial → fallback to fullnames split → fallback '?'
//   const initials = (firstName && lastName)
//     ? `${firstName[0]}${lastName[0]}`.toUpperCase()
//     : fullName.split(' ').map(n => n[0]).filter(Boolean).join('').toUpperCase().slice(0, 2) || '?'

//   const picFiles = normalizeFiles(user?.profilePicture)
//   const picUrl = picFiles.length > 0 ? getUrl(picFiles[0]) : null

//   const border = size > 50 ? '2.5px solid rgba(201,168,76,0.35)' : '1.5px solid rgba(201,168,76,0.28)'

//   if (picUrl) {
//     return (
//       <img
//         src={picUrl} alt={fullName || 'Client'}
//         style={{
//           width: size, height: size, borderRadius: size * 0.28,
//           objectFit: 'cover', border, flexShrink: 0,
//         }}
//       />
//     )
//   }

//   return (
//     <div style={{
//       width: size, height: size, borderRadius: size * 0.28, flexShrink: 0,
//       background: 'linear-gradient(135deg, rgba(201,168,76,0.22), rgba(201,168,76,0.07))',
//       border,
//       display: 'flex', alignItems: 'center', justifyContent: 'center',
//     }}>
//       <span style={{
//         fontFamily: "'DM Serif Display', serif",
//         fontSize: size * 0.36, fontWeight: 400,
//         color: '#C9A84C', lineHeight: 1,
//         userSelect: 'none',
//       }}>
//         {initials}
//       </span>
//     </div>
//   )
// }

// /* ═══════════════════════════════════════════════════════════════
//    LOAN BADGE — selected loan shown above account info
// ═══════════════════════════════════════════════════════════════ */
// function LoanBadge({ loan }) {
//   if (!loan) return null
//   const status = loan.loanStatus
//   const [bg, color] = STATUS_COLOURS[status] || ['rgba(255,255,255,0.08)', '#fff']
//   return (
//     <div style={{
//       display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
//       padding: '12px 16px', borderRadius: 12, marginBottom: 14,
//       background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
//     }}>
//       <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
//         <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
//           Selected Loan
//         </span>
//         <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13.5, fontWeight: 700, color: '#C9A84C' }}>
//           #{loan.id}
//         </span>
//       </div>
//       <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
//         {loan.loanAmount != null ? `K${Number(loan.loanAmount).toLocaleString('en-ZM', { minimumFractionDigits: 2 })}` : '—'}
//       </span>
//       <StatusPill status={status} />
//       {loan.id && (
//         <Link
//           href={`/admin/loans/${loan.id}`}
//           style={{
//             marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 5,
//             padding: '5px 11px', borderRadius: 7,
//             background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)',
//             color: '#C9A84C', fontSize: 11, fontWeight: 700, textDecoration: 'none', flexShrink: 0,
//           }}
//         >
//           View Loan <ExternalIcon />
//         </Link>
//       )}
//     </div>
//   )
// }

// /* ═══════════════════════════════════════════════════════════════
//    MAIN COMPONENT
//    Props:
//      loan         — the loan the admin selected/is viewing (from getAllLoans / getLoanFromId)
//      user         — the client user object (populated separately, e.g. from getUserById)
//      role         — admin role string
//      constants    — loansInformation constants
//      adminActions — JSX slot for extra buttons (e.g. send password reset)

//    The selected loan badge always comes from the `loan` prop directly —
//    never from user.currentLoan — because admins pick loans from a list,
//    not from whatever the client last set as their active loan.
// ═══════════════════════════════════════════════════════════════ */
// export default function ClientDetails({ loan: rawLoan, user: rawUser, role, constants, adminActions }) {
//   // Normalize both inputs
//   const loan = rawLoan ? normalizeStrapi(rawLoan) : null

//   // user can be passed directly (admin/users/[id] page) OR live inside loan.client
//   // (admin/loans/[id] page). Never fall back to user.currentLoan.
//   const user = rawUser
//     ? normalizeStrapi(rawUser)
//     : loan?.client ?? null

//   if (!user) {
//     return (
//       <div style={{ minHeight: '100vh', background: '#0A0F1E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//         <p style={{ color: 'rgba(255,255,255,0.4)' }}>No client data available.</p>
//       </div>
//     )
//   }

//   const details = user.details || {}
//   const clientDetails = user.clientDetails || {}
//   const salary = user.salary || null
//   const business = user.business || null
//   const bankDetails = user.bankDetails || null

//   const firstName = details.firstname || user.fullnames?.split(' ')[0] || ''
//   const lastName = details.lastname || user.fullnames?.split(' ').slice(1).join(' ') || ''
//   const fullName = user.fullnames || `${firstName} ${lastName}`.trim() || user.username || 'Client'

//   // Signature files
//   const sigFile = user.signature || null
//   const witSigFile = user.witnessSignature || null
//   const initFile = user.initials || null
//   const witInitFile = user.witnessInitials || null

//   // Document arrays
//   const idFront = normalizeFiles(clientDetails.IDfront)
//   const idBack = normalizeFiles(clientDetails.IDback)
//   const paySlips = normalizeFiles(salary?.paySlip)
//   const bankStmt = normalizeFiles(salary?.bankStatement)
//   const verVid = normalizeFiles(salary?.verificationVideo)
//   const pacra = normalizeFiles(business?.pacraPrintOut)
//   const signedDocs = normalizeFiles(user.signedDocuments)

//   // All loans belonging to this user (populated list, not currentLoan)
//   const allLoans = user.loans || []

//   return (
//     <div style={{
//       minHeight: '100vh', background: '#0A0F1E',
//       paddingTop: 80, paddingBottom: 100,
//       position: 'relative', overflowX: 'hidden',
//     }}>
//       {/* Background */}
//       <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse 70% 45% at 50% -8%, rgba(201,168,76,0.09) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
//       <div style={{ position: 'fixed', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.022) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none', zIndex: 0 }} />

//       <div style={{ position: 'relative', zIndex: 1, maxWidth: 720, margin: '0 auto', padding: '0 16px', animation: 'vfSlide 0.38s ease' }}>
//         <style>{`
//           @keyframes vfSlide { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
//           ::-webkit-scrollbar { width: 4px; height: 4px; }
//           ::-webkit-scrollbar-track { background: transparent; }
//           ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.25); border-radius: 100px; }
//         `}</style>

//         {/* ── Page header ── */}
//         <div style={{ marginBottom: 20 }}>
//           <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 5 }}>
//             Admin · {role || 'Client Detail'}
//           </div>
//           <h1 style={{ margin: 0, fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(20px,4vw,26px)', color: '#fff', fontWeight: 400 }}>
//             Client Profile
//           </h1>
//         </div>

//         {/* ══ HERO PROFILE CARD ══ */}
//         <div style={{
//           borderRadius: 16, overflow: 'hidden', marginBottom: 14,
//           background: 'rgba(255,255,255,0.045)', border: '1px solid rgba(255,255,255,0.08)',
//           padding: '24px 22px',
//         }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
//             <Avatar user={user} size={72} />
//             <div style={{ flex: 1, minWidth: 0 }}>
//               <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: '#fff', marginBottom: 4, fontWeight: 400 }}>
//                 {fullName}
//               </div>
//               <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.42)', marginBottom: 8 }}>
//                 {user.email && <span>{user.email}</span>}
//                 {user.email && user.username && <span style={{ margin: '0 8px', color: 'rgba(255,255,255,0.2)' }}>·</span>}
//                 {user.username && <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>{user.username}</span>}
//               </div>
//               <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
//                 {user.type && (
//                   <span style={{ padding: '3px 10px', borderRadius: 100, background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.22)', color: '#C9A84C', fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
//                     {user.type}
//                   </span>
//                 )}
//                 {clientDetails.KYCverificationStatus && (
//                   <span style={{ padding: '3px 10px', borderRadius: 100, background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.22)', color: '#34D399', fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
//                     ✓ KYC Verified
//                   </span>
//                 )}
//               </div>
//             </div>

//             {/* Admin action slot (e.g. Send Password Reset) */}
//             {adminActions && (
//               <div style={{ flexShrink: 0 }}>
//                 {typeof adminActions === 'function' ? adminActions() : adminActions}
//               </div>
//             )}

//             {/* View Profile self-link */}
//             {user.id && (
//               <Link
//                 href={`/admin/users/${user.id}`}
//                 style={{
//                   display: 'inline-flex', alignItems: 'center', gap: 6,
//                   padding: '9px 16px', borderRadius: 10,
//                   background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.22)',
//                   color: '#C9A84C', fontSize: 12, fontWeight: 700, textDecoration: 'none',
//                   whiteSpace: 'nowrap', flexShrink: 0, transition: 'all 0.2s',
//                 }}
//                 onMouseEnter={e => e.currentTarget.style.background = 'rgba(201,168,76,0.2)'}
//                 onMouseLeave={e => e.currentTarget.style.background = 'rgba(201,168,76,0.1)'}
//               >
//                 View Profile <ExternalIcon />
//               </Link>
//             )}
//           </div>
//         </div>

//         {/* ══ SELECTED LOAN — above account info ══ */}
//         {loan && <LoanBadge loan={loan} />}

//         {/* ══ PERSONAL DETAILS ══ */}
//         <Card>
//           <SectionLabel>Personal Information</SectionLabel>
//           <InfoRow label="First Name" value={fmt(details.firstname)} />
//           <InfoRow label="Last Name" value={fmt(details.lastname)} />
//           <InfoRow label="Date of Birth" value={fmtDate(details.dateOfBirth)} />
//           <InfoRow label="Age" value={fmt(details.age)} />
//           <InfoRow label="Gender" value={fmt(details.gender)} />
//           <InfoRow label="Address" value={fmt(details.address)} last />
//         </Card>

//         {/* ══ IDENTITY / KYC ══ */}
//         <Card>
//           <SectionLabel>Identity & KYC</SectionLabel>
//           <InfoRow label="ID Type" value={fmt(clientDetails.idType)?.toUpperCase()} />
//           <InfoRow label="ID Number" value={fmt(clientDetails.idNumber || user.idNumber)} mono />
//           <InfoRow label="Employment" value={fmt(clientDetails.employementStatus)} />
//           <InfoRow label="KYC Verified" value={fmtBool(clientDetails.KYCverificationStatus)} />
//           <InfoRow label="Outstanding Balance" value={fmtMoney(clientDetails.outstandingLoansBalance)} mono last />
//           <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
//             <DocumentViewer label="ID Front" files={idFront} />
//             <DocumentViewer label="ID Back" files={idBack} />
//           </div>
//         </Card>

//         {/* ══ BANK DETAILS ══ */}
//         {bankDetails && (
//           <Card>
//             <SectionLabel>Bank Details</SectionLabel>
//             <InfoRow label="Bank Name" value={fmt(bankDetails.bankName)} />
//             <InfoRow label="Account Name" value={fmt(bankDetails.bankAccountName)} />
//             <InfoRow label="Account Number" value={fmt(bankDetails.accountNumber)} mono />
//             <InfoRow label="Branch" value={fmt(bankDetails.branchName)} />
//             <InfoRow label="Branch Code" value={fmt(bankDetails.branchCode)} mono />
//             <InfoRow label="Bank Phone" value={fmt(bankDetails.bankPhone)} last />
//           </Card>
//         )}

//         {/* ══ SALARY & EMPLOYMENT ══ */}
//         {salary && (
//           <Card>
//             <SectionLabel>Salary & Employment</SectionLabel>
//             <InfoRow label="Employer" value={fmt(salary.employerName)} />
//             <InfoRow label="Company Location" value={fmt(salary.companyLocation)} />
//             <InfoRow label="Employment Verif. No." value={fmt(salary.employementVerificationNumber)} mono />
//             <InfoRow label="Salary Amount" value={fmtMoney(salary.salaryAmount)} mono gold />
//             <InfoRow label="Social Security No." value={fmt(salary.socialSecurityNumber)} mono last />
//             <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
//               <DocumentViewer label="Payslip" files={paySlips} />
//               <DocumentViewer label="Bank Statement" files={bankStmt} />
//               <DocumentViewer label="Verification Video" files={verVid} isVideo />
//             </div>
//           </Card>
//         )}

//         {/* ══ BUSINESS ══ */}
//         {business && (
//           <Card>
//             <SectionLabel>Business Information</SectionLabel>
//             <InfoRow label="Business Name" value={fmt(business.businessName)} />
//             <InfoRow label="Business Type" value={fmt(business.businessType)} />
//             <InfoRow label="Ownership" value={fmt(business.ownershipType)} />
//             <InfoRow label="Registered" value={fmt(business.isBusinessRegistered)} />
//             <InfoRow label="Years in Business" value={fmt(business.yearsInBusiness)} />
//             <InfoRow label="Annual Revenue" value={fmtMoney(business.annualRevenue)} mono />
//             <InfoRow label="Net Profit" value={fmtMoney(business.netProfit)} mono />
//             <InfoRow label="Ownership %" value={business.percentageOfOwnership ? `${business.percentageOfOwnership}%` : '—'} />
//             <InfoRow label="Reg. Number" value={fmt(business.companyRegistrationNumber)} mono />
//             <InfoRow label="Has Debt" value={fmt(business.businessHasDebt)} />
//             <InfoRow label="Existing Loan Details" value={fmt(business.existingLoanDetails)} last />
//             {pacra.length > 0 || true ? (
//               <div style={{ marginTop: 10 }}>
//                 <DocumentViewer label="PACRA Printout" files={pacra} />
//               </div>
//             ) : null}
//           </Card>
//         )}

//         {/* ══ SIGNATURES & INITIALS ══ */}
//         <Card>
//           <SectionLabel>Signatures & Initials</SectionLabel>
//           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 4 }}>
//             <SignaturePreview label="Client Signature" file={sigFile} />
//             <SignaturePreview label="Client Initials" file={initFile} />
//             <SignaturePreview label="Witness Signature" file={witSigFile} />
//             <SignaturePreview label="Witness Initials" file={witInitFile} />
//           </div>
//         </Card>

//         {/* ══ SIGNED DOCUMENTS ══ */}
//         <Card>
//           <SectionLabel>Signed Documents</SectionLabel>
//           <DocumentViewer label="Signed Documents" files={signedDocs} />
//         </Card>

//         {/* ══ ALL LOANS ══ */}
//         {allLoans.length > 0 && (
//           <Card>
//             <SectionLabel>Loan History</SectionLabel>
//             <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
//               {allLoans.map((l, i) => {
//                 const ln = normalizeStrapi(l)
//                 return (
//                   <Link
//                     key={ln.id || i}
//                     href={`/admin/loans/${ln.id}`}
//                     style={{
//                       display: 'flex', alignItems: 'center', gap: 12,
//                       padding: '11px 14px', borderRadius: 10,
//                       background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
//                       textDecoration: 'none', transition: 'background 0.2s',
//                     }}
//                     onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
//                     onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
//                   >
//                     <div style={{ width: 4, height: 32, borderRadius: 2, background: STATUS_COLOURS[ln.loanStatus]?.[1] || '#9CA3AF', flexShrink: 0 }} />
//                     <div style={{ flex: 1 }}>
//                       <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>Loan #{ln.id}</div>
//                       <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', marginTop: 2 }}>{ln.loanStatus?.replace(/-/g, ' ')}</div>
//                     </div>
//                     <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 600, color: '#C9A84C' }}>
//                       {ln.loanAmount != null ? `K${Number(ln.loanAmount).toLocaleString('en-ZM', { minimumFractionDigits: 2 })}` : '—'}
//                     </div>
//                     <StatusPill status={ln.loanStatus} />
//                     <div style={{ color: 'rgba(255,255,255,0.2)', flexShrink: 0 }}><ChevronIcon /></div>
//                   </Link>
//                 )
//               })}
//             </div>
//           </Card>
//         )}

//         {/* ══ ACCOUNT FLAGS ══ */}
//         <Card>
//           <SectionLabel>Account Flags</SectionLabel>
//           <InfoRow label="Basic Details Updated" value={fmtBool(user.basicDetailsUpdated)} />
//           <InfoRow label="Identity Details Updated" value={fmtBool(user.identityDetailsUpdated)} />
//           <InfoRow label="Signing Method" value={fmt(user.signingMethod)} />
//           <InfoRow label="Confirmed" value={fmtBool(user.confirmed)} />
//           <InfoRow label="Blocked" value={fmtBool(user.blocked)} last />
//         </Card>

//       </div>
//     </div>
//   )
// }

// /* ── Icons ──────────────────────────────────────────────────── */
// function ExpandIcon() { return <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><polyline points="6 9 12 15 18 9" /></svg> }
// function CollapseIcon() { return <svg width={13} height={13} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><polyline points="18 15 12 9 6 15" /></svg> }
// function CloseIcon() { return <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg> }
// function ExternalIcon() { return <svg width={11} height={11} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg> }
// function ChevronIcon() { return <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><polyline points="9 18 15 12 9 6" /></svg> }
// function FileIcon() { return <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="#9CA3AF" strokeWidth={1.7}><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" /><polyline points="13 2 13 9 20 9" /></svg> }
// function PdfIcon() { return <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="#F87171" strokeWidth={1.7}><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" /><polyline points="13 2 13 9 20 9" /><line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="17" x2="15" y2="17" /></svg> }
// function VideoIcon() { return <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="#818CF8" strokeWidth={1.7}><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg> }
// function NoDocIcon() { return <svg width={32} height={32} fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.18)" strokeWidth={1.3}><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" /><polyline points="13 2 13 9 20 9" /><line x1="9" y1="13" x2="15" y2="13" strokeDasharray="3 2" /><line x1="9" y1="17" x2="13" y2="17" strokeDasharray="3 2" /></svg> }
'use client'

/**
 * ClientDetails.js — frontend/src/components/Includes/AdminComponents/ClientDetails.js
 */

import { useState } from 'react'
import Link from 'next/link'
import { backEndUrl } from '@/Constants'

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
const fmtBool = v => v === true ? 'Yes' : v === false ? 'No' : '—'

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
function Card({ children, accent, style: s }) {
  return (
    <div style={{
      position: 'relative', borderRadius: 14, overflow: 'hidden',
      background: accent
        ? `rgba(${accent},0.06)`
        : 'rgba(255,255,255,0.045)',
      border: `1px solid ${accent ? `rgba(${accent},0.18)` : 'rgba(255,255,255,0.08)'}`,
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
            background: 'rgba(10,15,30,0.94)',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            backdropFilter: 'blur(14px)',
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
                fontFamily: "'DM Sans', sans-serif", transition: 'all 0.18s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(220,38,38,0.15)'; e.currentTarget.style.color = '#F87171' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = 'rgba(255,255,255,0.55)' }}
            >
              <CloseIcon /> Hide
            </button>
          </div>

          <div style={{ padding: '10px 14px 14px' }}>
            {!hasFiles ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '28px 0', gap: 10 }}>
                <NoDocIcon />
                <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.28)', fontStyle: 'italic' }}>No document found</span>
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
                        <img src={url} alt={name} style={{ width: 40, height: 40, borderRadius: 7, objectFit: 'cover', flexShrink: 0, border: '1px solid rgba(255,255,255,0.1)' }} />
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
                        <div style={{ fontSize: 12.5, fontWeight: 600, color: 'rgba(255,255,255,0.8)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</div>
                        {file?.size && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{(file.size / 1024).toFixed(1)} KB</div>}
                      </div>
                      {url ? (
                        <a
                          href={url} target="_blank" rel="noopener noreferrer"
                          style={{
                            display: 'flex', alignItems: 'center', gap: 5,
                            padding: '6px 12px', borderRadius: 7, textDecoration: 'none',
                            background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)',
                            color: '#C9A84C', fontSize: 11, fontWeight: 700, flexShrink: 0, transition: 'all 0.18s',
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

/* ─── Signature preview ─────────────────────────────────────── */
function SignaturePreview({ label, file }) {
  const url = getUrl(file)
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 7 }}>
        {label}
      </div>
      {!url ? (
        <div style={{
          width: '100%', height: 72, borderRadius: 10,
          background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.22)', fontStyle: 'italic' }}>No signature found</span>
        </div>
      ) : (
        <>
          <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}>
            <img src={url} alt={label} style={{ display: 'block', width: '100%', height: 88, objectFit: 'contain' }} />
          </div>
          <a href={url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 6, fontSize: 11, color: '#C9A84C', textDecoration: 'none', fontWeight: 600 }}>
            <ExternalIcon /> Full size
          </a>
        </>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   AVATAR — with initials placeholder
═══════════════════════════════════════════════════════════════ */
function Avatar({ user, size = 72 }) {
  const details = user?.details || {}
  const firstName = details.firstname || ''
  const lastName = details.lastname || ''
  const fullName = user?.fullnames || `${firstName} ${lastName}`.trim() || user?.username || ''

  const initials = (firstName && lastName)
    ? `${firstName[0]}${lastName[0]}`.toUpperCase()
    : fullName.split(' ').map(n => n[0]).filter(Boolean).join('').toUpperCase().slice(0, 2) || '?'

  const picFiles = normalizeFiles(user?.profilePicture)
  const picUrl = picFiles.length > 0 ? getUrl(picFiles[0]) : null

  const border = size > 50 ? '2.5px solid rgba(201,168,76,0.35)' : '1.5px solid rgba(201,168,76,0.28)'

  if (picUrl) {
    return (
      <img
        src={picUrl} alt={fullName || 'Client'}
        style={{
          width: size, height: size, borderRadius: size * 0.28,
          objectFit: 'cover', border, flexShrink: 0,
        }}
      />
    )
  }

  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.28, flexShrink: 0,
      background: 'linear-gradient(135deg, rgba(201,168,76,0.22), rgba(201,168,76,0.07))',
      border,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <span style={{
        fontFamily: "'DM Serif Display', serif",
        fontSize: size * 0.36, fontWeight: 400,
        color: '#C9A84C', lineHeight: 1,
        userSelect: 'none',
      }}>
        {initials}
      </span>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   LOAN BADGE — selected loan shown above account info
═══════════════════════════════════════════════════════════════ */
function LoanBadge({ loan }) {
  if (!loan) return null
  const status = loan.loanStatus
  const [bg, color] = STATUS_COLOURS[status] || ['rgba(255,255,255,0.08)', '#fff']
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
      padding: '12px 16px', borderRadius: 12, marginBottom: 14,
      background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
          Selected Loan
        </span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13.5, fontWeight: 700, color: '#C9A84C' }}>
          #{loan.id}
        </span>
      </div>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>
        {loan.loanAmount != null ? `K${Number(loan.loanAmount).toLocaleString('en-ZM', { minimumFractionDigits: 2 })}` : '—'}
      </span>
      <StatusPill status={status} />
      {loan.id && (
        <Link
          href={`/admin/loans/${loan.id}`}
          style={{
            marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '5px 11px', borderRadius: 7,
            background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)',
            color: '#C9A84C', fontSize: 11, fontWeight: 700, textDecoration: 'none', flexShrink: 0,
          }}
        >
          View Loan <ExternalIcon />
        </Link>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   Props:
     loan         — the loan the admin selected/is viewing
     user         — the client user object
     role         — admin role string
     constants    — loansInformation constants
     adminActions — JSX slot for extra buttons
═══════════════════════════════════════════════════════════════ */
export default function ClientDetails({ loan: rawLoan, user: rawUser, role, constants, adminActions }) {
  const loan = rawLoan ? normalizeStrapi(rawLoan) : null

  const user = rawUser
    ? normalizeStrapi(rawUser)
    : loan?.client ?? null

  if (!user) {
    return (
      <div style={{ minHeight: '100vh', background: '#0A0F1E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.4)' }}>No client data available.</p>
      </div>
    )
  }

  const details = user.details || {}
  const clientDetails = user.clientDetails || {}
  const salary = user.salary || null
  const business = user.business || null
  const bankDetails = user.bankDetails || null

  const firstName = details.firstname || user.fullnames?.split(' ')[0] || ''
  const lastName = details.lastname || user.fullnames?.split(' ').slice(1).join(' ') || ''
  const fullName = user.fullnames || `${firstName} ${lastName}`.trim() || user.username || 'Client'

  const sigFile = user.signature || null
  const witSigFile = user.witnessSignature || null
  const initFile = user.initials || null
  const witInitFile = user.witnessInitials || null

  const idFront = normalizeFiles(clientDetails.IDfront)
  const idBack = normalizeFiles(clientDetails.IDback)
  const paySlips = normalizeFiles(salary?.paySlip)
  const bankStmt = normalizeFiles(salary?.bankStatement)
  const verVid = normalizeFiles(salary?.verificationVideo)
  const pacra = normalizeFiles(business?.pacraPrintOut)
  const signedDocs = normalizeFiles(user.signedDocuments)

  const allLoans = user.loans || []

  return (
    <div style={{
      minHeight: '100vh', background: '#0A0F1E',
      position: 'relative', overflowX: 'hidden',
    }}>
      {/* Background */}
      <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse 70% 45% at 50% -8%, rgba(201,168,76,0.09) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.022) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 720, margin: '0 auto', padding: '0 16px', animation: 'vfSlide 0.38s ease' }}>
        <style>{`
          @keyframes vfSlide { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
          ::-webkit-scrollbar { width: 4px; height: 4px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.25); border-radius: 100px; }
        `}</style>

        {/* ── Page header ── */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 5 }}>
            Admin · {role || 'Client Detail'}
          </div>
          <h1 style={{ margin: 0, fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(20px,4vw,26px)', color: '#fff', fontWeight: 400 }}>
            Client Profile
          </h1>
        </div>

        {/* ══ HERO PROFILE CARD ══ */}
        <div style={{
          borderRadius: 16, overflow: 'hidden', marginBottom: 14,
          background: 'rgba(255,255,255,0.045)', border: '1px solid rgba(255,255,255,0.08)',
          padding: '24px 22px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
            <Avatar user={user} size={72} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: '#fff', marginBottom: 4, fontWeight: 400 }}>
                {fullName}
              </div>
              <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.42)', marginBottom: 8 }}>
                {user.email && <span>{user.email}</span>}
                {user.email && user.username && <span style={{ margin: '0 8px', color: 'rgba(255,255,255,0.2)' }}>·</span>}
                {user.username && <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>{user.username}</span>}
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                {user.type && (
                  <span style={{ padding: '3px 10px', borderRadius: 100, background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.22)', color: '#C9A84C', fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
                    {user.type}
                  </span>
                )}
                {clientDetails.KYCverificationStatus && (
                  <span style={{ padding: '3px 10px', borderRadius: 100, background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.22)', color: '#34D399', fontSize: 10, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
                    ✓ KYC Verified
                  </span>
                )}
              </div>
            </div>

            {/* Admin action slot (e.g. Send Password Reset) */}
            {adminActions && (
              <div style={{ flexShrink: 0 }}>
                {typeof adminActions === 'function' ? adminActions() : adminActions}
              </div>
            )}
          </div>
        </div>

        {/* ══ SELECTED LOAN — above account info ══ */}
        {loan && <LoanBadge loan={loan} />}

        {/* ══ PERSONAL DETAILS ══ */}
        <Card>
          <SectionLabel>Personal Information</SectionLabel>
          <InfoRow label="First Name" value={fmt(details.firstname)} />
          <InfoRow label="Last Name" value={fmt(details.lastname)} />
          <InfoRow label="Date of Birth" value={fmtDate(details.dateOfBirth)} />
          <InfoRow label="Age" value={fmt(details.age)} />
          <InfoRow label="Gender" value={fmt(details.gender)} />
          <InfoRow label="Address" value={fmt(details.address)} last />
        </Card>

        {/* ══ IDENTITY / KYC ══ */}
        <Card>
          <SectionLabel>Identity & KYC</SectionLabel>
          <InfoRow label="ID Type" value={fmt(clientDetails.idType)?.toUpperCase()} />
          <InfoRow label="ID Number" value={fmt(clientDetails.idNumber || user.idNumber)} mono />
          <InfoRow label="Employment" value={fmt(clientDetails.employementStatus)} />
          <InfoRow label="KYC Verified" value={fmtBool(clientDetails.KYCverificationStatus)} />
          <InfoRow label="Outstanding Balance" value={fmtMoney(clientDetails.outstandingLoansBalance)} mono last />
          <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <DocumentViewer label="ID Front" files={idFront} />
            <DocumentViewer label="ID Back" files={idBack} />
          </div>
        </Card>

        {/* ══ BANK DETAILS ══ */}
        {bankDetails && (
          <Card>
            <SectionLabel>Bank Details</SectionLabel>
            <InfoRow label="Bank Name" value={fmt(bankDetails.bankName)} />
            <InfoRow label="Account Name" value={fmt(bankDetails.bankAccountName)} />
            <InfoRow label="Account Number" value={fmt(bankDetails.accountNumber)} mono />
            <InfoRow label="Branch" value={fmt(bankDetails.branchName)} />
            <InfoRow label="Branch Code" value={fmt(bankDetails.branchCode)} mono />
            <InfoRow label="Bank Phone" value={fmt(bankDetails.bankPhone)} last />
          </Card>
        )}

        {/* ══ SALARY & EMPLOYMENT ══ */}
        {salary && (
          <Card>
            <SectionLabel>Salary & Employment</SectionLabel>
            <InfoRow label="Employer" value={fmt(salary.employerName)} />
            <InfoRow label="Company Location" value={fmt(salary.companyLocation)} />
            <InfoRow label="Employment Verif. No." value={fmt(salary.employementVerificationNumber)} mono />
            <InfoRow label="Salary Amount" value={fmtMoney(salary.salaryAmount)} mono gold />
            <InfoRow label="Social Security No." value={fmt(salary.socialSecurityNumber)} mono last />
            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <DocumentViewer label="Payslip" files={paySlips} />
              <DocumentViewer label="Bank Statement" files={bankStmt} />
              <DocumentViewer label="Verification Video" files={verVid} isVideo />
            </div>
          </Card>
        )}

        {/* ══ BUSINESS ══ */}
        {business && (
          <Card>
            <SectionLabel>Business Information</SectionLabel>
            <InfoRow label="Business Name" value={fmt(business.businessName)} />
            <InfoRow label="Business Type" value={fmt(business.businessType)} />
            <InfoRow label="Ownership" value={fmt(business.ownershipType)} />
            <InfoRow label="Registered" value={fmt(business.isBusinessRegistered)} />
            <InfoRow label="Years in Business" value={fmt(business.yearsInBusiness)} />
            <InfoRow label="Annual Revenue" value={fmtMoney(business.annualRevenue)} mono />
            <InfoRow label="Net Profit" value={fmtMoney(business.netProfit)} mono />
            <InfoRow label="Ownership %" value={business.percentageOfOwnership ? `${business.percentageOfOwnership}%` : '—'} />
            <InfoRow label="Reg. Number" value={fmt(business.companyRegistrationNumber)} mono />
            <InfoRow label="Has Debt" value={fmt(business.businessHasDebt)} />
            <InfoRow label="Existing Loan Details" value={fmt(business.existingLoanDetails)} last />
            <div style={{ marginTop: 10 }}>
              <DocumentViewer label="PACRA Printout" files={pacra} />
            </div>
          </Card>
        )}

        {/* ══ SIGNATURES & INITIALS ══ */}
        <Card>
          <SectionLabel>Signatures & Initials</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 4 }}>
            <SignaturePreview label="Client Signature" file={sigFile} />
            <SignaturePreview label="Client Initials" file={initFile} />
            <SignaturePreview label="Witness Signature" file={witSigFile} />
            <SignaturePreview label="Witness Initials" file={witInitFile} />
          </div>
        </Card>

        {/* ══ SIGNED DOCUMENTS ══ */}
        <Card>
          <SectionLabel>Signed Documents</SectionLabel>
          <DocumentViewer label="Signed Documents" files={signedDocs} />
        </Card>

        {/* ══ ALL LOANS ══ */}
        {allLoans.length > 0 && (
          <Card>
            <SectionLabel>Loan History</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {allLoans.map((l, i) => {
                const ln = normalizeStrapi(l)
                return (
                  <Link
                    key={ln.id || i}
                    href={`/admin/loans/${ln.id}`}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '11px 14px', borderRadius: 10,
                      background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                      textDecoration: 'none', transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                  >
                    <div style={{ width: 4, height: 32, borderRadius: 2, background: STATUS_COLOURS[ln.loanStatus]?.[1] || '#9CA3AF', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>Loan #{ln.id}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', marginTop: 2 }}>{ln.loanStatus?.replace(/-/g, ' ')}</div>
                    </div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, fontWeight: 600, color: '#C9A84C' }}>
                      {ln.loanAmount != null ? `K${Number(ln.loanAmount).toLocaleString('en-ZM', { minimumFractionDigits: 2 })}` : '—'}
                    </div>
                    <StatusPill status={ln.loanStatus} />
                    <div style={{ color: 'rgba(255,255,255,0.2)', flexShrink: 0 }}><ChevronIcon /></div>
                  </Link>
                )
              })}
            </div>
          </Card>
        )}

        {/* ══ ACCOUNT FLAGS ══ */}
        <Card>
          <SectionLabel>Account Flags</SectionLabel>
          <InfoRow label="Basic Details Updated" value={fmtBool(user.basicDetailsUpdated)} />
          <InfoRow label="Identity Details Updated" value={fmtBool(user.identityDetailsUpdated)} />
          <InfoRow label="Signing Method" value={fmt(user.signingMethod)} />
          <InfoRow label="Confirmed" value={fmtBool(user.confirmed)} />
          <InfoRow label="Blocked" value={fmtBool(user.blocked)} last />
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
function ChevronIcon() { return <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><polyline points="9 18 15 12 9 6" /></svg> }
function FileIcon() { return <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="#9CA3AF" strokeWidth={1.7}><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" /><polyline points="13 2 13 9 20 9" /></svg> }
function PdfIcon() { return <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="#F87171" strokeWidth={1.7}><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" /><polyline points="13 2 13 9 20 9" /><line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="17" x2="15" y2="17" /></svg> }
function VideoIcon() { return <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="#818CF8" strokeWidth={1.7}><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg> }
function NoDocIcon() { return <svg width={32} height={32} fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.18)" strokeWidth={1.3}><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" /><polyline points="13 2 13 9 20 9" /><line x1="9" y1="13" x2="15" y2="13" strokeDasharray="3 2" /><line x1="9" y1="17" x2="13" y2="17" strokeDasharray="3 2" /></svg> }