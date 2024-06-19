import {
	getImageController,
	uploadImageController,
	uploadImagePostController,
} from "../controllers/upload.controllers";
import upload from "../middlewares/uploadImage.middleware";
import ensureExistsMiddleware from "../middlewares/ensureExists.middleware";
import { Router } from "express";
import Post from "../models/Post";
import { v2 } from "cloudinary";

const uploadRoutes: Router = Router();

uploadRoutes.get("/:public_id", getImageController);

uploadRoutes.post(
	"/:id",
	upload.array("images"),
	ensureExistsMiddleware(Post, "Post"),
	uploadImagePostController
);

uploadRoutes.post("", upload.array("images"), uploadImageController);

uploadRoutes.delete("/:resource_type", async (req, res) => {
	await v2.uploader.destroy(req.params.resource_type);

	return res.status(204).send();
});

export default uploadRoutes;
