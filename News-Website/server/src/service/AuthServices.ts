import { Request, Response } from "express";
import bcript from "bcrypt";
import UserModel from "../models/User";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { Document, Types } from "mongoose";

interface IUser extends Document {
  _id: Types.ObjectId | unknown;
  email: string;
  password: string;
}

dotenv.config();

const SignUp = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const hashpassword = await bcript.hash(password, 10);
    const data: IUser = await UserModel.insertOne({
      email: email,
      password: hashpassword,
    });
    res.status(201).json({
      data: data,
      success: true,
    });
  } catch (error: any) {
    console.log(`Error message is ${error.message}`);
    res.status(404).json({ error: "Internal server error" });
  }
};

const Signin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user: IUser | null = await UserModel.findOne({ email: email });
    if (!user) {
      res.status(401).json({ error: "User not found !" });
    }
    const passwordConpare = bcript.compare(password, user?.password as string);
    if (!passwordConpare) {
      res.status(401).json({ error: "Authentication Failed !" });
    }
    const toekn = jwt.sign(
      { userId: user?._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      },
    );
    res.status(201).json({
      token: toekn,
    });
  } catch (error: any) {
    console.log(`Error message is ${error.message}`);
    res.status(404).json({ error: "Internal server error" });
  }
};

export { SignUp, Signin };
