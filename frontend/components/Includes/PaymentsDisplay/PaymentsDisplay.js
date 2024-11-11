"use client";

import { Fade, Slide, Zoom } from "@material-ui/core";
import React from "react";
import LencoPaymentButton from "../LencoPaymentButton/LencoPaymentButton";
import { Alert, IconButton } from "@mui/material";
import { ArrowBackOutlined } from "@material-ui/icons";

export default class PaymentsDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        paymentAmount: '',
        openPaymentMethods: false,
        error: ''
    }
  }

  handleInputChange = (e)=>{
    const {  value } = e.target;
    // Update state based on field name
    this.setState({ paymentAmount: parseFloat(value),error: ''})
  }

  handleNextClick = ()=>{
    if(!this.state.paymentAmount || parseInt(this.state.paymentAmount) < 1){
       this.setState({
        error: 'The amount cannot be less than k1'
       })
       return
    }
    this.setState({
        openPaymentMethods: !this.state.openPaymentMethods
    })
  }

  render() {
    const fullnames = this.props.loggedInUser.fullnames
    
    return <Slide in={true} direction="left">
           <div className="row">
             {!this.state.openPaymentMethods?
               <Slide in={true} direction="left">
                  <div className="col-lg-12">
                      <IconButton onClick={()=>{ this.props.handleMakePaymentPage() }}><ArrowBackOutlined/></IconButton> 
                      <h6 className="mt-3">Enter Amount</h6>
                      <div className="input-group">
                        <span className="input-group-text">K</span>
                        <input
                          type="number"
                          name="paymentAmount"
                          value={this.state.paymentAmount}
                          autoComplete="off"
                          onChange={this.handleInputChange}
                          className="form-control"
                          aria-label="Loan amount input"
                          aria-describedby="inputGroup-sizing-default"
                        />
                        <span className="input-group-text">.00</span>
                      </div>
                      <Alert severity="info" sx={{marginTop:'10px'}}>current total unpaid loan balance is: <strong>K{this.props.loggedInUser.currentLoan.outstandingAmount}</strong></Alert>
                      <Alert severity="info" sx={{marginTop:'10px'}}>You can pay it all or you can pay any amount to the loan.</Alert>
                      <button
                      type="button"
                      className="btn btn-danger w-90 mt-3"
                      id="next-btn"
                      onClick={()=>{this.handleNextClick()}}
                    >
                      Next
                    </button>
                    {this.state.error?<Alert severity="error" sx={{marginTop:'10px'}}>{this.state.error}</Alert>:<></>}
                  </div>
                </Slide>:<Slide in={true} direction="left">
                         <div className="col">
                            <IconButton onClick={()=>{ this.handleNextClick() }}><ArrowBackOutlined/></IconButton>
                            <div className="h-100 mt-3 text text-center">
                            <div className="row pb-1">
                              <div className="col-12">
                            <div className="d-flex align-items-lg-center flex-lg-row flex-column">
                             <div className="flex-grow-1">
                              <h4 className="fs-16">Which way do you want to pay the <strong style={{fontWeight:'600'}}>K{this.state.paymentAmount}</strong>?</h4>
                                </div>
                                </div>
                                    {/* end card header */}
                                </div>
                                {/*end col*/}
                                </div>
                                {/*end row*/}
                                <div className="row" style={{padding:'10px 0px'}}>
                                <LencoPaymentButton loggedInUser={this.props.loggedInUser} paymentAmount={parseFloat(this.state.paymentAmount).toFixed(2)}/>
                                <div style={{marginTop:'10px'}} className="text text-center">or</div>
                                <Alert severity="info" sx={{marginTop:'10px'}}>Pay manually and send us a proof of payment </Alert>
                                {/* end col */}
                                </div>{" "}
                                {/* end row*/}
                            </div>{" "}
                            {/* end .h-100*/}
                  </div>
            </Slide>}
            {" "}
            {/* end col */}
            {/* end col */}
        </div>
      </Slide>;
  }
}

//  id
//  sign a letter of sale