import React from "react";
import HandWritingPad from "../HandWritingPad/HandWritingPad";


export default class SaveSignature extends React.Component{
  constructor(props){
    super(props)
  }
  
  

  render(){
     return (<>
          { 
            this.props.getWitnessSignature? <HandWritingPad loggedInUser={this.props.loggedInUser} handleWitnessSignatureSave={this.props.handleWitnessSignatureSave}/> : <HandWritingPad loggedInUser={this.props.loggedInUser}  handleSignatureSave={this.props.handleSignatureSave}/>
          }
          <div style={{ width: "100%", margin:'0 auto', textAlign:'center', position: 'fixed', bottom:'90px', display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "100%", textAlign:'left' }}>
              <button
                // disabled={this.state.saving}
                onClick={()=>{this.props.handleShowFormsToSignPage()}}
                type="button"
                className="btn btn-success w-90 mt-3"
                id="confirm-btn"
                // Submit button logic to be handled separately
              >
                Previous
              </button>
            </div>
            {this.props.getWitnessSignature? <div style={{ width: "100%" }}>
              <button
                type="button"
                className="btn btn-danger w-90 mt-3"
                id="next-btn"
                disabled={!this.props.signature /* signature instead of witness signature because the signature is mandatory the witness one isn't */}
                onClick={()=>{this.props.handleShowFirstForm()}}
              >
                Next
              </button>
            </div> : <div style={{ width: "100%" }}>
              <button
                type="button"
                className="btn btn-danger w-90 mt-3"
                id="next-btn"
                disabled={!this.props.signature}
                onClick={this.props.handleShowWitnessSignatureForm}
              >
                Next
              </button>
            </div>}
        </div>
        </>
     )
}

}

