const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// creating Schema
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String },
  password: { type: String, required: true },
  messages: [
    {
      senderId: { type: Schema.Types.ObjectId, ref: "user" },
      message: { type: String },
      sender: { type: String },
      opened: { type: Boolean, default: false },
      date: { type: Date, default: Date.now },
    },
  ],
  likedgames: [{ type: Schema.Types.ObjectId, ref: "user" }],
  date: { type: Date, default: Date.now },
});

// creating Model
module.exports = mongoose.model("user", userSchema);
