import express from "express";
import { JwtValidator_ } from "../helpers/validators";
import { login, createUser } from "../controllers/controller.user";

export const RouteUser = express.Router();

RouteUser.get("/login", login);
RouteUser.post("/create&users", JwtValidator_, createUser);
