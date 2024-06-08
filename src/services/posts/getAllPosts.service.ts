import Comment from "../../models/Comment";
import Image from "../../models/Image";
import Post from "../../models/Post";
import User from "../../models/User";
import LikesPost from "../../models/likesPost";

import { postUserImageLikeSchema } from "../../schemas/posts.schema";

const getAllPostsService = async () => {
	const retrivedPosts = await Post.findAll({
		include: [
			{
				model: User,
				where: { deletedAt: null },
			},
			{ model: Image },
		],
	});

	// Para cada post, obtemos as contagens de likes e dislikes
	const postsWithLikesDislikesAndComments = await Promise.all(
		retrivedPosts.map(async (post) => {
			const like = await LikesPost.count({
				where: { ownerId: post.dataValues.id, type: "like" },
			});

			const dislike = await LikesPost.count({
				where: { ownerId: post.dataValues.id, type: "dislike" },
			});

			const comment = await Comment.count({
				where: {
					postId: post.dataValues.id,
				},
			});

			return {
				...post.dataValues,
				like,
				dislike,
				comment,
			};
		})
	);

	return postUserImageLikeSchema
		.array()
		.parse(postsWithLikesDislikesAndComments.reverse());
};

export default getAllPostsService;
