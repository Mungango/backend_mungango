import { AppError } from "../../errors";
import {
	iComment,
	iCommentCreateNoIDs,
} from "../../interfaces/comment.interface";
import Comment from "../../models/Comment";
import { commentsSchema } from "../../schemas/comments.schema";

// Lembrar de validar quando usuario não existir mais, mesmo tendo um token válido o usuário pode não
// existir mais, por conta da validade do token de 72h
const createCommentsService = async (
	postId: number,
	userId: number,
	payload: iCommentCreateNoIDs
): Promise<iComment> => {
	const createComment = await Comment.create({
		...payload,
		postId,
		userId,
	});

	if (!createComment) {
		throw new AppError("Não foi possível criar o comentário", 404);
	}

	return commentsSchema.parse(createComment);
};

export default createCommentsService;
