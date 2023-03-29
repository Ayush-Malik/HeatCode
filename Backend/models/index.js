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

// Define associations
// User.hasOne(InstituteDetail, { foreignKey: "userId" });
// User.hasOne(StudentDetail, { foreignKey: "userId" });
// User.hasMany(Problem, { foreignKey: "createdBy" });
// User.hasMany(Contest, { foreignKey: "createdBy" });
// Contest.belongsToMany(Problem, { through: ContestProblem });
// Problem.belongsToMany(Contest, { through: ContestProblem });
// Contest.hasMany(ContestSubmission, { foreignKey: "contestId" });
// User.hasMany(ContestSubmission, { foreignKey: "userId" });
// ContestSubmission.hasMany(Submission, { foreignKey: "contestSubmissionId" });

// Sync models with database
sequelize
    .sync()
    .then(() => {
        console.log("All models were synchronized successfully.");
    })
    .catch((error) => {
        console.error("An error occurred while synchronizing the models:", error);
    });

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