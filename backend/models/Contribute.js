const mongoose = require("mongoose");
const { Schema } = mongoose;

const ContributeSchema = new Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
  },
  name: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  round: {
    type: String,
    required: true,
  },
  topic: {
    type: Array,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Contribute = mongoose.model("contribute", ContributeSchema);
module.exports = Contribute;
