import createCommentsService from "../services/comments/createComments.service.js";
import deleteCommentsService from "../services/comments/deleteComments.service.js";
import getAllCommentsService from "../services/comments/getAllComments.service.js";
import getCommentsService from "../services/comments/getComments.service.js";
import updateCommentsService from "../services/comments/updateComments.service.js";

const getCommentsController = async (req, res) => {
  const id = req.params.id;

  const retrivedComment = await getCommentsService(id);

  return res.status(200).json(retrivedComment);
};

const getAllCommentsController = async (req, res) => {
  const postId = req.params.id
  const allComments = await getAllCommentsService(postId);

  return res.status(200).json(allComments);
};

const createCommentsController = async (req, res) => {
  const postId = req.params.id
  const payload = req.body,
    userId = Number(req.user.id);

  const createdPost = await createCommentsService(postId, userId, payload);
  return res.status(201).json(createdPost);
};

const updateCommentsController = async (req, res) => {
  const payload = req.body,
    id = req.params.id;
  const userId = Number(req.user.id);

  const updatedPost = await updateCommentsService(id, payload, userId);

  return res.status(200).json(updatedPost);
};

const deleteCommentsController = async (req, res) => {
  const id = req.params.id;
  const userId = Number(req.user.id);

  await deleteCommentsService(id, userId);

  return res.status(204).send();
};

export {
  getCommentsController,
  getAllCommentsController,
  createCommentsController,
  updateCommentsController,
  deleteCommentsController,
};
