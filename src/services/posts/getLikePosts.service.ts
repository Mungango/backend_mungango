import { ilikesPostCreate } from "../../interfaces/likesPost.interface";
import LikesPost from "../../models/likesPost";

const getLikePostsService = async (data: ilikesPostCreate) => {
	const like = await LikesPost.findOne({
		where: { ownerId: data.ownerId, userId: data.userId },
	});

	return like;
};

export default getLikePostsService;
