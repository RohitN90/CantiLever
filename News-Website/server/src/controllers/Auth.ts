import { Router } from "express";
import { Signin, signOut, SignUp } from "../service/AuthServices";

const AuthRouter = Router();

AuthRouter.post("/signUp", SignUp);
AuthRouter.post("/signIn", Signin);
AuthRouter.post("/signOut", signOut);

export default AuthRouter;
