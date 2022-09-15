import express from "express";
import { JwtValidator } from "../helpers/validators";
import { login, createUser } from "../controllers/users";

export const Route_User = express.Router();

Route_User.get("/login", login);
Route_User.post("/create&users", createUser);
