const sequelize = require("../config/connection");
const seedUser = require("./userData");
const seedPlatform = require("./platformData");
const seedStreamer = require("./streamerData");
const user_streamer = require("./user_streamerData");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedPlatform();

  await seedUser();

  await seedStreamer();

  await user_streamer();

  process.exit(0);
};

seedAll();
