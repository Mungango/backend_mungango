import { AppError } from "../../errors";
import Post from "../../models/Post";

const updatePostsService = async (id: number, payload: any, userId: number) => {
  const postData: any = await Post.findOne({ where: { id } });

  if (postData.UserId != userId) {
    throw new AppError("Você não é o proprietário desse post!", 403);
  }

  await Post.update(payload, {
    where: { id },
  });

  const updatedPost = await Post.findOne({ where: { id } });

  return updatedPost;
};

export default updatePostsService;
