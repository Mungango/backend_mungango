import {
	getImageController,
	uploadImageController,
} from "../controllers/upload.controllers.js";
import upload from "../middlewares/uploadImage.middleware.js";
import ensureExistsMiddleware from "../middlewares/ensureExists.middleware.js";
import { Router } from "express";
import Post from "../models/Post.js";

const uploadRoutes = Router();

uploadRoutes.get("/:public_id", getImageController);

uploadRoutes.post(
	"/:id",
	upload.single("image"),
	ensureExistsMiddleware(Post, "Post"),
	uploadImageController
);

export default uploadRoutes;
