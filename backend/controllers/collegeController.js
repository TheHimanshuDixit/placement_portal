const College = require("../models/College");

const addCollege = async (req, res) => {
  try {
    const { enroll, pwd } = req.body;
    const existingCollege = await College.findOne({ enroll });

    if (existingCollege) {
      return res.status(400).json({ error: "College already exists" });
    }

    const college = new College({ enroll, pwd });
    await college.save();
    res.status(201).json({
      success: "success",
      message: "College added successfully",
      data: college,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addMultipleColleges = async (req, res) => {
  try {
    const colleges = req.body;

    if (!Array.isArray(colleges)) {
      return res.status(400).json({
        error: "Input should be an array of objects",
      });
    }

    const addedColleges = [];
    const existingColleges = [];

    for (const college of colleges) {
      const { enroll, pwd } = college;
      const existingCollege = await College.findOne({ enroll });

      if (existingCollege) {
        existingColleges.push(college);
      } else {
        const newCollege = new College({ enroll, pwd });
        await newCollege.save();
        addedColleges.push(newCollege);
      }
    }

    res.json({
      success: "success",
      message: "Operation completed",
      addedColleges,
      existingColleges,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const loginCollege = async (req, res) => {
  try {
    const { enroll, pwd } = req.body;
    const college = await College.findOne({ enroll });

    if (!college) {
      return res.status(404).json({ error: "College not found" });
    }

    if (college.pwd !== pwd) {
      return res.status(401).json({ error: "Invalid Password" });
    }

    res.json({ success: "success", message: "Logged in ", data: college });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllColleges = async (req, res) => {
  try {
    const colleges = await College.find();
    res.json({ data: colleges });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCollegeByEnroll = async (req, res) => {
  try {
    const college = await College.findOne({ enroll: req.params.enroll });

    if (!college) {
      return res.status(404).json({ error: "College not found" });
    }

    res.json({ success: "success", data: college });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateCollege = async (req, res) => {
  try {
    const college = await College.findOneAndUpdate(
      { enroll: req.params.enroll },
      { $set: req.body },
      { new: true }
    );

    if (!college) {
      return res
        .status(404)
        .json({  error: "College not found" });
    }

    res.json({
      result: "success",
      message: "College updated successfully",
      data: college,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteCollege = async (req, res) => {
  try {
    const college = await College.findOneAndDelete({
      enroll: req.params.enroll,
    });

    if (!college) {
      return res
        .status(404)
        .json({  error: "College not found" });
    }

    res.json({
      result: "success",
      message: "College deleted successfully",
      data: college,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  addCollege,
  addMultipleColleges,
  loginCollege,
  getAllColleges,
  getCollegeByEnroll,
  updateCollege,
  deleteCollege,
};
