const express = require("express");
const Opening = require("../models/Openings");
const router = express.Router();

// POST /api/opening
router.get("/getopenings", async (req, res) => {
  res.json({ message: "success" });
});

// POST /api/opening/add
router.post("/add", async (req, res) => {
  const {
    name,
    jobId,
    stipend,
    type,
    mode,
    role,
    backlog,
    cgpacritera,
    branch,
    gender,
    duration,
    applyby,
  } = req.body;
  let newOpening = await Opening.findOne({
    jobId,
  });
  if (newOpening) {
    return res.status(401).json({ message: "Opening already exists" });
  }
  let opening = new Opening({
    name,
    jobId,
    stipend,
    type,
    mode,
    role,
    backlog,
    cgpacritera,
    branch,
    gender,
    duration,
    applyby,
  });
  let resp = await opening.save();
  res.json({ message: "success", data: resp });
});

module.exports = router;
