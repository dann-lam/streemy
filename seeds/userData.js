const { User } = require('../models');

const userData = [
    {
      username: 'user1',
      email: 'user1@example.com',
      password: 'password123',
      twitch_ID: null,
    },
    {
      username: 'user2',
      email: 'user2@example.com',
      password: 'password123',
      twitch_ID: null,
    },
    {
      username: 'user3',
      email: 'user3@example.com',
      password: 'password123',
      twitch_ID: null,
    },
    {
      username: 'user4',
      email: 'user4@example.com',
      password: 'password123',
      twitch_ID: null,
    },
    {
      username: 'user5',
      email: 'user5@example.com',
      password: 'password123',
      twitch_ID: null,
    },
    {
      username: 'user6',
      email: 'user6@example.com',
      password: 'password123',
      twitch_ID: null,
    },
    {
      username: 'user7',
      email: 'user7@example.com',
      password: 'password123',
      twitch_ID: null,
    },
    {
      username: 'user8',
      email: 'user8@example.com',
      password: 'password123',
      twitch_ID: null,
    },
    {
      username: 'user9',
      email: 'user9@example.com',
      password: 'password123',
      twitch_ID: null,
    },
  ];




const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;