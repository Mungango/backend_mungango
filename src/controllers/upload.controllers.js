import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { uploadSchema } from "../schemas/upload.schema.js";

const getImageController = async (req, res) => {
	const { public_id } = req.params;
	const image = cloudinary.url(public_id);
	console.log(image);
	//http://res.cloudinary.com/dyo8h0ers/image/upload/kgnd2p0ne5xiypyqhw6c
	res.status(200).json({ imageUrl: image });
};

const uploadImageController = async (req, res) => {
	const upload = await cloudinary.uploader.upload(
		req.file.path,
		(error, result) => result
	);
	// cloudinary.uploader.upload é o método que utilizamos para o upload
	// req.file!.path é o caminho da nossa imagem salva pelo multer na pasta upload
	fs.unlink(req.file.path, (error) => {
		if (error) {
			console.log(error);
		}
	});
	//fs é uma lib nativa do node.js para manipulação do sistema operacional
	//fs.unlink esta apagando o arquivo da pasta upload após o envio ao cloudinary
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

	return res.status(200).json(parsedObject);
};

export { getImageController, uploadImageController };
