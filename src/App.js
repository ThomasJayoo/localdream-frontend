import React, { useEffect, useState } from "react";
import Header from "./components/Header";

import NewsGrid from "./components/NewsGrid";
import YoutubeSection from "./components/YoutubeSection"; // ✅ 추가
import "./App.css";

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
      <YoutubeSection /> {/* ✅ 분리된 컴포넌트 삽입 */}
    </div>
  );
}

export default App;
