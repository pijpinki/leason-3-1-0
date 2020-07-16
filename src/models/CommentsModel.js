const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
  text: { type: String, required: true },
  authorName: { type: String, default: "anonim" },
  date: { type: Date, defalt: Date.now }
});

module.exports = mongoose.model("Comment");
