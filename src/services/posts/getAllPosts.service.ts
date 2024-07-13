import Comment from "../../models/Comment";
import Image from "../../models/Image";
import Post from "../../models/Post";
import User from "../../models/User";
import LikesPost from "../../models/likesPost";

import { postUserImageLikeSchema } from "../../schemas/posts.schema";

const getAllPostsService = async (page: number, limit: number) => {
  const offset = (page - 1) * limit;
  const retrivedPosts = await Post.findAll({
    limit,
    offset,
    include: [
      {
        model: User,
        where: { deletedAt: null },
      },
      { model: Image },
    ],
    order: [["createdAt", "DESC"]],
  });

  // Para cada post, obtemos as contagens de likes e dislikes
  const postsWithLikesDislikesAndComments = await Promise.all(
    retrivedPosts.map(async (post) => {
      const like = await LikesPost.count({
        where: { ownerId: post.dataValues.id, type: "like" },
      });

      const dislike = await LikesPost.count({
        where: { ownerId: post.dataValues.id, type: "dislike" },
      });

      const comment = await Comment.count({
        where: {
          postId: post.dataValues.id,
        },
      });

      return {
        ...post.dataValues,
        like,
        dislike,
        comment,
      };
    })
  );

  const count = await Post.count();

  const postsImageLikesCount = {
    count,
    raw: postsWithLikesDislikesAndComments,
  };

  return postUserImageLikeSchema.parse(postsImageLikesCount);
};

export default getAllPostsService;
