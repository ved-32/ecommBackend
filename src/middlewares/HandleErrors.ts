import { Request, Response, NextFunction } from "express";

/**
 * @method to handle errors
 * @param func
 * @returns
 */

const HandleErrors =
  (func: (req: Request, res: Response, next: NextFunction) => void) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log("Triggered Endpoint: ", req.originalUrl);
    try {
     func(req, res, next);
    } catch (error) {
      console.error("Error Handler", error);
      res.status(400).send(error);
      next(error);
    }
  };

export default HandleErrors;
