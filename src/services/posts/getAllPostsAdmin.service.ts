import Comment from "../../models/Comment";
import Image from "../../models/Image";
import Post from "../../models/Post";
import User from "../../models/User";
import LikesPost from "../../models/likesPost";

import { postUserImageLikeSchema } from "../../schemas/posts.schema";

const getAllPostsAdminService = async (page: number, limit: number) => {
	const offset = (page - 1) * limit;

	const retrivedPosts = await Post.findAndCountAll({
		limit,
		offset,
		include: [
			{
				model: User,
				where: { role: "admin", deletedAt: null },
			},
			{ model: Image },
		],
		order: [["createdAt", "DESC"]],
	});

	// Para cada post, obtemos as contagens de likes e dislikes e comentários
	const postsWithLikesDislikesAndComments = await Promise.all(
		retrivedPosts.rows.map(async (post) => {
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

	const postsImageLikesCount = {
		count: retrivedPosts.count,
		raw: postsWithLikesDislikesAndComments,
	};

	return postUserImageLikeSchema.parse(postsImageLikesCount);
};

export default getAllPostsAdminService;
