const express = require("express");
const Streamer = require("../models/streamer");
const { getStreamers } = require("./messages.service");

const apiRouter = express.Router();
// CREATE
apiRouter.route("/streamers").post((req, res) => {
  const streamerName = req.body.streamerName;
  const platform = req.body.platform;
  const description = req.body.description;
  const voteCount = 0;
  const newStreamer = new Streamer({
    streamerName,
    platform,
    description,
    voteCount,
  });
  newStreamer.save();
  res.status(200);
});
// STREAMER LIST
apiRouter.get("/streamers", (req, res) => {
  const message = getStreamers().then((data) => {
    res.status(200).json(data);
  });
});
// VOTE
apiRouter.route("/streamers/:idUpdateItem/vote").put(async (req, res) => {
  // console.log(req.body);
  const idUpdateItem = req.params.idUpdateItem;
  const newVote = req.body.voteCount;
  const updateItem = await Streamer.findById(idUpdateItem).exec();
  updateItem.voteCount = updateItem.voteCount + newVote;
  const updatedItem = await updateItem.save();
  res.status(200);
});
//STREAMER??
apiRouter.route("/inventory/get/:userName").get((req, res) => {
  const userName = req.params.userName;
  const message = getInventoryHistory(userName).then((data) => {
    res.status(200).json(data);
  });
});

module.exports = { apiRouter };
