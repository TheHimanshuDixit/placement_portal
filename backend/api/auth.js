const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express();
app.use(bodyParser.json());
const router = express.Router();
const fetchuser = require("../middleware");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Student = require("../models/Student");
const College = require("../models/College");
const token = "hello";

const multer = require("multer");
const cloudinary = require("../helper/cloudinaryconfig");

// pdf storage path
const pdfconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads/pdf");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: pdfconfig });

// http://localhost:4000

// GET /api/auth
router.get("/", async (req, res) => {
  const allusers = await Student.find();
  res.json(allusers);
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  // Implement your login logic here
  let { email, password } = req.body;
  let user = await Student.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email" });
  }
  const pwd = await bcrypt.compare(password, user.password);
  if (!pwd) {
    return res.status(401).json({ message: "Invalid password" });
  }
  let authToken = jwt.sign({ id: user._id }, token, { expiresIn: "1d" });
  res.json({ message: "success", authToken: authToken });
});

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
  let { name, email, enrollnment, password, phoneno } = req.body;
  let stud = await College.findOne({
    enroll: enrollnment,
  });
  if (!stud) {
    return res.status(401).json({ message: "College not found" });
  }
  if (stud.pwd !== req.body.password) {
    return res.status(401).json({ message: "Invalid password" });
  }
  let user = await Student.findOne({ email });
  if (user) {
    return res.status(401).json({ message: "User already exists" });
  }
  var salt = await bcrypt.genSalt(10);
  var hashpwd = await bcrypt.hash(password, salt);

  let newUser = new Student({
    name,
    email,
    enrollnment,
    password: hashpwd,
    phoneno,
  });
  let x = await newUser.save();
  let authToken = jwt.sign({ id: x._id }, token, { expiresIn: "1d" });
  res.json({ message: "success", authToken: authToken });
});

// PUT /api/auth/update/:id
router.put("/updatepassword", async (req, res) => {
  let { email, newPassword } = req.body;
  let user = await Student.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }
  var salt = await bcrypt.genSalt(10);
  var hashpwd = await bcrypt.hash(newPassword, salt);
  user = await Student.findByIdAndUpdate(
    user._id,
    { password: hashpwd },
    { new: true }
  );
  res.json({ message: "success" });
});

// POST /api/auth/forgot
router.post("/forgot", async (req, res) => {
  let { email } = req.body;
  let user = await Student.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  const output = `
                    <h3>OTP : </h3>
                    <p>${otp}</p>
`;
  // Instantiate the SMTP server
  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com"',
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
      user: "harshhimanshudixit@gmail.com",
      pass: "cwujzimqjehhjyac",
    },
  });

  // Specify what the email will look like
  var mailOption = {
    from: "harshhimanshudixit@gmail.com", //Sender mail
    to: email, // Recever mail
    subject: "One Time Password",
    html: output,
  };

  // Send mail with defined transport object
  transporter.sendMail(mailOption, function (error, info) {
    if (error) {
      res.json({ message: "Error Occurs" });
    } else {
      res.json({ message: "Email sent", otp: otp });
    }
  });
});

// DELETE /api/auth/delete/:id
router.delete("/delete/:id", async (req, res) => {
  let id = req.params.id;
  let user = await Student.findById(id);
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }
  user = await Student.findByIdAndDelete(id);
  res.json({ message: "User deleted", user });
});

// GET /api/auth/profile
router.get("/profile", fetchuser, async (req, res) => {
  let user = await Student.findById(req.id).select("-password");
  res.json(user);
});

// POST /api/auth/profile
router.post("/profile", upload.single("resume"), async (req, res) => {
  fetchuser(req, res, async () => {
    let user = await Student.findById(req.id);
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }
    const newStudent = {
      ...req.body,
    };
    if (req.file !== undefined) {
      const upload = await cloudinary.uploader.upload(req.file.path);
      const url = upload.secure_url.replace(".pdf", ".jpg");
      newStudent.resume = url;
    }
    user = await Student.findByIdAndUpdate(
      req.id,
      { $set: newStudent },
      { new: true }
    );
    res.json({ message: "success" });
  });
});

module.exports = router;
