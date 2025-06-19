import { Router } from "express";
import authication from "../middleware/authMiddleware";
import {
  getHeadLines,
  getHeadLinesByCategory,
  getHeadLinesByTopic,
} from "../service/NewsService";

const NewsRouter = Router();

NewsRouter.get("/news", authication, getHeadLines);
NewsRouter.get("/news/category", authication, getHeadLinesByCategory);
NewsRouter.get("/news/:topic", authication, getHeadLinesByTopic);

export default NewsRouter;
