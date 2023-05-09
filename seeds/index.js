const sequelize = require('../config/connection');
const seedUser = require('./userData');
const seedStreamer = require('./streamerData');
const seedPlatform = require('./platformData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedStreamer();

  await seedPlatform();

  process.exit(0);
};

seedAll();
