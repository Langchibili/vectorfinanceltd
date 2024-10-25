"use client";

import { loanCalculator } from "@/Functions";
import React from "react";

export default class LoanCalculatorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loanAmount: '',
      salary: '', // New state for salary input
      onPayroll: '',
      salaryDeduction: '',
      loanCategory: '',
      loanType: '',
      loanPurpose: '',
      loanPurposeDetails: '',
      loanTerm: 12,  // Default term, can be changed
      interestRate: 11.5,  // Default interest rate
      maxLoanTerm: 12,  // Default max term
      isFormValid: false,
      stateSaved: false,
      monthlyPayment: 0,
      totalProfit: 0,
      approvedLoanAmount: 0, // New field to store the approved loan amount
      loanPercentage: 0, // Percentage of loan compared to salary
      error: null,
      warning: null, // Warning message for loan exceeding 40% of salary
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, this.checkFormValidity);

    if (name === 'onPayroll') {
      // Update maxLoanTerm based on payroll status
      if (value === 'yes') {
        this.setState({ loanTerm: 12, maxLoanTerm: 60 }); // Max 60 months for salary-based loans
      } else {
        this.setState({ loanTerm: 12, maxLoanTerm: 12 }); // Max 12 months for non-salary loans
      }
    }
  };

  checkFormValidity = () => {
    let { loanAmount, salary, onPayroll, loanCategory, loanType, salaryDeduction, loanPurpose, loanTerm } = this.state;

    let isFormValid = false;

    if (salary && loanAmount) {
      const maxLoanAmount = salary * 0.5;
      const loanPercentage = (loanAmount / salary) * 100;

      if (parseFloat(loanAmount) > maxLoanAmount) {
        this.setState({ error: "The loan amount exceeds 50% of your salary." });
        isFormValid = false;
      } else {
        this.setState({ error: null, loanPercentage });
        isFormValid = true;

        if (loanPercentage > 40) {
          this.setState({ warning: "Warning: Loan amount exceeds 40% of your salary." });
        } else {
          this.setState({ warning: null });
        }
      }
    }

    if (onPayroll === 'yes' && salaryDeduction === 'yes') {
        loanCategory = "salaryLoans";  
        loanType = "salaryBased";  
        isFormValid = true;
    } 
    else if (onPayroll === 'yes' && salaryDeduction === 'no') {
        loanCategory = "assetLoans";  
        loanType = null;
        isFormValid = true;
    }
    else if (onPayroll === 'no') {
        loanCategory = "assetLoans";  
        loanType = null;
        isFormValid = true;
    }

    if (!loanPurpose || !loanAmount || !loanTerm || !salary) {
      isFormValid = false;
    }

    this.setState({ isFormValid, loanCategory, loanAmount, loanType }, this.calculateLoanDetails);
  };

  calculateLoanDetails = () => {
    const { loanAmount, loanTerm, interestRate } = this.state;

    // Call loanCalculator and update monthly payment and profit
    const { monthlyPayment, totalProfit } = loanCalculator(loanAmount, interestRate, loanTerm);
    
    const approvedLoanAmount = loanAmount;

    this.setState({ monthlyPayment, totalProfit, approvedLoanAmount });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    delete this.state.isFormValid;
    delete this.state.error;
    delete this.state.onPayroll;
    delete this.state.salaryDeduction;
    this.props.setLoanInformation(this.state);
    this.setState({
      isFormValid: true,
      stateSaved: true,
    });
  };

  render() {
    const { loanAmount, salary, onPayroll, salaryDeduction, loanPurpose, loanPurposeDetails, loanTerm, isFormValid, monthlyPayment, approvedLoanAmount, maxLoanTerm, loanPercentage, error, warning } = this.state;
    const loanPurposes = [
      'Business Expansion',
      'Home Renovation',
      'Education',
      'Medical Expenses',
      'Debt Consolidation',
      'Vehicle Purchase',
      'Others'
    ]

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
                    {/* Salary Input */}
                    <div className="col-lg-12">
                      <h6>Enter your monthly salary</h6>
                      <div className="input-group">
                        <span className="input-group-text">K</span>
                        <input
                          type="number"
                          name="salary"
                          value={salary}
                          autoComplete="off"
                          onChange={this.handleInputChange}
                          className="form-control"
                          aria-label="Salary input"
                        />
                        <span className="input-group-text">.00</span>
                      </div>
                    </div>

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
                        />
                        <span className="input-group-text">.00</span>
                      </div>
                    </div>

                    {/* Loan Percentage Display */}
                    <div className="col-lg-12">
                      <h6>Percentage of salary used for loan</h6>
                      <p>{loanPercentage.toFixed(2)}%</p>
                      {warning ? (
                        <p className="text-danger">{warning}</p>
                      ) : (
                        <p className="text-success">Loan amount is within acceptable limits.</p>
                      )}
                    </div>

                    {/* Payroll Question */}
                    <div className="col-lg-12">
                      <div className="input-group">
                        <label className="form-label mr-2">Are you on payroll (Government or Company)?</label>
                        <select
                          className="form-select"
                          name="onPayroll"
                          value={onPayroll}
                          onChange={this.handleInputChange}
                        >
                          <option value="">Choose...</option>
                          <option value="yes">Yes I am</option>
                          <option value="no">No I own a business</option>
                        </select>
                      </div>
                    </div>

                    {/* Salary Deduction Question */}
                    {onPayroll === 'yes' && (
                      <div className="col-lg-12">
                        <div className="input-group">
                          <label className="form-label mr-2">Do you want this loan's monthly payment to be deducted from your salary?</label>
                          <select
                            className="form-select"
                            name="salaryDeduction"
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

                    {/* Loan Purpose Dropdown */}
                    <div className="col-lg-12">
                      <h6>What is the purpose of the loan?</h6>
                      <select
                        className="form-select"
                        name="loanPurpose"
                        value={loanPurpose}
                        onChange={this.handleInputChange}
                      >
                        <option value="">Select purpose...</option>
                        {loanPurposes.map((purpose, index) => (
                          <option key={index} value={purpose}>
                            {purpose}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Loan Purpose Details Textarea */}
                    <div className="col-lg-12">
                      <h6>Additional details (optional)</h6>
                      <textarea
                        name="loanPurposeDetails"
                        value={loanPurposeDetails}
                        onChange={this.handleInputChange}
                        className="form-control"
                        rows="4"
                      ></textarea>
                    </div>

                    {/* Loan Term Dropdown */}
                    <div className="col-lg-12">
                      <h6>For how long do you want to take out this loan? (Months)</h6>
                      <select
                        className="form-select"
                        name="loanTerm"
                        value={loanTerm}
                        onChange={this.handleInputChange}
                      >
                        {[...Array(maxLoanTerm).keys()].map(i => (
                          <option key={i} value={i + 1}>
                            {i + 1} months
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Form Submission */}
                    <div className="col-lg-12 text-end">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={!isFormValid}
                        onClick={this.handleSubmit}
                      >
                        Apply for Loan
                      </button>
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="col-lg-12">
                        <p className="text-danger">{error}</p>
                      </div>
                    )}
                  </div>

                  {/* Loan Calculation Summary */}
                  <div className="row gy-4 mt-4">
                    <div className="col-lg-12">
                      <h5>Loan Details:</h5>
                      <p>Loan Amount: K {parseFloat(approvedLoanAmount).toFixed(2)}</p>
                      <p>Monthly Payment: K {parseFloat(monthlyPayment).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
