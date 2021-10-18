//Importing packages
import mongoose from "mongoose";

//Schema
const schema = mongoose.Schema({
  id: String,
  username: String,
  password: String,
});

//Export schema
export default mongoose.model("user", schema);
