import React from "react";
import LoadPdf from "../LoadPdf/LoadPdf";
import SaveSignature from "../SaveSignature/SaveSignature";


export default class FormSigning extends React.Component{
  render(){
    return <SaveSignature loggedInUser={this.props.loggedInUser} />
    return <LoadPdf pdfUrl="http://localhost:1350/uploads/Vector_Finance_Sales_agreement_form_799dea204b.pdf"/>
  }
}