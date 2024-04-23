import { AppError } from "../../errors";
import Comment from "../../models/Comment";
import { commentsCreateSchema } from "../../schemas/comments.schema";

// Lembrar de validar quando usuario não existir mais, mesmo tendo um token válido o usuário pode não
// existir mais, por conta da validade do token de 72h
const createCommentsService = async (postId: number, userId: number, payload:any) => {
  const createComment = await Comment.create({ ...payload, PostId: postId, UserId: userId });

  if (!createComment) {
    throw new AppError("No foi possível criar o comentário", 404);
  }

  return commentsCreateSchema.parse(createComment);
};

export default createCommentsService;
