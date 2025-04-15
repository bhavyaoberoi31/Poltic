import Brevo from "@sendinblue/client";
import dotenv from "dotenv";

dotenv.config();

const brevo = new Brevo.TransactionalEmailsApi();
brevo.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

export const sendEmail = async ( email , newUser) => {
    try {
        const to = [
            { email, name: newUser.firstName},
        ];
        let htmlContent = `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verification</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f9;
              margin: 0;
              padding: 0;
            }
            .email-container {
              max-width: 600px;
              margin: 20px auto;
              background: #ffffff;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              overflow: hidden;
            }
            .email-header {
              background-color: #4CAF50;
              color: #ffffff;
              padding: 20px;
              text-align: center;
            }
            .email-body {
              padding: 20px;
              color: #333333;
            }
            .email-body h1 {
              font-size: 24px;
              margin-bottom: 10px;
            }
            .email-body p {
              font-size: 16px;
              margin-bottom: 20px;
            }
            .email-footer {
              background-color: #f9f9f9;
              text-align: center;
              padding: 10px;
              font-size: 14px;
              color: #666666;
            }
            .verify-button {
              display: inline-block;
              background-color: #4CAF50;
              color: #ffffff;
              text-decoration: none;
              padding: 10px 20px;
              border-radius: 5px;
              font-size: 16px;
              font-weight: bold;
              margin-top: 20px;
            }
            .verify-button:hover {
              background-color: #45a049;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="email-header">
              <h1>Email Verification</h1>
            </div>
            <div class="email-body">
              <h1>Welcome to Our Service!</h1>
              <p>Thank you for signing up. Please verify your email address to activate your account.</p>
              <p>Click the button below to verify your email:</p>
              <a 
                href="https://poltic.in/verify?id=${newUser._id}" 
                class="verify-button">
                Verify Email
              </a>
            </div>
            <div class="email-footer">
              <p>&copy; 2024 Your Company. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>`;
      
        const emailData = {
            sender: { name: "Poltic", email: "anshur9608837@gmail.com" },
            to,
            subject: `Verify your email`,
            htmlContent
        };
        const response = await brevo.sendTransacEmail(emailData);
        return true ; 
    } catch (error) {
        console.log("Error sending email:", error);
        return false 
    }
};