import { AppError } from "../../errors.js";
import User from "../../models/User.js";

const updateUsersService = async (id, payload) => {
	const updatedUser = await User.update(payload, {
		where: { id, deletedAt: null },
	});

	if (!updatedUser[0]) {
		throw new AppError("Usuário não encontrado", 404);
	}

	return updatedUser;
};

export default updateUsersService;
