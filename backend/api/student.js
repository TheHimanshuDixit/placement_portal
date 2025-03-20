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

  // wants to send array of objects object contain company  and event both is an object
  let data = [];
  for (const application of applications) {
    let opening = await Opening.findById(application.company);
    data.push({
      company: opening,
      event: application.event ? application.event : "",
    });
  }
  res.json({ data: data });
});

// POST /api/student
router.put("/", async (req, res) => {
  let { company, event, date, studentList } = req.body;
  let application = await Application.find({ company: company });
  for (const app of application) {
    if (studentList.includes(app.email)) {
      let e = { event: event, date: date, status: "Present" };
      await Application.findByIdAndUpdate(
        app._id,
        { $push: { event: e } },
        { new: true }
      );
    } else {
      let e = { event: event, date: date, status: "Absent" };
      await Application.findByIdAndUpdate(
        app._id,
        { $push: { event: e } },
        { new: true }
      );
    }
  }
  res.json({ message: "success" });
});

// GET /api/student/:cid
router.get("/:cid", async (req, res) => {
  let application = await Application.find({ company: req.params.cid });
  let data = [];
  for (const app of application) {
    for (const event of app.event) {
      data.push({ name: app.name, event: event });
    }
  }
  res.json({ data: data });
});

module.exports = router;
