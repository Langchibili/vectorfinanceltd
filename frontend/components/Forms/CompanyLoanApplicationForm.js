"use client"

import React from "react";
import UpdateClientDetailsForm from "./UpdateClientDetailsForm";
import UpdateDetailsForm from "./UpdateDetailsForm";
import AddLoanAmountForm from "./AddLoanAmmoutForm";
import BusinessInformationForm from "./BusinessInformationForm";
import UpdateSalaryDetailsForm from "./UpdateSalaryDetailsForm";
import { createNewLoan, dateAndTimeNow, scrolltoTopOFPage, updateUserAccount } from "@/Functions";

export default class CompanyLoanApplicationForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          loanCategory: null,
          loanAmount: null,
          loanType: null,
          openUpdateDetailsForm: false,
          openUpdateClientDetailsForm: false,
          openAddLoanAmountForm: false,
          openBusinessInformationForm: false,
          formReOpened: false
        }
    }
     
    handleOpenUpdateDetailsForm = ()=>{
        scrolltoTopOFPage()
        this.setState({
            openUpdateDetailsForm: true,
            openUpdateClientDetailsForm: false,
            openAddLoanAmountForm: false,
            openBusinessInformationForm: false
        })
    }
    handleOpenUpdateClientDetailsForm = ()=>{
        scrolltoTopOFPage()
        this.setState({
            openUpdateDetailsForm: false,
            openUpdateClientDetailsForm: true,
            openAddLoanAmountForm: false,
            openBusinessInformationForm: false
        })
    }
    handleOpenAddLoanAmountForm = ()=>{
        scrolltoTopOFPage()
        this.setState({
            openUpdateDetailsForm: false,
            openUpdateClientDetailsForm: false,
            openAddLoanAmountForm: true,
            openBusinessInformationForm: false
        })
    }
    handleOpenBusinessInformationForm = ()=>{
        scrolltoTopOFPage()
        this.setState({
            openUpdateDetailsForm: false,
            openUpdateClientDetailsForm: false,
            openAddLoanAmountForm: false,
            openBusinessInformationForm: true
        })
    }
  
    handleFormReopen = ()=>{
        scrolltoTopOFPage()
        this.setState({
            formReOpened: true
        })
    }
    
    handleCreateBlankLoan = async ()=>{
        // create new loan 
        // add new loan to client's currentLoan relation
        const createLoanObject = this.state
        delete createLoanObject.openUpdateDetailsForm
        delete createLoanObject.openUpdateClientDetailsForm
        delete createLoanObject.openAddLoanAmountForm
        delete createLoanObject.openBusinessInformationForm
        delete createLoanObject.stateSaved
        delete createLoanObject.monthlyPayment
        delete createLoanObject.totalProfit
        delete createLoanObject.approvedLoanAmount
        delete createLoanObject.isProceed
        delete createLoanObject.maxLoanTerm
        delete createLoanObject.salary
        
        const applicationDate =  dateAndTimeNow()
        createLoanObject.applicationDate =  applicationDate
        createLoanObject.loanAmount = parseFloat(parseFloat(createLoanObject.loanAmount).toFixed(2))
        createLoanObject.salaryPercentage = parseFloat(parseFloat(createLoanObject.salaryPercentage).toFixed(2))
        createLoanObject.loanTerm = parseInt(createLoanObject.loanTerm)
        createLoanObject.clientAskingAmount = createLoanObject.loanAmount 
        createLoanObject.repaymentAmount = parseFloat(parseFloat(createLoanObject.totalPayment).toFixed(2))
        delete createLoanObject.totalPayment
        if(this.state.loanType === "salaryBased"){
            createLoanObject.loanCategory = { connect: [this.props.constants.loanCategoriesIds.salaryLoans] }
            createLoanObject.loanType = { connect: [this.props.constants.loanTypesIds.salaryBased] }
        }
        else{
            createLoanObject.loanStatus = "pending-collateral-addition"
            createLoanObject.loanCategory = { connect: [this.props.constants.loanCategoriesIds.assetLoans] }
            delete createLoanObject.loanType
        }
        
        const newLoan = await createNewLoan({data:createLoanObject})
        if(!newLoan.hasOwnProperty('error')){
            const userUpdateObject = {
                currentLoan: {connect: [newLoan.id]},
                loans: {connect: [newLoan.id]}
            }
            const updatedUserAccount = await updateUserAccount(userUpdateObject,this.props.loggedInUser.id)
            if(!updatedUserAccount.hasOwnProperty('error')){
                window.location = "/"
            }
        }
    }


    renderForm = ()=>{
        if(this.state.openUpdateDetailsForm){
            return <UpdateDetailsForm 
                        {...this.props} 
                        handleOpenUpdateClientDetailsForm={this.handleOpenUpdateClientDetailsForm}
                        formReOpened={this.state.formReOpened}/>
        }
        else if(this.state.openUpdateClientDetailsForm){
            return <UpdateClientDetailsForm 
                        {...this.props} 
                        handleOpenUpdateDetailsForm={this.handleOpenUpdateDetailsForm} 
                        handleOpenAddLoanAmountForm={this.handleOpenAddLoanAmountForm}
                        handleFormReopen={this.handleFormReopen}/>
        }
        else if(this.state.openAddLoanAmountForm){
            return <AddLoanAmountForm 
                        {...this.props} 
                        setLoanInformation={this.setLoanInformation} 
                        handleOpenUpdateClientDetailsForm={this.handleOpenUpdateClientDetailsForm}
                        handleOpenBusinessInformationForm={this.handleOpenBusinessInformationForm}
                        handleFormReopen={this.handleFormReopen}/>
        }
        else if(this.state.openBusinessInformationForm){
            if(this.state.loanType === "salaryBased"){
                return <UpdateSalaryDetailsForm 
                        {...this.props} 
                        handleCreateBlankLoan={this.handleCreateBlankLoan}
                        setLoanInformation={this.setLoanInformation} 
                        handleOpenAddLoanAmountForm={this.handleOpenAddLoanAmountForm}
                        handleFormReopen={this.handleFormReopen}/>
            }
            return <BusinessInformationForm 
                        {...this.props} 
                        handleCreateBlankLoan={this.handleCreateBlankLoan}
                        setLoanInformation={this.setLoanInformation} 
                        handleOpenAddLoanAmountForm={this.handleOpenAddLoanAmountForm}
                        handleFormReopen={this.handleFormReopen}/>
        }
        else{
            return <UpdateDetailsForm 
                        {...this.props}
                        handleOpenUpdateClientDetailsForm={this.handleOpenUpdateClientDetailsForm}
                        formReOpened={this.state.formReOpened}/>
        }              
    }

    setLoanInformation = (information)=>{
        this.setState({
            ...information
        },()=>{
            console.log(this.state)
        })
    }

    render(){
        return this.renderForm()
    }
}