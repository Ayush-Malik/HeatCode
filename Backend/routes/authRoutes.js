const express = require("express");
const router = express.Router();
const {
    registerStudent,
    registerInstitute,
    login,
    logout,
    verifyEmail,
} = require("../controllers/authController");

router.route("/register/student").post(registerStudent);
router.route("/register/institute").post(registerInstitute);

router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/verify-email").get(verifyEmail);

module.exports = router;