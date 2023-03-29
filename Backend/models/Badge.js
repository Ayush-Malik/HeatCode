const Sequelize = require("sequelize");
const { sequelize } = require("./DBConnection");
const Badge = sequelize.define(
    "Badge", {
        badgeId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        imageId: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    }, {
        freezeTableName: true,
    }
);

module.exports = Badge;