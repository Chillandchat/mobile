import mongoose from "mongoose";
import { MessageSchemaType } from "./index.d";

/**
 * This is the message schema for the database, please see './type.d.ts' for more information.
 * @see {MessageSchemaType}
 */

const schema: any = new mongoose.Schema({
  id: String,
  user: String,
  content: String,
  room: String,
});

const message: any = mongoose.model<MessageSchemaType>("message", schema);

export default message;
