import Image from "../models/Image";
import { uploadSchema, uploadSchemaWithPostId } from "../schemas/upload.schema";

const uploadService = async (postId: number, upload: any) => {
	const {
		secure_url: secureUrl,
		public_id: publicId,
		created_at: createdAt,
		...uploadJson
	} = upload;

	const parsedObject = uploadSchema.parse({
		publicId,
		secureUrl,
		createdAt: new Date(createdAt),
		...uploadJson,
	});

	const createdImage = await Image.create({ ...parsedObject, PostId: postId });

	return uploadSchemaWithPostId.parse(createdImage);
};

export default uploadService;
