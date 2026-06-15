// import React from "react"
// import HandWritingPad from "../HandWritingPad/HandWritingPad"

// export default class SaveSignature extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = { stepIndex: 0 }
//   }

//   next = () => {
//     const { credentialsFor } = this.props
//     const max =
//       credentialsFor === "director" || credentialsFor === "ceo"
//         ? 1
//         : 3 // client: 0=signature,1=initials,2=witness sig,3=witness init
//     if (this.state.stepIndex < max) {
//       this.setState(({ stepIndex }) => ({ stepIndex: stepIndex + 1 }))
//     } else {
//       if (this.props.handleShowFirstForm) {
//         this.props.handleShowFirstForm()
//       }
//     }
//   }

//   prev = () => {
//     if (this.state.stepIndex > 0) {
//       this.setState(({ stepIndex }) => ({ stepIndex: stepIndex - 1 }))
//     } else {
//       if (this.props.handleShowFormsToSignPage) {
//         this.props.handleShowFormsToSignPage()
//       }
//     }
//   }


//   render() {
//   const {
//     credentialsFor,
//     usage,
//     loggedInUser,

//     handleSignatureSave,
//     handleInitialsSave,
//     handleWitnessSignatureSave,
//     handleWitnessInitialsSave,

//     handleDirectorSignatureSave,
//     handleDirectorInitialsSave,

//     handleCeoSignatureSave,
//     handleCeoInitialsSave
//   } = this.props

//   const { stepIndex } = this.state

//   // 1) Start with EVERY handler set to null
//   let padProps = {
//     loggedInUser,
//     handleSignatureSave:        null,
//     handleInitialsSave:         null,
//     handleWitnessSignatureSave: null,
//     handleWitnessInitialsSave:  null,
//     handleDirectorSignatureSave: null,
//     handleDirectorInitialsSave:  null,
//     handleCeoSignatureSave:     null,
//     handleCeoInitialsSave:      null
//   }

//   // 2) Now override ONLY the one you actually need
//   if (credentialsFor === "director") {
//     if (usage === "Signature") {
//       padProps.handleDirectorSignatureSave = handleDirectorSignatureSave
//     } else if (usage === "Initials") {
//       padProps.handleDirectorInitialsSave = handleDirectorInitialsSave
//     }
//   } else if (credentialsFor === "ceo") {
//     if (usage === "Signature") {
//       padProps.handleCeoSignatureSave = handleCeoSignatureSave
//     } else if (usage === "Initials") {
//       padProps.handleCeoInitialsSave = handleCeoInitialsSave
//     }
//   } else {
//     if (stepIndex === 0) padProps.handleSignatureSave        = handleSignatureSave
//     if (stepIndex === 1) padProps.handleInitialsSave         = handleInitialsSave
//     if (stepIndex === 2) padProps.handleWitnessSignatureSave = handleWitnessSignatureSave
//     if (stepIndex === 3) padProps.handleWitnessInitialsSave  = handleWitnessInitialsSave
//   }

//   return (
//     <>
//       <HandWritingPad {...padProps} constants={this.props.constants}/>

//        {credentialsFor === "director" || credentialsFor === "ceo" ? null : (
//           <div style={{
//             left:'0',
//             right:"0",
//             width: "90%",
//             margin: '0 auto',
//             textAlign: 'center',
//             position: 'fixed',
//             bottom: '90px',
//             marginBottom:'10px',
//             display: "flex",
//             justifyContent: "space-between"
//           }}>
//             <div style={{ width: "100%", textAlign: 'left' }}>
//               <button
//                 onClick={this.prev}
//                 type="button"
//                 className="btn btn-success w-90 mt-3"
//                 id="confirm-btn"
//               >
//                 Previous
//               </button>
//             </div>
//             <div style={{ width: "100%", textAlign:'right' }}>
//               <button
//                 type="button"
//                 className="btn btn-danger w-90 mt-3"
//                 id="next-btn"
//                 onClick={this.next}
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}
//       </>
//   )
// }

// }
import React from 'react'
import HandWritingPad from '../HandWritingPad/HandWritingPad'

/* ─── colour tokens ─────────────────────────────────────────── */
const G = {
  page: '#0A0F1E',
  green1: '#059669',
  green2: '#10B981',
  green3: '#34D399',
  dim: 'rgba(255,255,255,0.06)',
  border: 'rgba(255,255,255,0.08)',
  muted: 'rgba(255,255,255,0.38)',
}

const stepDefs = [
  { label: 'Signature', short: 'Sign' },
  { label: 'Initials', short: 'Init' },
  { label: 'Witness Signature', short: 'W.Sign' },
  { label: 'Witness Initials', short: 'W.Init' },
]

export default class SaveSignature extends React.Component {
  constructor(props) {
    super(props)
    this.state = { stepIndex: 0 }
  }

  // LOGIC UNCHANGED
  next = () => {
    const { credentialsFor } = this.props
    const max = credentialsFor === 'director' || credentialsFor === 'ceo' ? 1 : 3
    if (this.state.stepIndex < max) {
      this.setState(({ stepIndex }) => ({ stepIndex: stepIndex + 1 }))
    } else {
      if (this.props.handleShowFirstForm) {
        this.props.handleShowFirstForm()
      }
    }
  }

  prev = () => {
    if (this.state.stepIndex > 0) {
      this.setState(({ stepIndex }) => ({ stepIndex: stepIndex - 1 }))
    } else {
      if (this.props.handleShowFormsToSignPage) {
        this.props.handleShowFormsToSignPage()
      }
    }
  }

  render() {
    const {
      credentialsFor,
      usage,
      loggedInUser,
      handleSignatureSave,
      handleInitialsSave,
      handleWitnessSignatureSave,
      handleWitnessInitialsSave,
      handleDirectorSignatureSave,
      handleDirectorInitialsSave,
      handleCeoSignatureSave,
      handleCeoInitialsSave,
    } = this.props

    const { stepIndex } = this.state

    // LOGIC UNCHANGED — build padProps exactly as before
    let padProps = {
      loggedInUser,
      handleSignatureSave: null,
      handleInitialsSave: null,
      handleWitnessSignatureSave: null,
      handleWitnessInitialsSave: null,
      handleDirectorSignatureSave: null,
      handleDirectorInitialsSave: null,
      handleCeoSignatureSave: null,
      handleCeoInitialsSave: null,
    }

    if (credentialsFor === 'director') {
      if (usage === 'Signature') padProps.handleDirectorSignatureSave = handleDirectorSignatureSave
      else if (usage === 'Initials') padProps.handleDirectorInitialsSave = handleDirectorInitialsSave
    } else if (credentialsFor === 'ceo') {
      if (usage === 'Signature') padProps.handleCeoSignatureSave = handleCeoSignatureSave
      else if (usage === 'Initials') padProps.handleCeoInitialsSave = handleCeoInitialsSave
    } else {
      if (stepIndex === 0) padProps.handleSignatureSave = handleSignatureSave
      if (stepIndex === 1) padProps.handleInitialsSave = handleInitialsSave
      if (stepIndex === 2) padProps.handleWitnessSignatureSave = handleWitnessSignatureSave
      if (stepIndex === 3) padProps.handleWitnessInitialsSave = handleWitnessInitialsSave
    }

    const isAdminFlow = credentialsFor === 'director' || credentialsFor === 'ceo'
    const totalSteps = 4 // client always has 4 steps (0–3)

    return (
      <>
        {/* Step progress bar — only for client flow */}
        {!isAdminFlow && (
          <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0,
            zIndex: 100,
            background: 'rgba(10,15,30,0.92)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderBottom: `1px solid ${G.border}`,
            padding: '12px 16px',
          }}>
            <div style={{ maxWidth: 480, margin: '0 auto' }}>
              <div style={{ display: 'flex', gap: 0, alignItems: 'center' }}>
                {stepDefs.map((s, i) => {
                  const done = i < stepIndex
                  const active = i === stepIndex
                  const last = i === stepDefs.length - 1
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', flex: last ? undefined : '1 1 0' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                        <div style={{
                          width: 30, height: 30, borderRadius: 8,
                          background: done
                            ? `linear-gradient(135deg,${G.green1},${G.green3})`
                            : active ? 'rgba(16,185,129,0.15)' : G.dim,
                          border: `1.5px solid ${done ? G.green2 : active ? 'rgba(16,185,129,0.4)' : G.border}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: done ? '#fff' : active ? G.green2 : G.muted,
                          fontSize: 11, fontWeight: 700,
                          transition: 'all 0.3s',
                        }}>
                          {done
                            ? <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            : i + 1
                          }
                        </div>
                        <span style={{ fontSize: 8.5, fontWeight: 600, letterSpacing: '0.04em', color: active ? G.green2 : G.muted, whiteSpace: 'nowrap' }}>{s.short}</span>
                      </div>
                      {!last && (
                        <div style={{ flex: 1, height: 1.5, background: done ? `linear-gradient(90deg,${G.green1},${G.green3})` : G.border, margin: '0 5px', marginBottom: 16, transition: 'background 0.3s' }} />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* The pad itself */}
        <div style={{ paddingTop: isAdminFlow ? 0 : 72 }}>
          <HandWritingPad {...padProps} constants={this.props.constants} />
        </div>

        {/* Prev / Next navigation — client flow only */}
        {!isAdminFlow && (
          <div style={{
            position: 'fixed',
            bottom: 0, left: 0, right: 0,
            zIndex: 100,
            background: 'rgba(10,15,30,0.92)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderTop: `1px solid ${G.border}`,
            padding: '14px 20px',
          }}>
            <div style={{ maxWidth: 480, margin: '0 auto', display: 'flex', gap: 12 }}>
              <button
                onClick={this.prev}
                type="button"
                style={{
                  flex: 1,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: G.dim,
                  border: `1px solid ${G.border}`,
                  color: 'rgba(255,255,255,0.55)',
                  fontWeight: 600, fontSize: 13,
                  borderRadius: 10, padding: '12px 0',
                  cursor: 'pointer',
                }}
              >
                ← Previous
              </button>
              <button
                type="button"
                onClick={this.next}
                style={{
                  flex: 2,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: `linear-gradient(135deg,${G.green1} 0%,${G.green2} 55%,${G.green1} 100%)`,
                  border: 'none',
                  color: '#fff',
                  fontWeight: 700, fontSize: 13.5,
                  borderRadius: 10, padding: '12px 0',
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(16,185,129,0.28)',
                }}
              >
                {stepIndex < 3 ? 'Next →' : 'Finish →'}
              </button>
            </div>
          </div>
        )}
      </>
    )
  }
}