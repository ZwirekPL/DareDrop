const mongoose = require("mongoose");

const streamerSchema = new mongoose.Schema({
  streamerName: { type: String, require: true },
  platform: { type: String, require: true },
  description: { type: String, require: true },
  voteCount: { type: Number },
});
const Streamer = mongoose.model("Streamer", streamerSchema);
module.exports = Streamer;
