import nodemailer from "nodemailer"
import dotenv from 'dotenv'

dotenv.config()

export const transport =  nodemailer.createTransport({
     service:'gmail',
     auth:{
         user:process.env.MAIL_USER ,
         pass:process.env.MAIL_PASS 
     }
}); 

export const sendEmail = async (to , subject , text , html )=> {
    try {
        const mailOption = {
         from:process.env.MAIL_USER , 
         to , 
         subject, 
         text, 
         html
      }
      const info = await transport.sendMail(mailOption) ; 
    } catch (error) {
        throw new Error(error.message)
    }
}