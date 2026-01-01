import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from "nodemailer"



const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS
  },
});



export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    trustedOrigins:[process.env.APP_URL!],
    user:{
      additionalFields:{
        role:{
          type :"string",
          defaultValue:"USER",
          required:false
        },
        phone:{
          type:"string",
          required:false
        },
        status:{
          type:"string",
          defaultValue:"ACTIVE",
          required:false
        }
      }
    },
      emailAndPassword: { 
    enabled: true, 
    autoSignIn:false,
    requireEmailVerification:true
  },
  emailVerification:{
    sendOnSignUp:true,
    sendVerificationEmail:async({user,url,token},request)=>{
   try{
   const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`

      const info = await transporter.sendMail({
    from: '"prisma" <prisma@trm.email>',
    to: user.email,
    subject: "please verify your email ✔",
    text: "Hello world?", // Plain-text version of the message
    html:`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Verify Your Email</title>
  <style>
    body {
      font-family: Arial, Helvetica, sans-serif;
      background: #f6f9fc;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 10px;
      padding: 30px;
      border: 1px solid #e6e6e6;
    }
    .title {
      text-align: center;
      font-size: 22px;
      font-weight: bold;
      color: #2d3748;
    }
    .text {
      font-size: 16px;
      color: #4a5568;
      line-height: 1.6;
      margin-top: 15px;
    }
    .btn {
      display: inline-block;
      background: #4f46e5;
      color: #ffffff;
      padding: 14px 24px;
      border-radius: 6px;
      text-decoration: none;
      font-size: 16px;
      margin-top: 25px;
    }
    .footer {
      margin-top: 30px;
      font-size: 13px;
      color: #718096;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2 class="title">Verify Your Email Address</h2>

    <p class="text">
      Hi there!${user.name} <br/>
      Thanks for registering. Please verify your email address so we can activate your account.
    </p>

    <div style="text-align:center;">
      <a class="btn" href="${verificationUrl}" target="_blank">
        Verify Email
      </a>
    </div>

    <p class="text">
      If the button doesn’t work, copy and paste the link below into your browser:
      <br/>
      <span style="color:#4f46e5">{{VERIFICATION_URL}}</span>
    </p>

    <p class="footer">
      If you didn’t create this account, you can safely ignore this email.<br/>
      &copy; 2025 Prisma App
    </p>
  </div>
</body>
</html>
`
  });

  console.log("Message sent:", info.messageId);
}catch(errr){
console.error(errr)
throw errr
}
   }
  },

  socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
});