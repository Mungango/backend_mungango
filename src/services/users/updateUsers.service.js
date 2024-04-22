import { compare } from "bcrypt";
import User from "../../models/User.js";
import { usersWithoutPassSchema } from "../../schemas/users.schema.js";
import { AppError } from "../../errors.js";

const updateUsersService = async (id, payload) => {
	const afterUser = await User.findOne({ where: { id } }),
		oldPassword = afterUser.password,
		newPassword = payload?.password;

	const IsSamePass = await compare(newPassword, oldPassword);

	if (IsSamePass) {
		throw new AppError("Password já está em uso", 400);
	}

	await User.update(payload, {
		where: { id, deletedAt: null },
		individualHooks: true,
	});

	const updatedUser = await User.findOne({ where: { id } });

	const updatedUserWithoutPass = usersWithoutPassSchema.parse(updatedUser);

	return updatedUserWithoutPass;
};

export default updateUsersService;
