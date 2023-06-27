const express = require("express");
const Streamer = require("../models/streamer");
const { getStreamers } = require("./messages.service");

const messagesRouter = express.Router();
// CREATE
messagesRouter.route("/create").post((req, res) => {
  // console.log(req.body);
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
// VOTE
messagesRouter.route("/update/:idUpdateItem").put(async (req, res) => {
  // console.log(req.body);
  const idUpdateItem = req.params.idUpdateItem;
  const newVote = req.body.voteCount;
  const updateItem = await Streamer.findById(idUpdateItem).exec();
  updateItem.voteCount = updateItem.voteCount + newVote;
  const updatedItem = await updateItem.save();
  res.status(200);
});
// STREAMER LIST
messagesRouter.get("/protected", (req, res) => {
  const message = getStreamers().then((data) => {
    res.status(200).json(data);
  });
});

//STREAMER??

messagesRouter.route("/inventory/get/:userName").get((req, res) => {
  const userName = req.params.userName;
  const message = getInventoryHistory(userName).then((data) => {
    res.status(200).json(data);
  });
});

module.exports = { messagesRouter };
