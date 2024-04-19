import { Router } from "express";

import {
	createPostsController,
	deletePostsController,
	getAllPostsController,
	getPostsController,
	updatePostsController,
} from "../controllers/post.controllers.js";
import ensureExistsMiddleware from "../middlewares/ensureExists.middleware.js";
import Post from "../models/Post.js";

const postRoutes = Router();

postRoutes.get("", getAllPostsController);

postRoutes.get(
	"/:id",
	ensureExistsMiddleware(Post, "Post"),
	getPostsController
);

postRoutes.post("", createPostsController);

postRoutes.patch(
	"/:id",
	ensureExistsMiddleware(Post, "Post"),
	updatePostsController
);

postRoutes.delete(
	"/:id",
	ensureExistsMiddleware(Post, "Post"),
	deletePostsController
);

export default postRoutes;
