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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    streamer_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    platform_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "platform",
        key: "id",
      },
    },
    is_online: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "streamer",
  }
);

module.exports = Streamer;
