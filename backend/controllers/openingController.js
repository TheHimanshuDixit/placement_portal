const Opening = require("../models/Opening");
const Student = require("../models/Student");
const cloudinary = require("../helper/cloudinaryConfig");
const sendMailTo = require("../utils/mailer");

const addOpening = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const logo = result.secure_url;

    const {
      name,
      jobId,
      stipend,
      ctc,
      location,
      type,
      mode,
      role,
      backlog,
      cgpacritera,
      batch,
      branch,
      gender,
      duration,
      applyby,
      requirements,
      jobdescription,
      selectionprocess,
      ppt,
      test,
      interview,
    } = req.body;

    let existingOpening = await Opening.findOne({ jobId });
    if (existingOpening) {
      return res.status(400).json({ message: "Opening already exists" });
    }

    const newOpening = new Opening({
      name,
      jobId,
      stipend,
      ctc,
      logo,
      location,
      type,
      mode,
      role,
      backlog,
      cgpacritera,
      batch,
      branch,
      gender,
      duration,
      applyby,
      requirements,
      jobdescription,
      selectionprocess,
      ppt,
      test,
      interview,
    });

    await newOpening.save();

    const emailContent = `
      <h4>New Opening for ${batch} batch</h4>
      <h3>Opening Details:</h3>
      <p>Name: ${name}</p>
      <p>Job ID: ${jobId}</p>
      <p>Monthly Stipend: ${stipend}/Month</p>
      <p>CTC: ${ctc} LPA</p>
      <a href=${process.env.URL}>Click here to apply</a>
    `;

    const allStudents = await Student.find();
    const studentEmails = allStudents.map((student) => student.email);

    const mailResponse = await sendMailTo(
      studentEmails,
      "New Opening",
      emailContent
    );

    if (mailResponse.success) {
      res.json({
        message: "Opening added and email sent successfully",
        data: newOpening,
      });
    } else {
      res.json({
        message: "Opening added but email failed",
        error: mailResponse.error,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllOpenings = async (req, res) => {
  try {
    const openings = await Opening.find();
    res.json({ message: "success", data: openings });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getOpeningById = async (req, res) => {
  try {
    const opening = await Opening.findOne({ jobId: req.params.oid });
    if (!opening) {
      return res.status(404).json({ message: "Opening not found" });
    }
    res.json({ message: "success", data: opening });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteOpening = async (req, res) => {
  try {
    const opening = await Opening.findById(req.params.oid);
    if (!opening) {
      return res.status(404).json({ message: "Opening does not exist" });
    }

    await Opening.deleteOne({ _id: req.params.oid });
    res.json({ message: "Opening deleted successfully", data: opening });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateOpening = async (req, res) => {
  try {
    const opening = await Opening.findById(req.params.oid);
    if (!opening) {
      return res.status(404).json({ message: "Opening does not exist" });
    }

    const updatedData = {
      name: req.body.name,
      jobId: req.body.jobId,
      stipend: req.body.stipend,
      ctc: req.body.ctc,
      logo: opening.logo,
      location: req.body.location,
      type: req.body.type,
      mode: req.body.mode,
      role: req.body.role,
      backlog: req.body.backlog,
      cgpacritera: req.body.cgpacritera,
      batch: req.body.batch,
      branch: req.body.branch,
      gender: req.body.gender,
      duration: req.body.duration,
      applyby: req.body.applyby,
      requirements: req.body.requirements,
      jobdescription: req.body.jobdescription,
      selectionprocess: req.body.selectionprocess,
      ppt: req.body.ppt,
      test: req.body.test,
      interview: req.body.interview,
    };

    await Opening.updateOne({ _id: req.params.oid }, { $set: updatedData });
    res.json({ message: "Opening updated successfully", data: updatedData });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addOpening,
  getAllOpenings,
  getOpeningById,
  deleteOpening,
  updateOpening,
};
