import { Request, Response, NextFunction } from "express";

import Joi from "joi";

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(200).json({ errors: error });
  } else {
    next();
  }
};
export default validateLogin;
