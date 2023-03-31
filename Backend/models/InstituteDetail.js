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
      allowNull: false,
    },
    instituteName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = InstituteDetail;
