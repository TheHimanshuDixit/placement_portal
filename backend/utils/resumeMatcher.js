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
        return `Id-${opening._id} Company Name-${opening.name} Role-${
          opening.role
        } Branch-${opening.branch.join(
          " "
        )} Requirements-${opening.requirements.join(
          " "
        )} Job Description-${opening.jobdescription.join(" ")}`;
      })
      .join(", ");

    const prompt = `You are well trained in resume matching and have a good understanding of the openings. I'll give you some companies details and one resume. YAnalyze the given resume and job openings carefully. Generate a match percentage for each opening in the following this format: id1:percentage number1,...... just seperated by comma no space ensure this. If the data is incorrect, return null. The student's resume: ${resumeText}. These are the following openings: ${openingsPrompt}. Please generate the desired result.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    if (responseText === null) {
      return null;
    }

    const arr = responseText.split(",");
    const jsonData = {};
    for (const item of arr) {
      const [id, score] = item.split(":");
      jsonData[id] = parseFloat(score);
    }

    return jsonData;
  } catch (error) {
    console.error("Error generating match scores:", error);
    return null;
  }
};

module.exports = { extractTextFromResume, generateMatchScores };
