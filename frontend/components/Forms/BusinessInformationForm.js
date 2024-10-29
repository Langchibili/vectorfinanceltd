"use client";

import { updateUserAccount } from "@/Functions";
import React from "react";

export default class BusinessInformationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businessName: '',
      businessType: '',
      ownershipType: '',
      registrationStatus: '',
      yearsInBusiness: '',
      annualRevenue: '',
      shareholderStatus: '',
      percentageOwnership: '',
      netProfit: '',
      currentBusinessDebt: '',
      existingLoanDetails: '',
      isFormValid: false,
      error: null,
    };
  }

  componentDidMount() {
    const { business } = this.props.loggedInUser;
    // Set default values, ensure nulls are handled
    this.setState({
      businessName: business?.businessName || '',
      businessType: business?.businessType || '',
      ownershipType: business?.ownershipType || '',
      registrationStatus: business?.isBusinessRegistered || '',
      yearsInBusiness: business?.yearsInBusiness || '',
      annualRevenue: business?.annualRevenue || '',
      shareholderStatus: business?.isClientAShareHolder || '',
      percentageOwnership: business?.percentageOfOwnership || '',
      netProfit: business?.netProfit || '',
      currentBusinessDebt: business?.businessHasDebt || '',
      existingLoanDetails: business?.existingLoanDetails || ''
    },()=>{
        this.checkFormValidity()
    });
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, this.checkFormValidity);
  };

  checkFormValidity = () => {
    const {
      businessName, businessType, ownershipType, registrationStatus, yearsInBusiness,
      annualRevenue, shareholderStatus, netProfit, percentageOwnership, currentBusinessDebt, existingLoanDetails
    } = this.state;

    const isFormValid = businessName && businessType && ownershipType && registrationStatus &&
      yearsInBusiness && annualRevenue && shareholderStatus && netProfit && 
      currentBusinessDebt;
      if(isFormValid){
        if(shareholderStatus === 'no'){
            this.setState({ isFormValid:true})
        }
        else if(shareholderStatus === 'yes'){
            if(!percentageOwnership){
                this.setState({isFormValid:false})
            }
        }
        if(currentBusinessDebt === 'yes'){
            if(!existingLoanDetails){
                this.setState({ isFormValid:!isFormValid });
                return
            }
        }
      }
      this.setState({ isFormValid });
  }

  handleSubmit = async (e) => {
    const updateObject = this.state
    const shareholderStatus = this.state.shareholderStatus
    updateObject.isBusinessRegistered = this.state.registrationStatus
    updateObject.isClientAShareHolder = this.state.shareholderStatus
    updateObject.percentageOfOwnership = this.state.percentageOwnership
    updateObject.businessHasDebt = this.state.currentBusinessDebt

    e.preventDefault();
    delete updateObject.isFormValid;
    delete updateObject.error;
    delete updateObject.registrationStatus
    delete updateObject.shareholderStatus
    delete updateObject.percentageOwnership
    delete updateObject.currentBusinessDebt
    
    if(!updateObject.businessType){
        delete updateObject.businessType
    }
    if(!updateObject.ownershipType){
        delete updateObject.ownershipType 
    }
    if(!updateObject.isBusinessRegistered){
        delete updateObject.isBusinessRegistered
    }
    if(!updateObject.isClientAShareHolder){
        delete updateObject.isClientAShareHolder 
    }
    if(!updateObject.yearsInBusiness){
        delete updateObject.yearsInBusiness
    }
    if(!updateObject.percentageOfOwnership){
        delete updateObject.percentageOfOwnership
    }
    if(!updateObject.businessHasDebt){
        delete updateObject.businessHasDebt
    }
    if(!updateObject.annualRevenue){
        delete updateObject.annualRevenue 
    }
    if(!updateObject.netProfit){
        delete updateObject.netProfit
    }
    if(!updateObject.percentageOwnership){
        delete updateObject.percentageOwnership
    }
    
     this.setState({
        saving: true,
        shareholderStatus: shareholderStatus
     })
     const updatedUser = await updateUserAccount({business:updateObject},this.props.loggedInUser.id)
     console.log(updatedUser)
     console.log(updateObject)
     if(updatedUser.hasOwnProperty('error')){
        this.setState({
            error: 'something went wrong, try again',
            shareholderStatus: shareholderStatus,
            saving: false
        })
        return
     }
     this.checkFormValidity()
     this.setState({
        shareholderStatus: shareholderStatus,
        saving: false
     })
  }


  
  render() {
    const {
      businessName, businessType, ownershipType, registrationStatus, yearsInBusiness,
      annualRevenue, shareholderStatus, percentageOwnership, netProfit, currentBusinessDebt,
      existingLoanDetails, isFormValid
    } = this.state;

    return (
      <>
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header align-items-center d-flex">
                <h4 className="card-title mb-0 flex-grow-1">Tell us about your business/company</h4>
              </div>
              <div className="card-body">
                <div className="live-preview">
                  <div className="row gy-4">
                    {/* Business Name Input */}
                    <div className="col-lg-12">
                      <h6>What is the name of your business?</h6>
                      <div className="input-group">
                        <input
                          type="text"
                          name="businessName"
                          value={businessName}
                          autoComplete="off"
                          onChange={this.handleInputChange}
                          className="form-control"
                          aria-label="Business name input"
                        />
                      </div>
                    </div>

                    {/* Business Type Input */}
                    <div className="col-lg-12">
                      <h6>What type of business do you own?</h6>
                      <div className="input-group">
                        <select
                          className="form-select"
                          name="businessType"
                          value={businessType}
                          onChange={this.handleInputChange}
                        >
                          <option value="">Choose...</option>
                          <option value="sole-proprietorship">Sole Proprietorship</option>
                          <option value="partnership">Partnership</option>
                          <option value="limited-company">Limited Company (LLC)</option>
                          <option value="corporation">Corporation</option>
                          <option value="non-profit">Non-Profit</option>
                        </select>
                      </div>
                    </div>

                    {/* Ownership Type Input */}
                    <div className="col-lg-12">
                      <h6>Are you the sole owner or a co-owner of the business?</h6>
                      <div className="input-group">
                        <select
                          className="form-select"
                          name="ownershipType"
                          value={ownershipType}
                          onChange={this.handleInputChange}
                        >
                          <option value="">Choose...</option>
                          <option value="sole-owner">Sole Owner</option>
                          <option value="co-owner">Co-Owner</option>
                        </select>
                      </div>
                    </div>

                    {/* Registration Status Input */}
                    <div className="col-lg-12">
                      <h6>Is your business officially registered?</h6>
                      <div className="input-group">
                        <select
                          className="form-select"
                          name="registrationStatus"
                          value={registrationStatus}
                          onChange={this.handleInputChange}
                        >
                          <option value="">Choose...</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                    </div>

                    {/* Years in Business Input */}
                    <div className="col-lg-12">
                      <h6>How many years have you been in business?</h6>
                      <div className="input-group">
                        <input
                          type="number"
                          name="yearsInBusiness"
                          value={yearsInBusiness}
                          autoComplete="off"
                          onChange={this.handleInputChange}
                          className="form-control"
                          aria-label="Years in business input"
                        />
                      </div>
                    </div>

                    {/* Annual Revenue Input */}
                    <div className="col-lg-12">
                    <h6>What is your business's annual revenue?</h6>
                    <div className="input-group">
                        <span className="input-group-text">K</span>
                        <input
                            type="number"
                            name="annualRevenue"
                            value={annualRevenue}
                            autoComplete="off"
                            onChange={this.handleInputChange}
                            className="form-control"
                            aria-label="Annual revenue input"
                        />
                        <span className="input-group-text">.00</span>
                    </div>
                    </div>

                    {/* Shareholder Status */}
                    <div className="col-lg-12">
                      <h6>Are you a shareholder in the company?</h6>
                      <div className="input-group">
                        <select
                          className="form-select"
                          name="shareholderStatus"
                          value={shareholderStatus}
                          onChange={this.handleInputChange}
                        >
                          <option value="">Choose...</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                    </div>

                    {/* Percentage Ownership (If Shareholder) */}
                    {shareholderStatus === 'yes' && (
                      <div className="col-lg-12">
                      <h6>What percentage of the company do you own?</h6>
                      <div className="input-group">
                          <input
                              type="number"
                              name="percentageOwnership"
                              value={percentageOwnership}
                              autoComplete="off"
                              onChange={this.handleInputChange}
                              className="form-control"
                              aria-label="Percentage ownership input"
                          />
                          <span className="input-group-text">%</span>
                      </div>
                      </div>
                    )}

                    {/* Net Profit Input */}
                    <div className="col-lg-12">
                    <h6>What is your business's net profit for the last fiscal year?</h6>
                    <div className="input-group">
                        <span className="input-group-text">K</span>
                        <input
                            type="number"
                            name="netProfit"
                            value={netProfit}
                            autoComplete="off"
                            onChange={this.handleInputChange}
                            className="form-control"
                            aria-label="Net profit input"
                        />
                        <span className="input-group-text">.00</span>
                    </div>
                    </div>

                    {/* Current Business Debt */}
                    <div className="col-lg-12">
                      <h6>Do you currently have any business debt?</h6>
                      <div className="input-group">
                        <select
                          className="form-select"
                          name="currentBusinessDebt"
                          value={currentBusinessDebt}
                          onChange={this.handleInputChange}
                        >
                          <option value="">Choose...</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                    </div>

                    {/* Existing Loan Details (If any) */}
                    <div className="col-lg-12">
                      <h6>If you have any existing loans, please provide details</h6>
                      <div className="input-group">
                      <textarea
                          type="text"
                          rows="5"
                          name="existingLoanDetails"
                          value={existingLoanDetails}
                          autoComplete="off"
                          onChange={this.handleInputChange}
                          className="form-control"
                          aria-label="Existing loan details input"
                        >
                        </textarea>
                      </div>
                    </div>
                  </div>

                  {/* Save and Next Buttons */}
                  <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <button
                      disabled={this.state.saving}
                      onClick={this.handleSubmit}
                      type="button"
                      className="btn btn-success w-90 mt-3"
                      id="confirm-btn"
                    >
                      Save
                    </button>

                    <button
                      type="button"
                      className="btn btn-danger w-90 mt-3"
                      id="next-btn"
                      onClick={()=>{this.props.handleOpenAddLoanAmountForm()}}
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger w-90 mt-3"
                      id="next-btn"
                      disabled={!isFormValid}
                      onClick={()=>{this.props.handleCreateBlankLoan()}}
                    >
                      Next
                    </button>
                    
                  </div>

                  {/* Error Message */}
                  {this.state.error && <p className="text text-danger">{this.state.error}</p>}
                  
                  <p className="text text-warning mt-2">Note that you can go back to review.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
