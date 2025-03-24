const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const College = require("../models/College");
const cloudinary = require("../helper/cloudinaryConfig");
const sendMailTo = require("../utils/mailer");

const tokenSecret = process.env.TOKEN_SECRET;

const getAllUsers = async (req, res) => {
  try {
    const users = await Student.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Student.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const authToken = jwt.sign({ id: user._id }, tokenSecret, {
      expiresIn: "1d",
    });
    res.json({ success: "success", message: "User login successfully", authToken });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const signUpUser = async (req, res) => {
  try {
    const { name, email, enrollnment, password, phoneno } = req.body;

    const college = await College.findOne({ enroll: enrollnment });
    if (!college || college.pwd !== password) {
      return res.status(401).json({ error: "Invalid college credentials" });
    }

    if (await Student.findOne({ email })) {
      return res.status(401).json({ error: "User already exists" });
    }

    const hashpwd = await bcrypt.hash(password, 10);
    const newUser = new Student({
      name,
      email,
      enrollnment,
      password: hashpwd,
      phoneno,
    });
    await newUser.save();

    const authToken = jwt.sign({ id: newUser._id }, tokenSecret, {
      expiresIn: "1d",
    });
    res.json({ success: "success", message: "User created account successfully", authToken });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await Student.findOne({ email });

    if (!user) return res.status(401).json({ error: "User not found" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ success: "success", message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Student.findOne({ email });

    if (!user) return res.status(401).json({ error: "Invalid email" });

    const otp = Math.floor(100000 + Math.random() * 900000);
    const mailResponse = await sendMailTo(
      email,
      "One Time Password",
      `<h3>OTP : </h3><p>${otp}</p>`
    );

    if (mailResponse.success) {
      res.json({ success: "success", message: "Email sent", otp });
    } else {
      res.status(500).json({ error: "Failed to send email" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await Student.findByIdAndDelete(req.params.id);

    if (!user) return res.status(401).json({ error: "User not found" });

    res.json({ success: "success", message: "User deleted successfully", user });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await Student.findById(req.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    let user = await Student.findById(req.id);
    if (!user) return res.status(401).json({ error: "Invalid email" });

    let newStudent = { ...req.body };

    if (req.files?.resume?.[0]?.mimetype === "application/pdf") {
      const resumeUpload = await cloudinary.uploader.upload(
        req.files.resume[0].path,
        { format: "jpg" }
      );
      newStudent.resume = resumeUpload.secure_url;
    }

    if (
      req.files?.image?.[0] &&
      ["image/jpeg", "image/png"].includes(req.files.image[0].mimetype)
    ) {
      const profileImageUpload = await cloudinary.uploader.upload(
        req.files.image[0].path
      );
      newStudent.image = profileImageUpload.secure_url;
    }

    user = await Student.findByIdAndUpdate(
      req.id,
      { $set: newStudent },
      { new: true }
    );
    res.json({ success: "success", message: "User profile updated", data: user });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const markStudentsPlaced = async (req, res) => {
  try {
    const { company, students } = req.body;

    for (const email of students) {
      await Student.findOneAndUpdate(
        { email },
        { $push: { companys: company }, placed: true },
        { new: true }
      );
    }

    res.json({ success: "success", message: "Attendance marked successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllUsers,
  loginUser,
  signUpUser,
  updatePassword,
  forgotPassword,
  deleteUser,
  getUserProfile,
  updateUserProfile,
  markStudentsPlaced,
};
