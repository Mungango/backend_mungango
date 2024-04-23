import "express-async-errors";
import express, { Application, json } from "express";
import userRoutes from "./routes/user.routes";
import postRoutes from "./routes/post.routes";
import loginRoutes from "./routes/login.routes";
import uploadRoutes from "./routes/upload.routes";
import commentRoutes from "./routes/comment.routes";
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

export default app;
