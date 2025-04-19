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
      onPayroll: this.props.loanCategory === "personal" ? '' : 'no',
      salaryDeduction: this.props.loanCategory === "personal" ? '' : 'no',
      loanCategory: '',
      loanType: '',
      loanPurpose: '',
      loanPurposeDetails: '',
      loanTerm: this.props.constants.loansInformation.defaultCollaterallLoanTerm,
      interestRate: this.props.constants.loansInformation.defaultCollaterallLoanInterestRate,
      maxLoanTerm: this.props.constants.loansInformation.defaultCollaterallLoanTerm,
      isFormValid: false,
      stateSaved: false,
      monthlyPayment: 0,
      totalProfit: 0,
      approvedLoanAmount: 0,
      error: null,
      salary: '',
      salaryPercentage: 0,
      isProceed: false,
      collateralType: '',
      collateralValue: ''
    };
  }

  componentDidMount() {
    const fields = ['onPayroll','salaryDeduction','loanPurpose','loanAmount','salary','loanTerm','collateralType','collateralValue'];
    const newState = {};

    // Load saved values
    fields.forEach(key => {
      const value = localStorage.getItem(`vectorFin_${key}`);
      if (value !== null) {
        newState[key] = ['loanAmount','salary','loanTerm','collateralValue'].includes(key)
          ? parseFloat(value)
          : value;
      }
    });

    // If loanCategory is not personal, force onPayroll and salaryDeduction to 'no'
    if (this.props.loanCategory !== 'personal') {
      newState.onPayroll = 'no';
      newState.salaryDeduction = 'no';
    }

    // Apply newState and validate
    this.setState(newState, this.checkFormValidity);
  }

   handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      this.checkFormValidity();
      if (name !== 'loanPurposeDetails') {
        localStorage.setItem(`vectorFin_${name}`, value);
      }
    });
  }

  checkFormValidity = () => {
    let { loanAmount, onPayroll, loanType, salaryDeduction, loanPurpose, loanTerm, salary, collateralValue } = this.state;
    let loanCategory = '';
    let isFormValid = false;

    // Determine category & type
    if (onPayroll === 'yes') {
      if (salaryDeduction === 'yes') {
        loanCategory = 'salaryLoans';
        loanType = 'salaryBased';
      } else {
        loanCategory = 'assetLoans';
        loanType = null;
      }
      isFormValid = true;
    } else if (onPayroll === 'no') {
        loanCategory = 'assetLoans';
        loanType = null;
        isFormValid = true;
    }

    if (!loanPurpose || !loanAmount || !loanTerm || !salary) {
      isFormValid = false;
    }

    this.setState({ isFormValid, loanCategory, loanType }, this.calculateLoanDetails);
  }

  calculateLoanDetails = () => {
    const { loanAmount, loanTerm, interestRate, onPayroll, salaryDeduction, salary, collateralValue } = this.state;
    let rate = interestRate;

    if (onPayroll === 'yes' && salaryDeduction === 'yes') {
      rate = this.props.constants.loansInformation.defaultSalaryLoanInterestRate;
      const { monthlyPayment, totalProfit, totalPayment } = loanAmortizationCalculator(loanAmount, rate, loanTerm);
      const salaryPercentage = (monthlyPayment / salary) * 100;
      this.setState({ monthlyPayment, totalProfit, totalPayment, approvedLoanAmount: loanAmount, salaryPercentage, interestRate: rate });
    } else {
      const { monthlyPayment, totalPayment } = simpleInterestLoanCalculator(loanAmount, rate, loanTerm);
      const salaryPercentage = (monthlyPayment / salary) * 100;
      this.setState({ monthlyPayment, totalPayment, approvedLoanAmount: loanAmount, salaryPercentage, interestRate: rate });
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
    this.setState({ isFormValid: true, stateSaved: true }, () => {
      this.props.handleOpenBusinessInformationForm();
    });
  };
  

  renderSalaryWarning = () => {
    const { collateralValue, loanAmount, totalPayment, loanTerm, onPayroll, salaryDeduction } = this.state;
    const loanAmt = parseFloat(loanAmount);
    const collateralVal = parseFloat(collateralValue);
    const showLoanInfo = loanAmt > 0;
    const maxLoanFromCollateral = collateralVal / 2;
    const collateralRequired = salaryDeduction === "no" || onPayroll === "no";
  
    const collateralAlert = (
      <Alert severity="info" sx={{ marginBottom: '5px', fontWeight: 'bold' }}>
        Please note that you shall be required to leave a collateral in form of a vehicle, land or house title deeds at our headquarters, it should be worth 2 times the amount you are requesting.
      </Alert>
    );
  
    const loanSummary = (
      <>
        <Alert severity="success" sx={{ marginBottom: '5px' }}>
          The amount of: <strong>{loanAmount}</strong> is within approvable range
        </Alert>
        <Alert severity="info" sx={{ marginBottom: '5px' }}>
          You shall pay a total amount of: <strong>{totalPayment}</strong> during <strong>{loanTerm}</strong> months
        </Alert>
      </>
    );
  
    // Check if loan exceeds 50% of collateral
    if (collateralVal > 0 && loanAmt > maxLoanFromCollateral) {
      return (
        <>
          <Alert severity="warning" sx={{ marginBottom: '5px' }}>
            You can only get up to half the worth of your collateral, that is: <strong>{maxLoanFromCollateral}</strong>
          </Alert>
          {this.renderProceedWithLoanButton()}
        </>
      );
    }
  
    // If salary deduction or payroll is missing or not eligible
    if (!salaryDeduction || !onPayroll || collateralRequired) {
      return (
        <>
          {showLoanInfo && (
            <>
              <Alert severity="success" sx={{ marginBottom: '5px' }}>
                The amount of: <strong>{loanAmount}</strong> is within approvable range
              </Alert>
              {collateralAlert}
            </>
          )}
          {this.renderProceedWithLoanButton()}
        </>
      );
    }
  
    // If everything is valid and within limits
    if (showLoanInfo) {
      return (
        <>
          {loanSummary}
          {this.renderProceedWithLoanButton()}
        </>
      );
    }
  
    return this.renderProceedWithLoanButton();
  };
  

  renderLoanPurposeAndAdditionalDetails = ()=>{
    const loanPurposes = this.getLoanPurposes();
    const { loanPurpose, loanPurposeDetails } = this.state
    return ( 
      <>
      {/* Loan Purpose Dropdown */}
      <div className="col-lg-12 mt-3 mb-3" >
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
      <div className="col-lg-12 mt-3 mb-3">
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
      </>
      )
  }

  renderProceedWithLoanButton = ()=>{
            return <>
                    {/* Proceed Confirmation */}
                    <div className="col-lg-12">
                      {this.renderLoanPurposeAndAdditionalDetails()}
                        {this.state.loanAmount? <Alert severity="info" sx={{marginBottom: '5px'}}><strong>Would you like to proceed with this amount?</strong></Alert> : <></>}
                    </div>

                    {/* Save and Next Buttons */}
                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <div style={{ width: "100%" }}>
                    <button
                        type="button"
                        className="btn btn-success w-90 mt-3"
                        id="confirm-btn"
                        onClick={()=>{ this.props.handleOpenUpdateClientDetailsForm(); this.props.handleFormReopen(); }}
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

   selectColateralTypeAndValuation = (collateralType,collateralValue,handleInputChange)=>{
    return <>
    <div className="col-lg-12">
      <h6>Select Collateral Type</h6>
      <select
        className="form-select"
        name="collateralType"
        value={collateralType}
        onChange={handleInputChange}
      >
        <option value="">Choose...</option>
        <option value="Vehicle">Vehicle</option>
        <option value="Land">Land</option>
        <option value="House">House</option>
      </select>
    </div>
    <div className="col-lg-12">
      <h6>Estimated Value of Collateral</h6>
      <div className="input-group">
        <span className="input-group-text">K</span>
        <input
          type="number"
          name="collateralValue"
          value={collateralValue}
          autoComplete="off"
          onChange={handleInputChange}
          className="form-control"
          aria-label="Collateral value input"
        />
        <span className="input-group-text">.00</span>
      </div>
    </div>
  </>
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loanCategory !== this.props.loanCategory) {
      if (this.props.loanCategory === 'personal') {
        // reset to blank so user can choose
        this.setState({ onPayroll: '', salaryDeduction: '' }, this.checkFormValidity);
      } else {
        // force both to "no"
        this.setState({ onPayroll: 'no', salaryDeduction: 'no' }, this.checkFormValidity);
      }
    }
  }

  render() {
    // const { loanAmount, totalPayment, onPayroll, salaryDeduction, loanPurpose, loanPurposeDetails, loanTerm, isFormValid, monthlyPayment, approvedLoanAmount, maxLoanTerm, salary, salaryPercentage, isProceed } = this.state;
    // const loanPurposes = this.getLoanPurposes()
    const { loanAmount, totalPayment, loanTerm, isFormValid, monthlyPayment, approvedLoanAmount, maxLoanTerm, salaryPercentage, salary, onPayroll, salaryDeduction, collateralType, collateralValue } = this.state;

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

                  {/* Salary or Collateral Section */}
                  {this.props.loanCategory === 'personal' && onPayroll === 'yes' && (
                    <div className="col-lg-12">
                      <div className="input-group">
                        <label className="form-label mr-2">
                          Do you want this loan’s monthly payment to be deducted from your salary?
                        </label>
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

                  { /* for non‑personal loans always, or if personal but not deducting */ }
                  {(this.props.loanCategory !== 'personal' ||
                    onPayroll === 'no' ||
                    salaryDeduction === 'no') &&
                    this.selectColateralTypeAndValuation(
                      collateralType,
                      collateralValue,
                      this.handleInputChange
                    )
                  }

                     {/* Loan Term and Calculation Display */}
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
                    {salaryDeduction === ''? null : <div className="col-lg-12">
                      <h6>Your Monthly {onPayroll === 'yes' && salaryDeduction === 'yes'? <span> Salary </span> : <span> Income <small style={{ color: 'lightgray' }}>(from your business/company)</small> </span>}</h6>
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
                    </div>}

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
                      
                      {/* Monthly Payment and Salary Percentage */} 
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

