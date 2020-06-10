const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "user" },
  name: { type: String, required: true },
  platform: { type: String, required: true },
  cover: { type: String },
  fees: { type: String },
  available: { type: Boolean, default: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("game", gameSchema);
