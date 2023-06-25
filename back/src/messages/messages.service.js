const Item = require("../models/item");

const getStreamers = (userName) => {
  const dataFind = Item.find({
    userName: `${userName}`,
  }).exec();
  return dataFind;
};

const getUserItems = (userName) => {
  const dataFind = Item.find({
    userName: `${userName}`,
  }).exec();
  return dataFind;
};

module.exports = {
  getStreamers,
};
