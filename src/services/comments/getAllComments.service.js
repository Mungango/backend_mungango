import Comment from "../../models/Comment.js";
import Post from "../../models/Post.js";
import User from "../../models/User.js";
import { commentUserSchema } from "../../schemas/comments.schema.js";

const getAllCommentsService = async (postId) => {
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
