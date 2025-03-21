const express = require("express");
const upload = require("../utils/pdfStorage");
const fetchUser = require("../middleware");
const {
  addApplication,
  getApplicationsByCompany,
  getApplicationsByStudent,
  getAllApplications,
} = require("../controllers/applicationController");

const router = express.Router();

router.post(
  "/add/:oid",
  upload.single("resume"),
  fetchUser,
  async (req, res) => {
    try {
      const response = await addApplication(req);
      res.status(201).json(response);
    } catch (error) {
      res
        .status(error.status || 500)
        .json({ error: error.message || "Internal Server Error" });
    }
  }
);

router.get("/get/:oid", async (req, res) => {
  try {
    const applications = await getApplicationsByCompany(req.params.oid);
    res.status(200).json({ data: applications });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal Server Error" });
  }
});

router.get("/get", fetchUser, async (req, res) => {
  try {
    const applications = await getApplicationsByStudent(req);
    res.status(200).json({ data: applications });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal Server Error" });
  }
});

router.get("/getall", async (req, res) => {
  try {
    const applications = await getAllApplications();
    res.status(200).json({ data: applications });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ error: error.message || "Internal Server Error" });
  }
});

module.exports = router;
