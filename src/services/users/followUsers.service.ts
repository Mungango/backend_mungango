import { AppError } from "../../errors";
import { iFollowerCreate } from "../../interfaces/follower.interface";
import Follower from "../../models/Follower";

const followUsersService = async (payload: iFollowerCreate) => {
	const checkFollow = await Follower.findOne({
		where: { followerId: payload.followerId },
	});

	if (checkFollow) {
		throw new AppError("Usuário já seguido", 400);
	}

	const followedUser = await Follower.create(payload);

	return followedUser;
};

export default followUsersService;
