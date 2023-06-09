const { StatusCodes } = require("http-status-codes");
const { body, query, validationResult } = require("express-validator");
const { sequelize, User, InstituteDetail } = require("../models");
const customError = require("../errors");
const crypto = require("crypto");
const {
    sendVerificationEmail,
    createTokenUser,
    attachCookiesToResponse,
    createJWT,
    isJWTvalid,
    sendPasswordResetEmail,
} = require("../utils");

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

        await sendVerificationEmail(newUser.email, newUser.verificationToken);

        res.status(StatusCodes.CREATED).json({
            msg: "Student User created successfully!!!",
            user: {
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
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

        await sendVerificationEmail(newUser.email, newUser.verificationToken);

        newUser.instituteName = instituteName; // so that token user has this

        res.status(StatusCodes.CREATED).json({
            msg: "Institute User created successfully!!!",
            user: {
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                instituteName: newUser.instituteName,
            },
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

        var data = {
            name: user.dataValues.name,
            email: user.dataValues.email,
            role: user.dataValues.role,
        };

        if (user.role === "institute") {
            const institute_detail = await InstituteDetail.findOne({
                where: { userId: user.userId },
            });

            data.instituteName = institute_detail.instituteName;
        }
        const tokenUser = await createTokenUser(user.dataValues);
        attachCookiesToResponse({ res, tokenUser });

        res.status(StatusCodes.OK).json({
            msg: "User logged in successfully!!!",
            user: data,
        });
    },
];

// ------------------------------------------------------------------------------------

const logout = async(req, res, next) => {
    res.cookie("token", "logout", {
        httpOnly: true,
        expires: new Date(Date.now() + 1000),
    });
    res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

const forgotPassword = [
    body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

    async(req, res, next) => {
        // Error handling
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new customError.ValidationError("Validation failded!!!", errors);
        }

        // fetch user
        const user = await User.findOne({ where: { email: req.body.email } });

        if (user) {
            const data = { email: req.body.email };
            const passwordResetToken = createJWT({ payload: data, lifetime: "10m" });
            user.passwordResetToken = passwordResetToken;
            user.save();
            console.log({ passwordResetToken });
            sendPasswordResetEmail(user.email, passwordResetToken);
            // send krni h mail frontend pr , kyoki vo frontend se newPassword leke aega aur resetPassword ko hit krega
        }

        // question : why i am sending same response for both [when email is sent and when email is not sent]
        // answer : because i dont want hacker to know whether a particular email is registered on heatcode[privacy purpose]
        res
            .status(StatusCodes.OK)
            .json({ msg: "Check your email for password reset link!!!" });
    },
];

const resetPassword = [
    body("passwordResetToken")
    .notEmpty()
    .withMessage("PasswordResetToken is required"),

    body("newPassword")
    .notEmpty()
    .withMessage("newPassword is required")
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters"),

    async(req, res, next) => {
        // Error handling
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new customError.ValidationError("Validation failded!!!", errors);
        }

        var data;
        try {
            const { email } = isJWTvalid({ token: req.body.passwordResetToken });
            const user = await User.findOne({ where: { email } });
            user.password = req.body.newPassword;
            user.passwordResetToken = ""; // so that it can only be used once
            user.save();
        } catch (err) {
            throw new customError.UnauthenticatedError("Unable to reset password!!!");
        }

        res
            .status(StatusCodes.OK)
            .json({ msg: "Password changed successfully!!!" });
    },
];

module.exports = {
    registerStudent,
    registerInstitute,
    verifyEmail,
    login,
    logout,
    forgotPassword,
    resetPassword,
};