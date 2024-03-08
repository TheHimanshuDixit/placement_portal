const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// POST /api/contact/send
router.post("/send", async (req, res) => {

    const { name, email, message } = req.body;
    console.log(name, email, message);
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
      service: 'gmail',
      auth: {
        user: 'harshhimanshudixit@gmail.com',
        pass: 'cwujzimqjehhjyac',
      },
    });

    // Specify what the email will look like
    var mailOption = {
      from: 'harshhimanshudixit@gmail.com', //Sender mail
      to: 'anirudhdixitsaf@gmail.com', // Recever mail
      subject: 'subject',
      html: output,
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOption, function (error, info) {
      if (error) {
        res.send('<h1 style="color:red" > Something Wrong. </h1>');
      } else {
        res.send('<h1 style="color: green" >Thank You, Message has been Sent.');
      }
    });
});

module.exports = router;
