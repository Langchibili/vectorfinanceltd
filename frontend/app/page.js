"use client"

import ESigningForms from "@/components/ESigningForms/ESigningForms";
import CollateralForm from "@/components/Forms/CollateralForm";
import FilledForms from "@/components/Forms/FilledForms";
import InvestmentForm from "@/components/Forms/InvestmentForm";
import LoanApplicationForm from "@/components/Forms/LoanApplicationForm";
import ApplyForALoanButton from "@/components/Includes/ApplyForALoanButton/ApplyForALoanButton";
import FileDownload from "@/components/Includes/FileDownload/FileDownload";
import FormSigning from "@/components/Includes/FormSigning/FormSigning";
import HelpPageDisplay from "@/components/Includes/HelpPageDisplay/HelpPageDisplay";
import InvestButton from "@/components/Includes/InvestButton/InvestButton";
import LoanInformationDisplay from "@/components/Includes/LoanInformationDisplay/LoanInformationDisplay";
import LoanInitiatedDisplay from "@/components/Includes/LoanInitiatedDisplay/LoanInitiatedDisplay";
import LoanTransactionHistory from "@/components/Includes/LoanTransactionHistory/LoanTransactionHistory";
import Uploader from "@/components/Includes/Uploader/Uploader";
import ListStyleLoanApplicationDisplay from "@/components/LoanApplicationDisplay/ListStyleLoanApplicationDisplay";
import LoanApplicationDisplay from "@/components/LoanApplicationDisplay/LoanApplicationDisplay";
import { backEndUrl } from "@/Constants";
import { useBottomNav } from "@/Contexts/BottomNavContext";
import { useConstants } from "@/Contexts/ConstantsContext";
import { usePage } from "@/Contexts/PageContext";
import { useUser } from "@/Contexts/UserContext";
import { getLoanFromId, scrolltoTopOFPage } from "@/Functions";
import { Alert, Divider } from "@mui/material";
import { useEffect, useState } from "react";

export default function Home() {
  const [showLoanApplicationForms, setShowLoanApplicationForms] = useState(false)
  const [showInvestMentForms, setshowInvestMentForms] = useState(false)
  const [selectedloanCategory, setSelectedloanCategory] = useState(null)
  const [currentLoanWithSessionLetterStuff, setCurrentLoanWithSessionLetterStuff] = useState(null)
  const {BottomNavLink} = useBottomNav()
  const loggedInUser = useUser()
  const constants = useConstants()
  const { setPage } = usePage()
  
  //console.log('constants',constants)

  useEffect(()=>{
     const runSetCurrentLoanWithSessionLetterStuff = async ()=>{
        const currentLoan = await getLoanFromId(loggedInUser.user.currentLoan.id,"collateral,collateral.vehicle,collateral.vehicle.sessionLetterTemplate,collateral.vehicle.sessionLetter")
        const { collateral } = currentLoan
        const { vehicle } = collateral
        if(collateral && collateral.collateralType === 'vehicle'){
            if(vehicle && vehicle.insuranceType && (vehicle.insuranceType === "third-party" || vehicle.insuranceType === "comprehensive")){
              if(currentLoan.insuranceRequest && currentLoan.insuranceRequest === "African Gray"){
                 return
              }
              else{
                setCurrentLoanWithSessionLetterStuff(currentLoan) // this means the current loan meets the session letter requirements
              }
            }
        }
        return
    }
    if(loggedInUser.user.currentLoan){
      runSetCurrentLoanWithSessionLetterStuff()
    }
  },[loggedInUser?.user?.currentLoan])

  setPage('/')
  scrolltoTopOFPage() // should always show the top of the page as the view point
  const showApplyButtons = ()=>{
        return (
                <>
                <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
                <div className="bg-overlay" 
                   style={{
                          background:'linear-gradient(to right, #61da6140, #5b4ab7)'
                    }}/>
                {/* auth-page content */}
                <div className="auth-page-content overflow-hidden pt-lg-5">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="card overflow-hidden m-0">
                          <div className="row justify-content-center g-0">
                            <div>
                              <div className="p-lg-5 p-4 auth-one-bg h-100">
                                <div className="bg-overlay" style={{background:'linear-gradient(to right, #41319c26, #4b38b3)'}}/>
                                <div className="position-relative h-100 d-flex flex-column">
                                  <div className="mb-4">
                                    {/* <a href="index-2.html" className="d-block">
                                      <img
                                        src="assets/images/logo-light.png"
                                        alt=""
                                        height={18}
                                      />
                                    </a> */}
                                  </div>
                                  <div className="mt-auto">
                                    {/* <LoanApplicationDisplay 
                                        loggedInUser={loggedInUser.user} constants={constants} 
                                        setShowLoanApplicationForms={setShowLoanApplicationForms}
                                        setSelectedloanCategory={setSelectedloanCategory}/> */}
                                  <ListStyleLoanApplicationDisplay
                                        loggedInUser={loggedInUser.user} constants={constants} 
                                        setShowLoanApplicationForms={setShowLoanApplicationForms}
                                        setSelectedloanCategory={setSelectedloanCategory}/>
                                  {constants.loansInformation.allowInvestments && constants.loansInformation.allowInvestments === "yes"? 
                                  <InvestButton 
                                        loanType="personal"
                                        color="blue" 
                                        text="INVEST WITH US" 
                                        loggedInUser={loggedInUser.user} constants={constants} 
                                        setshowInvestMentForms={setshowInvestMentForms}
                                        setSelectedloanCategory={setSelectedloanCategory}/> : null}
                                    <div className="mb-3">
                                      <i className="ri-double-quotes-l display-4 text-success" />
                                    </div>
                                    <div
                                      id="qoutescarouselIndicators"
                                      className="carousel slide"
                                      data-bs-ride="carousel"
                                    >
                                      <div className="carousel-indicators">
                                        <button
                                          type="button"
                                          data-bs-target="#qoutescarouselIndicators"
                                          data-bs-slide-to={0}
                                          className=""
                                          aria-label="Slide 1"
                                        />
                                        <button
                                          type="button"
                                          data-bs-target="#qoutescarouselIndicators"
                                          data-bs-slide-to={1}
                                          aria-label="Slide 2"
                                          className="active"
                                          aria-current="true"
                                        />
                                        <button
                                          type="button"
                                          data-bs-target="#qoutescarouselIndicators"
                                          data-bs-slide-to={2}
                                          aria-label="Slide 3"
                                          className=""
                                        />
                                      </div>
                                      <div className="carousel-inner text-center text-white-50 pb-5">
                                        <div className="carousel-item">
                                          <p className="fs-15 fst-italic">
                                          " Our terms and conditions are clear, 
                                          with no hidden fees or unexpected charges."
                                          </p>
                                        </div>
                                        <div className="carousel-item active">
                                          <p className="fs-15 fst-italic">
                                          " Get access to our loans and get financed within 24 hours! "
                                          </p>
                                        </div>
                                        <div className="carousel-item">
                                          <p className="fs-15 fst-italic">
                                            " Building long-term trust with our clients is our primary focus. "
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    {/* end carousel */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* end card */}
                      </div>
                      {/* end col */}
                    </div>
                    {/* end row */}
                  </div>
                  {/* end container */}
                </div>
                {/* end auth page content */}
                {/* footer */}
                {/* end Footer */}
              </div>   
                </>
        )
  }

  const showSessionLetter = ()=>{
        const currentLoan = currentLoanWithSessionLetterStuff
        const { collateral } = currentLoan
        const { vehicle } = collateral
        if(vehicle.sessionLetter && vehicle.sessionLetter.data){
          return null // means you have already uploaded the session letter
        }
        if(!(vehicle.sessionLetterTemplate && vehicle.sessionLetterTemplate.data)){
          return <Alert severity="warning" sx={{marginTop:'10px'}}>We shall send you a message when the session letter template has been uploaded, along with instructions on what to do next. Thank you.</Alert>
        }
        return (
            <div style={{width:'100%', textAlign:'center', marginTop:'10px'}}>
               <FileDownload
                  files={vehicle.sessionLetterTemplate}
                  backEndUrl={backEndUrl}
                  fileDisplayName="Session Letter Template"
                />
                 
                <Divider my="2" style={{marginTop:'10px'}}/>
                <h3>Upload Session Letter</h3> 
                <h6><small><strong>(Stamped and signed by your insurance company | <strong>Make sure to download and produce the session letter to your insurance first</strong>)</strong></small></h6>
                <Uploader
                      refId={currentLoan.collateral.vehicle.id}
                      refName="media-and-documents.vehicle"
                      fieldName="sessionLetter"
                      allowMultiple={false}
                      allowedTypes={[
                        'image/*',
                        'application/pdf',
                        'application/msword',
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                        'text/plain',
                        'application/vnd.ms-excel',
                        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                      ]}
                    />
                </div>
        )
  }

  const renderMainContent = ()=>{
    // investment stuff
    const currentInvestment = loggedInUser.user.currentInvestment
    if(currentInvestment){
       return <>ivestment dashboard</> // just like the loans dashboard but different
       return <LoanInitiatedDisplay /> 
    }
    else{
      if(showInvestMentForms){
              return( <div className="page-content">
                         <div className="container-fluid">
                        <InvestmentForm 
                          setshowInvestMentForms={setshowInvestMentForms} 
                          loanCategory="personal"
                          loggedInUser={loggedInUser.user} 
                          constants={constants}
                          />
                        </div></div>)
      }
      // loans stuff
      const currentLoan = loggedInUser.user.currentLoan
      if(currentLoan){
        if(currentLoan.loanStatus === "initiated" || currentLoan.loanStatus === "request-approval"){
          return <LoanInitiatedDisplay /> 
        }
        else if(currentLoan.loanStatus === "pending-collateral-addition"){
          return <CollateralForm loggedInUser={loggedInUser.user} constants={constants}/> 
        }
        else if(currentLoan.loanStatus === "pending-collateral-inspection" || currentLoan.loanStatus === "collateral-inspection"){
          return (<div className="page-content">
                   <div className="container-fluid">
                    <Alert  severity="info">Thank you for applying for a loan with us, we are currently processing the loan, an agent will call you to proceed with inspection of your collateral.</Alert>
                    {currentLoanWithSessionLetterStuff? showSessionLetter() : null}
                  </div>
                  </div>)
        }
        else if(currentLoan.loanStatus === "accepted"){
          return (<>
                    {loggedInUser.user.signingMethod && loggedInUser.user.signingMethod === "e-signing"? <div className="page-content"><div className="container-fluid"><ESigningForms loggedInUser={loggedInUser.user} constants={constants}/></div></div> : <FilledForms loggedInUser={loggedInUser.user} constants={constants}/> /* use esigning unless manually input to do otherwise */}
                 </>)
        }
        else if(currentLoan.loanStatus === "pending-approval"){
          return (<div className="page-content">
                    <div className="container-fluid">
                    <Alert  severity="info">Thank you for completing the requested steps, we are currently processing the loan, an agent will call you.</Alert>
                  </div>
                  </div>)
          // show the info on how we are checking the eligibility of the loan
        }
        else if(currentLoan.loanStatus === "approved"){
          return (<div className="page-content">
            <div className="container-fluid">
            <Alert  severity="success">Congratulations!! Your loan has been approved, awaiting disbursement of funds.</Alert>
          </div>
          </div>)
        }
        else if(currentLoan.loanStatus === "rejected"){
          // show the user that "they are not eligible for a loan at the moment, but they can apply again. Or contact us."
          return (showLoanApplicationForms? <LoanApplicationForm 
                                                    setShowLoanApplicationForms={setShowLoanApplicationForms} 
                                                    loanCategory={selectedloanCategory}
                                                    loggedInUser={loggedInUser.user} constants={constants}
                                                    /> : <>
                                                    <div className="page-content">
                                                      <div className="container-fluid">
                                                      <Alert  severity="warning">Sorry but we cannot grant you a loan at the moment, apply again if you feel that your eligibility has to be reassessed..</Alert>
                                                    </div>
                                                    </div>
                                                  {showApplyButtons()}
                   </>
          )
        }
        else if(currentLoan.loanStatus === "disbursed"){
          return <LoanInformationDisplay loggedInUser={loggedInUser.user} constants={constants}/> // handles the displaying of all loan information
        }
        else if(currentLoan.loanStatus === "defaulted"){
          return (
                <>
                <div className="page-content">
                  <div className="container-fluid">
                  <Alert  severity="error">It appears your loan has been defaulted, pay the balance in full, lest appropriate legal action be taken.</Alert>
                </div>
                </div>
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
                                            <div className="page-content">
                                              <div className="container-fluid">
                                              <Alert  severity="success">Thank you for completing payment of your loan, you can now apply for another one.</Alert>
                                            </div>
                                           </div>
                                           {showApplyButtons()}
                    </>
              )// can apply again though
        }
        else{
          return (showLoanApplicationForms? <LoanApplicationForm 
                          setShowLoanApplicationForms={setShowLoanApplicationForms} 
                          loanCategory={selectedloanCategory}
                          loggedInUser={loggedInUser.user} constants={constants}/> : <>
                     {showApplyButtons()}
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
                  {showApplyButtons()}
                 </>
      )
      }
    }

  }
 const renderPages = (BottomNavLink)=>{
   if(!loggedInUser.status){
      if(typeof window !== "undefined"){
        window.location = "/signin"
      }
    }
    else{
      if(!BottomNavLink || parseInt(BottomNavLink) === 0){
        return renderMainContent()
      }
      else if(parseInt(BottomNavLink) === 1){
        return (
          <div className="page-content">
          <div className="container-fluid">
            <LoanTransactionHistory loggedInUser={loggedInUser.user}/>
          </div>
          </div>
        )
      }
      else{
        return (
          <div className="page-content">
          <div className="container-fluid">
            <HelpPageDisplay loggedInUser={loggedInUser.user} constants={constants}/>
          </div>
         </div>
        )
      }
    }
  }
  return (
    <>{renderPages(BottomNavLink)}</>
  )
}
