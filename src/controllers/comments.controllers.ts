import { Request, Response } from "express";
import createCommentsService from "../services/comments/createComments.service";
import deleteCommentsService from "../services/comments/deleteComments.service";
import getAllCommentsService from "../services/comments/getAllComments.service";
import getCommentsService from "../services/comments/getComments.service";
import updateCommentsService from "../services/comments/updateComments.service";
import { iCommentCreateNoIDs } from "../interfaces/comment.interface";
import likeAndDislike from "../middlewares/likeAndDislike.middleware";
import LikesComment from "../models/likesComment";
import { ilikesCommentCreate } from "../interfaces/likesComment.interface";
import getLikeTypePostAndCommentService from "../services/gerais/getLikeTypePostAndComment.service";

const getCommentsController = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const retrivedComment = await getCommentsService(id);

	return res.status(200).json(retrivedComment);
};

const getAllCommentsController = async (req: Request, res: Response) => {
	const postId = Number(req.params.id);
	const { page = 1, limit = 10 } = req.query;

	const allComments = await getAllCommentsService(
		postId,
		Number(page),
		Number(limit)
	);

	return res.status(200).json(allComments);
};

const createCommentsController = async (req: Request, res: Response) => {
	const postId = Number(req.params.id);
	const payload: iCommentCreateNoIDs = req.body,
		userId = Number(req.user.id);

	const createdPost = await createCommentsService(postId, userId, payload);
	return res.status(201).json(createdPost);
};

const updateCommentsController = async (req: Request, res: Response) => {
	const payload = req.body,
		id = Number(req.params.id);
	const userId = Number(req.user.id);

	const updatedPost = await updateCommentsService(id, payload, userId);

	return res.status(200).json(updatedPost);
};

const deleteCommentsController = async (req: Request, res: Response) => {
	const id = Number(req.params.id);
	const userId = Number(req.user.id);

	await deleteCommentsService(id, userId);

	return res.status(204).send();
};

const likeCommentsController = async (req: Request, res: Response) => {
	const payload = req.body;
	const id = Number(req.params.id);
	const userId = Number(req.user.id);

	const data: ilikesCommentCreate = { ownerId: id, userId, ...payload };

	await likeAndDislike(LikesComment, "comentário", data);

	return res.status(204).send();
};


const getLikeTypeCommentController = async (req: Request, res: Response) => {
  const payload = {
    userId: Number(req.user.id),
    ownerId: Number(req.params.id), // Id do comment
  };

  const likeType = await getLikeTypePostAndCommentService(LikesComment, payload);

  return res.status(200).json(likeType);
};

export {
  getCommentsController,
  getAllCommentsController,
  createCommentsController,
  updateCommentsController,
  deleteCommentsController,
  likeCommentsController,
  getLikeTypeCommentController,
};
