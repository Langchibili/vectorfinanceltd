// // 'use client'

// // import EmailOtpVerificationForm from "@/components/Forms/EmailOtpVerificationForm";
// // import PhoneOtpVerificationForm from "@/components/Forms/PhoneOtpVerificationForm";
// // import { submitCreateUserRequest } from "@/Constants";
// // import { dynamicConfig, getFormByName, getReferrerFromReferralCode, scrolltoTopOFPage, sendOTP, textHasPhoneNumber, updateUserAccount, validateEmail } from "@/Functions";
// // import { saveJwt } from "@/Secrets";
// // import { Slide } from "@material-ui/core";
// // import { Alert } from "@mui/material";
// // import Link from "next/link";
// // import { useRef, useState } from "react";

// // // Force the page to be dynamically rendered on every request
// // export const dynamic = dynamicConfig();

// // export default function Signup() {  
// //   // Refs for the form inputs
// //   const emailRef = useRef(null);
// //   const firstNameRef = useRef(null);
// //   const lastNameRef = useRef(null);
// //   const phoneRef = useRef(null);
// //   const passwordRef = useRef(null);
// //   const referralCodeRef = useRef(null)


// //   // State for error messages
// //   const [serverError,setServerError] = useState(null)
// //   const [numberOtpVerified,setNumberOtpVerified] = useState(false)
// //   const [emailOtpVerified,setEmailOtpVerified] = useState(false)
// //   const [beginOtpVerification,setBeginOtpVerification] = useState(true)
// //   const [loading,setLoading] = useState(false)
// //   const [showPassword, setShowPassword] = useState(false);

// //   const [errors, setErrors] = useState({
// //     email: "",
// //     firstName: "",
// //     lastName: "",
// //     phone: "",
// //     password: ""
// //   });

// //   // Form validation checks
// //   const validateForm = () => {
// //     const email = emailRef.current.value.trim();
// //     const firstName = firstNameRef.current.value.trim();
// //     const lastName = lastNameRef.current.value.trim();
// //     const phone = phoneRef.current.value.trim();
// //     const password = passwordRef.current.value.trim();


// //     let isValid = true;
// //     const newErrors = { email: "", firstName: "", lastName: "", phone: "", password: "" };

// //     // Basic validation (adjust rules as needed)
// //     if (!email) {
// //       newErrors.email = "Please enter email";
// //       isValid = false;
// //     }

// //     if (!firstName) {
// //       newErrors.firstName = "Please enter your first name";
// //       isValid = false;
// //     }

// //     if (!lastName) {
// //       newErrors.lastName = "Please enter your last name";
// //       isValid = false;
// //     }

// //     if (!phone) {
// //       newErrors.phone = "Please enter your phone number";
// //       isValid = false;
// //     }

// //     if (!password) {
// //       newErrors.password = "Please enter your password";
// //       isValid = false;
// //     } 
// //     // else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)) {
// //     //   newErrors.password = "Password must meet the criteria";
// //     //   isValid = false;
// //     // }

// //     if (!textHasPhoneNumber(phone)) {
// //         newErrors.phone = "Please enter a valid phone number";
// //         isValid = false;
// //     }
// //     if(!validateEmail(email)){
// //         newErrors.email = "Please enter a valid email address";
// //         isValid = false;
// //     }

// //     setErrors(newErrors);
// //     return isValid;
// //   };

// //   // Handle form submit (You will add the actual submit logic)
// //   const handleSubmit = async (e) => {
// //     e.preventDefault()
// //     const referralCode = referralCodeRef.current.value.trim();
// //     const validatereferralcode = await validateReferralCode(referralCode)

// //     if(!validatereferralcode){
// //       setServerError("Please enter a valid reference code, or remove it entirely.")
// //       return
// //     }
// //     if(!numberOtpVerified){
// //       setServerError("Please verify your email address")
// //       return
// //     }
// //     if(!emailOtpVerified){
// //       setServerError("Please verify your email address")
// //       return
// //     }

// //     const email = emailRef.current.value.trim();
// //     const firstName = firstNameRef.current.value.trim();
// //     const lastName = lastNameRef.current.value.trim();
// //     const phone = phoneRef.current.value.trim();
// //     const password = passwordRef.current.value.trim();

// //     const requestObject = {
// //         username: phone,
// //         email:email,
// //         password:password
// //     }

// //     if (validateForm()) {
// //        setLoading(true) 
// //        const response = await submitCreateUserRequest(requestObject) // initial user account creation
// //        if(response.hasOwnProperty('error')){
// //            setServerError(response.error.message.replace("Username","Number"))
// //            setLoading(false)
// //            return
// //        }

// //        else{
// //           saveJwt(response.jwt)
// //           const referrer = await getReferrer(referralCode) // get user who referred this user
// //           const form = await getFormByName('GeneralLoanForm')
// //           const userUpdateObject = {
// //                   fullnames: firstName+" "+lastName,
// //                   referredBy: referrer?.id || null,
// //                   formsToFill: {connect:[form.id]},
// //                   "details":{
// //                       firstname: firstName,
// //                       lastname: lastName,
// //                       age:null,
// //                       gender:null,
// //                       dateOfBirth:null,
// //                       address:null
// //                     }
// //           }
// //           //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzI5MDMzMTA2LCJleHAiOjQ4ODQ3OTMxMDZ9.n-pci1lnF4rp1XU60Z5rvGF4omUtT50o-8D13-Ei7Yc
// //           const updatedUserAccount = await updateUserAccount(userUpdateObject,response.user.id,response.jwt)
// //           if(updatedUserAccount){
// //             window.location = "/"
// //           }
// //        }
// //     }
// //     else {
// //       return
// //     }
// //   }

// //   const getReferrer = async (referralCode)=>{
// //         return await getReferrerFromReferralCode(referralCode)
// //   }


// //   const getDefaultReferralCode = ()=>{
// //        if(typeof document !== "undefined"){
// //         if(localStorage.getItem('referralCode')){
// //           return localStorage.getItem('referralCode')
// //         }
// //        }
// //        return ''
// //   }

// //   const validateReferralCode = async (referralCode)=>{
// //        const referredBy = await getReferrerFromReferralCode(referralCode)
// //        if(referralCode === ''){
// //           return true
// //        }
// //        if(!referredBy){
// //           return false
// //        }
// //        return true
// //   }

// //   const handleBeginOtpVerification = async (e)=>{
// //     e.preventDefault()
// //     if(validateForm()){
// //       const phone = phoneRef.current.value.trim();
// //       const email = emailRef.current.value.trim();
// //       if(!phone || !email){ 
// //         return
// //       }
// //       if(!textHasPhoneNumber(phone)){
// //         return
// //       }
// //       if(!validateEmail(email)){
// //         return
// //       }
// //       setBeginOtpVerification(false)
// //       sendOTP(phone,"phoneNumber")
// //       sendOTP(email,"email")
// //     }
// //   }

// //   const renderPhoneOtpVerificationForm = ()=>{
// //     if(phoneRef.current && textHasPhoneNumber(phoneRef.current.value.trim())){
// //        return (
// //         <> <hr/> <h5>Verify Your Number</h5>
// //             <PhoneOtpVerificationForm action={()=>{setNumberOtpVerified(true)}} phoneNumber={phoneRef.current.value.trim()}/> 
// //          </>
// //        )
// //     }
// //   }

// //   const renderEmailOtpVerificationForm = ()=>{
// //     if(emailRef.current && validateEmail(emailRef.current.value.trim())){
// //        return (
// //         <> <hr/><h5>Verify Your Email Address</h5>
// //             <EmailOtpVerificationForm action={()=>{setEmailOtpVerified(true)}} email={emailRef.current.value.trim()}/> 
// //             <br/>
// //         </>
// //        )
// //     }
// //   }


// //   scrolltoTopOFPage()
// //   return (
// //     <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
// //       <div className="bg-overlay" />
// //       <div className="auth-page-content overflow-hidden pt-lg-5">
// //         <div className="container">
// //           <div className="row">
// //             <div className="col-lg-12">
// //               <div className="card overflow-hidden m-0">
// //                 <div className="row justify-content-center g-0">
// //                  <Slide in={true} direction="right">
// //                   <div className="col-lg-6">
// //                     <div className="p-lg-5 p-4 auth-one-bg h-100">
// //                       <div className="bg-overlay" />
// //                       {/* Carousel section omitted for brevity */}
// //                     </div>
// //                   </div>
// //                   </Slide>
// //                   <Slide in={true} direction="left">
// //                   <div className="col-lg-6">
// //                     <div className="p-lg-5 p-4">
// //                       <div>
// //                         <h5 className="text-primary">Register Account</h5>
// //                         <p className="text-muted">
// //                           Sign up and access one of our low-interest loans within 24hrs.
// //                         </p>
// //                       </div>
// //                       <div className="mt-4">
// //                         <form className="needs-validation" noValidate="">
// //                           <div className="mb-3">
// //                             <label htmlFor="firstname" className="form-label">
// //                               First name <span className="text-danger">*</span>
// //                             </label>
// //                             <input
// //                               type="text"
// //                               className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
// //                               id="firstname"
// //                               placeholder="Enter First name"
// //                               ref={firstNameRef}
// //                             />
// //                             {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
// //                           </div>
// //                           <div className="mb-3">
// //                             <label htmlFor="lastname" className="form-label">
// //                               Last name <span className="text-danger">*</span>
// //                             </label>
// //                             <input
// //                               type="text"
// //                               className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
// //                               id="lastname"
// //                               placeholder="Enter Last name"
// //                               ref={lastNameRef}
// //                             />
// //                             {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
// //                           </div>
// //                           <div className="mb-3">
// //                             <label htmlFor="phonenumber" className="form-label">
// //                               Phone number <span className="text-danger">*</span>
// //                             </label>
// //                             <input
// //                               disabled={phoneRef.current && textHasPhoneNumber(phoneRef.current.value.trim())}
// //                               type="text"
// //                               className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
// //                               id="phonenumber"
// //                               placeholder="Enter Phone Number"
// //                               ref={phoneRef}
// //                             />
// //                             {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
// //                           </div>
// //                           <div className="mb-3">
// //                             <label htmlFor="useremail" className="form-label">
// //                               Email <span className="text-danger">*</span>
// //                             </label>
// //                             <input
// //                               type="email"
// //                               disabled={emailRef.current && validateEmail(emailRef.current.value.trim())}
// //                               className={`form-control ${errors.email ? 'is-invalid' : ''}`}
// //                               id="useremail"
// //                               placeholder="Enter Email Address"
// //                               ref={emailRef}
// //                             />
// //                             {errors.email && <div className="invalid-feedback">{errors.email}</div>}
// //                           </div>
// //                           {/* <div className="mb-3">
// //                             <label className="form-label" htmlFor="password-input">
// //                               Password <span className="text-danger">*</span>
// //                             </label>
// //                             <div className="position-relative auth-pass-inputgroup">
// //                               <input
// //                                 type="password"
// //                                 className={`form-control pe-5 password-input ${errors.password ? 'is-invalid' : ''}`}
// //                                 placeholder="Enter Password"
// //                                 id="password-input"
// //                                 ref={passwordRef}
// //                               />
// //                               <button
// //                                   type="button"
// //                                   className="btn btn-link position-absolute end-0 top-0 text-decoration-none shadow-none text-muted password-addon"
// //                                   onClick={() =>
// //                                     setShowPassword((prev) => !prev)
// //                                   }
// //                                   style={{ zIndex: 2 }}
// //                                 >
// //                                   <i
// //                                     className={
// //                                       showPassword
// //                                         ? "ri-eye-off-fill align-middle"
// //                                         : "ri-eye-fill align-middle"
// //                                     }
// //                                   />
// //                                 </button>
// //                               {errors.password && <div className="invalid-feedback">{errors.password}</div>}
// //                             </div>
// //                           </div> */}
// //                         <div className="mb-3">
// //                           <label className="form-label" htmlFor="password-input">
// //                             Password <span className="text-danger">*</span>
// //                           </label>
// //                           <div className="position-relative auth-pass-inputgroup">
// //                             <input
// //                               type={showPassword ? "text" : "password"}
// //                               className={`form-control pe-5 password-input ${errors.password ? 'is-invalid' : ''}`}
// //                               placeholder="Enter Password"
// //                               id="password-input"
// //                               ref={passwordRef}
// //                             />
// //                             <button
// //                               type="button"
// //                               className="btn btn-link position-absolute end-0 top-0 text-decoration-none shadow-none text-muted password-addon"
// //                               onClick={() => setShowPassword((prev) => !prev)}
// //                               style={{ zIndex: 2 }}
// //                               tabIndex={-1}
// //                             >
// //                               <i
// //                                 className={
// //                                   showPassword
// //                                     ? "ri-eye-off-fill align-middle"
// //                                     : "ri-eye-fill align-middle"
// //                                 }
// //                               />
// //                             </button>
// //                             {errors.password && <div className="invalid-feedback">{errors.password}</div>}
// //                           </div>
// //                         </div>

// //                           {!numberOtpVerified? <><br/>{renderPhoneOtpVerificationForm()}</> : <Alert severity="success" sx={{marginBottom:'10px'}}>Phone Number Verified</Alert>}
// //                           {!emailOtpVerified? <><br/>{renderEmailOtpVerificationForm()}</> : <Alert severity="success" sx={{marginBottom:'10px'}}>Email Address Verified</Alert>}
// //                           <label htmlFor="referral-code" className="form-label">
// //                               Referral Code: <span className="text-info">(leave blank if you don't have a code)</span>
// //                           </label>
// //                           <input
// //                                 type="text"
// //                                 className={`form-control pe-5 password-input ${errors.password ? 'is-invalid' : ''}`}
// //                                 placeholder="Enter Code"
// //                                 id="password-input"
// //                                 defaultValue={getDefaultReferralCode()}
// //                                 ref={referralCodeRef}
// //                               />
// //                           <div className="mb-4">
// //                                 <p className="mb-0 fs-12 text-muted fst-italic">
// //                                 By registering you agree to the VectorFinance{" "}
// //                                     <Link
// //                                     href="/termsofuse"
// //                                     className="text-primary text-decoration-underline fst-normal fw-medium"
// //                                     >
// //                                     Terms of Use
// //                                     </Link>
// //                                 </p>
// //                             </div>
// //                             <p className="text text-danger">{serverError}</p>
// //                           <div className="mt-4">
// //                             {beginOtpVerification? <button className="btn btn-success w-100" onClick={handleBeginOtpVerification}>
// //                                 Sign Up
// //                             </button> :
// //                             <button onClick={handleSubmit} disabled={loading} className="btn btn-success w-100">
// //                               {loading? "Setting Account Up..." : "Sign Up"}
// //                             </button>}
// //                           </div>
// //                         </form>
// //                       </div>
// //                       <div className="mt-5 text-center">
// //                         <p className="mb-0">
// //                           Already have an account?{" "}
// //                           <Link
// //                             href="/signin"
// //                             className="fw-semibold text-primary text-decoration-underline"
// //                           >
// //                             Login
// //                           </Link>
// //                         </p>
// //                       </div>
// //                     </div>
// //                   </div>
// //                   </Slide>
// //                 </div>
// //               </div>
// //               {/* end card */}
// //             </div>
// //             {/* end col */}
// //           </div>
// //           {/* end row */}
// //         </div>
// //         {/* end container */}
// //       </div>
// //       {/* end auth page content */}
// //     </div>
// //   )
// // }

// 'use client'

// import EmailOtpVerificationForm from "@/components/Forms/EmailOtpVerificationForm";
// import PhoneOtpVerificationForm from "@/components/Forms/PhoneOtpVerificationForm";
// import { submitCreateUserRequest } from "@/Constants";
// import { dynamicConfig, getFormByName, getReferrerFromReferralCode, scrolltoTopOFPage, sendOTP, textHasPhoneNumber, updateUserAccount, validateEmail } from "@/Functions";
// import { saveJwt } from "@/Secrets";
// import { Slide } from "@material-ui/core";
// import { Alert, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
// import Link from "next/link";
// import { useRef, useState } from "react";

// // Force the page to be dynamically rendered on every request
// export const dynamic = dynamicConfig();

// export default function Signup() {
//   // Refs for the form inputs
//   const emailRef = useRef(null);
//   const firstNameRef = useRef(null);
//   const lastNameRef = useRef(null);
//   const phoneRef = useRef(null);
//   const passwordRef = useRef(null);
//   const referralCodeRef = useRef(null)

//   // Tracks the phone number an OTP was last sent to, so we know when to resend
//   const lastSentPhoneRef = useRef(null)

//   // State for error messages
//   const [serverError, setServerError] = useState(null)
//   const [numberOtpVerified, setNumberOtpVerified] = useState(false)
//   const [emailOtpVerified, setEmailOtpVerified] = useState(false)
//   const [beginOtpVerification, setBeginOtpVerification] = useState(true)
//   const [loading, setLoading] = useState(false)
//   const [showPassword, setShowPassword] = useState(false);

//   // State for the "are you sure you want to verify" confirmation modal
//   const [confirmModalOpen, setConfirmModalOpen] = useState(false)
//   const [confirmModalType, setConfirmModalType] = useState(null) // 'phone' | 'email'
//   const [confirmModalValue, setConfirmModalValue] = useState('')

//   const [errors, setErrors] = useState({
//     email: "",
//     firstName: "",
//     lastName: "",
//     phone: "",
//     password: ""
//   });

//   // Form validation checks
//   const validateForm = () => {
//     const email = emailRef.current.value.trim();
//     const firstName = firstNameRef.current.value.trim();
//     const lastName = lastNameRef.current.value.trim();
//     const phone = phoneRef.current.value.trim();
//     const password = passwordRef.current.value.trim();


//     let isValid = true;
//     const newErrors = { email: "", firstName: "", lastName: "", phone: "", password: "" };

//     // Basic validation (adjust rules as needed)
//     if (!email) {
//       newErrors.email = "Please enter email";
//       isValid = false;
//     }

//     if (!firstName) {
//       newErrors.firstName = "Please enter your first name";
//       isValid = false;
//     }

//     if (!lastName) {
//       newErrors.lastName = "Please enter your last name";
//       isValid = false;
//     }

//     if (!phone) {
//       newErrors.phone = "Please enter your phone number";
//       isValid = false;
//     }

//     if (!password) {
//       newErrors.password = "Please enter your password";
//       isValid = false;
//     }
//     // else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)) {
//     //   newErrors.password = "Password must meet the criteria";
//     //   isValid = false;
//     // }

//     if (!textHasPhoneNumber(phone)) {
//       newErrors.phone = "Please enter a valid phone number";
//       isValid = false;
//     }
//     if (!validateEmail(email)) {
//       newErrors.email = "Please enter a valid email address";
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   // Handle form submit (You will add the actual submit logic)
//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     const referralCode = referralCodeRef.current.value.trim();
//     const validatereferralcode = await validateReferralCode(referralCode)

//     if (!validatereferralcode) {
//       setServerError("Please enter a valid reference code, or remove it entirely.")
//       return
//     }
//     if (!numberOtpVerified) {
//       setServerError("Please verify your email address")
//       return
//     }
//     if (!emailOtpVerified) {
//       setServerError("Please verify your email address")
//       return
//     }

//     const email = emailRef.current.value.trim();
//     const firstName = firstNameRef.current.value.trim();
//     const lastName = lastNameRef.current.value.trim();
//     const phone = phoneRef.current.value.trim();
//     const password = passwordRef.current.value.trim();

//     const requestObject = {
//       username: phone,
//       email: email,
//       password: password
//     }

//     if (validateForm()) {
//       setLoading(true)
//       const response = await submitCreateUserRequest(requestObject) // initial user account creation
//       if (response.hasOwnProperty('error')) {
//         setServerError(response.error.message.replace("Username", "Number"))
//         setLoading(false)
//         return
//       }

//       else {
//         saveJwt(response.jwt)
//         const referrer = await getReferrer(referralCode) // get user who referred this user
//         const form = await getFormByName('GeneralLoanForm')
//         const userUpdateObject = {
//           fullnames: firstName + " " + lastName,
//           referredBy: referrer?.id || null,
//           formsToFill: { connect: [form.id] },
//           "details": {
//             firstname: firstName,
//             lastname: lastName,
//             age: null,
//             gender: null,
//             dateOfBirth: null,
//             address: null
//           }
//         }
//         //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzI5MDMzMTA2LCJleHAiOjQ4ODQ3OTMxMDZ9.n-pci1lnF4rp1XU60Z5rvGF4omUtT50o-8D13-Ei7Yc
//         const updatedUserAccount = await updateUserAccount(userUpdateObject, response.user.id, response.jwt)
//         if (updatedUserAccount) {
//           window.location = "/"
//         }
//       }
//     }
//     else {
//       return
//     }
//   }

//   const getReferrer = async (referralCode) => {
//     return await getReferrerFromReferralCode(referralCode)
//   }


//   const getDefaultReferralCode = () => {
//     if (typeof document !== "undefined") {
//       if (localStorage.getItem('referralCode')) {
//         return localStorage.getItem('referralCode')
//       }
//     }
//     return ''
//   }

//   const validateReferralCode = async (referralCode) => {
//     const referredBy = await getReferrerFromReferralCode(referralCode)
//     if (referralCode === '') {
//       return true
//     }
//     if (!referredBy) {
//       return false
//     }
//     return true
//   }

//   const handleBeginOtpVerification = async (e) => {
//     e.preventDefault()
//     if (validateForm()) {
//       const phone = phoneRef.current.value.trim();
//       const email = emailRef.current.value.trim();
//       if (!phone || !email) {
//         return
//       }
//       if (!textHasPhoneNumber(phone)) {
//         return
//       }
//       if (!validateEmail(email)) {
//         return
//       }
//       setBeginOtpVerification(false)
//       sendOTP(phone, "phoneNumber")
//       sendOTP(email, "email")
//       // remember which number we last sent an OTP to, so we know when to resend
//       lastSentPhoneRef.current = phone
//     }
//   }

//   // If the user edits their phone number before verifying, resend the OTP
//   // to the new number using the exact same sendOTP("phoneNumber") call
//   // that the resend flow uses.
//   const handlePhoneBlur = () => {
//     if (numberOtpVerified) return
//     const phone = phoneRef.current.value.trim()
//     if (textHasPhoneNumber(phone) && phone !== lastSentPhoneRef.current) {
//       lastSentPhoneRef.current = phone
//       sendOTP(phone, "phoneNumber")
//     }
//   }

//   // Instead of immediately marking phone/email as verified, ask the user
//   // to confirm via a modal first.
//   const openConfirmModal = (type, value) => {
//     setConfirmModalType(type)
//     setConfirmModalValue(value)
//     setConfirmModalOpen(true)
//   }

//   const handleConfirmModalYes = () => {
//     if (confirmModalType === 'phone') {
//       setNumberOtpVerified(true)
//     }
//     if (confirmModalType === 'email') {
//       setEmailOtpVerified(true)
//     }
//     setConfirmModalOpen(false)
//   }

//   const handleConfirmModalNo = () => {
//     setConfirmModalOpen(false)
//   }

//   // Only show the verification forms once both the phone number and email
//   // are valid - i.e. the user has fully filled in both fields
//   const showVerificationForms = () => {
//     return !!(
//       phoneRef.current && emailRef.current &&
//       textHasPhoneNumber(phoneRef.current.value.trim()) &&
//       validateEmail(emailRef.current.value.trim())
//     )
//   }

//   const renderPhoneOtpVerificationForm = () => {
//     if (phoneRef.current && textHasPhoneNumber(phoneRef.current.value.trim())) {
//       return (
//         <div className="shadow-lg rounded p-3 mb-3 bg-white border">
//           <hr /> <h5>Verify Your Number</h5>
//           <p className="text-muted mb-2">{phoneRef.current.value.trim()}</p>
//           <PhoneOtpVerificationForm action={() => { openConfirmModal('phone', phoneRef.current.value.trim()) }} phoneNumber={phoneRef.current.value.trim()} />
//         </div>
//       )
//     }
//   }

//   const renderEmailOtpVerificationForm = () => {
//     if (emailRef.current && validateEmail(emailRef.current.value.trim())) {
//       return (
//         <div className="shadow-lg rounded p-3 mb-3 bg-white border">
//           <hr /><h5>Verify Your Email Address</h5>
//           <p className="text-muted mb-2">{emailRef.current.value.trim()}</p>
//           <EmailOtpVerificationForm action={() => { openConfirmModal('email', emailRef.current.value.trim()) }} email={emailRef.current.value.trim()} />
//           <br />
//         </div>
//       )
//     }
//   }


//   scrolltoTopOFPage()
//   return (
//     <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
//       <div className="bg-overlay" />
//       <div className="auth-page-content overflow-hidden pt-lg-5">
//         <div className="container">
//           <div className="row">
//             <div className="col-lg-12">
//               <div className="card overflow-hidden m-0">
//                 <div className="row justify-content-center g-0">
//                   <Slide in={true} direction="right">
//                     <div className="col-lg-6">
//                       <div className="p-lg-5 p-4 auth-one-bg h-100">
//                         <div className="bg-overlay" />
//                         {/* Carousel section omitted for brevity */}
//                       </div>
//                     </div>
//                   </Slide>
//                   <Slide in={true} direction="left">
//                     <div className="col-lg-6">
//                       <div className="p-lg-5 p-4">
//                         <div>
//                           <h5 className="text-primary">Register Account</h5>
//                           <p className="text-muted">
//                             Sign up and access one of our low-interest loans within 24hrs.
//                           </p>
//                         </div>
//                         <div className="mt-4">
//                           <form className="needs-validation" noValidate="">
//                             <div className="mb-3">
//                               <label htmlFor="firstname" className="form-label">
//                                 First name <span className="text-danger">*</span>
//                               </label>
//                               <input
//                                 type="text"
//                                 className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
//                                 id="firstname"
//                                 placeholder="Enter First name"
//                                 ref={firstNameRef}
//                               />
//                               {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
//                             </div>
//                             <div className="mb-3">
//                               <label htmlFor="lastname" className="form-label">
//                                 Last name <span className="text-danger">*</span>
//                               </label>
//                               <input
//                                 type="text"
//                                 className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
//                                 id="lastname"
//                                 placeholder="Enter Last name"
//                                 ref={lastNameRef}
//                               />
//                               {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
//                             </div>
//                             <div className="mb-3">
//                               <label htmlFor="phonenumber" className="form-label">
//                                 Phone number <span className="text-danger">*</span>
//                               </label>
//                               <input
//                                 disabled={numberOtpVerified}
//                                 type="text"
//                                 className={`form-control ${errors.phone ? 'is-invalid' : ''} ${numberOtpVerified ? 'bg-light' : ''}`}
//                                 id="phonenumber"
//                                 placeholder="Enter Phone Number"
//                                 ref={phoneRef}
//                                 onBlur={handlePhoneBlur}
//                               />
//                               {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
//                             </div>
//                             <div className="mb-3">
//                               <label htmlFor="useremail" className="form-label">
//                                 Email <span className="text-danger">*</span>
//                               </label>
//                               <input
//                                 type="email"
//                                 disabled={emailOtpVerified}
//                                 className={`form-control ${errors.email ? 'is-invalid' : ''} ${emailOtpVerified ? 'bg-light' : ''}`}
//                                 id="useremail"
//                                 placeholder="Enter Email Address"
//                                 ref={emailRef}
//                               />
//                               {errors.email && <div className="invalid-feedback">{errors.email}</div>}
//                             </div>
//                             {/* <div className="mb-3">
//                             <label className="form-label" htmlFor="password-input">
//                               Password <span className="text-danger">*</span>
//                             </label>
//                             <div className="position-relative auth-pass-inputgroup">
//                               <input
//                                 type="password"
//                                 className={`form-control pe-5 password-input ${errors.password ? 'is-invalid' : ''}`}
//                                 placeholder="Enter Password"
//                                 id="password-input"
//                                 ref={passwordRef}
//                               />
//                               <button
//                                   type="button"
//                                   className="btn btn-link position-absolute end-0 top-0 text-decoration-none shadow-none text-muted password-addon"
//                                   onClick={() =>
//                                     setShowPassword((prev) => !prev)
//                                   }
//                                   style={{ zIndex: 2 }}
//                                 >
//                                   <i
//                                     className={
//                                       showPassword
//                                         ? "ri-eye-off-fill align-middle"
//                                         : "ri-eye-fill align-middle"
//                                     }
//                                   />
//                                 </button>
//                               {errors.password && <div className="invalid-feedback">{errors.password}</div>}
//                             </div>
//                           </div> */}
//                             <div className="mb-3">
//                               <label className="form-label" htmlFor="password-input">
//                                 Password <span className="text-danger">*</span>
//                               </label>
//                               <div className="position-relative auth-pass-inputgroup">
//                                 <input
//                                   type={showPassword ? "text" : "password"}
//                                   className={`form-control pe-5 password-input ${errors.password ? 'is-invalid' : ''}`}
//                                   placeholder="Enter Password"
//                                   id="password-input"
//                                   ref={passwordRef}
//                                 />
//                                 <button
//                                   type="button"
//                                   className="btn btn-link position-absolute end-0 top-0 text-decoration-none shadow-none text-muted password-addon"
//                                   onClick={() => setShowPassword((prev) => !prev)}
//                                   style={{ zIndex: 2 }}
//                                   tabIndex={-1}
//                                 >
//                                   <i
//                                     className={
//                                       showPassword
//                                         ? "ri-eye-off-fill align-middle"
//                                         : "ri-eye-fill align-middle"
//                                     }
//                                   />
//                                 </button>
//                                 {errors.password && <div className="invalid-feedback">{errors.password}</div>}
//                               </div>
//                             </div>

//                             {showVerificationForms() && (
//                               <div
//                                 className="rounded p-3 mb-3 mt-2"
//                                 style={{ boxShadow: '0 0 25px 6px rgba(255, 193, 7, 0.55)' }}
//                               >
//                                 {!numberOtpVerified ? <><br />{renderPhoneOtpVerificationForm()}</> : <Alert severity="success" sx={{ marginBottom: '10px' }}>Phone Number Verified</Alert>}
//                                 {!emailOtpVerified ? <><br />{renderEmailOtpVerificationForm()}</> : <Alert severity="success" sx={{ marginBottom: '10px' }}>Email Address Verified</Alert>}
//                               </div>
//                             )}
//                             <label htmlFor="referral-code" className="form-label">
//                               Referral Code: <span className="badge bg-warning text-dark fst-italic">Leave blank if you don't have a code</span>
//                             </label>
//                             <input
//                               type="text"
//                               className={`form-control pe-5 password-input ${errors.password ? 'is-invalid' : ''}`}
//                               placeholder="Enter Code"
//                               id="password-input"
//                               defaultValue={getDefaultReferralCode()}
//                               ref={referralCodeRef}
//                             />
//                             <div className="mb-4">
//                               <p className="mb-0 fs-12 text-muted fst-italic">
//                                 By registering you agree to the VectorFinance{" "}
//                                 <Link
//                                   href="/termsofuse"
//                                   className="text-primary text-decoration-underline fst-normal fw-medium"
//                                 >
//                                   Terms of Use
//                                 </Link>
//                               </p>
//                             </div>
//                             <p className="text text-danger">{serverError}</p>
//                             <div className="mt-4">
//                               {beginOtpVerification ? <button className="btn btn-success w-100" onClick={handleBeginOtpVerification}>
//                                 Sign Up
//                               </button> :
//                                 <button onClick={handleSubmit} disabled={loading} className="btn btn-success w-100">
//                                   {loading ? "Setting Account Up..." : "Sign Up"}
//                                 </button>}
//                             </div>
//                           </form>
//                         </div>
//                         <div className="mt-5 text-center">
//                           <p className="mb-0">
//                             Already have an account?{" "}
//                             <Link
//                               href="/signin"
//                               className="fw-semibold text-primary text-decoration-underline"
//                             >
//                               Login
//                             </Link>
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </Slide>
//                 </div>
//               </div>
//               {/* end card */}
//             </div>
//             {/* end col */}
//           </div>
//           {/* end row */}
//         </div>
//         {/* end container */}
//       </div>
//       {/* end auth page content */}

//       {/* Confirmation modal shown before marking phone/email as verified */}
//       <Dialog open={confirmModalOpen} onClose={handleConfirmModalNo}>
//         <DialogTitle>Confirm Verification</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Are you sure you want to verify this {confirmModalType === 'phone' ? 'phone number' : 'email address'}?
//           </DialogContentText>
//           <p className="fw-bold mt-2 mb-0">{confirmModalValue}</p>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleConfirmModalNo} color="inherit">
//             No
//           </Button>
//           <Button onClick={handleConfirmModalYes} variant="contained" color="success" autoFocus>
//             Yes
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   )
// }
'use client'

import EmailOtpVerificationForm from "@/components/Forms/EmailOtpVerificationForm";
import PhoneOtpVerificationForm from "@/components/Forms/PhoneOtpVerificationForm";
import { submitCreateUserRequest } from "@/Constants";
import { dynamicConfig, getFormByName, getReferrerFromReferralCode, scrolltoTopOFPage, textHasPhoneNumber, updateUserAccount, validateEmail } from "@/Functions";
import { saveJwt } from "@/Secrets";
import { Slide } from "@material-ui/core";
import { Alert } from "@mui/material";
import Link from "next/link";
import { useRef, useState } from "react";

export const dynamic = dynamicConfig();

export default function Signup() {
  const emailRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const phoneRef = useRef(null);
  const passwordRef = useRef(null);
  const referralCodeRef = useRef(null);

  const [serverError, setServerError] = useState(null);
  const [numberOtpVerified, setNumberOtpVerified] = useState(false);
  const [emailOtpVerified, setEmailOtpVerified] = useState(false);
  // true  = user hasn't clicked Sign Up yet (show the "Sign Up" → begin OTP button)
  // false = OTP forms are visible, second click actually submits
  const [beginOtpVerification, setBeginOtpVerification] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [phoneForVerification, setPhoneForVerification] = useState('');

  const [errors, setErrors] = useState({
    email: "", firstName: "", lastName: "", phone: "", password: ""
  });

  /* ── validation ─────────────────────────────────────────────── */
  const validateForm = () => {
    const email = emailRef.current.value.trim();
    const firstName = firstNameRef.current.value.trim();
    const lastName = lastNameRef.current.value.trim();
    const phone = phoneRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    let isValid = true;
    const newErrors = { email: "", firstName: "", lastName: "", phone: "", password: "" };

    if (!firstName) { newErrors.firstName = "Please enter your first name"; isValid = false; }
    if (!lastName) { newErrors.lastName = "Please enter your last name"; isValid = false; }
    if (!phone) { newErrors.phone = "Please enter your phone number"; isValid = false; }
    else if (!textHasPhoneNumber(phone)) { newErrors.phone = "Please enter a valid phone number"; isValid = false; }
    if (!email) { newErrors.email = "Please enter email"; isValid = false; }
    else if (!validateEmail(email)) { newErrors.email = "Please enter a valid email address"; isValid = false; }
    if (!password) { newErrors.password = "Please enter your password"; isValid = false; }

    setErrors(newErrors);
    return isValid;
  };

  /* ── referral helpers ───────────────────────────────────────── */
  const getReferrer = (code) => getReferrerFromReferralCode(code);

  const validateReferralCode = async (code) => {
    if (!code) return true;
    const referrer = await getReferrerFromReferralCode(code);
    return !!referrer;
  };

  const getDefaultReferralCode = () => {
    if (typeof window !== "undefined" && localStorage.getItem('referralCode')) {
      return localStorage.getItem('referralCode');
    }
    return '';
  };

  /* ── step 1: validate → reveal OTP forms ───────────────────── */
  const handleBeginOtpVerification = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const phone = phoneRef.current.value.trim();
    setPhoneForVerification(phone);
    setBeginOtpVerification(false);   // reveal OTP forms
  };

  /* ── if user edits phone after OTP forms appear ─────────────── */
  const handlePhoneBlur = () => {
    if (numberOtpVerified) return;
    const phone = phoneRef.current.value.trim();
    if (textHasPhoneNumber(phone) && phone !== phoneForVerification) {
      setPhoneForVerification(phone);
    }
  };

  /* ── step 2: full submit ────────────────────────────────────── */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const referralCode = referralCodeRef.current.value.trim();

    if (!await validateReferralCode(referralCode)) {
      setServerError("Please enter a valid referral code, or leave it blank.");
      return;
    }
    if (!numberOtpVerified) {
      setServerError("Please verify your phone number.");
      return;
    }
    if (!emailOtpVerified) {
      setServerError("Please verify your email address.");
      return;
    }
    if (!validateForm()) return;

    const email = emailRef.current.value.trim();
    const firstName = firstNameRef.current.value.trim();
    const lastName = lastNameRef.current.value.trim();
    const phone = phoneRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    setLoading(true);
    setServerError(null);

    try {
      const response = await submitCreateUserRequest({ username: phone, email, password });

      if (response?.error) {
        setServerError(response.error.message.replace("Username", "Number"));
        setLoading(false);
        return;
      }

      saveJwt(response.jwt);

      const [referrer, form] = await Promise.all([
        getReferrer(referralCode),
        getFormByName('GeneralLoanForm'),
      ]);

      const updatedUser = await updateUserAccount(
        {
          fullnames: `${firstName} ${lastName}`,
          referredBy: referrer?.id || null,
          formsToFill: { connect: [form.id] },
          details: { firstname: firstName, lastname: lastName, age: null, gender: null, dateOfBirth: null, address: null },
        },
        response.user.id,
        response.jwt
      );

      if (updatedUser) window.location = "/";
    } catch (err) {
      console.error("Signup error:", err);
      setServerError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  /* ── OTP form renderers ─────────────────────────────────────── */
  const showVerificationForms = () =>
    !beginOtpVerification &&
    !!(phoneRef.current && emailRef.current &&
      textHasPhoneNumber(phoneRef.current.value.trim()) &&
      validateEmail(emailRef.current.value.trim()));

  const renderPhoneOtpVerificationForm = () => (
    <div className="shadow-lg rounded p-3 mb-3 bg-white border">
      <hr />
      <h5>Verify Your Number</h5>
      <p className="text-muted mb-2">{phoneForVerification}</p>
      <PhoneOtpVerificationForm
        key={phoneForVerification}
        action={() => setNumberOtpVerified(true)}
        phoneNumber={phoneForVerification}
      />
    </div>
  );

  const renderEmailOtpVerificationForm = () => (
    <div className="shadow-lg rounded p-3 mb-3 bg-white border">
      <hr />
      <h5>Verify Your Email Address</h5>
      <p className="text-muted mb-2">{emailRef.current?.value.trim()}</p>
      <EmailOtpVerificationForm
        action={() => setEmailOtpVerified(true)}
        email={emailRef.current?.value.trim()}
      />
      <br />
    </div>
  );

  /* ── render ─────────────────────────────────────────────────── */
  scrolltoTopOFPage();

  return (
    <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
      <div className="bg-overlay" />
      <div className="auth-page-content overflow-hidden pt-lg-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="card overflow-hidden m-0">
                <div className="row justify-content-center g-0">

                  <Slide in direction="right">
                    <div className="col-lg-6">
                      <div className="p-lg-5 p-4 auth-one-bg h-100">
                        <div className="bg-overlay" />
                      </div>
                    </div>
                  </Slide>

                  <Slide in direction="left">
                    <div className="col-lg-6">
                      <div className="p-lg-5 p-4">
                        <div>
                          <h5 className="text-primary">Register Account</h5>
                          <p className="text-muted">
                            Sign up and access one of our low-interest loans within 24hrs.
                          </p>
                        </div>

                        <div className="mt-4">
                          <form className="needs-validation" noValidate onSubmit={(e) => e.preventDefault()}>

                            {/* First name */}
                            <div className="mb-3">
                              <label htmlFor="firstname" className="form-label">
                                First name <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                id="firstname"
                                placeholder="Enter First name"
                                ref={firstNameRef}
                              />
                              {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                            </div>

                            {/* Last name */}
                            <div className="mb-3">
                              <label htmlFor="lastname" className="form-label">
                                Last name <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                id="lastname"
                                placeholder="Enter Last name"
                                ref={lastNameRef}
                              />
                              {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                            </div>

                            {/* Phone */}
                            <div className="mb-3">
                              <label htmlFor="phonenumber" className="form-label">
                                Phone number <span className="text-danger">*</span>
                              </label>
                              <input
                                disabled={numberOtpVerified}
                                type="text"
                                className={`form-control ${errors.phone ? 'is-invalid' : ''} ${numberOtpVerified ? 'bg-light' : ''}`}
                                id="phonenumber"
                                placeholder="Enter Phone Number"
                                ref={phoneRef}
                                onBlur={handlePhoneBlur}
                              />
                              {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                            </div>

                            {/* Email */}
                            <div className="mb-3">
                              <label htmlFor="useremail" className="form-label">
                                Email <span className="text-danger">*</span>
                              </label>
                              <input
                                type="email"
                                disabled={emailOtpVerified}
                                className={`form-control ${errors.email ? 'is-invalid' : ''} ${emailOtpVerified ? 'bg-light' : ''}`}
                                id="useremail"
                                placeholder="Enter Email Address"
                                ref={emailRef}
                              />
                              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>

                            {/* Password */}
                            <div className="mb-3">
                              <label className="form-label" htmlFor="password-input">
                                Password <span className="text-danger">*</span>
                              </label>
                              <div className="position-relative auth-pass-inputgroup">
                                <input
                                  type={showPassword ? "text" : "password"}
                                  className={`form-control pe-5 password-input ${errors.password ? 'is-invalid' : ''}`}
                                  placeholder="Enter Password"
                                  id="password-input"
                                  ref={passwordRef}
                                />
                                <button
                                  type="button"
                                  className="btn btn-link position-absolute end-0 top-0 text-decoration-none shadow-none text-muted password-addon"
                                  onClick={() => setShowPassword(prev => !prev)}
                                  style={{ zIndex: 2 }}
                                  tabIndex={-1}
                                >
                                  <i className={showPassword ? "ri-eye-off-fill align-middle" : "ri-eye-fill align-middle"} />
                                </button>
                                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                              </div>
                            </div>

                            {/* OTP verification forms */}
                            {showVerificationForms() && (
                              <div
                                className="rounded p-3 mb-3 mt-2"
                                style={{ boxShadow: '0 0 25px 6px rgba(255,193,7,0.55)' }}
                              >
                                {numberOtpVerified
                                  ? <Alert severity="success" sx={{ mb: '10px' }}>Phone Number Verified</Alert>
                                  : <>{renderPhoneOtpVerificationForm()}</>
                                }
                                {emailOtpVerified
                                  ? <Alert severity="success" sx={{ mb: '10px' }}>Email Address Verified</Alert>
                                  : <>{renderEmailOtpVerificationForm()}</>
                                }
                              </div>
                            )}

                            {/* Referral code */}
                            <div className="mb-3">
                              <label htmlFor="referral-code" className="form-label">
                                Referral Code:{' '}
                                <span className="badge bg-warning text-dark fst-italic">
                                  Leave blank if you don't have a code
                                </span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Code"
                                id="referral-code"
                                defaultValue={getDefaultReferralCode()}
                                ref={referralCodeRef}
                              />
                            </div>

                            {/* Terms */}
                            <div className="mb-4">
                              <p className="mb-0 fs-12 text-muted fst-italic">
                                By registering you agree to the VectorFinance{' '}
                                <Link href="/termsofuse" className="text-primary text-decoration-underline fst-normal fw-medium">
                                  Terms of Use
                                </Link>
                              </p>
                            </div>

                            {/* Server error */}
                            {serverError && <p className="text text-danger">{serverError}</p>}

                            {/* Submit button */}
                            <div className="mt-4">
                              {beginOtpVerification ? (
                                <button
                                  className="btn btn-success w-100"
                                  onClick={handleBeginOtpVerification}
                                >
                                  Sign Up
                                </button>
                              ) : (
                                <button
                                  onClick={handleSubmit}
                                  disabled={loading || !numberOtpVerified || !emailOtpVerified}
                                  className="btn btn-success w-100"
                                >
                                  {loading ? "Setting Account Up..." : "Complete Sign Up"}
                                </button>
                              )}
                            </div>
                          </form>
                        </div>

                        <div className="mt-5 text-center">
                          <p className="mb-0">
                            Already have an account?{' '}
                            <Link href="/signin" className="fw-semibold text-primary text-decoration-underline">
                              Login
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Slide>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}