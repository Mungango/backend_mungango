import Post from "../../models/Post.js";

const deletePostsService = async (id) => {
  const deletedAt = new Date();

  const deletedPost = await Post.destroy({ where: { id } });

  if (!deletedPost[0]) {
    throw new AppError("Post não encontrado", 404);
  }
};

export default deletePostsService;
