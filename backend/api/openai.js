const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const fetchuser = require("../middleware");
const Student = require("../models/Student");
const Tesseract = require("tesseract.js");
const Opening = require("../models/Opening");

dotenv.config();

// http://localhost:4000/api/openai/
router.get("/", fetchuser, async (req, res) => {
  try {
    const companies = await Opening.find({});

    // Extract all ongoing openings
    let ongoingOpenings = companies.filter(
      (company) => company.status === "ongoing"
    );

    // Construct companies prompt
    let companiesPrompt = ongoingOpenings
      .map((opening) => {
        return `Id-${opening._id} Company Name-${opening.company} Role-${
          opening.role
        } Branch-${opening.branch.join(
          " "
        )} Requirements-${opening.requirements.join(
          " "
        )} Job Description-${opening.jobdescription.join(" ")}`;
      })
      .join(", ");

    let student = await Student.findById(req.id);
    if (!student) {
      return res.status(401).json({ message: "Invalid email" });
    }
    if (!student.resume) {
      return res.status(400).json({ error: "Resume not uploaded" });
    }

    // Extract text from resume using Tesseract
    const {
      data: { text: resumePrompt },
    } = await Tesseract.recognize(student.resume, "eng");

    const genAI = new GoogleGenerativeAI(
      process.env.GOOGLE_GENERATIVE_AI_API_KEY
    );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are well trained in resume matching and have a good understanding of the openings. I'll give you some companies details and one resume you have to read resume and companies details carefully and on the basis of given things of each company (like name, role, branch, requiements, job description) and read details of resume given the projects, skill, expertise, work experience, branch etc. Now, you have to generate the percentage of matching of resume with each comapnies in json format (array of object) [{Id: id, score : percentage score}, {Id: id, score : percentage score}] if data is not correct then give output null only. The student's resume: ${resumePrompt}. These are the following openings: ${companiesPrompt}. Please generate the desired result`;

    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();
    //convert text into json
    if (responseText === null) {
      return res
        .status(400)
        .json({ success: false, message: "Data is not correct" });
    }
    const responseJson = JSON.parse(responseText);

    res.status(200).json({ success: true, message: responseJson });
  } catch (error) {
    console.error("An unexpected error occurred: ", error);
    res
      .status(500)
      .json({ success: false, message: "An unexpected error occurred" });
  }
});

module.exports = router;
