var jwt = require("jsonwebtoken");
const token = "hello";

const fetchuser = async(req, res, next) => {
  // Get the user from the jwt token and add id to req object
  const t = req.header("auth-token");
  if (!token) {
    res.status(401).send({ Error: "Please authenticate using a valid token" });
  }
  try {
    const data = await jwt.verify(t, token);
    req.id = data.id;
    next();
  } catch (error) {
    res.status(401).send({ Error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchuser; // exporting the middleware