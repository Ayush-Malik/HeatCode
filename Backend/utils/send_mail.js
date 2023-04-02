const sgMail = require("@sendgrid/mail");

const sendEmail = async(data) => {
    try {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        await sgMail.send(data);
        console.log("EMAIL SENT SUCCESSFULLY");
    } catch (error) {
        console.error(error);
    }
};

const sendVerificationEmail = async(userEmail, verificationToken) => {
    const link =
        process.env.ROOT_URL +
        `/auth/verify-email/?email=${userEmail}&verificationToken=${verificationToken}`;
    console.log(link);

    const html = `
    <html>
      <head>
        <style>
          /* Add any custom CSS styles here */
        </style>
      </head>
      <body>
        <p>Hello,</p>
        <p>Thank you for creating a Heatcode account! To complete the verification process and activate your account, please click the following link:</p>
        <a href="${link}">${link}</a>
        <p>If you did not create this account, please ignore this email.</p>
        <p>Thank you,</p>
        <p>The Heatcode Team</p>
      </body>
    </html>
  `;

    const msg = {
        to: userEmail,
        from: process.env.GMAIL_ID,
        subject: "Verify your HeatCode Account",
        html: html,
    };

    await sendEmail(msg);
};

module.exports = {
    sendEmail,
    sendVerificationEmail,
};