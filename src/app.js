// import "express-async-errors";
import express, { json } from "express";
import userRoutes from "./routes/user.routes.js";

const app = express();
app.use(json());

app.use("/users", userRoutes);

app.listen(3000, () => {
	console.log("Baguncinha no ar!!");
});

export default app;
