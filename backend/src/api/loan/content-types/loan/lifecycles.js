'use strict';
const  { SendSmsNotification,SendEmailNotification }  = require('../../../../services/messages')
const  { calculateLoan }  = require('../../../../services/intererestCalculation')
const  { createSchedule }  = require('../../../../services/repaymentSchedule')
const { getAdminUserEmailsAndNumbers } = require('../../../../services/getAdminUserEmailsAndNumbers')


const getAppStatus = async () => {
  return await strapi.db.query("api::app-status.app-status").findOne();
}

     
const calculateDueDate = (date, loanTerm)=>{
    // Parse the initial date
    const startDate = new Date(date);
    
    // Add the loan term in months to the initial date
    const dueDate = new Date(startDate);
    dueDate.setMonth(startDate.getMonth() + loanTerm);
    
    // Format the date as 'YYYY-MM-DDTHH:mm:ss.sssZ'
    const isoString = dueDate.toISOString();

    return isoString;
}


const returnNineDigitNumber = (phoneNumber) =>{
    return phoneNumber.replace(/\D/g, '').slice(-9)
}


function getMinutesDifference(date1, date2) {
  // Ensure both are Date objects
  const d1 = new Date(date1)
  const d2 = new Date(date2)

  // Validate the date inputs
  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
    throw new Error('Invalid date(s) provided')
  }

  // Calculate the absolute difference in milliseconds
  const diffMs = Math.abs(d1 - d2)

  // Convert to minutes
  const diffMinutes = Math.floor(diffMs / 60000) // 1000 ms * 60 sec

  return diffMinutes
}


module.exports = {
  async beforeUpdate(event) { // for handling the approval and disbursement
        const { params } = event
        const updatedById = params?.data?.updatedBy
        const loan = params?.data
        if (updatedById) { // id of admin user account which wants to update
          const adminUser = await strapi.query('admin::user').findOne({  where: { id: updatedById } })
          const { loanApproverEmails } = await getAdminUserEmailsAndNumbers()
          const { loanDisburserEmails } = await getAdminUserEmailsAndNumbers()
          const { minutesBeforeLoanDisbursement } = await strapi.db.query("api::loans-information.loans-information").findOne()
          console.log("loan",loan)
          // If current status is already approved or disbursed, block the update
          if (loan.loanStatus === "accepted") {
              params.data.acceptanceDate = new Date() // you should add the date of when it's been accepted
          }
          if (loan.loanStatus === "approved") {
            if(!loanApproverEmails.includes(adminUser.email)){ // only users allowed to disburse loans can disburse them.
              const notificationBody = "You cannot approve loans, please change the loan status to request-approval or use an account that has the priviledge to approve."
              SendEmailNotification(adminUser.email,notificationBody)
              throw new Error('Loan cannot be updated by user')
            }
            if(!loan.acceptanceDate){ // loan must be accepted first before attempting to approve it.
              const notificationBody = "You cannot approve this loan before the client signs the loan form, make sure the loan status is first set to accepted before you can approve."
              SendEmailNotification(adminUser.email,notificationBody)
              throw new Error('Loan cannot be approved before being accepted')
            }
            if(getMinutesDifference(loan.acceptanceDate, new Date()) < (minutesBeforeLoanDisbursement || 15)){
              const notificationBody = "Please wait a few minutes before you can change the loan status to approved, this is such that the client has enough time to sign the loan documents"
              SendEmailNotification(adminUser.email,notificationBody)
              throw new Error('Loan cannot be approved client has signed documents.')
            }
            params.data.approvalDate = new Date() // you should add the date of when it's been accepted
          }
          if (loan.loanStatus === "disbursed") {
            if(!loanDisburserEmails.includes(adminUser.email)){
              const notificationBody = "You cannot change a loan's status to disbursed with this account, please change the loan status to request-approval or use an account that has the priviledge to change the loan's status to disbursed."
              SendEmailNotification(adminUser.email,notificationBody)
              throw new Error('Loan cannot be disbursed by user')
            }
            if(!loan.approvalDate){ // loan must be accepted first before attempting to approve it.
              const notificationBody = "You cannot change this loan's status to disbursed before the loan has been approved, make sure the loan's status is first set to approved before you may proceed to disbursemt."
              SendEmailNotification(adminUser.email,notificationBody)
              throw new Error('Loan cannot be disbursed before being approved')
            }
            if(!loan.acceptanceDate){ // loan must be accepted first before attempting to approve it.
              const notificationBody = "You cannot change this loan's status to disbursed before the loan has been accepted, make sure the loan's status is first set to accepted before you may proceed to disbursemt."
              SendEmailNotification(adminUser.email,notificationBody)
              throw new Error('Loan cannot be disbursed before being accepted')
            }
          }
        } 
        else {
          console.log('No updatedBy ID provided')
        }
    },
    async afterUpdate(event) {
        const { result, params } = event;
        const { data } = params;
        
        if(!params.data.id){
            return
        }
        const getLoan = async () => {
            return await strapi.db.query("api::loan.loan").findOne({
                where: { id: params.data.id },
                populate: ['loanType','client']
            });
        }

        const getFinances = async () => {
           return await strapi.db.query("api::finance.finance").findOne()
        }

        const setLoanRepaymentAmount = async (loanBefore, loanAfter) => {
            if(!loanBefore){
                return
            }

            /* LOAN LOGIC  */
                    
              const loan = await getLoan();
              const finances = await getFinances() // the loan financial aspect
              const appStatus = await getAppStatus()

              if (loanBefore.loanStatus === "request-approval") { // only for lower level loan administrators
                  const { loanApproverEmails } = await getAdminUserEmailsAndNumbers()
                  const { loanApproverNumbers } = await getAdminUserEmailsAndNumbers()
                  const notificationBody = "A vectorFin loan officer is requesting approval of a loan with id #"+loanBefore.id 
                  // for test and local app mode
                  const numbersArray = await strapi.db.query("api::phone-numbers-list.phone-numbers-list").findOne();
                  const emailsArray = await strapi.db.query("api::email-addresses-list.email-addresses-list").findOne();
                  
                  const adminPhoneNumbers = appStatus.status === "production"? loanApproverNumbers : numbersArray.adminNumbers
                  const adminEmailAddress = appStatus.status === "production"? loanApproverEmails : emailsArray.adminEmailAddresses
                  
                  adminPhoneNumbers.forEach(number => {
                      const phoneNumber = "+260"+returnNineDigitNumber(number)
                      SendSmsNotification(phoneNumber,notificationBody)
                  })
                  
                  adminEmailAddress.forEach(email => {
                      SendEmailNotification(email,notificationBody)
                  })
                  return
              }
              if (loanBefore.loanStatus === "disbursed") {
                  let repaymentAmount = null;
                  if (!loan.loanType) { 
                    return 
                  }
                  // disbusement logic
                  if(parseInt(loanBefore.outstandingAmount) >= 1){ // it means you already approved the loan
                    return
                  }
                  if (loan.loanType.typeName === "salaryBased") { 
                      const { totalPayment } =  await calculateLoan({amount:loanBefore.loanAmount,termMonths:loanBefore.loanTerm,loanType:{typeName : 'salaryBased'}})
                      repaymentAmount = totalPayment;
                  } else { // for all asset based loans
                      const { totalPayment } =  await calculateLoan({amount:loanBefore.loanAmount, termMonths:loanBefore.loanTerm, loanType:{typeName : 'assetBased'}})
                      repaymentAmount = totalPayment;
                  }

                  if(!loanBefore.id){
                      return
                  }

                  if(!loanBefore.paymentScheduleCreated){
                      createSchedule(params.data.id) // create a repayment schedule
                  }
                  const updateLoanAmountObject = {
                      outstandingAmount: parseFloat(repaymentAmount),
                      repaymentAmount: parseFloat(repaymentAmount),
                      disbursedAmount: parseFloat(loanBefore.loanAmount),
                      disbursementDate: new Date(),
                      dueDate: calculateDueDate(loanAfter.updatedAt, loanBefore.loanTerm)
                  }
                  const financesUpdateObject = {
                    totalAmountLoanedOut: parseFloat(finances.totalAmountLoanedOut) + parseFloat(loanBefore.loanAmount)
                  }
                  await strapi.db.query('api::loan.loan').update({ where: { id: loanBefore.id }, data: updateLoanAmountObject });
                  if(appStatus.status === 'production'){// only update the finance part of loans if in production
                      await strapi.db.query('api::finance.finance').update({ where: { id: finances.id }, data: financesUpdateObject }); // id = 0 because it's a single content type
                      //SendEmailNotification(loan.client.email,"Congratulations! Your loan has been disbursed. Go to portal.vectorfinancelimited.com and check out your dashboard.")
                  }
                      
                  
              }
          };

        await setLoanRepaymentAmount(data, result);
    },
};
