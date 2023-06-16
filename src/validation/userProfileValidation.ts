import { Request, Response, NextFunction } from "express";

import Joi from "joi";


const validateUserProfile = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phone: Joi.number().required(),
    image: Joi.string(),
    // userId:Joi.string().required()
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(200).json({ errors: error });
  } else {
    next();
  }
};
export default validateUserProfile;
