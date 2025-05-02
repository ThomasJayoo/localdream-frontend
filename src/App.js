import React, { useEffect, useState } from "react";
import Header from "./components/Header";

import NewsGrid from "./components/NewsGrid";
import "./App.css"; // 반드시 포함

function App() {
  const [newsData, setNewsData] = useState({});

  useEffect(() => {
    fetch("/news.json")
      .then((res) => res.json())
      .then((data) => setNewsData(data))
      .catch((err) => console.error("❌ 뉴스 로딩 실패:", err));
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <Header />
      <FocusSection />
      <NewsGrid newsData={newsData} />

      <h2 className="text-xl font-semibold mt-10 mb-4 text-blue-500">
        화제의 인물 (Youtube)
      </h2>
      <div className="video-grid">
        <iframe
          src="https://www.youtube.com/embed/KCyNIAeVHQA"
          title="Video 1"
          allowFullScreen
          style={{ width: "100%", height: "215px", border: "none" }}
        ></iframe>
        <iframe
          src="https://www.youtube.com/embed/fM4BuCgM0CI"
          title="Video 2"
          allowFullScreen
          style={{ width: "100%", height: "215px", border: "none" }}
        ></iframe>
      </div>
    </div>
  );
}

export default App;
