import express from "express";
import { JwtValidator_ } from "../helpers/validators";
import { login, createUser, getusers } from "../controllers/controller.user";

export const RouteUser = express.Router();

RouteUser.get("/login", login);
RouteUser.get("/get&users", JwtValidator_, getusers);
RouteUser.post("/create&users", JwtValidator_, createUser);
