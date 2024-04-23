import User from "../../models/User";

const deleteUsersService = async (id: number): Promise<void> => {
	const deletedAt = new Date();

	await User.update({ deletedAt }, { where: { id, deletedAt: null } });
};

export default deleteUsersService;
