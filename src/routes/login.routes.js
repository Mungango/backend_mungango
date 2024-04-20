import { Router } from "express";
import { loginController } from "../controllers/login.controllers.js";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware.js";
import { loginSchema } from "../schemas/login.schema.js";

const loginRoutes = Router();

loginRoutes.post("", ensureDataIsValidMiddleware(loginSchema), loginController);

export default loginRoutes;
