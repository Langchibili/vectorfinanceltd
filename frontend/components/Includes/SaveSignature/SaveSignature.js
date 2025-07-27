import React from "react"
import HandWritingPad from "../HandWritingPad/HandWritingPad"

export default class SaveSignature extends React.Component {
  constructor(props) {
    super(props)
    this.state = { stepIndex: 0 }
  }

  next = () => {
    const { credentialsFor } = this.props
    const max =
      credentialsFor === "director" || credentialsFor === "ceo"
        ? 1
        : 3 // client: 0=signature,1=initials,2=witness sig,3=witness init
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
    handleCeoInitialsSave
  } = this.props

  const { stepIndex } = this.state

  // 1) Start with EVERY handler set to null
  let padProps = {
    loggedInUser,
    handleSignatureSave:        null,
    handleInitialsSave:         null,
    handleWitnessSignatureSave: null,
    handleWitnessInitialsSave:  null,
    handleDirectorSignatureSave: null,
    handleDirectorInitialsSave:  null,
    handleCeoSignatureSave:     null,
    handleCeoInitialsSave:      null
  }

  // 2) Now override ONLY the one you actually need
  if (credentialsFor === "director") {
    if (usage === "Signature") {
      padProps.handleDirectorSignatureSave = handleDirectorSignatureSave
    } else if (usage === "Initials") {
      padProps.handleDirectorInitialsSave = handleDirectorInitialsSave
    }
  } else if (credentialsFor === "ceo") {
    if (usage === "Signature") {
      padProps.handleCeoSignatureSave = handleCeoSignatureSave
    } else if (usage === "Initials") {
      padProps.handleCeoInitialsSave = handleCeoInitialsSave
    }
  } else {
    if (stepIndex === 0) padProps.handleSignatureSave        = handleSignatureSave
    if (stepIndex === 1) padProps.handleInitialsSave         = handleInitialsSave
    if (stepIndex === 2) padProps.handleWitnessSignatureSave = handleWitnessSignatureSave
    if (stepIndex === 3) padProps.handleWitnessInitialsSave  = handleWitnessInitialsSave
  }

  return (
    <>
      <HandWritingPad {...padProps} constants={this.props.constants}/>

       {credentialsFor === "Director" || credentialsFor === "Ceo" ? null : (
          <div style={{
            left:'0',
            right:"0",
            width: "90%",
            margin: '0 auto',
            textAlign: 'center',
            position: 'fixed',
            bottom: '90px',
            marginBottom:'10px',
            display: "flex",
            justifyContent: "space-between"
          }}>
            <div style={{ width: "100%", textAlign: 'left' }}>
              <button
                onClick={this.prev}
                type="button"
                className="btn btn-success w-90 mt-3"
                id="confirm-btn"
              >
                Previous
              </button>
            </div>
            <div style={{ width: "100%", textAlign:'right' }}>
              <button
                type="button"
                className="btn btn-danger w-90 mt-3"
                id="next-btn"
                onClick={this.next}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </>
  )
}

}
