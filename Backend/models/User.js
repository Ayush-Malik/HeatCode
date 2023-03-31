const Sequelize = require("sequelize");
const { sequelize } = require("./DBConnection");
const bcrypt = require("bcrypt");
const User = sequelize.define(
    "User", {
        userId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        role: {
            type: Sequelize.ENUM("student", "institute"),
            allowNull: false,
        },
        rating: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: 1500,
        },
        rank: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: 0,
        },
        badges: {
            type: Sequelize.JSON,
            get() {
                const value = this.getDataValue("badges");
                return value ? JSON.parse(value) : [];
            },
            set(value) {
                this.setDataValue("badges", JSON.stringify(value));
            },
        },
        verificationToken: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        isVerified: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        verifiedOn: {
            type: Sequelize.DATE,
            allowNull: true,
        },
    }, {
        freezeTableName: true,
    }
);

User.beforeSave(async(user, options) => {
    if (user.changed("password")) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
    }
});

User.prototype.isPasswordCorrect = async function(password) {
    try {
        const isCorrect = await bcrypt.compare(password, this.password);
        return isCorrect;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = User;