import mongoose from "mongoose";
import { AuthSchemaType } from "./type";

/**
 * This is the user schema for the database, please see './type.d.ts' for more information.
 * @type {AuthSchemaType}
 */

const schema: any = new mongoose.Schema({
  id: String,
  username: String,
  password: String,
  verified: Boolean,
  bot: Boolean,
  blocked: Boolean,
});

const user: any = mongoose.model<AuthSchemaType>("user", schema);

export default user;
