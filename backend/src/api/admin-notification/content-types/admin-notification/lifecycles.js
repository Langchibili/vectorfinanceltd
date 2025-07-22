const { SendSmsNotification, SendEmailNotification } = require('../../../../services/messages');
module.exports = {
    async afterCreate(event) {
        const { result, params } = event; // get the required objects

        const getNotification = async()=>{
            return await strapi.db.query("api::admin-notification.admin-notification").findOne({where: {
                id: result.id
            },
                populate: ['notification']
            })
        }
       
        const getAdminUserEmailsAndNumbers = async () => {
            const admin = await strapi.db.query("api::admin.admin").findOne({
              populate: ['loanApprovers', 'loanDisbursers', 'loanAdministrators']
            })
          
            return {
              loanAdministratorEmails: admin.loanAdministrators.map(u => u.email).filter(Boolean),
              loanAdministratorNumbers: admin.loanAdministrators.map(u => u.username).filter(Boolean)
            }
          }  

        const getAppStatus = async () => {
            return await strapi.db.query("api::app-status.app-status").findOne();
        } 

        const returnNineDigitNumber = (phoneNumber) =>{
            return phoneNumber.replace(/\D/g, '').slice(-9)
        }
        const appStatus = await getAppStatus()
        const { notification } = await getNotification()
        const { loanAdministratorEmails } = await getAdminUserEmailsAndNumbers()
        const { loanAdministratorNumbers } = await getAdminUserEmailsAndNumbers()
        const notificationBody = notification.title
        
        // for test and local app mode
        const numbersArray = await strapi.db.query("api::phone-numbers-list.phone-numbers-list").findOne();
        const emailsArray = await strapi.db.query("api::email-addresses-list.email-addresses-list").findOne();
       
        const adminEmailAddresses = appStatus.status === "production"? loanAdministratorEmails : emailsArray.adminEmailAddresses
        const adminPhoneNumbers = appStatus.status === "production"? loanAdministratorNumbers : numbersArray.adminNumbers
        
        adminPhoneNumbers.forEach(number => {
            console.log('body is',notificationBody)
            const phoneNumber = "+260"+returnNineDigitNumber(number)
            SendSmsNotification(phoneNumber,notificationBody)
        })
         
        adminEmailAddresses.forEach(email => {
            console.log('body is',notificationBody)
            SendEmailNotification(email,notificationBody)
        })
     },
  };
