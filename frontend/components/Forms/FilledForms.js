"use client";

import { api_url, backEndUrl, getJwt } from "@/Constants";
import { dateAndTimeNow, getImage, logNewAdminNotification, logNewNotification, logNewTransactionHistory, updateLoan, updateUserAccount } from "@/Functions";
import React from "react";
import Uploader from "../Includes/Uploader/Uploader";
import { Download } from "@mui/icons-material";

export default class FilledForms extends React.Component {
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
      error:null,
      signedForms: [],
      applicationForms: [],
      toSignApplicationForms: [],
      forms: []
    };
  }

  getFormsToFill = async()=>{
    return await fetch(api_url+'/users/me?populate=formsToFill.form', {
        headers: {
         'Authorization': `Bearer ${getJwt()}`,
         'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => data)
  }
 

  getApplicationForms= async()=>{
     const userWithUpdatedForms = await fetch(api_url+'/users/me?populate=applicationForms.signedForm', {
        headers: {
         'Authorization': `Bearer ${getJwt()}`,
         'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => data)

      const toSignApplicationForms = userWithUpdatedForms.applicationForms.map((applicationForm)=>{
        return {formName: applicationForm.formName,id: applicationForm.id}
      })

      this.setState({
        toSignApplicationForms: toSignApplicationForms
      },()=>{
        console.log(this.state)
      })
      return userWithUpdatedForms.applicationForms
  }
 
  createApplicationForms = async (forms)=>{
    if(this.props.loggedInUser.applicationForms.length > 0){
      if(this.props.loggedInUser.applicationForms.length !== forms.length){
          const newFormsToFill = this.props.loggedInUser.applicationForms.map((form)=>{
            return {
              formName: form.formName,
              id: form.id
            }
          })
          forms.forEach((form) => {
            if (!newFormsToFill.some((formToFill) => formToFill.formName === form.formName)) {
              newFormsToFill.push({
                formName: form.formName
              });
            }
          });
          
          console.log(newFormsToFill)
          const updatedUser = await updateUserAccount({applicationForms:newFormsToFill},this.props.loggedInUser.id)
          return
      }
      return
    } // means you have already created the forms to be signed list
    //applicationForms 
    const applicationFormsObject = forms.map((form)=>{
      return {
        formName: form.formName
      }
    })
    console.log(applicationFormsObject)
  //  user.applicationForms[0].id
    const updatedUser = await updateUserAccount({applicationForms:applicationFormsObject},this.props.loggedInUser.id)
    if(!updatedUser.hasOwnProperty('error')){
       this.getApplicationForms()
    }
  }

  checkIfFormExistInApplicationForms = (formName,applicationForms) =>{
    console.log(formName)
    console.log(applicationForms)
    const applicationForm = applicationForms.filter((applicationForm)=>{
          if(applicationForm.formName === formName){
            return true
          }
    })
    return applicationForm
  }

  async componentDidMount() {
    const forms = await this.getFormsToFill() 
    this.createApplicationForms(forms.formsToFill)
    const applicationForms = await this.getApplicationForms()
    this.checkFormValidity() // in case a user already uploaded the scanned documents
    this.getApplicationForms() // get the appplication form ids in which we shall upload the files to
    
    const signedForms = forms.formsToFill.map((formToFill)=>{
      return {
           formName: formToFill.formName,
           filled: formToFill.form? true : false, // if the form is already set, then it's set
           file: null
      }
    })
    
    this.setState({
      forms: forms.formsToFill,
      applicationForms: applicationForms,
      signedForms: signedForms
    }, ()=>{ 
      if(applicationForms.length > 0){
        signedForms.map((signedForm)=>{
          console.log(signedForm.formName,applicationForms)
          const formExists = this.checkIfFormExistInApplicationForms(signedForm.formName,applicationForms)
          if(formExists.length > 0){
            signedForm.file = formExists // add the file then
          }
          return signedForm
        })
        this.setState({
          signedForms: signedForms
        },()=>{
          console.log(this.state)
        })
      }
    })
  }

  renderDownloadFormsButtons = (forms) => {
    return forms.map((formItem) => {
      if(!formItem.form){
        return <></>
      }
      return formItem.form.map((file) => {
        return (
          <div>
               <a 
                key={file.id} 
                href={backEndUrl + file.url} 
                download={file.name} 
                className="btn btn-danger mb-2" 
              >
                <Download/>
                Download {file.name}
              </a>
          </div>
        )
      });
    });
  };
  

  checkFormValidity = async () => {
    const { signedForms } = this.state;
   
    const applicationForms = await this.getApplicationForms()
    const { formsToFill } = this.props.loggedInUser
    const signedFormsCheck = applicationForms.map((form)=>{
        return form.signedForm
    })
    const isFormValid = !signedFormsCheck.includes(null) // check if signed form includes only signed forms
    this.setState({ isFormValid });
  }

  addSignedForm = async (formName,file) => {
        const applicationForms = await this.getApplicationForms()
        const newSignedForms = this.state.signedForms.map((signedForm)=>{
            if(signedForm.formName === formName){
                signedForm.filled = true,
                signedForm.file = file
            }
            return signedForm
        })
        this.setState({
            signedForms: newSignedForms,
            applicationForms: applicationForms
        },()=>{
            this.checkFormValidity()
        })
  } 

  handleRemoveImage = async (uploadid,formName)=>{
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
       const newSignedFormsArray = this.state.signedForms.filter((signedForm)=>{
           return signedForm.formName !== formName
       })
       const newApplicationFormsArray = this.state.applicationForms.filter((applicationForm)=>{
           return applicationForm.formName !== formName
       })
       this.setState({
           signedForms: newSignedFormsArray,
           applicationForms: newApplicationFormsArray
       },()=>{
        this.checkFormValidity()
       })
       // remove from the dom
       if(typeof document !== 'undefined'){
         document.getElementById("#"+uploadid).style.display = "none"
       }
     } 
}

  renderFiles = (signedForms,formName)=>{
    if(signedForms.length < 1){
      return <></>
    }
    const form = signedForms.filter((signedForm)=>{
      return signedForm.formName === formName
    })
    if(form.length < 1){
      return <></>
    }
    const files = form[0].signedForm
    console.log(files)
    if(!files){
        return <></>
    }
    return files.map((file)=>{
        if(file.mime.startsWith('application/')){
            return (<div className="mb-2" id={"#"+file.id} key={file.id}>
                        <div>File: <strong>{file.name}</strong></div>
                        <button className="btn btn-sm btn-danger" onClick={()=>{this.handleRemoveImage(file.id,formName)}}>Remove</button>
                        <hr style={{color:'lightgray'}}/>
                   </div>)
        }
        else if(file.mime.startsWith('image/')){
            return (<div className="mb-2" id={"#"+file.id} key={file.id}>
                        <img className="mt-1 mb-1" style={{width:'35%'}} src={getImage(file,"thumbnail")} />
                        <button className="btn btn-sm btn-danger" onClick={()=>{this.handleRemoveImage(file.id,formName)}}>Remove</button>
                        <hr style={{color:'lightgray'}}/>
                   </div>)
        }
        else{
            return (<div className="mb-2" id={"#"+file.id} key={file.id}>
                      <p className="text text-warning">File failed to be displayed</p>
                      <button className="btn btn-sm btn-danger" onClick={()=>{this.handleRemoveImage(file.id,formName)}}>Remove</button>
                      <hr style={{color:'lightgray'}}/>
                   </div>)
        }
    })
  }
 
  renderApplicationForms = (toSignApplicationForms,signedForms)=>{
    return toSignApplicationForms.map((toSignApplicationForm)=>{
      return <div key={toSignApplicationForm.id}>
              <p>Signed <span style={{textTransform:'capitalize',fontWeight:'bold'}}>{toSignApplicationForm.formName}</span></p>
              <Uploader 
                    handleSignedForm={this.addSignedForm}
                    formName={toSignApplicationForm.formName}
                    displayType="circular"
                    refId={toSignApplicationForm.id}
                    refName="forms.application-forms"
                    fieldName="signedForm"
                    allowMultiple={false}
                    allowedTypes={['image/*', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
                />
                <small  style={{color:'lightgray'}}>(image or document)</small>
                {this.renderFiles(this.state.applicationForms,toSignApplicationForm.formName)}
      </div>
    })
  }


  handleCompleteLoanApplication = async ()=>{
    const updatedLoan = await updateLoan({data: {loanStatus: 'pending-approval'}},this.props.loggedInUser.currentLoan.id)
    if(!updatedLoan.hasOwnProperty('error')){
        const applicationDate =  dateAndTimeNow()
        const transactionHistoryObject = {
            transactionType: "loan-application",
            transactionDate: applicationDate,
            amount: updatedLoan.loanAmount,
            description: "Documents signing completion of the loan, with id: "+updatedLoan.id,
            loan: {connect: [updatedLoan.id]}
        }
        const notificationObject = {
            title: "A client has signed documents to the loan with id "+updatedLoan.id,
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

  render() {
    return (
      <>
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header align-items-center d-flex">
                <h4 className="card-title mb-0 flex-grow-1">Final Documents Signings </h4>
              </div>
              <div className="card-body">
                <div className="live-preview">
                  <div className="mb-3">{this.renderDownloadFormsButtons(this.state.forms)}</div>
                  {
                    this.state.toSignApplicationForms.length > 0? this.renderApplicationForms(this.state.toSignApplicationForms,this.state.signedForms) : <></>
                  }
                 {this.state.error? <p className="text text-danger">{this.state.error}</p> : <></>}
                 <p className="text text-warning mt-2">Note that all the information you provide here is kept strictly confidential, and it's solely meant for verification and loan eligibility determination purposes</p>
                  
                </div>
                {/* Save and Next Buttons */}
                 
                <div style={{ width: "100%"}}>
                        <button
                          type="button"
                          className="btn btn-danger w-90 mt-3"
                          id="next-btn"
                          disabled={!this.state.isFormValid}
                          onClick={this.handleCompleteLoanApplication}
                        >
                          Submit Application
                        </button>
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