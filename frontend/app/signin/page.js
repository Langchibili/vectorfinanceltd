// // 'use client'

// // import { api_url } from "@/Constants";
// // import { dynamicConfig, scrolltoTopOFPage} from "@/Functions";
// // import { saveJwt } from "@/Secrets";
// // import { Slide } from "@material-ui/core";
// // import Link from "next/link";
// // import { useRef, useState } from "react";

// // // Force the page to be dynamically rendered on every request
// // export const dynamic = dynamicConfig();

// // export default function Signin() {  
// //   // Refs for the form inputs
// //   const emailRef = useRef(null);
// //   const phoneRef = useRef(null);
// //   const passwordRef = useRef(null);
  

// //   // State for error messages
// //   const [serverError,setServerError] = useState(null)
// //   const [loading,setLoading] = useState(false)
// //   const [identifierName, setIdentifierName] = useState('email')
// //   const [errors, setErrors] = useState({
// //     email: "",
// //     phone: "",
// //     password: ""
// //   });

// //   // Form validation checks
// //   const validateForm = () => {
// //     const email = emailRef.current?.value?.trim();
// //     const phone = phoneRef.current?.value?.trim();
// //     const password = passwordRef.current?.value?.trim();

// //     let isValid = true;
// //     const newErrors = { email: "", phone: "", password: "" };

// //     // Basic validation (adjust rules as needed)
// //     if (!email) {
// //       newErrors.email = "Please enter email";
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

// //     setErrors(newErrors);
// //     return isValid;
// //   };

// //   // Handle form submit (You will add the actual submit logic)
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const email = emailRef.current?.value?.trim();
// //     const phone = phoneRef.current?.value?.trim();
// //     const password = passwordRef.current?.value?.trim();
// //     const requestObject = {
// //         identifier: phone? phone : email,
// //         password:password
// //     }
// //     setLoading(true)  
// //     //if (validateForm()) {
// //         const response = await fetch(api_url+'/auth/local',{
// //             method: 'POST',
// //             headers: {
// //               'Content-Type': 'application/json'
// //             },
// //             body: JSON.stringify(requestObject)
// //           })
// //           .then(response => response.json())
// //           .then(data => data)
// //           .catch(error => {
// //             console.error('Error:', error);
// //           })
// //           saveJwt(response.jwt)  
// //           console.log(response)
// //         if(response.hasOwnProperty('error')){
// //             setServerError(response.error.message.replace("Username","Number"))
// //             setLoading(false)
// //             return
// //         }
// //         else{
// //             window.location = "/"
// //         }
// //     // }
// //     // else {
// //     //   return
// //     // }
// //   };

 
// //   const renderIdentifierField = (identifierName)=>{
// //         if(identifierName === "email"){
// //             return (
// //                 <div className="mb-3">
// //                 <label htmlFor="useremail" className="form-label">
// //                     Email <span className="text-danger">*</span>
// //                 </label>
// //                 <input
// //                     type="email"
// //                     className={`form-control ${errors.email ? 'is-invalid' : ''}`}
// //                     id="useremail"
// //                     placeholder="Enter Email Address"
// //                     ref={emailRef}
// //                 />
// //                 {errors.email && <div className="invalid-feedback">{errors.email}</div>}
// //                 </div>
// //             )
// //         }
// //         else{
// //             return (
// //                 <div className="mb-3">
// //                 <label htmlFor="phonenumber" className="form-label">
// //                     Phone number <span className="text-danger">*</span>
// //                 </label>
// //                 <input
// //                     type="text"
// //                     className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
// //                     id="phonenumber"
// //                     placeholder="Enter Phone Number"
// //                     ref={phoneRef}
// //                 />
// //                 {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
// //                 </div>
// //             )
// //         }
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
// //                         <h5 className="text-primary">Log Into Your Account</h5>
// //                         {/* <p className="text-muted">
// //                           Sign up and access one of our low-interest loans within 24hrs.
// //                         </p> */}
// //                       </div>
// //                       <div className="mt-4">
// //                         <form className="needs-validation" noValidate="" onSubmit={handleSubmit}>
                          
// //                           {renderIdentifierField(identifierName)}
// //                           <div className="mb-3">
// //                             <label className="form-label" htmlFor="password-input">
// //                               Password
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
// //                                 className="btn btn-link position-absolute end-0 top-0 text-decoration-none shadow-none text-muted password-addon"
// //                                 type="button"
// //                                 id="password-addon"
// //                               >
// //                                 <i className="ri-eye-fill align-middle" />
// //                               </button>
// //                               {errors.password && <div className="invalid-feedback">{errors.password}</div>}
// //                             </div>
// //                           </div>
// //                             <p className="text text-danger">{serverError}</p>
// //                           <div className="mt-4">
// //                             <button disabled={loading} className="btn btn-success w-100">
// //                               {loading? "Logging You In..." : "Login"}
// //                             </button>
// //                           </div>
// //                         </form>
// //                       </div>
// //                       <div>
// //                       {identifierName === "email"? <Link href="#" onClick={()=>{ setIdentifierName("phone") }}>Use Phone Number Instead</Link> : <Link href="#" onClick={()=>{ setIdentifierName("email") }}>Use Email Instead</Link>}
// //                       </div>
// //                       <div className="mt-5 text-center">
// //                         <p className="mb-0">
// //                           Don't have an account?{" "}
// //                           <Link
// //                             href="/signup"
// //                             className="fw-semibold text-primary text-decoration-underline"
// //                           >
// //                             Sign Up
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

// import { api_url } from "@/Constants";
// import { dynamicConfig, scrolltoTopOFPage } from "@/Functions";
// import { saveJwt } from "@/Secrets";
// import { Slide } from "@material-ui/core";
// import Link from "next/link";
// import { useRef, useState } from "react";

// // Force the page to be dynamically rendered on every request
// export const dynamic = dynamicConfig();

// export default function Signin() {
//   // Refs for the form inputs
//   const emailRef = useRef(null);
//   const phoneRef = useRef(null);
//   const passwordRef = useRef(null);

//   // State for error messages
//   const [serverError, setServerError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [identifierName, setIdentifierName] = useState("email");
//   const [errors, setErrors] = useState({
//     email: "",
//     phone: "",
//     password: ""
//   });

//   // NEW: State to track whether the password is visible
//   const [showPassword, setShowPassword] = useState(false);

//   // Form validation checks
//   const validateForm = () => {
//     const email = emailRef.current?.value?.trim();
//     const phone = phoneRef.current?.value?.trim();
//     const password = passwordRef.current?.value?.trim();

//     let isValid = true;
//     const newErrors = { email: "", phone: "", password: "" };

//     if (!email) {
//       newErrors.email = "Please enter email";
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

//     setErrors(newErrors);
//     return isValid;
//   };

//   // Handle form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const email = emailRef.current?.value?.trim();
//     const phone = phoneRef.current?.value?.trim();
//     const password = passwordRef.current?.value?.trim();
//     const requestObject = {
//       identifier: phone ? phone : email,
//       password: password
//     };

//     setLoading(true);

//     // You can uncomment validateForm() if you want client‐side validation
//     // if (!validateForm()) {
//     //   setLoading(false);
//     //   return;
//     // }

//     try {
//       const response = await fetch(api_url + '/auth/local', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(requestObject)
//       });
//       const data = await response.json();

//       if (data.hasOwnProperty('error')) {
//         setServerError(data.error.message.replace("Username", "Number"));
//         setLoading(false);
//         return;
//       }

//       saveJwt(data.jwt);
//       window.location = "/";
//     } catch (err) {
//       console.error('Error:', err);
//       setServerError("Something went wrong. Please try again.");
//       setLoading(false);
//     }
//   };

//   // Renders either email or phone input based on identifierName
//   const renderIdentifierField = (identifierName) => {
//     if (identifierName === "email") {
//       return (
//         <div className="mb-3">
//           <label htmlFor="useremail" className="form-label">
//             Email <span className="text-danger">*</span>
//           </label>
//           <input
//             type="email"
//             className={`form-control ${errors.email ? 'is-invalid' : ''}`}
//             id="useremail"
//             placeholder="Enter Email Address"
//             ref={emailRef}
//           />
//           {errors.email && <div className="invalid-feedback">{errors.email}</div>}
//         </div>
//       );
//     } else {
//       return (
//         <div className="mb-3">
//           <label htmlFor="phonenumber" className="form-label">
//             Phone number <span className="text-danger">*</span>
//           </label>
//           <input
//             type="text"
//             className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
//             id="phonenumber"
//             placeholder="Enter Phone Number"
//             ref={phoneRef}
//           />
//           {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
//         </div>
//       );
//     }
//   };

//   scrolltoTopOFPage();
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
//                           <h5 className="text-primary">Log Into Your Account</h5>
//                         </div>
//                         <div className="mt-4">
//                           <form className="needs-validation" noValidate="" onSubmit={handleSubmit}>
//                             {renderIdentifierField(identifierName)}

//                             {/* Password field with toggle */}
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
//                                   onClick={() => setShowPassword(prev => !prev)}
//                                   style={{ zIndex: 2 }}
//                                 >
//                                   <i className={showPassword ? "ri-eye-off-fill align-middle" : "ri-eye-fill align-middle"} />
//                                 </button>
//                                 {errors.password && <div className="invalid-feedback">{errors.password}</div>}
//                               </div>
//                             </div>

//                             <p className="text text-danger">{serverError}</p>
//                             <div className="mt-4">
//                               <button disabled={loading} className="btn btn-success w-100">
//                                 {loading ? "Logging You In..." : "Login"}
//                               </button>
//                             </div>
//                           </form>
//                         </div>

//                         <div className="mt-3">
//                           {identifierName === "email" ? (
//                             <Link href="#" onClick={() => setIdentifierName("phone")}>
//                               Use Phone Number Instead
//                             </Link>
//                           ) : (
//                             <Link href="#" onClick={() => setIdentifierName("email")}>
//                               Use Email Instead
//                             </Link>
//                           )}
//                         </div>

//                         <div className="mt-5 text-center">
//                           <p className="mb-0">
//                             Don't have an account?{" "}
//                             <Link
//                               href="/signup"
//                               className="fw-semibold text-primary text-decoration-underline"
//                             >
//                               Sign Up
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
//     </div>
//   );
// }


'use client'

import { api_url } from "@/Constants";
import { dynamicConfig, scrolltoTopOFPage } from "@/Functions";
import { saveJwt } from "@/Secrets";
import { Slide } from "@material-ui/core";
import Link from "next/link";
import { useRef, useState } from "react";

// Force the page to be dynamically rendered on every request
export const dynamic = dynamicConfig();

export default function Signin() {
  // Refs for the form inputs
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const passwordRef = useRef(null);

  // State for error messages
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [identifierName, setIdentifierName] = useState("email");
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    password: ""
  });

  // NEW: State to track whether the password is visible
  const [showPassword, setShowPassword] = useState(false);

  // NEW: State to show the “forgot‐password” success message
  const [forgotMessage, setForgotMessage] = useState("");

  // Form validation checks (unchanged)
  const validateForm = () => {
    const email = emailRef.current?.value?.trim();
    const phone = phoneRef.current?.value?.trim();
    const password = passwordRef.current?.value?.trim();

    let isValid = true;
    const newErrors = { email: "", phone: "", password: "" };

    if (!email) {
      newErrors.email = "Please enter email";
      isValid = false;
    }

    if (!phone) {
      newErrors.phone = "Please enter your phone number";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Please enter your password";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submit (login)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setForgotMessage("");

    const email = emailRef.current?.value?.trim();
    const phone = phoneRef.current?.value?.trim();
    const password = passwordRef.current?.value?.trim();

    const requestObject = {
      identifier: phone ? phone : email,
      password: password
    };

    setLoading(true);

    // Uncomment if you want client‐side validation on login:
    // if (!validateForm()) {
    //   setLoading(false);
    //   return;
    // }

    try {
      const response = await fetch(api_url + '/auth/local', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestObject)
      });
      const data = await response.json();

      if (data.hasOwnProperty('error')) {
        setServerError(data.error.message.replace("Username", "Number"));
        setLoading(false);
        return;
      }

      saveJwt(data.jwt);
      window.location = "/";
    } catch (err) {
      console.error('Error:', err);
      setServerError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  // NEW: Handle “Forgot Password?” click
  const handleForgotPassword = async () => {
    setServerError("");
    setForgotMessage("");

    // Only works in “email” mode
    if (identifierName !== "email") {
      setServerError("Switch to Email mode to reset your password.");
      return;
    }

    const email = emailRef.current?.value?.trim();
    if (!email) {
      setServerError("Please enter your email address first.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${api_url}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      
      const data = await response.json();

      // Strapi returns { ok: true } on success
      if (response.ok && data.ok) {
        setForgotMessage("A link has been sent to your email address; click on it to reset the password.");
      } else {
        // If Strapi returns an error object, show its message
        const message = data?.error?.message || "Failed to send reset link. Please try again.";
        setServerError(message);
      }
    } catch (err) {
      console.error(err);
      setServerError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Renders either email or phone input based on identifierName
  const renderIdentifierField = (identifierName) => {
    if (identifierName === "email") {
      return (
        <div className="mb-3">
          <label htmlFor="useremail" className="form-label">
            Email <span className="text-danger">*</span>
          </label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            id="useremail"
            placeholder="Enter Email Address"
            ref={emailRef}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
      );
    } else {
      return (
        <div className="mb-3">
          <label htmlFor="phonenumber" className="form-label">
            Phone number <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
            id="phonenumber"
            placeholder="Enter Phone Number"
            ref={phoneRef}
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
        </div>
      );
    }
  };

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
                  <Slide in={true} direction="right">
                    <div className="col-lg-6">
                      <div className="p-lg-5 p-4 auth-one-bg h-100">
                        <div className="bg-overlay" />
                        {/* Carousel section omitted for brevity */}
                      </div>
                    </div>
                  </Slide>
                  <Slide in={true} direction="left">
                    <div className="col-lg-6">
                      <div className="p-lg-5 p-4">
                        <div>
                          <h5 className="text-primary">Log Into Your Account</h5>
                        </div>
                        <div className="mt-4">
                          <form className="needs-validation" noValidate="" onSubmit={handleSubmit}>
                            {renderIdentifierField(identifierName)}

                            {/* Password field with toggle */}
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
                                >
                                  <i className={showPassword ? "ri-eye-off-fill align-middle" : "ri-eye-fill align-middle"} />
                                </button>
                                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                              </div>
                            </div>

                            {/* Display server errors or “forgot password” success message */}
                            {serverError && (
                              <div className="alert alert-danger">
                                {serverError}
                              </div>
                            )}
                            {forgotMessage && (
                              <div className="alert alert-success">
                                {forgotMessage}
                              </div>
                            )}

                            <div className="mt-4">
                              <button disabled={loading} className="btn btn-success w-100">
                                {loading ? "Processing…" : "Login"}
                              </button>
                            </div>
                          </form>

                          {/* NEW: “Forgot Password?” button */}
                          <div className="mt-3 text-center">
                            <button
                              type="button"
                              className="btn btn-link text-decoration-none"
                              onClick={handleForgotPassword}
                              disabled={loading}
                            >
                              Forgot Password?
                            </button>
                          </div>
                        </div>

                        <div className="mt-3">
                          {identifierName === "email" ? (
                            <Link href="#" onClick={() => setIdentifierName("phone")}>
                              Use Phone Number Instead
                            </Link>
                          ) : (
                            <Link href="#" onClick={() => setIdentifierName("email")}>
                              Use Email Instead
                            </Link>
                          )}
                        </div>

                        <div className="mt-5 text-center">
                          <p className="mb-0">
                            Don't have an account?{" "}
                            <Link
                              href="/signup"
                              className="fw-semibold text-primary text-decoration-underline"
                            >
                              Sign Up
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Slide>
                </div>
              </div>
              {/* end card */}
            </div>
            {/* end col */}
          </div>
          {/* end row */}
        </div>
        {/* end container */}
      </div>
      {/* end auth page content */}
    </div>
  );
}
