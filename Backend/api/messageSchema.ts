import mongoose from "mongoose";
import { MessageSchemaType } from "./type";

/**
 * This is the message schema for the database, please see './type.d.ts' for more information.
 * @type {MessageSchemaType}
 */

const schema: any = new mongoose.Schema({
  id: String,
  user: String,
  content: String,
  verified: Boolean,
});

const message: any = mongoose.model<MessageSchemaType>("message", schema);

export default message;
