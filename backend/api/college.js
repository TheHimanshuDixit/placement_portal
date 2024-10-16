const express = require("express");
const router = express.Router();

const College = require("../models/College");

// POST /api/college/add
router.post("/add", async (req, res) => {
  let { enroll, pwd } = req.body;
  let check = await College.findOne({ enroll });
  if (check) {
    return res.json({ message: "College already exists" });
  }
  let college = new College({
    enroll,
    pwd,
  });
  let resp = await college.save();
  res.json({ message: "success", data: resp });
});

// POST /api/collge/multiadd
router.post("/multiadd", async (req, res) => {
  let colleges = req.body; 
  if (!Array.isArray(colleges)) {
    return res
      .status(400)
      .json({ message: "Input should be an array of objects" });
  }
  let addedColleges = [];
  let existingColleges = [];

  for (let college of colleges) {
    let { enroll, pwd } = college;
    let check = await College.findOne({ enroll });
    if (check) {
      existingColleges.push({ enroll, message: "College already exists" });
    } else {
      let newCollege = new College({
        enroll,
        pwd,
      });
      let resp = await newCollege.save();
      addedColleges.push(resp);
    }
  }
  res.json({
    message: "Operation completed",
    addedColleges,
    existingColleges,
  });
});

// POST /api/college/login
router.post("/login", async (req, res) => {
  let { enroll, pwd } = req.body;
  let college = await College.findOne({ enroll });
  if (college) {
    if (college.pwd === pwd) {
      return res.json({ message: "success", data: college });
    }
    return res.json({ message: "Invalid Password" });
  }
  return res.json({ message: "College not found" });
});

// GET /api/college/get
router.get("/get", async (req, res) => {
  let colleges = await College.find();
  res.json({ data: colleges });
});

// GET /api/college/get/:enroll
router.get("/get/:enroll", async (req, res) => {
  let college = await College.findOne({ enroll: req.params.enroll });
  res.json({ data: college });
});

// PUT /api/college/update/:enroll
router.put("/update/:enroll", async (req, res) => {
  let college = await College.findOneAndUpdate(
    { enroll: req.params.enroll },
    { $set: req.body },
    { new: true }
  );
  res.json({ data: college });
});

// DELETE /api/college/delete/:enroll
router.delete("/delete/:enroll", async (req, res) => {
  let college = await College.findOneAndDelete({ enroll: req.params.enroll });
  res.json({ data: college });
});

module.exports = router;
