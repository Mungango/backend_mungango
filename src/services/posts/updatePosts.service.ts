import { AppError } from "../../errors";
import { iPostUpdate } from "../../interfaces/post.interface";
import Post from "../../models/Post";

const updatePostsService = async (
	id: number,
	payload: iPostUpdate,
	userId: number
) => {
	const postData = await Post.findOne({ where: { id, userId } });

	if (!postData?.dataValues) {
		throw new AppError("Você não é o proprietário desse post!", 403);
	}

	await Post.update(payload, {
		where: { id },
	});

	const updatedPost = await Post.findOne({ where: { id } });

	return updatedPost;
};

export default updatePostsService;
