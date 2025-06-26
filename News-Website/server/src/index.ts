import express, { Request, Response, urlencoded } from "express";
import * as dotenv from "dotenv";
import connect from "./db/connection";
import AuthRouter from "./controllers/Auth";
import authication from "./middleware/authMiddleware";
import NewsRouter from "./controllers/News";
import cors from "cors";
import methosMiddleware from "./middleware/methods";
import cookieParser from "cookie-parser";
connect();

dotenv.config();
const app = express();
app.use(cors());
app.use(cookieParser());
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methosMiddleware);
app.use("/auth", AuthRouter);
app.use("/api", NewsRouter);

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Server is running",
  });
});

app.get("/home", authication, (req: Request, res: Response) => {
  try {
    const name = req.body;
    const message: string = `Hola Welcome ${name} to New app`;
    res.status(200).json({
      message: message,
    });
  } catch (error) {
    console.log(`Error message is ${error}`);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
