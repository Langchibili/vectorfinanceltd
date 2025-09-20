'use strict';
const  { SendSmsNotification,SendEmailNotification }  = require('../../../../services/messages')
const  { calculateLoan }  = require('../../../../services/intererestCalculation')
const  { createSchedule, createScheduleCriteria2, createScheduleCriteria3 }  = require('../../../../services/repaymentSchedule')
const { getAdminUserEmailsAndNumbers } = require('../../../../services/getAdminUserEmailsAndNumbers');


const getAppStatus = async () => {
  return await strapi.db.query("api::app-status.app-status").findOne();
}

const getLoan = async (id) => {
      return await strapi.db.query("api::loan.loan").findOne({
          where: { id: id },
          populate: ['loanType','collateral','collateral.vehicle','collateral.vehicle.sessionLetterTemplate', 'collateral.vehicle.sessionLetter','loanAgreementDocuments','disbursementPOP','client',"loanFormApendixSection"]
      })
}

const getLoanFormValues = async (loanId) => {
      return await strapi.db.query("api::form-fill-value.form-fill-value").findOne({
        where: { loanId },
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
        const getLoanClientAppendix = async (id) => {
          return await strapi.db.query("api::loan.loan").findOne({
            where: { id },
            populate: {
              client: {
                populate: {
                  formsToFill: true
                }
              },
              loanFormApendixSection: true
            }
          });
        }
        
        const updateAuthenticated = ()=>{
             if(updatedById){
                return true
             }
             if(loan.frontendUpdateKey){
                 return loan.frontendUpdateKey === process.env.FRONTENDUPDATEKEY
             }
             return false
        }
        
        const { client, loanAppendixCreated, newLoanAmountOffer, loanAmount }  = await getLoanClientAppendix(loanId)
        
        if (updateAuthenticated()) { // id of admin user account which wants to update
          const { loanApproverEmails, loanDisburserEmails, adminNotificationsEmails } = await getAdminUserEmailsAndNumbers()
          const updatedByUserEmail = updatedById? (await strapi.query('admin::user').findOne({  where: { id: updatedById } })).email : adminNotificationsEmails[0]
          
          /* these checks are happening here because if any of the following things happen during the following loan states, an error should be thrown to avoid completing the update. */
          // If current status is already approved or disbursed, block the update
          if (loan.loanStatus === "request-approval") {
              if(client.formsToFill.length < 1){
                const notificationBody = "You cannot request for approval of this loan before adding forms for the client to fill when approved, please ensure that you add a form to the formsToFill field on the user's record (the client)."
                SendEmailNotification(updatedByUserEmail,notificationBody)
                throw new Error('Loan cannot be changed to request approval')
              }
              if(loan.loanAmount && (loan.loanAmount > 0 && loan.loanAmount !== loanAmount)){
                 loan.loanAmountUpdated = true
              }
              if(loan.newLoanAmountOffer && (loan.newLoanAmountOffer > 0 && loan.newLoanAmountOffer !== newLoanAmountOffer)){
                 loan.newLoanAmountOffered = true
              }
          }
          if (loan.loanStatus === "accepted") {
            // only users allowed to disburse loans can disburse them.
            if(updatedById && !loanApproverEmails.includes(updatedByUserEmail)){ // check for updatedById here because this ensures if a user decides to use the backend to update, the updatedById will be set
              const notificationBody = "You cannot accept loans, please change the loan status to request-approval or use an account that has the priviledge to accept or approve."
              SendEmailNotification(updatedByUserEmail,notificationBody)
              throw new Error('Loan cannot be accepted by user')
            }
            // cannot accept a loan that has no forms to fill on it
            if(client.formsToFill.length < 1){
              const notificationBody = "You cannot accept this loan before adding forms for the client to fill, please ensure that you add a form to the formsToFill field on the user(client's) record."
              SendEmailNotification(updatedByUserEmail,notificationBody)
              throw new Error('Loan cannot be accepted')
            }
            params.data.acceptanceDate = new Date() // you should add the date of when it's been accepted
          }
         
          // this should only be added when a user signs the documents
          if(loan.loanStatus === "pending-approval"){ // this is for error check purposes
            if(loan.loanFormApendixSection){ // if the appendix section has at least being opened by loan officer
              if(!loanAppendixCreated){ // check only if appendix has been created before, not when about to save or create it, hence get from loan as is, not as is to become
                if(!loan.loanAgreementDocuments){ 
                  const notificationBody = "You cannot add the appendix information to this loan, because the client has not yet signed the loan form."
                  SendEmailNotification(updatedByUserEmail,notificationBody)
                  throw new Error('Appendix information cannot be added to loan')
                }
              }
            }
          }
        

          if (loan.loanStatus === "disbursed") {
            // loan must be accepted first before attempting to approve it.
            if(!loan.approvalDate){ 
              const notificationBody = "You cannot change this loan's status to disbursed before the loan has been approved, make sure the loan's status is first set to approved before you may proceed to disbursemt."
              SendEmailNotification(updatedByUserEmail,notificationBody)
              throw new Error('Loan cannot be disbursed before being approved')
            }
            // loan must be accepted first before attempting to approve it.
            if(!loan.acceptanceDate){ 
              const notificationBody = "You cannot change this loan's status to disbursed before the loan has been accepted, make sure the loan's status is first set to accepted before you may proceed to disbursemt."
              SendEmailNotification(updatedByUserEmail,notificationBody)
              throw new Error('Loan cannot be disbursed before being accepted')
            }
          }
        } 
        else {
          console.log('No updatedBy ID provided')
        }
        if(loan.frontendUpdateKey){
            if(loan.frontendUpdateKey !== process.env.FRONTENDUPDATEKEY){
               throw new Error('FORBIDDEN REQUEST, invalid frontendUpdateKey')
            }
            delete loan.frontendUpdateKey // this could ccause unprecedented errors, so delete it, it's only useful for authentication, beyond which it's useless
        }
    },
    async afterUpdate(event) {
        const { result, params } = event;
        const { data } = params;
        const loanStatuses = ["request-approval","pending-approval","pending-collateral-inspection","collateral-inspection","approved","disbursed","accepted","rejected"]
        const loanBefore = result  
        if(result && result.id && loanStatuses.includes(result.loanStatus)){
              const loan = await getLoan(params.data?.id || result.id)
              const finances = await getFinances() // the loan financial aspect
              const appStatus = await getAppStatus()
              const {loanApproverEmails, loanDisburserEmails, loanApproverNumbers, loanAdministratorNumbers, loanAdministratorEmails, adminNotificationsEmails, adminNotificationsNumbers} = await getAdminUserEmailsAndNumbers()
             
              const setLoanRepaymentAmount = async (loanAfter) => {
                if(!loanBefore){
                    return
                }
                /* LOAN LOGIC  */
                if (loanBefore.loanStatus === "accepted") {
                    let repaymentAmount = null;
                    if (!loan.loanType) { 
                      return 
                    }
                    // loan accepted logic
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
                    if(!loanBefore.paymentScheduleCreated){
                        createScheduleCriteria3(params.data.id)
                        // createScheduleCriteria2(params.data.id)
                        //createSchedule(params.data.id) // create a repayment schedule
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
                    const { autoSendMessageOnLoanAcceptance} = await strapi.db.query("api::loans-information.loans-information").findOne()
                    const { client } = loan
                    // send a message to client that the they should sign documents if auto messages have been allowed on loan acceptance
                    const notificationBody = "Loan with id #"+loanBefore.id+" has been approved."
                    adminNotificationsEmails.forEach(email => {
                            SendEmailNotification(email,notificationBody)
                    })
                    if(autoSendMessageOnLoanAcceptance && autoSendMessageOnLoanAcceptance === "yes"){
                        const notificationBody = "Your loan request with vector finance limited has been processed and accepted, as a final step before we disburse you the funds, we require that you fill some important documents, we have sent you some forms to fill on your portal account. Thank you for choosing VectorFin."
                        SendEmailNotification(client.email,notificationBody)
                        SendSmsNotification(client.username,notificationBody) // client.username is a phone number
                    }
                }
              }
              
              if (loanBefore.loanStatus === "request-approval") { // only for lower level loan administrators  
                       if(loanBefore.loanAmountUpdated){
                          await strapi.db.query('api::loan.loan').update({ where: { id: loanBefore.id }, data: {loanAmountUpdated:false} });
                          return
                       }      
                       if(loan.newLoanAmountOfferDeclined){ // alert the approvers of their amount offer being declined
                          const newLoanAmountOffer = loanBefore.newLoanAmountOffer
                          const notificationBody = "Client has declined the offer of amount K"+newLoanAmountOffer+" made to the loan with id #"+loanBefore.id+" there reason: "+loanBefore.newLoanAmountOfferDeclineReason+" take the next action from here: "+process.env.CLIENTURL+"/admin/loans/"+loanBefore.id
                          
                          loanApproverEmails.forEach(email => {
                              SendEmailNotification(email,notificationBody)
                          })
                          adminNotificationsEmails.forEach(email => {
                              SendEmailNotification(email,notificationBody)
                          })
                          loanApproverNumbers.forEach(number => {
                              SendSmsNotification(number,notificationBody)
                          })
                          await strapi.db.query('api::loan.loan').update({ where: { id: loanBefore.id }, data: {newLoanAmountOfferDeclined:false} });
                          return
                      }
                      if(loan.newLoanAmountOfferAccepted){ // alert the approvers of their amount offer being accepted
                          const newLoanAmountOffer = loanBefore.newLoanAmountOffer
                          const notificationBody = "Client has accepted the offer of amount K"+newLoanAmountOffer+" made to the loan with id #"+loanBefore.id+" the new loan amount is now: "+newLoanAmountOffer+" take the next action from here: "+process.env.CLIENTURL+"/admin/loans/"+loanBefore.id
                          
                          loanApproverEmails.forEach(email => {
                              SendEmailNotification(email,notificationBody)
                          })
                          adminNotificationsEmails.forEach(email => {
                              SendEmailNotification(email,notificationBody)
                          })
                          loanApproverNumbers.forEach(number => {
                              SendSmsNotification(number,notificationBody)
                          })
                          await strapi.db.query('api::loan.loan').update({ where: { id: loanBefore.id }, data: {newLoanAmountOfferAccepted:false} });
                          return
                      }
                      if(loan.newLoanAmountOffered){ // alert the loan administrators of a new loan amount being offered to the loan
                          const newLoanAmountOffer = loanBefore.newLoanAmountOffer
                          const newLoanAmountOfferedReason = loanBefore.newLoanAmountOfferedReason? "The reason provided for the new offer is: "+loanBefore.newLoanAmountOfferedReason : ""
                          const notificationBody = "An offer of amount K"+newLoanAmountOffer+" has been made to the loan with id #"+loanBefore.id+", please communicate with the client about this offer, and upon the client accepting or declining it, you can approve or decline the offered amount at: "+process.env.CLIENTURL+"/admin/loans/"+loanBefore.id+ " "+newLoanAmountOfferedReason
                          
                          loanAdministratorEmails.forEach(email => {
                              SendEmailNotification(email,notificationBody)
                          })
                          adminNotificationsEmails.forEach(email => {
                              SendEmailNotification(email,notificationBody)
                          })
                          loanAdministratorNumbers.forEach(number => {
                              SendSmsNotification(number,notificationBody)
                          })
                          await strapi.db.query('api::loan.loan').update({ where: { id: loanBefore.id }, data: {newLoanAmountOffered:false} });
                          return
                      }
                      if(loanBefore.newLoanAmountOffer && loanBefore.newLoanAmountOffer > 0 && loanBefore.newLoanAmountOffer !== loanBefore.loanAmount){
                        return // this means an offer was made, so no need to resend messages from the back and forth
                      }
                      if(loanBefore.clientAskingAmount && loanBefore.clientAskingAmount > 0 && loanBefore.clientAskingAmount !== loanBefore.loanAmount){
                        return // this means the loan amount was changed, so no need to resend messages from the back and forth
                      }
                      const notificationBody = "A vectorFin loan officer is requesting approval of a loan with id #"+loanBefore.id+" you can approve it at: "+process.env.CLIENTURL+"/admin/loans/"+loanBefore.id 
                      // for test and local app mode
                      const numbersArray = await strapi.db.query("api::phone-numbers-list.phone-numbers-list").findOne();
                      const emailsArray = await strapi.db.query("api::email-addresses-list.email-addresses-list").findOne();
                      
                      const adminPhoneNumbers = appStatus.status === "production"? loanApproverNumbers : numbersArray.adminNumbers
                      const adminEmailAddress = appStatus.status === "production"? loanApproverEmails : emailsArray.adminEmailAddresses
                      
                      adminEmailAddress.forEach(email => {
                          SendEmailNotification(email,notificationBody)
                      })
                      adminPhoneNumbers.forEach(number => {
                          SendSmsNotification(number,notificationBody)
                      })
                      return
              }
              
              if (loanBefore.loanStatus === "pending-collateral-inspection") {
                    const { collateral } = loan
                    if(collateral.collateralType === 'vehicle'){
                      const { vehicle } = collateral
                      const { client } = loan
                      // this is when the sessionletter template has just been uploaded
                      if(vehicle.insuranceType && (vehicle.insuranceType === "third-party" || vehicle.insuranceType === "comprehensive") && vehicle.sessionLetterTemplate && !loan.sessionLetterTemplateUploaded){
                          const clientNotificationBody = "A session letter template file has been uploaded to your account, please download it and send it to your insurance company, details have been placed on your account, download the file from: "+process.env.CLIENTURL+" or give us a call for any other queries at "+adminNotificationsNumbers[0]+". Regards, Vectorfin."
                          SendEmailNotification(client.email,clientNotificationBody)
                          SendSmsNotification(client.username,clientNotificationBody) // client.username is a phone number
                          await strapi.db.query('api::loan.loan').update({ where: { id: loanBefore.id }, data: {sessionLetterTemplateUploaded:true} })
                      }
                      if(vehicle.insuranceType && (vehicle.insuranceType === "third-party" || vehicle.insuranceType === "comprehensive") && vehicle.sessionLetter && !loan.sessionLetterUploaded){
                          const adminNotificationBody = "The VectorFin client who has initiated a loan with id #"+loanBefore.id + " has uploaded a session letter to their account."
                          adminNotificationsEmails.forEach(email => {
                               SendEmailNotification(email,adminNotificationBody)
                           })
                          await strapi.db.query('api::loan.loan').update({ where: { id: loanBefore.id }, data: {sessionLetterUploaded:true} })
                      }
                      if(!loan.insuranceMessageSent){
                        // this is for insurance type and requests checks 
                        if(vehicle.insuranceType && vehicle.insuranceType === "third-party"){
                          if(loan.insuranceRequest && loan.insuranceRequest === "African Gray"){
                            const adminNotificationBody = "The VectorFin client who has initiated a loan with id #"+loanBefore.id + ", wants to register their vehicle's insurance under African Gray. Their phone number is: "+client.username
                            adminNotificationsEmails.forEach(email => {
                                SendEmailNotification(email,adminNotificationBody)
                            })
                            await strapi.db.query('api::loan.loan').update({ where: { id: loanBefore.id }, data: {insuranceMessageSent:true} })
                          }
                          else{
                            const adminNotificationBody = "The VectorFin client who has initiated a loan with id #"+loanBefore.id + ", does not have comprehensive insurance, but they have chosen to purchase comprehensive insurance from a company other than the recommended African Gray."
                            adminNotificationsEmails.forEach(email => {
                                SendEmailNotification(email,adminNotificationBody)
                            })
                            const clientNotificationBody = "Please note that we shall require a session letter from your insurance company, details have been placed on your account, read them from: "+process.env.CLIENTURL+" or give us a call at "+adminNotificationsNumbers[0]+". Regards, Vectorfin."
                            SendEmailNotification(client.email,clientNotificationBody)
                            SendSmsNotification(client.username,clientNotificationBody) // client.username is a phone number
                            await strapi.db.query('api::loan.loan').update({ where: { id: loanBefore.id }, data: {insuranceMessageSent:true} })
                          }
                        }
                        if(vehicle.insuranceType && vehicle.insuranceType === "comprehensive"){
                            const clientNotificationBody = "Please note that we shall require a session letter from your insurance company, details have been placed on your account, read them from: "+process.env.CLIENTURL+" or give us a call at "+adminNotificationsNumbers[0]
                            SendEmailNotification(client.email,clientNotificationBody)
                            SendSmsNotification(client.username,clientNotificationBody) // client.username is a phone number
                            await strapi.db.query('api::loan.loan').update({ where: { id: loanBefore.id }, data: {insuranceMessageSent:true} })
                          }
                      }
                    }
              }

              if (loanBefore.loanStatus === "collateral-inspection") {
                    const { collateral } = loan
                    if(collateral.collateralType === 'vehicle'){ // this is when the sessionletter template has just been uploaded
                      const { vehicle } = collateral
                      const { client } = loan
                      if(vehicle.insuranceType && (vehicle.insuranceType === "third-party" || vehicle.insuranceType === "comprehensive") && vehicle.sessionLetterTemplate && !loan.sessionLetterTemplateUploaded){
                        const clientNotificationBody = "A session letter template file has been uploaded to your account, please download it and send it to your insurance company, details have been placed on your account, download the file from: "+process.env.CLIENTURL+" or give us a call for any other queries at "+adminNotificationsNumbers[0]+". Regards, Vectorfin."
                           SendEmailNotification(client.email,clientNotificationBody)
                           SendSmsNotification(client.username,clientNotificationBody) // client.username is a phone number
                        await strapi.db.query('api::loan.loan').update({ where: { id: loanBefore.id }, data: {sessionLetterTemplateUploaded:true} })
                      }
                      if(vehicle.insuranceType && (vehicle.insuranceType === "third-party" || vehicle.insuranceType === "comprehensive") && vehicle.sessionLetter && !loan.sessionLetterUploaded){
                          const adminNotificationBody = "The VectorFin client who has initiated a loan with id #"+loanBefore.id + " has uploaded a session letter to their account."
                          adminNotificationsEmails.forEach(email => {
                               SendEmailNotification(email,adminNotificationBody)
                           })
                          await strapi.db.query('api::loan.loan').update({ where: { id: loanBefore.id }, data: {sessionLetterUploaded:true} })
                      }
                    }
                    
                    if(collateral.collateralStatus === "requesting-inspection"){
                        const { collateralInspectorNumber, collateralInspectorEmail } = await strapi.db.query("api::loans-information.loans-information").findOne()
                        const notificationBody = "A VectorFin client has initiated a loan with id #"+loanBefore.id + ", we ask that you inspect the collateral for us, details about the loan and client are on "+process.env.CLIENTURL+"/admin/loans/"+loanBefore.id
                        SendEmailNotification(collateralInspectorEmail,notificationBody)
                        SendSmsNotification(collateralInspectorNumber,notificationBody)
                    }
                    if(collateral.collateralStatus === "inspected" && !loan.collateralInspected){
                          const adminNotificationBody = "The VectorFin loan with id #"+loanBefore.id + " has been inspected."
                          adminNotificationsEmails.forEach(email => {
                               SendEmailNotification(email,adminNotificationBody)
                           })
                          loanAdministratorEmails.forEach(email => {
                              SendEmailNotification(email,adminNotificationBody)
                          })
                          loanAdministratorNumbers.forEach(number => {
                              SendSmsNotification(number,adminNotificationBody)
                          })
                          await strapi.db.query('api::loan.loan').update({ where: { id: loanBefore.id }, data: {collateralInspected:true} })
                    }
              }

              if (loanBefore.loanStatus === "pending-approval") {
                   if(loan.loanAgreementDocuments && loan.loanFormApendixSection && !loanBefore.loanAppendixCreated){ // the documents will only be signed before an appendix has been added
                      const notificationBody = "The loan with Id #"+loanBefore.id  +" has been signed by the client. You can now add their loan form appendix information."
                      adminNotificationsEmails.forEach(email => {
                            SendEmailNotification(email,notificationBody)
                      })
                    }
                    
                    if(loan.quickBooksInvoiceNumber && !loan.invoiceSent){ // this is the stage when we send an alert to the approvers that the loan has been updated, they need to disburse the funds
                       // for test and local app mode
                      const numbersArray = await strapi.db.query("api::phone-numbers-list.phone-numbers-list").findOne();
                      const emailsArray = await strapi.db.query("api::email-addresses-list.email-addresses-list").findOne();
                      
                      const adminPhoneNumbers = appStatus.status === "production"? loanApproverNumbers : numbersArray.adminNumbers
                      const adminEmailAddress = appStatus.status === "production"? loanApproverEmails : emailsArray.adminEmailAddresses
                      
                      
                      const notificationBody = "Records of The loan with Id #"+loanBefore.id+" have been updated in quickbooks, you may now disburse funds, client details are as follows "+process.env.CLIENTURL+"/admin/loans/"+loanBefore.id
                      
                      adminEmailAddress.forEach(email => {
                        SendEmailNotification(email,notificationBody)
                      })
                      adminPhoneNumbers.forEach(number => {
                          SendSmsNotification(number,notificationBody)
                      })
                      await strapi.db.query('api::loan.loan').update({ where: { id: loanBefore.id }, data: {invoiceSent:true, loanStatus:"approved"} });
                    }
                    // this should only be added when a loan officer adds the quickBooksInvoiceNumber
    
                    if (loan.loanFormApendixSection){ // if the appendix section has at least being opened by loan officer
                      if (!loan.loanAppendixCreated){ // check only if appendix has been created before, not when about to save or create it, hence get from loan as is, not as is to become
                        // let us update the loan form here with appendix info
                              const LoanFormValues = await getLoanFormValues(loanBefore.id)
                              console.log('currentLoanFormAppendix',loan.loanFormApendixSection)
                              const updateObject = { values: { ...(LoanFormValues?.values || {}), ...((({id, ...r})=>r)(loan.loanFormApendixSection||{})) } } // use currentLoanFormAppendix because we are using the data a user has just entered not from the loan as was
                              await strapi.db.query('api::loan.loan').update({ where: { id: loanBefore.id }, data: {loanAppendixCreated:true} });
                              await strapi.db.query('api::form-fill-value.form-fill-value').update({ where: { id: LoanFormValues.id }, data: updateObject });
                              const notificationBody = "Appendix to loan form for loan with id #"+loanBefore.id+" has been updated."
                              loanAdministratorEmails.forEach(email => {
                                    SendEmailNotification(email,notificationBody)
                              })
                              adminNotificationsEmails.forEach(email => {
                                    SendEmailNotification(email,notificationBody)
                              })
                              //  console.log('loanFormApendixSection',loanFormApendixSection)
                              //  console.log('formValues',formValues)
                          }
                      }
              }
              
              
              if (loanBefore.loanStatus === "approved") {
                    if(loan.disbursementPOP){ // pop is only sent when funds have been disbursed
                      const { client } = loan
                      const notificationBodyForAdmins = "POP(proof of payment) to loan with id #"+loanBefore.id  +" has been uploaded and client has been notified, as such the loan status is now disbursed. Thank you."
                      adminNotificationsEmails.forEach(email => {
                          SendEmailNotification(email,notificationBodyForAdmins)
                      })
                      // send disbursement message to client
                      const notificationBody = "Funds to your loan with vector finance limited have been disbursed, you may view your loan information from your portal account at "+process.env.CLIENTURL+". Thank you for choosing VectorFin."
                      SendEmailNotification(client.email,notificationBody)
                      SendSmsNotification(client.username,notificationBody) // client.username is a phone number
                      await strapi.db.query('api::loan.loan').update({ where: { id: loanBefore.id }, data: {loanStatus:"disbursed"} });
                    }
              }

              if (loanBefore.loanStatus === "rejected") {
                    if(!loan.rejectionMessageSent){ // pop is only sent when funds have been disbursed
                      const { client } = loan
                      const notificationBodyForAdmins = "Loan with id #"+loanBefore.id  +" has been rejected."
                      adminNotificationsEmails.forEach(email => {
                          SendEmailNotification(email,notificationBodyForAdmins)
                      })
                      // send disbursement message to client
                      const notificationBody = loan.loanRejectionReason? loan.loanRejectionReason : "Apologies, your loan request has been declined at the moment, you can re-apply any time again later or contact us via "+adminNotificationsNumbers[0]+" for further queries. Regards, VectorFin."
                      SendEmailNotification(client.email,notificationBody)
                      SendSmsNotification(client.username,notificationBody) // client.username is a phone number
                      await strapi.db.query('api::loan.loan').update({ where: { id: loanBefore.id }, data: {rejectionMessageSent:true} });
                    }
              }
             
              // when loan has been disbursed
              await setLoanRepaymentAmount(result)
        }
        
    },
};
