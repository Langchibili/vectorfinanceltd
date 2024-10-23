"use client"

import { Slide } from "@mui/material";
import React from "react";

export default class BusinessLoanApplicationForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          loanCategory: this.props.loanCategory,

        }
    }

    componentDidMount(){
        
    }

    renderApplicationForm = ()=>{
      const loanCategory = this.props.loanCategory
      if(loanCategory === "personal"){
        return <>personal loan form</>
      }
      else if(loanCategory === "business"){
        return <>personal business form</>
      }
      else if(loanCategory === "company"){
        return <>personal company form</>
      }
      else{
        return <>personal loan form</>
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