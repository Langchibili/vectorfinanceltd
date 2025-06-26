"use client";

import React from "react";
import { Zoom } from "@material-ui/core";
import { Alert } from "@mui/material";
import ContractOfLandSaleForm from "./ContractOfLandSaleForm/ContractOfLandSaleForm";
import LoanGuarantorForm from "./LoanGuarantorForm/LoanGuarantorForm";
import { scrolltoTopOFPage } from "@/Functions";
import VehicleLoanForm from "./NewLoanForm/VehicleLoanForm";
import GeneralLoanForm from "./NewLoanForm/GeneralLoanForm";

export default class LoadForm extends React.Component {
    componentDidMount(){
        scrolltoTopOFPage()
    } 
    renderForm = ()=>{
        const form = this.props.form
        const getToSignApplicationFormId  = this.props.toSignApplicationForms.filter(formToSign => formToSign.formName === form.formName)
        
        if(!getToSignApplicationFormId[0]){
            return <Alert severity="error">Sorry, a problem occured while loading the form, reflesh the page or go back and reflesh the page.</Alert>
        }
        if(form.formName === "GeneralLoanForm"){
            return <GeneralLoanForm {...this.props} toSignApplicationFormId={getToSignApplicationFormId[0].id}/>
        }
        else if(form.formName === "VehicleLoanForm"){
            return <VehicleLoanForm {...this.props} toSignApplicationFormId={getToSignApplicationFormId[0].id}/>
        }
        else if(form.formName === "contractOfLandSaleForm"){
            return <ContractOfLandSaleForm {...this.props} toSignApplicationFormId={getToSignApplicationFormId[0].id}/>
        }
        else if(form.formName === "loanGuarantorForm"){
            return <LoanGuarantorForm {...this.props} toSignApplicationFormId={getToSignApplicationFormId[0].id}/>
        }
        else {
            return <Alert severity="error">Sorry, a problem occured while loading the form, reflesh the page or go back and reflesh the page.</Alert>
        }
    }
    render() {
        return (
        <Zoom in={true}>
            {this.renderForm()}
        </Zoom>
       )
   }
}
