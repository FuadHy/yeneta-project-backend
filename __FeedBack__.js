//===========@Beki:- add method and action name matching with this when creating the form=========
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const env = require('dotenv').config()
const nodemailer = require('nodemailer');
const app = express()

app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.send("Hello");
})
app.get('/Yeneta/feedback',(req,res)=>{
    res.sendFile(path.join(__dirname+ '/feedback.html'))
    console.log("this is the form that shows")
}) 
app.post('/feedback',(req,res)=>{
    console.log("your message has been sent!!")
// async..await is not allowed in global scope, must use a wrapper
async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "Gmail",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.GMAIL_EMAIL, // generated ethereal user
        pass: process.env.GMAIL_PASS, // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: process.env.GMAIL_EMAIL, // sender address
      to:req.body.user_mail, // list of receivers
      subject: "Hello ✔", // Subject line
      text: req.body.user_message, // plain text body
    
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  
  main().catch(console.error);
  res.end("Your message has been sent Sucessfully!!!")
})