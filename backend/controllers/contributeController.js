const Contribute = require("../models/Contribute");
const Student = require("../models/Student");

const addContribution = async (req, res) => {
  try {
    const { question, answer, company, role, year, round, topic } = req.body;
    const user = await Student.findById(req.id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const contribution = new Contribute({
      student: req.id,
      name: user.name,
      question,
      answer,
      company,
      role,
      year,
      round,
      topic,
    });

    await contribution.save();
    res
      .status(201)
      .json({
        success: "success",
        message: "Contribution added successfully",
        data: contribution,
      });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllContributions = async (req, res) => {
  try {
    const contributions = await Contribute.find();
    res.status(200).json({ data: contributions });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getContributionsByUser = async (req, res) => {
  try {
    const contributions = await Contribute.find({ student: req.id });
    res.status(200).json({ data: contributions });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateContribution = async (req, res) => {
  try {
    const contribution = await Contribute.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!contribution) {
      return res.status(404).json({ error: "Contribution not found" });
    }

    res.status(200).json({ success: "success", data: contribution });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteContribution = async (req, res) => {
  try {
    const contribution = await Contribute.findByIdAndDelete(req.params.id);

    if (!contribution) {
      return res.status(404).json({ error: "Contribution not found" });
    }

    res.status(200).json({
      result: "success",
      message: "Contribution deleted successfully",
      data: contribution,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addContribution,
  getAllContributions,
  getContributionsByUser,
  updateContribution,
  deleteContribution,
};
