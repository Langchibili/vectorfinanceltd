import React from "react"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import { scrolltoTopOFPage } from "@/Functions"
import DisplaySignature from "@/components/Includes/DisplaySignature/DisplaySignature"
import { api_url, getJwt } from "@/Constants"

export default class NewLoanForm extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        formSaved: false
      }
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
        const fileName = `LoanApplicationForm_clientid_${this.props.loggedInUser.id}.pdf`;
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
          });
  
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
  };
  

  
  componentDidMount(){
    scrolltoTopOFPage()
  }

  render() {
    const inputStyle = {
      color: 'black',
      fontWeight: 'bold',
      paddingLeft: '2px',
      borderBottom: '1px solid #3228287a',
      borderStyle: 'dashed',
      marginBottom: '5px',
      height: '25px',
      width: 'auto',
      minWidth: '50px',
      flexGrow: 1,
      verticalAlign: 'text-top'
    }

    
const tableHeaderStyle = {
    padding: '8px',
    border: '1px solid #ccc',
    backgroundColor: '#f9f9f9',
    textAlign: 'left',
  }
  
  const tableCellStyle = {
    padding: '8px',
    border: '1px solid #ccc',
  }

    return (
        <div style={{ width: '100%', margin: '0 auto' }}>
          <div>
            <div id="content-container" className="content-container">
              <h2>VECTOR FINANCE LIMITED (the “Lender”)</h2>
              <h3>Application Form</h3>
  
              <p>
                <b>Client Number:</b> <input type="text" style={inputStyle} />
              </p>
              <p>
                <b>Date:</b> <input type="text" style={inputStyle} /> (the “Commencement Date”)
              </p>
              <p>
                <b>Name:</b> <input type="text" style={inputStyle} /> (the “Customer” or the
                “Borrower”)
              </p>
              <p>
                <b>Title:</b> <input type="text" style={inputStyle} />
              </p>
              <p>
                <b>Gender:</b> <input type="text" style={inputStyle} />
              </p>
              <p>
                <b>Date of Birth:</b> <input type="text" style={inputStyle} />
              </p>
              <p>
                <b>ID Number/NRC:</b> <input type="text" style={inputStyle} />
              </p>
              <p>
                <b>Residential Address:</b>{' '}
                <input type="text" style={{ ...inputStyle, width: '80%' }} />
              </p>
              <p>
                <b>Mobile Number:</b> <input type="text" style={inputStyle} />
              </p>
              <p>
                <b>Email Address:</b> <input type="text" style={inputStyle} />
              </p>
              <p>
                <b>Bank Account Name:</b>{' '}
                <input type="text" style={{ ...inputStyle, width: '70%' }} />
              </p>
              <p>
                <b>Bank Name:</b> <input type="text" style={inputStyle} />
              </p>
              <p>
                <b>Bank Account Number:</b>{' '}
                <input type="text" style={{ ...inputStyle, width: '60%' }} />
              </p>
              <p>
                <b>Bank Branch Name:</b> <input type="text" style={inputStyle} />
              </p>
  
              <h4>Loan Terms and Conditions</h4>
              <p>
                We refer to your application above and are pleased to offer you a loan facility as
                outlined below:
              </p>
  
              <h5>Facility Type:</h5>
              <p>
                <input type="text" style={inputStyle} />
              </p>
  
              <h5>Loan Amount:</h5>
              <p>
                <input type="text" style={inputStyle} />
              </p>
  
              <h5>Purpose of Loan:</h5>
              <p>
                <input type="text" style={{ ...inputStyle, width: '80%' }} />
              </p>
  
              <h5>Repayment Terms:</h5>
              <p>
                The loan shall be repaid in equal monthly installments over the agreed tenure, starting
                on <input type="text" style={inputStyle} /> and ending on{' '}
                <input type="text" style={inputStyle} />.
              </p>
              <p>
                <b>Interest:</b> Shall accrue at a rate of 4% per month on the outstanding balance.
              </p>
              <p>
                <b>Other Fees and Charges:</b> Drawdown Fees, Arrangement Fees, Loan Management Fees,
                etc.
              </p>
  
              <h5>Default:</h5>
              <p>
                If the Borrower defaults, the lender may enforce security, hand over to a debt
                collector, or impose additional penalties.
              </p>
  
              <h5>Acceleration:</h5>
              <p>
                In case of default, the loan may be canceled, and all outstanding amounts will be
                immediately due.
              </p>
  
              <h5>Governing Law:</h5>
              <p>This agreement is governed by Zambian law.</p>
  
              <h4>Execution:</h4>
              <p>
                <b>Signed by:</b> <input type="text" style={inputStyle} /> on behalf of Vector Finance
                Limited.
              </p>
              <DisplaySignature for="me" signature={this.props.signature}/>
              <p>
                <b>Witness:</b> <input type="text" style={inputStyle} />
              </p>
              <DisplaySignature for="witness" witnessSignature={this.props.witnessSignature}/>
              <h4>Schedule 1: Repayment Schedule</h4>
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
            </div>
  
            {/* <button onClick={this.exportToPDF} style={{ marginTop: '20px' }}>
              Download as PDF
            </button> */}
            <button onClick={this.saveHandwritingToAPI} style={{ marginTop: '20px' }}>
              Download as PDF
            </button>
            
                  <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                    <div style={{ width: "100%" }}>
                      <button
                        // disabled={this.state.saving}
                        onClick={()=>{this.props.handleRenderPreviousForm()}}
                        type="button"
                        className="btn btn-success w-90 mt-3"
                        id="confirm-btn"
                        // Submit button logic to be handled separately
                      >
                        Previous
                      </button>
                    </div>
                   <div style={{ width: "100%", textAlign: "right" }}>
                      {!this.props.isLastForm? <button
                        type="button"
                        className="btn btn-danger w-50 mt-3"
                        id="next-btn"
                        disabled={!this.state.formSaved}
                        onClick={()=>{this.props.handleRenderNextForm()}}
                      >
                        Next
                      </button> :
                      <button
                        type="button"
                        className="btn btn-danger w-90 mt-3"
                        id="next-btn"
                        disabled={!this.state.formSaved}
                        onClick={()=>{this.props.handleCompleteLoanApplication}}
                      >
                        Submit Application
                      </button>}
                    </div>
                  </div>
          </div>
        </div>
      )
  }
  
}

