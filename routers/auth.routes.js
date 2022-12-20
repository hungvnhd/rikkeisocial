const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const authController = require("../controllers/auth.controller");

router.post("/register", authController.signUpNewUser);
router.post("/login", authController.login);

module.exports = router;
