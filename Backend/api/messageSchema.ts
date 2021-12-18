//Importing packages
import mongoose from "mongoose";
import { MessageSchemaType } from "./type";

//Schema
const schema: any = new mongoose.Schema({
  id: String,
  user: String,
  content: String,
  verified: Boolean,
});

//Model
const message: any = mongoose.model<MessageSchemaType>("message", schema);

//Export schema
export default message;
