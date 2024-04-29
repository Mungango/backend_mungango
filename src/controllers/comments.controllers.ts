import { Request, Response } from "express";
import createCommentsService from "../services/comments/createComments.service";
import deleteCommentsService from "../services/comments/deleteComments.service";
import getAllCommentsService from "../services/comments/getAllComments.service";
import getCommentsService from "../services/comments/getComments.service";
import updateCommentsService from "../services/comments/updateComments.service";
import { iCommentCreateNoIDs } from "../interfaces/comment.interface";
import likeAndDislike from "../middlewares/likeAndDislike.middleware";
import LikesComment from "../models/likesComment";

const getCommentsController = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const retrivedComment = await getCommentsService(id);

  return res.status(200).json(retrivedComment);
};

const getAllCommentsController = async (req: Request, res: Response) => {
  const postId = Number(req.params.id);
  const allComments = await getAllCommentsService(postId);

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

  const data = { ownerId: id, userId, ...payload };
  

  await likeAndDislike(LikesComment, "comentário", data);

  return res.status(204).send();
};

export {
  getCommentsController,
  getAllCommentsController,
  createCommentsController,
  updateCommentsController,
  deleteCommentsController,
  likeCommentsController,
};
