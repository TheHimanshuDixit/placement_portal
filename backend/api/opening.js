const express = require("express");
const Opening = require("../models/Opening");
const router = express.Router();

// http://localhost:4000

// POST /api/opening/add
router.post("/add", async (req, res) => {
  const {
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
  newOpening = new Opening({
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
    branch,
    gender,
    duration,
    applyby,
  });
  let resp = await newOpening.save();
  res.json({ message: "success", data: resp });
});

// POST /api/opening/getall
router.get("/getall", async (req, res) => {
  let resp = await Opening.find();
  res.json({ message: "success", data: resp });
});

// POST /api/opening/getbyid
router.get("/getbyid/:oid", async (req, res) => {
  let resp = await Opening.findOne({
    jobId: req.params.oid,
  });
  res.json({ message: "success", data: resp });
});

// POST /api/opening/delete
router.delete("/delete/:oid", async (req, res) => {
  let resp = await Opening.findById({
    _id: req.params.oid,
  });
  if (!resp) {
    return res.status(401).json({ message: "Opening does not exists" });
  }
  resp = await Opening.deleteOne({
    _id: req.params.oid,
  });
  res.json({ message: "success", data: resp });
});

// POST /api/opening/update
router.put("/update/:oid", async (req, res) => {
  let resp = await Opening.findById({
    _id: req.params.oid,
  });
  if (!resp) {
    return res.status(401).json({ message: "Opening does not exists" });
  }
  resp = await Opening.updateOne(
    { _id: req.params.oid },
    {
      $set: req.body,
    }
  );
  res.json({ message: "success", data: resp });
});

module.exports = router;
