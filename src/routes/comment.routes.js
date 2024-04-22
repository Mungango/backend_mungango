import { Router } from "express";

import {
  createCommentsController,
  deleteCommentsController,
  getAllCommentsController,
  getCommentsController,
  updateCommentsController,
} from "../controllers/comments.controllers.js";
import ensureExistsMiddleware from "../middlewares/ensureExists.middleware.js";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware.js";

import {
  commentsSchema,
  commentsCreateSchema,
  commentsUpdateSchema,
} from "../schemas/comments.schema.js";

import Post from "../models/Post.js";
import Comment from "../models/Comment.js"
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware.js";

const commentsRoutes = Router();

commentsRoutes.get("/:id", getAllCommentsController);

commentsRoutes.get(
  "/:id",
  ensureExistsMiddleware(Comment, "Comentário"),
  getCommentsController
);

commentsRoutes.post(
  "/:id",
  ensureDataIsValidMiddleware(commentsCreateSchema),
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
