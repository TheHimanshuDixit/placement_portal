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

// GET /api/contribute/get
router.get("/get", async (req, res) => {
  let contributes = await Contribute.find();
  res.json({ data: contributes });
});

// GET /api/contribute/get/:id
router.get("/get/:id", async (req, res) => {
  let contribute = await Contribute.findOne({ _id: req.params.id });
  res.json({ data: contribute });
});

// PUT /api/contribute/update/:id
router.put("/update/:id", fetchuser, async (req, res) => {
  let contribute = await Contribute.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  );
  res.json({ data: contribute });
});

// DELETE /api/contribute/delete/:id
router.delete("/delete/:id", fetchuser, async (req, res) => {
  let contribute = await Contribute.findOneAndDelete({ _id: req.params.id });
  res.json({ data: contribute });
});

module.exports = router;
