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

module.exports = {SendSmsNotification,SendEmailNotification}