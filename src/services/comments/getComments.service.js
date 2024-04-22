import { AppError } from "../../errors.js";
import User from "../../models/User.js";
import Post from "../../models/Post.js";
import Comment from "../../models/Comment.js";

import { commentUserSchema } from "../../schemas/comments.schema.js";

const getCommentsService = async (id) => {
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
