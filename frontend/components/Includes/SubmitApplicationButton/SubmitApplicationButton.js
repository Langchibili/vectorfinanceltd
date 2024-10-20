"use client";

import React from "react";

export default class SubmitApplicationButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

 async componentDidMount(){
    const { formsToFill } =  this.props.loggedInUser
    if(formsToFill && formsToFill.length > 0){
        console.log(await this.getLoanCategory("category")) 
        console.log(await this.getLoanCategory("type"))
        console.log('the forms to fill',formsToFill)
    }
 } 

  handleSubmit = ()=>{
    
         // set the currentLoan status to pending-approval
         // check curretloan's loanCategory and loanType
         // get all forms in the system
         // depending on the category and type, push all rewuired forms into
         // the user's formsToFil, 
  }
  render() {
    return <button onClick={this.handleSubmit}>Submit Application</button>;
  }
}
//  id
//  sign a letter of sale