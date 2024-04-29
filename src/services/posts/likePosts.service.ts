import { AppError } from "../../errors";
import { ilikesPostCreate } from "../../interfaces/likesPost.interface";
import LikesPost from "../../models/likesPost";

const likePostsService = async (data: ilikesPostCreate) => {
  const like = await LikesPost.findOne({
    where: { ownerId: data.ownerId, userId: data.userId },
  });

  if (like) {
    if (
      like.dataValues.type == data.type ||
      (like.dataValues.type == "dislike" && data.type == "dislike")
    ) {
      await LikesPost.destroy({
        where: { ownerId: data.ownerId, userId: data.userId },
      });
    }
    if (like.dataValues.type == "dislike" && data.type == "dislike") {
      await LikesPost.destroy({
        where: { ownerId: data.ownerId, userId: data.userId },
      });
    }
  } else {
    await LikesPost.create(data);
  }
};

export default likePostsService;
