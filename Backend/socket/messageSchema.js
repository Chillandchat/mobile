const mongoose = require("mongoose");

/**
 * This is the database schema for the message object in mongoDB database.
 *
 * @param {string} id The id of the message.
 * @param {string} message The user that sent the message.
 * @param {string} content The content of the message.
 * @param {boolean} verified Whether the sender of the message is verified.
 */

const schema = mongoose.Schema({
  id: String,
  user: String,
  content: String,
  verified: Boolean,
});

module.exports = mongoose.model("message", schema);
