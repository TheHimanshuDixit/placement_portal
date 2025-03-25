const Contact = require("../models/Contact");
const sendMailTo = require("../utils/mailer");
require("dotenv").config();

const sendContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const contact = new Contact({ name, email, message });
    await contact.save();

    const emailContent = `
      <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Feedback Message</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f7fc;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
        }

        .header {
            background: linear-gradient(135deg, #007bff, #0056b3);
            color: #ffffff;
            padding: 25px;
            text-align: center;
            font-size: 22px;
            font-weight: bold;
        }

        .content {
            padding: 35px;
            text-align: left;
            font-size: 16px;
            color: #333;
        }

        .highlight {
            color: #007bff;
            font-weight: bold;
        }

        .footer {
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #6c757d;
            background-color: #f1f3f5;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            📩 New Message Received 📩
        </div>
        <div class="content">
            <h2>📢 You have a new feedback!</h2>
            <h3>Contact Details:</h3>
            <p><strong>Name:</strong> <span class="highlight">${name}</span></p>
            <p><strong>Email:</strong> <span class="highlight">${email}</span></p>
            <h3>Message:</h3>
            <p>${message}</p>
            <p>Thanks,</p>
            <p><strong>T&P Portal Team</strong></p>
        </div>
        <div class="footer">
            &copy; 2025 T&P Portal. All rights reserved.
        </div>
    </div>
</body>

</html>
    `;

    const mailResponse = await sendMailTo(
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
