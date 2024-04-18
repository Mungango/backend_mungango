// import "express-async-errors";
import express, { json } from "express";
import userRoutes from "./routes/user.routes.js";
import connect from "./db/connect.js"

const app = express();
app.use(json());

app.use("/users", userRoutes);

// Servidor e conexão com banco
app.listen();
connect
  //.sync({ force: true })
  .sync()
  .then()
  .catch((error) => {
    console.log(error);
  });

export default app;
