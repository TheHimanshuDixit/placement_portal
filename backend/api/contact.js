const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Contact = require("../models/Contact");

// POST /api/contact/send
router.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  let contact = new Contact({
    name,
    email,
    message,
  });

  let resp = await contact.save();

  const output = `
                    <h4>You have a message</h4>
                    <h3>Contact Details : </h3>
                    <p>Name: ${name}</p>
                    <p>Email: ${email}</p>
                    <h3>Message : </h3>
                    <p>${message}</p>
`;
  // Instantiate the SMTP server
  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com"',
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
      user: "harshhimanshudixit@gmail.com",
      pass: "cwujzimqjehhjyac",
    },
  });

  // Specify what the email will look like
  var mailOption = {
    from: "harshhimanshudixit@gmail.com", //Sender mail
    to: "himanshuharshdixit@gmail.com", // Recever mail
    subject: "Message",
    html: output,
  };

  // Send mail with defined transport object
  transporter.sendMail(mailOption, function (error, info) {
    if (error) {
      res.json({ message: "Error Occurs" });
    } else {
      res.json({ message: "Email sent", data: resp});
    }
  });
});

module.exports = router;
