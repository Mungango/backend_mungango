import { compare } from "bcrypt";
import User from "../../models/User";
import { usersWithoutPassSchema } from "../../schemas/users.schema";
import { AppError } from "../../errors";
import { iUserUpdate, iUsersWithoutPass } from "../../interfaces/user.interface";

const updateUsersService = async (id: number, payload: iUserUpdate):Promise<iUsersWithoutPass> => {
	const afterUser: any = await User.findOne({ where: { id } }),
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
		individualHooks: true,
	});

	const updatedUser = await User.findOne({ where: { id } });

	const updatedUserWithoutPass: iUsersWithoutPass = usersWithoutPassSchema.parse(updatedUser);

	return updatedUserWithoutPass;
};

export default updateUsersService;
