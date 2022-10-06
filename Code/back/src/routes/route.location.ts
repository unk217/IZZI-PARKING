import express from "express";
import { JwtValidator } from "../helpers/validators";
import { getAllLocation, addLocation } from "../controllers/controller.location";

export const LocationRoute = express.Router();

LocationRoute.get("/get&location", JwtValidator, getAllLocation);
LocationRoute.post("/add&location", JwtValidator, addLocation);
