// "use client";

// import React from "react";
// import { api_url, getJwt } from "@/Constants";
// import { Zoom } from "@material-ui/core";
// import SaveSignature from "../Includes/SaveSignature/SaveSignature";
// import LoadForm from "./LoadForm";
// import { dateAndTimeNow, logNewAdminNotification, logNewNotification, logNewTransactionHistory, scrolltoTopOFPage, updateLoan, updateUserAccount } from "@/Functions";
// import { Alert } from "@mui/material";

// export default class ESigningForms extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       forms: [],
//       formToDisplay: null,
//       filledForms: [],
//       toSignApplicationForms: [],
//       isLastForm: false,
//       showSignatureForm: false,
//       getWitnessSignature: false,
//       signature: this.props.loggedInUser.signature,
//       initials : this.props.loggedInUser.initials,
//       witnessSignature: this.props.loggedInUser.witnessSignature,
//       witnessInitials : this.props.loggedInUser.witnessInitials
//     }
//   }

//   getFormsToFill = async () => {
//     try {
//       const response = await fetch(`${api_url}/users/me?populate=formsToFill.form`, {
//         headers: {
//           Authorization: `Bearer ${getJwt()}`,
//           "Content-Type": "application/json"
//         }
//       });
//       const data = await response.json();
//       this.setState({ forms: data.formsToFill })
//       return data.formsToFill
//     } catch (error) {
//       this.setState({ error: "Failed to load forms." });
//     }
//   }

//   getApplicationForms= async()=>{
//     const userWithUpdatedForms = await fetch(api_url+'/users/me?populate=applicationForms.signedForm', {
//        headers: {
//         'Authorization': `Bearer ${getJwt()}`,
//         'Content-Type': 'application/json'
//        }
//      })
//      .then(response => response.json())
//      .then(data => data)

//      const toSignApplicationForms = userWithUpdatedForms.applicationForms.map((applicationForm)=>{
//        return {formName: applicationForm.formName,id: applicationForm.id}
//      })

//      this.setState({
//        toSignApplicationForms: toSignApplicationForms
//      },()=>{
//        console.log(this.state)
//      })
//      return userWithUpdatedForms.applicationForms
//  }

//  createApplicationForms = async (forms)=>{
//    if(this.props.loggedInUser.applicationForms.length > 0){
//      if(this.props.loggedInUser.applicationForms.length !== forms.length){
//          const newFormsToFill = this.props.loggedInUser.applicationForms.map((form)=>{
//            return {
//              formName: form.formName,
//              id: form.id
//            }
//          })
//          forms.forEach((form) => {
//            if (!newFormsToFill.some((formToFill) => formToFill.formName === form.formName)) {
//              newFormsToFill.push({
//                formName: form.formName
//              });
//            }
//          });

//          console.log(newFormsToFill)
//          const updatedUser = await updateUserAccount({applicationForms:newFormsToFill},this.props.loggedInUser.id)
//          return
//      }
//      return
//    } // means you have already created the forms to be signed list
//    //applicationForms 
//    const applicationFormsObject = forms.map((form)=>{
//      return {
//        formName: form.formName
//      }
//    })
//    console.log(applicationFormsObject)
//  //  user.applicationForms[0].id
//    const updatedUser = await updateUserAccount({applicationForms:applicationFormsObject},this.props.loggedInUser.id)
//    if(!updatedUser.hasOwnProperty('error')){
//       this.getApplicationForms()
//    }
//  }

//   renderForms = () => {
//     return this.state.forms.map((formItem) => (
//       formItem.form &&
//       formItem.form.map((file) => (
//         <div key={file.id}>
//           <button className="btn btn-danger mb-2">{file.name}</button>
//         </div>
//       ))
//     ))
//   }

//   handShowSignatureForm = ()=>{
//     this.setState({
//       showSignatureForm: true
//     })
//   }

//    handleCompleteLoanApplication = async ()=>{
//       const updatedLoan = await updateLoan({data: {loanStatus: 'pending-approval'}},this.props.loggedInUser.currentLoan.id)
//       if(!updatedLoan.hasOwnProperty('error')){
//           const applicationDate =  dateAndTimeNow()
//           const transactionHistoryObject = {
//               transactionType: "loan-application",
//               transactionDate: applicationDate,
//               amount: updatedLoan.loanAmount,
//               description: "Documents signing completion of the loan, with id #"+updatedLoan.id+ ", and amount K"+updatedLoan.loanAmount,
//               loan: {connect: [updatedLoan.id]}
//           }
//           const notificationObject = {
//               title: "A client has signed documents to the loan with id "+updatedLoan.id+ ", and amount K"+updatedLoan.loanAmount+" on VectorFin",
//               type: "alert"
//           }
//           const transactionHistory = await logNewTransactionHistory({data:transactionHistoryObject})
//           const newNotitifcation = await logNewNotification({data:notificationObject})
//           if(!transactionHistory.hasOwnProperty('error')){
//             const userUpdateObject = {
//                 transactionHistories: {connect: [transactionHistory.id]},
//                 activities: {connect: [newNotitifcation.id]}
//             }
//             const updatedUserAccount = await updateUserAccount(userUpdateObject,this.props.loggedInUser.id)
//             if(!updatedUserAccount.hasOwnProperty('error')){
//                 const AdminNotificationBody = {
//                     loan: {connect: [updatedLoan.id]},
//                     notification: {connect: [newNotitifcation.id]}
//                 }
//                 const newAdminNotification = await logNewAdminNotification({data:AdminNotificationBody})
//                 if(!newAdminNotification.hasOwnProperty('error')){
//                   window.location = "/"
//                 }
//             }
//         }

//        }
//        else{
//           // send a notification then redirect user
//           this.setState({
//             error: 'something went wrong, try again',
//             saving: false
//            })
//        }
//   }

//   handleRenderNextForm = (completeApplicationFunction)=>{
//     const forms = this.state.forms
//     if(forms[1]){
//       console.log(forms)
//       const filledForms = this.state.filledForms
//       const formToDisplay = this.state.formToDisplay
//       filledForms.push(formToDisplay) // add the current form into the filledForms stack
//       this.setState({
//         formToDisplay: forms[1],
//         filledForms: filledForms,
//         showSignatureForm: false,
//         forms: forms.filter(form => form.id !== formToDisplay.id)
//       })
//     }
//     else{ // means this is the very last form so the user can finalize the loan
//       if (typeof completeApplicationFunction === 'function') {
//         completeApplicationFunction()
//       }// run the complete the loan application function if this is the last form
//     }
//   }
//   handleRenderPreviousForm = ()=>{
//     const filledForms = this.state.filledForms
//     const forms = this.state.forms
//     const formToDisplay = this.state.formToDisplay
//     forms.unshift(formToDisplay)
//     if(filledForms.length > 0){
//         const previousForm = filledForms[filledForms.length - 1]
//         filledForms.pop() // remove the last form in the filledForms stack
//         this.setState({
//           formToDisplay: previousForm, // display the last form because it's a stack
//           filledForms: filledForms,
//           forms: forms,
//           showSignatureForm: false
//         })
//     }
//     else{
//       this.setState({
//         showSignatureForm: true, // then you are at the end of the previous pages,
//         isLastForm: false
//       })
//     }
//   }

//   handleShowFirstForm = ()=>{
//     const forms = this.state.forms
//     if(forms[0]){
//       this.setState({
//         showSignatureForm : false,
//         formToDisplay: forms[0]
//       })
//     }
//   }

//   handleShowFormsToSignPage = ()=>{
//     this.setState({
//       showSignatureForm : false,
//       formToDisplay: null
//     })
//   }

//   handleSignatureSave = (signature)=>{
//     this.setState({
//        signature:signature
//     })
//  }

//  handleInitialsSave = (initials)=>{
//     this.setState({
//        initials:initials
//     })
//  }

//  handleWitnessSignatureSave = (signature)=>{
//    this.setState({
//        witnessSignature:signature
//    })
//  }
//  handleWitnessInitialsSave = (witnessInitials)=>{
//    this.setState({
//        witnessInitials:witnessInitials
//    })
//  }

//   handleShowWitnessSignatureForm = ()=>{
//   this.setState({
//     getWitnessSignature: true
//   })
//  }

//  async componentDidMount() {
//   const forms = await this.getFormsToFill();
//   this.createApplicationForms(forms)
//   this.getApplicationForms()
//   scrolltoTopOFPage()
// }


//   render() {
//     if(this.state.showSignatureForm){
//       return <SaveSignature 
//                   handleSignatureSave={this.handleSignatureSave}
//                   handleInitialsSave={this.handleInitialsSave}
//                   handleWitnessSignatureSave={this.handleWitnessSignatureSave}
//                   handleWitnessInitialsSave={this.handleWitnessInitialsSave}
//                   handleShowWitnessSignatureForm={this.handleShowWitnessSignatureForm}
//                   getWitnessSignature={this.state.getWitnessSignature} 
//                   signature={this.state.signature}
//                   initials={this.state.initials}
//                   witnessInitials={this.state.witnessInitials}
//                   witnessSignature={this.state.witnessSignature}
//                   loggedInUser={this.props.loggedInUser} 
//                   handleShowFormsToSignPage={this.handleShowFormsToSignPage} 
//                   handleShowFirstForm={this.handleShowFirstForm}/>
//     }
//     if(this.state.formToDisplay){
//       return <LoadForm 
//                   constants={this.props.constants}
//                   handleRenderPreviousForm={this.handleRenderPreviousForm}
//                   handleRenderNextForm={this.handleRenderNextForm}
//                   handleCompleteLoanApplication={this.handleCompleteLoanApplication}
//                   signature={this.state.signature}
//                   witnessSignature={this.state.witnessSignature}
//                   loggedInUser={this.props.loggedInUser} 
//                   toSignApplicationForms={this.state.toSignApplicationForms /* formNames and ids of blank signedForm components */}
//                   isLastForm={this.state.isLastForm}
//                   form={this.state.formToDisplay}
//               />
//     }
//     return (
//       <Zoom in={true}>
//         <div className="row">
//           <Alert severity="info" style={{marginBottom:'15px'}}>Your loan application has been accepted, just a few more steps in order to finalize the process and disburse your funds.</Alert>
//           <div className="col-lg-12">
//             <div className="card">
//               <div className="card-header align-items-center d-flex">
//                 <h4 className="card-title mb-0 flex-grow-1">Documents to Sign</h4>
//               </div>
//               <div className="card-body">
//                 <div className="live-preview"> 
//                   <div className="mb-3">{this.renderForms()}</div>
//                   {this.state.error && <p className="text text-danger">{this.state.error}</p>}
//                   <p className="text text-warning mt-2">
//                     Note that all the information you provide here is kept strictly confidential, and it's solely meant for verification and loan eligibility determination purposes.
//                   </p>
//                 </div>
//                 <div style={{ width: "100%" }}>
//                   <button
//                     onClick={this.handShowSignatureForm}
//                     type="button"
//                     className="btn btn-success w-90 mt-3"
//                   >
//                     Proceed
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//          </div>
//       </Zoom>
//     );
//   }
// }
'use client'

import React from 'react'
import { api_url, getJwt } from '@/Constants'
import SaveSignature from '../Includes/SaveSignature/SaveSignature'
import LoadForm from './LoadForm'
import {
  dateAndTimeNow,
  logNewAdminNotification,
  logNewNotification,
  logNewTransactionHistory,
  scrolltoTopOFPage,
  updateLoan,
  updateUserAccount,
} from '@/Functions'

/* ─── colour tokens ─────────────────────────────────────────── */
const G = {
  page: '#0A0F1E',
  green1: '#059669',
  green2: '#10B981',
  green3: '#34D399',
  dim: 'rgba(255,255,255,0.06)',
  border: 'rgba(255,255,255,0.08)',
  muted: 'rgba(255,255,255,0.38)',
}

const card = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 18,
  padding: '22px 18px',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  marginBottom: 16,
}

const btnGreen = {
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  width: '100%', padding: '13px 0', fontSize: 14,
  background: 'linear-gradient(135deg,#059669 0%,#10B981 55%,#059669 100%)',
  color: '#fff', fontWeight: 700,
  border: 'none', borderRadius: 10,
  cursor: 'pointer',
  boxShadow: '0 4px 16px rgba(16,185,129,0.28)',
}

const sectionLabel = {
  fontSize: 9.5, fontWeight: 700, letterSpacing: '0.09em',
  textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)', marginBottom: 12,
}

const formRow = {
  display: 'flex', alignItems: 'center', gap: 12,
  padding: '10px 12px', borderRadius: 10,
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.08)',
  marginBottom: 8,
}

const pillPending = {
  marginLeft: 'auto', padding: '3px 10px', borderRadius: 100,
  background: 'rgba(245,158,11,0.12)', color: '#FBBF24',
  fontSize: 10, fontWeight: 700, letterSpacing: '0.05em',
  textTransform: 'uppercase',
}

function DocIco({ size = 15 }) {
  return (
    <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  )
}

function InfoIco() {
  return (
    <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )
}

function WarnIco() {
  return (
    <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
}

export default class ESigningForms extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      forms: [],
      formToDisplay: null,
      filledForms: [],
      toSignApplicationForms: [],
      isLastForm: false,
      showSignatureForm: false,
      getWitnessSignature: false,
      signature: this.props.loggedInUser.signature,
      initials: this.props.loggedInUser.initials,
      witnessSignature: this.props.loggedInUser.witnessSignature,
      witnessInitials: this.props.loggedInUser.witnessInitials,
    }
  }

  getFormsToFill = async () => {
    try {
      const response = await fetch(`${api_url}/users/me?populate=formsToFill.form`, {
        headers: { Authorization: `Bearer ${getJwt()}`, 'Content-Type': 'application/json' },
      })
      const data = await response.json()
      this.setState({ forms: data.formsToFill })
      return data.formsToFill
    } catch (error) {
      this.setState({ error: 'Failed to load forms.' })
    }
  }

  getApplicationForms = async () => {
    const userWithUpdatedForms = await fetch(
      api_url + '/users/me?populate=applicationForms.signedForm',
      { headers: { Authorization: `Bearer ${getJwt()}`, 'Content-Type': 'application/json' } }
    ).then((r) => r.json()).then((d) => d)

    const toSignApplicationForms = userWithUpdatedForms.applicationForms.map((f) => ({
      formName: f.formName,
      id: f.id,
    }))
    this.setState({ toSignApplicationForms }, () => console.log(this.state))
    return userWithUpdatedForms.applicationForms
  }

  createApplicationForms = async (forms) => {
    if (this.props.loggedInUser.applicationForms.length > 0) {
      if (this.props.loggedInUser.applicationForms.length !== forms.length) {
        const newFormsToFill = this.props.loggedInUser.applicationForms.map((f) => ({
          formName: f.formName, id: f.id,
        }))
        forms.forEach((form) => {
          if (!newFormsToFill.some((f) => f.formName === form.formName)) {
            newFormsToFill.push({ formName: form.formName })
          }
        })
        console.log(newFormsToFill)
        await updateUserAccount({ applicationForms: newFormsToFill }, this.props.loggedInUser.id)
        return
      }
      return
    }
    const applicationFormsObject = forms.map((form) => ({ formName: form.formName }))
    console.log(applicationFormsObject)
    const updatedUser = await updateUserAccount(
      { applicationForms: applicationFormsObject },
      this.props.loggedInUser.id
    )
    if (!updatedUser.hasOwnProperty('error')) {
      this.getApplicationForms()
    }
  }

  renderForms = () => {
    return this.state.forms.map((formItem) =>
      formItem.form &&
      formItem.form.map((file) => (
        <div key={file.id} style={formRow}>
          <div style={{ color: '#10B981' }}><DocIco /></div>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: '#fff' }}>{file.name}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)' }}>Loan agreement document</div>
          </div>
          <div style={pillPending}>Pending</div>
        </div>
      ))
    )
  }

  handShowSignatureForm = () => { this.setState({ showSignatureForm: true }) }

  handleCompleteLoanApplication = async () => {
    const updatedLoan = await updateLoan(
      { data: { loanStatus: 'pending-approval' } },
      this.props.loggedInUser.currentLoan.id
    )
    if (!updatedLoan.hasOwnProperty('error')) {
      const applicationDate = dateAndTimeNow()
      const transactionHistoryObject = {
        transactionType: 'loan-application',
        transactionDate: applicationDate,
        amount: updatedLoan.loanAmount,
        description: 'Documents signing completion of the loan, with id #' + updatedLoan.id + ', and amount K' + updatedLoan.loanAmount,
        loan: { connect: [updatedLoan.id] },
      }
      const notificationObject = {
        title: 'A client has signed documents to the loan with id ' + updatedLoan.id + ', and amount K' + updatedLoan.loanAmount + ' on VectorFin',
        type: 'alert',
      }
      const transactionHistory = await logNewTransactionHistory({ data: transactionHistoryObject })
      const newNotitifcation = await logNewNotification({ data: notificationObject })
      if (!transactionHistory.hasOwnProperty('error')) {
        const userUpdateObject = {
          transactionHistories: { connect: [transactionHistory.id] },
          activities: { connect: [newNotitifcation.id] },
        }
        const updatedUserAccount = await updateUserAccount(userUpdateObject, this.props.loggedInUser.id)
        if (!updatedUserAccount.hasOwnProperty('error')) {
          const AdminNotificationBody = {
            loan: { connect: [updatedLoan.id] },
            notification: { connect: [newNotitifcation.id] },
          }
          const newAdminNotification = await logNewAdminNotification({ data: AdminNotificationBody })
          if (!newAdminNotification.hasOwnProperty('error')) {
            window.location = '/'
          }
        }
      }
    } else {
      this.setState({ error: 'something went wrong, try again', saving: false })
    }
  }

  handleRenderNextForm = (completeApplicationFunction) => {
    const forms = this.state.forms
    if (forms[1]) {
      console.log(forms)
      const filledForms = this.state.filledForms
      const formToDisplay = this.state.formToDisplay
      filledForms.push(formToDisplay)
      this.setState({
        formToDisplay: forms[1],
        filledForms,
        showSignatureForm: false,
        forms: forms.filter((f) => f.id !== formToDisplay.id),
      })
    } else {
      if (typeof completeApplicationFunction === 'function') {
        completeApplicationFunction()
      }
    }
  }

  handleRenderPreviousForm = () => {
    const filledForms = this.state.filledForms
    const forms = this.state.forms
    const formToDisplay = this.state.formToDisplay
    forms.unshift(formToDisplay)
    if (filledForms.length > 0) {
      const previousForm = filledForms[filledForms.length - 1]
      filledForms.pop()
      this.setState({ formToDisplay: previousForm, filledForms, forms, showSignatureForm: false })
    } else {
      this.setState({ showSignatureForm: true, isLastForm: false })
    }
  }

  handleShowFirstForm = () => {
    const forms = this.state.forms
    if (forms[0]) this.setState({ showSignatureForm: false, formToDisplay: forms[0] })
  }

  handleShowFormsToSignPage = () => {
    this.setState({ showSignatureForm: false, formToDisplay: null })
  }

  handleSignatureSave = (signature) => this.setState({ signature })
  handleInitialsSave = (initials) => this.setState({ initials })
  handleWitnessSignatureSave = (witnessSignature) => this.setState({ witnessSignature })
  handleWitnessInitialsSave = (witnessInitials) => this.setState({ witnessInitials })
  handleShowWitnessSignatureForm = () => this.setState({ getWitnessSignature: true })

  async componentDidMount() {
    const forms = await this.getFormsToFill()
    this.createApplicationForms(forms)
    this.getApplicationForms()
    scrolltoTopOFPage()
  }

  render() {
    if (this.state.showSignatureForm) {
      return (
        <SaveSignature
          handleSignatureSave={this.handleSignatureSave}
          handleInitialsSave={this.handleInitialsSave}
          handleWitnessSignatureSave={this.handleWitnessSignatureSave}
          handleWitnessInitialsSave={this.handleWitnessInitialsSave}
          handleShowWitnessSignatureForm={this.handleShowWitnessSignatureForm}
          getWitnessSignature={this.state.getWitnessSignature}
          signature={this.state.signature}
          initials={this.state.initials}
          witnessInitials={this.state.witnessInitials}
          witnessSignature={this.state.witnessSignature}
          loggedInUser={this.props.loggedInUser}
          handleShowFormsToSignPage={this.handleShowFormsToSignPage}
          handleShowFirstForm={this.handleShowFirstForm}
        />
      )
    }

    if (this.state.formToDisplay) {
      return (
        <LoadForm
          constants={this.props.constants}
          handleRenderPreviousForm={this.handleRenderPreviousForm}
          handleRenderNextForm={this.handleRenderNextForm}
          handleCompleteLoanApplication={this.handleCompleteLoanApplication}
          signature={this.state.signature}
          witnessSignature={this.state.witnessSignature}
          loggedInUser={this.props.loggedInUser}
          toSignApplicationForms={this.state.toSignApplicationForms}
          isLastForm={this.state.isLastForm}
          form={this.state.formToDisplay}
        />
      )
    }

    return (
      <div style={{ minHeight: '100vh', background: '#0A0F1E', paddingTop: 76, paddingBottom: 96, position: 'relative', overflowX: 'hidden' }}>
        <style>{`@keyframes vfSlide { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }`}</style>

        <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(ellipse 80% 50% at 50% -5%, rgba(16,185,129,0.11) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ position: 'fixed', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none', zIndex: 0 }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 680, margin: '0 auto', padding: '0 16px', animation: 'vfSlide 0.4s ease' }}>

          <div style={{ marginBottom: 24 }}>
            <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)' }}>Document Signing</p>
            <h1 style={{ margin: 0, fontFamily: "var(--font-display,'DM Serif Display',serif)", fontSize: 'clamp(22px,5vw,30px)', color: '#fff' }}>E-Signing Portal</h1>
          </div>

          <div style={card}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 20 }}>
              <div style={{ width: 42, height: 42, borderRadius: 11, background: 'rgba(16,185,129,0.1)', border: '1.5px solid rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', flexShrink: 0 }}>
                <InfoIco />
              </div>
              <p style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65 }}>
                Your loan application has been accepted. Complete the document signing process below to finalise and disburse your funds.
              </p>
            </div>

            <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: 18 }} />

            <div style={{ marginBottom: 18 }}>
              <div style={sectionLabel}>Documents to sign</div>
              {this.state.forms.length > 0
                ? this.renderForms()
                : <div style={{ ...formRow, justifyContent: 'center', padding: 18 }}><span style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)' }}>Loading your documents…</span></div>
              }
            </div>

            <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 10, padding: '12px 14px', marginBottom: 20 }}>
              <div style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                <span style={{ color: '#FBBF24', flexShrink: 0 }}><WarnIco /></span>
                <p style={{ margin: 0, fontSize: 12.5, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                  All information you provide is kept strictly confidential and is solely for verification and loan eligibility purposes.
                </p>
              </div>
            </div>

            {this.state.error && (
              <div style={{ padding: '10px 14px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 10, color: '#F87171', fontSize: 13, marginBottom: 16 }}>
                {this.state.error}
              </div>
            )}

            <button onClick={this.handShowSignatureForm} type="button" style={btnGreen}>
              Proceed to Sign →
            </button>
          </div>

          <div style={card}>
            <div style={sectionLabel}>What you will complete</div>
            {[
              { label: 'Your Signature', desc: 'Draw your full legal signature' },
              { label: 'Your Initials', desc: 'Draw your abbreviated initials' },
              { label: 'Witness Signature', desc: 'A witness signs to validate the document' },
              { label: 'Witness Initials', desc: 'Witness provides their initials' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: i < 3 ? 12 : 0 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#10B981', fontSize: 11, fontWeight: 700 }}>
                  {i + 1}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{item.label}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    )
  }
}