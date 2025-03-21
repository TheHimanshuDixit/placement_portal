const Tesseract = require("tesseract.js");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const extractTextFromResume = async (resumeUrl) => {
  try {
    const {
      data: { text },
    } = await Tesseract.recognize(resumeUrl, "eng");
    return text;
  } catch (error) {
    console.error("Error extracting text from resume:", error);
    return null;
  }
};

const generateMatchScores = async (openings, resumeText) => {
  try {
    const genAI = new GoogleGenerativeAI(
      process.env.GOOGLE_GENERATIVE_AI_API_KEY
    );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const openingsPrompt = openings
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

    const prompt = `You are well trained in resume matching and have a good understanding of the openings. I'll give you some companies details and one resume. You have to analyze the resume and openings carefully and generate a match percentage for each opening in JSON format: [{Id: id, score: percentage}]. If the data is incorrect, return null. The student's resume: ${resumeText}. These are the following openings: ${openingsPrompt}. Please generate the desired result.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return responseText !== null ? JSON.parse(responseText) : null;
  } catch (error) {
    console.error("Error generating match scores:", error);
    return null;
  }
};

module.exports = { extractTextFromResume, generateMatchScores };
