import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { scrolltoTopOFPage } from "@/Functions";
import DisplaySignature from "@/components/Includes/DisplaySignature/DisplaySignature";
import { api_url, getJwt } from "@/Constants";

// AutoResizingInput component – adjusts its width based on the content.
class AutoResizingInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.defaultValue || "" };
    this.inputRef = React.createRef();
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };

  componentDidMount() {
    this.adjustWidth();
  }

  componentDidUpdate() {
    this.adjustWidth();
  }

  adjustWidth = () => {
    const input = this.inputRef.current;
    if (input) {
      // Temporarily set a small width to recalc scrollWidth, then adjust.
      input.style.width = "1px";
      input.style.width = input.scrollWidth + "px";
    }
  };

  render() {
    // Remove any placeholder attribute passed in.
    const { placeholder, style, ...rest } = this.props;
    return (
      <input
        type="text"
        {...rest}
        ref={this.inputRef}
        style={style}
        value={this.state.value}
        onChange={this.handleChange}
      />
    );
  }
}

export default class NewLoanForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formSaved: false,
    };
  }


  saveHandwritingToAPI = async () => {
    const element = document.getElementById("content-container");
    const images = element.getElementsByTagName("img");
    const totalImages = images.length;
    let loadedImages = 0;
  
    const checkAllImagesLoaded = async () => {
      if (loadedImages === totalImages) {
        // Generate the PDF
        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const padding = 20;
        const pageWidth = 210;
        const pageHeight = 297;
        const scaleFactor = (pageWidth - padding * 2) / canvas.width;
        const scaledCanvasHeight = canvas.height * scaleFactor;
        const availableHeight = pageHeight - padding * 2;
  
        let yOffset = 0;
        while (yOffset < canvas.height) {
          const currentHeight = Math.min(
            availableHeight / scaleFactor,
            canvas.height - yOffset
          );
  
          const canvasSlice = document.createElement("canvas");
          canvasSlice.width = canvas.width;
          canvasSlice.height = currentHeight;
  
          const context = canvasSlice.getContext("2d");
          context.drawImage(
            canvas,
            0,
            yOffset,
            canvas.width,
            currentHeight,
            0,
            0,
            canvas.width,
            currentHeight
          );
  
          const imgSlice = canvasSlice.toDataURL("image/png");
          if (yOffset > 0) pdf.addPage();
          pdf.addImage(
            imgSlice,
            "PNG",
            padding,
            padding,
            pageWidth - padding * 2,
            currentHeight * scaleFactor
          );
  
          yOffset += currentHeight;
        }
  
        // Save the file locally
        const fileName = `LoanApplicationForm_cid_${this.props.loggedInUser.id}_lid_${this.props.loggedInUser.currentLoan.id}.pdf`;
        pdf.save(fileName);
  
        // Upload the file to the backend
        const pdfBlob = pdf.output("blob");
        let formData = new FormData();
        formData.append("files", pdfBlob, fileName);
        formData.append("ref", "forms.application-forms"); // Reference to the model
        formData.append("refId", this.props.toSignApplicationFormId); // User ID
        formData.append("field", "signedForm"); // Field name in Strapi
  
        try {
          const response = await fetch(`${api_url}/upload`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${getJwt()}`, // Replace with user's JWT token
            },
            body: formData,
          })
  
          if (response.ok) {
            const result = await response.json();
            console.log("File uploaded successfully:", result);
            // alert("File uploaded successfully!");
            this.setState({ formSaved: true });
          } else {
            console.error("Failed to upload file:", response.statusText);
            alert("Failed to upload file. Please try again.");
          }
        } catch (error) {
          console.error("Error uploading file:", error);
          alert("An error occurred while uploading the file.");
        }
      }
    };
  
    for (let i = 0; i < totalImages; i++) {
      if (images[i].complete) {
        loadedImages++;
        if (loadedImages === totalImages) checkAllImagesLoaded();
      } else {
        images[i].addEventListener("load", () => {
          loadedImages++;
          if (loadedImages === totalImages) checkAllImagesLoaded();
        });
      }
    }
  }
  
  componentDidMount() {
    console.log('the props',this.props)
    scrolltoTopOFPage();
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
      // width will be dynamically set by AutoResizingInput
      minWidth: "50px",
      flexGrow: 1,
      verticalAlign: "text-top",
    };

    const tableHeaderStyle = {
      padding: "8px",
      border: "1px solid #ccc",
      backgroundColor: "#f9f9f9",
      textAlign: "left",
    };

    const tableCellStyle = {
      padding: "8px",
      border: "1px solid #ccc",
    };

    return (
      <div style={{ width: "100%", margin: "0 auto" }}>
        <div>
          <div id="content-container" className="content-container">
            {/* Header Section */}   
            <h2 style={{textAlign:'center'}}>VECTOR FINANCE LIMITED (the “Lender”)</h2>
            <h3 style={{textAlign:'center'}}>Application Form</h3>

            {/* Borrower Details */}
            <p>
              <b>Client Number:</b>{" "}
              <AutoResizingInput style={inputStyle} />
            </p>
            <p>
              <b>Date:</b>{" "}
              <AutoResizingInput style={inputStyle} /> (the “Commencement Date”)
            </p>
            <p>
              <b>Name:</b>{" "}
              <AutoResizingInput style={inputStyle} /> (the “Customer” or the “Borrower”)
            </p>
            <p>
              <b>Title:</b>{" "}
              <AutoResizingInput style={inputStyle} />
            </p>
            <p>
              <b>Gender:</b>{" "}
              <AutoResizingInput style={inputStyle} />
            </p>
            <p>
              <b>Date of Birth:</b>{" "}
              <AutoResizingInput style={inputStyle} />
            </p>
            <p>
              <b>ID Number/NRC:</b>{" "}
              <AutoResizingInput style={inputStyle} />
            </p>
            <p>
              <b>Residential Address:</b>{" "}
              <AutoResizingInput
                style={{ ...inputStyle, width: "auto" }}
              />
            </p>
            <p>
              <b>Mobile Number:</b>{" "}
              <AutoResizingInput style={inputStyle} />
            </p>
            <p>
              <b>Email address:</b>{" "}
              <AutoResizingInput style={inputStyle} />
            </p>
            <p>
              <b>Bank Account Name:</b>{" "}
              <AutoResizingInput
                style={{ ...inputStyle, width: "auto" }}
              />
            </p>
            <p>
              <b>Bank Name:</b>{" "}
              <AutoResizingInput style={inputStyle} />
            </p>
            <p>
              <b>Bank Account Number:</b>{" "}
              <AutoResizingInput
                style={{ ...inputStyle, width: "auto" }}
              />
            </p>
            <p>
              <b>Bank Branch Name:</b>{" "}
              <AutoResizingInput style={inputStyle} />
            </p>

            {/* Disclaimer and Loan Facility Details */}
            <div>
              <p>
                (Vector Finance Limited will not be liable for any payments made to incorrect beneficiary based on banking
                information provided by the Borrower as above. Any payments made as such will be taken as payments made to
                the Borrower and will be treated as intended in this agreement.)
              </p>
              <p style={{ marginTop: "40px" }}>
                We refer to your application above and are pleased to offer you a loan facility as outlined below:
              </p>
            </div>

            <p>
              <b style={{ fontSize: "16.5px" }}>1. Facility Type:</b>{" "}
              <AutoResizingInput style={inputStyle} />
            </p>
            <p>
              <b style={{ fontSize: "16.5px" }}>2. Loan Amount:</b>{" "}
              <AutoResizingInput style={inputStyle} />
            </p>
            <p>
              <b>3. Purpose of Loan:</b>{" "}
              <AutoResizingInput style={{ ...inputStyle, width: "auto" }} />
            </p>
            <p>
              <b>4. Repayment:</b> The Customer must repay the loan in accordance with the repayment schedule set out in
              Schedule 1 hereto. The first Repayment Instalment must be repaid on the{" "}
              <AutoResizingInput style={inputStyle} />
              {" "}and subsequent Repayment Instalments must be repaid on each subsequent Payment Date.
            </p>
            <p style={{textAlign:'right'}}>
              <b>Initial:</b>{" "}
              <AutoResizingInput style={inputStyle} />
            </p>
            <p>
              <b>5. Term:</b> The term of the Loan will be from the Commencement Date.
            </p>

            {/* Interest & Charges */}
            <h4>6. Interest and Other Charges:</h4>
            <p>
              <b>6.1 Interest:</b> Interest shall accrue on the outstanding balance of the loan at the rate currently at 4%
              (four percent) per month. Interest shall be calculated on the daily cleared balance outstanding on the
              Borrower’s account on the basis of a 365-day year, irrespective of whether or not the year in question is a
              leap year (as varied from time to time). Such interest will be capitalized if not paid on the due date.
            </p>
            <p>
              <b>6.2 Other Fees and Charges:</b> The Borrower shall pay to the Lender:
            </p>
            <p>a) Drawdown Fees: A drawdown fee of K100.00 (Once off fee to be paid upfront).</p>
            <p>
              b) Arrangement Fees: Arrangement fee at 2% of the Loan Amount calculated monthly (To be paid in arrears on the due date).
            </p>
            <p>
              c) Documentation Fees: A documentation fee at 2% of the Loan Amount calculated monthly (To be paid in arrears on the due date).
            </p>
            <p>
              d) Loan Management Fee: A loan management fee at 3.5% of the Loan Amount calculated monthly (To be paid in arrears on the due date).
            </p>
            <p>
              e) Where Insurance is applicable, e.g. asset backed loan with security offsite, the Borrower shall bear the full cost
              of insurance and if paid by Lender, payment will be made directly to the insurance company and will be added to the
              total loan at 4% monthly interest and will be repayable in full at loan maturity date.
            </p>
            <p>
              f) Where asset tracking is applicable, e.g. offsite movable collateral, the Borrower agrees to avail asset for Tracker
              installation at own cost and if paid by the Lender, payment will be made directly to the Tracking company and will be
              added to the total loan at 4% monthly interest and will be repayable in full at loan maturity date. The Borrower agrees
              that tampering with the tracking device in any way will lead to breach of contract upon which the Lender exercises their
              right to terminate the contract and demand immediate and full settlement of outstanding amount.
            </p>

            {/* Loan Repayment Details */}
            <h4>7. Loan Repayments:</h4>
            <p>
              All loan repayments due to the Lender under this Agreement shall be made to the following bank account details in the
              name of Vector Finance Limited:
            </p>
            <p>Bank: Stanbic Bank (Zambia) Limited</p>
            <p>Branch: Woodlands</p>
            <p>Account Number: 9130006381913</p>
            <p>Sort Code: 040030</p>
            <p>Swift Code: SBICZMLX</p>
            <p style={{textAlign:'right'}}>
              <b>Initial:</b>{" "}
              <AutoResizingInput style={inputStyle} />
            </p>
            <p>
              The Borrower may however use other forms of repayment subject to approval from the Lender.
            </p>

            {/* Security Section */}
            <h4>8. Security:</h4>
            <p>
              The Customer will procure that the Lender receives the under mentioned security as a continuing security for all money
              obligations and liabilities certain or contingent now or hereafter due, owing or incurred by the Customer to the
              Lender, namely;{" "}
              <AutoResizingInput style={{ ...inputStyle, width: "auto" }} />
            </p>
            <p>
              (Sign:{" "}
              <AutoResizingInput style={inputStyle} />
              )
            </p>
            <p>
              (ownership documentation for security to be surrendered to Lender for the duration of the Facility)
            </p>

            {/* Default, Interest, Acceleration */}
            <h4>9. Default:</h4>
            <p>
              If the Customer defaults, the Lender shall be entitled, at its sole discretion and without prejudice to any of its other
              rights in law, to enforce/realize the security referred to above without notice to the Customer or claim immediate payment
              or performance by the Customer of all of the Customer’s obligations under this agreement.
            </p>
            <p>
              The Customer agrees that upon default, the Lender is at liberty to hand over the debt to Retune Investments Limited who have
              been duly contracted as debt collectors on behalf of the Lender. The debt collection fee is 10% of total amount due and
              will be borne by the Borrower in full.
            </p>
            <h4>10. Interest on Overdue Amounts:</h4>
            <p>
              If the Borrower fails to pay any amount payable by it under this Agreement on its due date, interest shall accrue on the overdue
              amount from the due date up to the date of actual payment at a rate of 10 per cent, per month. Any interest accruing under
              this Clause 10 shall be immediately payable by the Borrower on demand by the Lender.
            </p>
            <h4>11. Acceleration:</h4>
            <p>On and at any time after the occurrence of a default under this Agreement, the Lender may:</p>
            <p>11.1.1 cancel the Facility whereupon the Facility shall immediately be cancelled;</p>
            <p>
              11.1.2 declare that the Facility, together with accrued interest, and all other amounts accrued or outstanding under this agreement be immediately
              due and payable, whereupon they shall become immediately due and payable; and/or
            </p>
            <p>
              11.1.3 exercise any or all of its rights, remedies, powers or discretions under this agreement in relation to the Security.
            </p>
            <h4>12. Governing Law and Jurisdiction:</h4>
            <p>
              This agreement shall in all respects be construed by and in accordance with the laws of the Republic of Zambia. The parties hereby agree to submit
              any dispute to the non-exclusive jurisdiction of the Zambian Courts.
            </p>
            <h4>13. Definitions:</h4>
            <p>In this agreement:</p>
            <p>Final Maturity Date means</p>
            <p>First Repayment Date means</p>
            <p style={{textAlign:'right'}}>
              <b>Initial:</b>{" "}
              <AutoResizingInput style={inputStyle} />
            </p>
            <p>
              Repayment Instalment means each scheduled instalment for repayment of the Loan.
            </p>
            <p>
              IN WITNESS whereof the parties or duly authorized representatives of the parties have caused their hand and seal to be hereunto affixed on the day and year first before written.
            </p>
            <p>
              <b>WARNING</b>
              <br />
              If you sign this document, you will be legally bound by it. It is recommended that you obtain independent legal advice before you sign this document.
            </p>
            <p>
              Please note that you are entitled to a copy of this loan agreement.
            </p>

            {/* Execution Section */}
            <h4>EXECUTION</h4>
            <p>SIGNED by _______________________________________ ) _______________________________</p>
            <p>
              In the presence of:)<br />
              Witness
              <br />
              Name: <AutoResizingInput style={inputStyle} /><br />
              Address: <AutoResizingInput style={inputStyle} /><br />
              Occupation: <AutoResizingInput style={inputStyle} /><br />
              <DisplaySignature for="me" signature={this.props.signature}/>
            </p>
            <p>
              SIGNED by )<br />
              On behalf of Vector Finance Limited.
              <br />
              In the presence of:<br />
              Witness
              <br />
              Name: <AutoResizingInput style={inputStyle} /><br />
              Address: <AutoResizingInput style={inputStyle} /><br />
              Occupation: <AutoResizingInput style={inputStyle} /><br />
              <DisplaySignature for="witness" witnessSignature={this.props.witnessSignature}/>
            </p>
            <p style={{textAlign:'right'}}>
              <b>Initial:</b>{" "}
              <AutoResizingInput style={inputStyle} />
            </p>

            {/* Repayment Schedule */}
            {/* <h4>Schedule 1: Repayment Schedule</h4>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                  <tr>
                    <th style={tableHeaderStyle}>Payment Number</th>
                    <th style={tableHeaderStyle}>Due Date</th>
                    <th style={tableHeaderStyle}>Payment Amount</th>
                    <th style={tableHeaderStyle}>Principal</th>
                    <th style={tableHeaderStyle}>Interest & Fees</th>
                    <th style={tableHeaderStyle}>Remaining Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {[...Array(12).keys()].map((_, index) => (
                    <tr key={index}>
                      <td style={tableCellStyle}>{index + 1}</td>
                      <td style={tableCellStyle}>
                        <input type="text" />
                      </td>
                      <td style={tableCellStyle}>
                        <input type="text" />
                      </td>
                      <td style={tableCellStyle}>
                        <input type="text" />
                      </td>
                      <td style={tableCellStyle}>
                        <input type="text" />
                      </td>
                      <td style={tableCellStyle}>
                        <input type="text" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            <p style={{textAlign:'right'}}>
              Appendix
              <br />
              <b>Initial:</b>{" "}
              <AutoResizingInput style={inputStyle} />
            </p> */}
          </div>

          {/* Buttons */}
          <button
            className="btn btn-danger"
            onClick={this.saveHandwritingToAPI}
            style={{ marginTop: "20px" }}
          >
            Download PDF &amp; Proceed
          </button>

          <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
            <div style={{ width: "100%" }}>
              <button
                onClick={() => {
                  this.props.handleRenderPreviousForm();
                }}
                type="button"
                className="btn btn-success w-90 mt-3"
                id="confirm-btn"
              >
                Previous
              </button>
            </div>
            <div style={{ width: "100%", textAlign: "right" }}>
              {!this.props.isLastForm ? (
                <button
                  type="button"
                  className="btn btn-danger w-50 mt-3"
                  id="next-btn"
                  disabled={!this.state.formSaved}
                  onClick={() => {
                    this.props.handleRenderNextForm();
                  }}
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-danger w-90 mt-3"
                  id="next-btn"
                  disabled={!this.state.formSaved}
                  onClick={() => {
                    this.props.handleCompleteLoanApplication();
                  }}
                >
                  Submit Application
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
