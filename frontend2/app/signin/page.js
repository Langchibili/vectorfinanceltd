// 'use client'

// import { api_url } from "@/Constants";
// import { dynamicConfig, scrolltoTopOFPage } from "@/Functions";
// import { saveJwt } from "@/Secrets";
// import { Slide } from "@material-ui/core";
// import Link from "next/link";
// import { useRef, useState, useEffect } from "react";

// // Force the page to be dynamically rendered on every request
// export const dynamic = dynamicConfig();

// export default function Signin() {
//   const emailRef = useRef(null);
//   const phoneRef = useRef(null);
//   const passwordRef = useRef(null);

//   const [serverError, setServerError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [identifierName, setIdentifierName] = useState("email");
//   const [errors, setErrors] = useState({
//     email: "",
//     phone: "",
//     password: ""
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [forgotMessage, setForgotMessage] = useState("");
//   useEffect(() => {
//     scrolltoTopOFPage();
//   }, []);

//   // Form validation (unchanged)
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

//   // LOGIN handler (unchanged)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setServerError("");
//     setForgotMessage("");

//     const email = emailRef.current?.value?.trim();
//     const phone = phoneRef.current?.value?.trim();
//     const password = passwordRef.current?.value?.trim();
//     const requestObject = {
//       identifier: phone ? phone : email,
//       password: password
//     };

//     setLoading(true);
//     try {
//       const response = await fetch(api_url + "/auth/local", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(requestObject),
//       });
//       const data = await response.json();

//       if (data.error) {
//         setServerError(data.error.message.replace("Username", "Number"));
//         setLoading(false);
//         return;
//       }

//       saveJwt(data.jwt);
//       window.location = "/";
//     } catch (err) {
//       console.error("Error:", err);
//       setServerError("Something went wrong. Please try again.");
//       setLoading(false);
//     }
//   };

//   // FORGOT PASSWORD handler (updated)
//   const handleForgotPassword = async () => {
//     setServerError("");
//     setForgotMessage("");

//     // Must be in email mode
//     if (identifierName !== "email") {
//       setServerError("Switch to Email mode to reset your password.");
//       return;
//     }

//     const email = emailRef.current?.value?.trim();
//     if (!email) {
//       setServerError("Please enter your email address first.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch(`${api_url}/password-resets`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ data: { email } }),
//       });

//       const data = await response.json();
//       if (data && data.data) {
//         // Successfully created a password-reset entry
//         setForgotMessage(
//           "A link has been sent to your email address; click on it to reset the password."
//         );
//       } else {
//         // Something went wrong: either 400 or 500
//         setServerError("Failed to send reset link. Please try again and ensure to input the correct email.");
//       }
//     } catch (err) {
//       console.error(err);
//       setServerError("Failed to send reset link. Please try again and ensure to input the correct email.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderIdentifierField = (identifierName) => {
//     if (identifierName === "email") {
//       return (
//         <div className="mb-3">
//           <label htmlFor="useremail" className="form-label">
//             Email <span className="text-danger">*</span>
//           </label>
//           <input
//             type="email"
//             className={`form-control ${errors.email ? "is-invalid" : ""}`}
//             id="useremail"
//             placeholder="Enter Email Address"
//             ref={emailRef}
//           />
//           {errors.email && (
//             <div className="invalid-feedback">{errors.email}</div>
//           )}
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
//             className={`form-control ${errors.phone ? "is-invalid" : ""}`}
//             id="phonenumber"
//             placeholder="Enter Phone Number"
//             ref={phoneRef}
//           />
//           {errors.phone && (
//             <div className="invalid-feedback">{errors.phone}</div>
//           )}
//         </div>
//       );
//     }
//   }
//   return (
//     <div className="aut-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
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
//                         {/* Carousel omitted */}
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
//                           <form
//                             className="needs-validation"
//                             noValidate=""
//                             onSubmit={handleSubmit}
//                           >
//                             {renderIdentifierField(identifierName)}

//                             {/* Password field w/ toggle */}
//                             <div className="mb-3">
//                               <label
//                                 className="form-label"
//                                 htmlFor="password-input"
//                               >
//                                 Password <span className="text-danger">*</span>
//                               </label>
//                               <div className="position-relative auth-pass-inputgroup">
//                                 <input
//                                   type={showPassword ? "text" : "password"}
//                                   className={`form-control pe-5 password-input ${errors.password ? "is-invalid" : ""
//                                     }`}
//                                   placeholder="Enter Password"
//                                   id="password-input"
//                                   ref={passwordRef}
//                                 />
//                                 <button
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
//                                 {errors.password && (
//                                   <div className="invalid-feedback">
//                                     {errors.password}
//                                   </div>
//                                 )}
//                               </div>
//                             </div>

//                             {/* Show server errors or forgot-password success */}
//                             {serverError && (
//                               <div className="alert alert-danger">
//                                 {serverError}
//                               </div>
//                             )}
//                             {forgotMessage && (
//                               <div className="alert alert-success">
//                                 {forgotMessage}
//                               </div>
//                             )}

//                             <div className="mt-4">
//                               <button
//                                 disabled={loading}
//                                 className="btn btn-success w-100"
//                               >
//                                 {loading ? "Processing…" : "Login"}
//                               </button>
//                             </div>
//                           </form>

//                           {/* Forgot Password button */}
//                           <div className="mt-3 text-center">
//                             <button
//                               type="button"
//                               className="btn btn-link text-decoration-none"
//                               onClick={handleForgotPassword}
//                               disabled={loading}
//                             >
//                               Forgot Password?
//                             </button>
//                           </div>
//                         </div>

//                         <div className="mt-3 text-center">
//                           {identifierName === "email" ? (
//                             <button
//                               type="button"
//                               className="btn btn-secondary"
//                               style={{ backgroundColor: '#4b38b3' }}
//                               onClick={() => setIdentifierName("phone")}
//                             >
//                               Use Phone Number Instead
//                             </button>
//                           ) : (
//                             <button
//                               type="button"
//                               className="btn btn-secondary"
//                               style={{ backgroundColor: '#4b38b3' }}
//                               onClick={() => setIdentifierName("email")}
//                             >
//                               Use Email Instead
//                             </button>
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
import { Paper } from "@mui/material";        // ← new import
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { useThemeMode } from "@/components/ThemeProvider";   // ← new import

// Force dynamic rendering
export const dynamic = dynamicConfig();

export default function Signin() {
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const passwordRef = useRef(null);

  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [identifierName, setIdentifierName] = useState("email");
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [forgotMessage, setForgotMessage] = useState("");

  // ── Theme hook ──────────────────────────────
  const { isDark } = useThemeMode();

  useEffect(() => {
    scrolltoTopOFPage();
  }, []);

  /* ── validation ──────────────────────────────── */
  const validateForm = () => {
    const email = emailRef.current?.value?.trim();
    const phone = phoneRef.current?.value?.trim();
    const password = passwordRef.current?.value?.trim();

    let isValid = true;
    const newErrors = { email: "", phone: "", password: "" };

    if (!email) { newErrors.email = "Please enter email"; isValid = false; }
    if (!phone) { newErrors.phone = "Please enter your phone number"; isValid = false; }
    if (!password) { newErrors.password = "Please enter your password"; isValid = false; }

    setErrors(newErrors);
    return isValid;
  };

  /* ── login handler ──────────────────────────── */
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
    try {
      const response = await fetch(api_url + "/auth/local", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestObject),
      });
      const data = await response.json();

      if (data.error) {
        setServerError(data.error.message.replace("Username", "Number"));
        setLoading(false);
        return;
      }

      saveJwt(data.jwt);
      window.location = "/";
    } catch (err) {
      console.error("Error:", err);
      setServerError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  /* ── forgot password ───────────────────────── */
  const handleForgotPassword = async () => {
    setServerError("");
    setForgotMessage("");

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
      const response = await fetch(`${api_url}/password-resets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: { email } }),
      });

      const data = await response.json();
      if (data && data.data) {
        setForgotMessage(
          "A link has been sent to your email address; click on it to reset the password."
        );
      } else {
        setServerError("Failed to send reset link. Please try again and ensure to input the correct email.");
      }
    } catch (err) {
      console.error(err);
      setServerError("Failed to send reset link. Please try again and ensure to input the correct email.");
    } finally {
      setLoading(false);
    }
  };

  /* ── identifier field renderer ─────────────── */
  const renderIdentifierField = (identifierName) => {
    const inputStyle = {
      backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : '#fff',
      color: isDark ? '#fff' : '#0D1F17',
      borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.18)',
    };

    if (identifierName === "email") {
      return (
        <div className="mb-3">
          <label htmlFor="useremail" className="form-label" style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#0D1F17' }}>
            Email <span className="text-danger">*</span>
          </label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            id="useremail"
            placeholder="Enter Email Address"
            ref={emailRef}
            style={inputStyle}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
      );
    } else {
      return (
        <div className="mb-3">
          <label htmlFor="phonenumber" className="form-label" style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#0D1F17' }}>
            Phone number <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
            id="phonenumber"
            placeholder="Enter Phone Number"
            ref={phoneRef}
            style={inputStyle}
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
        </div>
      );
    }
  };

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

  return (
    <div
      className="auth-page-wrapper py-5 mt-4 justify-content-center align-items-center min-vh-100"
      style={{ background: wrapperBg }}
    >
      {/* Remove the old bg-overlay */}
      <div style={{ display: 'none' }} className="bg-overlay" />

      <div className="auth-page-content overflow-hidden pt-lg-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <Paper sx={cardSx}>
                <div className="row justify-content-center g-0">
                  <Slide in={true} direction="right">
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
                        {/* Carousel can be added here if needed */}
                      </div>
                    </div>
                  </Slide>
                  <Slide in={true} direction="left">
                    <div className="col-lg-6">
                      <div className="p-lg-5 p-4">
                        <div>
                          <h5 className="text-primary" style={{ color: isDark ? '#34D399' : '#059669' }}>
                            Log Into Your Account
                          </h5>
                        </div>
                        <div className="mt-4">
                          <form
                            className="needs-validation"
                            noValidate
                            onSubmit={handleSubmit}
                          >
                            {renderIdentifierField(identifierName)}

                            {/* Password field */}
                            <div className="mb-3">
                              <label className="form-label" htmlFor="password-input" style={{ color: isDark ? 'rgba(255,255,255,0.7)' : '#0D1F17' }}>
                                Password <span className="text-danger">*</span>
                              </label>
                              <div className="position-relative auth-pass-inputgroup">
                                <input
                                  type={showPassword ? "text" : "password"}
                                  className={`form-control pe-5 password-input ${errors.password ? "is-invalid" : ""}`}
                                  placeholder="Enter Password"
                                  id="password-input"
                                  ref={passwordRef}
                                  style={{
                                    backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : '#fff',
                                    color: isDark ? '#fff' : '#0D1F17',
                                    borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.18)',
                                  }}
                                />
                                <button
                                  type="button"
                                  className="btn btn-link position-absolute end-0 top-0 text-decoration-none shadow-none password-addon"
                                  onClick={() => setShowPassword((prev) => !prev)}
                                  style={{ zIndex: 2, color: '#10B981' }}
                                >
                                  <i
                                    className={
                                      showPassword
                                        ? "ri-eye-off-fill align-middle"
                                        : "ri-eye-fill align-middle"
                                    }
                                  />
                                </button>
                                {errors.password && (
                                  <div className="invalid-feedback">{errors.password}</div>
                                )}
                              </div>
                            </div>

                            {serverError && (
                              <div className="alert alert-danger" style={{ background: 'rgba(248,113,113,0.1)', borderColor: 'rgba(248,113,113,0.28)', color: '#F87171' }}>
                                {serverError}
                              </div>
                            )}
                            {forgotMessage && (
                              <div className="alert alert-success" style={{ background: 'rgba(16,185,129,0.09)', borderColor: 'rgba(16,185,129,0.22)', color: '#34D399' }}>
                                {forgotMessage}
                              </div>
                            )}

                            <div className="mt-4">
                              <button
                                disabled={loading}
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
                                {loading ? "Processing…" : "Login"}
                              </button>
                            </div>
                          </form>

                          <div className="mt-3 text-center">
                            <button
                              type="button"
                              className="btn btn-link text-decoration-none"
                              onClick={handleForgotPassword}
                              disabled={loading}
                              style={{ color: isDark ? '#34D399' : '#059669' }}
                            >
                              Forgot Password?
                            </button>
                          </div>
                        </div>

                        <div className="mt-3 text-center">
                          {identifierName === "email" ? (
                            <button
                              type="button"
                              className="btn"
                              style={{
                                backgroundColor: '#C9A84C',
                                color: '#fff',
                                fontWeight: 700,
                                borderRadius: 10,
                                border: 'none',
                                boxShadow: '0 4px 14px rgba(201,168,76,0.25)',
                              }}
                              onClick={() => setIdentifierName("phone")}
                            >
                              Use Phone Number Instead
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn"
                              style={{
                                backgroundColor: '#C9A84C',
                                color: '#fff',
                                fontWeight: 700,
                                borderRadius: 10,
                                border: 'none',
                                boxShadow: '0 4px 14px rgba(201,168,76,0.25)',
                              }}
                              onClick={() => setIdentifierName("email")}
                            >
                              Use Email Instead
                            </button>
                          )}
                        </div>

                        <div className="mt-5 text-center">
                          <p className="mb-0" style={{ color: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(13,31,23,0.60)' }}>
                            Don't have an account?{" "}
                            <Link
                              href="/signup"
                              className="fw-semibold text-primary text-decoration-underline"
                              style={{ color: '#10B981' }}
                            >
                              Sign Up
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