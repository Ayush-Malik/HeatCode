const Badges = require("./Badge");
const User = require("./User");
const Contest = require("./Contest");
const ContestProblem = require("./ContestProblem");
const ContestSubmission = require("./ContestSubmission");
const InstituteDetail = require("./InstituteDetail");
const Problem = require("./Problem");
const StudentDetail = require("./StudentDetail");
const Submission = require("./Submission");
const { sequelize } = require("./DBConnection");

// Sync models with database
sequelize
  .sync()
  .then(() => {
    console.log("All models were synchronized successfully.");
  })
  .catch((error) => {
    console.error("An error occurred while synchronizing the models:", error);
  });
