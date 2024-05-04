import "express-async-errors";
import express, { Application, json } from "express";
import userRoutes from "./routes/user.routes";
import postRoutes from "./routes/post.routes";
import loginRoutes from "./routes/login.routes";
import uploadRoutes from "./routes/upload.routes";
import commentRoutes from "./routes/comment.routes";
import { handleError } from "./errors";
import cors from "cors";
import path from "path";
import iconRoutes from "./routes/icon.routes";

const app: Application = express();
app.use(json());
app.use(cors());

app.use(express.static(path.join(__dirname, "..", "docs")));

// Rota para renderizar o index.html quando acessarem a raiz '/'
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "docs", "index.html"));
});

app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/login", loginRoutes);
app.use("/upload", uploadRoutes);
app.use("/upload", uploadRoutes);
app.use("/icon", iconRoutes);

// não colocar coisas a baixo desse "use"
app.use(handleError);

export default app;
