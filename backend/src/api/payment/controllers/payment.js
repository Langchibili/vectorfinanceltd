const { createCoreController } = require('@strapi/strapi').factories;
const axios = require('axios');
const nodemailer = require('nodemailer');


const SendSmsNotification = (phoneNumber,notificationBody)=>{
    axios.post(process.env.SMSGATEWAYURL+"/send-sms", {
        apiKey: process.env.SMSGATEWAYAPIKEY,
        username: process.env.SMSGATEWAYAPIUSERNAME,
        recipients: [phoneNumber], // array of recipients
        message: notificationBody,
        from: process.env.SMSGATEWAYAPICALLERID
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log('SMS sent successfully:', response.data);
    })
    .catch(error => {
        console.error('Error sending SMS:', error);
    });
    console.log('sending sms notification',phoneNumber,notificationBody)
}

const SendEmailNotification = (email,notificationBody)=>{
    // Configure transport options
    const transporter = nodemailer.createTransport({
        service: process.env.EMAILSERVICENAME, // Or specify an SMTP host
        auth: {
        user: process.env.EMAILSERVICEUSERNAME,
        pass: process.env.EMAILSERVICEPASSWORD
        }
    })
    
    // Send email
    transporter.sendMail({
        from: process.env.EMAILSERVICEUSERNAME,
        to: email,
        subject: 'Message from Vector Finance Limited',
        text: notificationBody
    }, (error, info) => {
        if (error) {
        console.log('Error sending email:', error);
        } else {
        console.log('Email sent:', info.response);
        }
    });
    console.log('sending email notification',email,notificationBody)
}

const getLoan = async (id) => {
    return await strapi.db.query("api::loan.loan").findOne({
        where: { id:id }
    });
};

const getUserAccount = async (username) => {
    return await strapi.db.query("plugin::users-permissions.user").findOne({
        where: { username:username }
    });
};

const getRepayment = async (transactionID) => {
    return await strapi.db.query("api::repayment.repayment").findOne({
        where: { transactionID:transactionID }
    });
};

const handlePaymentSuccessful = async (data,payload)=>{
    const loanId = data.reference.split('-')[2]
    const clientNumber = data.reference.split('-')[3] // client username
    const paymentDate = data.completedAt
    const transactionID = data.id
    const transactionReference = data.reference
    const paymentStatus = "Paid"
    const repaymentAmount = parseFloat(data.amount).toFixed(2)
    const loan = await getLoan(loanId) // get the loan tied to the payment
    const client = await getUserAccount(clientNumber) // get the client tied to the payment
    const outstandingAmount = parseFloat( loan.outstandingAmount).toFixed(2)
    const newOutStandingAmount = parseFloat(outstandingAmount - repaymentAmount).toFixed(2) // remove the amount paid from the loan's oustanding amount
    let paymentMethod = "card"
    if(data.mobileMoneyDetails){
       if(data.mobileMoneyDetails.operator === 'airtel'){
          paymentMethod = "airtel-money"
       }
       else if(data.mobileMoneyDetails.operator === 'mtn'){
          paymentMethod = "mtn-money"
       }
       else{
          paymentMethod = "mobile-money"
       }
    }
    let repaymentType = "partial-payment"
    if(outstandingAmount === repaymentAmount){
        repaymentType = "full-payment"
    }
    // update the loan by subtracting the paid amount from the oustandingAmount
    const updatedLoan = await strapi.db.query('api::loan.loan').update({ where: { id: loanId }, data: {outstandingAmount:newOutStandingAmount} });
    // create a payment log of the transaction's json payload
    const createdPayment = await strapi.db.query("api::payment.payment").create({data:{payload:payload,publishedAt:new Date()}})
    // create a replayment record
    const repaymentObject = {
        repaymentAmount: repaymentAmount,
        paymentDate: paymentDate,
        transactionID: transactionID,
        transactionReference: transactionReference,
        paymentStatus: paymentStatus,
        paymentMethod: paymentMethod,
        repaymentType: repaymentType,
        loan: {connect:[loanId]},
        payment: {connect:[createdPayment.id]},
        publishedAt:new Date()
    }
    const transactionHistoryObject = {
        transactionType: "repayment",
        transactionDate: paymentDate,
        amount: repaymentAmount,
        description: "Payment to a loan with id: #"+loanId+", amount paid is: "+repaymentAmount,
        loan: {connect: [loanId]},
        publishedAt:new Date()
    }
    const newNotitifcationObject = {
        title: "Payment to a loan with id: #"+loanId+", amount paid is: "+repaymentAmount,
        publishedAt:new Date(),
        type: 'message'
    }
    const createdNotitifcation = await strapi.db.query("api::notification.notification").create({data:newNotitifcationObject})
    
    const createdRepayment = await strapi.db.query("api::repayment.repayment").create({data:repaymentObject})
    const createdTransactionHistory = await strapi.db.query("api::transaction-history.transaction-history").create({data:transactionHistoryObject})
    // update the user account by adding a repayment to it
    await strapi.db.query('plugin::users-permissions.user').update({ where: { id:client.id }, data: {repayment: {connect:[createdRepayment.id]},transactionHistories: {connect: [createdTransactionHistory.id]}} });
    // finally push the notification of the payment to the client and admin users
    SendSmsNotification(clientNumber,"Your Payment to the loan with id: #"+loanId+" has been received. Go to the portal and check your current loan balance. Thank you.")
    SendEmailNotification(client.email,"Your Payment to the loan with id: #"+loanId+" has been received. Go to the portal and check your current loan balance. Thank you.")
    // const AdminNotificationBody = { // this is for the notification of the admin users, but for now it's a not a used feature
    //     loan: {connect: [loanId]},
    //     notification: {connect: [createdNotitifcation.id]},
    //     publishedAt:new Date()
    // }
    // await strapi.db.query("api::admin-notification.admin-notification").create({data:AdminNotificationBody}) // this will be an optional feature, in that at the moment a payment is not required to be sent as notification to the admins 
}

module.exports = createCoreController('api::payment.payment', ({ strapi }) => ({
    async create(ctx) {
      try {
         const { event,data } = ctx.request.body
    // example payload
    //    const { event,data } = { 
    //     event: 'collection.settled',
    //     data: {
    //       id: '6c7dd6b1-9a98-4a94-a8f4-70e620c8cbtb',
    //       initiatedAt: '2024-11-08T17:48:57.244Z',
    //       completedAt: '2024-11-08T17:49:37.336Z',
    //       amount: '40000.00',
    //       fee: '0.10',
    //       bearer: 'merchant',
    //       currency: 'ZMW',
    //       reference: 'ref-id-38-0972644552-1731109034502',
    //       lencoReference: '2431301781',
    //       type: 'mobile-money',
    //       status: 'successful',
    //       source: 'api',
    //       reasonForFailure: null,
    //       settlementStatus: 'settled',
    //       settlement: {
    //         id: '3d120a52-a494-49b0-b11a-154487407cba',
    //         amountSettled: '3.90',
    //         currency: 'ZMW',
    //         createdAt: '2024-11-08T17:49:37.423Z',
    //         settledAt: '2024-11-08T17:49:37.751Z',
    //         status: 'settled',
    //         type: 'instant',
    //         accountId: 'bbe47f18-ba39-4391-a863-f140fd309259'
    //       },
    //       mobileMoneyDetails: {
    //         country: 'zm',
    //         phone: '0972644552',
    //         operator: 'airtel',
    //         accountName: 'langson chibili'
    //       },
    //       bankAccountDetails: null,
    //       cardDetails: null
    //     }
    //   }

      if(event === 'collection.settled' || 'transaction.successful'){
         const repayment = await getRepayment(data.id)
         if(repayment && repayment.hasOwnProperty("id")){
            ctx.badRequest('Repayment already exists')
            return // means you already have a repayment record of the transaction
         }
         handlePaymentSuccessful(data,ctx.request.body)
      }
      
      } catch (error) {
        // Handle errors gracefully
        console.error(error)
        ctx.badRequest('Failed to save repaymet record')
      }
    },
  }))
  
