import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import FocusSection from "./components/FocusSection";
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

      {/* 유튜브 영상 2열 배치 */}
      <h2 className="text-xl font-semibold mt-10 mb-4">화제의 인물 (Youtube)</h2>
      <div className="video-grid">
        <iframe
          src="https://www.youtube.com/embed/KCyNIAeVHQA"
          title="Video 1"
          allowFullScreen
          style={{ width: "100%", height: "215px", border: "none" }}
        />
        <iframe
          src="https://www.youtube.com/embed/fM4BuCgM0CI"
          title="Video 2"
          allowFullScreen
          style={{ width: "100%", height: "215px", border: "none" }}
        />
      </div>
    </div>
  );
}

export default App;
