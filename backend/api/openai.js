const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();

router.get("/", async (req, res) => {
  const genAI = new GoogleGenerativeAI(
    "AIzaSyDAd9EQeSOHBoxzx_k-lnIg6CFcsMjC-6E"
  );
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt =
      "Generate three engaging and lighthearted icebreaker questions formatted as a single string, separated by '||'. These questions are intended for a casual conversation app and should promote fun, inclusive, and friendly discussions. Avoid overly personal or controversial topics. For example, questions could include imaginative scenarios, preferences, or simple joys in life. Ensure the tone is approachable and universal. For instance, your output should look like this: 'What’s the most interesting place you’ve visited?||If you could live in any fictional universe, which one would it be?||What’s a song that always lifts your mood?'. Focus on questions that spark curiosity and inspire warm connections.";

    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();

    res.status(200).json({ success: true, message: responseText });
  } catch (error) {
    console.error("An unexpected error occurred: ", error);
    res
      .status(500)
      .json({ success: false, message: "An unexpected error occurred" });
  }
});

module.exports = router;
