import { Router } from "express";

const userRoutes = Router();

userRoutes.get("", (req, res)=>{
    return res.status(200).json("Funcionou!!!")
});
// usersRoutes.post("");
// usersRoutes.patch("/:id");
// usersRoutes.delete("/:id");

export default userRoutes;
