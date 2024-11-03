"use client"

import React from "react";
import UpdateClientDetailsForm from "./UpdateClientDetailsForm";
import UpdateDetailsForm from "./UpdateDetailsForm";
import AddLoanAmountForm from "./AddLoanAmmoutForm";
import BusinessInformationForm from "./BusinessInformationForm";
import UpdateSalaryDetailsForm from "./UpdateSalaryDetailsForm";
import { createNewLoan, dateAndTimeNow, logNewAdminNotification, logNewNotification, logNewTransactionHistory, updateUserAccount } from "@/Functions";

export default class BusinessLoanApplicationForm extends React.Component{
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
        
        const applicationDate =  dateAndTimeNow()
        createLoanObject.applicationDate =  applicationDate
        createLoanObject.loanAmount = parseFloat(parseFloat(createLoanObject.loanAmount).toFixed(2))
        createLoanObject.salaryPercentage = parseFloat(parseFloat(createLoanObject.salaryPercentage).toFixed(2))
        createLoanObject.loanTerm = parseInt(createLoanObject.loanTerm)
        createLoanObject.clientAskingAmount = createLoanObject.loanAmount 
        if(this.state.loanType === "salaryBased"){
            createLoanObject.loanCategory = { connect: [this.props.constants.loanCategoriesIds.salaryLoans] }
            createLoanObject.loanType = { connect: [this.props.constants.loanTypesIds.salaryBased] }
        }
        else{
            createLoanObject.loanStatus = "pending-collateral-addition"
            createLoanObject.loanCategory = { connect: [this.props.constants.loanCategoriesIds.assetLoans] }
            delete createLoanObject.loanType
        }
        // if(this.props.loggedInUser.salary){
        //     createLoanObject.salary = { id: this.props.loggedInUser.salary.id}
        // }
        console.log(createLoanObject)

        const newLoan = await createNewLoan({data:createLoanObject})
        if(!newLoan.hasOwnProperty('error')){
            const transactionHistoryObject = {
                transactionType: "loan-application",
                transactionDate: applicationDate,
                amount: createLoanObject.loanAmount,
                description: "Initiation of the loan, with id: "+newLoan.id,
                loan: {connect: [newLoan.id]}
            }
            const notificationObject = {
                title: "A new loan, with id: "+newLoan.id+" has been Initiated",
                type: "alert"
            }
            const transactionHistory = await logNewTransactionHistory({data:transactionHistoryObject})
            const newNotitifcation = await logNewNotification({data:notificationObject})
            if(!transactionHistory.hasOwnProperty('error')){
                const userUpdateObject = {
                    currentLoan: {connect: [newLoan.id]},
                    loans: {connect: [newLoan.id]},
                    transactionHistories: {connect: [transactionHistory.id]},
                    activities: {connect: [newNotitifcation.id]}
                }
                const updatedUserAccount = await updateUserAccount(userUpdateObject,this.props.loggedInUser.id)
                if(!updatedUserAccount.hasOwnProperty('error')){
                    const AdminNotificationBody = {
                        loan: {connect: [newLoan.id]},
                        client: {connect: [this.props.loggedInUser.id]},
                        notification: {connect: [newNotitifcation.id]}
                    }
                    const newAdminNotification = await logNewAdminNotification(AdminNotificationBody)
                    if(!newAdminNotification.hasOwnProperty('error')){
                      window.location = "/"
                    }
                }
            }
            // send a notification
            // if it's a business loan or company loan, do not send an sms or email notification here first
        }
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