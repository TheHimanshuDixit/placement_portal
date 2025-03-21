const express = require("express");
const upload = require("../utils/pdfStorage");
const {
  addOpening,
  getAllOpenings,
  getOpeningById,
  deleteOpening,
  updateOpening,
} = require("../controllers/openingController");

const router = express.Router();

router.post("/add", upload.single("file"), addOpening);
router.get("/getall", getAllOpenings);
router.get("/getbyid/:oid", getOpeningById);
router.delete("/delete/:oid", deleteOpening);
router.put("/update/:oid", updateOpening);

module.exports = router;
