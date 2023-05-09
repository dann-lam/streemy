const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class User_Streamer extends Model {}

User_Streamer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user_streamer",
  }
);

module.exports = User_Streamer;
