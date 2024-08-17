import express from "express";
import { addNewUser, getAllUserData } from "../controllers/user.controller.js";
import { jwtVerifyToken } from "../middlewares/authJwt.js";
import { loginUser } from "../controllers/login.controller.js";
const Router = express.Router();

const userRouter = Router.post("/create-user", addNewUser);
const homeRouter = Router.get("/", jwtVerifyToken, getAllUserData);
const loginRouter = Router.post("/", loginUser);

export { userRouter, homeRouter, loginRouter };
