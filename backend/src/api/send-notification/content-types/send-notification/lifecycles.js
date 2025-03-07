const axios = require('axios');
const nodemailer = require('nodemailer');

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
                SendSmsNotification(phoneNumber,finalNotificationBody)
                SendEmailNotification(email,finalNotificationBody)
            }
            else{
                if(sendVia === "sms"){
                    SendSmsNotification(phoneNumber,finalNotificationBody)
                }
                else{
                    SendEmailNotification(email,finalNotificationBody)
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