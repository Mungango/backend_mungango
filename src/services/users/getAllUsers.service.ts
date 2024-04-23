import User from "../../models/User";
import { usersWithoutPassSchema } from "../../schemas/users.schema";

const getAllUsersService = async () => {
	const retrivedUsers = await User.findAll({ where: { deletedAt: null } });

	const userWithoutPass = usersWithoutPassSchema.array().parse(retrivedUsers);

	return userWithoutPass;
};

export default getAllUsersService;
