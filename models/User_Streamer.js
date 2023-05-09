const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

const User = require("./User");
const Streamer = require("./Streamer");

class User_Streamer extends Model {}

User_Streamer.init({
  id: {
    type: DataTypes.INTEGER,
    alloNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  user: {
    type: DataTypes.INTEGER,
    references: {
      model: "user",
      key: "id",
    },
  },
  streamer: {
    type: DataTypes.INTEGER,
    references: {
      model: "streamer",
      key: "id",
    },
  },
});
