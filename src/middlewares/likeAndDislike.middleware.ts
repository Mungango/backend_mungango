import { AppError } from "../errors";
import { ilikesPostCreate } from "../interfaces/likesPost.interface";

const likeAndDislike = async (
  model: any,
  tableName: string,
  payload: ilikesPostCreate //Esse tipo serve para os dois models
) => {
  try {
    const like = await model.findOne({
      where: { ownerId: payload.ownerId, userId: payload.userId },
    });

    if (like) {
      if (like.dataValues.type == payload.type) {
        await model.destroy({
          where: { ownerId: payload.ownerId, userId: payload.userId },
        });
      }
      if (like.dataValues.type !== payload.type) {
        await model.update(payload, {
          where: { ownerId: payload.ownerId, userId: payload.userId },
        });
      }
    } else {
      await model.create(payload);
    }
  } catch (error) {
    console.error(error);
    throw new AppError(
      `Não foi possível resistrar o ${payload.type} no ${tableName}`,
      404
    );
  }
};
export default likeAndDislike;
