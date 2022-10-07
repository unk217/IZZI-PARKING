import { Request, Response } from "express";
import { generarJwt } from "../helpers/jwtGenerator";
import { User_Model } from "../models/model.user";

export const login = async (req: Request, res: Response) => {
  try {
    const { user, password } = req.query;

    const data = await User_Model.findOne(
      {
        $and: [{ username: user }, { password: password }],
      },
      { password: 0 }
    );
    if (data) {
      const DATA = JSON.stringify(data);
      const TOKEN = await generarJwt(data.id);
      res.json({ DATA, TOKEN });
    } else res.json({ A: "Datos incorrectos" });
  } catch (error) {
    res.json({ msg: error });
  }
};
export const createUser = async (req: Request, res: Response) => {
  try {
    new User_Model(req.body).save((error) => {
      if (error) {
        res.json({ msg: error });
      } else {
        res.json({ S: "success" });
      }
    });
  } catch (error) {}
};
