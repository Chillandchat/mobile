//Importing packages
const mongoose = require("mongoose");

//Schema
const schema = mongoose.Schema({
  id: String,
  username: String,
  password: String,
  blocked: Boolean,
  onDeleteList: Boolean,
});

//Export schema
module.exports = mongoose.model("user", schema);
