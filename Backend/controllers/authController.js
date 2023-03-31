const { StatusCodes } = require("http-status-codes");
const { body, validationResult } = require("express-validator");
const { sequelize, User, InstituteDetail } = require("../models");

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

  async (req, res, next) => {
    // Error handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = Object.assign(new Error(), {
        name: "ValidationError",
        status: StatusCodes.FORBIDDEN,
        errors: errors.array(),
      });
      throw error;
    }

    // create user
    const { name, email, password, role } = req.body;
    const newUser = {
      name,
      email,
      password,
      role,
      verificationToken: "maiTokenHu",
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
  async (req, res, next) => {
    // Error handling
    console.log("YYYYYYYYYYY");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = Object.assign(new Error(), {
        name: "ValidationError",
        status: StatusCodes.FORBIDDEN,
        errors: errors.array(),
      });
      throw error;
    }

    // create user
    const { name, email, password, role } = req.body;
    const newUser = {
      name,
      email,
      password,
      role,
      verificationToken: "maiTokenHu",
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

const login = async (req, res, next) => {
  res.send("login route");
};

// ------------------------------------------------------------------------------------

const logout = async (req, res, next) => {
  res.send("logout route");
};

module.exports = {
  registerStudent,
  registerInstitute,
  login,
  logout,
};
