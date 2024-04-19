import Post from "../../models/Post.js";
import { postsSchema } from "../../schema/posts.schema.js";

const createPostsService = async (payload) => {
  const createPost = await Post.create(payload);

  if (!createPost) {
    throw new AppError("No foi possível criar o post", 404);
  }

  return postsSchema.parse(createPost);
};

export default createPostsService;
