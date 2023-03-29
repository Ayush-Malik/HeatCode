// const User = require("./User");
const Sequelize = require("sequelize");
const { sequelize } = require("./DBConnection");
const StudentDetail = sequelize.define(
    "StudentDetail", {
        userId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            // references: {
            //     model: User,
            //     key: "userId",
            // },
        },
        collegeId: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        college: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        course: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        courseDuration: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        branch: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        passOutYear: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
    }, {
        freezeTableName: true,
    }
);

module.exports = StudentDetail;