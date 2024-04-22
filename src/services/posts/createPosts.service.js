import Post from "../../models/Post.js";
import { postsSchema } from "../../schemas/posts.schema.js";

// Lembrar de validar quando usuario não existir mais, mesmo tendo um token válido o usuário pode não
// existir mais, por conta da validade do token de 72h
const createPostsService = async (userId, payload) => {
  const createPost = await Post.create({ ...payload, UserId: userId });

  if (!createPost) {
    throw new AppError("No foi possível criar o post", 404);
  }

  return postsSchema.parse(createPost);
};

export default createPostsService;
