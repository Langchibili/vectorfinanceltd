import React from "react";
import LoadPdf from "../LoadPdf/LoadPdf";


export default class FormSigning extends React.Component{
  render(){
    return <LoadPdf pdfUrl="http://localhost:1350/uploads/Vector_Finance_Sales_agreement_form_799dea204b.pdf"/>
  }
}