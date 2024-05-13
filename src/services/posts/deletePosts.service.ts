import { AppError } from "../../errors";
import Post from "../../models/Post";

const deletePostsService = async (id: number, userId: number) => {
	const postData: any = await Post.findOne({ where: { id } });

	if (postData.dataValues.userId != userId) {
		throw new AppError("Você não é o proprietário desse post!", 403);
	}

	await Post.destroy({ where: { id } });
};

export default deletePostsService;
