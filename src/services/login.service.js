import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { compare } from "bcrypt";
import { AppError } from "../errors.js";
import "dotenv/config";

const loginService = async (loginDate) => {
	const user = await User.findOne({
		where: {
			email: loginDate.email,
			deletedAt: null
		},
	});

	if (!user) {
		throw new AppError("Credenciais inválidas", 401);
	}

	const matchPass = await compare(loginDate.password, user.password);

	if (!matchPass) {
		throw new AppError("Credenciais inválidas", 401);
	}
	
	// Se precisar de um payload colcoar antes do process.env
	//{ admin: user.admin }
	const token = jwt.sign({}, process.env.SECRET_KEY, {
		expiresIn: "72h",
		subject: user.id.toString(),
	});

	return token;
};

export default loginService;
