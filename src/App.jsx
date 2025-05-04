import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import NewsGrid from "./components/NewsGrid";
import YoutubeSection from "./components/YoutubeSection";
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
    <div className="container">
      <YoutubeSection /> {/* 반드시 항상 렌더 */}
      <Header />
      {Object.keys(newData).length > 0 ? ( 
        <NewsGrid newsData={newsData} />
      ) : (
        <p className="text-gray-400 text-sm mt-4"> 뉴스 로딩중입니다. ...</p>  
      )}    
    </div>
  );
}

export default App;
