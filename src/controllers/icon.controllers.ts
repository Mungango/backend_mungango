import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { iconWithoutIdSchema } from "../schemas/icon.schema";
import { Request, Response } from "express";
import getAllIconsService from "../services/icons/getAllIcon.service";
import iconService from "../services/icons/icon.service";

const saveIcon = async (path: string) => {
	const icon = await cloudinary.uploader.upload(
		path,
		(error: any, result: { icon: string }) => result
	);
	// cloudinary.uploader.upload é o método que utilizamos para o upload
	// req.file.path é o caminho da nossa Iconm salva pelo multer na pasta upload
	fs.unlink(path, (error) => {
		if (error) {
			console.log(error);
		}
	});
	//fs é uma lib nativa do node.js para manipulação do sistema operacional
	//fs.unlink esta apagando o arquivo da pasta upload após o envio ao cloudinary
	return icon;
};

const getIconController = async (req: Request, res: Response) => {
	const { public_id } = req.params;
	const icon = cloudinary.url(public_id);
	//http://res.cloudinary.com/dyo8h0ers/Icon/upload/kgnd2p0ne5xiypyqhw6c
	res.status(200).json({ iconUrl: icon });
};
const getAllIconController = async (req: Request, res: Response) => {
	const icons = await getAllIconsService();
	//http://res.cloudinary.com/dyo8h0ers/Icon/upload/kgnd2p0ne5xiypyqhw6c
	res.status(200).json(icons);
};

const uploadIconPostController = async (req: Request, res: Response) => {
	const icon = await saveIcon(req.file!.path);

	const uploadedIcon = await iconService(icon);

	return res.status(200).json(uploadedIcon);
};

const uploadIconController = async (req: Request, res: Response) => {
	const icon = await saveIcon(req.file!.path);

	const parsedUpload = iconWithoutIdSchema.parse({
		publicId: icon.public_id,
		secureUrl: icon.secure_url,
		createdAt: new Date(icon.created_at),
		...icon,
	});

	return res.status(200).json(parsedUpload);
};

export {
	getIconController,
	getAllIconController,
	uploadIconPostController,
	uploadIconController,
};
