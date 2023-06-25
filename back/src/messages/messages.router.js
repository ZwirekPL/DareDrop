const express = require("express");
const Item = require("../models/item");
const { getStreamers } = require("./messages.service");
const { validateAccessToken } = require("../middleware/auth0.middleware.js");

const messagesRouter = express.Router();
// CREATE
messagesRouter.route("/create", validateAccessToken).post((req, res) => {
  const userName = req.body.userName;
  const item = req.body.item;
  const capacity = req.body.capacity;
  const bulkQuantity = req.body.bulkQuantity;
  const quantityNow = req.body.quantityNow;
  const unit = req.body.unit;
  const editBy = req.body.editBy;
  const category = req.body.category;
  const newItem = new Item({
    userName,
    item,
    capacity,
    bulkQuantity,
    quantityNow,
    unit,
    editBy,
    category,
  });
  newItem.save();
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

    const updateItem = await Item.findById(idUpdateItem).exec();
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
  const message = getStreamers(userName).then((data) => {
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
