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

  // Form validation (unchanged)
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

  // LOGIN handler (unchanged)
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

  // FORGOT PASSWORD handler (updated)
  const handleForgotPassword = async () => {
    setServerError("");
    setForgotMessage("");

    // Must be in email mode
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
        // Successfully created a password-reset entry
        setForgotMessage(
          "A link has been sent to your email address; click on it to reset the password."
        );
      } else {
        // Something went wrong: either 400 or 500
        setServerError("Failed to send reset link. Please try again and ensure to input the correct email.");
      }
    } catch (err) {
      console.error(err);
      setServerError("Failed to send reset link. Please try again and ensure to input the correct email.");
    } finally {
      setLoading(false);
    }
  };

  const renderIdentifierField = (identifierName) => {
    if (identifierName === "email") {
      return (
        <div className="mb-3">
          <label htmlFor="useremail" className="form-label">
            Email <span className="text-danger">*</span>
          </label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            id="useremail"
            placeholder="Enter Email Address"
            ref={emailRef}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
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
            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
            id="phonenumber"
            placeholder="Enter Phone Number"
            ref={phoneRef}
          />
          {errors.phone && (
            <div className="invalid-feedback">{errors.phone}</div>
          )}
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
                        {/* Carousel omitted */}
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
                          <form
                            className="needs-validation"
                            noValidate=""
                            onSubmit={handleSubmit}
                          >
                            {renderIdentifierField(identifierName)}

                            {/* Password field w/ toggle */}
                            <div className="mb-3">
                              <label
                                className="form-label"
                                htmlFor="password-input"
                              >
                                Password <span className="text-danger">*</span>
                              </label>
                              <div className="position-relative auth-pass-inputgroup">
                                <input
                                  type={showPassword ? "text" : "password"}
                                  className={`form-control pe-5 password-input ${
                                    errors.password ? "is-invalid" : ""
                                  }`}
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
                                    className={
                                      showPassword
                                        ? "ri-eye-off-fill align-middle"
                                        : "ri-eye-fill align-middle"
                                    }
                                  />
                                </button>
                                {errors.password && (
                                  <div className="invalid-feedback">
                                    {errors.password}
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Show server errors or forgot-password success */}
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
                              <button
                                disabled={loading}
                                className="btn btn-success w-100"
                              >
                                {loading ? "Processing…" : "Login"}
                              </button>
                            </div>
                          </form>

                          {/* Forgot Password button */}
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

                        <div className="mt-3 text-center">
                          {identifierName === "email" ? (
                            <button
                              type="button"
                              className="btn btn-secondary"
                              style={{backgroundColor:'#4b38b3'}}
                              onClick={() => setIdentifierName("phone")}
                            >
                              Use Phone Number Instead
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn btn-secondary"
                              style={{backgroundColor:'#4b38b3'}}
                              onClick={() => setIdentifierName("email")}
                            >
                              Use Email Instead
                            </button>
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
