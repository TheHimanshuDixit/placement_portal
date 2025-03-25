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
      return res.status(400).json({ error: "Opening already exists" });
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
      <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Job Opening</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f7f9fc;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .header {
            background: #007bff;
            color: #ffffff;
            padding: 20px;
            text-align: center;
        }

        .content {
            padding: 30px;
            text-align: left;
        }

        .footer {
            padding: 15px;
            text-align: center;
            font-size: 12px;
            color: #6c757d;
        }

        .btn {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 15px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>New Opening for ${batch} Batch</h1>
        </div>
        <div class="content">
            <h3>Opening Details:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Job ID:</strong> ${jobId}</p>
            <p><strong>Monthly Stipend:</strong> ${stipend}/Month</p>
            <p><strong>CTC:</strong> ${ctc} LPA</p>
            <a href="${process.env.URL}" class="btn">Click here to apply</a>
        </div>
        <div class="footer">
            <p>&copy; 2025 T&P Portal. All rights reserved.</p>
        </div>
    </div>
</body>

</html>
    `;

    const allStudents = await Student.find();
    const studentEmails = allStudents.map((student) => student.email);

    const mailResponse = await sendMailTo(
      studentEmails,
      "T&P : New Opening",
      emailContent
    );

    if (mailResponse.success) {
      res.json({
        success: "success",
        message: "Opening added and email sent successfully",
        data: newOpening,
      });
    } else {
      res.json({
        error: "Opening added but email failed",
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllOpenings = async (req, res) => {
  try {
    const openings = await Opening.find();
    res.json({ success: "success", data: openings });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getOpeningById = async (req, res) => {
  try {
    const opening = await Opening.findOne({ jobId: req.params.oid });
    if (!opening) {
      return res.status(404).json({ error: "Opening not found" });
    }
    res.json({ success: "success", data: opening });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteOpening = async (req, res) => {
  try {
    const opening = await Opening.findById(req.params.oid);
    if (!opening) {
      return res.status(404).json({ error: "Opening does not exist" });
    }

    await Opening.deleteOne({ _id: req.params.oid });
    res.json({
      success: "success",
      message: "Opening deleted successfully",
      data: opening,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateOpening = async (req, res) => {
  try {
    const opening = await Opening.findById(req.params.oid);
    if (!opening) {
      return res.status(404).json({ error: "Opening does not exist" });
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
      progress: req.body.progress ? req.body.progress : opening.progress,
      applyby: req.body.applyby,
      requirements: req.body.requirements,
      jobdescription: req.body.jobdescription,
      selectionprocess: req.body.selectionprocess,
      ppt: req.body.ppt,
      test: req.body.test,
      interview: req.body.interview,
    };

    await Opening.updateOne({ _id: req.params.oid }, { $set: updatedData });
    res.json({
      success: "success",
      message: "Opening updated successfully",
      data: updatedData,
    });
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
