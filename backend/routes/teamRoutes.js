const express = require("express");
const upload = require("../utils/pdfStorage");
const {
  addTeamMember,
  loginTeamMember,
  getAllTeamMembers,
  getTeamMemberById,
  updateTeamMember,
  deleteTeamMember,
} = require("../controllers/teamController");

const router = express.Router();

router.post("/add", upload.single("file"), addTeamMember);
router.post("/login", loginTeamMember);
router.get("/get", getAllTeamMembers);
router.get("/get/:id", getTeamMemberById);
router.put("/update/:id", upload.single("file"), updateTeamMember);
router.delete("/delete/:id", deleteTeamMember);

module.exports = router;
