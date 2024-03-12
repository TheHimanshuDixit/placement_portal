const express = require("express");
const router = express.Router();

const fetchuser = require("../middleware");
const Application = require("../models/Application");

// POST /api/contribute/add/:oid
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
