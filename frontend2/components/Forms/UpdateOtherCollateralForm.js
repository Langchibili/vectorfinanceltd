"use client";

import { api_url, backEndUrl, getJwt } from "@/Constants";
import { dateAndTimeNow, getImage, getLoanFromId, logNewAdminNotification, logNewNotification, logNewTransactionHistory, textHasPhoneNumber, updateLoan, updateUserAccount } from "@/Functions";
import React from "react";
import Uploader from "../Includes/Uploader/Uploader";
import { Slide } from "@material-ui/core";
import WarningSnapBack from "../Includes/SnapBacks/WarningSnapBack";
import CollateralMedia from "../Includes/CollateralMedia/CollateralMedia";

export default class UpdateOtherCollateralForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collateralType: '',
      // More fields can be added as necessary
      isFormValid: false,
      saving: false,
      collateralId: null,
      error:null,
      otherCollateralName: '',
      saved: false,
      openErrorSnapBack: false,
      errorMessage: '',
      collateralMedia: {
        'image': null
      }
    }
  }


  async componentDidMount() {
    const { collateral } = await getLoanFromId(this.props.loggedInUser.currentLoan.id,"collateral.CollateralMedia"); 
    const newCollaterallObject = {
        data:{
            collateral: {
                collateralType: "other",
                otherCollateralName: null
            }
        }
    }
    if(!collateral){
        // create a blank slate of collateral to obtain the component's id
        const updatedLoan = await updateLoan(newCollaterallObject,this.props.loggedInUser.currentLoan.id)
        if(!updatedLoan.hasOwnProperty('error')){
            const { collateral } = await getLoanFromId(this.props.loggedInUser.currentLoan.id,"collateral.CollateralMedia"); 
            this.setState({
                collateralId: collateral?.id,
                collateralType: collateral?.collateralType || '',
                otherCollateralName: collateral?.otherCollateralName || '',
                collateralMedia: {
                  'image': collateral?.CollateralMedia?.data?.[0] ?? null
                }
            })
            return
        }
    }
    else{
        this.setState({
            collateralId: collateral?.id,
            collateralType: collateral?.collateralType || '',
            otherCollateralName: collateral?.otherCollateralName || '',
            collateralMedia: {
                'image': collateral?.CollateralMedia?.data?.[0] ?? null
            }
        },()=>{
            this.checkFormValidity(true)
        })
     }
  }

  handleInputChange = (e) => {
    //new Date(details.dateOfBirth).toLocaleDateString('en-US')
    const { name, value } = e.target;
    // Update state based on field name
    this.setState({ [name]: !value? '' : value, saved: false }, this.checkFormValidity);
  }

  checkFormValidity = (initialCheck=false) => {
    const { otherCollateralName, collateralMedia } = this.state;
    const collateralMediaSet = this.props.constants.loansInformation.allowClientsToAddMedia && this.props.constants.loansInformation.allowClientsToAddMedia === "no"? true : collateralMedia['image']

    // Validate that all fields are filled
    const isFormValid = 
      otherCollateralName.trim() &&
      collateralMediaSet
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
  handleAddCollateralMedia = (side, files) => {
      this.setState(prev => ({
        collateralMedia: {
          ...prev.collateralMedia,
          [side]: prev.collateralMedia[side] ? [...prev.collateralMedia[side], ...files] : files
        },
        saved: false,
        error: null
      }));
  }

   handleRemoveCollateralMedia = async (side, uploadId) => {
           const removed = await fetch(api_url+'/upload/files/'+uploadId,{
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${getJwt()}`,
              'Content-Type': 'application/json'
            }
          }).then(response => response.json())
            .then(data => data)
            .catch(error => console.error(error))
            
          if(removed){
            this.setState(prev => ({
             collateralMedia: {
              ...prev.collateralMedia,
              [side]: null
            }
          }))
          }
  }

  handleSubmit = async (e)=>{
     e.preventDefault()
     const {otherCollateralName,collateralId } = this.state;
     if(!otherCollateralName){
        this.setState({
            error: 'Please ensure all fields are filled.',
            saving: false
        })
        return
     }
    const updateObject = {
        data:{
            collateral: {
                id: this.state.collateralId,
                collateralStatus: "pending-inspection",
                otherCollateralName: this.state.otherCollateralName
            }
        }
    }
     delete updateObject.isFormValid
     delete updateObject.saving
     delete updateObject.error
     delete updateObject.collateralId
    
     if(!updateObject.data.collateral.otherCollateralName){
         updateObject.data.collateral.otherCollateralName = null
     }
   
     this.setState({
        saving: true,
        collateralId: collateralId
     })
     const updatedLoan = await updateLoan(updateObject,this.props.loggedInUser.currentLoan.id)
   
     if(updatedLoan.hasOwnProperty('error')){
        this.setState({
            error: 'something went wrong, try again',
            saving: false,
            collateralId: collateralId
        })
        return
     }
     this.setState({
        error: null,
        saving: false,
        saved: true,
        collateralId: collateralId
    },()=>{
        this.checkFormValidity()
    })
  }

  
  handleFinishLoanApplication = async ()=>{
    const updatedLoan = await updateLoan({data: {loanStatus: 'pending-collateral-inspection',loanType : { connect: [this.props.constants.loanTypesIds.landCollateralLoans] }}},this.props.loggedInUser.currentLoan.id)
    if(!updatedLoan.hasOwnProperty('error')){
        const applicationDate =  dateAndTimeNow()
        const transactionHistoryObject = {
            transactionType: "loan-application",
            transactionDate: applicationDate,
            amount: updatedLoan.loanAmount,
            description: "Initiation of the loan, with id #"+updatedLoan.id+ ", and amount K"+updatedLoan.loanAmount,
            loan: {connect: [updatedLoan.id]}
        }
        const notificationObject = {
            title: "A new asset loan of collateral named as "+this.state.otherCollateralName+", with id "+updatedLoan.id+ ", and amount K"+updatedLoan.loanAmount+" has been initiated on VectorFin",
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

handleOpenErrorSnapBack = ()=>{
       this.setState({
         openErrorSnapBack: false 
       })
  }

  handleNextButton = ()=>{
    const {isFormValid,saved} = this.state
    if(!isFormValid){
      this.setState({
        openErrorSnapBack: true,
        errorMessage: 'Please ensure all fields are filled and saved before you can proceed.'
      })
      return
    }
    if(!saved){
      this.setState({
        openErrorSnapBack: true,
        errorMessage: 'Please save the form to proceed.'
      })
      return
    }
    this.handleFinishLoanApplication()
  }

  render() {
    const { otherCollateralName, saved, isFormValid , collateralId, collateralMedia } = this.state;

    return (
        <Slide in={true} direction="up">
        <div className="row">
        {this.state.openErrorSnapBack? <WarningSnapBack handleOpenErrorSnapBack={this.handleOpenErrorSnapBack} errorMessage={this.state.errorMessage}/> : null}
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header align-items-center d-flex">
                <h4 className="card-title mb-0 flex-grow-1">Collateral Details </h4>
              </div>
              <div className="card-body">
                <div className="live-preview">
                  <div className="row gy-4">
                    <div className="col-xxl-3 col-md-6 col-lg-12">
                      <div>
                        <label htmlFor="lastnameInput" className="form-label">
                          Other Collateral Name
                        </label>
                        <p><small  style={{color:'lightgray'}}>(Plot No. Area City Province)</small></p>
                        <input
                          disabled={!this.state.collateralId}
                          className="form-control"
                          id="lastnameInput"
                          name="otherCollateralName"
                          type="text"
                          autoComplete="off"
                          value={otherCollateralName}
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                
                  {this.state.collateralId && this.props.constants.loansInformation.allowClientsToAddCollateralMedia && this.props.constants.loansInformation.allowClientsToAddCollateralMedia === "no"? <>
                  <hr style={{color:'lightgray'}}/>
                  <div style={{marginTop:'20px'}}>
                       Photo of collateral
                      <CollateralMedia
                        mediaSlots={['image']}
                        media={collateralMedia}
                        onAdd={this.handleAddCollateralMedia}
                        onRemove={this.handleRemoveCollateralMedia}
                        refId={collateralId}
                      />
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
                      onClick={() => { this.handleNextButton() }}
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