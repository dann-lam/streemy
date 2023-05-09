const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class Streamer extends Model {}

Streamer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    streamer_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    platform_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    online: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    freezeTableName: true,
    underscored: true,
    modelName: "streamer",
  }
);

module.exports = Streamer;
