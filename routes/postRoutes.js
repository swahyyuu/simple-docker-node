const express = require("express");
const postController = require("../controllers/postController");
const loginMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router
  .route("/")
  .get(postController.getAllPosts)
  .post(loginMiddleware, postController.createPost)

router
  .route("/:id")
  .get(postController.getOnePosts)
  .patch(loginMiddleware, postController.updatePost)
  .delete(loginMiddleware, postController.deletePost)

  module.exports = router;