"use client";

import React, { useState } from "react";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/system";
import LoanApplicationModal from "../Modals/LoanApplicationModal";
import { EditNote, FilePresentSharp } from "@mui/icons-material";
import LoanApplicationForm from "@/components/Forms/LoanApplicationForm";
import { Slide } from "@mui/material";

const StyledFab = styled(Fab)({
  position: "fixed",
  bottom: 100,
  right: 16,
  zIndex: 1000,
});

export default function ApplyForALoanButton(props) {
  const [showForm, setShowForm] = useState(false);

   // create a blank loan with status as initiated
   // set the blank loan to the user's currentLoan
   // when the loan is created, load the forms
   // and start feeling them up
   // the loanType and loanCategory shall be supplied via props
  
  const createNewLoan = async ()=>{
     const currentLoan = props.loggedInUser.currentLoan
     if(currentLoan){
      return
     }
     else{
       // create the blank loan and push it to both the loans and currentLoan attributes
     }
  } 

  const handleShowFormOpen = ()=>{
      setShowForm(!showForm)
      props.setShowLoanApplicationForms(true)
      props.setSelectedloanCategory(props.loanType)
  }

  if(typeof window !== "undefined"){
    return (
        <div>
         {!showForm? <Slide in={!showForm}>
            <button
              className={"btn btn-success mb-4"}
              style={{backgroundColor:props.color,width: window.innerWidth > 600? "600px" : "100%"}}
              onClick={handleShowFormOpen}
            >
            <EditNote/>
              {" "+props.text? props.text : "APPLY FOR A LOAN"}
            </button>
          </Slide> : <></>}
          {/* Render the PostModal component */}
          {/* <LoanApplicationModal open={open} onClose={handleClose} {...props}/> */}
        </div>
      )
  }
  else{
    return <></>
  }
}
