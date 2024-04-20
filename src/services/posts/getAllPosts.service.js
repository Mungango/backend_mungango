import Post from "../../models/Post.js";
import User from "../../models/User.js";
import { postUserSchema } from "../../schema/posts.schema.js";

const getAllPostsService = async () => {
  const retrievedPosts = await Post.findAll({
    include: [{ model: User }],
  });

  const postsWithUsers = retrievedPosts.map((post) => {
    const user = post.User ? post.User.toJSON() : null;
    return {
      ...post.toJSON(),
      user: user
        ? postUserSchema.pick({ id: true, name: true }).parse(user)
        : null,
    };
  });

  return postsWithUsers;
};

/*
const getAllPostsService = async () => {
  const retrivedPosts = await Post.findAll({
    include: [
      {
        model: User,
      },
    ],
  });
  
  console.log(retrivedPosts);
  
  return postUserSchema.array().parse(retrivedPosts);
};
*/

export default getAllPostsService;
