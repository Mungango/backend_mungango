import Comment from "../../models/Comment";
import Post from "../../models/Post";
import User from "../../models/User";
import { commentUserSchema } from "../../schemas/comments.schema";

const getAllCommentsService = async (postId: number) => {
  const retrivedComments = await Comment.findAll({
    where: {
      PostId: postId,
    },
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

  return commentUserSchema.array().parse(retrivedComments);
};

export default getAllCommentsService;
