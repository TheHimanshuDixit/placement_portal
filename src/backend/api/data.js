const express = require("express");

const router = express.Router();


  const products = [
    {
      id: 1,
      comp_name: "Amazon",
      role: "SDE",
      stipend: "$48",
      type: "Internship",
      mode: "Remote",
      duration: "2 Months",
      logo: "./amazon.png",
    },
    {
      id: 2,
      comp_name: "Amazon",
      role: "SDE",
      stipend: "$48",
      type: "Job",
      mode: "Onsite",
      duration: "Full-time",
      logo: "./amazon.png",
    },
    {
      id: 3,
      comp_name: "Amazon",
      role: "SDE",
      stipend: "$48",
      type: "Onsite",
      mode: "FTE",
      duration: "Full-time",
      logo: "./amazon.png",
    },
    {
      id: 4,
      comp_name: "Amazon",
      role: "SDE",
      stipend: "$48",
      type: "Job",
      mode: "Remote",
      duration: "Full-time",
      logo: "./amazon.png",
    },
  ];

// POST /api/data
router.get("/getdata", async(req, res) => {
  // Implement your data logic here
  res.json({ data: products });
});

module.exports = router;