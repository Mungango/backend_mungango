import Follower from "../../../models/Follower";
import User from "../../../models/User";
import { followersSchema } from "../../../schemas/followers.schema";
import { usersWithoutPassSchema } from "../../../schemas/users.schema";

const getFollowingUsersService = async (id: number) => {
	const checkFollowing = await Follower.findAndCountAll({
		where: { userId: id },
	});

	const followingIds = checkFollowing.rows.map((row) => row.followerId);

	const following = await User.findAll({ where: { id: followingIds } });

	return {
		count: checkFollowing.count,
		following: usersWithoutPassSchema.array().parse(following),
	};
};

export default getFollowingUsersService;
