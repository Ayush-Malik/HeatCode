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

module.exports = {
  sequelize,
  Badges,
  Contest,
  ContestProblem,
  ContestSubmission,
  InstituteDetail,
  Problem,
  StudentDetail,
  Submission,
  User,
};
