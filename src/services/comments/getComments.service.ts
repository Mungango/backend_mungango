import { AppError } from "../../errors";
import User from "../../models/User";
import Post from "../../models/Post";
import Comment from "../../models/Comment";

import { commentUserSchema } from "../../schemas/comments.schema";

const getCommentsService = async (id: number) => {
	const retrivedComment = await Comment.findOne({
		where: { id },
		include: [
			{
				model: User,
				where: { deletedAt: null },
			},
			{
				model: Post,
			},
		],
	});

	// quando o usuário estiver soft deletado isso vai igual a true
	if (!retrivedComment) {
		throw new AppError("Comentário não encontrado", 404);
	}

	return commentUserSchema.parse(retrivedComment);
};

export default getCommentsService;
