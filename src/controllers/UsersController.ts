import express, { Request, Response,} from "express";

import { ResponseObject } from "../interfaces/commonInterfaces";

import UserService from "../services/userService";

export const AllProductsForUsers = async (req: Request, res: Response) => {
  const response: ResponseObject = await UserService.userAllProducts(req.body);
  res.status(200).send(response)
};

export const AddToCart = async (req: Request, res: Response) => {
  const response: ResponseObject = await UserService.addToCart(req.body);
  res.status(200).send(response);
};

export const CartProducts = async (req: Request, res: Response) => {
  const response: ResponseObject = await UserService.allCartProducts(req.body);
  res.status(200).send(response);
};


export const UserDetails = async (req: Request, res: Response) => {
  const response: ResponseObject = await UserService.userDetails(req.body);
  res.status(200).send(response);
};


export const UserAddress = async (req: Request, res: Response) => {
  const response: ResponseObject = await UserService.userAddress(req.body);
  res.status(200).send(response);
};


export const DeleteUserAddress = async (req: Request, res: Response) => {

  const response: ResponseObject = await UserService.deleteUserAddress(
    req.params
  );
  res.status(200).send(response);
};
