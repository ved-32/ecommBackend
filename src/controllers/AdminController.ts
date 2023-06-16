import { Request, Response } from "express";

import { ResponseObject } from "../interfaces/commonInterfaces";

import AdminServices from "../services/AdminServices";

export const addAdminCategory = async (req: Request, res: Response) => {
  const response: ResponseObject = await AdminServices.addAdminCategory(
    req.body
  );
  res.status(200).send(response);
};

export const getAllCategory = async (req: Request, res: Response) => {
  const response: ResponseObject = await AdminServices.getAllCategory();
  res.status(200).send(response);
};

export const editCategory = async (req: Request, res: Response) => {
  console.log("data in controller",req)
  const response: ResponseObject = await AdminServices.editCategory(req.body);
  res.status(200).send(response);
};

export const addProduct = async (req: Request, res: Response) => {
  const response: ResponseObject = await AdminServices.addProduct(req.body);
  res.status(200).send(response);
};

export const getAllProducts = async (req: Request, res: Response) => {
  const response: ResponseObject = await AdminServices.getAllProducts();
  res.status(200).send(response);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const response: ResponseObject = await AdminServices.deleteProduct(
    req.params.id
  );
  res.status(200).send(response);
};

export const editProduct = async (req: Request, res: Response) => {
  const response: ResponseObject = await AdminServices.editProduct(req.body);
  res.status(200).send(response);
};
