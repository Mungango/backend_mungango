import User from "../../models/User.js";
import { usersWithoutPassSchema } from "../../schema/users.schema.js";

const getUsersService = async (id) => {
	const retrivedUser = await User.findOne({
		where: { id, deletedAt: null },
	});

	const userWithoutPass = usersWithoutPassSchema.parse(retrivedUser)

	return userWithoutPass;
};

export default getUsersService;
