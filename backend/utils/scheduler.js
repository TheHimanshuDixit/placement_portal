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
      applyByDate - currentDate > 0
    ) {
      console.log(`Sending mail for opening ${opening.jobId}`);
      // create a htmlContent for the mai which contains the opening details
      const date = new Date(opening.applyby);
      // make format of date into a readable format
      const dateformat = date.toDateString();
      const timeformat = date.toTimeString();
      const time = timeformat.split(" ")[0];
      const htmlContent = `
        <h1>Application Deadline Approaching</h1>
        <p>Application deadline for the opening ${opening.name}-${opening.jobId} is approaching. <a href=${process.env.URL}>Apply</a> before ${time} ${dateformat}</p>
        <p>If you have already apply then ignore this mail</p>
        <p>Thanks</p>
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
