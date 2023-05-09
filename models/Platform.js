const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Platform extends Model {}

Platform.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "post",
        key: "id",
      },
    },
    comment_content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // date_created: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    //   defaultValue: DataTypes.NOW,
    // },
  },
  {
    sequelize,
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    freezeTableName: true,
    underscored: true,
    modelName: "platform",
  }
);

module.exports = Platform;
