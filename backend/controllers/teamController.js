const Team = require("../models/Team");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("../helper/cloudinaryConfig");
require("dotenv").config();

const token = process.env.ADMIN_TOKEN_SECRET;

const addTeamMember = async (req, res) => {
  try {
    const { name, position, email, password } = req.body;

    if (!req.file) {
      return res
        .status(400)
        .json({  error: "File is required" });
    }

    let existingMember = await Team.findOne({ email });
    if (existingMember) {
      return res
        .status(400)
        .json({ error: "Team member already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashpwd = await bcrypt.hash(password, salt);

    let url = "";
    try {
      const upload = await cloudinary.uploader.upload(req.file.path);
      url = upload.secure_url;
    } catch (error) {
      return res.status(500).json({
        result: "success",
        message: "File upload failed",
        error: error.message,
      });
    }

    const teamMember = new Team({
      name,
      position,
      image: url,
      email,
      password: hashpwd,
    });

    await teamMember.save();

    const authAdminToken = jwt.sign({ email }, token, { expiresIn: "1d" });

    res.status(201).json({
      success: "success",
      message: "Team member added successfully",
      data: teamMember,
      authAdminToken,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const loginTeamMember = async (req, res) => {
  try {
    const { email, password } = req.body;
    const teamMember = await Team.findOne({ email });

    if (!teamMember) {
      return res
        .status(401)
        .json({ error: "Invalid email" });
    }

    const isPasswordValid = await bcrypt.compare(password, teamMember.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ error: "Invalid password" });
    }

    const authAdminToken = jwt.sign({ email }, token, { expiresIn: "1d" });

    res.json({ success: "success", message: "Login successful", authAdminToken });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getAllTeamMembers = async (req, res) => {
  try {
    const teamMembers = await Team.find();
    res.json({ data: teamMembers });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getTeamMemberById = async (req, res) => {
  try {
    const teamMember = await Team.findById(req.params.id);

    if (!teamMember) {
      return res
        .status(404)
        .json({ error: "Team member not found" });
    }

    res.json({ data: teamMember });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateTeamMember = async (req, res) => {
  try {
    let teamMember = await Team.findById(req.params.id);
    if (!teamMember) {
      return res
        .status(404)
        .json({  error: "Team member not found" });
    }

    let updateData = { ...req.body };

    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path);
      updateData.image = upload.secure_url.replace(".pdf", ".jpg");
    }

    await Team.updateOne({ _id: req.params.id }, { $set: updateData });

    teamMember = await Team.findById(req.params.id);
    res.json({
      success: "success",
      message: "Update successful",
      data: teamMember,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteTeamMember = async (req, res) => {
  try {
    const teamMember = await Team.findByIdAndDelete(req.params.id);

    if (!teamMember) {
      return res
        .status(404)
        .json({ error: "Team member not found" });
    }

    res.json({
      success: "success",
      message: "Team member deleted successfully",
      data: teamMember,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addTeamMember,
  loginTeamMember,
  getAllTeamMembers,
  getTeamMemberById,
  updateTeamMember,
  deleteTeamMember,
};
