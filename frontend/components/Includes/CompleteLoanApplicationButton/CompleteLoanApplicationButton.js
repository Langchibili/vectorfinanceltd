"use client";

import React from "react";

export default class CompleteLoanApplicationButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  handleSubmit = ()=>{
      // this will be changing the currentLoan status from initiated to pending-approval. 
      // that's all
  }
  render() {
    return <button onClick={this.handleSubmit}>Submit Application</button>;
  }
}
//  id
//  sign a letter of sale