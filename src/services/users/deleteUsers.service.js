import User from "../../models/User.js";

const deleteUsersService = async (id) => {
	const deletedAt = new Date();

	const deletedUser = await User.update(
		{ deletedAt },
		{ where: { id, deletedAt: null } }
	);

	if (!deletedUser[0]) {
		throw new AppError("Usuário não encontrado", 404);
	}
};

export default deleteUsersService;
