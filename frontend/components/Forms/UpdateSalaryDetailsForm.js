// // "use client";

// // import { api_url, backEndUrl, getJwt } from "@/Constants";
// // import { getImage, textHasPhoneNumber, updateUserAccount } from "@/Functions";
// // import React from "react";
// // import Uploader from "../Includes/Uploader/Uploader";
// // import { Slide } from "@material-ui/core";
// // import WarningSnapBack from "../Includes/SnapBacks/WarningSnapBack";

// // export default class UpdateSalaryDetailsForm extends React.Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       employerName: '',
// //       salaryAmount: this.props.salaryAmount || '',
// //       employementVerificationNumber: '',
// //       companyLocation: '',
// //       socialSecurityNumber: '', // Added social security number state
// //       paySlip: null,
// //       verificationVideo: null,
// //       bankStatement: null,
// //       // More fields can be added as necessary
// //       isFormValid: false,
// //       saving: false,
// //       saved: false,
// //       salaryDetailsId: null,
// //       error: null,
// //       openErrorSnapBack: false,
// //       errorMessage: ''
// //     };
// //   }

// //   getClientDetails = async () => {
// //     return await fetch(api_url + '/users/me?populate=salary.paySlip,salary.verificationVideo,', {
// //       headers: {
// //         'Authorization': `Bearer ${getJwt()}`,
// //         'Content-Type': 'application/json'
// //       }
// //     })
// //       .then(response => response.json())
// //       .then(data => data)
// //   }

// //   async componentDidMount() {

// //     let { salary } = this.props.loggedInUser; // because the user object has the client details, though no nrc
// //     if (!salary) {
// //       const blankSalaryObject = {
// //         salaryAmount: this.props.salaryAmount || '',
// //         paySlip: null,
// //         verificationVideo: null,
// //         bankStatement: null
// //       } // create a blank slate of salary to obtain the component's id
// //       const updatedUser = await updateUserAccount({ salary: blankSalaryObject }, this.props.loggedInUser.id)
// //       if (updatedUser.hasOwnProperty('error')) {
// //         return
// //       }
// //     }
// //     const user = await this.getClientDetails();
// //     salary = user.salary
// //     // Set default values, ensure nulls are handled
// //     this.setState({
// //       employerName: salary?.employerName || '',
// //       salaryAmount: this.props.salaryAmount || '',
// //       employementVerificationNumber: salary?.employementVerificationNumber || '',
// //       companyLocation: salary?.companyLocation || '',
// //       socialSecurityNumber: salary?.socialSecurityNumber || '', // set social security number
// //       paySlip: salary?.paySlip || '',
// //       verificationVideo: salary?.verificationVideo || '',
// //       bankStatement: salary?.bankStatement || '',
// //       salaryDetailsId: salary?.id || null
// //     }, () => {
// //       this.checkFormValidity(true)
// //     })
// //   }

// //   handleInputChange = (e) => {
// //     //new Date(details.dateOfBirth).toLocaleDateString('en-US')
// //     const { name, value } = e.target;
// //     // Update state based on field name
// //     this.setState({ [name]: !value ? '' : value, saved: false }, this.checkFormValidity);
// //   }

// //   checkFormValidity = (initialCheck = false) => {
// //     const { employerName, salaryAmount, employementVerificationNumber, companyLocation, socialSecurityNumber, paySlip, bankStatement, verificationVideo } = this.state;

// //     // Validate that all fields are filled
// //     const isFormValid =
// //       employerName.trim() &&
// //       employementVerificationNumber &&
// //       companyLocation &&
// //       socialSecurityNumber.trim() &&  // require social security number
// //       paySlip &&
// //       bankStatement &&
// //       verificationVideo; // no verification video since we do not intend to use the feature yet

// //     if (!initialCheck) {
// //       this.setState({ isFormValid })
// //     }
// //     else {
// //       if (isFormValid) {
// //         this.setState({ isFormValid: isFormValid, saved: true })
// //       }
// //       else {
// //         this.setState({ isFormValid })
// //       }
// //     }
// //   }

// //   handleSubmit = async (e) => {
// //     e.preventDefault()

// //     const { employerName, salaryAmount, employementVerificationNumber, companyLocation, socialSecurityNumber, paySlip, bankStatement, verificationVideo, salaryDetailsId } = this.state;
// //     if (!employerName || !salaryAmount || !employementVerificationNumber || !companyLocation || !socialSecurityNumber) {
// //       this.setState({
// //         error: 'Please ensure all fields are filled.',
// //         saving: false
// //       })
// //       return
// //     }
// //     if (!textHasPhoneNumber(employementVerificationNumber)) {
// //       this.setState({
// //         error: 'Please enter a valid phone number.',
// //         saving: false
// //       })
// //       return
// //     }
// //     const updateObject = this.state
// //     delete updateObject.isFormValid
// //     delete updateObject.saving
// //     delete updateObject.error
// //     delete updateObject.paySlip
// //     delete updateObject.verificationVideo
// //     delete updateObject.bankStatement
// //     delete updateObject.salaryDetailsId

// //     if (!updateObject.employerName) {
// //       updateObject.employerName = null
// //     }
// //     if (!updateObject.salaryAmount) {
// //       updateObject.salaryAmount = null
// //     }
// //     if (!updateObject.employementVerificationNumber) {
// //       updateObject.employementVerificationNumber = null
// //     }
// //     if (!updateObject.companyLocation) {
// //       updateObject.companyLocation = null
// //     }
// //     if (!updateObject.socialSecurityNumber) {
// //       updateObject.socialSecurityNumber = null
// //     }

// //     this.setState({
// //       saving: true,
// //       paySlip: paySlip,
// //       bankStatement: bankStatement,
// //       verificationVideo: verificationVideo,
// //       salaryDetailsId: salaryDetailsId,
// //       saved: true
// //     })
// //     updateObject.id = salaryDetailsId
// //     const updatedUser = await updateUserAccount({ salary: updateObject }, this.props.loggedInUser.id)

// //     if (updatedUser.hasOwnProperty('error')) {
// //       this.setState({
// //         error: 'something went wrong, try again',
// //         saving: false,
// //         paySlip: paySlip,
// //         bankStatement: bankStatement,
// //         verificationVideo: verificationVideo,
// //         salaryDetailsId: salaryDetailsId
// //       })
// //       return
// //     }
// //     this.setState({
// //       error: null,
// //       saving: false,
// //       paySlip: paySlip,
// //       bankStatement: bankStatement,
// //       verificationVideo: verificationVideo,
// //       salaryDetailsId: salaryDetailsId
// //     }, () => {
// //       this.checkFormValidity()
// //       console.log(this.state)
// //     })
// //   }

// //   addPaySlip = (files) => {
// //     if (!this.state.paySlip) {
// //       this.setState({
// //         paySlip: files,
// //         saving: false,
// //         error: null
// //       }, () => {
// //         this.checkFormValidity()
// //       })
// //     }
// //     else {
// //       const newFiles = [...this.state.paySlip, ...files]
// //       this.setState({
// //         paySlip: newFiles,
// //         saving: false,
// //         error: null
// //       }, () => {
// //         this.checkFormValidity()
// //       })
// //     }
// //   }
// //   addVericationVideo = (files) => {
// //     if (!this.state.verificationVideo) {
// //       this.setState({
// //         verificationVideo: files,
// //         saving: false,
// //         error: null
// //       }, () => {
// //         this.checkFormValidity()
// //       })
// //     }
// //     else {
// //       const newFiles = [...this.state.verificationVideo, ...files]
// //       this.setState({
// //         verificationVideo: newFiles,
// //         saving: false,
// //         error: null
// //       }, () => {
// //         this.checkFormValidity()
// //       })
// //     }
// //   }
// //   addBankStatement = (files) => {
// //     if (!this.state.bankStatement) {
// //       this.setState({
// //         bankStatement: files,
// //         saving: false,
// //         error: null
// //       }, () => {
// //         this.checkFormValidity()
// //       })
// //     }
// //     else {
// //       const newFiles = [...this.state.bankStatement, ...files]
// //       this.setState({
// //         bankStatement: newFiles,
// //         saving: false,
// //         error: null
// //       }, () => {
// //         this.checkFormValidity()
// //       })
// //     }
// //   }


// //   handleRemoveImage = async (uploadid, filesArr, arrName) => {
// //     const removed = await fetch(api_url + '/upload/files/' + uploadid, {
// //       method: 'DELETE',
// //       headers: {
// //         'Authorization': `Bearer ${getJwt()}`,
// //         'Content-Type': 'application/json'
// //       }
// //     }).then(response => response.json())
// //       .then(data => data)
// //       .catch(error => console.error(error))
// //     if (removed) {
// //       // remove from state
// //       const newArray = filesArr.filter((file) => {
// //         return file.id !== uploadid
// //       })
// //       this.setState({
// //         [arrName]: newArray.length < 1 ? null : newArray
// //       }, () => {
// //         this.checkFormValidity()
// //       })
// //       // remove from the dom
// //       if (typeof document !== 'undefined') {
// //         document.getElementById("#" + uploadid).style.display = "none"
// //       }
// //     }
// //   }

// //   renderFiles = (files, arrName) => {
// //     if (!files) {
// //       return <></>
// //     }
// //     return files.map((file) => {
// //       if (file.hasOwnProperty("attributes")) {
// //         file.attributes.id = file.id
// //         file = file.attributes
// //       }
// //       if (file.mime.startsWith('application/')) {
// //         return (<div id={"#" + file.id} key={file.id}>
// //           <p>File: <strong>{file.name}</strong></p>
// //           <button className="btn btn-sm btn-danger" onClick={() => { this.handleRemoveImage(file.id, files, arrName) }}>Remove</button>
// //         </div>)
// //       }
// //       else if (file.mime.startsWith('video/')) {
// //         return (<div id={"#" + file.id} key={file.id}>
// //           <div style={{ width: '50%', backgroundColor: 'lightgray' }}>
// //             <video className="mb-1" style={{ width: '100%' }}>
// //               <source src={backEndUrl + file.url} type={file.mime} />
// //               Sorry we are unable to show this video
// //             </video>
// //           </div>
// //           <button className="btn btn-sm btn-danger" onClick={() => { this.handleRemoveImage(file.id, files, arrName) }}>Remove</button>
// //         </div>)

// //       }
// //       else {
// //         return (<div id={"#" + file.id} key={file.id}>
// //           <p className="text text-warning">File failed to be displayed</p>
// //           <button className="btn btn-sm btn-danger" onClick={() => { this.handleRemoveImage(file.id, files, arrName) }}>Remove</button>
// //         </div>)
// //       }
// //     })
// //   }

// //    handleOpenErrorSnapBack = ()=>{
// //          this.setState({
// //            openErrorSnapBack: false 
// //          })
// //     }

// //     handleNextButton = ()=>{
// //       const {isFormValid,saved} = this.state
// //       if(!isFormValid){
// //         this.setState({
// //           openErrorSnapBack: true,
// //           errorMessage: 'Please ensure all fields are filled and saved before you can proceed.'
// //         })
// //         return
// //       }
// //       if(!saved){
// //         this.setState({
// //           openErrorSnapBack: true,
// //           errorMessage: 'Please save the form to proceed.'
// //         })
// //         return
// //       }
// //       this.props.handleCreateBlankLoan()
// //     }

// //   render() {
// //     const { employerName, salaryAmount, saved, employementVerificationNumber, companyLocation, socialSecurityNumber, isFormValid } = this.state;

// //     return (
// //       <Slide in={true} direction="left">
// //         <div className="row">
// //           {this.state.openErrorSnapBack? <WarningSnapBack handleOpenErrorSnapBack={this.handleOpenErrorSnapBack} errorMessage={this.state.errorMessage}/> : null}
// //           <div className="col-lg-12">
// //             <div className="card">
// //               <div className="card-header align-items-center d-flex">
// //                 <h4 className="card-title mb-0 flex-grow-1">Salary And Company Details </h4>
// //               </div>
// //               <div className="card-body">
// //                 <div className="live-preview">
// //                   <div className="row gy-4">
// //                     <div className="col-xxl-3 col-md-6 col-lg-12">
// //                       <div>
// //                         <label htmlFor="employerName" className="form-label">
// //                           Company/Employer Name
// //                         </label>
// //                         <input
// //                           className="form-control"
// //                           id="employerName"
// //                           name="employerName"
// //                           type="text"
// //                           autoComplete="off"
// //                           disabled={!this.state.salaryDetailsId}
// //                           value={employerName}
// //                           onChange={this.handleInputChange}
// //                         />
// //                       </div>
// //                     </div>
// //                     <div className="col-xxl-3 col-md-6 col-lg-12">
// //                       <div>
// //                         <label htmlFor="employementVerificationNumber" className="form-label">
// //                           Employement Verification PhoneNumber
// //                         </label>
// //                         <p><small style={{ color: 'gray' }}>(Any Superior or Employer's Phonenumber)</small></p>
// //                         <input
// //                           className="form-control"
// //                           id="employementVerificationNumber"
// //                           name="employementVerificationNumber"
// //                           value={employementVerificationNumber}
// //                           type="text"
// //                           autoComplete="off"
// //                           onChange={this.handleInputChange}
// //                         />
// //                       </div>
// //                     </div>
// //                     {/* New Social Security Number Field */}
// //                     <div className="col-xxl-3 col-md-6 col-lg-12">
// //                       <div>
// //                         <label htmlFor="socialSecurityNumber" className="form-label">
// //                           Social Security Number
// //                         </label>
// //                         <input
// //                           className="form-control"
// //                           id="socialSecurityNumber"
// //                           name="socialSecurityNumber"
// //                           type="text"
// //                           autoComplete="off"
// //                           disabled={!this.state.salaryDetailsId}
// //                           value={socialSecurityNumber}
// //                           onChange={this.handleInputChange}
// //                         />
// //                       </div>
// //                     </div>
// //                     <div className="col-lg-12">
// //                       <label htmlFor="employementVerificationNumber" className="form-label">
// //                         Salary
// //                       </label>
// //                       <div className="input-group">
// //                         <span className="input-group-text">K</span>
// //                         <input
// //                           name="salaryAmount"
// //                           value={salaryAmount}
// //                           disabled
// //                           type="text"
// //                           className="form-control"
// //                         />
// //                         <span className="input-group-text">.00</span>
// //                       </div>
// //                     </div>
// //                     <div className="col-xxl-3 col-md-6 col-lg-12">
// //                       <div>
// //                         <label htmlFor="lastnameInput" className="form-label">
// //                           Company Address
// //                         </label>
// //                         <p><small style={{ color: 'lightgray' }}>(House No. Area City Province)</small></p>
// //                         <input
// //                           className="form-control"
// //                           id="lastnameInput"
// //                           name="companyLocation"
// //                           type="text"
// //                           autoComplete="off"
// //                           disabled={!this.state.salaryDetailsId}
// //                           value={companyLocation}
// //                           onChange={this.handleInputChange}
// //                         />
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {this.state.salaryDetailsId ? <>
// //                     <h4 style={{ marginTop: '20px' }} className="card-title mb-0 flex-grow-1">Identity Details </h4>
// //                     <hr style={{ color: 'lightgray' }} />
// //                     <div style={{ marginTop: '20px' }}>
// //                       <h5>PaySlip<small style={{ color: 'gray' }}> (Of Past 3 months)</small></h5><small style={{ color: 'lightgray' }}>(can even be past 6 or a year)</small>
// //                       <Uploader
// //                         addFiles={this.addPaySlip}
// //                         displayType="circular"
// //                         refId={this.state.salaryDetailsId}
// //                         refName="client-details.salary"
// //                         fieldName="paySlip"
// //                         allowMultiple={false}
// //                         allowedTypes={['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
// //                       />
// //                       <small style={{ color: 'lightgray' }}>(document(PDF,WORD))</small>
// //                       {this.renderFiles(this.state.paySlip, "paySlip")}
// //                       <h5>Bank Statement<small style={{ color: 'gray' }}> (Of Past 3 months)</small></h5><small style={{ color: 'lightgray' }}>(can even be past 6 or a year)</small>
// //                       <Uploader
// //                         addFiles={this.addBankStatement}
// //                         displayType="circular"
// //                         refId={this.state.salaryDetailsId}
// //                         refName="client-details.salary"
// //                         fieldName="bankStatement"
// //                         allowMultiple={false}
// //                         allowedTypes={['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
// //                       />
// //                       <small style={{ color: 'lightgray' }}>(document(PDF,WORD))</small>
// //                       {this.renderFiles(this.state.bankStatement, "bankStatement")}
// //                     </div>

// //                   <div style={{marginTop:'10px'}}>
// //                         <h5>Verification Video <small  style={{color:'gray'}}> (Instructions Below)</small></h5> <small  style={{color:'lightgray'}}>(Take a video holding your ID(NRC,Passport or Driving Licence) and state today's date)</small>
// //                         <Uploader 
// //                             addFiles={this.addVericationVideo}
// //                             displayType="circular"
// //                             refId={this.state.salaryDetailsId}
// //                             refName="client-details.salary"
// //                             fieldName="verificationVideo"
// //                             allowMultiple={false}
// //                             allowedTypes={['video/*']}
// //                         />
// //                         <small  style={{color:'lightgray'}}>(Video(MP4,MKV,AVL))</small>
// //                         {this.renderFiles(this.state.verificationVideo,"verificationVideo")}
// //                   </div>
// //                   </> : <></>}
// //                   {/* Save and Next Buttons */}
// //                   <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
// //                     <button
// //                       disabled={this.state.saving}
// //                       onClick={this.handleSubmit}
// //                       type="button"
// //                       className="btn btn-success w-90 mt-3"
// //                       id="confirm-btn"
// //                     >
// //                       {this.state.saving ? "Saving..." : "save"}
// //                     </button>

// //                     {this.props.formDisplay === "profile" ? <></> : <button
// //                       type="button"
// //                       className="btn btn-danger w-90 mt-3"
// //                       id="next-btn"
// //                       onClick={() => { this.props.handleOpenAddLoanAmountForm(); this.props.handleFormReopen(); }}
// //                     >
// //                       Previous
// //                     </button>}
// //                     {this.props.formDisplay === "profile" ? <></> : <button
// //                       type="button"
// //                       className="btn btn-danger w-90 mt-3"
// //                       id="next-btn"
// //                       onClick={() => { this.handleNextButton() }}
// //                     >
// //                       Complete
// //                     </button>}
// //                   </div>
// //                   {this.state.error ? <p className="text text-danger">{this.state.error}</p> : <></>}
// //                   <p className="text text-warning mt-2">Note that all the information you provide here is kept strictly confidential, and it's solely meant for verification and loan eligibility determination purposes</p>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </Slide>
// //     );
// //   }
// // }
// // //  id
// // //  sign a letter of sale

// "use client";

// import { api_url, backEndUrl, getJwt } from "@/Constants";
// import { getImage, textHasPhoneNumber, updateUserAccount } from "@/Functions";
// import React from "react";
// import Uploader from "../Includes/Uploader/Uploader";
// import { Slide } from "@material-ui/core";
// import WarningSnapBack from "../Includes/SnapBacks/WarningSnapBack";

// /* ─── CSS (modern dark theme) ─────────────────────────────────────────────── */
// const FORM_CSS = `
//   @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap');

//   .vf-page {
//     min-height: 100vh;
//     background: #0a0f1a;
//     padding: 32px 16px;
//     font-family: 'Inter', sans-serif;
//   }
//   .vf-page-inner {
//     max-width: 800px;
//     margin: 0 auto;
//   }
//   .vf-card {
//     background: linear-gradient(145deg, #111827, #0d1526);
//     border: 1px solid rgba(255,255,255,0.07);
//     border-radius: 20px;
//     overflow: hidden;
//     box-shadow: 0 24px 64px rgba(0,0,0,0.45);
//   }
//   .vf-card-header {
//     padding: 28px 32px 20px;
//     border-bottom: 1px solid rgba(255,255,255,0.06);
//     background: linear-gradient(135deg, rgba(16,185,129,0.08), rgba(59,130,246,0.05));
//   }
//   .vf-card-title {
//     font-size: 22px;
//     font-weight: 700;
//     color: #f1f5f9;
//     margin: 0 0 4px;
//     letter-spacing: -0.3px;
//   }
//   .vf-card-subtitle {
//     font-size: 13px;
//     color: rgba(255,255,255,0.42);
//     margin: 0;
//   }
//   .vf-card-body {
//     padding: 28px 32px 32px;
//   }

//   .vf-field { margin-bottom: 22px; }
//   .vf-label {
//     display: block;
//     font-size: 11.5px;
//     font-weight: 600;
//     letter-spacing: 0.06em;
//     text-transform: uppercase;
//     color: rgba(255,255,255,0.55);
//     margin-bottom: 8px;
//   }
//   .vf-sublabel {
//     display: block;
//     font-size: 12px;
//     color: rgba(255,255,255,0.28);
//     margin-top: -5px;
//     margin-bottom: 8px;
//   }

//   .vf-input-group {
//     display: flex;
//     align-items: stretch;
//     border-radius: 10px;
//     border: 1px solid rgba(255,255,255,0.1);
//     overflow: hidden;
//     transition: border-color 0.2s;
//   }
//   .vf-input-group:focus-within {
//     border-color: rgba(16,185,129,0.5);
//     box-shadow: 0 0 0 3px rgba(16,185,129,0.1);
//   }
//   .vf-input-prefix {
//     padding: 0 14px;
//     background: rgba(255,255,255,0.05);
//     border-right: 1px solid rgba(255,255,255,0.08);
//     color: rgba(255,255,255,0.4);
//     font-family: 'JetBrains Mono', monospace;
//     font-size: 14px;
//     display: flex;
//     align-items: center;
//   }
//   .vf-input {
//     flex: 1;
//     background: rgba(255,255,255,0.04);
//     border: none;
//     outline: none;
//     padding: 13px 16px;
//     color: #f1f5f9;
//     font-size: 15px;
//     font-family: 'Inter', sans-serif;
//   }
//   .vf-input::placeholder { color: rgba(255,255,255,0.2); }
//   .vf-input:disabled {
//     opacity: 0.5;
//     cursor: not-allowed;
//   }

//   .vf-btn-row {
//     display: flex;
//     justify-content: space-between;
//     gap: 12px;
//     margin-top: 24px;
//   }
//   .vf-btn {
//     flex: 1;
//     padding: 13px 20px;
//     border-radius: 10px;
//     font-size: 14px;
//     font-weight: 600;
//     cursor: pointer;
//     border: none;
//     transition: all 0.2s;
//     font-family: 'Inter', sans-serif;
//   }
//   .vf-btn-success {
//     background: linear-gradient(135deg,#10b981,#059669);
//     color: #fff;
//     box-shadow: 0 4px 16px rgba(16,185,129,0.3);
//   }
//   .vf-btn-success:hover:not(:disabled) {
//     background: linear-gradient(135deg,#059669,#047857);
//     box-shadow: 0 6px 20px rgba(16,185,129,0.4);
//     transform: translateY(-1px);
//   }
//   .vf-btn-danger {
//     background: linear-gradient(135deg,#ef4444,#dc2626);
//     color: #fff;
//     box-shadow: 0 4px 16px rgba(239,68,68,0.2);
//   }
//   .vf-btn-danger:hover {
//     background: linear-gradient(135deg,#dc2626,#b91c1c);
//     transform: translateY(-1px);
//   }
//   .vf-btn:disabled {
//     opacity: 0.5;
//     cursor: not-allowed;
//     transform: none;
//   }

//   .vf-divider {
//     border: none;
//     border-top: 1px solid rgba(255,255,255,0.07);
//     margin: 24px 0;
//   }

//   .vf-text-danger {
//     color: #f87171;
//     font-size: 12px;
//     margin-top: 8px;
//   }
//   .vf-text-warning {
//     color: #fbbf24;
//     font-size: 12px;
//     margin-top: 16px;
//     background: rgba(251,191,36,0.1);
//     padding: 12px;
//     border-radius: 10px;
//   }

//   .vf-file-item {
//     background: rgba(255,255,255,0.03);
//     border-radius: 10px;
//     padding: 10px 12px;
//     margin-top: 8px;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//   }
//   .vf-file-name {
//     font-family: 'JetBrains Mono', monospace;
//     font-size: 12px;
//     color: #94a3b8;
//   }
//   .vf-remove-btn {
//     background: rgba(239,68,68,0.2);
//     border: none;
//     color: #f87171;
//     padding: 4px 12px;
//     border-radius: 6px;
//     font-size: 11px;
//     font-weight: 600;
//     cursor: pointer;
//     transition: 0.2s;
//   }
//   .vf-remove-btn:hover {
//     background: rgba(239,68,68,0.4);
//   }

//   .vf-uploader-section {
//     margin-top: 28px;
//   }
//   .vf-section-title {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     margin-bottom: 18px;
//   }
//   .vf-section-title-bar {
//     width: 3px; height: 16px;
//     background: linear-gradient(180deg,#10b981,#3b82f6);
//     border-radius: 2px;
//     flex-shrink: 0;
//   }
//   .vf-section-title h4 {
//     margin: 0;
//     font-size: 16px;
//     font-weight: 600;
//     color: #e2e8f0;
//   }
//   .vf-section-title h5 {
//     margin: 0;
//     font-size: 14px;
//     font-weight: 600;
//     color: #cbd5e1;
//   }
// `;

// let _cssInjected = false;
// function injectCSS() {
//   if (typeof document === "undefined" || _cssInjected) return;
//   _cssInjected = true;
//   const tag = document.createElement("style");
//   tag.setAttribute("data-vf-forms", "1");
//   tag.textContent = FORM_CSS;
//   document.head.appendChild(tag);
// }

// /* ─── Component (exact logic from original, restyled) ────────────────────── */
// export default class UpdateSalaryDetailsForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       employerName: '',
//       salaryAmount: this.props.salaryAmount || '',
//       employementVerificationNumber: '',
//       companyLocation: '',
//       socialSecurityNumber: '',
//       paySlip: null,
//       verificationVideo: null,
//       bankStatement: null,
//       isFormValid: false,
//       saving: false,
//       saved: false,
//       salaryDetailsId: null,
//       error: null,
//       openErrorSnapBack: false,
//       errorMessage: ''
//     };
//   }

//   getClientDetails = async () => {
//     return await fetch(api_url + '/users/me?populate=salary.paySlip,salary.verificationVideo,', {
//       headers: {
//         'Authorization': `Bearer ${getJwt()}`,
//         'Content-Type': 'application/json'
//       }
//     })
//       .then(response => response.json())
//       .then(data => data)
//   }

//   async componentDidMount() {
//     injectCSS();
//     let { salary } = this.props.loggedInUser;
//     if (!salary) {
//       const blankSalaryObject = {
//         salaryAmount: this.props.salaryAmount || '',
//         paySlip: null,
//         verificationVideo: null,
//         bankStatement: null
//       }
//       const updatedUser = await updateUserAccount({ salary: blankSalaryObject }, this.props.loggedInUser.id)
//       if (updatedUser.hasOwnProperty('error')) {
//         return
//       }
//     }
//     const user = await this.getClientDetails();
//     salary = user.salary
//     this.setState({
//       employerName: salary?.employerName || '',
//       salaryAmount: this.props.salaryAmount || '',
//       employementVerificationNumber: salary?.employementVerificationNumber || '',
//       companyLocation: salary?.companyLocation || '',
//       socialSecurityNumber: salary?.socialSecurityNumber || '',
//       paySlip: salary?.paySlip || '',
//       verificationVideo: salary?.verificationVideo || '',
//       bankStatement: salary?.bankStatement || '',
//       salaryDetailsId: salary?.id || null
//     }, () => {
//       this.checkFormValidity(true)
//     })
//   }

//   handleInputChange = (e) => {
//     const { name, value } = e.target;
//     this.setState({ [name]: !value ? '' : value, saved: false }, this.checkFormValidity);
//   }

//   checkFormValidity = (initialCheck = false) => {
//     const { employerName, salaryAmount, employementVerificationNumber, companyLocation, socialSecurityNumber, paySlip, bankStatement, verificationVideo } = this.state;

//     const isFormValid =
//       employerName.trim() &&
//       employementVerificationNumber &&
//       companyLocation &&
//       socialSecurityNumber.trim() &&
//       paySlip &&
//       bankStatement &&
//       verificationVideo;

//     if (!initialCheck) {
//       this.setState({ isFormValid })
//     }
//     else {
//       if (isFormValid) {
//         this.setState({ isFormValid: isFormValid, saved: true })
//       }
//       else {
//         this.setState({ isFormValid })
//       }
//     }
//   }

//   handleSubmit = async (e) => {
//     e.preventDefault()

//     const { employerName, salaryAmount, employementVerificationNumber, companyLocation, socialSecurityNumber, paySlip, bankStatement, verificationVideo, salaryDetailsId } = this.state;
//     if (!employerName || !salaryAmount || !employementVerificationNumber || !companyLocation || !socialSecurityNumber) {
//       this.setState({
//         error: 'Please ensure all fields are filled.',
//         saving: false
//       })
//       return
//     }
//     if (!textHasPhoneNumber(employementVerificationNumber)) {
//       this.setState({
//         error: 'Please enter a valid phone number.',
//         saving: false
//       })
//       return
//     }
//     const updateObject = this.state
//     delete updateObject.isFormValid
//     delete updateObject.saving
//     delete updateObject.error
//     delete updateObject.paySlip
//     delete updateObject.verificationVideo
//     delete updateObject.bankStatement
//     delete updateObject.salaryDetailsId

//     if (!updateObject.employerName) {
//       updateObject.employerName = null
//     }
//     if (!updateObject.salaryAmount) {
//       updateObject.salaryAmount = null
//     }
//     if (!updateObject.employementVerificationNumber) {
//       updateObject.employementVerificationNumber = null
//     }
//     if (!updateObject.companyLocation) {
//       updateObject.companyLocation = null
//     }
//     if (!updateObject.socialSecurityNumber) {
//       updateObject.socialSecurityNumber = null
//     }

//     this.setState({
//       saving: true,
//       paySlip: paySlip,
//       bankStatement: bankStatement,
//       verificationVideo: verificationVideo,
//       salaryDetailsId: salaryDetailsId,
//       saved: true
//     })
//     updateObject.id = salaryDetailsId
//     const updatedUser = await updateUserAccount({ salary: updateObject }, this.props.loggedInUser.id)

//     if (updatedUser.hasOwnProperty('error')) {
//       this.setState({
//         error: 'something went wrong, try again',
//         saving: false,
//         paySlip: paySlip,
//         bankStatement: bankStatement,
//         verificationVideo: verificationVideo,
//         salaryDetailsId: salaryDetailsId
//       })
//       return
//     }
//     this.setState({
//       error: null,
//       saving: false,
//       paySlip: paySlip,
//       bankStatement: bankStatement,
//       verificationVideo: verificationVideo,
//       salaryDetailsId: salaryDetailsId
//     }, () => {
//       this.checkFormValidity()
//       console.log(this.state)
//     })
//   }

//   addPaySlip = (files) => {
//     if (!this.state.paySlip) {
//       this.setState({
//         paySlip: files,
//         saving: false,
//         error: null
//       }, () => {
//         this.checkFormValidity()
//       })
//     }
//     else {
//       const newFiles = [...this.state.paySlip, ...files]
//       this.setState({
//         paySlip: newFiles,
//         saving: false,
//         error: null
//       }, () => {
//         this.checkFormValidity()
//       })
//     }
//   }
//   addVericationVideo = (files) => {
//     if (!this.state.verificationVideo) {
//       this.setState({
//         verificationVideo: files,
//         saving: false,
//         error: null
//       }, () => {
//         this.checkFormValidity()
//       })
//     }
//     else {
//       const newFiles = [...this.state.verificationVideo, ...files]
//       this.setState({
//         verificationVideo: newFiles,
//         saving: false,
//         error: null
//       }, () => {
//         this.checkFormValidity()
//       })
//     }
//   }
//   addBankStatement = (files) => {
//     if (!this.state.bankStatement) {
//       this.setState({
//         bankStatement: files,
//         saving: false,
//         error: null
//       }, () => {
//         this.checkFormValidity()
//       })
//     }
//     else {
//       const newFiles = [...this.state.bankStatement, ...files]
//       this.setState({
//         bankStatement: newFiles,
//         saving: false,
//         error: null
//       }, () => {
//         this.checkFormValidity()
//       })
//     }
//   }


//   handleRemoveImage = async (uploadid, filesArr, arrName) => {
//     const removed = await fetch(api_url + '/upload/files/' + uploadid, {
//       method: 'DELETE',
//       headers: {
//         'Authorization': `Bearer ${getJwt()}`,
//         'Content-Type': 'application/json'
//       }
//     }).then(response => response.json())
//       .then(data => data)
//       .catch(error => console.error(error))
//     if (removed) {
//       const newArray = filesArr.filter((file) => {
//         return file.id !== uploadid
//       })
//       this.setState({
//         [arrName]: newArray.length < 1 ? null : newArray
//       }, () => {
//         this.checkFormValidity()
//       })
//       if (typeof document !== 'undefined') {
//         document.getElementById("#" + uploadid).style.display = "none"
//       }
//     }
//   }

//   renderFiles = (files, arrName) => {
//     if (!files) {
//       return <></>
//     }
//     return files.map((file) => {
//       if (file.hasOwnProperty("attributes")) {
//         file.attributes.id = file.id
//         file = file.attributes
//       }
//       if (file.mime.startsWith('application/')) {
//         return (
//           <div id={"#" + file.id} key={file.id} className="vf-file-item">
//             <span className="vf-file-name">{file.name}</span>
//             <button className="vf-remove-btn" onClick={() => { this.handleRemoveImage(file.id, files, arrName) }}>Remove</button>
//           </div>
//         )
//       }
//       else if (file.mime.startsWith('video/')) {
//         return (
//           <div id={"#" + file.id} key={file.id} className="vf-file-item">
//             <div style={{ width: '100%', maxWidth: '200px', background: '#1e293b', borderRadius: '8px', overflow: 'hidden' }}>
//               <video style={{ width: '100%' }} controls>
//                 <source src={backEndUrl + file.url} type={file.mime} />
//                 Sorry we are unable to show this video
//               </video>
//             </div>
//             <button className="vf-remove-btn" onClick={() => { this.handleRemoveImage(file.id, files, arrName) }}>Remove</button>
//           </div>
//         )
//       }
//       else {
//         return (
//           <div id={"#" + file.id} key={file.id} className="vf-file-item">
//             <span className="vf-file-name">File failed to be displayed</span>
//             <button className="vf-remove-btn" onClick={() => { this.handleRemoveImage(file.id, files, arrName) }}>Remove</button>
//           </div>
//         )
//       }
//     })
//   }

//   handleOpenErrorSnapBack = () => {
//     this.setState({
//       openErrorSnapBack: false
//     })
//   }

//   handleNextButton = () => {
//     const { isFormValid, saved } = this.state
//     if (!isFormValid) {
//       this.setState({
//         openErrorSnapBack: true,
//         errorMessage: 'Please ensure all fields are filled and saved before you can proceed.'
//       })
//       return
//     }
//     if (!saved) {
//       this.setState({
//         openErrorSnapBack: true,
//         errorMessage: 'Please save the form to proceed.'
//       })
//       return
//     }
//     this.props.handleCreateBlankLoan()
//   }

//   render() {
//     const { employerName, salaryAmount, saved, employementVerificationNumber, companyLocation, socialSecurityNumber, isFormValid } = this.state;

//     return (
//       <Slide in={true} direction="left">
//         <div className="vf-page" style={{ paddingTop: 0 }}>
//           {this.state.openErrorSnapBack ? <WarningSnapBack handleOpenErrorSnapBack={this.handleOpenErrorSnapBack} errorMessage={this.state.errorMessage} /> : null}
//           <div className="vf-page-inner">
//             <div className="vf-card">
//               <div className="vf-card-header">
//                 <h2 className="vf-card-title">Salary & Company Details</h2>
//                 <p className="vf-card-subtitle">Provide employment and verification information</p>
//               </div>

//               <div className="vf-card-body">
//                 <div className="vf-field">
//                   <label className="vf-label" htmlFor="employerName">Company / Employer Name</label>
//                   <input
//                     className="vf-input"
//                     id="employerName"
//                     name="employerName"
//                     type="text"
//                     autoComplete="off"
//                     disabled={!this.state.salaryDetailsId}
//                     value={employerName}
//                     onChange={this.handleInputChange}
//                     style={{ width: '100%', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)' }}
//                   />
//                 </div>

//                 <div className="vf-field">
//                   <label className="vf-label" htmlFor="employementVerificationNumber">Employment Verification Phone Number</label>
//                   <span className="vf-sublabel">Any Superior or Employer's Phone number</span>
//                   <input
//                     className="vf-input"
//                     id="employementVerificationNumber"
//                     name="employementVerificationNumber"
//                     value={employementVerificationNumber}
//                     type="text"
//                     autoComplete="off"
//                     onChange={this.handleInputChange}
//                     style={{ width: '100%', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)' }}
//                   />
//                 </div>

//                 <div className="vf-field">
//                   <label className="vf-label" htmlFor="socialSecurityNumber">Social Security Number</label>
//                   <input
//                     className="vf-input"
//                     id="socialSecurityNumber"
//                     name="socialSecurityNumber"
//                     type="text"
//                     autoComplete="off"
//                     disabled={!this.state.salaryDetailsId}
//                     value={socialSecurityNumber}
//                     onChange={this.handleInputChange}
//                     style={{ width: '100%', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)' }}
//                   />
//                 </div>

//                 <div className="vf-field">
//                   <label className="vf-label">Salary</label>
//                   <div className="vf-input-group">
//                     <span className="vf-input-prefix">K</span>
//                     <input
//                       name="salaryAmount"
//                       value={salaryAmount}
//                       disabled
//                       type="text"
//                       className="vf-input"
//                       style={{ borderRadius: '0 10px 10px 0', borderLeft: 'none' }}
//                     />
//                     <span className="vf-input-prefix">.00</span>
//                   </div>
//                 </div>

//                 <div className="vf-field">
//                   <label className="vf-label" htmlFor="companyLocation">Company Address</label>
//                   <span className="vf-sublabel">House No., Area, City, Province</span>
//                   <input
//                     className="vf-input"
//                     id="companyLocation"
//                     name="companyLocation"
//                     type="text"
//                     autoComplete="off"
//                     disabled={!this.state.salaryDetailsId}
//                     value={companyLocation}
//                     onChange={this.handleInputChange}
//                     style={{ width: '100%', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)' }}
//                   />
//                 </div>

//                 {this.state.salaryDetailsId ? (
//                   <>
//                     <hr className="vf-divider" />
//                     <div className="vf-section-title">
//                       <span className="vf-section-title-bar" />
//                       <h4>Identity & Verification</h4>
//                     </div>

//                     <div className="vf-uploader-section">
//                       <div className="vf-section-title">
//                         <span className="vf-section-title-bar" />
//                         <h5>PaySlip <span className="vf-sublabel" style={{ display: 'inline', marginLeft: '8px' }}>(Past 3 months, can be up to 12 months)</span></h5>
//                       </div>
//                       <Uploader
//                         addFiles={this.addPaySlip}
//                         displayType="circular"
//                         refId={this.state.salaryDetailsId}
//                         refName="client-details.salary"
//                         fieldName="paySlip"
//                         allowMultiple={false}
//                         allowedTypes={['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
//                       />
//                       <span className="vf-sublabel">Document (PDF, Word, Excel, Text)</span>
//                       {this.renderFiles(this.state.paySlip, "paySlip")}

//                       <div className="vf-section-title" style={{ marginTop: '24px' }}>
//                         <span className="vf-section-title-bar" />
//                         <h5>Bank Statement <span className="vf-sublabel" style={{ display: 'inline', marginLeft: '8px' }}>(Past 3 months, can be up to 12 months)</span></h5>
//                       </div>
//                       <Uploader
//                         addFiles={this.addBankStatement}
//                         displayType="circular"
//                         refId={this.state.salaryDetailsId}
//                         refName="client-details.salary"
//                         fieldName="bankStatement"
//                         allowMultiple={false}
//                         allowedTypes={['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
//                       />
//                       <span className="vf-sublabel">Document (PDF, Word, Excel, Text)</span>
//                       {this.renderFiles(this.state.bankStatement, "bankStatement")}

//                       <div className="vf-section-title" style={{ marginTop: '24px' }}>
//                         <span className="vf-section-title-bar" />
//                         <h5>Verification Video <span className="vf-sublabel" style={{ display: 'inline', marginLeft: '8px' }}>(Instructions below)</span></h5>
//                       </div>
//                       <span className="vf-sublabel">Take a video holding your ID (NRC, Passport or Driving Licence) and state today's date</span>
//                       <Uploader
//                         addFiles={this.addVericationVideo}
//                         displayType="circular"
//                         refId={this.state.salaryDetailsId}
//                         refName="client-details.salary"
//                         fieldName="verificationVideo"
//                         allowMultiple={false}
//                         allowedTypes={['video/*']}
//                       />
//                       <span className="vf-sublabel">Video (MP4, MKV, AVI)</span>
//                       {this.renderFiles(this.state.verificationVideo, "verificationVideo")}
//                     </div>
//                   </>
//                 ) : null}

//                 <div className="vf-btn-row">
//                   <button
//                     disabled={this.state.saving}
//                     onClick={this.handleSubmit}
//                     type="button"
//                     className="vf-btn vf-btn-success"
//                   >
//                     {this.state.saving ? "Saving..." : "Save"}
//                   </button>

//                   {this.props.formDisplay === "profile" ? null : (
//                     <button
//                       type="button"
//                       className="vf-btn vf-btn-danger"
//                       onClick={() => { this.props.handleOpenAddLoanAmountForm(); this.props.handleFormReopen(); }}
//                     >
//                       Previous
//                     </button>
//                   )}
//                   {this.props.formDisplay === "profile" ? null : (
//                     <button
//                       type="button"
//                       className="vf-btn vf-btn-danger"
//                       onClick={() => { this.handleNextButton() }}
//                     >
//                       Complete
//                     </button>
//                   )}
//                 </div>

//                 {this.state.error ? <div className="vf-text-danger">{this.state.error}</div> : null}
//                 <div className="vf-text-warning">
//                   Note that all the information you provide here is kept strictly confidential, and it's solely meant for verification and loan eligibility determination purposes.
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Slide>
//     );
//   }
// }
"use client";

import { api_url, backEndUrl, getJwt } from "@/Constants";
import { getImage, textHasPhoneNumber, updateUserAccount } from "@/Functions";
import React from "react";
import Uploader from "../Includes/Uploader/Uploader";
import { Slide } from "@material-ui/core";
import WarningSnapBack from "../Includes/SnapBacks/WarningSnapBack";

/* ─── CSS (modern dark theme) ─────────────────────────────────────────────── */
const FORM_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap');

  .vf-page {
    min-height: 100vh;
    background: #0a0f1a;
    padding: 32px 16px;
    font-family: 'Inter', sans-serif;
  }
  .vf-page-inner {
    max-width: 800px;
    margin: 0 auto;
  }
  .vf-card {
    background: linear-gradient(145deg, #111827, #0d1526);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 24px 64px rgba(0,0,0,0.45);
  }
  .vf-card-header {
    padding: 28px 32px 20px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    background: linear-gradient(135deg, rgba(16,185,129,0.08), rgba(59,130,246,0.05));
  }
  .vf-card-title {
    font-size: 22px;
    font-weight: 700;
    color: #f1f5f9;
    margin: 0 0 4px;
    letter-spacing: -0.3px;
  }
  .vf-card-subtitle {
    font-size: 13px;
    color: rgba(255,255,255,0.42);
    margin: 0;
  }
  .vf-card-body {
    padding: 28px 32px 32px;
  }

  .vf-field { margin-bottom: 22px; }
  .vf-label {
    display: block;
    font-size: 11.5px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.55);
    margin-bottom: 8px;
  }
  .vf-sublabel {
    display: block;
    font-size: 12px;
    color: rgba(255,255,255,0.28);
    margin-top: -5px;
    margin-bottom: 8px;
  }

  .vf-input-group {
    display: flex;
    align-items: stretch;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.1);
    overflow: hidden;
    transition: border-color 0.2s;
  }
  .vf-input-group:focus-within {
    border-color: rgba(16,185,129,0.5);
    box-shadow: 0 0 0 3px rgba(16,185,129,0.1);
  }
  .vf-input-prefix {
    padding: 0 14px;
    background: rgba(255,255,255,0.05);
    border-right: 1px solid rgba(255,255,255,0.08);
    color: rgba(255,255,255,0.4);
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
    display: flex;
    align-items: center;
  }
  .vf-input {
    flex: 1;
    background: rgba(255,255,255,0.04);
    border: none;
    outline: none;
    padding: 13px 16px;
    color: #f1f5f9;
    font-size: 15px;
    font-family: 'Inter', sans-serif;
  }
  .vf-input::placeholder { color: rgba(255,255,255,0.2); }
  .vf-input:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .vf-btn-row {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    margin-top: 24px;
  }
  .vf-btn {
    flex: 1;
    padding: 13px 20px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: all 0.2s;
    font-family: 'Inter', sans-serif;
  }
  .vf-btn-success {
    background: linear-gradient(135deg,#10b981,#059669);
    color: #fff;
    box-shadow: 0 4px 16px rgba(16,185,129,0.3);
  }
  .vf-btn-success:hover:not(:disabled) {
    background: linear-gradient(135deg,#059669,#047857);
    box-shadow: 0 6px 20px rgba(16,185,129,0.4);
    transform: translateY(-1px);
  }
  .vf-btn-danger {
    background: linear-gradient(135deg,#ef4444,#dc2626);
    color: #fff;
    box-shadow: 0 4px 16px rgba(239,68,68,0.2);
  }
  .vf-btn-danger:hover {
    background: linear-gradient(135deg,#dc2626,#b91c1c);
    transform: translateY(-1px);
  }
  .vf-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .vf-divider {
    border: none;
    border-top: 1px solid rgba(255,255,255,0.07);
    margin: 24px 0;
  }

  .vf-text-danger {
    color: #f87171;
    font-size: 12px;
    margin-top: 8px;
  }
  .vf-text-warning {
    color: #fbbf24;
    font-size: 12px;
    margin-top: 16px;
    background: rgba(251,191,36,0.1);
    padding: 12px;
    border-radius: 10px;
  }

  .vf-file-item {
    background: rgba(255,255,255,0.03);
    border-radius: 10px;
    padding: 10px 12px;
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .vf-file-name {
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    color: #94a3b8;
  }
  .vf-remove-btn {
    background: rgba(239,68,68,0.2);
    border: none;
    color: #f87171;
    padding: 4px 12px;
    border-radius: 6px;
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s;
  }
  .vf-remove-btn:hover {
    background: rgba(239,68,68,0.4);
  }

  .vf-uploader-section {
    margin-top: 28px;
  }
  .vf-section-title {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 18px;
  }
  .vf-section-title-bar {
    width: 3px; height: 16px;
    background: linear-gradient(180deg,#10b981,#3b82f6);
    border-radius: 2px;
    flex-shrink: 0;
  }
  .vf-section-title h4 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: #e2e8f0;
  }
  .vf-section-title h5 {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    color: #cbd5e1;
  }
`;

let _cssInjected = false;
function injectCSS() {
  if (typeof document === "undefined" || _cssInjected) return;
  _cssInjected = true;
  const tag = document.createElement("style");
  tag.setAttribute("data-vf-forms", "1");
  tag.textContent = FORM_CSS;
  document.head.appendChild(tag);
}

/* ─── Component ────────────────────────────────────────────── */
export default class UpdateSalaryDetailsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employerName: '',
      salaryAmount: this.props.salaryAmount || '',
      employementVerificationNumber: '',
      companyLocation: '',
      socialSecurityNumber: '',
      paySlip: null,
      verificationVideo: null,
      bankStatement: null,
      isFormValid: false,
      saving: false,
      saved: false,
      salaryDetailsId: null,
      error: null,
      openErrorSnapBack: false,
      errorMessage: ''
    };
  }

  /* ── derived flags from constants ── */
  get requireVerificationVideo() {
    return (this.props.constants?.loansInformation?.requireVerificationVideo || false) && this.props.constants?.loansInformation?.requireVerificationVideo !== false;
  }

  get requireSocialSecurityNumber() {
    return (this.props.constants?.loansInformation?.requireSocialSecurityNumber || false) && this.props.constants?.loansInformation?.requireSocialSecurityNumber !== false;
  }

  getClientDetails = async () => {
    return await fetch(api_url + '/users/me?populate=salary.paySlip,salary.verificationVideo,salary.bankStatement', {
      headers: {
        'Authorization': `Bearer ${getJwt()}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => data)
  }

  async componentDidMount() {
    injectCSS();
    let { salary } = this.props.loggedInUser;
    if (!salary) {
      const blankSalaryObject = {
        salaryAmount: this.props.salaryAmount || '',
        paySlip: null,
        verificationVideo: null,
        bankStatement: null
      }
      const updatedUser = await updateUserAccount({ salary: blankSalaryObject }, this.props.loggedInUser.id)
      if (updatedUser.hasOwnProperty('error')) {
        return
      }
    }
    const user = await this.getClientDetails();
    salary = user.salary
    this.setState({
      employerName: salary?.employerName || '',
      salaryAmount: this.props.salaryAmount || '',
      employementVerificationNumber: salary?.employementVerificationNumber || '',
      companyLocation: salary?.companyLocation || '',
      socialSecurityNumber: salary?.socialSecurityNumber || '',
      paySlip: salary?.paySlip || '',
      verificationVideo: salary?.verificationVideo || '',
      bankStatement: salary?.bankStatement || '',
      salaryDetailsId: salary?.id || null
    }, () => {
      this.checkFormValidity(true)
    })
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: !value ? '' : value, saved: false }, this.checkFormValidity);
  }

  checkFormValidity = (initialCheck = false) => {
    const {
      employerName, salaryAmount, employementVerificationNumber,
      companyLocation, socialSecurityNumber, paySlip, bankStatement, verificationVideo
    } = this.state;

    // Build validity — SSN and verification video checks depend on settings
    const ssnValid = this.requireSocialSecurityNumber ? !!socialSecurityNumber.trim() : true;
    const videoValid = this.requireVerificationVideo ? !!verificationVideo : true;

    const isFormValid =
      employerName.trim() &&
      employementVerificationNumber &&
      companyLocation &&
      ssnValid &&
      paySlip &&
      bankStatement &&
      videoValid;

    if (!initialCheck) {
      this.setState({ isFormValid })
    } else {
      if (isFormValid) {
        this.setState({ isFormValid: isFormValid, saved: true })
      } else {
        this.setState({ isFormValid })
      }
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    const {
      employerName, salaryAmount, employementVerificationNumber,
      companyLocation, socialSecurityNumber, paySlip, bankStatement,
      verificationVideo, salaryDetailsId
    } = this.state;

    // Validate required fields (SSN only required if setting is on)
    if (!employerName || !salaryAmount || !employementVerificationNumber || !companyLocation) {
      this.setState({ error: 'Please ensure all fields are filled.', saving: false })
      return
    }
    if (this.requireSocialSecurityNumber && !socialSecurityNumber) {
      this.setState({ error: 'Please ensure all fields are filled.', saving: false })
      return
    }
    if (!textHasPhoneNumber(employementVerificationNumber)) {
      this.setState({ error: 'Please enter a valid phone number.', saving: false })
      return
    }

    const updateObject = { ...this.state }
    delete updateObject.isFormValid
    delete updateObject.saving
    delete updateObject.error
    delete updateObject.paySlip
    delete updateObject.verificationVideo
    delete updateObject.bankStatement
    delete updateObject.salaryDetailsId
    delete updateObject.openErrorSnapBack
    delete updateObject.errorMessage
    delete updateObject.saved

    if (!updateObject.employerName) updateObject.employerName = null
    if (!updateObject.salaryAmount) updateObject.salaryAmount = null
    if (!updateObject.employementVerificationNumber) updateObject.employementVerificationNumber = null
    if (!updateObject.companyLocation) updateObject.companyLocation = null
    if (!updateObject.socialSecurityNumber) updateObject.socialSecurityNumber = null

    this.setState({ saving: true, paySlip, bankStatement, verificationVideo, salaryDetailsId, saved: true })
    updateObject.id = salaryDetailsId
    const updatedUser = await updateUserAccount({ salary: updateObject }, this.props.loggedInUser.id)

    if (updatedUser.hasOwnProperty('error')) {
      this.setState({
        error: 'Something went wrong, please try again.',
        saving: false, paySlip, bankStatement, verificationVideo, salaryDetailsId
      })
      return
    }
    this.setState({
      error: null, saving: false, paySlip, bankStatement, verificationVideo, salaryDetailsId
    }, () => this.checkFormValidity())
  }

  addPaySlip = (files) => {
    const existing = this.state.paySlip
    const newFiles = existing ? [...existing, ...files] : files
    this.setState({ paySlip: newFiles, saving: false, error: null }, this.checkFormValidity)
  }

  addVericationVideo = (files) => {
    const existing = this.state.verificationVideo
    const newFiles = existing ? [...existing, ...files] : files
    this.setState({ verificationVideo: newFiles, saving: false, error: null }, this.checkFormValidity)
  }

  addBankStatement = (files) => {
    const existing = this.state.bankStatement
    const newFiles = existing ? [...existing, ...files] : files
    this.setState({ bankStatement: newFiles, saving: false, error: null }, this.checkFormValidity)
  }

  handleRemoveImage = async (uploadid, filesArr, arrName) => {
    const removed = await fetch(api_url + '/upload/files/' + uploadid, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${getJwt()}`,
        'Content-Type': 'application/json'
      }
    }).then(r => r.json()).catch(console.error)

    if (removed) {
      const newArray = filesArr.filter(f => f.id !== uploadid)
      this.setState(
        { [arrName]: newArray.length < 1 ? null : newArray },
        this.checkFormValidity
      )
      if (typeof document !== 'undefined') {
        const el = document.getElementById("#" + uploadid)
        if (el) el.style.display = "none"
      }
    }
  }

  renderFiles = (files, arrName) => {
    if (!files) return <></>
    return files.map((file) => {
      if (file.hasOwnProperty("attributes")) {
        file.attributes.id = file.id
        file = file.attributes
      }
      if (file.mime.startsWith('application/')) {
        return (
          <div id={"#" + file.id} key={file.id} className="vf-file-item">
            <span className="vf-file-name">{file.name}</span>
            <button className="vf-remove-btn" onClick={() => this.handleRemoveImage(file.id, files, arrName)}>Remove</button>
          </div>
        )
      } else if (file.mime.startsWith('video/')) {
        return (
          <div id={"#" + file.id} key={file.id} className="vf-file-item">
            <div style={{ width: '100%', maxWidth: '200px', background: '#1e293b', borderRadius: '8px', overflow: 'hidden' }}>
              <video style={{ width: '100%' }} controls>
                <source src={backEndUrl + file.url} type={file.mime} />
                Sorry, we are unable to show this video
              </video>
            </div>
            <button className="vf-remove-btn" onClick={() => this.handleRemoveImage(file.id, files, arrName)}>Remove</button>
          </div>
        )
      } else {
        return (
          <div id={"#" + file.id} key={file.id} className="vf-file-item">
            <span className="vf-file-name">File failed to be displayed</span>
            <button className="vf-remove-btn" onClick={() => this.handleRemoveImage(file.id, files, arrName)}>Remove</button>
          </div>
        )
      }
    })
  }

  handleOpenErrorSnapBack = () => {
    this.setState({ openErrorSnapBack: false })
  }

  handleNextButton = () => {
    const { isFormValid, saved } = this.state
    if (!isFormValid) {
      this.setState({
        openErrorSnapBack: true,
        errorMessage: 'Please ensure all fields are filled and saved before you can proceed.'
      })
      return
    }
    if (!saved) {
      this.setState({
        openErrorSnapBack: true,
        errorMessage: 'Please save the form to proceed.'
      })
      return
    }
    this.props.handleCreateBlankLoan()
  }

  render() {
    const {
      employerName, salaryAmount, employementVerificationNumber,
      companyLocation, socialSecurityNumber, isFormValid
    } = this.state;

    const showSSN = this.requireSocialSecurityNumber;
    const showVerificationVideo = this.requireVerificationVideo;

    return (
      <Slide in={true} direction="left">
        <div className="vf-page" style={{ paddingTop: 0 }}>
          {this.state.openErrorSnapBack
            ? <WarningSnapBack handleOpenErrorSnapBack={this.handleOpenErrorSnapBack} errorMessage={this.state.errorMessage} />
            : null
          }
          <div className="vf-page-inner">
            <div className="vf-card">
              <div className="vf-card-header">
                <h2 className="vf-card-title">Salary &amp; Company Details</h2>
                <p className="vf-card-subtitle">Provide employment and verification information</p>
              </div>

              <div className="vf-card-body">
                <div className="vf-field">
                  <label className="vf-label" htmlFor="employerName">Company / Employer Name</label>
                  <input
                    className="vf-input"
                    id="employerName"
                    name="employerName"
                    type="text"
                    autoComplete="off"
                    disabled={!this.state.salaryDetailsId}
                    value={employerName}
                    onChange={this.handleInputChange}
                    style={{ width: '100%', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                </div>

                <div className="vf-field">
                  <label className="vf-label" htmlFor="employementVerificationNumber">Employment Verification Phone Number</label>
                  <span className="vf-sublabel">Any Superior or Employer's Phone number</span>
                  <input
                    className="vf-input"
                    id="employementVerificationNumber"
                    name="employementVerificationNumber"
                    value={employementVerificationNumber}
                    type="text"
                    autoComplete="off"
                    onChange={this.handleInputChange}
                    style={{ width: '100%', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                </div>

                {/* ── Social Security Number — only shown when required ── */}
                {showSSN && (
                  <div className="vf-field">
                    <label className="vf-label" htmlFor="socialSecurityNumber">Social Security Number</label>
                    <input
                      className="vf-input"
                      id="socialSecurityNumber"
                      name="socialSecurityNumber"
                      type="text"
                      autoComplete="off"
                      disabled={!this.state.salaryDetailsId}
                      value={socialSecurityNumber}
                      onChange={this.handleInputChange}
                      style={{ width: '100%', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)' }}
                    />
                  </div>
                )}

                <div className="vf-field">
                  <label className="vf-label">Salary</label>
                  <div className="vf-input-group">
                    <span className="vf-input-prefix">K</span>
                    <input
                      name="salaryAmount"
                      value={salaryAmount}
                      disabled
                      type="text"
                      className="vf-input"
                      style={{ borderRadius: '0 10px 10px 0', borderLeft: 'none' }}
                    />
                    <span className="vf-input-prefix">.00</span>
                  </div>
                </div>

                <div className="vf-field">
                  <label className="vf-label" htmlFor="companyLocation">Company Address</label>
                  <span className="vf-sublabel">House No., Area, City, Province</span>
                  <input
                    className="vf-input"
                    id="companyLocation"
                    name="companyLocation"
                    type="text"
                    autoComplete="off"
                    disabled={!this.state.salaryDetailsId}
                    value={companyLocation}
                    onChange={this.handleInputChange}
                    style={{ width: '100%', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                </div>

                {this.state.salaryDetailsId ? (
                  <>
                    <hr className="vf-divider" />
                    <div className="vf-section-title">
                      <span className="vf-section-title-bar" />
                      <h4>Identity &amp; Verification</h4>
                    </div>

                    <div className="vf-uploader-section">
                      {/* Pay Slip */}
                      <div className="vf-section-title">
                        <span className="vf-section-title-bar" />
                        <h5>PaySlip <span className="vf-sublabel" style={{ display: 'inline', marginLeft: '8px' }}>(Past 3 months, can be up to 12 months)</span></h5>
                      </div>
                      <Uploader
                        addFiles={this.addPaySlip}
                        displayType="circular"
                        refId={this.state.salaryDetailsId}
                        refName="client-details.salary"
                        fieldName="paySlip"
                        allowMultiple={false}
                        allowedTypes={['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
                      />
                      <span className="vf-sublabel">Document (PDF, Word, Excel, Text)</span>
                      {this.renderFiles(this.state.paySlip, "paySlip")}

                      {/* Bank Statement */}
                      <div className="vf-section-title" style={{ marginTop: '24px' }}>
                        <span className="vf-section-title-bar" />
                        <h5>Bank Statement <span className="vf-sublabel" style={{ display: 'inline', marginLeft: '8px' }}>(Past 3 months, can be up to 12 months)</span></h5>
                      </div>
                      <Uploader
                        addFiles={this.addBankStatement}
                        displayType="circular"
                        refId={this.state.salaryDetailsId}
                        refName="client-details.salary"
                        fieldName="bankStatement"
                        allowMultiple={false}
                        allowedTypes={['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
                      />
                      <span className="vf-sublabel">Document (PDF, Word, Excel, Text)</span>
                      {this.renderFiles(this.state.bankStatement, "bankStatement")}

                      {/* Verification Video — only shown when required */}
                      {showVerificationVideo && (
                        <>
                          <div className="vf-section-title" style={{ marginTop: '24px' }}>
                            <span className="vf-section-title-bar" />
                            <h5>Verification Video <span className="vf-sublabel" style={{ display: 'inline', marginLeft: '8px' }}>(Instructions below)</span></h5>
                          </div>
                          <span className="vf-sublabel">Take a video holding your ID (NRC, Passport or Driving Licence) and state today's date</span>
                          <Uploader
                            addFiles={this.addVericationVideo}
                            displayType="circular"
                            refId={this.state.salaryDetailsId}
                            refName="client-details.salary"
                            fieldName="verificationVideo"
                            allowMultiple={false}
                            allowedTypes={['video/*']}
                          />
                          <span className="vf-sublabel">Video (MP4, MKV, AVI)</span>
                          {this.renderFiles(this.state.verificationVideo, "verificationVideo")}
                        </>
                      )}
                    </div>
                  </>
                ) : null}

                <div className="vf-btn-row">
                  <button
                    disabled={this.state.saving}
                    onClick={this.handleSubmit}
                    type="button"
                    className="vf-btn vf-btn-success"
                  >
                    {this.state.saving ? "Saving..." : "Save"}
                  </button>

                  {this.props.formDisplay === "profile" ? null : (
                    <button
                      type="button"
                      className="vf-btn vf-btn-danger"
                      onClick={() => { this.props.handleOpenAddLoanAmountForm(); this.props.handleFormReopen(); }}
                    >
                      Previous
                    </button>
                  )}
                  {this.props.formDisplay === "profile" ? null : (
                    <button
                      type="button"
                      className="vf-btn vf-btn-danger"
                      onClick={() => { this.handleNextButton() }}
                    >
                      Complete
                    </button>
                  )}
                </div>

                {this.state.error ? <div className="vf-text-danger">{this.state.error}</div> : null}
                <div className="vf-text-warning">
                  Note that all the information you provide here is kept strictly confidential, and it's solely meant for verification and loan eligibility determination purposes.
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slide>
    );
  }
}