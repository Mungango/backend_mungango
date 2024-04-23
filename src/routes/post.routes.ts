import { Router } from "express";

import {
  createPostsController,
  deletePostsController,
  getAllPostsController,
  getPostsController,
  updatePostsController,
} from "../controllers/post.controllers";
import ensureExistsMiddleware from "../middlewares/ensureExists.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";

import {
  postsCreateSchema,
  postsUpdateSchema,
} from "../schemas/posts.schema";

import Post from "../models/Post";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";

const postRoutes: Router = Router();

postRoutes.get("", getAllPostsController);

postRoutes.get(
  "/:id",
  ensureExistsMiddleware(Post, "Post"),
  getPostsController
);

postRoutes.post(
  "",
  ensureDataIsValidMiddleware(postsCreateSchema),
  ensureTokenIsValidMiddleware,
  createPostsController
);

postRoutes.patch(
  "/:id",
  ensureExistsMiddleware(Post, "Post"),
  ensureDataIsValidMiddleware(postsUpdateSchema),
  ensureTokenIsValidMiddleware,
  updatePostsController
);

postRoutes.delete(
  "/:id",
  ensureExistsMiddleware(Post, "Post"),
  ensureTokenIsValidMiddleware,
  deletePostsController
);

export default postRoutes;
