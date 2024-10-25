"use client"

import React from "react";
import UpdateClientDetailsForm from "./UpdateClientDetailsForm";
import UpdateDetailsForm from "./UpdateDetailsForm";
import AddLoanAmountForm from "./AddLoanAmmoutForm";
import BusinessInformationForm from "./BusinessInformationForm";
import UpdateSalaryDetailsForm from "./UpdateSalaryDetailsForm";

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
       console.log(this.state)
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