import Follower from "../../../models/Follower";
import { followersSchema } from "../../../schemas/followers.schema";

const getFollowingUsersService = async (id: number) => {
	const checkFollowing = await Follower.findAndCountAll({
		where: { userId: id },
	});

	// return followersSchema.array().parse(checkFollowing);
	return checkFollowing;
};

export default getFollowingUsersService;
