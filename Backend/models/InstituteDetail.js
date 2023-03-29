// const User = require("./User");
const Sequelize = require("sequelize");
const { sequelize } = require("./DBConnection");
const InstituteDetail = sequelize.define(
    "InstituteDetail", {
        userId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            // references: {
            //     model: User,
            //     key: "userId",
            // },
        },
        phone: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    }, {
        freezeTableName: true,
    }
);

module.exports = InstituteDetail;