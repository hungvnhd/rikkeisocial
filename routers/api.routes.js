const express = require("express");
const router = express.Router();
const apiController = require("../controllers/api.controller");

router.get("/v1/users", apiController.getAll);

module.exports = router;
