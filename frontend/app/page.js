"use client"

import CollateralForm from "@/components/Forms/CollateralForm";
import FilledForms from "@/components/Forms/FilledForms";
import LoanApplicationForm from "@/components/Forms/LoanApplicationForm";
import MainForm from "@/components/Forms/MainForm";
import ApplyForALoanButton from "@/components/Includes/ApplyForALoanButton/ApplyForALoanButton";
import LoanInformationDisplay from "@/components/Includes/LoanInformationDisplay/LoanInformationDisplay";
import LoanInitiatedDisplay from "@/components/Includes/LoanInitiatedDisplay/LoanInitiatedDisplay";
import { useConstants } from "@/Contexts/ConstantsContext";
import { useUser } from "@/Contexts/UserContext";
import { Alert } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [showLoanApplicationForms, setShowLoanApplicationForms] = useState(false)
  const [selectedloanCategory, setSelectedloanCategory] = useState(null)
  
  const loggedInUser = useUser()
  const constants = useConstants()
  console.log(constants)
  if(!loggedInUser.status){
     if(typeof window !== "undefined"){
       window.location = "/signin"
     }
  }
  const renderMainContent = ()=>{
    const currentLoan = loggedInUser.user.currentLoan
    if(currentLoan){
      if(currentLoan.loanStatus === "initiated"){
         return <LoanInitiatedDisplay/> 
      }
      else if(currentLoan.loanStatus === "pending-approval"){
        return <p className="text text-info">Thank you for applying for a loan with us, we are currently processing the loan, an agent will call you.</p>
        // show the info on how we are checking the eligibility of the loan
      }
      else if(currentLoan.loanStatus === "pending-collateral-addition"){
         return <CollateralForm loggedInUser={loggedInUser.user} constants={constants}/> 
      }
      else if(currentLoan.loanStatus === "pending-collateral-inspection"){
        return <Alert  severity="info">Thank you for applying for a loan with us, we are currently processing the loan, and agent will call you to proceed with inspection of your collateral.</Alert>
      }
      else if(currentLoan.loanStatus === "accepted"){
        return (<>
                  <p className="text text-success">Your loan application has been accepted, just a few more steps in order to finalize the process and disburse your funds.</p>
                  <FilledForms loggedInUser={loggedInUser.user} constants={constants}/>
               </>)
     }
      else if(currentLoan.loanStatus === "approved"){
         return <p className="text text-success"><strong>Congratulations!! Your loan has been approved, awaiting disbursement of funds.</strong></p>
      }
      
      else if(currentLoan.loanStatus === "rejected"){
        // show the user that "they are not eligible for a loan at the moment, but they can apply again. Or contact us."
         return (showLoanApplicationForms? <LoanApplicationForm 
                                                   setShowLoanApplicationForms={setShowLoanApplicationForms} 
                                                   loanCategory={selectedloanCategory}
                                                   loggedInUser={loggedInUser.user} constants={constants}
                                                   /> : <>
                  <p className="text text-warning">Sorry but we cannot grant you a loan at the moment, apply again if you feel that your eligibility has to be reassessed.</p>
                  <ApplyForALoanButton 
                         loanType="personal"
                         color="blue" 
                         text="APPLY FOR A PERSONAL LOAN" 
                         loggedInUser={loggedInUser.user} constants={constants} 
                         setShowLoanApplicationForms={setShowLoanApplicationForms}
                         setSelectedloanCategory={setSelectedloanCategory}/> 
                  <ApplyForALoanButton 
                         loanType="business" 
                         color="forestgreen" 
                         text="APPLY FOR A BUSINESS LOAN" 
                         loggedInUser={loggedInUser.user} constants={constants} 
                         setShowLoanApplicationForms={setShowLoanApplicationForms}
                         setSelectedloanCategory={setSelectedloanCategory}/>
                  <ApplyForALoanButton 
                         loanType="company" 
                         text="APPLY FOR A COMPANY LOAN" 
                         loggedInUser={loggedInUser.user} constants={constants} 
                         setShowLoanApplicationForms={setShowLoanApplicationForms}
                         setSelectedloanCategory={setSelectedloanCategory}/>
                </>
         )
      }
      else if(currentLoan.loanStatus === "disbursed"){
         return <LoanInformationDisplay loggedInUser={loggedInUser.user} constants={constants}/> // handles the displaying of all loan information
      }
      else if(currentLoan.loanStatus === "defaulted"){
        return (
               <>
                 <p className="text text-danger">It appears your loan has been defaulted, pay the balance in full, lest appropriate legal action be taken.</p>
                 <LoanInformationDisplay loggedInUser={loggedInUser.user} constants={constants}/> 
               </>
              ) // handles the displaying of all loan information
     }
      else if(currentLoan.loanStatus === "completed"){ // means a user has completed paying to the loan
         return (
            showLoanApplicationForms? <LoanApplicationForm 
                                          setShowLoanApplicationForms={setShowLoanApplicationForms} 
                                          loanCategory={selectedloanCategory}
                                          loggedInUser={loggedInUser.user} constants={constants}
                                          /> : <>
                  <p className="text text-success">Thank you for completing payment of your loan, you can now apply for another one.</p>
                  <ApplyForALoanButton 
                         loanType="personal"
                         color="blue" 
                         text="APPLY FOR A PERSONAL LOAN" 
                         loggedInUser={loggedInUser.user} constants={constants} 
                         setShowLoanApplicationForms={setShowLoanApplicationForms}
                         setSelectedloanCategory={setSelectedloanCategory}/> 
                  <ApplyForALoanButton 
                         loanType="business" 
                         color="forestgreen" 
                         text="APPLY FOR A BUSINESS LOAN" 
                         loggedInUser={loggedInUser.user} constants={constants} 
                         setShowLoanApplicationForms={setShowLoanApplicationForms}
                         setSelectedloanCategory={setSelectedloanCategory}/>
                  <ApplyForALoanButton 
                         loanType="company" 
                         text="APPLY FOR A COMPANY LOAN" 
                         loggedInUser={loggedInUser.user} constants={constants} 
                         setShowLoanApplicationForms={setShowLoanApplicationForms}
                         setSelectedloanCategory={setSelectedloanCategory}/>
                  </>
            )// can apply again though
      }
      else{
        return (showLoanApplicationForms? <LoanApplicationForm 
                        setShowLoanApplicationForms={setShowLoanApplicationForms} 
                        loanCategory={selectedloanCategory}
                        loggedInUser={loggedInUser.user} constants={constants}/> : <>
                  <ApplyForALoanButton 
                         loanType="personal"
                         color="blue" 
                         text="APPLY FOR A PERSONAL LOAN" 
                         loggedInUser={loggedInUser.user} constants={constants} 
                         setShowLoanApplicationForms={setShowLoanApplicationForms}
                         setSelectedloanCategory={setSelectedloanCategory}/> 
                  <ApplyForALoanButton 
                         loanType="business" 
                         color="forestgreen" 
                         text="APPLY FOR A BUSINESS LOAN" 
                         loggedInUser={loggedInUser.user} constants={constants} 
                         setShowLoanApplicationForms={setShowLoanApplicationForms}
                         setSelectedloanCategory={setSelectedloanCategory}/>
                  <ApplyForALoanButton 
                         loanType="company" 
                         text="APPLY FOR A COMPANY LOAN" 
                         loggedInUser={loggedInUser.user} constants={constants} 
                         setShowLoanApplicationForms={setShowLoanApplicationForms}
                         setSelectedloanCategory={setSelectedloanCategory}/>   
               </>
         )
      }
      
    }
    else{ // means you can apply to a new loan
      
      return (showLoanApplicationForms? <LoanApplicationForm 
                  setShowLoanApplicationForms={setShowLoanApplicationForms} 
                  loanCategory={selectedloanCategory}
                  loggedInUser={loggedInUser.user} constants={constants}
                  /> : <>
                <ApplyForALoanButton 
                         loanType="personal"
                         color="blue" 
                         text="APPLY FOR A PERSONAL LOAN" 
                         loggedInUser={loggedInUser.user} constants={constants} 
                         setShowLoanApplicationForms={setShowLoanApplicationForms}
                         setSelectedloanCategory={setSelectedloanCategory}/> 
                  <ApplyForALoanButton 
                         loanType="business" 
                         color="forestgreen" 
                         text="APPLY FOR A BUSINESS LOAN" 
                         loggedInUser={loggedInUser.user} constants={constants} 
                         setShowLoanApplicationForms={setShowLoanApplicationForms}
                         setSelectedloanCategory={setSelectedloanCategory}/>
                  <ApplyForALoanButton 
                         loanType="company" 
                         text="APPLY FOR A COMPANY LOAN" 
                         loggedInUser={loggedInUser.user} constants={constants} 
                         setShowLoanApplicationForms={setShowLoanApplicationForms}
                         setSelectedloanCategory={setSelectedloanCategory}/>  
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
