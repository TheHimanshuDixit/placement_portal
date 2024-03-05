const express = require("express");

const router = express.Router();

// POST /api/auth/login
router.post("/login", async(req, res) => {
  // Implement your login logic here
  let {email, password} = req.body;
  if (email === "himanshuharsh@gmail.com" && password === "1234") {
    res.json({ message: "success" });
  }
});

router.post("/signup", (req, res) => {
  // Implement your register logic here
    // let [email, password] = req.body;
    // if (email === "himanshu" && password === "1234") {
    //   res.json({ message: "success" });
    // }
    res.json({ message: "success" });
});



module.exports = router;
