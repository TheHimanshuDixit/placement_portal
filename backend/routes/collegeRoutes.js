const express = require("express");
const {
  addCollege,
  addMultipleColleges,
  loginCollege,
  getAllColleges,
  getCollegeByEnroll,
  updateCollege,
  deleteCollege,
} = require("../controllers/collegeController");

const router = express.Router();

router.post("/add", addCollege);
router.post("/multiadd", addMultipleColleges);
router.post("/login", loginCollege);
router.get("/get", getAllColleges);
router.get("/get/:enroll", getCollegeByEnroll);
router.put("/update/:enroll", updateCollege);
router.delete("/delete/:enroll", deleteCollege);

module.exports = router;
