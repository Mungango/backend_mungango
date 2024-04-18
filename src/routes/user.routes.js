import { Router } from "express";

const userRoutes = Router();

userRoutes.get("", (req, res)=>{
    return res.status(200).json("Rota get users")
});

userRoutes.get("/:id", (req, res)=>{
    return res.status(200).json("Rota get um unico user")
});

userRoutes.post("", (req, res)=>{
    return res.status(200).json("Rota post user")
});

userRoutes.patch("/:id", (req, res)=>{
    return res.status(200).json("Update user")
});
userRoutes.delete("/:id", (req, res)=>{
    return res.status(204).json()
});

export default userRoutes;
