const { Streamer } = require("../models");

const streamerData = [
  {
    name: "streamer1",
    streamer_url: "http://google.com",
    platform_id: 1,
    is_online: false,
  },
  {
    name: "streamer2",
    streamer_url: "http://google.com",
    platform_id: 2,
    is_online: true,
  },
  {
    name: "streamer3",
    streamer_url: "http://google.com",
    platform_id: 3,
    is_online: true,
  },
  {
    name: "streamer4",
    streamer_url: "http://google.com",
    platform_id: 4,
    is_online: true,
  },
  {
    name: "streamer5",
    streamer_url: "http://google.com",
    platform_id: 5,
    is_online: false,
  },
  {
    name: "streamer6",
    streamer_url: "http://google.com",
    platform_id: 1,
    is_online: false,
  },
  {
    name: "streamer7",
    streamer_url: "http://google.com",
    platform_id: 2,
    is_online: true,
  },
  {
    name: "streamer8",
    streamer_url: "http://google.com",
    platform_id: 3,
    is_online: true,
  },
  {
    name: "streamer9",
    streamer_url: "http://google.com",
    platform_id: 4,
    is_online: true,
  },
];

const seedStreamer = () => Streamer.bulkCreate(streamerData);

module.exports = seedStreamer;
