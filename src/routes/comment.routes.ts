import { Router } from "express";

import {
  createCommentsController,
  deleteCommentsController,
  getAllCommentsController,
  getCommentsController,
  updateCommentsController,
  likeCommentsController,
  getLikeTypeCommentController,
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

commentsRoutes.get(
  "/liketype/:id",
  ensureExistsMiddleware(Comment, "Comment"),
  ensureTokenIsValidMiddleware,
  getLikeTypeCommentController
);

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

commentsRoutes.post(
  "/like/:id",
  ensureExistsMiddleware(Comment, "Comentário"),
  ensureTokenIsValidMiddleware,
  likeCommentsController
); //Like e deslike

export default commentsRoutes;
