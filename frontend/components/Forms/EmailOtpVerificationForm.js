import { api_url } from '@/Constants';
import { Alert } from '@mui/material';
import React, { Component } from 'react';

export default class EmailOtpVerificationForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      otp: '',
      errorExists: false,
      submitting: false,
      submittingText: 'Verify Code',
      error: '',
      countdown: 90, // 1 minute 30 seconds countdown
      resendDisabled: true
    };
    this.timer = null
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  startTimer = () => {
    this.timer = setInterval(() => {
      this.setState(prevState => ({
        countdown: prevState.countdown - 1
      }), () => {
        if (this.state.countdown <= 0) {
          clearInterval(this.timer);
          this.setState({
            resendDisabled: false
          });
        }
      });
    }, 1000);
  };

  verifyOTP = async () => {
    if(this.state.otp.length === 0){
        this.setState({
            errorExists: true,
            error: 'Please enter the OTP sent to your number'
        })
        return
    }
    if(this.state.otp.length < 6 || this.state.otp.length > 6){
        this.setState({
            errorExists: true,
            error: 'OTP has to be 6 digits'
        })
        return
    }
    this.setState({
      submitting: true,
      submittingText: 'verifying...'
    })
    const email = this.props.email
    const otp = this.state.otp
    // Make request to verify OTP
   // /api/auths?email=xxx&otp=xxx&auth_stage=verification&intent=signup&userType=xxx
    const response = await fetch(api_url+'/auths?identifier='+email+'&otp='+otp+'&auth_stage=verification&identifierType=email',{
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(data => data)
        .catch(error => console.error(error))
        
    if(!response){
        this.setState({
            errorExists: true,
            error: 'invalid OTP!'
        })
        return
    }
    else if(!response.verificationStatus){
        this.setState({
            errorExists: true,
            error: 'invalid OTP!'
        })
        return
    }
    else{
        this.props.action(); // Authenticate user
    }
  }

  resendOTP = async () => {
    // Make request to resend OTP
    fetch(api_url+'/auths?identifier='+this.props.email+'&auth_stage=sendotp&identifierType=email',{
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(response => response.json())
        .then(data => data)
        .catch(error => console.error(error))
    // Reset countdown
    this.setState({
      countdown: 180, // 3 minutes in seconds
      resendDisabled: true
    }, () => {
      this.startTimer()
    })
  }

  handleOTPChange = event => {
    this.setState({
      otp: event.target.value,
      errorExists: false
    });
  };

  render() {
    const { otp, countdown, resendDisabled } = this.state;

    return (
        <div className="auth-form mt-2">
        <label className="mb-1 text-gray"><strong>Enter code sent to your email address</strong></label>
        <div className="form-group">
        <input onChange={this.handleOTPChange} className="form-control mb-2" type="text" placeholder="Enter 6 digit Code" value={otp}/>
        </div>
        <button disabled={this.state.submitting} className="btn bg-white text-primary btn-block mb-2" onClick={this.verifyOTP}>{this.state.submittingText}</button>
        <p>Time remaining to resend Code: {countdown} seconds</p>
        <button className="btn bg-white text-primary btn-block" onClick={this.resendOTP} disabled={resendDisabled}>
          Resend OTP
        </button>
        <br/>
        {this.state.errorExists? <Alert severity='warning'>{this.state.error}</Alert> : <></>}
      </div>
    );
  }
}