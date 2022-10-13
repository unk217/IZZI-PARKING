import express from "express";
import { JwtValidator_ } from "../helpers/validators";
import { createReserva, getReservas } from "../controllers/controller.reserva";

export const RouteUser = express.Router();

RouteUser.get("/get&reservas", JwtValidator_, getReservas);
RouteUser.post("/create&reserva", JwtValidator_, createReserva);
