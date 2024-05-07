import Follower from "../../../models/Follower";
import User from "../../../models/User";
import { followersSchema } from "../../../schemas/followers.schema";
import { usersWithoutPassSchema } from "../../../schemas/users.schema";

const getFollowersUsersService = async (id: number) => {
	const checkFollowers = await Follower.findAndCountAll({
		where: { followerId: id },
	});

	const followersIds = checkFollowers.rows.map((row) => row.followerId);

	const followers = await User.findAll({ where: { id: followersIds } });

	return {
		count: checkFollowers.count,
		Followers: usersWithoutPassSchema.array().parse(followers),
	};
};

export default getFollowersUsersService;
