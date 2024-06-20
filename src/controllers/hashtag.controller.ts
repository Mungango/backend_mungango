import { Request, Response } from "express";
import createHashtagService from "../services/hashtags/createHashtag.service";
import getHashtagService from "../services/hashtags/getHashtag.service";
import getAllHashtagService from "../services/hashtags/getAllHashtag.service";

// const createHashtagController = async (req: Request, res: Response) => {
// 	const payload = req.body;

// 	const createdHashtag = await createHashtagService(payload);

// 	return res.status(201).json(createdHashtag);
// };

const getAllHashtagController = async (req: Request, res: Response) => {
	const retrivedHashtags = await getAllHashtagService();

	return res.status(200).json(retrivedHashtags);
};

const getHashtagController = async (req: Request, res: Response) => {
	const id: number = Number(req.params.id);

	const retrivedHashtag = await getHashtagService(id);

	return res.status(200).json(retrivedHashtag);
};

export {
	// createHashtagController,
	getAllHashtagController,
	getHashtagController,
};
