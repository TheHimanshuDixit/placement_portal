const express = require("express");
const router = express.Router();

const fetchuser = require("../middleware");
const Application = require("../models/Application");

// POST /api/application/add/:oid
router.post("/add/:oid", fetchuser, async (req, res) => {
  let { name, email, enroll, branch, gender } = req.body;
  let application = new Application({
    company: req.params.oid,
    name,
    email,
    enroll,
    branch,
    gender
  });
  let resp = await application.save();
  res.json({ message: "success", data: resp });
});

// GET /api/application/get/:oid
router.get("/get/:oid", fetchuser, async (req, res) => {
  let applications = await Application.find({ company: req.params.oid });
  res.json({ data: applications });
});

module.exports = router;
