const { User } = require("../models");

const userData = [
  {
    email: "user1@example.com",
    password: "password123",
    twitch_ID: null,
  },
  {
    email: "user2@example.com",
    password: "password123",
    twitch_ID: null,
  },
  {
    email: "user3@example.com",
    password: "password123",
    twitch_ID: null,
  },
  {
    email: "user4@example.com",
    password: "password123",
    twitch_ID: null,
  },
  {
    email: "user5@example.com",
    password: "password123",
    twitch_ID: null,
  },
  {
    email: "user6@example.com",
    password: "password123",
    twitch_ID: null,
  },
];

const seedUser = () => User.bulkCreate(userData, { individualHooks: true });

module.exports = seedUser;
