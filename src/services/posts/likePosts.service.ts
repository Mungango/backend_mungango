import { AppError } from "../../errors";
import { ilikesPostCreate } from "../../interfaces/likesPost.interface";
import LikesPost from "../../models/likesPost";


const likePostsService = async (data: ilikesPostCreate) => {
  await LikesPost.create(data)
};

export default likePostsService;
