const { StatusCodes } = require("http-status-codes");
const { body, query, validationResult } = require("express-validator");
const { sequelize, User, InstituteDetail } = require("../models");
const customError = require("../errors");
const crypto = require("crypto");

const registerStudent = [
    body("name").notEmpty().withMessage("Name is required"),

    body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

    body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters"),

    body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["student", "institute"])
    .withMessage("Invalid role value"),

    async(req, res, next) => {
        // Error handling
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new customError.ValidationError("Validation failded!!!", errors);
        }

        // create user
        const { name, email, password, role } = req.body;
        const newUser = {
            name,
            email,
            password,
            role,
            verificationToken: crypto.randomBytes(40).toString("hex"),
        };
        const { dataValues: user } = await User.create(newUser);

        res.status(StatusCodes.CREATED).json({
            msg: "Student User created successfully!!!",
            verificationToken: user.verificationToken,
        });
    },
];

// ------------------------------------------------------------------------------------

const registerInstitute = [
    body("name").notEmpty().withMessage("Name is required"),

    body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

    body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters"),

    body("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["student", "institute"])
    .withMessage("Invalid role value"),

    body("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .isInt()
    .withMessage("Phone number must be an integer"),

    body("instituteName")
    .notEmpty()
    .withMessage("Institute Name is required")
    .isLength({ max: 255 })
    .withMessage("Name must be at most 255 characters long"),

    body("address")
    .notEmpty()
    .withMessage("Address is required")
    .isLength({ max: 255 })
    .withMessage("Address must be at most 255 characters long"),
    async(req, res, next) => {
        // Error handling
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new customError.ValidationError("Validation failded!!!", errors);
        }

        // create user
        const { name, email, password, role } = req.body;
        const newUser = {
            name,
            email,
            password,
            role,
            verificationToken: crypto.randomBytes(40).toString("hex"),
        };
        const { dataValues: user } = await User.create(newUser);

        // create institute detail and link it to user
        const { phone, instituteName, address } = req.body;
        const newInstitute = {
            userId: user.userId,
            phone,
            instituteName,
            address,
        };
        await InstituteDetail.create(newInstitute);

        res.status(StatusCodes.CREATED).json({
            msg: "Institute User created successfully!!!",
            verificationToken: user.verificationToken,
        });
    },
];

// ------------------------------------------------------------------------------------

const verifyEmail = [
    query("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

    query("verificationToken")
    .notEmpty()
    .withMessage("Please provide verification token"),
    async(req, res, next) => {
        // user existence check
        const user = await User.findOne({ where: { email: req.query.email } });
        if (!user) {
            throw new customError.UnauthenticatedError("Invalid Credentials");
        }

        // token check
        if (user.verificationToken !== req.query.verificationToken) {
            throw new customError.UnauthenticatedError("Verification failed");
        }

        // verify
        user.isVerified = true;
        user.verifiedOn = Date.now();
        user.verificationToken = "";
        await user.save(); // so that no one can login using verification email more than once

        res.status(StatusCodes.OK).json({ "msg": "User verified Successfully!!!" });
    },
];

// ------------------------------------------------------------------------------------

const login = [
    body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

    body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters"),

    async(req, res, next) => {
        // unregistered user , unverified user , registered + verified user

        // Error handling
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new customError.ValidationError("Validation failded!!!", errors);
        }

        // user existence check
        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user) {
            throw new customError.UnauthenticatedError("Invalid Credentials");
        }

        // password check
        const isCorrect = await user.isPasswordCorrect(req.body.password);
        if (!isCorrect) {
            throw new customError.UnauthenticatedError("Invalid Credentials");
        }

        // user verification check
        if (!user.isVerified) {
            throw new customError.UnauthenticatedError(
                "Unverified account , Please verify your email"
            );
        }

        res.send("login route");
    },
];

// ------------------------------------------------------------------------------------

const logout = async(req, res, next) => {
    res.send("logout route");
};

module.exports = {
    registerStudent,
    registerInstitute,
    verifyEmail,
    login,
    logout,
};