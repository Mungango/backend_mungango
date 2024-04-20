import { AppError } from "../../errors.js";
import Post from "../../models/Post.js";
import { postsSchema } from "../../schema/posts.schema.js";

const updatePostsService = async (id, payload) => {
  await Post.update(payload, {
    where: { id },
  });

  const updatedPost = await Post.findOne({ where: { id } });

  return updatedPost;
};

export default updatePostsService;
