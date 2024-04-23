import { Request, Response } from "express";
import createUsersService from "../services/users/createUsers.service";
import deleteUsersService from "../services/users/deleteUsers.service";
import getAllUsersService from "../services/users/getAllUsers.service";
import getUsersService from "../services/users/getUsers.service";
import updateUsersService from "../services/users/updateUsers.service";

const getUsersController = async (req: Request, res: Response) => {
	const id = req.params.id;

	const retrivedUser = await getUsersService(id);

	return res.status(200).json(retrivedUser);
};

const getAllUsersController = async (req: Request, res: Response) => {
	const allUsers = await getAllUsersService();

	return res.status(200).json(allUsers);
};

const createUsersController = async (req: Request, res: Response) => {
	const payload = req.body;

	const createdUser = await createUsersService(payload);

	return res.status(201).json(createdUser);
};

const updateUsersController = async (req: Request, res: Response) => {
	const payload = req.body,
		id = Number(req.params.id);

	const updatedUser = await updateUsersService(id, payload);

	return res.status(200).json(updatedUser);
};

const deleteUsersController = async (req: Request, res: Response) => {
	const id = Number(req.params.id);

	await deleteUsersService(id);

	return res.status(204).send();
};

export {
	getUsersController,
	getAllUsersController,
	createUsersController,
	updateUsersController,
	deleteUsersController,
};
