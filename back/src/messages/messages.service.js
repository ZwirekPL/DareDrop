const Item = require("../models/item");

const getUserItems = (userName) => {
  const dataFind = Item.find({
    userName: `${userName}`,
  }).exec();
  return dataFind;
};

module.exports = {
  getUserItems,
};
