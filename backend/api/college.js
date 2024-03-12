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
