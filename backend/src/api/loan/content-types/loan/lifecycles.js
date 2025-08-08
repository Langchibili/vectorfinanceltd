'use strict';
const  { SendSmsNotification,SendEmailNotification }  = require('../../../../services/messages')
const  { calculateLoan }  = require('../../../../services/intererestCalculation')
const  { createSchedule }  = require('../../../../services/repaymentSchedule')
const { getAdminUserEmailsAndNumbers } = require('../../../../services/getAdminUserEmailsAndNumbers')


const getAppStatus = async () => {
  return await strapi.db.query("api::app-status.app-status").findOne();
}

const getLoan = async (id) => {
      return await strapi.db.query("api::loan.loan").findOne({
          where: { id: id },
          populate: ['loanType','client']
      })
}

const getFinances = async () => {
    return await strapi.db.query("api::finance.finance").findOne()
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
        const loanId = params.where?.id
        const getLoanClient = async (id) => {
            return await strapi.db.query("api::loan.loan").findOne({
              where: { id },
              populate: {
                // populate the client relation…
                client: {
                  // …and inside client, populate its many-to-many formsToFill
                  populate: {
                    formsToFill: true
                  }
                }
              }
            });
        };
        const { client }  = await getLoanClient(loanId)
        if (updatedById) { // id of admin user account which wants to update
          const adminUser = await strapi.query('admin::user').findOne({  where: { id: updatedById } })
          const { loanApproverEmails } = await getAdminUserEmailsAndNumbers()
          const { loanDisburserEmails } = await getAdminUserEmailsAndNumbers()
          
          /* these checks are happening here because if any of the following things happen during the following loan states, an error should be thrown to avoid completing the update. */
          // If current status is already approved or disbursed, block the update
          if (loan.loanStatus === "request-approval") {
              if(client.formsToFill.length < 1){
                const notificationBody = "You cannot request for approval of this loan before adding forms for the client to fill when approved, please ensure that you add a form to the formsToFill field on the user's record (the client)."
                SendEmailNotification(adminUser.email,notificationBody)
                throw new Error('Loan cannot be changed to request approval')
              }
          }
          if (loan.loanStatus === "accepted") {
            // only users allowed to disburse loans can disburse them.
            if(!loanApproverEmails.includes(adminUser.email)){ 
              const notificationBody = "You cannot accept loans, please change the loan status to request-approval or use an account that has the priviledge to accept or approve."
              SendEmailNotification(adminUser.email,notificationBody)
              throw new Error('Loan cannot be accepted by user')
            }
            // cannot accept a loan that has no forms to fill on it
            if(client.formsToFill.length < 1){
              const notificationBody = "You cannot accept this loan before adding forms for the client to fill, please ensure that you add a form to the formsToFill field on the user(client's) record."
              SendEmailNotification(adminUser.email,notificationBody)
              throw new Error('Loan cannot be accepted')
            }
            params.data.acceptanceDate = new Date() // you should add the date of when it's been accepted
          }
          
          if (loan.loanStatus === "approved") {
            // only users allowed to disburse loans can disburse them.
            if(!loanApproverEmails.includes(adminUser.email)){ 
              const notificationBody = "You cannot approve loans, please change the loan status to request-approval or use an account that has the priviledge to approve."
              SendEmailNotification(adminUser.email,notificationBody)
              throw new Error('Loan cannot be approved by user')
            }
            // loan must be accepted first before attempting to approve it.
            if(!loan.acceptanceDate){ 
              const notificationBody = "You cannot approve this loan before the client signs the loan form, make sure the loan status is first set to accepted before you can approve."
              SendEmailNotification(adminUser.email,notificationBody)
              throw new Error('Loan cannot be approved before being accepted')
            }
            // const { autoSendMessageOnLoanAcceptance, minutesBeforeLoanDisbursement} = await strapi.db.query("api::loans-information.loans-information").findOne()
            // this is to stop the loan officer or loan approving officer from approving the loan and hence changing the loan status before the client signs the documents
            // if(getMinutesDifference(loan.acceptanceDate, new Date()) < (minutesBeforeLoanDisbursement || 15)){
            //   const notificationBody = "Please wait a few minutes before you can change the loan status to approved, this is such that the client has enough time to sign the loan documents"
            //   SendEmailNotification(adminUser.email,notificationBody)
            //   throw new Error('Loan cannot be approved client has signed documents.')
            // }
            if(!loan.loanAgreementDocuments){
               const notificationBody = "The loan cannot be approved at the moment, this is because the client has not signed the loan form yet. You shall be alerted when the client finally signs the documents."
               SendEmailNotification(adminUser.email,notificationBody)
               throw new Error('Loan cannot be approved at the moment')
            }
            params.data.approvalDate = new Date() // you should add the date of when it's been accepted
          }
          if (loan.loanStatus === "disbursed") {
            if(!loanDisburserEmails.includes(adminUser.email)){
              const notificationBody = "You cannot change a loan's status to disbursed with this account, please change the loan status to request-approval or use an account that has the priviledge to change the loan's status to disbursed."
              SendEmailNotification(adminUser.email,notificationBody)
              throw new Error('Loan cannot be disbursed by user')
            }
            // loan must be accepted first before attempting to approve it.
            if(!loan.approvalDate){ 
              const notificationBody = "You cannot change this loan's status to disbursed before the loan has been approved, make sure the loan's status is first set to approved before you may proceed to disbursemt."
              SendEmailNotification(adminUser.email,notificationBody)
              throw new Error('Loan cannot be disbursed before being approved')
            }
            // loan must be accepted first before attempting to approve it.
            if(!loan.acceptanceDate){ 
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
        const loanStatuses = ["request-approval","pending-approval","approved","disbursed","accepted"]
        const loanBefore = data

        if(data && data.id && loanStatuses.includes(data.loanStatus)){
              const loan = await getLoan(params.data.id)
              const finances = await getFinances() // the loan financial aspect
              const appStatus = await getAppStatus()
              const {loanApproverEmails, loanDisburserEmails, loanApproverNumbers, loanAdministratorEmails, adminNotificationsEmails} = await getAdminUserEmailsAndNumbers()
             
              const setLoanRepaymentAmount = async (loanAfter) => {
                if(!loanBefore){
                    return
                }
                /* LOAN LOGIC  */
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
                        
                    const notificationBody = "The loan with id #"+loanBefore.id + " has been disbursed. You can now view this loan's Repayment Schedule." 
                    loanAdministratorEmails.forEach(email => {
                        SendEmailNotification(email,notificationBody)
                    })
                    adminNotificationsEmails.forEach(email => {
                        SendEmailNotification(email,notificationBody)
                    })
                    const notificationBodyForDisurser = "The loan with id #"+loanBefore.id  +" has been approved, you may now change the loan's status to disbursed, and please note that this will also create a repayment schedule for the loan. Thank you."
                    loanDisburserEmails.forEach(email => {
                        SendEmailNotification(email,notificationBodyForDisurser)
                    })
                }
              }
              
              if (loanBefore.loanStatus === "request-approval") { // only for lower level loan administrators  
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
              
              if (loanBefore.loanStatus === "accepted") {
                  const { autoSendMessageOnLoanAcceptance} = await strapi.db.query("api::loans-information.loans-information").findOne()
                  const { client } = loan
                  // send a message to client that the they should sign documents if auto messages have been allowed on loan acceptance
                  if(autoSendMessageOnLoanAcceptance && autoSendMessageOnLoanAcceptance === "yes"){
                      const notificationBody = "Your loan request with vector finance limited has been processed, as a final step before we disburse you the funds, we require that you fill some important documents, we have sent you some forms to fill on your portal account. Thank you for choosing VectorFin."
                      SendEmailNotification(client.email,notificationBody)
                      const clientPhoneNumber = "+260"+returnNineDigitNumber(client.username)
                      SendSmsNotification(clientPhoneNumber,notificationBody)
                  }
              } 

              if (loanBefore.loanStatus === "pending-approval") {
                    if(loanBefore.loanAgreementDocuments){
                      const notificationBody = "The loan with Id #"+loanBefore.id  +" has been signed by the client, you may now approve the loan in order to alert them that they should await disbursement of funds."
                      loanApproverEmails.forEach(email => {
                        SendEmailNotification(email,notificationBody)
                      })
                    }
              }
                
              if (loanBefore.loanStatus === "approved") {
                      const notificationBody = "The loan with id #"+loanBefore.id + " has been approved." 
                      loanAdministratorEmails.forEach(email => {
                          SendEmailNotification(email,notificationBody)
                      })
                      adminNotificationsEmails.forEach(email => {
                          SendEmailNotification(email,notificationBody)
                      })
              }
              // when loan has been disbursed
              await setLoanRepaymentAmount(result)
        }
        
    },
};
