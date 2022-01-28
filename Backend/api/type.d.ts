import mongoose from "mongoose";

/**
 * This is the database schema for the message object in mongoDB database.
 *
 * @param {string} id The id of the message.
 * @param {string} message The user that sent the message.
 * @param {string} content The content of the message.
 * @param {boolean} verified Whether the sender of the message is verified.
 */

export interface AuthSchemaType extends mongoose.Document {
  id: string;
  username: string;
  password: string;
  verified: boolean;
  bot: boolean;
  blocked: boolean;
}

/**
 * This is the database schema for the message object in mongoDB database.
 *
 * @param {string} id The id of the message.
 * @param {string} message The user that sent the message.
 * @param {string} content The content of the message.
 * @param {boolean} verified Whether the sender of the message is verified.
 */

export interface MessageSchemaType extends mongoose.Document {
  id: string;
  user: string;
  content: string;
  room: string;
}
