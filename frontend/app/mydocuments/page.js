"use client"

import FileDownload from "@/components/Includes/FileDownload/FileDownload";
import { backEndUrl } from "@/Constants";
import { usePage } from "@/Contexts/PageContext";
import { useUser } from "@/Contexts/UserContext";
import { getLoanFromId, scrolltoTopOFPage } from "@/Functions";
import { Alert } from "@mui/material";
import { useEffect, useState } from "react";

export default function Home() {
const [currentLoanWithLoanDocument, setCurrentLoanWithLoanDocument] = useState(null)
  const loggedInUser = useUser()
  const { setPage } = usePage()
  


  setPage('/mydocuments')
  scrolltoTopOFPage() // should always show the top of the page as the view point
  
  useEffect(()=>{
     const runSetCurrentLoanWithLoanDocument = async ()=>{
       setCurrentLoanWithLoanDocument(await getLoanFromId(loggedInUser.user.currentLoan.id,"loanAgreementDocuments"))
    }
    if(loggedInUser.user.currentLoan){
      runSetCurrentLoanWithLoanDocument()
    }
  },[loggedInUser?.user?.currentLoan])

  if(!currentLoanWithLoanDocument || !currentLoanWithLoanDocument.loanAgreementDocuments){
    <div className="page-content">
          <div className="container-fluid">
            <Alert severity="infor">This loan doesn't have any documents</Alert>
          </div>
         </div>
  }
  if(currentLoanWithLoanDocument && currentLoanWithLoanDocument.loanAgreementDocuments && currentLoanWithLoanDocument.loanAgreementDocuments.data && currentLoanWithLoanDocument.loanAgreementDocuments.data === null){
    <div className="page-content">
          <div className="container-fluid">
            <Alert severity="infor">This loan doesn't have any documents</Alert>
          </div>
         </div>
  }
  
  return (
    <div className="page-content">
          <div className="container-fluid text-center">
            <h4>All the documents associated with your account shall appear below here</h4>
            <br/>
            <FileDownload
                files={currentLoanWithLoanDocument?.loanAgreementDocuments || null}
                backEndUrl={backEndUrl}
                fileDisplayName="Your Signed Loan Agreement Form"
            />
          </div>
         </div>
  )
}
