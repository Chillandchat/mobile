// NOTE: Imported from compiled typescript, please DO NOT edit directly! 
// See: ../api/schema/messageSchema.ts for typescripipt source.

"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
exports.__esModule = true;
var mongoose_1 = __importDefault(require("mongoose"));

/**
 * This is the database schema for the message object in mongoDB database.
 *
 * @param {string} id The id of the message.
 * @param {string} message The user that sent the message.
 * @param {string} content The content of the message.
 * @param {string} room The room that the message belongs to.
 */

var schema = new mongoose_1["default"].Schema({
  id: String,
  user: String,
  content: String,
  room: String,
});
var message = mongoose_1["default"].model("message", schema);
exports = message;


