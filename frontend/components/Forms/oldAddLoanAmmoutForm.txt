"use client";

import { loanAmortizationCalculator, simpleInterestLoanCalculator } from "@/Functions";
import { Slide } from "@material-ui/core";
import { Alert } from "@mui/material";
import React from "react";

export default class AddLoanAmountForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loanAmount: '',
      totalPayment: 0,
      onPayroll: this.props.loanCategory !== "personal"? 'no' : '',
      salaryDeduction: '',
      loanCategory: '',
      loanType: '',
      loanPurpose: '',
      loanPurposeDetails: '',
      loanTerm: this.props.constants.loansInformation.defaultCollaterallLoanTerm,  // Default term, can be changed
      interestRate: this.props.constants.loansInformation.defaultCollaterallLoanInterestRate,  // Default interest rate
      maxLoanTerm: this.props.constants.loansInformation.defaultCollaterallLoanTerm,  // Default max term
      isFormValid: false,
      stateSaved: false,
      monthlyPayment: 0,
      totalProfit: 0,
      approvedLoanAmount: 0,  // New field to store the approved loan amount
      error: null,
      salary: '',  // New field to store the user's salary
      salaryPercentage: 0,  // New field to store percentage of salary for payment
      isProceed: false, // Field to track user confirmation to proceed
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, this.checkFormValidity);

    if (name === 'onPayroll') {
      // Update maxLoanTerm based on payroll status 
      
      if (value === 'yes') { 
        this.setState({ 
            loanTerm: this.props.constants.loansInformation.defaultCollaterallLoanTerm, 
            interestRate: this.props.constants.loansInformation.defaultSalaryLoanInterestRate,
            maxLoanTerm: this.props.constants.loansInformation.defaultSalaryLoanTerm 
           }); // Max 60 months for salary-based loans
      } else {
        this.setState({ 
            loanTerm: this.props.constants.loansInformation.defaultCollaterallLoanTerm, 
            interestRate: this.props.constants.loansInformation.defaultCollaterallLoanInterestRate,
            maxLoanTerm: this.props.constants.loansInformation.defaultCollaterallLoanTerm 
          }); // Max 12 months for non-salary loans
      }
    }
    if (name === 'salaryDeduction') {
        // Update maxLoanTerm based on payroll status 
        if (value === 'yes') { 
          this.setState({ 
            loanTerm: this.props.constants.loansInformation.defaultCollaterallLoanTerm, 
            interestRate: this.props.constants.loansInformation.defaultSalaryLoanInterestRate,
            maxLoanTerm: this.props.constants.loansInformation.defaultSalaryLoanTerm 
           }); // Max 60 months for salary-based loans
        } else {
          this.setState({ loanTerm: this.props.constants.loansInformation.defaultCollaterallLoanTerm,
            interestRate: this.props.constants.loansInformation.defaultCollaterallLoanInterestRate, 
            maxLoanTerm: this.props.constants.loansInformation.defaultCollaterallLoanTerm 
           }); // Max 12 months for non-salary loans
        }
    }
  }

  checkFormValidity = () => {
    let { loanAmount, onPayroll, loanCategory, loanType, salaryDeduction, loanPurpose, loanTerm, salary } = this.state;

    let isFormValid = false;

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
  }

  calculateLoanDetails = () => {
    const { loanAmount, loanTerm, interestRate, salary, onPayroll, salaryDeduction } = this.state;
    let annualInterestRate = interestRate
    // Call loanCalculator and update monthly payment and profit
    if (onPayroll === 'yes' && salaryDeduction === 'yes') { // this means this is a salary loan
        annualInterestRate = this.props.constants.loansInformation.defaultSalaryLoanInterestRate
        const { monthlyPayment, totalProfit, totalPayment } = loanAmortizationCalculator(loanAmount, annualInterestRate, loanTerm);
    
        // Assuming you have logic for approved loan amount here:
        const approvedLoanAmount = loanAmount; // You may update this based on business logic
    
        // Calculate the percentage of salary
        const salaryPercentage = (monthlyPayment / salary) * 100;
    
        this.setState({ monthlyPayment, totalProfit, totalPayment, approvedLoanAmount, salaryPercentage, interestRate: annualInterestRate });
        return 
    }
   else{
        const { monthlyPayment, totalPayment } = simpleInterestLoanCalculator(loanAmount, annualInterestRate, loanTerm);
        
        // Assuming you have logic for approved loan amount here:
        const approvedLoanAmount = loanAmount; // You may update this based on business logic

        // Calculate the percentage of salary
        const salaryPercentage = (monthlyPayment / salary) * 100;

        this.setState({ monthlyPayment, totalPayment, approvedLoanAmount, salaryPercentage, interestRate: annualInterestRate });
   }
  }

  handleProceedConfirmation = () => {
    this.setState({ isProceed: true });
  }

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
    },()=>{
         this.props.handleOpenBusinessInformationForm()
    });
  };
  
  renderSalaryWarning = ()=>{
    const { loanAmount, totalPayment, loanTerm, onPayroll, salaryDeduction, salaryPercentage, salary } = this.state;
    if(!salaryDeduction || !onPayroll){
        if(salaryDeduction === "no" || onPayroll === "no"){
            if(parseFloat(loanAmount) > 0){
                return (
                    <>
                    <Alert severity="success" sx={{marginBottom: '5px'}}>The amount of: <strong>{loanAmount}</strong> is within approvable range</Alert>
                    <Alert severity="info" sx={{marginBottom: '5px',fontWeight:'bold'}}>Please note that you shall be required to leave a collateral in form of a vehicle, land or house title deeds at our headquarters , it should be worth 2 times the amount you are requesting.</Alert>
                    {this.renderProceedWithLoanButton()}
                    </>
                )
            }
            return this.renderProceedWithLoanButton()
        }
        if(parseFloat(loanAmount) > 0){
            return (
                <>
                <Alert severity="success" sx={{marginBottom: '5px'}}>The amount of: <strong>{loanAmount}</strong> is within approvable range</Alert>
                <Alert severity="info" sx={{marginBottom: '5px'}}>You shall pay a total amount of: <strong>{totalPayment}</strong> during <strong>{loanTerm}</strong> months</Alert>
                {this.renderProceedWithLoanButton()}
                </>
            )
        }
        return this.renderProceedWithLoanButton()
    }
    if(salaryDeduction === "no" || onPayroll === "no"){
        if(parseFloat(loanAmount) > 0){
            return (
                <>
                <Alert severity="success" sx={{marginBottom: '5px'}}>The amount of: <strong>{loanAmount}</strong> is within approvable range</Alert>
                <Alert severity="info" sx={{marginBottom: '5px',fontWeight:'bold'}}>Please note that you shall be required to leave a collateral in form of a vehicle, land or house title deeds at our headquarters, it should be worth 2 times the amount you are requesting.</Alert>
                {this.renderProceedWithLoanButton()}
                </>
            )
        }
        return this.renderProceedWithLoanButton()
    }

    if(salaryPercentage && salary){
        if(salary <= 0 || parseInt(salaryPercentage) > 40){
            return (
                <>
                <Alert severity="warning" sx={{marginBottom: '5px'}}>You cannot get a loan which requires monthly payments of over 40% of your salary</Alert>
                <Alert severity="info" sx={{marginBottom: '5px'}}>Consider reducing the amount or increasing the repayment period</Alert>
                <Alert severity="info" sx={{marginBottom: '5px'}}><strong>Tip:</strong>Consider applying for a lesser amount with your salary then additionally for a business loan instead if you have other sources of income</Alert>
                </>
           )
        }
        else{
            return (
                    <>
                    <Alert severity="success" sx={{marginBottom: '5px'}}>The amount of: <strong>{loanAmount}</strong> is within approvable range</Alert>
                    <Alert severity="info" sx={{marginBottom: '5px'}}>You shall pay a total amount of: <strong>{totalPayment}</strong> during <strong>{loanTerm}</strong> months</Alert>
                    {this.renderProceedWithLoanButton()}
                    </>
                )
        }
    }
  }

  renderProceedWithLoanButton = ()=>{
            return <>
                    {/* Proceed Confirmation */}
                    <div className="col-lg-12">
                        {this.state.loanAmount? <Alert severity="info" sx={{marginBottom: '5px'}}><strong>Would you like to proceed with this amount?</strong></Alert> : <></>}
                        {/* <button
                            className={`btn btn-${this.state.isFormValid ? 'primary' : 'secondary'}`}
                            disabled={!this.state.isFormValid || !salary || salaryPercentage > 50} // Prevent proceed if invalid
                            onClick={this.handleProceedConfirmation}
                        >
                            Proceed
                        </button> */}
                    </div>
                    {/* Proceed Message */}
                    {/* {this.state.isProceed && (
                      <div className="col-lg-12 alert alert-success">
                        <p>Thank you for proceeding. Your loan application is being processed.</p>
                      </div>
                    )} */}

                    {/* Submit Button */}
                    {/* <div className="col-lg-12">
                      <button
                        className={`btn btn-${this.state.isFormValid ? 'primary' : 'secondary'}`}
                        disabled={!this.state.isFormValid}
                        onClick={this.handleSubmit}
                      >
                        Submit Application
                      </button>
                    </div> */}

                    {/* Save and Next Buttons */}
                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <div style={{ width: "100%" }}>
                    <button
                        type="button"
                        className="btn btn-success w-90 mt-3"
                        id="confirm-btn"
                        onClick={()=>{ this.props.handleOpenUpdateClientDetailsForm();this.props.handleFormReopen(); }}
                    > 
                        Previous
                    </button>
                    </div>
                    <div style={{ width: "100%", textAlign: "right" }}>
                    <button
                        type="button"
                        className="btn btn-info w-90 mt-3"
                        id="next-btn"
                        onClick={this.handleSubmit}
                        disabled={!this.state.isFormValid}
                    >
                        Proceed
                    </button>
                    </div>
                </div>
            </>
  }

  getLoanPurposes = ()=>{
    if(this.state.onPayroll === 'yes' && this.state.salaryDeduction === 'yes'){
        return [
            'Business Expansion',
            'Home Renovation',
            'Education',
            'Medical Expenses',
            'Debt Consolidation',
            'Vehicle Purchase',
            'Others'
          ] 
    }
    else{
       return [
        'Business Expansion',
        'Equipment Purchase',
        'Inventory Purchase',
        'Working Capital',
        'Marketing and Advertising',
        'Product Development',
        'Debt Refinancing',
        'Hiring and Training',
        'Property Acquisition or Lease',
        'Emergency Funds',
        'Technology Upgrades',
        'Project Funding',
        'Seasonal Demand Preparation',
        'Legal and Regulatory Compliance',
        'Research and Development',
        'Home Renovation',
        'Education',
        'Medical Expenses',
        'Vehicle Purchase',
        'Others'
     ]
    }
  }

  render() {
    const { loanAmount, totalPayment, onPayroll, salaryDeduction, loanPurpose, loanPurposeDetails, loanTerm, isFormValid, monthlyPayment, approvedLoanAmount, maxLoanTerm, salary, salaryPercentage, isProceed } = this.state;
    const loanPurposes = this.getLoanPurposes()
    // Predefined list of loan purposes

    return (
        <Slide in={true} direction="left">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header align-items-center d-flex">
                <h4 className="card-title mb-0 flex-grow-1">Loan Application</h4>
              </div>
              <div className="card-body">
                <div className="live-preview">
                  <div className="row gy-4">
                    {/* Payroll Question */}
                    {this.props.loanCategory !== "personal"? <></> : <div className="col-lg-12">
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
                    </div>}

                    {/* Salary Deduction Question (Visible only if onPayroll is 'yes') */}
                    {onPayroll === 'yes' && (
                      <div className="col-lg-12">
                        <div className="input-group">
                          <label className="form-label mr-2">Do you want this loan's monthly payment to be deducted from your salary?</label>
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
                        rows="4"
                        className="form-control"
                        placeholder="Provide more information about the loan purpose if necessary."
                      />
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
                          aria-describedby="inputGroup-sizing-default"
                        />
                        <span className="input-group-text">.00</span>
                      </div>
                    </div>
                    
                    {/* Salary Input */}
                    <div className="col-lg-12">
                      <h6>Your Monthly {salaryDeduction === 'yes'? "Salary" : "Income"}</h6>
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
                          aria-describedby="inputGroup-sizing-default"
                        />
                        <span className="input-group-text">.00</span>
                      </div>
                    </div>

                    {/* Loan Term (Range Selector) */}
                    <div className="col-lg-12">
                      <h6>How long do you wish to repay the loan? (in months)</h6>
                      <input
                        type="range"
                        name="loanTerm"
                        min="1"
                        max={maxLoanTerm}
                        value={loanTerm}
                        onChange={this.handleInputChange}
                        className="form-range"
                      />
                      <p>{loanTerm} month(s)</p>
                    </div>

                       {/* Monthly Payment and Salary Percentage */} <div className="col-lg-12">
                     <Alert severity="info" sx={{marginBottom:'5px'}}>
                        <h6>Monthly Loan Payment: K {parseFloat(monthlyPayment)}</h6>
                        <h6>Total Loan Payment: K {parseFloat(totalPayment)}</h6>
                        <h6>This is {parseFloat(salaryPercentage).toFixed(2)}% of your {salaryDeduction === 'yes'? "salary" : "income"}.</h6>
                     </Alert>
                      {this.renderSalaryWarning()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slide>
    );
  }
}

