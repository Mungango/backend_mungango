import { iFollowerCreate } from "../../../interfaces/follower.interface";
import Follower from "../../../models/Follower";

const followUsersService = async (payload: iFollowerCreate) => {
	const checkFollow = await Follower.findOrCreate({
		where: { followerId: payload.followerId, userId: payload.userId },
		defaults: { ...payload },
	});

	return checkFollow;
};

export default followUsersService;
