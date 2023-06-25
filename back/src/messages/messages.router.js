const express = require("express");
const Streamer = require("../models/streamer");
const { getStreamers } = require("./messages.service");
const { validateAccessToken } = require("../middleware/auth0.middleware.js");

const messagesRouter = express.Router();
// CREATE
messagesRouter.route("/create", validateAccessToken).post((req, res) => {
  // console.log(req.body);
  const streamerName = req.body.streamerName;
  const platform = req.body.platform;
  const description = req.body.description;
  const newStreamer = new Streamer({
    streamerName,
    platform,
    description,
  });
  newStreamer.save();
  res.status(200);
});
// VOTE
messagesRouter
  .route("/update/:idUpdateItem", validateAccessToken)
  .post(async (req, res) => {
    console.log(req.body);
    const idUpdateItem = req.params.idUpdateItem;
    const newstreamerName = req.body.streamerName;
    const newplatform = req.body.platform;
    const newdescription = req.body.description;
    const updateItem = await Streamer.findById(idUpdateItem).exec();
    updateItem.streamerName = newstreamerName;
    updateItem.platform = newplatform;
    updateItem.description = newdescription;
    const updatedItem = await updateItem.save();
    res.status(200);
  });
// STREAMER LIST
messagesRouter.get("/protected/:userName", validateAccessToken, (req, res) => {
  const userName = req.params.userName;
  const message = getStreamers().then((data) => {
    res.status(200).json(data);
  });
});

//STREAMER??

messagesRouter
  .route("/inventory/get/:userName", validateAccessToken)
  .get((req, res) => {
    const userName = req.params.userName;
    const message = getInventoryHistory(userName).then((data) => {
      res.status(200).json(data);
    });
  });

module.exports = { messagesRouter };
