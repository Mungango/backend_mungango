import {
	getImageController,
	uploadImageController,
	uploadImagePostController,
} from "../controllers/upload.controllers";
import upload from "../middlewares/uploadImage.middleware";
import ensureExistsMiddleware from "../middlewares/ensureExists.middleware";
import { Router } from "express";
import Post from "../models/Post";

const uploadRoutes: Router = Router();

uploadRoutes.get("/:public_id", getImageController);

uploadRoutes.post(
	"/:id",
	upload.single("image"),
	ensureExistsMiddleware(Post, "Post"),
	uploadImagePostController
);

uploadRoutes.post("", upload.single("image"), uploadImageController);

export default uploadRoutes;
