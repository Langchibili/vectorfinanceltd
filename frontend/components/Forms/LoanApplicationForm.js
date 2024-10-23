"use client"

import { Slide } from "@mui/material";
import React from "react";
import PersonalLoanApplicationForm from "./PersonalLoanApplicationForm";
import BusinessLoanApplicationForm from "./BusinessLoanApplicationForm";
import CompanyLoanApplicationForm from "./CompanyLoanApplicationForm";

export default class LoanApplicationForm extends React.Component{
    constructor(props){
        super(props)
    }

    renderApplicationForm = ()=>{
      const loanCategory = this.props.loanCategory
      if(loanCategory === "personal"){
        return <PersonalLoanApplicationForm {...this.props}/>
      }
      else if(loanCategory === "business"){
        return <BusinessLoanApplicationForm {...this.props}/>
      }
      else if(loanCategory === "company"){
        return <CompanyLoanApplicationForm {...this.props}/>
      }
      else{
        return <PersonalLoanApplicationForm {...this.props}/>
      }
    }

    handleGoBackToLoanCategorySelect = ()=>{
      this.props.setShowLoanApplicationForms(false)
    }

    render(){
        return (<>
                <button onClick={this.handleGoBackToLoanCategorySelect} className="btn btn-sm">Back</button>
                {this.renderApplicationForm()}
              </>)
    }
}