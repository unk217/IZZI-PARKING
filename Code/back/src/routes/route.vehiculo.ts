import express from "express";
import { JwtValidator_ } from "../helpers/validators";

export const RouteUser = express.Router();

RouteUser.get("/get&vehiculos");
RouteUser.post("/create&vehiculos", JwtValidator_);
