const Sequelize = require("sequelize");
const { sequelize } = require("./DBConnection");
const ContestProblem = sequelize.define(
    "ContestProblem", {
        score: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    }, {
        freezeTableName: true,
    }
);

module.exports = ContestProblem;