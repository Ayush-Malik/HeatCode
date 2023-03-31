const Sequelize = require("sequelize");
const { sequelize } = require("./DBConnection");
const User = sequelize.define(
  "User",
  {
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    role: {
      type: Sequelize.ENUM("student", "institute"),
      allowNull: false,
    },
    rating: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 1500,
    },
    rank: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    badges: {
      type: Sequelize.JSON,
      get() {
        const value = this.getDataValue("badges");
        return value ? JSON.parse(value) : [];
      },
      set(value) {
        this.setDataValue("badges", JSON.stringify(value));
      },
    },
    verificationToken: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    isVerified: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    verifiedOn: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = User;
