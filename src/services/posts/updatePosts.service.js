import { AppError } from "../../errors.js";
import Post from "../../models/Post.js";

const updatePostsService = async (id, payload) => {
  const updatedPost = await Post.update(payload, {
    where: { id },
  });

  if (!updatedPost[0]) {
    throw new AppError("Post não encontrado", 404);
  }

  return updatedPost;
};

export default updatePostsService;
