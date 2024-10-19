"use client"

import MainForm from "@/components/Forms/MainForm";
import ApplyForALoanButton from "@/components/Includes/ApplyForALoanButton/ApplyForALoanButton";
import LoanInformationDisplay from "@/components/Includes/LoanInformationDisplay/LoanInformationDisplay";
import { useUser } from "@/Contexts/UserContext";
import { useState } from "react";

export default function Home() {
  const [showLoanForms, setShowLoanForms] = useState(false)
  const loggedInUser = useUser()
  if(!loggedInUser.status){
     if(typeof window !== "undefined"){
       window.location = "/signin"
     }
  }
  const renderMainContent = ()=>{
    const currentLoan = loggedInUser.user.currentLoan
    if(currentLoan){
      if(currentLoan.loanStatus === "initiated"){
         return <MainForm loggedInUser={loggedInUser.user}/> 
      }
      else if(currentLoan.loanStatus === "pending-approval"){
        return <p className="text text-info">Thank you for applying for a loan with us, we are currently processing the loan, an agent will call you.</p>
        // show the info on how we are checking the eligibility of the loan
      }
      else if(currentLoan.loanStatus === "approved"){
         return <p className="text text-success">Congratulations your loan has been approved, awaiting disbursement of funds.</p>
      }
      else if(currentLoan.loanStatus === "rejected"){
        // show the user that "they are not eligible for a loan at the moment, but they can apply again. Or contact us."
         return (<>
                  <p className="text text-warning">Sorry but we cannot grant you a loan at the moment, apply again if you feel that your eligibility has to be reassessed.</p>
                  <ApplyForALoanButton loanType="personal" color="blue" text="APPLY FOR A PERSONAL LOAN"/> 
                  <ApplyForALoanButton loanType="business" color="forestgreen" text="APPLY FOR A BUSINESS LOAN"/> 
                  <ApplyForALoanButton loanType="company" text="APPLY FOR A COMPANY LOAN"/> 
                </>
         )
      }
      else if(currentLoan.loanStatus === "disbursed"){
         return <LoanInformationDisplay loggedInUser={loggedInUser.user}/> // handles the displaying of all loan information
      }
      else if(currentLoan.loanStatus === "defaulted"){
        return (
               <>
                 <p className="text text-danger">It appears your loan has been defaulted, pay the balance in full, lest appropriate legal action be taken.</p>
                 <LoanInformationDisplay loggedInUser={loggedInUser.user}/> 
               </>
              ) // handles the displaying of all loan information
     }
      else if(currentLoan.loanStatus === "completed"){ // means a user has completed paying to the loan
         return (
              <>
                <p className="text text-success">Thank you for completing payment of your loan, you can now apply for another one.</p>
                <ApplyForALoanButton  loanType="personal" color="blue" text="APPLY FOR A PERSONAL LOAN"/> 
                <ApplyForALoanButton loanType="business" color="forestgreen" text="APPLY FOR A BUSINESS LOAN"/> 
                <ApplyForALoanButton loanType="company" text="APPLY FOR A COMPANY LOAN"/> 
              </>
            )// can apply again though
      }
      else{
         return (
              <>
                  <ApplyForALoanButton  loanType="personal" color="blue" text="APPLY FOR A PERSONAL LOAN"/> 
                  <ApplyForALoanButton loanType="business" color="forestgreen" text="APPLY FOR A BUSINESS LOAN"/> 
                  <ApplyForALoanButton loanType="company" text="APPLY FOR A COMPANY LOAN"/> 
              </>
         )
      }
      
    }
    else{ // means you can apply to a new loan
      return (
        <>
              <ApplyForALoanButton loanType="personal" color="blue" text="APPLY FOR A PERSONAL LOAN"/> 
              <ApplyForALoanButton loanType="business" color="forestgreen" text="APPLY FOR A BUSINESS LOAN"/> 
              <ApplyForALoanButton loanType="company" text="APPLY FOR A COMPANY LOAN"/> 
        </>
   )
    }
  }
  return (
    <div className="page-content">
    <div className="container-fluid">
      {renderMainContent()}
    </div>
    {/* container-fluid */}
  </div>
  )
}
