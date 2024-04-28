import { AppError } from "../../errors";
import User from "../../models/User";
import Post from "../../models/Post";
import Comment from "../../models/Comment";

import { commentUserNoUserIdSchema } from "../../schemas/comments.schema";
import { iCommentUserNoUserId } from "../../interfaces/comment.interface";
import LikesComment from "../../models/likesComment";

const getCommentsService = async (
  id: number
): Promise<iCommentUserNoUserId> => {
  const like = await LikesComment.count({
    where: { ownerId: id, type: "like" },
  });

  const dislike = await LikesComment.count({
    where: { ownerId: id, type: "dislike" },
  });

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
  const dataComment = { like, dislike, ...retrivedComment.dataValues };

  return commentUserNoUserIdSchema.parse(dataComment);
};

export default getCommentsService;
