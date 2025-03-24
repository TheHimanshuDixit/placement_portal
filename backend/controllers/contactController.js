const Contact = require("../models/Contact");
const sendMail = require("../utils/mailer");
require("dotenv").config();

const sendContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const contact = new Contact({ name, email, message });
    await contact.save();

    const emailContent = `
      <h4>You have a new message</h4>
      <h3>Contact Details:</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <h3>Message:</h3>
      <p>${message}</p>
    `;

    const mailResponse = await sendMail(
      process.env.RECEIVER_EMAIL,
      "New Contact Message",
      emailContent
    );

    if (mailResponse.success) {
      res.status(200).json({
        success: "success",
        message: "Email sent successfully",
        data: contact,
      });
    } else {
      res.status(500).json({
        error: "Email failed",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = { sendContactMessage };
