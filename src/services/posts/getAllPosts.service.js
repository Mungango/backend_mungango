import Post from "../../models/Post.js";

const getAllPostsService = async () => {
  const retrivedPosts = await Post.findAll();

  return retrivedPosts;
};

export default getAllPostsService;
