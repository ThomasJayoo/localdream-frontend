import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import FocusSection from "./components/FocusSection";
import NewsGrid from "./components/NewsGrid";

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
    </div>
<div className="video-grid">
  <iframe src="https://youtu.be/KCyNIAeVHQA?si=XJdSSaQdl3-eW-ov" />
  <iframe src="https://youtu.be/fM4BuCgM0CI?si=-_KO3CAj7avbTRHb" />
</div>

  );
}

export default App;
