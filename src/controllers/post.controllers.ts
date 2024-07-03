import { Request, Response } from "express";

import createPostsService from "../services/posts/createPosts.service";
import deletePostsService from "../services/posts/deletePosts.service";
import getAllPostsService from "../services/posts/getAllPosts.service";
import getPostsService from "../services/posts/getPosts.service";
import updatePostsService from "../services/posts/updatePosts.service";
import likePostsService from "../services/posts/likePosts.service";
import { iPostCreate, iPostUpdate } from "../interfaces/post.interface";
import {
	ilikesPostCreate,
	ilikesPostUpdate,
} from "../interfaces/likesPost.interface";
import likeAndDislike from "../middlewares/likeAndDislike.middleware";
import LikesPost from "../models/likesPost";
import getUserAllPostsService from "../services/posts/getUserAllPosts.service";
import getLikePostsService from "../services/posts/getLikePosts.service";
import getAllFollowingPostsService from "../services/posts/getAllFollowingPosts.service";
import getAllPostsAdminService from "../services/posts/getAllPostsAdmin.service";

const getPostsController = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const retrivedPost = await getPostsService(id);

	return res.status(200).json(retrivedPost);
};

const getAllPostsController = async (req: Request, res: Response) => {
	const { page = 1, limit = 10 } = req.query;
	const allPosts = await getAllPostsService(Number(page), Number(limit));

	return res.status(200).json(allPosts);
};

const createPostsController = async (req: Request, res: Response) => {
	const payload: iPostCreate = req.body,
		userId = Number(req.user.id);

	const createdPost = await createPostsService(userId, payload);
	return res.status(201).json(createdPost);
};

const updatePostsController = async (req: Request, res: Response) => {
	const payload: iPostUpdate = req.body,
		id = Number(req.params.id);
	const userId = Number(req.user.id);

	const updatedPost = await updatePostsService(id, payload, userId);

	return res.status(200).json(updatedPost);
};

const deletePostsController = async (req: Request, res: Response) => {
	const id = Number(req.params.id);
	const userId = Number(req.user.id);

	await deletePostsService(id, userId);

	return res.status(204).send();
};

const likePostsController = async (req: Request, res: Response) => {
	const payload = req.body;
	const id = Number(req.params.id);
	const userId = Number(req.user.id);

	const data: ilikesPostCreate = { ownerId: id, userId, ...payload };

	await likeAndDislike(LikesPost, "post", data);

	return res.status(204).send();
};

const getLikePostsController = async (req: Request, res: Response) => {
	const id = Number(req.params.id);
	const userId = Number(req.user.id);

	const data: { ownerId: number; userId: number } = { ownerId: id, userId };

	const like = await getLikePostsService(data);

	return res.status(200).json(like);
};

const userPostsController = async (req: Request, res: Response) => {
	const { page = 1, limit = 10 } = req.query;
	const userId = Number(req.params.id);
	const userAllPosts = await getUserAllPostsService(
		userId,
		Number(page),
		Number(limit)
	);

	return res.status(200).json(userAllPosts);
};

const userFollowPostsController = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const posts = await getAllFollowingPostsService(id);

	return res.status(200).json(posts);
};

const getAllPostsAdminController = async (req: Request, res: Response) => {
	console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
	
	const { page = 1, limit = 10 } = req.query;
	const allPostsAdmin = await getAllPostsAdminService(Number(page), Number(limit));

	return res.status(200).json(allPostsAdmin);
};

export {
	getPostsController,
	getAllPostsController,
	createPostsController,
	updatePostsController,
	deletePostsController,
	getLikePostsController,
	likePostsController,
	userPostsController,
	userFollowPostsController,
	getAllPostsAdminController,
};
