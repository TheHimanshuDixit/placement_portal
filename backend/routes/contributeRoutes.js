const express = require("express");
const fetchUser = require("../middleware");
const {
  addContribution,
  getAllContributions,
  getContributionsByUser,
  updateContribution,
  deleteContribution,
} = require("../controllers/contributeController");

const router = express.Router();

router.post("/add", fetchUser, addContribution);
router.get("/get", getAllContributions);
router.get("/getbyid", fetchUser, getContributionsByUser);
router.put("/update/:id", fetchUser, updateContribution);
router.delete("/delete/:id", fetchUser, deleteContribution);

module.exports = router;
