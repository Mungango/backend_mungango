import createPostsService from "../services/posts/createPosts.service.js";
import deletePostsService from "../services/posts/deletePosts.service.js";
import getAllPostsService from "../services/posts/getAllPosts.service.js";
import getPostsService from "../services/posts/getPosts.service.js";
import updatePostsService from "../services/posts/updatePosts.service.js";

const getPostsController = async (req, res) => {
	const id = req.params.id;

	const retrivedPost = await getPostsService(id);

	return res.status(200).json(retrivedPost);
};

const getAllPostsController = async (req, res) => {
	const allPosts = await getAllPostsService();

	return res.status(200).json(allPosts);
};

const createPostsController = async (req, res) => {
	const payload = req.body,
	userId = Number(req.user.id);

	const createdPost = await createPostsService(userId, payload);
	return res.status(201).json(createdPost);
};

const updatePostsController = async (req, res) => {
	const payload = req.body,
	id = req.params.id;
	const userId = Number(req.user.id)

	const updatedPost = await updatePostsService(id, payload, userId);

	return res.status(200).json(updatedPost);
};

const deletePostsController = async (req, res) => {
	const id = req.params.id;
	const userId = Number(req.user.id);

	await deletePostsService(id, userId);

	return res.status(204).send();
};

export {
	getPostsController,
	getAllPostsController,
	createPostsController,
	updatePostsController,
	deletePostsController,
};
