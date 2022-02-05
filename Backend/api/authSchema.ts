import mongoose from "mongoose";
import { AuthSchemaType } from "./index.d";

/**
 * This is the user schema for the database, please see './type.d.ts' for more information.
 * @see {AuthSchemaType}
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
