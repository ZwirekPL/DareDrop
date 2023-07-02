const Streamer = require("../models/streamer");

const getStreamers = () => {
  const dataFind = Streamer.find({}).exec();
  return dataFind;
};

const getUserStreamers = (userName) => {
  const dataFind = Streamer.find({
    userName: `${userName}`,
  }).exec();
  return dataFind;
};

module.exports = {
  getStreamers,
};
