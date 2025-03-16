import nodemailer from 'nodemailer'

export const sendEmail = async ({email, subject, code}) => {
    const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: process.env.SMPT_PORT,
        secure: false, // use SSL
        auth: {
          user: process.env.SENDER_EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        }
        
      });

     
      const message= {
        from: process.env.SENDER_EMAIL,
        to: email,
        subject,
        html: `<div>
        <h1>Verify your account using below code:</h1> 
        <p><strog>Code: </strong>${code}</p>
        </div>`,
      };    
      
      await transporter.sendMail(message);
}


   
       