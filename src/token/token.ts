import {Response, NextFunction } from "express";
var jwt = require("jsonwebtoken");
const Key = process.env.SECRET_KEY;

export const verifyAdmin = (req: any, res: Response, next: NextFunction) => {
 const decodeToken = jwt.verify();
  if (decodeToken.isAdmin === true) {
   next();
  } else {
    res.send("token failed");
  }
};
