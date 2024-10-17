"use client";

import { api_url, getJwt } from "@/Constants";
import { getImage, updateUserAccount } from "@/Functions";
import React from "react";
import Uploader from "../Includes/Uploader/Uploader";

export default class UpdateClientDetailsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employementStatus: '',
      monthlyIncome: '',
      IDfront: null,
      IDback: null,
      // More fields can be added as necessary
      isFormValid: false,
      saving: false,
      clientDetailsId: null,
      error:null
    };
  }

  getClientDetails =  async()=>{
    return await fetch(api_url+'/users/me?populate=clientDetails.IDfront,clientDetails.IDback,', {
        headers: {
         'Authorization': `Bearer ${getJwt()}`,
         'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => data)
  }

  async componentDidMount() {
    let { clientDetails } =  this.props.loggedInUser; // because the user object has the client details, though no nrc
    if(!clientDetails){
        const blankDetailsObject = {
            employementStatus: null,
            monthlyIncome: null,
            IDfront: null,
            IDback: null
        } // create a blank slate of clientDetails to obtain the component's id
        const updatedUser = await updateUserAccount({clientDetails:blankDetailsObject},this.props.loggedInUser.id)
        if(updatedUser.hasOwnProperty('error')){
            return
        }
    }
    const user =  await this.getClientDetails();
    clientDetails = user.clientDetails
    // Set default values, ensure nulls are handled
    this.setState({
      employementStatus: clientDetails?.employementStatus || '',
      monthlyIncome: clientDetails?.monthlyIncome || '',
      IDfront: clientDetails?.IDfront || '',
      IDback: clientDetails?.IDback || '',
      clientDetailsId: clientDetails?.id || null
    },()=>{
        this.checkFormValidity()
    })
  }

  handleInputChange = (e) => {
    //new Date(details.dateOfBirth).toLocaleDateString('en-US')
    const { name, value } = e.target;
    // Update state based on field name
    this.setState({ [name]: name === "monthlyIncome"? parseFloat(value) : value }, this.checkFormValidity);
  }

  checkFormValidity = () => {
    const { employementStatus, monthlyIncome, IDfront, IDback } = this.state;

    // Validate that all fields are filled
    const isFormValid =
      employementStatus.trim() &&
      monthlyIncome &&
      IDfront &&
      IDback;

    this.setState({ isFormValid });
  }

  handleSubmit = async (e)=>{
     e.preventDefault()
     const { employementStatus, monthlyIncome, clientDetailsId, IDfront, IDback } = this.state;
     if(!employementStatus || !monthlyIncome){
        this.setState({
            error: 'Please ensure all fields are filled.',
            saving: false
        })
        return
     }
     const updateObject = this.state
     delete updateObject.isFormValid
     delete updateObject.saving
     delete updateObject.error
     delete updateObject.IDfront
     delete updateObject.IDback
     delete updateObject.clientDetailsId
     
     this.setState({
        saving: true,
        IDfront: IDfront,
        IDback: IDback,
        clientDetailsId: clientDetailsId
     })
     updateObject.id = clientDetailsId
     const updatedUser = await updateUserAccount({clientDetails:updateObject},this.props.loggedInUser.id)
   
     if(updatedUser.hasOwnProperty('error')){
        this.setState({
            error: 'something went wrong, try again',
            saving: false,
            IDfront: IDfront,
            IDback: IDback,
            clientDetailsId: clientDetailsId
        })
        return
     }
     this.setState({
        saving: false,
        IDfront: IDfront,
        IDback: IDback,
        clientDetailsId: clientDetailsId
    },()=>{
        console.log(this.state)
    })
  }

  addIDfront = (files) => {
    if(!this.state.IDfront){
        this.setState({
            IDfront: files,
            saving: false,
            error: null
        },()=>{
            this.checkFormValidity()
        })
    }
    else{
        const newFiles = [...this.state.IDfront,...files]
        this.setState({
            IDfront: newFiles,
            saving: false,
            error: null
        },()=>{
            this.checkFormValidity()
        })
    }
  }
  addIDback = (files) => {
    if(!this.state.IDback){
        this.setState({
            IDback: files,
            saving: false,
            error: null
        },()=>{
            this.checkFormValidity()
        })
    }
    else{
        const newFiles = [...this.state.IDback,...files]
        this.setState({
            IDback: newFiles,
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
        if(file.mime.startsWith('application/')){
            return (<div id={"#"+file.id} key={file.id}>
                        <p>File: <strong>{file.name}</strong></p>
                        <button className="btn btn-sm btn-danger" onClick={()=>{this.handleRemoveImage(file.id,files,arrName)}}>Remove</button>
                   </div>)
        }
        else if(file.mime.startsWith('image/')){
            return (<div id={"#"+file.id} key={file.id}>
                        <img className="mt-1 mb-1" style={{width:'35%'}} src={getImage(file,"thumbnail")} />
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
 

  renderFile

  render() {
    const { employementStatus, monthlyIncome, isFormValid } = this.state;

    return (
      <>
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header align-items-center d-flex">
                <h4 className="card-title mb-0 flex-grow-1">Employement Details </h4>
              </div>
              <div className="card-body">
                <div className="live-preview">
                  <div className="row gy-4">
                    <div className="col-lg-12">
                        <div className="input-group">
                            <label className="input-group-text" htmlFor="inputGroupSelect02">
                            Employement Status
                            </label>
                            <select 
                                className="form-select" 
                                id="inputGroupSelect01"
                                name="employementStatus"
                                autoComplete="off"
                                value={employementStatus}
                                onChange={this.handleInputChange}
                            >
                            <option value="">Choose...</option>
                            <option value="employed">Employed</option>
                            <option value="self-employed">Self-Employed</option>
                            <option value="unemployed">UnEmployed</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-lg-12">
                    <div className="input-group">
                        <span className="input-group-text">K</span>
                        <input
                        name="monthlyIncome"
                        value={monthlyIncome}
                        onChange={this.handleInputChange}
                        type="text"
                        className="form-control"
                        aria-label="Amount (to the nearest dollar)"
                        />
                        <span className="input-group-text">.00</span>
                    </div>
                    </div>
                  </div>
                
                  {this.state.clientDetailsId? <><h4 style={{marginTop:'20px'}} className="card-title mb-0 flex-grow-1">Identity Details </h4>
                  <hr style={{color:'lightgray'}}/>
                  <div style={{marginTop:'20px'}}>
                        <h5>Valid ID<small  style={{color:'gray'}}> (Front Side)</small></h5><small  style={{color:'lightgray'}}>(NRC or Passport or Driving Licence)</small>
                        <Uploader 
                            addFiles={this.addIDfront}
                            displayType="circular"
                            refId={this.state.clientDetailsId}
                            refName="user-profile.client-details"
                            fieldName="IDfront"
                            allowMultiple={false}
                            allowedTypes={['image/*', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
                        />
                        <small  style={{color:'lightgray'}}>(image or document)</small>
                        {this.renderFiles(this.state.IDfront,"IDfront")}
                  </div>
                  <div style={{marginTop:'10px'}}>
                        <h5>Valid ID<small  style={{color:'gray'}}> (Back Side)</small></h5> <small  style={{color:'lightgray'}}>(NRC or Passport or Driving Licence)</small>
                        <Uploader 
                            addFiles={this.addIDback}
                            displayType="circular"
                            refId={this.state.clientDetailsId}
                            refName="user-profile.client-details"
                            fieldName="IDback"
                            allowMultiple={false}
                            allowedTypes={['image/*', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
                        />
                        <small  style={{color:'lightgray'}}>(image or document)</small>
                        {this.renderFiles(this.state.IDback,"IDback")}
                  </div></> : <></>}
                  {/* Save and Next Buttons */}
                  <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <div style={{ width: "100%" }}>
                      <button
                        disabled={this.state.saving}
                        onClick={this.handleSubmit}
                        type="button"
                        className="btn btn-success w-50 mt-3"
                        id="confirm-btn"
                        // Submit button logic to be handled separately
                      >
                        Save
                      </button>
                    </div>
                    <div style={{ width: "100%", textAlign: "right" }}>
                      <button
                        type="button"
                        className="btn btn-danger w-50 mt-3"
                        id="next-btn"
                        disabled={!isFormValid}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                 {this.state.error? <p className="text text-danger">{this.state.error}</p> : <></>}
                 <p className="text text-warning mt-2">Note that all the information you provide here is kept strictly confidential, and it's solely meant for verification and loan eligibility determination purposes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
//  id
//  sign a letter of sale