const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const sendMail = require("../utils/mailer");
require("dotenv").config();

// POST /api/contact/send
router.post("/send", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    let contact = new Contact({
      name,
      email,
      message,
    });

    let resp = await contact.save();

    const output = `
        <h4>You have a message</h4>
        <h3>Contact Details:</h3>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <h3>Message:</h3>
        <p>${message}</p>
    `;

    const mailResponse = await sendMail(
      process.env.RECEIVER_EMAIL,
      "Message",
      output
    );

    if (mailResponse.success) {
      res.json({ message: "Email sent", data: resp });
    } else {
      res.json({ message: "Error sending email", error: mailResponse.error });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

module.exports = router;
