const nodemailer = require("nodemailer")


let transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    secure: true,
    port: 465,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASS
    },
  });
  
  module.exports = (emailClient,subject,url,fullname) => {
    let mailOption ={
        from:  process.env.EMAIL_ADDRESS,
        to: emailClient,
        subject:`${subject} is your otp`,
        text: `Hello ${fullname}, ${subject} is your otp, please input in form ${url}`
    }

    transporter.sendMail(mailOption,function(error,data){
        if(error){
            console.log("error : ", error)
            return "email not sent"
        } else{
            console.log("email sent")
            console.log(data)
            return "email success"
        }
    })
  }