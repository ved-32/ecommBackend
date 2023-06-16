import { Request, Response, NextFunction } from "express";

import Joi from "joi";

const validateSignUp = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required().min(6).max(12),
    phone: Joi.number().required(),
    isAdmin: Joi.boolean(),
    image: Joi.string(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(200).json({ errors: error });
  } else {
    next();
  }
};
export default validateSignUp;
