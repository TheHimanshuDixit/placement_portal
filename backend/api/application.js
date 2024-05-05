const express = require("express");
const router = express.Router();
// const CsvParser = require("json2csv").Parser;

const multer = require("multer");
const cloudinary = require("../helper/cloudinaryconfig");

// pdf storage path
const pdfconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads/pdf");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: pdfconfig });

const fetchuser = require("../middleware");
const Application = require("../models/Application");
const Student = require("../models/Student");

// POST /api/application/add/:oid
router.post("/add/:oid", upload.single("resume"), async (req, res) => {
  fetchuser(req, res, async () => {
    let user = await Student.findById(req.id);
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }
    let e = user.email;
    if (e !== req.body.email) {
      return res.status(400).json({ error: "Email not matched" });
    }
    const applicationExists = await Application.findOne({
      email: req.body.email,
      company: req.params.oid,
    });
    if (applicationExists) {
      return res.status(400).json({ error: "Application already exists" });
    }
    const newApplication = {
      company: req.params.oid,
      ...req.body,
    };
    if (req.file !== undefined) {
      const upload = await cloudinary.uploader.upload(req.file.path);
      const url = upload.secure_url.replace(".pdf", ".jpg");
      newApplication.resume = url;
    }
    let application = new Application(newApplication);
    let resp = await application.save();
    res.json({ message: "success", data: resp });
  });
});

// GET /api/application/get/:oid
router.get("/get/:oid", async (req, res) => {
  let applications = await Application.find({ company: req.params.oid });
  res.json({ data: applications });
});

// GET /api/application/get
router.get("/get", fetchuser, async (req, res) => {
  let student = await Student.findById(req.id);
  let applications = await Application.find({ email: student.email });
  res.json({ data: applications });
});

// GET /api/application/getall
router.get("/getall", async (req, res) => {
  let applications = await Application.find();
  res.json({ data: applications });
});

// GET /api/application/download/:id
// router.get("/download/:id", async (req, res) => {
//   let application = await Application.find({ company: req.params.id });
//   let applicantList = [];
//   application.forEach((a,index) => {
//     let applicant = {
//       SrNo: index+1,
//       Name: a.name,
//       Email: a.email,
//       Enrollment: a.enroll,
//       Phone: a.phone,
//       Gender: a.gender,
//       Resume: a.resume,
//     };
//     applicantList.push(applicant);
//   });
//   const csvFields = [
//     "SrNo",
//     "Name",
//     "Email",
//     "Enrollment",
//     "Phone",
//     "Gender",
//     "Resume",
//   ];
//   const csvParser = new CsvParser({ csvFields });
//   const csvData = csvParser.parse(applicantList);
//   res.setHeader("Content-Type", "text/csv");
//   res.setHeader("Content-Disposition", "attachment; filename=applicants.csv");
//   console.log(csvData);
//   res.send(csvData);
// });

module.exports = router;
