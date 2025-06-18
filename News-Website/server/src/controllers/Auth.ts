import { Router } from "express";
import { Signin, SignUp } from "../service/AuthServices";

const AuthRouter = Router();

AuthRouter.post("/signUp", SignUp);
AuthRouter.get("/signIn", Signin);

export default AuthRouter;
