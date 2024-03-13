// const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://himanshuharsh:jiit0207@cluster0.m8ubevh.mongodb.net/portal?retryWrites=true&w=majority&appName=Cluster0";

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
