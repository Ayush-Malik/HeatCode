const Sequelize = require("sequelize");
const { sequelize } = require("./DBConnection");
const ContestSubmission = sequelize.define(
  "ContestSubmission",
  {
    contestSubmissionId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    submittedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW, // sets the default value to the current date and time
      allowNull: false,
    },
    score: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = ContestSubmission;
