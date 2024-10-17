"use client";

import { updateUserAccount } from "@/Functions";
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
      error:null
    };
  }

  componentDidMount() {
    const { details } = this.props.loggedInUser;

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
    });
  }

  handleInputChange = (e) => {
    //new Date(details.dateOfBirth).toLocaleDateString('en-US')
    const { name, value } = e.target;
    // Update state based on field name
    // name === "dateOfBirth"? new Date(value).toLocaleDateString('en-US') :
    this.setState({ [name]: value }, this.checkFormValidity);
  };

  checkFormValidity = () => {
    const { firstname, lastname, age, gender, address, dateOfBirth } = this.state;

    // Validate that all fields are filled
    const isFormValid =
      firstname.trim() &&
      lastname.trim() &&
      age &&
      gender &&
      address &&
      dateOfBirth;

    this.setState({ isFormValid });
  }

  handleSubmit = async (e)=>{
     e.preventDefault()
     delete this.state.isFormValid
     delete this.state.saving
     delete this.state.error
     this.setState({
        saving: true
     })
     const updatedUser = await updateUserAccount({details:this.state},this.props.loggedInUser.id)
     console.log(updatedUser)
     if(updatedUser.hasOwnProperty('error')){
        this.setState({
            error: 'something went wrong, try again',
            saving: false
        })
        return
     }
     this.setState({
        saving: false
    })
  }

  render() {
    const { firstname, lastname, age, gender, address, dateOfBirth, isFormValid } = this.state;

    return (
      <>
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header align-items-center d-flex">
                <h4 className="card-title mb-0 flex-grow-1">Basic Details </h4>
              </div>
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
                        className="btn btn-success w-50 mt-3"
                        id="confirm-btn"
                        // Submit button logic to be handled separately
                      >
                        Save
                      </button>
                    </div>
                    <div style={{ width: "100%", textAlign: "right" }}>
                      <button
                        type="button"
                        className="btn btn-danger w-50 mt-3"
                        id="next-btn"
                        disabled={!isFormValid}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                 {this.state.error? <p className="text text-danger">{this.state.error}</p> : <></>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
