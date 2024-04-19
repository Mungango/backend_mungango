import Post from "../../models/Post.js";

const deletePostsService = async (id) => {
  const deletedAt = new Date();

  const deletedPost = await Post.destroy({ where: { id } });

};

export default deletePostsService;
