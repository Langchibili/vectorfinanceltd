"use client";

import React from "react";
import { Zoom } from "@material-ui/core";
import { Alert } from "@mui/material";
import ContractOfLandSaleForm from "./ContractOfLandSaleForm/ContractOfLandSaleForm";
import LoanGuarantorForm from "./LoanGuarantorForm/LoanGuarantorForm";
import { getLoanFromId, getUserById, scrolltoTopOFPage } from "@/Functions";
import VehicleLoanForm from "./NewLoanForm/VehicleLoanForm";
import GeneralLoanForm from "./NewLoanForm/GeneralLoanForm";
import CivilServantLoansForm from "./NewLoanForm/CivilServantLoansForm";
import FormSkeleton from "@/components/Includes/Skeletons/FormSkeleton"
export default class LoadForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentLoanType: null
        }
    }
    componentDidMount() {
        const getCurrentLoanType = async () => {
            if (this.props.loggedInUser) {
                const loan = await getUserById(this.props.loggedInUser.id, 'loan')
                if (loan.hasOwnProperty('id')) {
                    const loanWithType = await getLoanFromId(this.props.loggedInUser.id, 'loanType')
                    const loanType = loanWithType?.loanType?.data?.attributes?.typeName || 'assetBased'
                    this.setState({
                        currentLoanType: loanType
                    })
                }
            }
        }
        getCurrentLoanType()
        scrolltoTopOFPage()
    }
    renderForm = () => {
        const form = this.props.form
        const getToSignApplicationFormId = this.props.toSignApplicationForms.filter(formToSign => formToSign.formName === form.formName)
        if (!getToSignApplicationFormId[0]) {
            return <Alert severity="error">Sorry, a problem occured while loading the form, reflesh the page or go back and reflesh the page.</Alert>
        }
        if (form.formName === "GeneralLoanForm") {
            if (this.state.currentLoanType === "salaryBased") {
                return <CivilServantLoansForm {...this.props} toSignApplicationFormId={getToSignApplicationFormId[0].id} />
            }
            return <GeneralLoanForm {...this.props} toSignApplicationFormId={getToSignApplicationFormId[0].id} />
        }
        else if (form.formName === "CivilServantLoansForm") {
            return <CivilServantLoansForm {...this.props} toSignApplicationFormId={getToSignApplicationFormId[0].id} />
        }
        else if (form.formName === "VehicleLoanForm") {
            return <VehicleLoanForm {...this.props} toSignApplicationFormId={getToSignApplicationFormId[0].id} />
        }
        else if (form.formName === "loanGuarantorForm") {
            return <LoanGuarantorForm {...this.props} toSignApplicationFormId={getToSignApplicationFormId[0].id} />
        }
        else {
            return <Alert severity="error">Sorry, a problem occured while loading the form, reflesh the page or go back and reflesh the page.</Alert>
        }
    }
    render() {
        if (this.state.currentLoanType) {
            return (
                <Zoom in={true}>
                    {this.renderForm()}
                </Zoom>
            )
        } else {
            return <FormSkeleton />
        }
    }
}
