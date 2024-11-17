"use client";

import { api_url, backEndUrl, getJwt } from "@/Constants";
import { getImage, textHasPhoneNumber, updateUserAccount } from "@/Functions";
import React from "react";
import Uploader from "../Includes/Uploader/Uploader";
import { Slide } from "@material-ui/core";

export default class UpdateSalaryDetailsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyName: '',
      employerName: '',
      salaryAmount: '',
      employementVerificationNumber : '',
      companyLocation : '',
      paySlip: null,
      verificationVideo: null,
      // More fields can be added as necessary
      isFormValid: false,
      saving: false,
      saved: false,
      salaryDetailsId: null,
      error:null
    };
  }

  getClientDetails =  async()=>{
    return await fetch(api_url+'/users/me?populate=salary.paySlip,salary.verificationVideo,', {
        headers: {
         'Authorization': `Bearer ${getJwt()}`,
         'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => data)
  }

  async componentDidMount() {
    let { salary } =  this.props.loggedInUser; // because the user object has the client details, though no nrc
    if(!salary){
        const blankSalaryObject = {
            employerName: null,
            salaryAmount: null,
            paySlip: null,
            verificationVideo: null
        } // create a blank slate of salary to obtain the component's id
        const updatedUser = await updateUserAccount({salary:blankSalaryObject},this.props.loggedInUser.id)
        if(updatedUser.hasOwnProperty('error')){
            return
        }
    }
    const user =  await this.getClientDetails();
    salary = user.salary
    // Set default values, ensure nulls are handled
    this.setState({
      companyName: salary?.companyName || '',
      employerName: salary?.employerName || '',
      salaryAmount: salary?.salaryAmount || '',
      employementVerificationNumber: salary?.employementVerificationNumber || '',
      companyLocation: salary?.companyLocation || '',
      paySlip: salary?.paySlip || '',
      verificationVideo: salary?.verificationVideo || '',
      salaryDetailsId: salary?.id || null
    },()=>{
        this.checkFormValidity(true)
    })
  }

  handleInputChange = (e) => {
    //new Date(details.dateOfBirth).toLocaleDateString('en-US')
    const { name, value } = e.target;
    // Update state based on field name
    this.setState({ [name]: name === "salaryAmount"? parseFloat(value) : value, saved: false }, this.checkFormValidity);
  }

  checkFormValidity = (initialCheck=false) => {
    const { companyName, employerName, salaryAmount, employementVerificationNumber, companyLocation, paySlip, verificationVideo} = this.state;

    // Validate that all fields are filled
    const isFormValid =
      companyName.trim() &&
      employerName.trim() &&
      employementVerificationNumber &&
      salaryAmount &&
      companyLocation &&
      paySlip &&
      !verificationVideo; // no verification video since we do not intend to use the feature yet

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

  handleSubmit = async (e)=>{
     e.preventDefault()
     
     const { companyName, employerName, salaryAmount, employementVerificationNumber, companyLocation, paySlip, verificationVideo, salaryDetailsId } = this.state;
     if(!companyName || !employerName || !salaryAmount || !employementVerificationNumber || !companyLocation){
        this.setState({
            error: 'Please ensure all fields are filled.',
            saving: false
        })
        return
     }
     if(!textHasPhoneNumber(employementVerificationNumber)){
        this.setState({
            error: 'Please enter a valid phone number.',
            saving: false
        })
        return
     }
     const updateObject = this.state
     delete updateObject.isFormValid
     delete updateObject.saving
     delete updateObject.error
     delete updateObject.paySlip
     delete updateObject.verificationVideo
     delete updateObject.salaryDetailsId
     
     this.setState({
        saving: true,
        paySlip: paySlip,
        verificationVideo: verificationVideo,
        salaryDetailsId: salaryDetailsId,
        saved: true
     })
     updateObject.id = salaryDetailsId
     const updatedUser = await updateUserAccount({salary:updateObject},this.props.loggedInUser.id)
   
     if(updatedUser.hasOwnProperty('error')){
        this.setState({
            error: 'something went wrong, try again',
            saving: false,
            paySlip: paySlip,
            verificationVideo: verificationVideo,
            salaryDetailsId: salaryDetailsId
        })
        return
     }
     this.setState({
        error: null,
        saving: false,
        paySlip: paySlip,
        verificationVideo: verificationVideo,
        salaryDetailsId: salaryDetailsId
    },()=>{
        this.checkFormValidity()
        console.log(this.state)
    })
  }

  addPaySlip = (files) => {
    if(!this.state.paySlip){
        this.setState({
            paySlip: files,
            saving: false,
            error: null
        },()=>{
            this.checkFormValidity()
        })
    }
    else{
        const newFiles = [...this.state.paySlip,...files]
        this.setState({
            paySlip: newFiles,
            saving: false,
            error: null
        },()=>{
            this.checkFormValidity()
        })
    }
  }
  addVericationVideo = (files) => {
    if(!this.state.verificationVideo){
        this.setState({
            verificationVideo: files,
            saving: false,
            error: null
        },()=>{
            this.checkFormValidity()
        })
    }
    else{
        const newFiles = [...this.state.verificationVideo,...files]
        this.setState({
            verificationVideo: newFiles,
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
    const { companyName, employerName, salaryAmount, saved, employementVerificationNumber, companyLocation, isFormValid } = this.state;

    return (
      <Slide in={true} direction="left">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header align-items-center d-flex">
                <h4 className="card-title mb-0 flex-grow-1">Salary And Company Details </h4>
              </div>
              <div className="card-body">
                <div className="live-preview">
                  <div className="row gy-4">
                  <div className="col-xxl-3 col-md-6 col-lg-12">
                      <div>
                        <label htmlFor="companyName" className="form-label">
                        Company Name
                        </label>
                        <input
                          className="form-control"
                          id="companyName"
                          name="companyName"
                          type="text"
                          autoComplete="off"
                          disabled={!this.state.salaryDetailsId}
                          value={companyName}
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-xxl-3 col-md-6 col-lg-12">
                      <div>
                        <label htmlFor="employerName" className="form-label">
                        Employer Name
                        </label>
                        <input
                          className="form-control"
                          id="employerName"
                          name="employerName"
                          type="text"
                          autoComplete="off"
                          value={employerName}
                          disabled={!this.state.salaryDetailsId}
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-xxl-3 col-md-6 col-lg-12">
                      <div>
                        <label htmlFor="employementVerificationNumber" className="form-label">
                           Employement Verification PhoneNumber
                        </label>
                        <p><small  style={{color:'gray'}}>(Any Superior or Employer's Phonenumber)</small></p>
                        <input
                          className="form-control"
                          id="employementVerificationNumber"
                          name="employementVerificationNumber"
                          value={employementVerificationNumber}
                          disabled={!this.state.salaryDetailsId}
                          type="text"
                          autoComplete="off"
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                    <label htmlFor="employementVerificationNumber" className="form-label">
                           Salary
                        </label>
                        <div className="input-group">
                            <span className="input-group-text">K</span>
                            <input
                            name="salaryAmount"
                            value={salaryAmount}
                            disabled={!this.state.salaryDetailsId}
                            onChange={this.handleInputChange}
                            type="text"
                            className="form-control"
                            />
                            <span className="input-group-text">.00</span>
                        </div>
                    </div>
                    <div className="col-xxl-3 col-md-6 col-lg-12">
                      <div>
                        <label htmlFor="lastnameInput" className="form-label">
                          Company Address
                        </label>
                        <p><small  style={{color:'lightgray'}}>(House No. Area City Province)</small></p>
                        <input
                          className="form-control"
                          id="lastnameInput"
                          name="companyLocation"
                          type="text"
                          autoComplete="off"
                          disabled={!this.state.salaryDetailsId}
                          value={companyLocation}
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                
                  {this.state.salaryDetailsId? <><h4 style={{marginTop:'20px'}} className="card-title mb-0 flex-grow-1">Identity Details </h4>
                  <hr style={{color:'lightgray'}}/>
                  <div style={{marginTop:'20px'}}>
                        <h5>PaySlip/Bank Statement<small  style={{color:'gray'}}> (Of Past 3 months)</small></h5><small  style={{color:'lightgray'}}>(can even be past 6 or a year)</small>
                        <Uploader 
                            addFiles={this.addPaySlip}
                            displayType="circular"
                            refId={this.state.salaryDetailsId}
                            refName="client-details.salary"
                            fieldName="paySlip"
                            allowMultiple={false}
                            allowedTypes={['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
                        />
                        <small  style={{color:'lightgray'}}>(document(PDF,WORD))</small>
                        {this.renderFiles(this.state.paySlip,"paySlip")}
                  </div>
                  {/* <div style={{marginTop:'10px'}}>
                        <h5>Verification Video <small  style={{color:'gray'}}> (Instructions Below)</small></h5> <small  style={{color:'lightgray'}}>(Take a video holding your ID(NRC,Passport or Driving Licence) and state today's date)</small>
                        <Uploader 
                            addFiles={this.addVericationVideo}
                            displayType="circular"
                            refId={this.state.salaryDetailsId}
                            refName="client-details.salary"
                            fieldName="verificationVideo"
                            allowMultiple={false}
                            allowedTypes={['video/*']}
                        />
                        <small  style={{color:'lightgray'}}>(Video(MP4,MKV,AVL))</small>
                        {this.renderFiles(this.state.verificationVideo,"verificationVideo")}
                  </div> */}
                  </> : <></>}
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
                      Complete
                    </button>}
                    
                  </div>
                 {this.state.error? <p className="text text-danger">{this.state.error}</p> : <></>}
                 <p className="text text-warning mt-2">Note that all the information you provide here is kept strictly confidential, and it's solely meant for verification and loan eligibility determination purposes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slide>
    );
  }
}
//  id
//  sign a letter of sale