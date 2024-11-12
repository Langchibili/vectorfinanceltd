'use client'

import { api_url, submitCreateUserRequest } from "@/Constants";
import { dynamicConfig, getEmailAddresses, getPhoneNumbers, returnNineDigitNumber, updateEmailAddresses, updatePhoneNumbers, updateUserAccount } from "@/Functions";
import { saveJwt } from "@/Secrets";
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
  const [serverError,setServerError] = useState(null)
  const [loading,setLoading] = useState(false)
  const [identifierName, setIdentifierName] = useState('email')
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    password: ""
  });

  // Form validation checks
  const validateForm = () => {
    const email = emailRef.current?.value?.trim();
    const phone = phoneRef.current?.value?.trim();
    const password = passwordRef.current?.value?.trim();

    let isValid = true;
    const newErrors = { email: "", phone: "", password: "" };

    // Basic validation (adjust rules as needed)
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

  // Handle form submit (You will add the actual submit logic)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current?.value?.trim();
    const phone = phoneRef.current?.value?.trim();
    const password = passwordRef.current?.value?.trim();
    const requestObject = {
        identifier: phone? phone : email,
        password:password
    }
    setLoading(true)  
    //if (validateForm()) {
        const response = await fetch(api_url+'/auth/local',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestObject)
          })
          .then(response => response.json())
          .then(data => data)
          .catch(error => {
            console.error('Error:', error);
          })
          saveJwt(response.jwt)  
          console.log(response)
        if(response.hasOwnProperty('error')){
            setServerError(response.error.message.replace("Username","Number"))
            setLoading(false)
            return
        }
        else{
            // const phoneNumber = "+260"+returnNineDigitNumber(phone)
            // const phoneNumbers = getPhoneNumbers()
            // const emailAddresses = getEmailAddresses()
            // phoneNumbers.clientNumbers.push(phone)
            // emailAddresses.clientEmailAddresses.push(email)
            // console.log(phoneNumbers)
            // console.log(emailAddresses)
            // updatePhoneNumbers({data:phoneNumbers.clientNumbers})
            // updateEmailAddresses()
            window.location = "/"
        }
    // }
    // else {
    //   return
    // }
  };

 
  const renderIdentifierField = (identifierName)=>{
        if(identifierName === "email"){
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
            )
        }
        else{
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
            )
        }
  } 


  return (
    <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
      <div className="bg-overlay" />
      <div className="auth-page-content overflow-hidden pt-lg-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="card overflow-hidden m-0">
                <div className="row justify-content-center g-0">
                  <div className="col-lg-6">
                    <div className="p-lg-5 p-4 auth-one-bg h-100">
                      <div className="bg-overlay" />
                      {/* Carousel section omitted for brevity */}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="p-lg-5 p-4">
                      <div>
                        <h5 className="text-primary">Log Into Your Account</h5>
                        {/* <p className="text-muted">
                          Sign up and access one of our low-interest loans within 24hrs.
                        </p> */}
                      </div>
                      <div className="mt-4">
                        <form className="needs-validation" noValidate="" onSubmit={handleSubmit}>
                          
                          {renderIdentifierField(identifierName)}
                          <div className="mb-3">
                            <label className="form-label" htmlFor="password-input">
                              Password
                            </label>
                            <div className="position-relative auth-pass-inputgroup">
                              <input
                                type="password"
                                className={`form-control pe-5 password-input ${errors.password ? 'is-invalid' : ''}`}
                                placeholder="Enter Password"
                                id="password-input"
                                ref={passwordRef}
                              />
                              <button
                                className="btn btn-link position-absolute end-0 top-0 text-decoration-none shadow-none text-muted password-addon"
                                type="button"
                                id="password-addon"
                              >
                                <i className="ri-eye-fill align-middle" />
                              </button>
                              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                            </div>
                          </div>
                            <p className="text text-danger">{serverError}</p>
                          <div className="mt-4">
                            <button disabled={loading} className="btn btn-success w-100">
                              {loading? "Logging You In..." : "Login"}
                            </button>
                          </div>
                        </form>
                      </div>
                      <div>
                      {identifierName === "email"? <Link href="#" onClick={()=>{ setIdentifierName("phone") }}>Use Phone Number Instead</Link> : <Link href="#" onClick={()=>{ setIdentifierName("email") }}>Use Email Instead</Link>}
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
