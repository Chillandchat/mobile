//Importing packages
const mongoose = require("mongoose");

//Schema
const schema = mongoose.Schema({
  id: String,
  user: String,
  content: String,
  verified: Boolean,
});

//Export schema
module.exports = mongoose.model("message", schema);
