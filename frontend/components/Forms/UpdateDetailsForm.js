"use client";

import { checkUserLogginStatus } from "@/Constants";
import { updateUserAccount } from "@/Functions";
import { Slide } from "@material-ui/core";
import React from "react";
import WarningSnapBack from "../Includes/SnapBacks/WarningSnapBack";
import { FORM_CSS } from "./FormTheme";

/* ── inject CSS once ── */
let _cssInjected = false;
function injectCSS() {
  if (typeof document === "undefined" || _cssInjected) return;
  _cssInjected = true;
  const tag = document.createElement("style");
  tag.setAttribute("data-vf-forms", "1");
  tag.textContent = FORM_CSS;
  document.head.appendChild(tag);
}

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
      isFormValid: false,
      saving: false,
      saved: false,
      error: null,
      openErrorSnapBack: false,
      errorMessage: ''
    };
  }

  async componentDidMount() {
    injectCSS();
    let details = this.props.loggedInUser.details;
    if (this.props.formReOpened) {
      const loggedInUser = await checkUserLogginStatus();
      details = loggedInUser.user.details;
    }
    this.setState({
      firstname: details?.firstname || '',
      lastname: details?.lastname || '',
      age: details?.age || '',
      gender: details?.gender || '',
      address: details?.address || '',
      dateOfBirth: details?.dateOfBirth ? details.dateOfBirth : '',
    }, () => {
      this.checkFormValidity(true);
    });
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: !value ? '' : value, saved: false }, this.checkFormValidity);
  };

  checkFormValidity = (initialCheck = false) => {
    const { firstname, lastname, age, gender, address, dateOfBirth } = this.state;
    const isFormValid = firstname.trim() && lastname.trim() && age && gender && address && dateOfBirth;
    if (!initialCheck) {
      this.setState({ isFormValid });
    } else {
      if (isFormValid) {
        this.setState({ isFormValid: isFormValid, saved: true });
      } else {
        this.setState({ isFormValid });
      }
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const updateObject = this.state;
    delete updateObject.isFormValid;
    delete updateObject.saving;
    delete updateObject.error;
    if (!updateObject.age) updateObject.age = null;
    if (!updateObject.gender) updateObject.gender = null;
    if (!updateObject.dateOfBirth) updateObject.dateOfBirth = null;
    if (!updateObject.firstname) updateObject.firstname = null;
    if (!updateObject.lastname) updateObject.lastname = null;
    if (!updateObject.address) updateObject.address = null;
    this.setState({ saving: true });
    const updatedUser = await updateUserAccount({ details: updateObject }, this.props.loggedInUser.id);
    if (updatedUser.hasOwnProperty('error')) {
      this.setState({ error: 'Something went wrong, please try again.', saving: false });
      return;
    }
    this.checkFormValidity();
    this.setState({ saving: false, saved: true });
  }

  handleOpenErrorSnapBack = () => {
    this.setState({ openErrorSnapBack: false });
  }

  handleNextButton = () => {
    const { isFormValid, saved } = this.state;
    if (!isFormValid) {
      this.setState({ openErrorSnapBack: true, errorMessage: 'Please fill all fields and save before proceeding.' });
      return;
    }
    if (!saved) {
      this.setState({ openErrorSnapBack: true, errorMessage: 'Please save the form before proceeding.' });
      return;
    }
    this.props.handleOpenUpdateClientDetailsForm();
    updateUserAccount({ basicDetailsUpdated: true }, this.props.loggedInUser.id);
  }

  render() {
    const { firstname, lastname, age, gender, saved, address, dateOfBirth } = this.state;

    const isPersonal = this.props.loanCategory === "personal";

    return (
      <Slide in={true} direction="left">
        <div className="vf-page" style={{ paddingTop: 0 }}>
          {this.state.openErrorSnapBack && (
            <WarningSnapBack
              handleOpenErrorSnapBack={this.handleOpenErrorSnapBack}
              errorMessage={this.state.errorMessage}
            />
          )}

          <div className="vf-page-inner" style={{ maxWidth: 640 }}>
            <div className="vf-card">
              {/* Header */}
              <div className="vf-card-header">
                <h2 className="vf-card-title">
                  {!isPersonal ? "Basic Details" : "Your Basic Details"}
                </h2>
                {!isPersonal && (
                  <p className="vf-card-subtitle">Owner · Representative · Board Member</p>
                )}
              </div>

              <div className="vf-card-body">
                {/* Name row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div className="vf-field">
                    <label className="vf-label">First Name</label>
                    <input
                      className="vf-input"
                      name="firstname"
                      type="text"
                      autoComplete="off"
                      value={firstname}
                      onChange={this.handleInputChange}
                      placeholder="John"
                    />
                  </div>
                  <div className="vf-field">
                    <label className="vf-label">Last Name</label>
                    <input
                      className="vf-input"
                      name="lastname"
                      type="text"
                      autoComplete="off"
                      value={lastname}
                      onChange={this.handleInputChange}
                      placeholder="Banda"
                    />
                  </div>
                </div>

                {/* Age + Gender row */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div className="vf-field">
                    <label className="vf-label">Age</label>
                    <input
                      className="vf-input"
                      type="number"
                      name="age"
                      value={age}
                      autoComplete="off"
                      onChange={this.handleInputChange}
                      placeholder="25"
                    />
                  </div>
                  <div className="vf-field">
                    <label className="vf-label">Gender</label>
                    <div style={{ position: 'relative' }}>
                      <select
                        className="vf-select"
                        name="gender"
                        value={gender}
                        autoComplete="off"
                        onChange={this.handleInputChange}
                      >
                        <option value="">Select…</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                      <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'rgba(16,185,129,0.7)', fontSize: 10 }}>▼</span>
                    </div>
                  </div>
                </div>

                <div className="vf-field">
                  <label className="vf-label">Residential Address</label>
                  <span className="vf-sublabel">House No. · Area · City · Province</span>
                  <input
                    className="vf-input"
                    name="address"
                    type="text"
                    autoComplete="off"
                    value={address}
                    onChange={this.handleInputChange}
                    placeholder="123 Kaunda Square, Lusaka, Lusaka Province"
                  />
                </div>

                <div className="vf-field">
                  <label className="vf-label">Date of Birth</label>
                  <input
                    className="vf-input"
                    type="date"
                    name="dateOfBirth"
                    defaultValue={dateOfBirth}
                    onChange={this.handleInputChange}
                  />
                </div>

                {/* Summary strip */}
                {saved && (
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '11px 14px', borderRadius: 10,
                    background: 'rgba(16,185,129,0.09)',
                    border: '1px solid rgba(16,185,129,0.22)',
                    marginBottom: 16, animation: 'vfFadeIn 0.3s ease',
                  }}>
                    <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(16,185,129,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 900, color: '#34D399', flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: 13, color: '#6EE7B7', fontWeight: 500 }}>Details saved successfully</span>
                  </div>
                )}

                {this.state.error && (
                  <div className="vf-alert" style={{ background: 'rgba(220,38,38,0.09)', border: '1px solid rgba(220,38,38,0.25)', color: '#FCA5A5', marginBottom: 12 }}>
                    <span className="vf-alert-icon" style={{ background: 'rgba(220,38,38,0.18)', color: '#FCA5A5' }}>✕</span>
                    <span>{this.state.error}</span>
                  </div>
                )}

                {/* Action buttons */}
                <div className="vf-btn-row">
                  <button
                    type="button"
                    className="vf-btn vf-btn-primary"
                    disabled={this.state.saving}
                    onClick={this.handleSubmit}
                    style={{ flex: this.props.formDisplay === "profile" ? 1 : undefined }}
                  >
                    {this.state.saving ? (
                      <><SpinnerIcon /> Saving…</>
                    ) : saved ? '✓ Saved' : 'Save Details'}
                  </button>

                  {this.props.formDisplay !== "profile" && (
                    <button
                      type="button"
                      className="vf-btn vf-btn-danger"
                      onClick={this.handleNextButton}
                    >
                      Next →
                    </button>
                  )}
                </div>

                <p style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.25)', marginTop: 18, lineHeight: 1.6 }}>
                  All information is kept strictly confidential and used solely for verification and loan eligibility purposes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Slide>
    );
  }
}

function SpinnerIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ animation: 'spin 0.8s linear infinite' }}>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}