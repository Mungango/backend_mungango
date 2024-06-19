import { AppError } from "../../errors";
import User from "../../models/User";
import Post from "../../models/Post";
import Image from "../../models/Image";
import LikesPost from "../../models/likesPost";

import { postUserImageLikeSchema } from "../../schemas/posts.schema";
import Comment from "../../models/Comment";

const getPostsService = async (id: number) => {
	const like = await LikesPost.count({
		where: { ownerId: id, type: "like" },
	});

	const dislike = await LikesPost.count({
		where: { ownerId: id, type: "dislike" },
	});

	const comment = await Comment.count({
		where: {
			postId: id,
		},
	});

	const retrivedPost = await Post.findOne({
		where: { id },
		include: [
			{
				model: User,
				where: { deletedAt: null },
			},
			{
				model: Image,
			},
		],
	});

	// quando o usuário estiver soft deletado isso vai igual a true
	if (!retrivedPost) {
		throw new AppError("Post não encontrado", 404);
	}

	const dataPost = { like, dislike, comment, ...retrivedPost.dataValues };

	return postUserImageLikeSchema.parse(dataPost);
};

export default getPostsService;
