import Image from "../../models/Image";
import Post from "../../models/Post";
import User from "../../models/User";
import { postUserImageSchema } from "../../schemas/posts.schema";

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

  return postUserImageSchema.array().parse(retrivedPosts);
};

export default getAllPostsService;
