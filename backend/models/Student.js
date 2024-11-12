const mongoose = require("mongoose");
const { Schema } = mongoose;

const StudentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
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
    required: true,
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
    default: "2025",
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
  placed: {
    type: Boolean,
    default: false,
  },
  companys: {
    type: Array,
    default: [],
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

const Student = mongoose.model("student", StudentSchema);
module.exports = Student;
