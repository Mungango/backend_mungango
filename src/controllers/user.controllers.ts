import { Request, Response } from "express";
import createUsersService from "../services/users/createUsers.service";
import deleteUsersService from "../services/users/deleteUsers.service";
import getAllUsersService from "../services/users/getAllUsers.service";
import getUsersService from "../services/users/getUsers.service";
import updateUsersService from "../services/users/updateUsers.service";
import { iUserCreate, iUserUpdate } from "../interfaces/user.interface";
import followUsersService from "../services/users/followers/followUsers.service";
import unfollowUsersService from "../services/users/followers/unfollowUsers.service";
import getFollowingUsersService from "../services/users/followers/getFollowingUsers.service";
import getFollowersUsersService from "../services/users/followers/getFollowersUsers.service";
import getUsersIdService from "../services/users/getUsersId.service";

import forgotPasswordService from "../services/users/forgotPassword.service";
import resetPasswordService from "../services/users/resetPassword.service";
import getIfUserFollowService from "../services/users/followers/getIfUserFollow.service";
import { z } from "zod";

const getUsersController = async (req: Request, res: Response) => {
	const username = req.params.username;

	const retrivedUser = await getUsersService(username);

	return res.status(200).json(retrivedUser);
};

const getUsersIdController = async (req: Request, res: Response) => {
	const id = Number(req.params.id);
	const retrivedUser = await getUsersIdService(id);

	return res.status(200).json(retrivedUser);
};

const getAllUsersController = async (req: Request, res: Response) => {
	const allUsers = await getAllUsersService();

	return res.status(200).json(allUsers);
};

const createUsersController = async (req: Request, res: Response) => {
	const payload: iUserCreate = req.body;

	const createdUser = await createUsersService(payload);

	return res.status(201).json(createdUser);
};

const updateUsersController = async (req: Request, res: Response) => {
	const payload: iUserUpdate = req.body,
		id = Number(req.params.id);

	const updatedUser = await updateUsersService(id, payload);

	return res.status(200).json(updatedUser);
};

const deleteUsersController = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	await deleteUsersService(id);

	return res.status(204).send();
};

// User Followers controller
const followUserController = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const userFollowed = await followUsersService({
		followerId: id,
		userId: req.user.id,
	});

	return res.status(200).json(userFollowed);
};

const unfollowUserController = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	await unfollowUsersService(id);

	return res.status(204).send();
};

const getIfUserFollowSchema = z.object({
	followerId: z.number(),
	userId: z.number(),
});

const getIfUserFollowController = async (req: Request, res: Response) => {
	const {followerId, userId} = req.query;

	const parsedPayload = getIfUserFollowSchema.parse({
		followerId: Number(followerId),
		userId: Number(userId),
	});

	const userFollowing = await getIfUserFollowService(parsedPayload);

	return res.status(200).json(userFollowing);
};

const getFollowingUserController = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const userFollowing = await getFollowingUsersService(id);

	return res.status(200).json(userFollowing);
};

const getFollowersUserController = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	const userFollowing = await getFollowersUsersService(id);

	return res.status(200).json(userFollowing);
};

const forgotPasswordController = async (req: Request, res: Response) => {
	const email: string = req.body.email;

	await forgotPasswordService(email);

	return res.status(200).send("Confere o email, bitch");
};

const resetPasswordController = async (req: Request, res: Response) => {
	const { token } = req.params;
	const { password } = req.body;

	await resetPasswordService(token, password);

	return res.status(200).send("Senha redefinida, bitch");
};

export {
	getUsersController,
	getUsersIdController,
	getAllUsersController,
	createUsersController,
	updateUsersController,
	deleteUsersController,
	getIfUserFollowController,
	getFollowingUserController,
	getFollowersUserController,
	followUserController,
	unfollowUserController,
	resetPasswordController,
	forgotPasswordController,
};
