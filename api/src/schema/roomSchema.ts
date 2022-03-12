import mongoose from "mongoose";

import { RoomSchemaType } from "../utils";

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
  iconColor: String,
});

const model: mongoose.Model<any> = mongoose.model<RoomSchemaType>(
  "room",
  schema
);

export default model;
