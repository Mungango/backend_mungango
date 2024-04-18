import { Router } from "express";
import {
	createUsersController,
	deleteUsersController,
	getAllUsersController,
	getUsersController,
	updateUsersController,
} from "../controllers/user.controllers.js";

const userRoutes = Router();

userRoutes.get("", getAllUsersController);

userRoutes.get("/:id", getUsersController);

userRoutes.post("", createUsersController);

userRoutes.patch("/:id", updateUsersController);

userRoutes.delete("/:id", deleteUsersController);

export default userRoutes;
