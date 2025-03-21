const express = require("express");
const fetchUser = require("../middleware");
const {
  getStudentApplications,
  updateStudentAttendance,
  getCompanyEvents,
} = require("../controllers/studentController");

const router = express.Router();

router.get("/", fetchUser, getStudentApplications);
router.put("/", updateStudentAttendance);
router.get("/:cid", getCompanyEvents);

module.exports = router;
