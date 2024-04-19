import "express-async-errors";
import express, { json } from "express";
import userRoutes from "./routes/user.routes.js";
import connect from "./db/connect.js";
import { handleError } from "./errors.js";

const app = express();
app.use(json());

app.use("/users", userRoutes);

// não colocar coisas a baixo desse "use"
app.use(handleError);

// Servidor e conexão com banco
app.listen(3000);
connect
	// .sync({ force: true })
	.sync()
	.then()
	.catch((error) => {
		console.log(error);
	});

export default app;
