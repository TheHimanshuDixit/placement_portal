const express = require("express");
const connectDB = require("./database");
const cors = require("cors");
const { scheduleJob } = require("./utils/scheduler");
const { eventSchedulerJob } = require("./utils/eventScheduler");

// Configure CORS options
const corsOptions = {
  origin: "*",
  credentials: true, // Access-Control-Allow-Credentials: true
  optionSuccessStatus: 200,
};

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/opening", require("./routes/openingRoutes"));
app.use("/api/college", require("./routes/collegeRoutes"));
app.use("/api/contribute", require("./routes/contributeRoutes"));
app.use("/api/application", require("./routes/applicationRoutes"));
app.use("/api/team", require("./routes/teamRoutes"));
app.use("/api/student", require("./routes/studentRoutes"));
app.use("/api/demographicData", require("./routes/statsRoutes"));
app.use("/api/openai", require("./routes/openaiRoutes"));

// Connect to Database
connectDB();

// Start Schedulers
scheduleJob();
eventSchedulerJob();

// Root Route
app.get("/", (req, res) => {
  res.send("API Working");
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
