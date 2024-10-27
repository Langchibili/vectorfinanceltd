"use client"

import React from "react";
import UpdateClientDetailsForm from "./UpdateClientDetailsForm";
import UpdateDetailsForm from "./UpdateDetailsForm";
import AddLoanAmountForm from "./AddLoanAmmoutForm";
import BusinessInformationForm from "./BusinessInformationForm";
import UpdateSalaryDetailsForm from "./UpdateSalaryDetailsForm";
import { createNewLoan, dateAndTimeNow, updateUserAccount } from "@/Functions";

export default class PersonalLoanApplicationForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          loanCategory: null,
          loanAmount: null,
          loanType: null,
          openUpdateDetailsForm: false,
          openUpdateClientDetailsForm: false,
          openAddLoanAmountForm: false,
          openBusinessInformationForm: false
        }
    }
     
    handleOpenUpdateDetailsForm = ()=>{
        this.setState({
            openUpdateDetailsForm: true,
            openUpdateClientDetailsForm: false,
            openAddLoanAmountForm: false,
            openBusinessInformationForm: false
        })
    }
    handleOpenUpdateClientDetailsForm = ()=>{
        this.setState({
            openUpdateDetailsForm: false,
            openUpdateClientDetailsForm: true,
            openAddLoanAmountForm: false,
            openBusinessInformationForm: false
        })
    }
    handleOpenAddLoanAmountForm = ()=>{
        this.setState({
            openUpdateDetailsForm: false,
            openUpdateClientDetailsForm: false,
            openAddLoanAmountForm: true,
            openBusinessInformationForm: false
        })
    }
    handleOpenBusinessInformationForm = ()=>{
        this.setState({
            openUpdateDetailsForm: false,
            openUpdateClientDetailsForm: false,
            openAddLoanAmountForm: false,
            openBusinessInformationForm: true
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
        
        
        createLoanObject.applicationDate = dateAndTimeNow()
        createLoanObject.loanAmount = parseFloat(parseFloat(createLoanObject.loanAmount).toFixed(2))
        createLoanObject.salaryPercentage = parseFloat(parseFloat(createLoanObject.salaryPercentage).toFixed(2))
        createLoanObject.loanTerm = parseInt(createLoanObject.loanTerm)
        if(this.state.loanType === "salaryBased"){
            createLoanObject.loanCategory = { connect: [1] }
            createLoanObject.loanType = { connect: [1] }
        }
        else{
            createLoanObject.loanCategory = { connect: [2] }
        }
        const newLoan = await createNewLoan({data:createLoanObject})
        console.log(createLoanObject)
        console.log(newLoan)
        const userUpdateObject = {
            currentLoan: {connect: [newLoan.id]}
        }
        const updateUserAccount = updateUserAccount(userUpdateObject,this.props.loggedInUser.id)
        console.log(updateUserAccount)
    }

    renderForm = ()=>{
        if(this.state.openUpdateDetailsForm){
            return <UpdateDetailsForm 
                        {...this.props} 
                        handleOpenUpdateClientDetailsForm={this.handleOpenUpdateClientDetailsForm}/>
        }
        else if(this.state.openUpdateClientDetailsForm){
            return <UpdateClientDetailsForm 
                        {...this.props} 
                        handleOpenUpdateDetailsForm={this.handleOpenUpdateDetailsForm} 
                        handleOpenAddLoanAmountForm={this.handleOpenAddLoanAmountForm}/>
        }
        else if(this.state.openAddLoanAmountForm){
            return <AddLoanAmountForm 
                        {...this.props} 
                        setLoanInformation={this.setLoanInformation} 
                        handleOpenUpdateClientDetailsForm={this.handleOpenUpdateClientDetailsForm}
                        handleOpenBusinessInformationForm={this.handleOpenBusinessInformationForm}/>
        }
        else if(this.state.openBusinessInformationForm){
            if(this.state.loanType === "salaryBased"){
                return <UpdateSalaryDetailsForm 
                        {...this.props} 
                        handleCreateBlankLoan={this.handleCreateBlankLoan}
                        setLoanInformation={this.setLoanInformation} 
                        handleOpenAddLoanAmountForm={this.handleOpenAddLoanAmountForm}/>
            }
            return <BusinessInformationForm 
                        {...this.props} 
                        handleCreateBlankLoan={this.handleCreateBlankLoan}
                        setLoanInformation={this.setLoanInformation} 
                        handleOpenAddLoanAmountForm={this.handleOpenAddLoanAmountForm}/>
        }
        else{
            return <UpdateDetailsForm 
                        {...this.props}
                        handleOpenUpdateClientDetailsForm={this.handleOpenUpdateClientDetailsForm}/>
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