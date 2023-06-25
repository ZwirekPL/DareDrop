const mongoose = require("mongoose");

const streamerSchema = new mongoose.Schema({
  streamerName: { type: String, require: true },
  platform: { type: String, lowercase: true },
  description: { type: String, require: true },
  upVotes: { type: Number },
  downVotes: { type: Number },
});
const Streamer = mongoose.model("Streamer", streamerSchema);
module.exports = Streamer;
