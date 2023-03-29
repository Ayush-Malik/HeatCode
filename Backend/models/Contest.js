// const User = require("./User");
const Sequelize = require("sequelize");
const { sequelize } = require("./DBConnection");
const Contest = sequelize.define(
    "Contest", {
        contestId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        start: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        end: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        duration: {
            type: Sequelize.INTEGER,
            allowNull: false,
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
module.exports = Contest;