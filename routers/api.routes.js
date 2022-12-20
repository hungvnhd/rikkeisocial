const express = require("express");
const router = express.Router();
const apiController = require("../controllers/api.controller");

router.get("/v1/users", apiController.getAll);
router.get("/v1/users/:id", apiController.getById);
router.get("/v1/posts/:id", apiController.getPostById);
router.get("/v1/friends", apiController.getAllRequest);
router.post("/v1/posts", apiController.createPost);

module.exports = router;
