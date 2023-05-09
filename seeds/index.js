const sequelize = require("../config/connection");
const seedUser = require("./userData");
const seedPlatform = require("./platformData");
const seedStreamer = require("./streamerData");
const seedUser_Streamer = require("./user_streamerData");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedPlatform();

  await seedUser();

  await seedStreamer();

  await seedUser_Streamer();

  process.exit(0);
};

seedAll();
