"use client";

import { Fade, Slide, Zoom } from "@material-ui/core";
import Link from "next/link";
import React from "react";
import PaymentsDisplay from "../PaymentsDisplay/PaymentsDisplay";

export default class LoanInformationDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        showPaymentsPage: false
    }
  }

  async componentDidMount() {
  // loan due date,
  // months till loan is due
  // days till loan is due
  // 
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
  
  handleMakePaymentPage = ()=>{
     this.setState({
      showPaymentsPage: !this.state.showPaymentsPage
     })
  }
  
  calculateMonthsAndDays(disbursementDate, dueDate) {
    const disbursement = new Date(disbursementDate)
    const due = new Date(dueDate)
    const today = new Date()
  
    // Helper function to calculate full months difference
    function getMonthsDiff(date1, date2) {
      return (date2.getFullYear() - date1.getFullYear()) * 12 + (date2.getMonth() - date1.getMonth())
    }
  
    // Calculate months spent from disbursement date to today
    let monthsSpent = getMonthsDiff(disbursement, today)
    let monthsLeft = getMonthsDiff(today, due)
  
    // Adjust if today is before disbursement date in the month
    if (today.getDate() < disbursement.getDate()) {
      monthsSpent -= 1
    }
    
    // Adjust if due date is before today's date in the month
    if (due.getDate() < today.getDate()) {
      monthsLeft -= 1
    }
  
    // Calculate days spent
    const startSpent = new Date(disbursement)
    startSpent.setMonth(startSpent.getMonth() + monthsSpent)
    const daysSpent = Math.floor((today - startSpent) / (1000 * 60 * 60 * 24))
  
    // Calculate days left
    const startLeft = new Date(today)
    startLeft.setMonth(startLeft.getMonth() + monthsLeft)
    const daysLeft = Math.floor((due - startLeft) / (1000 * 60 * 60 * 24))
  
    // Ensure non-negative values
    monthsSpent = Math.max(0, monthsSpent)
    monthsLeft = Math.max(0, monthsLeft)
  
    return {
      spent: `${monthsSpent} months ${daysSpent} days`,
      left: `${monthsLeft} months ${daysLeft} days`
    }
  }


  render() {
    const fullnames = this.props.loggedInUser.fullnames
    const {currentLoan} = this.props.loggedInUser
    const disbursedAmount = currentLoan.disbursedAmount
    const repaymentAmount = currentLoan.repaymentAmount
    const latePaymentPenalty =  !currentLoan.latePaymentPenalty? "O": parseFloat(currentLoan.latePaymentPenalty)
    const outstandingAmount = currentLoan.outstandingAmount
    const rePaidAmount = parseFloat(repaymentAmount) - parseFloat(outstandingAmount)
    const applicationDate = currentLoan.applicationDate
    const disbursementDate = currentLoan.disbursementDate
    const loanTerm = currentLoan.loanTerm
    const dueDate = currentLoan.dueDate
    const {spent} = this.calculateMonthsAndDays(disbursementDate,dueDate)
    const {left} = this.calculateMonthsAndDays(disbursementDate,dueDate)
     
    if(this.state.showPaymentsPage){
      return <PaymentsDisplay handleMakePaymentPage={this.handleMakePaymentPage} loggedInUser={this.props.loggedInUser}/>
    }
    return <Slide in={true} direction="right">
          <div className="row">
        <div className="col">
          <div className="h-100">
            <div className="row mb-3 pb-1">
              <div className="col-12">
                <div className="d-flex align-items-lg-center flex-lg-row flex-column">
                  <div className="flex-grow-1">
                    <h4 className="fs-16 mb-1">Hello, {fullnames}!</h4>
                    <p className="text-muted mb-0">
                      Here's information about your loan today.
                    </p>
                  </div>
                  <div className="mt-3 mt-lg-0">
                    <button onClick={this.handleMakePaymentPage}>
                      <div className="row g-3 mb-0 align-items-center">
                        <div className="col-auto">
                          <button
                            type="button"
                            className="btn btn-soft-success shadow-none"
                          >
                            <i className="ri-add-circle-line align-middle me-1" />{" "}
                            Make A Payment
                          </button>
                        </div>
                      </div>
                      {/*end row*/}
                    </button>
                  </div>
                </div>
                {/* end card header */}
              </div>
              {/*end col*/}
            </div>
            {/*end row*/}
             {/* Funds Information */}
            <div className="row">
            <div className="col-xl-12">
              <div className="card crm-widget">
                <div className="card-body p-0">
                  <div className="row row-cols-md-3 row-cols-1">
                    <div className="col col-lg border-end">
                      <div className="py-4 px-3">
                        <h5 className="text-muted text-uppercase fs-13">
                          Disbursed Amount{" "}
                          <i className="ri-arrow-up-circle-line text-success fs-18 float-end align-middle" />
                        </h5>
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0">
                          <i className="ri-currency-line display-6 text-muted" />
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h2 className="mb-0">
                              <span className="counter-value" data-target={197}>
                                {"K"+disbursedAmount}
                              </span>
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col col-lg border-end">
                      <div className="py-4 px-3">
                        <h5 className="text-muted text-uppercase fs-13">
                          Repayment Amount{" "}
                          <i className="ri-arrow-up-circle-line text-info fs-18 float-end align-middle" />
                        </h5>
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0">
                          <i className="ri-currency-line display-6 text-muted" />
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h2 className="mb-0">
                              <span className="counter-value" data-target={197}>
                                {"K"+repaymentAmount}
                              </span>
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* end col */}
                    <div className="col col-lg border-end">
                      <div className="py-4 px-3">
                        <h5 className="text-muted text-uppercase fs-13">
                          Paid Amount{" "}
                          <i className="ri-arrow-up-circle-line text-success fs-18 float-end align-middle" />
                        </h5>
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0">
                          <i className="ri-currency-line display-6 text-muted" />
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h2 className="mb-0">
                              <span className="counter-value" data-target={197}>
                                {"K"+rePaidAmount}
                              </span>
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* end col */}
                    <div className="col col-lg border-end">
                      <div className="py-4 px-3">
                        <h5 className="text-muted text-uppercase fs-13">
                          UnPaid Balance{" "}
                          <i className="ri-arrow-up-circle-line text-danger fs-18 float-end align-middle" />
                        </h5>
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0">
                          <i className="ri-currency-line display-6 text-muted" />
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h2 className="mb-0">
                              <span className="counter-value" data-target={197}>
                                {"K"+outstandingAmount}
                              </span>
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col col-lg border-end">
                      <div className="py-4 px-3">
                        <h5 className="text-muted text-uppercase fs-13">
                        Late Payment Penalty{" "}
                          <i className="ri-arrow-up-circle-line text-danger fs-18 float-end align-middle" />
                        </h5>
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0">
                            <i className="ri-currency-line display-6 text-muted" />
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h2 className="mb-0">
                              <span className="counter-value" data-target={197}>
                                {"K"+latePaymentPenalty}
                              </span>
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* end col */}
                  </div>
                  {/* end row */}
                </div>
                {/* end card body */}
              </div>
              {/* end card */}
            </div>
            {/* end col */}
          </div>
          {/* Funds Information End */}
           {/* Dates Information */}
          <div className="row">
            <div className="col-xl-12">
              <div className="card crm-widget">
                <div className="card-body p-0">
                  <div className="row row-cols-md-3 row-cols-1">
                    <div className="col col-lg border-end">
                      <div className="py-4 px-3">
                        <h5 className="text-muted text-uppercase fs-13">
                          Disbursement Date{" "}
                          <i className="ri-arrow-up-circle-line text-info fs-18 float-end align-middle" />
                        </h5>
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0">
                          <i className="ri-time-line display-6 text-muted" />
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h5 className="mb-0">
                              <span className="text-muted" data-target={197}>
                                {this.formatDateTime(disbursementDate)}
                              </span>
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col col-lg border-end">
                      <div className="py-4 px-3">
                        <h5 className="text-muted text-uppercase fs-13">
                          Due Date{" "}
                          <i className="ri-arrow-up-circle-line text-info fs-18 float-end align-middle" />
                        </h5>
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0">
                          <i className="ri-time-line display-6 text-muted" />
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h5 className="mb-0">
                              <span className="text-muted" data-target={197}>
                                {this.formatDateTime(dueDate)}
                              </span>
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* end col */}
                    <div className="col col-lg border-end">
                      <div className="py-4 px-3">
                        <h5 className="text-muted text-uppercase fs-13">
                          Term{" "}
                          <i className="ri-arrow-up-circle-line text-info fs-18 float-end align-middle" />
                        </h5>
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0">
                          <i className="ri-time-line display-6 text-muted" />
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h5 className="mb-0">
                              <span className="text-muted" data-target={197}>
                                {loanTerm+" Months"}
                              </span>
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* end col */}
                    <div className="col col-lg border-end">
                      <div className="py-4 px-3">
                        <h5 className="text-muted text-uppercase fs-13">
                          Term Spent{" "}
                          <i className="ri-arrow-up-circle-line text-info fs-18 float-end align-middle" />
                        </h5>
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0">
                           <i className="ri-time-line display-6 text-muted" />
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h5 className="mb-0">
                              <span className="text-muted" data-target={197}>
                                {spent}
                              </span>
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col col-lg border-end">
                      <div className="py-4 px-3">
                        <h5 className="text-muted text-uppercase fs-13">
                          Term Left{" "}
                          <i className="ri-arrow-up-circle-line text-info fs-18 float-end align-middle" />
                        </h5>
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0">
                            <i className="ri-time-line display-6 text-muted" />
                          </div>
                          <div className="flex-grow-1 ms-3">
                            <h5 className="mb-0">
                              <span className="text-muted" data-target={197}>
                                {left}
                              </span>
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* end col */}
                  </div>
                  {/* end row */}
                </div>
                {/* end card body */}
              </div>
              {/* end card */}
            </div>
            {/* end col */}
          </div>

            {/* end row*/}
          </div>{" "}
          {/* end .h-100*/}
        </div>{" "}
        {/* end col */}
        {/* end col */}
      </div>
    </Slide>;
  }
}
//  id
//  sign a letter of sale