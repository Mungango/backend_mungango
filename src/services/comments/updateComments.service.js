import Comment from "../../models/Comment.js";
import { commentsUpdateSchema } from "../../schemas/comments.schema.js";

const updateCommentsService = async (id, payload, userId) => {
  const commentData = await Comment.findOne({ where: { id } });

  if (commentData.UserId != userId) {
    throw new AppError("Você não é o proprietário desse comentário!", 403);
  }

  await Comment.update(payload, {
    where: { id },
  });

  const updatedComment = await Comment.findOne({ where: { id } });

  return commentsUpdateSchema.parse(updatedComment);
};

export default updateCommentsService;
