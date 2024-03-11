const mongoose = require("mongoose");
const { Schema } = mongoose;

const ContributeSchema = new Schema({
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
    type: Object,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
  },
});

const Contribute = mongoose.model("contact", ContributeSchema);
module.exports = Contribute;
