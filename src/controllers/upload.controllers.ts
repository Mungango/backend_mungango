import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import uploadService from "../services/upload.service";
import { uploadWithoutIdSchema } from "../schemas/upload.schema";
import { Request, Response } from "express";

const saveImages = async (files: Express.Multer.File[]) => {
	const uploadPromises = files.map((file) => {
		return new Promise((resolve, reject) => {
			cloudinary.uploader.upload(
				file.path,
				{ width: 400, height: 400, crop: "fill" },
				(error, result) => {
					if (error) {
						reject(error);
					} else {
						fs.unlink(file.path, (err) => {
							if (err) console.log(err);
						});
						resolve(result);
					}
				}
			);
		});
	});

	return Promise.all(uploadPromises);
};

const getImageController = async (req: Request, res: Response) => {
	const { public_id } = req.params;
	const image = cloudinary.url(public_id);
	res.status(200).json({ imageUrl: image });
};

const uploadImagePostController = async (req: Request, res: Response) => {
	try {
		const uploads: any = await saveImages(req.files as Express.Multer.File[]);

		const postId = Number(req.params.id);
		const uploadedImages = await uploadService(postId, uploads);

		return res.status(200).json(uploadedImages);
	} catch (error) {
		return res.status(500).json({ error: "Error uploading images" });
	}
};

const uploadImageController = async (req: Request, res: Response) => {
	try {
		const uploads: any = await saveImages(req.files as Express.Multer.File[]);

		const parsedUploads = uploads.map((upload: any) => {
			return uploadWithoutIdSchema.parse({
				publicId: upload.public_id,
				secureUrl: upload.secure_url,
				createdAt: new Date(upload.created_at),
				...upload,
			});
		});

		return res.status(200).json(parsedUploads);
	} catch (error) {
		return res.status(500).json({ error: "Error uploading images" });
	}
};

export { getImageController, uploadImagePostController, uploadImageController };
