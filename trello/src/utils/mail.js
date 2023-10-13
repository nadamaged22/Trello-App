import nodemailer from 'nodemailer'
export const mailsender=async({from=process.env.EMAIL,to,cc,bcc,subject,text,html,attachments=[]}={})=>{
    const transporter = nodemailer.createTransport({ //setup for sending emails through nodejs
        service:"gmail",
         auth: {
           user: process.env.EMAIL,
           pass:process.env.EMAIL_PASSWORD
         }
       });
       const info=await transporter.sendMail({
           from:`"nada maged"<${from}>`,
           to, 
           cc,
           bcc,// list of receivers
           subject, // Subject line
           text, // plain text body
           html, // html body
           attachments
       })
}