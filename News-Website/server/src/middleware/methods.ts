import { Request, Response, NextFunction } from "express";

const methosMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const request = req.method;
  const path = req.path;
  const timestamp = Date.now();
  const dateObject = new Date(timestamp);
  const date = dateObject.toISOString();
  console.log(`${request} --> ${path} at : ${date}`);
  next();
};

export default methosMiddleware;
