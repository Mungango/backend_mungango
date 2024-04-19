import { Router } from "express";

import {
  createPostsController,
  deletePostsController,
  getAllPostsController,
  getPostsController,
  updatePostsController,
} from "../controllers/post.controllers.js";
import ensureExistsMiddleware from "../middlewares/ensureExists.middleware.js";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware.js";

import {
  postsCreateSchema,
  postsUpdateSchema,
} from "../schema/posts.schema.js";

import Post from "../models/Post.js";

const postRoutes = Router();

postRoutes.get("", getAllPostsController);

postRoutes.get(
  "/:id",
  ensureExistsMiddleware(Post, "Post"),
  getPostsController
);

postRoutes.post(
  "",
  ensureDataIsValidMiddleware(postsCreateSchema),
  createPostsController
);

postRoutes.patch(
  "/:id",
  ensureExistsMiddleware(Post, "Post"),
  ensureDataIsValidMiddleware(postsUpdateSchema),
  updatePostsController
);

postRoutes.delete(
  "/:id",
  ensureExistsMiddleware(Post, "Post"),
  deletePostsController
);

export default postRoutes;
