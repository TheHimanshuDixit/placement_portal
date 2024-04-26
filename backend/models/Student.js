const mongoose = require("mongoose");
const { Schema } = mongoose;

const StudentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  enrollnment: {
    type: String,
    required: true,
    unique: true,
  },
  password: { 
    type: String, 
    required: true 
  },
  phoneno: {
    type: String,
    required: true,
    unique: true,
  },
  resume: {
    type: String,
  },
  branch: {
    type: String,
  },
  gender: {
    type: String,
  },
  year: {
    type: String,
  },
  cgpa: {
    type: String,
  },
  backlogs: {
    type: String,
  },
  college: {
    type: String,
    default: "Jaypee Institute of Information Technology",
  },
  coverletter: {
    type: String,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

const Student = mongoose.model("student", StudentSchema);
module.exports = Student;
