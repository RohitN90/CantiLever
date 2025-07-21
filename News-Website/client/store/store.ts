import axios from "axios";
import { create } from "zustand";

//Types

type News = {
  news: any;
  fetchNews: (accessToken: string, country: string) => Promise<void>;
};

type Token = {
  token: string;
  setToken: (token: string) => void;
};

//Store

const useNewsStore = create<News>((set) => ({
  news: [],
  fetchNews: async (accessToken, country) => {
    const data = await axios.post(
      "http://localhost:9000/api/news",
      `${country}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "X-Custom-Header": "MyCustomValue",
        },
      },
    );
    set({ news: data.data });
  },
}));

const useAuthToken = create<Token>((set) => ({
  token: "",
  setToken: (token) => set({ token }),
}));

//Exports
export { useNewsStore, useAuthToken };
