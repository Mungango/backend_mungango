import User from "../../models/User";
import { usersWithoutPassSchema } from "../../schemas/users.schema";

const getUsersService = async (id: number) => {
	const retrivedUser = await User.findOne({
		where: { id, deletedAt: null },
	});

	const userWithoutPass = usersWithoutPassSchema.parse(retrivedUser);

	return userWithoutPass;
};

export default getUsersService;
