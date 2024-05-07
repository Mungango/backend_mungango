import Image from "../../models/Image";
import Post from "../../models/Post";
import Comment from "../../models/Comment";
import LikesPost from "../../models/likesPost";

import { postUserImageLikeSchema } from "../../schemas/posts.schema";
import User from "../../models/User";

const getUserAllPostsService = async (id: number) => {
	const retrivedPosts = await Post.findAll({
		include: [
			{
				model: User,
				where: { deletedAt: null, id },
			},
			{ model: Image }, //inscluindo o model de Image e User de acordo com os posts
		],
	});

	// Para cada post, obtemos as contagens de likes e dislikes
	const postsWithLikesAndDislikes = await Promise.all(
		retrivedPosts.map(async (post) => {
			const like = await LikesPost.count({
				where: { ownerId: post.dataValues.id, type: "like" },
			});

			const dislike = await LikesPost.count({
				where: { ownerId: post.dataValues.id, type: "dislike" },
			});

			return {
				...post.dataValues,
				like,
				dislike,
			};
		})
	);

	return postUserImageLikeSchema.array().parse(postsWithLikesAndDislikes);
};

export default getUserAllPostsService;
