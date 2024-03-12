const express = require("express");
const router = express.Router();
const Contribute = require("../models/Contribute");
const fetchuser = require("../middleware");

// POST /api/contribute/add
router.post("/add", fetchuser, async (req, res) => {
  const { name, question, answer, company, role, year, round, topic } =
    req.body;

  let contribute = new Contribute({
    student: req.id,
    name,
    question,
    answer,
    company,
    role,
    year,
    round,
    topic,
  });
  let resp = await contribute.save();
  res.json({ message: "success", data: resp });
});
