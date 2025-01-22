import React from "react"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import SaveSignature from "@/components/Includes/SaveSignature/SaveSignature"
import { scrolltoTopOFPage } from "@/Functions"

export default class SalesAgreementForm extends React.Component {
    exportToPDF = () => {
        const element = document.getElementById("sales-agreement-form")
        const padding = 20 // Padding in mm
        const pageWidth = 210 // A4 width in mm
        const pageHeight = 297 // A4 height in mm
      
        html2canvas(element, { scale: 2 }).then((canvas) => {
          const imgData = canvas.toDataURL("image/png")
          const canvasWidth = canvas.width
          const canvasHeight = canvas.height
          const pdf = new jsPDF("p", "mm", "a4")
      
          // Scaling factor to fit the content width to the PDF width with padding
          const scaleFactor = (pageWidth - padding * 2) / canvasWidth
          const scaledCanvasHeight = canvasHeight * scaleFactor
          const availableHeight = pageHeight - padding * 2
      
          let yOffset = 0 // To track the height offset in the canvas
          while (yOffset < canvasHeight) {
            const currentHeight = Math.min(availableHeight / scaleFactor, canvasHeight - yOffset)
      
            // Add a slice of the canvas to the PDF
            const canvasSlice = document.createElement("canvas")
            canvasSlice.width = canvasWidth
            canvasSlice.height = currentHeight
      
            const context = canvasSlice.getContext("2d")
            context.drawImage(
              canvas,
              0,
              yOffset,
              canvasWidth,
              currentHeight,
              0,
              0,
              canvasWidth,
              currentHeight
            )
      
            const imgSlice = canvasSlice.toDataURL("image/png")
            if (yOffset > 0) pdf.addPage()
            pdf.addImage(
              imgSlice,
              "PNG",
              padding,
              padding,
              pageWidth - padding * 2,
              (currentHeight * scaleFactor)
            )
      
            yOffset += currentHeight
          }
      
          pdf.save("Vehicle_Sales_Agreement_clientid_"+this.props.loggedInUser.id+".pdf")
        })
      }

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
          verticalAlign: 'text-top',
          flexGrow: 1, // Ensure it grows as needed
        }
    
        return (
          <div style={{ width: '100%', margin: '0 auto' }}>
            <div>
              <div id="sales-agreement-form" className="sales-agreement-form">
                <h1 className="title">VEHICLE SALES AGREEMENT</h1>
                <p className="paragraph">
                  THIS VEHICLE SALES AGREEMENT is made this{' '}
                  <input
                    type="text"
                    className="form-input short"
                    style={inputStyle}
                  />{' '}
                  day of{' '}
                  <input
                    type="text"
                    className="form-input medium"
                    style={inputStyle}
                  />, 2023, by and among{' '}
                  <input type="text" className="form-input long" style={inputStyle} />{' '}
                  (hereinafter known as "Seller") and{' '}
                  <input type="text" className="form-input long" style={inputStyle} />{' '}
                  (hereinafter known as "Buyer”). Buyer and Seller shall collectively
                  be known herein as "the Parties".
                </p>
    
                <h2 className="subtitle">BACKGROUND</h2>
                <p className="paragraph">
                  WHEREAS, Seller desires to sell the vehicle described below, known
                  herein as the "Acquired Vehicle," under the terms and conditions set
                  forth below;
                </p>
                <p className="paragraph">
                  WHEREAS, Buyer desires to purchase the Acquired Vehicle offered for
                  sale by Seller under the terms and conditions set forth below; and,
                  therefore,
                </p>
    
                <h2 className="subtitle">TERMS AND CONDITIONS</h2>
                <p className="paragraph">
                  IN CONSIDERATION of the mutual promises and other valuable
                  consideration exchanged by the Parties as set forth herein, the
                  Parties, intending to be legally bound, hereby agree as follows:
                </p>
    
                <ol className="terms" style={{paddingLeft:'0'}}>
                  <li>
                    <p className="paragraph">Description of Acquired Vehicle:</p>
                    <ul style={{paddingLeft:'0'}}>
                      {[
                        'Make',
                        'Model',
                        'Body Type',
                        'Body Color',
                        'Year',
                        'Vehicle Chassis Number',
                        'Vehicle Registration Number',
                      ].map((field, index) => (
                        <li key={index}>
                          <p className="paragraph">
                            <strong>{field}:</strong>{' '}
                            <input type="text" className="form-input long" style={inputStyle} />
                          </p>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li>
                    <p className="paragraph">
                      <strong>Consideration:</strong>
                    </p>
                    <p className="paragraph">
                      Purchase Price. The total purchase price to be paid by Buyer to
                      Seller for the Acquired Vehicle is K{' '}
                      <input type="text" className="form-input medium" style={inputStyle} /> (ZMW{' '}
                      <input type="text" className="form-input medium" style={inputStyle} />
                      ).
                    </p>
                    <p className="paragraph">
                      Payment is to be made by the Buyer to Seller in cash, by certified
                      check, bank transfer, or through another instrument acceptable to
                      Seller.
                    </p>
                  </li>
                  <li>
                    <p className="paragraph">
                      <strong>
                        Delivery of Acquired Vehicle and Conveyance of Title:
                      </strong>
                    </p>
                    <p className="paragraph">
                      Delivery of Acquired Vehicle: Seller shall deliver the Acquired
                      Vehicle, and Buyer shall take possession of the same, at Seller's
                      premises (either in person or through a third party) on or before{' '}
                      <input type="text" className="form-input medium" style={inputStyle} /> 2023.
                    </p>
                    <p className="paragraph">
                      Conveyance of Title: Seller shall convey title to Buyer upon full
                      receipt of the agreed consideration amount of K{' '}
                      <input type="text" className="form-input medium" style={inputStyle} /> (ZMW).
                    </p>
                  </li>
                </ol>
    
                <h2 className="subtitle">IN WITNESS WHEREOF</h2>
          <p className="paragraph">
            Acknowledging acceptance and agreement of the foregoing, Seller and
            Buyer affix their signatures hereto.
          </p>

          <div className="signatures">
            <div className="signature-block">
              <p>SELLER</p>
              <p>
                Name: <input  style={inputStyle} type="text" className="form-input medium" />
              </p>
              <p>
                Signature: <input  style={inputStyle} type="text" className="form-input medium" />
              </p>
              <p>
                Date: <input  style={inputStyle} type="text" className="form-input short" />
              </p>
            </div>

            <div className="signature-block">
              <p>BUYER</p>
              <p>
                Name: <input  style={inputStyle} type="text" className="form-input medium" />
              </p>
              <p>
                Signature: <input  style={inputStyle} type="text" className="form-input medium" />
              </p>
              <p>
                Date: <input  style={inputStyle} type="text" className="form-input short" />
              </p>
            </div>

            <div className="signature-block">
              <p>WITNESS</p>
              <p>
                Name: <input  style={inputStyle} type="text" className="form-input medium" />
              </p>
              <p>
                Signature: <input  style={inputStyle} type="text" className="form-input medium" />
              </p>
              <p>
                Date: <input  style={inputStyle} type="text" className="form-input short" />
              </p>
              <p>Your signature</p>
            </div>
          </div>

              </div>
    
              <button onClick={this.exportToPDF} style={{ marginTop: '20px' }}>
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
                        // disabled={!isFormValid || !saved}
                        onClick={()=>{this.props.handleRenderNextForm()}}
                      >
                        Next
                      </button> :
                      <button
                        type="button"
                        className="btn btn-danger w-90 mt-3"
                        id="next-btn"
                         // disabled={!this.state.isFormValid}
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