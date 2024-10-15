const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const Student = require("../models/Student");
const Opening = require("../models/Opening");
const fetchuser = require("../middleware");

// GET /api/student
router.get("/", fetchuser, async (req, res) => {
  let student = await Student.findById(req.id);
  let applications = await Application.find({ email: student.email });
  console.log(applications);

  // wants to send array of objects object contain company  and event both is an object
  let data = [];
  for (let i = 0; i < applications.length; i++) {
    let opening = await Opening.findById(applications[i].company);
    data.push({
      company: opening,
      event: applications[i].event ? applications[i].event : "",
    });
  }
  res.json({ data: data });
});

// POST /api/student
router.put("/", async (req, res) => {
  let { company, event, date, studentList } = req.body;
  let application = await Application.find({ company: company });
  for (let i = 0; i < application.length; i++) {
    if (studentList.includes(application[i].email)) {
      console.log(application[i]);
      let e = { event: event, date: date };
      let addEvent = await Application.findByIdAndUpdate(
        application[i]._id,
        { $push: { event: e } },
        { new: true }
      );
    }
  }
  res.json({ message: "success" });
});

module.exports = router;
