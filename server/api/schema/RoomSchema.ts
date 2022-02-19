import { RoomSchemaType } from "../index.d";
import mongoose from "mongoose";

/**
 * This is the database schema for the message room object in mongoDB database.
 *
 * @see {RoomSchemaType}
 */

const schema: any = new mongoose.Schema({
  id: String,
  users: Array,
  name: String,
  passcode: String,
});

const model: mongoose.Model<any> = mongoose.model<RoomSchemaType>(
  "room",
  schema
);

export default model;
