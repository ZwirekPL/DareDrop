const express = require("express");
const Streamer = require("../models/streamer");
const { getStreamers } = require("./messages.service");
const { validateAccessToken } = require("../middleware/auth0.middleware.js");

const messagesRouter = express.Router();
// CREATE
messagesRouter.route("/create", validateAccessToken).post((req, res) => {
  console.log(req.body);
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
    const idUpdateItem = req.params.idUpdateItem;
    const newUserName = req.body.userName;
    const newItem = req.body.item;
    const newCapacity = req.body.capacity;
    const newBulkQuantity = req.body.bulkQuantity;
    const newQuantityNow = req.body.quantityNow;
    const newUnit = req.body.unit;
    const newEditBy = req.body.editBy;
    const newCategory = req.body.category;

    const updateItem = await Streamer.findById(idUpdateItem).exec();
    updateItem.userName = newUserName;
    updateItem.item = newItem;
    updateItem.capacity = newCapacity;
    updateItem.bulkQuantity = newBulkQuantity;
    updateItem.quantityNow = newQuantityNow;
    updateItem.unit = newUnit;
    updateItem.editBy = newEditBy;
    updateItem.category = newCategory;
    const updatedItem = await updateItem.save();
    res.status(200);
  });
// STREAMER
messagesRouter.get("/protected/:userName", validateAccessToken, (req, res) => {
  const userName = req.params.userName;
  const message = getStreamers().then((data) => {
    res.status(200).json(data);
  });
});

//STREAMERID??

messagesRouter
  .route("/inventory/get/:userName", validateAccessToken)
  .get((req, res) => {
    const userName = req.params.userName;
    const message = getInventoryHistory(userName).then((data) => {
      res.status(200).json(data);
    });
  });

module.exports = { messagesRouter };
