import { AppError } from "../../errors.js";
import User from "../../models/User.js";
import Post from "../../models/Post.js";
import { usersUpdateSchema, usersWithoutPassSchema } from "../../schema/users.schema.js";

const getPostsService = async (id) => {
  const retrivedPost = await Post.findOne({
    where: { id },
  });
  console.log(retrivedPost);

  const userId = retrivedPost.UserId;

  const userData = await User.findOne({ where: { id: userId } });

  const userWithoutPass = usersWithoutPassSchema.parse(userData);

  const postWithUser = {
    ...retrivedPost.dataValues,
    user: userWithoutPass,
  };

  console.log(postWithUser);

  return postWithUser;
};

export default getPostsService;
