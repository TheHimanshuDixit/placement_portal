const mongoose = require("mongoose");
const { Schema } = mongoose;

const OpeningSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  stipend: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  backlog: {
    type: String,
    required: true,
  },
  cgpacritera: {
    type: String,
    required: true,
  },
  branch: {
    type: Object,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  applyby: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

const Opening = mongoose.model("opening", OpeningSchema);
module.exports = Opening;
