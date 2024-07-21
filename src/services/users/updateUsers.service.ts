import { compare } from "bcrypt";
import User from "../../models/User";
import { usersWithoutPassSchema } from "../../schemas/users.schema";
import { AppError } from "../../errors";
import {
	iUserUpdate,
	iUsersWithoutPass,
} from "../../interfaces/user.interface";
import { Op } from "sequelize";

const updateUsersService = async (
	id: number,
	payload: iUserUpdate
): Promise<iUsersWithoutPass> => {
	// Verificar se o username já está em uso por outro usuário
	if (payload.username) {
		const existingUser = await User.findOne({
			where: { username: payload.username, id: { [Op.ne]: id } },
		});

		if (existingUser) {
			throw new AppError("Username não disponível", 400);
		}
	}

	const afterUser = await User.findOne({ where: { id } }),
		oldPassword = afterUser!.password,
		newPassword = payload?.password;

	if (newPassword) {
		const IsSamePass = await compare(newPassword, oldPassword);

		if (IsSamePass) {
			throw new AppError("Password já está em uso", 400);
		}
	}

	await User.update(payload, {
		where: { id, deletedAt: null },
	});

	const updatedUser = await User.findOne({ where: { id } });

	const updatedUserWithoutPass: iUsersWithoutPass =
		usersWithoutPassSchema.parse(updatedUser);

	return updatedUserWithoutPass;
};

export default updateUsersService;
