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

export default class ContractOfLandSaleForm extends React.Component {
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
          const fileName = `ContractOfLandSaleForm__cid_${this.props.loggedInUser.id}_lid_${this.props.loggedInUser.currentLoan.id}.pdf`;
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
    }

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
        <div id="content-container" className="content-container">
          {/* Contract Header */}
          <h2 style={{ textAlign: "center" }}>CONTRACT OF SALE</h2>
          <p style={{ textAlign: "center" }}>Dated the day of <AutoResizingInput style={inputStyle} /> 2024</p>
          <p style={{ textAlign: "center" }}>(Vendor)</p>
          <p style={{ textAlign: "center" }}>and</p>
          <p style={{ textAlign: "center" }}>VECTOR FINANCE LIMITED (Purchasers)</p>

          {/* Title Section */}
          <h3 style={{ textAlign: "center" }}>CONTRACT AND CONDITIONS OF SALE</h3>
          <p style={{ textAlign: "center" }}>
            Relating to: <strong>Lusaka</strong>
          </p>
          <p style={{ textAlign: "center" }}>LAW ASSOCIATION OF ZAMBIA</p>

          {/* Agreement Intro */}
          <p>
            AN AGREEMENT made the day of <AutoResizingInput style={inputStyle} /> Two Thousand and Twenty Four
          </p>
          <p>
            BETWEEN, in Lusaka in the Republic of Zambia, (hereinafter called the "Vendor") of the one part and VECTOR FINANCE LIMITED, also of Lusaka in the Republic of Zambia (hereinafter called the "Purchaser") of the other part.
          </p>
          <p>
            WHEREBY IT IS AGREED that the Vendor will sell and the Purchaser will purchase the property as referred to in the accompanying particulars at the price set out therein. The Vendor and the Purchaser do, on their respective parts, agree to complete the said purchase on the said terms and conditions.
          </p>
          <p>
            AS WITNESS, the hands of the parties hereto or their duly authorized agents are set on the day and year first above written.
          </p>

          {/* Signature Intro */}
          <p>
            SIGNED by <strong>(Vendor)</strong> in the presence of:
          </p>
          <p>
            WITNESS<br />
            Name: <AutoResizingInput style={inputStyle} /><br />
            Address: <AutoResizingInput style={inputStyle} /><br />
            <DisplaySignature for="me" signature={this.props.signature}/>
          </p>
          <p>
            SIGNED by VECTOR FINANCE LIMITED <strong>(Purchaser)</strong> in the presence of:
          </p>
          <p>
            WITNESS<br />
            Name: <AutoResizingInput style={inputStyle} /><br />
            Address: <AutoResizingInput style={inputStyle} /><br />
            <DisplaySignature for="witness" witnessSignature={this.props.witnessSignature} />
          </p>

          {/* Particulars Section */}
          <h4>PARTICULARS</h4>
          <p>(Description of the Property)</p>
          <p>
            Leasehold property being ALL THAT Lusaka, measuring approximately 4,072 sq.m, which for the purpose of identification is more particularly delineated on the sketch plan annexed hereto and thereon bordered in red, EXCEPT and RESERVED all minerals, oils and precious stones whatsoever upon or under the said land.
          </p>

          {/* Special Conditions */}
          <h4>SPECIAL CONDITIONS</h4>
          <ol style={{ paddingLeft: "20px" }}>
            <li>
              The property is sold subject to the Law Association of Zambia General Conditions of Sale 1997 so far as the same are not inconsistent with or varied by these Special Conditions.
            </li>
            <li>
              The Vendor and the Purchaser are acting on their own behalf.
            </li>
            <li>
              The period fixed for obtaining State's consent and any other necessary license to assign shall be ten (10) days from the date the Vendor obtains the approved and numbered diagrams from the Surveyor General for the proposed subdivision.
            </li>
            <li>
              The date fixed for completion shall be within seven (7) days of the Vendor obtaining the Property Transfer Tax Clearance Certificate from the Zambia Revenue Authority, and such certificate shall be applied for within 7 days of receipt of the State's consent to assign relating to this transaction.
            </li>
            <li>
              The Vendor is selling as the beneficial owner.
            </li>
            <li>
              Title shall commence with the Certificate of Title issued in respect of the property being sold herein.
            </li>
            <li>
              Each party shall bear its own expenses incidental to the negotiation, implementation, and completion of this transaction including any legal costs.
            </li>
            <li>
              Clause 2 of the Law Association of Zambia General Conditions of Sale 1997 shall not apply to this contract as the parties have agreed that the Purchaser shall make payment of the purchase price as follows:
              <br />(a) A deposit upon exchange of contract; and
              <br />(b) The balance in ZMW within ______ months from the date of the contract.
            </li>
            <li>
              At exchange of contract, the Vendor will hand over the approved and numbered survey diagrams and title deeds regarding the portion contracted to be sold to the Purchaser.
            </li>
            <li>
              The property is sold free of any encumbrances.
            </li>
            <li>
              For avoidance of doubt, the Vendor will discharge property transfer tax to the Zambia Revenue Authority, ground rent to the Commissioner of Lands, and council rates to the applicable Council.
            </li>
            <li>
              The Purchaser shall be free to undertake any developments on the property contracted to be sold under this contract before full payment of the purchase price.
            </li>
            <li>
              In the event that completion of the property fails, the Purchaser shall be entitled to a refund of the full amount or, alternatively, the market value of the developments undertaken on the Premises.
            </li>
            <li>
              The Purchaser shall bear the cost of water rectifications if required on the property that is the subject of this contract.
            </li>
            <li>
              The Vendor warrants that it has good title to the property contracted to be sold and that no person or institution has any claims against the property adverse to the rights of the Vendor.
            </li>
            <li>
              No party is relying on any representations, promises, terms, conditions, or obligations—oral or written, express or implied—other than those contained in this agreement.
            </li>
            <li>
              This agreement supersedes all other agreements that may have been entered into, express or implied, oral or written, between the parties prior to or during the negotiation of the transaction.
            </li>
            <li>
              It is agreed that this purchase shall be completed in the name of the Purchaser or in the name of any person or body corporate to be nominated by the Purchaser.
            </li>
            <li>
              This contract is subject to and shall be interpreted in accordance with the Laws of Zambia, and each party submits itself to the jurisdiction of the Courts of Zambia.
            </li>
          </ol>
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
