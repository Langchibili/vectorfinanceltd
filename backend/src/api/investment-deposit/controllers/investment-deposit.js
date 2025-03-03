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

const getInvestmentDraft = async (id) => {
    return await strapi.db.query("api::investment-draft.investment-draft").findOne({
        where: { id:id },
        populate: ['client.InvestmentProfile']
    });
};

const getInvestmentDeposit = async (transactionID) => {
    return await strapi.db.query("api::investment-deposit.investment-deposit").findOne({
        where: { transactionID:transactionID }
    });
};


// const getUserAccount = async (username) => {
//     return await strapi.db.query("plugin::users-permissions.user").findOne({
//         where: { username:username }
//     });
// };


const handlePaymentSuccessful = async (data,payload)=>{
    // get data from payment payload
    const draftInvestMentId = data.reference.split('-')[2] // get the draft investment which holds information about what this investment being paid for is about
    const clientNumber = data.reference.split('-')[3] // client username
    const paymentDate = data.completedAt
    const transactionID = data.id
    const transactionReference = data.reference
    const paymentAmount = parseFloat(data.amount).toFixed(2)

    // get draft investment and the client
    const draftInvestMent  = await getInvestmentDraft(draftInvestMentId) // get the draft InvestMent tied to the payment
    const { client } = draftInvestMent // get the client tied to the payment from the draft investment
   
    // get draft investment data
    const investmentAmount = parseFloat(draftInvestMent.amountInvested).toFixed(2)
    const projectedReturns = parseFloat(draftInvestMent.projectedReturns).toFixed(2)
    const investmentInterestRate = parseFloat(draftInvestMent.investmentInterestRate).toFixed(2)
    const periodInMonths = draftInvestMent.periodInMonths
    const clientType = draftInvestMent.clientType
    const country = draftInvestMent.country // 
    const currency = draftInvestMent.currency
    
    // payment method logic
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

    // currency prefix logic
    const currencyPrefix = currency === "kwacha"? "K" : "$"
   
  // create a replayment record
    const investmentObject = {
        amountInvested: paymentAmount, // becase exactly what you pay is what you invest, now what you entered that you want to invest
        projectedReturns:projectedReturns,
        investmentInterestRate: investmentInterestRate,
        periodInMonths: periodInMonths,
        paymentMethod: paymentMethod,
        dateInvested: paymentDate,
        country: country,
        currency: currency,
        client: {connect:[client.id]},
        publishedAt:new Date()
    }
    const createdInvestmentObject = await strapi.db.query("api::investment.investment").create({data:investmentObject})
   
    const investmentDepositObject = {
        paymentDate: paymentDate,
        transactionID: transactionID,
        transactionReference: transactionReference,
        payload:payload,
        investment:{connect:[createdInvestmentObject.id]},
        client: {connect:[client.id]},
        publishedAt:new Date()
    }
    const transactionHistoryObject = {
        transactionType: "investment-deposit",
        transactionDate: paymentDate,
        amount: paymentAmount,
        description: "Payment to an investment with id: #"+createdInvestmentObject.id+" has been made, amount invested is: "+paymentAmount,
        investment: {connect: [createdInvestmentObject.id]},
        publishedAt:new Date()
    }
    const newNotitifcationObject = {
        title: "Payment to a vectorFin investment with id: #"+createdInvestmentObject.id+" has been made, amount invested is: "+paymentAmount,
        publishedAt:new Date(),
        type: 'message'
    }
    
    const createdNotitifcation = await strapi.db.query("api::notification.notification").create({data:newNotitifcationObject})
    const createdTransactionHistory = await strapi.db.query("api::transaction-history.transaction-history").create({data:transactionHistoryObject})
    const createdInvestmentDepositObject = await strapi.db.query("api::investment-deposit.investment-deposit").create({data:investmentDepositObject})
    // update the user account by adding a repayment to it
    
    const userUpdateObject = {
        investment: {connect:[createdInvestmentObject.id]},
        transactionHistories: {connect: [createdTransactionHistory.id]},
        investmentDeposits: {connect: [createdInvestmentDepositObject.id]}
    }
    const InvestmentProfileUpdateObject = {
        id:client.InvestmentProfile?.id,
        clientType: clientType,
        country: country
    }
    await strapi.db.query('plugin::users-permissions.user').update({ where: { id:client.id }, data: userUpdateObject});
    if(client.InvestmentProfile){ // if the InvestmentProfile is null, leave it
        await strapi.db.query('client-details.investment-profile').update({ where: { id:client.InvestmentProfile?.id }, data: InvestmentProfileUpdateObject}); // updating the component straight up because updating it nested with the user object doesn't work   
    }
    // finally push the notification of the payment to the client and admin users
    SendSmsNotification(clientNumber,"Your Payment to the vectorFin investment with amount "+currencyPrefix+investmentAmount+" has been received. You may now go to the portal and monitor your returns from your dashboard. Thank you.")
    SendEmailNotification(client.email,"Your Payment to the vectorFin investment with amount "+currencyPrefix+investmentAmount+" has been received. You may now go to the portal and monitor your returns from your dashboard. Thank you.")
    
    // we are going to always save the investment with the amount paid, so if investmentAmountDifference is greater than 0, then we shall let you know
    const investmentAmountDifference = parseFloat(investmentAmount - paymentAmount).toFixed(2) // remove the amount paid from the loan's oustanding amount
    if(investmentAmountDifference > 0){ // only if for some reason, your payment is lesser than the invested amount
        SendSmsNotification(clientNumber,"Your Payment to the vectorFin investment with amount "+currencyPrefix+investmentAmount+" has been received. However due to your payment being lesser than the entered investment amount, the expected returns shown on your dashboard shall likely be revised later. You may now go to the portal and monitor your returns from the dashboard. Thank you.")
        SendEmailNotification(client.email,"Your Payment to the vectorFin investment with amount "+currencyPrefix+investmentAmount+" has been received. However due to your payment being lesser than the entered investment amount, the expected returns shown on your dashboard shall likely be revised later. You may now go to the portal and monitor your returns from the dashboard. Thank you.")
    }
    const AdminNotificationBody = { // this is for the notification of the admin users
        investment:{connect:[createdInvestmentObject.id]},
        notification: {connect: [createdNotitifcation.id]},
        publishedAt:new Date()
    }
    await strapi.db.query("api::admin-notification.admin-notification").create({data:AdminNotificationBody}) 
}

module.exports = createCoreController('api::investment-deposit.investment-deposit', ({ strapi }) => ({
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
    //       amount: '5000.00',
    //       fee: '0.10',
    //       bearer: 'merchant',
    //       currency: 'ZMW',
    //       reference: 'ref-id-10-0972644552-1731109034502',
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

      if(event === 'collection.settled' || 'transaction.successful'){ // means you have deposited for the investment already
         const investmentDeposit = await getInvestmentDeposit(data.id)
         if(investmentDeposit && investmentDeposit.hasOwnProperty("id")){
            ctx.badRequest('investment Deposit already exists')
            return // means you already have a repayment record of the transaction
         }
         handlePaymentSuccessful(data,ctx.request.body)
      }
      
      } catch (error) {
        // Handle errors gracefully
        console.error(error)
        ctx.badRequest('Failed to create investment')
      }
    },
  }))
  
