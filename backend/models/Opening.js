const mongoose = require("mongoose");
const { Schema } = mongoose;

const OpeningSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  jobId: {
    type: String,
    required: true,
  },
  stipend: {
    type: String,
    default: "0",
  },
  ctc: {
    type: String,
    default: "0",
  },
  logo: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZLoNujaqRPu7XFemvBYsB68MD_XPTrK3xqqNYuol8qH9jNmrRu6fe22tKsjGyUI_OApI&usqp=CAU",
  },
  location: {
    type: Array,
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
  batch: {
    type: String,
    required: true,
  },
  branch: {
    type: Array,
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
  progress: {
    type: String,
    default: "Ongoing",
  },
  applyby: {
    type: Date,
    required: true,
  },
  requirements: {
    type: Array,
  },
  jobdescription: {
    type: Array,
  },
  selectionprocess: {
    type: Array,
  },
  ppt: {
    type: String,
    default: "To be announced",
  },
  test: {
    type: String,
    default: "To be announced",
  },
  interview: {
    type: String,
    default: "To be announced",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Opening = mongoose.model("opening", OpeningSchema);
module.exports = Opening;
