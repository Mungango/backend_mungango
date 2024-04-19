import { AppError } from "../../errors.js";
import User from "../../models/User.js";

const createUsersService = async (payload) => {
	const checkEmail = await User.findOne({where:{email: payload.email}})

	if (checkEmail){
		throw new AppError("Email já existe", 409)
	}

	const createUser = await User.create(payload);

	return createUser;
};

export default createUsersService;
