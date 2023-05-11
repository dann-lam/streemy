const User = require("./User");
const Streamer = require("./Streamer");
const Platform = require("./Platform");
const User_Streamer = require("./User_Streamer");

User.belongsToMany(Streamer, { through: User_Streamer, foreignKey: "user" });
Streamer.belongsToMany(User, {
  through: User_Streamer,
  foreignKey: "streamer",
});

Platform.hasMany(Streamer, {
  foreignKey: "platform_id",
});
Streamer.belongsTo(Platform, {
  foreignKey: "platform_id",
});

module.exports = { User, Streamer, Platform, User_Streamer };
