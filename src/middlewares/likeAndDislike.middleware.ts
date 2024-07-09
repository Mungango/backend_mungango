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
		console.log();

		if (like) {
			console.log("if like");

			if (like.dataValues.type == payload.type) {
				console.log("segundo if");

				await model.destroy({
					where: { ownerId: payload.ownerId, userId: payload.userId },
				});
			}
			if (like.dataValues.type !== payload.type) {
				console.log("terceiro if");

				await model.update(payload, {
					where: { ownerId: payload.ownerId, userId: payload.userId },
				});
			}
		} else {
			console.log("before else");

			await model.create(payload);
			console.log("after else");
		}
	} catch (error) {
		console.error(error);
		throw new AppError(
			`Não foi possível resistrar o ${payload.type} no ${tableName}`,
			400
		);
	}
};

export default likeAndDislike;
