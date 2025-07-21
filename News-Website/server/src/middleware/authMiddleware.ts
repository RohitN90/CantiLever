import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";

dotenv.config();

const authication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (
      req.headers["Authorization"] === undefined ||
      req.headers["Authorization"] === null
    ) {
      res.status(401).json({ message: "Unauthorized" });
    }
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Unauthorized" });
    }
    const token = authHeader?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
    }
    const decode = jwt.verify(token as string, `${process.env.JWT_SECRET}`);
    next();
  } catch (error) {
    res.status(501).json({ message: "Unauthorized" });
    console.log(error);
  }
};

export default authication;
