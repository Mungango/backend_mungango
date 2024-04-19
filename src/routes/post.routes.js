import { Router } from "express";

import {
  createPostsController,
  deletePostsController,
  getAllPostsController,
  getPostsController,
  updatePostsController,
} from "../controllers/post.controllers.js";

const postRoutes = Router();

postRoutes.get("", getAllPostsController);

postRoutes.get("/:id", getPostsController);

postRoutes.post("", createPostsController);

postRoutes.patch("/:id", updatePostsController);

postRoutes.delete("/:id", deletePostsController);

export default postRoutes;
