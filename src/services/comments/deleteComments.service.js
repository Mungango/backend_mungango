import { AppError } from "../../errors.js";
import Comment from "../../models/Comment.js";

const deleteCommentsService = async (id, userId) => {
  const deletedAt = new Date();

  const commentData = await Comment.findOne({ where: { id } });

  if (commentData.UserId != userId) {
    throw new AppError("Você não é o proprietário desse comentário!", 403);
  }

  await Comment.destroy({ where: { id } });
};

export default deleteCommentsService;
