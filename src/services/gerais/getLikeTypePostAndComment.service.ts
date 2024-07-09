import { AppError } from "../../errors";
import { iLikesPostCommentType } from "../../interfaces/geralLike.inteface";
import { geralLikesPostCommentSchemaWithout } from "../../schemas/geralLike.schema";

const getLikeTypePostAndCommentService = async (
  model: any,
  payload: iLikesPostCommentType // Esse tipo serve para os dois models
) => {
  try {
    const likeType = await model.findOne({
      where: { ownerId: payload.ownerId, userId: payload.userId },
    });

    if (likeType) {
      return geralLikesPostCommentSchemaWithout.parse(likeType);
    } else {
      return;
    }
  } catch (error) {
    console.error(error);
    throw new AppError(
      `Houve um erro ao buscar o tipo de like no ${model.tableName}`,
      400
    );
  }
};

export default getLikeTypePostAndCommentService;
