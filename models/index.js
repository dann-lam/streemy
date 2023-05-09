const User = require("./User");
const Streamer = require("./Streamer");
const Platform = require("./Platform");

User.belongsToMany(Streamer, { through: "User_Streamer" });

Streamer.belongsTo(User);
// User.hasMany(Streamer, {
//   foreignKey: "user_id",
//   onDelete: "CASCADE",
// });

// User.hasMany(CPlatform, {
//   foreignKey: "user_id",
//   onDelete: "CASCADE",
// });

// Streamer.belongsTo(User, {
//   foreignKey: "user_id",
// });

// Streamer.hasMany(Platform, {
//   foreignKey: "post_id",
//   onDelete: "CASCADE",
// });

// Platform.belongsTo(User, {
//   foreignKey: "user_id",
// });

// Platform.belongsTo(Streamer, {
//   foreignKey: "post_id",
// });

module.exports = { User, Streamer, Platform };
