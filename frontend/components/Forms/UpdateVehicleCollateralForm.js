"use client";

import { api_url, backEndUrl, getJwt } from "@/Constants";
import { getImage, getLoanFromId, textHasPhoneNumber, updateLoan, updateUserAccount } from "@/Functions";
import React from "react";
import Uploader from "../Includes/Uploader/Uploader";
import { Alert } from "@mui/material";

export default class UpdateVehicleCollateralForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collateralType: '',
      // More fields can be added as necessary
      isFormValid: false,
      saving: false,
      collateralId: '',
      vehicleId: null,
      error:null,
      whitebook: null,
      numberPlate: '',
      packed: '',
      saved: false
    }
  }


  async componentDidMount() {
    const { collateral } = await getLoanFromId(this.props.loggedInUser.currentLoan.id,"collateral.vehicle.whitebook"); 
    const newVehicleObject = {
           vehicle:{
                numberPlate: null,
                packed: null
           }
    }
    const newCollaterallObject = {
        data:{
            collateral: {
                collateralType: "vehicle",
                vehicle: newVehicleObject
            }
        }
    }
    if(!collateral){
        // create a blank slate of collateral to obtain the component's id
        const updatedLoan = await updateLoan(newCollaterallObject,this.props.loggedInUser.currentLoan.id)
        if(!updatedLoan.hasOwnProperty('error')){
            const { collateral } = await getLoanFromId(this.props.loggedInUser.currentLoan.id,"collateral.vehicle.whitebook"); 
            const {vehicle} = collateral // get the vehicle component from the collateral component
            this.setState({
                collateralId: collateral?.id,
                vehicleId: collateral?.vehicle.id,
                collateralType: collateral?.collateralType || '',
                whitebook: vehicle?.whitebook.data || '',
                numberPlate: vehicle?.numberPlate || '',
                packed: vehicle?.packed || ''
            })
            return
        }
    }
    else{
            const {vehicle} = collateral // get the vehicle component from the collateral component
            if(!vehicle){
                newCollaterallObject.data.collateral.id = collateral.id // update only the existing collateral object
                newCollaterallObject.data.collateral.collateralType = collateral.collateralType // return the existing value
                
                const updatedLoan = await updateLoan(newCollaterallObject,this.props.loggedInUser.currentLoan.id)
                if(!updatedLoan.hasOwnProperty('error')){
                   const { collateral } = await getLoanFromId(this.props.loggedInUser.currentLoan.id,"collateral.vehicle.whitebook"); 
                   console.log(collateral)
                    this.setState({
                        collateralId: collateral?.id,
                        vehicleId: collateral?.vehicle.id,
                        collateralType: collateral?.collateralType || '',
                        whitebook: vehicle?.whitebook.data || '',
                        numberPlate: vehicle?.numberPlate || '',
                        packed: vehicle?.packed || ''
                    })
                    return
                }
            }
            else{ // if they all exist, then just put the pre-exising object their
                this.setState({
                    collateralId: collateral?.id,
                    vehicleId: collateral?.vehicle.id,
                    collateralType: collateral?.collateralType || '',
                    whitebook: vehicle?.whitebook.data || '',
                    numberPlate: vehicle?.numberPlate || '',
                    packed: vehicle?.packed || ''
                },()=>{
                    this.checkFormValidity(true)
                })
            }
    }
  }

  handleInputChange = (e) => {
    //new Date(details.dateOfBirth).toLocaleDateString('en-US')
    const { name, value } = e.target;
    // Update state based on field name
    this.setState({ [name]: value, saved: false }, this.checkFormValidity);
  }

  checkFormValidity = (initialCheck=false) => {
    const { numberPlate, packed, whitebook } = this.state;
   
    // Validate that all fields are filled
    const isFormValid = !!(numberPlate.trim() && packed && whitebook )

      console.log('here',isFormValid)
      if(!initialCheck){
          this.setState({ isFormValid })
      }
      else{
          if(isFormValid){
            this.setState({ isFormValid:true, saved: true})
          }
          else{
            this.setState({ isFormValid})
          }
      }
  }

  handleSubmit = async (e)=>{
     e.preventDefault()
     const { numberPlate, packed, whitebook, collateralId, vehicleId } = this.state;
     if(!numberPlate || !packed){
        this.setState({
            error: 'Please ensure all fields are filled.',
            saving: false
        })
        return
     }
    //  if(!textHasPhoneNumber(numberPlate)){
    //     this.setState({
    //         error: 'Please enter a valid plot number.',
    //         saving: false
    //     })
    //     return
    //  }
    const updateObject = {
        data:{
            collateral: {
                id: this.state.collateralId,
                vehicle: {
                    id: this.state.vehicleId,
                    numberPlate: this.state.numberPlate,
                    packed: this.state.packed
                }
            }
        }
    }
     delete updateObject.isFormValid
     delete updateObject.saving
     delete updateObject.error
     delete updateObject.whitebook
     delete updateObject.collateralId
     delete updateObject.vehicleId
     
     this.setState({
        saving: true,
        whitebook: whitebook,
        collateralId: collateralId,
        vehicleId: vehicleId
     })
     const updatedLoan = await updateLoan(updateObject,this.props.loggedInUser.currentLoan.id)
   
     if(updatedLoan.hasOwnProperty('error')){
        this.setState({
            error: 'something went wrong, try again',
            saving: false,
            whitebook: whitebook,
            collateralId: collateralId
        })
        return
     }
     this.setState({
        error: null,
        saving: false,
        whitebook: whitebook,
        collateralId: collateralId,
        saved: true
    },()=>{
        this.checkFormValidity()
    })
  }

  addWhiteBook = (files) => {
    if(!this.state.whitebook){
        this.setState({
            whitebook: files,
            saving: false,
            error: null
        },()=>{
            this.checkFormValidity()
        })
    }
    else{
        const newFiles = [...this.state.whitebook,...files]
        this.setState({
            whitebook: newFiles,
            saving: false,
            error: null
        },()=>{
            this.checkFormValidity()
        })
    }
  }
  
  handleFinishLoanApplication = async ()=>{
    const updatedLoan = await updateLoan({data: {loanStatus: 'pending-collateral-inspection',loanType : { connect: [this.props.constants.loanTypesIds.vehicleCollateralLoans] }}},this.props.loggedInUser.currentLoan.id)
    if(updatedLoan.hasOwnProperty('error')){
      this.setState({
          error: 'something went wrong, try again',
          saving: false
      })
   }
   else{
      // send a notification then redirect user
      window.location = "/"
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
        else if(file.mime.startsWith('image/')){
            return (<div id={"#"+file.id} key={file.id}>
                        <img className="mt-1 mb-1" style={{width:'35%'}} src={getImage(file,"thumbnail")} />
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

  renderPackingWarning = ()=>{
    if(this.state.packed){
      if(this.state.packed === "no"){
        return  <Alert severity="info">By choosing to keep the vehicle, you agree to having us place a <strong>tracker</strong> on your vehicle</Alert>
      }
      else{
        return <Alert severity="info">By choosing to pack the vehicle with us, you agree to paying an agreed <strong>packing fee</strong>.</Alert>
      }
    }
    else{
      return <></>
    }
  }

  render() {
    const { numberPlate, packed, isFormValid, saved } = this.state;

    return (
      <>
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header align-items-center d-flex">
                <h4 className="card-title mb-0 flex-grow-1">Vehicle Details </h4>
              </div>
              <div className="card-body">
                <div className="live-preview">
                  <div className="row gy-4">
                  <div className="col-xxl-3 col-md-6 col-lg-12">
                      <div>
                        <label htmlFor="numberPlate" className="form-label">
                         Vehicle Number Plate
                        </label>
                        <input
                          className="form-control"
                          id="numberPlate"
                          name="numberPlate"
                          type="text"
                          autoComplete="off"
                          disabled={!this.state.vehicleId}
                          value={numberPlate}
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="input-group">
                          <label className="form-label mr-2">Do you want to pack the vehicle with us or keep it?</label>
                          <select
                            disabled={!this.state.vehicleId}
                            className="form-select"
                            name="packed"
                            autoComplete="off"
                            value={packed}
                            onChange={this.handleInputChange}
                          >
                            <option value="">Choose...</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                        </div>
                    </div>
                  {this.renderPackingWarning()} 
                  </div>
                
                  {this.state.vehicleId? <>
                  <hr style={{color:'lightgray'}}/>
                  <div style={{marginTop:'20px'}}>
                        <h5>Copy Of Whitebook<small  style={{color:'gray'}}> </small></h5><small  style={{color:'lightgray'}}></small>
                        <Uploader 
                            addFiles={this.addWhiteBook}
                            displayType="circular"
                            refId={this.state.vehicleId}
                            refName="media-and-documents.vehicle"
                            fieldName="whitebook"
                            allowMultiple={false}
                            allowedTypes={['image/*', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
                        />
                        <small  style={{color:'lightgray'}}>(document(PDF,IMAGE,WORD))</small>
                        {this.renderFiles(this.state.whitebook,"whitebook")}
                  </div>
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
                      {this.state.saving? "saving..." : 'save'}
                    </button>

                    
                    <button
                      type="button"
                      className="btn btn-danger w-90 mt-3"
                      id="next-btn"
                      disabled={!isFormValid && !saved}
                      onClick={()=>{this.handleFinishLoanApplication()}}
                    >
                      Complete
                    </button>
                    
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