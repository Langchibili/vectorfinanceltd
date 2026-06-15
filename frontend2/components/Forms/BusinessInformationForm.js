"use client";

import { updateUserAccount } from "@/Functions";
import React from "react";
import Uploader from "../Includes/Uploader/Uploader";
import { api_url, getJwt } from "@/Constants";
import { Slide } from "@material-ui/core";
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

export default class BusinessInformationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businessName: '', businessType: '', ownershipType: '', registrationStatus: '',
      companyRegistrationNumber: '', yearsInBusiness: '', annualRevenue: '',
      shareholderStatus: '', percentageOwnership: '', netProfit: '', currentBusinessDebt: '',
      existingLoanDetails: '', pacraPrintOut: null, businessId: null,
      isFormValid: false, saved: false, error: null,
    };
  }

  getBusinessDetails = async () => {
    return await fetch(api_url + '/users/me?populate=business.pacraPrintOut', {
      headers: { 'Authorization': `Bearer ${getJwt()}`, 'Content-Type': 'application/json' }
    }).then(r => r.json()).then(d => d);
  }

  async componentDidMount() {
    injectCSS();
    let { business } = this.props.loggedInUser;
    if (!business) {
      const updatedUser = await updateUserAccount({ business: { businessName: null, businessType: null, pacraPrintOut: null } }, this.props.loggedInUser.id);
      if (updatedUser.hasOwnProperty('error')) return;
    }
    const user = await this.getBusinessDetails();
    business = user.business;
    this.setState({
      businessName: business?.businessName || '', businessType: business?.businessType || '',
      ownershipType: business?.ownershipType || '', registrationStatus: business?.isBusinessRegistered || '',
      companyRegistrationNumber: business?.companyRegistrationNumber || '', yearsInBusiness: business?.yearsInBusiness || '',
      annualRevenue: business?.annualRevenue || '', shareholderStatus: business?.isClientAShareHolder || '',
      percentageOwnership: business?.percentageOfOwnership || '', netProfit: business?.netProfit || '',
      currentBusinessDebt: business?.businessHasDebt || '', existingLoanDetails: business?.existingLoanDetails || '',
      pacraPrintOut: business?.pacraPrintOut || '', businessId: business?.id || null
    }, () => { this.checkFormValidity(true); });
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: !value ? '' : value, saved: false }, this.checkFormValidity);
  };

  checkFormValidity = (initialCheck = false) => {
    let { companyRegistrationNumber, percentageOwnership, existingLoanDetails, pacraPrintOut } = this.state;
    if (this.state.shareholderStatus === "no") percentageOwnership = 'none';
    if (this.state.registrationStatus === "no") { pacraPrintOut = "none"; companyRegistrationNumber = 'none'; }
    if (this.state.currentBusinessDebt === "no") existingLoanDetails = 'none';
    const { businessName, businessType, ownershipType, registrationStatus, yearsInBusiness, annualRevenue, shareholderStatus, netProfit, currentBusinessDebt } = this.state;
    const isFormValid = businessName && businessType && ownershipType && registrationStatus && companyRegistrationNumber && yearsInBusiness && annualRevenue && shareholderStatus && percentageOwnership && netProfit && existingLoanDetails && currentBusinessDebt && pacraPrintOut;
    if (!initialCheck) { this.setState({ isFormValid }); }
    else { this.setState({ isFormValid, saved: isFormValid ? true : this.state.saved }); }
  }

  handleSubmit = async (e) => {
    const { shareholderStatus, registrationStatus, pacraPrintOut, businessId } = this.state;
    const updateObject = { ...this.state };
    updateObject.isBusinessRegistered = this.state.registrationStatus;
    updateObject.isClientAShareHolder = this.state.shareholderStatus;
    updateObject.percentageOfOwnership = this.state.percentageOwnership;
    updateObject.businessHasDebt = this.state.currentBusinessDebt;
    e.preventDefault();
    delete updateObject.isFormValid; delete updateObject.error; delete updateObject.registrationStatus;
    delete updateObject.shareholderStatus; delete updateObject.percentageOwnership;
    delete updateObject.currentBusinessDebt; delete updateObject.businessId; delete updateObject.pacraPrintOut;
    const nullFields = ['businessName', 'businessType', 'ownershipType', 'isBusinessRegistered', 'isClientAShareHolder', 'yearsInBusiness', 'percentageOfOwnership', 'companyRegistrationNumber', 'businessHasDebt', 'annualRevenue', 'netProfit'];
    nullFields.forEach(k => { if (!updateObject[k]) updateObject[k] = null; });
    this.setState({ saving: true, pacraPrintOut, businessId, shareholderStatus, registrationStatus });
    updateObject.id = businessId;
    const updatedUser = await updateUserAccount({ business: updateObject }, this.props.loggedInUser.id);
    if (updatedUser.hasOwnProperty('error')) {
      this.setState({ error: 'Something went wrong, try again.', saving: false, pacraPrintOut, businessId, shareholderStatus, registrationStatus });
      return;
    }
    this.setState({ pacraPrintOut, businessId, saved: true, saving: false }, async () => {
      const { business } = await this.getBusinessDetails();
      this.setState({
        businessName: business?.businessName || '', businessType: business?.businessType || '',
        ownershipType: business?.ownershipType || '', registrationStatus: business?.isBusinessRegistered || '',
        companyRegistrationNumber: business?.companyRegistrationNumber || '', yearsInBusiness: business?.yearsInBusiness || '',
        annualRevenue: business?.annualRevenue || '', shareholderStatus: business?.isClientAShareHolder || '',
        percentageOwnership: business?.percentageOfOwnership || '', netProfit: business?.netProfit || '',
        currentBusinessDebt: business?.businessHasDebt || '', existingLoanDetails: business?.existingLoanDetails || '',
        pacraPrintOut, businessId: business?.id || null
      }, this.checkFormValidity);
    });
  }

  addPacraPrintOut = (files) => {
    this.setState({ pacraPrintOut: this.state.pacraPrintOut ? [...this.state.pacraPrintOut, ...files] : files, saving: false, error: null }, this.checkFormValidity);
  }

  handleRemoveImage = async (uploadid, filesArr, arrName) => {
    const removed = await fetch(api_url + '/upload/files/' + uploadid, {
      method: 'DELETE', headers: { 'Authorization': `Bearer ${getJwt()}`, 'Content-Type': 'application/json' }
    }).then(r => r.json()).then(d => d).catch(e => console.error(e));
    if (removed) {
      const newArray = filesArr.filter(f => f.id !== uploadid);
      this.setState({ [arrName]: newArray.length < 1 ? null : newArray }, this.checkFormValidity);
      if (typeof document !== 'undefined') document.getElementById("#" + uploadid).style.display = "none";
    }
  }

  renderFiles = (files, arrName) => {
    if (!files) return <></>;
    return files.map((file) => {
      if (file.hasOwnProperty("attributes")) { file.attributes.id = file.id; file = file.attributes; }
      return (
        <div id={"#" + file.id} key={file.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px', borderRadius: 10, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', marginTop: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(16,185,129,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>📄</div>
          <p style={{ flex: 1, margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.7)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</p>
          <button className="vf-btn vf-btn-danger" style={{ padding: '6px 12px', fontSize: 12, borderRadius: 8, flex: 'none' }} onClick={() => { this.handleRemoveImage(file.id, files, arrName); }}>Remove</button>
        </div>
      );
    });
  }

  renderSelect = (name, value, label, options, sublabel) => (
    <div className="vf-field">
      <label className="vf-label">{label}</label>
      {sublabel && <span className="vf-sublabel">{sublabel}</span>}
      <div style={{ position: 'relative' }}>
        <select className="vf-select" name={name} value={value} onChange={this.handleInputChange}>
          <option value="">Select…</option>
          {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'rgba(16,185,129,0.7)', fontSize: 10 }}>▼</span>
      </div>
    </div>
  )

  render() {
    const { businessName, businessType, ownershipType, registrationStatus, companyRegistrationNumber, yearsInBusiness, annualRevenue, shareholderStatus, percentageOwnership, netProfit, currentBusinessDebt, existingLoanDetails, isFormValid, saved } = this.state;

    return (
      <Slide in={true} direction="left">
        <div className="vf-page" style={{ paddingTop: 0 }}>
          <div className="vf-page-inner" style={{ maxWidth: 640 }}>
            <div className="vf-card">
              <div className="vf-card-header">
                <h2 className="vf-card-title">Business Information</h2>
                <p className="vf-card-subtitle">Tell us about your business or company</p>
              </div>

              <div className="vf-card-body">
                {/* Business name */}
                <div className="vf-field">
                  <label className="vf-label">Business Name</label>
                  <input className="vf-input" type="text" name="businessName" value={businessName} autoComplete="off" onChange={this.handleInputChange} placeholder="e.g. Banda Enterprises Ltd" />
                </div>

                {this.renderSelect('businessType', businessType, 'Business Type', [
                  { value: 'sole-proprietorship', label: 'Sole Trader' },
                  { value: 'partnership', label: 'Partnership' },
                  { value: 'limited-company', label: 'Limited Company (LLC)' },
                  { value: 'corporation', label: 'Corporation' },
                  { value: 'non-profit', label: 'Non-Profit' },
                ])}

                {this.renderSelect('ownershipType', ownershipType, 'Ownership Role', [
                  { value: 'sole-owner', label: 'Sole Owner' },
                  { value: 'co-owner', label: 'Co-Owner' },
                  { value: 'neither', label: 'Neither' },
                ])}

                {this.renderSelect('registrationStatus', registrationStatus, 'Is the business officially registered?', [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' },
                ])}

                {/* Conditional registration fields */}
                {registrationStatus === 'yes' && (
                  <div style={{ animation: 'vfFadeIn 0.3s ease' }}>
                    <div className="vf-field">
                      <label className="vf-label">Company Registration Number</label>
                      <input className="vf-input" type="text" name="companyRegistrationNumber" value={companyRegistrationNumber} autoComplete="off" onChange={this.handleInputChange} placeholder="e.g. 120034567" />
                    </div>

                    {this.state.businessId && (
                      <div className="vf-field">
                        <div className="vf-section-title" style={{ marginBottom: 10 }}>
                          <span className="vf-section-title-bar" />
                          <h5>PACRA / Certificate of Incorporation</h5>
                        </div>
                        <span className="vf-sublabel" style={{ marginBottom: 10, display: 'block' }}>Can be up to 1 year old · PDF or Word document</span>
                        <Uploader addFiles={this.addPacraPrintOut} displayType="circular" refId={this.state.businessId} refName="client-details.business" fieldName="pacraPrintOut" allowMultiple={false} allowedTypes={['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']} />
                        {this.renderFiles(this.state.pacraPrintOut, "pacraPrintOut")}
                      </div>
                    )}
                  </div>
                )}

                <hr className="vf-divider" />

                {/* Financials */}
                <div className="vf-section-title">
                  <span className="vf-section-title-bar" />
                  <h5>Financial Details</h5>
                </div>

                <div className="vf-field">
                  <label className="vf-label">Years in Business</label>
                  <input className="vf-input" type="number" name="yearsInBusiness" value={yearsInBusiness} autoComplete="off" onChange={this.handleInputChange} placeholder="e.g. 5" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div className="vf-field">
                    <label className="vf-label">Annual Revenue</label>
                    <div className="vf-input-group">
                      <span className="vf-input-prefix">K</span>
                      <input type="number" name="annualRevenue" value={annualRevenue} autoComplete="off" onChange={this.handleInputChange} className="vf-input" style={{ borderRadius: '0 10px 10px 0', borderLeft: 'none' }} placeholder="0.00" />
                    </div>
                  </div>
                  <div className="vf-field">
                    <label className="vf-label">Net Profit (Last FY)</label>
                    <div className="vf-input-group">
                      <span className="vf-input-prefix">K</span>
                      <input type="number" name="netProfit" value={netProfit} autoComplete="off" onChange={this.handleInputChange} className="vf-input" style={{ borderRadius: '0 10px 10px 0', borderLeft: 'none' }} placeholder="0.00" />
                    </div>
                  </div>
                </div>

                {this.renderSelect('shareholderStatus', shareholderStatus, 'Are you a shareholder?', [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' },
                ])}

                {shareholderStatus === 'yes' && (
                  <div className="vf-field" style={{ animation: 'vfFadeIn 0.3s ease' }}>
                    <label className="vf-label">Ownership Percentage</label>
                    <div className="vf-input-group">
                      <input type="number" name="percentageOwnership" value={parseFloat(percentageOwnership) || ''} autoComplete="off" onChange={this.handleInputChange} className="vf-input" style={{ borderRadius: '10px 0 0 10px', borderRight: 'none' }} placeholder="e.g. 25" />
                      <span className="vf-input-suffix">%</span>
                    </div>
                  </div>
                )}

                {this.renderSelect('currentBusinessDebt', currentBusinessDebt, 'Does the business have existing debt?', [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' },
                ])}

                {currentBusinessDebt === 'yes' && (
                  <div className="vf-field" style={{ animation: 'vfFadeIn 0.3s ease' }}>
                    <label className="vf-label">Existing Loan Details</label>
                    <textarea className="vf-textarea" name="existingLoanDetails" value={existingLoanDetails} autoComplete="off" onChange={this.handleInputChange} rows={4} placeholder="Describe current loans, lenders, and outstanding amounts…" />
                  </div>
                )}

                {/* Saved */}
                {saved && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 14px', borderRadius: 10, background: 'rgba(16,185,129,0.09)', border: '1px solid rgba(16,185,129,0.22)', marginBottom: 12, animation: 'vfFadeIn 0.3s ease' }}>
                    <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(16,185,129,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 900, color: '#34D399', flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: 13, color: '#6EE7B7', fontWeight: 500 }}>Business details saved</span>
                  </div>
                )}

                {this.state.error && (
                  <div className="vf-alert" style={{ background: 'rgba(220,38,38,0.09)', border: '1px solid rgba(220,38,38,0.25)', color: '#FCA5A5', marginBottom: 12 }}>
                    <span className="vf-alert-icon" style={{ background: 'rgba(220,38,38,0.18)', color: '#FCA5A5' }}>✕</span>
                    <span>{this.state.error}</span>
                  </div>
                )}

                <div className="vf-btn-row">
                  <button type="button" className="vf-btn vf-btn-primary" disabled={this.state.saving} onClick={this.handleSubmit}>
                    {this.state.saving ? <><SpinnerIcon /> Saving…</> : saved ? '✓ Saved' : 'Save Details'}
                  </button>

                  {this.props.formDisplay !== "profile" && (
                    <>
                      <button type="button" className="vf-btn vf-btn-outline" onClick={() => { this.props.handleOpenAddLoanAmountForm(); this.props.handleFormReopen(); }}>
                        ← Previous
                      </button>
                      <button type="button" className="vf-btn vf-btn-danger" disabled={!isFormValid || !saved} onClick={() => { this.props.handleCreateBlankLoan(); }}>
                        Submit →
                      </button>
                    </>
                  )}
                </div>

                <p style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.25)', marginTop: 18, lineHeight: 1.6 }}>
                  All information is strictly confidential and used for eligibility assessment only.
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