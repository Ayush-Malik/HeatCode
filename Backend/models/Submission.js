const Sequelize = require("sequelize");
const { sequelize } = require("./DBConnection");
const Submission = sequelize.define(
    "Submission", {
        submissionId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        time: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false,
        },
        result: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
    }, {
        freezeTableName: true,
    }
);

module.exports = Submission;