"use client";

import { checkUserLogginStatus } from "@/Constants";
import { updateUserAccount } from "@/Functions";
import { Slide } from "@material-ui/core";
import React from "react";

export default class UpdateDetailsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      age: '',
      gender: '',
      address: '',
      dateOfBirth: '',
      // More fields can be added as necessary
      isFormValid: false,
      saving: false,
      saved: false,
      error:null
    };
  }

  async componentDidMount() {
    let details = this.props.loggedInUser.details;
    if(this.props.formReOpened){ // this means a user has clicked the previous button on the next form
        const loggedInUser = await checkUserLogginStatus()
        details  = loggedInUser.user.details
    }
    // Set default values, ensure nulls are handled
    this.setState({
      firstname: details?.firstname || '',
      lastname: details?.lastname || '',
      age: details?.age || '',
      gender: details?.gender || '',
      address: details?.address || '',
      dateOfBirth: details?.dateOfBirth
        ? details.dateOfBirth // format MM/DD/YYYY
        : '',
    },()=>{
      this.checkFormValidity(true)
    });
  }

  handleInputChange = (e) => {
    //new Date(details.dateOfBirth).toLocaleDateString('en-US')
    const { name, value } = e.target;
    // Update state based on field name
    // name === "dateOfBirth"? new Date(value).toLocaleDateString('en-US') :
    this.setState({ [name]: !value? '' : value, saved: false}, this.checkFormValidity);
  };

  checkFormValidity = (initialCheck=false) => {
    const { firstname, lastname, age, gender, address, dateOfBirth } = this.state;

    // Validate that all fields are filled
    const isFormValid =
      firstname.trim() &&
      lastname.trim() &&
      age &&
      gender &&
      address &&
      dateOfBirth;

      if(!initialCheck){
        this.setState({ isFormValid });
      }
      else{
        if(isFormValid){
          this.setState({ isFormValid:isFormValid, saved: true})
        }
        else{
          this.setState({ isFormValid})
        }
      }
  }

  handleSubmit = async (e)=>{
     e.preventDefault()
     const updateObject = this.state
     delete updateObject.isFormValid
     delete updateObject.saving
     delete updateObject.error
     
     if(!updateObject.age){
        updateObject.age = null
     }
     if(!updateObject.gender){
        updateObject.gender = null
     }
     if(!updateObject.dateOfBirth){
        updateObject.dateOfBirth = null
     }
     if(!updateObject.firstname){
      updateObject.firstname = null
     }
     if(!updateObject.lastname){
        updateObject.lastname = null
     }
     if(!updateObject.address){
        updateObject.address = null
     }
     this.setState({
        saving: true
     })
     const updatedUser = await updateUserAccount({details:updateObject},this.props.loggedInUser.id)
     console.log(updatedUser)
     if(updatedUser.hasOwnProperty('error')){
        this.setState({
            error: 'something went wrong, try again',
            saving: false
        })
        return
     }
     this.checkFormValidity()
     this.setState({
        saving: false,
        saved: true
    })
  }

  render() {
    const { firstname, lastname, age, gender, saved, address, dateOfBirth, isFormValid } = this.state;

    return (
      <Slide in={true} direction="left">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header align-items-center d-flex">
                {this.props.loanCategory !== "personal"? <h4 className="card-title mb-0 flex-grow-1">Basic Details Of Either</h4> : <h4 className="card-title mb-0 flex-grow-1">Your Basic Details </h4>}
              </div>
              {this.props.loanCategory !== "personal"? <h6 style={{paddingLeft:'16px', marginTop:'10px'}}><small  style={{color:'gray'}}> (Owner/Representative/Board Member)</small></h6> : <></>}
              <div className="card-body">
                <div className="live-preview">
                  <div className="row gy-4">
                    <div className="col-xxl-3 col-md-6 col-lg-12">
                      <div>
                        <label htmlFor="firstnameInput" className="form-label">
                          Firstname
                        </label>
                        <input
                          className="form-control"
                          id="firstnameInput"
                          name="firstname"
                          type="text"
                          autoComplete="off"
                          value={firstname}
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-xxl-3 col-md-6 col-lg-12">
                      <div>
                        <label htmlFor="lastnameInput" className="form-label">
                          Lastname
                        </label>
                        <input
                          className="form-control"
                          id="lastnameInput"
                          name="lastname"
                          type="text"
                          autoComplete="off"
                          value={lastname}
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="input-group">
                        <span className="input-group-text" id="inputGroup-sizing-default">
                          Age
                        </span>
                        <input
                          type="number"
                          name="age"
                          value={age}
                          autoComplete="off"
                          onChange={this.handleInputChange}
                          className="form-control"
                          aria-label="Sizing example input"
                          aria-describedby="inputGroup-sizing-default"
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="input-group">
                        <select
                          className="form-select"
                          id="inputGroupSelect02"
                          name="gender"
                          autoComplete="off"
                          value={gender}
                          onChange={this.handleInputChange}
                        >
                          <option value="">Choose...</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                        <label className="input-group-text" htmlFor="inputGroupSelect02">
                          Gender
                        </label>
                      </div>
                    </div>
                    <div className="col-xxl-3 col-md-6 col-lg-12">
                      <div>
                        <label htmlFor="lastnameInput" className="form-label">
                          Address <small  style={{color:'lightgray'}}>(House No. Area City Province)</small>
                        </label>
                        <input
                          className="form-control"
                          id="lastnameInput"
                          name="address"
                          type="text"
                          autoComplete="off"
                          value={address}
                          onChange={this.handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-xxl-3 col-md-6 col-lg-12">
                            <div>
                                <label htmlFor="exampleInputdate" className="form-label">
                                Date Of Birth
                                </label>
                                <input type="date" name="dateOfBirth" defaultValue={dateOfBirth} onChange={this.handleInputChange} className="form-control" id="exampleInputdate" />
                            </div>
                  </div>
                  </div>
                  
                  {/* Save and Next Buttons */}
                  <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <div style={{ width: "100%" }}>
                      <button
                        disabled={this.state.saving}
                        onClick={this.handleSubmit}
                        type="button"
                        className="btn btn-success w-90 mt-3"
                        id="confirm-btn"
                        // Submit button logic to be handled separately
                      >
                        {this.state.saving? "Saving..." : "save"}
                      </button>
                    </div>
                    {this.props.formDisplay === "profile"? <></> : <div style={{ width: "100%", textAlign: "right" }}>
                      <button
                        type="button"
                        className="btn btn-danger w-50 mt-3"
                        id="next-btn"
                        disabled={!isFormValid || !saved}
                        onClick={()=>{this.props.handleOpenUpdateClientDetailsForm()}}
                      >
                        Next
                      </button>
                    </div>}
                  </div>
                 {this.state.error? <p className="text text-danger">{this.state.error}</p> : <></>}
                 <p className="text text-warning mt-2">Note that all the information you provide here is kept strictly confidential, and it's solely meant for verification and loan eligibility determination purposes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slide>
    );
  }
}
