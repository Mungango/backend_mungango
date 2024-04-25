import Follower from "../../../models/Follower";
import { followersSchema } from "../../../schemas/followers.schema";

const getFollowingUsersService = async (id: number) => {
	const checkFollowing = await Follower.findAll({
		where: { userId: id },
	});

	// return followersSchema.array().parse(checkFollowing);
	return { count: checkFollowing.length, following: checkFollowing };
};

export default getFollowingUsersService;
