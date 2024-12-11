import React from "react"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

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
      
          pdf.save("Vehicle_Sales_Agreement.pdf")
        })
      }
      render() {
        const inputStyle = {
          color: 'black',
          fontWeight: 'bold',
          paddingLeft: '2px',
          borderBottom: '1px solid #3228287a',
          borderStyle: 'dashed',
          marginBottom: '5px',
          width: 'auto',
          minWidth: '50px',
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
            </div>
          </div>

              </div>
    
              <button onClick={this.exportToPDF} style={{ marginTop: '20px' }}>
                Download as PDF
              </button>
            </div>
          </div>
        )
      }
//   render() {
//     return (
//       <div style={{width:'100%', margin:'0 auto'}}>
//         <div>
//         <div id="sales-agreement-form" className="sales-agreement-form">
//           <h1 className="title">VEHICLE SALES AGREEMENT</h1>
//           <p className="paragraph">
//             THIS VEHICLE SALES AGREEMENT is made this{" "}
//             <input type="text" className="form-input short" style={{ width:'50px',marginBottom: "5px",color:'black', fontWeight:'bold',paddingLeft:'2px', borderBottom:'1px solid #3228287a', borderStyle:'dashed' }} /> day of{" "}
//             <input type="text" className="form-input medium" style={{ marginBottom: "5px",color:'black', fontWeight:'bold',paddingLeft:'2px', borderBottom:'1px solid #3228287a', borderStyle:'dashed' }} />, 2023, by and among{" "}
//             <input type="text" className="form-input long" />{" "}
//             (hereinafter known as "Seller") and{" "}
//             <input type="text" className="form-input long" style={{ marginBottom: "5px",color:'black', fontWeight:'bold',paddingLeft:'2px', borderBottom:'1px solid #3228287a', borderStyle:'dashed' }} />{" "}
//             (hereinafter known as "Buyer”). Buyer and Seller shall collectively
//             be known herein as "the Parties".
//           </p>

//           <h2 className="subtitle">BACKGROUND</h2>
//           <p className="paragraph">
//             WHEREAS, Seller desires to sell the vehicle described below, known
//             herein as the "Acquired Vehicle," under the terms and conditions set
//             forth below;
//           </p>
//           <p className="paragraph">
//             WHEREAS, Buyer desires to purchase the Acquired Vehicle offered for
//             sale by Seller under the terms and conditions set forth below; and,
//             therefore,
//           </p>

//           <h2 className="subtitle">TERMS AND CONDITIONS</h2>
//           <p className="paragraph">
//             IN CONSIDERATION of the mutual promises and other valuable
//             consideration exchanged by the Parties as set forth herein, the
//             Parties, intending to be legally bound, hereby agree as follows:
//           </p>

//           <ol className="terms">
//             <li>
//               <p className="paragraph">Description of Acquired Vehicle:</p>
//               <ul>
//                 {[
//                   "Make",
//                   "Model",
//                   "Body Type",
//                   "Body Color",
//                   "Year",
//                   "Vehicle Chassis Number",
//                   "Vehicle Registration Number",
//                 ].map((field, index) => (
//                   <li key={index}>
//                     <p className="paragraph">
//                       <strong>{field}:</strong>{" "}
//                       <input type="text" className="form-input long" />
//                     </p>
//                   </li>
//                 ))}
//               </ul>
//             </li>
//             <li>
//               <p className="paragraph">
//                 <strong>Consideration:</strong>
//               </p>
//               <p className="paragraph">
//                 Purchase Price. The total purchase price to be paid by Buyer to
//                 Seller for the Acquired Vehicle is K{" "}
//                 <input type="text" className="form-input medium" /> (ZMW{" "}
//                 <input type="text" className="form-input medium" />
//                 ).
//               </p>
//               <p className="paragraph">
//                 Payment is to be made by the Buyer to Seller in cash, by certified
//                 check, bank transfer, or through another instrument acceptable to
//                 Seller.
//               </p>
//             </li>
//             <li>
//               <p className="paragraph">
//                 <strong>
//                   Delivery of Acquired Vehicle and Conveyance of Title:
//                 </strong>
//               </p>
//               <p className="paragraph">
//                 Delivery of Acquired Vehicle: Seller shall deliver the Acquired
//                 Vehicle, and Buyer shall take possession of the same, at Seller's
//                 premises (either in person or through a third party) on or before{" "}
//                 <input type="text" className="form-input medium" /> 2023.
//               </p>
//               <p className="paragraph">
//                 Conveyance of Title: Seller shall convey title to Buyer upon full
//                 receipt of the agreed consideration amount of K{" "}
//                 <input type="text" className="form-input medium" /> (ZMW).
//               </p>
//               <p className="paragraph">
//                 Seller agrees and covenants to execute all documents presented by
//                 Buyer which are necessary to finalize the transfer of title and
//                 registration upon the Acquired Vehicle to Buyer. All costs
//                 resultant from the transfer of ownership and subsequent statutory
//                 levies will be borne by the Seller.
//               </p>
//             </li>
//           </ol>

//           <h2 className="subtitle">
//             Representations, Warranties, and Disclosures
//           </h2>
//           <p className="paragraph">
//             Warranties: This vehicle is sold "AS IS," and Seller does not in any
//             way, expressly or impliedly, give any warranties to Buyer. Seller
//             expressly disclaims any implied warranties of merchantability or of
//             fitness for a particular purpose.
//           </p>
//           <p className="paragraph">
//             Severability: In the event any provision of this Agreement is deemed
//             to be void, invalid, or unenforceable, that provision shall be severed
//             from the remainder of this Agreement so as not to cause the invalidity
//             or unenforceability of the remainder of this Agreement. All remaining
//             provisions of this Agreement shall then continue in full force and
//             effect.
//           </p>
//           <p className="paragraph">
//             Modification: Except as otherwise provided in this document, this
//             Agreement may be modified, superseded, or voided only upon the written
//             and signed Agreement of the Parties.
//           </p>
//           <p className="paragraph">
//             Acknowledgements: Each party acknowledges that he or she has had an
//             adequate opportunity to read and study this Agreement, to consider it,
//             and to consult with attorneys if he or she has so desired.
//           </p>

//           <h2 className="subtitle">IN WITNESS WHEREOF</h2>
//           <p className="paragraph">
//             Acknowledging acceptance and agreement of the foregoing, Seller and
//             Buyer affix their signatures hereto.
//           </p>

//           <div className="signatures">
//             <div className="signature-block">
//               <p>SELLER</p>
//               <p>
//                 Name: <input type="text" className="form-input medium" />
//               </p>
//               <p>
//                 Signature: <input type="text" className="form-input medium" />
//               </p>
//               <p>
//                 Date: <input type="text" className="form-input short" />
//               </p>
//             </div>

//             <div className="signature-block">
//               <p>BUYER</p>
//               <p>
//                 Name: <input type="text" className="form-input medium" />
//               </p>
//               <p>
//                 Signature: <input type="text" className="form-input medium" />
//               </p>
//               <p>
//                 Date: <input type="text" className="form-input short" />
//               </p>
//             </div>

//             <div className="signature-block">
//               <p>WITNESS</p>
//               <p>
//                 Name: <input type="text" className="form-input medium" />
//               </p>
//               <p>
//                 Signature: <input type="text" className="form-input medium" />
//               </p>
//               <p>
//                 Date: <input type="text" className="form-input short" />
//               </p>
//             </div>
//           </div>
//         </div>

//         <button onClick={this.exportToPDF} style={{ marginTop: "20px"}}>
//           Download as PDF
//         </button>
//       </div>
//       </div>
//     )
//   }
}