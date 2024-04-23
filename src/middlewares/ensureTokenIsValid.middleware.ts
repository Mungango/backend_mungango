import { AppError } from "../errors";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { NextFunction, Request, Response } from "express";

const ensureTokenIsValidMiddleware = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	let token = request.headers.authorization;

	if (!token) {
		throw new AppError("Token de acesso não encontrado", 401);
	}

	token = token.split(" ")[1];

	jwt.verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {
		if (error) {
			throw new AppError("Token de acesso inválido", 401);
		}

		request.user = {
			id: parseInt(decoded.sub),
		};

		return next();
	});
};

export default ensureTokenIsValidMiddleware;
