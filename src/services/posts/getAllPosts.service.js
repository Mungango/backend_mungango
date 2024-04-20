import Post from "../../models/Post.js";
import User from "../../models/User.js";
import { postUserSchema } from "../../schema/posts.schema.js";

const getAllPostsService = async () => {
	const retrivedPosts = await Post.findAll({
		include: [
			{
				model: User,
				where: { deletedAt: null },
			},
		],
	});
  
	return postUserSchema.array().parse(retrivedPosts);
};

export default getAllPostsService;
