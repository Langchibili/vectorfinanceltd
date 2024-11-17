"use client";

import React from "react";
import LencoPaymentButton from "../LencoPaymentButton/LencoPaymentButton";
import { Alert, IconButton } from "@mui/material";
import { ArrowBackOutlined } from "@material-ui/icons";
import PhoneOtpVerificationForm from "@/components/Forms/PhoneOtpVerificationForm";
import { sendOTP, textHasPhoneNumber } from "@/Functions";
import { Slide } from "@material-ui/core";

export default class MobileMoneyPayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null, // 'card' or 'mobile'
      selectedMobileOption: null, // 'preExisting' or 'other'
      phoneNumber: '',
      isPhoneNumberVerified: false,
      payNowEnabled: false,
      numberVerificationStarted: false,
      error: '',
      paymentMethod: ['Card']
    };
  }

  handleOptionChange = (option) => {
    const isCardPayment = option === "card";
    this.setState({
      selectedOption: option,
      paymentMethod: isCardPayment ? ["card"] : ["mobile-money"],
      selectedMobileOption: null,
      phoneNumber: '',
      isPhoneNumberVerified: false,
      payNowEnabled: isCardPayment
    });
  };

  handleMobileOptionChange = (option) => {
    this.setState(
      {
        selectedMobileOption: option,
        isPhoneNumberVerified: option === "preExisting",
        phoneNumber: option === "preExisting" ? this.props.loggedInUser.username : '',
        payNowEnabled: option === "preExisting"
      },
      () => {
        if (option === "other") {
          this.setState({ payNowEnabled: false });
        }
      }
    );
  };

  handleInputChange = (e) => {
    const { value } = e.target;
    this.setState({ phoneNumber: value });
  };

  verifyPhoneNumber = () => {
    // Logic to verify phone number
    this.setState({ isPhoneNumberVerified: true, payNowEnabled: true });
  };

  handleStartNumberVerification = (phoneNumber) => {
    if (!textHasPhoneNumber(phoneNumber)) {
      this.setState({
        numberVerificationStarted: false,
        error: 'Please provide a valid number'
      });
    } else {
      sendOTP(phoneNumber, "phoneNumber");
      this.setState({
        error: '',
        numberVerificationStarted: true
      });
    }
  };

  render() {
    const {
      selectedOption,
      selectedMobileOption,
      isPhoneNumberVerified,
      numberVerificationStarted,
      payNowEnabled,
      paymentMethod,
      phoneNumber
    } = this.state;

    return (
      <Slide in={true} direction="left">
      <div>
        <IconButton onClick={() => this.props.handleToggleMobileMobilePayments()}>
          <ArrowBackOutlined />
        </IconButton>
        <div>
          <h4>Select Payment Method</h4>
          <div>
             <label className="form-check-label mb-2" htmlFor="flexRadioDefault1">
              <input
                className="form-check-input"
                type="radio"
                name="paymentOption"
                id="flexRadioDefault1"
                value="card"
                onChange={() => this.handleOptionChange("card")}
                checked={selectedOption === "card"}
              />
              {"  Card Payment"}
            </label>
          </div>
          <div>
              <label className="form-check-label mb-2" htmlFor="flexRadioDefault2">
              <input
                className="form-check-input"
                type="radio"
                id="flexRadioDefault2"
                name="paymentOption"
                value="mobile"
                onChange={() => this.handleOptionChange("mobile")}
                checked={selectedOption === "mobile"}
              />
              {"  Mobile Money"}
            </label>
          </div>
        </div>

        {selectedOption === "mobile" && (
          <div>
            <hr/>
            <h6>Mobile Money Options</h6>
            <div>
               <label className="form-check-label mb-2" htmlFor="flexRadioDefault3">
                <input
                  className="form-check-input"
                  id="flexRadioDefault3"
                  type="radio"
                  name="mobileOption"
                  value="preExisting"
                  onChange={() => this.handleMobileOptionChange("preExisting")}
                  checked={selectedMobileOption === "preExisting"}
                />
                {"  Use your account phone number"} (<strong>{this.props.loggedInUser.username}</strong>)
              </label>
            </div>
            <div>
                <label className="form-check-label mb-2" htmlFor="flexRadioDefault4">
                <input
                  id="flexRadioDefault4"
                  className="form-check-input"
                  type="radio"
                  name="mobileOption"
                  value="other"
                  onChange={() => this.handleMobileOptionChange("other")}
                  checked={selectedMobileOption === "other"}
                />
                {"  Use another number"}
              </label>
            </div>

            {selectedMobileOption === "other" && (
              !isPhoneNumberVerified? <div className="mt-2">
                <h6>Enter Phone Number</h6>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    name="phoneNumber"
                    value={phoneNumber}
                    autoComplete="off"
                    onChange={this.handleInputChange}
                    className="form-control"
                    aria-label="Phone number input"
                  />
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => { this.handleStartNumberVerification(phoneNumber); }}
                  disabled={!phoneNumber || isPhoneNumberVerified}
                >
                  {isPhoneNumberVerified ? "Verified" : "Verify Phone Number"}
                </button>
                {this.state.error ? (
                  <Alert severity="error" sx={{ marginTop: '10px' }}>
                    {this.state.error}
                  </Alert>
                ) : null}
                {numberVerificationStarted && (
                  <PhoneOtpVerificationForm action={this.verifyPhoneNumber} phoneNumber={phoneNumber} />
                )}
              </div>:  <Alert severity="success" sx={{ marginTop: '10px' }}> Verified </Alert>
            )}

            {/* {isPhoneNumberVerified && (
              <Alert severity="success" sx={{ marginTop: '10px' }}>
                Verified
              </Alert>
            )} */}
          </div>
        )}

        <div style={{ marginTop: "20px" }}>
          <LencoPaymentButton
            loggedInUser={this.props.loggedInUser}
            paymentAmount={this.props.paymentAmount}
            paymentMethod={paymentMethod}
            phoneNumber={phoneNumber || this.props.loggedInUser.username}
            disabled={!payNowEnabled}
          />
        </div>
      </div>
      </Slide>
    );
  }
}
