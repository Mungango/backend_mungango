import { iUsersWithoutPass } from "../../interfaces/user.interface";
import User from "../../models/User";
import { usersWithoutPassSchema } from "../../schemas/users.schema";

const getUsersService = async (id: number): Promise<iUsersWithoutPass> => {
	const retrivedUser = await User.findOne({
		where: { id, deletedAt: null },
	});

	const userWithoutPass: iUsersWithoutPass = usersWithoutPassSchema.parse(retrivedUser);

	return userWithoutPass;
};

export default getUsersService;
