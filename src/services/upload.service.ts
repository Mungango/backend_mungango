import { iExternalUploadApiResponse } from "../interfaces/upload.interface";
import Image from "../models/Image";
import { uploadWithoutIdSchema } from "../schemas/upload.schema";

const uploadService = async (
	postId: number,
	uploads: iExternalUploadApiResponse[]
) => {
	const createdImages = [];

	for (const upload of uploads) {
		const {
			secure_url: secureUrl,
			public_id: publicId,
			created_at: createdAt,
			...uploadJson
		} = upload;

		const parsedObject = uploadWithoutIdSchema.parse({
			publicId,
			secureUrl,
			createdAt: new Date(createdAt),
			...uploadJson,
		});

		const createdImage = await Image.create({ ...parsedObject, postId });
		createdImages.push(createdImage);
	}

	return createdImages;
};

export default uploadService;
