const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  username: String,
  message: String,
  sentAt: { type: Date, default: Date.now() }
});

const model = mongoose.model("message", messageSchema);

module.exports = model;
