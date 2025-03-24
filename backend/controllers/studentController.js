const Application = require("../models/Application");
const Student = require("../models/Student");
const Opening = require("../models/Opening");

const getStudentApplications = async (req, res) => {
  try {
    const student = await Student.findById(req.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const applications = await Application.find({ email: student.email });

    let data = [];
    for (const application of applications) {
      const opening = await Opening.findById(application.company);
      if (opening) {
        data.push({
          company: opening,
          event: application.event ? application.event : "",
        });
      }
    }

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateStudentAttendance = async (req, res) => {
  try {
    const { company, event, date, studentList } = req.body;
    const applications = await Application.find({ company });

    for (const app of applications) {
      const status = studentList.includes(app.email) ? "Present" : "Absent";
      const eventData = { event, date, status };

      await Application.findByIdAndUpdate(
        app._id,
        { $push: { event: eventData } },
        { new: true }
      );
    }

    res
      .status(200)
      .json({ success: "success", message: "Attendance updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCompanyEvents = async (req, res) => {
  try {
    const applications = await Application.find({ company: req.params.cid });

    let data = [];
    for (const app of applications) {
      if (app.event) {
        for (const event of app.event) {
          data.push({ name: app.name, event });
        }
      }
    }

    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getStudentApplications,
  updateStudentAttendance,
  getCompanyEvents,
};
