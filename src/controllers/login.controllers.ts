import { Request, Response } from "express";
import loginService from "../services/login.service";

const loginController = async (req: Request, res: Response) => {
	const tokenUser = await loginService(req.body);

	return res.status(200).json(tokenUser);
};

export { loginController };
