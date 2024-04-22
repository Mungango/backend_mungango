import { AppError } from "../../errors.js";
import Post from "../../models/Post.js";

const deletePostsService = async (id, userId) => {
  const deletedAt = new Date();

  const postData = await Post.findOne({where: { id }})
  
  if(postData.UserId != userId){

    throw new AppError("Você não é o proprietário desse post!", 403)
  }

  const deletedPost = await Post.destroy({ where: { id } });

};

export default deletePostsService;
