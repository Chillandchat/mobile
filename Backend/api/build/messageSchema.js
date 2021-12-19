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
  user: String,
  content: String,
  verified: Boolean,
});
// Model
var message = mongoose_1["default"].model("message", schema);
// Export schema
exports["default"] = message;
