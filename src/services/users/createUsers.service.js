import { AppError } from "../../errors.js";
import User from "../../models/User.js";
import { usersWithoutPassSchema } from "../../schema/users.schema.js";

const createUsersService = async (payload) => {
	const checkEmail = await User.findOne({where:{email: payload.email}})

	if (checkEmail){
		throw new AppError("Email já existe", 409)
	}

	const createdUser = await User.create(payload);

	const userWithoutPass = usersWithoutPassSchema.parse(createdUser)

	return userWithoutPass;
};

export default createUsersService;
