import User from "../../models/User";

const deleteUsersService = async (id: number) => {
	const deletedAt = new Date();

	await User.update(
		{ deletedAt },
		{ where: { id, deletedAt: null } }
	);
};

export default deleteUsersService;
