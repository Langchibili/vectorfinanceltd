import React from "react";
import HandWritingPad from "../HandWritingPad/HandWritingPad";


export default class SaveSignature extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      signature: this.props.loggedInUser.signature
    }
  }
  
  handleSignatureSave(signature){
     this.setState({
        signature:signature
     })
  }
  render(){
     return (<>
          <HandWritingPad {...this.props} handleSignatureSave={this.handleSignatureSave}/>
          <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
          
          <div style={{ width: "100%" }}>
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
             <button
              type="button"
              className="btn btn-danger w-90 mt-3"
              id="next-btn"
              disabled={!this.state.signature}
              onClick={()=>{this.props.handleShowFirstForm()}}
            >
              Next
            </button>
          </div>
        </div>
        </>
     )
}

}

