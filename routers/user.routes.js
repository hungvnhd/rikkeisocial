const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

router.post("/friends/request/:id", userController.addingFriend);
router.post("/friends/request/accept/:id", userController.acceptFriend);

module.exports = router;
