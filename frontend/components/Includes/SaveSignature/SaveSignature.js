// import React from "react"
// import HandWritingPad from "../HandWritingPad/HandWritingPad"

// export default class SaveSignature extends React.Component {
//   constructor(props){
//     super(props)
//     this.state = { stepIndex: 0 }
//   }

//   next = () => {
//     const { credentialsFor } = this.props
//     const max =
//       credentialsFor === "Director" || credentialsFor === "Ceo"
//         ? 1
//         : 3  // client: 0=signature,1=initials,2=witness sig,3=witness init
//     if (this.state.stepIndex < max) {
//       this.setState(({ stepIndex }) => ({ stepIndex: stepIndex + 1 }))
//     } else {
//       // finished all steps—invoke final callback
//       if(this.props.handleShowFirstForm){
//         this.props.handleShowFirstForm()
//       }
//     }
//   }

//   prev = () => {
//     if (this.state.stepIndex > 0) {
//       this.setState(({ stepIndex }) => ({ stepIndex: stepIndex - 1 }))
//     } else {
//       if(this.props.handleShowFormsToSignPage){
//         this.props.handleShowFormsToSignPage()
//       }
//     }
//   }

//   render() {
//     const { credentialsFor, loggedInUser } = this.props
//     const { stepIndex } = this.state

//     // determine which handler to pass to the pad
//     let padProps = { loggedInUser }
    
// if (credentialsFor === "Director" || credentialsFor === "Ceo") {
//   if (stepIndex === 0) {
//     // signature step
//     padProps[
//       credentialsFor === "Director"
//         ? "handleDirectorSignatureSave"
//         : "handleCeoSignatureSave"
//     ] =
//       credentialsFor === "Director"
//         ? this.props.handleDirectorSignatureSave
//         : this.props.handleCeoSignatureSave
//   } else if (stepIndex === 1) {
//     // initials step
//     padProps[
//       credentialsFor === "Director"
//         ? "handleDirectorInitialsSave"
//         : "handleCeoInitialsSave"
//     ] =
//       credentialsFor === "Director"
//         ? this.props.handleDirectorInitialsSave
//         : this.props.handleCeoInitialsSave
//   }
// } else {
//   // client flow: signature, initials, witness sig, witness init
//   if (stepIndex === 0) padProps.handleSignatureSave        = this.props.handleSignatureSave
//   if (stepIndex === 1) padProps.handleInitialsSave         = this.props.handleInitialsSave
//   if (stepIndex === 2) padProps.handleWitnessSignatureSave = this.props.handleWitnessSignatureSave
//   if (stepIndex === 3) padProps.handleWitnessInitialsSave  = this.props.handleWitnessInitialsSave
// }

// // then render:
// <HandWritingPad {...padProps} />

//     console.log("padProps",padProps,this.props)
//     return (
//       <>
//         <HandWritingPad {...padProps}/>

//         {credentialsFor === "Director" || credentialsFor === "Ceo"? null : <div style={{ width: "100%", margin:'0 auto', textAlign:'center', position: 'fixed', bottom:'90px', display: "flex", justifyContent: "space-between" }}>
//             <div style={{ width: "100%", textAlign:'left' }}>
//               <button
//                 // disabled={this.state.saving}
//                 onClick={this.prev}
//                 type="button"
//                 className="btn btn-success w-90 mt-3"
//                 id="confirm-btn"
//                 // Submit button logic to be handled separately
//               >
//                 Previous
//               </button>
//             </div>
//             <div style={{ width: "100%" }}>
//               <button
//                 type="button"
//                 className="btn btn-danger w-90 mt-3"
//                 id="next-btn"
//                 onClick={this.next}
//               >
//                 Next
//               </button>
//               </div>
//         </div>}
//       </>
//     )
//   }
// }

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
      credentialsFor === "Director" || credentialsFor === "Ceo"
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

    let padProps = { loggedInUser }

    if (credentialsFor === "Director") {
      if (usage === "Signature") {
        padProps.handleDirectorSignatureSave = handleDirectorSignatureSave
      } else if (usage === "Initials") {
        padProps.handleDirectorInitialsSave = handleDirectorInitialsSave
      }
    } else if (credentialsFor === "Ceo") {
      if (usage === "Signature") {
        padProps.handleCeoSignatureSave = handleCeoSignatureSave
      } else if (usage === "Initials") {
        padProps.handleCeoInitialsSave = handleCeoInitialsSave
      }
    } else {
      if (stepIndex === 0) padProps.handleSignatureSave = handleSignatureSave
      if (stepIndex === 1) padProps.handleInitialsSave = handleInitialsSave
      if (stepIndex === 2) padProps.handleWitnessSignatureSave = handleWitnessSignatureSave
      if (stepIndex === 3) padProps.handleWitnessInitialsSave = handleWitnessInitialsSave
    }

    return (
      <>
        <HandWritingPad {...padProps} />

        {credentialsFor === "Director" || credentialsFor === "Ceo" ? null : (
          <div style={{
            width: "100%",
            margin: '0 auto',
            textAlign: 'center',
            position: 'fixed',
            bottom: '90px',
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
            <div style={{ width: "100%" }}>
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
