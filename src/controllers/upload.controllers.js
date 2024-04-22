import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import uploadService from "../services/upload.service.js";
import { uploadWithoutIdSchema } from "../schemas/upload.schema.js";

const saveImage = async (path) => {
  const upload = await cloudinary.uploader.upload(
    path,
    (error, result) => result
  );
  // cloudinary.uploader.upload é o método que utilizamos para o upload
  // req.file.path é o caminho da nossa imagem salva pelo multer na pasta upload
  fs.unlink(path, (error) => {
    if (error) {
      console.log(error);
    }
  });
  //fs é uma lib nativa do node.js para manipulação do sistema operacional
  //fs.unlink esta apagando o arquivo da pasta upload após o envio ao cloudinary
  return upload;
};

const getImageController = async (req, res) => {
  const { public_id } = req.params;
  const image = cloudinary.url(public_id);
  //http://res.cloudinary.com/dyo8h0ers/image/upload/kgnd2p0ne5xiypyqhw6c
  res.status(200).json({ imageUrl: image });
};

const uploadImagePostController = async (req, res) => {
  const upload = await saveImage(req.file.path);

  const postId = req.params.id;

  const uploadedImage = await uploadService(postId, upload);

  return res.status(200).json(uploadedImage);
};

const uploadImageController = async (req, res) => {
  const upload = await saveImage(req.file.path);

  const parsedUpload = uploadWithoutIdSchema.parse({
    publicId: upload.public_id,
    secureUrl: upload.secure_url,
    createdAt: new Date(upload.created_at),
    ...upload,
  });

  return res.status(200).json(parsedUpload);
};

export { getImageController, uploadImagePostController, uploadImageController };
