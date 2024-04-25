import Follower from "../../../models/Follower";
import { followersSchema } from "../../../schemas/followers.schema";

const getFollowersUsersService = async (id: number) => {
	const checkFollowers = await Follower.findAll({
		where: { followerId: id },
	});

	// return followersSchema.array().parse(checkFollowers);
	return { count: checkFollowers.length, followers: checkFollowers };
};

export default getFollowersUsersService;
