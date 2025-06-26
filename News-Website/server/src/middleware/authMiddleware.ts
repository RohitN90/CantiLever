import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";

dotenv.config();

const authication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = await req.cookies.Token;
    if (!token) {
      res.status(401).json({
        message: "Access denied",
      });
    }
    const decode = jwt.verify(token as string, `${process.env.JWT_SECRET}`);
    next();
  } catch (error) {
    res.status(404).json({
      error: "Invalid Token",
    });
  }
};

export default authication;
