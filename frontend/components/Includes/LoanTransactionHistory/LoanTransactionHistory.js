"use client";

import { Slide } from "@material-ui/core";
import { Alert } from "@mui/material";
import React from "react";

export default class LoanTransactionHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  renderTransactionHistoriesPagination = ()=>{
    return <></>
    return (
      <>
       <div className="align-items-center mt-2 row text-center text-sm-start">
                  <div className="col-sm">
                    <div className="text-muted">
                      Showing<span className="fw-semibold">4</span> of{" "}
                      <span className="fw-semibold">125</span> Results
                    </div>
                  </div>
                  <div className="col-sm-auto">
                    <ul className="pagination pagination-separated pagination-sm justify-content-center justify-content-sm-start mb-0">
                      <li className="page-item disabled">
                        <a href="#" className="page-link">
                          ←
                        </a>
                      </li>
                      <li className="page-item">
                        <a href="#" className="page-link">
                          1
                        </a>
                      </li>
                      <li className="page-item active">
                        <a href="#" className="page-link">
                          2
                        </a>
                      </li>
                      <li className="page-item">
                        <a href="#" className="page-link">
                          3
                        </a>
                      </li>
                      <li className="page-item">
                        <a href="#" className="page-link">
                          →
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
      </>
    )
  }

  displayDateOrTime = (transactionCreatedAt) => {
    const TransactionCreatedAt = new Date(transactionCreatedAt);
    const now = new Date();
    const timeDifference = Math.abs(now - TransactionCreatedAt); // Difference in milliseconds
  
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const years = Math.floor(days / 365);
  
    if (seconds < 60) {
      return <span>Just now</span>;
    } else if (minutes < 60) {
      return <span>{minutes} minute{minutes > 1 ? "s" : ""} ago</span>;
    } else if (hours < 24) {
      return <span>{hours} hour{hours > 1 ? "s" : ""} ago</span>;
    } else if (days < 7) {
      return <span>{days} day{days > 1 ? "s" : ""} ago</span>;
    } else if (weeks < 52) {
      return <span>{weeks} week{weeks > 1 ? "s" : ""} ago</span>;
    } else {
      return <span>{years} year{years > 1 ? "s" : ""} ago</span>;
    }
 }

 formatDateTime(isoString) {
  // Create a Date object from the ISO string
  const date = new Date(isoString);

  // Extract and format the date and time components
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  };
  return date.toLocaleString(undefined, options);
}



  renderTransactionHistories = ()=>{
    const transactionHistories = this.props.loggedInUser.transactionHistories
    transactionHistories.reverse()
    if(!transactionHistories || transactionHistories.length < 1){
       return <Alert severity="info" sx={{marginTop:'10px'}}>You have no history at the moment</Alert>
    }
    else{
      return transactionHistories.map((transactionHistory)=>{
           console.log(transactionHistory)
           return (
            <>
               <li className="list-group-item ps-0">
                    <div className="row align-items-center g-3">
                      <div className="col">
                        <h5 className="text-muted mt-0 mb-2 fs-13">{this.displayDateOrTime(transactionHistory.transactionDate)}</h5>
                        <a href="#" className="text-reset fs-14 mb-2">
                          {transactionHistory.description}
                        </a>
                        <h5 className="text-muted mt-0 mb-2 fs-13">{this.formatDateTime(transactionHistory.transactionDate)}</h5>
                      </div>
                    </div>
                    {/* end row */}
                </li>
            </>
           )
      })
    }
  }

  render() {
    return <Slide in={true} direction="left">
            <div className="col-xxl-5" style={{margin:'0 auto'}}>
            <div className="card card-height-100">
              <div className="card-header align-items-center d-flex">
                <h4 className="card-title mb-0 flex-grow-1">History</h4>
                <div className="flex-shrink-0">
                  
                </div>
              </div>
              {/* end card header */}
              <div className="card-body pt-0">
                  <ul className="list-group list-group-flush border-dashed">
                     {this.renderTransactionHistories()}
                     {!this.props.loggedInUser.transactionHistories || this.props.loggedInUser.transactionHistories.length < 10? <></> : this.renderTransactionHistoriesPagination()}
                  </ul>
               
              </div>
              {/* end card body */}
            </div>
            {/* end card */}
          </div>
    </Slide>;
  }
}
//  id
//  sign a letter of sale