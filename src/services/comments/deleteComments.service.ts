import { AppError } from "../../errors";
import Comment from "../../models/Comment";

const deleteCommentsService = async (
	id: number,
	userId: number
): Promise<void> => {
	const commentData = await Comment.findOne({ where: { id } });

	if (commentData?.dataValues.userId != userId) {
		throw new AppError("Você não é o proprietário desse comentário!", 403);
	}

	await Comment.destroy({ where: { id } });
};

export default deleteCommentsService;
