import createUsersService from "../services/users/createUsers.service.js";
import deleteUsersService from "../services/users/deleteUsers.service.js";
import getAllUsersService from "../services/users/getAllUsers.service.js";
import getUsersService from "../services/users/getUsers.service.js";
import updateUsersService from "../services/users/updateUsers.service.js";

const getUsersController = async (req, res) => {
	const id = req.params.id;

	const retrivedUser = await getUsersService(id);

	return res.status(200).json(retrivedUser);
};

const getAllUsersController = async (req, res) => {
	const allUsers = await getAllUsersService();

	return res.status(200).json(allUsers);
};

const createUsersController = async (req, res) => {
	const payload = req.body;

	const createdUser = await createUsersService(payload);

	return res.status(201).json(createdUser);
};

const updateUsersController = async (req, res) => {
	const payload = req.body,
		id = req.params.id;

	const updatedUser = await updateUsersService(id, payload);

	return res.status(200).json(updatedUser);
};

const deleteUsersController = async (req, res) => {
	const id = req.params.id;

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
