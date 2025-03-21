const express = require("express");
const upload = require("../utils/pdfStorage");
const fetchUser = require("../middleware");
const {
  getAllUsers,
  loginUser,
  signUpUser,
  updatePassword,
  forgotPassword,
  deleteUser,
  getUserProfile,
  updateUserProfile,
  markStudentsPlaced,
} = require("../controllers/authController");

const router = express.Router();

router.get("/", getAllUsers);
router.post("/login", loginUser);
router.post("/signup", signUpUser);
router.put("/updatepassword", updatePassword);
router.post("/forgot", forgotPassword);
router.delete("/delete/:id", deleteUser);
router.get("/profile", fetchUser, getUserProfile);
router.post(
  "/profile",
  fetchUser,
  upload.fields([{ name: "resume" }, { name: "image" }]),
  updateUserProfile
);
router.post("/placed", markStudentsPlaced);

module.exports = router;
