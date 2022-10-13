import express from "express";
import { JwtValidator_ } from "../helpers/validators";

export const RouteUser = express.Router();

RouteUser.get("/get&vehiculos");
RouteUser.get("/get&vehiculo", JwtValidator_);
RouteUser.post("/create&vehiculo", JwtValidator_);
RouteUser.put("/edit&vehiculo", JwtValidator_);
