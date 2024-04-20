import { AppError } from "../errors.js";
import jwt from "jsonwebtoken";
import "dotenv/config";

const ensureTokenIsValidMiddleware = async (
	request,
	response,
	next
) => {
	let token = request.headers.authorization;

	if (!token) {
		throw new AppError("Token de acesso não encontrado", 401);
	}

	token = token.split(" ")[1];

	jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
		if (error) {
			throw new AppError("Jwt token não encontrado", 401);
		}

		request.user = {
			id: parseInt(decoded.sub)
		};

		return next();
	});
};

export default ensureTokenIsValidMiddleware;