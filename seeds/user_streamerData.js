const { User_Streamer } = require("../models");

const user_streamerData = [
  {
    user_id: 1,
    streamer_id: 1,
  },
  {
    user_id: 1,
    streamer_id: 3,
  },
  {
    user_id: 1,
    streamer_id: 5,
  },
  {
    user_id: 1,
    streamer_id: 7,
  },
  {
    user_id: 1,
    streamer_id: 9,
  },
  {
    user_id: 2,
    streamer_id: 1,
  },
  {
    user_id: 2,
    streamer_id: 2,
  },
  {
    user_id: 2,
    streamer_id: 4,
  },
  {
    user_id: 2,
    streamer_id: 8,
  },
  {
    user_id: 3,
    streamer_id: 2,
  },
  {
    user_id: 3,
    streamer_id: 3,
  },
  {
    user_id: 3,
    streamer_id: 4,
  },
  {
    user_id: 3,
    streamer_id: 6,
  },
  {
    user_id: 4,
    streamer_id: 3,
  },
  {
    user_id: 4,
    streamer_id: 4,
  },
  {
    user_id: 4,
    streamer_id: 6,
  },
  {
    user_id: 4,
    streamer_id: 8,
  },
  {
    user_id: 5,
    streamer_id: 1,
  },
  {
    user_id: 5,
    streamer_id: 2,
  },
  {
    user_id: 5,
    streamer_id: 4,
  },
  {
    user_id: 5,
    streamer_id: 9,
  },
  {
    user_id: 6,
    streamer_id: 4,
  },
  {
    user_id: 6,
    streamer_id: 6,
  },
  {
    user_id: 6,
    streamer_id: 8,
  },
];

const user_streamer = () => User_Streamer.bulkCreate(user_streamerData);

module.exports = user_streamer;
