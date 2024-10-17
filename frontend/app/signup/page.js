'use client'

import Uploader from "@/components/Includes/Uploader/Uploader";
import { submitCreateUserRequest } from "@/Constants";
import { dynamicConfig, textHasPhoneNumber, updateUserAccount } from "@/Functions";
import { saveJwt } from "@/Secrets";
import Link from "next/link";
import { useRef, useState } from "react";

// Force the page to be dynamically rendered on every request
export const dynamic = dynamicConfig();

export default function Signup() {  
  // Refs for the form inputs
  const emailRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const phoneRef = useRef(null);
  const passwordRef = useRef(null);
  

  // State for error messages
  const [serverError,setServerError] = useState(null)
  const [loading,setLoading] = useState(false)
  const [errors, setErrors] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    password: ""
  });

  // Form validation checks
  const validateForm = () => {
    const email = emailRef.current.value.trim();
    const firstName = firstNameRef.current.value.trim();
    const lastName = lastNameRef.current.value.trim();
    const phone = phoneRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    let isValid = true;
    const newErrors = { email: "", firstName: "", lastName: "", phone: "", password: "" };

    // Basic validation (adjust rules as needed)
    if (!email) {
      newErrors.email = "Please enter email";
      isValid = false;
    }

    if (!firstName) {
      newErrors.firstName = "Please enter your first name";
      isValid = false;
    }

    if (!lastName) {
      newErrors.lastName = "Please enter your last name";
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
    // else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)) {
    //   newErrors.password = "Password must meet the criteria";
    //   isValid = false;
    // }
   
    if (!textHasPhoneNumber(phone)) {
        newErrors.phone = "Please enter a valid phone number";
        isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submit (You will add the actual submit logic)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value.trim();
    const firstName = firstNameRef.current.value.trim();
    const lastName = lastNameRef.current.value.trim();
    const phone = phoneRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    const requestObject = {
        username: phone,
        email:email,
        password:password
    }
    
    if (validateForm()) {
       setLoading(true) 
       const response = await submitCreateUserRequest(requestObject) // initial user account creation
       if(response.hasOwnProperty('error')){
           setServerError(response.error.message.replace("Username","Number"))
           setLoading(false)
           return
       }
     
       else{
          saveJwt(response.jwt)
          const userUpdateObject = {
                  fullnames: firstName+" "+lastName,
                  "details":{
                      firstname: firstName,
                      lastname: lastName,
                      age:null,
                      gender:null,
                      dateOfBirth:null,
                      address:null
                    }
          }
          //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzI5MDMzMTA2LCJleHAiOjQ4ODQ3OTMxMDZ9.n-pci1lnF4rp1XU60Z5rvGF4omUtT50o-8D13-Ei7Yc
          const updatedUserAccount = await updateUserAccount(userUpdateObject,response.user.id,response.jwt)
          if(updatedUserAccount){
            window.location = "/"
          }
       }
    }
    else {
      return
    }
  };


  

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
                        <h5 className="text-primary">Register Account</h5>
                        <p className="text-muted">
                          Sign up and access one of our low-interest loans within 24hrs.
                        </p>
                      </div>
                      <div className="mt-4">
                        <form className="needs-validation" noValidate="" onSubmit={handleSubmit}>
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
                          <div className="mb-4">
                                <p className="mb-0 fs-12 text-muted fst-italic">
                                By registering you agree to the VectorFinance{" "}
                                    <a
                                    href="#"
                                    className="text-primary text-decoration-underline fst-normal fw-medium"
                                    >
                                    Terms of Use
                                    </a>
                                </p>
                            </div>
                            <p className="text text-danger">{serverError}</p>
                          <div className="mt-4">
                            <button disabled={loading} className="btn btn-success w-100">
                              {loading? "Setting Account Up..." : "Sign Up"}
                            </button>
                          </div>
                        </form>
                      </div>
                      <div className="mt-5 text-center">
                        <p className="mb-0">
                          Already have an account?{" "}
                          <Link
                            href="/signin"
                            className="fw-semibold text-primary text-decoration-underline"
                          >
                            Login
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
