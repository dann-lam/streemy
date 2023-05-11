const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class User_Streamer extends Model {}

User_Streamer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
      // field: "user",
    },
    streamer: {
      type: DataTypes.INTEGER,
      references: {
        model: "streamer",
        key: "id",
      },
      // field: "streamer",
    },
    favorited: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
