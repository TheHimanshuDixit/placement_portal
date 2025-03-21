const express = require("express");
const {
  getYearlyStatistics,
  getDashboardStatistics,
} = require("../controllers/statsController");

const router = express.Router();

router.get("/", getYearlyStatistics);
router.get("/dashboard", getDashboardStatistics);

module.exports = router;
