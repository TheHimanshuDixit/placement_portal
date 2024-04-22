const express = require("express");
const router = express.Router();

const fetchuser = require("../middleware");
const Application = require("../models/Application");
const Student = require("../models/Student");

// POST /api/application/add/:oid
router.post("/add/:oid", fetchuser, async (req, res) => {
  let { name, email, enroll, branch, gender, resume } = req.body;
  let student = await Student.findById(req.id);
  if (!student) {
    return res.status(400).json({ error: "Student not found" });
  }
  let e = student.email;
  if (e !== email) {
    return res.status(400).json({ error: "Email not matched" });
  }
  let application = new Application({
    company: req.params.oid,
    name,
    email,
    enroll,
    branch,
    gender,
    resume,
  });
  let resp = await application.save();
  res.json({ message: "success", data: resp });
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

module.exports = router;
