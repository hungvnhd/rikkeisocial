const express = require("express");
const router = express.Router();
const apiController = require("../controllers/api.controller");

router.get("/v1/users", apiController.getAll);
router.get("/v1/users/:id", apiController.getById);
router.get("/v1/posts/:id", apiController.getPostById);
router.get("/v1/friends", apiController.getAllRequest);
router.post("/v1/friends/:id", apiController.getAllRequest1);
router.get("/v1/friends/:id", apiController.getSignedInUserRequest);
router.post("/v1/posts", apiController.createPost);
router.post("/v1/posts/sendReaction/:id", apiController.sendReaction);

router.delete("/v1/posts/deleteReaction/:id", apiController.deleteReaction);
router.get("/v1/comments/:id", apiController.getCommentById);
router.post("/v1/comments/addComment", apiController.addComment);
router.post("/v1/comments/addReply", apiController.addReply);
router.get("/v1/messages/:id", apiController.loadMessage);
router.get("/v1/messages/room/:id", apiController.getMessagesByRoomID);
router.post("/v1/messages/send/:id", apiController.sendMessage);
module.exports = router;
