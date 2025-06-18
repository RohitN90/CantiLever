import express, { Request, Response, urlencoded } from "express";
import * as dotenv from "dotenv";
import connect from "./db/connection";
import AuthRouter from "./controllers/Auth";
import authication from "./middleware/authMiddleware";

connect();

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", AuthRouter);

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Server is running",
  });
});

app.get("/name", authication, (req: Request, res: Response) => {
  try {
    const message: string = "hello Rohit";
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
