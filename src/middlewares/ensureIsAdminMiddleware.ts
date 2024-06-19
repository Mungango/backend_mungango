import { AppError } from "../errors";
import { NextFunction, Request, Response } from "express";

const ensureIsAdminMiddleware = async (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const role = request.user.role;

	if (role == "admin") {
		return next();
	} else {
		throw new AppError("Você precisa ser admin para acessar essa área!", 401);
	}
};

export default ensureIsAdminMiddleware;
