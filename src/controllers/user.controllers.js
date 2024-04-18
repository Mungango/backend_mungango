const getUsersController = async (req, res) => {
	return res.status(200).json("Rota get users");
};

const getAllUsersController = async (req, res) => {
	return res.status(200).json("Rota get um unico user");
};

const createUsersController = async (req, res) => {
	return res.status(201).json("Rota post user");
};

const updateUsersController = async (req, res) => {
	return res.status(200).json("Update user");
};

const deleteUsersController = async (req, res) => {
	return res.status(204).send();
};

export {
	getUsersController,
	getAllUsersController,
	createUsersController,
	updateUsersController,
	deleteUsersController,
};
