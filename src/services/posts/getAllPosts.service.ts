import Image from "../../models/Image";
import Post from "../../models/Post";
import User from "../../models/User";
import LikesPost from "../../models/likesPost";

import { postUserImageLikeSchema } from "../../schemas/posts.schema";

const getAllPostsService = async () => {
  const retrivedPosts = await Post.findAll({
    include: [
      {
        model: User,
        where: { deletedAt: null },
      },
      { model: Image },
    ],
  });

  // Para cada post, obtemos as contagens de likes e dislikes
  const postsWithLikesAndDislikes = await Promise.all(
    retrivedPosts.map(async (post) => {
      const like = await LikesPost.count({
        where: { ownerId: post.dataValues.id, type: "like" },
      });

      const dislike = await LikesPost.count({
        where: { ownerId: post.dataValues.id, type: "dislike" },
      });

      return {
        ...post.dataValues,
        like,
        dislike,
      };
    })
  );

  return postUserImageLikeSchema.array().parse(postsWithLikesAndDislikes);
};

export default getAllPostsService;
