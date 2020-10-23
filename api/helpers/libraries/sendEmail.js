const nodemailer = require("nodemailer");

const sendEmail = async (mailOptions) => {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  let info =await transporter.sendMail(mailOptions)
  console.log(info)
};

const sendResetPasswordEmailWithToken = async (resetToken,email) => {

  
  const resetPasswordUrl = process.env.NODE_ENV === "development" ? `http://localhost:5000/api/auth/resetPassword?resetPasswordToken=${resetToken}` : `https://password-manager-git-master.ogulcankarayel5.vercel.app/resetPassword?resetPasswordToken=${resetToken}`
  const emailTemplate = `
  <h3>Reset your password</h3>
  <p>You can use that link to reset your password. This <a href='${resetPasswordUrl}' target='_blank'>link</a> will expire in 1 hour</p>
  <img src="https://res.cloudinary.com/ogulcankarayel-digital/image/upload/v1603444986/splash_vx3oki.png" alt="Lucky password" width="200" height="200">
  `
  
  await sendEmail({
    from:process.env.SMTP_USER,
    to:email,
    subject:"Reset your password for lucky-password",
    html:emailTemplate
  })

}


module.exports  = {sendEmail,sendResetPasswordEmailWithToken}
