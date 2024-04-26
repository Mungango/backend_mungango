import Follower from "../../../models/Follower";
import { followersSchema } from "../../../schemas/followers.schema";

const getFollowersUsersService = async (id: number) => {
	const checkFollowers = await Follower.findAndCountAll({
		where: { followerId: id },
	});

	// return followersSchema.array().parse(checkFollowers);
	return checkFollowers;
};

export default getFollowersUsersService;
