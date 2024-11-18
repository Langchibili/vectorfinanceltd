const axios = require('axios');
const nodemailer = require('nodemailer');

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

        const { notification } = await getNotification()
        const notificationBody = notification.title

        const numbersArray = await strapi.db.query("api::phone-numbers-list.phone-numbers-list").findOne();
        const emailsArray = await strapi.db.query("api::email-addresses-list.email-addresses-list").findOne();
        numbersArray.adminNumbers.forEach(number => {
            console.log('body is',notificationBody)
            const phoneNumber = "+260"+returnNineDigitNumber(number)
            SendSmsNotification(phoneNumber,notificationBody)
         })

        emailsArray.adminEmailAddresses.forEach(email => {
            console.log('body is',notificationBody)
            SendEmailNotification(email,notificationBody)
         })
        },
  };
