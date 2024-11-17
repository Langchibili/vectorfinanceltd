"use client";

import { Card, Fade, Slide, Zoom } from "@material-ui/core";
import React from "react";
import MobileMoneyPayment from "../MobileMoneyPayment/MobileMoneyPayment";
import { Alert, IconButton } from "@mui/material";
import { ArrowBackOutlined, ArrowForward } from "@material-ui/icons";
import { CreditCard } from "@mui/icons-material";

export default class PaymentsDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        paymentAmount: '',
        openPaymentMethods: false,
        openMobileMobilePayments: false,
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

  handleToggleMobileMobilePayments = ()=>{
    this.setState({
        openMobileMobilePayments: !this.state.openMobileMobilePayments
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
                </Slide>:
                         !this.state.openMobileMobilePayments?
                            <Fade in={true} direction="left">
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
                                    <button
                                        style={{
                                            backgroundColor: '#28a745',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '4px',
                                            padding: '10px 20px',
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '10px',
                                            cursor: 'pointer',
                                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                            transition: 'background-color 0.3s ease, transform 0.2s ease'
                                        }}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.backgroundColor = '#218838'
                                            e.currentTarget.style.transform = 'scale(1.05)'
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.backgroundColor = '#28a745'
                                            e.currentTarget.style.transform = 'scale(1)'
                                        }}
                                        onClick={this.handleToggleMobileMobilePayments}
                                        >
                                        <CreditCard/>
                                        Mobile Money & Card Payments
                                        <ArrowForward/>
                                    </button>

                                    <div style={{marginTop:'10px'}} className="text text-center"><h2>or</h2></div>
                                    <Alert severity="info" sx={{marginTop:'10px'}}>Pay manually and send us a proof of payment as instructed below. </Alert>
                                    <Alert severity="info" sx={{marginTop:'10px'}}>Make a deposit to the vector finance limited bank account and send us a <strong> proof of payment (POP)</strong> </Alert>
                                    <Alert severity="info" sx={{marginTop:'10px',textAlign:'left'}}>
                                        <h3 className="mb-2">Bank Account Details</h3>
                                        <p>Account Number: <strong>9130006381913</strong></p>
                                        <p>Account Name: <strong>vector finance limited</strong></p>
                                        <p>Account Branch: <strong>Woodlands Lusaka</strong></p>
                                    </Alert>
                                    <Alert severity="info" sx={{marginTop:'10px',textAlign:'left'}}>
                                    <h3 className="mb-2">Acceptable proofs of payment are</h3>
                                    <p> <strong> A bank stamped deposit slip with your name on it</strong> </p>
                                    {/* <h3 className="mb-2"> or </h3>
                                    <p> <strong> A mobile money transaction message, if you decide to use mobile money instead.</strong></p> */}
                                    </Alert>
                                    {/* end col */}
                                    </div>{" "}
                                    {/* end row*/}
                                </div>{" "}
                                {/* end .h-100*/}
                            </div>
                            </Fade>: <MobileMoneyPayment  handleToggleMobileMobilePayments={this.handleToggleMobileMobilePayments} loggedInUser={this.props.loggedInUser} paymentAmount={parseFloat(this.state.paymentAmount).toFixed(2)}/>
                            
                         }
                 {" "}
                {/* end col */}
                {/* end col */}
            </div>
        </Slide>;
  }
}

//  id
//  sign a letter of sale