import { AppError } from "../../errors";
import {
	iUser,
	iUserCreate,
	iUsersWithoutPass,
} from "../../interfaces/user.interface";
import User from "../../models/User";
import { usersWithoutPassSchema } from "../../schemas/users.schema";

const createUsersService = async (
	payload: iUserCreate
): Promise<iUsersWithoutPass> => {
	const checkEmail = await User.findOne({ where: { email: payload.email } });

	if (checkEmail) {
		throw new AppError("Email já existe", 409);
	}

	const createdUser = await User.create(payload);

	const userWithoutPass: iUsersWithoutPass =
		usersWithoutPassSchema.parse(createdUser);

	return userWithoutPass;
};

export default createUsersService;
