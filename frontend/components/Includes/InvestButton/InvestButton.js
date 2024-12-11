"use client";

import React, { useState } from "react";
import Fab from "@mui/material/Fab"; 
import { styled } from "@mui/system";
import { Slide } from "@mui/material";
import { Money } from "@material-ui/icons";

const StyledFab = styled(Fab)({
  position: "fixed",
  bottom: 100,
  right: 16,
  zIndex: 1000,
});

export default function InvestButton(props) {
  const [showForm, setShowForm] = useState(false);
  const handleShowFormOpen = ()=>{
      setShowForm(!showForm)
      props.setshowInvestMentForms(true)
      props.setSelectedloanCategory(props.loanType)
  }

  if(typeof window !== "undefined"){
    return (
        <div style={{width:'100%', textAlign:'center'}}>
         {!showForm? <Slide in={!showForm}>
            <button
              className={"btn btn-success mb-4"}
              style={{margin:'0 auto',backgroundColor:props.color,width: window.innerWidth > 600? "600px" : "100%"}}
              onClick={handleShowFormOpen}
            >
            <Money/>
              {" "+props.text? " "+props.text : " INVEST WITH US"}
            </button>
          </Slide> : <></>}
        </div>
      )
  }
  else{
    return <></>
  }
}