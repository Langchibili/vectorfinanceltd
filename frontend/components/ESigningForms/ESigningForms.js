"use client";

import React from "react";
import { api_url, getJwt } from "@/Constants";
import { Zoom } from "@material-ui/core";
import SaveSignature from "../Includes/SaveSignature/SaveSignature";
import LoadForm from "./LoadForm";
import { dateAndTimeNow, logNewAdminNotification, logNewNotification, logNewTransactionHistory, scrolltoTopOFPage, updateLoan, updateUserAccount } from "@/Functions";

export default class ESigningForms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forms: [],
      formToDisplay: null,
      filledForms: [],
      isLastForm: false,
      showSignatureForm: false
    }
  }

  getFormsToFill = async () => {
    try {
      const response = await fetch(`${api_url}/users/me?populate=formsToFill.form`, {
        headers: {
          Authorization: `Bearer ${getJwt()}`,
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();
      this.setState({ forms: data.formsToFill });
    } catch (error) {
      this.setState({ error: "Failed to load forms." });
    }
  };

  renderForms = () => {
    return this.state.forms.map((formItem) => (
      formItem.form &&
      formItem.form.map((file) => (
        <div key={file.id}>
          <button className="btn btn-danger mb-2">{file.name}</button>
        </div>
      ))
    ))
  }

  handShowSignatureForm = ()=>{
    this.setState({
      showSignatureForm: true
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
              description: "Documents signing completion of the loan, with id #"+updatedLoan.id+ ", and amount K"+updatedLoan.loanAmount,
              loan: {connect: [updatedLoan.id]}
          }
          const notificationObject = {
              title: "A client has signed documents to the loan with id "+updatedLoan.id+ ", and amount K"+updatedLoan.loanAmount+" on VectorFin",
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
  
  handleRenderNextForm = ()=>{
    const forms = this.state.forms
    if(forms[1]){
      console.log(forms)
      const filledForms = this.state.filledForms
      const formToDisplay = this.state.formToDisplay
      filledForms.push(formToDisplay) // add the current form into the filledForms stack
      this.setState({
        formToDisplay: forms[1],
        filledForms: filledForms,
        showSignatureForm: false,
        forms: forms.filter(form => form.id !== formToDisplay.id)
      })
      
    }
    else{ // means this is the very last form so the user can finalize the loan
      this.setState({
        isLastForm: true
      })
    }
  }
  handleRenderPreviousForm = ()=>{
    const filledForms = this.state.filledForms
    const forms = this.state.forms
    const formToDisplay = this.state.formToDisplay
    forms.unshift(formToDisplay)
    if(filledForms.length > 0){
        const previousForm = filledForms[filledForms.length - 1]
        filledForms.pop() // remove the last form in the filledForms stack
        this.setState({
          formToDisplay: previousForm, // display the last form because it's a stack
          filledForms: filledForms,
          forms: forms,
          showSignatureForm: false
        })
    }
    else{
      this.setState({
        showSignatureForm: true, // then you are at the end of the previous pages,
        isLastForm: false
      })
    }
  }

  handleShowFirstForm = ()=>{
    const forms = this.state.forms
    if(forms[0]){
      this.setState({
        showSignatureForm : false,
        formToDisplay: forms[0]
      })
    }
  }

  handleShowFormsToSignPage = ()=>{
    this.setState({
      showSignatureForm : false,
      formToDisplay: null
    })
  }

  async componentDidMount() {
    this.getFormsToFill();
    scrolltoTopOFPage()
  }



  render() {
    if(this.state.showSignatureForm){
      return <SaveSignature loggedInUser={this.props.loggedInUser}handleShowFormsToSignPage={this.handleShowFormsToSignPage} handleShowFirstForm={this.handleShowFirstForm}/>
    }
    if(this.state.formToDisplay){
      return <LoadForm 
                  handleRenderPreviousForm={this.handleRenderPreviousForm}
                  handleRenderNextForm={this.handleRenderNextForm}
                  handleCompleteLoanApplication={this.handleCompleteLoanApplication}
                  loggedInUser={this.props.loggedInUser} 
                  isLastForm={this.state.isLastForm}
                  form={this.state.formToDisplay}
              />
    }
    return (
      <Zoom in={true}>
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header align-items-center d-flex">
                <h4 className="card-title mb-0 flex-grow-1">Documents to Sign</h4>
              </div>
              <div className="card-body">
                <div className="live-preview"> 
                  <div className="mb-3">{this.renderForms()}</div>
                  {this.state.error && <p className="text text-danger">{this.state.error}</p>}
                  <p className="text text-warning mt-2">
                    Note that all the information you provide here is kept strictly confidential, and it's solely meant for verification and loan eligibility determination purposes.
                  </p>
                </div>
                <div style={{ width: "100%" }}>
                  <button
                    onClick={this.handShowSignatureForm}
                    type="button"
                    className="btn btn-success w-90 mt-3"
                  >
                    Proceed
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Zoom>
    );
  }
}
