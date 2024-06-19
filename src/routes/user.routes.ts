import { Router } from "express";
import {
	createUsersController,
	deleteUsersController,
	followUserController,
	getAllUsersController,
	getFollowersUserController,
	getFollowingUserController,
	getUsersController,
	getUsersIdController,
	unfollowUserController,
	updateUsersController,
} from "../controllers/user.controllers";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import ensureExistsMiddleware from "../middlewares/ensureExists.middleware";
import { usersCreateSchema, usersUpdateSchema } from "../schemas/users.schema";
import User from "../models/User";
import ensureTokenIsValidMiddleware from "../middlewares/ensureTokenIsValid.middleware";

const userRoutes = Router();

userRoutes.get("", getAllUsersController);

userRoutes.get(
	"/:username",
	// ensureExistsMiddleware(User, "Usuário"),
	getUsersController
); // buscar um usuario por username
// arrumar o middlware de de existencia no banco ou fazer a busca no proprio sevice

userRoutes.get(
	"/id/:id",
	ensureExistsMiddleware(User, "Usuário"),
	getUsersIdController
); // buscar um usuario por id

userRoutes.post(
	"",
	ensureDataIsValidMiddleware(usersCreateSchema),
	createUsersController
);

userRoutes.patch(
	"/:id",
	ensureExistsMiddleware(User, "Usuário"),
	ensureDataIsValidMiddleware(usersUpdateSchema),
	ensureTokenIsValidMiddleware,
	updateUsersController
);

userRoutes.delete(
	"/:id",
	ensureExistsMiddleware(User, "Usuário"),
	deleteUsersController
);

// User Follower Routes
userRoutes.get(
	"/following/:id",
	// ensureExistsMiddleware(User, "Usuário"),
	getFollowingUserController
);

userRoutes.get(
	"/followers/:id",
	// ensureExistsMiddleware(User, "Usuário"),
	getFollowersUserController
);

userRoutes.post(
	"/follow/:id",
	ensureExistsMiddleware(User, "Usuário"),
	ensureTokenIsValidMiddleware,
	followUserController
);

userRoutes.delete(
	"/follow/:id",
	ensureExistsMiddleware(User, "Usuário"),
	ensureTokenIsValidMiddleware,
	unfollowUserController
);

export default userRoutes;
