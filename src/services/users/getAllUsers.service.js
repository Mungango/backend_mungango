import User from "../../models/User.js";
import { usersWithoutPassSchema } from "../../schema/users.schema.js";

const getAllUsersService = async () => {
	const retrivedUsers = await User.findAll({where:{deletedAt: null}});

	const userWithoutPass = usersWithoutPassSchema.array().parse(retrivedUsers)

	return userWithoutPass;
};

export default getAllUsersService;
