import jwt from "jsonwebtoken";
import User from "../models/User";
import { compare } from "bcrypt";
import { AppError } from "../errors";
import { iLogin } from "../interfaces/login.interface";
import "dotenv/config";
import { usersWithoutPassSchema } from "../schemas/users.schema";
import getFollowingUsersService from "./users/followers/getFollowingUsers.service";
import getFollowersUsersService from "./users/followers/getFollowersUsers.service";

const loginService = async (loginDate: iLogin) => {
	const user = await User.findOne({
		where: {
			email: loginDate.email,
			deletedAt: null,
		},
	});

	if (!user) {
		throw new AppError("Credenciais inválidas", 401);
	}

	const following = await getFollowingUsersService(user.id),
		followers = await getFollowersUsersService(user.id);

	const matchPass = await compare(loginDate.password, user.password);

	if (!matchPass) {
		throw new AppError("Credenciais inválidas", 401);
	}

	// Se precisar de um payload colcoar antes do process.env
	//{ admin: user.admin }
	const token = jwt.sign({ role: user.role }, process.env.SECRET_KEY!, {
		expiresIn: "72h",
		subject: user.id.toString(),
	});

	const userWithFollower = {
		...usersWithoutPassSchema.parse(user),
		Following: following,
		Followers: followers,
	};

	return { accessToken: token, User: userWithFollower };
};

export default loginService;
