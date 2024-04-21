import "express-async-errors";
import express, { json } from "express";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import connect from "./db/connect.js";
import { handleError } from "./errors.js";
import loginRoutes from "./routes/login.routes.js";

const app = express();
app.use(json());

app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/login", loginRoutes);

import upload from "./middlewares/uploadImage.middleware.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

app.get("/upload/:public_id", (req, res) => {
	const { public_id } = req.params;
	const image = cloudinary.url(public_id);
	console.log(image);
	//http://res.cloudinary.com/dyo8h0ers/image/upload/kgnd2p0ne5xiypyqhw6c
	res.json(image);
});

app.post("/upload", upload.single("image"), async (req, res) => {
	const upload = await cloudinary.uploader.upload(
		req.file.path,
		(error, result) => result
	);
	// cloudinary.uploader.upload é o método que utilizamos para o upload
	// req.file!.path é o caminho da nossa imagem salva pelo multer na pasta upload
	fs.unlink(req.file.path, (error) => {
		if (error) {
			console.log(error);
		}
	});
	//fs é uma lib nativa do node.js para manipulação do sistema operacional
	//fs.unlink esta apagando o arquivo da pasta upload após o envio ao cloudinary
	return res.json(upload);
});

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
