const express = require("express");
const run = require("./database");
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const app = express();
const port = process.env.PORT || 4000;

app.use(cors(corsOptions)) // Use this after the variable declaration
app.use(express.json());

app.use("/api/auth", require("./api/auth"));
app.use("/api/contact", require("./api/contact"));
app.use("/api/opening", require("./api/opening"));
app.use("/api/college", require("./api/college"));
app.use("/api/contribute", require("./api/contribute"));
app.use("/api/application", require("./api/application"));
app.use("/api/team", require("./api/team"));

run();

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
