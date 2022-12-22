const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

router.post("/friends/request/:id", userController.addingFriend);
router.post("/friends/request/accept/:id", userController.acceptFriend);
router.post("/friends/request/remove/:id", userController.removeRequest);
router.put("/friends/request/accept/:id", userController.acceptFriend);
// router.get("/api/v1/friends/", userController.getFriends);
module.exports = router;
