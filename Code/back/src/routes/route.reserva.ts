import express from "express";
import { JwtValidator_ } from "../helpers/validators";
import { login, createUser, getUsers } from "../controllers/controller.user";

export const RouteReserva = express.Router();

RouteReserva.get("/login", login);
RouteReserva.get("/get&users", JwtValidator_, getUsers);
RouteReserva.post("/create&users", JwtValidator_, createUser);
