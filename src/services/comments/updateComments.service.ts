import { AppError } from "../../errors";
import { iCommentCreateNoIDs } from "../../interfaces/comment.interface";
import Comment from "../../models/Comment";
import { commentsUpdateSchema } from "../../schemas/comments.schema";

const updateCommentsService = async (
	id: number,
	payload: iCommentCreateNoIDs,
	userId: number
) => {
	const commentData = await Comment.findOne({ where: { id } });

	if (commentData?.dataValues.userId != userId) {
		throw new AppError("Você não é o proprietário desse comentário!", 403);
	}

	await Comment.update(payload, {
		where: { id },
	});

	const updatedComment = await Comment.findOne({ where: { id } });

	return commentsUpdateSchema.parse(updatedComment);
};

export default updateCommentsService;
