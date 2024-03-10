const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
const router = express.Router();
const findUser = require("../middleware");

let auths = [];

// GET /api/auth
router.get("/", (req, res) => {
  res.json({ auths });
});

// POST /api/auth/login
router.post("/login", findUser, async (req, res) => {
  // Implement your login logic here
  let { email, password } = req.body;
  let user =  auths.find((user) => user.email === email);
  if (!user) {
    return res.status(401).json({ message: "Invalid email" });
  }
  if (user.password !== password) {
    return res.status(401).json({ message: "Invalid password" });
  }
  res.json({ message: "success" });
});

router.post("/signup", (req, res) => {
  let { email, password } = req.body;
  let user = auths.find((user) => user.email === email);
  if (!user) {
    auths.push({ email, password });
    return res.json({ message: "success" });
  }
  else
  {
    return res.status(401).json({ message: "User already Exist" });
  }
});

router.put("/update", findUser, (req, res) => {
  let { email, password } = req.body;
  let user = auths.find((user) => user.email === email);
  if (!user) {
    return res.status(401).json({ message: "Invalid email" });
  }
  user.password = password;
  res.json({ message: "success" });
});

router.delete("/delete", findUser, (req, res) => {
  let { email } = req.body;
  let user = auths.find((user) => user.email === email);
  if (!user) {
    return res.status(401).json({ message: "Invalid email" });
  }
  auths = auths.filter((user) => user.email !== email);
  res.json({ message: "success" });
}
);

module.exports = router;
