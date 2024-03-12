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
