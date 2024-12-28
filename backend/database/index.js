// const { MongoClient } = require("mongodb");
require("dotenv").config();
const uri = process.env.MONGO_URI;

// const client = new MongoClient(uri);

// async function run() {
//   await client.connect();
//   console.log("Connected to the database");
// }

const mongoose = require("mongoose");

async function run() {
  await mongoose.connect(uri);
  console.log("Connected to the database");
}

module.exports = run;
