const express = require("express");
const router = express.Router();
const apiController = require("../controllers/api.controller");

router.get("/v1/users", apiController.getAll);
router.get("/v1/users/:id", apiController.getById);
router.get("/v1/posts/:id", apiController.getPostById);
router.get("/v1/friends", apiController.getAllRequest);
router.get("/v1/friends/:id", apiController.getSignedInUserRequest);
router.post("/v1/posts", apiController.createPost);
router.post("/v1/posts/sendReaction/:id", apiController.sendReaction);

router.delete("/v1/posts/deleteReaction/:id", apiController.deleteReaction);
router.get("/v1/comments/:id", apiController.getCommentById);
router.post("/v1/comments/addComment", apiController.addComment);
module.exports = router;
