const schedule = require("node-schedule");
const sendMailTo = require("./mailer");
const Opening = require("../models/Opening");
const Application = require("../models/Application");

async function job() {
  console.log("Running job");
  const openings = await Opening.find({});
  const currentDate = new Date();

  for (const opening of openings) {
    const applicants = await Application.find({ jobId: opening.jobId });

    const applicantEmails = applicants.map((applicant) => applicant.email);

    const pptDate = new Date(opening.ppt);
    const testDate = new Date(opening.test);
    const interviewDate = new Date(opening.interview);
    // if only 1 day or less than 1 day is left to apply
    if (pptDate - currentDate <= 86400000 && pptDate - currentDate > 0) {
      console.log(`Sending mail for opening ${opening.jobId}`);
      // create a htmlContent for the mai which contains the opening details
      const date = new Date(opening.ppt);
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
    <title>Preplacement Talk Reminder</title>
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
            🚀 Preplacement Talk Reminder 🚀
        </div>
        <div class="content">
            <h2>📢 Important Update!</h2>
            <p>The preplacement talk for <span class="highlight">${opening.name}</span> (Job ID: <span
                    class="highlight">${opening.jobId}</span>) is scheduled for:</p>
            <p><strong>🕒 Time:</strong> <span class="highlight">${time}</span></p>
            <p><strong>📅 Date:</strong> <span class="highlight">${dateformat}</span></p>
            <p>Make sure you are prepared on time. This is a great opportunity to learn more about the company and
                the job role!</p>
            <p>See you there! 🎯</p>
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
      sendMailTo(
        applicantEmails,
        `T&P : ${opening.name}-${opening.jobId} Preplacement Talk`,
        htmlContent
      );
    }
    if (testDate - currentDate <= 86400000 && testDate - currentDate > 0) {
      console.log(`Sending mail for opening ${opening.jobId}`);
      // create a htmlContent for the mai which contains the opening details
      const date = new Date(opening.test);
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
    <title>Online Test Reminder</title>
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
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            🎯 Online Test Reminder 🎯
        </div>
        <div class="content">
            <h2>📢 Important Update!</h2>
            <p>The online test for <span class="highlight">${opening.name}</span> (Job ID: <span class="highlight">${opening.jobId}</span>) is scheduled for:</p>
            <p><strong>🕒 Time:</strong> <span class="highlight">${time}</span></p>
            <p><strong>📅 Date:</strong> <span class="highlight">${dateformat}</span></p>
            <p>Please ensure you are well-prepared and ready on time. Best of luck! 🍀</p>
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
      sendMailTo(
        applicantEmails,
        `T&P : ${opening.name}-${opening.jobId} Test`,
        htmlContent
      );
    }
    if (
      interviewDate - currentDate <= 86400000 &&
      interviewDate - currentDate > 0
    ) {
      console.log(`Sending mail for opening ${opening.jobId}`);
      // create a htmlContent for the mai which contains the opening details
      const date = new Date(opening.interview);
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
    <title>Interview Reminder</title>
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
            background: linear-gradient(135deg, #28a745, #218838);
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
            color: #28a745;
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
            🎯 Interview Reminder 🎯
        </div>
        <div class="content">
            <h2>📢 Important Update!</h2>
            <p>The interview for <span class="highlight">${opening.name}</span> (Job ID: <span class="highlight">${opening.jobId}</span>) is scheduled for:</p>
            <p><strong>🕒 Time:</strong> <span class="highlight">${time}</span></p>
            <p><strong>📅 Date:</strong> <span class="highlight">${dateformat}</span></p>
            <p>Make sure you are well-prepared and on time. Wishing you all the best! 🌟</p>
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
      sendMailTo(
        applicantEmails,
        `T&P : ${opening.name}-${opening.jobId} Interview`,
        htmlContent
      );
    }
  }
}

function eventSchedulerJob() {
  console.log("Scheduling job to run every minute");
  // schedule the job to run every day at 12:00 AM then what is cron expression for that
  // * * * * * * => every second
  // * * * * * => every minute
  // * * * * => every hour
  // * * * => every day
  // * * => every month
  // * => every
  // every day at 12:00 AM => 0 0 0 *
  schedule.scheduleJob("* * * * * *", job);
}

module.exports = { eventSchedulerJob };
