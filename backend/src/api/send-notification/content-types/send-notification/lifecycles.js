module.exports = {
    async afterCreate(event) {
        const { result, params } = event; // get the required objects

        const getNotification = async()=>{
            return await strapi.db.query("api::send-notification.send-notification").findOne({where: {
                id: result.id
            },
                populate: ['clientsToNotify.details','notificationTemplate']
            })
        }
        const SendSmsNotification = (phoneNumber,fullnames,notificationBody)=>{
            console.log('sending sms notification',phoneNumber,fullnames,notificationBody)
        }
        const SendEmailNotification = (email,fullnames,notificationBody)=>{
            console.log('sending email notification',email,fullnames,notificationBody)
        }
        const returnNineDigitNumber = (phoneNumber) =>{
            return phoneNumber.replace(/\D/g, '').slice(-9)
        }

        const notification = await getNotification()
        const customNotificationBody = notification.customNotificationBody
        const notificationTitle = notification.notificationTemplate.name
        const notificationBody = !notification.notificationTemplate || notificationTitle === "other"? customNotificationBody : notification.notificationTemplate.body
        const sendVia = notification.sendVia

        
        notification.clientsToNotify.forEach(client => {
            const phoneNumber = "+260"+returnNineDigitNumber(client.username)
            const email = client.email
            const fullnames = client.fullnames
            let finalNotificationBody = notificationBody
            if(fullnames){
                finalNotificationBody = notificationBody.replace('customer',fullnames)
            }
            if(sendVia === "both"){
                SendSmsNotification(phoneNumber,fullnames,finalNotificationBody)
                SendEmailNotification(email,fullnames,finalNotificationBody)
            }
            else{
                if(sendVia === "sms"){
                    SendSmsNotification(phoneNumber,fullnames,finalNotificationBody)
                }
                else{
                    SendEmailNotification(email,fullnames,finalNotificationBody)
                }
            }
        })
        
        
        //   console.log(results)
        //   console.log(results.clientsToNotify)
        //   console.log(results.notificationTemplate)
        },
  };



/* notification templates */
// loan-approved
// loan-accepted
// loan-funds-disbursed
// loan-rejected
// loan-defaulted
// loan-overdue
// sign-documents
// information-update
// fixed-technical-fault
// experiencing-technical-fault
// other