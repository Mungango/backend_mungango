import { AppError } from "../../errors";
import User from "../../models/User";
import Post from "../../models/Post";
import Image from "../../models/Image";
import LikesPost from "../../models/likesPost";

import { postUserImageSchema } from "../../schemas/posts.schema";

const getPostsService = async (id: number) => {
  const retrivedPost = await Post.findOne({
    where: { id },
    include: [
      {
        model: User,
        where: { deletedAt: null },
      },
      {
        model: Image,
      },
      {
        model: LikesPost,
      },
    ],
  });

  // quando o usuário estiver soft deletado isso vai igual a true
  if (!retrivedPost) {
    throw new AppError("Post não encontrado", 404);
  }

  return postUserImageSchema.parse(retrivedPost);
};

export default getPostsService;
