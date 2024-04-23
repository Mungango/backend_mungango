import { AppError } from "../../errors";
import Comment from "../../models/Comment";

const deleteCommentsService = async (id: number, userId: number) => {
	const commentData: any = await Comment.findOne({ where: { id } });

	if (commentData.UserId != userId) {
		throw new AppError("Você não é o proprietário desse comentário!", 403);
	}

	await Comment.destroy({ where: { id } });
};

export default deleteCommentsService;
