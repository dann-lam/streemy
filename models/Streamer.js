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
    // user_ID: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    //   references: {
    //     model: "user",
    //     key: "id",
    //   },
    // },
    streamer_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    //POssibly get rid of this,
    //Fetch whether the stream is online or not.

    // stream_online: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false,
    // },
    platform_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "platform",
        key: "id",
      },
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
