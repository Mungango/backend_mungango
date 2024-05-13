import { AppError } from "../../errors";
import { iUsersWithoutPass } from "../../interfaces/user.interface";
import User from "../../models/User";
import { usersWithoutPassSchema } from "../../schemas/users.schema";
import getFollowersUsersService from "./followers/getFollowersUsers.service";
import getFollowingUsersService from "./followers/getFollowingUsers.service";

const getUsersService = async (
	username: string
): Promise<iUsersWithoutPass> => {
	const retrivedUser = await User.findOne({
		where: { username, deletedAt: null },
	});

	if (!retrivedUser) {
		throw new AppError("Usuário não encontrado", 404);
	}

	const following = await getFollowingUsersService(retrivedUser.id),
		followers = await getFollowersUsersService(retrivedUser.id);

	const userWithFollower = {
		...usersWithoutPassSchema.parse(retrivedUser),
		Following: following,
		Followers: followers,
	};

	return userWithFollower;
};

export default getUsersService;
