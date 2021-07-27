const nodemailer=require("nodemailer")
const sendgrdtransport=require("nodemailer-sendgrid-transport")
const sendEmail=(options)=>{
    const transporter=nodemailer.createTransport(sendgrdtransport(
       {
           auth:{
               api_key:process.env.EMAIL_APIKEY
           }
       }
    )
    )

    const mailOptions={
        from:"ahmedisthaffa123@gmail.com",
        to:options.to,
        subject:options.subject,
        html:options.text
    }

    transporter.sendMail(mailOptions,(err,info)=>{
        if(err){
            throw (err);
        }
        
    })
}

module.exports=sendEmail