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
 * @param {string} room The room that sent the message.
 */

export interface MessageSchemaType extends mongoose.Document {
  id: string;
  user: string;
  content: string;
  room: string;
}

/**
 * This is the database schema for the message room object in mongoDB database.
 * 
 * @param {string} id The id of the message room.
 * @param {string} name The name of the message room.
 * @param {string} users The users in the message room.
 */

export interface RoomSchemaType extends mongoose.Document {
  id: string;
  name: string;
  users: Array<string>;
}
