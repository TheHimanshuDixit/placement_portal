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
    default: Date.now,
  },
});

const College = mongoose.model("college", CollegeSchema);
module.exports = College;
