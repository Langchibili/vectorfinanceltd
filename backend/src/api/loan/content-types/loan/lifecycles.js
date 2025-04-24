'use strict';

const axios = require('axios');
const nodemailer = require('nodemailer');


const getAppStatus = async () => {
  return await strapi.db.query("api::app-status.app-status").findOne();
}

const getAdminUserEmailsAndNumbers = async () => {
  const admin = await strapi.db.query("api::admin.admin").findOne({
    populate: ['loanApprovers', 'loanDisbursers', 'loanAdministrators']
  })

  return {
    loanApproverEmails: admin.loanApprovers.map(u => u.email).filter(Boolean),
    loanDisburserEmails: admin.loanDisbursers.map(u => u.email).filter(Boolean),
    loanAdministratorEmails: admin.loanAdministrators.map(u => u.email).filter(Boolean),

    loanApproverNumbers: admin.loanApprovers.map(u => u.username).filter(Boolean),
    loanDisburserNumbers: admin.loanDisbursers.map(u => u.username).filter(Boolean),
    loanAdministratorNumbers: admin.loanAdministrators.map(u => u.username).filter(Boolean)
  }
} 

const simpleInterestLoanCalculator = (loanAmount, monthlyInterestRate, loanTermMonths) => {
  const calculateTotalInterest = (amount, monthlyInterest, months) => {
    return (parseFloat(amount) * monthlyInterest * months) / 100;
  }

  const calculateTotalPayment = (loanAmount, totalInterest) => {
    return parseFloat(loanAmount) + parseFloat(totalInterest);
  }

  const totalInterest = calculateTotalInterest(loanAmount, monthlyInterestRate, loanTermMonths);
  const totalPayment = calculateTotalPayment(loanAmount, totalInterest);
  const monthlyPayment = totalPayment / loanTermMonths;

  return {
    totalInterest: parseFloat(totalInterest).toFixed(2),
    totalPayment: parseFloat(totalPayment).toFixed(2),
    monthlyPayment: parseFloat(monthlyPayment).toFixed(2),
  };
};



const loanAmortizationCalculator = (loanAmount, monthlyInterestRate, loanTermMonths) => {
  const calculateMonthlyPayment = (amount, monthlyInterest, months) => {
    return (
      (amount * monthlyInterest * Math.pow(1 + monthlyInterest, months)) /
      (Math.pow(1 + monthlyInterest, months) - 1)
    );
  };

  const calculateTotalPayment = (monthlyPayment, months) => {
    return monthlyPayment * months;
  };

  const calculateProfit = (totalPayment, loanAmount) => {
    return totalPayment - loanAmount;
  };

  const monthlyPayment = calculateMonthlyPayment(loanAmount, monthlyInterestRate / 100, loanTermMonths);
  const totalPayment = calculateTotalPayment(monthlyPayment, loanTermMonths);
  const totalProfit = calculateProfit(totalPayment, loanAmount);

  return {
    monthlyPayment: parseFloat(monthlyPayment).toFixed(2),
    totalProfit: parseFloat(totalProfit).toFixed(2),
    totalPayment: parseFloat(totalPayment).toFixed(2),
  };
};
            
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
        user: process.env.NOTIFICATIONSEMAILSERVICEUSERNAME,
        pass: process.env.NOTIFICATIONSEMAILSERVICEPASSWORD
       }
    })

    // Send email
    transporter.sendMail({
      from: process.env.NOTIFICATIONSEMAILSERVICEUSERNAME,
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

const returnNineDigitNumber = (phoneNumber) =>{
    return phoneNumber.replace(/\D/g, '').slice(-9)
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
          
          // If current status is already approved or disbursed, block the update
          if (loan.loanStatus === "approved") {
            if(!loanApproverEmails.includes(adminUser.email)){
              const notificationBody = "You cannot approve loans, please change the loan status to request-approval or use an account that has the priviledge to approve."
              SendEmailNotification(adminUser.email,notificationBody)
              throw new Error('Loan cannot be updated by user')
            }
          }
          if (loan.loanStatus === "disbursed") {
            if(!loanDisburserEmails.includes(adminUser.email)){
              const notificationBody = "You cannot change a loan's status to disbursed with this account, please change the loan status to request-approval or use an account that has the priviledge to change the loan's status to disbursed."
              SendEmailNotification(adminUser.email,notificationBody)
              throw new Error('Loan cannot be disbursed by user')
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
        };

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
                      const { totalPayment } = loanAmortizationCalculator(loanBefore.loanAmount, loanBefore.interestRate, loanBefore.loanTerm);
                      repaymentAmount = totalPayment;
                  } else { // for all asset based loans
                      const { totalPayment } = simpleInterestLoanCalculator(loanBefore.loanAmount, loanBefore.interestRate, loanBefore.loanTerm);
                      repaymentAmount = totalPayment;
                  }

                  if(!loanBefore.id){
                      return
                  }

                  if (loanBefore.loanStatus === "disbursed") {
                      const updateLoanAmountObject = {
                          outstandingAmount: parseFloat(repaymentAmount),
                          repaymentAmount: parseFloat(repaymentAmount),
                          approvalDate: loanAfter.updatedAt,
                          disbursedAmount: parseFloat(loanBefore.loanAmount),
                          disbursementDate: loanAfter.updatedAt,
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
              }
          };

        await setLoanRepaymentAmount(data, result);
    },
};
