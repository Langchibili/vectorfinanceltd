// // "use client";

// // import { calculateLoan } from "@/Functions";
// // import { Slide } from "@material-ui/core";
// // import React from "react";
// // import { FORM_CSS } from "./FormTheme";

// // let _cssInjected = false;
// // function injectCSS() {
// //   if (typeof document === "undefined" || _cssInjected) return;
// //   _cssInjected = true;
// //   const tag = document.createElement("style");
// //   tag.setAttribute("data-vf-forms", "1");
// //   tag.textContent = FORM_CSS;
// //   document.head.appendChild(tag);
// // }

// // function fmt(n) {
// //   if (!n) return "0.00";
// //   return parseFloat(n).toLocaleString("en-ZM", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
// // }

// // export default class AddLoanAmountForm extends React.Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       loanAmount: '',
// //       totalPayment: 0,
// //       onPayroll: this.props.loanCategory === "personal" ? '' : 'no',
// //       salaryDeduction: this.props.loanCategory === "personal" ? '' : 'no',
// //       loanCategory: '',
// //       loanType: '',
// //       loanPurpose: '',
// //       loanPurposeDetails: '',
// //       loanTerm: this.props.constants.loansInformation.defaultCollaterallLoanTerm,
// //       interestRate: this.props.constants.loansInformation.defaultCollaterallLoanInterestRate,
// //       maxLoanTerm: this.props.constants.loansInformation.defaultCollaterallLoanTerm,
// //       isFormValid: false,
// //       stateSaved: false,
// //       monthlyPayment: 0,
// //       totalInterest: 0,
// //       approvedLoanAmount: 0,
// //       error: null,
// //       salary: '',
// //       salaryPercentage: 0,
// //       isProceed: false,
// //       collateralType: '',
// //       collateralValue: ''
// //     };
// //   }

// //   componentDidMount() {
// //     injectCSS();
// //     const fields = ['onPayroll', 'salaryDeduction', 'loanPurpose', 'loanAmount', 'salary', 'loanTerm', 'collateralType', 'collateralValue'];
// //     const newState = {};
// //     fields.forEach(key => {
// //       const value = localStorage.getItem(`vectorFin_${key}`);
// //       if (value !== null) {
// //         newState[key] = ['loanAmount', 'salary', 'loanTerm', 'collateralValue'].includes(key) ? parseFloat(value) : value;
// //       }
// //     });
// //     if (this.props.constants.loansInformation.allowSalaryLoans === "no") {
// //       newState.onPayroll = 'no';
// //       newState.salaryDeduction = 'no';
// //     }
// //     if (this.props.loanCategory !== 'personal') {
// //       newState.onPayroll = 'no';
// //       newState.salaryDeduction = 'no';
// //     }
// //     this.setState(newState, this.checkFormValidity);
// //   }

// //   handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     this.setState({ [name]: value }, () => {
// //       this.checkFormValidity();
// //       if (name !== 'loanPurposeDetails') {
// //         localStorage.setItem(`vectorFin_${name}`, value);
// //       }
// //     });
// //   }

// //   checkFormValidity = () => {
// //     let { loanAmount, onPayroll, loanType, interestRate, salaryDeduction, loanPurpose, loanTerm, salary, maxLoanTerm, collateralValue } = this.state;
// //     let loanCategory = '';
// //     let isFormValid = false;
// //     if (onPayroll === 'yes') {
// //       if (salaryDeduction === 'yes') {
// //         loanCategory = 'salaryLoans';
// //         loanType = 'salaryBased';
// //         interestRate = this.props.constants.loansInformation.defaultSalaryLoanInterestRate;
// //         maxLoanTerm = this.props.constants.loansInformation.defaultSalaryLoanTerm;
// //       } else {
// //         loanCategory = 'assetLoans';
// //         loanType = null;
// //       }
// //       isFormValid = true;
// //     } else if (onPayroll === 'no') {
// //       loanCategory = 'assetLoans';
// //       loanType = null;
// //       isFormValid = true;
// //     }
// //     if (!loanPurpose || !loanAmount || !loanTerm || !salary) isFormValid = false;
// //     this.setState({ isFormValid, loanCategory, loanType, maxLoanTerm, interestRate }, this.calculateLoanDetails);
// //   }

// //   calculateLoanDetails = async () => {
// //     const { loanAmount, loanTerm, interestRate, onPayroll, salaryDeduction, salary } = this.state;
// //     let rate = interestRate;
// //     if (onPayroll === 'yes' && salaryDeduction === 'yes') {
// //       rate = this.props.constants.loansInformation.defaultSalaryLoanInterestRate;
// //       const { monthlyPayment, totalInterest, totalPayment } = await calculateLoan({ amount: loanAmount, termMonths: loanTerm, loanType: 'salaryBased' });
// //       const salaryPercentage = (monthlyPayment / salary) * 100;
// //       this.setState({ monthlyPayment, totalInterest, totalPayment, approvedLoanAmount: loanAmount, salaryPercentage, interestRate: rate });
// //     } else {
// //       const { monthlyPayment, totalPayment } = await calculateLoan({ amount: loanAmount, termMonths: loanTerm, loanType: 'assetBased' });
// //       const salaryPercentage = (monthlyPayment / salary) * 100;
// //       this.setState({ monthlyPayment, totalPayment, approvedLoanAmount: loanAmount, salaryPercentage, interestRate: rate });
// //     }
// //   }

// //   handleSubmit = async (e) => {
// //     e.preventDefault();
// //     delete this.state.isFormValid;
// //     delete this.state.error;
// //     delete this.state.onPayroll;
// //     delete this.state.salaryDeduction;
// //     this.props.setLoanInformation(this.state);
// //     this.setState({ isFormValid: true, stateSaved: true }, () => {
// //       this.props.handleOpenBusinessInformationForm();
// //     });
// //   }

// //   renderSalaryWarning = () => {
// //     const { salary, salaryPercentage, collateralValue, loanAmount, totalPayment, loanTerm, onPayroll, salaryDeduction } = this.state;
// //     const loanAmt = parseFloat(loanAmount);
// //     const collateralVal = parseFloat(collateralValue);
// //     const maxLoanFromCollateral = collateralVal / 2;
// //     const isSalaryLoanType = onPayroll === 'yes' && salaryDeduction === 'yes';
// //     const limit = this.props.constants.loansInformation.allowedSalaryPercentageLimit || 40;

// //     if (isSalaryLoanType) {
// //       if (salary <= 0 || parseInt(salaryPercentage) > limit) {
// //         return (
// //           <>
// //             <div className="vf-alert" style={{ background: 'rgba(245,158,11,0.09)', border: '1px solid rgba(245,158,11,0.25)', color: '#FCD34D' }}>
// //               <span className="vf-alert-icon" style={{ background: 'rgba(245,158,11,0.18)', color: '#FCD34D' }}>!</span>
// //               <span>Monthly payments exceed {limit}% of your salary. Reduce the amount or extend the repayment term.</span>
// //             </div>
// //             <div className="vf-alert" style={{ background: 'rgba(59,130,246,0.09)', border: '1px solid rgba(59,130,246,0.25)', color: '#93C5FD' }}>
// //               <span className="vf-alert-icon" style={{ background: 'rgba(59,130,246,0.18)', color: '#93C5FD' }}>i</span>
// //               <span><strong>Tip:</strong> Consider a smaller salary loan combined with a business loan if you have other income sources.</span>
// //             </div>
// //           </>
// //         );
// //       }
// //     } else {
// //       if (loanAmount && maxLoanFromCollateral > 0 && loanAmt > maxLoanFromCollateral) {
// //         return (
// //           <>
// //             <div className="vf-alert" style={{ background: 'rgba(245,158,11,0.09)', border: '1px solid rgba(245,158,11,0.25)', color: '#FCD34D' }}>
// //               <span className="vf-alert-icon" style={{ background: 'rgba(245,158,11,0.18)', color: '#FCD34D' }}>!</span>
// //               <span>You can borrow up to half your collateral's value — maximum <strong>K{fmt(maxLoanFromCollateral)}</strong>.</span>
// //             </div>
// //             <div className="vf-alert" style={{ background: 'rgba(59,130,246,0.09)', border: '1px solid rgba(59,130,246,0.25)', color: '#93C5FD' }}>
// //               <span className="vf-alert-icon" style={{ background: 'rgba(59,130,246,0.18)', color: '#93C5FD' }}>i</span>
// //               <span>You can apply for a separate loan using additional assets.</span>
// //             </div>
// //           </>
// //         );
// //       }
// //       return this.renderProceedWithLoanButton();
// //     }
// //   }

// //   renderProceedWithLoanButton = () => {
// //     const loanPurposes = this.getLoanPurposes();
// //     const { loanPurpose, loanPurposeDetails } = this.state;
// //     return (
// //       <>
// //         <hr className="vf-divider" />
// //         <div className="vf-section-title">
// //           <span className="vf-section-title-bar" />
// //           <h5>Loan Purpose</h5>
// //         </div>

// //         <div className="vf-field">
// //           <label className="vf-label">Purpose of Loan</label>
// //           <div style={{ position: 'relative' }}>
// //             <select className="vf-select" name="loanPurpose" value={loanPurpose} onChange={this.handleInputChange}>
// //               <option value="">Select purpose…</option>
// //               {loanPurposes.map((p, i) => <option key={i} value={p}>{p}</option>)}
// //             </select>
// //             <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'rgba(16,185,129,0.7)', fontSize: 10 }}>▼</span>
// //           </div>
// //         </div>

// //         <div className="vf-field">
// //           <label className="vf-label">Additional Details <span style={{ fontWeight: 400, textTransform: 'none', fontSize: 11, color: 'rgba(255,255,255,0.28)' }}>(optional)</span></label>
// //           <textarea
// //             className="vf-textarea"
// //             name="loanPurposeDetails"
// //             value={loanPurposeDetails}
// //             onChange={this.handleInputChange}
// //             rows={3}
// //             placeholder="Any additional context about the loan purpose…"
// //           />
// //         </div>

// //         <div className="vf-btn-row">
// //           <button type="button" className="vf-btn vf-btn-outline" onClick={() => { this.props.handleOpenUpdateClientDetailsForm(); this.props.handleFormReopen(); }}>
// //             ← Previous
// //           </button>
// //           <button type="button" className="vf-btn vf-btn-primary" onClick={this.handleSubmit} disabled={!this.state.isFormValid}>
// //             Proceed →
// //           </button>
// //         </div>
// //       </>
// //     );
// //   }

// //   getLoanPurposes = () => {
// //     if (this.state.onPayroll === 'yes' && this.state.salaryDeduction === 'yes') {
// //       return ['Business Expansion', 'Home Renovation', 'Education', 'Medical Expenses', 'Debt Consolidation', 'Vehicle Purchase', 'Others'];
// //     }
// //     return ['Business Expansion', 'Equipment Purchase', 'Inventory Purchase', 'Working Capital', 'Marketing and Advertising', 'Product Development', 'Debt Refinancing', 'Hiring and Training', 'Property Acquisition or Lease', 'Emergency Funds', 'Technology Upgrades', 'Project Funding', 'Seasonal Demand Preparation', 'Legal and Regulatory Compliance', 'Research and Development', 'Home Renovation', 'Education', 'Medical Expenses', 'Vehicle Purchase', 'Others'];
// //   }

// //   selectCollateralTypeAndValuation = (collateralType, collateralValue, handleInputChange) => {
// //     return (
// //       <>
// //         <div className="vf-field">
// //           <label className="vf-label">Collateral Type</label>
// //           <div style={{ position: 'relative' }}>
// //             <select className="vf-select" name="collateralType" value={collateralType} onChange={handleInputChange}>
// //               <option value="">Choose collateral…</option>
// //               <option value="Vehicle">Vehicle</option>
// //               <option value="Land">Land</option>
// //               <option value="House">House</option>
// //               <option value="Other">Other</option>
// //             </select>
// //             <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'rgba(16,185,129,0.7)', fontSize: 10 }}>▼</span>
// //           </div>
// //         </div>
// //         <div className="vf-field">
// //           <label className="vf-label">Estimated Collateral Value</label>
// //           <div className="vf-input-group">
// //             <span className="vf-input-prefix">K</span>
// //             <input type="number" name="collateralValue" value={collateralValue} autoComplete="off" onChange={handleInputChange} className="vf-input" style={{ borderRadius: '0 10px 10px 0', borderLeft: 'none' }} />
// //           </div>
// //         </div>
// //       </>
// //     );
// //   }

// //   componentDidUpdate(prevProps) {
// //     if (prevProps.loanCategory !== this.props.loanCategory) {
// //       if (this.props.loanCategory === 'personal') {
// //         this.setState({ onPayroll: '', salaryDeduction: '' }, this.checkFormValidity);
// //       } else {
// //         this.setState({ onPayroll: 'no', salaryDeduction: 'no' }, this.checkFormValidity);
// //       }
// //     }
// //   }

// //   render() {
// //     const { loanAmount, totalPayment, loanTerm, monthlyPayment, approvedLoanAmount, maxLoanTerm, salaryPercentage, salary, onPayroll, salaryDeduction, collateralType, collateralValue, interestRate } = this.state;
// //     const allowSalary = !(this.props.constants.loansInformation.allowSalaryLoans === "no");
// //     const isPersonal = this.props.loanCategory === "personal";

// //     return (
// //       <Slide in={true} direction="left">
// //         <div className="vf-page" style={{ paddingTop: 0 }}>
// //           <div className="vf-page-inner" style={{ maxWidth: 640 }}>
// //             <div className="vf-card">
// //               <div className="vf-card-header">
// //                 <h2 className="vf-card-title">Loan Application</h2>
// //                 <p className="vf-card-subtitle">Configure your loan amount, term, and repayment details</p>
// //               </div>

// //               <div className="vf-card-body">
// //                 {/* Payroll question */}
// //                 {isPersonal && allowSalary && (
// //                   <div className="vf-field">
// //                     <label className="vf-label">Are you on payroll?</label>
// //                     <span className="vf-sublabel">Government or private company employee</span>
// //                     <div style={{ position: 'relative' }}>
// //                       <select className="vf-select" name="onPayroll" autoComplete="off" value={onPayroll} onChange={this.handleInputChange}>
// //                         <option value="">Select…</option>
// //                         <option value="yes">Yes, I'm employed</option>
// //                         <option value="no">No, I own a business</option>
// //                       </select>
// //                       <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'rgba(16,185,129,0.7)', fontSize: 10 }}>▼</span>
// //                     </div>
// //                   </div>
// //                 )}

// //                 {/* Salary deduction */}
// //                 {isPersonal && onPayroll === 'yes' && allowSalary && (
// //                   <div className="vf-field" style={{ animation: 'vfFadeIn 0.3s ease' }}>
// //                     <label className="vf-label">Deduct monthly payment from salary?</label>
// //                     <div style={{ position: 'relative' }}>
// //                       <select className="vf-select" name="salaryDeduction" value={salaryDeduction} onChange={this.handleInputChange}>
// //                         <option value="">Select…</option>
// //                         <option value="yes">Yes</option>
// //                         <option value="no">No</option>
// //                       </select>
// //                       <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'rgba(16,185,129,0.7)', fontSize: 10 }}>▼</span>
// //                     </div>
// //                   </div>
// //                 )}

// //                 {/* Collateral for non-salary */}
// //                 {(this.props.loanCategory !== 'personal' || onPayroll === 'no' || salaryDeduction === 'no') &&
// //                   this.selectCollateralTypeAndValuation(collateralType, collateralValue, this.handleInputChange)
// //                 }

// //                 <hr className="vf-divider" />

// //                 {/* Loan amount */}
// //                 <div className="vf-field">
// //                   <label className="vf-label">Loan Amount</label>
// //                   <div className="vf-input-group">
// //                     <span className="vf-input-prefix">K</span>
// //                     <input type="number" name="loanAmount" value={loanAmount} autoComplete="off" onChange={this.handleInputChange} className="vf-input" style={{ borderRadius: '0 10px 10px 0', borderLeft: 'none' }} placeholder="0.00" />
// //                   </div>
// //                 </div>

// //                 {/* Monthly income/salary */}
// //                 {salaryDeduction !== '' && (
// //                   <div className="vf-field" style={{ animation: 'vfFadeIn 0.3s ease' }}>
// //                     <label className="vf-label">Monthly {onPayroll === 'yes' && salaryDeduction === 'yes' ? 'Salary' : 'Income'}</label>
// //                     {onPayroll !== 'yes' || salaryDeduction !== 'yes' ? (
// //                       <span className="vf-sublabel">From your business or other income sources</span>
// //                     ) : null}
// //                     <div className="vf-input-group">
// //                       <span className="vf-input-prefix">K</span>
// //                       <input type="number" name="salary" value={salary} autoComplete="off" onChange={this.handleInputChange} className="vf-input" style={{ borderRadius: '0 10px 10px 0', borderLeft: 'none' }} placeholder="0.00" />
// //                     </div>
// //                   </div>
// //                 )}

// //                 {/* Loan term */}
// //                 <div className="vf-field">
// //                   <label className="vf-label">Repayment Period</label>
// //                   <input type="range" className="vf-range" name="loanTerm" min="1" max={maxLoanTerm} value={loanTerm} onChange={this.handleInputChange} />
// //                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// //                     <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 16, fontWeight: 700, color: '#34D399' }}>{loanTerm} {loanTerm === 1 ? 'month' : 'months'}</span>
// //                     <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>max {maxLoanTerm} months</span>
// //                   </div>
// //                 </div>

// //                 {/* Summary card */}
// //                 {loanAmount > 0 && (
// //                   <div className="vf-summary" style={{ animation: 'vfFadeIn 0.3s ease' }}>
// //                     <div className="vf-summary-row">
// //                       <span className="vf-summary-label">Monthly Payment</span>
// //                       <span className="vf-summary-value">K {fmt(monthlyPayment)}</span>
// //                     </div>
// //                     <div className="vf-summary-row">
// //                       <span className="vf-summary-label">Total Repayment</span>
// //                       <span className="vf-summary-value">K {fmt(totalPayment)}</span>
// //                     </div>
// //                     <div className="vf-summary-row">
// //                       <span className="vf-summary-label">% of Income</span>
// //                       <span className="vf-summary-value" style={parseFloat(salaryPercentage) > 40 ? { color: '#F87171' } : {}}>{parseFloat(salaryPercentage).toFixed(1)}%</span>
// //                     </div>
// //                     <div className="vf-summary-row">
// //                       <span className="vf-summary-label">Interest Rate</span>
// //                       <span className="vf-summary-value">{interestRate}% p.a.</span>
// //                     </div>
// //                   </div>
// //                 )}

// //                 {this.renderSalaryWarning()}
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </Slide>
// //     );
// //   }
// // }
// "use client";

// import { calculateLoan } from "@/Functions";
// import { Slide } from "@material-ui/core";
// import React from "react";

// /* ─── CSS ─────────────────────────────────────────────────────────────────── */
// const FORM_CSS = `
//   @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap');

//   @keyframes vfFadeIn {
//     from { opacity: 0; transform: translateY(6px); }
//     to   { opacity: 1; transform: translateY(0); }
//   }

//   .vf-page {
//     min-height: 100vh;
//     background: #0a0f1a;
//     padding: 32px 16px;
//     font-family: 'Inter', sans-serif;
//   }
//   .vf-page-inner {
//     max-width: 640px;
//     margin: 0 auto;
//   }
//   .vf-card {
//     background: linear-gradient(145deg, #111827, #0d1526);
//     border: 1px solid rgba(255,255,255,0.07);
//     border-radius: 20px;
//     overflow: hidden;
//     box-shadow: 0 24px 64px rgba(0,0,0,0.45);
//   }
//   .vf-card-header {
//     padding: 28px 32px 20px;
//     border-bottom: 1px solid rgba(255,255,255,0.06);
//     background: linear-gradient(135deg, rgba(16,185,129,0.08), rgba(59,130,246,0.05));
//   }
//   .vf-card-title {
//     font-size: 22px;
//     font-weight: 700;
//     color: #f1f5f9;
//     margin: 0 0 4px;
//     letter-spacing: -0.3px;
//   }
//   .vf-card-subtitle {
//     font-size: 13px;
//     color: rgba(255,255,255,0.42);
//     margin: 0;
//   }
//   .vf-card-body {
//     padding: 28px 32px 32px;
//   }

//   /* Fields */
//   .vf-field { margin-bottom: 22px; }
//   .vf-label {
//     display: block;
//     font-size: 11.5px;
//     font-weight: 600;
//     letter-spacing: 0.06em;
//     text-transform: uppercase;
//     color: rgba(255,255,255,0.55);
//     margin-bottom: 8px;
//   }
//   .vf-sublabel {
//     display: block;
//     font-size: 12px;
//     color: rgba(255,255,255,0.28);
//     margin-top: -5px;
//     margin-bottom: 8px;
//   }

//   /* Inputs */
//   .vf-input-group {
//     display: flex;
//     align-items: stretch;
//     border-radius: 10px;
//     border: 1px solid rgba(255,255,255,0.1);
//     overflow: hidden;
//     transition: border-color 0.2s;
//   }
//   .vf-input-group:focus-within {
//     border-color: rgba(16,185,129,0.5);
//     box-shadow: 0 0 0 3px rgba(16,185,129,0.1);
//   }
//   .vf-input-prefix {
//     padding: 0 14px;
//     background: rgba(255,255,255,0.05);
//     border-right: 1px solid rgba(255,255,255,0.08);
//     color: rgba(255,255,255,0.4);
//     font-family: 'JetBrains Mono', monospace;
//     font-size: 14px;
//     display: flex;
//     align-items: center;
//   }
//   .vf-input {
//     flex: 1;
//     background: rgba(255,255,255,0.04);
//     border: none;
//     outline: none;
//     padding: 13px 16px;
//     color: #f1f5f9;
//     font-size: 15px;
//     font-family: 'JetBrains Mono', monospace;
//   }
//   .vf-input::placeholder { color: rgba(255,255,255,0.2); }

//   .vf-select {
//     width: 100%;
//     background: rgba(255,255,255,0.04);
//     border: 1px solid rgba(255,255,255,0.1);
//     border-radius: 10px;
//     padding: 13px 16px;
//     color: #f1f5f9;
//     font-size: 14px;
//     font-family: 'Inter', sans-serif;
//     outline: none;
//     appearance: none;
//     -webkit-appearance: none;
//     transition: border-color 0.2s;
//     cursor: pointer;
//   }
//   .vf-select:focus {
//     border-color: rgba(16,185,129,0.5);
//     box-shadow: 0 0 0 3px rgba(16,185,129,0.1);
//   }
//   .vf-select option { background: #1e293b; color: #f1f5f9; }

//   .vf-textarea {
//     width: 100%;
//     box-sizing: border-box;
//     background: rgba(255,255,255,0.04);
//     border: 1px solid rgba(255,255,255,0.1);
//     border-radius: 10px;
//     padding: 13px 16px;
//     color: #f1f5f9;
//     font-size: 14px;
//     font-family: 'Inter', sans-serif;
//     resize: vertical;
//     outline: none;
//     transition: border-color 0.2s;
//   }
//   .vf-textarea:focus {
//     border-color: rgba(16,185,129,0.5);
//     box-shadow: 0 0 0 3px rgba(16,185,129,0.1);
//   }
//   .vf-textarea::placeholder { color: rgba(255,255,255,0.2); }

//   /* Range */
//   .vf-range {
//     width: 100%;
//     -webkit-appearance: none;
//     height: 4px;
//     border-radius: 2px;
//     background: linear-gradient(to right, #10b981 var(--range-pct, 50%), rgba(255,255,255,0.1) var(--range-pct, 50%));
//     outline: none;
//     margin-bottom: 10px;
//     cursor: pointer;
//   }
//   .vf-range::-webkit-slider-thumb {
//     -webkit-appearance: none;
//     width: 18px; height: 18px;
//     border-radius: 50%;
//     background: #10b981;
//     box-shadow: 0 0 0 3px rgba(16,185,129,0.25);
//     cursor: pointer;
//   }
//   .vf-range::-moz-range-thumb {
//     width: 18px; height: 18px;
//     border-radius: 50%;
//     background: #10b981;
//     border: none;
//     box-shadow: 0 0 0 3px rgba(16,185,129,0.25);
//   }

//   /* Summary */
//   .vf-summary {
//     background: rgba(16,185,129,0.06);
//     border: 1px solid rgba(16,185,129,0.15);
//     border-radius: 14px;
//     padding: 18px 20px;
//     margin-bottom: 20px;
//   }
//   .vf-summary-row {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     padding: 6px 0;
//   }
//   .vf-summary-row + .vf-summary-row {
//     border-top: 1px solid rgba(255,255,255,0.05);
//   }
//   .vf-summary-label { font-size: 13px; color: rgba(255,255,255,0.45); }
//   .vf-summary-value {
//     font-family: 'JetBrains Mono', monospace;
//     font-size: 14px;
//     font-weight: 700;
//     color: #34D399;
//   }

//   /* Alerts */
//   .vf-alert {
//     display: flex;
//     align-items: flex-start;
//     gap: 10px;
//     padding: 13px 16px;
//     border-radius: 10px;
//     font-size: 13px;
//     line-height: 1.5;
//     margin-bottom: 10px;
//   }
//   .vf-alert-icon {
//     flex-shrink: 0;
//     width: 22px; height: 22px;
//     border-radius: 50%;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-size: 12px;
//     font-weight: 700;
//     margin-top: 1px;
//   }
//   .vf-alert-warning {
//     background: rgba(245,158,11,0.09);
//     border: 1px solid rgba(245,158,11,0.25);
//     color: #FCD34D;
//   }
//   .vf-alert-warning .vf-alert-icon {
//     background: rgba(245,158,11,0.18);
//     color: #FCD34D;
//   }
//   .vf-alert-info {
//     background: rgba(59,130,246,0.09);
//     border: 1px solid rgba(59,130,246,0.25);
//     color: #93C5FD;
//   }
//   .vf-alert-info .vf-alert-icon {
//     background: rgba(59,130,246,0.18);
//     color: #93C5FD;
//   }
//   .vf-alert-success {
//     background: rgba(16,185,129,0.09);
//     border: 1px solid rgba(16,185,129,0.25);
//     color: #6EE7B7;
//   }
//   .vf-alert-success .vf-alert-icon {
//     background: rgba(16,185,129,0.18);
//     color: #6EE7B7;
//   }

//   /* Divider */
//   .vf-divider {
//     border: none;
//     border-top: 1px solid rgba(255,255,255,0.07);
//     margin: 24px 0;
//   }

//   /* Section title */
//   .vf-section-title {
//     display: flex;
//     align-items: center;
//     gap: 10px;
//     margin-bottom: 18px;
//   }
//   .vf-section-title-bar {
//     width: 3px; height: 16px;
//     background: linear-gradient(180deg,#10b981,#3b82f6);
//     border-radius: 2px;
//     flex-shrink: 0;
//   }
//   .vf-section-title h5 {
//     margin: 0;
//     font-size: 13px;
//     font-weight: 600;
//     letter-spacing: 0.05em;
//     text-transform: uppercase;
//     color: rgba(255,255,255,0.5);
//   }

//   /* Buttons */
//   .vf-btn-row {
//     display: flex;
//     justify-content: space-between;
//     gap: 12px;
//     margin-top: 24px;
//   }
//   .vf-btn {
//     flex: 1;
//     padding: 13px 20px;
//     border-radius: 10px;
//     font-size: 14px;
//     font-weight: 600;
//     cursor: pointer;
//     border: none;
//     transition: all 0.2s;
//     font-family: 'Inter', sans-serif;
//   }
//   .vf-btn-outline {
//     background: transparent;
//     border: 1px solid rgba(255,255,255,0.15);
//     color: rgba(255,255,255,0.65);
//   }
//   .vf-btn-outline:hover { background: rgba(255,255,255,0.06); }
//   .vf-btn-primary {
//     background: linear-gradient(135deg,#10b981,#059669);
//     color: #fff;
//     box-shadow: 0 4px 16px rgba(16,185,129,0.3);
//   }
//   .vf-btn-primary:hover:not(:disabled) {
//     background: linear-gradient(135deg,#059669,#047857);
//     box-shadow: 0 6px 20px rgba(16,185,129,0.4);
//     transform: translateY(-1px);
//   }
//   .vf-btn-primary:disabled {
//     opacity: 0.35;
//     cursor: not-allowed;
//     transform: none;
//     box-shadow: none;
//   }
//   .vf-select-wrap { position: relative; }
//   .vf-select-arrow {
//     position: absolute;
//     right: 12px;
//     top: 50%;
//     transform: translateY(-50%);
//     pointer-events: none;
//     color: rgba(16,185,129,0.7);
//     font-size: 10px;
//   }
// `;

// let _cssInjected = false;
// function injectCSS() {
//   if (typeof document === "undefined" || _cssInjected) return;
//   _cssInjected = true;
//   const tag = document.createElement("style");
//   tag.setAttribute("data-vf-forms", "1");
//   tag.textContent = FORM_CSS;
//   document.head.appendChild(tag);
// }

// function fmt(n) {
//   if (!n) return "0.00";
//   return parseFloat(n).toLocaleString("en-ZM", {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   });
// }

// /* ─── Component ───────────────────────────────────────────────────────────── */
// export default class AddLoanAmountForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       loanAmount: "",
//       totalPayment: 0,
//       onPayroll: this.props.loanCategory === "personal" ? "" : "no",
//       salaryDeduction: this.props.loanCategory === "personal" ? "" : "no",
//       loanCategory: "",
//       loanType: "",
//       loanPurpose: "",
//       loanPurposeDetails: "",
//       loanTerm: this.props.constants.loansInformation.defaultCollaterallLoanTerm,
//       interestRate:
//         this.props.constants.loansInformation.defaultCollaterallLoanInterestRate,
//       maxLoanTerm:
//         this.props.constants.loansInformation.defaultCollaterallLoanTerm,
//       isFormValid: false,
//       stateSaved: false,
//       monthlyPayment: 0,
//       totalInterest: 0,
//       approvedLoanAmount: 0,
//       error: null,
//       salary: "",
//       salaryPercentage: 0,
//       isProceed: false,
//       collateralType: "",
//       collateralValue: "",
//     };
//   }

//   componentDidMount() {
//     injectCSS();
//     const fields = [
//       "onPayroll",
//       "salaryDeduction",
//       "loanPurpose",
//       "loanAmount",
//       "salary",
//       "loanTerm",
//       "collateralType",
//       "collateralValue",
//     ];
//     const newState = {};

//     fields.forEach((key) => {
//       const value = localStorage.getItem(`vectorFin_${key}`);
//       if (value !== null) {
//         newState[key] = ["loanAmount", "salary", "loanTerm", "collateralValue"].includes(key)
//           ? parseFloat(value)
//           : value;
//       }
//     });

//     if (
//       this.props.constants.loansInformation.allowSalaryLoans &&
//       this.props.constants.loansInformation.allowSalaryLoans === "no"
//     ) {
//       newState.onPayroll = "no";
//       newState.salaryDeduction = "no";
//     }

//     if (this.props.loanCategory !== "personal") {
//       newState.onPayroll = "no";
//       newState.salaryDeduction = "no";
//     }

//     this.setState(newState, this.checkFormValidity);
//   }

//   handleInputChange = (e) => {
//     const { name, value } = e.target;
//     this.setState({ [name]: value }, () => {
//       this.checkFormValidity();
//       if (name !== "loanPurposeDetails") {
//         localStorage.setItem(`vectorFin_${name}`, value);
//       }
//     });
//   };

//   checkFormValidity = () => {
//     let {
//       loanAmount,
//       onPayroll,
//       loanType,
//       interestRate,
//       salaryDeduction,
//       loanPurpose,
//       loanTerm,
//       salary,
//       maxLoanTerm,
//     } = this.state;
//     let loanCategory = "";
//     let isFormValid = false;

//     if (onPayroll === "yes") {
//       if (salaryDeduction === "yes") {
//         loanCategory = "salaryLoans";
//         loanType = "salaryBased";
//         interestRate =
//           this.props.constants.loansInformation.defaultSalaryLoanInterestRate;
//         maxLoanTerm =
//           this.props.constants.loansInformation.defaultSalaryLoanTerm;
//       } else {
//         loanCategory = "assetLoans";
//         loanType = null;
//       }
//       isFormValid = true;
//     } else if (onPayroll === "no") {
//       loanCategory = "assetLoans";
//       loanType = null;
//       isFormValid = true;
//     }

//     if (!loanPurpose || !loanAmount || !loanTerm || !salary) {
//       isFormValid = false;
//     }

//     this.setState(
//       { isFormValid, loanCategory, loanType, maxLoanTerm, interestRate },
//       this.calculateLoanDetails
//     );
//   };

//   calculateLoanDetails = async () => {
//     const { loanAmount, loanTerm, interestRate, onPayroll, salaryDeduction, salary } =
//       this.state;
//     let rate = interestRate;

//     if (onPayroll === "yes" && salaryDeduction === "yes") {
//       rate = this.props.constants.loansInformation.defaultSalaryLoanInterestRate;
//       const { monthlyPayment, totalInterest, totalPayment } = await calculateLoan({
//         amount: loanAmount,
//         termMonths: loanTerm,
//         loanType: "salaryBased",
//       });
//       const salaryPercentage = (monthlyPayment / salary) * 100;
//       this.setState({
//         monthlyPayment,
//         totalInterest,
//         totalPayment,
//         approvedLoanAmount: loanAmount,
//         salaryPercentage,
//         interestRate: rate,
//       });
//     } else {
//       const { monthlyPayment, totalPayment } = await calculateLoan({
//         amount: loanAmount,
//         termMonths: loanTerm,
//         loanType: "assetBased",
//       });
//       const salaryPercentage = (monthlyPayment / salary) * 100;
//       this.setState({
//         monthlyPayment,
//         totalPayment,
//         approvedLoanAmount: loanAmount,
//         salaryPercentage,
//         interestRate: rate,
//       });
//     }
//   };

//   handleProceedConfirmation = () => {
//     this.setState({ isProceed: true });
//   };

//   handleSubmit = async (e) => {
//     e.preventDefault();
//     delete this.state.isFormValid;
//     delete this.state.error;
//     delete this.state.onPayroll;
//     delete this.state.salaryDeduction;
//     this.props.setLoanInformation(this.state);
//     this.setState({ isFormValid: true, stateSaved: true }, () => {
//       this.props.handleOpenBusinessInformationForm();
//     });
//   };

//   /* ── Salary / collateral warning — exact logic from v2, restyled ── */
//   renderSalaryWarning = () => {
//     const {
//       salary,
//       salaryPercentage,
//       collateralValue,
//       loanAmount,
//       totalPayment,
//       loanTerm,
//       onPayroll,
//       salaryDeduction,
//     } = this.state;

//     const loanAmt = parseFloat(loanAmount);
//     const collateralVal = parseFloat(collateralValue);
//     const maxLoanFromCollateral = collateralVal / 2;
//     const isSalaryLoanType = onPayroll === "yes" && salaryDeduction === "yes";
//     const limit =
//       this.props.constants.loansInformation.allowedSalaryPercentageLimit || 40;

//     if (isSalaryLoanType) {
//       if (salary <= 0 || parseInt(salaryPercentage) > limit) {
//         return (
//           <>
//             <div className="vf-alert vf-alert-warning">
//               <span className="vf-alert-icon">!</span>
//               <span>
//                 Monthly payments exceed {limit}% of your salary. Reduce the
//                 amount or extend the repayment term.
//               </span>
//             </div>
//             <div className="vf-alert vf-alert-info">
//               <span className="vf-alert-icon">i</span>
//               <span>
//                 <strong>Tip:</strong> Consider a smaller salary loan combined
//                 with a business loan if you have other income sources.
//               </span>
//             </div>
//           </>
//         );
//       }
//     } else {
//       if (loanAmount && maxLoanFromCollateral > 0 && loanAmt > maxLoanFromCollateral) {
//         return (
//           <>
//             <div className="vf-alert vf-alert-warning">
//               <span className="vf-alert-icon">!</span>
//               <span>
//                 You can only borrow up to half your collateral's value —
//                 maximum <strong>K{fmt(maxLoanFromCollateral)}</strong>.
//               </span>
//             </div>
//             <div className="vf-alert vf-alert-info">
//               <span className="vf-alert-icon">i</span>
//               <span>
//                 If you have other assets, you can request another loan with
//                 the other asset as well.
//               </span>
//             </div>
//           </>
//         );
//       }
//       return this.renderProceedWithLoanButton();
//     }
//   };

//   /* ── Loan-purpose section + nav buttons ── */
//   renderLoanPurposeAndAdditionalDetails = () => {
//     const loanPurposes = this.getLoanPurposes();
//     const { loanPurpose, loanPurposeDetails } = this.state;
//     return (
//       <>
//         <div className="vf-section-title">
//           <span className="vf-section-title-bar" />
//           <h5>Loan Purpose</h5>
//         </div>

//         <div className="vf-field">
//           <label className="vf-label">Purpose of Loan</label>
//           <div className="vf-select-wrap">
//             <select
//               className="vf-select"
//               name="loanPurpose"
//               value={loanPurpose}
//               onChange={this.handleInputChange}
//             >
//               <option value="">Select purpose…</option>
//               {loanPurposes.map((p, i) => (
//                 <option key={i} value={p}>
//                   {p}
//                 </option>
//               ))}
//             </select>
//             <span className="vf-select-arrow">▼</span>
//           </div>
//         </div>

//         <div className="vf-field">
//           <label className="vf-label">
//             Additional Details{" "}
//             <span
//               style={{
//                 fontWeight: 400,
//                 textTransform: "none",
//                 fontSize: 11,
//                 color: "rgba(255,255,255,0.28)",
//               }}
//             >
//               (optional)
//             </span>
//           </label>
//           <textarea
//             className="vf-textarea"
//             name="loanPurposeDetails"
//             value={loanPurposeDetails}
//             onChange={this.handleInputChange}
//             rows={3}
//             placeholder="Any additional context about the loan purpose…"
//           />
//         </div>
//       </>
//     );
//   };

//   renderProceedWithLoanButton = () => {
//     return (
//       <>
//         <hr className="vf-divider" />
//         {this.renderLoanPurposeAndAdditionalDetails()}

//         {this.state.loanAmount ? (
//           <div className="vf-alert vf-alert-info" style={{ marginBottom: 0 }}>
//             <span className="vf-alert-icon">i</span>
//             <span>
//               <strong>Would you like to proceed with this amount?</strong>
//             </span>
//           </div>
//         ) : null}

//         <div className="vf-btn-row">
//           <button
//             type="button"
//             className="vf-btn vf-btn-outline"
//             onClick={() => {
//               this.props.handleOpenUpdateClientDetailsForm();
//               this.props.handleFormReopen();
//             }}
//           >
//             ← Previous
//           </button>
//           <button
//             type="button"
//             className="vf-btn vf-btn-primary"
//             onClick={this.handleSubmit}
//             disabled={!this.state.isFormValid}
//           >
//             Proceed →
//           </button>
//         </div>
//       </>
//     );
//   };

//   getLoanPurposes = () => {
//     if (this.state.onPayroll === "yes" && this.state.salaryDeduction === "yes") {
//       return [
//         "Business Expansion",
//         "Home Renovation",
//         "Education",
//         "Medical Expenses",
//         "Debt Consolidation",
//         "Vehicle Purchase",
//         "Others",
//       ];
//     }
//     return [
//       "Business Expansion",
//       "Equipment Purchase",
//       "Inventory Purchase",
//       "Working Capital",
//       "Marketing and Advertising",
//       "Product Development",
//       "Debt Refinancing",
//       "Hiring and Training",
//       "Property Acquisition or Lease",
//       "Emergency Funds",
//       "Technology Upgrades",
//       "Project Funding",
//       "Seasonal Demand Preparation",
//       "Legal and Regulatory Compliance",
//       "Research and Development",
//       "Home Renovation",
//       "Education",
//       "Medical Expenses",
//       "Vehicle Purchase",
//       "Others",
//     ];
//   };

//   selectColateralTypeAndValuation = (collateralType, collateralValue, handleInputChange) => {
//     return (
//       <>
//         <div className="vf-field">
//           <label className="vf-label">Collateral Type</label>
//           <div className="vf-select-wrap">
//             <select
//               className="vf-select"
//               name="collateralType"
//               value={collateralType}
//               onChange={handleInputChange}
//             >
//               <option value="">Choose collateral…</option>
//               <option value="Vehicle">Vehicle</option>
//               <option value="Land">Land</option>
//               <option value="House">House</option>
//               <option value="Other">Other</option>
//             </select>
//             <span className="vf-select-arrow">▼</span>
//           </div>
//         </div>

//         <div className="vf-field">
//           <label className="vf-label">Estimated Collateral Value</label>
//           <div className="vf-input-group">
//             <span className="vf-input-prefix">K</span>
//             <input
//               type="number"
//               name="collateralValue"
//               value={collateralValue}
//               autoComplete="off"
//               onChange={handleInputChange}
//               className="vf-input"
//               style={{ borderRadius: "0 10px 10px 0", borderLeft: "none" }}
//             />
//           </div>
//         </div>
//       </>
//     );
//   };

//   componentDidUpdate(prevProps) {
//     if (prevProps.loanCategory !== this.props.loanCategory) {
//       if (this.props.loanCategory === "personal") {
//         this.setState({ onPayroll: "", salaryDeduction: "" }, this.checkFormValidity);
//       } else {
//         this.setState({ onPayroll: "no", salaryDeduction: "no" }, this.checkFormValidity);
//       }
//     }
//   }

//   render() {
//     const {
//       loanAmount,
//       totalPayment,
//       loanTerm,
//       monthlyPayment,
//       maxLoanTerm,
//       salaryPercentage,
//       salary,
//       onPayroll,
//       salaryDeduction,
//       collateralType,
//       collateralValue,
//       interestRate,
//     } = this.state;

//     const allowSalary = !(
//       this.props.constants.loansInformation.allowSalaryLoans === "no"
//     );
//     const isPersonal = this.props.loanCategory === "personal";

//     /* Update range track fill via inline style on the input */
//     const rangePct =
//       maxLoanTerm > 1
//         ? ((loanTerm - 1) / (maxLoanTerm - 1)) * 100
//         : 0;

//     return (
//       <Slide in={true} direction="left">
//         <div className="vf-page" style={{ paddingTop: 0 }}>
//           <div className="vf-page-inner">
//             <div className="vf-card">
//               <div className="vf-card-header">
//                 <h2 className="vf-card-title">Loan Application</h2>
//                 <p className="vf-card-subtitle">
//                   Configure your loan amount, term, and repayment details
//                 </p>
//               </div>

//               <div className="vf-card-body">
//                 {/* ── Payroll question ── */}
//                 {isPersonal &&
//                   allowSalary && (
//                     <div className="vf-field">
//                       <label className="vf-label">Are you on payroll?</label>
//                       <span className="vf-sublabel">
//                         Government or private company employee
//                       </span>
//                       <div className="vf-select-wrap">
//                         <select
//                           className="vf-select"
//                           name="onPayroll"
//                           autoComplete="off"
//                           value={onPayroll}
//                           onChange={this.handleInputChange}
//                         >
//                           <option value="">Select…</option>
//                           <option value="yes">Yes, I'm employed</option>
//                           <option value="no">No, I own a business</option>
//                         </select>
//                         <span className="vf-select-arrow">▼</span>
//                       </div>
//                     </div>
//                   )}

//                 {/* ── Salary deduction ── */}
//                 {isPersonal &&
//                   onPayroll === "yes" &&
//                   allowSalary && (
//                     <div
//                       className="vf-field"
//                       style={{ animation: "vfFadeIn 0.3s ease" }}
//                     >
//                       <label className="vf-label">
//                         Deduct monthly payment from salary?
//                       </label>
//                       <div className="vf-select-wrap">
//                         <select
//                           className="vf-select"
//                           name="salaryDeduction"
//                           value={salaryDeduction}
//                           onChange={this.handleInputChange}
//                         >
//                           <option value="">Select…</option>
//                           <option value="yes">Yes</option>
//                           <option value="no">No</option>
//                         </select>
//                         <span className="vf-select-arrow">▼</span>
//                       </div>
//                     </div>
//                   )}

//                 {/* ── Collateral (non-personal, or payroll=no, or deduction=no) ── */}
//                 {(this.props.loanCategory !== "personal" ||
//                   onPayroll === "no" ||
//                   salaryDeduction === "no") &&
//                   this.selectColateralTypeAndValuation(
//                     collateralType,
//                     collateralValue,
//                     this.handleInputChange
//                   )}

//                 <hr className="vf-divider" />

//                 {/* ── Loan amount ── */}
//                 <div className="vf-field">
//                   <label className="vf-label">Loan Amount</label>
//                   <div className="vf-input-group">
//                     <span className="vf-input-prefix">K</span>
//                     <input
//                       type="number"
//                       name="loanAmount"
//                       value={loanAmount}
//                       autoComplete="off"
//                       onChange={this.handleInputChange}
//                       className="vf-input"
//                       style={{ borderRadius: "0 10px 10px 0", borderLeft: "none" }}
//                       placeholder="0.00"
//                     />
//                   </div>
//                 </div>

//                 {/* ── Monthly income / salary ── */}
//                 {salaryDeduction !== "" && (
//                   <div
//                     className="vf-field"
//                     style={{ animation: "vfFadeIn 0.3s ease" }}
//                   >
//                     <label className="vf-label">
//                       Monthly{" "}
//                       {onPayroll === "yes" && salaryDeduction === "yes"
//                         ? "Salary"
//                         : "Income"}
//                     </label>
//                     {!(onPayroll === "yes" && salaryDeduction === "yes") && (
//                       <span className="vf-sublabel">
//                         From your business or other income sources
//                       </span>
//                     )}
//                     <div className="vf-input-group">
//                       <span className="vf-input-prefix">K</span>
//                       <input
//                         type="number"
//                         name="salary"
//                         value={salary}
//                         autoComplete="off"
//                         onChange={this.handleInputChange}
//                         className="vf-input"
//                         style={{
//                           borderRadius: "0 10px 10px 0",
//                           borderLeft: "none",
//                         }}
//                         placeholder="0.00"
//                       />
//                     </div>
//                   </div>
//                 )}

//                 {/* ── Loan term ── */}
//                 <div className="vf-field">
//                   <label className="vf-label">Repayment Period</label>
//                   <input
//                     type="range"
//                     className="vf-range"
//                     name="loanTerm"
//                     min="1"
//                     max={maxLoanTerm}
//                     value={loanTerm}
//                     onChange={this.handleInputChange}
//                     style={{ "--range-pct": `${rangePct}%` }}
//                   />
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                     }}
//                   >
//                     <span
//                       style={{
//                         fontFamily: "'JetBrains Mono',monospace",
//                         fontSize: 16,
//                         fontWeight: 700,
//                         color: "#34D399",
//                       }}
//                     >
//                       {loanTerm} {loanTerm == 1 ? "month" : "months"}
//                     </span>
//                     <span
//                       style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}
//                     >
//                       max {maxLoanTerm} months
//                     </span>
//                   </div>
//                 </div>

//                 {/* ── Summary card (always visible once amount > 0) ── */}
//                 {loanAmount > 0 && (
//                   <div
//                     className="vf-summary"
//                     style={{ animation: "vfFadeIn 0.3s ease" }}
//                   >
//                     <div className="vf-summary-row">
//                       <span className="vf-summary-label">Monthly Payment</span>
//                       <span className="vf-summary-value">
//                         K {fmt(monthlyPayment)}
//                       </span>
//                     </div>
//                     <div className="vf-summary-row">
//                       <span className="vf-summary-label">Total Repayment</span>
//                       <span className="vf-summary-value">
//                         K {fmt(totalPayment)}
//                       </span>
//                     </div>
//                     <div className="vf-summary-row">
//                       <span className="vf-summary-label">% of Income</span>
//                       <span
//                         className="vf-summary-value"
//                         style={
//                           parseFloat(salaryPercentage) > 40
//                             ? { color: "#F87171" }
//                             : {}
//                         }
//                       >
//                         {parseFloat(salaryPercentage).toFixed(2)}%
//                       </span>
//                     </div>
//                     <div className="vf-summary-row">
//                       <span className="vf-summary-label">Interest Rate</span>
//                       <span className="vf-summary-value">
//                         {interestRate}% p.a.
//                       </span>
//                     </div>
//                   </div>
//                 )}

//                 {/* ── Warnings / proceed button — exact v2 logic ── */}
//                 {this.renderSalaryWarning()}
//               </div>
//             </div>
//           </div>
//         </div>
//       </Slide>
//     );
//   }
// }
"use client";

import { calculateLoan } from "@/Functions";
import { Slide } from "@material-ui/core";
import React from "react";

/* ─── CSS (modern dark theme) ─────────────────────────────────────────────── */
const FORM_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap');

  @keyframes vfFadeIn {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .vf-page {
    min-height: 100vh;
    background: #0a0f1a;
    padding: 32px 16px;
    font-family: 'Inter', sans-serif;
  }
  .vf-page-inner {
    max-width: 640px;
    margin: 0 auto;
  }
  .vf-card {
    background: linear-gradient(145deg, #111827, #0d1526);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 24px 64px rgba(0,0,0,0.45);
  }
  .vf-card-header {
    padding: 28px 32px 20px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    background: linear-gradient(135deg, rgba(16,185,129,0.08), rgba(59,130,246,0.05));
  }
  .vf-card-title {
    font-size: 22px;
    font-weight: 700;
    color: #f1f5f9;
    margin: 0 0 4px;
    letter-spacing: -0.3px;
  }
  .vf-card-subtitle {
    font-size: 13px;
    color: rgba(255,255,255,0.42);
    margin: 0;
  }
  .vf-card-body {
    padding: 28px 32px 32px;
  }

  .vf-field { margin-bottom: 22px; }
  .vf-label {
    display: block;
    font-size: 11.5px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.55);
    margin-bottom: 8px;
  }
  .vf-sublabel {
    display: block;
    font-size: 12px;
    color: rgba(255,255,255,0.28);
    margin-top: -5px;
    margin-bottom: 8px;
  }

  .vf-input-group {
    display: flex;
    align-items: stretch;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.1);
    overflow: hidden;
    transition: border-color 0.2s;
  }
  .vf-input-group:focus-within {
    border-color: rgba(16,185,129,0.5);
    box-shadow: 0 0 0 3px rgba(16,185,129,0.1);
  }
  .vf-input-prefix {
    padding: 0 14px;
    background: rgba(255,255,255,0.05);
    border-right: 1px solid rgba(255,255,255,0.08);
    color: rgba(255,255,255,0.4);
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
    display: flex;
    align-items: center;
  }
  .vf-input {
    flex: 1;
    background: rgba(255,255,255,0.04);
    border: none;
    outline: none;
    padding: 13px 16px;
    color: #f1f5f9;
    font-size: 15px;
    font-family: 'JetBrains Mono', monospace;
  }
  .vf-input::placeholder { color: rgba(255,255,255,0.2); }

  .vf-select {
    width: 100%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    padding: 13px 16px;
    color: #f1f5f9;
    font-size: 14px;
    font-family: 'Inter', sans-serif;
    outline: none;
    appearance: none;
    -webkit-appearance: none;
    transition: border-color 0.2s;
    cursor: pointer;
  }
  .vf-select:focus {
    border-color: rgba(16,185,129,0.5);
    box-shadow: 0 0 0 3px rgba(16,185,129,0.1);
  }
  .vf-select option { background: #1e293b; color: #f1f5f9; }

  .vf-textarea {
    width: 100%;
    box-sizing: border-box;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    padding: 13px 16px;
    color: #f1f5f9;
    font-size: 14px;
    font-family: 'Inter', sans-serif;
    resize: vertical;
    outline: none;
    transition: border-color 0.2s;
  }
  .vf-textarea:focus {
    border-color: rgba(16,185,129,0.5);
    box-shadow: 0 0 0 3px rgba(16,185,129,0.1);
  }
  .vf-textarea::placeholder { color: rgba(255,255,255,0.2); }

  .vf-range {
    width: 100%;
    -webkit-appearance: none;
    height: 4px;
    border-radius: 2px;
    background: linear-gradient(to right, #10b981 var(--range-pct, 50%), rgba(255,255,255,0.1) var(--range-pct, 50%));
    outline: none;
    margin-bottom: 10px;
    cursor: pointer;
  }
  .vf-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px; height: 18px;
    border-radius: 50%;
    background: #10b981;
    box-shadow: 0 0 0 3px rgba(16,185,129,0.25);
    cursor: pointer;
  }
  .vf-range::-moz-range-thumb {
    width: 18px; height: 18px;
    border-radius: 50%;
    background: #10b981;
    border: none;
    box-shadow: 0 0 0 3px rgba(16,185,129,0.25);
  }

  .vf-summary {
    background: rgba(16,185,129,0.06);
    border: 1px solid rgba(16,185,129,0.15);
    border-radius: 14px;
    padding: 18px 20px;
    margin-bottom: 20px;
  }
  .vf-summary-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 0;
  }
  .vf-summary-row + .vf-summary-row {
    border-top: 1px solid rgba(255,255,255,0.05);
  }
  .vf-summary-label { font-size: 13px; color: rgba(255,255,255,0.45); }
  .vf-summary-value {
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
    font-weight: 700;
    color: #34D399;
  }

  .vf-alert {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 13px 16px;
    border-radius: 10px;
    font-size: 13px;
    line-height: 1.5;
    margin-bottom: 10px;
  }
  .vf-alert-icon {
    flex-shrink: 0;
    width: 22px; height: 22px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 700;
    margin-top: 1px;
  }
  .vf-alert-warning {
    background: rgba(245,158,11,0.09);
    border: 1px solid rgba(245,158,11,0.25);
    color: #FCD34D;
  }
  .vf-alert-warning .vf-alert-icon {
    background: rgba(245,158,11,0.18);
    color: #FCD34D;
  }
  .vf-alert-info {
    background: rgba(59,130,246,0.09);
    border: 1px solid rgba(59,130,246,0.25);
    color: #93C5FD;
  }
  .vf-alert-info .vf-alert-icon {
    background: rgba(59,130,246,0.18);
    color: #93C5FD;
  }
  .vf-alert-success {
    background: rgba(16,185,129,0.09);
    border: 1px solid rgba(16,185,129,0.25);
    color: #6EE7B7;
  }
  .vf-alert-success .vf-alert-icon {
    background: rgba(16,185,129,0.18);
    color: #6EE7B7;
  }

  .vf-divider {
    border: none;
    border-top: 1px solid rgba(255,255,255,0.07);
    margin: 24px 0;
  }

  .vf-section-title {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 18px;
  }
  .vf-section-title-bar {
    width: 3px; height: 16px;
    background: linear-gradient(180deg,#10b981,#3b82f6);
    border-radius: 2px;
    flex-shrink: 0;
  }
  .vf-section-title h5 {
    margin: 0;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
  }

  .vf-btn-row {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    margin-top: 24px;
  }
  .vf-btn {
    flex: 1;
    padding: 13px 20px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: all 0.2s;
    font-family: 'Inter', sans-serif;
  }
  .vf-btn-outline {
    background: transparent;
    border: 1px solid rgba(255,255,255,0.15);
    color: rgba(255,255,255,0.65);
  }
  .vf-btn-outline:hover { background: rgba(255,255,255,0.06); }
  .vf-btn-primary {
    background: linear-gradient(135deg,#10b981,#059669);
    color: #fff;
    box-shadow: 0 4px 16px rgba(16,185,129,0.3);
  }
  .vf-btn-primary:hover:not(:disabled) {
    background: linear-gradient(135deg,#059669,#047857);
    box-shadow: 0 6px 20px rgba(16,185,129,0.4);
    transform: translateY(-1px);
  }
  .vf-btn-primary:disabled {
    opacity: 0.35;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  .vf-select-wrap { position: relative; }
  .vf-select-arrow {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: rgba(16,185,129,0.7);
    font-size: 10px;
  }
`;

let _cssInjected = false;
function injectCSS() {
  if (typeof document === "undefined" || _cssInjected) return;
  _cssInjected = true;
  const tag = document.createElement("style");
  tag.setAttribute("data-vf-forms", "1");
  tag.textContent = FORM_CSS;
  document.head.appendChild(tag);
}

function fmt(n) {
  if (!n) return "0.00";
  return parseFloat(n).toLocaleString("en-ZM", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/* ─── Component (exact logic from original, restyled) ────────────────────── */
export default class AddLoanAmountForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loanAmount: '',
      totalPayment: 0,
      onPayroll: this.props.loanCategory === "personal" ? '' : 'no',
      salaryDeduction: this.props.loanCategory === "personal" ? '' : 'no',
      loanCategory: '',
      loanType: '',
      loanPurpose: '',
      loanPurposeDetails: '',
      loanTerm: this.props.constants.loansInformation.defaultCollaterallLoanTerm,
      interestRate: this.props.constants.loansInformation.defaultCollaterallLoanInterestRate,
      maxLoanTerm: this.props.constants.loansInformation.defaultCollaterallLoanTerm,
      isFormValid: false,
      stateSaved: false,
      monthlyPayment: 0,
      totalInterest: 0,
      approvedLoanAmount: 0,
      error: null,
      salary: '',
      salaryPercentage: 0,
      isProceed: false,
      collateralType: '',
      collateralValue: ''
    };
  }

  componentDidMount() {
    injectCSS();
    const fields = ['onPayroll', 'salaryDeduction', 'loanPurpose', 'loanAmount', 'salary', 'loanTerm', 'collateralType', 'collateralValue'];
    const newState = {};

    fields.forEach(key => {
      const value = localStorage.getItem(`vectorFin_${key}`);
      if (value !== null) {
        newState[key] = ['loanAmount', 'salary', 'loanTerm', 'collateralValue'].includes(key)
          ? parseFloat(value)
          : value;
      }
    })

    if (this.props.constants.loansInformation.allowSalaryLoans && this.props.constants.loansInformation.allowSalaryLoans === "no") {
      newState.onPayroll = 'no';
      newState.salaryDeduction = 'no';
    }
    if (this.props.loanCategory !== 'personal') {
      newState.onPayroll = 'no';
      newState.salaryDeduction = 'no';
    }

    this.setState(newState, this.checkFormValidity);
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      this.checkFormValidity();
      if (name !== 'loanPurposeDetails') {
        localStorage.setItem(`vectorFin_${name}`, value);
      }
    })
  }

  checkFormValidity = () => {
    let { loanAmount, onPayroll, loanType, interestRate, salaryDeduction, loanPurpose, loanTerm, salary, maxLoanTerm, collateralValue } = this.state;
    let loanCategory = '';
    let isFormValid = false;

    if (onPayroll === 'yes') {
      if (salaryDeduction === 'yes') {
        loanCategory = 'salaryLoans';
        loanType = 'salaryBased';
        interestRate = this.props.constants.loansInformation.defaultSalaryLoanInterestRate,
          maxLoanTerm = this.props.constants.loansInformation.defaultSalaryLoanTerm
      } else {
        loanCategory = 'assetLoans';
        loanType = null;
      }
      isFormValid = true;
    } else if (onPayroll === 'no') {
      loanCategory = 'assetLoans';
      loanType = null;
      isFormValid = true;
    }

    if (!loanPurpose || !loanAmount || !loanTerm || !salary) {
      isFormValid = false;
    }

    this.setState({ isFormValid, loanCategory, loanType, maxLoanTerm, interestRate }, this.calculateLoanDetails);
  }

  calculateLoanDetails = async () => {
    const { loanAmount, loanTerm, interestRate, onPayroll, salaryDeduction, salary, collateralValue } = this.state;
    let rate = interestRate;

    if (onPayroll === 'yes' && salaryDeduction === 'yes') {
      rate = this.props.constants.loansInformation.defaultSalaryLoanInterestRate;
      const { monthlyPayment, totalInterest, totalPayment } = await calculateLoan({ amount: loanAmount, termMonths: loanTerm, loanType: 'salaryBased' })
      const salaryPercentage = (monthlyPayment / salary) * 100;
      this.setState({ monthlyPayment, totalInterest, totalPayment, approvedLoanAmount: loanAmount, salaryPercentage, interestRate: rate });
    } else {
      const { monthlyPayment, totalPayment } = await calculateLoan({ amount: loanAmount, termMonths: loanTerm, loanType: 'assetBased' })
      const salaryPercentage = (monthlyPayment / salary) * 100;
      this.setState({ monthlyPayment, totalPayment, approvedLoanAmount: loanAmount, salaryPercentage, interestRate: rate });
    }
  }

  handleProceedConfirmation = () => {
    this.setState({ isProceed: true });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    delete this.state.isFormValid;
    delete this.state.error;
    delete this.state.onPayroll;
    delete this.state.salaryDeduction;
    this.props.setLoanInformation(this.state);
    this.setState({ isFormValid: true, stateSaved: true }, () => {
      this.props.handleOpenBusinessInformationForm();
    });
  }


  renderSalaryWarning = () => {
    const { salary, salaryPercentage, collateralValue, loanAmount, totalPayment, loanTerm, onPayroll, salaryDeduction } = this.state;
    const loanAmt = parseFloat(loanAmount);
    const collateralVal = parseFloat(collateralValue);
    const showLoanInfo = loanAmt > 0;
    const maxLoanFromCollateral = collateralVal / 2;
    const collateralRequired = salaryDeduction === "no" || onPayroll === "no";
    const isSalaryLoanType = onPayroll === 'yes' && salaryDeduction === 'yes'

    const collateralAlert = (
      <div className="vf-alert vf-alert-info" style={{ marginBottom: '5px', fontWeight: 'bold' }}>
        <span className="vf-alert-icon">i</span>
        <span>Please note that you shall be required to leave a collateral in form of a vehicle, land or house title deeds at our headquarters, it should be worth 2 times the amount you are requesting.</span>
      </div>
    );

    const loanSummary = (
      <>
        <div className="vf-alert vf-alert-success" style={{ marginBottom: '5px' }}>
          <span className="vf-alert-icon">✓</span>
          <span>The amount of: <strong>{loanAmount}</strong> is within approvable range</span>
        </div>
        <div className="vf-alert vf-alert-info" style={{ marginBottom: '5px' }}>
          <span className="vf-alert-icon">i</span>
          <span>You shall pay a total amount of: <strong>{totalPayment}</strong> during <strong>{loanTerm}</strong> months</span>
        </div>
      </>
    );
    if (isSalaryLoanType) {
      if (salary <= 0 || parseInt(salaryPercentage) > (this.props.constants.loansInformation.allowedSalaryPercentageLimit || 40)) {
        return (
          <>
            <div className="vf-alert vf-alert-warning" style={{ marginBottom: '5px' }}>
              <span className="vf-alert-icon">!</span>
              <span>You cannot get a loan which requires monthly payments of over {this.props.constants.loansInformation.allowedSalaryPercentageLimit || 40}% of your salary</span>
            </div>
            <div className="vf-alert vf-alert-info" style={{ marginBottom: '5px' }}>
              <span className="vf-alert-icon">i</span>
              <span>Consider reducing the amount or increasing the repayment period</span>
            </div>
            <div className="vf-alert vf-alert-info" style={{ marginBottom: '5px' }}>
              <span className="vf-alert-icon">i</span>
              <span><strong>Tip:</strong>Consider applying for a lesser amount with your salary then apply for a business loan as well, that is if you have other sources of income</span>
            </div>
          </>
        )
      }
    }
    else {
      return (
        <>
          {loanAmount > maxLoanFromCollateral ? <><div className="vf-alert vf-alert-warning" style={{ marginBottom: '5px' }}>
            <span className="vf-alert-icon">!</span>
            <span>You can only get up to half the worth of your collateral, that is K: <strong>{maxLoanFromCollateral}</strong></span>
          </div>
            <div className="vf-alert vf-alert-info" style={{ marginBottom: '5px' }}>
              <span className="vf-alert-icon">i</span>
              <span>If you have other assets, you can request another loan with the other asset as well.</span>
            </div> </> :
            this.renderProceedWithLoanButton()}
        </>
      );
    }

    if (!salaryDeduction || !onPayroll || collateralRequired) {
      return (
        <>
          {showLoanInfo && (
            <>
              <div className="vf-alert vf-alert-success" style={{ marginBottom: '5px' }}>
                <span className="vf-alert-icon">✓</span>
                <span>The amount of: <strong>{loanAmount}</strong> is within approvable range</span>
              </div>
              {collateralAlert}
            </>
          )}
          {this.renderProceedWithLoanButton()}
        </>
      )
    }

    if (showLoanInfo) {
      return (
        <>
          {loanSummary}
          {this.renderProceedWithLoanButton()}
        </>
      );
    }

    return this.renderProceedWithLoanButton();
  };


  renderLoanPurposeAndAdditionalDetails = () => {
    const loanPurposes = this.getLoanPurposes();
    const { loanPurpose, loanPurposeDetails } = this.state
    return (
      <>
        <div className="vf-section-title">
          <span className="vf-section-title-bar" />
          <h5>Loan Purpose</h5>
        </div>

        <div className="vf-field">
          <label className="vf-label">What is the purpose of the loan?</label>
          <div className="vf-select-wrap">
            <select
              className="vf-select"
              name="loanPurpose"
              value={loanPurpose}
              onChange={this.handleInputChange}
            >
              <option value="">Select purpose...</option>
              {loanPurposes.map((purpose, index) => (
                <option key={index} value={purpose}>
                  {purpose}
                </option>
              ))}
            </select>
            <span className="vf-select-arrow">▼</span>
          </div>
        </div>

        <div className="vf-field">
          <label className="vf-label">
            Additional details <span style={{ fontWeight: 400, textTransform: 'none', fontSize: 11, color: 'rgba(255,255,255,0.28)' }}>(optional)</span>
          </label>
          <textarea
            className="vf-textarea"
            name="loanPurposeDetails"
            value={loanPurposeDetails}
            onChange={this.handleInputChange}
            rows={3}
            placeholder="Provide more information about the loan purpose if necessary."
          />
        </div>
      </>
    )
  }

  renderProceedWithLoanButton = () => {
    return <>
      <hr className="vf-divider" />
      {this.renderLoanPurposeAndAdditionalDetails()}
      {this.state.loanAmount ?
        <div className="vf-alert vf-alert-info" style={{ marginBottom: '5px' }}>
          <span className="vf-alert-icon">i</span>
          <span><strong>Would you like to proceed with this amount?</strong></span>
        </div>
        : <></>
      }

      <div className="vf-btn-row">
        <button
          type="button"
          className="vf-btn vf-btn-outline"
          onClick={() => { this.props.handleOpenUpdateClientDetailsForm(); this.props.handleFormReopen(); }}
        >
          ← Previous
        </button>
        <button
          type="button"
          className="vf-btn vf-btn-primary"
          onClick={this.handleSubmit}
          disabled={!this.state.isFormValid}
        >
          Proceed →
        </button>
      </div>
    </>
  }

  getLoanPurposes = () => {
    if (this.state.onPayroll === 'yes' && this.state.salaryDeduction === 'yes') {
      return [
        'Business Expansion',
        'Home Renovation',
        'Education',
        'Medical Expenses',
        'Debt Consolidation',
        'Vehicle Purchase',
        'Others'
      ]
    }
    else {
      return [
        'Business Expansion',
        'Equipment Purchase',
        'Inventory Purchase',
        'Working Capital',
        'Marketing and Advertising',
        'Product Development',
        'Debt Refinancing',
        'Hiring and Training',
        'Property Acquisition or Lease',
        'Emergency Funds',
        'Technology Upgrades',
        'Project Funding',
        'Seasonal Demand Preparation',
        'Legal and Regulatory Compliance',
        'Research and Development',
        'Home Renovation',
        'Education',
        'Medical Expenses',
        'Vehicle Purchase',
        'Others'
      ]
    }
  }

  selectColateralTypeAndValuation = (collateralType, collateralValue, handleInputChange) => {
    return <>
      <div className="vf-field">
        <label className="vf-label">Select Collateral Type</label>
        <div className="vf-select-wrap">
          <select
            className="vf-select"
            name="collateralType"
            value={collateralType}
            onChange={handleInputChange}
          >
            <option value="">Choose...</option>
            <option value="Vehicle">Vehicle</option>
            <option value="Land">Land</option>
            <option value="House">House</option>
            <option value="Other">Other</option>
          </select>
          <span className="vf-select-arrow">▼</span>
        </div>
      </div>
      <div className="vf-field">
        <label className="vf-label">Estimated Value of Collateral</label>
        <div className="vf-input-group">
          <span className="vf-input-prefix">K</span>
          <input
            type="number"
            name="collateralValue"
            value={collateralValue}
            autoComplete="off"
            onChange={handleInputChange}
            className="vf-input"
            style={{ borderRadius: "0 10px 10px 0", borderLeft: "none" }}
            aria-label="Collateral value input"
          />
        </div>
      </div>
    </>
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loanCategory !== this.props.loanCategory) {
      if (this.props.loanCategory === 'personal') {
        this.setState({ onPayroll: '', salaryDeduction: '' }, this.checkFormValidity);
      } else {
        this.setState({ onPayroll: 'no', salaryDeduction: 'no' }, this.checkFormValidity);
      }
    }
  }

  render() {
    const { loanAmount, totalPayment, loanTerm, monthlyPayment, maxLoanTerm, salaryPercentage, salary, onPayroll, salaryDeduction, collateralType, collateralValue, interestRate } = this.state;

    const rangePct = maxLoanTerm > 1 ? ((loanTerm - 1) / (maxLoanTerm - 1)) * 100 : 0;

    return (
      <Slide in={true} direction="left">
        <div className="vf-page" style={{ paddingTop: 0 }}>
          <div className="vf-page-inner">
            <div className="vf-card">
              <div className="vf-card-header">
                <h2 className="vf-card-title">Loan Application</h2>
                <p className="vf-card-subtitle">Configure your loan amount, term, and repayment details</p>
              </div>

              <div className="vf-card-body">
                {/* Payroll Question */}
                {this.props.loanCategory !== "personal" ?
                  <></> : this.props.constants.loansInformation.allowSalaryLoans && this.props.constants.loansInformation.allowSalaryLoans === "no" ?
                    <></> :
                    <div className="vf-field">
                      <label className="vf-label">Are you on payroll (Government or Company)?</label>
                      <div className="vf-select-wrap">
                        <select
                          className="vf-select"
                          name="onPayroll"
                          autoComplete="off"
                          value={onPayroll}
                          onChange={this.handleInputChange}
                        >
                          <option value="">Choose...</option>
                          <option value="yes">Yes I am</option>
                          <option value="no">No I own a business</option>
                        </select>
                        <span className="vf-select-arrow">▼</span>
                      </div>
                    </div>
                }

                {/* Salary or Collateral Section */}
                {this.props.loanCategory === 'personal' && onPayroll === 'yes' ?
                  this.props.constants.loansInformation.allowSalaryLoans && this.props.constants.loansInformation.allowSalaryLoans === "no" ?
                    <></> :
                    <div className="vf-field">
                      <label className="vf-label">Do you want this loan’s monthly payment to be deducted from your salary?</label>
                      <div className="vf-select-wrap">
                        <select
                          className="vf-select"
                          name="salaryDeduction"
                          value={salaryDeduction}
                          onChange={this.handleInputChange}
                        >
                          <option value="">Choose...</option>
                          <option value="yes">Yes</option>
                          <option value="no">No</option>
                        </select>
                        <span className="vf-select-arrow">▼</span>
                      </div>
                    </div> : <></>
                }

                {/* for non‑personal loans always, or if personal but not deducting */}
                {(this.props.loanCategory !== 'personal' ||
                  onPayroll === 'no' ||
                  salaryDeduction === 'no') &&
                  this.selectColateralTypeAndValuation(
                    collateralType,
                    collateralValue,
                    this.handleInputChange
                  )
                }

                <hr className="vf-divider" />

                {/* Loan Amount Input */}
                <div className="vf-field">
                  <label className="vf-label">How much are you looking to get?</label>
                  <div className="vf-input-group">
                    <span className="vf-input-prefix">K</span>
                    <input
                      type="number"
                      name="loanAmount"
                      value={loanAmount}
                      autoComplete="off"
                      onChange={this.handleInputChange}
                      className="vf-input"
                      style={{ borderRadius: "0 10px 10px 0", borderLeft: "none" }}
                      aria-label="Loan amount input"
                    />
                  </div>
                </div>

                {/* Salary Input */}
                {salaryDeduction === '' ? null :
                  <div className="vf-field" style={{ animation: "vfFadeIn 0.3s ease" }}>
                    <label className="vf-label">
                      Your Monthly {onPayroll === 'yes' && salaryDeduction === 'yes' ? <span> Salary </span> : <span> Income <span style={{ color: 'rgba(255,255,255,0.28)' }}>(from your business/company)</span> </span>}
                    </label>
                    <div className="vf-input-group">
                      <span className="vf-input-prefix">K</span>
                      <input
                        type="number"
                        name="salary"
                        value={salary}
                        autoComplete="off"
                        onChange={this.handleInputChange}
                        className="vf-input"
                        style={{ borderRadius: "0 10px 10px 0", borderLeft: "none" }}
                        aria-label="Salary input"
                      />
                    </div>
                  </div>
                }

                {/* Loan Term (Range Selector) */}
                <div className="vf-field">
                  <label className="vf-label">How long do you wish to repay the loan? (in months)</label>
                  <input
                    type="range"
                    className="vf-range"
                    name="loanTerm"
                    min="1"
                    max={maxLoanTerm}
                    value={loanTerm}
                    onChange={this.handleInputChange}
                    style={{ "--range-pct": `${rangePct}%` }}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, fontWeight: 700, color: "#34D399" }}>
                      {loanTerm} {loanTerm == 1 ? "month" : "months"}
                    </span>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>max {maxLoanTerm} months</span>
                  </div>

                  {/* Monthly Payment and Salary Percentage */}
                  <div className="vf-summary" style={{ marginTop: 16 }}>
                    <div className="vf-summary-row">
                      <span className="vf-summary-label">Monthly Loan Payment</span>
                      <span className="vf-summary-value">K {fmt(monthlyPayment)}</span>
                    </div>
                    <div className="vf-summary-row">
                      <span className="vf-summary-label">Total Loan Payment</span>
                      <span className="vf-summary-value">K {fmt(totalPayment)}</span>
                    </div>
                    <div className="vf-summary-row">
                      <span className="vf-summary-label">% of {salaryDeduction === 'yes' ? "salary" : "income"}</span>
                      <span className="vf-summary-value">{parseFloat(salaryPercentage).toFixed(2)}%</span>
                    </div>
                    <div className="vf-summary-row">
                      <span className="vf-summary-label">Interest Rate</span>
                      <span className="vf-summary-value">{interestRate}% p.a.</span>
                    </div>
                  </div>

                  {this.renderSalaryWarning()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slide>
    );
  }
}