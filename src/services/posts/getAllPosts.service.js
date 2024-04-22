import Image from "../../models/Image.js";
import Post from "../../models/Post.js";
import User from "../../models/User.js";
import { postUserImageSchema } from "../../schemas/posts.schema.js";

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

	return postUserImageSchema.array().parse(retrivedPosts);
};

export default getAllPostsService;
