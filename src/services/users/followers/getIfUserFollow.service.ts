import { iFollowerCreate } from "../../../interfaces/follower.interface";
import Follower from "../../../models/Follower";

const getIfUserFollowService = async (payload: iFollowerCreate) => {
	const checkFollow = await Follower.findOne({
		where: { followerId: payload.followerId, userId: payload.userId },
	});

	return checkFollow;
};

export default getIfUserFollowService;
