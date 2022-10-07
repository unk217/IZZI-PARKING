import express from "express";
import { JwtValidator_ } from "../helpers/validators";
import { getAllLocation, addLocation } from "../controllers/controller.location";

export const LocationRoute = express.Router();

LocationRoute.get("/get&location", JwtValidator_, getAllLocation);
LocationRoute.post("/add&location", JwtValidator_, addLocation);
