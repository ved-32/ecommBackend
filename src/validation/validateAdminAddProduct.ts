import { Request, Response, NextFunction } from "express";

import Joi from "joi";

const validateAdminAddProduct = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    category: Joi.string().required(),
    categoryId: Joi.string().required(),
    image: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(200).json({ errors: error });
  } else {
    next();
  }
};
export default validateAdminAddProduct;
