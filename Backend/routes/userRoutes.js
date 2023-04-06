const express = require("express");
const router = express.Router();
const { showUser, updateUser } = require("../controllers/userController");
const { authenticateUser } = require("../middleware/authentication");

router
  .route("/")
  .get(authenticateUser, showUser)
  .patch(authenticateUser, updateUser);

module.exports = router;
