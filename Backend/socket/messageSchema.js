const mongoose = require("mongoose");

/**
 * This is the database schema for the message object in mongoDB database.
 *
 * @param {string} id The id of the message.
 * @param {string} message The user that sent the message.
 * @param {string} content The content of the message.
 * @param {string} room The room that the message belongs to.
 */

const schema = mongoose.Schema({
  id: String,
  user: String,
  content: String,
  room: String,
});

module.exports = mongoose.model("message", schema);
