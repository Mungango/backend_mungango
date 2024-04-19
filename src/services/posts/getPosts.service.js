import { AppError } from "../../errors.js";
import User from "../../models/User.js";
import Post from "../../models/Post.js";
import { usersUpdateSchema, usersWithoutPassSchema } from "../../schema/users.schema.js";

const getPostsService = async (id) => {
  const retrivedPost = await Post.findOne({
    where: { id },
  });

  const userId = retrivedPost.UserId;

  const userData = await User.findOne({ where: { id: userId } });

  const userWithoutPass = usersUpdateSchema.parse(userData)

  const data = {
    ...retrivedPost,
    user: userWithoutPass,
  };

  console.log(data);

  return data;
};

export default getPostsService;
