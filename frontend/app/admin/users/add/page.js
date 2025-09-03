'use client'

import { submitCreateUserRequest } from "@/Constants";
import { dynamicConfig, getFormByName, getReferrerFromReferralCode, scrolltoTopOFPage, textHasPhoneNumber, updateUserAccount, validateEmail } from "@/Functions";
import { Slide } from "@material-ui/core";
import { Alert, Button } from "@mui/material";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { useUser } from '@/Contexts/UserContext'
import { usePage } from '@/Contexts/PageContext'
import { Stack } from "@mui/system";

// Force the page to be dynamically rendered on every request
export const dynamic = dynamicConfig();

export default function AdminUserAdd() {  
  // Admin authentication logic
  const loggedInUser = useUser()
  const { setPage: setPageContext } = usePage()
  const loggedIn = loggedInUser?.status || false
  const adminRoles = ['director', 'ceo', 'Loan Admin', 'Accountant']
  setPageContext('/admin/users')

  // Refs for the form inputs
  const emailRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const phoneRef = useRef(null);
  const passwordRef = useRef(null);
  const referralCodeRef = useRef(null)

  // State for error messages
  const [serverError,setServerError] = useState(null)
  const [loading,setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    password: ""
  });

  useEffect(() => {
    scrolltoTopOFPage()
  }, [])

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
    if(!validateEmail(email)){
        newErrors.email = "Please enter a valid email address";
        isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submit (You will add the actual submit logic)
  const handleSubmit = async (e) => {
    e.preventDefault()
    const referralCode = referralCodeRef.current.value.trim();
    const validatereferralcode = await validateReferralCode(referralCode)
    
    if(!validatereferralcode){
      setServerError("Please enter a valid reference code, or remove it entirely.")
      return
    }
    
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
          const referrer = await getReferrer(referralCode) // get user who referred this user
          const form = await getFormByName('GeneralLoanForm')
          const userUpdateObject = {
                  fullnames: firstName+" "+lastName,
                  referredBy: referrer?.id || null,
                  formsToFill: {connect:[form.id]},
                  "details":{
                      firstname: firstName,
                      lastname: lastName,
                      age:null,
                      gender:null,
                      dateOfBirth:null,
                      address:null
                    }
          }
          const user = await updateUserAccount(userUpdateObject,response.user.id,response.jwt)
          window.location = "/admin/users/"+user.id
       }
    }
    else {
      return
    }
  }

  const getReferrer = async (referralCode)=>{
        return await getReferrerFromReferralCode(referralCode)
  }
          
  const getDefaultReferralCode = ()=>{
       if(typeof document !== "undefined"){
        if(localStorage.getItem('referralCode')){
          return localStorage.getItem('referralCode')
        }
       }
       return ''
  }

  const validateReferralCode = async (referralCode)=>{
       const referredBy = await getReferrerFromReferralCode(referralCode)
       if(referralCode === ''){
          return true
       }
       if(!referredBy){
          return false
       }
       return true
  }
  
  // Admin authentication UI
  if (!loggedIn || !adminRoles.includes(loggedInUser?.user?.type)) {
    return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '70px' }}>
          <Stack spacing={2} alignItems="center">
            {typeof window !== 'undefined' ? (
            <>
            <Alert severity="warning">You are logged out, log in</Alert>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                const redirect = encodeURIComponent(window.location.href)
                window.location.href = `/admin?redirectUrl=${redirect}`
              }}
            >
              Login to Proceed
            </Button>
            </>
          ) : null}
          </Stack>
        </div>
    )
  }

  scrolltoTopOFPage()
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
                        <h5 className="text-primary">Register Account</h5>
                        <p className="text-muted">
                          You are registering a client's account on their behalf, make sure to have them read the terms of use
                        </p>
                      </div>
                      <div className="mt-4">
                        <form className="needs-validation" noValidate="" onSubmit={handleSubmit}>
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
                                  onClick={() =>
                                    setShowPassword((prev) => !prev)
                                  }
                                  style={{ zIndex: 2 }}
                                >
                                  <i
                                    className={showPassword
                                        ? "ri-eye-off-fill align-middle"
                                        : "ri-eye-fill align-middle"
                                    }
                                  />
                                </button>
                              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                            </div>
                          </div>
                          <label htmlFor="referral-code" className="form-label">
                              Referral Code: <span className="text-info">(leave blank if you don't have a code)</span>
                          </label>
                          <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Code"
                                id="referral-code"
                                defaultValue={getDefaultReferralCode()}
                                ref={referralCodeRef}
                              />
                          <div className="mb-4">
                                <p className="mb-0 fs-12 text-muted fst-italic">
                                   By registering this client, the client agrees to the VectorFinance{" "}
                                    <Link
                                    href="/termsofuse"
                                    className="text-primary text-decoration-underline fst-normal fw-medium"
                                    >
                                    Terms of Use
                                    </Link>
                                </p>
                            </div>
                            <p className="text text-danger">{serverError}</p>
                          <div className="mt-4">
                            <button type="submit" disabled={loading} className="btn btn-success w-100">
                              {loading? "Setting Account Up..." : "Sign Up"}
                            </button>
                          </div>
                        </form>
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
  )
}