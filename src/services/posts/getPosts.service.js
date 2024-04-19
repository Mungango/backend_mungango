import { AppError } from "../../errors.js";
import Post from "../../models/Post.js";

const getPostsService = async (id) => {
  const retrivedPost = await Post.findOne({
    where: { id },
  });

  if (!retrivedPost) {
    throw new AppError("Post não encontrado", 404);
  }

  return retrivedPost;
};

export default getPostsService;
