import { Request, Response } from "express";

import { ResponseObject } from "../interfaces/commonInterfaces";

import AuthService from "../services/AuthService";

export const login = async (req: Request, res: Response) => {
  const response: ResponseObject = await AuthService.login(req.body)
  res.status(200).send(response);
};

export const signup = async (req: Request, res: Response) => {
  const response: ResponseObject = await AuthService.signup(req.body);
  res.status(200).send(response);
};
