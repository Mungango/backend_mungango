import { Request, Response } from "express";
import loginService from "../services/login.service";

const loginController = async (req: Request, res: Response) => {
	const token = await loginService(req.body);

	return res.status(200).json({ token });
};

export { loginController };
