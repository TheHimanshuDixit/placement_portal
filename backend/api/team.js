const express = require("express");
const router = express.Router();
const Team = require("../models/Team");

// POST /api/team/add
router.post("/add", async (req, res) => {
  const { name, position, image, email, password } = req.body;
  let newTeam = await Team.findOne({
    email,
  });
  if (newTeam) {
    return res.status(401).json({ message: "Team already exists" });
  }
  let team = new Team({
    name,
    position,
    image,
    email,
    password,
  });
  let resp = await team.save();
  res.json({ message: "success", data: resp });
});

// POST /api/team/login
router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let team = await Team.findOne({ email });
  if (team) {
    if (team.password === password) {
      return res.json({ message: "success", data: team });
    }
    return res.json({ message: "Invalid Password" });
  }
  return res.json({ message: "Team not found" });
});

// GET /api/team/get
router.get("/get", async (req, res) => {
  let team = await Team.find();
  res.json({ data: team });
});

// GET /api/team/get/:id
router.get("/get/:id", async (req, res) => {
  let team = await Team.findOne({ _id: req.params.id });
  res.json({ data: team });
});

// PUT /api/team/update/:id
router.put("/update/:id", async (req, res) => {
  let team = await Team.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true }
  );
  res.json({ data: team });
});

// DELETE /api/team/delete/:id
router.delete("/delete/:id", async (req, res) => {
  let team = await Team.findOneAndDelete({ _id: req.params.id });
  res.json({ data: team });
});

module.exports = router;
