// const User = require("./User");
const Sequelize = require("sequelize");
const { sequelize } = require("./DBConnection");
const InstituteDetail = sequelize.define(
  "InstituteDetail",
  {
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      // references: {
      //     model: User,
      //     key: "userId",
      // },
    },
    phone: {
      type: Sequelize.STRING(20),
    },
    instituteName: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    address: {
      type: Sequelize.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = InstituteDetail;
