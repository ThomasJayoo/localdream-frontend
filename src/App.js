import React, { useState, useEffect } from "react";
import YoutubeSection from "./components/YoutubeSection";
import NewsByCategory from "./components/NewsByCategory";

function formatKoreanDate(dateObj) {
  const week = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const date = dateObj.getDate();
  const day = week[dateObj.getDay()];
  return `${year}년 ${month}월 ${date}일 ${day}`;
}

export default function App() {
  const todayStr = formatKoreanDate(new Date());
  const [newsData, setNewsData] = useState({});

  // ✅ news.json 불러오기
  useEffect(() => {
    fetch("/data/news.json")
      .then((res) => res.json())
      .then((data) => setNewsData(data))
      .catch((err) => console.error("뉴스 로딩 실패:", err));
  }, []);


  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      {/* 상단 날짜 + 제목 */}
      <div className="flex justify-between items-center mb-6 relative">
        <div className="text-blue-800 font-bold text-lg absolute left-0">{todayStr}</div>
        <div className="w-full text-center">
          <h1 className="text-2xl font-extrabold text-indigo-700">로컬드림</h1>
        </div>
      </div>

      {/* 유튜브 2개 나란히 */}
      <div className="mb-10">
        <YoutubeSection />
       </div>

      {/* 뉴스 아래 2단 그리드 (내부 NewsByCategory.jsx에서 처리) */}
      <NewsByCategory newsData={newsData} />
    </div>
  );
}
