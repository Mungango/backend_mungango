import { getImageController, uploadImageController } from "../controllers/upload.controllers.js";
import upload from "../middlewares/uploadImage.middleware.js";
import { Router } from "express";

const uploadRoutes = Router();

uploadRoutes.get("/:public_id", getImageController);

uploadRoutes.post("", upload.single("image"), uploadImageController);

export default uploadRoutes;
