"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
exports.__esModule = true;
// Importing packages
var mongoose_1 = __importDefault(require("mongoose"));
// Schema
var schema = new mongoose_1["default"].Schema({
  id: String,
  username: String,
  password: String,
  verified: Boolean,
  bot: Boolean,
  blocked: Boolean,
});
// Model
var user = mongoose_1["default"].model("user", schema);
// Export schema
exports["default"] = user;
