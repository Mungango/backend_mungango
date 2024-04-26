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

  return postUserImageLikeSchema.array().parse(retrivedPosts);
};

export default getAllPostsService;
