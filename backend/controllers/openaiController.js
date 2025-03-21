const Student = require("../models/Student");
const Opening = require("../models/Opening");
const {
  extractTextFromResume,
  generateMatchScores,
} = require("../utils/resumeMatcher");

const matchResumeWithOpenings = async (req, res) => {
  try {
    const companies = await Opening.find({ status: "ongoing" });

    if (!companies.length) {
      return res
        .status(400)
        .json({ success: false, message: "No ongoing openings found" });
    }

    const student = await Student.findById(req.id);
    if (!student) {
      return res.status(401).json({ success: false, message: "Invalid email" });
    }
    if (!student.resume) {
      return res
        .status(400)
        .json({ success: false, message: "Resume not uploaded" });
    }

    // Extract text from the resume
    const resumeText = await extractTextFromResume(student.resume);
    if (!resumeText) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Failed to extract text from resume",
        });
    }

    // Generate AI-based match scores
    const matchResults = await generateMatchScores(companies, resumeText);

    if (!matchResults) {
      return res
        .status(400)
        .json({ success: false, message: "Data is not correct" });
    }

    res.status(200).json({ success: true, message: matchResults });
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    res
      .status(500)
      .json({ success: false, message: "An unexpected error occurred" });
  }
};

module.exports = { matchResumeWithOpenings };
