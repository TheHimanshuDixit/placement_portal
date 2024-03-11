const mongoose = require("mongoose");
const { Schema } = mongoose;

const CollegeSchema = new Schema({
  enroll: {
    type: String,
    required: true,
    unique: true,
  },
  pwd: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

const College = mongoose.model("opening", CollegeSchema);
module.exports = College;
