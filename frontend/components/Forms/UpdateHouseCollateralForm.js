"use client";

import { api_url, backEndUrl, getJwt } from "@/Constants";
import { dateAndTimeNow, getImage, getLoanFromId, logNewAdminNotification, logNewNotification, logNewTransactionHistory, textHasPhoneNumber, updateLoan, updateUserAccount } from "@/Functions";
import React from "react";
import Uploader from "../Includes/Uploader/Uploader";
import { Slide } from "@material-ui/core";

export default class UpdateHouseCollateralForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collateralType: '',
      // More fields can be added as necessary
      isFormValid: false,
      saving: false,
      collateralId: null,
      houseId: null,
      error:null,
      titleDeed: null,
      dimensions: '',
      plotNumber: '',
      location: '',
      saved: false
    }
  }


  async componentDidMount() {
    const { collateral } = await getLoanFromId(this.props.loggedInUser.currentLoan.id,"collateral.house.titleDeed"); 
    const newLandObject = {
           house:{
                dimensions: null,
                plotNumber: null,
                location: null
           }
    }
    const newCollaterallObject = {
        data:{
            collateral: {
                collateralType: "house",
                house: newLandObject
            }
        }
    }
    if(!collateral){
        // create a blank slate of collateral to obtain the component's id
        const updatedLoan = await updateLoan(newCollaterallObject,this.props.loggedInUser.currentLoan.id)
        if(!updatedLoan.hasOwnProperty('error')){
            const { collateral } = await getLoanFromId(this.props.loggedInUser.currentLoan.id,"collateral.house.titleDeed"); 
            const {house} = collateral // get the vehicle component from the collateral component
            this.setState({
                collateralId: collateral?.id,
                houseId: collateral?.house.id,
                collateralType: collateral?.collateralType || '',
                titleDeed: house?.titleDeed.data || '',
                dimensions: house?.dimensions || '',
                plotNumber: house?.plotNumber || '',
                location: house?.location || ''
            })
            return
        }
    }
    else{
            const {house} = collateral // get the house component from the collateral component
            if(!house){
                console.log(collateral)
                newCollaterallObject.data.collateral.id = collateral.id // update only the existing collateral object
                newCollaterallObject.data.collateral.collateralType = collateral.collateralType // return the existing value
                
                const updatedLoan = await updateLoan(newCollaterallObject,this.props.loggedInUser.currentLoan.id)
                if(!updatedLoan.hasOwnProperty('error')){
                   const { collateral } = await getLoanFromId(this.props.loggedInUser.currentLoan.id,"collateral.house.titleDeed"); 
                   console.log(collateral)
                    this.setState({
                        collateralId: collateral?.id,
                        houseId: collateral?.house.id,
                        collateralType: collateral?.collateralType || '',
                        titleDeed: house?.titleDeed.data || '',
                        dimensions: house?.dimensions || '',
                        plotNumber: house?.plotNumber || '',
                        location: house?.location || ''
                    })
                    return
                }
            }
            else{ // if they all exist, then just put the pre-exising object their
                this.setState({
                    collateralId: collateral?.id,
                    houseId: collateral?.house.id,
                    collateralType: collateral?.collateralType || '',
                    titleDeed: house?.titleDeed.data || '',
                    dimensions: house?.dimensions || '',
                    plotNumber: house?.plotNumber || '',
                    location: house?.location || ''
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
    this.setState({ [name]: !value? '' : value, saved: false }, this.checkFormValidity);
  }

  checkFormValidity = (initialCheck=false) => {
    const { dimensions, plotNumber, location, titleDeed} = this.state;

    // Validate that all fields are filled
    const isFormValid =
      dimensions.trim() &&
      plotNumber.trim() &&
      location &&
      titleDeed 
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
     const { dimensions, plotNumber, location, titleDeed, collateralId, houseId } = this.state;
     if(!dimensions || !plotNumber || !location){
        this.setState({
            error: 'Please ensure all fields are filled.',
            saving: false
        })
        return
     }
    //  if(!textHasPhoneNumber(plotNumber)){
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
                house: {
                    id: this.state.houseId,
                    dimensions: this.state.dimensions,
                    plotNumber: this.state.plotNumber,
                    location: this.state.location
                }
            }
        }
    }
     delete updateObject.isFormValid
     delete updateObject.saving
     delete updateObject.error
     delete updateObject.titleDeed
     delete updateObject.collateralId
     delete updateObject.houseId
     
     if(!updateObject.plotNumber){
      updateObject.plotNumber = null
     }
     if(!updateObject.dimensions){
       updateObject.dimensions = null
     }
     if(!updateObject.location){
       updateObject.location = null
     }

     this.setState({
        saving: true,
        titleDeed: titleDeed,
        collateralId: collateralId,
        houseId: houseId
     })
     const updatedLoan = await updateLoan(updateObject,this.props.loggedInUser.currentLoan.id)
   
     if(updatedLoan.hasOwnProperty('error')){
        this.setState({
            error: 'something went wrong, try again',
            saving: false,
            titleDeed: titleDeed,
            collateralId: collateralId
        })
        return
     }
     this.setState({
        error: null,
        saving: false,
        saved: true,
        titleDeed: titleDeed,
        collateralId: collateralId
    },()=>{
        this.checkFormValidity()
    })
  }

  addTitleDeed = (files) => {
    if(!this.state.titleDeed){
        this.setState({
            titleDeed: files,
            saving: false,
            error: null
        },()=>{
            this.checkFormValidity()
        })
    }
    else{
        const newFiles = [...this.state.titleDeed,...files]
        this.setState({
            titleDeed: newFiles,
            saving: false,
            error: null
        },()=>{
            this.checkFormValidity()
        })
    }
  }
  
  handleFinishLoanApplication = async ()=>{
      const updatedLoan = await updateLoan({data: {loanStatus: 'pending-collateral-inspection',loanType : { connect: [this.props.constants.loanTypesIds.houseCollateralLoans] }}},this.props.loggedInUser.currentLoan.id)
      if(!updatedLoan.hasOwnProperty('error')){
        const applicationDate =  dateAndTimeNow()
        const transactionHistoryObject = {
            transactionType: "loan-application",
            transactionDate: applicationDate,
            amount: updatedLoan.loanAmount,
            description: "Initiation of the loan, with id: #"+updatedLoan.id+ ", and amount K"+updatedLoan.loanAmount,
            loan: {connect: [updatedLoan.id]}
        } 
        const notificationObject = {
            title: "A new asset loan of house collateral, with id "+updatedLoan.id+ ", and amount K"+updatedLoan.loanAmount,
            type: "alert"
        }
        const transactionHistory = await logNewTransactionHistory({data:transactionHistoryObject})
        const newNotitifcation = await logNewNotification({data:notificationObject})
        if(!transactionHistory.hasOwnProperty('error')){
          const userUpdateObject = {
              transactionHistories: {connect: [transactionHistory.id]},
              activities: {connect: [newNotitifcation.id]}
          }
          const updatedUserAccount = await updateUserAccount(userUpdateObject,this.props.loggedInUser.id)
          if(!updatedUserAccount.hasOwnProperty('error')){
              const AdminNotificationBody = {
                  loan: {connect: [updatedLoan.id]},
                  notification: {connect: [newNotitifcation.id]}
              }
              const newAdminNotification = await logNewAdminNotification({data:AdminNotificationBody})
              if(!newAdminNotification.hasOwnProperty('error')){
                window.location = "/"
              }
          }
      }
        
     }
     else{
        // send a notification then redirect user
        this.setState({
          error: 'something went wrong, try again',
          saving: false
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


  render() {
    const { dimensions, plotNumber, location, saved, isFormValid } = this.state;

    return (
        <Slide in={true} direction="up">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header align-items-center d-flex">
                <h4 className="card-title mb-0 flex-grow-1">house Details </h4>
              </div>
              <div className="card-body">
                <div className="live-preview">
                  <div className="row gy-4">
                  <div className="col-xxl-3 col-md-6 col-lg-12">
                      <div>
                        <label htmlFor="dimensions" className="form-label">
                         house dimensions
                        </label>
                        <input
                          className="form-control"
                          id="dimensions"
                          name="dimensions"
                          type="text"
                          autoComplete="off"
                          value={dimensions}
                          disabled={!this.state.houseId}
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-xxl-3 col-md-6 col-lg-12">
                      <div>
                        <label htmlFor="plotNumber" className="form-label">
                        Plot Number
                        </label>
                        <input
                          className="form-control"
                          id="plotNumber"
                          name="plotNumber"
                          type="text"
                          autoComplete="off"
                          value={plotNumber}
                          disabled={!this.state.houseId}
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-xxl-3 col-md-6 col-lg-12">
                      <div>
                        <label htmlFor="lastnameInput" className="form-label">
                          Location
                        </label>
                        <p><small  style={{color:'lightgray'}}>(Plot No. Area City Province)</small></p>
                        <input
                          className="form-control"
                          id="lastnameInput"
                          name="location"
                          type="text"
                          autoComplete="off"
                          value={location}
                          disabled={!this.state.houseId}
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                
                  {this.state.houseId? <>
                  <hr style={{color:'lightgray'}}/>
                  <div style={{marginTop:'20px'}}>
                        <h5>Copy Of TitleDeed<small  style={{color:'gray'}}> </small></h5><small  style={{color:'lightgray'}}></small>
                        <Uploader 
                            addFiles={this.addTitleDeed}
                            displayType="circular"
                            refId={this.state.houseId}
                            refName="media-and-documents.house"
                            fieldName="titleDeed"
                            allowMultiple={false}
                            allowedTypes={['image/*', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
                        />
                        <small  style={{color:'lightgray'}}>(document(PDF,IMAGE,WORD))</small>
                        {this.renderFiles(this.state.titleDeed,"titleDeed")}
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
                      disabled={!isFormValid || !saved}
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
      </Slide>
    );
  }
}
//  id
//  sign a letter of sale