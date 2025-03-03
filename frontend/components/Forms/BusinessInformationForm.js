"use client";

import { updateUserAccount } from "@/Functions";
import React from "react";
import Uploader from "../Includes/Uploader/Uploader";
import { api_url, getJwt } from "@/Constants";
import { Slide } from "@material-ui/core";

export default class BusinessInformationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businessName: '',
      businessType: '',
      ownershipType: '',
      registrationStatus: '',
      companyRegistrationNumber: '',
      yearsInBusiness: '',
      annualRevenue: '',
      shareholderStatus: '',
      percentageOwnership: '',
      netProfit: '',
      currentBusinessDebt: '',
      existingLoanDetails: '',
      pacraPrintOut: null,
      businessId: null,
      isFormValid: false,
      saved: false,
      error: null,
    };
  }

  getBusinessDetails =  async()=>{
    return await fetch(api_url+'/users/me?populate=business.pacraPrintOut', {
        headers: {
         'Authorization': `Bearer ${getJwt()}`,
         'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => data)
  }

   async componentDidMount() {
    let { business } = this.props.loggedInUser // because the user object has the client details, though no nrc
    console.log(business)
    if(!business){
        const blankBusinessObject = {
            businessName: null,
            businessType: null,
            pacraPrintOut: null
        } // create a blank slate ofbusiness details to obtain the component's id
        const updatedUser = await updateUserAccount({business:blankBusinessObject},this.props.loggedInUser.id)
        if(updatedUser.hasOwnProperty('error')){
            return
        }
    }
    const user = await this.getBusinessDetails();
    business = user.business
    // Set default values, ensure nulls are handled
    // Set default values, ensure nulls are handled
    this.setState({
      businessName: business?.businessName || '',
      businessType: business?.businessType || '',
      ownershipType: business?.ownershipType || '',
      registrationStatus: business?.isBusinessRegistered || '',
      companyRegistrationNumber: business?.companyRegistrationNumber || '',
      yearsInBusiness: business?.yearsInBusiness || '',
      annualRevenue: business?.annualRevenue || '',
      shareholderStatus: business?.isClientAShareHolder || '',
      percentageOwnership: business?.percentageOfOwnership || '',
      netProfit: business?.netProfit || '',
      currentBusinessDebt: business?.businessHasDebt || '',
      existingLoanDetails: business?.existingLoanDetails || '',
      pacraPrintOut: business?.pacraPrintOut || '',
      businessId: business?.id || null
    },()=>{
        this.checkFormValidity(true)
    })
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name,value)
    this.setState({ [name]: !value? '' : value, saved: false }, this.checkFormValidity);
  };

  checkFormValidity = (initialCheck=false) => {
    let companyRegistrationNumber = this.state.companyRegistrationNumber
    let percentageOwnership = this.state.percentageOwnership
    let existingLoanDetails = this.state.existingLoanDetails
    let pacraPrintOut = this.state.pacraPrintOut

    if(this.state.shareholderStatus){
        if(this.state.shareholderStatus === "no"){
            percentageOwnership = 'none' // add a value to pass the truthy check
        }
    }
    if(this.state.registrationStatus){
        if(this.state.registrationStatus === "no"){
            pacraPrintOut = "none" // add a value to pass the truthy check
            companyRegistrationNumber = 'none' // add a value to pass the truthy check
        }
    }

    if(this.state.currentBusinessDebt){
        if(this.state.currentBusinessDebt === "no"){
            existingLoanDetails = 'none' // add a value to pass the truthy check
        }
    }
    
    const {
      businessName, businessType, ownershipType, registrationStatus, yearsInBusiness,
      annualRevenue, shareholderStatus, netProfit, currentBusinessDebt
    } = this.state;

    const isFormValid = businessName && businessType && ownershipType && registrationStatus && companyRegistrationNumber &&
      yearsInBusiness && annualRevenue && shareholderStatus && percentageOwnership && netProfit && existingLoanDetails &&
      currentBusinessDebt && pacraPrintOut;
      if(!initialCheck){
        this.setState({ isFormValid });
      }
      else{
        if(isFormValid){
          this.setState({ isFormValid:isFormValid, saved: true})
        }
        else{
          this.setState({ isFormValid})
        }
      }
  }

  handleSubmit = async (e) => {
    const updateObject = this.state
    const shareholderStatus = this.state.shareholderStatus
    const registrationStatus = this.state.registrationStatus
    const pacraPrintOut = this.state.pacraPrintOut
    const businessId = this.state.businessId
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
    delete updateObject.businessId
    delete updateObject.pacraPrintOut
    
    if(!updateObject.businessName){
        updateObject.businessName = null
    }
    if(!updateObject.businessType){
        updateObject.businessType = null
    }
    if(!updateObject.ownershipType){
        updateObject.ownershipType = null
    }
    if(!updateObject.isBusinessRegistered){
        updateObject.isBusinessRegistered = null
    }
    if(!updateObject.isClientAShareHolder){
        updateObject.isClientAShareHolder = null
    }
    if(!updateObject.yearsInBusiness){
        updateObject.yearsInBusiness = null
    }
    if(!updateObject.percentageOfOwnership){
        updateObject.percentageOfOwnership = null
    }
    if(!updateObject.companyRegistrationNumber){
        updateObject.companyRegistrationNumber = null
    }
    if(!updateObject.businessHasDebt){
        updateObject.businessHasDebt = null
    }
    if(!updateObject.annualRevenue){
        updateObject.annualRevenue = null
    }
    if(!updateObject.netProfit){
        updateObject.netProfit = null
    }
    if(!updateObject.percentageOwnership){
        updateObject.percentageOwnership = null
    }
    
     this.setState({
        saving: true,
        pacraPrintOut: pacraPrintOut,
        businessId: businessId,
        shareholderStatus: shareholderStatus,
        registrationStatus: registrationStatus
     })
     updateObject.id = businessId
     const updatedUser = await updateUserAccount({business:updateObject},this.props.loggedInUser.id)
     console.log(updatedUser)
     console.log(updateObject)
     if(updatedUser.hasOwnProperty('error')){
        this.setState({
            error: 'something went wrong, try again',
            shareholderStatus: shareholderStatus,
            pacraPrintOut: pacraPrintOut,
            businessId: businessId,
            saving: false
        })
        return
     }
     this.setState({
        pacraPrintOut: pacraPrintOut,
        businessId: businessId,
        saved: true,
        saving: false
     },async ()=>{
        const { business } = await this.getBusinessDetails(); // get the newly updated business component
        this.setState({
          businessName: business?.businessName || '',
          businessType: business?.businessType || '',
          ownershipType: business?.ownershipType || '',
          registrationStatus: business?.isBusinessRegistered || '',
          companyRegistrationNumber: business?.companyRegistrationNumber || '',
          yearsInBusiness: business?.yearsInBusiness || '',
          annualRevenue: business?.annualRevenue || '',
          shareholderStatus: business?.isClientAShareHolder || '',
          percentageOwnership: business?.percentageOfOwnership || '',
          netProfit: business?.netProfit || '',
          currentBusinessDebt: business?.businessHasDebt || '',
          existingLoanDetails: business?.existingLoanDetails || '',
          pacraPrintOut: pacraPrintOut,
          businessId: business?.id || null
        },()=>{
            this.checkFormValidity()
        })
     })

     
  }

  addPacraPrintOut = (files) => {
    if(!this.state.pacraPrintOut){
        this.setState({
            pacraPrintOut: files,
            saving: false,
            error: null
        },()=>{
            this.checkFormValidity()
        })
    }
    else{
        const newFiles = [...this.state.pacraPrintOut,...files]
        this.setState({
            pacraPrintOut: newFiles,
            saving: false,
            error: null
        },()=>{
            this.checkFormValidity()
        })
    }
  }

  handleRemoveImage = async (uploadid,filesArr,arrName)=>{
    const removed = await fetch(api_url+'/upload/files/'+uploadid,{
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getJwt()}`,
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => data)
      .catch(error => console.error(error))
     if(removed){
       // remove from state
       const newArray = filesArr.filter((file)=>{
           return file.id !== uploadid
       })
       this.setState({
        [arrName]: newArray.length < 1? null : newArray
       },()=>{
        this.checkFormValidity()
       })
       // remove from the dom
       if(typeof document !== 'undefined'){
         document.getElementById("#"+uploadid).style.display = "none"
       }
     } 
  }

  renderFiles = (files,arrName)=>{
    if(!files){
        return <></>
    }
    return files.map((file)=>{
        if(file.hasOwnProperty("attributes")){
            file.attributes.id = file.id
            file = file.attributes
        }
        if(file.mime.startsWith('application/')){
            return (<div id={"#"+file.id} key={file.id}>
                        <p>File: <strong>{file.name}</strong></p>
                        <button className="btn btn-sm btn-danger" onClick={()=>{this.handleRemoveImage(file.id,files,arrName)}}>Remove</button>
                   </div>)
        }
        else if(file.mime.startsWith('video/')){
            return (<div id={"#"+file.id} key={file.id}>
                        <div style={{width:'50%', backgroundColor:'lightgray'}}>
                            <video className="mb-1" style={{width:'100%'}}>
                                <source src={backEndUrl + file.url} type={file.mime} />
                                Sorry we are unable to show this video
                            </video>
                        </div>
                        <button className="btn btn-sm btn-danger" onClick={()=>{this.handleRemoveImage(file.id,files,arrName)}}>Remove</button>
                   </div>)
                   
        }
        else{
            return (<div id={"#"+file.id} key={file.id}>
                      <p className="text text-warning">File failed to be displayed</p>
                      <button className="btn btn-sm btn-danger" onClick={()=>{this.handleRemoveImage(file.id,files,arrName)}}>Remove</button>
                   </div>)
        }
    })
  }
  
  render() {
    const {
      businessName, businessType, ownershipType, registrationStatus, companyRegistrationNumber, yearsInBusiness,
      annualRevenue, shareholderStatus, percentageOwnership, netProfit, currentBusinessDebt,
      existingLoanDetails, isFormValid, saved
    } = this.state;

    return (
      <Slide in={true} direction="left">
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
                          <option value="neither">Neither</option>
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
                              value={parseFloat(percentageOwnership) || ''}
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
                   {currentBusinessDebt === "yes" && (<div className="col-lg-12">
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
                    </div>)}
                  </div>
                  
                  {/*  companyRegistrationNumber */}
                  {registrationStatus === 'yes' && (<div className="col-lg-12 mt-4">
                    <h6>Enter the Company Registration Number?</h6>
                    <div className="input-group">
                        <input
                            type="number"
                            name="companyRegistrationNumber"
                            value={companyRegistrationNumber}
                            autoComplete="off"
                            onChange={this.handleInputChange}
                            className="form-control"
                            aria-label="Net profit input"
                        />
                    </div>
                 </div>)}
                 
                 {registrationStatus === 'yes' && this.state.businessId?  <div style={{marginTop:'20px'}}>
                        <h5>Pacra Print or Certification Of Incorperation<small  style={{color:'gray'}}></small></h5>
                        <small  style={{color:'lightgray'}}>(can even be past 6 or a year)</small>
                        <Uploader 
                            addFiles={this.addPacraPrintOut}
                            displayType="circular"
                            refId={this.state.businessId}
                            refName="client-details.business"
                            fieldName="pacraPrintOut"
                            allowMultiple={false}
                            allowedTypes={['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
                        />
                        <small  style={{color:'lightgray'}}>(document(PDF,WORD))</small>
                        {this.renderFiles(this.state.pacraPrintOut,"pacraPrintOut")}
                    </div> : <></>
                  }

                  {/* Save and Next Buttons */}
                  <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <button
                      disabled={this.state.saving}
                      onClick={this.handleSubmit}
                      type="button"
                      className="btn btn-success w-90 mt-3"
                      id="confirm-btn"
                    >
                      {this.state.saving? "Saving..." : "save"}
                    </button>

                    {this.props.formDisplay === "profile"? <></> : <button
                      type="button"
                      className="btn btn-danger w-90 mt-3"
                      id="next-btn"
                      onClick={()=>{this.props.handleOpenAddLoanAmountForm();this.props.handleFormReopen();}}
                    >
                      Previous
                    </button>}
                    {this.props.formDisplay === "profile"? <></> : <button
                      type="button"
                      className="btn btn-danger w-90 mt-3"
                      id="next-btn"
                      disabled={!isFormValid || !saved}
                      onClick={()=>{this.props.handleCreateBlankLoan()}}
                    >
                      Next
                    </button>}
                    
                  </div>

                  {/* Error Message */}
                  {this.state.error && <p className="text text-danger">{this.state.error}</p>}
                  
                  <p className="text text-warning mt-2">Note that you can go back to review.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </Slide>
    );
  }
}
