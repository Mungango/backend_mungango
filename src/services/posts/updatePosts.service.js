import Post from "../../models/Post.js";

const updatePostsService = async (id, payload, userId) => {
	const postData = await Post.findOne({ where: { id } })
  
	if(postData.UserId != userId){
  
	  throw new AppError("Você não é o proprietário desse post!", 403)
	}

	await Post.update(payload, {
		where: { id },
	});
	
	const updatedPost = await Post.findOne({ where: { id } });

	return updatedPost;
};

export default updatePostsService;
