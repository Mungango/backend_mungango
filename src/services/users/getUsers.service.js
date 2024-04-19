import { AppError } from "../../errors.js";
import User from "../../models/User.js";

const getUsersService = async (id) => {
	const retrivedUser = await User.findOne({
		where: { id, deletedAt: null },
	});

	if (!retrivedUser){
		throw new AppError("Usuário não encontrado", 404)
	}

	return retrivedUser;
};

export default getUsersService;
