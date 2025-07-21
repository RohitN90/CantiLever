"use client";
import { useAuthToken, useNewsStore } from "@/store/store";
import React, { useEffect, useState } from "react";

const home = () => {
  const [news, setNews] = useState("");
  const { token } = useAuthToken((state) => state);
  useEffect(() => {
    useNewsStore((state) => state.fetchNews(token, "usa"));
    const newsData = useNewsStore((state) => state.news);
    setNews(newsData);
  }, []);

  return (
    <>
      <div className="font-semibold text-4xl text-black">{news}</div>
    </>
  );
};

export default home;
