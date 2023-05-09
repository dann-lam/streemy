const User = require("./User");
const Streamer = require("./Streamer");
const Platform = require("./Platform");

User.belongsToMany(Streamer, { through: "User_Streamer" });
Streamer.belongsToMany(User, { through: "User_Streamer" });

Streamer.belongsTo(Platform, {
  foreignKey: "platform_id",
});
Platform.hasMany(Streamer, {
  foreignKey: "platform_id",
});

module.exports = { User, Streamer, Platform };
