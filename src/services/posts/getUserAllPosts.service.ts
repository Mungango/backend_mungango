import Image from "../../models/Image";
import Post from "../../models/Post";
import Comment from "../../models/Comment";
import LikesPost from "../../models/likesPost";

import { postUserImageLikeSchema } from "../../schemas/posts.schema";
import User from "../../models/User";
import { iPostUserImageLikeSchema } from "../../interfaces/post.interface";

const getUserAllPostsService = async (
	id: number,
	page: number,
	limit: number
): Promise<iPostUserImageLikeSchema[]> => {
	const offset = (page - 1) * limit;
	const retrivedPosts = await Post.findAll({
		limit,
		offset,
		include: [
			{
				model: User,
				where: { deletedAt: null, id },
			},
			{ model: Image }, //inscluindo o model de Image e User de acordo com os posts
		],
		order: [["createdAt", "DESC"]], // Ordenar os posts pelo campo 'createdAt' em ordem decrescente
	});

	// Para cada post, obtemos as contagens de likes e dislikes
	const postsWithLikesAndDislikesAndComment = await Promise.all(
		retrivedPosts.map(async (post) => {
			const like = await LikesPost.count({
				where: { ownerId: post.dataValues.id, type: "like" },
			});

			const dislike = await LikesPost.count({
				where: { ownerId: post.dataValues.id, type: "dislike" },
			});

			const comment = await Comment.count({
				where: { postId: post.dataValues.id },
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
		.parse(postsWithLikesAndDislikesAndComment);
};

export default getUserAllPostsService;
