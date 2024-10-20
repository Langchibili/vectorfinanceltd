"use client";

import React, { useState } from "react";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/system";
import LoanApplicationModal from "../Modals/LoanApplicationModal";
import { EditNote, FilePresentSharp } from "@mui/icons-material";

const StyledFab = styled(Fab)({
  position: "fixed",
  bottom: 100,
  right: 16,
  zIndex: 1000,
});

export default function ApplyForALoanButton(props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = (e) => {
    setOpen(false);
  }
   // create a blank loan with status as initiated
   // set the blank loan to the user's currentLoan
   // when the loan is created, load the forms
   // and start feeling them up
   
  if(typeof window !== "undefined"){
    return (
        <div>
          <Zoom in={!open}>
            <button
              className={"btn btn-success mb-4"}
              style={{backgroundColor:props.color,width: window.innerWidth > 600? "600px" : "100%"}}
              onClick={handleClickOpen}
            >
            <EditNote/>
              {" "+props.text? props.text : "APPLY FOR A LOAN"}
            </button>
          </Zoom> 
          {/* Render the PostModal component */}
          <LoanApplicationModal open={open} onClose={handleClose} {...props}/>
        </div>
      );
  }
  else{
    return <></>
  }
}
