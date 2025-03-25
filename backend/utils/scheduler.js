const schedule = require("node-schedule");
const sendMailTo = require("./mailer");
const Opening = require("../models/Opening");
const Student = require("../models/Student");
const Application = require("../models/Application");

async function job() {
  console.log("Running job");
  const openings = await Opening.find({});
  const students = await Student.find({});
  const studentEmails = students.map((student) => student.email);
  const currentDate = new Date();

  for (const opening of openings) {
    const applicants = await Application.find({ jobId: opening.jobId });

    const allEmails = studentEmails;
    const applicantEmails = applicants.map((applicant) => applicant.email);
    const studEmails = allEmails.filter(
      (email) => !applicantEmails.includes(email)
    );

    const applyByDate = new Date(opening.applyby);
    // if only 1 day or less than 1 day is left to apply
    if (
      applyByDate - currentDate <= 86400000 &&
      applyByDate - currentDate >= 0
    ) {
      console.log(`Sending mail for opening ${opening.jobId}`);
      // create a htmlContent for the mai which contains the opening details
      const date = new Date(opening.applyby);
      // make format of date into a readable format
      const dateformat = date.toDateString();
      const timeformat = date.toTimeString();
      const time = timeformat.split(" ")[0];
      const htmlContent = `
        <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Application Deadline Reminder</title>
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
            background: linear-gradient(135deg, #ff5733, #c70039);
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
            color: #ff5733;
            font-weight: bold;
        }

        .footer {
            padding: 20px;
            text-align: center;
            font-size: 14px;
            color: #6c757d;
            background-color: #f1f3f5;
        }

        .apply-btn {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 15px;
            background-color: #ff5733;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            ⏳ Application Deadline Approaching ⏳
        </div>
        <div class="content">
            <h2>📢 Important Reminder!</h2>
            <p>The application deadline for <span class="highlight">${opening.name}</span> (Job ID: <span
                    class="highlight">${opening.jobId}</span>) is approaching.</p>
            <p><strong>⏳ Deadline:</strong> <span class="highlight">${time}, ${dateformat}</span></p>
            <p>Ensure you submit your application before the deadline!</p>
            <a href="${process.env.URL}" class="apply-btn">Apply Now</a>
            <p>If you have already applied, kindly ignore this email.</p>
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
      sendMailTo(studEmails, "Application Deadline Approaching", htmlContent);
    }
  }
}

function scheduleJob() {
  console.log("Scheduling job to run every minute");
  // schedule the job to run every day at 12:00 AM then what is cron expression for that
  // * * * * * * => every second
  // * * * * * => every minute
  // * * * * => every hour
  // * * * => every day
  // * * => every month
  // * => every
  // every day at 12:00 AM => 0 0 0 *
  schedule.scheduleJob("0 0 0 *", job);
}

module.exports = { scheduleJob };
