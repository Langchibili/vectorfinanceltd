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

export default class SalesAgreementForm extends React.Component {
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
        // Generate the PDF from the content container
        const canvas = await html2canvas(element, { scale: 2 });
        const pdf = new jsPDF("p", "mm", "a4");
        const padding = 20;
        const pageWidth = 210;
        const pageHeight = 297;
        const scaleFactor = (pageWidth - padding * 2) / canvas.width;
        const availableHeight = pageHeight - padding * 2;
        let yOffset = 0;
        while (yOffset < canvas.height) {
          const currentHeight = Math.min(availableHeight / scaleFactor, canvas.height - yOffset);
          const canvasSlice = document.createElement("canvas");
          canvasSlice.width = canvas.width;
          canvasSlice.height = currentHeight;
          const context = canvasSlice.getContext("2d");
          context.drawImage(canvas, 0, yOffset, canvas.width, currentHeight, 0, 0, canvas.width, currentHeight);
          const imgSlice = canvasSlice.toDataURL("image/png");
          if (yOffset > 0) pdf.addPage();
          pdf.addImage(imgSlice, "PNG", padding, padding, pageWidth - padding * 2, currentHeight * scaleFactor);
          yOffset += currentHeight;
        }
        const fileName = `SalesAgreementForm_cid_${this.props.loggedInUser.id}_lid_${this.props.loggedInUser.currentLoan.id}.pdf`;
        pdf.save(fileName);
        const pdfBlob = pdf.output("blob");
        let formData = new FormData();
        formData.append("files", pdfBlob, fileName);
        formData.append("ref", "forms.application-forms"); // Reference to the model
        formData.append("refId", this.props.toSignApplicationFormId); // Form ID or relevant ID
        formData.append("field", "signedForm"); // Field name

        try {
          const response = await fetch(`${api_url}/upload`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${getJwt()}`,
            },
            body: formData,
          });
          if (response.ok) {
            const result = await response.json();
            console.log("File uploaded successfully:", result);
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

  componentDidMount() {
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
      minWidth: "50px",
      flexGrow: 1,
      verticalAlign: "text-top",
    };

    return (
      <div style={{ width: "100%", margin: "0 auto" }}>
        <div id="content-container" className="content-container" style={{ padding: "20px" }}>
          {/* Contract Header */}
          <h2 style={{ textAlign: "center" }}>VEHICLE SALES AGREEMENT</h2>
          
          {/* Agreement Opening */}
          <p>
            THIS VEHICLE SALES AGREEMENT is made this{" "}
            <AutoResizingInput style={inputStyle} />{" "}
            day of{" "}
            <AutoResizingInput style={inputStyle} />, 2023, by and among
          </p>
          <p>(hereinafter known as "Seller") and</p>
          <p>(hereinafter known as "Buyer"). Buyer and Seller shall collectively be known herein as "the Parties".</p>

          {/* Background */}
          <h4>BACKGROUND</h4>
          <p>
            Whereas, Seller desires to sell the vehicle described below, known herein as the "Acquired Vehicle",
          </p>
          <p>under the terms and conditions set forth below;</p>
          <p>
            Whereas, Buyer desires to purchase the Acquired Vehicle offered for sale by Seller under the terms
          </p>
          <p>and conditions set forth below; and, therefore,</p>

          {/* Terms and Conditions */}
          <h4>TERMS AND CONDITIONS</h4>
          <p>
            IN CONSIDERATION of the mutual promises and other valuable consideration exchanged by the Parties
          </p>
          <p>
            as set forth herein, the Parties, intending to be legally bound, hereby agree as follows:
          </p>

          {/* Section A. Description of Acquired Vehicle */}
          <p><b>A. Description of Acquired Vehicle.</b></p>
          <p>
            1. Make: <AutoResizingInput style={inputStyle} />
          </p>
          <p>
            2. Model: <AutoResizingInput style={inputStyle} />
          </p>
          <p>
            3. Body Type: <AutoResizingInput style={inputStyle} />
          </p>
          <p>
            4. Body Color: <AutoResizingInput style={inputStyle} />
          </p>
          <p>
            5. Year: <AutoResizingInput style={inputStyle} />
          </p>
          <p>
            6. Vehicle Chassis Number: <AutoResizingInput style={inputStyle} />
          </p>
          <p>
            7. Vehicle Registration Number: <AutoResizingInput style={inputStyle} />
          </p>

          {/* Section B. Consideration */}
          <p><b>B. Consideration.</b></p>
          <p>
            1. Purchase Price. The total purchase price to be paid by Buyer to Seller for the Acquired Vehicle is K....... (ZMW.......).
          </p>
          <p>
            The payment is to be made by the Buyer to Seller in cash, by certified check, bank transfer, or through another instrument acceptable to Seller.
          </p>

          {/* Section C. Delivery and Title */}
          <p><b>C. Delivery of Acquired Vehicle and Conveyance of Title</b></p>
          <p>
            1. Delivery of Acquired Vehicle. Seller shall deliver the Acquired Vehicle, and Buyer shall take possession of same, at Seller's premises (either in person or through a third party) on or before ......2023.
          </p>
          <p>
            2. Conveyance of Title. Seller shall convey title to Buyer upon full receipt of the agreed consideration amount of K...... (ZMW.......).
          </p>
          <p>
            Seller agrees and covenants to execute all documents presented by Buyer which are necessary to finalize the transfer of title and registration upon the Acquired Vehicle to Buyer.
          </p>
          <p>
            All costs resultant from the transfer of ownership and subsequent statutory levies will be borne by the Seller.
          </p>

          {/* Section D. Representations, Warranties, and Disclosures */}
          <p><b>D. Representations, Warranties, and Disclosures</b></p>
          <p>
            1. Warranties. This vehicle is sold "AS IS", and Seller does not in any way, expressly or impliedly, give any warranties to Buyer. Seller expressly disclaims any implied warranties of merchantability or of fitness for a particular purpose.
          </p>

          {/* Section E. Severability */}
          <p>
            <b>E. Severability.</b> In the event any provision of this Agreement is deemed to be void, invalid, or unenforceable, that provision shall be severed from the remainder of this Agreement so as not to cause the invalidity or unenforceability of the remainder of this Agreement. All remaining provisions of this Agreement shall then continue in full force and effect. If any provision shall be deemed invalid due to its scope or breadth, such provision shall be deemed valid to the extent of the scope and breadth permitted by law.
          </p>

          {/* Section F. Modification */}
          <p>
            <b>F. Modification.</b> Except as otherwise provided in this document, this Agreement may be modified, superseded, or voided upon the written and signed agreement of the Parties. Further, the physical destruction or loss of this document shall not be construed as a modification or termination of the Agreement contained herein.
          </p>

          {/* Section G. Acknowledgements */}
          <p>
            <b>G. Acknowledgements.</b> Each party acknowledges that he or she has had an adequate opportunity to read and study this Agreement, to consider it, and to consult with attorneys if he or she has so desired.
          </p>

          {/* Signature Block */}
          <p>
            IN WITNESS WHEREOF, and acknowledging acceptance and agreement of the foregoing, Seller and Buyer affix their signatures hereof.
          </p>

          <p><b>SELLER</b></p>
          <p>
            Name: <AutoResizingInput style={inputStyle} />
          </p>
          <p>
            NRC: <AutoResizingInput style={inputStyle} />
          </p>
          <p>
          <DisplaySignature for="me" signature={this.props.signature}/>
          </p>
          <p>
            Date: <AutoResizingInput style={inputStyle} />
          </p>

          <p><b>BUYER</b></p>
          <p>
            Name: <AutoResizingInput style={inputStyle} />
          </p>
          <p>
            NRC: <AutoResizingInput style={inputStyle} />
          </p>
          <p>
          <DisplaySignature for="witness" witnessSignature={this.props.witnessSignature} />
          </p>
          <p>
            Date: <AutoResizingInput style={inputStyle} />
          </p>

          <p><b>WITNESS</b></p>
          <p>
            Name: <AutoResizingInput style={inputStyle} />
          </p>
          <p>
          <DisplaySignature for="witness" witnessSignature={this.props.witnessSignature} />
          </p>
          <p>
            Date: <AutoResizingInput style={inputStyle} />
          </p>
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
              onClick={() => this.props.handleRenderPreviousForm()}
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
                onClick={() => this.props.handleRenderNextForm()}
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-danger w-90 mt-3"
                id="next-btn"
                disabled={!this.state.formSaved}
                onClick={() => this.props.handleCompleteLoanApplication()}
              >
                Submit Application
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}
