const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMailTo = async (to, subject, htmlContent) => {
  try {
    // Instantiate the SMTP server
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    // Specify what the email will look like
    const mailOptions = {
      from: process.env.EMAIL, // Sender email
      to, // Receiver email
      subject,
      html: htmlContent,
    };

    // Send mail with defined transport object
    const info = await transporter.sendMail(mailOptions);
    return { success: true, info };
  } catch (error) {
    return { success: false, error };
  }
};

module.exports = sendMailTo;
