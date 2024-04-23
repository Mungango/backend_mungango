import "express-async-errors";
import express, { Application, json } from "express";
import userRoutes from "./routes/user.routes";
import postRoutes from "./routes/post.routes";
import loginRoutes from "./routes/login.routes";
import uploadRoutes from "./routes/upload.routes";
import commentRoutes from "./routes/comment.routes";
import connect from "./db/connect";
import { handleError } from "./errors";

const app: Application = express();
app.use(json());

app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/login", loginRoutes);
app.use("/upload", uploadRoutes);
app.use("/comment", commentRoutes);


// não colocar coisas a baixo desse "use"
app.use(handleError);

// Servidor e conexão com banco
app.listen(3000);
connect
	// .sync({ force: true })
	.sync()
	.then()
	.catch((error: any) => {
		console.log(error);
	});

export default app;
