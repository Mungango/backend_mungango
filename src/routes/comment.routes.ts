import { Router } from "express";

import {
	createCommentsController,
	deleteCommentsController,
	getAllCommentsController,
	getCommentsController,
	updateCommentsController,
} from "../controllers/comments.controllers";
import ensureExistsMiddleware from "../middlewares/ensureExists.middleware";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";

import {
	commentsNoIDsSchema,
	commentsUpdateSchema,
} from "../schemas/comments.schema";

import Comment from "../models/Comment";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";
import Post from "../models/Post";

const commentsRoutes: Router = Router();

commentsRoutes.get("/all/:id", getAllCommentsController);

commentsRoutes.get(
	"/:id",
	ensureExistsMiddleware(Comment, "Comentário"),
	getCommentsController
);

commentsRoutes.post(
	"/:id",
	ensureExistsMiddleware(Post, "Post"),
	ensureDataIsValidMiddleware(commentsNoIDsSchema),
	ensureTokenIsValidMiddleware,
	createCommentsController
);

commentsRoutes.patch(
	"/:id",
	ensureExistsMiddleware(Comment, "Comentário"),
	ensureDataIsValidMiddleware(commentsUpdateSchema),
	ensureTokenIsValidMiddleware,
	updateCommentsController
);

commentsRoutes.delete(
	"/:id",
	ensureExistsMiddleware(Comment, "Comentário"),
	ensureTokenIsValidMiddleware,
	deleteCommentsController
);

export default commentsRoutes;
