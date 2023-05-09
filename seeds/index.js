const sequelize = require("../config/connection");
const seedUser = require("./userData");
const seedStreamer = require("./streamerData");
const seedPlatform = require("./platformData");
const seedUser_Streamer = require("./user_streamerData");

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedStreamer();

  await seedPlatform();

  await seedUser_Streamer();

  process.exit(0);
};

seedAll();
