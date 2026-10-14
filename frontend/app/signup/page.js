// // 'use client'

// // import EmailOtpVerificationForm from "@/components/Forms/EmailOtpVerificationForm";
// // import PhoneOtpVerificationForm from "@/components/Forms/PhoneOtpVerificationForm";
// // import { submitCreateUserRequest } from "@/Constants";
// // import { dynamicConfig, getFormByName, getReferrerFromReferralCode, scrolltoTopOFPage, textHasPhoneNumber, updateUserAccount, validateEmail } from "@/Functions";
// // import { saveJwt } from "@/Secrets";
// // import { Slide } from "@material-ui/core";
// // import { Alert } from "@mui/material";
// // import Link from "next/link";
// // import { useRef, useState } from "react";

// // export const dynamic = dynamicConfig();

// // export default function Signup() {
// //   const emailRef = useRef(null);
// //   const firstNameRef = useRef(null);
// //   const lastNameRef = useRef(null);
// //   const phoneRef = useRef(null);
// //   const passwordRef = useRef(null);
// //   const referralCodeRef = useRef(null);

// //   const [serverError, setServerError] = useState(null);
// //   const [numberOtpVerified, setNumberOtpVerified] = useState(false);
// //   const [emailOtpVerified, setEmailOtpVerified] = useState(false);
// //   // true  = user hasn't clicked Sign Up yet (show the "Sign Up" → begin OTP button)
// //   // false = OTP forms are visible, second click actually submits
// //   const [beginOtpVerification, setBeginOtpVerification] = useState(true);
// //   const [loading, setLoading] = useState(false);
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [phoneForVerification, setPhoneForVerification] = useState('');

// //   const [errors, setErrors] = useState({
// //     email: "", firstName: "", lastName: "", phone: "", password: ""
// //   });

// //   /* ── validation ─────────────────────────────────────────────── */
// //   const validateForm = () => {
// //     const email = emailRef.current.value.trim();
// //     const firstName = firstNameRef.current.value.trim();
// //     const lastName = lastNameRef.current.value.trim();
// //     const phone = phoneRef.current.value.trim();
// //     const password = passwordRef.current.value.trim();

// //     let isValid = true;
// //     const newErrors = { email: "", firstName: "", lastName: "", phone: "", password: "" };

// //     if (!firstName) { newErrors.firstName = "Please enter your first name"; isValid = false; }
// //     if (!lastName) { newErrors.lastName = "Please enter your last name"; isValid = false; }
// //     if (!phone) { newErrors.phone = "Please enter your phone number"; isValid = false; }
// //     else if (!textHasPhoneNumber(phone)) { newErrors.phone = "Please enter a valid phone number"; isValid = false; }
// //     if (!email) { newErrors.email = "Please enter email"; isValid = false; }
// //     else if (!validateEmail(email)) { newErrors.email = "Please enter a valid email address"; isValid = false; }
// //     if (!password) { newErrors.password = "Please enter your password"; isValid = false; }

// //     setErrors(newErrors);
// //     return isValid;
// //   };

// //   /* ── referral helpers ───────────────────────────────────────── */
// //   const getReferrer = (code) => getReferrerFromReferralCode(code);

// //   const validateReferralCode = async (code) => {
// //     if (!code) return true;
// //     const referrer = await getReferrerFromReferralCode(code);
// //     return !!referrer;
// //   };

// //   const getDefaultReferralCode = () => {
// //     if (typeof window !== "undefined" && localStorage.getItem('referralCode')) {
// //       return localStorage.getItem('referralCode');
// //     }
// //     return '';
// //   };

// //   /* ── step 1: validate → reveal OTP forms ───────────────────── */
// //   const handleBeginOtpVerification = (e) => {
// //     e.preventDefault();
// //     if (!validateForm()) return;

// //     const phone = phoneRef.current.value.trim();
// //     setPhoneForVerification(phone);
// //     setBeginOtpVerification(false);   // reveal OTP forms
// //   };

// //   /* ── if user edits phone after OTP forms appear ─────────────── */
// //   const handlePhoneBlur = () => {
// //     if (numberOtpVerified) return;
// //     const phone = phoneRef.current.value.trim();
// //     if (textHasPhoneNumber(phone) && phone !== phoneForVerification) {
// //       setPhoneForVerification(phone);
// //     }
// //   };

// //   /* ── step 2: full submit ────────────────────────────────────── */
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     const referralCode = referralCodeRef.current.value.trim();

// //     if (!await validateReferralCode(referralCode)) {
// //       setServerError("Please enter a valid referral code, or leave it blank.");
// //       return;
// //     }
// //     if (!numberOtpVerified) {
// //       setServerError("Please verify your phone number.");
// //       return;
// //     }
// //     if (!emailOtpVerified) {
// //       setServerError("Please verify your email address.");
// //       return;
// //     }
// //     if (!validateForm()) return;

// //     const email = emailRef.current.value.trim();
// //     const firstName = firstNameRef.current.value.trim();
// //     const lastName = lastNameRef.current.value.trim();
// //     const phone = phoneRef.current.value.trim();
// //     const password = passwordRef.current.value.trim();

// //     setLoading(true);
// //     setServerError(null);

// //     try {
// //       const response = await submitCreateUserRequest({ username: phone, email, password });

// //       if (response?.error) {
// //         setServerError(response.error.message.replace("Username", "Number"));
// //         setLoading(false);
// //         return;
// //       }

// //       saveJwt(response.jwt);

// //       const [referrer, form] = await Promise.all([
// //         getReferrer(referralCode),
// //         getFormByName('GeneralLoanForm'),
// //       ]);

// //       const updatedUser = await updateUserAccount(
// //         {
// //           fullnames: `${firstName} ${lastName}`,
// //           referredBy: referrer?.id || null,
// //           formsToFill: { connect: [form.id] },
// //           details: { firstname: firstName, lastname: lastName, age: null, gender: null, dateOfBirth: null, address: null },
// //         },
// //         response.user.id,
// //         response.jwt
// //       );

// //       if (updatedUser) window.location = "/";
// //     } catch (err) {
// //       console.error("Signup error:", err);
// //       setServerError("Something went wrong. Please try again.");
// //       setLoading(false);
// //     }
// //   };

// //   /* ── OTP form renderers ─────────────────────────────────────── */
// //   const showVerificationForms = () =>
// //     !beginOtpVerification &&
// //     !!(phoneRef.current && emailRef.current &&
// //       textHasPhoneNumber(phoneRef.current.value.trim()) &&
// //       validateEmail(emailRef.current.value.trim()));

// //   const renderPhoneOtpVerificationForm = () => (
// //     <div className="shadow-lg rounded p-3 mb-3 bg-white border">
// //       <hr />
// //       <h5>Verify Your Number</h5>
// //       <p className="text-muted mb-2">{phoneForVerification}</p>
// //       <PhoneOtpVerificationForm
// //         key={phoneForVerification}
// //         action={() => setNumberOtpVerified(true)}
// //         phoneNumber={phoneForVerification}
// //       />
// //     </div>
// //   );

// //   const renderEmailOtpVerificationForm = () => (
// //     <div className="shadow-lg rounded p-3 mb-3 bg-white border">
// //       <hr />
// //       <h5>Verify Your Email Address</h5>
// //       <p className="text-muted mb-2">{emailRef.current?.value.trim()}</p>
// //       <EmailOtpVerificationForm
// //         action={() => setEmailOtpVerified(true)}
// //         email={emailRef.current?.value.trim()}
// //       />
// //       <br />
// //     </div>
// //   );

// //   /* ── render ─────────────────────────────────────────────────── */
// //   scrolltoTopOFPage();

// //   return (
// //     <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
// //       <div className="bg-overlay" />
// //       <div className="auth-page-content overflow-hidden pt-lg-5">
// //         <div className="container">
// //           <div className="row">
// //             <div className="col-lg-12">
// //               <div className="card overflow-hidden m-0">
// //                 <div className="row justify-content-center g-0">

// //                   <Slide in direction="right">
// //                     <div className="col-lg-6">
// //                       <div className="p-lg-5 p-4 auth-one-bg h-100">
// //                         <div className="bg-overlay" />
// //                       </div>
// //                     </div>
// //                   </Slide>

// //                   <Slide in direction="left">
// //                     <div className="col-lg-6">
// //                       <div className="p-lg-5 p-4">
// //                         <div>
// //                           <h5 className="text-primary">Register Account</h5>
// //                           <p className="text-muted">
// //                             Sign up and access one of our low-interest loans within 24hrs.
// //                           </p>
// //                         </div>

// //                         <div className="mt-4">
// //                           <form className="needs-validation" noValidate onSubmit={(e) => e.preventDefault()}>

// //                             {/* First name */}
// //                             <div className="mb-3">
// //                               <label htmlFor="firstname" className="form-label">
// //                                 First name <span className="text-danger">*</span>
// //                               </label>
// //                               <input
// //                                 type="text"
// //                                 className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
// //                                 id="firstname"
// //                                 placeholder="Enter First name"
// //                                 ref={firstNameRef}
// //                               />
// //                               {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
// //                             </div>

// //                             {/* Last name */}
// //                             <div className="mb-3">
// //                               <label htmlFor="lastname" className="form-label">
// //                                 Last name <span className="text-danger">*</span>
// //                               </label>
// //                               <input
// //                                 type="text"
// //                                 className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
// //                                 id="lastname"
// //                                 placeholder="Enter Last name"
// //                                 ref={lastNameRef}
// //                               />
// //                               {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
// //                             </div>

// //                             {/* Phone */}
// //                             <div className="mb-3">
// //                               <label htmlFor="phonenumber" className="form-label">
// //                                 Phone number <span className="text-danger">*</span>
// //                               </label>
// //                               <input
// //                                 disabled={numberOtpVerified}
// //                                 type="text"
// //                                 className={`form-control ${errors.phone ? 'is-invalid' : ''} ${numberOtpVerified ? 'bg-light' : ''}`}
// //                                 id="phonenumber"
// //                                 placeholder="Enter Phone Number"
// //                                 ref={phoneRef}
// //                                 onBlur={handlePhoneBlur}
// //                               />
// //                               {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
// //                             </div>

// //                             {/* Email */}
// //                             <div className="mb-3">
// //                               <label htmlFor="useremail" className="form-label">
// //                                 Email <span className="text-danger">*</span>
// //                               </label>
// //                               <input
// //                                 type="email"
// //                                 disabled={emailOtpVerified}
// //                                 className={`form-control ${errors.email ? 'is-invalid' : ''} ${emailOtpVerified ? 'bg-light' : ''}`}
// //                                 id="useremail"
// //                                 placeholder="Enter Email Address"
// //                                 ref={emailRef}
// //                               />
// //                               {errors.email && <div className="invalid-feedback">{errors.email}</div>}
// //                             </div>

// //                             {/* Password */}
// //                             <div className="mb-3">
// //                               <label className="form-label" htmlFor="password-input">
// //                                 Password <span className="text-danger">*</span>
// //                               </label>
// //                               <div className="position-relative auth-pass-inputgroup">
// //                                 <input
// //                                   type={showPassword ? "text" : "password"}
// //                                   className={`form-control pe-5 password-input ${errors.password ? 'is-invalid' : ''}`}
// //                                   placeholder="Enter Password"
// //                                   id="password-input"
// //                                   ref={passwordRef}
// //                                 />
// //                                 <button
// //                                   type="button"
// //                                   className="btn btn-link position-absolute end-0 top-0 text-decoration-none shadow-none text-muted password-addon"
// //                                   onClick={() => setShowPassword(prev => !prev)}
// //                                   style={{ zIndex: 2 }}
// //                                   tabIndex={-1}
// //                                 >
// //                                   <i className={showPassword ? "ri-eye-off-fill align-middle" : "ri-eye-fill align-middle"} />
// //                                 </button>
// //                                 {errors.password && <div className="invalid-feedback">{errors.password}</div>}
// //                               </div>
// //                             </div>

// //                             {/* OTP verification forms */}
// //                             {showVerificationForms() && (
// //                               <div
// //                                 className="rounded p-3 mb-3 mt-2"
// //                                 style={{ boxShadow: '0 0 25px 6px rgba(255,193,7,0.55)' }}
// //                               >
// //                                 {numberOtpVerified
// //                                   ? <Alert severity="success" sx={{ mb: '10px' }}>Phone Number Verified</Alert>
// //                                   : <>{renderPhoneOtpVerificationForm()}</>
// //                                 }
// //                                 {emailOtpVerified
// //                                   ? <Alert severity="success" sx={{ mb: '10px' }}>Email Address Verified</Alert>
// //                                   : <>{renderEmailOtpVerificationForm()}</>
// //                                 }
// //                               </div>
// //                             )}

// //                             {/* Referral code */}
// //                             <div className="mb-3">
// //                               <label htmlFor="referral-code" className="form-label">
// //                                 Referral Code:{' '}
// //                                 <span className="badge bg-warning text-dark fst-italic">
// //                                   Leave blank if you don't have a code
// //                                 </span>
// //                               </label>
// //                               <input
// //                                 type="text"
// //                                 className="form-control"
// //                                 placeholder="Enter Code"
// //                                 id="referral-code"
// //                                 defaultValue={getDefaultReferralCode()}
// //                                 ref={referralCodeRef}
// //                               />
// //                             </div>

// //                             {/* Terms */}
// //                             <div className="mb-4">
// //                               <p className="mb-0 fs-12 text-muted fst-italic">
// //                                 By registering you agree to the VectorFinance{' '}
// //                                 <Link href="/termsofuse" className="text-primary text-decoration-underline fst-normal fw-medium">
// //                                   Terms of Use
// //                                 </Link>
// //                               </p>
// //                             </div>

// //                             {/* Server error */}
// //                             {serverError && <p className="text text-danger">{serverError}</p>}

// //                             {/* Submit button */}
// //                             <div className="mt-4">
// //                               {beginOtpVerification ? (
// //                                 <button
// //                                   className="btn btn-success w-100"
// //                                   onClick={handleBeginOtpVerification}
// //                                 >
// //                                   Sign Up
// //                                 </button>
// //                               ) : (
// //                                 <button
// //                                   onClick={handleSubmit}
// //                                   disabled={loading || !numberOtpVerified || !emailOtpVerified}
// //                                   className="btn btn-success w-100"
// //                                 >
// //                                   {loading ? "Setting Account Up..." : "Complete Sign Up"}
// //                                 </button>
// //                               )}
// //                             </div>
// //                           </form>
// //                         </div>

// //                         <div className="mt-5 text-center">
// //                           <p className="mb-0">
// //                             Already have an account?{' '}
// //                             <Link href="/signin" className="fw-semibold text-primary text-decoration-underline">
// //                               Login
// //                             </Link>
// //                           </p>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </Slide>

// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// 'use client'

// import EmailOtpVerificationForm from "@/components/Forms/EmailOtpVerificationForm";
// import PhoneOtpVerificationForm from "@/components/Forms/PhoneOtpVerificationForm";
// import { submitCreateUserRequest } from "@/Constants";
// import { dynamicConfig, getFormByName, getReferrerFromReferralCode, scrolltoTopOFPage, textHasPhoneNumber, updateUserAccount, validateEmail } from "@/Functions";
// import { saveJwt } from "@/Secrets";
// import { Slide } from "@material-ui/core";
// import { Alert, Paper } from "@mui/material";              // ← Paper added
// import Link from "next/link";
// import { useRef, useState } from "react";
// import { useThemeMode } from "@/components/ThemeProvider";   // ← theme hook

// export const dynamic = dynamicConfig();

// export default function Signup() {
//   const emailRef = useRef(null);
//   const firstNameRef = useRef(null);
//   const lastNameRef = useRef(null);
//   const phoneRef = useRef(null);
//   const passwordRef = useRef(null);
//   const referralCodeRef = useRef(null);

//   const [serverError, setServerError] = useState(null);
//   const [numberOtpVerified, setNumberOtpVerified] = useState(false);
//   const [emailOtpVerified, setEmailOtpVerified] = useState(false);
//   const [beginOtpVerification, setBeginOtpVerification] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [phoneForVerification, setPhoneForVerification] = useState('');

//   const [errors, setErrors] = useState({
//     email: "", firstName: "", lastName: "", phone: "", password: ""
//   });

//   // ── Theme hook ──────────────────────────────
//   const { isDark } = useThemeMode();

//   /* ── validation ──────────────────────────────── */
//   const validateForm = () => {
//     const email = emailRef.current.value.trim();
//     const firstName = firstNameRef.current.value.trim();
//     const lastName = lastNameRef.current.value.trim();
//     const phone = phoneRef.current.value.trim();
//     const password = passwordRef.current.value.trim();

//     let isValid = true;
//     const newErrors = { email: "", firstName: "", lastName: "", phone: "", password: "" };

//     if (!firstName) { newErrors.firstName = "Please enter your first name"; isValid = false; }
//     if (!lastName) { newErrors.lastName = "Please enter your last name"; isValid = false; }
//     if (!phone) { newErrors.phone = "Please enter your phone number"; isValid = false; }
//     else if (!textHasPhoneNumber(phone)) { newErrors.phone = "Please enter a valid phone number"; isValid = false; }
//     if (!email) { newErrors.email = "Please enter email"; isValid = false; }
//     else if (!validateEmail(email)) { newErrors.email = "Please enter a valid email address"; isValid = false; }
//     if (!password) { newErrors.password = "Please enter your password"; isValid = false; }

//     setErrors(newErrors);
//     return isValid;
//   };

//   /* ── referral helpers ───────────────────────── */
//   const getReferrer = (code) => getReferrerFromReferralCode(code);

//   const validateReferralCode = async (code) => {
//     if (!code) return true;
//     const referrer = await getReferrerFromReferralCode(code);
//     return !!referrer;
//   };

//   const getDefaultReferralCode = () => {
//     if (typeof window !== "undefined" && localStorage.getItem('referralCode')) {
//       return localStorage.getItem('referralCode');
//     }
//     return '';
//   };

//   /* ── step 1: validate → reveal OTP forms ─── */
//   const handleBeginOtpVerification = (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     const phone = phoneRef.current.value.trim();
//     setPhoneForVerification(phone);
//     setBeginOtpVerification(false);
//   };

//   const handlePhoneBlur = () => {
//     if (numberOtpVerified) return;
//     const phone = phoneRef.current.value.trim();
//     if (textHasPhoneNumber(phone) && phone !== phoneForVerification) {
//       setPhoneForVerification(phone);
//     }
//   };

//   /* ── step 2: full submit ────────────────────── */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const referralCode = referralCodeRef.current.value.trim();

//     if (!await validateReferralCode(referralCode)) {
//       setServerError("Please enter a valid referral code, or leave it blank.");
//       return;
//     }
//     if (!numberOtpVerified) {
//       setServerError("Please verify your phone number.");
//       return;
//     }
//     if (!emailOtpVerified) {
//       setServerError("Please verify your email address.");
//       return;
//     }
//     if (!validateForm()) return;

//     const email = emailRef.current.value.trim();
//     const firstName = firstNameRef.current.value.trim();
//     const lastName = lastNameRef.current.value.trim();
//     const phone = phoneRef.current.value.trim();
//     const password = passwordRef.current.value.trim();

//     setLoading(true);
//     setServerError(null);

//     try {
//       const response = await submitCreateUserRequest({ username: phone, email, password });

//       if (response?.error) {
//         setServerError(response.error.message.replace("Username", "Number"));
//         setLoading(false);
//         return;
//       }

//       saveJwt(response.jwt);

//       const [referrer, form] = await Promise.all([
//         getReferrer(referralCode),
//         getFormByName('GeneralLoanForm'),
//       ]);

//       const updatedUser = await updateUserAccount(
//         {
//           fullnames: `${firstName} ${lastName}`,
//           referredBy: referrer?.id || null,
//           formsToFill: { connect: [form.id] },
//           details: { firstname: firstName, lastname: lastName, age: null, gender: null, dateOfBirth: null, address: null },
//         },
//         response.user.id,
//         response.jwt
//       );

//       if (updatedUser) window.location = "/";
//     } catch (err) {
//       console.error("Signup error:", err);
//       setServerError("Something went wrong. Please try again.");
//       setLoading(false);
//     }
//   };

//   /* ── OTP form renderers ─────────────────────── */
//   const showVerificationForms = () =>
//     !beginOtpVerification &&
//     !!(phoneRef.current && emailRef.current &&
//       textHasPhoneNumber(phoneRef.current.value.trim()) &&
//       validateEmail(emailRef.current.value.trim()));

//   const renderPhoneOtpVerificationForm = () => (
//     <div style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#fff', borderRadius: 8, padding: 12, marginBottom: 12, border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}` }}>
//       <hr style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }} />
//       <h5 style={{ color: isDark ? '#fff' : '#0D1F17' }}>Verify Your Number</h5>
//       <p className="text-muted mb-2">{phoneForVerification}</p>
//       <PhoneOtpVerificationForm
//         key={phoneForVerification}
//         action={() => setNumberOtpVerified(true)}
//         phoneNumber={phoneForVerification}
//       />
//     </div>
//   );

//   const renderEmailOtpVerificationForm = () => (
//     <div style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#fff', borderRadius: 8, padding: 12, marginBottom: 12, border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}` }}>
//       <hr style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }} />
//       <h5 style={{ color: isDark ? '#fff' : '#0D1F17' }}>Verify Your Email Address</h5>
//       <p className="text-muted mb-2">{emailRef.current?.value.trim()}</p>
//       <EmailOtpVerificationForm
//         action={() => setEmailOtpVerified(true)}
//         email={emailRef.current?.value.trim()}
//       />
//       <br />
//     </div>
//   );

//   /* ── dynamic styles ────────────────────────── */
//   const wrapperBg = isDark
//     ? 'linear-gradient(135deg, #0A0F1E 0%, #0D1F17 100%)'
//     : 'linear-gradient(135deg, #F0F4F1 0%, #E2E8E4 100%)';

//   const cardSx = {
//     overflow: 'hidden',
//     m: 0,
//     borderRadius: 4,
//     background: isDark ? 'rgba(255,255,255,0.05)' : '#FFFFFF',
//     border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
//     backdropFilter: isDark ? 'blur(20px)' : 'none',
//     WebkitBackdropFilter: isDark ? 'blur(20px)' : 'none',
//     boxShadow: isDark ? '0 24px 80px rgba(0,0,0,0.65)' : '0 20px 60px rgba(0,0,0,0.08)',
//   };

//   const inputStyle = (disabled) => ({
//     backgroundColor: disabled
//       ? 'rgba(16,185,129,0.05)'
//       : (isDark ? 'rgba(255,255,255,0.08)' : '#fff'),
//     color: isDark ? '#fff' : '#0D1F17',
//     borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.18)',
//   });

//   return (
//     <div
//       className="auth-page-wrapper py-5 mt-8 mb-8 justify-content-center align-items-center min-vh-100"
//       style={{ background: wrapperBg }}
//     >
//       <div style={{ display: 'none' }} className="bg-overlay" />

//       <div className="auth-page-content overflow-hidden pt-lg-5">
//         <div className="container">
//           <div className="row">
//             <div className="col-lg-12">
//               <Paper sx={cardSx}>
//                 <div className="row justify-content-center g-0">

//                   <Slide in direction="right">
//                     <div className="col-lg-6">
//                       <div
//                         className="p-lg-5 p-4 auth-one-bg h-100 d-flex align-items-center justify-content-center"
//                         style={{
//                           background: isDark
//                             ? 'linear-gradient(145deg, rgba(5,150,105,0.12), rgba(16,185,129,0.06))'
//                             : 'linear-gradient(145deg, rgba(5,150,105,0.05), rgba(16,185,129,0.02))',
//                         }}
//                       >
//                         <div className="bg-overlay" style={{ display: 'none' }} />
//                       </div>
//                     </div>
//                   </Slide>

//                   <Slide in direction="left">
//                     <div className="col-lg-6">
//                       <div className="p-lg-5 p-4">
//                         <div>
//                           <h5 style={{ color: isDark ? '#34D399' : '#059669' }}>Register Account</h5>
//                           <p className="text-muted" style={{ color: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(13,31,23,0.6)' }}>
//                             Sign up and access one of our low-interest loans within 24hrs.
//                           </p>
//                         </div>

//                         <div className="mt-4">
//                           <form className="needs-validation" noValidate onSubmit={(e) => e.preventDefault()}>

//                             {/* First name */}
//                             <div className="mb-3">
//                               <label htmlFor="firstname" className="form-label" style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#0D1F17' }}>
//                                 First name <span className="text-danger">*</span>
//                               </label>
//                               <input
//                                 type="text"
//                                 className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
//                                 id="firstname"
//                                 placeholder="Enter First name"
//                                 ref={firstNameRef}
//                                 style={inputStyle(false)}
//                               />
//                               {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
//                             </div>

//                             {/* Last name */}
//                             <div className="mb-3">
//                               <label htmlFor="lastname" className="form-label" style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#0D1F17' }}>
//                                 Last name <span className="text-danger">*</span>
//                               </label>
//                               <input
//                                 type="text"
//                                 className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
//                                 id="lastname"
//                                 placeholder="Enter Last name"
//                                 ref={lastNameRef}
//                                 style={inputStyle(false)}
//                               />
//                               {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
//                             </div>

//                             {/* Phone */}
//                             <div className="mb-3">
//                               <label htmlFor="phonenumber" className="form-label" style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#0D1F17' }}>
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
//                                 style={inputStyle(numberOtpVerified)}
//                               />
//                               {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
//                             </div>

//                             {/* Email */}
//                             <div className="mb-3">
//                               <label htmlFor="useremail" className="form-label" style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#0D1F17' }}>
//                                 Email <span className="text-danger">*</span>
//                               </label>
//                               <input
//                                 type="email"
//                                 disabled={emailOtpVerified}
//                                 className={`form-control ${errors.email ? 'is-invalid' : ''} ${emailOtpVerified ? 'bg-light' : ''}`}
//                                 id="useremail"
//                                 placeholder="Enter Email Address"
//                                 ref={emailRef}
//                                 style={inputStyle(emailOtpVerified)}
//                               />
//                               {errors.email && <div className="invalid-feedback">{errors.email}</div>}
//                             </div>

//                             {/* Password */}
//                             <div className="mb-3">
//                               <label className="form-label" htmlFor="password-input" style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#0D1F17' }}>
//                                 Password <span className="text-danger">*</span>
//                               </label>
//                               <div className="position-relative auth-pass-inputgroup">
//                                 <input
//                                   type={showPassword ? "text" : "password"}
//                                   className={`form-control pe-5 password-input ${errors.password ? 'is-invalid' : ''}`}
//                                   placeholder="Enter Password"
//                                   id="password-input"
//                                   ref={passwordRef}
//                                   style={inputStyle(false)}
//                                 />
//                                 <button
//                                   type="button"
//                                   className="btn btn-link position-absolute end-0 top-0 text-decoration-none shadow-none password-addon"
//                                   onClick={() => setShowPassword(prev => !prev)}
//                                   style={{ zIndex: 2, color: '#10B981' }}
//                                   tabIndex={-1}
//                                 >
//                                   <i className={showPassword ? "ri-eye-off-fill align-middle" : "ri-eye-fill align-middle"} />
//                                 </button>
//                                 {errors.password && <div className="invalid-feedback">{errors.password}</div>}
//                               </div>
//                             </div>

//                             {/* OTP verification forms */}
//                             {showVerificationForms() && (
//                               <Paper
//                                 elevation={0}
//                                 sx={{
//                                   p: 2,
//                                   mb: 3,
//                                   mt: 2,
//                                   background: isDark ? 'rgba(255,255,255,0.05)' : '#fff',
//                                   border: `1px solid ${isDark ? 'rgba(201,168,76,0.3)' : 'rgba(201,168,76,0.2)'}`,
//                                   borderRadius: 3,
//                                   boxShadow: isDark ? '0 0 30px 8px rgba(201,168,76,0.12)' : '0 0 25px 6px rgba(255,193,7,0.15)',
//                                 }}
//                               >
//                                 {numberOtpVerified
//                                   ? <Alert severity="success" sx={{ mb: '10px', background: 'rgba(16,185,129,0.09)', color: '#34D399' }}>Phone Number Verified</Alert>
//                                   : <>{renderPhoneOtpVerificationForm()}</>
//                                 }
//                                 {emailOtpVerified
//                                   ? <Alert severity="success" sx={{ mb: '10px', background: 'rgba(16,185,129,0.09)', color: '#34D399' }}>Email Address Verified</Alert>
//                                   : <>{renderEmailOtpVerificationForm()}</>
//                                 }
//                               </Paper>
//                             )}

//                             {/* Referral code */}
//                             <div className="mb-3">
//                               <label htmlFor="referral-code" className="form-label" style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#0D1F17' }}>
//                                 Referral Code:{' '}
//                                 <span className="badge bg-warning text-dark fst-italic" style={{ backgroundColor: '#C9A84C', color: '#0D1F17' }}>
//                                   Leave blank if you don't have a code
//                                 </span>
//                               </label>
//                               <input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="Enter Code"
//                                 id="referral-code"
//                                 defaultValue={getDefaultReferralCode()}
//                                 ref={referralCodeRef}
//                                 style={inputStyle(false)}
//                               />
//                             </div>

//                             {/* Terms */}
//                             <div className="mb-4">
//                               <p className="mb-0 fs-12 text-muted fst-italic" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(13,31,23,0.5)' }}>
//                                 By registering you agree to the VectorFinance{' '}
//                                 <Link href="/termsofuse" className="text-primary text-decoration-underline fst-normal fw-medium" style={{ color: '#10B981' }}>
//                                   Terms of Use
//                                 </Link>
//                               </p>
//                             </div>

//                             {/* Server error */}
//                             {serverError && <p className="text text-danger" style={{ color: '#F87171' }}>{serverError}</p>}

//                             {/* Submit button */}
//                             <div className="mt-4">
//                               {beginOtpVerification ? (
//                                 <button
//                                   className="btn w-100"
//                                   onClick={handleBeginOtpVerification}
//                                   style={{
//                                     background: 'linear-gradient(135deg, #059669 0%, #10B981 55%, #059669 100%)',
//                                     backgroundSize: '200% auto',
//                                     border: 'none',
//                                     color: '#fff',
//                                     fontWeight: 700,
//                                     borderRadius: 10,
//                                     boxShadow: '0 4px 16px rgba(16,185,129,0.28)',
//                                     padding: '10px 20px',
//                                     transition: 'all 0.22s',
//                                   }}
//                                 >
//                                   Sign Up
//                                 </button>
//                               ) : (
//                                 <button
//                                   onClick={handleSubmit}
//                                   disabled={loading || !numberOtpVerified || !emailOtpVerified}
//                                   className="btn w-100"
//                                   style={{
//                                     background: 'linear-gradient(135deg, #059669 0%, #10B981 55%, #059669 100%)',
//                                     backgroundSize: '200% auto',
//                                     border: 'none',
//                                     color: '#fff',
//                                     fontWeight: 700,
//                                     borderRadius: 10,
//                                     boxShadow: '0 4px 16px rgba(16,185,129,0.28)',
//                                     padding: '10px 20px',
//                                     transition: 'all 0.22s',
//                                   }}
//                                 >
//                                   {loading ? "Setting Account Up..." : "Complete Sign Up"}
//                                 </button>
//                               )}
//                             </div>
//                           </form>
//                         </div>

//                         <div className="mt-5 text-center">
//                           <p className="mb-0" style={{ color: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(13,31,23,0.60)' }}>
//                             Already have an account?{' '}
//                             <Link href="/signin" className="fw-semibold text-primary text-decoration-underline" style={{ color: '#10B981' }}>
//                               Login
//                             </Link>
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </Slide>

//                 </div>
//               </Paper>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
'use client'

import EmailOtpVerificationForm from "@/components/Forms/EmailOtpVerificationForm";
import PhoneOtpVerificationForm from "@/components/Forms/PhoneOtpVerificationForm";
import { submitCreateUserRequest } from "@/Constants";
import { dynamicConfig, getFormByName, getReferrerFromReferralCode, scrolltoTopOFPage, textHasPhoneNumber, updateUserAccount, validateEmail } from "@/Functions";
import { saveJwt } from "@/Secrets";
import { Slide } from "@material-ui/core";
import { Alert, Paper } from "@mui/material";              // ← Paper added
import Link from "next/link";
import { useRef, useState } from "react";
import { useThemeMode } from "@/components/ThemeProvider";   // ← theme hook

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
  const [beginOtpVerification, setBeginOtpVerification] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [phoneForVerification, setPhoneForVerification] = useState('');

  const [errors, setErrors] = useState({
    email: "", firstName: "", lastName: "", phone: "", password: ""
  });

  // ── Theme hook ──────────────────────────────
  const { isDark } = useThemeMode();

  /* ── validation ──────────────────────────────── */
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

  /* ── referral helpers ───────────────────────── */
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

  /* ── step 1: validate → reveal OTP forms ─── */
  const handleBeginOtpVerification = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const phone = phoneRef.current.value.trim();
    setPhoneForVerification(phone);
    setBeginOtpVerification(false);
  };

  const handlePhoneBlur = () => {
    if (numberOtpVerified) return;
    const phone = phoneRef.current.value.trim();
    if (textHasPhoneNumber(phone) && phone !== phoneForVerification) {
      setPhoneForVerification(phone);
    }
  };

  /* ── step 2: full submit ────────────────────── */
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

  /* ── OTP form renderers ─────────────────────── */
  const showVerificationForms = () =>
    !beginOtpVerification &&
    !!(phoneRef.current && emailRef.current &&
      textHasPhoneNumber(phoneRef.current.value.trim()) &&
      validateEmail(emailRef.current.value.trim()));

  const renderPhoneOtpVerificationForm = () => (
    <div style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#fff', borderRadius: 8, padding: 12, marginBottom: 12, border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}` }}>
      <hr style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }} />
      <h5 style={{ color: isDark ? '#fff' : '#0D1F17' }}>Verify Your Number</h5>
      <p className="text-muted mb-2">{phoneForVerification}</p>
      <PhoneOtpVerificationForm
        key={phoneForVerification}
        action={() => setNumberOtpVerified(true)}
        phoneNumber={phoneForVerification}
      />
    </div>
  );

  const renderEmailOtpVerificationForm = () => (
    <div style={{ background: isDark ? 'rgba(255,255,255,0.04)' : '#fff', borderRadius: 8, padding: 12, marginBottom: 12, border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}` }}>
      <hr style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }} />
      <h5 style={{ color: isDark ? '#fff' : '#0D1F17' }}>Verify Your Email Address</h5>
      <p className="text-muted mb-2">{emailRef.current?.value.trim()}</p>
      <EmailOtpVerificationForm
        action={() => setEmailOtpVerified(true)}
        email={emailRef.current?.value.trim()}
      />
      <br />
    </div>
  );

  /* ── dynamic styles ────────────────────────── */
  const wrapperBg = isDark
    ? 'linear-gradient(135deg, #0A0F1E 0%, #0D1F17 100%)'
    : 'linear-gradient(135deg, #F0F4F1 0%, #E2E8E4 100%)';

  const cardSx = {
    overflow: 'hidden',
    m: 0,
    borderRadius: 4,
    background: isDark ? 'rgba(255,255,255,0.05)' : '#FFFFFF',
    border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
    backdropFilter: isDark ? 'blur(20px)' : 'none',
    WebkitBackdropFilter: isDark ? 'blur(20px)' : 'none',
    boxShadow: isDark ? '0 24px 80px rgba(0,0,0,0.65)' : '0 20px 60px rgba(0,0,0,0.08)',
  };

  // 👇 FIX: increased border opacity for light mode
  const inputStyle = (disabled) => ({
    backgroundColor: disabled
      ? 'rgba(16,185,129,0.05)'
      : (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(16, 185, 129, 0.02)'),
    color: isDark ? '#fff' : '#0D1F17',
    borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.35)', // was 0.18 – now visible
  })

  return (
    <div
      className="auth-page-wrapper py-5 mt-8 mb-8 justify-content-center align-items-center min-vh-100"
      style={{ background: wrapperBg }}
    >
      <div style={{ display: 'none' }} className="bg-overlay" />

      <div className="auth-page-content overflow-hidden pt-lg-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <Paper sx={cardSx}>
                <div className="row justify-content-center g-0">

                  <Slide in direction="right">
                    <div className="col-lg-6">
                      <div
                        className="p-lg-5 p-4 auth-one-bg h-100 d-flex align-items-center justify-content-center"
                        style={{
                          background: isDark
                            ? 'linear-gradient(145deg, rgba(5,150,105,0.12), rgba(16,185,129,0.06))'
                            : 'linear-gradient(145deg, rgba(5,150,105,0.05), rgba(16,185,129,0.02))',
                        }}
                      >
                        <div className="bg-overlay" style={{ display: 'none' }} />
                      </div>
                    </div>
                  </Slide>

                  <Slide in direction="left">
                    <div className="col-lg-6">
                      <div className="p-lg-5 p-4">
                        <div>
                          <h5 style={{ color: isDark ? '#34D399' : '#059669' }}>Register Account</h5>
                          <p className="text-muted" style={{ color: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(13,31,23,0.6)' }}>
                            Sign up and access one of our low-interest loans within 24hrs.
                          </p>
                        </div>

                        <div className="mt-4">
                          <form className="needs-validation" noValidate onSubmit={(e) => e.preventDefault()}>

                            {/* First name */}
                            <div className="mb-3">
                              <label htmlFor="firstname" className="form-label" style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#0D1F17' }}>
                                First name <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                id="firstname"
                                placeholder="Enter First name"
                                ref={firstNameRef}
                                style={inputStyle(false)}
                              />
                              {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                            </div>

                            {/* Last name */}
                            <div className="mb-3">
                              <label htmlFor="lastname" className="form-label" style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#0D1F17' }}>
                                Last name <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                id="lastname"
                                placeholder="Enter Last name"
                                ref={lastNameRef}
                                style={inputStyle(false)}
                              />
                              {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                            </div>

                            {/* Phone */}
                            <div className="mb-3">
                              <label htmlFor="phonenumber" className="form-label" style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#0D1F17' }}>
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
                                style={inputStyle(numberOtpVerified)}
                              />
                              {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                            </div>

                            {/* Email */}
                            <div className="mb-3">
                              <label htmlFor="useremail" className="form-label" style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#0D1F17' }}>
                                Email <span className="text-danger">*</span>
                              </label>
                              <input
                                type="email"
                                disabled={emailOtpVerified}
                                className={`form-control ${errors.email ? 'is-invalid' : ''} ${emailOtpVerified ? 'bg-light' : ''}`}
                                id="useremail"
                                placeholder="Enter Email Address"
                                ref={emailRef}
                                style={inputStyle(emailOtpVerified)}
                              />
                              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>

                            {/* Password */}
                            <div className="mb-3">
                              <label className="form-label" htmlFor="password-input" style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#0D1F17' }}>
                                Password <span className="text-danger">*</span>
                              </label>
                              <div className="position-relative auth-pass-inputgroup">
                                <input
                                  type={showPassword ? "text" : "password"}
                                  className={`form-control pe-5 password-input ${errors.password ? 'is-invalid' : ''}`}
                                  placeholder="Enter Password"
                                  id="password-input"
                                  ref={passwordRef}
                                  style={inputStyle(false)}
                                />
                                <button
                                  type="button"
                                  className="btn btn-link position-absolute end-0 top-0 text-decoration-none shadow-none password-addon"
                                  onClick={() => setShowPassword(prev => !prev)}
                                  style={{ zIndex: 2, color: '#10B981' }}
                                  tabIndex={-1}
                                >
                                  <i className={showPassword ? "ri-eye-off-fill align-middle" : "ri-eye-fill align-middle"} />
                                </button>
                                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                              </div>
                            </div>

                            {/* OTP verification forms */}
                            {showVerificationForms() && (
                              <Paper
                                elevation={0}
                                sx={{
                                  p: 2,
                                  mb: 3,
                                  mt: 2,
                                  background: isDark ? 'rgba(255,255,255,0.05)' : '#fff',
                                  border: `1px solid ${isDark ? 'rgba(201,168,76,0.3)' : 'rgba(201,168,76,0.2)'}`,
                                  borderRadius: 3,
                                  boxShadow: isDark ? '0 0 30px 8px rgba(201,168,76,0.12)' : '0 0 25px 6px rgba(255,193,7,0.15)',
                                }}
                              >
                                {numberOtpVerified
                                  ? <Alert severity="success" sx={{ mb: '10px', background: 'rgba(16,185,129,0.09)', color: '#34D399' }}>Phone Number Verified</Alert>
                                  : <>{renderPhoneOtpVerificationForm()}</>
                                }
                                {emailOtpVerified
                                  ? <Alert severity="success" sx={{ mb: '10px', background: 'rgba(16,185,129,0.09)', color: '#34D399' }}>Email Address Verified</Alert>
                                  : <>{renderEmailOtpVerificationForm()}</>
                                }
                              </Paper>
                            )}

                            {/* Referral code */}
                            <div className="mb-3">
                              <label htmlFor="referral-code" className="form-label" style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#0D1F17' }}>
                                Referral Code:{' '}
                                <span className="badge bg-warning text-dark fst-italic" style={{ backgroundColor: '#C9A84C', color: '#0D1F17' }}>
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
                                style={inputStyle(false)}
                              />
                            </div>

                            {/* Terms */}
                            <div className="mb-4">
                              <p className="mb-0 fs-12 text-muted fst-italic" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(13,31,23,0.5)' }}>
                                By registering you agree to the VectorFinance{' '}
                                <Link href="/termsofuse" className="text-primary text-decoration-underline fst-normal fw-medium" style={{ color: '#10B981' }}>
                                  Terms of Use
                                </Link>
                              </p>
                            </div>

                            {/* Server error */}
                            {serverError && <p className="text text-danger" style={{ color: '#F87171' }}>{serverError}</p>}

                            {/* Submit button */}
                            <div className="mt-4">
                              {beginOtpVerification ? (
                                <button
                                  className="btn w-100"
                                  onClick={handleBeginOtpVerification}
                                  style={{
                                    background: 'linear-gradient(135deg, #059669 0%, #10B981 55%, #059669 100%)',
                                    backgroundSize: '200% auto',
                                    border: 'none',
                                    color: '#fff',
                                    fontWeight: 700,
                                    borderRadius: 10,
                                    boxShadow: '0 4px 16px rgba(16,185,129,0.28)',
                                    padding: '10px 20px',
                                    transition: 'all 0.22s',
                                  }}
                                >
                                  Sign Up
                                </button>
                              ) : (
                                <button
                                  onClick={handleSubmit}
                                  disabled={loading || !numberOtpVerified || !emailOtpVerified}
                                  className="btn w-100"
                                  style={{
                                    background: 'linear-gradient(135deg, #059669 0%, #10B981 55%, #059669 100%)',
                                    backgroundSize: '200% auto',
                                    border: 'none',
                                    color: '#fff',
                                    fontWeight: 700,
                                    borderRadius: 10,
                                    boxShadow: '0 4px 16px rgba(16,185,129,0.28)',
                                    padding: '10px 20px',
                                    transition: 'all 0.22s',
                                  }}
                                >
                                  {loading ? "Setting Account Up..." : "Complete Sign Up"}
                                </button>
                              )}
                            </div>
                          </form>
                        </div>

                        <div className="mt-5 text-center">
                          <p className="mb-0" style={{ color: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(13,31,23,0.60)' }}>
                            Already have an account?{' '}
                            <Link href="/signin" className="fw-semibold text-primary text-decoration-underline" style={{ color: '#10B981' }}>
                              Login
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Slide>

                </div>
              </Paper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}