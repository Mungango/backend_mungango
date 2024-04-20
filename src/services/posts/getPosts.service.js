import { AppError } from "../../errors.js";
import User from "../../models/User.js";
import Post from "../../models/Post.js";
import { postUserSchema } from "../../schemas/posts.schema.js";

const getPostsService = async (id) => {
	const retrivedPost = await Post.findOne({
		where: { id },
		include: [
			{
				model: User,
				where: { deletedAt: null },
			},
		],
	});

	// quando o usuário estiver soft deletado isso vai igual a true
	if (!retrivedPost) {
		throw new AppError("Post não encontrado", 404);
	}

	return postUserSchema.parse(retrivedPost);
};

export default getPostsService;
