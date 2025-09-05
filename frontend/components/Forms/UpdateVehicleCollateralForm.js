"use client";

import { api_url, backEndUrl, getJwt } from "@/Constants";
import { dateAndTimeNow, getImage, getLoanFromId, logNewAdminNotification, logNewNotification, logNewTransactionHistory, updateLoan, updateUserAccount } from "@/Functions";
import React from "react";
import Uploader from "../Includes/Uploader/Uploader";
import CollateralMedia from "../Includes/CollateralMedia/CollateralMedia";
import { Alert } from "@mui/material";
import { Slide } from "@material-ui/core";
import WarningSnapBack from "../Includes/SnapBacks/WarningSnapBack";

export default class UpdateVehicleCollateralForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collateralType: '',
      isFormValid: false,
      saving: false,
      collateralId: '',
      vehicleId: null,
      error: null,
      whitebook: null,
      numberPlate: '',
      packed: '',
      saved: false,
      openErrorSnapBack: false,
      errorMessage: '',
      insuranceType: '',         // 'comprehensive' or 'third-party'
      insuranceRequest: null,    // 'African Gray', 'other', or null
      // new collateral media slots
      collateralMedia: {
        front: null,
        back: null,
        right: null,
        left: null
      }
    }
  }

  async componentDidMount() {
    const { collateral } = await getLoanFromId(this.props.loggedInUser.currentLoan.id, "collateral.vehicle.whitebook,collateral.CollateralMedia");
    // existing logic for initializing whitebook and vehicle fields...
    const newVehicleObject = { numberPlate: null, packed: null };
    const newCollaterallObject = { data: { collateral: { collateralType: "vehicle", vehicle: newVehicleObject } } };
    if (!collateral) {
      const updatedLoan = await updateLoan(newCollaterallObject, this.props.loggedInUser.currentLoan.id);
      if (!updatedLoan || !updatedLoan.error) {
        const { collateral: fresh } = await getLoanFromId(this.props.loggedInUser.currentLoan.id, "collateral.vehicle.whitebook,collateral.CollateralMedia");
        const { vehicle } = fresh;
        this.setState({
          collateralId: fresh.id,
          vehicleId: vehicle.id,
          collateralType: fresh.collateralType || '',
          whitebook: vehicle.whitebook?.data || '',
          collateralMedia: {
            front: fresh?.CollateralMedia?.data?.[0] ?? null,
            back: fresh?.CollateralMedia?.data?.[1] ?? null,
            right: fresh?.CollateralMedia?.data?.[2] ?? null,
            left: fresh?.CollateralMedia?.data?.[3] ?? null
          },
          numberPlate: vehicle.numberPlate || '',
          packed: vehicle.packed || ''
        })
      }
    } else {
      const { vehicle } = collateral;
      if (!vehicle) {
        newCollaterallObject.data.collateral.id = collateral.id;
        newCollaterallObject.data.collateral.collateralType = collateral.collateralType;
        const updatedLoan = await updateLoan(newCollaterallObject, this.props.loggedInUser.currentLoan.id);
        if (!updatedLoan.error) {
          const { collateral: fresh } = await getLoanFromId(this.props.loggedInUser.currentLoan.id, "collateral.vehicle.whitebook");
          const { vehicle: veh } = fresh;
          this.setState({
            collateralId: fresh.id,
            vehicleId: veh.id,
            collateralType: fresh.collateralType || '',
            whitebook: veh.whitebook?.data || '',
            collateralMedia: {
              front: fresh?.CollateralMedia?.data?.[0] ?? null,
              back: fresh?.CollateralMedia?.data?.[1] ?? null,
              right: fresh?.CollateralMedia?.data?.[2] ?? null,
              left: fresh?.CollateralMedia?.data?.[3] ?? null
            },
            numberPlate: veh.numberPlate || '',
            packed: veh.packed || ''
          });
        }
      } else {
        this.setState({
          collateralId: collateral.id,
          vehicleId: collateral.vehicle.id,
          collateralType: collateral.collateralType || '',
          whitebook: vehicle.whitebook?.data || '',
          collateralMedia: {
            front: collateral?.CollateralMedia?.data?.[0] ?? null,
            back: collateral?.CollateralMedia?.data?.[1] ?? null,
            right: collateral?.CollateralMedia?.data?.[2] ?? null,
            left: collateral?.CollateralMedia?.data?.[3] ?? null
          },
          numberPlate: vehicle.numberPlate || '',
          packed: vehicle.packed || ''
        }, () => this.checkFormValidity(true));
      }
    }
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value || '', saved: false }, this.checkFormValidity);
  }

  // checkFormValidity = (initialCheck = false) => {
  //   const { numberPlate, packed, whitebook, collateralMedia } = this.state;
  //   const collateralMediaSet = this.props.constants.loansInformation.allowClientsToAddCollateralMedia && this.props.constants.loansInformation.allowClientsToAddCollateralMedia === "no"? true : collateralMedia.front && collateralMedia.back && collateralMedia.left && collateralMedia.right
  //   const isFormValid = numberPlate.trim() && packed && whitebook && collateralMediaSet;
  //   if (!initialCheck) {
  //     this.setState({ isFormValid });
  //   } else {
  //     this.setState({ isFormValid, saved: isFormValid });
  //   }
  // }
  checkFormValidity = (initialCheck = false) => {
  const { numberPlate, packed, whitebook, collateralMedia, insuranceType, insuranceRequest } = this.state;
  const collateralMediaSet = this.props.constants.loansInformation.allowClientsToAddCollateralMedia && this.props.constants.loansInformation.allowClientsToAddCollateralMedia === "no"? true : collateralMedia.front && collateralMedia.back && collateralMedia.left && collateralMedia.right;
  let isFormValid = numberPlate.trim() && packed && whitebook && collateralMediaSet && insuranceType;
  if (insuranceType === "third-party") {
    isFormValid = isFormValid && insuranceRequest;
  }
  if (!initialCheck) {
    this.setState({ isFormValid });
  } else {
    this.setState({ isFormValid, saved: isFormValid });
  }
}


  /* 
    session letter for comprehenis isniuuf
      - to use to reco
    if no, i will the vector for 
       - you have 
    must recognize vector 

  */

  handleSubmit = async (e) => {
    e.preventDefault();
    const { numberPlate, packed, collateralId, vehicleId, insuranceType, insuranceRequest } = this.state;
    if (!numberPlate || !packed) {
      this.setState({ error: 'Please ensure all fields are filled.', saving: false });
      return;
    }
    if (!insuranceType) {
    this.setState({ error: 'Please select the type of insurance for the vehicle.', saving: false });
    return;
    }
    if (insuranceType === "third-party" && !insuranceRequest) {
      this.setState({ error: 'Please select how you will purchase comprehensive insurance.', saving: false });
      return;
    }
    const updateObject = {
      data: {
        insuranceRequest,
        collateral: {
          id: collateralId,
          collateralStatus: "pending-inspection",
          vehicle: { id: vehicleId, numberPlate, packed, insuranceType }
        }
      }
    }
    this.setState({ saving: true, error: null });
    const updatedLoan = await updateLoan(updateObject, this.props.loggedInUser.currentLoan.id);
    if (updatedLoan.error) {
      this.setState({ error: 'Something went wrong, try again.', saving: false });
      return;
    }
    this.setState({ saving: false, saved: true }, this.checkFormValidity);
  }

  addWhiteBook = (files) => {
    this.setState(prev => ({ whitebook: prev.whitebook ? [...prev.whitebook, ...files] : files, saved: false, error: null }), this.checkFormValidity);
  }

  // handlers for the new collateral media
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

  // existing methods: handleFinishLoanApplication, handleOpenErrorSnapBack, handleNextButton, handleRemoveImage, renderFiles, renderPackingWarning...
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

  renderPackingWarning = ()=>{
    if(this.state.packed){
      if(this.state.packed === "no"){
        return  <Alert severity="info">By choosing to keep the vehicle, you agree to having us place a <strong>tracker</strong> on your vehicle</Alert>
      }
      else{
        return <Alert severity="info">By choosing to park the vehicle with us, you agree to paying an agreed <strong>parking fee</strong>.</Alert>
      }
    }
    else{
      return <></>
    }
  }

  handleOpenErrorSnapBack = ()=>{
         this.setState({
           openErrorSnapBack: false 
         })
  }

    handleFinishLoanApplication = async ()=>{
    const updatedLoan = await updateLoan({data: {loanStatus: 'pending-collateral-inspection',loanType : { connect: [this.props.constants.loanTypesIds.vehicleCollateralLoans] }}},this.props.loggedInUser.currentLoan.id)
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
          title: "A new asset loan of vehicle collateral, with id "+updatedLoan.id+ ", and amount K"+updatedLoan.loanAmount+" has been initiated on VectorFin",
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
    const { numberPlate, packed, collateralId, vehicleId, whitebook, collateralMedia } = this.state;

    return (
      <Slide in direction="up">
        <div className="row">
          {this.state.openErrorSnapBack && (
            <WarningSnapBack handleOpenErrorSnapBack={this.handleOpenErrorSnapBack} errorMessage={this.state.errorMessage} />
          )}
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header align-items-center d-flex">
                <h4 className="card-title mb-0 flex-grow-1">Vehicle Details</h4>
              </div>
              <div className="card-body">
                <div className="live-preview">
                  {/* Vehicle inputs */}
                  <div className="row gy-4">
                    <div className="col-xxl-3 col-md-6 col-lg-12">
                      <label htmlFor="numberPlate" className="form-label">Vehicle Number Plate</label>
                      <input
                        id="numberPlate"
                        name="numberPlate"
                        className="form-control"
                        type="text"
                        disabled={!vehicleId}
                        value={numberPlate}
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <div className="col-lg-12">
                      <label className="form-label">Pack vehicle with us or keep it?</label>
                      <select
                        name="packed"
                        className="form-select"
                        disabled={!vehicleId}
                        value={packed}
                        onChange={this.handleInputChange}
                      >
                        <option value="">Choose...</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    {this.renderPackingWarning()}
                  </div>
<div className="col-lg-12 mt-3">
  <label className="form-label">Type of Insurance</label>
  <select
    name="insuranceType"
    className="form-select"
    value={this.state.insuranceType}
    onChange={e => this.setState({ insuranceType: e.target.value, insuranceRequest: null, saved: false }, this.checkFormValidity)}
  >
    <option value="">Choose...</option>
    <option value="comprehensive">Comprehensive</option>
    <option value="third-party">Third Party</option>
  </select>
</div>

{this.state.insuranceType === "comprehensive" && (
  <Alert severity="info" className="mt-2">
    After you complete the loan application, please note that you shall be sent a document called a session letter request, which you must fill with your details and send to your insurance company, either in person or via email or whatsapp, and after a few hours, or days, your insurance must send us the document either through email, through you or any other digital means. You can contact us for more information on this once you complete your application.
  </Alert>
)}

{this.state.insuranceType === "third-party" && (
  <>
    <Alert severity="warning" className="mt-2">
      You have a third party insurance, we only give out loans to clients with vehicles registered under comprehensive insurance. Please ensure that you purchase a comprehensive insurance by following the steps listed below and shall be listed after you complete your application.
    </Alert>
    <div className="mt-3">
      <label className="form-label">How will you purchase comprehensive insurance?</label>
      <select
        name="insuranceRequest"
        className="form-select"
        value={this.state.insuranceRequest || ''}
        onChange={e => this.setState({ insuranceRequest: e.target.value, saved: false }, this.checkFormValidity)}
      >
        <option value="">Choose...</option>
        <option value="African Gray">Buy From African Gray (Recommended)</option>
        <option value="other">Buy from other</option>
      </select>
    </div>
    {this.state.insuranceRequest === "African Gray" && (
      <Alert severity="info" className="mt-2">
        Because you have chosen to buy comprehensive insurance from African Gray, you will not have to obtain a session letter. We shall send you a quotation soon after you complete your application.
      </Alert>
    )}
    {this.state.insuranceRequest === "other" && (
      <Alert severity="info" className="mt-2">
        You have chosen to buy your comprehensive insurance from another company other than the recommended African Gray. We shall require a session letter from them the soonest you purchase it. Details shall be shown the moment you complete your loan application.
      </Alert>
    )}
  </>
)}

                  {vehicleId && (
                    <>
                      {/* Whitebook Uploader */}
                      <hr style={{ color: 'lightgray' }} />
                      <h5>Copy Of Whitebook</h5>
                      <Uploader
                        addFiles={this.addWhiteBook}
                        displayType="circular"
                        refId={vehicleId}
                        refName="media-and-documents.vehicle"
                        fieldName="whitebook"
                        allowMultiple={false}
                        allowedTypes={[ 'image/*', 'application/pdf' /* etc */ ]}
                      />
                      {this.renderFiles(whitebook, 'whitebook')}

                      {/* Collateral Media */}
                      {this.props.constants.loansInformation.allowClientsToAddCollateralMedia && this.props.constants.loansInformation.allowClientsToAddCollateralMedia === "no"? null : 
                      <><hr style={{ margin: '30px 0', color: 'lightgray' }} />
                      <h5>Vehicle Collateral Media</h5>
                      <CollateralMedia
                        mediaSlots={[ 'front', 'back', 'right', 'left' ]}
                        media={collateralMedia}
                        onAdd={this.handleAddCollateralMedia}
                        onRemove={this.handleRemoveCollateralMedia}
                        refId={collateralId}
                      /></>}
                    </>
                  )}

                  {/* Actions */}
                  <div className="d-flex justify-content-between mt-4">
                    <button
                      type="button"
                      className="btn btn-success w-90"
                      onClick={this.handleSubmit}
                      disabled={this.state.saving}
                    >
                      {this.state.saving ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger w-90"
                      onClick={this.handleNextButton}
                    >
                      Complete
                    </button>
                  </div>
                  {this.state.error && <p className="text text-danger mt-2">{this.state.error}</p>}
                  <p className="text text-warning mt-2">
                    Note that all the information you provide here is kept strictly confidential...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slide>
    );
  }
}
