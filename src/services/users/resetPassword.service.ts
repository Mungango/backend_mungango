import User from "../../models/User";
import { AppError } from "../../errors";
import { Op } from "sequelize";

const resetPasswordService = async (token: string, password: string) => {
	const user = await User.findOne({
		where: {
			resetPasswordToken: token,
			resetPasswordExpires: { [Op.gt]: Date.now() },
		},
	});

	if (!user) {
		throw new AppError("Token inválido ou expirado", 400);
	}

	const payload = {
		password,
		resetPasswordToken: null,
		resetPasswordExpires: null,
	};
	await User.update(payload, {
		where: { id: user.id },
		individualHooks: true,
	});
};

export default resetPasswordService;
