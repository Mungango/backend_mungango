import Follower from "../../../models/Follower";
import User from "../../../models/User";
import { usersWithoutPassSchema } from "../../../schemas/users.schema";

const getFollowersUsersService = async (id: number) => {
	const checkFollowers = await Follower.findAndCountAll({
		where: {
			followerId: id,
		},
	});

	const followersIds = checkFollowers.rows.map((row) => row.userId);

	const followers = await User.findAll({
		limit: 10,
		where: { id: followersIds },
	});

	return {
		count: checkFollowers.count,
		raw: usersWithoutPassSchema.array().parse(followers),
	};
};

export default getFollowersUsersService;
