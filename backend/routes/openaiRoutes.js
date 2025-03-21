const express = require("express");
const fetchUser = require("../middleware");
const { matchResumeWithOpenings } = require("../controllers/openaiController");

const router = express.Router();

router.get("/", fetchUser, matchResumeWithOpenings);

module.exports = router;
