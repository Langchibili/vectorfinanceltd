"use client";

import { api_url, getJwt } from "@/Constants";
import { checkClientIdStatus, getImage, updateUserAccount } from "@/Functions";
import React from "react";
import Uploader from "../Includes/Uploader/Uploader";
import { Slide } from "@material-ui/core";
import WarningSnapBack from "../Includes/SnapBacks/WarningSnapBack";
import { FORM_CSS } from "./FormTheme";

let _cssInjected = false;
function injectCSS() {
  if (typeof document === "undefined" || _cssInjected) return;
  _cssInjected = true;
  const tag = document.createElement("style");
  tag.setAttribute("data-vf-forms", "1");
  tag.textContent = FORM_CSS;
  document.head.appendChild(tag);
}

export default class UpdateClientDetailsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employementStatus: this.props.loanCategory !== "personal" ? 'self-employed' : '',
      idType: '',
      idNumber: '',
      IDfront: null,
      IDback: null,
      isFormValid: false,
      saving: false,
      clientDetailsId: null,
      saved: false,
      error: null,
      openErrorSnapBack: false,
      errorMessage: '',
      clientId: null,
      hasLoan: this.props.loggedInUser.loans && this.props.loggedInUser.loans.length > 0
    };
  }

  getClientDetails = async () => {
    return await fetch(api_url + '/users/me?populate=clientDetails.IDfront,clientDetails.IDback,', {
      headers: { 'Authorization': `Bearer ${getJwt()}`, 'Content-Type': 'application/json' }
    }).then(r => r.json()).then(d => d);
  }

  async componentDidMount() {
    injectCSS();
    if (this.props.constants.loansInformation.allowSalaryLoans === "no") {
      this.setState({ employementStatus: "self-employed" });
    }
    let { clientDetails } = this.props.loggedInUser;
    if (!clientDetails) {
      const updatedUser = await updateUserAccount({ clientDetails: { employementStatus: null, idType: null, IDfront: null, IDback: null } }, this.props.loggedInUser.id);
      if (updatedUser.hasOwnProperty('error')) return;
    }
    const user = await this.getClientDetails();
    clientDetails = user.clientDetails;
    this.setState({
      idNumber: clientDetails?.idNumber || '',
      employementStatus: clientDetails?.employementStatus || '',
      idType: clientDetails?.idType || '',
      IDfront: clientDetails?.IDfront || '',
      IDback: clientDetails?.IDback || '',
      clientDetailsId: clientDetails?.id || null
    }, () => { this.checkFormValidity(true); });
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: !value ? '' : value, saved: false }, this.checkFormValidity);
  }

  checkFormValidity = (initialCheck = false) => {
    const { employementStatus, idNumber, idType, IDfront, IDback } = this.state;
    const isFormValid = idNumber.trim() && employementStatus.trim() && idType.trim() && IDfront && IDback;
    if (!initialCheck) {
      this.setState({ isFormValid });
    } else {
      if (isFormValid) { this.setState({ isFormValid, saved: true }); }
      else { this.setState({ isFormValid }); }
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { employementStatus, idType, clientDetailsId, idNumber, IDfront, IDback } = this.state;
    if (!employementStatus || !idType) {
      this.setState({ errorMessage: 'Please ensure all fields are filled.', openErrorSnapBack: true, saving: false });
      return;
    }
    const clientIdStatus = await checkClientIdStatus(idNumber, this.props.loggedInUser.id);
    if (clientIdStatus === 'id-taken') {
      this.setState({ errorMessage: 'Someone is already using this ' + idType, openErrorSnapBack: true });
      return;
    }
    const updateObject = this.state;
    delete updateObject.isFormValid;
    delete updateObject.saving;
    delete updateObject.error;
    delete updateObject.IDfront;
    delete updateObject.IDback;
    delete updateObject.clientDetailsId;
    if (!updateObject.employementStatus) updateObject.employementStatus = null;
    if (!updateObject.idType) updateObject.idType = null;
    this.setState({ saving: true, IDfront, IDback, clientDetailsId });
    updateObject.id = clientDetailsId;
    const updatedUser = await updateUserAccount({ clientDetails: updateObject }, this.props.loggedInUser.id);
    if (updatedUser.hasOwnProperty('error')) {
      this.setState({ error: 'Something went wrong, try again.', saving: false, IDfront, IDback, clientDetailsId });
      return;
    }
    this.setState({ saving: false, IDfront, IDback, clientDetailsId, saved: true }, () => {
      this.checkFormValidity();
    });
  }

  addIDfront = (files) => {
    this.setState({ IDfront: this.state.IDfront ? [...this.state.IDfront, ...files] : files, saving: false, error: null }, this.checkFormValidity);
  }
  addIDback = (files) => {
    this.setState({ IDback: this.state.IDback ? [...this.state.IDback, ...files] : files, saving: false, error: null }, this.checkFormValidity);
  }

  handleRemoveImage = async (uploadid, filesArr, arrName) => {
    const removed = await fetch(api_url + '/upload/files/' + uploadid, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${getJwt()}`, 'Content-Type': 'application/json' }
    }).then(r => r.json()).then(d => d).catch(e => console.error(e));
    if (removed) {
      const newArray = filesArr.filter(f => f.id !== uploadid);
      this.setState({ [arrName]: newArray.length < 1 ? null : newArray }, this.checkFormValidity);
      if (typeof document !== 'undefined') {
        document.getElementById("#" + uploadid).style.display = "none";
      }
    }
  }

  renderFiles = (files, arrName) => {
    if (!files) return <></>;
    return files.map((file) => {
      if (file.hasOwnProperty("attributes")) { file.attributes.id = file.id; file = file.attributes; }
      if (file.mime.startsWith('image/')) {
        return (
          <div id={"#" + file.id} key={file.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', marginTop: 8 }}>
            <img style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8 }} src={getImage(file, "thumbnail")} alt={file.name} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.7)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</p>
            </div>
            <button className="vf-btn vf-btn-danger" style={{ padding: '6px 12px', fontSize: 12, borderRadius: 8, minWidth: 'auto', flex: 'none' }} onClick={() => { this.handleRemoveImage(file.id, files, arrName); }}>Remove</button>
          </div>
        );
      }
      return (
        <div id={"#" + file.id} key={file.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', marginTop: 8 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(16,185,129,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>📄</div>
          <p style={{ flex: 1, margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.7)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</p>
          <button className="vf-btn vf-btn-danger" style={{ padding: '6px 12px', fontSize: 12, borderRadius: 8, minWidth: 'auto', flex: 'none' }} onClick={() => { this.handleRemoveImage(file.id, files, arrName); }}>Remove</button>
        </div>
      );
    });
  }

  handleOpenErrorSnapBack = () => { this.setState({ openErrorSnapBack: false }); }

  handleNextButton = () => {
    const { isFormValid, saved } = this.state;
    if (!isFormValid) { this.setState({ openErrorSnapBack: true, errorMessage: 'Please fill all fields and save before proceeding.' }); return; }
    if (!saved) { this.setState({ openErrorSnapBack: true, errorMessage: 'Please save the form before proceeding.' }); return; }
    this.props.handleOpenAddLoanAmountForm();
    updateUserAccount({ identityDetailsUpdated: true }, this.props.loggedInUser.id);
  }

  render() {
    const { employementStatus, idType, hasLoan, saved } = this.state;
    const isPersonal = this.props.loanCategory === "personal";
    const isInvestment = this.props.purpose === "investment";
    const allowSalary = !(this.props.constants.loansInformation.allowSalaryLoans === "no");

    const lockedStyle = hasLoan ? { opacity: 0.45, pointerEvents: 'none', filter: 'grayscale(0.3)' } : {};

    return (
      <Slide in={true} direction="left">
        <div className="vf-page" style={{ paddingTop: 0 }}>
          {this.state.openErrorSnapBack && (
            <WarningSnapBack handleOpenErrorSnapBack={this.handleOpenErrorSnapBack} errorMessage={this.state.errorMessage} />
          )}

          <div className="vf-page-inner" style={{ maxWidth: 640 }}>
            <div className="vf-card">
              <div className="vf-card-header">
                <h2 className="vf-card-title">
                  {isInvestment ? "Identity Details" : isPersonal ? "Employment & Identity" : "Identity Details"}
                </h2>
                {!isPersonal && !isInvestment && (
                  <p className="vf-card-subtitle">Owner · Representative · Board Member</p>
                )}
              </div>

              <div className="vf-card-body">
                {/* Employment status — only for personal loans, not investment */}
                {!isInvestment && isPersonal && (
                  <div className="vf-field">
                    <label className="vf-label">Employment Status</label>
                    <div style={{ position: 'relative' }}>
                      <select
                        className="vf-select"
                        name="employementStatus"
                        value={employementStatus}
                        disabled={!this.state.clientDetailsId}
                        autoComplete="off"
                        onChange={this.handleInputChange}
                      >
                        <option value="">Select status…</option>
                        {allowSalary && <option value="employed">Employed</option>}
                        <option value="self-employed">Self-Employed</option>
                        <option value="unemployed">Unemployed</option>
                      </select>
                      <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'rgba(16,185,129,0.7)', fontSize: 10 }}>▼</span>
                    </div>
                  </div>
                )}

                <hr className="vf-divider" />

                {/* ID Type */}
                <div className="vf-field">
                  <label className="vf-label">ID Type</label>
                  <div style={{ position: 'relative' }}>
                    <select
                      className="vf-select"
                      name="idType"
                      value={idType}
                      disabled={!this.state.clientDetailsId || hasLoan}
                      autoComplete="off"
                      onChange={this.handleInputChange}
                    >
                      <option value="">Select ID type…</option>
                      <option value="nrc">NRC</option>
                      <option value="passport">Passport</option>
                      <option value="driving-license">Driving Licence</option>
                    </select>
                    <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'rgba(16,185,129,0.7)', fontSize: 10 }}>▼</span>
                  </div>
                </div>

                {/* ID Number */}
                {idType && (
                  <div className="vf-field" style={{ animation: 'vfFadeIn 0.3s ease' }}>
                    <label className="vf-label">ID Number</label>
                    <input
                      className="vf-input"
                      type="text"
                      name="idNumber"
                      autoComplete="off"
                      disabled={hasLoan}
                      value={this.state.idNumber}
                      onChange={this.handleInputChange}
                      placeholder="Enter your ID number"
                    />
                  </div>
                )}

                {/* Lock notice */}
                {hasLoan && (
                  <div className="vf-alert" style={{ background: 'rgba(245,158,11,0.09)', border: '1px solid rgba(245,158,11,0.25)', color: '#FCD34D', marginBottom: 12 }}>
                    <span className="vf-alert-icon" style={{ background: 'rgba(245,158,11,0.18)', color: '#FCD34D' }}>!</span>
                    <span>Identity details cannot be changed once a loan is active. Contact us from the Help page to request updates.</span>
                  </div>
                )}

                {/* ID Documents */}
                {this.state.clientDetailsId && (
                  <div style={lockedStyle}>
                    <hr className="vf-divider" />

                    <div className="vf-section-title">
                      <span className="vf-section-title-bar" />
                      <h5>ID Documents</h5>
                    </div>
                    <span className="vf-sublabel" style={{ marginBottom: 16, display: 'block' }}>NRC · Passport · Driving Licence</span>

                    <div>
                      <label className="vf-label" style={{ marginBottom: 10 }}>Front Side</label>
                      <Uploader addFiles={this.addIDfront} displayType="circular" refId={this.state.clientDetailsId} refName="user-profile.client-details" fieldName="IDfront" allowMultiple={false} allowedTypes={['image/*', 'application/pdf']} />
                      {this.renderFiles(this.state.IDfront, "IDfront")}
                    </div>
                    <div>
                      <label className="vf-label" style={{ marginBottom: 10 }}>Back Side</label>
                      <Uploader addFiles={this.addIDback} displayType="circular" refId={this.state.clientDetailsId} refName="user-profile.client-details" fieldName="IDback" allowMultiple={false} allowedTypes={['image/*', 'application/pdf']} />
                      {this.renderFiles(this.state.IDback, "IDback")}
                    </div>
                  </div>
                )}

                {/* Saved confirmation */}
                {saved && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 14px', borderRadius: 10, background: 'rgba(16,185,129,0.09)', border: '1px solid rgba(16,185,129,0.22)', marginTop: 16, marginBottom: 8, animation: 'vfFadeIn 0.3s ease' }}>
                    <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(16,185,129,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 900, color: '#34D399', flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: 13, color: '#6EE7B7', fontWeight: 500 }}>Identity details saved</span>
                  </div>
                )}

                {this.state.error && (
                  <div className="vf-alert" style={{ background: 'rgba(220,38,38,0.09)', border: '1px solid rgba(220,38,38,0.25)', color: '#FCA5A5', marginTop: 12 }}>
                    <span className="vf-alert-icon" style={{ background: 'rgba(220,38,38,0.18)', color: '#FCA5A5' }}>✕</span>
                    <span>{this.state.error}</span>
                  </div>
                )}

                {/* Action buttons */}
                <div className="vf-btn-row">
                  <button type="button" className="vf-btn vf-btn-primary" disabled={this.state.saving} onClick={this.handleSubmit}>
                    {this.state.saving ? <><SpinnerIcon /> Saving…</> : saved ? '✓ Saved' : 'Save Details'}
                  </button>

                  {this.props.formDisplay !== "profile" && (
                    <>
                      <button type="button" className="vf-btn vf-btn-outline" onClick={() => { this.props.handleOpenUpdateDetailsForm(); this.props.handleFormReopen(); }}>
                        ← Previous
                      </button>
                      <button type="button" className="vf-btn vf-btn-danger" onClick={this.handleNextButton}>
                        Next →
                      </button>
                    </>
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
      <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  );
}