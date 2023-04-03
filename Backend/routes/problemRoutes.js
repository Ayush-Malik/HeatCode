const express = require("express");
const router = express.Router();
const { showAll } = require("../controllers/problemController");
const { authenticateUser } = require("../middleware/authentication");

router.route("/showAll").get(authenticateUser, showAll);

module.exports = router;