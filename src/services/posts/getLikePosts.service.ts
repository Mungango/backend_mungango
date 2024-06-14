import LikesPost from "../../models/likesPost";

const getLikePostsService = async (data: {
	ownerId: number;
	userId: number;
}) => {
	const like = await LikesPost.findOne({
		where: { ownerId: data.ownerId, userId: data.userId },
	});

	return like;
};

export default getLikePostsService;
