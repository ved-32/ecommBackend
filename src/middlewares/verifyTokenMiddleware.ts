import { Request, Response, NextFunction } from "express";

const jwt = require("jsonwebtoken");

require("dotenv").config();

export const verifyUserToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  const token = req.header("Authorization")?.replace("Bearer ", "");
  const decode = jwt.verify(token, process.env.SECRET_KEY);
  if (decode.isAdmin === false) {
    next();
  } else {
    res.send("token failed");
  }
};

export const verfyAdminToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  const decode = jwt.verify(token, process.env.SECRET_KEY);

  if (decode.isAdmin === true) {
    next();
  } else {
    return res.send("token failed");
  }
};
