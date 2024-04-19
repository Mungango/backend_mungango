import Post from "../../models/Post.js";


const createPostsService = async (payload) => {
	const createPost = await Post.create(payload);

	return createPost;
};

export default createPostsService;
