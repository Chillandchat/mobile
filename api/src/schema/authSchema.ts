import mongoose from "mongoose";

import { AuthSchemaType } from "../utils";

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
  iconColor: String
});

const user: mongoose.Model<any> = mongoose.model<AuthSchemaType>(
  "user",
  schema
);

export default user;
