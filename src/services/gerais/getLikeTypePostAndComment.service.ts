import { AppError } from "../../errors";
import { iLikesPostCommentType } from "../../interfaces/geralLike.inteface";
import { geralLikesPostCommentSchemaWithout } from "../../schemas/geralLike.schema";

const getLikeTypePostAndCommentService = async (
	model: any,
	payload: iLikesPostCommentType // Esse tipo serve para os dois models
) => {
	const likeType = await model.findOne({
		where: { ownerId: payload.ownerId, userId: payload.userId },
	});

  if(!likeType){
    return "bitch"
  }

	return geralLikesPostCommentSchemaWithout.parse(likeType);
};

export default getLikeTypePostAndCommentService;
