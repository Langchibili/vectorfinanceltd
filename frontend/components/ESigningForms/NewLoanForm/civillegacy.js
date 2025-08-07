import React, { useEffect } from "react";
import Fab from "@mui/material/Fab";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import LinkIcon from "@mui/icons-material/Link";
import { styled } from "@mui/system";
import { getAgreementDay, getAgreementDaySuffix, getAgreementMonth, getAgreementYearNumber, getAgreementYearWords, scrolltoTopOFPage, validateEmail } from "@/Functions";
import DisplaySignature from "@/components/Includes/DisplaySignature/DisplaySignature";
import { api_url, getJwt } from "@/Constants";
import ErrorSnapBack from "@/components/Includes/SnapBacks/ErrorSnapBack";
import { useUser } from "@/Contexts/UserContext";
import { useConstants } from "@/Contexts/ConstantsContext";
import { Gavel, Info } from "@material-ui/icons";

// AutoResizingInput component – adjusts its width based on the content.
class AutoResizingInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue || "",
    };
    this.inputRef = React.createRef();
    // create a shared canvas for text measurement
    if (!AutoResizingInput.canvas) {
      AutoResizingInput.canvas = document.createElement("canvas");
      AutoResizingInput.ctx = AutoResizingInput.canvas.getContext("2d");
    }
  }

  handleChange = (e) => {
    const { onChange, name } = this.props;
    const value = e.target.value;
    this.setState({ value }, () => {
      if (onChange) onChange(name, value);
      this.adjustWidth();
      this.adjustColor()
    });
  };

  componentDidMount() {
    this.adjustWidth();
    this.adjustColor()
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.value !== this.state.value ||
      prevProps.placeholder !== this.props.placeholder
    ) {
      this.adjustWidth();
      this.adjustColor()
    }
  }

  adjustColor = ()=>{
    const input = this.inputRef.current;
    if (!input) return;
    const style = window.getComputedStyle(input);
    if(input.value.length < 1 && !this.props.unrequired){
      input.style.borderColor = "red"
    }
    else{
       input.style.borderColor = "none"
    }
  }
  adjustWidth = () => {
    const input = this.inputRef.current;
    if (!input) return;

    // get computed style so we match font for measurement
    const style = window.getComputedStyle(input);
    const font = `${style.fontSize} ${style.fontFamily}`;
    AutoResizingInput.ctx.font = font;

    // text to measure: either value or placeholder if empty
    const text = this.state.value || this.props.placeholder || "";
    const textWidth = AutoResizingInput.ctx.measureText(text).width;

    // Add some extra padding so text isn't right on the edge
    const extra = 8; 

    input.style.width = `${textWidth + extra}px`;
  };

  render() {
    const { placeholder, defaultValue, style, disabled, name, ...rest } = this.props;
    return (
      <input
        type="text"
        name={name}
        {...rest}
        ref={this.inputRef}
        style={style}
        placeholder={placeholder}
        value={defaultValue? defaultValue : this.state.value}
        disabled={disabled}
        onChange={this.handleChange}
      />
    );
  }
}


const StyledFab = styled(Fab)({
  position: "fixed",
  bottom: 150,
  right: 20,
  zIndex: 1000,
})

const SectionNav = styled(SpeedDial)({
  position: "fixed",
  bottom: 220,
  right: 20,
  zIndex: 1000,
})


export default class CivilLoansForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formSaved: false,
      uploading: false,
      error:null, 
      atBottom: false,
      propertyType: "",     // land | house | other
      formValues: {}, // stores all AutoResizingInput values
      signatures: {},
      constants: {
        agreementDateDay : getAgreementDay(),
        agreementDateDaySuffix: getAgreementDaySuffix(),
        agreementDateMonth : getAgreementMonth(),
        agreementDateYearNumber : getAgreementYearNumber(),
        agreementDateYearWords : getAgreementYearWords(),
        principalSum : this.props.loggedInUser.currentLoan.loanAmount
      }
    }
  }

  componentDidMount() {
    console.log('the props',this.props)
     if(document !== "undefined"){
        window.addEventListener("scroll", this.checkScrollPosition);
        scrolltoTopOFPage();
     }
  }
  saveSignatures = (signatures)=>{
     this.setState({
        signatures: signatures
     })
  }
  componentWillUnmount() {
    if(document !== "undefined"){
       window.removeEventListener("scroll", this.checkScrollPosition);
    }
  }
  
  checkScrollPosition = () => {
        const scrolledToBottom =
        window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
        if (scrolledToBottom !== this.state.atBottom) {
        this.setState({ atBottom: scrolledToBottom });
        }
  };

  scrollHandler = () => {
    if (this.state.atBottom) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  };
  // Generic change handler for inputs
  handleInputChange = (name, value) => {
    let inputValue = value
    if(name === "propertyName"){
      inputValue = "Property Name: " + value
    }
    if(name === "plotNumber"){
      inputValue = "Plot Number: " + value
    }
    else if(name === "plotSize"){
      inputValue = "Plot Size: " + value
    }
    else if(name === "location"){
      inputValue = "location: " + value
    }
    this.setState(prev => ({
      error: null,
      formValues: {
        ...prev.formValues,
        [name]: inputValue
      }
    }))
  }

  handlePropertyTypeChange = (e) => {
    const propertyType = e.target.value;
    this.setState(prev => ({
      error: null,
      propertyType,
      formValues: {
        ...prev.formValues,
        // if land/house, preset propertyName; if other, leave blank
        propertyName: propertyType === "other" ? "" : propertyType 
      }
    }))
}

// Update saveFormToAPI to include constants
validateForm = (formValues) => {
  // 1. Ensure all core fields exist and have truthy values
  const coreFields = [
    "accountNumber",
    "bankAccountName",
    "bankName",
    "bankPhone",
    "borrowerAddress",
    "borrowerEmail",
    "borrowerName",
    "borrowerWitnessName",
    "borrowerWitnessOccupation",
    "branchName",
    "propertyName",
    "sortCode",
    "swiftCode"
  ];

  for (const field of coreFields) {
    if (
      !Object.prototype.hasOwnProperty.call(formValues, field) ||
      formValues[field] === null ||
      formValues[field] === undefined ||
      String(formValues[field]).trim() === ""
    ) {
      return false;
    }
  }

  // 2. If propertyName is "land" or "house", check extra fields
  const prop = String(formValues.propertyName).toLowerCase();
  if (prop === "land" || prop === "house") {
    const extraFields = [
      "location",
      "plotNumber",
      "plotSize"
    ];

    for (const field of extraFields) {
      if (
        !Object.prototype.hasOwnProperty.call(formValues, field) ||
        formValues[field] === null ||
        formValues[field] === undefined ||
        String(formValues[field]).trim() === ""
      ) {
        return false;
      }
    }
  }

  // 3. If propertyName is "vehicle", check vehicle-specific fields
 else if (prop === "vehicle") {
  const vehicleFields = [
    "securityMake",
    "securityModel",
    "securityReg",
    "securityColour",
    "securityYear",
    "securityEngineNo",
    "securityChasisNo"
  ];

  for (const field of vehicleFields) {
    if (
      !Object.prototype.hasOwnProperty.call(formValues, field) ||
      formValues[field] === null ||
      formValues[field] === undefined ||
      String(formValues[field]).trim() === ""
    ) {
      return false;
    }
  }
}
  // If we got here, everything required is present
  return true;
}

saveFormToAPI = async () => {
  const { formValues, constants, signatures } = this.state;
  console.log("formValues",formValues)
  
  if(!this.validateForm(formValues)){
    this.setState({
      error:"Make sure all highlighted fields are entered."
    })
    return // make sure that all required fields are input
  }
  if(formValues.borrowerEmail && !validateEmail(formValues.borrowerEmail)){
      this.setState({
      error:"Please enter a valid email address."
    })
    return // make sure that all required fields are input
  }
  
  // in case of property name being other (to get the propery name only, from propertyName: some name)
  if(['land','house', 'vehicle'].includes(formValues.propertyName)){
    formValues.propertyName = "Property Name: "+formValues.propertyName
  }
  // merge constants (date, principalSum, etc.) with the user-entered values
  const payload = { 
    values: {...constants, ...formValues, ...signatures},
    formName: "GeneralLoanForm",
    client: this.props.loggedInUser.id,
    applicationFormId: this.props.toSignApplicationFormId,
    loanId: this.props.loggedInUser.currentLoan.id
  }
  console.log('payload', payload);

  try {
    this.setState({ uploading: true })
    const response = await fetch(`${api_url}/form-fill-values`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getJwt()}`
      },
      body: JSON.stringify({data:payload})
    })
    .then(response => response.json())
    .then(data => data)
    
    if (response.data && response.data.id){ // gotta update the new form-fill-values record in order to trigger the lifecycle method to process the form
      const updated = await fetch(`${api_url}/form-fill-values/${response.data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getJwt()}`
        },
        body: JSON.stringify({data:{clientId: this.props.loggedInUser.id}})
      })
      if(updated.ok){
        this.setState({ formSaved: true, uploading: false },()=>{
            this.props.handleRenderNextForm(this.props.handleCompleteLoanApplication())
        })
      }
      else{
        this.setState({
          uploading: false,
          error:"An error occured, please reflesh screen and try again. Contact us if this issue persists."
        })
      }
    }
    else{
       this.setState({
         uploading: false,
         error:"An error occured, please reflesh screen and try again. Contact us if this issue persists."
       })
    }
    
  } catch (error) {
    this.setState({
         uploading: false,
         error:"An error occured, please reflesh screen and try again. Contact us if this issue persists."
    })
    console.error("Submission failed:", error);
  }
}

render() {
  const inputStyle = {
    color: "black",
    fontWeight: "bold",
    paddingLeft: "2px",
    borderBottom: "1px solid #3228287a",
    borderStyle: "dashed",
    marginBottom: "5px",
    height: "25px",
    minWidth: "50px",
    flexGrow: 1
  };

  return (
    <div id="content-container" style={{ padding: 20 }}>
      {/* Header */}
      <p>
        Dated the{" "}
        <AutoResizingInput
          name="agreementDateDay"
          placeholder="_________"
          style={inputStyle}
          onChange={this.handleInputChange}
        />{" "}
        day of{" "}
        <AutoResizingInput
          name="agreementDateMonth"
          placeholder="_______________"
          style={inputStyle}
          onChange={this.handleInputChange}
        />{" "}
        2025
      </p>

      <h2 style={{ textAlign: "center" }}>VECTOR FINANCE LIMITED</h2>
      <p style={{ textAlign: "center" }}>AND</p>
      <h3 style={{ textAlign: "center" }}>CIVIL SERVANT LOAN AGREEMENT</h3>

      <p>
        This Civil Servant Loan Agreement (the “Agreement”) is made and effective the{" "}
        <AutoResizingInput
          name="agreementEffectiveDay"
          placeholder="______"
          style={inputStyle}
          onChange={this.handleInputChange}
        />{" "}
        day of{" "}
        <AutoResizingInput
          name="agreementEffectiveMonth"
          placeholder="_________"
          style={inputStyle}
          onChange={this.handleInputChange}
        />{" "}
        Two Thousand and Twenty{" "}
        <AutoResizingInput
          name="agreementEffectiveYearWords"
          placeholder="__________"
          style={inputStyle}
          onChange={this.handleInputChange}
        />{" "}
        and made
      </p>

      <p>
        BETWEEN: VECTOR FINANCE LIMITED whose registered office is at Plot No. 15 Lagos Road, Room No. FS1-B, Grandview
        Properties, Rhodespark, in the City and Province of Lusaka of the Republic of Zambia with Company Registration
        Number 120230054327 (the “The Lender”)
      </p>

      <p>
        AND:{" "}
        <AutoResizingInput
          name="borrowerName"
          placeholder="_______________________"
          style={inputStyle}
          onChange={this.handleInputChange}
        />{" "}
        of{" "}
        <AutoResizingInput
          name="borrowerAddress"
          placeholder="____________________"
          style={inputStyle}
          onChange={this.handleInputChange}
        />{" "}
        in the City and Province of Lusaka of the Republic of Zambia (the “The Borrower”)
      </p>

      <p>WHEREBY:</p>
      <ol>
        <li>
          The Lender is a Private Company Limited by shares duly incorporated under the laws of the Republic of Zambia.
        </li>
        <li>
          The Borrower is an employee under the Civil Service in{" "}
          <AutoResizingInput
            name="civilServiceProvince"
            placeholder="______________"
            style={inputStyle}
            onChange={this.handleInputChange}
          />
          , in the{" "}
          <AutoResizingInput
            name="civilServiceDistrict"
            placeholder="_______________"
            style={inputStyle}
            onChange={this.handleInputChange}
          />{" "}
          Province of the Republic of Zambia and is interested in securing a Loan facility.
        </li>
        <li>
          The Lender, in recognition of the Borrower's stable employment within the Civil Service, agrees to advance to the
          Borrower the sum of money more particularly detailed herein on the terms and conditions outlined in this Agreement.
        </li>
        <li>
          The Borrower agrees to repay the loan amount, together with applicable interest, through regular deductions from
          their monthly salary.
        </li>
        <li>
          The Parties have agreed to assume the obligations imposed on them under this Agreement subject to the terms and
          conditions contained herein.
        </li>
      </ol>

      <h4>1. INTERPRETATION AND PRELIMINARY</h4>
      <p>1.1 The headings in this Agreement are for convenience and reference only and shall neither be used in the interpretation of, modification nor amplification of the terms of this Agreement nor any of its clauses.</p>
      <p>1.2 In its interpretation, the contra proferentem rule of construction shall not apply (this Agreement being the product of negotiations between the Parties), nor shall this Agreement be construed against any Party by reason of the extent to which any Party or its professional advisors participated in the preparation of this Agreement.</p>
      <p>1.3 Where figures are referred to in numerals and in words, and there is any conflict between the two, the words shall prevail, unless the context indicates a contrary intention.</p>
      <p>1.4 In this Agreement, unless the context otherwise requires an obligation not to do something includes an obligation not to cause or allow that thing to be done; and</p>
      <p>1.5 In this Agreement unless the context otherwise stipulates, the words below words shall have the following meanings:</p>

      <dl>
        <dt><strong>“Agreement”</strong></dt>
        <dd>means this Civil Servant Loan Agreement;</dd>

        <dt><strong>“Business Day”</strong></dt>
        <dd>means a day other than a Saturday, Sunday or public holiday between the hours of 8:00 am to 5:00 pm in Zambia;</dd>

        <dt><strong>“Civil Servant”</strong></dt>
        <dd>means the Borrower and is an Employee of the Government of the Republic of Zambia;</dd>

        <dt><strong>“Disbursement Date”</strong></dt>
        <dd>means the date requested by the Borrower for the Loan or part of the Loan to be advanced or (as the context requires) the date on which such advance is actually made to the Borrower;</dd>

        <dt><strong>“Disbursement Notice”</strong></dt>
        <dd>means the request for disbursement of a Loan which must be evidenced in writing;</dd>

        <dt><strong>“Dispute”</strong></dt>
        <dd>means any dispute, difference of view, disagreement, controversy or claim arising out of or relating to this Agreement or the interpretation or performance of provisions of this Agreement or the breach, termination or validity thereof, which the Parties are unable to resolve amicably or by mutual agreement;</dd>

        <dt><strong>“Employer”</strong></dt>
        <dd>means the Government of the Republic of Zambia;</dd>

        <dt><strong>“Event of Default”</strong></dt>
        <dd>means any event or circumstance specified as such in Clause 10;</dd>

        <dt><strong>“Loan”</strong></dt>
        <dd>means the principal sum advanced or to be advanced to the Borrower pursuant to this Agreement;</dd>

        <dt><strong>“Loan Maturity Date”</strong></dt>
        <dd>means the date upon which the final Loan payment together with all accrued interest becomes due as set out in the First Schedule hereto;</dd>

        <dt><strong>“Loan Period”</strong></dt>
        <dd>means the period commencing on the date of this Agreement and ending on the day on which all amounts outstanding under the Agreement have been repaid in full; and</dd>

        <dt><strong>“Repayment Date”</strong></dt>
        <dd>means the dates as set out in the First Schedule hereto.</dd>
      </dl>

      <h4>2. COMMENCEMENT AND DURATION</h4>
      <p>2.1 This Agreement shall commence on the day and year first before written and shall continue in force until such a time as all sums owed by the Borrower in terms of the Agreement have been repaid, together with all charges and interest, or until such a time as this Agreement is terminated by the Lender.</p>

      <h4>3. CONDITIONS PRECEDENT</h4>
      <p>3.1 No Disbursement Notice may be given by the Borrower unless the following further conditions precedent have been satisfied by the Borrower, in a form and substance satisfactory to the Lender, which the Lender has notified to the Borrower:</p>
      <ol type="a">
        <li>
          On both the date of the Disbursement Notice and the Disbursement Date, the warranties and covenants in contained in this Agreement deemed to be repeated on those dates, are true in all material respects and will be true in all material respects immediately after the Loan is advanced and in accordance with the terms of this Agreement;
        </li>
        <li>
          On both the date of the Disbursement Notice and the Disbursement Date, no money is outstanding or due to the Lender by the Borrower pursuant to any other written agreement and/or no default would result from the advance of the Loan; and
        </li>
      </ol>

      <h4>4. THE FACILITY</h4>
      <p>4.1 Subject to the terms and conditions of this Agreement, the Lender shall make available to the Borrower a Loan in an amount of ZMW{" "}
        <AutoResizingInput
          name="principalSum"
          placeholder="… [… Zambian Kwacha]"
          style={inputStyle}
          onChange={this.handleInputChange}
        /> (hereinafter referred to as the “Principal Sum”).
      </p>
      <p>4.2 The sums in 4.1 above, shall be paid into the Borrower’s Bank Account:</p>
      <p>
        Bank:{" "}
        <AutoResizingInput
          name="bank"
          placeholder="____________"
          style={inputStyle}
          onChange={this.handleInputChange}
        />
      </p>
      <p>
        Branch:{" "}
        <AutoResizingInput
          name="branch"
          placeholder="____________"
          style={inputStyle}
          onChange={this.handleInputChange}
        />
      </p>
      <p>
        Account Number:{" "}
        <AutoResizingInput
          name="accountNumber"
          placeholder="____________"
          style={inputStyle}
          onChange={this.handleInputChange}
        />
      </p>
      <p>
        Sort Code:{" "}
        <AutoResizingInput
          name="sortCode"
          placeholder="____________"
          style={inputStyle}
          onChange={this.handleInputChange}
        />
      </p>
      <p>
        Swift Code:{" "}
        <AutoResizingInput
          name="swiftCode"
          placeholder="____________"
          style={inputStyle}
          onChange={this.handleInputChange}
        />
      </p>

      <h4>5. REPAYMENT OF THE LOAN</h4>
      <p>
        5.1 The Borrower authorizes its Employer and the Lender to deduct the sum of ZMW{" "}
        <AutoResizingInput
          name="salaryDeduction"
          placeholder="___________"
          style={inputStyle}
          onChange={this.handleInputChange}
        /> directly from the Borrower’s salary on a monthly basis which shall be remitted to the Lender.
      </p>
      <p>5.2 Subject to the provisions of this Agreement, the Borrower shall repay the Loan and all accrued interest and other charges and fees thereon within{" "}
        <AutoResizingInput
          name="repaymentTerm"
          placeholder="__________ days/months/years"
          style={inputStyle}
          onChange={this.handleInputChange}
        /> from the date of disbursement, in accordance with the repayment schedule set out in the First Schedule hereto provided that the repayment period may in the sole discretion of the Lender, be extended, which said extension shall be evidenced in writing.
      </p>
      <p>5.3 Subject to the written consent of the Lender, the Borrower may, if its/his/her financial capacity permits, repay any installment payment earlier that the date fixed for said repayment provided in Schedule 1.</p>
      <p>
        5.4 All payments and or deduction made by the Borrower under this Agreement shall be in Zambian Kwacha and in immediately available cleared funds to the Lender into the following bank account:
      </p>
      <p>
        Bank: Stanbic Bank (Zambia) Limited
      </p>
      <p>
        Branch: Woodlands
      </p>
      <p>
        Account Number: 913006381913
      </p>
      <p>
        Sort Code: 040030
      </p>
      <p>
        Swift Code: SBICZMLX
      </p>
      <p>
        5.5 All payments made by the Borrower under this Agreement shall be made in full, without set-off, counter claim or condition and free and clear of and without any bank charges, deduction or withholding (whether on account of tax or otherwise).
      </p>
      <p>
        5.6 If any payment becomes due on a day that is not a Business Day, the due date of such payment will be extended to the next succeeding Business Day, or if that Business Day falls in the following calendar month, such due date shall be the immediately preceding Business Day.
      </p>

      <h4>6. INTEREST</h4>
      <p>
        6.1 Interest shall accrue on the outstanding balance of the loan at the rate of 4% (four percent) per month. Interest shall be calculated on the daily cleared balance outstanding on the Borrower’s account on the basis of a 365-day year, irrespective of whether or not the year in question is a leap year (as varied from time to time). Such interest will be capitalized if not paid on the due date.
      </p>

      <h4>7. WARRANTIES</h4>
      <p>7.1 The Borrower makes the warranties set out in clause 7 to the Lender on the date of this Agreement.</p>
      <ol type="a">
        <li>
          The Borrower has the power to enter into, deliver, perform, and has taken all necessary action to authorize its entry into delivery and performance of this Agreement and the transactions contemplated by it;
        </li>
        <li>
          That no limit on its powers will be exceeded as a result of the borrowing contemplated by the creation of the security contemplated to be created in connection with this Agreement.
        </li>
        <li>
          The entry into and performance of, and the transactions contemplated by this Agreement do not and will not contravene or conflict with any agreement or instrument binding on the Borrower or its/his/her asset; or
        </li>
        <li>
          The entry into and performance of, and the transactions contemplated by this Agreement do not and will not contravene or conflict with any law or regulation or judicial or official order, applicable to the Borrower;
        </li>
        <li>
          The Borrower’s obligations under this Agreement are legal, valid, binding and enforceable in accordance with its terms; and
        </li>
        <li>
          The Borrower has disclosed to the Lender before the date of this Agreement all information relating to it and the transaction that is material to be known by the Lender (in the context of a Loan for a similar amount and on similar terms to the facility) and the information is accurate and complete in all material respects.
        </li>
      </ol>

      <h4>8. COVENANTS</h4>
      <p>8.1 The Borrower covenants with the Lender that as at the date of this Agreement until all its obligations and liabilities hereunder have been discharged:</p>
      <ol type="a">
        <li>
          The Borrower shall promptly obtain all consents or authorisations necessary (and do all that is needed to maintain them in full force and effect) under any law or regulation to enable it to perform its obligations under this Agreement;
        </li>
      </ol>

      <h4>9. UNDERTAKINGS</h4>
      <p>9.1 During the subsistence of this Agreement, the Borrower gives the following undertakings.</p>
      <ol type="a">
        <li>That the Borrower shall pay all sums due as agreed in this Agreement;</li>
        <li>That the Borrower shall comply with, fulfill, and perform timeously all its obligations in terms of this Agreement;</li>
        <li>The Borrower shall notify the Lender in case of any changes to their employment status not limited to resignation, retirement, or termination;</li>
        <li>The Borrower shall not incur any other liabilities which the said liability will affect his ability to pay the loan amount herein, without the Lender’s prior written consent;</li>
        <li>
          That the Borrower shall immediately send, or ensure that is sent, to the Lender details of any material litigation, arbitration, or administrative proceedings instituted against him, or details of any material claims asserted against him, or of any dispute with any Government or regulatory body or law enforcement agency, which may affect his ability to comply with his obligations under this Agreement; and
        </li>
      </ol>

      <h4>10. EVENT OF DEFAULT</h4>
      <p>10.1 Each of the events or circumstances set out in this clause will constitute an Event of Default:</p>
      <ol type="a">
        <li>
          The Borrower shall be in default if he/she/it does not pay on the due date any instalment payable by him/her/it under this Agreement in the manner set out under the First Schedule;
        </li>
        <li>
          The Borrower is no longer employed in the civil service and fails to provide an alternative repayment arrangement satisfactory to the Lender within ten (10) business days of the change in the Borrower’s employment status;
        </li>
        <li>
          The Borrower fails (other than by failing to pay) to comply with any provisions of this Agreement and (if the Lender considers, acting reasonably, that the default is capable of remedy) such default is not remedied within ten (10) Business Days or earlier of:
          <ol type="i">
            <li>The Lender notifying the Borrower of the default and the remedy required; and</li>
            <li>The Borrower becoming aware of the default.</li>
          </ol>
        </li>
        <li>
          Any representation, warranty or statement made, repeated or deemed made by the Borrower in, or pursuant to this Agreement is (or proves to have been) incomplete, untrue, incorrect or misleading in any material respect when made, repeated or deemed made;
        </li>
        <li>The Borrower stops or suspends payment of any of its liabilities under this Agreement;</li>
        <li>
          The Borrower commences negotiations, or enters into any composition, compromise, assignment or arrangement with one or more of its creditors (excluding the Lender) with a view to rescheduling any of its indebtedness (because of actual or anticipated financial difficulties);
        </li>
        <li>The Borrower repudiates or rescinds or shows an intention to repudiate or rescind this Agreement; and</li>
        <li>If any circumstance or event occurs which would or is likely to prejudice or adversely affect in any manner the capacity of the Borrower to repay any sums due and payable herein or any part thereof.</li>
      </ol>

      <p>10.2 On and at any time after the concurrence of an Event of default, the Lender may by notice to the Borrower:</p>
      <ol type="a">
        <li>Cancel all outstanding obligations of the Lender under the Agreement whereupon they shall immediately be cancelled;</li>
        <li>Declare that the Loan and all accrued interest thereon and all other amounts accrued or outstanding under this Agreement are due and payable on demand;</li>
        <li>Take any other action as it may deem fit for recovery of its dues and enforcement of the securities.</li>
      </ol>

      <h4>11. NOTICES</h4>
      <p>11.1 The parties choose the addresses mentioned in clause 11.2 below as their respective address for service of all notices, letters and documents under or in connection with this Agreement. A party can change its address for service by giving notice and the change will be effective from the date of receipt or deemed receipt by the party to whom it was sent.</p>
      <p>11.2 Addresses</p>
      <p>
        (a) The Lender:<br />
        Room No. FS1-B<br />
        Plot 15 Lagos Road<br />
        Gardenview Properties<br />
        Rhodespark<br />
        Lusaka, Zambia<br />
        Email:{" "}
        <AutoResizingInput
          name="lenderEmail"
          placeholder="info@vectorfinancelimited.com"
          style={inputStyle}
          onChange={this.handleInputChange}
        />
      </p>
      <p>
        (b) The Borrower:<br />
        <AutoResizingInput
          name="borrowerServiceAddress"
          placeholder="……………………… Lusaka"
          style={inputStyle}
          onChange={this.handleInputChange}
        />, Zambia.<br />
        Email:{" "}
        <AutoResizingInput
          name="borrowerEmail"
          placeholder="………………………………"
          style={inputStyle}
          onChange={this.handleInputChange}
        />
      </p>
      <p>11.3 Any notice or communication required or permitted to be given of this Agreement shall be valid and effective only if in writing and in English.</p>
      <p>11.4 Any such notice or communication addressed as provided herein shall be deemed to be given or made as follows:</p>
      <ol type="a">
        <li>If in person or by courier, when delivered;</li>
        <li>If by electronic mail, at the time the e-mail was sent (provided that a notice of non-delivery has not been received); and</li>
        <li>Provided that any such notice or communication is received on a business day, and within business hours.</li>
      </ol>

      <h4>12. COSTS, FEES AND OTHER CHARGES</h4>
      <p>12.1 The Borrower shall pay to the Lender:</p>
      <ol type="a">
        <li>Drawdown Fees: A drawdown fee of ZMW 100.00 (Once off fee to be deducted from disbursement amount).</li>
        <li>Arrangement Fees: Arrangement fee at .025% of the Loan Amount calculated monthly (To be paid in arrears on the due date).</li>
        <li>Documentation Fees: A documentation fee at 0.025% of the Loan Amount calculated monthly (To be paid in arrears on the due date).</li>
        <li>Loan Management Fee: A loan management fee at 2.5% of the Loan Amount calculated monthly (To be paid in arrears on the due date).</li>
        <li>Legal Costs: In the event of default, the Borrower shall reimburse the Lender for all legal costs incurred in recovering any outstanding amount that is due under this Agreement, including the costs of registration of this Agreement and any other security or other documents relating to this Agreement for purposes of enforcement.</li>
      </ol>

      <h4>13. WAIVER</h4>
      <p>13.1 No delay or omission to exercise any right, power or remedy accruing to the Lender upon any breach or default of the Borrower under this Agreement shall impair any such right, power or remedy of the Lender nor shall it be construed to be a waiver of any such breach or default.</p>
      <p>13.2 Any waiver, permission, consent or approval on the part of the Lender in respect of any breach default under this Agreement or any provisions or condition of this Agreement must be in writing and shall be effective only to the extent in such writing specifically.</p>

      <h4>14. SUPERSEDING</h4>
      <p>14.1 This agreement supersedes in its totality any prior contemporaneous agreements (oral or in print express or implied) between the parties concerning the subject matter herein.</p>

      <h4>15. CONFIDENTIALITY</h4>
      <p>15.1 Each Party to this Agreement undertakes to not disclose, directly or indirectly, to any person the contents of this Agreement or the terms of settlement unless:</p>
      <ol type="a">
        <li>Required to be disclosed by a Court of Law of any relevant jurisdiction;</li>
        <li>Prior written consent of the other Party has been obtained; or</li>
        <li>The information has come into the public domain through no fault of a Party, provided that such disclosure shall be notified to the other Party thereafter.</li>
      </ol>
      <p>15.2 The obligations of the Parties not to disclose confidential information shall be without limit and are irrevocable. The Parties shall desist from making or publishing any statements or comments whether in writing or otherwise concerning each other arising from the facts of the Claim. A party in breach shall be liable for any damage caused arising directly or indirectly from the said breach.</p>

      <h4>16. SEVERENCE</h4>
      <p>16.1 Notwithstanding anything contained in any provision of this Agreement, if any provision is held or found to be void, invalid, or otherwise unenforceable, such provision shall be deemed to be severed from this Agreement to the extent only that it is void, invalid, or unenforceable but the remainder of any such provision in this Agreement shall remain valid and enforceable to the extent that they can be given effect without the invalid portions of the provisions.</p>

      <h4>17. DISPUTE RESOLUTION</h4>
      <p>17.1 Any claim or dispute arising under, out of or in connection with this Agreement shall be resolved amicably by the Parties, failure which, the Parties shall refer the dispute to a Court of competent Jurisdiction within Zambia.</p>

      <h4>18. NO STIPULATION</h4>
      <p>18.1 No part of this Agreement shall constitute a stipulation in favour of any person who is not a Party to the Agreement unless the provision in question expressly provides that it does constitute a stipulation.</p>

      <h4>19. WHOLE AGREEMENT</h4>
      <p>19.1 This Agreement constitutes the entire Contract between the Parties and no warranties or representations or promises or undertakings have been given or made by either Party to the other except those recorded in this Agreement.</p>
      <p>19.2 No variation of this Agreement shall be valid unless reduced in writing and signed by or on behalf of all Parties.</p>

      <h4>20. GOVERNING LAW</h4>
      <p>20.1 This Agreement shall be construed and interpreted in all respects in accordance with the laws of the Republic of Zambia.</p>

      <h4>21. SIGNATURE</h4>
      <p>21.1 The Parties record that it is not required for this Agreement to be valid and enforceable that a Party shall initial the pages of this Agreement and/or have its signature of this Agreement verified by a witness.</p>

      <h4>22. BINDING EFFECT</h4>
      <p>22.1 This Agreement shall be binding upon the Parties, their respective heirs, successors, assigns and personal representatives and is enforceable against any third parties in accordance with the terms and obligations thereof.</p>

      <p>AS WITNESS the hands of the parties hereto or their duly authorized agents the day and year first before written.</p>

      {/* SIGNATURE BLOCK */}
      <p>
        Signed by the said ) for and on behalf of VECTOR FINANCE LIMITED<br/>
        <DisplaySignature for="lenderSignature" signature={this.state.formValues.lenderSignatureUrl} /><br/>
        Name:{" "}
        <AutoResizingInput
          name="lenderSignatoryName"
          placeholder="____________________"
          style={inputStyle}
          onChange={this.handleInputChange}
        /><br/>
        Title:{" "}
        <AutoResizingInput
          name="lenderSignatoryTitle"
          placeholder="____________________"
          style={inputStyle}
          onChange={this.handleInputChange}
        />
      </p>

      <p>
        In the presence of:<br/>
        Director:{" "}
        <AutoResizingInput
          name="lenderWitnessName"
          placeholder="____________________"
          style={inputStyle}
          onChange={this.handleInputChange}
        /><br/>
        Address:{" "}
        <AutoResizingInput
          name="lenderWitnessAddress"
          placeholder="____________________"
          style={inputStyle}
          onChange={this.handleInputChange}
        /><br/>
        <DisplaySignature for="lenderWitnessSignature" signature={this.state.formValues.lenderWitnessSignatureUrl} />
      </p>

      <p>
        Signed by the said )<br/>
        Borrower:{" "}
        <AutoResizingInput
          name="borrowerNameSignature"
          placeholder="____________________"
          style={inputStyle}
          onChange={this.handleInputChange}
        /><br/>
        <DisplaySignature for="borrowerSignature" signature={this.state.formValues.borrowerSignatureUrl} /><br/>
      </p>

      <p>
        In the presence of:<br/>
        Witness Name:{" "}
        <AutoResizingInput
          name="borrowerWitnessName"
          placeholder="____________________"
          style={inputStyle}
          onChange={this.handleInputChange}
        /><br/>
        Address:{" "}
        <AutoResizingInput
          name="borrowerWitnessAddress"
          placeholder="____________________"
          style={inputStyle}
          onChange={this.handleInputChange}
        /><br/>
        <DisplaySignature for="borrowerWitnessSignature" signature={this.state.formValues.borrowerWitnessSignatureUrl} />
      </p>
    </div>
  );
}

}


const GetSignatures = ({saveSignatures})=>{
  const loggedInUser = useUser()
  const constants = useConstants()
  useEffect(()=>{
    saveSignatures({
      lenderWitnessName:constants?.adminInitials?.ceoInitials?.ceoFullNames || "",
      directorName:constants?.adminInitials?.directorInitials?.directorFullNames || "",
      signature: loggedInUser?.user?.signature?.url || null,
      initials : loggedInUser?.user?.initials?.url || null,
      witnessSignature: loggedInUser?.user?.witnessSignature?.url || null,
      witnessInitials : loggedInUser?.user?.witnessInitials?.url || null,
      directorSignature: constants?.adminSignatures?.directorSignature?.url || null,
      ceoSignature: constants?.adminSignatures?.ceoSignature?.url || null,
      directorInitials: constants?.adminInitials?.directorInitials?.url || null,
      ceoInitials: constants?.adminInitials?.ceoInitials?.url || null
     })
  },[])
  return <></>
}