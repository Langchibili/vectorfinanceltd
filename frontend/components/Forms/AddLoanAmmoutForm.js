"use client";

import { updateUserAccount } from "@/Functions";
import React from "react";

export default class AddLoanAmountForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loanAmount: '',
      onPayroll: '',
      salaryDeduction: '',
      loanCategory: '',
      loanType: '',
      isFormValid: false,
      error: null,
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, this.checkFormValidity);
  };

  checkFormValidity = () => {
    let { loanAmount, onPayroll, loanCategory, loanType, salaryDeduction } = this.state;

    let isFormValid = false;

    if (onPayroll === 'yes' && salaryDeduction === 'yes') {
        loanCategory = "salaryLoans"  
        loanType = "salaryBased"  
        isFormValid = true;
    } 
    else if (onPayroll === 'yes' && salaryDeduction === 'no') {
        loanCategory = "assetLoans"  
        loanType = null
        isFormValid = true;
    }
    else if (onPayroll === 'no') {
        loanCategory = "assetLoans"  
        loanType = null
        isFormValid = true;
    }

    this.setState({ isFormValid,loanCategory,loanAmount,loanType });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    delete this.state.isFormValid;
    delete this.state.error;
    delete this.state.onPayroll;
    delete this.state.salaryDeduction;
    this.props.setLoanInformation(this.state)
    this.setState({
        isFormValid: true
    })
  }

  render() {
    const { loanAmount, onPayroll, salaryDeduction, isFormValid } = this.state;

    return (
      <>
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header align-items-center d-flex">
                <h4 className="card-title mb-0 flex-grow-1">Loan Application</h4>
              </div>
              <div className="card-body">
                <div className="live-preview">
                  <div className="row gy-4">
                    {/* Loan Amount Input */}
                    <div className="col-lg-12">
                    <h6>How much are you looking to get?</h6>
                    <div className="input-group">
                        <span className="input-group-text">K</span>
                        <input
                            type="number"
                            name="loanAmount"
                            value={loanAmount}
                            autoComplete="off"
                            onChange={this.handleInputChange}
                            className="form-control"
                            aria-label="Loan amount input"
                            aria-describedby="inputGroup-sizing-default"
                        />
                        <span className="input-group-text">.00</span>
                    </div>
                    </div>
                    {/* Payroll Question */}
                    <div className="col-lg-12">
                      <div className="input-group">
                        <label className="form-label mr-2">Are you on payroll (Government or Company)?</label>
                        <select
                          className="form-select"
                          name="onPayroll"
                          autoComplete="off"
                          value={onPayroll}
                          onChange={this.handleInputChange}
                        >
                          <option value="">Choose...</option>
                          <option value="yes">Yes I am</option>
                          <option value="no">No I own a business</option>
                        </select>
                      </div>
                    </div>

                    {/* Salary Deduction Question (Visible only if onPayroll is 'yes') */}
                    {onPayroll === 'yes' && (
                      <div className="col-lg-12">
                        <div className="input-group">
                          <label className="form-label mr-2">Do you want this loan's monthly payment to be getting deducted from your salary?</label>
                          <select
                            className="form-select"
                            name="salaryDeduction"
                            autoComplete="off"
                            value={salaryDeduction}
                            onChange={this.handleInputChange}
                          >
                            <option value="">Choose...</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Save and Next Buttons */}
                  <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <div style={{ width: "100%" }}>
                      <button
                        disabled={!isFormValid}
                        onClick={this.handleSubmit}
                        type="button"
                        className="btn btn-success w-90 mt-3"
                        id="confirm-btn"
                      >
                        Save
                      </button>
                    </div>
                    <div style={{ width: "100%", textAlign: "right" }}>
                      <button
                        type="button"
                        className="btn btn-info w-90 mt-3"
                        id="next-btn"
                        onClick={()=>{this.props.handleOpenUpdateClientDetailsForm()}}
                      >
                        Previous
                      </button>
                    </div>

                    <div style={{ width: "100%", textAlign: "right" }}>
                      <button
                        type="button"
                        className="btn btn-danger w-90 mt-3"
                        id="next-btn"
                        disabled={!isFormValid}
                        onClick={()=>{this.props.handleOpenBusinessInformationForm()}}
                      >
                        Next
                      </button>
                    </div>
                  </div>

                  {/* Error Message */}
                  {this.state.error && <p className="text text-danger">{this.state.error}</p>}
                  
                  <p className="text text-warning mt-2">Note that all the information you provide here is kept strictly confidential and is solely meant for verification and loan eligibility determination purposes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
