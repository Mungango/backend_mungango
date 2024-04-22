import User from "../../models/User.js";

const deleteUsersService = async (id) => {
	const deletedAt = new Date();

	await User.update(
		{ deletedAt },
		{ where: { id, deletedAt: null } }
	);
};

export default deleteUsersService;
