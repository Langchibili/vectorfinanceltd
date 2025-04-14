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

export default class LoanGuarantorForm extends React.Component {
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
        const fileName = `LoanGuarantorForm_cid_${this.props.loggedInUser.id}_lid_${this.props.loggedInUser.currentLoan.id}.pdf`;
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

    // Monitor image load events before PDF generation
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
        <div
          id="content-container"
          className="content-container"
          style={{ padding: "20px" }}
        >
          {/* Header */}
          <h2 style={{ textAlign: "center" }}>VECTOR FINANCE LIMITED</h2>
          <p style={{ textAlign: "center" }}>
            (PLOT 15 LAGOS ROAD, GARDEN VIEW PROPERTIES, RHODES PARK, LUSAKA, ZAMBIA)
          </p>
          <h3 style={{ textAlign: "center" }}>LOAN GUARANTOR’S FORM</h3>

          {/* Guarantor Details */}
          <p>
            I <AutoResizingInput style={inputStyle} /> , of address{" "}
            <AutoResizingInput style={inputStyle} />, holder of ID number{" "}
            <AutoResizingInput style={inputStyle} />, on this date of{" "}
            <AutoResizingInput style={inputStyle} />, do hereby accept being the guarantor for Mr./Miss./Mrs.{" "}
            <AutoResizingInput style={inputStyle} />, holder of ID number{" "}
            <AutoResizingInput style={inputStyle} />, of address{" "}
            <AutoResizingInput style={inputStyle} />, for the loan amount of k{" "}
            <AutoResizingInput style={inputStyle} />.
          </p>

          {/* Guarantor Signature */}
          <p>
            Guarantor’s {" "} <DisplaySignature for="me" signature={this.props.signature}/>
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
