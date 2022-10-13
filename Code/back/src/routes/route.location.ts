import express from "express";
import { JwtValidator_ } from "../helpers/validators";
import { getAllLocation, addLocation } from "../controllers/controller.location";

export const RouterLocation = express.Router();

RouterLocation.get("/get&location", JwtValidator_, getAllLocation);
RouterLocation.post("/add&location", addLocation);
