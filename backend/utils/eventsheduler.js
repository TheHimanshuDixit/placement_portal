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
        <h1>Preplacement Talk of ${opening.name}-${opening.jobId} will be ${time} ${dateformat}. Be ready on time.</h1>
        <p>Thanks</p>
      `;
      sendMailTo(
        applicantEmails,
        `${opening.name}-${opening.jobId} Preplacement Talk`,
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
        <h1>Online Test of ${opening.name}-${opening.jobId} will be ${time} ${dateformat}. Be ready on time.</h1>
        <p>Thanks</p>
      `;
      sendMailTo(
        applicantEmails,
        `${opening.name}-${opening.jobId} Test`,
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
        <h1>Interview of ${opening.name}-${opening.jobId} will be ${time} ${dateformat}. Be ready on time.</h1>
        <p>Thanks</p>
      `;
      sendMailTo(
        applicantEmails,
        `${opening.name}-${opening.jobId} Interview`,
        htmlContent
      );
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
  schedule.scheduleJob("* * * * * *", job);
}

module.exports = { scheduleJob };
