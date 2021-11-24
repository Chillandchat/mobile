//Importing packages
const mongoose = require("mongoose");

//Schema
const schema = mongoose.Schema({
  id: String,
  username: String,
  password: String,
  verified: Boolean,
  bot: Boolean, 
  blocked: Boolean,
});

//Export schema
module.exports = mongoose.model("user", schema);
