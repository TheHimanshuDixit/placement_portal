const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const router = express.Router();
const findUser = require("../middleware");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Student = require("../models/student");
const token = "hello";

// GET /api/auth
router.get("/", async(req, res) => {
  const allusers = await Student.find();
  res.json(allusers);
});

// POST /api/auth/login
router.post("/login", findUser, async (req, res) => {
  // Implement your login logic here
  let { email, password } = req.body;
  let user = await Student.findOne({ email });
  console.log(user);
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
router.put("/update/:id", findUser, async (req, res) => {
  let id = req.params.id;
  let { name, email, enrollnment, password, phoneno } = req.body;
  let user = await Student.findById(id);
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }
  var salt = await bcrypt.genSalt(10);
  var hashpwd = await bcrypt.hash(password, salt);
  let newUser = {
    name,
    email,
    enrollnment,
    password: hashpwd,
    phoneno,
  };
  user = await Student.findByIdAndUpdate(id, newUser, { new: true });
  res.json({ message: "User updated", user });
});


// DELETE /api/auth/delete/:id
router.delete("/delete/:id", findUser, async(req, res) => {
  let id = req.params.id;
  let user = await Student.findById(id);
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }
  user = await Student.findByIdAndDelete(id);
  res.json({ message: "User deleted", user });
});

module.exports = router;
