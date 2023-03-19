import { accountSid, authToken, FromAdminMail, fromAdminPhone, GMAIL_PASS, GMAIL_USER, userSubject } from '../Config';
import nodemailer from 'nodemailer';

export const GenerateOTP = ()=>{
    const otp = Math.floor(1000 + Math.random() * 9000)
    const expiry = new Date();

    expiry.setTime(new Date().getTime() + (30 * 60 * 1000))   
    return {otp, expiry};
}

//using Twilio as sms.......how to send otp to user
export const onRequestOTP = async(otp: number, toPhoneNumber: string)=>{
    const client = require('twilio') (accountSid, authToken);
    const response = await client.messages
        .create({
            body: `Your OTP is ${otp}`,
            to: toPhoneNumber,
            from: fromAdminPhone
        })
        return response;
}

const transport = nodemailer.createTransport({
    service: "gmail",     /*service and host are the same thing */
    auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
})

export const mailSent = async(
    from: string,
    to: string,
    subject: string,
    html: string,
)=>{
    try{
        const response = await transport.sendMail(
            { from: FromAdminMail, to, subject: userSubject, html })
        return response;
    } catch (err){
        console.log(err)
    }
}

export const emailHtml = (otp: number):string=>{
    let response = `
    <div style = "max-width:700px; 
        margin:auto; 
        border:10px solid #ddd;
        padding:50px 20px; 
        font-size:110%;">
    <h2 style="text-align:center;
        text-transform:uppercase;
        color:teal;">
            Welcome to ILearn
    </h2>
    <p> Hi there, your otp is ${otp} </p>
    </div>
    `
    return response;
}




const transportForResetPassword = nodemailer.createTransport({
    service: "gmail", //service and host are the same thing ---refer to documentation
    auth:{
        user: GMAIL_USER,
        pass: GMAIL_PASS,
    },
    tls:{
        rejectUnauthorized:false
    }
})
export const mailSent2 = async (
    from: string,
    to: string,
    subject: string,
    html: string,
  )=>{
    try {
     const response = await transport.sendMail(
        { from: FromAdminMail,
            subject:
            userSubject,
            to,
            html})
            return response
    } catch (error) {
        console.log(error)
    }
}
export const emailHtml2 = (link:string):string=>{
    let response =  `
    <div style="max-width:700px;
    margin:auto;
    border:10px solid #ddd;
    padding:50px 20px;
    font-size: 110%;
    font-style: italics
    "> 
    <h2 style="text-align:center;
    text-transform:uppercase;
    color:teal;
    ">
    iLearn
    </h2>
    <p>Hi there, follow the link to reset your password. The link expires in 10 minutes below.</p>
     ${link}
     <h3>DO NOT DISCLOSE TO ANYONE<h3>
     </div>
    `
    return response
}