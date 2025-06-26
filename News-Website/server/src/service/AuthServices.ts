import { Request, Response } from "express";
import bcript from "bcrypt";
import UserModel from "../models/User";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { IUser } from "../models/User";

dotenv.config();

const SignUp = async (req: Request, res: Response) => {
  try {
    const { email, password, firstname, lastname } = req.body;
    const hashpassword = await bcript.hash(password, 10);
    const data: IUser = await UserModel.insertOne({
      firstname: firstname,
      lastname: lastname,
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
    const token = jwt.sign(
      { userId: user?._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      },
    );
    res.cookie("Token", token);
    req.headers["Authorization"] = token;
    res.status(201).json({
      token: token,
    });
  } catch (error: any) {
    console.log(`Error message is ${error.message}`);
    res.status(404).json({ error: "Internal server error" });
  }
};

const signOut = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.Token;
    if (token) {
      req.cookies.Token = " ";
      res.status(200).json({ message: "sign Out successfully" });
    }
    res.status(401).json({ message: "Something went wrong" });
  } catch (error: any) {
    console.log(`Error message is ${error.message}`);
    res.status(404).json({ error: "Internal server error" });
  }
};

export { SignUp, Signin, signOut };
