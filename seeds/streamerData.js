const { Streamer } = require("../models");

const streamerData = [
  {
    name: "Auronplay",
    streamer_url: "https://www.twitch.tv/auronplay",
    platform_id: 1,
    is_online: false,
  },
  {
    name: "Ibai",
    streamer_url: "https://www.twitch.tv/abai",
    platform_id: 2,
    is_online: true,
  },
  {
    name: "PewDiePie",
    streamer_url: "http://google.com",
    platform_id: 3,
    is_online: true,
  },
  {
    name: "Vegetta777",
    streamer_url: "https://www.youtube.com/@vegetta777/featured",
    platform_id: 4,
    is_online: true,
  },
  {
    name: "Buddha",
    streamer_url: "https://kick.com/buddha",
    platform_id: 5,
    is_online: false,
  },
  {
    name: "Ryda",
    streamer_url: "https://kick.com/ryda",
    platform_id: 1,
    is_online: false,
  },
  {
    name: "Tfue",
    streamer_url: "https://www.twitch.tv/tfue",
    platform_id: 2,
    is_online: true,
  },
  {
    name: "Rubius",
    streamer_url: "https://www.twitch.tv/rubius",
    platform_id: 3,
    is_online: true,
  },
  {
    name: "Pokimane",
    streamer_url: "https://www.twitch.tv/pokimane",
    platform_id: 4,
    is_online: true,
  },
];

const seedStreamer = () => Streamer.bulkCreate(streamerData);

module.exports = seedStreamer;
