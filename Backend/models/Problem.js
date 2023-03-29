// const User = require("./User");
const Sequelize = require("sequelize");
const { sequelize } = require("./DBConnection");
const Problem = sequelize.define(
    "Problem", {
        problemId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        statement: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        testCases: {
            type: Sequelize.JSON,
            allowNull: false,
            get() {
                const value = this.getDataValue("testCases");
                return value ? value : {};
            },
            set(value) {
                this.setDataValue("testCases", value);
            },
        },

        level: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        solution: {
            type: Sequelize.TEXT("long"),
            allowNull: true,
        },
        submissions: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        correctSubmissions: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        createdBy: {
            type: Sequelize.INTEGER,
            allowNull: false,
            // references: {
            //     model: User,
            //     key: "userId",
            // },
        },
    }, {
        freezeTableName: true,
    }
);

module.exports = Problem;