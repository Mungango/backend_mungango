import { iCommentUserNoUserId } from "../../interfaces/comment.interface";
import Comment from "../../models/Comment";
import Post from "../../models/Post";
import User from "../../models/User";
import LikesComment from "../../models/likesComment";
import { commentUserNoUserIdSchema } from "../../schemas/comments.schema";

const getAllCommentsService = async (
  postId: number
): Promise<iCommentUserNoUserId[]> => {
  const retrivedComments = await Comment.findAll({
    where: {
      postId,
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

  // Para cada post, obtemos as contagens de likes e dislikes
  const commentsWithLikesAndDislikes = await Promise.all(
    retrivedComments.map(async (comment) => {
      const like = await LikesComment.count({
        where: { ownerId: comment.dataValues.id, type: "like" },
      });

      const dislike = await LikesComment.count({
        where: { ownerId: comment.dataValues.id, type: "dislike" },
      });

      return {
        ...comment.dataValues,
        like,
        dislike,
      };
    })
  );

  return commentUserNoUserIdSchema.array().parse(commentsWithLikesAndDislikes);
};

export default getAllCommentsService;
