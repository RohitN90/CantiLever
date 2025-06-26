import axios from "axios";
import { Request, Response } from "express";
import * as dotenv from "dotenv";

dotenv.config();
const apiKey = process.env.NEW_API_KEY;

const getHeadLines = async (req: Request, res: Response) => {
  try {
    const { country } = req.body;
    const data = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apiKey}`,
    );
    if (!data) {
      res.status(404).json({ message: "News not found !" });
    }
    res.status(200).json({ data: await data.data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getHeadLinesByCategory = async (req: Request, res: Response) => {
  try {
    const { country, category } = req.body;
    const data = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`,
    );

    if (!data) {
      res.status(404).json({ message: "News not found !" });
    }
    res.status(200).json({ data: await data.data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getHeadLinesByTopic = async (req: Request, res: Response) => {
  try {
    const topic: string = req.params.topic;
    const data = await axios.get(
      `https://newsapi.org/v2/top-headlines?q=${topic}&apiKey=${apiKey}`,
    );
    if (!data) {
      res.status(404).json({ message: "News not found !" });
    }
    res.status(200).json({ data: await data.data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { getHeadLinesByTopic, getHeadLines, getHeadLinesByCategory };
